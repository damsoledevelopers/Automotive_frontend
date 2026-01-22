import React, { useMemo, useState, useEffect } from 'react';
import { useJob } from '../../../../contexts/JobContext';
import { analyticsService } from '../../../../services/apiService';
import { toast } from 'react-toastify';
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
  FaShare,
  FaSpinner
} from 'react-icons/fa';

const Overview = ({ timeSeriesData, dateRange, stats, topVendors, recentActivities }) => {
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [engagementMetrics, setEngagementMetrics] = useState({
    avgSessionDuration: '0m 0s',
    bounceRate: '0%',
    pageViews: 0,
    returningCustomers: 0,
    customerSatisfaction: 0,
    socialShares: 0,
    productViews: 0,
    addToCartRate: 0,
    conversionRate: 0
  });
  const [systemHealth, setSystemHealth] = useState({
    apiStatus: 'Unknown',
    database: 'Unknown',
    serverLoad: 0,
    uptime: '0%'
  });
  const [activeSessions, setActiveSessions] = useState({
    activeSessions: 0,
    activeUsers: 0,
    activeVendors: 0,
    activeMechanics: 0
  });
  const [loading, setLoading] = useState(false);

  // Fetch real-time data
  useEffect(() => {
    fetchRealTimeData();
    // Refresh every 30 seconds
    const interval = setInterval(() => {
      fetchRealTimeData();
    }, 30000);
    return () => clearInterval(interval);
  }, [dateRange]);

  const fetchRealTimeData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [products, engagement, health, sessions] = await Promise.all([
        analyticsService.getBestSellingProducts({ dateRange, limit: 5 }),
        analyticsService.getCustomerEngagementMetrics({ dateRange }),
        analyticsService.getSystemHealth(),
        analyticsService.getActiveSessions()
      ]);

      setBestSellingProducts(Array.isArray(products) ? products : []);
      setEngagementMetrics(engagement || {});
      setSystemHealth(health || {});
      setActiveSessions(sessions || {});
    } catch (error) {
      console.error('Failed to fetch real-time data:', error);
      toast.error('Failed to load real-time data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Export report functionality
  const handleExportReport = async () => {
    try {
      setLoading(true);
      
      // Fetch comprehensive data for export
      const [exportData, products, engagement, health, sessions] = await Promise.all([
        analyticsService.exportData({ dateRange, type: 'dashboard' }),
        analyticsService.getBestSellingProducts({ dateRange, limit: 100 }),
        analyticsService.getCustomerEngagementMetrics({ dateRange }),
        analyticsService.getSystemHealth(),
        analyticsService.getActiveSessions()
      ]);

      // Generate CSV content
      let csvContent = 'System Overview Report\n';
      csvContent += `Generated: ${new Date().toLocaleString()}\n`;
      csvContent += `Date Range: ${dateRange}\n\n`;

      // Summary Statistics
      csvContent += '=== SUMMARY STATISTICS ===\n';
      if (stats && stats.length > 0) {
        stats.forEach(stat => {
          csvContent += `${stat.label},${stat.value},${stat.change}\n`;
        });
      }
      csvContent += '\n';

      // Revenue Trend
      csvContent += '=== REVENUE TREND ===\n';
      csvContent += 'Date,Revenue,Orders\n';
      if (timeSeriesData && timeSeriesData.length > 0) {
        timeSeriesData.forEach(data => {
          csvContent += `${data.date},${data.revenue},${data.orders}\n`;
        });
      }
      csvContent += '\n';

      // Best Selling Products
      csvContent += '=== BEST SELLING PRODUCTS ===\n';
      csvContent += 'Rank,Product Name,Category,Sales,Revenue,Growth\n';
      if (Array.isArray(products) && products.length > 0) {
        products.forEach((product, idx) => {
          csvContent += `${idx + 1},${product.name || 'N/A'},${product.category || 'N/A'},${product.sales || 0},${product.revenue || 0},${product.growth || 0}%\n`;
        });
      }
      csvContent += '\n';

      // Customer Engagement Metrics
      csvContent += '=== CUSTOMER ENGAGEMENT METRICS ===\n';
      csvContent += `Average Session Duration,${engagement.avgSessionDuration || 'N/A'}\n`;
      csvContent += `Bounce Rate,${engagement.bounceRate || '0%'}\n`;
      csvContent += `Page Views,${engagement.pageViews || 0}\n`;
      csvContent += `Returning Customers,${engagement.returningCustomers || 0}%\n`;
      csvContent += `Customer Satisfaction,${engagement.customerSatisfaction || 0}/5\n`;
      csvContent += `Social Shares,${engagement.socialShares || 0}\n`;
      csvContent += `Product Views,${engagement.productViews || 0}\n`;
      csvContent += `Add to Cart Rate,${engagement.addToCartRate || 0}%\n`;
      csvContent += `Conversion Rate,${engagement.conversionRate || 0}%\n`;
      csvContent += '\n';

      // System Health
      csvContent += '=== SYSTEM HEALTH ===\n';
      csvContent += `API Status,${health.apiStatus || 'Unknown'}\n`;
      csvContent += `Database,${health.database || 'Unknown'}\n`;
      csvContent += `Server Load,${health.serverLoad || 0}%\n`;
      csvContent += `Uptime,${health.uptime || '0%'}\n`;
      csvContent += '\n';

      // Active Sessions
      csvContent += '=== ACTIVE SESSIONS ===\n';
      csvContent += `Total Active Sessions,${sessions.activeSessions || 0}\n`;
      csvContent += `Active Users,${sessions.activeUsers || 0}\n`;
      csvContent += `Active Vendors,${sessions.activeVendors || 0}\n`;
      csvContent += `Active Mechanics,${sessions.activeMechanics || 0}\n`;
      csvContent += '\n';

      // Top Vendors
      csvContent += '=== TOP PERFORMING VENDORS ===\n';
      csvContent += 'Rank,Vendor Name,Orders,Revenue,Rating,Status\n';
      if (Array.isArray(topVendors) && topVendors.length > 0) {
        topVendors.forEach((vendor, idx) => {
          csvContent += `${idx + 1},${vendor.name || 'N/A'},${vendor.orders || 0},${vendor.revenue || 'N/A'},${vendor.rating || 0},${vendor.status || 'N/A'}\n`;
        });
      }

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `system_overview_report_${dateRange}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Report downloaded successfully!');
    } catch (error) {
      console.error('Failed to export report:', error);
      toast.error('Failed to export report: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

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
        <button 
          onClick={handleExportReport}
          disabled={loading}
          className="bg-white border border-red-500 text-red-500 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-50 transition-colors"
        >
          {loading ? <FaSpinner className="animate-spin text-red-500" /> : <FaDownload className="text-red-500" />} <span className="text-red-500">Export Report</span>
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
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <FaSpinner className="animate-spin text-blue-600" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      systemHealth.serverLoad < 50 ? 'bg-green-600' :
                      systemHealth.serverLoad < 80 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${systemHealth.serverLoad || 0}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-gray-900">{systemHealth.serverLoad || 0}%</span>
              </div>
              <p className="text-xs text-gray-600">
                {systemHealth.apiStatus === 'Operational' ? 'All systems operational' : 
                 systemHealth.apiStatus === 'Degraded' ? 'System degraded' : 'Checking...'}
              </p>
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Database:</span>
                  <span className={`font-semibold ${
                    systemHealth.database === 'Healthy' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {systemHealth.database || 'Unknown'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Uptime:</span>
                  <span className="font-semibold text-gray-900">{systemHealth.uptime || '0%'}</span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Active Sessions</h4>
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <FaSpinner className="animate-spin text-blue-600" />
            </div>
          ) : (
            <>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {activeSessions.activeSessions || 0}
              </p>
              <p className="text-xs text-gray-600">Users online now</p>
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Users:</span>
                  <span className="font-semibold text-gray-900">{activeSessions.activeUsers || 0}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Vendors:</span>
                  <span className="font-semibold text-gray-900">{activeSessions.activeVendors || 0}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Mechanics:</span>
                  <span className="font-semibold text-gray-900">{activeSessions.activeMechanics || 0}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Best-Selling Products */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Best-Selling Products</h4>
          <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
        </div>
        {loading && bestSellingProducts.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <FaSpinner className="animate-spin text-blue-600 text-2xl" />
          </div>
        ) : bestSellingProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No product data available</div>
        ) : (
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
                <p className="font-bold text-gray-900">
                  {product.revenue >= 1000000 
                    ? `₹${(product.revenue / 1000000).toFixed(1)}M`
                    : product.revenue >= 100000
                    ? `₹${(product.revenue / 100000).toFixed(1)}L`
                    : product.revenue >= 1000
                    ? `₹${(product.revenue / 1000).toFixed(0)}K`
                    : `₹${product.revenue || 0}`}
                </p>
                <div className="flex items-center gap-1 text-xs">
                  {product.growth > 0 ? (
                    <>
                      <FaArrowUp className="text-green-600" />
                      <span className="text-green-600">+{product.growth.toFixed(1)}%</span>
                    </>
                  ) : product.growth < 0 ? (
                    <>
                      <FaArrowDown className="text-red-600" />
                      <span className="text-red-600">{product.growth.toFixed(1)}%</span>
                    </>
                  ) : (
                    <span className="text-gray-600">0%</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>

      {/* Customer Engagement Metrics */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100">
        <h4 className="font-semibold text-gray-900 mb-4">Customer Engagement Metrics</h4>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <FaSpinner className="animate-spin text-blue-600 text-2xl" />
          </div>
        ) : (
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
            <p className="text-lg font-bold text-gray-900">{engagementMetrics.conversionRate || 0}%</p>
          </div>
          </div>
        )}
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

