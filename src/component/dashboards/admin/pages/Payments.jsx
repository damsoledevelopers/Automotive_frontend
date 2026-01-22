import React, { useState, useEffect, useMemo } from 'react';
import { FaEye, FaDownload, FaSearch, FaCreditCard, FaMoneyBillWave, FaFileInvoice, FaSpinner } from 'react-icons/fa';
import { analyticsService } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [paymentStats, setPaymentStats] = useState({
    totalRevenue: 0,
    pendingPayments: 0,
    refunds: 0,
    commission: 0
  });

  // Fetch payment data from analytics
  useEffect(() => {
    fetchPaymentData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchPaymentData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchPaymentData = async () => {
    try {
      setLoading(true);
      // Fetch revenue data which includes payment information
      const revenueData = await analyticsService.getRevenueData({ dateRange: '30d' });
      
      // Calculate payment statistics
      const stats = {
        totalRevenue: revenueData?.totalRevenue || 0,
        pendingPayments: revenueData?.pendingPayments || 0,
        refunds: revenueData?.refunds || 0,
        commission: revenueData?.commission || 0
      };
      setPaymentStats(stats);

      // Transform revenue data into transactions format
      if (revenueData?.transactions) {
        const transformedTransactions = revenueData.transactions.map((txn, index) => ({
          id: txn._id || txn.id || index + 1,
          transactionId: txn.transactionId || `TXN-${String(index + 1).padStart(3, '0')}`,
          orderId: txn.orderId || txn.order?.orderId || 'N/A',
          customer: txn.customer?.name || txn.order?.userId?.name || 'Unknown',
          amount: `₹${(txn.amount || txn.total || 0).toLocaleString()}`,
          type: txn.type || (txn.paymentStatus === 'Refunded' ? 'Refund' : 'Payment'),
          status: txn.paymentStatus || txn.status || 'Pending',
          date: txn.date || txn.createdAt ? new Date(txn.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          method: txn.paymentMethod || txn.method || 'N/A'
        }));
        setTransactions(transformedTransactions);
      } else {
        // Fallback: generate transactions from revenue data structure
        setTransactions([]);
      }
    } catch (error) {
      console.error('Failed to fetch payment data:', error);
      toast.error('Failed to load payment data: ' + error.message);
      // Set default empty stats
      setPaymentStats({
        totalRevenue: 0,
        pendingPayments: 0,
        refunds: 0,
        commission: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(txn => {
      const matchesSearch = !searchTerm || 
        txn.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.orderId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || txn.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchTerm, statusFilter]);

  // Format currency
  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `₹${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  // Export transactions to CSV
  const handleExport = () => {
    try {
      setExporting(true);
      
      // Use filtered transactions for export
      const dataToExport = filteredTransactions.length > 0 ? filteredTransactions : transactions;
      
      // Generate CSV content
      let csvContent = 'Payment & Transaction Report\n';
      csvContent += `Generated: ${new Date().toLocaleString()}\n`;
      csvContent += `Total Transactions: ${dataToExport.length}\n`;
      csvContent += `Total Revenue: ${formatCurrency(paymentStats.totalRevenue)}\n`;
      csvContent += `Pending Payments: ${formatCurrency(paymentStats.pendingPayments)}\n`;
      csvContent += `Refunds: ${formatCurrency(paymentStats.refunds)}\n`;
      csvContent += `Commission: ${formatCurrency(paymentStats.commission)}\n\n`;
      
      // CSV Headers
      csvContent += 'Transaction ID,Order ID,Customer,Amount,Type,Payment Method,Status,Date\n';
      
      // CSV Data
      dataToExport.forEach(txn => {
        const transactionId = (txn.transactionId || '').replace(/,/g, ';');
        const orderId = (txn.orderId || '').replace(/,/g, ';');
        const customer = (txn.customer || '').replace(/,/g, ';');
        const amount = (txn.amount || '₹0').replace(/,/g, '');
        const type = (txn.type || 'N/A').replace(/,/g, ';');
        const method = (txn.method || 'N/A').replace(/,/g, ';');
        const status = (txn.status || 'N/A').replace(/,/g, ';');
        const date = txn.date || 'N/A';
        
        csvContent += `${transactionId},${orderId},${customer},${amount},${type},${method},${status},${date}\n`;
      });
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `payments_report_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`Exported ${dataToExport.length} transactions successfully!`);
    } catch (error) {
      console.error('Failed to export transactions:', error);
      toast.error('Failed to export transactions: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Payment & Transaction Management</h2>
          <p className="text-xs text-gray-600 mt-1">Oversee all platform transactions and payments</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExport}
            disabled={exporting || (filteredTransactions.length === 0 && transactions.length === 0)}
            className="bg-white border border-red-500 text-red-500 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-50 transition-colors"
            title="Export transactions to CSV"
          >
            {exporting ? <FaSpinner className="animate-spin text-red-500" /> : <FaDownload className="text-red-500" />} <span className="text-red-500">Export</span>
          </button>
        </div>
      </div>

      {/* Summary Cards - Matching Image Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Revenue Card */}
        <div className="bg-green-50 rounded-lg p-6 border border-green-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-green-700 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-green-900">
                {loading ? (
                  <FaSpinner className="animate-spin inline" />
                ) : (
                  formatCurrency(paymentStats.totalRevenue)
                )}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FaMoneyBillWave className="text-xl text-green-600" />
            </div>
          </div>
        </div>

        {/* Pending Payments Card */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-700 mb-1">Pending Payments</p>
              <p className="text-2xl font-bold text-blue-900">
                {loading ? (
                  <FaSpinner className="animate-spin inline" />
                ) : (
                  formatCurrency(paymentStats.pendingPayments)
                )}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FaCreditCard className="text-xl text-blue-600" />
            </div>
          </div>
        </div>

        {/* Refunds Card */}
        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-purple-700 mb-1">Refunds</p>
              <p className="text-2xl font-bold text-purple-900">
                {loading ? (
                  <FaSpinner className="animate-spin inline" />
                ) : (
                  formatCurrency(paymentStats.refunds)
                )}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FaFileInvoice className="text-xl text-purple-600" />
            </div>
          </div>
        </div>

        {/* Commission Card */}
        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-yellow-700 mb-1">Commission</p>
              <p className="text-2xl font-bold text-yellow-900">
                {loading ? (
                  <FaSpinner className="animate-spin inline" />
                ) : (
                  formatCurrency(paymentStats.commission)
                )}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <FaMoneyBillWave className="text-xl text-yellow-600" />
            </div>
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
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        {loading && transactions.length === 0 ? (
          <div className="p-20 text-center">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Loading transactions...</p>
          </div>
        ) : (
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
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
                      No transactions found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((txn) => (
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
                          txn.status === 'Paid' || txn.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          txn.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          txn.status === 'Refunded' ? 'bg-purple-100 text-purple-800' :
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;

