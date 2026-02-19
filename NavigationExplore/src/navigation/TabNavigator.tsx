import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '../types/navigation';
import {HomeScreen} from '../screens/HomeScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {CartScreen} from '../screens/CartScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {useCart} from '../contexts/CartContext';
import {COLORS} from '../constants/colors';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const TabNavigator = () => {
  const {getTotalItems} = useCart();
  const cartItems = getTotalItems();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused}) => (
            <TabIcon icon="🏠" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, focused}) => (
            <TabIcon icon="🔍" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color, focused}) => (
            <TabIcon
              icon="🛒"
              color={color}
              focused={focused}
              badge={cartItems > 0 ? cartItems : undefined}
            />
          ),
          tabBarBadge: cartItems > 0 ? cartItems : undefined,
          tabBarBadgeStyle: {
            backgroundColor: COLORS.secondary,
            fontSize: 10,
            fontWeight: '700',
          },
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, focused}) => (
            <TabIcon icon="👤" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const TabIcon = ({
  icon,
  focused,
  badge,
}: {
  icon: string;
  focused: boolean;
  badge?: number;
}) => {
  return (
    <View style={styles.iconContainer}>
      <Text style={[styles.icon, focused && styles.iconFocused]}>{icon}</Text>
    </View>
  );
};

const styles = {
  iconContainer: {
    position: 'relative' as const,
  },
  icon: {
    fontSize: 24,
  },
  iconFocused: {
    transform: [{scale: 1.1}],
  },
};
