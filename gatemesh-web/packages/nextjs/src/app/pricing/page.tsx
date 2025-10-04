'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Calculator, Zap, Building, Crown } from 'lucide-react';
import { Logo } from '@/components/marketing/Logo';
import { CartIcon } from '@/components/cart/CartIcon';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { PRODUCTS } from '@/data/products';

const SUBSCRIPTION_TIERS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    description: 'Perfect for getting started with IoT monitoring',
    icon: Zap,
    features: [
      'Up to 5 nodes',
      'Basic dashboard',
      'Email alerts',
      '24/7 monitoring',
      'Mobile app access',
      'Community support',
      'Data export (CSV)',
    ],
    limitations: [
      'No custom alerting rules',
      'No API access',
      'No priority support',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 29,
    description: 'Advanced features for growing operations',
    icon: Building,
    popular: true,
    features: [
      'Up to 50 nodes',
      'Advanced dashboard with custom widgets',
      'SMS + Email + Push alerts',
      'Custom alerting rules',
      'Historical data (2 years)',
      'API access (1000 calls/day)',
      'Priority email support',
      'Data export (CSV, JSON)',
      'Weather integration',
      'Scheduled reports',
    ],
    limitations: [
      'No phone support',
      'No custom integrations',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    description: 'Complete solution for large-scale operations',
    icon: Crown,
    features: [
      'Unlimited nodes',
      'Custom dashboard branding',
      'Multi-user management',
      'Custom alerting workflows',
      'Unlimited historical data',
      'Unlimited API access',
      '24/7 phone support',
      'Custom integrations',
      'Data export (all formats)',
      'White-label mobile app',
      'Dedicated account manager',
      'On-site training',
      'Custom hardware configurations',
    ],
    limitations: [],
  },
];

