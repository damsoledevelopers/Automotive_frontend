import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { 
  FaMapMarkerAlt, 
  FaCreditCard, 
  FaBox, 
  FaTruck, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaUndo,
  FaExclamationTriangle,
  FaClock,
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';


export const MyOrder = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("In-Progress");
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [cancellationReason, setCancellationReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const tabs = ["In-Progress", "Delivered", "Returned", "Cancelled"];

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { orderService } = await import('../services/apiService');
        const response = await orderService.getOrders();
        // Backend returns { orders: [...] } from the service
        const orders = response.orders || response.data?.orders || [];
        
        // Transform backend orders to match frontend format
        const transformedOrders = orders.map(order => ({
          id: order.orderId || order._id,
          date: order.createdAt || new Date().toISOString(),
          status: order.status,
          items: order.items || [],
          packages: order.packages || [],
          shippingAddress: order.shippingAddress,
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          paymentDetails: order.paymentDetails,
          subtotal: order.subtotal,
          deliveryCharge: order.deliveryCharge,
          platformFee: order.platformFee,
          total: order.total,
          totalItems: order.totalItems,
          cancellationReason: order.cancellationReason,
          cancelledDate: order.cancelledDate,
        }));
        
        setOrders(transformedOrders);
      } catch (error) {
        console.error('Failed to load orders:', error);
        // Fallback to localStorage
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        setOrders(savedOrders);
      }
    };

    loadOrders();
  }, []);

  // Toggle order details expansion
  const toggleOrderDetails = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  // Cancellation reasons
  const cancellationReasons = [
    { value: 'changed-mind', label: 'Changed my mind', icon: '🔄' },
    { value: 'found-cheaper', label: 'Found a better price elsewhere', icon: '💰' },
    { value: 'wrong-item', label: 'Ordered wrong item', icon: '❌' },
    { value: 'delivery-delay', label: 'Delivery taking too long', icon: '⏰' },
    { value: 'no-longer-needed', label: 'No longer needed', icon: '📦' },
    { value: 'payment-issue', label: 'Payment issue', icon: '💳' },
    { value: 'other', label: 'Other reason', icon: '📝' }
  ];

  // Cancel order function
  const handleCancelOrder = (order) => {
    setOrderToCancel(order);
    setCancellationReason('');
    setCustomReason('');
    setShowCancelModal(true);
  };

  const confirmCancelOrder = async () => {
    if (orderToCancel && cancellationReason) {
      const reason = cancellationReason === 'other' ? customReason : cancellationReasons.find(r => r.value === cancellationReason)?.label || cancellationReason;
      
      try {
        const { orderService } = await import('../services/apiService');
        await orderService.updateOrderStatus(orderToCancel.id, 'Cancelled', reason);
        
        // Update local state
        const updatedOrders = orders.map(order => 
          order.id === orderToCancel.id 
            ? { 
                ...order, 
                status: 'Cancelled', 
                cancelledDate: new Date().toISOString(),
                cancellationReason: reason
              }
            : order
        );
        setOrders(updatedOrders);
      } catch (error) {
        console.error('Failed to cancel order:', error);
        // Fallback to local update
        const updatedOrders = orders.map(order => 
          order.id === orderToCancel.id 
            ? { 
                ...order, 
                status: 'Cancelled', 
                cancelledDate: new Date().toISOString(),
                cancellationReason: reason
              }
            : order
        );
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
      }
      
      setShowCancelModal(false);
      setOrderToCancel(null);
      setCancellationReason('');
      setCustomReason('');
      
      // Switch to Cancelled tab if not already there
      if (activeTab !== 'Cancelled') {
        setActiveTab('Cancelled');
      }
    }
  };

  const handleCloseModal = () => {
    setShowCancelModal(false);
    setCancellationReason('');
    setCustomReason('');
    setOrderToCancel(null);
  };

  // Filter orders by status
  const filteredOrders = orders.filter(order => {
    if (activeTab === "In-Progress") {
      return order.status === "In-Progress" || order.status === "Confirmed" || order.status === "Pending Payment";
    }
    if (activeTab === "Delivered") return order.status === "Delivered";
    if (activeTab === "Returned") return order.status === "Returned";
    if (activeTab === "Cancelled") return order.status === "Cancelled";
    return false;
  });

  // Check if order can be cancelled
  const canCancelOrder = (order) => {
    return order.status === "In-Progress" || 
           order.status === "Confirmed" || 
           order.status === "Pending Payment";
  };

  // Get order tracking status
  const getOrderTrackingStatus = (order) => {
    const orderDate = new Date(order.date);
    const daysSinceOrder = Math.floor((Date.now() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (order.status === 'Cancelled') {
      return { step: 0, status: 'cancelled' };
    }
    if (order.status === 'Delivered') {
      return { step: 4, status: 'delivered' };
    }
    if (daysSinceOrder >= 5) {
      return { step: 3, status: 'shipped' };
    }
    if (daysSinceOrder >= 2) {
      return { step: 2, status: 'processing' };
    }
    return { step: 1, status: 'confirmed' };
  };

  // Check for delayed/backordered items
  const getItemStatus = (item, order) => {
    // Simulate some items being delayed or backordered
    const isDelayed = Math.random() > 0.7; // 30% chance of delay
    const isBackordered = Math.random() > 0.9; // 10% chance of backorder
    
    if (order.status === 'Cancelled' || order.status === 'Delivered') {
      return null;
    }
    
    if (isBackordered) {
      return { type: 'backordered', message: 'Item is backordered. Expected restock in 5-7 days.' };
    }
    if (isDelayed) {
      return { type: 'delayed', message: 'Item delivery delayed. Expected in 2-3 additional days.' };
    }
    return null;
  };

  // Count orders by status
  const getOrderCount = (status) => {
    return orders.filter(order => order.status === status).length;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'In-Progress':
        return <FaBox className="text-blue-500" />;
      case 'Delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'Returned':
        return <FaUndo className="text-orange-500" />;
      case 'Cancelled':
        return <FaTimesCircle className="text-blue-500" />;
      default:
        return <FaBox className="text-gray-500" />;
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'In-Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Returned':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Cancelled':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Open Google Maps with address
  const handleOpenMap = (address) => {
    const fullAddress = `${address.address}, ${address.cityState}, ${address.postalCode}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <>
      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%);
          border-radius: 10px;
          border: 1px solid #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #94a3b8 0%, #64748b 100%);
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pb-20 md:pb-8">
      <div className="max-w-6xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-4 md:mb-6 lg:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
            My <span className="text-blue-600">Orders</span>
          </h1>
          <p className="text-xs md:text-sm lg:text-sm text-gray-600">Track and manage your orders</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1.5 md:p-2 mb-4 md:mb-6 lg:mb-6 overflow-x-auto tabs-container">
          <div className="flex space-x-1.5 md:space-x-4 lg:space-x-3 min-w-max md:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`order-tab px-3 md:px-4 lg:px-5 py-2 md:py-2.5 lg:py-2 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 text-sm md:text-sm lg:text-sm ${
                  activeTab === tab
                    ? "active bg-blue-600 text-white shadow-md md:transform md:scale-105"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {tab} <span className="ml-1 text-xs opacity-90">({getOrderCount(tab)})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="empty-state flex flex-col items-center justify-center text-center py-16 md:py-24 bg-white rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="empty-state-icon text-5xl md:text-6xl lg:text-6xl mb-3 md:mb-4">📦</div>
            <h3 className="text-lg md:text-xl lg:text-xl font-semibold text-gray-800 mb-1 md:mb-2">No {activeTab} orders</h3>
            <p className="text-gray-600 mb-4 md:mb-6 text-xs md:text-sm lg:text-sm max-w-md">
              You don't have any {activeTab.toLowerCase()} orders yet. Start shopping to see your orders here!
            </p>
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 md:px-6 lg:px-6 py-2.5 md:py-3 lg:py-3 rounded-lg transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-xs md:text-sm lg:text-sm"
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-3 md:space-y-4 lg:space-y-4">
            {filteredOrders.map((order, idx) => {
              const trackingStatus = getOrderTrackingStatus(order);
              const isExpanded = expandedOrders[order.id];
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="order-card card-hover-effect bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300"
                >
                  {/* Order Header */}
                  <div className="p-3 md:p-4 lg:p-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="flex items-start md:items-center gap-3 md:gap-4">
                        <div className="p-1.5 md:p-2 lg:p-2.5 bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200">
                          <div className="status-icon-glow text-lg md:text-xl lg:text-xl">
                            {getStatusIcon(order.status)}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg lg:text-lg font-bold text-gray-900 mb-0.5 md:mb-1">
                            Order #{order.id}
                          </h3>
                          <p className="text-xs md:text-sm lg:text-sm text-gray-600 flex items-center gap-1.5 md:gap-2">
                            <FaClock className="text-gray-400 text-xs" />
                            Placed on {formatDate(order.date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 lg:gap-3">
                        <span
                          className={`status-badge px-2.5 md:px-3 lg:px-3 py-1 md:py-1.5 lg:py-1.5 rounded-lg text-xs font-semibold border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                        <div className="text-left md:text-right">
                          <p className="text-xs text-gray-500 mb-0.5 md:mb-1">Total Amount</p>
                          <p className="text-lg md:text-xl lg:text-xl font-bold text-gray-900">
                            ₹{order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-3 md:pt-4 border-t border-gray-200">
                      {canCancelOrder(order) && (
                        <button
                          onClick={() => handleCancelOrder(order)}
                          className="order-action-btn px-3 md:px-4 lg:px-3 py-1.5 md:py-2 lg:py-1.5 text-xs md:text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 flex items-center gap-1.5"
                        >
                          <FaTimesCircle className="text-xs" />
                          Cancel Order
                        </button>
                      )}
                      <button
                        onClick={() => toggleOrderDetails(order.id)}
                        className="order-action-btn px-3 md:px-4 lg:px-3 py-1.5 md:py-2 lg:py-1.5 text-xs md:text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 flex items-center gap-1.5"
                      >
                        {isExpanded ? (
                          <>
                            <FaChevronUp className="text-xs" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <FaChevronDown className="text-xs" />
                            View Tracking
                          </>
                        )}
                      </button>
                      <Link
                        to={`/checkout/confirmation?orderId=${order.id}`}
                        className="order-action-btn px-3 md:px-4 lg:px-3 py-1.5 md:py-2 lg:py-1.5 text-xs md:text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 hover:border-green-300 transition-all duration-200 flex items-center gap-1.5"
                      >
                        <FaCheckCircle className="text-xs" />
                        View Receipt
                      </Link>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-3 md:p-4 lg:p-5">
                    <h4 className="text-sm md:text-base lg:text-base font-semibold text-gray-800 mb-3 md:mb-4">Order Items</h4>
                    <div className="space-y-3 md:space-y-4">
                      {order.items.map((item, index) => {
                        const itemStatus = getItemStatus(item, order);
                        
                        return (
                          <div
                            key={index}
                            className={`product-item-card flex gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl border transition-all duration-200 ${
                              itemStatus 
                                ? 'bg-yellow-50 border-yellow-200 shadow-sm' 
                                : 'bg-gray-50 border-gray-200 hover:shadow-md'
                            }`}
                          >
                            <img
                              src={item.imageUrl || "https://via.placeholder.com/100"}
                              alt={item.name}
                              className="product-image w-16 h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 object-cover rounded-lg shadow-sm border border-gray-200 flex-shrink-0"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/100?text=Product';
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1.5 md:mb-2">
                                <h4 className="font-semibold text-gray-900 text-xs md:text-sm lg:text-sm line-clamp-2">
                                  {item.name}
                                </h4>
                                {itemStatus && (
                                  <div className={`flex items-center gap-1 px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-medium flex-shrink-0 ${
                                    itemStatus.type === 'backordered' 
                                      ? 'bg-orange-100 text-orange-800' 
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {itemStatus.type === 'backordered' ? (
                                      <FaBox className="text-[10px]" />
                                    ) : (
                                      <FaClock className="text-[10px]" />
                                    )}
                                    <span className="hidden sm:inline">{itemStatus.type === 'backordered' ? 'Backordered' : 'Delayed'}</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-[10px] md:text-xs lg:text-xs text-gray-600 mb-0.5 md:mb-1">
                                Part #: {item.partNumber || item.id}
                              </p>
                              <p className="text-[10px] md:text-xs lg:text-xs text-gray-600 mb-2 md:mb-3">
                                Brand: {item.brand || "N/A"} | Sold by: {item.seller}
                              </p>
                              {itemStatus && (
                                <div className={`mb-2 md:mb-3 p-2 md:p-3 bg-white rounded-lg border border-yellow-300 shadow-sm ${
                                  itemStatus.type === 'backordered' ? 'alert-backordered' : 'alert-delayed'
                                }`}>
                                  <div className="flex items-start gap-1.5 md:gap-2">
                                    <FaExclamationTriangle className={`text-xs md:text-sm mt-0.5 flex-shrink-0 ${
                                      itemStatus.type === 'backordered' ? 'text-orange-500' : 'text-yellow-500'
                                    }`} />
                                    <p className={`text-[10px] md:text-xs lg:text-xs ${
                                      itemStatus.type === 'backordered' ? 'text-orange-700' : 'text-yellow-700'
                                    }`}>
                                      {itemStatus.message}
                                    </p>
                                  </div>
                                </div>
                              )}
                              <div className="flex items-center justify-between flex-wrap gap-2">
                                <span className="text-[10px] md:text-xs lg:text-xs text-gray-600">
                                  Quantity: <span className="font-semibold">{item.quantity}</span>
                                </span>
                                <div className="flex items-center gap-2 md:gap-3">
                                  {item.discountPrice && (
                                    <span className="text-[10px] md:text-xs lg:text-xs text-gray-400 line-through">
                                      ₹{(item.price * item.quantity).toFixed(2)}
                                    </span>
                                  )}
                                  <span className="price-highlight text-sm md:text-base lg:text-base font-bold text-gray-900">
                                    ₹{((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Order Tracking Timeline - Expanded View */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="expandable-content overflow-hidden"
                      >
                        <div className="px-3 md:px-4 lg:px-5 py-3 md:py-4 lg:py-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-t border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-4 md:mb-5 lg:mb-5 flex items-center gap-1.5 md:gap-2 text-sm md:text-base lg:text-base">
                            <FaTruck className="text-blue-600 text-sm md:text-base" />
                            Order Tracking
                          </h4>
                          <div className="relative">
                            <div className="space-y-4 md:space-y-5 lg:space-y-5">
                            {/* Step 1: Order Confirmed */}
                            <div className="timeline-step flex gap-2 md:gap-3 lg:gap-3">
                              <div className="flex flex-col items-center">
                                <div className={`timeline-icon w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
                                  trackingStatus.step >= 1 ? 'bg-green-500 md:scale-110 active status-icon-glow' : 'bg-gray-300'
                                }`}>
                                  <FaCheckCircle className={`text-white text-sm md:text-lg lg:text-lg ${
                                    trackingStatus.step >= 1 ? 'opacity-100' : 'opacity-50'
                                  }`} />
                                </div>
                                {trackingStatus.step < 4 && (
                                  <div className={`timeline-line w-1 h-10 md:h-12 lg:h-12 mt-2 rounded-full transition-all ${
                                    trackingStatus.step >= 2 ? 'bg-green-500' : 'bg-gray-300'
                                  }`}></div>
                                )}
                              </div>
                                <div className="flex-1 pb-4 md:pb-5 lg:pb-5">
                                  <h5 className={`font-semibold mb-0.5 md:mb-1 text-xs md:text-sm lg:text-sm ${
                                    trackingStatus.step >= 1 ? 'text-gray-900' : 'text-gray-400'
                                  }`}>
                                    Order Confirmed
                                  </h5>
                                  <p className={`text-xs md:text-sm lg:text-sm mb-0.5 md:mb-1 ${
                                    trackingStatus.step >= 1 ? 'text-gray-700' : 'text-gray-400'
                                  }`}>
                                    Your order has been confirmed
                                  </p>
                                  <p className="text-[10px] md:text-xs lg:text-xs text-gray-500">{formatDate(order.date)}</p>
                                </div>
                              </div>

                            {/* Step 2: Processing */}
                            <div className="timeline-step flex gap-2 md:gap-3 lg:gap-3">
                              <div className="flex flex-col items-center">
                                <div className={`timeline-icon w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
                                  trackingStatus.step >= 2 ? 'bg-blue-500 md:scale-110 active status-icon-glow' : 'bg-gray-300'
                                }`}>
                                  <FaBox className={`text-white text-sm md:text-lg lg:text-lg ${
                                    trackingStatus.step >= 2 ? 'opacity-100' : 'opacity-50'
                                  }`} />
                                </div>
                                {trackingStatus.step < 4 && (
                                  <div className={`timeline-line w-1 h-10 md:h-12 lg:h-12 mt-2 rounded-full transition-all ${
                                    trackingStatus.step >= 3 ? 'bg-blue-500' : 'bg-gray-300'
                                  }`}></div>
                                )}
                              </div>
                                <div className="flex-1 pb-4 md:pb-5 lg:pb-5">
                                  <h5 className={`font-semibold mb-0.5 md:mb-1 text-xs md:text-sm lg:text-sm ${
                                    trackingStatus.step >= 2 ? 'text-gray-900' : 'text-gray-400'
                                  }`}>
                                    Processing
                                  </h5>
                                  <p className={`text-xs md:text-sm lg:text-sm ${
                                    trackingStatus.step >= 2 ? 'text-gray-700' : 'text-gray-400'
                                  }`}>
                                    Your order is being prepared for shipment
                                  </p>
                                </div>
                              </div>

                            {/* Step 3: Shipped */}
                            <div className="timeline-step flex gap-2 md:gap-3 lg:gap-3">
                              <div className="flex flex-col items-center">
                                <div className={`timeline-icon w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
                                  trackingStatus.step >= 3 ? 'bg-purple-500 md:scale-110 active status-icon-glow' : 'bg-gray-300'
                                }`}>
                                  <FaTruck className={`text-white text-sm md:text-lg lg:text-lg ${
                                    trackingStatus.step >= 3 ? 'opacity-100' : 'opacity-50'
                                  }`} />
                                </div>
                                {trackingStatus.step < 4 && (
                                  <div className={`timeline-line w-1 h-10 md:h-12 lg:h-12 mt-2 rounded-full transition-all ${
                                    trackingStatus.step >= 4 ? 'bg-purple-500' : 'bg-gray-300'
                                  }`}></div>
                                )}
                              </div>
                                <div className="flex-1 pb-4 md:pb-5 lg:pb-5">
                                  <h5 className={`font-semibold mb-0.5 md:mb-1 text-xs md:text-sm lg:text-sm ${
                                    trackingStatus.step >= 3 ? 'text-gray-900' : 'text-gray-400'
                                  }`}>
                                    Shipped
                                  </h5>
                                  <p className={`text-xs md:text-sm lg:text-sm ${
                                    trackingStatus.step >= 3 ? 'text-gray-700' : 'text-gray-400'
                                  }`}>
                                    Your order has been shipped
                                  </p>
                                </div>
                              </div>

                            {/* Step 4: Delivered */}
                            <div className="timeline-step flex gap-2 md:gap-3 lg:gap-3">
                              <div className="flex flex-col items-center">
                                <div className={`timeline-icon w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
                                  trackingStatus.step >= 4 ? 'bg-green-500 md:scale-110 active status-icon-glow' : 'bg-gray-300'
                                }`}>
                                  <FaCheckCircle className={`text-white text-sm md:text-lg lg:text-lg ${
                                    trackingStatus.step >= 4 ? 'opacity-100' : 'opacity-50'
                                  }`} />
                                </div>
                              </div>
                                <div className="flex-1">
                                  <h5 className={`font-semibold mb-0.5 md:mb-1 text-xs md:text-sm lg:text-sm ${
                                    trackingStatus.step >= 4 ? 'text-gray-900' : 'text-gray-400'
                                  }`}>
                                    Delivered
                                  </h5>
                                  <p className={`text-xs md:text-sm lg:text-sm ${
                                    trackingStatus.step >= 4 ? 'text-gray-700' : 'text-gray-400'
                                  }`}>
                                    Your order has been delivered
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Support Link */}
                          <div className="mt-4 md:mt-5 lg:mt-5 pt-4 md:pt-5 lg:pt-5 border-t border-blue-200">
                            <p className="text-xs md:text-sm lg:text-sm text-gray-700 text-center">
                              Need help tracking your order?{' '}
                              <Link to="/support" className="text-blue-600 hover:text-blue-700 underline font-medium">
                                Contact Support
                              </Link>
                              {' '}or check{' '}
                              <Link to="/faq" className="text-blue-600 hover:text-blue-700 underline font-medium">
                                FAQs
                              </Link>
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Order Summary */}
                  <div className="px-3 md:px-4 lg:px-5 py-3 md:py-4 lg:py-5 bg-gray-50 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-4 mb-4 md:mb-5 lg:mb-5">
                      {/* Shipping Address */}
                      {order.shippingAddress && (
                        <div className="bg-white p-3 md:p-4 lg:p-4 rounded-lg md:rounded-xl border border-gray-200 shadow-sm">
                          <div className="flex items-center justify-between mb-2 md:mb-3">
                            <div className="flex items-center gap-1.5 md:gap-2">
                              <FaMapMarkerAlt className="text-blue-600 text-sm md:text-base lg:text-base" />
                              <h4 className="font-semibold text-gray-900 text-xs md:text-sm lg:text-sm">
                                Shipping Address
                              </h4>
                            </div>
                            <button
                              onClick={() => handleOpenMap(order.shippingAddress)}
                              className="flex items-center gap-1 text-[10px] md:text-xs lg:text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                              title="Open in Google Maps"
                            >
                              <FaMapMarkerAlt className="text-[10px]" />
                              View Map
                            </button>
                          </div>
                          <p className="text-xs md:text-sm lg:text-sm text-gray-700 font-medium mb-0.5 md:mb-1">
                            {order.shippingAddress.name}
                          </p>
                          <p className="text-[10px] md:text-xs lg:text-xs text-gray-600 mb-0.5 md:mb-1">
                            {order.shippingAddress.mobile}
                          </p>
                          <p className="text-[10px] md:text-xs lg:text-xs text-gray-600">
                            {order.shippingAddress.address}, {order.shippingAddress.cityState}, {order.shippingAddress.postalCode}
                          </p>
                        </div>
                      )}

                      {/* Payment Method */}
                      <div className="bg-white p-3 md:p-4 lg:p-4 rounded-lg md:rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                          <FaCreditCard className="text-green-600 text-sm md:text-base lg:text-base" />
                          <h4 className="font-semibold text-gray-900 text-xs md:text-sm lg:text-sm">
                            Payment Method
                          </h4>
                        </div>
                        <p className="text-xs md:text-sm lg:text-sm text-gray-700 font-medium">
                          {order.paymentMethod}
                        </p>
                        <p className="text-[10px] md:text-xs lg:text-xs text-gray-600 mt-0.5 md:mt-1">
                          Status: <span className={`font-medium ${
                            order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {order.paymentStatus}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Order Totals */}
                    <div className="bg-white p-3 md:p-4 lg:p-4 rounded-lg md:rounded-xl border border-gray-200 shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-xs md:text-sm lg:text-sm">Order Summary</h4>
                      <div className="space-y-1.5 md:space-y-2 lg:space-y-2">
                        <div className="flex justify-between text-xs md:text-sm lg:text-sm text-gray-600">
                          <span>Subtotal ({order.totalItems} items)</span>
                          <span className="font-medium">₹{order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs md:text-sm lg:text-sm text-gray-600">
                          <span>Delivery Charge</span>
                          <span className="font-medium">₹{order.deliveryCharge.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs md:text-sm lg:text-sm text-gray-600">
                          <span>Platform Fee</span>
                          <span className="font-medium">₹{order.platformFee.toFixed(2)}</span>
                        </div>
                        <div className="pt-2 md:pt-3 border-t border-gray-200 mt-2 md:mt-3">
                          <div className="flex justify-between text-sm md:text-base lg:text-base font-bold text-gray-900">
                            <span>Total</span>
                            <span>₹{order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Cancel Order Modal */}
        <AnimatePresence>
          {showCancelModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
                onClick={handleCloseModal}
              >
                {/* Modal Container */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-2xl md:rounded-xl shadow-2xl max-w-md md:max-w-lg lg:max-w-xl w-full my-4 md:my-8 overflow-hidden"
                >
                  {/* Header Section */}
                  <div className="bg-gradient-to-r from-blue-50 via-blue-50 to-orange-50 px-4 md:px-5 lg:px-6 py-4 md:py-5 border-b border-blue-100">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
                        <div className="relative flex-shrink-0">
                          <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl md:rounded-lg shadow-lg flex items-center justify-center border-2 border-blue-200">
                            <FaTimesCircle className="text-blue-600 text-xl md:text-2xl" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-blue-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                            Cancel Order
                          </h3>
                          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 flex-wrap">
                            <span className="font-medium">Order ID:</span>
                            <span className="font-mono bg-white px-2 py-0.5 rounded text-xs md:text-sm border border-gray-200 truncate max-w-[200px]">
                              #{orderToCancel?.id}
                            </span>
                          </div>
                          {orderToCancel && (
                            <p className="text-xs text-gray-500 mt-1.5">
                              Placed on {formatDate(orderToCancel.date)}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={handleCloseModal}
                        className="text-gray-400 hover:text-gray-600 transition-all p-1.5 md:p-2 hover:bg-white rounded-lg hover:rotate-90 flex-shrink-0"
                        aria-label="Close"
                      >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="px-4 md:px-5 lg:px-6 py-4 md:py-5 max-h-[calc(100vh-250px)] md:max-h-[calc(100vh-300px)] overflow-y-auto">
                    {/* Payment Info Alert */}
                    {orderToCancel?.paymentStatus === 'Paid' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400 rounded-lg md:rounded-xl p-3 md:p-4 mb-4 md:mb-5 shadow-sm"
                      >
                        <div className="flex items-start gap-2 md:gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <FaInfoCircle className="text-amber-600 text-lg md:text-xl" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-amber-900 mb-1 text-xs md:text-sm">
                              Refund Information
                            </h4>
                            <p className="text-xs md:text-sm text-amber-800 leading-relaxed">
                              Your payment of <span className="font-bold">₹{orderToCancel?.total.toFixed(2)}</span> will be refunded within <span className="font-semibold">5-7 business days</span>.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Cancellation Reason Selection */}
                    <div className="mb-4 md:mb-5">
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <label className="block text-sm md:text-base font-bold text-gray-900">
                          Reason for Cancellation
                        </label>
                        <span className="text-xs text-blue-500 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                          Required *
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-2.5 max-h-64 md:max-h-72 overflow-y-auto pr-1 md:pr-2 custom-scrollbar">
                        {cancellationReasons.map((reason, index) => (
                          <motion.button
                            key={reason.value}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                            onClick={() => {
                              setCancellationReason(reason.value);
                              if (reason.value !== 'other') {
                                setCustomReason('');
                              }
                            }}
                            className={`group relative w-full text-left p-3 md:p-3.5 rounded-lg md:rounded-xl border-2 transition-all duration-300 ${
                              cancellationReason === reason.value
                                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md md:scale-105'
                                : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm'
                            }`}
                          >
                            <div className="flex items-center gap-2 md:gap-3">
                              <div className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center text-lg md:text-xl transition-all flex-shrink-0 ${
                                cancellationReason === reason.value
                                  ? 'bg-blue-500 text-white shadow-md'
                                  : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                              }`}>
                                {reason.icon}
                              </div>
                              <span className={`flex-1 font-semibold text-xs md:text-sm transition-colors line-clamp-2 ${
                                cancellationReason === reason.value ? 'text-blue-700' : 'text-gray-700 group-hover:text-blue-600'
                              }`}>
                                {reason.label}
                              </span>
                              {cancellationReason === reason.value && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-5 h-5 md:w-6 md:h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0"
                                >
                                  <FaCheckCircle className="text-white text-xs md:text-sm" />
                                </motion.div>
                              )}
                            </div>
                            {cancellationReason === reason.value && (
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                className="absolute bottom-0 left-0 h-0.5 md:h-1 bg-blue-500 rounded-b-lg md:rounded-b-xl"
                              />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Reason Input */}
                    {cancellationReason === 'other' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 md:mb-5"
                      >
                        <label className="block text-xs md:text-sm font-semibold text-gray-900 mb-2">
                          Please provide additional details
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="relative">
                          <textarea
                            value={customReason}
                            onChange={(e) => setCustomReason(e.target.value)}
                            placeholder="Please describe your reason..."
                            className={`w-full px-3 md:px-4 py-2.5 md:py-3 border-2 rounded-lg md:rounded-xl focus:ring-2 outline-none transition-all resize-none text-xs md:text-sm placeholder-gray-400 ${
                              customReason.length > 0 && customReason.length < 10
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                : 'border-gray-300 focus:border-red-500 focus:ring-red-200'
                            }`}
                            rows="3"
                          />
                          <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3">
                            <span className={`text-xs font-medium ${
                              customReason.length < 10 ? 'text-red-500' : 'text-gray-400'
                            }`}>
                              {customReason.length}/10
                            </span>
                          </div>
                        </div>
                        {customReason.length > 0 && customReason.length < 10 && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-red-500 mt-1.5 flex items-center gap-1"
                          >
                            <FaExclamationTriangle className="text-xs" />
                            Please provide at least 10 characters
                          </motion.p>
                        )}
                      </motion.div>
                    )}

                    {/* Order Summary Preview */}
                    {orderToCancel && (
                      <div className="bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-4 border border-gray-200 mb-4 md:mb-5">
                        <h4 className="text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3">Order Summary</h4>
                        <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                          <div className="flex justify-between text-gray-600">
                            <span>Items ({orderToCancel.totalItems})</span>
                            <span className="font-medium">₹{orderToCancel.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Delivery & Fees</span>
                            <span className="font-medium">₹{(orderToCancel.deliveryCharge + orderToCancel.platformFee).toFixed(2)}</span>
                          </div>
                          <div className="pt-1.5 md:pt-2 border-t border-gray-300 flex justify-between">
                            <span className="font-bold text-gray-900">Total Amount</span>
                            <span className="font-bold text-gray-900">₹{orderToCancel.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Section */}
                  <div className="bg-gray-50 px-4 md:px-5 lg:px-6 py-4 md:py-5 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                      <button
                        onClick={handleCloseModal}
                        className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg md:rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold text-xs md:text-sm shadow-sm hover:shadow-md"
                      >
                        Keep Order
                      </button>
                      <button
                        onClick={confirmCancelOrder}
                        disabled={!cancellationReason || (cancellationReason === 'other' && (!customReason || customReason.length < 10))}
                        className={`flex-1 px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-semibold shadow-lg transition-all text-xs md:text-sm relative overflow-hidden ${
                          !cancellationReason || (cancellationReason === 'other' && (!customReason || customReason.length < 10))
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:shadow-xl md:transform md:hover:scale-[1.02] md:active:scale-[0.98]'
                        }`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-1.5 md:gap-2">
                          <FaTimesCircle className="text-xs md:text-sm" />
                          Confirm Cancellation
                        </span>
                        {(!cancellationReason || (cancellationReason === 'other' && (!customReason || customReason.length < 10))) && (
                          <span className="absolute inset-0 bg-gray-200 opacity-50"></span>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-3 md:mt-4">
                      By confirming, you agree to cancel this order. This action cannot be undone.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      </div>
    </>
  );
};
