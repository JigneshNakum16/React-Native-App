import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Color Palette
export const Colors = {
  // Primary colors
  primary: '#f02e65',
  primaryDark: '#c91f4a',
  primaryLight: '#ff5c8a',

  // Secondary colors
  secondary: '#1d9bf0',
  secondaryDark: '#157dc2',
  secondaryLight: '#5cb8ff',

  // Neutral colors
  text: '#1a1a1a',
  textSecondary: '#666666',
  textLight: '#999999',
  white: '#ffffff',
  black: '#000000',

  // Background colors
  background: '#ffffff',
  backgroundSecondary: '#f8f9fa',
  backgroundDark: '#0B0D32',

  // Input colors
  inputBackground: '#fef8fa',
  inputBorder: '#e0e0e0',
  inputFocused: '#f02e65',

  // Status colors
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',

  // Shadow
  shadow: 'rgba(0, 0, 0, 0.1)',
};

// Typography
export const Typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 40,
  },

  // Font weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
};

// Border Radius
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Shadows
export const Shadows = {
  small: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
};

// Common Styles
export const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    fontSize: Typography.fontSize.huge,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    textAlign: 'center',
  },
  subheader: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
  },
  text: {
    fontSize: Typography.fontSize.md,
    color: Colors.text,
  },
  textSecondary: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  errorText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.error,
  },
  successText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.success,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.medium,
  },
});

// Screen Dimensions
export const ScreenDimensions = {
  width,
  height,
  isSmallDevice: width < 375,
  isMediumDevice: width >= 375 && width < 768,
  isLargeDevice: width >= 768,
};

// Animation Durations
export const AnimationDuration = {
  fast: 150,
  normal: 300,
  slow: 500,
};
