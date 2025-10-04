'use client';

import Link from 'next/link';
import { Product } from '@/data/products';
import { useCartStore } from '@/stores/cartStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  return (
    <div className="border border-soil-200 rounded-lg p-6 hover:shadow-lg transition bg-white">
      <div className="aspect-video bg-earth-50 rounded-lg mb-4 flex items-center justify-center">
        {/* Placeholder for product image */}
        <span className="text-soil-400 text-4xl">
          {product.category === 'irrigation' && '💧'}
          {product.category === 'crop-monitoring' && '🌱'}
          {product.category === 'livestock' && '🐄'}
          {product.category === 'infrastructure' && '📡'}
          {product.category === 'weather' && '🌤️'}
          {product.category === 'power' && '🔋'}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-earth-800 mb-2">{product.name}</h3>
      <p className="text-soil-600 mb-4 text-sm">{product.description}</p>
      
      {/* Key Specs */}
      <div className="space-y-1 mb-4 text-xs text-soil-700">
        <div className="flex justify-between">
          <span>Range:</span>
          <span className="font-semibold">{product.specs.range}</span>
        </div>
        <div className="flex justify-between">
          <span>Battery:</span>
          <span className="font-semibold">{product.specs.batteryLife}</span>
        </div>
        <div className="flex justify-between">
          <span>Rating:</span>
          <span className="font-semibold">{product.specs.rating}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-primary-600">
          ${(product.price / 100).toFixed(2)}
        </span>
        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="text-sm px-3 py-2 border border-primary-500 text-primary-600 rounded hover:bg-primary-50 transition"
          >
            Details
          </Link>
          <button 
            onClick={handleAddToCart}
            className="text-sm bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}