import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { AppwriteContext } from '../appwrite/AppwriteContext';
import { AuthStackParamList } from '../routes/AuthStack';
import FormContainer from '../components/FormContainer';
import Input from '../components/Input';
import Button from '../components/Button';
import { Colors, Typography, Spacing, BorderRadius } from '../theme/theme';

type SignUpScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
};

const SignUp = ({ navigation }: SignUpScreenProps) => {
  const { appwriteService, setIsLoggedIn } = useContext(AppwriteContext);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field-specific error when user types
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    // Calculate password strength
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return Colors.error;
    if (passwordStrength <= 3) return Colors.warning;
    return Colors.success;
  };

  const getPasswordStrengthLabel = () => {
    if (formData.password.length === 0) return '';
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await appwriteService.CreateUserAccount({
        name: formData.name.trim(),
        email: formData.email,
        password: formData.password,
      });

      if (response) {
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      setErrors({ general: error?.message || 'Sign up failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      {/* Logo/Header Section */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon name="person-add-outline" size={60} color={Colors.primary} />
        </View>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
      </View>

      {/* Form Section */}
      <View style={styles.form}>
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.name}
          onChangeText={(value) => updateField('name', value)}
          autoCapitalize="words"
          autoCorrect={false}
          leftIcon="person-outline"
          error={errors.name}
        />

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
          placeholder="Create a password"
          value={formData.password}
          onChangeText={(value) => updateField('password', value)}
          secureTextEntry
          leftIcon="lock-closed-outline"
          error={errors.password}
        />

        {/* Password Strength Indicator */}
        {formData.password.length > 0 && (
          <View style={styles.strengthContainer}>
            <View style={styles.strengthBar}>
              {[1, 2, 3, 4, 5].map((level) => (
                <View
                  key={level}
                  style={[
                    styles.strengthSegment,
                    {
                      backgroundColor:
                        level <= passwordStrength
                          ? getPasswordStrengthColor()
                          : Colors.inputBorder,
                    },
                  ]}
                />
              ))}
            </View>
            <Text style={[styles.strengthText, { color: getPasswordStrengthColor() }]}>
              {getPasswordStrengthLabel()}
            </Text>
          </View>
        )}

        <Input
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChangeText={(value) => updateField('confirmPassword', value)}
          secureTextEntry
          leftIcon="lock-closed-outline"
          error={errors.confirmPassword}
        />

        {/* General Error */}
        {errors.general && (
          <View style={styles.generalErrorContainer}>
            <Icon name="alert-circle-outline" size={20} color={Colors.error} />
            <Text style={styles.generalErrorText}>{errors.general}</Text>
          </View>
        )}

        {/* Sign Up Button */}
        <Button
          title="Create Account"
          onPress={handleSignUp}
          loading={isLoading}
          icon="person-add-outline"
          size="large"
        />

        {/* Terms & Conditions */}
        <Text style={styles.termsText}>
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </Text>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
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
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  strengthBar: {
    flex: 1,
    flexDirection: 'row',
    height: 4,
    marginRight: Spacing.sm,
  },
  strengthSegment: {
    flex: 1,
    marginRight: 4,
    borderRadius: 2,
  },
  strengthText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    minWidth: 50,
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
  termsText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.sm,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
  loginText: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
  },
  loginLink: {
    fontSize: Typography.fontSize.md,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.bold,
  },
});

export default SignUp;
