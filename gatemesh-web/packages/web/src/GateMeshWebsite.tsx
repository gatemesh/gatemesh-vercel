import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Wifi, Droplets, Zap, Thermometer, Package, ChevronRight, Star, Check, MapPin, Phone, Mail, Users, BarChart3, Clock, Shield } from 'lucide-react';

// Logo Component
const Logo = ({ size = 'md', white = false }) => {
  const sizes = {
    sm: { hex: 40, text: 'text-lg' },
    md: { hex: 50, text: 'text-2xl' },
    lg: { hex: 70, text: 'text-4xl' }
  };
  
  const s = sizes[size];
  const hexSize = s.hex;
  
  return (
    <div className="flex items-center gap-3">
      <div 
        className={`relative flex items-center justify-center ${white ? 'bg-white' : 'bg-primary-600'}`}
        style={{
          width: hexSize,
          height: hexSize,
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          border: `3px solid ${white ? 'white' : '#8B7355'}`
        }}
      >
        <div className="relative" style={{ width: hexSize * 0.5, height: hexSize * 0.6 }}>
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-harvest-500 rounded-full"
            style={{ width: hexSize * 0.24, height: hexSize * 0.42, borderRadius: '50%' }}
          />
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-earth-700 rounded"
            style={{ width: hexSize * 0.12, height: hexSize * 0.22 }}
          />
        </div>
      </div>
      <span className={`font-black tracking-tight ${white ? 'text-white' : 'text-earth-700'} ${s.text}`}>
        GATEMESH
      </span>
    </div>
  );
};

