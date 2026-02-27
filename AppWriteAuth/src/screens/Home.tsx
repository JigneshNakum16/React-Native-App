import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from '@rneui/base';

import { AppwriteContext } from '../appwrite/AppwriteContext';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../theme/theme';

const { width } = Dimensions.get('window');

type UserData = {
  name: string;
  email: string;
  $id?: string;
  registration?: string;
  status?: boolean;
  labels?: string[];
};

const MenuOption = ({
  icon,
  title,
  subtitle,
  onPress,
  iconColor = Colors.primary,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  iconColor?: string;
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.menuOption, pressed && styles.menuOptionPressed]}
  >
    <View style={[styles.iconWrapper, { backgroundColor: `${iconColor}15` }]}>
      <Icon name={icon as any} size={24} color={iconColor} />
    </View>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>
    <Icon name="chevron-forward" size={20} color={Colors.textLight} />
  </Pressable>
);

const Home = () => {
  const [userData, setUserData] = useState<UserData>();
  const [isLoading, setIsLoading] = useState(false);
  const { appwriteService, setIsLoggedIn } = useContext(AppwriteContext);

  const fetchUserData = async () => {
    try {
      const response = await appwriteService.getUserAccount();
      if (response) {
        const user: UserData = {
          name: response.name,
          email: response.email,
          $id: response.$id,
          registration: response.registration,
          status: response.status,
          labels: response.labels,
        };
        setUserData(user);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [appwriteService]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              await appwriteService.logoutUserAccount();
              setIsLoggedIn(false);
            } catch (error) {
              console.error('Logout error:', error);
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section with Profile */}
        <View style={styles.header}>
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Avatar
                size={80}
                rounded
                title={userData ? getInitials(userData.name) : 'U'}
                containerStyle={styles.avatar}
                titleStyle={styles.avatarTitle}
              />
              <View style={[styles.statusDot, { backgroundColor: userData?.status ? Colors.success : Colors.error }]} />
            </View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.userName}>{userData?.name || 'User'}</Text>
            <Text style={styles.userEmail}>{userData?.email}</Text>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Icon name="shield-checkmark-outline" size={28} color={Colors.success} />
              <Text style={styles.statValue}>Active</Text>
              <Text style={styles.statLabel}>Status</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="mail-unread-outline" size={28} color={Colors.primary} />
              <Text style={styles.statValue}>
                {userData?.labels?.length || 0}
              </Text>
              <Text style={styles.statLabel}>Labels</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="calendar-outline" size={28} color={Colors.secondary} />
              <Text style={styles.statValue}>
                {userData?.registration
                  ? new Date(userData.registration).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                  : 'N/A'}
              </Text>
              <Text style={styles.statLabel}>Joined</Text>
            </View>
          </View>
        </View>

        {/* Appwrite Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appwrite Features</Text>
          <View style={styles.infoCard}>
            <Image
              source={{
                uri: 'https://appwrite.io/images-ee/blog/og-private-beta.png',
              }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Build Fast. Scale Big.</Text>
              <Text style={styles.bannerText}>
                All in One Place with Appwrite's secure backend services.
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuContainer}>
            <MenuOption
              icon="person-outline"
              title="Edit Profile"
              subtitle="Update your personal information"
              onPress={() => {/* Navigate to profile edit */}}
              iconColor={Colors.primary}
            />
            <MenuOption
              icon="lock-closed-outline"
              title="Change Password"
              subtitle="Update your password"
              onPress={() => {/* Navigate to change password */}}
              iconColor={Colors.warning}
            />
            <MenuOption
              icon="notifications-outline"
              title="Notifications"
              subtitle="Manage notification preferences"
              onPress={() => {/* Navigate to notifications */}}
              iconColor={Colors.secondary}
            />
            <MenuOption
              icon="help-circle-outline"
              title="Help & Support"
              subtitle="Get help with your account"
              onPress={() => {/* Navigate to help */}}
              iconColor={Colors.info}
            />
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => [styles.logoutButton, pressed && styles.logoutButtonPressed]}
            disabled={isLoading}
          >
            <Icon name="log-out-outline" size={24} color={Colors.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>

        {/* Version Info */}
        <Text style={styles.versionText}>AppWriteAuth v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  header: {
    padding: Spacing.lg,
  },
  profileCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    ...Shadows.medium,
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    backgroundColor: Colors.primary,
  },
  avatarTitle: {
    color: Colors.white,
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
  },
  statusDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  greeting: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  userName: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    ...Shadows.small,
  },
  statValue: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  bannerImage: {
    width: '100%',
    height: 120,
  },
  bannerContent: {
    padding: Spacing.lg,
  },
  bannerTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  bannerText: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  menuContainer: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.sm,
    ...Shadows.small,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  menuOptionPressed: {
    backgroundColor: Colors.backgroundSecondary,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text,
  },
  menuSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.lg,
    ...Shadows.small,
  },
  logoutButtonPressed: {
    backgroundColor: `${Colors.error}10`,
  },
  logoutText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.error,
    marginLeft: Spacing.sm,
  },
  versionText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: Spacing.xxl,
  },
});

export default Home;
