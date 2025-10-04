'use client';

import { Fragment } from 'react';
import { X, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function CartSidebar() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeItem, 
    getTotalPrice, 
    getTotalItems 
  } = useCartStore();

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId, url } = await response.json();
      
      // Redirect to Stripe Checkout using the session URL
      if (url) {
        window.location.href = url;
      } else if (sessionId) {
        // Fallback to constructing URL
        window.location.href = `https://checkout.stripe.com/c/pay/${sessionId}`;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={closeCart}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-earth-200">
            <h2 className="text-lg font-semibold text-earth-800 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Cart ({getTotalItems()})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-earth-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-earth-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-earth-300 mx-auto mb-4" />
                <p className="text-earth-600">Your cart is empty</p>
                <button
                  onClick={closeCart}
                  className="mt-4 text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="border border-earth-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 bg-earth-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">
                          {item.product.category === 'irrigation' && '💧'}
                          {item.product.category === 'livestock' && '🐄'}
                          {item.product.category === 'infrastructure' && '📡'}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-earth-800 text-sm">
                          {item.product.name}
                        </h3>
                        <p className="text-primary-600 font-bold">
                          ${(item.product.price / 100).toFixed(2)} each
                        </p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 bg-earth-100 text-earth-600 rounded-full hover:bg-earth-200 transition flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition flex items-center justify-center"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="mt-2 text-right">
                          <span className="font-bold text-earth-800">
                            ${((item.product.price * item.quantity) / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-earth-200 p-4">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-earth-600">Subtotal</span>
                  <span className="font-semibold">
                    ${(getTotalPrice() / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-earth-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t border-earth-200 pt-2">
                  <span>Total</span>
                  <span className="text-primary-600">
                    ${(getTotalPrice() / 100).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}