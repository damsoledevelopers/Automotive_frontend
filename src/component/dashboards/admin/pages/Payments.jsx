import React, { useState } from 'react';
import { FaEye, FaDownload, FaSearch, FaFilter, FaCreditCard, FaMoneyBillWave, FaFileInvoice } from 'react-icons/fa';

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const transactions = [
    { id: 1, transactionId: 'TXN-001', orderId: 'ORD-001', customer: 'John Doe', amount: '₹15,000', type: 'Payment', status: 'Completed', date: '2024-01-15', method: 'Credit Card' },
    { id: 2, transactionId: 'TXN-002', orderId: 'ORD-002', customer: 'Jane Smith', amount: '₹8,500', type: 'Refund', status: 'Pending', date: '2024-01-14', method: 'UPI' },
    { id: 3, transactionId: 'TXN-003', orderId: 'ORD-003', customer: 'Bob Johnson', amount: '₹12,300', type: 'Payment', status: 'Completed', date: '2024-01-14', method: 'Net Banking' },
  ];

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = !searchTerm || 
      txn.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || txn.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Payment & Transaction Management</h2>
          <p className="text-xs text-gray-600 mt-1">Oversee all platform transactions and payments</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2 text-sm">
            <FaFilter /> Filter
          </button>
          <button className="btn-outline flex items-center gap-2 text-sm">
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 mb-1">Total Revenue</p>
              <p className="text-xl font-bold text-green-900">₹45.2M</p>
            </div>
            <FaMoneyBillWave className="text-3xl text-green-600" />
          </div>
        </div>
        <div className="bg-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 mb-1">Pending Payments</p>
              <p className="text-xl font-bold text-blue-900">₹2.5M</p>
            </div>
            <FaCreditCard className="text-3xl text-blue-600" />
          </div>
        </div>
        <div className="bg-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 mb-1">Refunds</p>
              <p className="text-xl font-bold text-purple-900">₹1.2M</p>
            </div>
            <FaFileInvoice className="text-3xl text-purple-600" />
          </div>
        </div>
        <div className="bg-yellow-100 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700 mb-1">Commission</p>
              <p className="text-xl font-bold text-yellow-900">₹5.4M</p>
            </div>
            <FaMoneyBillWave className="text-3xl text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{txn.transactionId}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{txn.orderId}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{txn.customer}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{txn.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      txn.type === 'Payment' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {txn.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{txn.method}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      txn.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      txn.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">{txn.date}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-900" title="View Details">
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;

