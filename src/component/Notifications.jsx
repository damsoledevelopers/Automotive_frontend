import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaCheckCircle, FaShoppingCart, FaTruck, FaTag, FaCreditCard, FaInfoCircle, FaGift, FaCheck, FaClock, FaWrench, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const navigate = useNavigate();
  
  // Vehicle maintenance data (in a real app, this would come from a database/API)
  const vehicleData = {
    lastServiceDate: new Date('2024-10-15'), // Last service date
    lastServiceMileage: 45000, // Mileage at last service
    currentMileage: 49900, // Current mileage
    vehicleModel: 'Honda City',
    // Track when each component was last changed (in km)
    componentLastChanged: {
      brakePads: 0, // Brake pads changed when new - due at 50,000 km (100 km from current)
      engineOil: 49000, // Engine oil changed at 49,000 km
      airFilter: 48000, // Air filter changed at 48,000 km
      transmissionFluid: 42000, // Transmission fluid changed at 42,000 km
      coolant: 47000, // Coolant changed at 47,000 km
    }
  };

  // Maintenance intervals (in km)
  const maintenanceIntervals = {
    brakePads: 50000, // Replace every 50,000 km
    engineOil: 10000, // Change every 10,000 km
    airFilter: 20000, // Replace every 20,000 km
    sparkPlugs: 60000, // Replace every 60,000 km
    timingBelt: 80000, // Replace every 80,000 km
    transmissionFluid: 40000, // Change every 40,000 km
    coolant: 30000, // Change every 30,000 km
  };

  // Calculate predictive maintenance alerts
  const calculateMaintenanceAlerts = () => {
    const alerts = [];

    // Brake Pads Check
    const brakePadsLastChanged = vehicleData.componentLastChanged.brakePads;
    const brakePadsNextService = brakePadsLastChanged + maintenanceIntervals.brakePads;
    const brakePadsRemaining = brakePadsNextService - vehicleData.currentMileage;
    if (brakePadsRemaining <= 1000 && brakePadsRemaining > 0) {
      alerts.push({
        id: 'maintenance-brake',
        type: 'maintenance',
        title: 'Brake Pads Maintenance',
        message: `Your **brake pads** may need replacement within **${brakePadsRemaining} km**. Last service: **${vehicleData.lastServiceMileage.toLocaleString()} km**.`,
        time: 'Just now',
        read: false,
        date: 'today',
        icon: <FaWrench className="text-lg" />,
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
        priority: 'high'
      });
    }

    // Engine Oil Check
    const engineOilLastChanged = vehicleData.componentLastChanged.engineOil;
    const engineOilNextService = engineOilLastChanged + maintenanceIntervals.engineOil;
    const engineOilRemaining = engineOilNextService - vehicleData.currentMileage;
    if (engineOilRemaining <= 1000 && engineOilRemaining > 0) {
      alerts.push({
        id: 'maintenance-oil',
        type: 'maintenance',
        title: 'Engine Oil Change',
        message: `Your **engine oil** should be changed within **${engineOilRemaining} km**. Last change: **${engineOilLastChanged.toLocaleString()} km**.`,
        time: 'Just now',
        read: false,
        date: 'today',
        icon: <FaWrench className="text-lg" />,
        iconBg: 'bg-orange-100',
        priority: 'high'
      });
    }

    // Air Filter Check
    const airFilterLastChanged = vehicleData.componentLastChanged.airFilter;
    const airFilterNextService = airFilterLastChanged + maintenanceIntervals.airFilter;
    const airFilterRemaining = airFilterNextService - vehicleData.currentMileage;
    if (airFilterRemaining <= 2000 && airFilterRemaining > 0) {
      alerts.push({
        id: 'maintenance-airfilter',
        type: 'maintenance',
        title: 'Air Filter Replacement',
        message: `Your **air filter** may need replacement within **${airFilterRemaining} km**. Last replacement: **${airFilterLastChanged.toLocaleString()} km**.`,
        time: 'Just now',
        read: false,
        date: 'today',
        icon: <FaWrench className="text-lg" />,
        iconBg: 'bg-orange-100',
        priority: 'medium'
      });
    }

    // Transmission Fluid Check
    const transmissionLastChanged = vehicleData.componentLastChanged.transmissionFluid;
    const transmissionNextService = transmissionLastChanged + maintenanceIntervals.transmissionFluid;
    const transmissionRemaining = transmissionNextService - vehicleData.currentMileage;
    if (transmissionRemaining <= 2000 && transmissionRemaining > 0) {
      alerts.push({
        id: 'maintenance-transmission',
        type: 'maintenance',
        title: 'Transmission Fluid Service',
        message: `Your **transmission fluid** should be changed within **${transmissionRemaining} km**. Last service: **${transmissionLastChanged.toLocaleString()} km**.`,
        time: 'Just now',
        read: false,
        date: 'today',
        icon: <FaWrench className="text-lg" />,
        iconBg: 'bg-orange-100',
        priority: 'medium'
      });
    }

    // Coolant Check
    const coolantLastChanged = vehicleData.componentLastChanged.coolant;
    const coolantNextService = coolantLastChanged + maintenanceIntervals.coolant;
    const coolantRemaining = coolantNextService - vehicleData.currentMileage;
    if (coolantRemaining <= 2000 && coolantRemaining > 0) {
      alerts.push({
        id: 'maintenance-coolant',
        type: 'maintenance',
        title: 'Coolant System Service',
        message: `Your **coolant** may need replacement within **${coolantRemaining} km**. Last change: **${coolantLastChanged.toLocaleString()} km**.`,
        time: 'Just now',
        read: false,
        date: 'today',
        icon: <FaWrench className="text-lg" />,
        iconBg: 'bg-orange-100',
        priority: 'medium'
      });
    }

    return alerts;
  };

  const maintenanceAlerts = calculateMaintenanceAlerts();

  const [notifications, setNotifications] = useState([
    // Maintenance alerts appear first (high priority)
    ...maintenanceAlerts,
    {
      id: 1,
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order #12345 for **Brake Pads Set** has been **confirmed** and is being processed. Expected delivery: **2-3 business days**.',
      time: '2h ago',
      read: false,
      date: 'today',
      icon: <FaShoppingCart className="text-lg" />,
      iconBg: 'bg-gray-100'
    },
    {
      id: 2,
      type: 'shipping',
      title: 'Order Shipped',
      message: 'Your order #12340 for **Engine Oil Filter** has been **shipped**. Track your package now. Estimated arrival: **Tomorrow**.',
      time: '5h ago',
      read: false,
      date: 'today',
      icon: <FaTruck className="text-lg" />,
      iconBg: 'bg-gray-100'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Successful',
      message: 'We have received the payment of **₹2,500** for order #12340. The payment was processed **successfully**.',
      time: '7h ago',
      read: false,
      date: 'today',
      icon: <FaCreditCard className="text-lg" />,
      iconBg: 'bg-gray-100'
    },
    {
      id: 4,
      type: 'offer',
      title: 'Special Offer',
      message: 'Get **20% off** on all brake parts. Limited time offer! Valid until **December 31, 2024**.',
      time: '1 day ago',
      read: true,
      date: 'yesterday',
      icon: <FaTag className="text-lg" />,
      iconBg: 'bg-gray-100'
    },
    {
      id: 5,
      type: 'info',
      title: 'Service Reminder',
      message: 'Your vehicle service for **Honda City** is set to **expire on January 15, 2025**. Please book your appointment to continue service benefits.',
      time: '2 days ago',
      read: true,
      date: 'yesterday',
      icon: <FaClock className="text-lg" />,
      iconBg: 'bg-gray-100'
    },
    {
      id: 6,
      type: 'gift',
      title: 'Reward Points Added',
      message: 'You earned **50 reward points** for your recent purchase. Use them on your next order to get discounts.',
      time: '3 days ago',
      read: true,
      date: 'older',
      icon: <FaGift className="text-lg" />,
      iconBg: 'bg-gray-100'
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    switch (notification.type) {
      case 'order':
      case 'shipping':
        navigate('/myorder');
        break;
      case 'offer':
        navigate('/category');
        break;
      case 'payment':
        navigate('/wallet');
        break;
      case 'maintenance':
        navigate('/category'); // Navigate to parts category for maintenance items
        break;
      default:
        break;
    }
  };

  const formatMessage = (message, notificationType) => {
    const parts = message.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const text = part.slice(2, -2);
        // Maintenance notifications - highlight in orange
        if (notificationType === 'maintenance') {
          if (text.includes('km') || text.includes('replacement') || text.includes('change')) {
            return <span key={index} className="font-bold text-orange-600">{text}</span>;
          }
          return <span key={index} className="font-bold text-orange-700">{text}</span>;
        }
        // Check if it's a date or urgent info (red color)
        if (text.includes('expire') || text.includes('January') || text.includes('December')) {
          return <span key={index} className="font-bold text-red-600">{text}</span>;
        }
        return <span key={index} className="font-bold text-gray-900">{text}</span>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const groupedNotifications = {
    today: notifications.filter(n => n.date === 'today'),
    yesterday: notifications.filter(n => n.date === 'yesterday'),
    older: notifications.filter(n => n.date === 'older')
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="text-gray-600 hover:text-gray-900 mb-6 flex items-center gap-2 transition-colors"
        >
          <span>←</span> Back
        </button>

        {/* Main Notification Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                <FaCheckCircle className="text-sm" />
                <span className="text-sm sm:text-base">Mark all as read</span>
              </button>
            )}
          </div>

          {/* Notifications Content */}
          <div className="p-6">
            {/* Today Section */}
            {groupedNotifications.today.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">Today</h2>
                <div className="space-y-3">
                  {groupedNotifications.today.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNotificationClick(notification)}
                      className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                        notification.type === 'maintenance'
                          ? !notification.read
                            ? 'bg-orange-50 hover:bg-orange-100 border-2 border-orange-300'
                            : 'bg-orange-50/50 hover:bg-orange-100/50 border border-orange-200'
                          : !notification.read 
                            ? 'bg-green-50 hover:bg-green-100 border border-green-200' 
                            : 'bg-white hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      {/* Icon */}
                      <div className={`${notification.iconBg} p-3 rounded-full flex-shrink-0`}>
                        {notification.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <div className="flex items-center gap-2 flex-1">
                            {!notification.read && (
                              <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${
                                notification.type === 'maintenance' ? 'bg-orange-500' : 'bg-green-500'
                              }`}></div>
                            )}
                            {notification.type === 'maintenance' && (
                              <FaExclamationTriangle className="text-orange-500 text-xs flex-shrink-0" />
                            )}
                            <h3 className={`font-bold text-sm sm:text-base ${
                              notification.type === 'maintenance' ? 'text-orange-700' : 'text-gray-900'
                            }`}>
                              {notification.title}
                            </h3>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</span>
                        </div>
                        <p className={`text-sm leading-relaxed ${
                          notification.type === 'maintenance' ? 'text-orange-700' : 'text-gray-600'
                        }`}>
                          {formatMessage(notification.message, notification.type)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Yesterday Section */}
            {groupedNotifications.yesterday.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">Yesterday</h2>
                <div className="space-y-3">
                  {groupedNotifications.yesterday.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNotificationClick(notification)}
                      className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                        notification.type === 'maintenance'
                          ? !notification.read
                            ? 'bg-orange-50 hover:bg-orange-100 border-2 border-orange-300'
                            : 'bg-orange-50/50 hover:bg-orange-100/50 border border-orange-200'
                          : !notification.read 
                            ? 'bg-green-50 hover:bg-green-100 border border-green-200' 
                            : 'bg-white hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      {/* Icon */}
                      <div className={`${notification.iconBg} p-3 rounded-full flex-shrink-0`}>
                        {notification.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <div className="flex items-center gap-2 flex-1">
                            {!notification.read && (
                              <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${
                                notification.type === 'maintenance' ? 'bg-orange-500' : 'bg-green-500'
                              }`}></div>
                            )}
                            {notification.type === 'maintenance' && (
                              <FaExclamationTriangle className="text-orange-500 text-xs flex-shrink-0" />
                            )}
                            <h3 className={`font-bold text-sm sm:text-base ${
                              notification.type === 'maintenance' ? 'text-orange-700' : 'text-gray-900'
                            }`}>
                              {notification.title}
                            </h3>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</span>
                        </div>
                        <p className={`text-sm leading-relaxed ${
                          notification.type === 'maintenance' ? 'text-orange-700' : 'text-gray-600'
                        }`}>
                          {formatMessage(notification.message, notification.type)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Older Section */}
            {groupedNotifications.older.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">Older</h2>
                <div className="space-y-3">
                  {groupedNotifications.older.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNotificationClick(notification)}
                      className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                        !notification.read 
                          ? 'bg-green-50 hover:bg-green-100 border border-green-200' 
                          : 'bg-white hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      {/* Icon */}
                      <div className={`${notification.iconBg} p-3 rounded-full flex-shrink-0`}>
                        {notification.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <div className="flex items-center gap-2 flex-1">
                            {!notification.read && (
                              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                            )}
                            <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                              {notification.title}
                            </h3>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {formatMessage(notification.message)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {notifications.length === 0 && (
              <div className="text-center py-12">
                <FaBell className="text-5xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Notifications</h3>
                <p className="text-gray-500">You don't have any notifications yet.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications;

