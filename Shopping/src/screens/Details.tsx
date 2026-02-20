import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, fontSize, borderRadius } from '../theme/colors';
import { useCartStore, useWishlistStore } from '../store';
import QuantitySelector from '../components/QuantitySelector';
import ProductCard from '../components/ProductCard';

type DetailsProps = NativeStackScreenProps<any, 'Details'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Details = ({ route, navigation }: DetailsProps) => {
  const { product } = route.params || {};
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const imageScale = React.useRef(new Animated.Value(1)).current;

  const { addItem, isInCart, getItemQuantity } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const cartQuantity = getItemQuantity(product.id);

  useEffect(() => {
    if (inCart) {
      setQuantity(cartQuantity);
    }
  }, [inCart, cartQuantity]);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const handleImagePress = () => {
    Animated.sequence([
      Animated.timing(imageScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(imageScale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleAddToCart = () => {
    addItem(product);
    setQuantity(1);
  };

  const handleWishlistPress = () => {
    Animated.sequence([
      Animated.timing(imageScale, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(imageScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
    toggleWishlist(product.id);
  };

  const relatedProducts = React.useMemo(() => {
    return [
      ...product.category === 'Phones'
        ? []
        : [],
      product,
    ];
  }, [product]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedHeader,
          { opacity: headerOpacity },
        ]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.backIcon}>
              <View style={styles.backLine1} />
              <View style={styles.backLine2} />
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {product.name}
          </Text>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleWishlistPress}
          >
            <Animated.View style={{ transform: [{ scale: imageScale }] }}>
              <View
                style={[
                  styles.heartIcon,
                  inWishlist ? styles.heartIconFilled : null,
                ]}
              >
                <View
                  style={[
                    styles.heartLeft,
                    inWishlist ? styles.heartFilled : null,
                  ]}
                />
                <View
                  style={[
                    styles.heartRight,
                    inWishlist ? styles.heartFilled : null,
                  ]}
                />
              </View>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View
          style={[styles.imageContainer, { opacity: imageOpacity }]}
        >
          <TouchableOpacity
            onPress={handleImagePress}
            activeOpacity={0.9}
          >
            <Animated.View
              style={{ transform: [{ scale: imageScale }] }}
            >
              <Image
                source={{ uri: product.imageUrl }}
                style={styles.image}
                resizeMode="contain"
              />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.ratingCount}>
              {product.ratingCount.toLocaleString()} ratings
            </Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>
              ₹{product.originalPrice.toLocaleString()}
            </Text>
            <Text style={styles.discountPrice}>
              ₹{product.discountPrice.toLocaleString()}
            </Text>
            <View style={styles.offerBadge}>
              <Text style={styles.offerText}>{product.offerPercentage}% OFF</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {product.tags && product.tags.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Features</Text>
              <View style={styles.tagsContainer}>
                {product.tags.map((tag: string, index: number) => (
                  <View key={index} style={styles.tag}>
                    <View style={styles.tagDot} />
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity(quantity + 1)}
              onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
              size="large"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>
            ₹{(product.discountPrice * quantity).toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, inCart ? styles.addButtonInCart : null]}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.addButtonText, inCart ? styles.addButtonTextInCart : null]}
          >
            {inCart ? 'UPDATE CART' : 'ADD TO CART'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    height: 56,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  backLine1: {
    position: 'absolute',
    width: 12,
    height: 2,
    backgroundColor: colors.text,
    top: 6,
    left: 2,
    transform: [{ rotate: '45deg' }],
  },
  backLine2: {
    position: 'absolute',
    width: 12,
    height: 2,
    backgroundColor: colors.text,
    top: 12,
    left: 2,
    transform: [{ rotate: '-45deg' }],
  },
  headerTitle: {
    flex: 1,
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: spacing.sm,
  },
  heartIcon: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  heartLeft: {
    position: 'absolute',
    width: 12,
    height: 20,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.text,
    borderRadius: 12,
    left: 0,
    top: 2,
  },
  heartRight: {
    position: 'absolute',
    width: 12,
    height: 20,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.text,
    borderRadius: 12,
    right: 0,
    top: 2,
  },
  heartIconFilled: {
    overflow: 'hidden',
  },
  heartFilled: {
    backgroundColor: colors.heartColor,
    borderColor: colors.heartColor,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    backgroundColor: colors.cardBackground,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
  },
  image: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.9,
  },
  detailsContainer: {
    padding: spacing.lg,
  },
  name: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.cardBackground,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    marginBottom: spacing.md,
  },
  categoryText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  rating: {
    backgroundColor: colors.ratingBackground,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  ratingText: {
    color: colors.background,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  ratingCount: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.priceBackground,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  originalPrice: {
    fontSize: fontSize.md,
    fontWeight: '500',
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
    marginRight: spacing.sm,
  },
  discountPrice: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginRight: spacing.sm,
  },
  offerBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  offerText: {
    color: colors.background,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  tagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: spacing.sm,
  },
  tagText: {
    fontSize: fontSize.sm,
    color: colors.text,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  totalPrice: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  addButtonInCart: {
    backgroundColor: colors.secondary,
  },
  addButtonText: {
    color: colors.background,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  addButtonTextInCart: {
    color: colors.background,
  },
});

export default Details;
