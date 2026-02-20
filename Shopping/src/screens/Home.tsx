import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, fontSize } from '../theme/colors';
import type { Product } from '../index';
import { CATEGORIES, PRODUCTS_LIST } from '../data/contants';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryChip from '../components/CategoryChip';
import { useFilterStore, useCartStore, useWishlistStore } from '../store';

type HomeProps = NativeStackScreenProps<any, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  const { searchQuery, selectedCategory, setSearchQuery, setSelectedCategory } =
    useFilterStore();
  const { getCartCount, initializeCart } = useCartStore();
  const { getWishlistCount, initializeWishlist } = useWishlistStore();

  const [refreshing, setRefreshing] = React.useState(false);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    initializeCart(PRODUCTS_LIST);
    initializeWishlist();
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS_LIST.filter((product) => {
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const cartCount = getCartCount();

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={() => (navigation as any).navigate('Details', { product: item })}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Animated.View
        style={[
          styles.emptyIcon,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-100, 0],
                  outputRange: [10, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.emptyIconCircle} />
        <View style={styles.emptyIconLine} />
      </Animated.View>
      <Text style={styles.emptyTitle}>No products found</Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery || selectedCategory !== 'All'
          ? 'Try adjusting your filters'
          : 'Check back later for new products'}
      </Text>
      {(searchQuery || selectedCategory !== 'All') && (
        <TouchableOpacity
          style={styles.clearFiltersButton}
          onPress={() => {
            setSearchQuery('');
            setSelectedCategory('All');
          }}
        >
          <Text style={styles.clearFiltersText}>Clear Filters</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        ListHeaderComponent={
          <Animated.View
            style={[
              styles.header,
              {
                transform: [{ translateY: headerTranslateY }],
                opacity: headerOpacity,
              },
            ]}
          >
            <Text style={styles.headerTitle}>Shop</Text>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />
            <CategoryChip
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsCount}>
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
              </Text>
            </View>
          </Animated.View>
        }
        stickyHeaderIndices={[0]}
      />

      {cartCount > 0 && (
        <TouchableOpacity
          style={styles.floatingCartButton}
          onPress={() => (navigation as any).navigate('CartTab')}
          activeOpacity={0.8}
        >
          <View style={styles.cartIconContainer}>
            <View style={styles.cartIcon} />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  listContent: {
    padding: spacing.md,
    paddingTop: 0,
  },
  row: {
    justifyContent: 'space-between',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  resultsCount: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 3,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    marginBottom: spacing.lg,
  },
  emptyIconCircle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: colors.border,
    top: 10,
    left: 10,
  },
  emptyIconLine: {
    position: 'absolute',
    width: 30,
    height: 3,
    backgroundColor: colors.border,
    top: 35,
    left: 25,
    transform: [{ rotate: '45deg' }],
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
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  clearFiltersButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  clearFiltersText: {
    color: colors.background,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  floatingCartButton: {
    position: 'absolute',
    bottom: spacing.xxl,
    right: spacing.md,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  cartIconContainer: {
    width: 24,
    height: 24,
  },
  cartIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.background,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.error,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: colors.background,
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 4,
  },
});

export default Home;
