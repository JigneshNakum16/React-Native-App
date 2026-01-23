/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
//       <NewAppScreen
//         templateFileName="App.tsx"
//         safeAreaInsets={safeAreaInsets}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;

import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = isDarkMode
    ? styles.backgroundDark
    : styles.backgroundLight;

  const textStyle = isDarkMode ? styles.textDark : styles.textLight;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, backgroundStyle]} edges={['top', 'bottom']}>
        <View>
          <Text style={textStyle}>
            Hello React Native 👋
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundLight: {
    backgroundColor: '#ffffff',
  },
  backgroundDark: {
    backgroundColor: '#000000',
  },
  textLight: {
    fontSize: 18,
    color: '#000000',
  },
  textDark: {
    fontSize: 18,
    color: '#ffffff',
  },
});