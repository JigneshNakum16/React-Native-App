import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { setupPlayer, addTrack } from '../musicPlayerServices';
import MusicPlayer from './screens/MusicPlayer';

type SetupStatus = 'loading' | 'success' | 'error';

export default function App() {
  const [setupStatus, setSetupStatus] = useState<SetupStatus>('loading');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const setup = useCallback(async () => {
    try {
      const isSetup = await setupPlayer();
      if (isSetup) {
        await addTrack();
        setSetupStatus('success');
      } else {
        setSetupStatus('error');
        setErrorMsg('Failed to initialize player');
      }
    } catch (error) {
      setSetupStatus('error');
      setErrorMsg(error instanceof Error ? error.message : 'Unknown error occurred');
      console.error('Player setup error:', error);
    }
  }, []);

  useEffect(() => {
    setup();
  }, [setup]);

  if (setupStatus === 'loading') {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={styles.loadingText}>Loading Music Player...</Text>
      </SafeAreaView>
    );
  }

  if (setupStatus === 'error') {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.errorTitle}>Oops!</Text>
        <Text style={styles.errorMessage}>{errorMsg || 'Something went wrong'}</Text>
        <Text style={styles.errorHint}>Please restart the app</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#001d23" />
      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001d23',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001d23',
  },
  loadingText: {
    marginTop: 16,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001d23',
    padding: 24,
  },
  errorTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  errorMessage: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorHint: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});
