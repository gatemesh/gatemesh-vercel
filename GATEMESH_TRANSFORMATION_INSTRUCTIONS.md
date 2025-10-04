# GateMesh Transformation Instructions for Claude in VS Code

## 🎯 PROJECT OVERVIEW

Transform the existing **gatemesh-vercel** configuration app into a complete **e-commerce platform** with marketing site at root and config app at `/config/*` routes.

### Current State Analysis
- **Repository**: `https://github.com/gatemesh/gatemesh-vercel`
- **Structure**: React + TypeScript + Vite monorepo with pnpm
- **Current App**: Configuration dashboard loads at root (`/`)
- **Tech Stack**: React 18, TypeScript 5, Vite 5, Tailwind CSS, Zustand, Web Serial API
- **Status**: Fully functional config app with 40+ IoT node types

### Target Architecture
- **Marketing Website**: Root (`/`) - Product catalog, pricing, company info
- **Config App**: `/config/*` routes - Existing dashboard functionality  
- **E-commerce**: Stripe integration, shopping cart, user accounts
- **Shared Auth**: NextAuth linking marketing and config sections

---

## 🏗️ TRANSFORMATION STEPS

### Phase 1: Next.js Migration Setup

#### 1.1 Create Next.js Structure
```bash
# Navigate to packages directory
cd gatemesh-web/packages

# Create new Next.js app
pnpm create next-app@latest nextjs --typescript --tailwind --app --src-dir --import-alias "@/*"

# Answer prompts:
# ✅ TypeScript: Yes
# ✅ ESLint: Yes  
# ✅ Tailwind CSS: Yes
# ✅ src/ directory: Yes
# ✅ App Router: Yes
# ✅ Import alias: Yes (@/*)
```

#### 1.2 Install E-commerce Dependencies
```bash
cd packages/nextjs

# Core e-commerce stack
pnpm add @stripe/stripe-js stripe
pnpm add next-auth @auth/prisma-adapter
pnpm add @prisma/client prisma
pnpm add zustand  # Keep for state management
pnpm add lucide-react recharts

# Dev dependencies
pnpm add -D @types/node
```

### Phase 2: Environment Configuration

#### 2.1 Create .env.local
```env
# Database (Supabase PostgreSQL recommended)
DATABASE_URL="postgresql://..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Google Maps (from existing app)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="..."
```

#### 2.2 Configure Tailwind with Earth Tones
Update `tailwind.config.ts`:
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
        // GateMesh Earth Tone Palette
        primary: {
          500: '#6B8E23',  // Crop Green
          600: '#5e7e1f',
          700: '#4f6b19',
        },
        earth: {
          500: '#8B7355',  // Earth Brown  
          600: '#7d674d',
          700: '#6a5641',
          800: '#574635',
          900: '#44362a',
        },
        accent: {
          500: '#DAA520',  // Harvest Gold
          600: '#c6951d',
        },
        soil: {
          500: '#D2B48C',  // Soil Tan
          600: '#bda47e',
          700: '#a08c6a',
        },
      },
    },
  },
  plugins: [],
}
export default config
```

### Phase 3: Directory Structure Creation

#### 3.1 Create Next.js App Router Structure
```
packages/nextjs/src/
├── app/
│   ├── page.tsx              # Marketing homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Tailwind + custom styles
│   │
│   ├── products/             # Product catalog
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   │
│   ├── pricing/page.tsx      # Pricing page
│   ├── solutions/page.tsx    # Solutions by farm type
│   ├── how-it-works/page.tsx # Technology explanation
│   ├── resources/page.tsx    # Docs & guides
│   ├── team-portal/page.tsx  # Internal dashboards
│   │
│   ├── cart/page.tsx         # Shopping cart
│   ├── checkout/page.tsx     # Stripe checkout
│   │
│   ├── account/              # Customer account
│   │   ├── page.tsx
│   │   ├── orders/page.tsx
│   │   └── subscription/page.tsx
│   │
│   ├── api/                  # API routes
│   │   ├── stripe/
│   │   │   ├── webhook/route.ts
│   │   │   └── create-checkout/route.ts
│   │   └── auth/
│   │       └── [...nextauth]/route.ts
│   │
│   └── config/               # MIGRATE: Existing config app
│       ├── page.tsx          # Main config dashboard
│       ├── demo/page.tsx     # Demo mode
│       ├── setup/page.tsx    # Setup wizard
│       └── [additional routes...]
│
├── components/
│   ├── marketing/            # NEW: Marketing components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Logo.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Hero.tsx
│   │   └── Testimonials.tsx
│   │
│   ├── cart/                 # NEW: E-commerce components
│   │   ├── CartButton.tsx
│   │   ├── CartDrawer.tsx
│   │   └── ProductGrid.tsx
│   │
│   └── config/               # MIGRATE: From old app
│       └── [all existing components]
│
├── lib/                      # NEW: Utilities
│   ├── stripe.ts
│   ├── db.ts
│   └── utils.ts
│
└── types/                    # MIGRATE + NEW
    ├── agriculture.ts        # Existing
    ├── product.ts            # New
    └── commerce.ts           # New
