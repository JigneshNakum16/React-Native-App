import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'

export type AuthStackParamList = {
    Login : undefined,
    SignUp : undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthStack = () => {
  return (
    <Stack.Navigator 
     screenOptions={{
        headerTitleAlign : 'center',
        headerBackVisible : false
     }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}

export default AuthStack;

