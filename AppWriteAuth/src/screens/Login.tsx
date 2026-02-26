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

import { AppwriteContext } from '../appwrite/AppwriteContext';
import Snackbar from 'react-native-snackbar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../routes/AuthStack';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;
const Login = ({ navigation }: LoginScreenProps) => {
  const { appwriteService, setIsLoggedIn } = useContext(AppwriteContext);
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (email.length < 1 || password.length < 1) {
      setError('All fields are required');
      return;
    } else {
      appwriteService
        .LoginUserAccount({ email, password })
        .then(response => {
          if (response) {
            setIsLoggedIn(true);
            Snackbar.show({
              text: 'Logged in successfully',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch(error => {
          setError(error.message);
        });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.appName}>AppWriteAuth Login</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={'#AEAEAE'}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          placeholderTextColor={'#AEAEAE'}
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable
          onPress={handleLogin}
          style={[styles.btn, { marginTop: error ? 10 : 20 }]}
        >
          <Text style={styles.btnText}>Login</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('SignUp')}
          style={styles.signUpContainer}
        >
          <Text style={styles.noAccountLabel}>
            Don't have an account?{' '}
            <Text style={styles.signUpLabel}>Sign Up</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
    marginTop: 20,

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
  signUpContainer: {
    marginTop: 80,
  },
  noAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signUpLabel: {
    color: '#1d9bf0',
  },
});
