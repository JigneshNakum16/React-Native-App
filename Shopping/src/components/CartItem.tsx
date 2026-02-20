import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../theme/colors';
import { CartItem as CartItemType } from '../store';
import QuantitySelector from './QuantitySelector';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
  onPress: () => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  onPress,
}) => {
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleRemove = () => {
    setIsDeleting(true);
    Animated.timing(slideAnim, {
      toValue: -400,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onRemove();
    });
  };

  if (isDeleting) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
    >
      <TouchableOpacity
        style={styles.content}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />

        <View style={styles.details}>
          <Text style={styles.name} numberOfLines={2}>
            {item.name}
          </Text>

          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.ratingCount}>({item.ratingCount})</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>
              ₹{item.discountPrice.toLocaleString()}
            </Text>
            <Text style={styles.originalPrice}>
              ₹{item.originalPrice.toLocaleString()}
            </Text>
          </View>

          <View style={styles.quantityContainer}>
            <QuantitySelector
              quantity={item.quantity}
              onIncrease={() => onUpdateQuantity(item.quantity + 1)}
              onDecrease={() => onUpdateQuantity(item.quantity - 1)}
              size="small"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemove}
          activeOpacity={0.7}
        >
          <View style={styles.removeIcon}>
            <View style={styles.removeLine1} />
            <View style={styles.removeLine2} />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  content: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  image: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
    marginRight: spacing.md,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  rating: {
    backgroundColor: colors.ratingBackground,
    paddingHorizontal: spacing.xs,
    paddingVertical: 1,
    borderRadius: borderRadius.sm,
    marginRight: spacing.xs,
  },
  ratingText: {
    color: colors.background,
    fontSize: 10,
    fontWeight: '600',
  },
  ratingCount: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  price: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginRight: spacing.xs,
  },
  originalPrice: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  quantityContainer: {
    alignSelf: 'flex-start',
  },
  removeButton: {
    padding: spacing.sm,
    marginLeft: spacing.sm,
    alignSelf: 'flex-start',
  },
  removeIcon: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  removeLine1: {
    position: 'absolute',
    width: 20,
    height: 2,
    backgroundColor: colors.error,
    top: 9,
    transform: [{ rotate: '45deg' }],
  },
  removeLine2: {
    position: 'absolute',
    width: 20,
    height: 2,
    backgroundColor: colors.error,
    top: 9,
    transform: [{ rotate: '-45deg' }],
  },
});

export default CartItemComponent;
