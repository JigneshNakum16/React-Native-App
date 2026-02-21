# ShopHub - React Native E-Commerce App

A production-ready e-commerce shopping application built with React Native.

## Features

- Product browsing with categories and search
- Shopping cart with quantity management
- Wishlist functionality
- Cash on Delivery checkout
- Responsive design for all device sizes
- Splash screen with custom branding
- Vector icons throughout the app
- State persistence with AsyncStorage
- Error boundary for production stability

## Tech Stack

- **React Native** 0.84.0
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Zustand** for state management
- **AsyncStorage** for data persistence
- **react-native-vector-icons** for icons
- **react-native-bootsplash** for splash screen

## Project Structure

```
src/
├── components/       # Reusable UI components
├── screens/          # Screen components
├── store/            # Zustand state management
├── theme/            # App theme and styling
├── utils/            # Utility functions
├── services/         # API service structure
├── constants/        # App constants
└── data/             # Mock data
```

## Getting Started

### Installation

```bash
npm install
```

### iOS Setup

1. Install CocoaPods dependencies:
```bash
cd ios && pod install
```

2. Run the app:
```bash
npm run ios
```

### Android Setup

1. Run the app:
```bash
npm run android
```

## Development

### Run Linter

```bash
npm run lint
```

### Run Tests

```bash
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## Production Build

### Android

1. Generate a production keystore:
```bash
keytool -genkeypair -v -keystore shophub-release.keystore -alias shophub-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Update `android/app/build.gradle` with your keystore credentials

3. Build the release APK:
```bash
cd android
./gradlew assembleRelease
```

The APK will be at `android/app/build/outputs/apk/release/app-release.apk`

### iOS

1. Update the bundle identifier in Xcode
2. Update signing certificates
3. Archive and distribute through Xcode

## Security Considerations

- All user inputs are validated before processing
- XSS protection through input sanitization
- No sensitive data logged in production
- ProGuard/R8 enabled for Android release builds
- Error boundaries prevent app crashes

## Accessibility

The app follows WCAG guidelines for mobile accessibility:
- Screen reader support with proper labels
- Semantic roles for interactive elements
- Accessibility hints for complex interactions
- Minimum touch target size (44x44 points)

## Performance Optimizations

- Responsive design adapts to screen size
- Lazy loading for product images
- Optimized bundle size with ProGuard
- Memoized components for re-render prevention

## TODO for Full Production

- [ ] Backend API integration
- [ ] User authentication
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] Crash reporting (Sentry/Crashlytics)
- [ ] Analytics tracking
- [ ] More comprehensive test coverage
- [ ] CI/CD pipeline setup

## License

MIT