// Main App Component
const GateMeshWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Navigation
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'resources', label: 'Resources' }
  ];

  // Product Categories
  const categories = [
    { 
      id: 'irrigation', 
      name: 'Irrigation Systems', 
      icon: Droplets,
      description: 'Water level sensors, headgate controllers, flow monitors',
      nodeCount: 12,
      color: 'bg-blue-100 text-blue-700'
    },
    { 
      id: 'livestock', 
      name: 'Livestock Infrastructure', 
      icon: Users,
      description: 'Feeders, trackers, water monitors, health sensors',
      nodeCount: 8,
      color: 'bg-amber-100 text-amber-700'
    },
    { 
      id: 'equipment', 
      name: 'Equipment Monitoring', 
      icon: Zap,
      description: 'Generators, tractors, solar panels, fuel monitors',
      nodeCount: 7,
      color: 'bg-yellow-100 text-yellow-700'
    },
    { 
      id: 'building', 
      name: 'Barn & Building', 
      icon: Package,
      description: 'Grain silos, greenhouses, coops, climate control',
      nodeCount: 6,
      color: 'bg-stone-100 text-stone-700'
    },
    { 
      id: 'crop', 
      name: 'Crop & Field Monitoring', 
      icon: Thermometer,
      description: 'Plant health, soil moisture, pest detection',
      nodeCount: 5,
      color: 'bg-green-100 text-green-700'
    },
    { 
      id: 'specialized', 
      name: 'Specialized Systems', 
      icon: BarChart3,
      description: 'Beehives, fish ponds, hydroponics',
      nodeCount: 4,
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  // Featured Products
  const featuredProducts = [
    {
      id: 1,
      name: 'Water Level Sensor',
      category: 'Irrigation',
      price: 149,
      image: '💧',
      description: 'Precise water level monitoring with mesh networking',
      features: ['0.5% accuracy', '500m range', 'Battery: 2 years', 'Weatherproof IP67']
    },
    {
      id: 2,
      name: 'Livestock Tracker',
      category: 'Livestock',
      price: 199,
      image: '🐄',
      description: 'GPS-enabled livestock location and health monitoring',
      features: ['Real-time GPS', 'Health alerts', 'Geofencing', 'Low power mode']
    },
    {
      id: 3,
      name: 'Soil Moisture Sensor',
      category: 'Crop Monitoring',
      price: 129,
      image: '🌱',
      description: 'Multi-depth soil moisture and temperature sensing',
      features: ['3 depth points', 'Auto irrigation', 'Wireless', 'Solar powered']
    },
    {
      id: 4,
      name: 'Headgate Controller',
      category: 'Irrigation',
      price: 299,
      image: '⚙️',
      description: 'Automated headgate control with remote operation',
      features: ['Remote control', 'Schedule automation', 'Flow monitoring', 'Weather integration']
    },
    {
      id: 254,
      name: 'GateMesh Gateway Hub (Raspberry Pi)',
      category: 'Specialized Systems',
      price: 399,
      image: '🖥️',
      description: 'Raspberry Pi 4 with LoRa HAT - acts as network gateway, programming station, and runs the full GateMesh web interface locally',
      features: ['Manages up to 250 nodes', 'Local web interface', 'USB programming', 'No internet required']
    }
  ];

  // Support Tiers
  const supportTiers = [
    {
      name: 'Community',
      price: 0,
      period: 'Free',
      description: 'Included with hardware purchase',
      features: [
        'Documentation & guides',
        'Community forum access',
        'Email support (48-72hr)',
        'Software updates',
        'Demo mode access'
      ],
      cta: 'Included Free',
      popular: false
    },
    {
      name: 'Professional',
      price: 39,
      period: 'per month',
      description: 'For active farms needing reliable support',
      features: [
        'Everything in Community',
        'Priority email (24hr response)',
        'Phone support (business hours)',
        'Remote troubleshooting',
        'Quarterly health checks',
        'Advanced analytics',
        'Up to 25 nodes'
      ],
      cta: 'Start Professional',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 249,
      period: 'per month',
      description: 'For large operations & commercial farms',
      features: [
        'Everything in Professional',
        '24/7 phone support',
        '4-hour response SLA',
        'Dedicated account manager',
        'On-site installation support',
        'Custom integrations',
        'Priority features',
        'MQTT admin access',
        'Unlimited nodes'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Sarah Johnson',
      farm: 'Johnson Family Dairy, Iowa',
      quote: 'GateMesh saved us 40% on water costs in the first year. The mesh network works perfectly even in our remote fields.',
      rating: 5
    },
    {
      name: 'Mike Rodriguez',
      farm: 'Verde Valley Orchards, California',
      quote: 'Setup was incredibly easy. We had 15 sensors deployed in under 2 hours. The mobile app makes monitoring simple.',
      rating: 5
    },
    {
      name: 'Tom Anderson',
      farm: 'Anderson Cattle Ranch, Montana',
      quote: 'Livestock tracking has been a game-changer. We can monitor 500+ head across 2000 acres from our phone.',
      rating: 5
    }
  ];

  // Page Components
  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-earth-50 via-soil-50 to-primary-50 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-black text-earth-900 mb-6 leading-tight">
                Smart Agriculture
                <span className="block text-primary-700">Made Simple</span>
              </h1>
              <p className="text-xl text-earth-700 mb-8 leading-relaxed">
                Monitor and control your entire farm with wireless IoT sensors. From irrigation to livestock, get real-time insights that save water, time, and money.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setCurrentPage('products')}
                  className="px-8 py-4 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition flex items-center gap-2"
                >
                  Shop Products <ChevronRight size={20} />
                </button>
                <button 
                  onClick={() => setCurrentPage('how-it-works')}
                  className="px-8 py-4 bg-white text-earth-700 font-bold rounded-lg border-2 border-earth-300 hover:border-earth-400 transition"
                >
                  See How It Works
                </button>
              </div>
              <div className="mt-8 flex gap-8 text-sm">
                <div>
                  <div className="text-3xl font-black text-primary-700">40+</div>
                  <div className="text-earth-600">Node Types</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-primary-700">500m</div>
                  <div className="text-earth-600">Mesh Range</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-primary-700">2yr</div>
                  <div className="text-earth-600">Battery Life</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="aspect-square bg-gradient-to-br from-primary-100 to-earth-100 rounded-xl flex items-center justify-center text-8xl">
                  🌾
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-earth-50 rounded-lg p-3 text-center">
                    <Droplets className="mx-auto text-blue-600 mb-2" size={24} />
                    <div className="text-xs font-semibold text-earth-700">Irrigation</div>
                  </div>
                  <div className="bg-earth-50 rounded-lg p-3 text-center">
                    <Thermometer className="mx-auto text-green-600 mb-2" size={24} />
                    <div className="text-xs font-semibold text-earth-700">Climate</div>
                  </div>
                  <div className="bg-earth-50 rounded-lg p-3 text-center">
                    <Wifi className="mx-auto text-primary-600 mb-2" size={24} />
                    <div className="text-xs font-semibold text-earth-700">Mesh Net</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-earth-900 mb-4">Featured Products</h2>
            <p className="text-xl text-earth-600">Start with our most popular sensors</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white border-2 border-earth-200 rounded-xl p-6 hover:border-primary-400 hover:shadow-lg transition">
                <div className="text-6xl mb-4 text-center">{product.image}</div>
                <div className="text-xs font-semibold text-primary-600 mb-1">{product.category}</div>
                <h3 className="text-xl font-bold text-earth-900 mb-2">{product.name}</h3>
                <p className="text-sm text-earth-600 mb-4">{product.description}</p>
                <ul className="space-y-1 mb-4">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="text-xs text-earth-700 flex items-start gap-2">
                      <Check size={14} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-earth-200">
                  <div>
                    <div className="text-2xl font-black text-earth-900">${product.price}</div>
                    <div className="text-xs text-earth-500">per node</div>
                  </div>
                  <button 
                    onClick={() => setCartCount(cartCount + 1)}
                    className="px-4 py-2 bg-primary-600 text-white font-bold text-sm rounded-lg hover:bg-primary-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button 
              onClick={() => setCurrentPage('products')}
              className="px-6 py-3 bg-earth-100 text-earth-800 font-bold rounded-lg hover:bg-earth-200 transition inline-flex items-center gap-2"
            >
              View All 40+ Products <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-earth-900 mb-4">Simple Setup, Powerful Results</h2>
            <p className="text-xl text-earth-600">Get started in 3 easy steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold text-earth-900 mb-3">Choose Your Nodes</h3>
              <p className="text-earth-600">Browse 40+ sensor types across 7 categories. Select what you need - from irrigation to livestock tracking.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold text-earth-900 mb-3">Install & Configure</h3>
              <p className="text-earth-600">Use our wizard-driven web app to configure each node. Auto-detect sensors and set up mesh networking in minutes.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold text-earth-900 mb-3">Monitor & Control</h3>
              <p className="text-earth-600">Access real-time data from anywhere. Set alerts, automate actions, and make data-driven decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-earth-900 mb-4">Trusted by Farmers</h2>
            <p className="text-xl text-earth-600">Real results from real farms</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-earth-50 rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-harvest-500 text-harvest-500" />
                  ))}
                </div>
                <p className="text-earth-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="font-bold text-earth-900">{testimonial.name}</div>
                <div className="text-sm text-earth-600">{testimonial.farm}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-xl text-primary-100 mb-8">Join thousands of farmers using GateMesh to save water, time, and money.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('products')}
              className="px-8 py-4 bg-white text-primary-700 font-bold rounded-lg hover:bg-primary-50 transition"
            >
              Start Shopping
            </button>
            <a href="mailto:sales@gatemesh.com" className="inline-block px-8 py-4 bg-primary-800 text-white font-bold rounded-lg hover:bg-primary-900 transition">
              Talk to Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );

  const ProductsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Comprehensive product list based on NodeType enum
    const allProducts = [
      // Irrigation Systems (1-59)
      {
        id: 1,
        name: 'Headgate Controller',
        category: 'irrigation',
        price: 299,
        emoji: '⚙️',
        description: 'Automated headgate control with remote operation and schedule management.',
        features: [
          'Servo motor control (0-100% position)',
          'Remote operation via mesh network',
          'Automated scheduling with multiple presets',
          'Weather integration for smart watering',
          'Solar powered with battery backup'
        ],
        specs: {
          battery: 'Solar + 18650 backup (continuous)',
          range: '500m mesh',
          sensors: 'Position encoder, flow feedback',
          rating: 'IP67 weatherproof'
        }
      },
      {
        id: 2,
        name: 'Section Controller',
        category: 'irrigation',
        price: 269,
        emoji: '🔧',
        description: 'Multi-zone irrigation controller for dividing fields into manageable sections.',
        features: [
          'Controls up to 8 separate zones',
          'Individual zone scheduling',
          'Flow monitoring per section',
          'Automatic failover and alerts',
          'Integration with weather stations'
        ],
        specs: {
          battery: 'Solar + backup (continuous)',
          range: '500m mesh',
          sensors: '8-channel relay, flow meters',
          rating: 'IP67 outdoor rated'
        }
      },
      {
        id: 3,
        name: 'Pump Controller',
        category: 'irrigation',
        price: 279,
        emoji: '💨',
        description: 'Smart pump control with pressure management and energy optimization.',
        features: [
          'Variable frequency drive (VFD) support',
          'Pressure-based flow control',
          'Energy usage monitoring',
          'Dry-run protection',
          'Remote start/stop via mesh'
        ],
        specs: {
          battery: 'AC powered with UPS backup',
          range: '500m mesh',
          sensors: 'Current, pressure, flow',
          rating: 'IP65 with NEMA enclosure'
        }
      },
      {
        id: 20,
        name: 'Water Level Sensor',
        category: 'irrigation',
        price: 149,
        emoji: '💧',
        description: 'Ultrasonic water level monitoring with high accuracy for ditches and tanks.',
        features: [
          'Ultrasonic measurement (0-20ft range)',
          '±0.5% accuracy',
          'Temperature compensation',
          'Configurable alert thresholds',
          'Low-power sleep mode'
        ],
        specs: {
          battery: '2x AA batteries (2 years)',
          range: '500m mesh',
          sensors: 'Ultrasonic distance, temperature',
          rating: 'IP67 submersible'
        }
      },
      {
        id: 21,
        name: 'Flow Sensor',
        category: 'irrigation',
        price: 179,
        emoji: '🌊',
        description: 'Precision flow measurement for irrigation pipes and channels.',
        features: [
          'Magnetic turbine flow meter',
          'Range: 1-100 GPM (scalable)',
          'Totalizer for cumulative volume',
          'Real-time flow rate alerts',
          'Leak detection algorithm'
        ],
        specs: {
          battery: '18650 lithium (18 months)',
          range: '500m mesh',
          sensors: 'Hall effect turbine',
          rating: 'IP68 inline mount'
        }
      },
      {
        id: 22,
        name: 'Soil Moisture Sensor',
        category: 'irrigation',
        price: 129,
        emoji: '🌱',
        description: 'Multi-depth soil moisture and temperature sensing for precision irrigation.',
        features: [
          'Capacitive moisture sensing (3 depths)',
          'Temperature sensing at each depth',
          'Salinity/EC measurement',
          'Wireless calibration',
          'Solar powered option'
        ],
        specs: {
          battery: '2x AA (18 months) or solar',
          range: '500m mesh',
          sensors: 'Capacitive moisture, thermistor',
          rating: 'IP68 buried installation'
        }
      },
      {
        id: 23,
        name: 'Pressure Sensor',
        category: 'irrigation',
        price: 159,
        emoji: '📊',
        description: 'High-accuracy pressure monitoring for irrigation systems.',
        features: [
          'Range: 0-150 PSI',
          '±0.25% accuracy',
          'Pressure spike detection',
          'Leak detection via pressure drop',
          'Real-time graphing'
        ],
        specs: {
          battery: '18650 lithium (2 years)',
          range: '500m mesh',
          sensors: 'Piezo pressure transducer',
          rating: 'IP67 threaded mount'
        }
      },
      {
        id: 24,
        name: 'Weather Station',
        category: 'irrigation',
        price: 399,
        emoji: '🌤️',
        description: 'Complete weather monitoring for smart irrigation decisions.',
        features: [
          'Temperature, humidity, pressure',
          'Wind speed and direction',
          'Rainfall measurement',
          'UV index and light levels',
          'Evapotranspiration calculation'
        ],
        specs: {
          battery: 'Solar powered (continuous)',
          range: '500m mesh + weather router',
          sensors: '8-in-1 weather sensor suite',
          rating: 'IP67 pole mount'
        }
      },
      {
        id: 40,
        name: 'Gate Valve Actuator',
        category: 'irrigation',
        price: 249,
        emoji: '🚪',
        description: 'Motorized gate valve control for remote water flow management.',
        features: [
          'Electric ball valve actuator',
          'Open/close in under 10 seconds',
          'Position feedback (0-100%)',
          'Manual override handle',
          'Stall detection'
        ],
        specs: {
          battery: 'Solar + 18650 backup',
          range: '500m mesh',
          sensors: 'Position encoder, current sense',
          rating: 'IP67 weatherproof'
        }
      },
      {
        id: 41,
        name: 'Variable Flow Valve',
        category: 'irrigation',
        price: 289,
        emoji: '🎛️',
        description: 'Precision variable flow control for drip and micro-irrigation.',
        features: [
          'Continuous flow adjustment (0-100%)',
          'Pressure-compensated design',
          'Flow rate feedback',
          'Anti-clog detection',
          'Energy-efficient servo drive'
        ],
        specs: {
          battery: 'Solar powered + backup',
          range: '500m mesh',
          sensors: 'Servo position, flow meter',
          rating: 'IP67 inline installation'
        }
      },
      {
        id: 42,
        name: 'Pump Relay',
        category: 'irrigation',
        price: 189,
        emoji: '🔌',
        description: 'High-current relay for remote pump control and monitoring.',
        features: [
          '30A relay (120V/240V compatible)',
          'Current monitoring',
          'Overcurrent protection',
          'Manual override switch',
          'Run-time logging'
        ],
        specs: {
          battery: 'AC powered',
          range: '500m mesh',
          sensors: 'Current clamp, voltage sense',
          rating: 'NEMA 4X enclosure'
        }
      },

      // Livestock Infrastructure (60-119)
      {
        id: 60,
        name: 'Water Trough Monitor',
        category: 'livestock',
        price: 169,
        emoji: '🐄',
        description: 'Monitor livestock water levels, temperature, and quality.',
        features: [
          'Ultrasonic level sensor (0-5ft)',
          'Water temperature monitoring',
          'TDS (water quality) sensor',
          'Auto-refill valve control',
          'Freeze alert system'
        ],
        specs: {
          battery: '2x AA (18 months)',
          range: '500m mesh',
          sensors: 'Ultrasonic, temperature, TDS',
          rating: 'IP67 trough mount'
        }
      },
      {
        id: 61,
        name: 'Feed Silo Monitor',
        category: 'livestock',
        price: 199,
        emoji: '🌾',
        description: 'Track feed inventory levels and prevent stockouts.',
        features: [
          'Ultrasonic bin level measurement',
          'Weight-based option available',
          'Inventory alerts (low/empty)',
          'Consumption rate tracking',
          'Multiple bin support'
        ],
        specs: {
          battery: '18650 lithium (2 years)',
          range: '500m mesh',
          sensors: 'Ultrasonic or load cell',
          rating: 'IP65 outdoor mount'
        }
      },
      {
        id: 100,
        name: 'Livestock Tracker',
        category: 'livestock',
        price: 199,
        emoji: '📍',
        description: 'GPS livestock location and health monitoring collar.',
        features: [
          'Real-time GPS tracking',
          'Geofencing with breach alerts',
          'Health monitoring (activity, temp)',
          'Low-power mesh relay mode',
          'Waterproof collar design'
        ],
        specs: {
          battery: 'Rechargeable (30 days)',
          range: '500m mesh + GPS',
          sensors: 'GPS, accelerometer, temp',
          rating: 'IP68 collar mount'
        }
      },
      {
        id: 103,
        name: 'Health Monitor',
        category: 'livestock',
        price: 229,
        emoji: '💊',
        description: 'Advanced livestock health monitoring with vital signs.',
        features: [
          'Body temperature sensor',
          'Activity/rumination tracking',
          'Heart rate monitoring (optional)',
          'Illness prediction algorithms',
          'Calving/lambing alerts'
        ],
        specs: {
          battery: 'Rechargeable (21 days)',
          range: '500m mesh',
          sensors: 'IR temp, accelerometer, HR',
          rating: 'IP68 ear tag mount'
        }
      },
      {
        id: 104,
        name: 'Auto Feeder Controller',
        category: 'livestock',
        price: 259,
        emoji: '🍽️',
        description: 'Automated livestock feeding with portion control.',
        features: [
          'Programmable feeding schedules',
          'Portion control (weight-based)',
          'Feed dispensed logging',
          'Empty hopper alerts',
          'Multiple feed types support'
        ],
        specs: {
          battery: 'Solar + backup (continuous)',
          range: '500m mesh',
          sensors: 'Load cell, servo motor',
          rating: 'IP65 feeder mount'
        }
      },
      {
        id: 105,
        name: 'Barn Door Controller',
        category: 'livestock',
        price: 219,
        emoji: '🚪',
        description: 'Automated barn door control with scheduling and remote operation.',
        features: [
          'Motorized door actuator',
          'Sunrise/sunset scheduling',
          'Obstruction detection',
          'Manual override',
          'Position feedback'
        ],
        specs: {
          battery: 'AC powered + UPS',
          range: '500m mesh',
          sensors: 'Position encoder, IR safety',
          rating: 'IP54 barn installation'
        }
      },
      {
        id: 106,
        name: 'Milking Parlor Monitor',
        category: 'livestock',
        price: 339,
        emoji: '🥛',
        description: 'Monitor milking operations and individual cow production.',
        features: [
          'Milk flow meter per stall',
          'RFID cow identification',
          'Production tracking by animal',
          'Temperature monitoring',
          'Cleaning cycle verification'
        ],
        specs: {
          battery: 'AC powered',
          range: '500m mesh',
          sensors: 'Flow meter, RFID, temp',
          rating: 'Food-grade IP69K'
        }
      },
      {
        id: 107,
        name: 'Pasture Scale',
        category: 'livestock',
        price: 449,
        emoji: '⚖️',
        description: 'Walk-over weighing system for livestock weight tracking.',
        features: [
          'High-precision load cells (±1 lb)',
          'RFID animal identification',
          'Weight trend analysis',
          'Growth rate calculations',
          'Market readiness alerts'
        ],
        specs: {
          battery: 'Solar powered (continuous)',
          range: '500m mesh',
          sensors: '4x load cells, RFID reader',
          rating: 'IP67 outdoor platform'
        }
      },

      // Equipment Monitoring (120-159)
      {
        id: 120,
        name: 'Generator Monitor',
        category: 'equipment',
        price: 249,
        emoji: '⚡',
        description: 'Remote generator monitoring with runtime and diagnostics.',
        features: [
          'Engine temperature monitoring',
          'Fuel level tracking',
          'Runtime hours counter',
          'Current/voltage monitoring',
          'Auto-start integration'
        ],
        specs: {
          battery: 'Powered by generator',
          range: '500m mesh',
          sensors: 'Temp, fuel, current, voltage',
          rating: 'IP54 engine mount'
        }
      },
      {
        id: 121,
        name: 'Tractor Monitor',
        category: 'equipment',
        price: 279,
        emoji: '🚜',
        description: 'Track tractor location, usage, and maintenance needs.',
        features: [
          'GPS location tracking',
          'Engine hours tracking',
          'Fuel consumption monitoring',
          'Geofence alerts',
          'Maintenance reminders'
        ],
        specs: {
          battery: '12V vehicle power',
          range: '500m mesh + GPS',
          sensors: 'GPS, OBD-II, fuel flow',
          rating: 'IP65 cab mount'
        }
      },
      {
        id: 123,
        name: 'Solar Panel Monitor',
        category: 'equipment',
        price: 189,
        emoji: '☀️',
        description: 'Monitor solar panel performance and energy production.',
        features: [
          'Voltage and current monitoring',
          'Power production tracking',
          'Panel efficiency calculation',
          'Fault detection',
          'Battery charge status'
        ],
        specs: {
          battery: 'Powered by solar system',
          range: '500m mesh',
          sensors: 'Voltage, current, irradiance',
          rating: 'IP67 panel mount'
        }
      },
      {
        id: 124,
        name: 'Fuel Tank Monitor',
        category: 'equipment',
        price: 199,
        emoji: '⛽',
        description: 'Track diesel and fuel levels with theft detection.',
        features: [
          'Ultrasonic level sensor (0-2000 gal)',
          'Fuel theft detection',
          'Consumption rate tracking',
          'Refill notifications',
          'Temperature compensation'
        ],
        specs: {
          battery: '18650 lithium (2 years)',
          range: '500m mesh',
          sensors: 'Ultrasonic, temperature',
          rating: 'IP67 explosion-proof'
        }
      },
      {
        id: 125,
        name: 'Compressor Monitor',
        category: 'equipment',
        price: 219,
        emoji: '💨',
        description: 'Monitor air compressor status and maintenance needs.',
        features: [
          'Pressure tank monitoring',
          'Runtime hours tracking',
          'Temperature monitoring',
          'Vibration analysis',
          'Maintenance scheduling'
        ],
        specs: {
          battery: 'AC powered',
          range: '500m mesh',
          sensors: 'Pressure, temp, vibration',
          rating: 'IP54 shop installation'
        }
      },
      {
        id: 126,
        name: 'Battery Bank Monitor',
        category: 'equipment',
        price: 179,
        emoji: '🔋',
        description: 'Monitor off-grid battery banks and solar storage.',
        features: [
          'Multi-battery voltage monitoring',
          'State of charge calculation',
          'Charge/discharge rate',
          'Cell balancing status',
          'Lifespan prediction'
        ],
        specs: {
          battery: 'Powered by monitored bank',
          range: '500m mesh',
          sensors: 'Voltage (12 channels), current',
          rating: 'IP54 battery enclosure'
        }
      },
      {
        id: 127,
        name: 'Welder Usage Tracker',
        category: 'equipment',
        price: 159,
        emoji: '🔧',
        description: 'Track welding equipment usage and power consumption.',
        features: [
          'Power usage monitoring',
          'Arc-on time tracking',
          'Equipment runtime hours',
          'Maintenance reminders',
          'Multi-welder support'
        ],
        specs: {
          battery: 'AC powered',
          range: '500m mesh',
          sensors: 'Current clamp, arc sensor',
          rating: 'IP54 shop mount'
        }
      },

      // Barn & Building (160-199)
      {
        id: 160,
        name: 'Hay Storage Monitor',
        category: 'building',
        price: 169,
        emoji: '🌾',
        description: 'Monitor hay temperature and moisture to prevent fires.',
        features: [
          'Temperature sensors (multiple depths)',
          'Moisture content monitoring',
          'Fire risk alerts',
          'Mold prevention warnings',
          'Multiple probe support'
        ],
        specs: {
          battery: '18650 lithium (18 months)',
          range: '500m mesh',
          sensors: 'Thermistor array, moisture',
          rating: 'IP65 hay probe'
        }
      },
      {
        id: 163,
        name: 'Greenhouse Controller',
        category: 'building',
        price: 349,
        emoji: '🏡',
        description: 'Complete greenhouse climate control and automation.',
        features: [
          'Temperature and humidity control',
          'Automated vent/fan control',
          'Irrigation integration',
          'CO2 monitoring (optional)',
          'Light level optimization'
        ],
        specs: {
          battery: 'AC powered + UPS',
          range: '500m mesh',
          sensors: 'Temp, humidity, light, CO2',
          rating: 'IP54 greenhouse mount'
        }
      },
      {
        id: 164,
        name: 'Grain Bin Monitor',
        category: 'building',
        price: 229,
        emoji: '🌽',
        description: 'Monitor grain temperature and moisture for safe storage.',
        features: [
          'Temperature cables (6-12 sensors)',
          'Moisture monitoring',
          'Fan control automation',
          'Hot spot detection',
          'Aeration scheduling'
        ],
        specs: {
          battery: 'Solar + backup (continuous)',
          range: '500m mesh',
          sensors: 'Temp cable, moisture probe',
          rating: 'IP65 bin mount'
        }
      },
      {
        id: 165,
        name: 'Chicken Coop Controller',
        category: 'building',
        price: 189,
        emoji: '🐔',
        description: 'Automated coop door and climate control for poultry.',
        features: [
          'Auto door (sunrise/sunset)',
          'Temperature control',
          'Humidity monitoring',
          'Egg production counter (optional)',
          'Predator intrusion alerts'
        ],
        specs: {
          battery: 'Solar powered + backup',
          range: '500m mesh',
          sensors: 'Light, temp, humidity, door',
          rating: 'IP54 coop installation'
        }
      },
      {
        id: 166,
        name: 'Cold Storage Monitor',
        category: 'building',
        price: 199,
        emoji: '❄️',
        description: 'Monitor refrigerated storage temperature and door status.',
        features: [
          'Precision temperature monitoring',
          'Door open/close alerts',
          'Power failure detection',
          'Temperature trend logging',
          'Multiple zone support'
        ],
        specs: {
          battery: 'AC powered + battery backup',
          range: '500m mesh',
          sensors: 'Precision thermistor, door contact',
          rating: 'IP54 freezer rated (-40°C)'
        }
      },
      {
        id: 167,
        name: 'Shop Climate Monitor',
        category: 'building',
        price: 139,
        emoji: '🏭',
        description: 'Monitor shop/barn temperature, humidity, and air quality.',
        features: [
          'Temperature and humidity',
          'CO2 and VOC monitoring',
          'Dust/particulate sensor',
          'Automated HVAC control',
          'Multi-room support'
        ],
        specs: {
          battery: 'AC powered or 18650',
          range: '500m mesh',
          sensors: 'BME680 (temp, humidity, gas)',
          rating: 'IP40 indoor mount'
        }
      },

      // Crop & Field Monitoring (200-249)
      {
        id: 202,
        name: 'Pest Monitor',
        category: 'crop',
        price: 179,
        emoji: '🐛',
        description: 'Automated pest trap monitoring with image detection.',
        features: [
          'Camera-based pest counting',
          'Pheromone trap integration',
          'Species identification (AI)',
          'Spray timing recommendations',
          'Historical trend analysis'
        ],
        specs: {
          battery: 'Solar powered (continuous)',
          range: '500m mesh',
          sensors: 'Camera, PIR motion, counter',
          rating: 'IP67 field mount'
        }
      },
      {
        id: 203,
        name: 'Plant Health Sensor',
        category: 'crop',
        price: 249,
        emoji: '🌿',
        description: 'Monitor plant health with NDVI and multispectral analysis.',
        features: [
          'NDVI (vegetation index) calculation',
          'Multispectral imaging',
          'Chlorophyll content estimation',
          'Stress detection (water, nutrient)',
          'Growth stage tracking'
        ],
        specs: {
          battery: 'Solar powered + backup',
          range: '500m mesh',
          sensors: 'Multispectral camera, light',
          rating: 'IP67 crop canopy mount'
        }
      },
      {
        id: 204,
        name: 'Frost Detection Sensor',
        category: 'crop',
        price: 159,
        emoji: '🧊',
        description: 'Early frost warning system for crop protection.',
        features: [
          'Leaf temperature monitoring',
          'Dew point calculation',
          'Frost risk prediction (6-hour)',
          'SMS/email alerts',
          'Heater/fan control integration'
        ],
        specs: {
          battery: '2x AA (2 years)',
          range: '500m mesh',
          sensors: 'IR leaf temp, ambient temp, humidity',
          rating: 'IP67 crop level mount'
        }
      },
      {
        id: 205,
        name: 'Canopy Microclimate',
        category: 'crop',
        price: 189,
        emoji: '🌳',
        description: 'Monitor temperature and humidity within crop canopy.',
        features: [
          'Canopy-level temp/humidity',
          'Light penetration measurement',
          'Air circulation analysis',
          'Disease risk modeling',
          'Multiple height sensors'
        ],
        specs: {
          battery: 'Solar powered + backup',
          range: '500m mesh',
          sensors: 'Temp, humidity, light (3 levels)',
          rating: 'IP67 canopy mount'
        }
      },
      {
        id: 206,
        name: 'Leaf Wetness Sensor',
        category: 'crop',
        price: 149,
        emoji: '💦',
        description: 'Measure leaf wetness duration for disease management.',
        features: [
          'Wetness duration tracking',
          'Disease risk calculation',
          'Spray timing optimization',
          'Dew formation prediction',
          'Historical data logging'
        ],
        specs: {
          battery: '18650 lithium (2 years)',
          range: '500m mesh',
          sensors: 'Capacitive wetness grid',
          rating: 'IP67 leaf-level mount'
        }
      },

      // Specialized Systems (250-299)
      {
        id: 250,
        name: 'Bee Hive Monitor',
        category: 'specialized',
        price: 279,
        emoji: '🐝',
        description: 'Monitor hive weight, temperature, and bee activity.',
        features: [
          'Hive weight tracking (0.1 lb precision)',
          'Internal temperature monitoring',
          'Humidity levels',
          'Acoustic bee activity analysis',
          'Swarm detection alerts'
        ],
        specs: {
          battery: 'Solar powered (continuous)',
          range: '500m mesh',
          sensors: 'Load cell, temp, humidity, mic',
          rating: 'IP67 hive mount'
        }
      },
      {
        id: 251,
        name: 'Aquaponics Controller',
        category: 'specialized',
        price: 329,
        emoji: '🐟',
        description: 'Complete monitoring for fish tanks and aquaponics systems.',
        features: [
          'Water pH monitoring',
          'Dissolved oxygen (DO) sensor',
          'Temperature control',
          'Ammonia/nitrite detection',
          'Fish feeder automation'
        ],
        specs: {
          battery: 'AC powered + UPS',
          range: '500m mesh',
          sensors: 'pH, DO, temp, NH3/NO2',
          rating: 'IP68 submersible probes'
        }
      },
      {
        id: 252,
        name: 'Hydroponic Monitor',
        category: 'specialized',
        price: 299,
        emoji: '🥬',
        description: 'Monitor and control hydroponic growing systems.',
        features: [
          'pH and EC monitoring',
          'Nutrient solution temperature',
          'Water level tracking',
          'Pump control automation',
          'Nutrient dosing (integration)'
        ],
        specs: {
          battery: 'AC powered',
          range: '500m mesh',
          sensors: 'pH, EC, temp, level',
          rating: 'IP68 probe, IP54 controller'
        }
      },
      {
        id: 253,
        name: 'Mushroom Farm Monitor',
        category: 'specialized',
        price: 259,
        emoji: '🍄',
        description: 'Climate control for mushroom growing environments.',
        features: [
          'Precision temp/humidity control',
          'CO2 level monitoring',
          'Fresh air exchange automation',
          'Light cycle control',
          'Contamination detection (air quality)'
        ],
        specs: {
          battery: 'AC powered',
          range: '500m mesh',
          sensors: 'Temp, humidity, CO2, light',
          rating: 'IP54 grow room mount'
        }
      },
      {
        id: 254,
        name: 'GateMesh Gateway Hub (Raspberry Pi)',
        category: 'specialized',
        price: 399,
        emoji: '🖥️',
        description: 'Raspberry Pi 4 with LoRa HAT - acts as network gateway, programming station, and runs the full GateMesh web interface locally',
        features: [
          'Raspberry Pi 4 (4GB RAM) with LoRa HAT module',
          'Acts as mesh network gateway and coordinator',
          'USB programming interface for configuring nodes',
          'Runs full GateMesh web app locally (no internet required)',
          'MQTT broker for cloud integration',
          'LoRa mesh range: 2-5km line of sight',
          'Ethernet + WiFi connectivity',
          'MicroSD card with pre-installed software',
          'Power supply included',
          'Web interface accessible on local network',
          'Can manage up to 250 nodes',
          'Data logging and historical storage'
        ],
        specs: {
          battery: 'AC powered (5V/3A adapter included)',
          range: '2-5km LoRa mesh',
          sensors: 'LoRa HAT module',
          rating: 'Indoor use, Pi 4 chassis'
        }
      },

      // Processing (300-349)
      {
        id: 300,
        name: 'Milk Tank Monitor',
        category: 'building',
        price: 269,
        emoji: '🥛',
        description: 'Monitor bulk milk tank temperature and agitator operation.',
        features: [
          'Precision temperature monitoring (±0.1°F)',
          'Agitator runtime tracking',
          'Volume level estimation',
          'Cooling system status',
          'FDA compliance logging'
        ],
        specs: {
          battery: 'AC powered + battery backup',
          range: '500m mesh',
          sensors: 'Precision PT100, level, current',
          rating: 'Food-grade IP69K'
        }
      }
    ];

    const filteredProducts = selectedCategory === 'all'
      ? allProducts
      : allProducts.filter(p => p.category === selectedCategory);

    const ProductCard = ({ product }) => {
      const [showDetails, setShowDetails] = useState(false);

      return (
        <div className="bg-white border-2 border-earth-200 rounded-xl p-6 hover:border-primary-400 hover:shadow-lg transition">
          <div className="text-5xl mb-3 text-center">{product.emoji}</div>
          <div className="text-xs font-semibold text-primary-600 mb-1 uppercase">
            {categories.find(c => c.id === product.category)?.name}
          </div>
          <h3 className="text-lg font-bold text-earth-900 mb-2">{product.name}</h3>
          <p className="text-sm text-earth-600 mb-4 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between mb-4 pb-4 border-b border-earth-200">
            <div>
              <div className="text-2xl font-black text-earth-900">${product.price}</div>
              <div className="text-xs text-earth-500">per node</div>
            </div>
            <button
              onClick={() => setCartCount(cartCount + 1)}
              className="px-4 py-2 bg-primary-600 text-white font-bold text-sm rounded-lg hover:bg-primary-700 transition"
            >
              Add to Cart
            </button>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center justify-center gap-1"
          >
            {showDetails ? 'Hide Details' : 'View Details'}
            <ChevronRight size={16} className={`transform transition ${showDetails ? 'rotate-90' : ''}`} />
          </button>

          {showDetails && (
            <div className="mt-4 pt-4 border-t border-earth-200 space-y-3">
              <div>
                <h4 className="text-xs font-bold text-earth-900 mb-2">KEY FEATURES</h4>
                <ul className="space-y-1">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-earth-700 flex items-start gap-2">
                      <Check size={12} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold text-earth-900 mb-2">SPECIFICATIONS</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-earth-600">Battery:</span>
                    <span className="text-earth-900 font-medium">{product.specs.battery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth-600">Range:</span>
                    <span className="text-earth-900 font-medium">{product.specs.range}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth-600">Sensors:</span>
                    <span className="text-earth-900 font-medium">{product.specs.sensors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth-600">Rating:</span>
                    <span className="text-earth-900 font-medium">{product.specs.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="py-20 bg-earth-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-5xl font-black text-earth-900 mb-4">Product Catalog</h1>
            <p className="text-xl text-earth-600">Browse our complete range of {allProducts.length} agricultural IoT nodes</p>
          </div>

          {/* Category Filter */}
          <div className="mb-8 bg-white rounded-xl p-2 border-2 border-earth-200">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  selectedCategory === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-earth-50 text-earth-700 hover:bg-earth-100'
                }`}
              >
                All Products ({allProducts.length})
              </button>
              {categories.map(category => {
                const count = allProducts.filter(p => p.category === category.id).length;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-earth-50 text-earth-700 hover:bg-earth-100'
                    }`}
                  >
                    {category.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Suggested Bundles */}
          <div className="mt-16">
            <h2 className="text-3xl font-black text-earth-900 mb-8">Suggested Bundles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 border-2 border-primary-300">
                <div className="text-sm font-bold text-primary-600 mb-2">STARTER PACKAGE</div>
                <h3 className="text-2xl font-black text-earth-900 mb-4">Irrigation Monitoring Kit</h3>
                <p className="text-earth-600 mb-6">Perfect for getting started with water management on small to medium farms.</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-earth-700">3x Water Level Sensors ($447)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-earth-700">1x Headgate Controller ($299)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-earth-700">1x Mesh Router Node ($179)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-earth-700">Free setup assistance</span>
                  </li>
                </ul>
                <div className="text-sm text-earth-600 mb-2">Total if purchased separately: $925</div>
                <div className="text-xs text-earth-500 italic mb-4">Components sold individually - configure as needed</div>
                <button
                  onClick={() => setCartCount(cartCount + 1)}
                  className="w-full py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition"
                >
                  Add Bundle to Cart
                </button>
              </div>

              <div className="bg-white rounded-xl p-8 border-2 border-earth-300">
                <div className="text-sm font-bold text-earth-600 mb-2">PROFESSIONAL PACKAGE</div>
                <h3 className="text-2xl font-black text-earth-900 mb-4">Complete Farm Monitoring</h3>
                <p className="text-earth-600 mb-6">Comprehensive monitoring for larger operations across multiple zones.</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-earth-700">5x Water Level Sensors ($745)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-earth-700">3x Soil Moisture Sensors ($387)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-earth-700">2x Livestock Trackers ($398)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-earth-700">2x Mesh Router Nodes ($358)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-earth-700">Professional support (first 3 months free)</span>
                  </li>
                </ul>
                <div className="text-sm text-earth-600 mb-2">Total if purchased separately: $1,888</div>
                <div className="text-xs text-earth-500 italic mb-4">Components sold individually - mix and match</div>
                <button
                  onClick={() => setCartCount(cartCount + 1)}
                  className="w-full py-3 bg-earth-700 text-white font-bold rounded-lg hover:bg-earth-800 transition"
                >
                  Add Bundle to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PricingPage = () => (
    <div className="py-20 bg-earth-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-earth-900 mb-4">Pricing</h1>
          <p className="text-xl text-earth-600">Hardware + Support that grows with your farm</p>
        </div>

        {/* Hardware Pricing Note */}
        <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-6 mb-12 max-w-3xl mx-auto">
          <h3 className="font-bold text-earth-900 mb-2">💰 Hardware Pricing</h3>
          <p className="text-earth-700">All nodes are priced individually from $129-$299 per unit. Browse our <button onClick={() => setCurrentPage('products')} className="text-primary-600 font-semibold underline">product catalog</button> for detailed pricing. Most orders are 1-5 nodes. For bulk orders (50+ nodes) or custom solutions, contact our sales team.</p>
        </div>

        {/* Support Tiers */}
        <div className="grid md:grid-cols-3 gap-8">
          {supportTiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-xl p-8 ${tier.popular ? 'border-4 border-primary-500 shadow-xl relative' : 'border-2 border-earth-200'}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-black text-earth-900 mb-2">{tier.name}</h3>
                <div className="mb-2">
                  {tier.price === 0 ? (
                    <div className="text-4xl font-black text-earth-900">Free</div>
                  ) : (
                    <div>
                      <span className="text-4xl font-black text-earth-900">${tier.price}</span>
                      <span className="text-earth-600">/{tier.period.split(' ')[1]}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-earth-600">{tier.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check size={18} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-earth-700">{feature}</span>
                  </li>
                ))}
              </ul>
              {tier.name === 'Enterprise' ? (
                <a
                  href="mailto:sales@gatemesh.com?subject=Get Started with GateMesh"
                  className={`block text-center w-full py-3 font-bold rounded-lg transition ${
                    tier.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-earth-100 text-earth-800 hover:bg-earth-200'
                  }`}
                >
                  {tier.cta}
                </a>
              ) : (
                <a
                  href="mailto:sales@gatemesh.com?subject=Get Started with GateMesh"
                  className={`block text-center w-full py-3 font-bold rounded-lg transition ${
                    tier.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-earth-100 text-earth-800 hover:bg-earth-200'
                  }`}
                >
                  {tier.cta}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Annual Savings Note */}
        <div className="mt-12 text-center">
          <p className="text-earth-600">
            💡 <strong className="text-earth-900">Save 2 months</strong> with annual billing: Professional $390/year, Enterprise $2,490/year
          </p>
        </div>

        {/* Custom Solutions */}
        <div className="mt-16 bg-gradient-to-r from-earth-700 to-earth-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-black mb-4">Need a Custom Solution?</h2>
          <p className="text-xl text-earth-100 mb-6">Large deployments, custom nodes, or enterprise integrations - our team can help.</p>
          <a href="mailto:sales@gatemesh.com?subject=Custom Quote Request" className="inline-block px-8 py-3 bg-white text-earth-800 font-bold rounded-lg hover:bg-earth-50 transition">
            Contact Sales Team
          </a>
        </div>
      </div>
    </div>
  );

  const HowItWorksPage = () => (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-earth-900 mb-4">How GateMesh Works</h1>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto">
            From purchase to deployment, we've made agriculture IoT accessible for everyone
          </p>
        </div>

        {/* The System */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-earth-900 mb-8 text-center">The Technology</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-earth-900 mb-3">Mesh Networking</h3>
              <p className="text-earth-600">
                Nodes communicate with each other, extending range up to 500m per hop. No need for cellular coverage or WiFi in every field.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-earth-900 mb-3">Ultra Low Power</h3>
              <p className="text-earth-600">
                Battery-powered nodes last up to 2 years. Solar options available for always-on nodes like routers and controllers.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-earth-900 mb-3">Your Data, Your Control</h3>
              <p className="text-earth-600">
                No cloud lock-in. Data stored locally with optional cloud sync. Works offline in remote areas with command queuing.
              </p>
            </div>
          </div>
        </div>

        {/* Setup Process */}
        <div className="bg-earth-50 rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-black text-earth-900 mb-12 text-center">5-Step Setup Wizard</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-black flex-shrink-0">1</div>
              <div>
                <h3 className="text-xl font-bold text-earth-900 mb-2">Role Selection</h3>
                <p className="text-earth-700">Browse categories and select node types. Add multiple roles to a single device for flexibility.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-black flex-shrink-0">2</div>
              <div>
                <h3 className="text-xl font-bold text-earth-900 mb-2">Mesh Network Config</h3>
                <p className="text-earth-700">Choose network role: Client (battery-friendly), Router (extends range), or Repeater (dedicated relay).</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-black flex-shrink-0">3</div>
              <div>
                <h3 className="text-xl font-bold text-earth-900 mb-2">Location Assignment</h3>
                <p className="text-earth-700">Organize by Farm → Zone → Field hierarchy. Add GPS coordinates or use "Use My Location" feature.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-black flex-shrink-0">4</div>
              <div>
                <h3 className="text-xl font-bold text-earth-900 mb-2">Advanced Configuration</h3>
                <p className="text-earth-700">Auto-detect sensors, set thresholds and alerts, configure reporting intervals, add installation notes.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-black flex-shrink-0">5</div>
              <div>
                <h3 className="text-xl font-bold text-earth-900 mb-2">Review & Deploy</h3>
                <p className="text-earth-700">Visual summary of configuration. Verify settings and deploy to your node via USB or wireless.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Mode CTA */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-black mb-4">Try It Before You Buy</h2>
          <p className="text-xl text-primary-100 mb-6">
            Access our configuration app in demo mode right now - no purchase required
          </p>
          <a href="?app" className="inline-block px-8 py-3 bg-white text-primary-700 font-bold rounded-lg hover:bg-primary-50 transition">
            Launch Demo Mode
          </a>
        </div>
      </div>
    </div>
  );

  const ResourcesPage = () => (
    <div className="py-20 bg-earth-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-earth-900 mb-4">Resources</h1>
          <p className="text-xl text-earth-600">Guides, documentation, and support to help you succeed</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Documentation */}
          <div className="bg-white rounded-xl p-6 border-2 border-earth-200 hover:border-primary-400 transition cursor-pointer">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Package size={24} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-earth-900 mb-2">Documentation</h3>
            <p className="text-earth-600 mb-4">Complete technical docs, API references, and integration guides</p>
            <div className="text-sm font-semibold text-primary-600 flex items-center gap-1">
              Browse Docs <ChevronRight size={16} />
            </div>
          </div>

          {/* Video Tutorials */}
          <div className="bg-white rounded-xl p-6 border-2 border-earth-200 hover:border-primary-400 transition cursor-pointer">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Clock size={24} className="text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-earth-900 mb-2">Video Tutorials</h3>
            <p className="text-earth-600 mb-4">Step-by-step installation and configuration video guides</p>
            <div className="text-sm font-semibold text-primary-600 flex items-center gap-1">
              Watch Videos <ChevronRight size={16} />
            </div>
          </div>

          {/* Installation Guides */}
          <div className="bg-white rounded-xl p-6 border-2 border-earth-200 hover:border-primary-400 transition cursor-pointer">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <MapPin size={24} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-earth-900 mb-2">Installation Guides</h3>
            <p className="text-earth-600 mb-4">Best practices for sensor placement and network setup</p>
            <div className="text-sm font-semibold text-primary-600 flex items-center gap-1">
              View Guides <ChevronRight size={16} />
            </div>
          </div>

          {/* Community Forum */}
          <div className="bg-white rounded-xl p-6 border-2 border-earth-200 hover:border-primary-400 transition cursor-pointer">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Users size={24} className="text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-earth-900 mb-2">Community Forum</h3>
            <p className="text-earth-600 mb-4">Connect with other farmers, share tips, get answers</p>
            <div className="text-sm font-semibold text-primary-600 flex items-center gap-1">
              Join Forum <ChevronRight size={16} />
            </div>
          </div>

          {/* Case Studies */}
          <div className="bg-white rounded-xl p-6 border-2 border-earth-200 hover:border-primary-400 transition cursor-pointer">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 size={24} className="text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-earth-900 mb-2">Case Studies</h3>
            <p className="text-earth-600 mb-4">Real-world success stories and ROI examples</p>
            <div className="text-sm font-semibold text-primary-600 flex items-center gap-1">
              Read Stories <ChevronRight size={16} />
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-white rounded-xl p-6 border-2 border-earth-200 hover:border-primary-400 transition cursor-pointer">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <Phone size={24} className="text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-earth-900 mb-2">Contact Support</h3>
            <p className="text-earth-600 mb-4">Get help from our expert support team</p>
            <div className="text-sm font-semibold text-primary-600 flex items-center gap-1">
              Get Support <ChevronRight size={16} />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-2xl p-8">
          <h2 className="text-3xl font-black text-earth-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-earth-900 mb-2">How far can the mesh network reach?</h3>
              <p className="text-earth-700">Each node can communicate up to 500m with line-of-sight. The mesh network extends this infinitely by hopping through router nodes. Most farms need 1 router per 1000 acres.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-earth-900 mb-2">Do I need cellular or WiFi coverage?</h3>
              <p className="text-earth-700">No! The mesh network works independently. You only need internet at your base station (farmhouse, office) to access the web interface and receive remote alerts.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-earth-900 mb-2">What's the battery life?</h3>
              <p className="text-earth-700">Sensor nodes in sleep mode last 1-2 years on standard batteries. Router nodes need power (solar panel or AC adapter). We recommend solar for remote installations.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-earth-900 mb-2">Can I install it myself?</h3>
              <p className="text-earth-700">Yes! Our setup wizard makes configuration simple. Most farmers install themselves in a few hours. Professional installation is available for Enterprise customers or large deployments.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-earth-900 mb-2">What if I need a custom sensor?</h3>
              <p className="text-earth-700">Contact our sales team. We can develop custom nodes or integrate third-party sensors. Enterprise support includes custom integration assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SolutionsPage = () => (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-earth-900 mb-4">Solutions by Farm Type</h1>
          <p className="text-xl text-earth-600">Tailored IoT systems for every agricultural operation</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Dairy Farms */}
          <div className="bg-earth-50 rounded-xl p-8">
            <div className="text-5xl mb-4">🐄</div>
            <h2 className="text-2xl font-black text-earth-900 mb-3">Dairy Farms</h2>
            <p className="text-earth-700 mb-4">
              Monitor cattle health, automate feeding, track milk production, and manage barn climate.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-earth-700">
                <Check size={16} className="text-primary-600" />
                <span>Livestock health tracking & location</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-earth-700">
                <Check size={16} className="text-primary-600" />
                <span>Automated feeder monitoring</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-earth-700">
                <Check size={16} className="text-primary-600" />
                <span>Milk tank temperature alerts</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-earth-700">
                <Check size={16} className="text-primary-600" />
                <span>Barn climate control</span>
              </div>
            </div>
            <button onClick={() => setCurrentPage('products')} className="text-primary-600 font-semibold flex items-center gap-1">
              View Dairy Solution <ChevronRight size={16} />
            </button>
          </div>

          {/* Crop Farms */}
          <div className="bg-earth-50 rounded-xl p-8">
            <div className="text-5xl mb-4">🌾</div>
            <h2 className="text-2xl font-black text-earth-900 mb-3">Crop Farms</h2>
            <p className="text-earth-700 mb-4">
              Optimize irrigation, monitor soil conditions, track equipment, and prevent crop stress.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-earth-700">
                <Check size={16} className="text-primary-600" />
                <span>Soil moisture & temperature sensing</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-earth-700">
                <Check size={16} className="text-primary-600" />
                <span>Automated irrigation control</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-earth-700">
                <Check size={16} className="text-primary-600" />
                <span>Weather station integration</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-earth-700">
                <Check size={16} className="text-primary-600" />
                <span>Equipment & generator monitoring</span>
              </div>
            </div>
            <button onClick={() => setCurrentPage('products')} className="text-primary-600 font-semibold flex items-center gap-1">
              View Crop Solution <ChevronRight size={16} />
            </button>
          </div>

          {/* Livestock Ranches */}
          <div className="bg-earth-50 rounded-xl p-8">
            <div className="text-5xl mb-4">🐎</div>
            <h2 className="text-2xl font-black text-earth-900 mb-3">Livestock Ranches</h2>
            <p className="text-earth-700 mb-4">
              Track animals across large pastures, monitor water sources, automate gates.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-earth-700">
                <Check size={16} className="text-primary-600" />
                <span>GPS livestock tracking & geofencing</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-earth-700">
                <Check size={16} className="text-primary-600" />
                <span>Water trough level monitoring</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-earth-700">
                <Check size={16} className="text-primary-600" />
                <span>Pasture rotation management</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-earth-700">
                <Check size={16} className="text-primary-600" />
                <span>Remote gate control</span>
              </div>
            </div>
            <button onClick={() => setCurrentPage('products')} className="text-primary-600 font-semibold flex items-center gap-1">
              View Ranch Solution <ChevronRight size={16} />
            </button>
          </div>

          {/* Orchards & Vineyards */}
          <div className="bg-earth-50 rounded-xl p-8">
            <div className="text-5xl mb-4">🍎</div>
            <h2 className="text-2xl font-black text-earth-900 mb-3">Orchards & Vineyards</h2>
            <p className="text-earth-700 mb-4">
              Precision irrigation, frost protection, pest detection, and harvest timing.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-earth-700">
                <Check size={16} className="text-primary-600" />
                <span>Drip irrigation zone control</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-earth-700">
                <Check size={16} className="text-primary-600" />
                <span>Frost warning system</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-earth-700">
                <Check size={16} className="text-primary-600" />
                <span>Canopy microclimate monitoring</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-earth-700">
                <Check size={16} className="text-primary-600" />
                <span>Pest trap monitoring</span>
              </div>
            </div>
            <button onClick={() => setCurrentPage('products')} className="text-primary-600 font-semibold flex items-center gap-1">
              View Orchard Solution <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* ROI Calculator CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-black mb-4">Calculate Your ROI</h2>
          <p className="text-xl text-primary-100 mb-6">
            See how much you could save on water, labor, and crop loss with GateMesh
          </p>
          <button onClick={() => setCurrentPage('pricing')} className="px-8 py-3 bg-white text-primary-700 font-bold rounded-lg hover:bg-primary-50 transition">
            Launch ROI Calculator
          </button>
        </div>
      </div>
    </div>
  );

  // Header Component
  const Header = () => (
    <header className="bg-white border-b-2 border-earth-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Logo size="md" />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`font-semibold transition ${
                  currentPage === item.id 
                    ? 'text-primary-600' 
                    : 'text-earth-700 hover:text-primary-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <a
              href="?app"
              className="hidden md:block px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition"
            >
              Web App
            </a>
            <a href="?app" className="hidden md:block px-4 py-2 text-earth-700 font-semibold hover:text-primary-600 transition">
              Sign In
            </a>
            <button className="relative p-2 text-earth-700 hover:text-primary-600 transition">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-earth-200 py-4">
            <nav className="flex flex-col gap-4">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left font-semibold py-2 ${
                    currentPage === item.id
                      ? 'text-primary-600'
                      : 'text-earth-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t-2 border-earth-200 mt-2 pt-4 space-y-2">
                <a
                  href="?app"
                  className="block text-center py-2.5 bg-primary-600 text-white font-semibold rounded-lg"
                >
                  Web App
                </a>
                <a href="?app" className="block text-left font-semibold py-2 text-earth-700">
                  Sign In
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-earth-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <Logo size="sm" white />
            <p className="text-earth-300 mt-4 text-sm">
              Smart agriculture IoT systems for modern farms.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-earth-300">
              <li><button onClick={() => setCurrentPage('products')} className="hover:text-white">All Products</button></li>
              <li><button onClick={() => setCurrentPage('products')} className="hover:text-white">Irrigation</button></li>
              <li><button onClick={() => setCurrentPage('products')} className="hover:text-white">Livestock</button></li>
              <li><button onClick={() => setCurrentPage('products')} className="hover:text-white">Equipment</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-earth-300">
              <li><button onClick={() => setCurrentPage('resources')} className="hover:text-white">Documentation</button></li>
              <li><button onClick={() => setCurrentPage('resources')} className="hover:text-white">Video Tutorials</button></li>
              <li><button onClick={() => setCurrentPage('resources')} className="hover:text-white">Community Forum</button></li>
              <li><a href="mailto:support@gatemesh.com" className="hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-earth-300">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">About Us</button></li>
              <li><a href="mailto:sales@gatemesh.com" className="hover:text-white">Contact Sales</a></li>
              <li><a href="mailto:careers@gatemesh.com" className="hover:text-white">Careers</a></li>
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">Privacy Policy</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-earth-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-earth-400">
              © 2025 GateMesh. All rights reserved.
            </div>
            <div className="flex gap-4 text-sm text-earth-400">
              <button className="hover:text-white flex items-center gap-2">
                <Mail size={16} /> support@gatemesh.com
              </button>
              <button className="hover:text-white flex items-center gap-2">
                <Phone size={16} /> 1-800-GATEMESH
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  // Render Current Page
  const renderPage = () => {
    switch(currentPage) {
      case 'products': return <ProductsPage />;
      case 'solutions': return <SolutionsPage />;
      case 'pricing': return <PricingPage />;
      case 'how-it-works': return <HowItWorksPage />;
      case 'resources': return <ResourcesPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {renderPage()}
      <Footer />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .text-earth-50 { color: #FAF8F3; }
        .text-earth-100 { color: #F5E6D3; }
        .text-earth-200 { color: #E8D4B8; }
        .text-earth-300 { color: #D4B896; }
        .text-earth-400 { color: #C19A6B; }
        .text-earth-500 { color: #A67C52; }
        .text-earth-600 { color: #8B7355; }
        .text-earth-700 { color: #6B5842; }
        .text-earth-800 { color: #4A3E2F; }
        .text-earth-900 { color: #2C2416; }
        
        .text-soil-50 { color: #FAF7F2; }
        .text-soil-100 { color: #F0E6D2; }
        .text-soil-200 { color: #E0D1B0; }
        .text-soil-500 { color: #C19A6B; }
        
        .text-primary-50 { color: #F0F5E9; }
        .text-primary-100 { color: #E1EBD3; }
        .text-primary-400 { color: #8FBC8F; }
        .text-primary-500 { color: #7BA428; }
        .text-primary-600 { color: #6B8E23; }
        .text-primary-700 { color: #556B2F; }
        .text-primary-800 { color: #3F5221; }
        .text-primary-900 { color: #2A3816; }
        
        .text-harvest-500 { color: #DAA520; }
        
        .bg-earth-50 { background-color: #FAF8F3; }
        .bg-earth-100 { background-color: #F5E6D3; }
        .bg-earth-200 { background-color: #E8D4B8; }
        .bg-earth-300 { background-color: #D4B896; }
        .bg-earth-400 { background-color: #C19A6B; }
        .bg-earth-500 { background-color: #A67C52; }
        .bg-earth-600 { background-color: #8B7355; }
        .bg-earth-700 { background-color: #6B5842; }
        .bg-earth-800 { background-color: #4A3E2F; }
        .bg-earth-900 { background-color: #2C2416; }
        
        .bg-soil-50 { background-color: #FAF7F2; }
        
        .bg-primary-50 { background-color: #F0F5E9; }
        .bg-primary-100 { background-color: #E1EBD3; }
        .bg-primary-200 { background-color: #C3D7A7; }
        .bg-primary-300 { background-color: #A5C37B; }
        .bg-primary-400 { background-color: #8FBC8F; }
        .bg-primary-500 { background-color: #7BA428; }
        .bg-primary-600 { background-color: #6B8E23; }
        .bg-primary-700 { background-color: #556B2F; }
        .bg-primary-800 { background-color: #3F5221; }
        .bg-primary-900 { background-color: #2A3816; }
        
        .bg-harvest-500 { background-color: #DAA520; }
        
        .border-earth-200 { border-color: #E8D4B8; }
        .border-earth-300 { border-color: #D4B896; }
        .border-earth-400 { border-color: #C19A6B; }
        .border-earth-700 { border-color: #6B5842; }
        
        .border-primary-200 { border-color: #C3D7A7; }
        .border-primary-300 { border-color: #A5C37B; }
        .border-primary-400 { border-color: #8FBC8F; }
        .border-primary-500 { border-color: #7BA428; }
        
        .fill-harvest-500 { fill: #DAA520; }
        
        .hover\:bg-earth-50:hover { background-color: #FAF8F3; }
        .hover\:bg-earth-200:hover { background-color: #E8D4B8; }
        .hover\:bg-earth-800:hover { background-color: #4A3E2F; }
        
        .hover\:bg-primary-50:hover { background-color: #E1EBD3; }
        .hover\:bg-primary-700:hover { background-color: #556B2F; }
        .hover\:bg-primary-900:hover { background-color: #2A3816; }
        
        .hover\:border-earth-400:hover { border-color: #C19A6B; }
        .hover\:border-primary-400:hover { border-color: #8FBC8F; }
        
        .hover\:text-primary-600:hover { color: #6B8E23; }
        .hover\:text-white:hover { color: white; }
      `}</style>
    </div>
  );
};

export default GateMeshWebsite;