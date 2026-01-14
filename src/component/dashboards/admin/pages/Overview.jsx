import React, { useMemo } from 'react';
import { useJob } from '../../../../contexts/JobContext';
import {
  FaChartLine,
  FaChartBar,
  FaDownload,
  FaShoppingCart,
  FaUsers,
  FaBox,
  FaArrowUp,
  FaArrowDown,
  FaStar,
  FaEye,
  FaHeart,
  FaShare
} from 'react-icons/fa';

const Overview = ({ timeSeriesData, dateRange, stats, topVendors, recentActivities }) => {
  // Best-selling products data
  const bestSellingProducts = useMemo(() => [
    { id: 1, name: 'Brake Pad Set - Front', category: 'Brake System', sales: 1245, revenue: 4357500, growth: 12.5 },
    { id: 2, name: 'Engine Oil - 5W-30', category: 'Lubricants', sales: 2100, revenue: 3150000, growth: 8.3 },
    { id: 3, name: 'Air Filter', category: 'Filters', sales: 1890, revenue: 850500, growth: 15.2 },
    { id: 4, name: 'Spark Plugs Set', category: 'Ignition', sales: 1567, revenue: 1253600, growth: -3.1 },
    { id: 5, name: 'Battery - 12V', category: 'Electrical', sales: 980, revenue: 2940000, growth: 22.4 },
  ], []);

  // Customer engagement metrics
  const engagementMetrics = useMemo(() => ({
    avgSessionDuration: '4m 32s',
    bounceRate: '32.5%',
    pageViews: 125000,
    returningCustomers: 68.5,
    customerSatisfaction: 4.6,
    socialShares: 3450,
    productViews: 89000,
    addToCartRate: 12.8,
    conversionRate: 3.2
  }), []);

  // Revenue Chart component
  const RevenueChart = () => {
    if (!timeSeriesData || timeSeriesData.length === 0) return null;
    const maxRevenue = Math.max(...timeSeriesData.map(d => d.revenue));
    return (
      <div className="space-y-2">
        <div className="flex items-end justify-between h-32 gap-1">
          {timeSeriesData.slice(-7).map((data, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all hover:opacity-80"
                style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                title={`₹${data.revenue.toLocaleString()}`}
              />
              <span className="text-xs text-gray-500 mt-1">
                {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Orders Chart component
  const OrdersChart = () => {
    const maxOrders = Math.max(...timeSeriesData.map(d => d.orders));
    return (
      <div className="space-y-2">
        <div className="flex items-end justify-between h-32 gap-1">
          {timeSeriesData.slice(-7).map((data, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t transition-all hover:opacity-80"
                style={{ height: `${(data.orders / maxOrders) * 100}%` }}
                title={`${data.orders} orders`}
              />
              <span className="text-xs text-gray-500 mt-1">
                {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900">System Overview</h3>
        <button className="btn-outline flex items-center gap-2 text-sm">
          <FaDownload /> Export Report
        </button>
      </div>

      {/* Revenue Chart */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Revenue Trend</h4>
            <p className="text-xl font-bold text-blue-900">
              ₹{(timeSeriesData?.reduce((sum, d) => sum + d.revenue, 0) / 1000000 || 0).toFixed(2)}M
            </p>
            <p className="text-xs text-blue-700">Last {dateRange === '7d' ? '7' : dateRange === '30d' ? '30' : '90'} days</p>
          </div>
          <FaChartLine className="text-4xl text-blue-300" />
        </div>
        {timeSeriesData && timeSeriesData.length > 0 && <RevenueChart />}
      </div>

      {/* Orders Chart */}
      <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 border border-green-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-green-900 mb-1">Orders Trend</h4>
            <p className="text-xl font-bold text-green-900">
              {timeSeriesData?.reduce((sum, d) => sum + d.orders, 0).toLocaleString() || 0}
            </p>
            <p className="text-xs text-green-700">Last {dateRange === '7d' ? '7' : dateRange === '30d' ? '30' : '90'} days</p>
          </div>
          <FaChartBar className="text-4xl text-green-300" />
        </div>
        {timeSeriesData && timeSeriesData.length > 0 && <OrdersChart />}
      </div>

      {/* System Health */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">System Health</h4>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div className="bg-green-600 h-3 rounded-full" style={{ width: '95%' }}></div>
            </div>
            <span className="text-sm font-semibold text-gray-900">95%</span>
          </div>
          <p className="text-xs text-gray-600">All systems operational</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Active Sessions</h4>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {Math.floor(Math.random() * 500) + 1000}
          </p>
          <p className="text-xs text-gray-600">Users online now</p>
        </div>
      </div>

      {/* Best-Selling Products */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Best-Selling Products</h4>
          <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
        </div>
        <div className="space-y-3">
          {bestSellingProducts.map((product, idx) => (
            <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">{product.name}</h5>
                  <p className="text-xs text-gray-600">{product.category} • {product.sales.toLocaleString()} sales</p>
                </div>
              </div>
              <div className="text-right mr-4">
                <p className="font-bold text-gray-900">₹{(product.revenue / 100000).toFixed(1)}L</p>
                <div className="flex items-center gap-1 text-xs">
                  {product.growth > 0 ? (
                    <>
                      <FaArrowUp className="text-green-600" />
                      <span className="text-green-600">+{product.growth}%</span>
                    </>
                  ) : (
                    <>
                      <FaArrowDown className="text-red-600" />
                      <span className="text-red-600">{product.growth}%</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Engagement Metrics */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100">
        <h4 className="font-semibold text-gray-900 mb-4">Customer Engagement Metrics</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FaUsers className="text-blue-600" />
              <p className="text-xs text-gray-600">Avg. Session</p>
            </div>
            <p className="text-base font-bold text-gray-900">{engagementMetrics.avgSessionDuration}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FaEye className="text-green-600" />
              <p className="text-xs text-gray-600">Page Views</p>
            </div>
            <p className="text-lg font-bold text-gray-900">{(engagementMetrics.pageViews / 1000).toFixed(0)}K</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FaUsers className="text-purple-600" />
              <p className="text-xs text-gray-600">Returning</p>
            </div>
            <p className="text-lg font-bold text-gray-900">{engagementMetrics.returningCustomers}%</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FaStar className="text-yellow-600" />
              <p className="text-xs text-gray-600">Satisfaction</p>
            </div>
            <p className="text-lg font-bold text-gray-900">{engagementMetrics.customerSatisfaction}/5</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FaShoppingCart className="text-orange-600" />
              <p className="text-xs text-gray-600">Conversion</p>
            </div>
            <p className="text-lg font-bold text-gray-900">{engagementMetrics.conversionRate}%</p>
          </div>
        </div>
      </div>

      {/* Top Vendors */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Top Performing Vendors</h4>
        <div className="space-y-3">
          {topVendors.map((vendor) => (
            <div key={vendor.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {vendor.name.charAt(0)}
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">{vendor.name}</h5>
                  <p className="text-sm text-gray-600">{vendor.orders} orders • Rating: {vendor.rating}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{vendor.revenue}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  vendor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {vendor.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;

