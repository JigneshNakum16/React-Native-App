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
import type { Product } from '../index';
import { useCartStore, useWishlistStore } from '../store';
import { a11yLabels, a11yRoles, a11yHints } from '../constants/accessibility';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

  // Responsive values
  const isSmallDevice = SCREEN_WIDTH < 375;
  const isTablet = SCREEN_WIDTH >= 768;
  const imageSize = isTablet ? 140 : isSmallDevice ? 100 : 120;
  const iconSize = isTablet ? 24 : 20;
  const paddingValue = isTablet ? spacing.lg : spacing.md;
  const nameFontSize = isSmallDevice ? 13 : fontSize.sm;
  const priceFontSize = isSmallDevice ? 15 : fontSize.md;
  const buttonFontSize = isSmallDevice ? 11 : fontSize.sm;

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
        accessibilityLabel={`${product.name}. Price: ₹${product.discountPrice.toLocaleString()}. ${product.rating} stars. ${inCart ? 'Already in cart' : ''}`}
        accessibilityHint={a11yLabels.viewProductDetails}
        accessibilityRole="button"
      >
        <View style={styles.imageContainer} accessibilityElementsHidden={true} importantForAccessibility="no-hide-descendants">
          <Image
            source={{ uri: product.imageUrl }}
            style={[styles.image, { width: imageSize * 1.2, height: imageSize * 1.6 }]}
            accessible={true}
            accessibilityLabel={`Product image for ${product.name}`}
          />
          <TouchableOpacity
            style={[styles.wishlistButton, { width: iconSize + 16, height: iconSize + 16 }]}
            onPress={handleWishlistPress}
            activeOpacity={0.7}
            accessibilityLabel={inWishlist ? a11yLabels.removeFromWishlist : a11yLabels.addToWishlist}
            accessibilityRole="button"
          >
            <Animated.View style={{ transform: [{ scale: heartScale }] }}>
              <Icon
                name={inWishlist ? 'heart' : 'heart-outline'}
                size={iconSize}
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

        <View style={[styles.content, { padding: isSmallDevice ? spacing.sm : paddingValue }]}>
          <Text style={[styles.name, { fontSize: nameFontSize, minHeight: isSmallDevice ? 32 : 36 }]} numberOfLines={2}>
            {product.name}
          </Text>

          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Icon name="star" size={isSmallDevice ? 10 : 12} color={colors.background} />
              <Text style={[styles.ratingText, { fontSize: isSmallDevice ? 9 : 10 }]}>
                {product.rating.toFixed(1)}
              </Text>
            </View>
            <Text style={[styles.ratingCount, { fontSize: isSmallDevice ? 10 : 11 }]}>
              ({product.ratingCount > 1000
                ? `${(product.ratingCount / 1000).toFixed(1)}k`
                : product.ratingCount})
            </Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={[styles.originalPrice, { fontSize: isSmallDevice ? 11 : fontSize.sm }]}>
              ₹{product.originalPrice.toLocaleString()}
            </Text>
            <Text style={[styles.discountPrice, { fontSize: priceFontSize }]}>
              ₹{product.discountPrice.toLocaleString()}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.addButton, inCart ? styles.addButtonInCart : null]}
            onPress={handleAddToCart}
            activeOpacity={0.8}
            accessibilityLabel={inCart ? 'Add more to cart' : a11yLabels.addToCart}
            accessibilityHint={inCart ? 'Already in cart' : 'Add this product to your shopping cart'}
            accessibilityRole="button"
          >
            <Icon
              name={inCart ? 'cart' : 'cart-outline'}
              size={isSmallDevice ? 14 : 16}
              color={colors.background}
              style={styles.cartIcon}
            />
            <Text
              style={[
                styles.addButtonText,
                { fontSize: buttonFontSize },
                inCart ? styles.addButtonTextInCart : null,
              ]}
            >
              {isSmallDevice ? (inCart ? 'MORE' : 'ADD') : inCart ? 'ADD MORE' : 'ADD TO CART'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
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
    paddingVertical: 16,
  },
  image: {
    resizeMode: 'contain',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
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
    top: 8,
    left: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountText: {
    color: colors.background,
    fontSize: 11,
    fontWeight: '700',
  },
  discountOff: {
    color: colors.background,
    fontSize: 7,
    fontWeight: '600',
    marginLeft: 2,
  },
  content: {
    padding: 12,
  },
  name: {
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
    fontWeight: '600',
  },
  ratingCount: {
    color: colors.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  originalPrice: {
    fontWeight: '500',
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  discountPrice: {
    fontWeight: '700',
    color: colors.primary,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
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
