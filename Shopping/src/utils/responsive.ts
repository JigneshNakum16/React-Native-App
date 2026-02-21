import { Dimensions, Platform } from 'react-native';

// Get device dimensions
const { width, height } = Dimensions.get('window');

// Device type detection
export const isTablet = width >= 768;
export const isSmallDevice = width < 375;
export const isLargeDevice = width >= 414;

// Screen size breakpoints
export const BREAKPOINTS = {
  small: 360,
  medium: 390,
  large: 414,
  tablet: 768,
};

// Get responsive scale factor
export const getScale = (size: number, baseWidth: number = 390) => {
  const scale = width / baseWidth;
  return size * Math.min(Math.max(scale, 0.8), 1.2);
};

// Responsive value based on screen width
export const responsive = (
  small: number,
  medium: number,
  large: number,
  tablet: number = large
) => {
  if (isTablet) return tablet;
  if (width < 375) return small;
  if (width < 414) return medium;
  return large;
};

// Responsive spacing
export const rsp = {
  xs: () => responsive(4, 4, 6, 8),
  sm: () => responsive(8, 10, 12, 16),
  md: () => responsive(12, 16, 20, 24),
  lg: () => responsive(16, 20, 24, 32),
  xl: () => responsive(20, 24, 32, 40),
  xxl: () => responsive(24, 32, 40, 48),
};

// Responsive font size
export const rsf = {
  xs: () => responsive(10, 12, 13, 15),
  sm: () => responsive(12, 14, 15, 17),
  md: () => responsive(14, 16, 17, 19),
  lg: () => responsive(16, 18, 20, 22),
  xl: () => responsive(18, 20, 24, 26),
  xxl: () => responsive(22, 24, 28, 32),
};

// Responsive border radius
export const rsr = {
  sm: () => responsive(4, 6, 8, 10),
  md: () => responsive(8, 10, 12, 16),
  lg: () => responsive(12, 14, 16, 20),
  xl: () => responsive(16, 18, 20, 24),
  round: () => 999,
};

// Number of columns for product grid
export const getNumColumns = () => {
  if (isTablet) return 3;
  if (isSmallDevice) return 2;
  return 2;
};

// Product card width percentage
export const getProductCardWidth = () => {
  if (isTablet) return '31%';
  if (isSmallDevice) return '48%';
  return '48%';
};

// Screen dimensions helper
export const screenHeight = height;
export const screenWidth = width;

// Platform detection
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// Listener for dimension changes
export const useDimensions = () => {
  const [dimensions, setDimensions] = React.useState({
    width,
    height,
    isTablet,
    isSmallDevice,
    isLargeDevice,
  });

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window: { width: newWidth, height: newHeight } }) => {
      setDimensions({
        width: newWidth,
        height: newHeight,
        isTablet: newWidth >= 768,
        isSmallDevice: newWidth < 375,
        isLargeDevice: newWidth >= 414,
      });
    });

    return () => subscription?.remove();
  }, []);

  return dimensions;
};

import React from 'react';
