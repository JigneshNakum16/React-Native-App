# App Icon & Splash Screen Setup Guide

## ✅ What's Already Configured

1. **Splash Screen** - A beautiful loading screen that shows when the app launches
2. **Splash Screen Libraries** - Installed and configured
3. **Android Integration** - MainActivity updated to show splash screen

---

## 🎨 How to Add Custom App Icons

### Step 1: Prepare Your Icon Image

1. Create or download an app icon (PNG format recommended)
2. Your icon should be:
   - **Square** (1024x1024px recommended)
   - **Simple design** - looks good when small
   - **No transparency** for Android adaptive icons

### Step 2: Generate Icon Sizes

Use one of these online tools to generate all required sizes:

- **[AppIcon.co](https://www.appicon.co/)** (Recommended)
- **[MakeAppIcon.com](https://makeappicon.com/)**
- **[Icon Kitchen](https://icon.kitchen/)**

**How to use:**
1. Upload your 1024x1024px icon
2. Select "Android" and "iOS"
3. Download the generated files

### Step 3: Replace Android Icons

Navigate to: `PasswordGenerator/android/app/src/main/res/`

Replace icons in these folders:
```
mipmap-hdpi/ic_launcher.png       (72x72px)
mipmap-mdpi/ic_launcher.png       (48x48px)
mipmap-xhdpi/ic_launcher.png      (96x96px)
mipmap-xxhdpi/ic_launcher.png     (144x144px)
mipmap-xxxhdpi/ic_launcher.png    (192x192px)
```

Also replace round icons:
```
mipmap-hdpi/ic_launcher_round.png
mipmap-mdpi/ic_launcher_round.png
mipmap-xhdpi/ic_launcher_round.png
mipmap-xxhdpi/ic_launcher_round.png
mipmap-xxxhdpi/ic_launcher_round.png
```

### Step 4: Replace iOS Icons (macOS only)

Navigate to: `PasswordGenerator/ios/PasswordGenerator/Images.xcassets/AppIcon.appiconset/`

Replace all icon files according to the `Contents.json` specifications.

---

## 🎯 Customizing the Splash Screen

### Change Splash Screen Colors

Edit: `PasswordGenerator/android/app/src/main/res/layout/launch_screen.xml`

```xml
<!-- Background color -->
android:background="#1a1a2e"  <!-- Change this hex color -->

<!-- Title text color -->
android:textColor="#e94560"   <!-- Change this hex color -->

<!-- Subtitle text color -->
android:textColor="#95a5a6"   <!-- Change this hex color -->
```

### Change Splash Screen Text

In the same file, edit:
```xml
<TextView
    android:text="PASSWORD GENERATOR"  <!-- Change app name -->
    ...
/>

<TextView
    android:text="Create strong &amp; secure passwords"  <!-- Change subtitle -->
    ...
/>
```

### Adjust Splash Screen Duration

Edit: `PasswordGenerator/App.tsx`

```typescript
setTimeout(() => {
  SplashScreen.hide();
}, 1500);  // Change milliseconds (1500 = 1.5 seconds)
```

---

## 🚀 Testing Your Changes

### Android

```bash
cd PasswordGenerator

# Clean build
cd android
./gradlew clean
cd ..

# Run the app
npm run android
```

### iOS (macOS only)

```bash
cd PasswordGenerator

# Reinstall pods
cd ios
pod install
cd ..

# Run the app
npm run ios
```

---

## 📋 Quick Icon Design Tips

### Good App Icons:
- ✅ Simple and memorable
- ✅ Single focal point
- ✅ Works well at small sizes
- ✅ Unique and recognizable
- ✅ Matches your brand colors

### For Password Generator:
Consider using:
- 🔐 Lock symbol
- 🔑 Key icon
- 🛡️ Shield icon
- 🔒 Padlock
- Or abstract geometric shapes in your app colors (#e94560 pink/red and #533483 purple)

---

## 🎨 Example Icon Colors from Your App

Your app uses these colors - consider them for your icon:

- **Primary**: `#e94560` (Pink/Red)
- **Secondary**: `#533483` (Purple)
- **Background**: `#1a1a2e` (Dark Navy)
- **Accent**: `#0f3460` (Medium Blue)

---

## 🛠️ Troubleshooting

### Icons not updating?
```bash
# Android
cd android
./gradlew clean
cd ..
npm run android
```

### Splash screen not showing?
1. Check if `react-native-splash-screen` is installed
2. Verify `MainActivity.kt` has splash screen code
3. Check `launch_screen.xml` exists in `res/layout/`

### App crashes on launch?
1. Check Android logs: `npx react-native log-android`
2. Rebuild: `cd android && ./gradlew clean && cd .. && npm run android`

---

## 📱 Current Setup Summary

✅ **Splash Screen**: Shows for 1.5 seconds with app branding
✅ **Dark Theme**: Matches your app's color scheme (#1a1a2e)
✅ **App Name**: "PASSWORD GENERATOR"
✅ **Tagline**: "Create strong & secure passwords"
✅ **Auto-hide**: Automatically closes after loading

---

## 🔗 Helpful Resources

- [React Native App Icon Guide](https://reactnative.dev/docs/platform-specific-code#android)
- [Android Icon Design](https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive)
- [iOS Icon Design](https://developer.apple.com/design/human-interface-guidelines/app-icons)
- [Free Icon Generators](https://appicon.co/)
