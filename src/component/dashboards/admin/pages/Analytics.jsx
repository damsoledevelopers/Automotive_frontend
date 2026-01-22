import React, { useState, useEffect } from 'react';
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
  FaDownload,
  FaSpinner
} from 'react-icons/fa';
import { analyticsService } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const Analytics = () => {
  const [selectedView, setSelectedView] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');
  const [loading, setLoading] = useState(false);
  
  // Real-time Dashboard Data
  const [realTimeData, setRealTimeData] = useState({
    activeJobs: 0,
    onlineMechanics: 0,
    busiestLocations: [],
    totalLocations: 0
  });
  
  // Revenue Data
  const [revenueData, setRevenueData] = useState({
    byCategory: [],
    byLocation: [],
    byMechanic: []
  });
  
  // Predictive Analytics Data
  const [predictiveData, setPredictiveData] = useState({
    season: 'Winter',
    predictedDemand: {},
    locationTrends: [],
    overallGrowth: '0%'
  });
  
  // Quality Control Data
  const [qualityControlData, setQualityControlData] = useState([]);

  // Fetch real-time dashboard data
  useEffect(() => {
    fetchRealTimeDashboard();
  }, [dateRange]);

  // Fetch data based on selected view
  useEffect(() => {
    if (selectedView === 'revenue') {
      fetchRevenueData();
    } else if (selectedView === 'predictive') {
      fetchPredictiveAnalytics();
    } else if (selectedView === 'quality') {
      fetchQualityControlData();
    }
  }, [selectedView, dateRange]);

  const fetchRealTimeDashboard = async () => {
    try {
      setLoading(true);
      const result = await analyticsService.getRealTimeDashboard({ dateRange });
      
      // Format revenue for display
      const formattedLocations = (result.busiestLocations || []).map(loc => ({
        location: loc.location || 'Unknown',
        jobs: loc.jobs || 0,
        revenue: formatRevenue(loc.revenue || 0),
        mechanics: loc.mechanics || 0
      }));
      
      setRealTimeData({
        activeJobs: result.activeJobs || 0,
        onlineMechanics: result.onlineMechanics || 0,
        busiestLocations: formattedLocations,
        totalLocations: result.totalLocations || formattedLocations.length
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      const result = await analyticsService.getRevenueData({ dateRange });
      
      setRevenueData({
        byCategory: result.byCategory || [],
        byLocation: result.byLocation || [],
        byMechanic: result.byMechanic || []
      });
    } catch (error) {
      console.error('Failed to fetch revenue data:', error);
      toast.error('Failed to load revenue data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPredictiveAnalytics = async () => {
    try {
      setLoading(true);
      const result = await analyticsService.getPredictiveAnalytics();
      
      setPredictiveData({
        season: result.season || 'Winter',
        predictedDemand: result.predictedDemand || {},
        locationTrends: result.locationTrends || [],
        overallGrowth: result.overallGrowth || '0%'
      });
    } catch (error) {
      console.error('Failed to fetch predictive analytics:', error);
      toast.error('Failed to load predictive analytics: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchQualityControlData = async () => {
    try {
      setLoading(true);
      const result = await analyticsService.getQualityControlData();
      
      setQualityControlData(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error('Failed to fetch quality control data:', error);
      toast.error('Failed to load quality control data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Export data functionality
  const handleExport = async () => {
    try {
      setLoading(true);
      const exportData = await analyticsService.exportData({ 
        dateRange,
        type: selectedView === 'revenue' ? 'revenue' : 
              selectedView === 'predictive' ? 'dashboard' : 
              selectedView === 'quality' ? 'dashboard' : 'dashboard'
      });
      
      // Convert to CSV format
      let csvContent = '';
      
      if (selectedView === 'overview') {
        csvContent = 'Metric,Value\n';
        csvContent += `Active Jobs,${realTimeData.activeJobs}\n`;
        csvContent += `Online Mechanics,${realTimeData.onlineMechanics}\n`;
        csvContent += `Total Locations,${realTimeData.totalLocations}\n`;
        csvContent += '\nBusiest Locations\n';
        csvContent += 'Location,Jobs,Revenue,Mechanics\n';
        realTimeData.busiestLocations.forEach(loc => {
          csvContent += `${loc.location},${loc.jobs},${loc.revenue},${loc.mechanics}\n`;
        });
      } else if (selectedView === 'revenue') {
        csvContent = 'Category,Revenue,Commission\n';
        revenueData.byCategory.forEach(item => {
          csvContent += `${item.category},${item.revenue},${item.commission}\n`;
        });
      }
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `analytics_${selectedView}_${dateRange}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Data exported successfully!');
    } catch (error) {
      console.error('Failed to export data:', error);
      toast.error('Failed to export data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format revenue
  const formatRevenue = (amount) => {
    if (amount >= 1000000) {
      return `₹${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
    return `₹${amount}`;
  };


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
          <button 
            onClick={handleExport}
            disabled={loading}
            className="bg-white border border-red-500 text-red-500 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-50 transition-colors"
          >
            {loading ? <FaSpinner className="animate-spin text-red-500" /> : <FaDownload className="text-red-500" />} <span className="text-red-500">Export</span>
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
          {loading && (
            <div className="flex justify-center items-center py-12">
              <FaSpinner className="animate-spin text-blue-600 text-3xl" />
            </div>
          )}

          {/* Real-time Dashboard */}
          {selectedView === 'overview' && !loading && (
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
                      <p className="text-2xl font-bold text-purple-900">{realTimeData.totalLocations}</p>
                    </div>
                    <FaMapMarkerAlt className="text-4xl text-purple-600 opacity-50" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Busiest Locations</h3>
                {realTimeData.busiestLocations.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No location data available
                  </div>
                ) : (
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
                )}
              </div>
            </div>
          )}

          {/* Revenue & Commission Visualization */}
          {selectedView === 'revenue' && !loading && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Revenue by Category</h3>
                  {revenueData.byCategory.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No revenue data available</div>
                  ) : (
                    <div className="space-y-4">
                      {revenueData.byCategory.map((item, idx) => {
                        const maxRevenue = Math.max(...revenueData.byCategory.map(i => i.revenue || 0), 1);
                        return (
                          <div key={idx}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-900">{item.category}</span>
                              <span className="text-sm font-semibold text-gray-900">{formatRevenue(item.revenue || 0)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${((item.revenue || 0) / maxRevenue) * 100}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Commission: {formatRevenue(item.commission || 0)}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Revenue by Location</h3>
                  {revenueData.byLocation.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No location revenue data available</div>
                  ) : (
                    <div className="space-y-4">
                      {revenueData.byLocation.map((item, idx) => {
                        const maxRevenue = Math.max(...revenueData.byLocation.map(i => i.revenue || 0), 1);
                        return (
                          <div key={idx}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-900">{item.location}</span>
                              <span className="text-sm font-semibold text-gray-900">{formatRevenue(item.revenue || 0)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${((item.revenue || 0) / maxRevenue) * 100}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Commission: {formatRevenue(item.commission || 0)}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Top Performing Mechanics</h3>
                {revenueData.byMechanic.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No mechanic data available</div>
                ) : (
                  <div className="space-y-3">
                    {revenueData.byMechanic.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{item.mechanic}</p>
                            {item.rating && (
                              <p className="text-sm text-gray-600">Rating: {item.rating} ⭐</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{formatRevenue(item.revenue || 0)}</p>
                          {item.commission && (
                            <p className="text-xs text-gray-500">Commission: {formatRevenue(item.commission)}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Predictive Demand Analytics */}
          {selectedView === 'predictive' && !loading && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <FaBrain className="text-3xl text-purple-600" />
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">AI-Powered Demand Prediction</h3>
                    <p className="text-sm text-gray-600">Current Season: <span className="font-semibold">{predictiveData.season}</span></p>
                    {predictiveData.overallGrowth && (
                      <p className="text-sm text-gray-600">Overall Growth: <span className="font-semibold">{predictiveData.overallGrowth}</span></p>
                    )}
                  </div>
                </div>
                {Object.keys(predictiveData.predictedDemand).length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No demand prediction data available</div>
                ) : (
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
                )}
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Location-Based Trends</h3>
                {predictiveData.locationTrends.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No location trend data available</div>
                ) : (
                  <div className="space-y-4">
                    {predictiveData.locationTrends.map((trend, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">{trend.location}</p>
                          {trend.predictedJobs && (
                            <p className="text-sm text-gray-600">Predicted Jobs: {trend.predictedJobs}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            trend.trend === 'Increasing' ? 'bg-green-100 text-green-800' : 
                            trend.trend === 'Decreasing' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {trend.growth}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mechanic Quality Control */}
          {selectedView === 'quality' && !loading && (
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

              {qualityControlData.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No quality control data available
                </div>
              ) : (
                <div className="space-y-4">
                  {qualityControlData.map((mechanic) => (
                    <div key={mechanic.id} className={`bg-white rounded-lg shadow-md p-6 border ${
                      mechanic.status === 'Critical' ? 'border-red-300 bg-red-50' :
                      mechanic.status === 'Flagged' ? 'border-orange-300 bg-orange-50' :
                      mechanic.status === 'Warning' ? 'border-yellow-300 bg-yellow-50' :
                      'border-gray-200'
                    }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">{mechanic.name}</h3>
                          {mechanic.email && (
                            <p className="text-xs text-gray-500 mt-1">{mechanic.email}</p>
                          )}
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-gray-600">Rating: <span className="font-semibold">{mechanic.rating} ⭐</span></span>
                            <span className="text-sm text-gray-600">Cancellations: <span className="font-semibold">{mechanic.cancellations}</span></span>
                            <span className="text-sm text-gray-600">Complaints: <span className="font-semibold">{mechanic.complaints}</span></span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          mechanic.status === 'Critical' ? 'bg-red-100 text-red-800' :
                          mechanic.status === 'Flagged' ? 'bg-orange-100 text-orange-800' :
                          mechanic.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {mechanic.status}
                        </span>
                      </div>
                      {mechanic.issues && mechanic.issues.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">Issues Detected:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {mechanic.issues.map((issue, idx) => (
                              <li key={idx} className="text-sm text-gray-600">{issue}</li>
                            ))}
                          </ul>
                        </div>
                      )}
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
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
