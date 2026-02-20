import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../theme/colors';

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
  size = 'medium',
}) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const animatePress = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
    callback();
  };

  const canDecrease = quantity > min;
  const canIncrease = quantity < max;

  const sizeStyles = {
    small: {
      container: { height: 28, paddingHorizontal: spacing.sm },
      button: { width: 24, height: 24 },
      text: { fontSize: fontSize.sm },
    },
    medium: {
      container: { height: 36, paddingHorizontal: spacing.md },
      button: { width: 32, height: 32 },
      text: { fontSize: fontSize.md },
    },
    large: {
      container: { height: 44, paddingHorizontal: spacing.lg },
      button: { width: 40, height: 40 },
      text: { fontSize: fontSize.lg },
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <Animated.View
      style={[
        styles.container,
        currentSize.container,
        { transform: [{ scale: scaleValue }] },
      ]}
    >
      <TouchableOpacity
        style={[styles.button, currentSize.button]}
        onPress={() => animatePress(onDecrease)}
        disabled={!canDecrease}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.minusIcon,
            { backgroundColor: canDecrease ? colors.primary : colors.border },
          ]}
        >
          <View
            style={[styles.minusLine, { backgroundColor: colors.background }]}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.quantityContainer}>
        <Text style={[styles.quantity, currentSize.text]}>{quantity}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, currentSize.button]}
        onPress={() => animatePress(onIncrease)}
        disabled={!canIncrease}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.plusIcon,
            { backgroundColor: canIncrease ? colors.primary : colors.border },
          ]}
        >
          <View
            style={[styles.plusLineH, { backgroundColor: colors.background }]}
          />
          <View
            style={[styles.plusLineV, { backgroundColor: colors.background }]}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
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
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityContainer: {
    flex: 1,
    alignItems: 'center',
  },
  quantity: {
    fontWeight: '600',
    color: colors.text,
    minWidth: 24,
    textAlign: 'center',
  },
  minusIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusLine: {
    width: 10,
    height: 2,
  },
  plusIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusLineH: {
    position: 'absolute',
    width: 10,
    height: 2,
  },
  plusLineV: {
    position: 'absolute',
    width: 2,
    height: 10,
  },
});

export default QuantitySelector;
