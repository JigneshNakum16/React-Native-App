import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { AppwriteContext } from '../appwrite/AppwriteContext';
import { AuthStackParamList } from '../routes/AuthStack';
import FormContainer from '../components/FormContainer';
import Input from '../components/Input';
import Button from '../components/Button';
import { Colors, Typography, Spacing, BorderRadius } from '../theme/theme';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

type FormData = {
  email: string;
  password: string;
};

type FormErrors = {
  email?: string;
  password?: string;
  general?: string;
};

const Login = ({ navigation }: LoginScreenProps) => {
  const { appwriteService, setIsLoggedIn } = useContext(AppwriteContext);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await appwriteService.LoginUserAccount({
        email: formData.email,
        password: formData.password,
      });

      if (response) {
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      setErrors({ general: error?.message || 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field-specific error when user types
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <FormContainer>
      {/* Logo/Header Section */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon name="rocket-outline" size={60} color={Colors.primary} />
        </View>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      {/* Form Section */}
      <View style={styles.form}>
        <Input
          label="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(value) => updateField('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          leftIcon="mail-outline"
          error={errors.email}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChangeText={(value) => updateField('password', value)}
          secureTextEntry
          leftIcon="lock-closed-outline"
          error={errors.password}
        />

        {/* Forgot Password Link */}
        <Pressable
          onPress={() => navigation.navigate('ForgotPassword' as never)}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </Pressable>

        {/* General Error */}
        {errors.general && (
          <View style={styles.generalErrorContainer}>
            <Icon name="alert-circle-outline" size={20} color={Colors.error} />
            <Text style={styles.generalErrorText}>{errors.general}</Text>
          </View>
        )}

        {/* Login Button */}
        <Button
          title="Sign In"
          onPress={handleLogin}
          loading={isLoading}
          icon="log-in-outline"
          size="large"
        />

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Create Account</Text>
          </Pressable>
        </View>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
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
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
  },
  form: {
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  forgotPasswordText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  generalErrorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.error}15`,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  generalErrorText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.error,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
  signUpText: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
  },
  signUpLink: {
    fontSize: Typography.fontSize.md,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.bold,
  },
});

export default Login;
