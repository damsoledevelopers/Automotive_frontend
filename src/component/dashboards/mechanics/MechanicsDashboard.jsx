import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useJob } from '../../../contexts/JobContext';
import Sidebar from './Sidebar';
import Overview from './pages/Overview';
import Jobs from './pages/Jobs';
import Appointments from './pages/Appointments';
import History from './pages/History';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import {
  FaWrench,
  FaCar,
  FaShoppingCart,
  FaCalendar,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSignOutAlt,
  FaHome,
  FaUser,
  FaBell,
  FaPlus,
  FaChartLine,
  FaChartBar,
  FaArrowUp,
  FaArrowDown,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaMoneyBillWave,
  FaTools,
  FaExclamationTriangle,
  FaDownload,
  FaFilter,
  FaEye,
  FaEdit,
  FaFileInvoice,
  FaBars,
  FaChevronDown,
  FaSignInAlt
} from 'react-icons/fa';

const MechanicsDashboard = () => {
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

  // Generate time series data
  const generateTimeSeriesData = (days = 30) => {
    const data = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        jobs: Math.floor(Math.random() * 10) + 2,
        earnings: Math.floor(Math.random() * 5000) + 1000,
        completed: Math.floor(Math.random() * 8) + 1,
      });
    }
    return data;
  };

  const timeSeriesData = useMemo(() => generateTimeSeriesData(
    dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90
  ), [dateRange, refreshKey]);

  // Calculate dynamic stats from actual jobs
  const calculateStats = () => {
    const activeJobs = jobs.filter(j => j.status !== 'completed' && j.status !== 'cancelled').length;
    const completedToday = jobs.filter(j => {
      if (!j.completedAt) return false;
      const completed = new Date(j.completedAt);
      const today = new Date();
      return completed.toDateString() === today.toDateString();
    }).length;
    const pendingOrders = Math.floor(Math.random() * 10) + 3;
    const totalEarnings = timeSeriesData.reduce((sum, d) => sum + d.earnings, 0);
    const totalCompleted = timeSeriesData.reduce((sum, d) => sum + d.completed, 0);
    const avgRating = (Math.random() * 0.5 + 4.5).toFixed(1);
    const totalJobs = jobs.length;
    const thisMonthEarnings = timeSeriesData.slice(-30).reduce((sum, d) => sum + d.earnings, 0);

    const changes = {
      jobs: (Math.random() * 20 + 5).toFixed(1),
      earnings: (Math.random() * 25 + 10).toFixed(1),
      completed: (Math.random() * 15 + 3).toFixed(1),
    };

    return {
      activeJobs,
      completedToday,
      pendingOrders,
      totalEarnings,
      totalCompleted,
      avgRating,
      totalJobs,
      thisMonthEarnings,
      changes,
    };
  };

  const stats = useMemo(() => {
    const calculated = calculateStats();
    return [
      { 
        label: 'Active Jobs', 
        value: calculated.activeJobs.toString(), 
        icon: FaWrench, 
        color: 'bg-blue-500',
        change: `${calculated.activeJobs} ongoing`,
        trend: 'neutral'
      },
      { 
        label: 'Completed Today', 
        value: calculated.completedToday.toString(), 
        icon: FaCheckCircle, 
        color: 'bg-green-500',
        change: `+${calculated.changes.completed}%`,
        trend: 'up'
      },
      { 
        label: 'Pending Orders', 
        value: calculated.pendingOrders.toString(), 
        icon: FaShoppingCart, 
        color: 'bg-yellow-500',
        change: 'Parts needed',
        trend: 'neutral'
      },
      { 
        label: 'Total Earnings', 
        value: `₹${(calculated.totalEarnings / 1000).toFixed(0)}K`, 
        icon: FaMoneyBillWave, 
        color: 'bg-purple-500',
        change: `+${calculated.changes.earnings}%`,
        trend: 'up'
      },
      { 
        label: 'This Month', 
        value: `₹${(calculated.thisMonthEarnings / 1000).toFixed(0)}K`, 
        icon: FaChartLine, 
        color: 'bg-indigo-500',
        change: 'Earnings',
        trend: 'neutral'
      },
      { 
        label: 'Avg Rating', 
        value: calculated.avgRating, 
        icon: FaStar, 
        color: 'bg-yellow-400',
        change: 'Customer rating',
        trend: 'neutral'
      },
    ];
  }, [timeSeriesData, jobs, refreshKey]);

  // Get active jobs from context
  const activeJobs = useMemo(() => {
    return jobs
      .filter(job => job.status !== 'completed' && job.status !== 'cancelled')
      .slice(0, 10)
      .map(job => ({
        id: job.id,
        vehicle: `${job.vehicle?.make || ''} ${job.vehicle?.model || ''} ${job.vehicle?.variant || ''}`.trim() || 'Vehicle',
        service: job.symptoms || 'General Service',
        customer: job.customerName || 'Customer',
        status: job.status,
        time: job.createdAt ? new Date(job.createdAt).toLocaleString() : 'Recently',
        priority: job.priority || 'normal',
        estimatedTime: job.estimatedTime || '2-3 hours',
      }));
  }, [jobs, refreshKey]);

  // Generate upcoming appointments
  const upcomingAppointments = useMemo(() => {
    const appointments = [
      { id: 1, date: '2024-01-16', time: '10:00 AM', vehicle: 'Tata Nexon', service: 'Full Service', customer: 'Alice Brown', phone: '+91 98765 43210', status: 'confirmed' },
      { id: 2, date: '2024-01-16', time: '2:00 PM', vehicle: 'Mahindra XUV', service: 'Engine Check', customer: 'Charlie Wilson', phone: '+91 98765 43211', status: 'confirmed' },
      { id: 3, date: '2024-01-17', time: '9:00 AM', vehicle: 'Toyota Innova', service: 'Battery Replacement', customer: 'David Lee', phone: '+91 98765 43212', status: 'pending' },
      { id: 4, date: '2024-01-17', time: '3:00 PM', vehicle: 'Maruti Swift', service: 'AC Service', customer: 'Emma Davis', phone: '+91 98765 43213', status: 'confirmed' },
    ];
    return appointments;
  }, [refreshKey]);

  // Job history
  const jobHistory = useMemo(() => {
    return jobs
      .filter(job => job.status === 'completed')
      .slice(0, 10)
      .map(job => ({
        id: job.id,
        vehicle: `${job.vehicle?.make || ''} ${job.vehicle?.model || ''}`.trim() || 'Vehicle',
        service: job.symptoms || 'General Service',
        customer: job.customerName || 'Customer',
        completedAt: job.completedAt || job.createdAt,
        amount: job.estimate?.total || Math.floor(Math.random() * 10000) + 2000,
        rating: (Math.random() * 1 + 4).toFixed(1),
      }));
  }, [jobs, refreshKey]);

  // Earnings chart component
  const EarningsChart = () => {
    const maxEarnings = Math.max(...timeSeriesData.map(d => d.earnings));
    return (
      <div className="space-y-2">
        <div className="flex items-end justify-between h-32 gap-1">
          {timeSeriesData.slice(-7).map((data, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-purple-500 to-purple-300 rounded-t transition-all hover:opacity-80"
                style={{ height: `${(data.earnings / maxEarnings) * 100}%` }}
                title={`₹${data.earnings.toLocaleString()}`}
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

  // Jobs completed chart
  const JobsChart = () => {
    const maxJobs = Math.max(...timeSeriesData.map(d => d.completed));
    return (
      <div className="space-y-2">
        <div className="flex items-end justify-between h-32 gap-1">
          {timeSeriesData.slice(-7).map((data, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t transition-all hover:opacity-80"
                style={{ height: `${(data.completed / maxJobs) * 100}%` }}
                title={`${data.completed} jobs`}
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

  // Determine which page to show based on location
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/mechanics/dashboard' || path === '/mechanics/dashboard/') return 'overview';
    if (path.includes('/profile')) return 'profile';
    if (path.includes('/jobs')) return 'jobs';
    if (path.includes('/appointments')) return 'appointments';
    if (path.includes('/history')) return 'history';
    if (path.includes('/analytics')) return 'analytics';
    if (path.includes('/settings')) return 'settings';
    return 'overview';
  };

  const currentPage = getCurrentPage();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
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
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">Mechanics Dashboard</h1>
                  <p className="text-sm text-gray-600">Welcome back, {user?.name || 'Mechanic'}</p>
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
                    <span className="hidden md:inline text-sm font-medium text-gray-700">{user?.name || 'Mechanic'}</span>
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
                            <p className="font-semibold text-gray-900 text-sm">{user?.name || 'Mechanic'}</p>
                            <p className="text-xs text-gray-600">{user?.email || 'mechanic@example.com'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => {
                            navigate('/mechanics/dashboard/profile');
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

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {/* Stats Grid - Only visible on Overview page */}
          {currentPage === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                          {stat.trend !== 'neutral' && <span className="text-xs text-gray-500">from last month</span>}
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

          {/* Page Content */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            {currentPage === 'overview' && (
              <Overview 
                timeSeriesData={timeSeriesData}
                dateRange={dateRange}
                activeJobs={activeJobs}
                EarningsChart={EarningsChart}
                JobsChart={JobsChart}
              />
            )}

            {currentPage === 'jobs' && (
              <Jobs activeJobs={activeJobs} />
            )}

            {currentPage === 'appointments' && (
              <Appointments upcomingAppointments={upcomingAppointments} />
            )}

            {currentPage === 'history' && (
              <History jobHistory={jobHistory} />
            )}

            {currentPage === 'analytics' && (
              <Analytics 
                jobs={jobs}
                timeSeriesData={timeSeriesData}
                stats={stats}
              />
            )}

            {currentPage === 'settings' && (
              <Settings />
            )}

            {currentPage === 'profile' && (
              <Profile />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MechanicsDashboard;
