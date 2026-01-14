import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWallet, FaPlus, FaArrowDown, FaArrowUp, FaHistory, FaRupeeSign, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Wallet = () => {
  const navigate = useNavigate();
  const [balance] = useState(1250.50);
  const [transactions] = useState([
    { id: 1, type: 'credit', amount: 500, description: 'Recharge', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'debit', amount: 250, description: 'Order Payment', date: '2024-01-14', status: 'completed' },
    { id: 3, type: 'credit', amount: 1000, description: 'Refund', date: '2024-01-10', status: 'completed' },
    { id: 4, type: 'debit', amount: 150, description: 'Service Booking', date: '2024-01-08', status: 'completed' },
    { id: 5, type: 'credit', amount: 200, description: 'Cashback', date: '2024-01-05', status: 'completed' },
  ]);

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6"
        >
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 mb-2 sm:mb-4 flex items-center gap-1.5 text-sm sm:text-base transition-colors font-medium"
          >
            <span>←</span> Back
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900">
            My Wallet
          </h1>
        </motion.div>

        {/* Wallet Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gray-900 border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 text-white"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2.5 sm:p-3 rounded-full">
                <FaWallet className="text-xl sm:text-2xl text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-white/90 mb-1">Total Balance</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center gap-1">
                  <FaRupeeSign className="text-xl sm:text-2xl" />
                  {balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
              </div>
            </div>
          </div>

          {/* Quick Actions - Side by Side */}
          <div className="flex gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-white text-gray-900 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors border border-gray-300"
            >
              <FaPlus className="text-xs sm:text-sm text-gray-900" />
              Add Money
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gray-800 border border-gray-700 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-gray-700 transition-colors"
            >
              <FaHistory className="text-xs sm:text-sm text-white" />
              Transaction History
            </motion.button>
          </div>
        </motion.div>

        {/* Quick Recharge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Quick Recharge</h3>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
            {quickAmounts.map((amount, index) => (
              <motion.button
                key={amount}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 min-w-[80px] sm:min-w-[100px] bg-white border border-gray-300 p-2.5 sm:p-3 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-colors"
              >
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">₹</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">{amount.toLocaleString('en-IN')}</p>
                </div>
              </motion.button>
            ))}
          </div>
          <div className="mb-3 sm:mb-4">
            <input
              type="number"
              placeholder="Enter custom amount"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm sm:text-base transition-all"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-gray-900 text-white py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-gray-800 transition-colors"
          >
            Recharge Wallet
          </motion.button>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Transactions</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-gray-700 hover:text-gray-900 font-medium text-xs sm:text-sm transition-colors"
            >
              View All
            </motion.button>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors bg-white"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`p-2 sm:p-2.5 rounded-full ${
                    transaction.type === 'credit' 
                      ? 'bg-gray-100 text-gray-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <FaArrowDown className="text-xs sm:text-sm" />
                    ) : (
                      <FaArrowUp className="text-xs sm:text-sm" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm">
                      {transaction.description}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold text-xs sm:text-sm ${
                    transaction.type === 'credit' ? 'text-gray-700' : 'text-gray-700'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                  </p>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-gray-600 mt-0.5">
                    <FaCheckCircle className="text-[10px]" />
                    <span>{transaction.status}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Wallet Benefits</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'Instant Payments', desc: 'Pay faster with wallet balance' },
              { title: 'Cashback Rewards', desc: 'Earn cashback on every transaction' },
              { title: 'Secure Transactions', desc: 'Bank-level security for your money' },
              { title: 'Easy Refunds', desc: 'Refunds credited directly to wallet' }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-start gap-2 sm:gap-3 bg-white p-3 rounded-lg border border-gray-200"
              >
                <div className="bg-gray-900 text-white p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                  <FaCheckCircle className="text-xs sm:text-sm" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm">{benefit.title}</p>
                  <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Wallet;

