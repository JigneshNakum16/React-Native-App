import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, borderRadius, fontSize } from '../theme/colors';
import { CartItem as CartItemType } from '../store';
import QuantitySelector from './QuantitySelector';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

  // Responsive values
  const isSmallDevice = SCREEN_WIDTH < 375;
  const isTablet = SCREEN_WIDTH >= 768;
  const imageWidth = isTablet ? 110 : isSmallDevice ? 75 : 90;
  const imageHeight = isTablet ? 130 : isSmallDevice ? 95 : 110;
  const paddingValue = isSmallDevice ? spacing.sm : spacing.md;

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
      <View style={[styles.content, { padding: paddingValue }]}>
        <Image
          source={{ uri: item.imageUrl }}
          style={[styles.image, { width: imageWidth, height: imageHeight }]}
        />

        <View style={styles.details}>
          <View style={styles.headerRow}>
            <Text
              style={[styles.name, { fontSize: isSmallDevice ? 13 : fontSize.sm }]}
              numberOfLines={2}
            >
              {item.name}
            </Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleRemove}
              activeOpacity={0.7}
            >
              <Icon
                name="close-circle"
                size={isSmallDevice ? 18 : 20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Icon name="star" size={10} color={colors.background} />
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>
            <Text style={[styles.ratingCount, { fontSize: isSmallDevice ? 10 : 11 }]}>
              ({item.ratingCount})
            </Text>
          </View>

          <View style={styles.priceAndQuantityRow}>
            <View style={styles.priceContainer}>
              <Text style={[styles.price, { fontSize: isSmallDevice ? 15 : fontSize.md }]}>
                ₹{item.discountPrice.toLocaleString()}
              </Text>
              <Text style={[styles.originalPrice, { fontSize: isSmallDevice ? 11 : fontSize.sm }]}>
                ₹{item.originalPrice.toLocaleString()}
              </Text>
            </View>

            <View style={styles.quantityContainer}>
              <Text style={[styles.quantityLabel, { fontSize: isSmallDevice ? 12 : fontSize.sm }]}>
                Qty:{' '}
              </Text>
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
    marginBottom: 12,
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
    backgroundColor: colors.background,
  },
  image: {
    resizeMode: 'contain',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  name: {
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 6,
  },
  removeButton: {
    padding: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    backgroundColor: colors.ratingBackground,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginRight: 6,
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
    fontWeight: '700',
    color: colors.primary,
    marginRight: 6,
  },
  originalPrice: {
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  quantityLabel: {
    color: colors.textSecondary,
    marginRight: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CartItemComponent;
