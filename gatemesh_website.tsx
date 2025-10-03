import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
  const SolutionsPage = () => (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-earth-900 mb-4">Solutions by Farm Type</h1>
          <p className="text-xl text-earth-600">Tailored IoT systems for every agricultural operation</p>
        </div>

        {/* ROI & Savings Data Section */}
        <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-black text-earth-900 mb-6 text-center">Proven Results & Savings</h2>
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-black text-primary-700 mb-2">40%</div>
              <div className="text-sm font-semibold text-earth-700">Average Water Savings</div>
              <div className="text-xs text-earth-600 mt-1">Through precision monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-primary-700 mb-2">2 Years</div>
              <div className="text-sm font-semibold text-earth-700">Battery Life</div>
              <div className="text-xs text-earth-600 mt-1">Ultra-low power design</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-primary-700 mb-2">500m</div>
              <div className="text-sm font-semibold text-earth-700">Mesh Range</div>
              <div className="text-xs text-earth-600 mt-1">Per hop, unlimited hops</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-primary-700 mb-2">$12K</div>
              <div className="text-sm font-semibold text-earth-700">Avg. Annual Savings</div>
              <div className="text-xs text-earth-600 mt-1">Water + labor reduction</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-bold text-earth-900 mb-4">How We Calculate Savings:</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="font-semibold text-earth-900 mb-2">💧 Water Savings</div>
                <ul className="space-y-1 text-earth-700">
                  <li>• Real-time soil moisture prevents over-irrigation</li>
                  <li>• Leak detection alerts save 15-20% annually</li>
                  <li>• Weather integration optimizes schedules</li>
                  <li>• Typical 500-acre farm saves 50M gallons/year</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-earth-900 mb-2">⚡ Power Efficiency</div>
                <ul className="space-y-1 text-earth-700">
                  <li>• Sensor nodes: 2-year battery life (2x AA)</li>
                  <li>• Sleep mode: 10μA standby current</li>
                  <li>• Mesh reduces power vs. cellular (no modem)</li>
                  <li>• Solar routers: 5W panel powers indefinitely</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-earth-900 mb-2">⏱️ Labor Savings</div>
                <ul className="space-y-1 text-earth-700">
                  <li>• Eliminate manual field checks (4-6 hrs/week)</li>
                  <li>• Remote headgate control saves trips</li>
                  <li>• Automated alerts prevent overnight issues</li>
                  <li>• Average $8K/year in labor reduction</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-earth-900 mb-2">📊 Data-Driven ROI</div>
                <ul className="space-y-1 text-earth-700">
                  <li>• Track water usage per zone/crop type</li>
                  <li>• Historical data improves season planning</li>
                  <li>• Prevent crop stress = higher yields</li>
                  <li>• Typical ROI: 6-18 months payback</li>
                </ul>
              </div>
            </div>
          </div>
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
            <button className="text-primary-600 font-semibold flex items-center gap-1">
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
            <button className="text-primary-600 font-semibold flex items-center gap-1">
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
            <button className="text-primary-600 font-semibold flex items-center gap-1">
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
            <button className="text-primary-600 font-semibold flex items-center gap-1">
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
          <button className="px-8 py-3 bg-white text-primary-700 font-bold rounded-lg hover:bg-primary-50 transition">
            Launch ROI Calculator
          </button>
        </div>
      </div>
    </div>
  );

  // Team Portal Page - NEW
  const TeamPortalPage = () => {
    const [userRole, setUserRole] = useState('sales'); // sales, install, owner

    return (
      <div className="py-20 bg-earth-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-5xl font-black text-earth-900 mb-4">Team Portal</h1>
            <p className="text-xl text-earth-600">Internal tools and dashboards</p>
          </div>

          {/* Role Selector */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setUserRole('sales')}
              className={`px-6 py-3 font-bold rounded-lg transition ${
                userRole === 'sales'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-earth-700 border-2 border-earth-200'
              }`}
            >
              Sales Team View
            </button>
            <button
              onClick={() => setUserRole('install')}
              className={`px-6 py-3 font-bold rounded-lg transition ${
                userRole === 'install'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-earth-700 border-2 border-earth-200'
              }`}
            >
              Installation Team View
            </button>
            <button
              onClick={() => setUserRole('owner')}
              className={`px-6 py-3 font-bold rounded-lg transition ${
                userRole === 'owner'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-earth-700 border-2 border-earth-200'
              }`}
            >
              Owner Dashboard
            </button>
          </div>

          {/* Sales Team View */}
          {userRole === 'sales' && (
            <div className="space-y-6">
              {/* Sales Dashboard */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                  <div className="text-sm font-semibold text-earth-600 mb-2">Active Leads</div>
                  <div className="text-3xl font-black text-earth-900">47</div>
                  <div className="text-xs text-green-600 mt-2">↑ 12% this week</div>
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                  <div className="text-sm font-semibold text-earth-600 mb-2">Quotes Pending</div>
                  <div className="text-3xl font-black text-earth-900">23</div>
                  <div className="text-xs text-earth-600 mt-2">$187K total value</div>
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                  <div className="text-sm font-semibold text-earth-600 mb-2">Orders This Month</div>
                  <div className="text-3xl font-black text-earth-900">61</div>
                  <div className="text-xs text-green-600 mt-2">↑ 23% vs last month</div>
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                  <div className="text-sm font-semibold text-earth-600 mb-2">Revenue MTD</div>
                  <div className="text-3xl font-black text-earth-900">$294K</div>
                  <div className="text-xs text-earth-600 mt-2">Goal: $350K</div>
                </div>
              </div>

              {/* Active Opportunities */}
              <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                <h3 className="text-xl font-bold text-earth-900 mb-4">Active Opportunities</h3>
                <div className="space-y-3">
                  {[
                    { farm: 'Johnson Dairy Farm', contact: 'Sarah Johnson', value: '$24,500', stage: 'Quote Sent', nodes: 35, priority: 'High' },
                    { farm: 'Verde Valley Orchards', contact: 'Mike Rodriguez', value: '$18,200', stage: 'Demo Scheduled', nodes: 28, priority: 'Medium' },
                    { farm: 'Anderson Ranch', contact: 'Tom Anderson', value: '$42,800', stage: 'Negotiation', nodes: 67, priority: 'High' },
                    { farm: 'Riverside Crops Co.', contact: 'Lisa Chen', value: '$31,500', stage: 'Needs Analysis', nodes: 45, priority: 'Medium' }
                  ].map((opp, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-earth-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-bold text-earth-900">{opp.farm}</div>
                        <div className="text-sm text-earth-600">{opp.contact} • {opp.nodes} nodes</div>
                      </div>
                      <div className="text-right mr-4">
                        <div className="font-bold text-earth-900">{opp.value}</div>
                        <div className="text-xs text-earth-600">{opp.stage}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        opp.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {opp.priority}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-3 gap-6">
                <button className="bg-primary-600 text-white p-6 rounded-xl font-bold hover:bg-primary-700 transition text-left">
                  <div className="text-2xl mb-2">📝</div>
                  <div className="text-lg">Create Custom Quote</div>
                  <div className="text-sm text-primary-100 mt-1">For 50+ node deployments</div>
                </button>
                <button className="bg-earth-700 text-white p-6 rounded-xl font-bold hover:bg-earth-800 transition text-left">
                  <div className="text-2xl mb-2">📞</div>
                  <div className="text-lg">Schedule Demo</div>
                  <div className="text-sm text-earth-300 mt-1">Book customer demo session</div>
                </button>
                <button className="bg-white border-2 border-earth-200 p-6 rounded-xl font-bold hover:border-primary-400 transition text-left">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-lg text-earth-900">ROI Calculator</div>
                  <div className="text-sm text-earth-600 mt-1">Show savings to prospects</div>
                </button>
              </div>
            </div>
          )}

          {/* Installation Team View */}
          {userRole === 'install' && (
            <div className="space-y-6">
              {/* Install Dashboard */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                  <div className="text-sm font-semibold text-earth-600 mb-2">Pending Installs</div>
                  <div className="text-3xl font-black text-earth-900">12</div>
                  <div className="text-xs text-earth-600 mt-2">Next 2 weeks</div>
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                  <div className="text-sm font-semibold text-earth-600 mb-2">Active Projects</div>
                  <div className="text-3xl font-black text-earth-900">5</div>
                  <div className="text-xs text-green-600 mt-2">On schedule</div>
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                  <div className="text-sm font-semibold text-earth-600 mb-2">Nodes Deployed MTD</div>
                  <div className="text-3xl font-black text-earth-900">287</div>
                  <div className="text-xs text-green-600 mt-2">↑ 15% vs last month</div>
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                  <div className="text-sm font-semibold text-earth-600 mb-2">Avg Install Time</div>
                  <div className="text-3xl font-black text-earth-900">2.3hrs</div>
                  <div className="text-xs text-earth-600 mt-2">Per 5 nodes</div>
                </div>
              </div>

              {/* Upcoming Installations */}
              <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                <h3 className="text-xl font-bold text-earth-900 mb-4">Upcoming Installations</h3>
                <div className="space-y-3">
                  {[
                    { date: 'Oct 5, 2025', farm: 'Johnson Dairy Farm', location: 'Cedar Rapids, IA', nodes: 35, type: 'Full Install', duration: '1 day', team: 'Team A' },
                    { date: 'Oct 7, 2025', farm: 'Verde Valley Orchards', location: 'Napa, CA', nodes: 28, type: 'Full Install', duration: '1 day', team: 'Team B' },
                    { date: 'Oct 10, 2025', farm: 'Riverside Crops', location: 'Fresno, CA', nodes: 45, type: 'Full Install + Training', duration: '2 days', team: 'Team A' },
                    { date: 'Oct 12, 2025', farm: 'Prairie View Farm', location: 'Lincoln, NE', nodes: 12, type: 'Support Visit', duration: '4 hrs', team: 'Team C' }
                  ].map((install, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-earth-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-bold text-earth-900">{install.farm}</div>
                        <div className="text-sm text-earth-600">{install.location} • {install.nodes} nodes • {install.type}</div>
                      </div>
                      <div className="text-right mr-4">
                        <div className="font-bold text-earth-900">{install.date}</div>
                        <div className="text-xs text-earth-600">{install.duration} • {install.team}</div>
                      </div>
                      <button className="px-4 py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition text-sm">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Installation Resources */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                  <div className="text-2xl mb-3">🔧</div>
                  <h4 className="font-bold text-earth-900 mb-2">Installation Checklists</h4>
                  <p className="text-sm text-earth-600 mb-4">Step-by-step guides for each node type</p>
                  <button className="text-primary-600 font-semibold text-sm flex items-center gap-1">
                    View Checklists <ChevronRight size={16} />
                  </button>
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                  <div className="text-2xl mb-3">📦</div>
                  <h4 className="font-bold text-earth-900 mb-2">Inventory Status</h4>
                  <p className="text-sm text-earth-600 mb-4">Check stock before heading to site</p>
                  <button className="text-primary-600 font-semibold text-sm flex items-center gap-1">
                    Check Inventory <ChevronRight size={16} />
                  </button>
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                  <div className="text-2xl mb-3">📱</div>
                  <h4 className="font-bold text-earth-900 mb-2">Config App Access</h4>
                  <p className="text-sm text-earth-600 mb-4">Launch wizard to program nodes</p>
                  <button className="text-primary-600 font-semibold text-sm flex items-center gap-1">
                    Open Config App <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Owner Dashboard */}
          {userRole === 'owner' && (
            <div className="space-y-6">
              {/* Executive Summary */}
              <div className="bg-gradient-to-r from-earth-700 to-earth-800 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-black mb-6">Executive Dashboard</h2>
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-earth-300 text-sm mb-1">Total Revenue (Oct)</div>
                    <div className="text-4xl font-black">$294K</div>
                    <div className="text-earth-300 text-sm mt-1">↑ 23% vs Sept</div>
                  </div>
                  <div>
                    <div className="text-earth-300 text-sm mb-1">Active Customers</div>
                    <div className="text-4xl font-black">218</div>
                    <div className="text-earth-300 text-sm mt-1">+14 this month</div>
                  </div>
                  <div>
                    <div className="text-earth-300 text-sm mb-1">Nodes Deployed</div>
                    <div className="text-4xl font-black">3,427</div>
                    <div className="text-earth-300 text-sm mt-1">Across 45 states</div>
                  </div>
                  <div>
                    <div className="text-earth-300 text-sm mb-1">Support Subscriptions</div>
                    <div className="text-4xl font-black">$42K</div>
                    <div className="text-earth-300 text-sm mt-1">MRR from tiers</div>
                  </div>
                </div>
              </div>

              {/* Business Metrics */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Sales Pipeline */}
                <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                  <h3 className="text-xl font-bold text-earth-900 mb-4">Sales Pipeline</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-earth-600">New Leads (47)</span>
                        <span className="font-bold text-earth-900">$312K</span>
                      </div>
                      <div className="w-full bg-earth-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '30%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-earth-600">Negotiation (15)</span>
                        <span className="font-bold text-earth-900">$156K</span>
                      </div>
                      <div className="w-full bg-earth-100 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{width: '70%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-earth-600">Closed Won (61)</span>
                        <span className="font-bold text-earth-900">$294K</span>
                      </div>
                      <div className="w-full bg-earth-100 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-earth-200">
                    <div className="flex justify-between">
                      <span className="font-bold text-earth-900">Total Pipeline</span>
                      <span className="font-black text-primary-700 text-xl">$949K</span>
                    </div>
                  </div>
                </div>

                {/* Customer Metrics */}
                <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                  <h3 className="text-xl font-bold text-earth-900 mb-4">Customer Health</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-earth-900">Active Deployments</div>
                        <div className="text-sm text-earth-600">Nodes online & transmitting</div>
                      </div>
                      <div className="text-2xl font-black text-green-600">98.7%</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-earth-900">Avg. Support Response</div>
                        <div className="text-sm text-earth-600">Ticket resolution time</div>
                      </div>
                      <div className="text-2xl font-black text-primary-700">4.2hrs</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-earth-900">Customer Satisfaction</div>
                        <div className="text-sm text-earth-600">NPS Score</div>
                      </div>
                      <div className="text-2xl font-black text-primary-700">72</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-earth-900">Renewal Rate</div>
                        <div className="text-sm text-earth-600">Support subscriptions</div>
                      </div>
                      <div className="text-2xl font-black text-green-600">94%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Customers */}
              <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                <h3 className="text-xl font-bold text-earth-900 mb-4">Top Customers by Deployment Size</h3>
                <div className="space-y-2">
                  {[
                    { farm: 'Green Valley Ag Corp', nodes: 287, revenue: '$89,400', tier: 'Enterprise', state: 'CA' },
                    { farm: 'Midwest Dairy Collective', nodes: 213, revenue: '$67,200', tier: 'Enterprise', state: 'IA' },
                    { farm: 'Sunshine Orchards LLC', nodes: 156, revenue: '$48,900', tier: 'Professional', state: 'FL' },
                    { farm: 'Rocky Mountain Ranch', nodes: 142, revenue: '$44,700', tier: 'Professional', state: 'CO' },
                    { farm: 'Prairie Grain Systems', nodes: 128, revenue: '$40,300', tier: 'Enterprise', state: 'NE' }
                  ].map((customer, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-earth-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-bold text-earth-900">{customer.farm}</div>
                        <div className="text-xs text-earth-600">{customer.state} • {customer.tier} Plan</div>
                      </div>
                      <div className="text-right mr-4">
                        <div className="font-bold text-earth-900">{customer.nodes} nodes</div>
                        <div className="text-xs text-earth-600">{customer.revenue}</div>
                      </div>
                      <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                        {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Performance */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                  <h4 className="font-bold text-earth-900 mb-4">Network Reliability</h4>
                  <div className="text-center">
                    <div className="text-5xl font-black text-green-600 mb-2">99.4%</div>
                    <div className="text-sm text-earth-600">Uptime last 30 days</div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-earth-600">Avg. mesh hops</span>
                      <span className="font-semibold text-earth-900">2.3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-earth-600">Packet loss</span>
                      <span className="font-semibold text-earth-900">0.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-earth-600">Avg. latency</span>
                      <span className="font-semibold text-earth-900">142ms</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                  <h4 className="font-bold text-earth-900 mb-4">Power Efficiency</h4>
                  <div className="text-center">
                    <div className="text-5xl font-black text-primary-700 mb-2">22mo</div>
                    <div className="text-sm text-earth-600">Avg. battery life (actual)</div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-earth-600">Sleep mode current</span>
                      <span className="font-semibold text-earth-900">12μA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-earth-600">Active current</span>
                      <span className="font-semibold text-earth-900">45mA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-earth-600">Solar nodes</span>
                      <span className="font-semibold text-earth-900">847</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-earth-200">
                  <h4 className="font-bold text-earth-900 mb-4">Customer Impact</h4>
                  <div className="text-center">
                    <div className="text-5xl font-black text-blue-600 mb-2">38%</div>
                    <div className="text-sm text-earth-600">Avg. water savings</div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-earth-600">Total water saved</span>
                      <span className="font-semibold text-earth-900">2.1B gal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-earth-600">Labor hours saved</span>
                      <span className="font-semibold text-earth-900">47K hrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-earth-600">Avg. ROI period</span>
                      <span className="font-semibold text-earth-900">11 months</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-4 gap-4">
                <button className="bg-primary-600 text-white p-4 rounded-xl font-bold hover:bg-primary-700 transition text-sm">
                  📊 Full Analytics
                </button>
                <button className="bg-earth-700 text-white p-4 rounded-xl font-bold hover:bg-earth-800 transition text-sm">
                  💰 Financial Reports
                </button>
                <button className="bg-white border-2 border-earth-200 p-4 rounded-xl font-bold hover:border-primary-400 transition text-sm text-earth-900">
                  👥 Team Management
                </button>
                <button className="bg-white border-2 border-earth-200 p-4 rounded-xl font-bold hover:border-primary-400 transition text-sm text-earth-900">
                  ⚙️ System Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };import React, { useState } from 'react';
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
    { id: 'resources', label: 'Resources' },
    { id: 'team-portal', label: 'Team Portal', protected: true }
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
            <button className="px-8 py-4 bg-primary-800 text-white font-bold rounded-lg hover:bg-primary-900 transition">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const ProductsPage = () => (
    <div className="py-20 bg-earth-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-earth-900 mb-4">Product Catalog</h1>
          <p className="text-xl text-earth-600">Browse our complete range of 40+ agricultural IoT nodes</p>
        </div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="bg-white rounded-xl p-6 border-2 border-earth-200 hover:border-primary-400 hover:shadow-lg transition cursor-pointer">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-earth-900 mb-2">{category.name}</h3>
                <p className="text-earth-600 text-sm mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary-600">{category.nodeCount} node types</span>
                  <ChevronRight size={20} className="text-earth-400" />
                </div>
              </div>
            );
          })}
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
              <button className="w-full py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition">
                Build Your Bundle
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
              <button className="w-full py-3 bg-earth-700 text-white font-bold rounded-lg hover:bg-earth-800 transition">
                Build Your Bundle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
              <button 
                className={`w-full py-3 font-bold rounded-lg transition ${
                  tier.popular 
                    ? 'bg-primary-600 text-white hover:bg-primary-700' 
                    : 'bg-earth-100 text-earth-800 hover:bg-earth-200'
                }`}
              >
                {tier.cta}
              </button>
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
          <button className="px-8 py-3 bg-white text-earth-800 font-bold rounded-lg hover:bg-earth-50 transition">
            Contact Sales Team
          </button>
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
          <button className="px-8 py-3 bg-white text-primary-700 font-bold rounded-lg hover:bg-primary-50 transition">
            Launch Demo Mode
          </button>
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
            <button className="text-primary-600 font-semibold flex items-center gap-1">
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
            <button className="text-primary-600 font-semibold flex items-center gap-1">
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
            <button className="text-primary-600 font-semibold flex items-center gap-1">
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
            <button className="text-primary-600 font-semibold flex items-center gap-1">
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
          <button className="px-8 py-3 bg-white text-primary-700 font-bold rounded-lg hover:bg-primary-50 transition">
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
            <button className="hidden md:block px-4 py-2 text-earth-700 font-semibold hover:text-primary-600 transition">
              Sign In
            </button>
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
              <button className="text-left font-semibold py-2 text-earth-700 border-t-2 border-earth-200 mt-2 pt-4">
                Sign In
              </button>
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
              <li><button className="hover:text-white">Irrigation</button></li>
              <li><button className="hover:text-white">Livestock</button></li>
              <li><button className="hover:text-white">Equipment</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-earth-300">
              <li><button onClick={() => setCurrentPage('resources')} className="hover:text-white">Documentation</button></li>
              <li><button className="hover:text-white">Video Tutorials</button></li>
              <li><button className="hover:text-white">Community Forum</button></li>
              <li><button className="hover:text-white">Support</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-earth-300">
              <li><button className="hover:text-white">About Us</button></li>
              <li><button className="hover:text-white">Contact Sales</button></li>
              <li><button className="hover:text-white">Careers</button></li>
              <li><button className="hover:text-white">Privacy Policy</button></li>
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