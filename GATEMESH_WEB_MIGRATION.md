# GateMesh Web Platform Migration Guide

## Current State
- Repository: `gatemesh/gatemesh-vercel` (monorepo with pnpm)
- Current: React config app at root with 5-step wizard
- Tech: React 18, TypeScript 5, Vite 5, Tailwind CSS, Zustand
- Location: `packages/web/`

## Goal
Transform into full e-commerce platform:
- Marketing website at `/`
- E-commerce with Stripe payments
- Config app moved to `/app/*` route
- Shared authentication

---

## Phase 1: Project Setup

### 1.1 Create Next.js App
```bash
cd gatemesh-web/packages
pnpm create next-app@latest marketing --typescript --tailwind --app --src-dir --import-alias "@/*"
```

Prompts:
- TypeScript: ✅
- ESLint: ✅
- Tailwind CSS: ✅
- src/ directory: ✅
- App Router: ✅
- Import alias: `@/*`

### 1.2 Install Dependencies
```bash
cd marketing

# Core
pnpm add @stripe/stripe-js stripe
pnpm add next-auth @auth/prisma-adapter
pnpm add @prisma/client
pnpm add zustand
pnpm add lucide-react
pnpm add recharts

# Dev
pnpm add -D prisma @types/node
```

### 1.3 Environment Variables
Create `marketing/.env.local`:
```env
DATABASE_URL="postgresql://user:pass@host:5432/gatemesh"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-random-32-chars"
```

---

## Phase 2: Branding Configuration

### 2.1 Tailwind Config
Update `marketing/tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#6B8E23',  // Crop Green
          600: '#5e7e1f',
        },
        earth: {
          500: '#8B7355',  // Earth Brown
          800: '#44362a',
        },
        accent: {
          500: '#DAA520',  // Harvest Gold
        },
        soil: {
          500: '#D2B48C',  // Tan
          600: '#bda47e',
        },
      },
    },
  },
  plugins: [],
}
export default config
```

### 2.2 Logo Component
Create `marketing/src/components/marketing/Logo.tsx`:

```typescript
interface LogoProps {
  variant?: 'primary' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ variant = 'primary', size = 'md' }: LogoProps) {
  const sizeMap = { sm: 32, md: 48, lg: 64 };
  const dim = sizeMap[size];

  return (
    <div className="flex items-center gap-2">
      <svg width={dim} height={dim} viewBox="0 0 64 64">
        {/* Hexagon badge */}
        <path
          d="M32 2L54 16L54 48L32 62L10 48L10 16Z"
          fill={variant === 'dark' ? '#fff' : '#6B8E23'}
        />
        {/* Corn icon - simplified */}
        <circle cx="32" cy="32" r="12" fill="#DAA520" />
      </svg>
      <span className={`font-bold text-${variant === 'dark' ? 'white' : 'earth-800'}`}>
        GATEMESH
      </span>
    </div>
  );
}
```

---

## Phase 3: Database Schema

### 3.1 Prisma Schema
Create `marketing/prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String
  price       Int      // cents
  bom         Int      // cents
  category    String
  specs       Json
  features    String[]
  images      String[]
  inStock     Boolean  @default(true)
  featured    Boolean  @default(false)

  stripeProductId String? @unique
  stripePriceId   String? @unique

  orderItems  OrderItem[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  role          UserRole  @default(CUSTOMER)

  orders        Order[]
  subscription  Subscription?
  nodes         Node[]

  createdAt DateTime @default(now())
}

enum UserRole {
  CUSTOMER
  ADMIN
  SALES
  INSTALLER
}

model Order {
  id              String      @id @default(cuid())
  orderNumber     String      @unique
  userId          String
  user            User        @relation(fields: [userId], references: [id])
  status          OrderStatus @default(PENDING)
  total           Int
  shippingAddress Json

  stripePaymentIntentId String? @unique
  items                 OrderItem[]

  createdAt DateTime @default(now())
}

enum OrderStatus {
  PENDING
  PAID
  SHIPPED
  DELIVERED
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  price     Int
}

model Subscription {
  id                     String             @id @default(cuid())
  userId                 String             @unique
  user                   User               @relation(fields: [userId], references: [id])
  tier                   SubscriptionTier
  status                 SubscriptionStatus
  stripeSubscriptionId   String? @unique

  createdAt DateTime @default(now())
}

enum SubscriptionTier {
  COMMUNITY
  PROFESSIONAL
  ENTERPRISE
}

enum SubscriptionStatus {
  ACTIVE
  CANCELLED
}

model Node {
  id       String @id @default(cuid())
  userId   String
  user     User   @relation(fields: [userId], references: [id])
  nodeId   String @unique
  name     String
  nodeType String
  config   Json

  createdAt DateTime @default(now())
}
```

