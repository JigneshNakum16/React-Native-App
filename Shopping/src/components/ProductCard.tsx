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
import type { Product } from '../index';
import { useCartStore, useWishlistStore } from '../store';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const animatedValue = React.useRef(new Animated.Value(1)).current;
  const heartScale = React.useRef(new Animated.Value(1)).current;

  const { addItem, isInCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleWishlistPress = () => {
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    toggleWishlist(product.id);
  };

  const handleAddToCart = () => {
    addItem(product);
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: animatedValue }],
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.card}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={handleWishlistPress}
            activeOpacity={0.7}
          >
            <Animated.View style={{ transform: [{ scale: heartScale }] }}>
              <Icon
                name={inWishlist ? 'heart' : 'heart-outline'}
                size={20}
                color={inWishlist ? colors.heartColor : colors.textSecondary}
              />
            </Animated.View>
          </TouchableOpacity>
          {product.offerPercentage >= 15 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {product.offerPercentage}%
              </Text>
              <Text style={styles.discountOff}>OFF</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>

          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Icon name="star" size={12} color={colors.background} />
              <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.ratingCount}>
              ({product.ratingCount > 1000
                ? `${(product.ratingCount / 1000).toFixed(1)}k`
                : product.ratingCount})
            </Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>
              ₹{product.originalPrice.toLocaleString()}
            </Text>
            <Text style={styles.discountPrice}>
              ₹{product.discountPrice.toLocaleString()}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.addButton, inCart ? styles.addButtonInCart : null]}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Icon
              name={inCart ? 'cart' : 'cart-outline'}
              size={16}
              color={colors.background}
              style={styles.cartIcon}
            />
            <Text
              style={[
                styles.addButtonText,
                inCart ? styles.addButtonTextInCart : null,
              ]}
            >
              {inCart ? 'ADD MORE' : 'ADD TO CART'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
  image: {
    width: 120,
    height: 160,
    resizeMode: 'contain',
  },
  wishlistButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountText: {
    color: colors.background,
    fontSize: fontSize.xs,
    fontWeight: '700',
  },
  discountOff: {
    color: colors.background,
    fontSize: 8,
    fontWeight: '600',
    marginLeft: 2,
  },
  content: {
    padding: spacing.sm,
  },
  name: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
    minHeight: 36,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  rating: {
    backgroundColor: colors.ratingBackground,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginRight: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    color: colors.background,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  ratingCount: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  originalPrice: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
    marginRight: spacing.xs,
  },
  discountPrice: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.primary,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  addButtonInCart: {
    backgroundColor: colors.secondary,
  },
  addButtonText: {
    color: colors.background,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  addButtonTextInCart: {
    color: colors.background,
  },
  cartIcon: {
    marginRight: 4,
  },
});

export default ProductCard;
