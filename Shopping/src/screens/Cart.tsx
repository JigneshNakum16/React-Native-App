import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, fontSize, borderRadius } from '../theme/colors';
import { useCartStore } from '../store';
import { PRODUCTS_LIST } from '../data/contants';
import CartItem from '../components/CartItem';

type CartProps = NativeStackScreenProps<any, 'Cart'>;

const Cart = ({ navigation }: CartProps) => {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getCartTotal,
    initializeCart,
  } = useCartStore();

  useEffect(() => {
    initializeCart(PRODUCTS_LIST);
  }, []);

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + tax;

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      'This is a demo checkout. In a real app, this would redirect to payment.',
      [{ text: 'OK', onPress: () => console.log('Checkout pressed') }]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => clearCart(),
        },
      ]
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <View style={styles.emptyCartCircle} />
        <View style={styles.emptyCartBody} />
        <View style={styles.emptyCartHandle} />
      </View>
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySubtitle}>
        Add items to get started
      </Text>
      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => (navigation as any).navigate('HomeTab')}
      >
        <Text style={styles.shopButtonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCartItem = (item: any) => (
    <CartItem
      key={item.id}
      item={item}
      onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
      onRemove={() => removeItem(item.id)}
      onPress={() => (navigation as any).navigate('Details', { product: item })}
    />
  );

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Cart</Text>
        </View>
        {renderEmptyState()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <TouchableOpacity onPress={handleClearCart}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map(renderCartItem)}
        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceDetails}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>₹{subtotal.toLocaleString()}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tax (18%)</Text>
            <Text style={styles.priceValue}>₹{tax.toLocaleString()}</Text>
          </View>
          <View style={styles.priceSeparator} />
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{total.toLocaleString()}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  spacer: {
    height: 20,
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
  },
  emptyCartCircle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: colors.border,
    top: 20,
    left: 20,
  },
  emptyCartBody: {
    position: 'absolute',
    width: 70,
    height: 50,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: colors.border,
    bottom: 20,
    left: 15,
  },
  emptyCartHandle: {
    position: 'absolute',
    width: 20,
    height: 10,
    borderRadius: 5,
    borderWidth: 4,
    borderColor: colors.border,
    top: 35,
    right: 10,
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
  footer: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  priceDetails: {
    marginBottom: spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  priceLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  priceValue: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '500',
  },
  priceSeparator: {
    marginVertical: spacing.md,
  },
  totalLabel: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
  },
  totalValue: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: colors.background,
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
});

export default Cart;
