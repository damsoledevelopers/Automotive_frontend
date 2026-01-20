import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaShoppingCart, 
  FaMapMarkerAlt, 
  FaFileAlt, 
  FaCreditCard, 
  FaArrowLeft, 
  FaCheck, 
  FaLock, 
  FaTimes,
  FaMobileAlt,
  FaUniversity,
  FaWallet,
  FaShieldAlt,
  FaCheckCircle
} from "react-icons/fa";
import { 
  SiPaytm,
  SiRazorpay
} from "react-icons/si";
import { useCart } from "../../contexts/CartContext";
import WorkflowWrapper from "../workflow/WorkflowWrapper";

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, getSubtotal, getTotalItems, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Payment form data
  const [paymentData, setPaymentData] = useState({
    upiId: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    bankName: '',
    paytmPhone: '',
  });

  useEffect(() => {
    const savedAddress = localStorage.getItem('shippingAddress');
    if (savedAddress) {
      setShippingAddress(JSON.parse(savedAddress));
    } else {
      navigate('/checkout/address');
    }
  }, [navigate]);

  // Calculate totals
  const deliveryCharge = useMemo(() => {
    return getSubtotal() >= 500 ? 0 : 84;
  }, [getSubtotal]);

  const platformFee = 120;
  const grandTotal = useMemo(() => {
    return getTotalPrice() + deliveryCharge + platformFee;
  }, [getTotalPrice, deliveryCharge]);

  const paymentOptions = useMemo(() => [
    {
      id: 'paytm',
      name: 'Paytm',
      icon: SiPaytm,
      color: '#00BAF2',
      description: 'Pay using Paytm Wallet or UPI',
      popular: true,
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      icon: SiRazorpay,
      color: '#0C2451',
      description: 'Secure payment gateway',
      popular: true,
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: FaMobileAlt,
      color: '#5F259F',
      description: 'Google Pay, PhonePe, BHIM & more',
      popular: true,
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: FaCreditCard,
      color: '#1A1F71',
      description: 'Visa, Mastercard, RuPay & more',
      popular: false,
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: FaUniversity,
      color: '#0066CC',
      description: 'All major banks supported',
      popular: false,
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: FaWallet,
      color: '#FF6B35',
      description: 'Pay when you receive the order',
      popular: false,
    },
  ], []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const formatCardNumber = useCallback((value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  }, []);

  const formatExpiryDate = useCallback((value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  }, []);

  const handleCardNumberChange = useCallback((e) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentData(prev => ({ ...prev, cardNumber: formatted }));
  }, [formatCardNumber]);

  const handleExpiryChange = useCallback((e) => {
    const formatted = formatExpiryDate(e.target.value);
    setPaymentData(prev => ({ ...prev, expiryDate: formatted }));
  }, [formatExpiryDate]);

  const validatePaymentData = useCallback(() => {
    switch (selectedPayment) {
      case 'upi':
        if (!paymentData.upiId || !paymentData.upiId.includes('@')) {
          alert('Please enter a valid UPI ID (e.g., yourname@paytm)');
          return false;
        }
        break;
      case 'card':
        if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, '').length < 16) {
          alert('Please enter a valid 16-digit card number');
          return false;
        }
        if (!paymentData.cardName) {
          alert('Please enter name on card');
          return false;
        }
        if (!paymentData.expiryDate || paymentData.expiryDate.length < 5) {
          alert('Please enter valid expiry date (MM/YY)');
          return false;
        }
        if (!paymentData.cvv || paymentData.cvv.length < 3) {
          alert('Please enter valid CVV');
          return false;
        }
        break;
      case 'netbanking':
        if (!paymentData.bankName) {
          alert('Please select a bank');
          return false;
        }
        break;
      case 'paytm':
        if (!paymentData.paytmPhone || paymentData.paytmPhone.length < 10) {
          alert('Please enter a valid Paytm phone number');
          return false;
        }
        break;
      case 'cod':
        return true;
      case 'razorpay':
        return true;
      default:
        return false;
    }
    return true;
  }, [selectedPayment, paymentData]);

  const processOrder = useCallback(() => {
    const orderId = `ORD-${Date.now()}`;
    const orderDate = new Date().toISOString();
    
    // Group items by seller for packages
    const groupItemsBySeller = () => {
      const packages = {};
      cartItems.forEach((item) => {
        const seller = item.seller || "Default Seller";
        if (!packages[seller]) {
          packages[seller] = [];
        }
        packages[seller].push(item);
      });
      return Object.entries(packages).map(([seller, items], index) => ({
        packageNumber: index + 1,
        seller,
        items,
      }));
    };

    const packages = groupItemsBySeller();
    const getDeliveryCharge = (packageTotal) => {
      return packageTotal >= 500 ? 0 : 58;
    };
    const totalDeliveryCharge = packages.reduce((total, pkg) => {
      const packageTotal = pkg.items.reduce((sum, item) => {
        return sum + ((item.discountPrice || item.price) * item.quantity);
      }, 0);
      return total + getDeliveryCharge(packageTotal);
    }, 0);
    const platformFee = Math.max(packages.length * 16, 32);

    const order = {
      id: orderId,
      date: orderDate,
      status: selectedPayment === 'cod' ? 'Pending Payment' : 'Confirmed',
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        imageUrl: item.imageUrl,
        price: item.price,
        discountPrice: item.discountPrice,
        quantity: item.quantity,
        seller: item.seller || "Default Seller",
        partNumber: item.partNumber || item.id,
      })),
      packages: packages,
      shippingAddress: shippingAddress,
      paymentMethod: paymentOptions.find(p => p.id === selectedPayment)?.name || selectedPayment,
      paymentStatus: selectedPayment === 'cod' ? 'Pending' : 'Paid',
      paymentDetails: selectedPayment === 'cod' || selectedPayment === 'razorpay' 
        ? null 
        : { ...paymentData, method: selectedPayment },
      subtotal: getSubtotal(),
      deliveryCharge: totalDeliveryCharge,
      platformFee: platformFee,
      total: grandTotal,
      totalItems: getTotalItems(),
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Clear cart
    clearCart();

    setIsProcessing(false);

    // Navigate to order confirmation page
    navigate(`/checkout/confirmation?orderId=${orderId}`, { 
      state: { orderId } 
    });
  }, [cartItems, selectedPayment, shippingAddress, paymentData, paymentOptions, getSubtotal, grandTotal, getTotalItems, clearCart, navigate]);

  const handlePlaceOrder = useCallback(async () => {
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }
    
    if (selectedPayment !== 'cod' && selectedPayment !== 'razorpay') {
      if (!validatePaymentData()) {
        return;
      }
    }

    setIsProcessing(true);

    if (selectedPayment === 'razorpay') {
      setTimeout(() => {
        processOrder();
      }, 2000);
      return;
    }

    processOrder();
  }, [selectedPayment, validatePaymentData, processOrder]);

  const banks = useMemo(() => [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India',
    'Indian Bank',
  ], []);

  // Render payment form based on selected method
  const renderPaymentForm = useCallback(() => {
    if (!selectedPayment) return null;

    switch (selectedPayment) {
      case 'upi':
        return (
          <div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                UPI ID <span className="text-gray-700">*</span>
              </label>
              <input
                type="text"
                name="upiId"
                value={paymentData.upiId}
                onChange={handleInputChange}
                placeholder="yourname@paytm or yourname@ybl"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                Enter your UPI ID (e.g., yourname@paytm, yourname@ybl, yourname@okaxis)
              </p>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Card Number <span className="text-gray-700">*</span>
              </label>
              <input
                type="text"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Name on Card <span className="text-gray-700">*</span>
              </label>
              <input
                type="text"
                name="cardName"
                value={paymentData.cardName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Expiry Date <span className="text-gray-700">*</span>
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  CVV <span className="text-gray-700">*</span>
                </label>
                <input
                  type="password"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <FaLock className="text-gray-400" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>
        );

      case 'netbanking':
        return (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Bank Name <span className="text-gray-700">*</span>
            </label>
            <select
              name="bankName"
              value={paymentData.bankName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
              required
            >
              <option value="">Select your bank</option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>
        );

      case 'paytm':
        return (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Paytm Phone Number <span className="text-gray-700">*</span>
            </label>
            <div className="flex gap-2">
              <div className="w-20">
                <input
                  type="text"
                  value="+91"
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-center font-medium"
                />
              </div>
              <div className="flex-1">
                <input
                  type="tel"
                  name="paytmPhone"
                  value={paymentData.paytmPhone}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                  required
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Enter the mobile number linked to your Paytm account
            </p>
          </div>
        );

      case 'razorpay':
        return (
          <div>
            <p className="text-xs text-gray-600 mb-4">
              You will be redirected to Razorpay's secure payment gateway to complete your transaction.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <p className="text-xs text-gray-700">
                <strong>Secure Payment:</strong> Your payment will be processed securely by Razorpay. 
                We do not store your payment information.
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-xs text-yellow-800">
                <strong>Note:</strong> After clicking "Pay & Place Order", you will be redirected to Razorpay's payment page. 
                Complete the payment there to confirm your order.
              </p>
            </div>
          </div>
        );

      case 'cod':
        return (
          <div>
            <p className="text-xs text-gray-600 mb-4">
              You will pay the order amount (₹{grandTotal.toFixed(2)}) when you receive your order.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-xs text-yellow-800">
                <strong>Note:</strong> Please keep exact change ready for delivery.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  }, [selectedPayment, paymentData, handleInputChange, handleCardNumberChange, handleExpiryChange, banks, grandTotal]);

  // Progress Bar Component
  // ProgressBar removed - using WorkflowWrapper instead
  const _ProgressBar = React.memo(() => (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-2 md:mt-4 mb-2 bg-white border border-gray-200 p-2 sm:p-3 md:p-4"
    >
      <div className="flex items-center justify-center space-x-0.5 sm:space-x-1 md:space-x-2">
        <motion.button
          onClick={() => navigate('/cart')}
          className="flex flex-col items-center cursor-pointer group flex-shrink-0 min-w-[45px] sm:min-w-[50px] md:min-w-[55px]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gray-100 rounded-full flex items-center justify-center mb-0.5 sm:mb-1 group-hover:bg-gray-200 transition-colors"
          >
            <FaShoppingCart className="text-gray-700 text-xs sm:text-sm md:text-base" />
          </motion.div>
          <span className="text-[10px] sm:text-xs text-gray-600 font-medium">Cart</span>
        </motion.button>
        <motion.div 
          className="h-0.5 flex-1 sm:flex-none sm:w-6 md:w-8 lg:w-10 xl:w-12 bg-gray-300 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.button
          onClick={() => navigate('/checkout/address')}
          className="flex flex-col items-center cursor-pointer group flex-shrink-0 min-w-[45px] sm:min-w-[50px] md:min-w-[55px]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gray-100 rounded-full flex items-center justify-center mb-0.5 sm:mb-1 group-hover:bg-gray-200 transition-colors"
          >
            <FaMapMarkerAlt className="text-gray-700 text-xs sm:text-sm md:text-base" />
          </motion.div>
          <span className="text-[10px] sm:text-xs text-gray-600 font-medium">Address</span>
        </motion.button>
        <motion.div 
          className="h-0.5 flex-1 sm:flex-none sm:w-6 md:w-8 lg:w-10 xl:w-12 bg-gray-300 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        <motion.button
          onClick={() => navigate('/checkout/review')}
          className="flex flex-col items-center cursor-pointer group flex-shrink-0 min-w-[45px] sm:min-w-[50px] md:min-w-[55px]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gray-100 rounded-full flex items-center justify-center mb-0.5 sm:mb-1 group-hover:bg-gray-200 transition-colors"
          >
            <FaFileAlt className="text-gray-700 text-xs sm:text-sm md:text-base" />
          </motion.div>
          <span className="text-[10px] sm:text-xs text-gray-600 font-medium">Review</span>
        </motion.button>
        <motion.div 
          className="h-0.5 flex-1 sm:flex-none sm:w-6 md:w-8 lg:w-10 xl:w-12 bg-gray-900 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.div 
          className="flex flex-col items-center flex-shrink-0 min-w-[45px] sm:min-w-[50px] md:min-w-[55px]"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
        >
          <motion.div 
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gray-900 rounded-full flex items-center justify-center mb-0.5 sm:mb-1 relative overflow-hidden"
          >
            <FaCreditCard className="text-white text-xs sm:text-sm md:text-base relative z-10" />
          </motion.div>
          <span className="text-[10px] sm:text-xs text-gray-900 font-semibold">Pay</span>
        </motion.div>
      </div>
    </motion.div>
  ));

  // Payment Option Card Component
  const PaymentOptionCard = React.memo(({ option, index, isSelected, onSelect }) => {
    const IconComponent = option.icon;
    const iconBgStyle = isSelected 
      ? { background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }
      : { background: `linear-gradient(135deg, ${option.color}, ${option.color}dd)` };
    
    return (
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onClick={() => {
          onSelect(option.id);
          setShowPaymentModal(true);
        }}
        whileHover={isSelected ? undefined : { scale: 1.03, y: -4 }}
        whileTap={isSelected ? undefined : { scale: 0.97 }}
        className={`relative p-4 sm:p-5 border border-gray-200 text-left overflow-hidden ${
          isSelected
            ? 'border-gray-900 bg-gray-50 cursor-default'
            : 'hover:border-gray-400 bg-white hover:bg-gray-50 group transition-all'
        }`}
      >
        {/* Selected checkmark */}
        {isSelected && (
          <motion.div 
            className="absolute top-3 right-3 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center z-10"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaCheckCircle className="text-white text-xs" />
          </motion.div>
        )}

        <div className="flex items-center gap-4 relative z-10">
          {/* Icon Container */}
          <motion.div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center bg-gray-100"
          >
            <IconComponent 
              className="text-xl sm:text-2xl text-gray-700"
            />
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                {option.name}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              {option.description}
            </p>
          </div>
        </div>

      </motion.button>
    );
  });

  if (!shippingAddress) {
    return null;
  }

  return (
    <WorkflowWrapper currentStep="pay">
      <div className="min-h-screen bg-gray-50 py-4">
        <div className="max-w-6xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
            Payment Method
          </h1>
          <p className="text-gray-600 text-sm">Choose your preferred payment option</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Payment Options */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 p-4 sm:p-6 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                    Select Payment Method
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Choose a secure payment option
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded">
                  <FaShieldAlt className="text-gray-600 text-sm" />
                  <span className="text-xs font-medium text-gray-700">Secure</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {paymentOptions.map((option, index) => (
                  <PaymentOptionCard
                    key={option.id}
                    option={option}
                    index={index}
                    isSelected={selectedPayment === option.id}
                    onSelect={setSelectedPayment}
                  />
                ))}
              </div>

              {/* Security Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <FaLock className="text-gray-500" />
                  <span>256-bit SSL Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-gray-500" />
                  <span>PCI DSS Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-gray-500" />
                  <span>100% Secure</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Payment Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-200 p-4 sm:p-6 sticky top-4"
            >
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
                <FaShoppingCart className="text-gray-700" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm text-gray-700">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                    {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                  </span>
                  <span className="font-medium">₹{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Delivery Charge</span>
                  <span className={deliveryCharge === 0 ? 'text-green-600 font-semibold' : 'font-medium'}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Platform Fee</span>
                  <span className="font-medium">₹{platformFee.toFixed(2)}</span>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="border-t border-gray-200 pt-4 mb-4"
              >
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-semibold text-gray-900">Grand Total</span>
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">
                    ₹{grandTotal.toFixed(2)}
                  </span>
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                  <FaShieldAlt className="text-gray-500" />
                  <span className="font-medium">Your payment is secure</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <FaCheckCircle className="text-gray-500" />
                  <span>Protected by industry standards</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-200 p-4 sm:p-6"
        >
          <button
            onClick={() => navigate('/checkout/review')}
            className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium w-full sm:w-auto justify-center"
          >
            <FaArrowLeft />
            Back
          </button>
        </motion.div>
      </div>

      {/* Payment Details Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white">
                <div className="flex items-center gap-3">
                  {selectedPayment && (() => {
                    const option = paymentOptions.find(p => p.id === selectedPayment);
                    const IconComponent = option?.icon;
                    return IconComponent ? (
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                        style={{ background: `linear-gradient(135deg, ${option.color}, ${option.color}dd)` }}
                      >
                        <IconComponent className="text-white text-lg" />
                      </div>
                    ) : null;
                  })()}
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      {paymentOptions.find(p => p.id === selectedPayment)?.name} Payment
                    </h2>
                    <p className="text-xs text-gray-600">Enter your payment details</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    if (selectedPayment !== 'cod' && selectedPayment !== 'razorpay') {
                      setPaymentData({
                        upiId: '',
                        cardNumber: '',
                        cardName: '',
                        expiryDate: '',
                        cvv: '',
                        bankName: '',
                        paytmPhone: '',
                      });
                    }
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Modal Body - Payment Form */}
              <div className="p-6">
                {renderPaymentForm()}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200 sticky bottom-0 bg-white">
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    if (selectedPayment !== 'cod' && selectedPayment !== 'razorpay') {
                      setPaymentData({
                        upiId: '',
                        cardNumber: '',
                        cardName: '',
                        expiryDate: '',
                        cvv: '',
                        bankName: '',
                        paytmPhone: '',
                      });
                    }
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (selectedPayment === 'cod' || selectedPayment === 'razorpay') {
                      setShowPaymentModal(false);
                      return;
                    }
                    if (validatePaymentData()) {
                      setShowPaymentModal(false);
                    }
                  }}
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <FaCheck className="text-xs" />
                  Confirm Payment Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </WorkflowWrapper>
  );
};

export default Payment;
