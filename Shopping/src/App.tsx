/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useCartStore, useWishlistStore } from './store';
import { PRODUCTS_LIST } from './data/contants';
import { colors } from './theme/colors';
import type { Product } from './index';

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

const TabNavigator = () => {
  const cartCount = useCartStore((state) => state.getCartCount());
  const wishlistCount = useWishlistStore((state) => state.getWishlistCount());

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home" color={color} focused={focused} />
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
            fontSize: 10,
            fontWeight: '700',
          },
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="cart" color={color} focused={focused} />
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
            fontSize: 10,
            fontWeight: '700',
          },
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="heart" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="user" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

interface TabIconProps {
  name: string;
  color: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, focused }) => {
  switch (name) {
    case 'home':
      return (
        <View style={styles.iconContainer}>
          <View style={styles.homeIcon}>
            <View style={[styles.homeBase, { borderColor: color }]} />
            <View style={[styles.homeRoof, { borderBottomColor: color }]} />
            <View style={[styles.homeDoor, { backgroundColor: focused ? color : 'transparent' }]} />
          </View>
        </View>
      );
    case 'cart':
      return (
        <View style={styles.iconContainer}>
          <View style={styles.cartIcon}>
            <View style={[styles.cartBody, { borderColor: color }]} />
            <View style={[styles.cartHandle, { borderColor: color }]} />
          </View>
        </View>
      );
    case 'heart':
      return (
        <View style={styles.iconContainer}>
          <View style={styles.heartIcon}>
            <View style={[styles.heartLeftIcon, { backgroundColor: focused ? color : 'transparent', borderColor: color }]} />
            <View style={[styles.heartRightIcon, { backgroundColor: focused ? color : 'transparent', borderColor: color }]} />
          </View>
        </View>
      );
    case 'user':
      return (
        <View style={styles.iconContainer}>
          <View style={styles.userIcon}>
            <View style={[styles.userHead, { backgroundColor: focused ? color : 'transparent', borderColor: color }]} />
            <View style={[styles.userBody, { backgroundColor: focused ? color : 'transparent', borderColor: color }]} />
          </View>
        </View>
      );
    default:
      return null;
  }
};

function App() {
  const { initializeCart } = useCartStore();
  const { initializeWishlist } = useWishlistStore();

  useEffect(() => {
    initializeCart(PRODUCTS_LIST);
    initializeWishlist();
  }, []);

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    width: 20,
    height: 20,
  },
  homeRoof: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopColor: '#000',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginLeft: 0,
  },
  homeBase: {
    width: 20,
    height: 10,
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 0,
  },
  homeDoor: {
    position: 'absolute',
    width: 6,
    height: 6,
    bottom: 0,
    left: 7,
    borderRadius: 3,
    borderWidth: 1,
  },
  cartIcon: {
    width: 22,
    height: 20,
  },
  cartBody: {
    position: 'absolute',
    width: 16,
    height: 12,
    borderRadius: 2,
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    bottom: 0,
    left: 3,
  },
  cartHandle: {
    position: 'absolute',
    width: 8,
    height: 6,
    borderRadius: 3,
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    top: 0,
    right: 2,
  },
  heartIcon: {
    width: 20,
    height: 18,
    flexDirection: 'row',
  },
  heartLeftIcon: {
    width: 10,
    height: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderRightWidth: 0,
  },
  heartRightIcon: {
    width: 10,
    height: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderLeftWidth: 0,
  },
  userIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
  },
  userHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    marginBottom: 2,
  },
  userBody: {
    width: 16,
    height: 8,
    borderRadius: 8,
    borderWidth: 2,
  },
});

export default App;
