import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { productService } from '../../../services/apiService';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Overview from './pages/Overview';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Analytics from './pages/Analytics';
import Inventory from './pages/Inventory';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import {
  FaBox,
  FaShoppingCart,
  FaMoneyBillWave,
  FaChartLine,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaHome,
  FaWarehouse,
  FaUsers,
  FaBell,
  FaArrowUp,
  FaArrowDown,
  FaFilter,
  FaDownload,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaChartBar,
  FaChartPie,
  FaStar,
  FaImage,
  FaTag,
  FaBarcode,
  FaExclamationTriangle,
  FaCheck,
  FaTimes,
  FaBars,
  FaUser,
  FaChevronDown,
  FaSignInAlt
} from 'react-icons/fa';

const VendorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState('30d');
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [vendorProducts, setVendorProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  // Fetch vendor products
  useEffect(() => {
    fetchVendorProducts();
  }, []);

  // Simulate dynamic data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchVendorProducts = async () => {
    try {
      setProductsLoading(true);
      const response = await productService.getVendorProducts();
      const productsData = response.products || response.data?.products || [];
      
      // Transform products to match the expected format
      const transformedProducts = productsData.map(product => ({
        id: product._id || product.id,
        _id: product._id || product.id,
        name: product.name,
        sku: product.sku || '',
        stock: product.stock || 0,
        price: product.price || 0,
        status: product.approved ? 'Active' : (product.stock > 0 ? 'Pending Approval' : 'Out of Stock'),
        category: product.category || 'Other',
        sales: 0, // Can be calculated from orders later
        rating: 4.5, // Default rating
        brand: product.brand || '',
        partNumber: product.partNumber || '',
        approved: product.approved || false,
        images: product.images || []
      }));
      
      setVendorProducts(transformedProducts);
    } catch (error) {
      console.error('Error fetching vendor products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setProductsLoading(false);
    }
  };

  // Generate time series data
  const generateTimeSeriesData = (days = 30) => {
    const data = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        sales: Math.floor(Math.random() * 50) + 10,
        revenue: Math.floor(Math.random() * 100000) + 20000,
        orders: Math.floor(Math.random() * 30) + 5,
      });
    }
    return data;
  };

  const timeSeriesData = useMemo(() => generateTimeSeriesData(
    dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90
  ), [dateRange, refreshKey]);

  // Calculate dynamic stats
  const calculateStats = () => {
    const totalProducts = Math.floor(Math.random() * 500) + 1000;
    const totalOrders = timeSeriesData.reduce((sum, d) => sum + d.orders, 0);
    const totalRevenue = timeSeriesData.reduce((sum, d) => sum + d.revenue, 0);
    const stockValue = Math.floor(Math.random() * 500000) + 1500000;
    const lowStockItems = Math.floor(Math.random() * 20) + 5;
    const pendingOrders = Math.floor(Math.random() * 15) + 3;
    const completedOrders = Math.floor(Math.random() * 100) + 200;

    const changes = {
      products: (Math.random() * 15 + 5).toFixed(1),
      orders: (Math.random() * 25 + 8).toFixed(1),
      revenue: (Math.random() * 20 + 10).toFixed(1),
      stock: (Math.random() * 10 + 2).toFixed(1),
    };

    return {
      totalProducts,
      totalOrders,
      totalRevenue,
      stockValue,
      lowStockItems,
      pendingOrders,
      completedOrders,
      changes,
    };
  };

  const stats = useMemo(() => {
    const calculated = calculateStats();
    return [
      {
        label: 'Total Products',
        value: calculated.totalProducts.toLocaleString(),
        icon: FaBox,
        color: 'bg-blue-500',
        change: `+${calculated.changes.products}%`,
        trend: 'up'
      },
      {
        label: 'Orders',
        value: calculated.totalOrders.toLocaleString(),
        icon: FaShoppingCart,
        color: 'bg-green-500',
        change: `+${calculated.changes.orders}%`,
        trend: 'up'
      },
      {
        label: 'Revenue',
        value: `₹${(calculated.totalRevenue / 1000000).toFixed(2)}M`,
        icon: FaMoneyBillWave,
        color: 'bg-yellow-500',
        change: `+${calculated.changes.revenue}%`,
        trend: 'up'
      },
      {
        label: 'Stock Value',
        value: `₹${(calculated.stockValue / 1000000).toFixed(2)}M`,
        icon: FaWarehouse,
        color: 'bg-purple-500',
        change: `+${calculated.changes.stock}%`,
        trend: 'up'
      },
      {
        label: 'Low Stock Items',
        value: calculated.lowStockItems.toString(),
        icon: FaExclamationTriangle,
        color: 'bg-red-500',
        change: 'Needs attention',
        trend: 'neutral'
      },
      {
        label: 'Pending Orders',
        value: calculated.pendingOrders.toString(),
        icon: FaClock,
        color: 'bg-orange-500',
        change: 'To process',
        trend: 'neutral'
      },
    ];
  }, [timeSeriesData, refreshKey]);

  // Products data - use fetched products from API
  const products = useMemo(() => {
    if (searchTerm) {
      return vendorProducts.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return vendorProducts;
  }, [vendorProducts, searchTerm]);

  // Recent orders
  const recentOrders = useMemo(() => {
    return [
      { id: 1, orderId: 'ORD-001', customer: 'John Doe', amount: 5000, status: 'Pending', date: '2024-01-15', items: 3, payment: 'Pending' },
      { id: 2, orderId: 'ORD-002', customer: 'Jane Smith', amount: 8500, status: 'Shipped', date: '2024-01-14', items: 5, payment: 'Paid' },
      { id: 3, orderId: 'ORD-003', customer: 'Bob Johnson', amount: 3200, status: 'Delivered', date: '2024-01-13', items: 2, payment: 'Paid' },
      { id: 4, orderId: 'ORD-004', customer: 'Alice Brown', amount: 12000, status: 'Processing', date: '2024-01-15', items: 8, payment: 'Paid' },
      { id: 5, orderId: 'ORD-005', customer: 'Charlie Wilson', amount: 6800, status: 'Pending', date: '2024-01-14', items: 4, payment: 'Pending' },
    ];
  }, [refreshKey]);

  // Top selling products
  const topSelling = useMemo(() => {
    return products
      .filter(p => p.status === 'Active')
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);
  }, [products]);

  // Determine which page to show based on location
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/vendor/dashboard' || path === '/vendor/dashboard/') return 'overview';
    if (path.includes('/profile')) return 'profile';
    if (path.includes('/products')) return 'products';
    if (path.includes('/orders')) return 'orders';
    if (path.includes('/inventory')) return 'inventory';
    if (path.includes('/analytics')) return 'analytics';
    if (path.includes('/settings')) return 'settings';
    return 'overview';
  };

  const currentPage = getCurrentPage();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Reset avatar error when user changes
  useEffect(() => {
    setAvatarError(false);
  }, [user?.avatar]);

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
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
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
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
                  <p className="text-sm text-gray-600">Welcome back, {user?.name || 'Vendor'}</p>
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
                    {user?.avatar && !avatarError ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-8 h-8 rounded-full border-2 border-gray-300"
                        onError={() => setAvatarError(true)}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full border-2 border-gray-300 bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                        {(user?.name || 'V').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="hidden md:inline text-sm font-medium text-gray-700">{user?.name || 'Vendor'}</span>
                    <FaChevronDown className="text-xs text-gray-500" />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          {user?.avatar && !avatarError ? (
                            <img
                              src={user.avatar}
                              alt="Profile"
                              className="w-10 h-10 rounded-full border-2 border-gray-300"
                              onError={() => setAvatarError(true)}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full border-2 border-gray-300 bg-blue-500 flex items-center justify-center text-white font-semibold">
                              {(user?.name || 'V').charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{user?.name || 'Vendor'}</p>
                            <p className="text-xs text-gray-600">{user?.email || 'vendor@example.com'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => {
                            navigate('/vendor/dashboard/profile');
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
                              <TrendIcon className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                }`} />
                            )}
                            <p className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
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

            <div className={`grid grid-cols-1 ${currentPage === 'overview' ? 'lg:grid-cols-3' : ''} gap-6`}>
              {/* Main Content */}
              <div className={currentPage === 'overview' ? 'lg:col-span-2 space-y-6' : 'space-y-6'}>
                <div className="card bg-white rounded-xl shadow-md border border-gray-100 p-6">
                  {currentPage === 'overview' && (
                    <Overview
                      timeSeriesData={timeSeriesData}
                      dateRange={dateRange}
                      recentOrders={recentOrders}
                    />
                  )}
                  {currentPage === 'products' && (
                    <Products
                      products={products}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      onProductAdded={fetchVendorProducts}
                    />
                  )}
                  {currentPage === 'orders' && (
                    <Orders recentOrders={recentOrders} />
                  )}
                  {currentPage === 'inventory' && (
                    <Inventory products={products} />
                  )}
                  {currentPage === 'analytics' && (
                    <Analytics timeSeriesData={timeSeriesData} products={products} />
                  )}
                  {currentPage === 'settings' && (
                    <Settings />
                  )}
                  {currentPage === 'profile' && (
                    <Profile />
                  )}
                </div>
              </div>

              {/* Right Sidebar - Only visible on Overview page */}
              {currentPage === 'overview' && (
                <div className="space-y-6">

                  {/* Top Selling Products */}
                  <div className="card bg-white rounded-xl shadow-md border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Top Selling Products</h3>
                    <div className="space-y-3">
                      {topSelling.map((product, idx) => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
                              {idx + 1}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                              <p className="text-xs text-gray-600">{product.sales} sales</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400 text-xs" />
                            <span className="text-xs text-gray-600">{product.rating}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Account Info */}
                  <div className="card bg-white rounded-xl shadow-md border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Account Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="text-sm font-semibold text-gray-900">{user?.email || 'vendor@example.com'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Account Type</p>
                        <p className="text-sm font-semibold text-gray-900 capitalize">{user?.role || 'Vendor'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Store Status</p>
                        <span className="inline-flex items-center gap-2 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          <FaCheckCircle /> Active
                        </span>
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

export default VendorDashboard;
