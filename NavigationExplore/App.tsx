/**
 * React Native Navigation Explorer App
 * A comprehensive learning app demonstrating React Native features
 * including navigation, UI components, state management, and animations.
 *
 * @format
 */

import React from 'react';
import {StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CartProvider} from './src/contexts/CartContext';
import {TabNavigator} from './src/navigation/TabNavigator';
import {DetailsScreen} from './src/screens/DetailsScreen';
import {RootStackParamList} from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              headerShown: true,
              headerBackTitle: 'Back',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

export default App;
