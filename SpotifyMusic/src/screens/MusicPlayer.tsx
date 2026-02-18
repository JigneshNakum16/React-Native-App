import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import TrackPlayer, {
  Track,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { playListData } from '../constants';
import SongInfo from '../components/SongInfo';
import ControlCenter from '../components/ControlCenter';
import SongSlider from '../components/SongSlider';

const { width } = Dimensions.get('window');

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  // Load initial track on mount
  useEffect(() => {
    const loadInitialTrack = async () => {
      try {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack !== null) {
          const trackData = await TrackPlayer.getTrack(currentTrack);
          setTrack(trackData);
          setCurrentTrackIndex(currentTrack);
          scrollToIndex(currentTrack);
        }
      } catch (error) {
        console.error('Error loading initial track:', error);
      }
    };
    loadInitialTrack();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== undefined) {
      try {
        const playbackTrack = await TrackPlayer.getTrack(event.nextTrack);
        setTrack(playbackTrack);
        setCurrentTrackIndex(event.nextTrack);
        scrollToIndex(event.nextTrack);
      } catch (error) {
        console.error('Error loading track:', error);
      }
    }
  });

  const scrollToIndex = (index: number) => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }, 100);
  };

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    if (index >= 0 && index < playListData.length && index !== currentTrackIndex) {
      TrackPlayer.skip(index);
    }
  };

  const renderArtwork = ({ item }: { item: Track }) => {
    const isCurrentTrack = item.id === currentTrackIndex + 1; // Track IDs are 1-based
    return (
      <View style={[styles.listArtWrapper, isCurrentTrack && styles.currentTrackWrapper]}>
        <View style={styles.albumContainer}>
          {item.artwork && (
            <Image
              style={[styles.albumArtImg, isCurrentTrack && styles.currentArtwork]}
              source={{ uri: item.artwork }}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        data={playListData}
        renderItem={renderArtwork}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
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
    opacity: 0.5,
  },
  currentTrackWrapper: {
    opacity: 1,
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    width: 300,
    borderRadius: 4,
  },
  currentArtwork: {
    borderWidth: 2,
    borderColor: '#1DB954',
  },
});
