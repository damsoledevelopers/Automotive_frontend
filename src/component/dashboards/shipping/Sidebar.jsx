import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaTruck,
  FaMapMarkerAlt,
  FaSearch,
  FaChartLine,
  FaCog,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: FaHome, path: '/shipping/dashboard' },
    { id: 'deliveries', label: 'Deliveries', icon: FaTruck, path: '/shipping/dashboard/deliveries' },
    { id: 'routes', label: 'Routes', icon: FaMapMarkerAlt, path: '/shipping/dashboard/routes' },
    { id: 'tracking', label: 'Tracking', icon: FaSearch, path: '/shipping/dashboard/tracking' },
    { id: 'performance', label: 'Performance', icon: FaChartLine, path: '/shipping/dashboard/performance' },
    { id: 'settings', label: 'Settings', icon: FaCog, path: '/shipping/dashboard/settings' },
  ];

  const isActive = (path) => {
    if (path === '/shipping/dashboard') {
      return location.pathname === '/shipping/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto w-64 border-r border-gray-200`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Shipping</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <FaTimes />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
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
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        active
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