```

### Phase 4: Database Schema Setup

#### 4.1 Create Prisma Schema
Create `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  role          UserRole  @default(CUSTOMER)
  
  accounts      Account[]
  sessions      Session[]
  orders        Order[]
  subscription  Subscription?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum UserRole {
  CUSTOMER
  ADMIN
  SALES
  INSTALLER
}

model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String
  price       Int      // Price in cents
  bom         Int      // Bill of materials cost in cents
  category    String
  
  specs       Json     // Technical specifications
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

model Order {
  id              String      @id @default(cuid())
  orderNumber     String      @unique
  userId          String
  user            User        @relation(fields: [userId], references: [id])
  
  status          OrderStatus @default(PENDING)
  total           Int         // Total in cents
  shippingAddress Json
  
  stripePaymentIntentId String? @unique
  
  items           OrderItem[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum OrderStatus {
  PENDING
  PAID
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  
  quantity  Int
  price     Int     // Price at time of order in cents
  
  createdAt DateTime @default(now())
}

model Subscription {
  id                 String             @id @default(cuid())
  userId             String             @unique
  user               User               @relation(fields: [userId], references: [id])
  
  tier               SubscriptionTier
  status             SubscriptionStatus
  
  stripeCustomerId       String? @unique
  stripeSubscriptionId   String? @unique
  stripePriceId          String?
  stripeCurrentPeriodEnd DateTime?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum SubscriptionTier {
  COMMUNITY
  PROFESSIONAL
  ENTERPRISE
}

enum SubscriptionStatus {
  ACTIVE
  CANCELLED
  PAST_DUE
  UNPAID
}

model Node {
  id       String @id @default(cuid())
  userId   String
  
  nodeId   String @unique  // Physical node ID
  name     String
  nodeType String
  
  // From existing config app
  meshRole String
  farmId   String?
  zoneId   String?
  fieldId  String?
  
  config   Json    // All configuration data
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### 4.2 Initialize Database
```bash
pnpm prisma generate
pnpm prisma db push
```

### Phase 5: Product Data Definition

#### 5.1 Create Product Catalog
Create `src/data/products.ts`:
```typescript
export const PRODUCTS = [
  {
    id: "water-level-sensor",
    name: "Water Level Sensor",
    slug: "water-level-sensor",
    description: "Real-time water level monitoring with solar power and mesh networking",
    price: 17900, // $179.00 in cents
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
      "Solar powered with 3-5 year battery life",
      "LoRa mesh networking (5-15km range)",
      "Remote alerts and notifications",
      "IP67 weatherproof rating"
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
      enclosure: "RAK Unify Small + Solar + Antenna",
      sensor: "Capacitive (corrosion resistant)",
      battery: "1500mAh LiPo + Solar",
      range: "3-10km",
      batteryLife: "3-5 years",
      rating: "IP65"
    },
    features: [
      "Capacitive soil moisture measurement",
      "Temperature and humidity tracking",
      "Solar powered operation",
      "Mesh networking capability",
      "Automated irrigation triggers",
      "Historical data tracking"
    ],
    images: ["/products/soil-moisture-sensor.jpg"],
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
      batteryLife: "2-4 years with solar",
      rating: "IP68"
    },
    features: [
      "Real-time GPS location tracking",
      "Motion and activity monitoring",
      "Geofencing with alerts",
      "Solar-powered with extended battery",
      "Durable collar mounting",
      "Health monitoring insights"
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
      hardware: "Heltec V4 HIGH (28dBm)",
      enclosure: "RAK Unify Large + Solar + M8",
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
      "Safety timeout protection",
      "Works with your existing actuator"
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
      "Firgelli linear actuator included",
      "Precise position feedback (0-100%)",
      "Remote operation and scheduling",
      "Current and position monitoring",
      "Solar powered system",
      "Complete plug-and-play solution",
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
    description: "Extend your network coverage across the entire farm",
    price: 20900,
    bom: 10250,
    category: "infrastructure",
    specs: {
      hardware: "Heltec V4 HIGH (28dBm)",
      enclosure: "RAK Unify Large + Solar",
      antenna: "5dBi high-gain directional",
      battery: "3000mAh LiPo + Solar",
      range: "10-20km per hop",
      rating: "IP67"
    },
    features: [
      "Extends network range 10-20km",
      "High-power 28dBm transmission",
      "Solar powered for remote placement",
      "Pole mounting hardware included",
      "Mesh network optimization",
      "Unlimited coverage through multiple hops"
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
    interval: "month",
    features: [
      "Access to documentation & guides",
      "Community forum access",
      "Email support (48-72hr response)",
      "Software updates",
      "Demo mode access to config app"
    ]
  },
  {
    id: "professional",
    name: "Professional",
    price: 3900, // $39/month
    annualPrice: 39000, // $390/year (save 2 months)
    interval: "month",
    features: [
      "Everything in Community",
      "Priority email support (24hr response)",
      "Phone support (business hours)",
      "Remote troubleshooting",
      "Quarterly system health checks",
      "Advanced analytics dashboard",
      "Covers up to 25 nodes"
    ],
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 24900, // $249/month
    annualPrice: 249000, // $2490/year
    interval: "month",
    features: [
      "Everything in Professional",
      "24/7 phone support",
      "4-hour response SLA",
      "Dedicated account manager",
      "On-site installation support",
      "Custom integration assistance",
      "Priority feature requests",
      "Unlimited nodes",
      "Custom reporting"
    ]
  }
];
```

### Phase 6: Logo and Branding Implementation

#### 6.1 Create Logo Component
Create `src/components/marketing/Logo.tsx`:
```typescript
interface LogoProps {
  variant?: 'primary' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 40,
  md: 50,
  lg: 70,
};

export function Logo({ variant = 'primary', size = 'md' }: LogoProps) {
  const hexSize = sizeMap[size];
  
  return (
    <div className="flex items-center gap-2">
      {/* Badge Authority hexagon with corn icon */}
      <svg width={hexSize} height={hexSize} viewBox="0 0 64 64">
        {/* Hexagon mesh background */}
        <path 
          d="M32 2L54 16L54 48L32 62L10 48L10 16Z" 
          fill={variant === 'dark' ? '#fff' : '#6B8E23'} 
        />
        {/* Corn icon placeholder - implement actual corn SVG */}
        <circle 
          cx="32" 
          cy="32" 
          r="12" 
          fill={variant === 'dark' ? '#6B8E23' : '#DAA520'} 
        />
      </svg>
      <span className={`font-bold ${variant === 'dark' ? 'text-white' : 'text-earth-800'}`}>
        GATEMESH
      </span>
    </div>
  );
}
```

### Phase 7: Key Components Creation

#### 7.1 Create Marketing Homepage
Create `src/app/page.tsx`:
```typescript
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/marketing/ProductCard';

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter(p => p.featured);

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-earth-800 mb-6">
            Professional Agriculture IoT at Half the Price
          </h1>
          <p className="text-xl text-soil-600 mb-8">
            Monitor water, livestock, and equipment across your entire farm with 
            long-range LoRa mesh networking (5-15km range per node)
          </p>
          <div className="flex gap-4">
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
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-earth-800 mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Proof */}
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

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-earth-800 mb-8">Simple Setup</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
    </main>
  );
}
```

#### 7.2 Create Product Card Component
Create `src/components/marketing/ProductCard.tsx`:
```typescript
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  featured: boolean;
  specs: {
    range: string;
    batteryLife: string;
    rating: string;
  };
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border border-soil-200 rounded-lg p-6 hover:shadow-lg transition bg-white">
      <div className="aspect-video bg-earth-50 rounded-lg mb-4 flex items-center justify-center">
        {/* Placeholder for product image */}
        <span className="text-soil-400">Product Image</span>
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
            href={`/products/${product.slug}`}
            className="text-sm px-3 py-2 border border-primary-500 text-primary-600 rounded hover:bg-primary-50 transition"
          >
            Details
          </Link>
          <button className="text-sm bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Phase 8: Migration Strategy for Existing Config App

#### 8.1 Component Migration Plan
```bash
# Copy existing components from old app to new structure
cp -r packages/web/src/components/* packages/nextjs/src/components/config/
cp -r packages/web/src/store/* packages/nextjs/src/lib/stores/
cp -r packages/web/src/types/* packages/nextjs/src/types/
cp -r packages/web/src/data/* packages/nextjs/src/data/
cp -r packages/web/src/hooks/* packages/nextjs/src/hooks/
```

#### 8.2 Create Config App Routes
Create `src/app/config/page.tsx`:
```typescript
import { SetupWizard } from '@/components/config/Wizard/SetupWizard';

export default function ConfigMainPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-earth-800 mb-8">GateMesh Configuration</h1>
        <p className="text-xl text-soil-600 mb-8">
          Configure and manage your IoT devices
        </p>
        
        {/* Import existing App.tsx logic here */}
        <SetupWizard />
      </div>
    </main>
  );
}
```

Create `src/app/config/demo/page.tsx`:
```typescript
export default function DemoPage() {
  return (
    <main>
      <h1 className="text-3xl font-bold text-earth-800 mb-6">Demo Mode</h1>
      <p className="text-soil-600 mb-8">
        Try out GateMesh features with simulated data - no hardware required.
      </p>
      
      {/* Load demo version of existing dashboard */}
    </main>
  );
}
```

### Phase 9: Authentication Integration

#### 9.1 Set up NextAuth
Create `src/app/api/auth/[...nextauth]/route.ts`:
```typescript
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { prisma } from '@/lib/db';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

### Phase 10: E-commerce Implementation

#### 10.1 Create Shopping Cart Store
Create `src/lib/stores/cartStore.ts`:
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find(i => i.id === item.id);
        
        if (existingItem) {
          set({
            items: items.map(i => 
              i.id === item.id 
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({ items: [...items, item] });
        }
        
        // Recalculate total
        const newTotal = get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        set({ total: newTotal });
      },
      removeItem: (id) => {
        const items = get().items.filter(item => item.id !== id);
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        set({ items, total });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        const items = get().items.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        set({ items, total });
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'gatemesh-cart',
    }
  )
);
```

#### 10.2 Create Stripe Checkout API
Create `src/app/api/stripe/create-checkout/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items } = await req.json();

    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      success_url: `${req.nextUrl.origin}/account/orders?success=true`,
      cancel_url: `${req.nextUrl.origin}/cart`,
      customer_email: session.user.email!,
      metadata: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
