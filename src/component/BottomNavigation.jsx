import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome,
  FaChevronDown,
  FaChevronRight,
  FaChevronUp,
  FaQuestionCircle,
  FaShoppingCart,
  FaGift,
  FaUser,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const [activeMenu, setActiveMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Mock user state - replace with your actual auth context
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const mockUser = {
    name: "abc xyz",
    email: "abc@example.com",
    avatar: "https://via.placeholder.com/40",
    role: "Customer"
  };

  // Animation variants for dropdowns
  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } }
  };

  // Navigation menu configuration
  const mainMenu = [
    {
      id: 'home',
      name: 'Home',
      icon: FaHome,
      href: '/',
      submenu: []
    },
    {
      id: 'help',
      name: 'Help',
      icon: FaQuestionCircle,
      submenu: [
        { name: 'FAQ', href: '/faq' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Support', href: '/support' },
        { name: 'Return Policy', href: '/return-policy' },
      ]
    },
    {
      id: 'cart',
      name: 'Cart',
      icon: FaShoppingCart,
      href: '/cart',
      submenu: [],
      badge: getTotalItems() > 0 ? getTotalItems() : null
    },
    {
      id: 'lucky-draw',
      name: 'Lucky Draw',
      icon: FaGift,
      href: '/lucky-draw',
      submenu: []
    },
    {
      id: 'account',
      name: 'Account',
      icon: FaUser,
      submenu: [
        { name: 'My Profile', href: '/myprofile' },
        { name: 'My Orders', href: '/myorder' },
        { name: 'My Wishlist', href: '/mywishlist' },
        { name: 'Garage', href: '/garage' },
        { name: 'Addresses', href: '/addresses' },
        { name: 'Company GST', href: '/company_gst' },
        { name: 'Documents', href: '/document' },
      ],
      showUserInfo: true,
    }
  ];

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeMenu !== null && !event.target.closest('.bottom-nav-menu')) {
        setActiveMenu(null);
      }
    };
    if (activeMenu !== null) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeMenu]);

  // Toggle menu handler
  const toggleMenu = useCallback((index) => {
    setActiveMenu(activeMenu === index ? null : index);
  }, [activeMenu]);

  // Handle sign out
  const handleSignOut = useCallback(() => {
    setIsLoggedIn(false);
    setActiveMenu(null);
    navigate('/login');
  }, [navigate]);

  // Check if menu item is active
  const isActive = useCallback((item) => {
    if (item.href) {
      return location.pathname === item.href;
    }
    return false;
  }, [location.pathname]);

  // Check if menu item has submenu
  const hasSubmenu = useCallback((item) => {
    return item.submenu && item.submenu.length > 0;
  }, []);

  // Desktop Navigation Item Component
  const DesktopNavItem = ({ item, index }) => {
    const Icon = item.icon;
    const itemHasSubmenu = hasSubmenu(item);
    const isItemActive = isActive(item);

    if (item.href && !itemHasSubmenu) {
      return (
        <Link to={item.href} className="relative bottom-nav-menu">
          <motion.button
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
              isItemActive
                ? 'bg-gray-200 text-black shadow-lg scale-105'
                : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="text-sm" />
            <span>{item.name}</span>
            {item.badge && (
              <span className="absolute -top-1 -right-1 bg-green-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </motion.button>
        </Link>
      );
    }

    return (
      <div className="relative bottom-nav-menu">
        <motion.button
          onClick={() => toggleMenu(index)}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
            activeMenu === index
              ? 'bg-gray-200 text-black shadow-lg scale-105'
              : 'text-gray-700 hover:bg-gray-100 hover:text-red-600'
          }`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className="text-sm" />
          <span>{item.name}</span>
          {itemHasSubmenu && (
            <motion.div
              animate={{ rotate: activeMenu === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaChevronDown className="text-xs" />
            </motion.div>
          )}
        </motion.button>

        <AnimatePresence>
          {activeMenu === index && itemHasSubmenu && (
            <DesktopDropdown item={item} />
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Desktop Dropdown Component
  const DesktopDropdown = ({ item }) => (
    <motion.div
      variants={item.showUserInfo ? dropdownVariants : undefined}
      initial={item.showUserInfo ? "hidden" : { opacity: 0, y: 10 }}
      animate={item.showUserInfo ? "visible" : { opacity: 1, y: 0 }}
      exit={item.showUserInfo ? "exit" : { opacity: 0, y: 10 }}
      transition={item.showUserInfo ? undefined : { duration: 0.2 }}
      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-gradient-to-b from-white to-gray-50 border border-gray-300 rounded-xl shadow-xl z-40 w-64 overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-0">
        {item.showUserInfo && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 flex items-center space-x-3 px-4 py-4 border-b border-gray-200">
            <img
              src={mockUser.avatar}
              alt={mockUser.name}
              className="w-12 h-12 rounded-full border-2 border-gray-200"
            />
            <div className="flex-1">
              <div className="font-bold text-gray-800 text-sm">{mockUser.name}</div>
              <div className="text-xs text-gray-600">{mockUser.email}</div>
            </div>
          </div>
        )}

        <div className="max-h-72 overflow-y-auto scrollbar-hide">
          {item.submenu.map((subItem, subIndex) => (
            <div key={subIndex} className="relative group/sub">
              <Link
                to={subItem.href || "#"}
                onClick={() => setActiveMenu(null)}
                className="flex items-center justify-between px-4 py-3.5 text-red-600 font-semibold text-sm hover:bg-gray-100 transition-all duration-150 border-b border-gray-100 last:border-0"
              >
                <span>{subItem.name}</span>
                {subItem.submenu && (
                  <FaChevronRight className="text-xs text-gray-400" />
                )}
              </Link>

              {subItem.submenu && (
                <div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-52 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300">
                  <div className="py-2">
                    {subItem.submenu.map((nestedItem, nestedIndex) => (
                      <Link
                        key={nestedIndex}
                        to={nestedItem.href}
                        onClick={() => setActiveMenu(null)}
                        className="block px-4 py-2.5 hover:bg-blue-50 transition-all duration-150 font-medium text-sm text-gray-700"
                      >
                        {nestedItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {item.showUserInfo && (
          <div className="pt-0 border-t border-gray-200">
            <motion.button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center space-x-2 text-red-600 hover:bg-red-50 py-3.5 transition-colors font-semibold"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSignOutAlt className="text-sm" />
              <span className="font-semibold text-sm">Sign Out</span>
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );

  // Mobile Navigation Item Component
  const MobileNavItem = ({ item, index }) => {
    const Icon = item.icon;
    const itemHasSubmenu = hasSubmenu(item);
    const isItemActive = isActive(item);

    if (item.href && !itemHasSubmenu) {
      return (
        <Link to={item.href} className="relative bottom-nav-menu flex-1">
          <motion.button
            className={`flex flex-col items-center justify-center px-2 py-2 rounded-xl transition-all w-full ${
              isItemActive
                ? 'bg-gray-200 text-black shadow-lg'
                : 'text-gray-600 hover:text-red-600'
            }`}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative">
              <Icon className="text-lg mb-1" />
              {item.badge && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-black text-xs rounded-sm w-4 h-4 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">{item.name}</span>
          </motion.button>
        </Link>
      );
    }

    return (
      <div className="relative bottom-nav-menu flex-1">
        <motion.button
          onClick={() => toggleMenu(index)}
          className={`flex flex-col items-center justify-center px-2 py-2 rounded-xl transition-all w-full ${
            activeMenu === index
              ? 'bg-gray-200 text-black shadow-lg'
              : 'text-gray-600 hover:text-red-600'
          }`}
          whileTap={{ scale: 0.9 }}
        >
          <Icon className="text-lg mb-1" />
          <span className="text-xs font-medium">{item.name}</span>
        </motion.button>

        <AnimatePresence>
          {activeMenu === index && itemHasSubmenu && (
            <MobileDropdown item={item} />
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Mobile Dropdown Component
  const MobileDropdown = ({ item }) => {
    const Icon = item.icon;

    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setActiveMenu(null)}
        />
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 max-h-[60vh] overflow-y-auto rounded-t-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Icon className="text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
              </div>
              <button
                onClick={() => setActiveMenu(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-sm hover:bg-gray-100"
              >
                <FaChevronUp />
              </button>
            </div>

            {item.showUserInfo && (
              <div className="flex items-center space-x-3 px-4 py-3 mb-3 bg-gray-50 rounded-lg">
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-12 h-12 rounded-sm"
                />
                <div>
                  <div className="font-semibold text-gray-800">{mockUser.name}</div>
                  <div className="text-sm text-gray-500">{mockUser.email}</div>
                </div>
              </div>
            )}

            <div className="space-y-1">
              {item.submenu.map((subItem, subIndex) => (
                <div key={subIndex}>
                  {subItem.submenu ? (
                    <div className="px-4 py-2 font-semibold text-gray-500 text-sm uppercase tracking-wide">
                      {subItem.name}
                    </div>
                  ) : (
                    <Link
                      to={subItem.href || "#"}
                      onClick={() => setActiveMenu(null)}
                      className="block px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-gray-700 transition-colors"
                    >
                      {subItem.name}
                    </Link>
                  )}
                  {subItem.submenu && (
                    <div className="pl-4 space-y-1">
                      {subItem.submenu.map((nestedItem, nestedIndex) => (
                        <Link
                          key={nestedIndex}
                          to={nestedItem.href}
                          onClick={() => setActiveMenu(null)}
                          className="block px-4 py-2.5 rounded-lg hover:bg-gray-100 text-sm text-gray-600 transition-colors"
                        >
                          {nestedItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {item.showUserInfo && (
              <div className="pt-3 mt-3 border-t border-gray-200">
                <motion.button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaSignOutAlt className="text-sm" />
                  <span className="font-medium">Sign Out</span>
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 py-3">
            {mainMenu.map((item, index) => (
              <DesktopNavItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {mainMenu.map((item, index) => (
            <MobileNavItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
