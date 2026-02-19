# NavigationExplore - React Native Learning App

A comprehensive React Native application demonstrating advanced navigation patterns, UI components, and state management.

## Features Demonstrated

### Navigation
- **Stack Navigation** - NativeStackNavigator with screen transitions
- **Tab Navigation** - Bottom tabs with badges and icons
- **Drawer Navigation** - Side drawer with custom content
- **Nested Navigation** - Drawer containing Tabs containing Stack
- **Navigation Props** - Passing params between screens
- **Navigation Methods** - navigate, push, goBack, popToTop

### UI Components
- **FlatList** - Efficient list rendering with product cards
- **ScrollView** - Scrollable content areas
- **TextInput** - Search input with validation
- **TouchableOpacity** - Touch feedback
- **Pressable** - Modern touch handling
- **Modal** - Full-screen and sheet modals
- **Switch** - Toggle settings
- **Animated** - Gesture-based bottom sheet

### State Management
- **Context API** - Cart state management
- **useState** - Component-level state
- **useRef** - Animated values
- **useEffect** - Side effects

### Gestures & Animations
- **react-native-gesture-handler** - Pan gestures
- **react-native-reanimated** - Smooth animations
- **Gesture Detector** - Bottom sheet drag behavior

### Components Created
- `ProductCard` - Reusable product display
- `CustomHeader` - Styled header component
- `ModalExample` - Feedback modal
- `BottomSheet` - Draggable bottom sheet

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── BottomSheet.tsx
│   ├── CustomHeader.tsx
│   ├── ModalExample.tsx
│   └── ProductCard.tsx
├── constants/          # App constants
│   ├── colors.ts
│   └── products.ts
├── contexts/           # Context providers
│   └── CartContext.tsx
├── navigation/         # Navigation configuration
│   ├── DrawerNavigator.tsx
│   └── TabNavigator.tsx
├── screens/            # Screen components
│   ├── AboutScreen.tsx
│   ├── CartScreen.tsx
│   ├── DetailsScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ProfileScreen.tsx
│   └── SearchScreen.tsx
└── types/              # TypeScript definitions
    ├── navigation.ts
    └── product.ts
```

## Installation

```bash
npm install
```

## Running the App

```bash
# iOS
npm run ios

# Android
npm run android

# Start Metro
npm start
```

## Dependencies

- `react-native` - Core framework
- `@react-navigation/native` - Navigation base
- `@react-navigation/native-stack` - Stack navigation
- `@react-navigation/bottom-tabs` - Tab navigation
- `@react-navigation/drawer` - Drawer navigation
- `react-native-gesture-handler` - Gesture handling
- `react-native-reanimated` - Animations
- `react-native-safe-area-context` - Safe area handling
- `react-native-screens` - Optimized navigation