Initialize:
```bash
cd marketing
pnpm prisma generate
pnpm prisma db push
```

---

## Phase 4: Product Data

### 4.1 Create Product Catalog
Create `marketing/src/data/products.ts`:

```typescript
export const PRODUCTS = [
  {
    id: "water-level-sensor",
    name: "Water Level Sensor",
    slug: "water-level-sensor",
    description: "Real-time water level monitoring with solar power and mesh networking",
    price: 17900, // $179.00
    bom: 10080,
    category: "irrigation",
    specs: {
      hardware: "Heltec V4 HIGH (28dBm)",
      enclosure: "RAK Unify Large + Solar",
      sensor: "JSN-SR04T Ultrasonic (4.5m range)",
      battery: "3000mAh LiPo + Solar",
      range: "5-15km",
      batteryLife: "3-5 years",
      rating: "IP67"
    },
    features: [
      "Real-time water level monitoring",
      "Temperature sensing",
      "Solar powered (3-5 year battery)",
      "LoRa mesh networking (5-15km range)",
      "Remote alerts",
      "IP67 weatherproof"
    ],
    images: ["/products/water-level-sensor.jpg"],
    inStock: true,
    featured: true
  },
  {
    id: "soil-moisture-sensor",
    name: "Soil Moisture Sensor",
    slug: "soil-moisture-sensor",
    description: "Precision soil monitoring for optimal irrigation management",
    price: 16900,
    bom: 8780,
    category: "crop-monitoring",
    specs: {
      hardware: "Heltec V4 LOW (22dBm)",
      enclosure: "RAK Unify Small + Solar",
      sensor: "Capacitive (corrosion resistant)",
      battery: "1500mAh LiPo + Solar",
      range: "3-10km",
      batteryLife: "3-5 years",
      rating: "IP65"
    },
    features: [
      "Capacitive soil moisture",
      "Temperature & humidity",
      "Solar powered",
      "Mesh networking",
      "Automated irrigation triggers",
      "Historical data tracking"
    ],
    images: ["/products/soil-moisture.jpg"],
    inStock: true,
    featured: true
  },
  {
    id: "livestock-tracker",
    name: "Livestock Tracker",
    slug: "livestock-tracker",
    description: "GPS-enabled livestock tracking with health monitoring",
    price: 24900,
    bom: 11950,
    category: "livestock",
    specs: {
      hardware: "Heltec V4 HIGH + GPS",
      enclosure: "RAK Unify Small + Solar (Ruggedized)",
      gps: "NEO-M8N U-blox",
      battery: "2500mAh LiPo + Solar",
      range: "10-20km",
      batteryLife: "2-4 years",
      rating: "IP68"
    },
    features: [
      "Real-time GPS tracking",
      "Motion & activity monitoring",
      "Geofencing with alerts",
      "Solar powered",
      "Durable collar mounting",
      "Health insights"
    ],
    images: ["/products/livestock-tracker.jpg"],
    inStock: true,
    featured: true
  },
  {
    id: "headgate-controller",
    name: "Headgate Controller (Controller Only)",
    slug: "headgate-controller",
    description: "Advanced irrigation gate control with remote operation",
    price: 32900,
    bom: 13050,
    category: "irrigation",
    specs: {
      hardware: "Heltec V4 HIGH",
      enclosure: "RAK Unify Large + Solar",
      relays: "30A dual-channel",
      battery: "3500mAh LiPo + Solar",
      range: "10-20km",
      rating: "IP67"
    },
    features: [
      "Remote gate operation",
      "Current monitoring",
      "Solar powered",
      "Scheduled automation",
      "Safety timeout",
      "Works with your actuator"
    ],
    images: ["/products/headgate-controller.jpg"],
    inStock: true,
    featured: false
  },
  {
    id: "headgate-complete-system",
    name: "Headgate Controller (Complete System)",
    slug: "headgate-complete-system",
    description: "Complete headgate solution with Firgelli feedback actuator",
    price: 54900,
    bom: 32340,
    category: "irrigation",
    specs: {
      hardware: "Heltec V4 HIGH + Controller",
      actuator: "Firgelli 12\" 150lb w/ position feedback",
      enclosure: "RAK Unify Large + Solar",
      battery: "3500mAh LiPo + Solar",
      range: "10-20km",
      rating: "IP67"
    },
    features: [
      "Firgelli actuator included",
      "Precise position feedback (0-100%)",
      "Remote operation & scheduling",
      "Current & position monitoring",
      "Solar powered",
      "Plug-and-play solution",
      "Mounting brackets included"
    ],
    images: ["/products/headgate-complete.jpg"],
    inStock: true,
    featured: true
  },
  {
    id: "mesh-router",
    name: "Mesh Router Node",
    slug: "mesh-router",
    description: "Extend network coverage across entire farm",
    price: 20900,
    bom: 10250,
    category: "infrastructure",
    specs: {
      hardware: "Heltec V4 HIGH (28dBm)",
      enclosure: "RAK Unify Large + Solar",
      antenna: "5dBi high-gain",
      battery: "3000mAh LiPo + Solar",
      range: "10-20km per hop",
      rating: "IP67"
    },
    features: [
      "Extends range 10-20km",
      "High-power 28dBm",
      "Solar powered",
      "Pole mounting included",
      "Mesh optimization",
      "Unlimited hops"
    ],
    images: ["/products/mesh-router.jpg"],
    inStock: true,
    featured: false
  }
];

export const SUBSCRIPTION_TIERS = [
  {
    id: "community",
    name: "Community",
    price: 0,
    features: [
      "Documentation & guides",
      "Community forum",
      "Email support (48-72hr)",
      "Software updates",
      "Demo mode access"
    ]
  },
  {
    id: "professional",
    name: "Professional",
    price: 3900, // $39/month
    annualPrice: 39000, // $390/year
    features: [
      "Everything in Community",
      "Priority email (24hr)",
      "Phone support (business hours)",
      "Remote troubleshooting",
      "Quarterly health checks",
      "Advanced analytics",
      "Up to 25 nodes"
    ],
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 24900, // $249/month
    annualPrice: 249000,
    features: [
      "Everything in Professional",
      "24/7 phone support",
      "4-hour response SLA",
      "Dedicated account manager",
      "On-site installation",
      "Custom integrations",
      "Priority features",
      "Unlimited nodes"
    ]
  }
];
```

