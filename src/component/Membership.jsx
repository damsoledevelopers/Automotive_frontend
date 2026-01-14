import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCrown, FaCheckCircle, FaTimes, FaGift, FaPercent, FaTruck, FaHeadset, FaStar, FaCreditCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Membership = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('Gold');
  const [currentMembership] = useState('Gold');

  const plans = {
    Gold: {
      name: 'Gold Membership',
      price: 999,
      color: 'from-gray-800 via-gray-900 to-gray-900',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-300',
      textColor: 'text-gray-700',
      benefits: [
        '20% discount on all services',
        'Free pickup and drop service',
        'Priority customer support',
        'Exclusive deals and offers',
        'Free diagnostic checkups',
        'Extended warranty coverage',
        'Early access to new products',
        'Monthly service credits'
      ],
      icon: <FaCrown className="text-3xl" />
    },
    Silver: {
      name: 'Silver Membership',
      price: 499,
      color: 'from-gray-600 via-gray-700 to-gray-800',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-300',
      textColor: 'text-gray-700',
      benefits: [
        '15% discount on all services',
        'Priority customer support',
        'Exclusive deals and offers',
        'Free diagnostic checkups',
        'Extended warranty coverage',
        'Early access to new products'
      ],
      icon: <FaStar className="text-3xl" />
    },
    Basic: {
      name: 'Basic Membership',
      price: 0,
      color: 'from-gray-500 via-gray-600 to-gray-700',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-300',
      textColor: 'text-gray-700',
      benefits: [
        '10% discount on services',
        'Standard customer support',
        'Access to basic offers',
        'Free diagnostic checkups'
      ],
      icon: <FaGift className="text-3xl" />
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2 transition-colors"
          >
            <span>←</span> Back
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
            Membership Plans
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Choose the perfect membership plan for your automotive needs
          </p>
        </div>

        {/* Current Membership Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 border border-gray-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <FaCrown className="text-2xl sm:text-3xl" />
              <div>
                <p className="text-sm sm:text-base opacity-90">Current Membership</p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{currentMembership} Member</h2>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Valid Until</p>
              <p className="text-lg sm:text-xl font-semibold">Dec 31, 2024</p>
            </div>
          </div>
        </motion.div>

        {/* Membership Plans */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {Object.entries(plans).map(([key, plan], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-lg border border-gray-200 overflow-hidden ${
                currentMembership === key ? 'ring-2 ring-gray-900' : ''
              } ${selectedPlan === key ? 'scale-105' : ''}`}
            >
              {currentMembership === key && (
                <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded text-xs font-semibold z-10">
                  ACTIVE
                </div>
              )}
              
              <div className="bg-gray-900 p-6 sm:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <div className="mb-4 relative z-10 text-white">{plan.icon}</div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 relative z-10 text-white">{plan.name}</h3>
                <div className="flex items-baseline gap-2 relative z-10">
                  <span className="text-3xl sm:text-4xl font-bold text-white">
                    {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                  </span>
                  {plan.price > 0 && <span className="text-sm text-white/90">/year</span>}
                </div>
              </div>

              <div className={`${plan.bgColor} p-6 sm:p-8`}>
                <ul className="space-y-3 mb-6">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <FaCheckCircle className={`${plan.textColor} mt-1 flex-shrink-0`} />
                      <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {currentMembership === key ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-lg font-medium bg-gray-200 text-gray-500 cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPlan(key)}
                    className="w-full py-3 rounded-lg font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors"
                  >
                    {plan.price === 0 ? 'Select Plan' : 'Upgrade Now'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 mb-8"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">Plan Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Features</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Basic</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Silver</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Gold</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Discount on Services</td>
                  <td className="py-3 px-4 text-center">10%</td>
                  <td className="py-3 px-4 text-center">15%</td>
                  <td className="py-3 px-4 text-center font-semibold text-gray-900">20%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Free Pickup & Drop</td>
                  <td className="py-3 px-4 text-center"><FaTimes className="text-gray-400 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><FaTimes className="text-gray-400 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><FaCheckCircle className="text-gray-700 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Priority Support</td>
                  <td className="py-3 px-4 text-center"><FaTimes className="text-gray-400 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><FaCheckCircle className="text-gray-700 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><FaCheckCircle className="text-gray-700 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Monthly Credits</td>
                  <td className="py-3 px-4 text-center"><FaTimes className="text-gray-400 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><FaTimes className="text-gray-400 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><FaCheckCircle className="text-gray-700 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Payment Section */}
        {selectedPlan !== currentMembership && selectedPlan !== 'Basic' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">Payment Details</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{plans[selectedPlan].name}</p>
                  <p className="text-sm text-gray-600">Annual subscription</p>
                </div>
                <p className="text-xl font-semibold text-gray-900">₹{plans[selectedPlan].price}</p>
              </div>
              <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                <FaCreditCard className="text-2xl text-gray-600" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Credit/Debit Card</p>
                  <p className="text-sm text-gray-600">Pay securely with your card</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-900 text-white py-4 rounded-lg font-medium text-lg hover:bg-gray-800 transition-colors"
              >
                Proceed to Payment
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Membership;

