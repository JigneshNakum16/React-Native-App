import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { Account } from 'appwrite';

import { AppwriteContext } from '../appwrite/AppwriteContext';
import { AuthStackParamList } from '../routes/AuthStack';
import FormContainer from '../components/FormContainer';
import Input from '../components/Input';
import Button from '../components/Button';
import { Colors, Typography, Spacing, BorderRadius } from '../theme/theme';

type ForgotPasswordScreenProps = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

type FormState = {
  email: string;
  isLoading: boolean;
  error: string;
  success: boolean;
};

const ForgotPassword = ({ navigation }: ForgotPasswordScreenProps) => {
  const { appwriteService } = useContext(AppwriteContext);

  const [formState, setFormState] = useState<FormState>({
    email: '',
    isLoading: false,
    error: '',
    success: false,
  });

  const validateEmail = (): boolean => {
    if (!formState.email) {
      setFormState(prev => ({ ...prev, error: 'Email is required' }));
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      setFormState(prev => ({ ...prev, error: 'Please enter a valid email' }));
      return false;
    }
    return true;
  };

  const handleResetPassword = async () => {
    if (!validateEmail()) return;

    setFormState(prev => ({ ...prev, isLoading: true, error: '' }));

    try {
      // Appwrite uses createRecovery for password reset
      await (appwriteService.account as Account).createRecovery(
        formState.email,
        // In production, this should be your app's deep link
        'https://appwrite.io/auth/recovery'
      );

      setFormState(prev => ({ ...prev, success: true, isLoading: false }));
    } catch (error: any) {
      setFormState(prev => ({
        ...prev,
        error: error?.message || 'Failed to send reset email. Please try again.',
        isLoading: false
      }));
    }
  };

  if (formState.success) {
    return (
      <FormContainer>
        <View style={styles.centerContent}>
          <View style={styles.successIconContainer}>
            <Icon name="mail-unread-outline" size={80} color={Colors.success} />
          </View>
          <Text style={styles.title}>Check Your Email</Text>
          <Text style={styles.message}>
            We've sent a password reset link to{'\n'}
            <Text style={styles.emailText}>{formState.email}</Text>
          </Text>
          <Text style={styles.instruction}>
            Please check your email and follow the instructions to reset your password.
          </Text>

          <Button
            title="Back to Login"
            onPress={() => navigation.navigate('Login')}
            icon="arrow-back-outline"
            size="large"
            containerStyle={styles.buttonSpacing}
          />

          <Pressable onPress={() => setFormState(prev => ({ ...prev, success: false }))}>
            <Text style={styles.resendLink}>Resend Email</Text>
          </Pressable>
        </View>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon name="key-outline" size={60} color={Colors.primary} />
        </View>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your email address and we'll send you a link to reset your password.
        </Text>
      </View>

      {/* Form Section */}
      <View style={styles.form}>
        <Input
          label="Email"
          placeholder="Enter your email"
          value={formState.email}
          onChangeText={(email) => setFormState(prev => ({ ...prev, email, error: '' }))}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          leftIcon="mail-outline"
          error={formState.error}
        />

        <Button
          title="Send Reset Link"
          onPress={handleResetPassword}
          loading={formState.isLoading}
          icon="paper-plane-outline"
          size="large"
        />

        <Pressable onPress={() => navigation.navigate('Login')} style={styles.backLink}>
          <Icon name="arrow-back" size={18} color={Colors.primary} />
          <Text style={styles.backLinkText}>Back to Login</Text>
        </Pressable>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  successIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${Colors.success}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  emailText: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
  instruction: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
  form: {
    width: '100%',
  },
  buttonSpacing: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
  resendLink: {
    fontSize: Typography.fontSize.md,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
  backLinkText: {
    fontSize: Typography.fontSize.md,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: Spacing.xs,
  },
});

export default ForgotPassword;
