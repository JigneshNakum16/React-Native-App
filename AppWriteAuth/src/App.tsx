/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppwriteProvider } from './appwrite/AppwriteContext';
import Router from './routes/Router';

function App() {
  return (
    <SafeAreaProvider>
      <AppwriteProvider>
        <StatusBar barStyle="dark-content" />
        <Router />
      </AppwriteProvider>
    </SafeAreaProvider>
  );
}

export default App;
