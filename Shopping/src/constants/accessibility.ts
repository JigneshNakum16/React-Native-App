/**
 * Accessibility labels and hints for screen readers
 * Follows WCAG guidelines for mobile accessibility
 */

export const a11yLabels = {
  // Navigation
  goBack: 'Go back',
  openCart: 'Open cart',
  openWishlist: 'Open wishlist',
  openProfile: 'Open profile',
  openSearch: 'Open search',

  // Product actions
  addToCart: 'Add to cart',
  removeFromCart: 'Remove from cart',
  updateQuantity: (quantity: number) => `Quantity ${quantity}`,
  increaseQuantity: 'Increase quantity',
  decreaseQuantity: 'Decrease quantity',
  moveToCart: 'Move to cart',
  addToWishlist: 'Add to wishlist',
  removeFromWishlist: 'Remove from wishlist',
  viewProductDetails: 'View product details',

  // Product info
  productPrice: (price: number) => `Price: ₹${price.toLocaleString()}`,
  productOriginalPrice: (price: number) => `Original price: ₹${price.toLocaleString()}`,
  productDiscount: (discount: number) => `${discount} percent discount`,
  productRating: (rating: number) => `Rating: ${rating} out of 5 stars`,
  productRatingCount: (count: number) => `${count} ratings`,

  // Cart
  clearCart: 'Clear all items from cart',
  proceedToCheckout: 'Proceed to checkout',
  cartTotal: (total: number) => `Cart total: ₹${total.toLocaleString()}`,
  cartItemCount: (count: number) => `${count} items in cart`,

  // Checkout
  selectPaymentMethod: 'Select payment method',
  confirmOrder: 'Confirm order',
  cashOnDelivery: 'Cash on delivery payment method',
  upiPayment: 'UPI payment method',

  // General
  close: 'Close',
  done: 'Done',
  refresh: 'Refresh',
  clear: 'Clear',
  search: 'Search',
  filter: 'Filter',
  loading: 'Loading',
  noResults: 'No results found',
  error: 'An error occurred',

  // Empty states
  emptyCart: 'Your cart is empty',
  emptyWishlist: 'Your wishlist is empty',
  emptyProducts: 'No products found',

  // Category
  category: (name: string) => `Category: ${name}`,
  selectCategory: (name: string) => `Select ${name} category`,
};

export const a11yHints = {
  // Navigation hints
  goBackHint: 'Navigate to the previous screen',
  addToCartHint: 'Add this product to your shopping cart',
  removeFromCartHint: 'Remove this product from your cart',
  viewDetailsHint: 'View more details about this product',

  // Action hints
  doubleTap: 'Double tap to activate',
  swipeHint: 'Swipe left for more options',

  // State hints
  inCart: 'Already in cart',
  inWishlist: 'Saved to wishlist',
  selected: 'Selected',
  notSelected: 'Not selected',
};

import { AccessibilityRole } from 'react-native';

export const a11yRoles: Record<string, AccessibilityRole> = {
  button: 'button',
  link: 'link',
  header: 'header',
  text: 'text',
  image: 'image',
  summary: 'summary',
  tab: 'tab',
  list: 'list',
  listItem: 'list', // Changed from 'listitem' to valid 'list'
  search: 'search',
  none: 'none',
};
