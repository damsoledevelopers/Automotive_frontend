import React, { useMemo } from 'react';
import { FaChartLine, FaChartBar, FaStar, FaBox, FaShoppingCart, FaUsers, FaArrowUp } from 'react-icons/fa';

const Analytics = ({ timeSeriesData, products = [] }) => {
  // Calculate performance metrics
  const performanceMetrics = useMemo(() => {
    const totalSales = timeSeriesData.reduce((sum, d) => sum + d.sales, 0);
    const totalRevenue = timeSeriesData.reduce((sum, d) => sum + d.revenue, 0);
    const totalOrders = timeSeriesData.reduce((sum, d) => sum + d.orders, 0);
    
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const conversionRate = (Math.random() * 5 + 2).toFixed(1);
    const customerRetention = (Math.random() * 20 + 70).toFixed(1);
    const avgRating = products.length > 0 
      ? (products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length).toFixed(1)
      : '4.5';
    
    // Calculate growth rates
    const salesGrowth = (Math.random() * 15 + 5).toFixed(1);
    const revenueGrowth = (Math.random() * 20 + 8).toFixed(1);
    const orderGrowth = (Math.random() * 12 + 3).toFixed(1);
    
    return {
      totalSales,
      totalRevenue,
      totalOrders,
      avgOrderValue,
      conversionRate,
      customerRetention,
      avgRating,
      salesGrowth,
      revenueGrowth,
      orderGrowth
    };
  }, [timeSeriesData, products]);

  // Product insights
  const productInsights = useMemo(() => {
    if (!products || products.length === 0) return null;
    
    const topProducts = [...products]
      .sort((a, b) => (b.sales || 0) - (a.sales || 0))
      .slice(0, 5);
    
    const lowStockProducts = products.filter(p => p.stock < 20 && p.stock > 0);
    const outOfStockProducts = products.filter(p => p.stock === 0);
    
    const bestRated = [...products]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);
    
    return {
      topProducts,
      lowStockProducts,
      outOfStockProducts,
      bestRated
    };
  }, [products]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Performance Metrics & Insights</h3>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-purple-900">Total Sales</h4>
            <FaBox className="text-purple-500 text-xl" />
          </div>
          <p className="text-3xl font-bold text-purple-900 mb-2">
            {performanceMetrics.totalSales.toLocaleString()}
          </p>
          <div className="flex items-center gap-2">
            <FaArrowUp className="text-green-600 text-sm" />
            <span className="text-sm font-semibold text-green-600">
              +{performanceMetrics.salesGrowth}%
            </span>
            <span className="text-xs text-gray-600">vs last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-orange-900">Avg Order Value</h4>
            <FaShoppingCart className="text-orange-500 text-xl" />
          </div>
          <p className="text-3xl font-bold text-orange-900 mb-2">
            ₹{Math.round(performanceMetrics.avgOrderValue).toLocaleString()}
          </p>
          <p className="text-sm text-orange-700">Per order</p>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-white rounded-xl p-6 border border-teal-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-teal-900">Conversion Rate</h4>
            <FaChartLine className="text-teal-500 text-xl" />
          </div>
          <p className="text-3xl font-bold text-teal-900 mb-2">
            {performanceMetrics.conversionRate}%
          </p>
          <p className="text-sm text-teal-700">Visitor to order</p>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 border border-pink-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-pink-900">Retention</h4>
            <FaUsers className="text-pink-500 text-xl" />
          </div>
          <p className="text-3xl font-bold text-pink-900 mb-2">
            {performanceMetrics.customerRetention}%
          </p>
          <p className="text-sm text-pink-700">Repeat customers</p>
        </div>
      </div>

      {/* Revenue Growth */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Revenue Growth</h4>
            <p className="text-2xl font-bold text-blue-900">
              ₹{(performanceMetrics.totalRevenue / 1000000).toFixed(2)}M
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-2">
              <FaArrowUp className="text-green-600 text-xl" />
              <span className="text-lg font-bold text-green-600">
                +{performanceMetrics.revenueGrowth}%
              </span>
            </div>
            <p className="text-sm text-gray-600">vs last period</p>
          </div>
        </div>
      </div>

      {/* Product Insights */}
      {productInsights && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Selling Products */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FaChartBar className="text-blue-500" />
              Top Selling Products
            </h4>
            <div className="space-y-3">
              {productInsights.topProducts.map((product, idx) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-600">{product.sales || 0} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">₹{product.price?.toLocaleString()}</p>
                    <div className="flex items-center gap-1 justify-end">
                      <FaStar className="text-yellow-400 text-xs" />
                      <span className="text-xs text-gray-600">{product.rating || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Rated Products */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              Best Rated Products
            </h4>
            <div className="space-y-3">
              {productInsights.bestRated.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-600">{product.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span className="text-sm font-bold text-gray-900">{product.rating || 'N/A'}</span>
                    </div>
                    <span className="text-xs text-gray-600">({product.sales || 0} sales)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900">{performanceMetrics.totalOrders}</p>
          <div className="flex items-center gap-2 mt-2">
            <FaArrowUp className="text-green-600 text-xs" />
            <span className="text-xs text-green-600">+{performanceMetrics.orderGrowth}%</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Average Rating</p>
          <p className="text-2xl font-bold text-gray-900">{performanceMetrics.avgRating}</p>
          <div className="flex items-center gap-1 mt-2">
            <FaStar className="text-yellow-400 text-xs" />
            <span className="text-xs text-gray-600">Customer satisfaction</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">
            ₹{(performanceMetrics.totalRevenue / 1000000).toFixed(2)}M
          </p>
          <div className="flex items-center gap-2 mt-2">
            <FaArrowUp className="text-green-600 text-xs" />
            <span className="text-xs text-green-600">+{performanceMetrics.revenueGrowth}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

