import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useJob } from '../../../contexts/JobContext';
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

  // Simulate dynamic data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Dynamic data generation based on date range
  const generateTimeSeriesData = (days = 30) => {
    const data = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        orders: Math.floor(Math.random() * 200) + 50,
        revenue: Math.floor(Math.random() * 50000) + 10000,
        users: Math.floor(Math.random() * 50) + 10,
      });
    }
    return data;
  };

  const timeSeriesData = useMemo(() => generateTimeSeriesData(
    dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90
  ), [dateRange, refreshKey]);

  const stats = useMemo(() => {
    // Calculate dynamic stats from actual data
    const totalUsers = Math.floor(Math.random() * 5000) + 10000;
    const totalVendors = Math.floor(Math.random() * 200) + 1000;
    const totalMechanics = Math.floor(Math.random() * 200) + 500;
    const totalOrders = timeSeriesData.reduce((sum, d) => sum + d.orders, 0);
    const totalRevenue = timeSeriesData.reduce((sum, d) => sum + d.revenue, 0);
    const totalProducts = Math.floor(Math.random() * 10000) + 80000;
    const activeJobs = jobs.filter(j => j.status !== 'completed' && j.status !== 'cancelled').length;
    const completedJobs = jobs.filter(j => j.status === 'completed').length;

    // Calculate changes (simulated)
    const changes = {
      users: (Math.random() * 20 + 5).toFixed(1),
      vendors: (Math.random() * 15 + 3).toFixed(1),
      mechanics: (Math.random() * 25 + 8).toFixed(1),
      orders: (Math.random() * 30 + 10).toFixed(1),
      revenue: (Math.random() * 25 + 12).toFixed(1),
      products: (Math.random() * 10 + 2).toFixed(1),
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
        change: `+${calculated.changes.users}%`,
        trend: 'up'
      },
      { 
        label: 'Vendors', 
        value: calculated.totalVendors.toLocaleString(), 
        icon: FaStore, 
        color: 'bg-green-500', 
        change: `+${calculated.changes.vendors}%`,
        trend: 'up'
      },
      { 
        label: 'Mechanics', 
        value: calculated.totalMechanics.toLocaleString(), 
        icon: FaTools, 
        color: 'bg-yellow-500', 
        change: `+${calculated.changes.mechanics}%`,
        trend: 'up'
      },
      { 
        label: 'Total Orders', 
        value: calculated.totalOrders.toLocaleString(), 
        icon: FaShoppingCart, 
        color: 'bg-purple-500', 
        change: `+${calculated.changes.orders}%`,
        trend: 'up'
      },
      { 
        label: 'Revenue', 
        value: `₹${(calculated.totalRevenue / 1000000).toFixed(2)}M`, 
        icon: FaMoneyBillWave, 
        color: 'bg-red-500', 
        change: `+${calculated.changes.revenue}%`,
        trend: 'up'
      },
      { 
        label: 'Products', 
        value: calculated.totalProducts.toLocaleString(), 
        icon: FaBox, 
        color: 'bg-indigo-500', 
        change: `+${calculated.changes.products}%`,
        trend: 'up'
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
  }, [timeSeriesData, jobs]);

  // Generate recent activities dynamically
  const recentActivities = useMemo(() => {
    const activities = [
      { id: 1, type: 'user', message: 'New vendor registered: ABC Auto Parts', time: '2 minutes ago', icon: FaStore },
      { id: 2, type: 'order', message: 'Large order placed: ₹45,000', time: '15 minutes ago', icon: FaShoppingCart },
      { id: 3, type: 'user', message: 'New mechanic joined: John Smith', time: '1 hour ago', icon: FaTools },
      { id: 4, type: 'system', message: 'System backup completed', time: '2 hours ago', icon: FaCheckCircle },
      { id: 5, type: 'order', message: 'Order #ORD-1234 delivered successfully', time: '3 hours ago', icon: FaCheckCircle },
      { id: 6, type: 'user', message: '5 new customers registered', time: '4 hours ago', icon: FaUsers },
    ];
    return activities;
  }, []);

  // Top performing vendors
  const topVendors = useMemo(() => {
    return [
      { id: 1, name: 'Auto Parts Hub', orders: 1234, revenue: '₹2.5M', rating: 4.8, status: 'active' },
      { id: 2, name: 'Premium Spares', orders: 987, revenue: '₹1.9M', rating: 4.7, status: 'active' },
      { id: 3, name: 'Quick Auto Solutions', orders: 756, revenue: '₹1.5M', rating: 4.6, status: 'active' },
      { id: 4, name: 'Genuine Parts Store', orders: 654, revenue: '₹1.2M', rating: 4.9, status: 'active' },
      { id: 5, name: 'Budget Auto Parts', orders: 543, revenue: '₹980K', rating: 4.5, status: 'active' },
    ];
  }, []);

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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64 bg-gray-50">
      {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
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
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? FaArrowUp : stat.trend === 'down' ? FaArrowDown : null;
            return (
              <div key={index} className="card-hover bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                    <div className="flex items-center gap-2">
                      {TrendIcon && (
                        <TrendIcon className={`text-sm ${
                          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      )}
                      <p className={`text-sm font-semibold ${
                        stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {stat.change}
                      </p>
                      <span className="text-xs text-gray-500">from last month</span>
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
                      topVendors={topVendors}
                      recentActivities={recentActivities}
                    />
                  )}
                  {currentPage === 'users' && (
                    <Users usersData={usersData} />
                  )}
                  {currentPage === 'orders' && (
                    <Orders ordersData={ordersData} />
                  )}
                  {currentPage === 'vendors' && (
                    <Vendors topVendors={topVendors} />
                  )}
                  {currentPage === 'garages' && (
                    <Garages />
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
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'user' ? 'bg-blue-100' :
                        activity.type === 'order' ? 'bg-green-100' :
                        'bg-gray-100'
                      }`}>
                        <Icon className={`text-sm ${
                          activity.type === 'user' ? 'text-blue-600' :
                          activity.type === 'order' ? 'text-green-600' :
                          'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card bg-white rounded-xl shadow-md border border-gray-100">
              <h3 className="text-base font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full btn-outline text-left justify-start">
                  <FaUserShield className="mr-2" /> Manage Users
                </button>
                <button className="w-full btn-outline text-left justify-start">
                  <FaStore className="mr-2" /> Manage Vendors
                </button>
                <button className="w-full btn-outline text-left justify-start">
                  <FaTools className="mr-2" /> Manage Mechanics
                </button>
                <button className="w-full btn-outline text-left justify-start">
                  <FaChartLine className="mr-2" /> View Analytics
                </button>
                <button className="w-full btn-outline text-left justify-start">
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
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-green-600">Operational</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-green-600">Healthy</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Server Load</span>
                  <span className="text-sm font-semibold text-gray-900">42%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <span className="text-sm font-semibold text-gray-900">99.9%</span>
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

