import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {playbackService} from '../../musicPlayerServices';
import Icons from 'react-native-vector-icons/MaterialIcons';

const ControlCenter = () => {
  const playbackState = usePlaybackState();

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };
  const togglePlayback = async (playback: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icons
          style={styles.icon}
          name="skip-previous"
          size={45}
          color="#000"
        />
      </Pressable>
      <Pressable onPress={() => togglePlayback(playbackState)}>
        {' '}
        <Icons
          style={styles.icon}
          name={playbackState === State.Playing ? 'pause' : 'play-arrow'}
          size={75}
          color="#000"
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icons style={styles.icon} name="skip-next" size={45} color="#000" />
      </Pressable>
    </View>
  );
};

export default ControlCenter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});
