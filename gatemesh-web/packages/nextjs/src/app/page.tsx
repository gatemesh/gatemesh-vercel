import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/marketing/ProductCard';
import { Logo } from '@/components/marketing/Logo';
import { CartIcon } from '@/components/cart/CartIcon';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { UserMenu } from '@/components/auth/UserMenu';

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter(p => p.featured);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-earth-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Logo size="md" />
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/products" className="text-earth-700 hover:text-primary-600 font-semibold transition">
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
              <div className="flex items-center gap-4">
                <CartIcon />
                <UserMenu />
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-earth-800 mb-6">
              Professional Agriculture IoT at Half the Price
            </h1>
            <p className="text-xl text-soil-600 mb-8">
              Monitor water, livestock, and equipment across your entire farm with 
              long-range LoRa mesh networking (5-15km range per node)
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/products" 
                className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition"
              >
                Shop Products
              </Link>
              <Link 
                href="/config/demo" 
                className="border-2 border-primary-500 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition"
              >
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-earth-800 mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/products"
              className="bg-earth-100 text-earth-800 px-8 py-3 rounded-lg font-semibold hover:bg-earth-200 transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Stats/Proof */}
      <section className="bg-earth-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-primary-600">10km+</div>
              <div className="text-soil-600">Range per node</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">3-5 years</div>
              <div className="text-soil-600">Battery life</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">40%</div>
              <div className="text-soil-600">Water savings</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">50%</div>
              <div className="text-soil-600">Less than competitors</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-earth-800 mb-8 text-center">Simple Setup</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-bold text-earth-800 mb-2">Order & Receive</h3>
              <p className="text-soil-600">
                Choose your nodes, complete checkout, receive within 3-5 business days
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-bold text-earth-800 mb-2">5-Step Setup</h3>
              <p className="text-soil-600">
                Connect via USB, run our 5-step setup wizard, deploy in minutes
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-bold text-earth-800 mb-2">Monitor & Control</h3>
              <p className="text-soil-600">
                Real-time monitoring, alerts, and automated control from anywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <Logo variant="dark" size="sm" />
              <p className="text-earth-300 mt-4 text-sm">
                Smart agriculture IoT systems for modern farms.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-earth-300">
                <li><Link href="/products" className="hover:text-white">All Products</Link></li>
                <li><Link href="/products?category=irrigation" className="hover:text-white">Irrigation Control</Link></li>
                <li><Link href="/products?category=livestock" className="hover:text-white">Livestock Tracking</Link></li>
                <li><Link href="/products?category=infrastructure" className="hover:text-white">Network Infrastructure</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-earth-300">
                <li><Link href="/resources" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/resources" className="hover:text-white">Community Forum</Link></li>
                <li><a href="mailto:support@gatemesh.com" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-earth-300">
                <li><a href="mailto:sales@gatemesh.com" className="hover:text-white">Contact Sales</a></li>
                <li><a href="mailto:careers@gatemesh.com" className="hover:text-white">Careers</a></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-earth-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-earth-400">
                © 2025 GateMesh. All rights reserved.
              </div>
              <div className="flex gap-4 text-sm text-earth-400">
                <a href="mailto:support@gatemesh.com" className="hover:text-white flex items-center gap-2">
                  support@gatemesh.com
                </a>
                <span className="hover:text-white">
                  1-800-GATEMESH
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Cart Sidebar */}
      <CartSidebar />
    </main>
  );
}