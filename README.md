# React Native Apps Monorepo

This repository contains multiple React Native projects managed in a single repository.

## 📚 Official Documentation

- [React Native Official Docs](https://reactnative.dev/)
- [React Native Getting Started](https://reactnative.dev/docs/environment-setup)
- [React Native CLI](https://github.com/react-native-community/cli)
- [React Documentation](https://react.dev/)

## 📁 Project Structure

```
androidApp/
├── demo/                   - React Native demo app with UI components
├── PasswordGenerator/      - React Native password generator app
└── [future projects]/      - Add new React Native projects here
```

---

## 🛠️ Development Environment Setup

### Prerequisites

Before you start, ensure you have the following installed:

#### For All Platforms:
- **Node.js** (v18 or newer) - [Download](https://nodejs.org/)
- **npm** or **Yarn** package manager
- **Git** - [Download](https://git-scm.com/)
- **Watchman** (recommended) - [Download](https://facebook.github.io/watchman/)

#### For Android Development:
- **Java Development Kit (JDK)** - Version 17 or newer
- **Android Studio** - [Download](https://developer.android.com/studio)
- **Android SDK** (included with Android Studio)
- **Android SDK Platform Tools**
- **Android Virtual Device (AVD)** or a physical Android device

#### For iOS Development (macOS only):
- **Xcode** - Version 12 or newer (from Mac App Store)
- **CocoaPods** - Dependency manager for iOS
- **Xcode Command Line Tools**
- **iOS Simulator** (included with Xcode)

---

## 💻 Local Environment Setup

### Step 1: Install Node.js and npm

```bash
# Check if Node.js is installed
node --version

# Check if npm is installed
npm --version

# If not installed, download from https://nodejs.org/
```

### Step 2: Install Watchman (Optional but Recommended)

```bash
# On macOS with Homebrew
brew install watchman

# On Linux
sudo apt-get install watchman
```

### Step 3: Setup Android Development Environment

#### Install Java JDK

```bash
# Check Java version
java -version

# On Ubuntu/Debian
sudo apt update
sudo apt install openjdk-17-jdk

# On macOS with Homebrew
brew install openjdk@17
```

#### Install Android Studio

1. Download Android Studio from [developer.android.com/studio](https://developer.android.com/studio)
2. Install Android Studio
3. During installation, ensure these components are selected:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)

#### Configure Android SDK

1. Open Android Studio
2. Go to **Settings** → **Appearance & Behavior** → **System Settings** → **Android SDK**
3. Select **SDK Platforms** tab and install:
   - Android 13 (Tiramisu) or latest
   - Android SDK Platform 33 or higher
4. Select **SDK Tools** tab and install:
   - Android SDK Build-Tools
   - Android Emulator
   - Android SDK Platform-Tools
   - Intel x86 Emulator Accelerator (HAXM) - for Intel processors

#### Set Environment Variables

Add to your `~/.bashrc`, `~/.zshrc`, or `~/.profile`:

```bash
# Android SDK
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

Apply changes:
```bash
source ~/.bashrc  # or ~/.zshrc
```

Verify:
```bash
echo $ANDROID_HOME
adb --version
```

### Step 4: Setup iOS Development Environment (macOS only)

#### Install Xcode

1. Install Xcode from Mac App Store
2. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```

#### Install CocoaPods

```bash
# Install CocoaPods
sudo gem install cocoapods

# Verify installation
pod --version
```

---

## 🎬 Getting Started - Clone and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/JigneshNakum16/React-Native-App.git
cd React-Native-App
```

### 2. Choose a Project and Install Dependencies

```bash
# For demo project
cd demo
npm install

# For PasswordGenerator project
cd PasswordGenerator
npm install
```

### 3. Install iOS Dependencies (macOS only)

```bash
# Navigate to iOS folder
cd ios

# Install pods
pod install

# Go back to project root
cd ..
```

---

## 🏃 Running Projects

Each project is independent and can be run separately.

### Running on Android

```bash
# Navigate to project directory
cd demo  # or PasswordGenerator

# Start Metro bundler
npm start

# In another terminal, run on Android
npm run android

# OR run directly
npx react-native run-android
```

### Running on iOS (macOS only)

```bash
# Navigate to project directory
cd demo  # or PasswordGenerator

# Start Metro bundler
npm start

# In another terminal, run on iOS
npm run ios

# OR run directly
npx react-native run-ios

# Run on specific iOS simulator
npx react-native run-ios --simulator="iPhone 15 Pro"
```

### Start Metro Bundler Manually

```bash
npm start
# or
npx react-native start

# Clear cache if needed
npm start -- --reset-cache
```

---

## 🆕 Creating a New React Native Project

### Method 1: Using React Native CLI (Recommended)

```bash
# Navigate to the repository root
cd /path/to/React-Native-App

# Create a new React Native project
npx @react-native-community/cli init MyNewApp

# The project will be created as a subdirectory
# Navigate into it
cd MyNewApp

# Install dependencies
npm install

# For iOS, install pods
cd ios && pod install && cd ..

# Run the app
npm run android  # For Android
npm run ios      # For iOS
```

### Method 2: With TypeScript Template

```bash
npx @react-native-community/cli init MyTypeScriptApp --template react-native-template-typescript
```

### After Creating a New Project

```bash
# Stage the new project
git add MyNewApp/

# Commit changes
git commit -m "Add MyNewApp React Native project"

# Push to GitHub
git push origin main
```

---

## 📱 Common React Native Commands

### Development Commands

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run tests
npm test

# Lint code
npm run lint

# Clear Metro bundler cache
npm start -- --reset-cache
```

### React Native CLI Commands

```bash
# Check React Native version
npx react-native --version

# Get device/emulator info
npx react-native info

# Link native dependencies (for RN < 0.60)
npx react-native link

# Log Android device logs
npx react-native log-android

# Log iOS device logs
npx react-native log-ios
```

### Android Specific

```bash
# List Android devices/emulators
adb devices

# Reverse port for Metro bundler
adb reverse tcp:8081 tcp:8081

# Clear app data
adb shell pm clear com.yourapp

# Build APK
cd android
./gradlew assembleRelease

# Build Android App Bundle (AAB)
./gradlew bundleRelease
```

### iOS Specific (macOS only)

```bash
# List available simulators
xcrun simctl list devices

# Clean build
cd ios
xcodebuild clean

# Update pods
pod update

# Deintegrate and reinstall pods
pod deintegrate
pod install
```

### Package Management

```bash
# Install a package
npm install package-name

# Install and save to dependencies
npm install --save package-name

# Install dev dependency
npm install --save-dev package-name

# Remove a package
npm uninstall package-name

# Update packages
npm update

# Check for outdated packages
npm outdated
```

---

## 🔧 Project Configuration

### Metro Configuration

Edit `metro.config.js` in your project root:

```javascript
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

### Babel Configuration

Edit `babel.config.js`:

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
};
```

### TypeScript Configuration

Edit `tsconfig.json`:

```json
{
  "extends": "@react-native/typescript-config/tsconfig.json"
}
```

---

## 🐛 Troubleshooting

### Common Issues

#### Metro Bundler Issues

```bash
# Clear cache and restart
npm start -- --reset-cache

# Clear watchman
watchman watch-del-all

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

#### Android Build Issues

```bash
# Clean Gradle cache
cd android
./gradlew clean

# Clear build folder
rm -rf android/app/build

# Rebuild
./gradlew assembleDebug
```

#### iOS Build Issues

```bash
# Clean iOS build
cd ios
xcodebuild clean

# Reinstall pods
rm -rf Pods Podfile.lock
pod install

# Clean derived data
rm -rf ~/Library/Developer/Xcode/DerivedData
```

#### Port Already in Use

```bash
# Kill process on port 8081
lsof -ti:8081 | xargs kill -9

# Or use React Native CLI
npx react-native start --port 8082
```

#### Android Emulator Not Detected

```bash
# Check connected devices
adb devices

# Restart adb server
adb kill-server
adb start-server
```

---

## 📦 Installing Popular Libraries

### Navigation

```bash
# React Navigation
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack

# For iOS
cd ios && pod install && cd ..
```

### UI Libraries

```bash
# React Native Paper
npm install react-native-paper react-native-vector-icons

# Native Base
npm install native-base

# React Native Elements
npm install @rneui/themed @rneui/base
```

### State Management

```bash
# Redux Toolkit
npm install @reduxjs/toolkit react-redux

# Zustand
npm install zustand

# MobX
npm install mobx mobx-react-lite
```

### Other Useful Libraries

```bash
# Async Storage
npm install @react-native-async-storage/async-storage

# Axios for API calls
npm install axios

# Vector Icons
npm install react-native-vector-icons

# Image Picker
npm install react-native-image-picker
```

---

## 🔐 Git Management

- The parent `.gitignore` handles common React Native ignores for all projects
- Each project maintains its own dependencies (`node_modules`, `package.json`)
- All projects share the same git repository
- No nested git repositories - all projects are tracked by the parent repo

---

## 📝 Development Best Practices

1. **Use TypeScript** for type safety
2. **Follow ESLint rules** - Run `npm run lint` regularly
3. **Write tests** for components and logic
4. **Use meaningful commit messages**
5. **Keep dependencies updated** - Check with `npm outdated`
6. **Use environment variables** for sensitive data
7. **Follow React Native best practices** from official docs

---

## 📖 Learning Resources

- [React Native Tutorial](https://reactnative.dev/docs/tutorial)
- [React Native Express](https://www.reactnative.express/)
- [Awesome React Native](https://github.com/jondot/awesome-react-native)
- [React Native School](https://www.reactnativeschool.com/)

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/YourFeature`)
6. Open a Pull Request

---

## 📄 License

This project is open source and available for educational purposes.
