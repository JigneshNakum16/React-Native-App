import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import TrackPlayer from 'react-native-track-player';

export default function App() {
  useEffect(() => {
    const setup = async () => {
      await TrackPlayer.setupPlayer();
    };
    setup();
  }, []);

  const play = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: '1',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      title: 'Demo Song',
      artist: 'Artist',
    });
    await TrackPlayer.play();
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Play" onPress={play} />
    </View>
  );
}
