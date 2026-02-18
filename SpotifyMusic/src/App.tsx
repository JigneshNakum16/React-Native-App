import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import { setupPlayer, addTrack } from '../musicPlayerServices';

export default function App() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function setup() {
    const isSetup = await setupPlayer();
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
    <SafeAreaView>
      <StatusBar />
      <Text style={styles.container}>Spotify Music Player</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
