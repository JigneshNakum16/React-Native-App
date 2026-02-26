import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';

import Snackbar from 'react-native-snackbar';
import { AppwriteContext } from '../appwrite/AppwriteContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../routes/AuthStack';

type SignUpScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

type UserData = {
  name: string;
  email: string;
  password: string;
};

const SignUp = ({ navigation }: SignUpScreenProps) => {
  const { appwriteService, setIsLoggedIn } = useContext(AppwriteContext);

  const [error, setError] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSignUp = () => {
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      confirmPassword.length < 1
    ) {
      setError('All fields are required');
      return;
    } else if (password !== confirmPassword) {
      setError('Password and confirm password should be same');
      return;
    } else {
      const userData: UserData = {
        name,
        email,
        password,
      };
      appwriteService
        .CreateUserAccount(userData)
        .then(response => {
          if (response) {
            setIsLoggedIn(true);
            Snackbar.show({
              text: 'Account created successfully',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch(error => {
          Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_SHORT,
          });
        });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.appName}>AppWrite Auth</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={'#AEAEAE'}
          value={name}
          onChangeText={text => {
            setError('');
            setName(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor={'#AEAEAE'}
          value={email}
          onChangeText={text => {
            setError('');
            setEmail(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          placeholderTextColor={'#AEAEAE'}
          onChangeText={text => {
            setError('');
            setPassword(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          placeholderTextColor={'#AEAEAE'}
          onChangeText={text => {
            setError('');
            setConfirmPassword(text);
          }}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Pressable
          onPress={() => handleSignUp()}
          style={[styles.btn, { marginTop: error ? 10 : 20 }]}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>

        <Pressable
          style={styles.loginContainer}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.haveAccountLabel}>
            Already have an account?{' '}
            <Text style={styles.loginLabel}>Login here</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  appName: {
    color: '#f02e65',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fef8fa',
    padding: 10,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,

    width: '80%',
    color: '#000000',

    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 1,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,

    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  btnText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginContainer: {
    marginTop: 60,
  },
  haveAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loginLabel: {
    color: '#1d9bf0',
  },
});
