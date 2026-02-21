import { create } from 'zustand';
import type { Product, CartItem } from '../index';
import * as storage from '../utils/storage';

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getCartItemsCount: () => number;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
  initializeCart: (products: Product[]) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  initializeCart: (products: Product[]) => {
    storage.loadCart().then((storedCart) => {
      const cartItems: CartItem[] = storedCart
        .map((stored) => {
          const product = products.find((p) => p.id === stored.id);
          if (product) {
            return { ...product, quantity: stored.quantity };
          }
          return null;
        })
        .filter((item): item is CartItem => item !== null);

      set({ items: cartItems });
    });
  },

  addItem: (product: Product) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      let newItems: CartItem[];

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...product, quantity: 1 }];
      }

      // Persist to storage
      storage.saveCart(
        newItems.map((item) => ({ id: item.id, quantity: item.quantity }))
      );

      return { items: newItems };
    });
  },

  removeItem: (productId: string) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== productId);

      // Persist to storage
      storage.saveCart(
        newItems.map((item) => ({ id: item.id, quantity: item.quantity }))
      );

      return { items: newItems };
    });
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );

      // Persist to storage
      storage.saveCart(
        newItems.map((item) => ({ id: item.id, quantity: item.quantity }))
      );

      return { items: newItems };
    });
  },

  clearCart: () => {
    set({ items: [] });
    storage.saveCart([]);
  },

  getCartTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.discountPrice * item.quantity,
      0
    );
  },

  getCartCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },

  getCartItemsCount: () => {
    return get().items.length;
  },

  isInCart: (productId: string) => {
    return get().items.some((item) => item.id === productId);
  },

  getItemQuantity: (productId: string) => {
    const item = get().items.find((i) => i.id === productId);
    return item?.quantity ?? 0;
  },
}));
