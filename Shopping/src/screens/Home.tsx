import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Animated,
  Dimensions,
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type HomeProps = NativeStackScreenProps<any, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  const { searchQuery, selectedCategory, setSearchQuery, setSelectedCategory } =
    useFilterStore();
  const { getCartItemsCount, initializeCart } = useCartStore();
  const { getWishlistCount, initializeWishlist } = useWishlistStore();

  const [refreshing, setRefreshing] = React.useState(false);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  // Responsive values
  const isSmallDevice = SCREEN_WIDTH < 375;
  const isTablet = SCREEN_WIDTH >= 768;
  const cardWidth = isTablet ? '31%' : '48%';
  const gapValue = isSmallDevice ? 10 : 12;

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
    <View style={[styles.productCardContainer, { width: cardWidth }]}>
      <ProductCard
        product={item}
        onPress={() => (navigation as any).navigate('Details', { product: item })}
      />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="search-outline" size={isSmallDevice ? 56 : 64} color={colors.border} />
      <Text style={[styles.emptyTitle, { fontSize: isSmallDevice ? 18 : fontSize.xl }]}>
        No products found
      </Text>
      <Text style={[styles.emptySubtitle, { fontSize: isSmallDevice ? 14 : fontSize.md }]}>
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
          <Text style={[styles.clearFiltersText, { fontSize: isSmallDevice ? 13 : fontSize.sm }]}>
            Clear Filters
          </Text>
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
        numColumns={isTablet ? 3 : 2}
        columnWrapperStyle={[styles.row, { gap: gapValue }]}
        contentContainerStyle={[styles.listContent, { paddingHorizontal: isSmallDevice ? 12 : 16 }]}
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
            <View style={[styles.headerTop, { paddingHorizontal: isSmallDevice ? 16 : 20 }]}>
              <Text style={[styles.headerTitle, { fontSize: isSmallDevice ? 26 : fontSize.xxl }]}>
                ShopHub
              </Text>
              <TouchableOpacity style={styles.notificationButton}>
                <Icon name="notifications-outline" size={isSmallDevice ? 22 : 24} color={colors.text} />
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
            <View style={[styles.resultsHeader, { paddingHorizontal: isSmallDevice ? 12 : 16 }]}>
              <Text style={[styles.resultsCount, { fontSize: isSmallDevice ? 14 : fontSize.md }]}>
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
          style={[styles.floatingCartButton, { bottom: isSmallDevice ? 70 : 80 }]}
          onPress={() => (navigation as any).navigate('CartTab')}
          activeOpacity={0.8}
        >
          <Icon name="cart" size={isSmallDevice ? 22 : 24} color={colors.background} />
          <View style={styles.cartBadge}>
            <Text style={[styles.cartBadgeText, { fontSize: isSmallDevice ? 10 : 11 }]}>
              {cartCount}
            </Text>
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
    paddingVertical: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  notificationButton: {
    padding: 4,
  },
  listContent: {
    paddingTop: 0,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCardContainer: {
    marginBottom: 12,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  resultsCount: {
    fontWeight: '600',
    color: colors.text,
  },
  filterButton: {
    padding: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    marginTop: 20,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  clearFiltersButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearFiltersText: {
    color: colors.background,
    fontWeight: '600',
  },
  floatingCartButton: {
    position: 'absolute',
    right: 16,
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
    fontWeight: '700',
    paddingHorizontal: 5,
  },
});

export default Home;
