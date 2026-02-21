import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, borderRadius, fontSize } from '../theme/colors';
import { a11yLabels } from '../constants/accessibility';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'small' | 'medium' | 'large';
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = 'small',
}) => {
  const canDecrease = quantity > min;
  const canIncrease = quantity < max;

  const sizeStyles = {
    small: {
      height: 32,
      iconSize: 18,
      textSize: 14,
    },
    medium: {
      height: 38,
      iconSize: 20,
      textSize: 16,
    },
    large: {
      height: 44,
      iconSize: 22,
      textSize: 18,
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <View
      style={[styles.container, { height: currentSize.height }]}
      accessibilityLabel={a11yLabels.updateQuantity(quantity)}
      accessibilityRole="none"
    >
      <TouchableOpacity
        style={styles.button}
        onPress={onDecrease}
        disabled={!canDecrease}
        activeOpacity={0.7}
        accessibilityLabel={a11yLabels.decreaseQuantity}
        accessibilityRole="button"
        accessibilityState={{ disabled: !canDecrease }}
      >
        <Icon
          name="remove-outline"
          size={currentSize.iconSize}
          color={canDecrease ? colors.primary : colors.border}
        />
      </TouchableOpacity>

      <View style={styles.quantityContainer}>
        <Text
          style={[styles.quantity, { fontSize: currentSize.textSize }]}
          accessibilityElementsHidden={true}
        >
          {quantity}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={onIncrease}
        disabled={!canIncrease}
        activeOpacity={0.7}
        accessibilityLabel={a11yLabels.increaseQuantity}
        accessibilityRole="button"
        accessibilityState={{ disabled: !canIncrease }}
      >
        <Icon
          name="add-outline"
          size={currentSize.iconSize}
          color={canIncrease ? colors.primary : colors.border}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 90,
  },
  button: {
    width: 28,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontWeight: '700',
    color: colors.text,
  },
});

export default QuantitySelector;
