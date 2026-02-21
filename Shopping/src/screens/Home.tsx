import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, fontSize, borderRadius } from '../theme/colors';
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
  const { getCartItemsCount, initializeCart } = useCartStore();
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

  const cartCount = getCartItemsCount();

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCardContainer}>
      <ProductCard
        product={item}
        onPress={() => (navigation as any).navigate('Details', { product: item })}
      />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="search-outline" size={64} color={colors.border} />
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
          <Icon name="refresh-outline" size={18} color={colors.background} style={{ marginRight: 6 }} />
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
            <View style={styles.headerTop}>
              <Text style={styles.headerTitle}>ShopHub</Text>
              <TouchableOpacity style={styles.notificationButton}>
                <Icon name="notifications-outline" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
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
              <TouchableOpacity style={styles.filterButton}>
                <Icon name="options-outline" size={20} color={colors.primary} />
              </TouchableOpacity>
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
          <Icon name="cart" size={24} color={colors.background} />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartCount}</Text>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  notificationButton: {
    padding: spacing.xs,
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
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '600',
  },
  filterButton: {
    padding: spacing.xs,
  },
  productCardContainer: {
    width: '48%',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 3,
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
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  clearFiltersButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearFiltersText: {
    color: colors.background,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  floatingCartButton: {
    position: 'absolute',
    bottom: spacing.xxl + 60,
    right: spacing.md,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  cartBadgeText: {
    color: colors.background,
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 5,
  },
});

export default Home;