---

## Phase 5: Core Components

### 5.1 Product Card
Create `marketing/src/components/marketing/ProductCard.tsx`:

```typescript
import { Product } from '@/types/product';
import Link from 'next/link';

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border border-soil-200 rounded-lg p-6 hover:shadow-lg transition">
      <div className="aspect-square bg-soil-100 rounded-lg mb-4">
        {/* Placeholder for product image */}
        <div className="w-full h-full flex items-center justify-center text-soil-400">
          {product.name}
        </div>
      </div>

      <h3 className="text-xl font-bold text-earth-800 mb-2">
        {product.name}
      </h3>

      <p className="text-soil-600 mb-4 line-clamp-2">
        {product.description}
      </p>

      <div className="flex items-center gap-2 mb-4">
        {product.specs.range && (
          <span className="text-sm bg-primary-100 text-primary-700 px-2 py-1 rounded">
            {product.specs.range}
          </span>
        )}
        {product.specs.batteryLife && (
          <span className="text-sm bg-accent-100 text-accent-700 px-2 py-1 rounded">
            {product.specs.batteryLife}
          </span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-primary-600">
          ${(product.price / 100).toFixed(2)}
        </span>
        <Link
          href={`/products/${product.slug}`}
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
```

### 5.2 Header Component
Create `marketing/src/components/marketing/Header.tsx`:

```typescript
import Link from 'next/link';
import { Logo } from './Logo';

export function Header() {
  return (
    <header className="border-b border-soil-200 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo size="md" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-earth-700 hover:text-primary-600">
              Products
            </Link>
            <Link href="/solutions" className="text-earth-700 hover:text-primary-600">
              Solutions
            </Link>
            <Link href="/pricing" className="text-earth-700 hover:text-primary-600">
              Pricing
            </Link>
            <Link href="/how-it-works" className="text-earth-700 hover:text-primary-600">
              How It Works
            </Link>
            <Link href="/resources" className="text-earth-700 hover:text-primary-600">
              Resources
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/config/demo"
              className="text-primary-600 hover:text-primary-700"
            >
              Try Demo
            </Link>
            <Link
              href="/cart"
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded"
            >
              Cart (0)
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
```

---

## Phase 6: Homepage

### 6.1 Homepage Layout
Create `marketing/src/app/page.tsx`:

