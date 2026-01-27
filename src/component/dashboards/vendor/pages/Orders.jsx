import React, { useState, useEffect } from 'react';
import { FaEye, FaFilter, FaDownload, FaSpinner, FaTimes, FaBox, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { orderService } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Hide scrollbar styles
  const hideScrollbarStyle = `
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `;

  const fetchOrders = async () => {
    try {
      setError(null);
      const response = await orderService.getVendorOrders();
      const data = response.data || response;
      
      if (data.orders) {
        const transformedOrders = data.orders.map(order => ({
          id: order._id?.toString() || order.id,
          orderId: order.orderId,
          customer: order.shippingAddress?.name || 'Unknown',
          amount: order.vendorAmount || order.total || 0,
          status: order.status || 'Pending',
          date: order.createdAt,
          items: order.vendorItemsCount || order.totalItems || order.items?.length || 0,
          payment: order.paymentStatus || 'Pending',
          raw: order
        }));
        
        setOrders(transformedOrders);
      }
      
      if (data.summary) {
        setSummary(data.summary);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Failed to fetch orders');
      toast.error(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    
    const interval = setInterval(() => {
      fetchOrders();
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get tracking steps based on status
  const getTrackingSteps = (status) => {
    const steps = [
      { label: 'Order Placed', icon: FaCheckCircle, completed: true },
      { label: 'Processing Item', icon: FaBox, completed: ['Processing Item', 'Packed', 'Handed to Courier', 'Shipment In Transit', 'Delivery Completed'].includes(status) },
      { label: 'Packed', icon: FaBox, completed: ['Packed', 'Handed to Courier', 'Shipment In Transit', 'Delivery Completed'].includes(status) },
      { label: 'Handed to Courier', icon: FaTruck, completed: ['Handed to Courier', 'Shipment In Transit', 'Delivery Completed'].includes(status) },
      { label: 'Shipment In Transit', icon: FaTruck, completed: ['Shipment In Transit', 'Delivery Completed'].includes(status) },
      { label: 'Delivery Completed', icon: FaCheckCircle, completed: status === 'Delivery Completed' }
    ];
    return steps;
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedOrder(null);
  };

  if (loading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <style>{hideScrollbarStyle}</style>
      {/* Orders Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Pending</p>
          <p className="text-2xl font-bold text-orange-600">
            {summary.pending}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Processing</p>
          <p className="text-2xl font-bold text-yellow-600">
            {summary.processing}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Shipped</p>
          <p className="text-2xl font-bold text-blue-600">
            {summary.shipped}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Delivered</p>
          <p className="text-2xl font-bold text-green-600">
            {summary.delivered}
          </p>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">All Orders</h3>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2 text-sm">
            <FaFilter /> Filter
          </button>
          <button className="btn-outline flex items-center gap-2 text-sm">
            <FaDownload /> Export
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600">No orders found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Items</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Payment</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{order.orderId}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">₹{order.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.items}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${order.payment === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => handleViewOrder(order)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Order Details</h2>
                <p className="text-blue-100 text-sm mt-1">Order ID: {selectedOrder.orderId}</p>
              </div>
              <button
                onClick={closeDetailModal}
                className="text-white hover:bg-blue-700 p-2 rounded-lg transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Customer</p>
                  <p className="font-semibold text-gray-900">{selectedOrder.customer}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Order Date</p>
                  <p className="font-semibold text-gray-900">{formatDate(selectedOrder.date)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Amount</p>
                  <p className="font-semibold text-gray-900">₹{selectedOrder.amount.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Items</p>
                  <p className="font-semibold text-gray-900">{selectedOrder.items}</p>
                </div>
              </div>

              {/* Order Tracking Timeline */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Tracking</h3>
                <div className="space-y-4">
                  {getTrackingSteps(selectedOrder.status).map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                            step.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            <Icon className="text-white text-lg" />
                          </div>
                          {index < getTrackingSteps(selectedOrder.status).length - 1 && (
                            <div className={`w-1 h-16 mt-2 ${
                              step.completed ? 'bg-green-500' : 'bg-gray-300'
                            }`}></div>
                          )}
                        </div>
                        <div className="pt-2">
                          <p className={`font-semibold ${
                            step.completed ? 'text-gray-900' : 'text-gray-400'
                          }`}>
                            {step.label}
                          </p>
                          <p className={`text-sm ${
                            step.completed ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {step.completed ? 'Completed' : 'Pending'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Badges */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Order Status</p>
                  <span className={`px-3 py-1 text-sm rounded-full font-semibold ${
                    selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    selectedOrder.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    selectedOrder.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Payment Status</p>
                  <span className={`px-3 py-1 text-sm rounded-full font-semibold ${
                    selectedOrder.payment === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedOrder.payment}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;

