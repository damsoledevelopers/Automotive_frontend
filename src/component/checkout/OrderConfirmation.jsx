import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaCheckCircle, 
  FaBox, 
  FaTruck, 
  FaMapMarkerAlt, 
  FaCreditCard,
  FaDownload,
  FaHome,
  FaShoppingBag
} from "react-icons/fa";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orderId = new URLSearchParams(location.search).get('orderId') || location.state?.orderId;
    
    if (orderId) {
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = savedOrders.find(o => o.id === orderId);
      
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        navigate('/myorder');
      }
    } else {
      navigate('/myorder');
    }
  }, [location, navigate]);

  // Format date
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  // Get estimated delivery date
  const getEstimatedDelivery = useCallback(() => {
    if (!order) return '';
    const date = new Date(order.date);
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  }, [order]);

  // Order Timeline Steps Component
  const TimelineStep = React.memo(({ icon: Icon, title, description, date, isActive, isCompleted }) => (
    <div className="flex gap-2 md:gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg ${
          isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'
        }`}>
          <Icon className={`text-sm md:text-xl ${
            isCompleted || isActive ? 'text-white' : 'text-gray-500'
          }`} />
        </div>
        {title !== 'Delivered' && (
          <div className={`w-0.5 h-12 md:h-16 mt-2 ${
            isCompleted ? 'bg-green-500' : 'bg-gray-300'
          }`}></div>
        )}
      </div>
      <div className="flex-1 pb-4 md:pb-6">
        <h3 className={`font-semibold mb-1 text-sm md:text-base ${
          isCompleted || isActive ? 'text-gray-800' : 'text-gray-400'
        }`}>
          {title}
        </h3>
        <p className={`text-xs md:text-sm mb-1 ${
          isCompleted || isActive ? 'text-gray-600' : 'text-gray-500'
        }`}>
          {description}
        </p>
        {date && (
          <p className="text-[10px] md:text-xs text-gray-500">{date}</p>
        )}
      </div>
    </div>
  ));

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-blue-600 mx-auto mb-3 md:mb-4"></div>
          <p className="text-gray-600 text-sm md:text-base">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Print Styles - Hide Bottom Navigation */}
      <style>{`
        @media print {
          /* Hide bottom navigation - multiple selectors for reliability */
          nav[class*="fixed"][class*="bottom-0"],
          nav.fixed.bottom-0,
          nav[class*="bottom-0"][class*="left-0"],
          nav[class*="BottomNavigation"],
          .bottom-navigation,
          footer[class*="fixed"],
          footer[class*="bottom"],
          header[class*="fixed"][class*="bottom"] {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            overflow: hidden !important;
          }
          
          /* Remove body padding for bottom nav */
          body {
            padding-bottom: 0 !important;
            margin-bottom: 0 !important;
          }
          
          /* Hide action buttons when printing */
          button[onclick*="window.print"],
          button[onclick*="print"],
          a[href="/myorder"],
          a[href="/"],
          a[href*="/myorder"],
          a[href*="/"]:not([href*="mailto"]):not([href*="tel"]) {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* Hide print:hidden elements */
          .print\\:hidden,
          [class*="print:hidden"] {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* Ensure content is visible and properly sized */
          .min-h-screen {
            min-height: auto !important;
          }
          
          /* Remove background gradients for better printing */
          .bg-gradient-to-br,
          .bg-gradient-to-r {
            background: white !important;
          }
          
          /* Ensure proper page breaks */
          .bg-white {
            page-break-inside: avoid;
          }
          
          /* Remove shadows for cleaner print */
          .shadow-xl,
          .shadow-lg,
          .shadow-md,
          .shadow-sm {
            box-shadow: none !important;
          }
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-4 md:py-8">
      <div className="max-w-4xl mx-auto px-3 md:px-4">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-center mb-4 md:mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 md:w-24 md:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-2xl"
            >
              <FaCheckCircle className="text-white text-3xl md:text-5xl" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute inset-0 bg-green-500 rounded-full opacity-20"
            />
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-1 md:mb-2"
          >
            Order Confirmed!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm md:text-lg text-gray-600 mb-1 md:mb-2"
          >
            Thank you for your purchase
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs md:text-sm text-gray-500"
          >
            Order ID: <span className="font-semibold text-gray-700">{order.id}</span>
          </motion.p>
        </motion.div>

        {/* Order Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 lg:p-8 mb-4 md:mb-6 border border-gray-100"
        >
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Order Summary</h2>
          
          {/* Order Items */}
          <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
            {order.items.slice(0, 3).map((item, index) => (
              <div key={index} className="flex gap-2 md:gap-4 pb-3 md:pb-4 border-b border-gray-100 last:border-b-0">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100?text=Product';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 mb-1 text-sm md:text-base line-clamp-2">{item.name}</h4>
                  <p className="text-xs md:text-sm text-gray-600 mb-1">
                    {item.partNumber || item.id} | Qty: {item.quantity}
                  </p>
                  <p className="text-sm md:text-base font-semibold text-gray-800">
                    ₹{((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            {order.items.length > 3 && (
              <p className="text-xs md:text-sm text-gray-600 text-center pt-2">
                + {order.items.length - 3} more item{order.items.length - 3 > 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-6">
            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaMapMarkerAlt className="text-blue-600 text-sm md:text-base" />
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">Delivery Address</h3>
                </div>
                <p className="text-xs md:text-sm text-gray-600">
                  {order.shippingAddress.name}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  {order.shippingAddress.address}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  {order.shippingAddress.cityState}, {order.shippingAddress.postalCode}
                </p>
              </div>
            )}

            {/* Payment Info */}
            <div className="bg-gray-50 rounded-lg p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2">
                <FaCreditCard className="text-green-600 text-sm md:text-base" />
                <h3 className="font-semibold text-gray-800 text-sm md:text-base">Payment</h3>
              </div>
              <p className="text-xs md:text-sm text-gray-600 mb-1">
                Method: <span className="font-medium">{order.paymentMethod}</span>
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                Status: <span className={`font-medium ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.paymentStatus}
                </span>
              </p>
              <p className="text-base md:text-lg font-bold text-gray-800 mt-2">
                ₹{order.total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
            <div className="flex items-center gap-2 md:gap-3">
              <FaTruck className="text-blue-600 text-base md:text-xl" />
              <div>
                <p className="text-xs md:text-sm text-gray-600">Estimated Delivery</p>
                <p className="text-base md:text-lg font-semibold text-blue-800">
                  {getEstimatedDelivery()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Order Tracking Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 lg:p-8 mb-4 md:mb-6 border border-gray-100"
        >
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Order Tracking</h2>
          
          <div className="relative">
            <div className="space-y-4 md:space-y-6">
              <TimelineStep
                icon={FaCheckCircle}
                title="Order Placed"
                description="Your order has been successfully placed and confirmed"
                date={formatDate(order.date)}
                isCompleted={true}
              />
              <TimelineStep
                icon={FaBox}
                title="Processing Item"
                description="We are processing your items for shipment"
                date={formatDate(new Date(Date.now() + 86400000).toISOString())}
                isActive={true}
              />
              <TimelineStep
                icon={FaBox}
                title="Packed"
                description="Your order has been packed and ready to ship"
                isActive={false}
              />
              <TimelineStep
                icon={FaTruck}
                title="Handed to Courier"
                description="Your package has been handed to the courier"
                isActive={false}
              />
              <TimelineStep
                icon={FaTruck}
                title="Shipment In Transit"
                description="Your shipment is on its way to you"
                isActive={false}
              />
              <TimelineStep
                icon={FaCheckCircle}
                title="Delivery Completed"
                description="Your order has been delivered to your address"
                isActive={false}
              />
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center"
        >
          <Link
            to="/myorder"
            className="print:hidden flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg text-sm md:text-base"
          >
            <FaShoppingBag className="text-sm md:text-base" />
            View All Orders
          </Link>
          <Link
            to="/"
            className="print:hidden flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold shadow-lg text-sm md:text-base"
          >
            <FaHome className="text-sm md:text-base" />
            Continue Shopping
          </Link>
          <button
            onClick={() => window.print()}
            className="print:hidden flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold shadow-lg text-sm md:text-base"
          >
            <FaDownload className="text-sm md:text-base" />
            Download Receipt
          </button>
        </motion.div>

        {/* Support Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="print:hidden text-center mt-4 md:mt-8"
        >
          <p className="text-xs md:text-sm text-gray-600 mb-2">
            Need help? Check our{" "}
            <Link to="/support" className="text-blue-600 hover:underline font-medium">
              Support Center
            </Link>
            {" "}or{" "}
            <Link to="/faq" className="text-blue-600 hover:underline font-medium">
              FAQs
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default OrderConfirmation;