```typescript
import { Header } from '@/components/marketing/Header';
import { ProductCard } from '@/components/marketing/ProductCard';
import { PRODUCTS } from '@/data/products';
import Link from 'next/link';

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter(p => p.featured);

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary-50 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-earth-800 mb-6">
              Professional Agriculture IoT<br />at Half the Price
            </h1>
            <p className="text-xl text-soil-600 mb-8 max-w-3xl mx-auto">
              Monitor water, livestock, and equipment across your entire farm with
              long-range LoRa mesh networking. 5-15km range per node.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/products"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg text-lg"
              >
                Shop Products
              </Link>
              <Link
                href="/config/demo"
                className="border-2 border-primary-500 text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg text-lg"
              >
                Try Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-earth-50 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
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

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-earth-800 mb-8 text-center">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-soil-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-earth-800 mb-12 text-center">
              Simple 3-Step Setup
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="font-bold text-earth-800 mb-2">Order & Receive</h3>
                <p className="text-soil-600">
                  Choose your nodes, checkout, and receive pre-configured hardware
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="font-bold text-earth-800 mb-2">Configure Online</h3>
                <p className="text-soil-600">
                  Use our 5-step wizard to set up your farm layout and preferences
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="font-bold text-earth-800 mb-2">Deploy & Monitor</h3>
                <p className="text-soil-600">
                  Install nodes, upload config via USB, and start monitoring
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
```

---

## Phase 7: Products Page

### 7.1 Products Catalog
Create `marketing/src/app/products/page.tsx`:

```typescript
import { Header } from '@/components/marketing/Header';
import { ProductCard } from '@/components/marketing/ProductCard';
import { PRODUCTS } from '@/data/products';

export default function ProductsPage() {
  const categories = Array.from(new Set(PRODUCTS.map(p => p.category)));

  return (
    <>
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-earth-800 mb-8">
            All Products
          </h1>

          {categories.map(category => {
            const categoryProducts = PRODUCTS.filter(p => p.category === category);

            return (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-earth-700 mb-6 capitalize">
                  {category.replace('-', ' ')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {categoryProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
```

---

## Phase 8: Migration Plan

### Step-by-Step Execution

1. **Week 1: Foundation**
   - ✅ Set up Next.js app in `packages/marketing/`
   - ✅ Configure Tailwind with earth tones
   - ✅ Create Logo component
   - ✅ Set up Prisma schema
   - ✅ Create product data file

2. **Week 2: Marketing Pages**
   - ✅ Build Homepage
   - ✅ Build Products catalog
   - ✅ Build Pricing page
   - ✅ Build Solutions page
   - ✅ Build How It Works page

3. **Week 3: E-Commerce**
   - ✅ Implement shopping cart (Zustand)
   - ✅ Stripe checkout flow
   - ✅ Webhook handler
   - ✅ Order management

4. **Week 4: Migrate Config App**
   - ✅ Copy existing React app to `src/app/config/`
   - ✅ Migrate components
   - ✅ Test Web Serial API
   - ✅ Create demo mode

5. **Week 5: Integration**
   - ✅ Set up NextAuth
   - ✅ Link purchases to user accounts
   - ✅ Connect Stripe webhooks
   - ✅ Testing

---

## Critical Notes

### Do NOT Delete
- Keep `packages/web/` intact during migration
- Reference it for component logic
- Test in parallel

### Routes Structure
```
/ → Homepage (marketing)
/products → Product catalog
/products/[slug] → Product detail
/pricing → Pricing page
/cart → Shopping cart
/checkout → Stripe checkout
/account → Customer dashboard
/config → Config app (migrated from old app)
/config/demo → Demo mode
/config/setup → 5-step wizard
```

### Environment Priorities
1. Get Stripe test keys first
2. Set up Supabase PostgreSQL
3. Configure NextAuth
4. Test checkout flow

---

## Quick Start Commands

```bash
# Navigate to repo
cd gatemesh-web/packages

# Create Next.js app
pnpm create next-app@latest marketing

# Install deps
cd marketing
pnpm add @stripe/stripe-js stripe next-auth @prisma/client zustand lucide-react
pnpm add -D prisma

# Initialize Prisma
pnpm prisma init
# (Copy schema from Phase 3.1)
pnpm prisma generate
pnpm prisma db push

# Start dev server
pnpm dev
```

---

## Success Criteria

- ✅ Marketing site loads at `/`
- ✅ Products display with correct pricing
- ✅ Cart functionality works
- ✅ Stripe checkout completes
- ✅ Config app accessible at `/config`
- ✅ Demo mode works pre-purchase
- ✅ Earth-toned branding throughout
- ✅ Mobile responsive
- ✅ Web Serial API still works

---

## Support

Reference this document for:
- File structure
- Component examples
- Database schema
- Product data format
- Tailwind config
- Stripe integration

All code examples are production-ready and follow Next.js 14 App Router best practices.
