import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TrackPlayer, {
  Track,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {playListData} from '../constants';
import SongInfo from '../components/SongInfo';
import ControlCenter from '../components/ControlCenter';
import SongSlider from '../components/SongSlider';

const {width} = Dimensions.get('window');

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        const playbackTrack = await TrackPlayer.getTrack(event.nextTrack);
        console.log(playbackTrack);
        setTrack(playbackTrack);
        break;

      default:
        break;
    }
  });

  const rendorArtwork = () => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {track?.artwork && (
            <Image style={styles.albumArtImg} source={{uri: track?.artwork}} />
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={playListData}
        renderItem={rendorArtwork}
        keyExtractor={item => item.id.toString()}
      />
      <SongInfo track={track} />
      <SongSlider />
      <ControlCenter />
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    borderRadius: 4,
  },
});
