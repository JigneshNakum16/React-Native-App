import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, fontSize, borderRadius } from '../theme/colors';
import { useWishlistStore, useCartStore } from '../store';
import type { Product } from '../index';
import { PRODUCTS_LIST } from '../data/contants';
import ProductCard from '../components/ProductCard';
import Separator from '../components/Separator';

type WishlistProps = NativeStackScreenProps<any, 'Wishlist'>;

const Wishlist = ({ navigation }: WishlistProps) => {
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

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.cardContainer}>
      <ProductCard
        product={item}
        onPress={() => (navigation as any).navigate('Details', { product: item })}
      />
      {!isInCart(item.id) && (
        <TouchableOpacity
          style={styles.moveToCartButton}
          onPress={() => handleMoveToCart(item)}
          activeOpacity={0.8}
        >
          <Text style={styles.moveToCartText}>Move to Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <View style={styles.heartOutline}>
          <View style={styles.heartLeft} />
          <View style={styles.heartRight} />
        </View>
      </View>
      <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
      <Text style={styles.emptySubtitle}>
        Save items you love to your wishlist
      </Text>
      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => (navigation as any).navigate('HomeTab')}
      >
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
        <TouchableOpacity onPress={handleClearWishlist}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={wishlistedProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => null}
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
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
  },
  clearButtonText: {
    fontSize: fontSize.md,
    color: colors.error,
    fontWeight: '500',
  },
  listContent: {
    padding: spacing.md,
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
  },
  moveToCartText: {
    color: colors.background,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    marginBottom: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartOutline: {
    width: 80,
    height: 80,
    position: 'relative',
  },
  heartLeft: {
    position: 'absolute',
    width: 40,
    height: 60,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: 40,
    left: 0,
    top: 10,
  },
  heartRight: {
    position: 'absolute',
    width: 40,
    height: 60,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: 40,
    right: 0,
    top: 10,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  shopButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  shopButtonText: {
    color: colors.background,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});

export default Wishlist;
