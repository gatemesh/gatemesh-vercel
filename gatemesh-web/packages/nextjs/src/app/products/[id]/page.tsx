'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, CheckCircle, Wifi, Battery, Shield } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { Logo } from '@/components/marketing/Logo';
import { ProductCard } from '@/components/marketing/ProductCard';
import { CartIcon } from '@/components/cart/CartIcon';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { useCartStore } from '@/stores/cartStore';

interface ProductDetailPageProps {
  params: { id: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = PRODUCTS.find(p => p.id === params.id);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { addItem } = useCartStore();
  
  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-earth-800 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-primary-600 hover:text-primary-700 font-semibold">
            ← Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const totalPrice = product.price * selectedQuantity;

  const handleAddToCart = () => {
    addItem(product, selectedQuantity);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-earth-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Logo size="md" />
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/products" className="text-primary-600 font-semibold">
                Products
              </Link>
              <Link href="/pricing" className="text-earth-700 hover:text-primary-600 font-semibold transition">
                Pricing
              </Link>
              <Link href="/how-it-works" className="text-earth-700 hover:text-primary-600 font-semibold transition">
                How It Works
              </Link>
              <Link href="/config/demo" className="bg-accent-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent-600 transition">
                Try Demo
              </Link>
              <CartIcon />
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-earth-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-earth-600 hover:text-primary-600">Home</Link>
            <span className="text-earth-400">/</span>
            <Link href="/products" className="text-earth-600 hover:text-primary-600">Products</Link>
            <span className="text-earth-400">/</span>
            <span className="text-earth-800 font-semibold">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="aspect-square bg-earth-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-4xl text-primary-600">📡</div>
                </div>
                <p className="text-earth-600 text-sm">Product Image</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h1 className="text-3xl font-bold text-earth-800 mb-4">{product.name}</h1>
              <p className="text-xl text-soil-600 mb-6">{product.description}</p>
              
              <div className="text-3xl font-bold text-primary-600 mb-6">
                ${(product.price / 100).toFixed(2)}
                <span className="text-lg text-earth-600 font-normal"> per unit</span>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <Wifi className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-earth-800">{product.specs.range}</div>
                  <div className="text-xs text-earth-600">Range</div>
                </div>
                <div className="text-center">
                  <Battery className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-earth-800">{product.specs.batteryLife}</div>
                  <div className="text-xs text-earth-600">Battery Life</div>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-earth-800">{product.specs.rating}</div>
                  <div className="text-xs text-earth-600">IP Rating</div>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="border-t border-earth-200 pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <label className="font-semibold text-earth-800">Quantity:</label>
                  <select
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                    className="px-3 py-2 border border-earth-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    {[1, 2, 3, 5, 10, 25, 50].map(qty => (
                      <option key={qty} value={qty}>{qty}</option>
                    ))}
                  </select>
                  <span className="text-earth-600">Total: ${((totalPrice / 100)).toFixed(2)}</span>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-primary-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-primary-600 transition flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart - ${((totalPrice / 100)).toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Features */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-earth-800 mb-6">Features</h2>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-earth-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-earth-800 mb-6">Specifications</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold text-earth-800">Range:</span>
                <span className="text-earth-700">{product.specs.range}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-earth-800">Battery Life:</span>
                <span className="text-earth-700">{product.specs.batteryLife}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-earth-800">Hardware:</span>
                <span className="text-earth-700">{product.specs.hardware}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-earth-800">IP Rating:</span>
                <span className="text-earth-700">{product.specs.rating}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-earth-800">Enclosure:</span>
                <span className="text-earth-700">{product.specs.enclosure}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-earth-800 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Cart Sidebar */}
      <CartSidebar />
    </main>
  );
}