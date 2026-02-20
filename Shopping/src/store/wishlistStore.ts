import { create } from 'zustand';
import * as storage from '../utils/storage';

interface WishlistState {
  items: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  getWishlistCount: () => number;
  initializeWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],

  initializeWishlist: () => {
    storage.loadWishlist().then((storedWishlist) => {
      set({ items: storedWishlist });
    });
  },

  toggleWishlist: (productId: string) => {
    set((state) => {
      const isInList = state.items.includes(productId);
      const newItems = isInList
        ? state.items.filter((id) => id !== productId)
        : [...state.items, productId];

      // Persist to storage
      storage.saveWishlist(newItems);

      return { items: newItems };
    });
  },

  isInWishlist: (productId: string) => {
    return get().items.includes(productId);
  },

  removeFromWishlist: (productId: string) => {
    set((state) => {
      const newItems = state.items.filter((id) => id !== productId);

      // Persist to storage
      storage.saveWishlist(newItems);

      return { items: newItems };
    });
  },

  clearWishlist: () => {
    set({ items: [] });
    storage.saveWishlist([]);
  },

  getWishlistCount: () => {
    return get().items.length;
  },
}));
