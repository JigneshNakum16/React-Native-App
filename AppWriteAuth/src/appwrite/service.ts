import { ID, Account, Client } from 'appwrite';
import Config from 'react-native-config';
import Snackbar from 'react-native-snackbar';

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID;

const appWriteClient = new Client();

type CreateUserAccont = {
  name: string;
  email: string;
  password: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

class AppwriteService {
  account;

  constructor() {
    appWriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);
    this.account = new Account(appWriteClient);
  }

  async CreateUserAccount({ name, email, password }: CreateUserAccont) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );

      if (userAccount) {
        return this.LoginUserAccount({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('Appwrite error:: CreateUserAccount', error);
    }
  }

  async LoginUserAccount({ email, password }: LoginUserAccount) {
    try {
      const userSession = await this.account.createEmailPasswordSession(
        email,
        password,
      );
      return userSession;
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('Appwrite error:: LoginUserAccount', error);
    }
  }

  async getUserAccount() {
    try {
      const userAccount = await this.account.get();
      return userAccount;
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('Appwrite error:: getUserAccount', error);
    }
  }

  async logoutUserAccount() {
    try { 
        const response = await this.account.deleteSession('current');
        return response;
    }catch (error) {
        Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_SHORT,
          });
          console.log('Appwrite error:: logoutUserAccount', error);
    }
  }
}

export default AppwriteService;
