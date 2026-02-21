// Jest setup file
import '@testing-library/jest-native/extend-expect';

// Mock react-native modules
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
  show: jest.fn(),
}));

// Mock Dimensions
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn(() => ({ width: 375, height: 812, scale: 3, fontScale: 3 })),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Mock PixelRatio
jest.mock('react-native/Libraries/Utilities/PixelRatio', () => ({
  get: jest.fn(() => 3),
  roundToNearestPixel: jest.fn((val) => val),
  getFontScale: jest.fn(() => 1),
}));

// Suppress warnings
global.__DEV__ = false;
