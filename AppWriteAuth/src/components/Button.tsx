import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Spacing, BorderRadius, Shadows, Typography } from '../theme/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  containerStyle,
  textStyle,
  fullWidth = true,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BorderRadius.md,
      ...Shadows.medium,
    };

    // Size styles
    const sizeStyles = {
      small: { height: 36, paddingHorizontal: Spacing.md },
      medium: { height: 50, paddingHorizontal: Spacing.lg },
      large: { height: 56, paddingHorizontal: Spacing.xl },
    };

    // Variant styles
    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: {
        backgroundColor: disabled || loading ? Colors.textLight : Colors.primary,
      },
      secondary: {
        backgroundColor: disabled || loading ? Colors.textLight : Colors.secondary,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: disabled || loading ? Colors.textLight : Colors.primary,
      },
      ghost: {
        backgroundColor: 'transparent',
        ...Shadows.small,
      },
      danger: {
        backgroundColor: disabled || loading ? Colors.textLight : Colors.error,
      },
    };

    const widthStyle = fullWidth ? { width: '100%' } : {};

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...widthStyle,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: Typography.fontWeight.bold,
    };

    const sizeStyles = {
      small: { fontSize: Typography.fontSize.sm },
      medium: { fontSize: Typography.fontSize.md },
      large: { fontSize: Typography.fontSize.lg },
    };

    const variantStyles: Record<ButtonVariant, TextStyle> = {
      primary: { color: Colors.white },
      secondary: { color: Colors.white },
      outline: { color: disabled || loading ? Colors.textLight : Colors.primary },
      ghost: { color: disabled || loading ? Colors.textLight : Colors.primary },
      danger: { color: Colors.white },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getIconName = () => {
    if (loading) return 'ellipsis-horizontal-circle';
    return icon;
  };

  const getIconColor = () => {
    if (disabled || loading) return Colors.textLight;
    if (variant === 'outline' || variant === 'ghost') return Colors.primary;
    return Colors.white;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        getButtonStyle(),
        pressed && !disabled && !loading && styles.pressed,
        containerStyle,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.white}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Icon
              name={getIconName() as any}
              size={size === 'small' ? 18 : 22}
              color={getIconColor()}
              style={styles.iconLeft}
            />
          )}
          <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Icon
              name={getIconName() as any}
              size={size === 'small' ? 18 : 22}
              color={getIconColor()}
              style={styles.iconRight}
            />
          )}
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  text: {
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
});

export default Button;
