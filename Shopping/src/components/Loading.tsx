import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../theme/colors';

interface LoadingProps {
  size?: 'small' | 'large';
  message?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'large',
  message,
  fullScreen = false,
}) => {
  const content = (
    <View style={fullScreen ? styles.fullScreenContainer : styles.container}>
      <ActivityIndicator
        size={size}
        color={colors.primary}
        style={styles.spinner}
      />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );

  return content;
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  spinner: {
    marginBottom: spacing.md,
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default Loading;
