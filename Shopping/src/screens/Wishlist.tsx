import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, fontSize, borderRadius } from '../theme/colors';
import { useWishlistStore, useCartStore } from '../store';
import type { Product, RootStackParamList } from '../index';
import { PRODUCTS_LIST } from '../data/contants';
import ProductCard from '../components/ProductCard';

type WishlistProps = NativeStackScreenProps<RootStackParamList, 'Wishlist'>;

const Wishlist = ({ navigation }: Partial<WishlistProps>) => {
  const { items, removeFromWishlist, clearWishlist, initializeWishlist } =
    useWishlistStore();
  const { addItem, isInCart } = useCartStore();
  const [wishlistedProducts, setWishlistedProducts] = useState<Product[]>([]);

  useEffect(() => {
    initializeWishlist();
  }, []);

  useEffect(() => {
    const products = items
      .map((id) => PRODUCTS_LIST.find((p) => p.id === id))
      .filter((p): p is Product => p !== undefined);
    setWishlistedProducts(products);
  }, [items]);

  const handleMoveToCart = (product: Product) => {
    addItem(product);
    removeFromWishlist(product.id);
    Alert.alert('Success', 'Item moved to cart!');
  };

  const handleClearWishlist = () => {
    Alert.alert(
      'Clear Wishlist',
      'Are you sure you want to clear your wishlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => clearWishlist(),
        },
      ]
    );
  };

  const renderProduct = ({ item }: { item: Product }) => {
    const inCart = isInCart(item.id);
    return (
      <View style={styles.cardContainer}>
        <ProductCard
          product={item}
          onPress={() => navigation?.navigate('Details', { product: item })}
        />
        {!inCart && (
          <TouchableOpacity
            style={styles.moveToCartButton}
            onPress={() => handleMoveToCart(item)}
            activeOpacity={0.8}
          >
            <Icon name="cart-outline" size={16} color={colors.background} style={{ marginRight: 6 }} />
            <Text style={styles.moveToCartText}>Move to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="heart-outline" size={80} color={colors.border} />
      <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
      <Text style={styles.emptySubtitle}>
        Save items you love to your wishlist
      </Text>
      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => navigation?.getParent()?.navigate('HomeTab')}
      >
        <Icon name="compass-outline" size={20} color={colors.background} style={{ marginRight: 8 }} />
        <Text style={styles.shopButtonText}>Explore Products</Text>
      </TouchableOpacity>
    </View>
  );

  if (wishlistedProducts.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wishlist</Text>
        </View>
        {renderEmptyState()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wishlist</Text>
        <TouchableOpacity onPress={handleClearWishlist} style={styles.clearButton}>
          <Icon name="trash-outline" size={20} color={colors.error} />
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={wishlistedProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={<View style={styles.footerSpacer} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.primary,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clearButtonText: {
    fontSize: fontSize.md,
    color: colors.error,
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%',
    marginBottom: spacing.md,
  },
  moveToCartButton: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  moveToCartText: {
    color: colors.background,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  footerSpacer: {
    height: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  emptySubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  shopButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopButtonText: {
    color: colors.background,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});

export default Wishlist;
