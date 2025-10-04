'use client';

import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Package, Settings, CreditCard, Radio, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (searchParams.get('welcome') === 'true') {
      setShowWelcome(true);
      const timer = setTimeout(() => setShowWelcome(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const userName = session?.user?.name?.split(' ')[0] || 'User';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Message */}
      {showWelcome && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Welcome to GateMesh! Your account has been created successfully.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {userName}!
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage your devices, orders, and account settings
              </p>
            </div>
            <Link
              href="/"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to Store
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link
              href="/config"
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition group"
            >
              <div className="flex items-center">
                <Radio className="h-8 w-8 text-primary-600 group-hover:text-primary-700" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Device Config</h3>
                  <p className="text-sm text-gray-500">Configure your GateMesh devices</p>
                </div>
              </div>
            </Link>

            <Link
              href="/orders"
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition group"
            >
              <div className="flex items-center">
                <Package className="h-8 w-8 text-primary-600 group-hover:text-primary-700" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Orders</h3>
                  <p className="text-sm text-gray-500">View your order history</p>
                </div>
              </div>
            </Link>

            <Link
              href="/account"
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition group"
            >
              <div className="flex items-center">
                <Settings className="h-8 w-8 text-primary-600 group-hover:text-primary-700" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Account</h3>
                  <p className="text-sm text-gray-500">Manage your profile</p>
                </div>
              </div>
            </Link>

            <Link
              href="/billing"
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition group"
            >
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-primary-600 group-hover:text-primary-700" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Billing</h3>
                  <p className="text-sm text-gray-500">Manage subscriptions</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="text-center py-12">
                <Radio className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No devices configured yet
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by configuring your first GateMesh device.
                </p>
                <div className="mt-6">
                  <Link
                    href="/config"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                  >
                    <Radio className="-ml-1 mr-2 h-5 w-5" />
                    Configure Device
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Getting Started
              </h3>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100">
                      <span className="text-sm font-medium text-primary-600">1</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900">
                      Order your devices
                    </h4>
                    <p className="text-sm text-gray-500">
                      Browse our product catalog and place your first order.
                    </p>
                    <Link href="/products" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Shop products →
                    </Link>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100">
                      <span className="text-sm font-medium text-primary-600">2</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900">
                      Configure your network
                    </h4>
                    <p className="text-sm text-gray-500">
                      Set up your mesh network and configure device settings.
                    </p>
                    <Link href="/config" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Start configuration →
                    </Link>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100">
                      <span className="text-sm font-medium text-primary-600">3</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900">
                      Monitor and manage
                    </h4>
                    <p className="text-sm text-gray-500">
                      Track your devices and receive real-time updates.
                    </p>
                    <span className="text-gray-400 text-sm font-medium">
                      Available after device setup
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}