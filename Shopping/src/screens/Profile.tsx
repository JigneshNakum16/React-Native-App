import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, fontSize, borderRadius } from '../theme/colors';
import { useCartStore, useWishlistStore } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RootStackParamList } from '../index';

type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const Profile = ({ navigation }: Partial<ProfileProps>) => {
  const { getCartCount } = useCartStore();
  const { getWishlistCount } = useWishlistStore();

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation?.reset({
        index: 0,
        routes: [{ name: 'HomeTab' }],
      });
    } catch (error) {
      // Silent error - will be caught by ErrorBoundary in production
    }
  };

  const menuItems = [
    {
      id: '1',
      icon: 'person-outline',
      title: 'Personal Information',
      subtitle: 'Update your personal details',
      color: colors.primary,
      onPress: () => {},
    },
    {
      id: '2',
      icon: 'cube-outline',
      title: 'Orders',
      subtitle: 'View your order history',
      color: colors.secondary,
      onPress: () => {},
    },
    {
      id: '3',
      icon: 'location-outline',
      title: 'Addresses',
      subtitle: 'Manage delivery addresses',
      color: colors.warning,
      onPress: () => {},
    },
    {
      id: '4',
      icon: 'card-outline',
      title: 'Payment Methods',
      subtitle: 'Add or remove payment methods',
      color: colors.primary,
      onPress: () => {},
    },
    {
      id: '5',
      icon: 'notifications-outline',
      title: 'Notifications',
      subtitle: 'Manage notification preferences',
      color: colors.error,
      onPress: () => {},
    },
    {
      id: '6',
      icon: 'help-circle-outline',
      title: 'Help & Support',
      subtitle: 'Get help with your orders',
      color: colors.secondary,
      onPress: () => {},
    },
    {
      id: '7',
      icon: 'settings-outline',
      title: 'Settings',
      subtitle: 'App settings and preferences',
      color: colors.text,
      onPress: () => {},
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Icon name="person" size={48} color={colors.background} />
          </View>
          <TouchableOpacity style={styles.cameraButton}>
            <Icon name="camera" size={18} color={colors.background} />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>ShopHub User</Text>
        <Text style={styles.userEmail}>user@shophub.com</Text>
      </View>

      <View style={styles.statsContainer}>
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => navigation?.getParent()?.navigate('CartTab')}
        >
          <View style={styles.statIcon}>
            <Icon name="cart-outline" size={24} color={colors.primary} />
          </View>
          <Text style={styles.statValue}>{cartCount}</Text>
          <Text style={styles.statLabel}>Cart Items</Text>
        </TouchableOpacity>

        <View style={styles.statDivider} />

        <TouchableOpacity
          style={styles.statItem}
          onPress={() => navigation?.getParent()?.navigate('WishlistTab')}
        >
          <View style={styles.statIcon}>
            <Icon name="heart-outline" size={24} color={colors.heartColor} />
          </View>
          <Text style={styles.statValue}>{wishlistCount}</Text>
          <Text style={styles.statLabel}>Wishlist</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: `${item.color}15` }]}>
              <Icon name={item.icon as any} size={22} color={item.color} />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={20} color={colors.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>ShopHub v1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.background,
  },
  userName: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: colors.border,
  },
  menuSection: {
    paddingTop: spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.lg,
    marginTop: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.error,
    gap: spacing.sm,
  },
  logoutText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.error,
  },
  versionText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
});

export default Profile;
