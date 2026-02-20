import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize } from '../theme/colors';

interface BadgeProps {
  count: number;
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  textColor?: string;
  maxCount?: number;
}

const Badge: React.FC<BadgeProps> = ({
  count,
  size = 'medium',
  backgroundColor = colors.error,
  textColor = colors.background,
  maxCount = 99,
}) => {
  if (count === 0) {
    return null;
  }

  const displayCount = count > maxCount ? `${maxCount}+` : count;

  const sizeStyles = {
    small: {
      container: {
        minWidth: 16,
        height: 16,
        paddingHorizontal: 3,
        borderRadius: 8,
      },
      text: {
        fontSize: 9,
        lineHeight: 10,
      },
    },
    medium: {
      container: {
        minWidth: 20,
        height: 20,
        paddingHorizontal: 5,
        borderRadius: 10,
      },
      text: {
        fontSize: 11,
        lineHeight: 12,
      },
    },
    large: {
      container: {
        minWidth: 24,
        height: 24,
        paddingHorizontal: 6,
        borderRadius: 12,
      },
      text: {
        fontSize: 13,
        lineHeight: 14,
      },
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <View
      style={[
        styles.container,
        currentSize.container,
        { backgroundColor },
      ]}
    >
      <Text
        style={[
          styles.text,
          currentSize.text,
          { color: textColor },
        ]}
      >
        {displayCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default Badge;
