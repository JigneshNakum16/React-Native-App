import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainTabParamList, RootStackParamList} from '../types/navigation';
import {COLORS} from '../constants/colors';
import {User} from '../types/product';

type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList & MainTabParamList,
  'ProfileTab'
>;

const demoUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '👤',
  bio: 'Shopping enthusiast',
  notifications: true,
  darkMode: false,
};

export const ProfileScreen = ({navigation}: ProfileScreenProps) => {
  const [user, setUser] = useState<User>(demoUser);
  const [isEditing, setIsEditing] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [editedName, setEditedName] = useState(user.name);

  const handleSave = () => {
    setUser({...user, name: editedName});
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const MenuSection = ({title, children}: {title: string; children: React.ReactNode}) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const MenuItem = ({
    icon,
    label,
    onPress,
    rightComponent,
  }: {
    icon: string;
    label: string;
    onPress: () => void;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <Text style={styles.menuLabel}>{label}</Text>
      {rightComponent || <Text style={styles.menuArrow}>›</Text>}
    </TouchableOpacity>
  );

  const SettingItem = ({
    icon,
    label,
    value,
    onValueChange,
  }: {
    icon: string;
    label: string;
    value: boolean;
    onValueChange: (val: boolean) => void;
  }) => (
    <View style={styles.menuItem}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <Text style={styles.menuLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{false: COLORS.border, true: COLORS.primary}}
        thumbColor={COLORS.surface}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{user.avatar}</Text>
        </View>
        {isEditing ? (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.nameInput}
              value={editedName}
              onChangeText={setEditedName}
              autoFocus
            />
            <View style={styles.editButtons}>
              <TouchableOpacity
                style={[styles.editButton, styles.saveButton]}
                onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.editButton, styles.cancelButton]}
                onPress={() => {
                  setIsEditing(false);
                  setEditedName(user.name);
                }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Wishlist</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>$420</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
      </View>

      {/* Account Menu */}
      <MenuSection title="Account">
        <MenuItem icon="📦" label="My Orders" onPress={() => {}} />
        <MenuItem icon="❤️" label="Wishlist" onPress={() => {}} />
        <MenuItem icon="📍" label="Addresses" onPress={() => {}} />
        <MenuItem icon="💳" label="Payment Methods" onPress={() => {}} />
      </MenuSection>

      {/* Settings Menu */}
      <MenuSection title="Settings">
        <SettingItem
          icon="🔔"
          label="Notifications"
          value={user.notifications}
          onValueChange={val => setUser({...user, notifications: val})}
        />
        <SettingItem
          icon="🌙"
          label="Dark Mode"
          value={user.darkMode}
          onValueChange={val => setUser({...user, darkMode: val})}
        />
      </MenuSection>

      {/* More Options */}
      <MenuSection title="More">
        <MenuItem
          icon="💬"
          label="Send Feedback"
          onPress={() => setShowFeedbackModal(true)}
        />
        <MenuItem
          icon="ℹ️"
          label="Help & Support"
          onPress={() => setShowHelpModal(true)}
        />
        <MenuItem icon="📄" label="Privacy Policy" onPress={() => {}} />
        <MenuItem icon="📜" label="Terms of Service" onPress={() => {}} />
      </MenuSection>

      <MenuSection title="Other">
        <MenuItem icon="🚪" label="Logout" onPress={() => {}} />
      </MenuSection>

      {/* Version */}
      <Text style={styles.version}>Version 1.0.0</Text>

      {/* Feedback Modal */}
      <Modal
        visible={showFeedbackModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowFeedbackModal(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFeedbackModal(false)}>
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Send Feedback</Text>
              <TouchableOpacity onPress={() => setShowFeedbackModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalDescription}>
              We'd love to hear from you!
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your feedback..."
              value={feedback}
              onChangeText={setFeedback}
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowFeedbackModal(false);
                setFeedback('');
                Alert.alert('Thank you!', 'Your feedback has been submitted.');
              }}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Help Modal */}
      <Modal
        visible={showHelpModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowHelpModal(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowHelpModal(false)}>
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Help & Support</Text>
              <TouchableOpacity onPress={() => setShowHelpModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.helpContent}>
              <TouchableOpacity style={styles.helpLink}>
                <Text style={styles.helpLinkText}>📚 FAQs</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.helpLink}>
                <Text style={styles.helpLinkText}>💬 Live Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.helpLink}>
                <Text style={styles.helpLinkText}>📧 Email Support</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.helpLink}>
                <Text style={styles.helpLinkText}>📞 Call Us</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: COLORS.surface,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 48,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: COLORS.surface,
    fontSize: 14,
    fontWeight: '600',
  },
  editContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 40,
  },
  nameInput: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    marginBottom: 16,
    paddingVertical: 4,
  },
  editButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  saveButtonText: {
    color: COLORS.surface,
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: COLORS.border,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  cancelButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingVertical: 20,
    marginTop: 1,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  section: {
    marginTop: 16,
    backgroundColor: COLORS.surface,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  menuArrow: {
    fontSize: 20,
    color: COLORS.textSecondary,
  },
  version: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingVertical: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  modalClose: {
    fontSize: 24,
    color: COLORS.textSecondary,
    padding: 4,
  },
  modalDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  helpContent: {
    gap: 12,
  },
  helpLink: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
  helpLinkText: {
    fontSize: 16,
    color: COLORS.text,
  },
});
