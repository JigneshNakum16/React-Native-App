import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, fontSize, borderRadius } from '../theme/colors';
import { useCartStore, useWishlistStore } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProfileProps = NativeStackScreenProps<any, 'Profile'>;

const Profile = ({ navigation }: ProfileProps) => {
  const { getCartCount } = useCartStore();
  const { getWishlistCount } = useWishlistStore();

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      // In a real app, you would navigate to login screen
      console.log('Logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const menuItems = [
    {
      id: '1',
      icon: 'user',
      title: 'Personal Information',
      subtitle: 'Update your personal details',
      onPress: () => console.log('Personal Info'),
    },
    {
      id: '2',
      icon: 'box',
      title: 'Orders',
      subtitle: 'View your order history',
      onPress: () => console.log('Orders'),
    },
    {
      id: '3',
      icon: 'map-pin',
      title: 'Addresses',
      subtitle: 'Manage delivery addresses',
      onPress: () => console.log('Addresses'),
    },
    {
      id: '4',
      icon: 'credit-card',
      title: 'Payment Methods',
      subtitle: 'Add or remove payment methods',
      onPress: () => console.log('Payment Methods'),
    },
    {
      id: '5',
      icon: 'bell',
      title: 'Notifications',
      subtitle: 'Manage notification preferences',
      onPress: () => console.log('Notifications'),
    },
    {
      id: '6',
      icon: 'help-circle',
      title: 'Help & Support',
      subtitle: 'Get help with your orders',
      onPress: () => console.log('Help'),
    },
    {
      id: '7',
      icon: 'settings',
      title: 'Settings',
      subtitle: 'App settings and preferences',
      onPress: () => console.log('Settings'),
    },
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'user':
        return (
          <View style={styles.iconUser}>
            <View style={styles.iconUserHead} />
            <View style={styles.iconUserBody} />
          </View>
        );
      case 'box':
        return (
          <View style={styles.iconBox}>
            <View style={styles.iconBoxFront} />
            <View style={styles.iconBoxBack} />
          </View>
        );
      case 'map-pin':
        return (
          <View style={styles.iconMapPin}>
            <View style={styles.iconPinHead} />
            <View style={styles.iconPinPoint} />
          </View>
        );
      case 'credit-card':
        return (
          <View style={styles.iconCreditCard}>
            <View style={styles.iconCardChip} />
            <View style={styles.iconCardLine} />
          </View>
        );
      case 'bell':
        return (
          <View style={styles.iconBell}>
            <View style={styles.iconBellTop} />
            <View style={styles.iconBellBottom} />
          </View>
        );
      case 'help-circle':
        return (
          <View style={styles.iconHelp}>
            <View style={styles.iconHelpCircle}>
              <Text style={styles.iconHelpText}>?</Text>
            </View>
          </View>
        );
      case 'settings':
        return (
          <View style={styles.iconSettings}>
            <View style={styles.iconSettingsDot} />
            <View style={styles.iconSettingsDot} />
            <View style={styles.iconSettingsDot} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>
          <TouchableOpacity style={styles.cameraButton}>
            <View style={styles.cameraIcon}>
              <View style={styles.cameraLens} />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>User Name</Text>
        <Text style={styles.userEmail}>user@example.com</Text>
      </View>

      <View style={styles.statsContainer}>
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => (navigation as any).navigate('CartTab')}
        >
          <View style={styles.statIcon}>
            <View style={styles.cartIcon}>
              <View style={styles.cartIconBody} />
              <View style={styles.cartIconHandle} />
            </View>
          </View>
          <Text style={styles.statValue}>{cartCount}</Text>
          <Text style={styles.statLabel}>Cart Items</Text>
        </TouchableOpacity>

        <View style={styles.statDivider} />

        <TouchableOpacity
          style={styles.statItem}
          onPress={() => (navigation as any).navigate('WishlistTab')}
        >
          <View style={styles.statIcon}>
            <View style={styles.wishlistIcon}>
              <View style={styles.wishlistLeft} />
              <View style={styles.wishlistRight} />
            </View>
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
            <View style={styles.menuIconContainer}>
              {renderIcon(item.icon)}
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <View style={styles.menuArrow}>
              <View style={styles.arrowLine} />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <View style={styles.logoutIcon}>
          <View style={styles.logoutLine1} />
          <View style={styles.logoutLine2} />
        </View>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Version 1.0.0</Text>
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
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.background,
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
  },
  cameraIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraLens: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.background,
  },
  userName: {
    fontSize: fontSize.xl,
    fontWeight: '600',
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  cartIcon: {
    width: 24,
    height: 24,
  },
  cartIconBody: {
    width: 20,
    height: 14,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: colors.text,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  cartIconHandle: {
    width: 10,
    height: 6,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: colors.text,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    marginLeft: 8,
    marginTop: -2,
  },
  wishlistIcon: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  wishlistLeft: {
    position: 'absolute',
    width: 12,
    height: 18,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.heartColor,
    borderRadius: 12,
    left: 0,
    top: 3,
  },
  wishlistRight: {
    position: 'absolute',
    width: 12,
    height: 18,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.heartColor,
    borderRadius: 12,
    right: 0,
    top: 3,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: fontSize.md,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  menuArrow: {
    width: 8,
    height: 14,
  },
  arrowLine: {
    width: 10,
    height: 2,
    backgroundColor: colors.textSecondary,
    borderRadius: 1,
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
  },
  logoutIcon: {
    width: 20,
    height: 20,
    marginRight: spacing.sm,
    position: 'relative',
  },
  logoutLine1: {
    position: 'absolute',
    width: 20,
    height: 2,
    backgroundColor: colors.error,
    top: 9,
    transform: [{ rotate: '45deg' }],
  },
  logoutLine2: {
    position: 'absolute',
    width: 20,
    height: 2,
    backgroundColor: colors.error,
    top: 9,
    transform: [{ rotate: '-45deg' }],
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
  // Custom icons
  iconUser: {
    width: 20,
    height: 20,
  },
  iconUserHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    alignSelf: 'center',
  },
  iconUserBody: {
    width: 16,
    height: 8,
    borderRadius: 8,
    backgroundColor: colors.primary,
    marginTop: 2,
    alignSelf: 'center',
  },
  iconBox: {
    width: 20,
    height: 20,
  },
  iconBoxFront: {
    position: 'absolute',
    width: 14,
    height: 12,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: colors.secondary,
    bottom: 0,
    left: 0,
  },
  iconBoxBack: {
    position: 'absolute',
    width: 14,
    height: 12,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: colors.secondary,
    top: 0,
    right: 0,
    opacity: 0.6,
  },
  iconMapPin: {
    width: 20,
    height: 20,
  },
  iconPinHead: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    alignSelf: 'center',
  },
  iconPinPoint: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginTop: 2,
  },
  iconCreditCard: {
    width: 24,
    height: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.warning,
  },
  iconCardChip: {
    position: 'absolute',
    width: 8,
    height: 6,
    backgroundColor: colors.warning,
    top: 4,
    left: 4,
    borderRadius: 2,
  },
  iconCardLine: {
    position: 'absolute',
    width: 10,
    height: 2,
    backgroundColor: colors.warning,
    bottom: 4,
    right: 4,
  },
  iconBell: {
    width: 20,
    height: 20,
  },
  iconBellTop: {
    width: 12,
    height: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: colors.text,
    alignSelf: 'center',
  },
  iconBellBottom: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.text,
    alignSelf: 'center',
  },
  iconHelp: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconHelpCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconHelpText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  iconSettings: {
    width: 20,
    height: 20,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  iconSettingsDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.text,
  },
});

export default Profile;