```

### Phase 11: URL Routing Structure

#### 11.1 Final URL Structure
```
Marketing Website:
├── / (Homepage)
├── /products (Product catalog)
├── /products/[slug] (Individual products)  
├── /pricing (Support tiers)
├── /solutions (By farm type)
├── /how-it-works (Technology explanation)
├── /resources (Documentation)
├── /team-portal (Internal dashboards)
├── /cart (Shopping cart)
├── /checkout (Stripe checkout)
└── /account/* (Customer portal)

Config Application:
├── /config (Main dashboard - login required)
├── /config/demo (Demo mode - no login)
├── /config/setup (Setup wizard)
├── /config/dashboard (Irrigation dashboard)
├── /config/nodes (Node management)
├── /config/monitor (Real-time monitoring)
├── /config/map (Farm map view)
├── /config/paths (Irrigation paths)
└── /config/topology (Network topology)
```

---

## 🚀 EXECUTION CHECKLIST

### ✅ Phase 1: Foundation
- [ ] Create Next.js app structure
- [ ] Install all dependencies
- [ ] Configure environment variables
- [ ] Set up Tailwind with earth tones
- [ ] Create Prisma schema and initialize database

### ✅ Phase 2: Product Catalog
- [ ] Create product data definitions
- [ ] Build Logo component with Badge Authority design
- [ ] Create ProductCard component
- [ ] Build marketing homepage
- [ ] Create products catalog page
- [ ] Add individual product detail pages

### ✅ Phase 3: E-commerce Core
- [ ] Implement shopping cart with Zustand
- [ ] Create Stripe integration
- [ ] Build checkout flow
- [ ] Add webhook handling
- [ ] Create customer account pages

### ✅ Phase 4: Config App Migration
- [ ] Copy all components from existing app
- [ ] Migrate Zustand stores
- [ ] Copy type definitions
- [ ] Recreate 5-step setup wizard
- [ ] Test Web Serial API integration
- [ ] Create demo mode

### ✅ Phase 5: Authentication & Integration
- [ ] Set up NextAuth with database
- [ ] Link hardware purchases to user accounts
- [ ] Enable demo mode for pre-purchase testing
- [ ] Connect Stripe webhooks to subscriptions

### ✅ Phase 6: Team Portal
- [ ] Create Sales dashboard
- [ ] Create Installation team dashboard  
- [ ] Create Owner executive dashboard
- [ ] Add metrics and reporting

---

## 📋 MIGRATION NOTES

### Existing App Strengths to Preserve
- **Web Serial API integration** - Keep for USB device configuration
- **5-step setup wizard** - Core differentiator, migrate intact
- **Zustand state management** - Works well, continue using
- **Earth-toned design system** - Extend to marketing site
- **40+ node catalog** - Rich product data foundation
- **Demo data system** - Perfect for trial users

### Key Integration Points
- **Shared authentication** - Users can access both marketing and config
- **Hardware linking** - Connect purchased products to config app
- **Demo mode** - Allow config app access before purchase
- **Support tiers** - Enable premium features based on subscription

### Technical Considerations
- **Monorepo structure** - Keep existing `packages/web` for reference
- **Deploy strategy** - Deploy Next.js app as new primary site
- **Data migration** - Export existing user data if any
- **SEO optimization** - Marketing pages need proper meta tags

---

## 🎯 SUCCESS CRITERIA

### Marketing Website
- [ ] Professional appearance matching earth-tone brand
- [ ] Fast loading times (< 3 seconds)
- [ ] Mobile responsive design
- [ ] SEO optimized pages
- [ ] Clear product information and pricing
- [ ] Functional shopping cart and checkout

### Config Application  
- [ ] All existing functionality preserved
- [ ] 5-step setup wizard working
- [ ] Web Serial API connection maintained
- [ ] Demo mode accessible to trial users
- [ ] Real-time monitoring and control operational

### E-commerce Integration
- [ ] Stripe payments processing correctly
- [ ] User accounts linking marketing and config
- [ ] Order management system functional
- [ ] Support tier subscriptions working
- [ ] Hardware-to-user linking operational

### User Experience
- [ ] Seamless navigation between marketing and config
- [ ] Clear onboarding flow from purchase to setup
- [ ] Responsive design across all devices
- [ ] Professional appearance matching established brand
- [ ] Fast performance and reliable functionality

---

**END OF INSTRUCTIONS**

*This document provides complete guidance for transforming the existing gatemesh-vercel repository into a full-featured e-commerce platform with integrated configuration application. Follow the phases sequentially for best results.*