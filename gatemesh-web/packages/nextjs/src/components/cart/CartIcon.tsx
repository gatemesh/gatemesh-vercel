'use client';

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';

export function CartIcon() {
  const { getTotalItems, openCart } = useCartStore();
  const itemCount = getTotalItems();

  return (
    <button
      onClick={openCart}
      className="relative p-2 text-earth-700 hover:text-primary-600 transition"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
}