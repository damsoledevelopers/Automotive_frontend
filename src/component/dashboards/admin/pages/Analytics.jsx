import React, { useState, useMemo } from 'react';
import { 
  FaChartLine, 
  FaChartBar, 
  FaChartPie, 
  FaUsers, 
  FaShoppingCart, 
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaTools,
  FaExclamationTriangle,
  FaBrain,
  FaLocationArrow,
  FaFilter,
  FaDownload
} from 'react-icons/fa';

const Analytics = ({ timeSeriesData, stats, jobs }) => {
  const [selectedView, setSelectedView] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');

  // Real-time Dashboard Data
  const realTimeData = useMemo(() => ({
    activeJobs: jobs?.filter(j => j.status !== 'completed' && j.status !== 'cancelled').length || 0,
    onlineMechanics: Math.floor(Math.random() * 50) + 20,
    busiestLocations: [
      { location: 'Mumbai', jobs: 45, revenue: '₹2.5M', mechanics: 12 },
      { location: 'Delhi', jobs: 38, revenue: '₹2.1M', mechanics: 10 },
      { location: 'Bangalore', jobs: 32, revenue: '₹1.8M', mechanics: 8 },
      { location: 'Pune', jobs: 28, revenue: '₹1.5M', mechanics: 7 },
    ],
  }), [jobs]);

  // Revenue & Commission Visualization Data
  const revenueData = useMemo(() => ({
    byCategory: [
      { category: 'Oil Change', revenue: 450000, commission: 67500 },
      { category: 'Brake Service', revenue: 320000, commission: 48000 },
      { category: 'AC Repair', revenue: 280000, commission: 42000 },
      { category: 'Tire Service', revenue: 210000, commission: 31500 },
      { category: 'Battery', revenue: 180000, commission: 27000 },
    ],
    byLocation: [
      { location: 'Mumbai', revenue: 2500000, commission: 375000 },
      { location: 'Delhi', revenue: 2100000, commission: 315000 },
      { location: 'Bangalore', revenue: 1800000, commission: 270000 },
      { location: 'Pune', revenue: 1500000, commission: 225000 },
    ],
    byMechanic: [
      { mechanic: 'Rajesh Kumar', revenue: 450000, commission: 67500, rating: 4.9 },
      { mechanic: 'Amit Sharma', revenue: 380000, commission: 57000, rating: 4.8 },
      { mechanic: 'Vikram Singh', revenue: 320000, commission: 48000, rating: 4.7 },
    ],
  }), []);

  // Predictive Demand Analytics
  const predictiveData = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const season = currentMonth >= 2 && currentMonth <= 5 ? 'Summer' : 
                   currentMonth >= 6 && currentMonth <= 9 ? 'Monsoon' : 'Winter';
    
    return {
      season,
      predictedDemand: {
        'AC Repair': season === 'Summer' ? 'High (+35%)' : season === 'Monsoon' ? 'Medium (+15%)' : 'Low (-10%)',
        'Battery': season === 'Winter' ? 'High (+25%)' : 'Medium (+10%)',
        'Tire Service': season === 'Monsoon' ? 'High (+30%)' : 'Medium (+12%)',
        'Oil Change': 'Consistent (+5%)',
      },
      locationTrends: [
        { location: 'Mumbai', trend: 'Increasing', growth: '+18%', predictedJobs: 520 },
        { location: 'Delhi', trend: 'Stable', growth: '+8%', predictedJobs: 410 },
        { location: 'Bangalore', trend: 'Increasing', growth: '+22%', predictedJobs: 390 },
      ],
    };
  }, []);

  // Mechanic Quality Control
  const qualityControlData = useMemo(() => {
    return [
      { 
        id: 1, 
        name: 'Mechanic A', 
        rating: 3.2, 
        cancellations: 8, 
        complaints: 5, 
        status: 'Flagged',
        issues: ['Low rating', 'High cancellation rate', 'Multiple complaints']
      },
      { 
        id: 2, 
        name: 'Mechanic B', 
        rating: 4.1, 
        cancellations: 3, 
        complaints: 2, 
        status: 'Warning',
        issues: ['Below average rating']
      },
      { 
        id: 3, 
        name: 'Mechanic C', 
        rating: 2.8, 
        cancellations: 12, 
        complaints: 8, 
        status: 'Critical',
        issues: ['Very low rating', 'Excessive cancellations', 'High complaint rate']
      },
    ];
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Analytics & Intelligence</h2>
          <p className="text-xs text-gray-600 mt-1">Real-time insights and predictive analytics</p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="btn-outline flex items-center gap-2 text-sm">
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100">
        <div className="flex space-x-4 px-6 border-b border-gray-200">
          <button
            onClick={() => setSelectedView('overview')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
              selectedView === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Real-time Dashboard
          </button>
          <button
            onClick={() => setSelectedView('revenue')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
              selectedView === 'revenue' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Revenue & Commission
          </button>
          <button
            onClick={() => setSelectedView('predictive')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
              selectedView === 'predictive' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Predictive Analytics
          </button>
          <button
            onClick={() => setSelectedView('quality')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
              selectedView === 'quality' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Quality Control
          </button>
        </div>

        <div className="p-6">
          {/* Real-time Dashboard */}
          {selectedView === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-100 rounded-lg p-6 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-700 mb-1">Active Jobs</p>
                      <p className="text-2xl font-bold text-blue-900">{realTimeData.activeJobs}</p>
                    </div>
                    <FaTools className="text-4xl text-blue-600 opacity-50" />
                  </div>
                </div>
                <div className="bg-green-100 rounded-lg p-6 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700 mb-1">Online Mechanics</p>
                      <p className="text-2xl font-bold text-green-900">{realTimeData.onlineMechanics}</p>
                    </div>
                    <FaUsers className="text-4xl text-green-600 opacity-50" />
                  </div>
                </div>
                <div className="bg-purple-100 rounded-lg p-6 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-700 mb-1">Total Locations</p>
                      <p className="text-2xl font-bold text-purple-900">{realTimeData.busiestLocations.length}</p>
                    </div>
                    <FaMapMarkerAlt className="text-4xl text-purple-600 opacity-50" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Busiest Locations</h3>
                <div className="space-y-4">
                  {realTimeData.busiestLocations.map((loc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{loc.location}</p>
                          <p className="text-sm text-gray-600">{loc.mechanics} mechanics • {loc.jobs} jobs</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{loc.revenue}</p>
                        <p className="text-xs text-gray-500">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Revenue & Commission Visualization */}
          {selectedView === 'revenue' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setSelectedView('revenue')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  By Category
                </button>
                <button
                  onClick={() => setSelectedView('revenue')}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  By Location
                </button>
                <button
                  onClick={() => setSelectedView('revenue')}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  By Mechanic
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Revenue by Category</h3>
                  <div className="space-y-4">
                    {revenueData.byCategory.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{item.category}</span>
                          <span className="text-sm font-semibold text-gray-900">₹{(item.revenue / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(item.revenue / 450000) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Commission: ₹{(item.commission / 1000).toFixed(0)}K</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Revenue by Location</h3>
                  <div className="space-y-4">
                    {revenueData.byLocation.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{item.location}</span>
                          <span className="text-sm font-semibold text-gray-900">₹{(item.revenue / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(item.revenue / 2500000) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Commission: ₹{(item.commission / 1000).toFixed(0)}K</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Top Performing Mechanics</h3>
                <div className="space-y-3">
                  {revenueData.byMechanic.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{item.mechanic}</p>
                          <p className="text-sm text-gray-600">Rating: {item.rating} ⭐</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">₹{(item.revenue / 1000).toFixed(0)}K</p>
                        <p className="text-xs text-gray-500">Commission: ₹{(item.commission / 1000).toFixed(0)}K</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Predictive Demand Analytics */}
          {selectedView === 'predictive' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <FaBrain className="text-3xl text-purple-600" />
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">AI-Powered Demand Prediction</h3>
                    <p className="text-sm text-gray-600">Current Season: <span className="font-semibold">{predictiveData.season}</span></p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(predictiveData.predictedDemand).map(([service, demand]) => (
                    <div key={service} className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="font-semibold text-gray-900 mb-1">{service}</p>
                      <p className={`text-sm font-semibold ${
                        demand.includes('High') ? 'text-green-600' :
                        demand.includes('Medium') ? 'text-yellow-600' : 'text-gray-600'
                      }`}>
                        {demand}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Location-Based Trends</h3>
                <div className="space-y-4">
                  {predictiveData.locationTrends.map((trend, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{trend.location}</p>
                        <p className="text-sm text-gray-600">Predicted Jobs: {trend.predictedJobs}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          trend.trend === 'Increasing' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {trend.growth}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mechanic Quality Control */}
          {selectedView === 'quality' && (
            <div className="space-y-6">
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <div className="flex items-center gap-2">
                  <FaExclamationTriangle className="text-red-600" />
                  <p className="text-sm text-red-800">
                    <span className="font-semibold">{qualityControlData.filter(m => m.status === 'Critical').length} Critical</span> • 
                    <span className="font-semibold"> {qualityControlData.filter(m => m.status === 'Flagged').length} Flagged</span> • 
                    <span className="font-semibold"> {qualityControlData.filter(m => m.status === 'Warning').length} Warnings</span>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {qualityControlData.map((mechanic) => (
                  <div key={mechanic.id} className={`bg-white rounded-lg shadow-md p-6 border ${
                    mechanic.status === 'Critical' ? 'border-red-300 bg-red-50' :
                    mechanic.status === 'Flagged' ? 'border-orange-300 bg-orange-50' :
                    'border-yellow-300 bg-yellow-50'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{mechanic.name}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-600">Rating: <span className="font-semibold">{mechanic.rating} ⭐</span></span>
                          <span className="text-sm text-gray-600">Cancellations: <span className="font-semibold">{mechanic.cancellations}</span></span>
                          <span className="text-sm text-gray-600">Complaints: <span className="font-semibold">{mechanic.complaints}</span></span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        mechanic.status === 'Critical' ? 'bg-red-100 text-red-800' :
                        mechanic.status === 'Flagged' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {mechanic.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Issues Detected:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {mechanic.issues.map((issue, idx) => (
                          <li key={idx} className="text-sm text-gray-600">{issue}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                        Review
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                        Suspend
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
