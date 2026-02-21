import { Dimensions } from 'react-native';
import { rsp, rsf, rsr, getProductCardWidth } from '../utils/responsive';

const { width } = Dimensions.get('window');

export const colors = {
  primary: '#6C5CE7',
  primaryLight: '#A29BFE',
  secondary: '#00B894',
  background: '#FFFFFF',
  text: '#2D3436',
  textSecondary: '#636E72',
  border: '#DFE6E9',
  error: '#FF7675',
  warning: '#FDCB6E',
  success: '#00B894',
  cardBackground: '#F8F9FA',
  ratingBackground: '#FDCB6E',
  priceBackground: '#E8F8F5',
  heartColor: '#FF7675',
  tabBarActive: '#6C5CE7',
  tabBarInactive: '#B2BEC3',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 999,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
};

// Responsive helpers
export const useResponsive = () => {
  const rsp = {
    xs: () => (width < 375 ? 4 : width < 414 ? 4 : 6),
    sm: () => (width < 375 ? 8 : width < 414 ? 10 : 12),
    md: () => (width < 375 ? 12 : width < 414 ? 16 : 20),
    lg: () => (width < 375 ? 16 : width < 414 ? 20 : 24),
    xl: () => (width < 375 ? 20 : width < 414 ? 24 : 32),
    xxl: () => (width < 375 ? 24 : width < 414 ? 32 : 40),
  };

  const rsf = {
    xs: () => (width < 375 ? 10 : width < 414 ? 12 : 13),
    sm: () => (width < 375 ? 12 : width < 414 ? 14 : 15),
    md: () => (width < 375 ? 14 : width < 414 ? 16 : 17),
    lg: () => (width < 375 ? 16 : width < 414 ? 18 : 20),
    xl: () => (width < 375 ? 18 : width < 414 ? 20 : 24),
    xxl: () => (width < 375 ? 22 : width < 414 ? 24 : 28),
  };

  const getProductCardWidth = () => {
    if (width >= 768) return '31%'; // Tablet
    if (width < 375) return '48%'; // Small
    return '48%'; // Medium/Large
  };

  const getImageSize = () => {
    if (width >= 768) return 140;
    if (width < 375) return 100;
    return 120;
  };

  return { rsp, rsf, getProductCardWidth, getImageSize };
};
