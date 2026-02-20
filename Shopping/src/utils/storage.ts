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
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};

export const loadCart = async (): Promise<StorageCartItem[]> => {
  try {
    const cartData = await AsyncStorage.getItem(CART_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error loading cart:', error);
    return [];
  }
};

export const saveWishlist = async (wishlist: string[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  } catch (error) {
    console.error('Error saving wishlist:', error);
  }
};

export const loadWishlist = async (): Promise<string[]> => {
  try {
    const wishlistData = await AsyncStorage.getItem(WISHLIST_KEY);
    return wishlistData ? JSON.parse(wishlistData) : [];
  } catch (error) {
    console.error('Error loading wishlist:', error);
    return [];
  }
};

export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([CART_KEY, WISHLIST_KEY]);
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};
