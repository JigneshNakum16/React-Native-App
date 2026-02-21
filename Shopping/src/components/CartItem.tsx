import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
      <View style={styles.content}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />

        <View style={styles.details}>
          <View style={styles.headerRow}>
            <Text style={styles.name} numberOfLines={2}>
              {item.name}
            </Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleRemove}
              activeOpacity={0.7}
            >
              <Icon name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Icon name="star" size={10} color={colors.background} />
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.ratingCount}>({item.ratingCount})</Text>
          </View>

          <View style={styles.priceAndQuantityRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                ₹{item.discountPrice.toLocaleString()}
              </Text>
              <Text style={styles.originalPrice}>
                ₹{item.originalPrice.toLocaleString()}
              </Text>
            </View>

            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>Qty: </Text>
              <QuantitySelector
                quantity={item.quantity}
                onIncrease={() => onUpdateQuantity(item.quantity + 1)}
                onDecrease={() => onUpdateQuantity(item.quantity - 1)}
                size="small"
              />
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  image: {
    width: 90,
    height: 110,
    resizeMode: 'contain',
    marginRight: spacing.md,
  },
  details: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: spacing.xs,
  },
  removeButton: {
    padding: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  rating: {
    backgroundColor: colors.ratingBackground,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginRight: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
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
  priceAndQuantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.primary,
    marginRight: spacing.xs,
  },
  originalPrice: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  quantityLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginRight: spacing.xs,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CartItemComponent;
