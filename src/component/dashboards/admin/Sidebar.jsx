import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUsers,
  FaShoppingCart,
  FaStore,
  FaChartLine,
  FaCog,
  FaTools,
  FaBox,
  FaFileInvoice,
  FaBell,
  FaUserShield,
  FaDatabase,
  FaChartBar,
  FaChartPie,
  FaCog as FaSettings,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaCreditCard,
  FaTag,
  FaComments
} from 'react-icons/fa';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: FaHome, path: '/admin/dashboard' },
    { id: 'users', label: 'Users', icon: FaUsers, path: '/admin/dashboard/users' },
    { id: 'orders', label: 'Orders', icon: FaShoppingCart, path: '/admin/dashboard/orders' },
    { id: 'vendors', label: 'Vendors', icon: FaStore, path: '/admin/dashboard/vendors' },
    { id: 'mechanics', label: 'Mechanics', icon: FaTools, path: '/admin/dashboard/mechanics' },
    { id: 'garages', label: 'Garages', icon: FaTools, path: '/admin/dashboard/garages' },
    { id: 'products', label: 'Products', icon: FaBox, path: '/admin/dashboard/products' },
    { id: 'categories', label: 'Categories', icon: FaDatabase, path: '/admin/dashboard/categories' },
    { id: 'payments', label: 'Payments', icon: FaCreditCard, path: '/admin/dashboard/payments' },
    { id: 'marketing', label: 'Marketing', icon: FaTag, path: '/admin/dashboard/marketing' },
    { id: 'support', label: 'Support', icon: FaComments, path: '/admin/dashboard/support' },
    { id: 'lucky-draw', label: 'Lucky Draw', icon: FaChartPie, path: '/admin/dashboard/lucky-draw' },
    { id: 'kyc', label: 'KYC Management', icon: FaUserShield, path: '/admin/dashboard/kyc' },
    { id: 'fines', label: 'Fines & Penalties', icon: FaFileInvoice, path: '/admin/dashboard/fines' },
    { id: 'analytics', label: 'Analytics', icon: FaChartLine, path: '/admin/dashboard/analytics' },
    { id: 'reports', label: 'Reports', icon: FaFileInvoice, path: '/admin/dashboard/reports' },
    { id: 'settings', label: 'Settings', icon: FaSettings, path: '/admin/dashboard/settings' },
  ];

  const isActive = (path) => {
    if (path === '/admin/dashboard') {
      return location.pathname === '/admin/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:sticky lg:top-0 w-64 border-r border-gray-200 shrink-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-base font-bold text-gray-900">Admin Panel</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <FaTimes />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 scrollbar-hide">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        navigate(item.path);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      <Icon className="text-lg" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FaHome className="text-lg" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

