import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(persist(
  (set, get) => ({
    items: [],
    isOpen: false,
    
    addItem: (product, quantity = 1) => {
      const items = get().items;
      const existingItem = items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        set({
          items: items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        });
      } else {
        set({
          items: [...items, { product, quantity }]
        });
      }
    },
    
    removeItem: (productId) => {
      set({
        items: get().items.filter(item => item.product.id !== productId)
      });
    },
    
    updateQuantity: (productId, quantity) => {
      if (quantity <= 0) {
        get().removeItem(productId);
        return;
      }
      
      set({
        items: get().items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      });
    },
    
    clearCart: () => {
      set({ items: [] });
    },
    
    openCart: () => {
      set({ isOpen: true });
    },
    
    closeCart: () => {
      set({ isOpen: false });
    },
    
    getTotalItems: () => {
      return get().items.reduce((total, item) => total + item.quantity, 0);
    },
    
    getTotalPrice: () => {
      return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }
  }),
  {
    name: 'gatemesh-cart',
    storage: createJSONStorage(() => localStorage),
  }
));