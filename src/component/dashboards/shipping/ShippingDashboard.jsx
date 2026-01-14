import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Overview from './pages/Overview';
import Deliveries from './pages/Deliveries';
import Routes from './pages/Routes';
import Tracking from './pages/Tracking';
import Performance from './pages/Performance';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import {
  FaBars,
  FaSignOutAlt,
  FaBell,
  FaArrowUp,
  FaArrowDown,
  FaTruck,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaUser,
  FaChevronDown,
  FaSignInAlt
} from 'react-icons/fa';

const ShippingDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState('30d');
  const [refreshKey, setRefreshKey] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const generateTimeSeriesData = (days = 30) => {
    const data = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        deliveries: Math.floor(Math.random() * 50) + 20,
        onTime: Math.floor(Math.random() * 45) + 18,
        delayed: Math.floor(Math.random() * 5) + 1,
      });
    }
    return data;
  };

  const timeSeriesData = useMemo(() => generateTimeSeriesData(
    dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90
  ), [dateRange, refreshKey]);

  const calculateStats = () => {
    const totalDeliveries = timeSeriesData.reduce((sum, d) => sum + d.deliveries, 0);
    const onTimeDeliveries = timeSeriesData.reduce((sum, d) => sum + d.onTime, 0);
    const delayedDeliveries = timeSeriesData.reduce((sum, d) => sum + d.delayed, 0);
    const onTimeRate = ((onTimeDeliveries / totalDeliveries) * 100).toFixed(1);
    const activeRoutes = Math.floor(Math.random() * 10) + 5;
    const pendingDeliveries = Math.floor(Math.random() * 25) + 10;

    const changes = {
      deliveries: (Math.random() * 15 + 5).toFixed(1),
      onTime: (Math.random() * 10 + 2).toFixed(1),
      routes: (Math.random() * 8 + 2).toFixed(1),
    };

    return {
      totalDeliveries,
      onTimeDeliveries,
      delayedDeliveries,
      onTimeRate,
      activeRoutes,
      pendingDeliveries,
      changes,
    };
  };

  const stats = useMemo(() => {
    const calculated = calculateStats();
    return [
      {
        label: 'Total Deliveries',
        value: calculated.totalDeliveries,
        change: `+${calculated.changes.deliveries}%`,
        trend: 'up',
        color: 'bg-blue-500',
        icon: FaTruck,
      },
      {
        label: 'On-Time Rate',
        value: `${calculated.onTimeRate}%`,
        change: `+${calculated.changes.onTime}%`,
        trend: 'up',
        color: 'bg-green-500',
        icon: FaCheckCircle,
      },
      {
        label: 'Active Routes',
        value: calculated.activeRoutes,
        change: `+${calculated.changes.routes}%`,
        trend: 'up',
        color: 'bg-purple-500',
        icon: FaMapMarkerAlt,
      },
      {
        label: 'Pending Deliveries',
        value: calculated.pendingDeliveries,
        change: `-${(Math.random() * 5 + 2).toFixed(1)}%`,
        trend: 'down',
        color: 'bg-orange-500',
        icon: FaClock,
      },
    ];
  }, [timeSeriesData, refreshKey]);

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

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/shipping/dashboard' || path === '/shipping/dashboard/') return 'overview';
    if (path.includes('/profile')) return 'profile';
    if (path.includes('/deliveries')) return 'deliveries';
    if (path.includes('/routes')) return 'routes';
    if (path.includes('/tracking')) return 'tracking';
    if (path.includes('/performance')) return 'performance';
    if (path.includes('/settings')) return 'settings';
    return 'overview';
  };

  const currentPage = getCurrentPage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col lg:ml-0">
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
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">Shipping Dashboard</h1>
                  <p className="text-sm text-gray-600">Welcome back, {user?.name || 'Shipping Manager'}</p>
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
                    <span className="hidden md:inline text-sm font-medium text-gray-700">{user?.name || 'Shipping'}</span>
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
                            <p className="font-semibold text-gray-900 text-sm">{user?.name || 'Shipping'}</p>
                            <p className="text-xs text-gray-600">{user?.email || 'shipping@example.com'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => {
                            navigate('/shipping/dashboard/profile');
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

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8">
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
                          <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
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
                          <Icon className="text-3xl" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="space-y-6">
              {currentPage === 'overview' && (
                <Overview timeSeriesData={timeSeriesData} stats={stats} />
              )}
              {currentPage === 'deliveries' && (
                <Deliveries />
              )}
              {currentPage === 'routes' && (
                <Routes />
              )}
              {currentPage === 'tracking' && (
                <Tracking />
              )}
              {currentPage === 'performance' && (
                <Performance timeSeriesData={timeSeriesData} />
              )}
              {currentPage === 'settings' && (
                <Settings />
              )}
              {currentPage === 'profile' && (
                <Profile />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShippingDashboard;

