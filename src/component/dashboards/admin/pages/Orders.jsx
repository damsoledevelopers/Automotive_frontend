import React, { useState } from 'react';
import { FaEye, FaFilter, FaDownload, FaSearch, FaCheckCircle, FaTimesCircle, FaUndo } from 'react-icons/fa';

const Orders = ({ ordersData }) => {
  const [view, setView] = useState('list'); // 'list', 'view'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

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
          <button className="btn-outline flex items-center gap-2 text-sm">
            <FaFilter /> Filter
          </button>
          <button className="btn-outline flex items-center gap-2 text-sm">
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Pending</p>
          <p className="text-xl font-bold text-orange-600">
            {ordersData.filter(o => o.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Processing</p>
          <p className="text-xl font-bold text-yellow-600">
            {ordersData.filter(o => o.status === 'Processing').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Shipped</p>
          <p className="text-xl font-bold text-blue-600">
            {ordersData.filter(o => o.status === 'Shipped').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Delivered</p>
          <p className="text-xl font-bold text-green-600">
            {ordersData.filter(o => o.status === 'Delivered').length}
          </p>
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

