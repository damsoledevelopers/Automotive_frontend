import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaMapMarkerAlt, FaFileAlt, FaCreditCard, FaCheckCircle } from "react-icons/fa";
import { useCart } from '../contexts/CartContext';
import WorkflowWrapper from './workflow/WorkflowWrapper';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getSubtotal,
    getTotalDiscount,
  } = useCart();
  const [removingItemId, setRemovingItemId] = useState(null);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = async (productId) => {
    setRemovingItemId(productId);
    // Add a small delay for animation
    setTimeout(() => {
      removeFromCart(productId);
      setRemovingItemId(null);
    }, 300);
  };

  const shippingCharges = getTotalPrice() > 500 ? 0 : 50;
  const finalTotal = getTotalPrice() + shippingCharges;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="section-container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="card max-w-2xl mx-auto text-center"
          >
            <motion.div 
              className="mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShoppingCart className="text-gray-700 text-5xl" />
              </div>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-3"
            >
              Your cart is empty
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-8 text-xs sm:text-sm"
            >
              Looks like you haven't added any items to your cart yet.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/catalog"
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
              >
                <FaShoppingCart />
                Continue Shopping
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <WorkflowWrapper currentStep="cart">
      <div className="py-4">

        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-3"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <motion.h1 
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Shopping Cart
              </motion.h1>
              <motion.p 
                className="text-gray-600 text-[10px] sm:text-xs flex items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-gray-100 text-gray-700 rounded-full text-[9px] sm:text-[10px] font-medium">
                  {getTotalItems()}
                </span>
                {getTotalItems() === 1 ? 'item' : 'items'} in your cart
              </motion.p>
            </div>
            {cartItems.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearCart}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors border border-gray-300"
              >
                <FaTrash />
                Clear All
              </motion.button>
            )}
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-2 sm:gap-3">
          {/* Enhanced Cart Items */}
          <div className="flex-1 order-1 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 overflow-hidden"
            >
              <div className="p-2 sm:p-3 md:p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900">
                    Cart Items ({getTotalItems()})
                  </h2>
                </div>
              </div>

              <AnimatePresence mode="popLayout">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="divide-y divide-gray-100"
                >
                  {cartItems.map((item, index) => {
                    const itemPrice = item.discountPrice || item.price;
                    const itemTotal = itemPrice * item.quantity;
                    // Use combination of id and partNumber for unique identification
                    const uniqueKey = item.partNumber ? `${item.id}-${item.partNumber}` : item.id;
                    const isRemoving = removingItemId === item.id;
                    
                    return (
                      <motion.div 
                        key={uniqueKey}
                        variants={itemVariants}
                        initial="hidden"
                        animate={isRemoving ? "exit" : "visible"}
                        exit="exit"
                        layout
                        className={`p-2 sm:p-3 md:p-4 hover:bg-gray-50 transition-all border-b border-gray-100 last:border-b-0 ${isRemoving ? 'opacity-50' : ''}`}
                      >
                        <div className="flex gap-2 sm:gap-3">
                          {/* Product Image */}
                          <motion.div 
                            className="flex-shrink-0 relative"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-gray-100 border border-gray-200">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/200x200?text=Product';
                                }}
                              />
                            </div>
                          </motion.div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div className="flex-1">
                              {/* Product Name and Remove Button Row */}
                              <div className="flex items-start justify-between gap-1.5 mb-1 sm:mb-1.5">
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-900 mb-0.5 line-clamp-2">
                                    {item.name}
                                  </h3>
                                  <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-500 mb-1.5">
                                    {item.brand}
                                  </p>
                                </div>
                                {/* Remove Button - Top Right */}
                                <motion.button
                                  whileHover={{ scale: 1.1, rotate: 12 }}
                                  whileTap={{ scale: 0.9, rotate: 0 }}
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all flex-shrink-0"
                                  title="Remove item"
                                >
                                  <FaTrash className="text-sm sm:text-base" />
                                </motion.button>
                              </div>

                              {/* Price Section */}
                              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                                <motion.span 
                                  className="text-sm sm:text-base md:text-lg font-semibold text-gray-900"
                                  initial={{ scale: 0.9 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  ₹{item.discountPrice ? item.discountPrice.toFixed(2) : item.price.toFixed(2)}
                                </motion.span>
                                {item.discountPrice && (
                                  <>
                                    <span className="text-[10px] sm:text-xs md:text-sm line-through text-gray-400">
                                      ₹{item.price.toFixed(2)}
                                    </span>
                                    <motion.span 
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="text-[9px] sm:text-[10px] md:text-xs bg-gray-100 text-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-medium"
                                    >
                                      Save ₹{((item.price - item.discountPrice) * item.quantity).toFixed(2)}
                                    </motion.span>
                                  </>
                                )}
                              </div>

                              {/* Quantity Controls and Item Total Row */}
                              <div className="flex items-center justify-between gap-3 sm:gap-4 pt-2 sm:pt-3 border-t border-gray-100">
                                {/* Quantity Controls */}
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 font-medium hidden sm:inline">
                                    Qty:
                                  </span>
                                  <div className="flex items-center bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                      className="bg-white text-gray-700 rounded-lg w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                                      disabled={item.quantity <= 1}
                                    >
                                      <FaMinus className="text-[10px] sm:text-xs" />
                                    </motion.button>
                                    <motion.span 
                                      key={item.quantity}
                                      initial={{ scale: 1.1 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", stiffness: 400 }}
                                      className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-gray-900 font-semibold min-w-[2rem] sm:min-w-[2.5rem] md:min-w-[3rem] text-center bg-white text-xs sm:text-sm border-x border-gray-200"
                                    >
                                      {item.quantity}
                                    </motion.span>
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                      className="bg-white text-gray-700 rounded-lg w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                    >
                                      <FaPlus className="text-[10px] sm:text-xs" />
                                    </motion.button>
                                  </div>
                                </div>

                                {/* Item Total */}
                                <div className="text-right">
                                  <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 block mb-0.5">
                                    Total
                                  </span>
                                  <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                                    ₹{itemTotal.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Enhanced Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-96 order-2 lg:order-2"
          >
            <div className="bg-white border border-gray-200 lg:sticky lg:top-4 overflow-hidden">
              <div className="bg-gray-900 p-2 sm:p-3 md:p-4 text-white">
                <h2 className="text-[11px] sm:text-xs md:text-sm font-semibold mb-0.5 flex items-center gap-1 sm:gap-1.5">
                  <FaShoppingCart className="text-gray-300 text-[10px] sm:text-xs md:text-sm" />
                  Order Summary
                </h2>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-300">Review your order details</p>
              </div>
              <div className="p-2 sm:p-3 md:p-4">
                <div className="space-y-1.5 sm:space-y-2 md:space-y-2.5 mb-3 sm:mb-4 md:mb-5">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-between items-center py-1 sm:py-1.5 md:py-2"
                >
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">Subtotal ({getTotalItems()} items)</span>
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-900">₹{getSubtotal().toFixed(2)}</span>
                </motion.div>
                
                {getTotalDiscount() > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-between items-center py-1 sm:py-1.5 md:py-2 bg-gray-50 rounded-lg px-2 sm:px-3 border border-gray-200"
                  >
                    <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-700 font-medium">Discount</span>
                    <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-700 font-semibold">- ₹{getTotalDiscount().toFixed(2)}</span>
                  </motion.div>
                )}
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-between items-center py-1 sm:py-1.5 md:py-2"
                >
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">Shipping</span>
                  <span className={`text-[9px] sm:text-[10px] md:text-xs font-semibold ${shippingCharges === 0 ? 'text-gray-600' : 'text-gray-900'}`}>
                    {shippingCharges === 0 ? (
                      <span className="flex items-center gap-0.5 sm:gap-1">
                        <FaCheckCircle className="text-gray-600 text-[9px] sm:text-[10px]" />
                        FREE
                      </span>
                    ) : (
                      `₹${shippingCharges.toFixed(2)}`
                    )}
                  </span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="border-t border-gray-200 pt-1.5 sm:pt-2 md:pt-2.5 mt-1.5 sm:mt-2 md:mt-2.5"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-900">Total</span>
                    <motion.span 
                      key={finalTotal}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-xs sm:text-sm md:text-base font-bold text-gray-900"
                    >
                      ₹{finalTotal.toFixed(2)}
                    </motion.span>
                  </div>
                </motion.div>
                </div>

                {getTotalPrice() < 500 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-1.5 sm:p-2 md:p-2.5 mb-2 sm:mb-3 md:mb-4"
                >
                  <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-700 font-medium">
                    💡 Add ₹{(500 - getTotalPrice()).toFixed(2)} more for <span className="font-semibold">FREE shipping!</span>
                  </p>
                </motion.div>
                )}

                <div className="space-y-1.5 sm:space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/checkout/address')}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-1.5 sm:py-2 md:py-2.5 px-2 sm:px-3 md:px-4 rounded-lg flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs transition-colors"
                >
                  <FaShoppingCart className="text-[10px] sm:text-xs" />
                  <span>Proceed to Checkout</span>
                </motion.button>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/catalog"
                    className="w-full border border-gray-300 text-gray-700 font-medium py-1.5 sm:py-2 px-2 sm:px-3 md:px-4 rounded-lg flex items-center justify-center gap-1 sm:gap-1.5 text-center text-[10px] sm:text-xs hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </motion.div>
                </div>

                {/* Security Badge */}
                <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-2 sm:mt-3 md:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-gray-200"
              >
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 text-[8px] sm:text-[9px] md:text-[10px] text-gray-600">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Secure Checkout</span>
                </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </WorkflowWrapper>
  );
};

export default Cart;