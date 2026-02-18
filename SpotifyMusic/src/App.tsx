import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import { setupPlayer, addTrack } from '../musicPlayerServices';
import MusicPlayer from './screens/MusicPlayer';

export default function App() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function setup() {
    const isSetup = await setupPlayer();
    console.log("isSetup", isSetup);
    if (isSetup) {
      await addTrack();
    }
    setIsPlayerReady(isSetup);
  }
  useEffect(() => {
    setup();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar />
      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
