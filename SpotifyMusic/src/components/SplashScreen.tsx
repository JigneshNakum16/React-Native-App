import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

type SplashScreenProps = {
  onFinish: () => void;
};

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const waveAnim = useRef([
    new Animated.Value(15),
    new Animated.Value(20),
    new Animated.Value(12),
  ]).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Start pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Wave animation
      const waveLoop = () => {
        Animated.parallel([
          Animated.sequence([
            Animated.timing(waveAnim[0], { toValue: 25, duration: 400, useNativeDriver: false }),
            Animated.timing(waveAnim[0], { toValue: 15, duration: 400, useNativeDriver: false }),
          ]),
          Animated.sequence([
            Animated.timing(waveAnim[1], { toValue: 30, duration: 500, useNativeDriver: false }),
            Animated.timing(waveAnim[1], { toValue: 20, duration: 500, useNativeDriver: false }),
          ]),
          Animated.sequence([
            Animated.timing(waveAnim[2], { toValue: 20, duration: 350, useNativeDriver: false }),
            Animated.timing(waveAnim[2], { toValue: 12, duration: 350, useNativeDriver: false }),
          ]),
        ]).start(() => waveLoop());
      };
      waveLoop();
    });

    // Auto finish after 3 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.gradient}>
        <Animated.View
          style={[
            styles.content,
            {
              transform: [
                { scale: scaleAnim },
                { scale: pulseAnim },
              ],
            },
          ]}
        >
          {/* Music Notes Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.noteContainer}>
              <View style={styles.note1} />
              <View style={styles.note2} />
              <View style={styles.note3} />
            </View>
            <View style={styles.waveContainer}>
              <Animated.View style={[styles.wave, { height: waveAnim[0] }]} />
              <Animated.View style={[styles.wave, { height: waveAnim[1] }]} />
              <Animated.View style={[styles.wave, { height: waveAnim[2] }]} />
            </View>
          </View>

          {/* App Name */}
          <Text style={styles.title}>SpotifyMusic</Text>
          <Text style={styles.subtitle}>Music for everyone</Text>

          {/* Loading Dots */}
          <View style={styles.loadingContainer}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    width: width,
    height: height,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 30,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 80,
    width: 120,
    marginBottom: 15,
  },
  note1: {
    width: 35,
    height: 35,
    backgroundColor: '#1DB954',
    borderRadius: 8,
    transform: [{ rotate: '-15deg' }],
    marginRight: 8,
    shadowColor: '#1DB954',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  note2: {
    width: 40,
    height: 50,
    backgroundColor: '#1DB954',
    borderRadius: 8,
    marginRight: 8,
    shadowColor: '#1DB954',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  note3: {
    width: 30,
    height: 40,
    backgroundColor: '#1DB954',
    borderRadius: 6,
    transform: [{ rotate: '10deg' }],
    shadowColor: '#1DB954',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    marginTop: 10,
  },
  wave: {
    width: 6,
    backgroundColor: '#1DB954',
    borderRadius: 3,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 8,
    textShadowColor: '#1DB954',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    letterSpacing: 3,
    marginBottom: 40,
    textTransform: 'uppercase',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1DB954',
    marginHorizontal: 6,
  },
  dotActive: {
    opacity: 1,
  },
  dot2: {
    opacity: 0.5,
  },
  dot3: {
    opacity: 0.2,
  },
});

export default SplashScreen;
