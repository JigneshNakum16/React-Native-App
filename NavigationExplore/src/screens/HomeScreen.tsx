import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainTabParamList, RootStackParamList} from '../types/navigation';
import {ProductCard} from '../components/ProductCard';
import {PRODUCTS, CATEGORIES} from '../constants/products';
import {COLORS} from '../constants/colors';
import {useCart} from '../contexts/CartContext';
import {Product} from '../types/product';

type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList & MainTabParamList,
  'HomeTab'
>;

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const {addToCart, getTotalItems} = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const scrollX = useRef(new Animated.Value(0)).current;

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === selectedCategory);

  const handleProductPress = (product: Product) => {
    navigation.navigate('Details', {
      productId: product.id,
      productName: product.name,
    });
  };

  const renderCategoryItem = ({item}: {item: string}) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.categoryItemActive,
      ]}
      onPress={() => setSelectedCategory(item)}>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.categoryTextActive,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderBannerItem = () => {
    return (
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Summer Sale!</Text>
        <Text style={styles.bannerSubtitle}>Up to 50% off</Text>
        <TouchableOpacity style={styles.bannerButton}>
          <Text style={styles.bannerButtonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Shopper! 👋</Text>
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={SCREEN_WIDTH - 32}
          contentContainerStyle={styles.bannersContainer}>
          {renderBannerItem()}
        </Animated.ScrollView>

        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}>
          {CATEGORIES.map(category => (
            <View key={category} style={styles.categoryWrapper}>
              {renderCategoryItem({item: category})}
            </View>
          ))}
        </ScrollView>

        <View style={styles.productsHeader}>
          <Text style={styles.sectionTitle}>Products</Text>
          <Text style={styles.productCount}>{filteredProducts.length} items</Text>
        </View>

        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ProductCard
              product={item}
              onPress={handleProductPress}
              onAddToCart={addToCart}
            />
          )}
          scrollEnabled={false}
          contentContainerStyle={styles.productsList}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  cartBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: '700',
  },
  bannersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  banner: {
    width: SCREEN_WIDTH - 32,
    height: 160,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    padding: 24,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.surface,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 18,
    color: COLORS.surface,
    opacity: 0.9,
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryWrapper: {
    marginRight: 8,
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryItemActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  categoryTextActive: {
    color: COLORS.surface,
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 16,
  },
  productCount: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  productsList: {
    paddingBottom: 100,
  },
});
