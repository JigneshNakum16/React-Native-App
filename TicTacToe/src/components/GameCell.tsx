import React, { useRef } from 'react';
import { Pressable, Animated, StyleSheet } from 'react-native';
import Icons from './Icons';

type Props = {
  value: string;
  onPress: () => void;
  highlight?: boolean;
};

const GameCell = ({ value, onPress, highlight }: Props) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };
  return (
    <Pressable
      style={[
        styles.card,
        highlight && value !== 'empty' && styles.highlightCell,
      ]}
      onPress={handlePress}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Icons name={value} />
      </Animated.View>
    </Pressable>
  );
};

export default GameCell;

const styles = StyleSheet.create({
  card: {
    height: 115,
    width: '33.33%',
    borderWidth: 1,
    borderColor: '#2F2F2F',
    backgroundColor: '#121212',

    justifyContent: 'center',
    alignItems: 'center',
  },

  highlightCell: {
    backgroundColor: '#103B2A',
    borderColor: '#2ECC71',
    borderWidth: 2,
  },
});

