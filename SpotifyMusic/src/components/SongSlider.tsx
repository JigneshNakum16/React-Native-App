import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Slider from '@react-native-community/slider';
import { useProgress } from 'react-native-track-player';
import TrackPlayer from 'react-native-track-player';

const SongSlider = () => {
  const { position, duration } = useProgress();
  const [isSliding, setIsSliding] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSlidingStart = () => {
    setIsSliding(true);
  };

  const handleSlidingComplete = async (value: number) => {
    await TrackPlayer.seekTo(value);
    setIsSliding(false);
  };

  const currentPosition = isSliding ? sliderValue : position;
  const currentDuration = duration || 0;

  return (
    <View style={styles.sliderContainer}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={currentDuration}
        value={currentPosition}
        onSlidingStart={handleSlidingStart}
        onValueChange={setSliderValue}
        onSlidingComplete={handleSlidingComplete}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#404040"
        thumbTintColor="#1DB954"
      />
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{formatTime(currentPosition)}</Text>
        <Text style={styles.time}>
          {currentDuration > 0 ? `-${formatTime(currentDuration - currentPosition)}` : '00:00'}
        </Text>
      </View>
    </View>
  );
};

export default SongSlider;

const styles = StyleSheet.create({
  sliderContainer: {
    width: '90%',
    marginTop: 25,
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  time: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});
