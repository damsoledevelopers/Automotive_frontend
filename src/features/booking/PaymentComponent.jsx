import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from './BookingContext';
import {
  FaCreditCard,
  FaWallet,
  FaMoneyBillWave,
  FaLock,
  FaCheckCircle,
  FaClock,
  FaArrowLeft,
} from 'react-icons/fa';

const PAYMENT_METHODS = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: FaCreditCard,
    description: 'Pay securely with your card',
  },
  {
    id: 'upi',
    name: 'UPI',
    icon: FaWallet,
    description: 'Pay instantly with UPI',
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    icon: FaMoneyBillWave,
    description: 'Pay through your bank account',
  },
];

const PaymentComponent = () => {
  const { state, setStep, completeBooking } = useBooking();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const amount = calculateTotal(state.selectedServices);

  useEffect(() => {
    // Load Razorpay SDK
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const calculateTotal = (services) => {
    const subtotal = services.reduce((total, service) => total + service.price, 0);
    const tax = subtotal * 0.18;
    const discount = services.length > 2 ? subtotal * 0.05 : 0;
    return subtotal + tax - discount;
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Initialize Razorpay payment
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'Automotive Service',
        description: 'Service Booking Payment',
        handler: function (response) {
          handlePaymentSuccess(response);
        },
        prefill: {
          name: state.user?.name || '',
          email: state.user?.email || '',
          contact: state.user?.phone || '',
        },
        theme: {
          color: '#EF4444',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment initialization failed:', error);
      setPaymentStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (response) => {
    setPaymentStatus('processing');
    try {
      // Here you would typically verify the payment with your backend
      // and create the booking record
      
      // For demo purposes, we'll simulate a backend call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPaymentStatus('success');
      completeBooking({
        paymentId: response.razorpay_payment_id,
        amount: amount,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Payment verification failed:', error);
      setPaymentStatus('failed');
    }
  };

  const renderPaymentStatus = () => {
    switch (paymentStatus) {
      case 'processing':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8"
          >
            <FaClock className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Processing Payment</h3>
            <p className="text-gray-600">Please wait while we confirm your payment...</p>
          </motion.div>
        );
      case 'success':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8"
          >
            <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">Your booking has been confirmed.</p>
            <motion.button
              onClick={() => window.location.href = '/bookings'}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Booking
            </motion.button>
          </motion.div>
        );
      case 'failed':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8"
          >
            <FaTimesCircle className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Payment Failed</h3>
            <p className="text-gray-600 mb-4">Please try again or choose a different payment method.</p>
            <motion.button
              onClick={() => setPaymentStatus(null)}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (paymentStatus) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        {renderPaymentStatus()}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment</h2>

      {/* Amount Display */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Total Amount</p>
          <p className="text-2xl font-bold">₹{amount.toFixed(2)}</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        {PAYMENT_METHODS.map((method) => (
          <motion.button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`w-full p-4 rounded-lg border ${
              selectedMethod === method.id
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-red-500 hover:bg-red-50'
            } flex items-center gap-4`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <method.icon className={`text-2xl ${
              selectedMethod === method.id ? 'text-red-500' : 'text-gray-400'
            }`} />
            <div className="text-left">
              <p className="font-medium">{method.name}</p>
              <p className="text-sm text-gray-500">{method.description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Secure Payment Notice */}
      <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
        <FaLock />
        <p>Your payment information is secure and encrypted</p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <motion.button
          onClick={() => setStep(4)}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaArrowLeft className="inline mr-2" />
          Back
        </motion.button>
        <motion.button
          onClick={handlePayment}
          disabled={!selectedMethod || loading}
          className={`px-6 py-2 rounded-lg text-white ${
            !selectedMethod || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600'
          }`}
          whileHover={selectedMethod && !loading ? { scale: 1.02 } : {}}
          whileTap={selectedMethod && !loading ? { scale: 0.98 } : {}}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </motion.button>
      </div>
    </div>
  );
};

export default PaymentComponent;