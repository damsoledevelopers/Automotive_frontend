import React, { useState, useMemo } from 'react';
import { FaEye, FaDownload, FaSearch, FaCheckCircle, FaTimesCircle, FaShoppingCart, FaMoneyBillWave, FaChartLine, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Orders = ({ ordersData }) => {
  const [view, setView] = useState('list'); // 'list', 'view'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [exporting, setExporting] = useState(false);

  const handleAction = (type, order) => {
    setSelectedOrder(order);
    if (type === 'view') {
      setView('view');
    } else if (type === 'status_update') {
      alert(`Order ${order.orderId} status updated to ${type} (Simulation)`);
    } else if (type === 'cancel') {
      if (window.confirm(`Cancel order ${order.orderId}?`)) {
        alert('Order cancelled');
      }
    }
  };

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = !searchTerm ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Calculate order analytics
  const orderAnalytics = useMemo(() => {
    const totalOrders = ordersData.length;
    
    // Calculate total revenue (extract numeric value from amount strings like "₹15,000")
    const totalRevenue = ordersData.reduce((sum, order) => {
      const amountStr = order.amount || '₹0';
      const numericValue = parseFloat(amountStr.replace(/[₹,]/g, '')) || 0;
      return sum + numericValue;
    }, 0);
    
    // Calculate average order value
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Calculate orders this month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const ordersThisMonth = ordersData.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate >= startOfMonth;
    }).length;
    
    // Calculate completed orders (Delivered)
    const completedOrders = ordersData.filter(o => 
      o.status === 'Delivered' || o.status === 'delivered'
    ).length;
    
    // Calculate completion rate
    const completionRate = totalOrders > 0 
      ? ((completedOrders / totalOrders) * 100).toFixed(1)
      : 0;
    
    // Calculate cancelled/returned orders
    const cancelledOrders = ordersData.filter(o => 
      o.status === 'Cancelled' || o.status === 'cancelled' || 
      o.status === 'Returned' || o.status === 'returned'
    ).length;
    
    // Calculate cancellation rate
    const cancellationRate = totalOrders > 0
      ? ((cancelledOrders / totalOrders) * 100).toFixed(1)
      : 0;
    
    // Format revenue
    const formatRevenue = (amount) => {
      if (amount >= 1000000) {
        return `₹${(amount / 1000000).toFixed(2)}M`;
      } else if (amount >= 1000) {
        return `₹${(amount / 1000).toFixed(1)}K`;
      }
      return `₹${amount.toFixed(0)}`;
    };
    
    return {
      totalOrders,
      totalRevenue,
      formattedRevenue: formatRevenue(totalRevenue),
      avgOrderValue,
      formattedAvgOrder: formatRevenue(avgOrderValue),
      ordersThisMonth,
      completedOrders,
      completionRate,
      cancelledOrders,
      cancellationRate
    };
  }, [ordersData]);

  // Export orders to CSV
  const handleExport = () => {
    try {
      setExporting(true);
      
      // Use filtered orders for export
      const dataToExport = filteredOrders.length > 0 ? filteredOrders : ordersData;
      
      // Generate CSV content
      let csvContent = 'Order Management Report\n';
      csvContent += `Generated: ${new Date().toLocaleString()}\n`;
      csvContent += `Total Orders: ${dataToExport.length}\n`;
      csvContent += `Total Revenue: ${orderAnalytics.formattedRevenue}\n`;
      csvContent += `Average Order Value: ${orderAnalytics.formattedAvgOrder}\n\n`;
      
      // CSV Headers
      csvContent += 'Order ID,Customer,Vendor,Amount,Items,Status,Date\n';
      
      // CSV Data
      dataToExport.forEach(order => {
        const orderId = (order.orderId || '').replace(/,/g, ';');
        const customer = (order.customer || '').replace(/,/g, ';');
        const vendor = (order.vendor || '').replace(/,/g, ';');
        const amount = (order.amount || '₹0').replace(/,/g, '');
        const items = order.items || 0;
        const status = (order.status || 'N/A').replace(/,/g, ';');
        const date = order.date || 'N/A';
        
        csvContent += `${orderId},${customer},${vendor},${amount},${items},${status},${date}\n`;
      });
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `orders_report_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`Exported ${dataToExport.length} orders successfully!`);
    } catch (error) {
      console.error('Failed to export orders:', error);
      toast.error('Failed to export orders: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  if (view === 'view' && selectedOrder) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900 uppercase">Order Details</h2>
          <button onClick={() => setView('list')} className="text-gray-500 font-bold hover:text-gray-900">← Back</button>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-8">
          <div className="flex flex-col md:flex-row justify-between gap-6 pb-6 border-b border-gray-100">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</p>
              <h3 className="text-3xl font-black text-gray-900">{selectedOrder.orderId}</h3>
              <p className="text-gray-500 font-bold mt-1">Placed on {selectedOrder.date}</p>
            </div>
            <div className="text-right">
              <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  selectedOrder.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    selectedOrder.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                }`}>
                {selectedOrder.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Customer Information</h4>
              <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
                <p className="font-bold text-gray-900">{selectedOrder.customer}</p>
                <p className="text-sm text-gray-500">customer@example.com</p>
                <p className="text-sm text-gray-600">Mumbai, India</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Vendor Information</h4>
              <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
                <p className="font-bold text-gray-900">{selectedOrder.vendor}</p>
                <p className="text-sm text-gray-500">vendor@example.com</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Payment Summary</h4>
              <div className="p-6 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/20">
                <p className="text-[10px] font-black uppercase opacity-70">Total Amount</p>
                <p className="text-3xl font-black">{selectedOrder.amount}</p>
                <div className="mt-4 pt-4 border-t border-white/20 flex justify-between">
                  <span className="text-xs font-bold uppercase">Items</span>
                  <span className="text-lg font-black">{selectedOrder.items}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button className="flex-1 py-4 bg-gray-900 text-white font-black rounded-2xl uppercase tracking-widest hover:bg-black transition">Update Status</button>
            <button onClick={() => setView('list')} className="flex-1 py-4 bg-white border border-gray-200 text-gray-900 font-black rounded-2xl uppercase tracking-widest hover:bg-gray-50 transition">Print Invoice</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Order Management</h2>
          <p className="text-xs text-gray-600 mt-1">Process, track, and manage customer orders</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExport}
            disabled={exporting || (filteredOrders.length === 0 && ordersData.length === 0)}
            className="bg-white border border-red-500 text-red-500 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-50 transition-colors"
            title="Export orders to CSV"
          >
            {exporting ? <FaSpinner className="animate-spin text-red-500" /> : <FaDownload className="text-red-500" />} <span className="text-red-500">Export</span>
          </button>
        </div>
      </div>

      {/* Order Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Orders */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-blue-500 rounded-lg">
              <FaShoppingCart className="text-white text-xl" />
            </div>
            <span className="text-xs font-semibold text-blue-700 bg-blue-200 px-2 py-1 rounded-full">
              Total
            </span>
          </div>
          <p className="text-2xl font-bold text-blue-900 mb-1">
            {orderAnalytics.totalOrders}
          </p>
          <p className="text-xs text-blue-700 font-medium">All Time Orders</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-green-500 rounded-lg">
              <FaMoneyBillWave className="text-white text-xl" />
            </div>
            <span className="text-xs font-semibold text-green-700 bg-green-200 px-2 py-1 rounded-full">
              Revenue
            </span>
          </div>
          <p className="text-2xl font-bold text-green-900 mb-1">
            {orderAnalytics.formattedRevenue}
          </p>
          <p className="text-xs text-green-700 font-medium">Total Revenue</p>
        </div>

        {/* Average Order Value */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-purple-500 rounded-lg">
              <FaChartLine className="text-white text-xl" />
            </div>
            <span className="text-xs font-semibold text-purple-700 bg-purple-200 px-2 py-1 rounded-full">
              Average
            </span>
          </div>
          <p className="text-2xl font-bold text-purple-900 mb-1">
            {orderAnalytics.formattedAvgOrder}
          </p>
          <p className="text-xs text-purple-700 font-medium">Per Order</p>
        </div>

        {/* Orders This Month */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-orange-500 rounded-lg">
              <FaCalendarAlt className="text-white text-xl" />
            </div>
            <span className="text-xs font-semibold text-orange-700 bg-orange-200 px-2 py-1 rounded-full">
              This Month
            </span>
          </div>
          <p className="text-2xl font-bold text-orange-900 mb-1">
            {orderAnalytics.ordersThisMonth}
          </p>
          <p className="text-xs text-orange-700 font-medium">New Orders</p>
        </div>
      </div>

      {/* Additional Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Completion Rate */}
        <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700">Completion Rate</p>
            <FaCheckCircle className="text-green-500" />
          </div>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-gray-900">{orderAnalytics.completionRate}%</p>
            <p className="text-xs text-gray-500 mb-1">({orderAnalytics.completedOrders} delivered)</p>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${orderAnalytics.completionRate}%` }}
            ></div>
          </div>
        </div>

        {/* Cancellation Rate */}
        <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700">Cancellation Rate</p>
            <FaTimesCircle className="text-red-500" />
          </div>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-gray-900">{orderAnalytics.cancellationRate}%</p>
            <p className="text-xs text-gray-500 mb-1">({orderAnalytics.cancelledOrders} cancelled)</p>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all"
              style={{ width: `${orderAnalytics.cancellationRate}%` }}
            ></div>
          </div>
        </div>

        {/* Active Orders */}
        <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700">Active Orders</p>
            <FaShoppingCart className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {ordersData.filter(o => 
              o.status !== 'Delivered' && 
              o.status !== 'delivered' && 
              o.status !== 'Cancelled' && 
              o.status !== 'cancelled' &&
              o.status !== 'Returned' &&
              o.status !== 'returned'
            ).length}
          </p>
          <p className="text-xs text-gray-500">In Progress</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
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
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="returned">Returned</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.orderId}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.vendor}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleAction('view', order)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleAction('status_update', order)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="Update Status"
                      >
                        <FaCheckCircle />
                      </button>
                      <button
                        onClick={() => handleAction('cancel', order)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Cancel Order"
                      >
                        <FaTimesCircle />
                      </button>
                    </div>
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

export default Orders;

