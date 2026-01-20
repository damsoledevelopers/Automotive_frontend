import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaShoppingCart, 
  FaMapMarkerAlt, 
  FaFileAlt, 
  FaCreditCard, 
  FaArrowLeft, 
  FaQuestionCircle, 
  FaCheckCircle 
} from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import WorkflowWrapper from "../workflow/WorkflowWrapper";

const Review = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, getSubtotal, getTotalItems } = useCart();
  const [shippingAddress, setShippingAddress] = useState(null);

  useEffect(() => {
    const savedAddress = localStorage.getItem('shippingAddress');
    if (savedAddress) {
      setShippingAddress(JSON.parse(savedAddress));
    } else {
      navigate('/checkout/address');
    }
  }, [navigate]);

  // Group items by seller to create packages
  const packages = useMemo(() => {
    const packageMap = {};
    cartItems.forEach((item) => {
      const seller = item.seller || "Default Seller";
      if (!packageMap[seller]) {
        packageMap[seller] = [];
      }
      packageMap[seller].push(item);
    });
    return Object.entries(packageMap).map(([seller, items], index) => ({
      packageNumber: index + 1,
      seller,
      items,
    }));
  }, [cartItems]);

  // Calculate delivery charge per package
  const getDeliveryCharge = useCallback((packageTotal) => {
    return packageTotal >= 500 ? 0 : 58;
  }, []);

  // Calculate totals
  const totalDeliveryCharge = useMemo(() => {
    return packages.reduce((total, pkg) => {
      const packageTotal = pkg.items.reduce((sum, item) => {
        return sum + ((item.discountPrice || item.price) * item.quantity);
      }, 0);
      return total + getDeliveryCharge(packageTotal);
    }, 0);
  }, [packages, getDeliveryCharge]);

  const platformFee = useMemo(() => {
    return Math.max(packages.length * 16, 32);
  }, [packages.length]);

  const grandTotal = useMemo(() => {
    return getTotalPrice() + totalDeliveryCharge + platformFee;
  }, [getTotalPrice, totalDeliveryCharge, platformFee]);

  const boodmoPoints = useMemo(() => {
    return Math.floor(getTotalPrice() / 100);
  }, [getTotalPrice]);

  // Calculate total savings from discounts
  const totalSavings = useMemo(() => {
    return cartItems.reduce((total, item) => {
      if (item.discountPrice && item.discountPrice < item.price) {
        return total + ((item.price - item.discountPrice) * item.quantity);
      }
      return total;
    }, 0);
  }, [cartItems]);

  const itemsWithSavings = useMemo(() => {
    return cartItems.filter(item =>
      item.discountPrice && item.discountPrice < item.price
    ).reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  // Format date for delivery estimate
  const getDeliveryDate = useCallback((packageNum) => {
    const date = new Date();
    date.setDate(date.getDate() + (packageNum === 1 ? 10 : 18));
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  }, []);

  const handleBack = useCallback(() => {
    navigate('/checkout/address');
  }, [navigate]);

  const handleContinue = useCallback(() => {
    navigate('/checkout/payment');
  }, [navigate]);

  const handleOpenMap = useCallback((address) => {
    const fullAddress = `${address.address}, ${address.cityState}, ${address.postalCode}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
    window.open(googleMapsUrl, '_blank');
  }, []);

  // Progress Bar Component
  // ProgressBar removed - using WorkflowWrapper instead

  // Package Card Component
  const PackageCard = React.memo(({ pkg, index, getDeliveryCharge, getDeliveryDate }) => {
    const packageTotal = useMemo(() => {
      return pkg.items.reduce((sum, item) => {
        return sum + ((item.discountPrice || item.price) * item.quantity);
      }, 0);
    }, [pkg.items]);

    const deliveryCharge = getDeliveryCharge(packageTotal);
    const deliveryDate = getDeliveryDate(pkg.packageNumber);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, x: -100 }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
        whileHover={{ y: 0 }}
        className="bg-white border border-gray-200 p-4 overflow-hidden relative"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium">
            {pkg.packageNumber}
          </div>
          <h2 className="text-sm font-semibold text-gray-900">
            Order Package #{pkg.packageNumber}
          </h2>
        </div>

        {pkg.items.map((item, itemIndex) => {
          const unitPrice = item.discountPrice || item.price;
          const itemTotal = unitPrice * item.quantity;
          const mrp = item.price;
          const hasDiscount = item.discountPrice && item.discountPrice < item.price;

          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index * 0.1) + (itemIndex * 0.05) }}
              className="flex gap-2 sm:gap-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200 last:border-b-0"
            >
              <motion.div className="relative group">
                <motion.img
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  src={item.imageUrl || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100?text=Product';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-0.5">{item.name}</h3>
                <p className="text-[10px] sm:text-xs text-gray-600 mb-0.5">
                  {item.partNumber || item.id}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-600 mb-1.5">
                  Brand: {item.brand || "N/A"} | Sold by: {item.seller || pkg.seller}
                </p>
                <div className="mt-2">
                  <p className="text-xs text-gray-700">
                    {item.quantity} × ₹{unitPrice.toFixed(2)}
                  </p>
                  {hasDiscount && (
                    <p className="text-xs text-gray-500 line-through mt-1">
                      MRP: ₹{mrp.toFixed(2)}
                    </p>
                  )}
                  <p className="text-base font-semibold text-gray-800 mt-1">
                    ₹{itemTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (index * 0.1) + 0.3 }}
          className="mt-4 pt-4 border-t border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Standard Delivery</p>
              <p className="text-xs text-gray-700 mt-1">
                Estimated delivery by {deliveryDate}
              </p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-medium ${
                deliveryCharge === 0 ? 'text-gray-600' : 'text-gray-800'
              }`}>
                {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge.toFixed(2)}`}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (index * 0.1) + 0.4 }}
          className="mt-4 pt-4 border-t border-gray-200"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">Package Total</span>
            <span className="text-base font-semibold text-gray-900">
              ₹{(packageTotal + deliveryCharge).toFixed(2)}
            </span>
          </div>
        </motion.div>
      </motion.div>
    );
  });

  if (!shippingAddress) {
    return null;
  }

  return (
    <WorkflowWrapper currentStep="review">
      <div className="min-h-screen bg-gray-50 py-4">
        <div className="max-w-6xl mx-auto px-4">

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
            Order Review
          </h1>
          <p className="text-gray-600 text-sm">Review your order details before proceeding</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-6"
        >
          <AnimatePresence mode="popLayout">
            {packages.map((pkg, index) => (
              <PackageCard 
                key={pkg.packageNumber} 
                pkg={pkg} 
                index={index}
                getDeliveryCharge={getDeliveryCharge}
                getDeliveryDate={getDeliveryDate}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 p-4 sm:p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-900">Shipping Address</h2>
            <button
              onClick={() => handleOpenMap(shippingAddress)}
              className="text-xs text-gray-600 hover:text-gray-900 underline flex items-center gap-1 transition-colors"
              title="Open in Google Maps"
            >
              <FaMapMarkerAlt className="text-xs" />
              View on Map
            </button>
          </div>
          <div className="text-gray-700">
            <p className="text-sm font-medium">
              {shippingAddress.name} - {shippingAddress.mobile}
            </p>
            <p className="text-xs mt-1 text-gray-600">
              {shippingAddress.address}, {shippingAddress.cityState}, {shippingAddress.postalCode}
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-gray-200 p-4 sm:p-6"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="disableReplacements"
                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
              />
              <label htmlFor="disableReplacements" className="text-xs text-gray-700 flex items-center gap-1">
                Disable part replacements
                <FaQuestionCircle className="text-gray-400 text-xs" />
              </label>
            </div>

            <div className="text-right">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between gap-8 mb-2">
                  <span className="text-gray-600">{getTotalItems()} items</span>
                  <span className="text-gray-800 font-medium">₹{getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-gray-600">Delivery Charge:</span>
                  <span className="text-gray-800 font-medium">₹{totalDeliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-gray-600">Platform Fee:</span>
                  <span className="text-gray-800 font-medium">₹{platformFee.toFixed(2)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between gap-8">
                    <span className="text-gray-600">
                      Total Savings ({itemsWithSavings} {itemsWithSavings === 1 ? 'item' : 'items'}):
                    </span>
                    <span className="text-gray-600 font-medium">₹{totalSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between gap-8 items-center">
                  <span className="text-gray-600">boodmo Points to be earned:</span>
                  <span className="text-gray-700 font-medium flex items-center gap-1">
                    {boodmoPoints}
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                </div>
                <div className="flex justify-between gap-8 pt-2 border-t border-gray-200">
                  <span className="text-base font-semibold text-gray-800">Grand Total:</span>
                  <span className="text-xl font-bold text-gray-800">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between pt-6 border-t border-gray-200"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <FaArrowLeft />
              Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Continue
            </motion.button>
          </motion.div>
        </motion.div>
        </div>
      </div>
    </WorkflowWrapper>
  );
};

export default Review;