const SETUP_CALCULATOR_PRODUCTS = [
  { id: 'water-level-sensor', name: 'Water Level Sensor', price: 179, category: 'irrigation' },
  { id: 'soil-moisture-sensor', name: 'Soil Moisture Sensor', price: 169, category: 'irrigation' },
  { id: 'livestock-tracker', name: 'Livestock GPS Tracker', price: 249, category: 'livestock' },
  { id: 'proximity-monitor', name: 'Proximity Monitor', price: 199, category: 'livestock' },
  { id: 'headgate-controller-basic', name: 'LoRa Headgate Controller (Basic)', price: 329, category: 'infrastructure' },
  { id: 'headgate-controller-pro', name: 'LoRa Headgate Controller (Pro)', price: 549, category: 'infrastructure' },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [calculatorItems, setCalculatorItems] = useState<Record<string, number>>({});

  const getPrice = (tierPrice: number) => {
    if (tierPrice === 0) return 'Free';
    const price = billingPeriod === 'yearly' ? tierPrice * 10 : tierPrice; // 2 months free yearly
    return `$${price}${billingPeriod === 'yearly' ? '/year' : '/month'}`;
  };

  const getYearlySavings = (monthlyPrice: number) => {
    if (monthlyPrice === 0) return null;
    const savings = monthlyPrice * 2; // 2 months free
    return `Save $${savings}`;
  };

  const updateCalculatorItem = (productId: string, quantity: number) => {
    setCalculatorItems(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const calculateTotal = () => {
    return Object.entries(calculatorItems).reduce((total, [productId, quantity]) => {
      const product = SETUP_CALCULATOR_PRODUCTS.find(p => p.id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(calculatorItems).reduce((sum, quantity) => sum + quantity, 0);
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
              <Link href="/products" className="text-earth-700 hover:text-primary-600 font-semibold transition">
                Products
              </Link>
              <Link href="/pricing" className="text-primary-600 font-semibold">
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

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-earth-800 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-soil-600 mb-8 max-w-2xl mx-auto">
            Choose the plan that fits your operation. All plans include unlimited data monitoring and 99.9% uptime guarantee.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`font-semibold ${billingPeriod === 'monthly' ? 'text-primary-600' : 'text-earth-600'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-16 h-8 bg-earth-200 rounded-full p-1 transition"
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${
                billingPeriod === 'yearly' ? 'translate-x-8' : 'translate-x-0'
              }`} />
            </button>
            <span className={`font-semibold ${billingPeriod === 'yearly' ? 'text-primary-600' : 'text-earth-600'}`}>
              Yearly
            </span>
            <span className="text-sm bg-accent-100 text-accent-700 px-2 py-1 rounded-full">
              Save 20%
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {SUBSCRIPTION_TIERS.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.id}
                  className={`relative bg-white rounded-lg shadow-lg p-8 ${
                    tier.popular ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <Icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-earth-800 mb-2">{tier.name}</h3>
                    <p className="text-earth-600 mb-4">{tier.description}</p>
                    <div className="text-4xl font-bold text-primary-600 mb-2">
                      {getPrice(tier.price)}
                    </div>
                    {tier.price > 0 && billingPeriod === 'yearly' && (
                      <p className="text-sm text-accent-600 font-semibold">
                        {getYearlySavings(tier.price)}
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                        <span className="text-earth-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition ${
                      tier.popular
                        ? 'bg-primary-500 text-white hover:bg-primary-600'
                        : 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    {tier.price === 0 ? 'Get Started Free' : 'Start Free Trial'}
                  </button>

                  {tier.limitations.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-earth-200">
                      <p className="text-sm font-semibold text-earth-600 mb-2">Not included:</p>
                      <ul className="space-y-1">
                        {tier.limitations.map((limitation, index) => (
                          <li key={index} className="text-sm text-earth-500">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Setup Cost Calculator */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Calculator className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-earth-800 mb-4">Setup Cost Calculator</h2>
            <p className="text-xl text-soil-600 max-w-2xl mx-auto">
              Plan your IoT deployment and get an instant cost estimate for your hardware needs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Product Selection */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-earth-800 mb-6">Select Your Products</h3>
                <div className="space-y-4">
                  {SETUP_CALCULATOR_PRODUCTS.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border border-earth-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-earth-800">{product.name}</h4>
                        <p className="text-sm text-earth-600 capitalize">{product.category}</p>
                        <p className="text-lg font-bold text-primary-600">${product.price}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateCalculatorItem(product.id, Math.max(0, (calculatorItems[product.id] || 0) - 1))}
                          className="w-8 h-8 bg-earth-100 text-earth-600 rounded-full hover:bg-earth-200 transition"
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-semibold">
                          {calculatorItems[product.id] || 0}
                        </span>
                        <button
                          onClick={() => updateCalculatorItem(product.id, (calculatorItems[product.id] || 0) + 1)}
                          className="w-8 h-8 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Summary */}
              <div className="lg:col-span-1">
                <div className="bg-earth-50 rounded-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-earth-800 mb-6">Cost Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    {Object.entries(calculatorItems).filter(([_, qty]) => qty > 0).map(([productId, quantity]) => {
                      const product = SETUP_CALCULATOR_PRODUCTS.find(p => p.id === productId);
                      if (!product) return null;
                      
                      return (
                        <div key={productId} className="flex justify-between text-sm">
                          <span className="text-earth-700">
                            {product.name} × {quantity}
                          </span>
                          <span className="font-semibold">
                            ${(product.price * quantity).toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-earth-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-earth-800">Total Hardware</span>
                      <span className="text-2xl font-bold text-primary-600">
                        ${calculateTotal().toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-earth-600 mt-1">
                      {getTotalItems()} items
                    </p>
                  </div>

                  <div className="space-y-4 text-sm text-earth-600">
                    <div className="flex justify-between">
                      <span>Shipping (US)</span>
                      <span>{getTotalItems() > 0 ? 'Free' : '$0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Setup Support</span>
                      <span>Included</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Warranty</span>
                      <span>2 years</span>
                    </div>
                  </div>

                  {getTotalItems() > 0 && (
                    <button className="w-full mt-6 bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition">
                      Request Quote
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-earth-800 mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-earth-800 mb-2">Do I need to pay for each device?</h3>
              <p className="text-earth-700">
                No! You only pay one subscription fee per account. Your subscription level determines how many devices you can connect. 
                Basic (5 devices), Professional (50 devices), Enterprise (unlimited).
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-earth-800 mb-2">What happens to my data if I cancel?</h3>
              <p className="text-earth-700">
                You can export all your historical data at any time. After cancellation, you have 30 days to download your data 
                before it's permanently deleted from our servers.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-earth-800 mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-earth-700">
                Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at your next billing cycle. 
                We'll pro-rate any charges.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-earth-800 mb-2">Is there a setup fee?</h3>
              <p className="text-earth-700">
                No setup fees! We include free setup support with every hardware purchase. Our team will help you configure your devices 
                and get your monitoring system running.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cart Sidebar */}
      <CartSidebar />
    </main>
  );
}