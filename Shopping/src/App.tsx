/**
 * ShopHub - React Native Shopping App
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import BootSplash from 'react-native-bootsplash';
import ErrorBoundary from './components/ErrorBoundary';
import { useCartStore, useWishlistStore } from './store';
import { PRODUCTS_LIST } from './data/contants';
import { colors } from './theme/colors';
import type { Product } from './index';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Screens
import Home from './screens/Home';
import Details from './screens/Details';
import Cart from './screens/Cart';
import Wishlist from './screens/Wishlist';
import Profile from './screens/Profile';

export type RootStackParamList = {
  HomeTab: undefined;
  CartTab: undefined;
  WishlistTab: undefined;
  ProfileTab: undefined;
  Details: { product: Product };
};

const HomeStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
const WishlistStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Details" component={Details} />
    </HomeStack.Navigator>
  );
};

const CartStackNavigator = () => {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CartStack.Screen name="Cart" component={Cart} />
      <CartStack.Screen name="Details" component={Details} />
    </CartStack.Navigator>
  );
};

const WishlistStackNavigator = () => {
  return (
    <WishlistStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <WishlistStack.Screen name="Wishlist" component={Wishlist} />
      <WishlistStack.Screen name="Details" component={Details} />
    </WishlistStack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

interface TabIconProps {
  name: string;
  color: string;
  size: number;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, size }) => {
  const iconMap: Record<string, string> = {
    home: 'home-outline',
    cart: 'cart-outline',
    heart: 'heart-outline',
    user: 'person-outline',
  };

  return <Icon name={iconMap[name] || 'ellipse-outline'} size={size} color={color} />;
};

const TabNavigator = () => {
  const cartCount = useCartStore((state) => state.getCartItemsCount());
  const wishlistCount = useWishlistStore((state) => state.getWishlistCount());

  // Responsive values
  const isSmallDevice = SCREEN_WIDTH < 375;
  const tabBarHeight = isSmallDevice ? 60 : 65;
  const iconSize = isSmallDevice ? 20 : 22;
  const labelFontSize = isSmallDevice ? 11 : 12;
  const badgeFontSize = isSmallDevice ? 9 : 10;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: {
          height: tabBarHeight,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: labelFontSize,
          fontWeight: '600',
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartStackNavigator}
        options={{
          tabBarLabel: 'Cart',
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.error,
            color: colors.background,
            fontSize: badgeFontSize,
            fontWeight: '700',
          },
          tabBarIcon: ({ color }) => (
            <TabIcon name="cart" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="WishlistTab"
        component={WishlistStackNavigator}
        options={{
          tabBarLabel: 'Wishlist',
          tabBarBadge: wishlistCount > 0 ? wishlistCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.error,
            color: colors.background,
            fontSize: badgeFontSize,
            fontWeight: '700',
          },
          tabBarIcon: ({ color }) => (
            <TabIcon name="heart" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <TabIcon name="user" color={color} size={iconSize} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const { initializeCart } = useCartStore();
  const { initializeWishlist } = useWishlistStore();

  useEffect(() => {
    async function prepare() {
      try {
        // Initialize stores
        await initializeCart(PRODUCTS_LIST);
        await initializeWishlist();
      } catch (e) {
        // Silently fail in production, errors will be caught by ErrorBoundary
        if (__DEV__) {
          console.error('Error preparing app:', e);
        }
      } finally {
        setIsAppReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (isAppReady) {
      // Hide the splash screen after app is ready
      const hideTimer = setTimeout(() => {
        BootSplash.hide({ fade: true });
      }, 300);

      return () => clearTimeout(hideTimer);
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <ErrorBoundary>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <TabNavigator />
      </NavigationContainer>
    </ErrorBoundary>
  );
}

export default App;
