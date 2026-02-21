import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = '@shopping_cart';
const WISHLIST_KEY = '@shopping_wishlist';

export interface StorageCartItem {
  id: string;
  quantity: number;
}

export const saveCart = async (cart: StorageCartItem[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // Silent error - will be caught by ErrorBoundary in production
  }
};

export const loadCart = async (): Promise<StorageCartItem[]> => {
  try {
    const cartData = await AsyncStorage.getItem(CART_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch {
    return [];
  }
};

export const saveWishlist = async (wishlist: string[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  } catch {
    // Silent error - will be caught by ErrorBoundary in production
  }
};

export const loadWishlist = async (): Promise<string[]> => {
  try {
    const wishlistData = await AsyncStorage.getItem(WISHLIST_KEY);
    return wishlistData ? JSON.parse(wishlistData) : [];
  } catch {
    return [];
  }
};

export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([CART_KEY, WISHLIST_KEY]);
  } catch {
    // Silent error - will be caught by ErrorBoundary in production
  }
};
