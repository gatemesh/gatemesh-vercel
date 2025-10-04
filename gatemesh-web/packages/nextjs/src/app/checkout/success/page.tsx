'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Clock, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/marketing/Logo';
import { useCartStore } from '@/stores/cartStore';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCartStore();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Clear the cart on successful checkout
    clearCart();
    
    // In a real app, you would fetch order details from your backend using the session_id
    // For now, we'll just show a success message
    if (sessionId) {
      setOrderDetails({
        orderNumber: `ORD-${sessionId.slice(-8).toUpperCase()}`,
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      });
    }
  }, [sessionId, clearCart]);

  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-earth-800 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-soil-600 mb-8">
            Thank you for your purchase. We'll send you a confirmation email shortly.
          </p>

          {/* Order Details */}
          {orderDetails && (
            <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <Package className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-earth-800 mb-1">Order Number</h3>
                  <p className="text-earth-600">{orderDetails.orderNumber}</p>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-earth-800 mb-1">Estimated Delivery</h3>
                  <p className="text-earth-600">{orderDetails.estimatedDelivery}</p>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-primary-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-earth-800 mb-4">What's Next?</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-earth-800">Order Processing</h3>
                  <p className="text-earth-600 text-sm">We'll prepare your IoT devices and run quality checks</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-earth-800">Shipping & Tracking</h3>
                  <p className="text-earth-600 text-sm">You'll receive tracking information via email</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-earth-800">Setup Support</h3>
                  <p className="text-earth-600 text-sm">Our team will help you configure your devices</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-earth-100 text-earth-800 px-6 py-3 rounded-lg font-semibold hover:bg-earth-200 transition flex items-center justify-center gap-2"
            >
              Continue Shopping
            </Link>
            <Link
              href="/config/demo"
              className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition flex items-center justify-center gap-2"
            >
              Try Demo Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-earth-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Logo size="md" />
          </Link>
        </div>
      </header>

      <Suspense fallback={
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
            <h1 className="text-3xl font-bold text-earth-800 mb-4">
              Processing...
            </h1>
            <p className="text-xl text-soil-600">
              Please wait while we confirm your order.
            </p>
          </div>
        </div>
      }>
        <CheckoutSuccessContent />
      </Suspense>
    </main>
  );
}