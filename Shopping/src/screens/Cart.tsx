import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, fontSize, borderRadius } from '../theme/colors';
import { useCartStore } from '../store';
import type { RootStackParamList } from '../index';
import { PRODUCTS_LIST } from '../data/contants';
import CartItem from '../components/CartItem';

type CartProps = NativeStackScreenProps<RootStackParamList, 'Cart'>;

const Cart = ({ navigation }: Partial<CartProps>) => {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getCartTotal,
    initializeCart,
  } = useCartStore();

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    initializeCart(PRODUCTS_LIST);
  }, []);

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + tax;

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  const handleConfirmOrder = () => {
    setShowCheckoutModal(false);
    setShowSuccessModal(true);
  };

  const handleDone = () => {
    setShowSuccessModal(false);
    clearCart();
    navigation?.getParent()?.navigate('HomeTab');
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
      <Icon name="cart-outline" size={80} color={colors.border} />
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySubtitle}>
        Add items to get started
      </Text>
      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => navigation?.getParent()?.navigate('HomeTab')}
      >
        <Icon name="bag-handle-outline" size={20} color={colors.background} style={{ marginRight: 8 }} />
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
      onPress={() => navigation?.navigate('Details', { product: item })}
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
        <Text style={styles.headerTitle}>My Cart ({items.length})</Text>
        <TouchableOpacity onPress={handleClearCart} style={styles.clearButton}>
          <Icon name="trash-outline" size={20} color={colors.error} />
          <Text style={styles.clearButtonText}>Clear</Text>
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
          <Icon name="card-outline" size={20} color={colors.background} style={{ marginRight: 8 }} />
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* Checkout Modal */}
      <Modal
        visible={showCheckoutModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCheckoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Checkout</Text>
              <TouchableOpacity onPress={() => setShowCheckoutModal(false)} style={styles.closeButton}>
                <Icon name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* Order Summary */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Order Summary</Text>
                <View style={styles.summaryCard}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Items ({items.length})</Text>
                    <Text style={styles.summaryValue}>₹{subtotal.toLocaleString()}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Tax (18%)</Text>
                    <Text style={styles.summaryValue}>₹{tax.toLocaleString()}</Text>
                  </View>
                  <View style={styles.summarySeparator} />
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryTotal}>Total</Text>
                    <Text style={styles.summaryTotalValue}>₹{total.toLocaleString()}</Text>
                  </View>
                </View>
              </View>

              {/* Delivery Address */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Delivery Address</Text>
                <View style={styles.addressCard}>
                  <Icon name="location" size={20} color={colors.primary} style={styles.addressIcon} />
                  <View style={styles.addressContent}>
                    <Text style={styles.addressName}>Home</Text>
                    <Text style={styles.addressText}>123 ShopHub Street, Shopping City, SC 12345</Text>
                  </View>
                  <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
                </View>
              </View>

              {/* Payment Method */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Payment Method</Text>

                <TouchableOpacity
                  style={[styles.paymentMethod, selectedPaymentMethod === 'cod' && styles.paymentMethodSelected]}
                  onPress={() => setSelectedPaymentMethod('cod')}
                >
                  <View style={styles.paymentIconContainer}>
                    <Icon name="cash" size={24} color={selectedPaymentMethod === 'cod' ? colors.primary : colors.textSecondary} />
                  </View>
                  <View style={styles.paymentContent}>
                    <Text style={styles.paymentTitle}>Cash on Delivery</Text>
                    <Text style={styles.paymentSubtitle}>Pay with cash at your doorstep</Text>
                  </View>
                  <View style={[styles.radioButton, selectedPaymentMethod === 'cod' && styles.radioButtonSelected]}>
                    {selectedPaymentMethod === 'cod' && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.paymentMethod, selectedPaymentMethod === 'upi' && styles.paymentMethodSelected]}
                  onPress={() => setSelectedPaymentMethod('upi')}
                >
                  <View style={styles.paymentIconContainer}>
                    <Icon name="phone-portrait" size={24} color={selectedPaymentMethod === 'upi' ? colors.primary : colors.textSecondary} />
                  </View>
                  <View style={styles.paymentContent}>
                    <Text style={styles.paymentTitle}>UPI Payment</Text>
                    <Text style={styles.paymentSubtitle}>Pay using any UPI app</Text>
                  </View>
                  <View style={[styles.radioButton, selectedPaymentMethod === 'upi' && styles.radioButtonSelected]}>
                    {selectedPaymentMethod === 'upi' && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmOrder}
                activeOpacity={0.8}
              >
                <Icon name="checkmark-circle" size={20} color={colors.background} style={{ marginRight: 8 }} />
                <Text style={styles.confirmButtonText}>Confirm Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={styles.successOverlay}>
          <View style={styles.successContent}>
            <View style={styles.successIconContainer}>
              <Icon name="checkmark-circle" size={80} color={colors.success} />
            </View>
            <Text style={styles.successTitle}>Order Placed Successfully!</Text>
            <Text style={styles.successMessage}>
              Your order has been placed successfully. You will receive your order within 3-5 business days.
            </Text>
            <View style={styles.orderDetails}>
              <Text style={styles.orderDetailText}>Order Total: <Text style={styles.orderDetailAmount}>₹{total.toLocaleString()}</Text></Text>
              <Text style={styles.orderDetailText}>Payment: <Text style={styles.orderDetailAmount}>Cash on Delivery</Text></Text>
            </View>
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.doneButtonText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    height: 1,
    backgroundColor: colors.border,
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
    color: colors.primary,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkoutButtonText: {
    color: colors.background,
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
  },
  closeButton: {
    padding: spacing.xs,
  },
  modalBody: {
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  summaryCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '500',
  },
  summarySeparator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  summaryTotal: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.text,
  },
  summaryTotalValue: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.primary,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  addressIcon: {
    backgroundColor: `${colors.primary}15`,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressContent: {
    flex: 1,
  },
  addressName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  addressText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  paymentMethodSelected: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  paymentIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  paymentContent: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  paymentSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  modalFooter: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: colors.background,
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  // Success Modal
  successOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  successContent: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.xxl,
    padding: spacing.xxl,
    alignItems: 'center',
    width: '100%',
  },
  successIconContainer: {
    marginBottom: spacing.lg,
  },
  successTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  orderDetails: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    width: '100%',
    marginBottom: spacing.lg,
  },
  orderDetailText: {
    fontSize: fontSize.md,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  orderDetailAmount: {
    fontWeight: '600',
    color: colors.primary,
  },
  doneButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  doneButtonText: {
    color: colors.background,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});

export default Cart;
