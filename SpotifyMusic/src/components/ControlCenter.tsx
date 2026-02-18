import { Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import TrackPlayer, { State, usePlaybackState, RepeatMode } from 'react-native-track-player';
import Icons from 'react-native-vector-icons/MaterialIcons';

type RepeatModeType = 'off' | 'track' | 'queue';

const ControlCenter = () => {
  const playbackState = usePlaybackState();
  const [repeatMode, setRepeatMode] = useState<RepeatModeType>('queue');
  const [isShuffle, setIsShuffle] = useState(false);

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const togglePlayback = async (state: State) => {
    if (state === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const toggleRepeat = async () => {
    const modes: RepeatModeType[] = ['off', 'queue', 'track'];
    const currentModeIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentModeIndex + 1) % modes.length];
    setRepeatMode(nextMode);

    let trackPlayerMode: RepeatMode;
    switch (nextMode) {
      case 'off':
        trackPlayerMode = RepeatMode.Off;
        break;
      case 'track':
        trackPlayerMode = RepeatMode.Track;
        break;
      case 'queue':
      default:
        trackPlayerMode = RepeatMode.Queue;
        break;
    }
    await TrackPlayer.setRepeatMode(trackPlayerMode);
  };

  const toggleShuffle = async () => {
    const newShuffleState = !isShuffle;
    setIsShuffle(newShuffleState);
    await TrackPlayer.setRepeatMode(newShuffleState ? RepeatMode.Off : RepeatMode.Queue);
  };

  const getRepeatIconName = () => {
    switch (repeatMode) {
      case 'off':
        return 'repeat';
      case 'track':
        return 'repeat-one';
      case 'queue':
        return 'repeat';
      default:
        return 'repeat';
    }
  };

  return (
    <View style={styles.container}>
      {/* Repeat & Shuffle Controls */}
      <View style={styles.secondaryControls}>
        <Pressable onPress={toggleRepeat} style={styles.secondaryButton}>
          <Icons
            name={getRepeatIconName()}
            size={24}
            color={repeatMode === 'off' ? '#888' : '#1DB954'}
          />
        </Pressable>
        <Pressable onPress={toggleShuffle} style={styles.secondaryButton}>
          <Icons
            name="shuffle"
            size={24}
            color={isShuffle ? '#1DB954' : '#888'}
          />
        </Pressable>
      </View>

      {/* Main Playback Controls */}
      <View style={styles.mainControls}>
        <Pressable onPress={skipToPrevious} style={styles.controlButton}>
          <Icons name="skip-previous" size={45} color="#FFFFFF" />
        </Pressable>

        <Pressable
          onPress={() => togglePlayback(playbackState)}
          style={styles.playButton}
        >
          <Icons
            name={playbackState === State.Playing ? 'pause-circle-filled' : 'play-circle-filled'}
            size={75}
            color="#1DB954"
          />
        </Pressable>

        <Pressable onPress={skipToNext} style={styles.controlButton}>
          <Icons name="skip-next" size={45} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
};

export default ControlCenter;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  secondaryControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 16,
  },
  secondaryButton: {
    padding: 8,
  },
  mainControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  controlButton: {
    padding: 8,
  },
  playButton: {
    marginHorizontal: 24,
  },
});
