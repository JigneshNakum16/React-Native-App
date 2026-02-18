import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import { Track } from 'react-native-track-player';

type SongInfoProps = {
  track: Track | null | undefined;
};

const SongInfo = memo(({ track }: SongInfoProps) => {
  const title = track?.title || 'No Track';
  const artist = track?.artist || 'Unknown Artist';
  const album = track?.album || '';

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {artist} {album ? `. ${album}` : ''}
        </Text>
      </View>
    </View>
  );
});

SongInfo.displayName = 'SongInfo';

export default SongInfo;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  name: {
    marginBottom: 8,
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  artist: {
    color: '#d9d9d9',
    textAlign: 'center',
  },
});
