export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // Price in cents
  bom: number;   // Bill of materials cost in cents
  category: string;
  specs: {
    hardware: string;
    enclosure: string;
    sensor?: string;
    actuator?: string;
    gps?: string;
    battery: string;
    range: string;
    batteryLife: string;
    rating: string;
    relays?: string;
    antenna?: string;
  };
  features: string[];
  images: string[];
  inStock: boolean;
  featured: boolean;
}

export const PRODUCTS: Product[] = [
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
      batteryLife: "3-5 years",
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
      batteryLife: "3-5 years",
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
      batteryLife: "3-5 years",
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

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number; // Monthly price in cents
  annualPrice?: number; // Annual price in cents
  interval: string;
  features: string[];
  popular?: boolean;
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
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

export const PRODUCT_CATEGORIES = [
  {
    id: 'irrigation',
    name: 'Irrigation Control',
    description: 'Water level sensors, gate controllers, and flow management',
    icon: '💧',
    count: PRODUCTS.filter(p => p.category === 'irrigation').length
  },
  {
    id: 'crop-monitoring',
    name: 'Crop Monitoring',
    description: 'Soil moisture, weather stations, and crop health sensors',
    icon: '🌱',
    count: PRODUCTS.filter(p => p.category === 'crop-monitoring').length
  },
  {
    id: 'livestock',
    name: 'Livestock Tracking',
    description: 'GPS trackers, health monitors, and behavior sensors',
    icon: '🐄',
    count: PRODUCTS.filter(p => p.category === 'livestock').length
  },
  {
    id: 'infrastructure',
    name: 'Network Infrastructure',
    description: 'Mesh routers, repeaters, and coverage extenders',
    icon: '📡',
    count: PRODUCTS.filter(p => p.category === 'infrastructure').length
  },
  {
    id: 'weather',
    name: 'Weather Monitoring',
    description: 'Weather stations, rain gauges, and environmental sensors',
    icon: '🌤️',
    count: PRODUCTS.filter(p => p.category === 'weather').length
  },
  {
    id: 'power',
    name: 'Power & Energy',
    description: 'Solar panels, battery monitors, and power management',
    icon: '🔋',
    count: PRODUCTS.filter(p => p.category === 'power').length
  }
];