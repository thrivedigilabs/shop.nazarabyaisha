import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WishlistStore {
  items: string[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId) => {
        const { items } = get();
        if (!items.includes(productId)) {
          set({ items: [...items, productId] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter(id => id !== productId) });
      },

      isInWishlist: (productId) => {
        return get().items.includes(productId);
      }
    }),
    {
      name: 'nazara-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
