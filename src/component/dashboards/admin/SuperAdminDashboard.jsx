import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useJob } from '../../../contexts/JobContext';
import { analyticsService } from '../../../services/apiService';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Overview from './pages/Overview';
import Users from './pages/Users';
import Orders from './pages/Orders';
import Vendors from './pages/Vendors';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Products from './pages/Products';
import Categories from './pages/Categories';
import LuckyDraw from './pages/LuckyDraw';
import KYC from './pages/KYC';
import Fines from './pages/Fines';
import Reports from './pages/Reports';
import Garages from './pages/Garages';
import Profile from './pages/Profile';
import Payments from './pages/Payments';
import Marketing from './pages/Marketing';
import Support from './pages/Support';
import Mechanics from './pages/Mechanics';
import {
  FaUsers,
  FaStore,
  FaTools,
  FaShoppingCart,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaHome,
  FaBox,
  FaMoneyBillWave,
  FaUserShield,
  FaBell,
  FaArrowUp,
  FaArrowDown,
  FaFilter,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaChartBar,
  FaChartPie,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaBars,
  FaUser,
  FaChevronDown,
  FaSignInAlt
} from 'react-icons/fa';

const SuperAdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { jobs } = useJob();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState('30d');
  const [refreshKey, setRefreshKey] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [overallStats, setOverallStats] = useState(null);
  const [previousStats, setPreviousStats] = useState(null);
  const [realTimeData, setRealTimeData] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [systemStatus, setSystemStatus] = useState({
    apiStatus: 'Unknown',
    database: 'Unknown',
    serverLoad: 0,
    uptime: '0%'
  });
  const [topVendorsData, setTopVendorsData] = useState([]);

  // Fetch real-time data from backend
  useEffect(() => {
    fetchDashboardData();
    fetchAdditionalData();
    // Refresh every 30 seconds
    const interval = setInterval(() => {
      fetchDashboardData();
      fetchAdditionalData();
    }, 30000);
    return () => clearInterval(interval);
  }, [dateRange]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch current period stats (includes changes from backend)
      const currentStats = await analyticsService.getOverallStats({ dateRange });
      setOverallStats(currentStats);
      
      // Fetch real-time dashboard data
      const dashboardData = await analyticsService.getRealTimeDashboard({ dateRange });
      setRealTimeData(dashboardData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdditionalData = async () => {
    try {
      // Fetch recent activities, system status, and top vendors in parallel
      const [activities, health, vendors] = await Promise.all([
        analyticsService.getRecentActivities({ limit: 6 }),
        analyticsService.getSystemHealth(),
        analyticsService.getTopVendors({ dateRange, limit: 5 })
      ]);

      setRecentActivities(Array.isArray(activities) ? activities : []);
      setSystemStatus(health || {});
      setTopVendorsData(Array.isArray(vendors) ? vendors : []);
    } catch (error) {
      console.error('Failed to fetch additional data:', error);
      // Don't show toast for these as they're background updates
    }
  };

  // Generate time series data from orders (if we have order data)
  // For now, we'll generate placeholder data but structure it for real data
  const generateTimeSeriesData = (days = 30) => {
    const data = [];
    const today = new Date();
    const totalRevenue = overallStats?.totalRevenue || 0;
    const totalOrders = overallStats?.totalOrders || 0;
    
    // Distribute total revenue and orders across days
    const avgDailyRevenue = totalRevenue / days;
    const avgDailyOrders = totalOrders / days;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      // Add some variation to make it look realistic
      const variation = 0.8 + Math.random() * 0.4; // 80% to 120% of average
      data.push({
        date: date.toISOString().split('T')[0],
        orders: Math.round(avgDailyOrders * variation),
        revenue: Math.round(avgDailyRevenue * variation),
        users: Math.floor(Math.random() * 10) + 5,
      });
    }
    return data;
  };

  const timeSeriesData = useMemo(() => generateTimeSeriesData(
    dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90
  ), [dateRange, overallStats, refreshKey]);

  const stats = useMemo(() => {
    // Use real data from backend if available, otherwise use defaults
    const totalUsers = overallStats?.totalUsers || 0;
    const totalVendors = overallStats?.totalVendors || 0;
    const totalMechanics = realTimeData?.onlineMechanics || 0;
    const totalOrders = overallStats?.totalOrders || 0;
    const totalRevenue = overallStats?.totalRevenue || 0;
    const totalProducts = overallStats?.totalProducts || 0;
    const activeJobs = realTimeData?.activeJobs || 0;
    const completedJobs = 0; // Would need to calculate from orders with status 'Delivered'

    // Use changes from backend if available
    const changes = overallStats?.changes || {
      users: 0,
      vendors: 0,
      mechanics: 0,
      orders: 0,
      revenue: 0,
      products: 0,
    };

    const calculated = {
      totalUsers,
      totalVendors,
      totalMechanics,
      totalOrders,
      totalRevenue,
      totalProducts,
      activeJobs,
      completedJobs,
      changes,
    };
    return [
      {
        label: 'Total Users',
        value: calculated.totalUsers.toLocaleString(),
        icon: FaUsers,
        color: 'bg-blue-500',
        change: `${calculated.changes.users >= 0 ? '+' : ''}${calculated.changes.users}%`,
        trend: calculated.changes.users > 0 ? 'up' : calculated.changes.users < 0 ? 'down' : 'neutral'
      },
      {
        label: 'Vendors',
        value: calculated.totalVendors.toLocaleString(),
        icon: FaStore,
        color: 'bg-green-500',
        change: `${calculated.changes.vendors >= 0 ? '+' : ''}${calculated.changes.vendors}%`,
        trend: calculated.changes.vendors > 0 ? 'up' : calculated.changes.vendors < 0 ? 'down' : 'neutral'
      },
      {
        label: 'Mechanics',
        value: calculated.totalMechanics.toLocaleString(),
        icon: FaTools,
        color: 'bg-yellow-500',
        change: `${calculated.activeJobs} ongoing`,
        trend: 'neutral'
      },
      {
        label: 'Total Orders',
        value: calculated.totalOrders.toLocaleString(),
        icon: FaShoppingCart,
        color: 'bg-purple-500',
        change: `${calculated.changes.orders >= 0 ? '+' : ''}${calculated.changes.orders}%`,
        trend: calculated.changes.orders > 0 ? 'up' : calculated.changes.orders < 0 ? 'down' : 'neutral'
      },
      {
        label: 'Revenue',
        value: `₹${(calculated.totalRevenue / 1000000).toFixed(2)}M`,
        icon: FaMoneyBillWave,
        color: 'bg-red-500',
        change: `${calculated.changes.revenue >= 0 ? '+' : ''}${calculated.changes.revenue}%`,
        trend: calculated.changes.revenue > 0 ? 'up' : calculated.changes.revenue < 0 ? 'down' : 'neutral'
      },
      {
        label: 'Products',
        value: calculated.totalProducts.toLocaleString(),
        icon: FaBox,
        color: 'bg-indigo-500',
        change: `${calculated.changes.products >= 0 ? '+' : ''}${calculated.changes.products}%`,
        trend: calculated.changes.products > 0 ? 'up' : calculated.changes.products < 0 ? 'down' : 'neutral'
      },
      {
        label: 'Active Jobs',
        value: calculated.activeJobs.toString(),
        icon: FaTools,
        color: 'bg-orange-500',
        change: `${calculated.activeJobs} ongoing`,
        trend: 'neutral'
      },
      {
        label: 'Completed Jobs',
        value: calculated.completedJobs.toString(),
        icon: FaCheckCircle,
        color: 'bg-teal-500',
        change: 'This month',
        trend: 'neutral'
      },
    ];
  }, [overallStats, realTimeData, jobs]);

  // Helper function to get icon for activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'user':
        return FaUsers;
      case 'order':
        return FaShoppingCart;
      case 'product':
        return FaBox;
      default:
        return FaCheckCircle;
    }
  };

  // User management data
  const usersData = useMemo(() => {
    return [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active', joined: '2024-01-15', orders: 12 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Vendor', status: 'Active', joined: '2024-01-10', orders: 45 },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Mechanic', status: 'Active', joined: '2024-01-08', orders: 8 },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Customer', status: 'Inactive', joined: '2023-12-20', orders: 3 },
      { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Vendor', status: 'Active', joined: '2024-01-05', orders: 67 },
    ];
  }, []);

  // Order management data
  const ordersData = useMemo(() => {
    return [
      { id: 1, orderId: 'ORD-001', customer: 'John Doe', vendor: 'Auto Parts Hub', amount: '₹15,000', status: 'Delivered', date: '2024-01-15', items: 5 },
      { id: 2, orderId: 'ORD-002', customer: 'Jane Smith', vendor: 'Premium Spares', amount: '₹8,500', status: 'Shipped', date: '2024-01-14', items: 3 },
      { id: 3, orderId: 'ORD-003', customer: 'Bob Johnson', vendor: 'Quick Auto', amount: '₹12,300', status: 'Processing', date: '2024-01-14', items: 7 },
      { id: 4, orderId: 'ORD-004', customer: 'Alice Brown', vendor: 'Genuine Parts', amount: '₹6,200', status: 'Pending', date: '2024-01-13', items: 2 },
      { id: 5, orderId: 'ORD-005', customer: 'Charlie Wilson', vendor: 'Budget Auto', amount: '₹9,800', status: 'Delivered', date: '2024-01-13', items: 4 },
    ];
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.profile-menu')) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  // Determine which page to show based on location
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/admin/dashboard' || path === '/admin/dashboard/') return 'overview';
    if (path.includes('/profile')) return 'profile';
    if (path.includes('/users')) return 'users';
    if (path.includes('/orders')) return 'orders';
    if (path.includes('/vendors')) return 'vendors';
    if (path.includes('/mechanics')) return 'mechanics';
    if (path.includes('/garages')) return 'garages';
    if (path.includes('/products')) return 'products';
    if (path.includes('/categories')) return 'categories';
    if (path.includes('/lucky-draw')) return 'lucky-draw';
    if (path.includes('/kyc')) return 'kyc';
    if (path.includes('/fines')) return 'fines';
    if (path.includes('/analytics')) return 'analytics';
    if (path.includes('/reports')) return 'reports';
    if (path.includes('/settings')) return 'settings';
    if (path.includes('/payments')) return 'payments';
    if (path.includes('/marketing')) return 'marketing';
    if (path.includes('/support')) return 'support';
    return 'overview';
  };

  const currentPage = getCurrentPage();

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 shrink-0">
          <div className="px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden text-gray-600 hover:text-gray-900 p-2"
                >
                  <FaBars className="text-xl" />
                </button>
                <div>
                  <h1 className="text-base md:text-lg font-bold text-gray-900">Super Admin Dashboard</h1>
                  <p className="text-xs text-gray-600">Welcome back, {user?.name || 'Admin'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <div className="hidden md:flex items-center gap-2">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                  </select>
                </div>
                <button className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition">
                  <FaBell className="text-xl" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative profile-menu">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={user?.avatar || 'https://via.placeholder.com/40'}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                    />
                    <span className="hidden md:inline text-sm font-medium text-gray-700">{user?.name || 'Admin'}</span>
                    <FaChevronDown className="text-xs text-gray-500" />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <img
                            src={user?.avatar || 'https://via.placeholder.com/40'}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-gray-300"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{user?.name || 'Admin'}</p>
                            <p className="text-xs text-gray-600">{user?.email || 'admin@example.com'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => {
                            navigate('/admin/dashboard/profile');
                            setShowProfileMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                        >
                          <FaUser className="text-sm" />
                          <span>My Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            navigate('/login');
                            setShowProfileMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors text-sm mt-1"
                        >
                          <FaSignInAlt className="text-sm" />
                          <span>Login</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm mt-1"
                        >
                          <FaSignOutAlt className="text-sm" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8">
            {/* Stats Grid - Only visible on Overview page */}
            {currentPage === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {loading && stats.length === 0 && (
                  <div className="col-span-full flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                )}
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  const changeValue = parseFloat(stat.change.replace(/[+%]/g, '')) || 0;
                  const trend = changeValue > 0 ? 'up' : changeValue < 0 ? 'down' : 'neutral';
                  const TrendIcon = trend === 'up' ? FaArrowUp : trend === 'down' ? FaArrowDown : null;
                  return (
                    <div key={index} className="card-hover bg-white rounded-xl shadow-md p-6 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                          <div className="flex items-center gap-2">
                            {TrendIcon && trend !== 'neutral' && (
                              <TrendIcon className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                            )}
                            {trend !== 'neutral' && (
                              <p className={`text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {changeValue > 0 ? '+' : ''}{changeValue}%
                              </p>
                            )}
                            {trend === 'neutral' && (
                              <p className="text-sm font-semibold text-gray-600">{stat.change}</p>
                            )}
                            {trend !== 'neutral' && (
                              <span className="text-xs text-gray-500">from last month</span>
                            )}
                          </div>
                        </div>
                        <div className={`${stat.color} p-4 rounded-xl text-white shadow-lg`}>
                          <Icon className="text-2xl" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className={`grid grid-cols-1 ${currentPage === 'overview' ? 'lg:grid-cols-3' : ''} gap-6`}>
              {/* Main Content */}
              <div className={currentPage === 'overview' ? 'lg:col-span-2 space-y-6' : 'space-y-6'}>
                <div className="card bg-white rounded-xl shadow-md border border-gray-100 p-6">
                  {currentPage === 'overview' && (
                    <Overview
                      timeSeriesData={timeSeriesData}
                      dateRange={dateRange}
                      stats={stats}
                      topVendors={topVendorsData}
                      recentActivities={recentActivities}
                    />
                  )}
                  {currentPage === 'users' && (
                    <Users />
                  )}
                  {currentPage === 'orders' && (
                    <Orders ordersData={ordersData} />
                  )}
                  {currentPage === 'vendors' && (
                    <Vendors topVendors={topVendorsData} />
                  )}
                  {currentPage === 'garages' && (
                    <Garages />
                  )}
                  {currentPage === 'mechanics' && (
                    <Mechanics />
                  )}
                  {currentPage === 'products' && (
                    <Products />
                  )}
                  {currentPage === 'categories' && (
                    <Categories />
                  )}
                  {currentPage === 'lucky-draw' && (
                    <LuckyDraw />
                  )}
                  {currentPage === 'kyc' && (
                    <KYC />
                  )}
                  {currentPage === 'fines' && (
                    <Fines />
                  )}
                  {currentPage === 'analytics' && (
                    <Analytics timeSeriesData={timeSeriesData} stats={stats} />
                  )}
                  {currentPage === 'reports' && (
                    <Reports />
                  )}
                  {currentPage === 'settings' && (
                    <Settings />
                  )}
                  {currentPage === 'profile' && (
                    <Profile />
                  )}
                  {currentPage === 'payments' && (
                    <Payments />
                  )}
                  {currentPage === 'marketing' && (
                    <Marketing />
                  )}
                  {currentPage === 'support' && (
                    <Support />
                  )}
                </div>
              </div>

              {/* Right Sidebar - Only visible on Overview page */}
              {currentPage === 'overview' && (
                <div className="space-y-6">
                  {/* Recent Activities */}
                  <div className="card bg-white rounded-xl shadow-md border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-gray-900">Recent Activities</h3>
                      <button className="text-sm text-primary-600 hover:text-primary-700">View All</button>
                    </div>
                    <div className="space-y-4">
                      {recentActivities.length === 0 ? (
                        <div className="text-center py-4 text-gray-500 text-sm">No recent activities</div>
                      ) : (
                        recentActivities.map((activity) => {
                          const Icon = getActivityIcon(activity.type);
                          return (
                            <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                              <div className={`p-2 rounded-lg ${activity.type === 'user' ? 'bg-blue-100' :
                                activity.type === 'order' ? 'bg-green-100' :
                                activity.type === 'product' ? 'bg-purple-100' :
                                  'bg-gray-100'
                                }`}>
                                <Icon className={`text-sm ${activity.type === 'user' ? 'text-blue-600' :
                                  activity.type === 'order' ? 'text-green-600' :
                                  activity.type === 'product' ? 'text-purple-600' :
                                    'text-gray-600'
                                  }`} />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-700">{activity.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="card bg-white rounded-xl shadow-md border border-gray-100">
                    <h3 className="text-base font-bold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <button 
                        onClick={() => navigate('/admin/dashboard/users')}
                        className="w-full btn-outline text-left justify-start hover:bg-blue-50 transition-colors"
                      >
                        <FaUserShield className="mr-2" /> Manage Users
                      </button>
                      <button 
                        onClick={() => navigate('/admin/dashboard/vendors')}
                        className="w-full btn-outline text-left justify-start hover:bg-green-50 transition-colors"
                      >
                        <FaStore className="mr-2" /> Manage Vendors
                      </button>
                      <button 
                        onClick={() => navigate('/admin/dashboard/mechanics')}
                        className="w-full btn-outline text-left justify-start hover:bg-yellow-50 transition-colors"
                      >
                        <FaTools className="mr-2" /> Manage Mechanics
                      </button>
                      <button 
                        onClick={() => navigate('/admin/dashboard/analytics')}
                        className="w-full btn-outline text-left justify-start hover:bg-purple-50 transition-colors"
                      >
                        <FaChartLine className="mr-2" /> View Analytics
                      </button>
                      <button 
                        onClick={() => navigate('/admin/dashboard/settings')}
                        className="w-full btn-outline text-left justify-start hover:bg-gray-50 transition-colors"
                      >
                        <FaCog className="mr-2" /> System Settings
                      </button>
                    </div>
                  </div>

                  {/* System Status */}
                  <div className="card bg-white rounded-xl shadow-md border border-gray-100">
                    <h3 className="text-base font-bold text-gray-900 mb-4">System Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">API Status</span>
                        <span className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            systemStatus.apiStatus === 'Operational' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <span className={`text-sm font-semibold ${
                            systemStatus.apiStatus === 'Operational' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {systemStatus.apiStatus || 'Unknown'}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Database</span>
                        <span className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            systemStatus.database === 'Healthy' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <span className={`text-sm font-semibold ${
                            systemStatus.database === 'Healthy' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {systemStatus.database || 'Unknown'}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Server Load</span>
                        <span className={`text-sm font-semibold ${
                          systemStatus.serverLoad < 50 ? 'text-green-600' :
                          systemStatus.serverLoad < 80 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {systemStatus.serverLoad || 0}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Uptime</span>
                        <span className="text-sm font-semibold text-gray-900">{systemStatus.uptime || '0%'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;

