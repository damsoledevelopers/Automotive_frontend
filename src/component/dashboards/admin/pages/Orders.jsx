import React, { useState, useMemo, useEffect } from 'react';
import { FaEye, FaDownload, FaSearch, FaCheckCircle, FaTimesCircle, FaShoppingCart, FaMoneyBillWave, FaChartLine, FaCalendarAlt, FaSpinner, FaTruck, FaBox, FaMapMarkerAlt, FaClipboardCheck, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { orderService } from '../../../../services/apiService';
import { useAuth } from '../../../../auth/AuthContext';

// Define order status constants
const ORDER_STATUSES = [
  'Pending Payment',
  'Confirmed',
  'Processing Item',
  'Packed',
  'Handed to Courier',
  'Shipment In Transit',
  'Delivery Completed',
  'Cancelled',
  'Returned'
];

// Stage mapping for tracking
const STAGE_MAPPING = {
  'Pending Payment': 0,
  'Confirmed': 0,
  'Processing Item': 1,
  'Packed': 2,
  'Handed to Courier': 3,
  'Shipment In Transit': 4,
  'Delivery Completed': 5,
  'Cancelled': -1,
  'Returned': -1
};

const Orders = ({ ordersData: initialOrdersData }) => {
  const { user } = useAuth(); // Get logged-in user/vendor info
  const [view, setView] = useState('list'); // 'list', 'view'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [ordersData, setOrdersData] = useState(initialOrdersData || []);
  const [loading, setLoading] = useState(false);
  const [orderStats, setOrderStats] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  // Fetch orders from API on component mount and when user changes
  useEffect(() => {
    fetchOrders();
    fetchOrderStats();
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const result = await orderService.getAllOrders({}, 0, 100);

      // Transform backend orders to match component format
      let transformedOrders = (result.orders || []).map(order => ({
        id: order._id,
        orderId: order.orderId,
        customer: order.userId?.name || 'Unknown Customer',
        vendor: order.items?.[0]?.seller || 'Unknown Vendor',
        amount: `₹${order.total?.toLocaleString() || 0}`,
        status: order.status || 'Pending Payment',
        date: new Date(order.createdAt).toLocaleDateString(),
        items: order.items?.length || 0,
        paymentStatus: order.paymentStatus,
        shippingAddress: order.shippingAddress,
        orderItems: order.items || [],
        total: order.total,
        subtotal: order.subtotal,
        deliveryCharge: order.deliveryCharge,
        platformFee: order.platformFee,
        raw: order // Keep original data
      }));

      // Filter orders - if user is a vendor, show only their orders
      if (user && user.role === 'vendor') {
        const vendorUserId = (user.id || user._id || '').toString();
        
        console.log('Vendor Info:', { vendorUserId, userName: user.name }); // DEBUG
        console.log('Total orders before filter:', transformedOrders.length); // DEBUG
        
        // For vendors, show only orders containing their products
        transformedOrders = transformedOrders.filter(order => {
          // Check if any item in the order was added by this vendor
          if (!order.raw.items || order.raw.items.length === 0) return false;
          
          const hasMatch = order.raw.items.some(item => {
            if (!item.vendorId) return false;
            
            // Simple comparison: check if item.vendorId matches vendor's ID
            const match = item.vendorId === vendorUserId;
            
            if (match) {
              console.log('Matched vendor product:', item.name); // DEBUG
            }
            return match;
          });
          
          return hasMatch;
        });
        
        console.log('Total orders after filter:', transformedOrders.length); // DEBUG
      }

      setOrdersData(transformedOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to load orders: ' + error.message);
      // Fall back to initial data if provided
      if (initialOrdersData && initialOrdersData.length > 0) {
        setOrdersData(initialOrdersData);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderStats = async () => {
    try {
      const stats = await orderService.getOrderStats();
      setOrderStats(stats);
    } catch (error) {
      console.error('Failed to fetch order stats:', error);
    }
  };

  const handleAction = (type, order) => {
    setSelectedOrder(order);
    if (type === 'view') {
      setView('view');
    } else if (type === 'status_update') {
      setNewStatus(order.status);
      setShowStatusModal(true);
    } else if (type === 'cancel') {
      if (window.confirm(`Cancel order ${order.orderId}?`)) {
        handleStatusChange(order, 'Cancelled');
      }
    }
  };

  // Handle status update (from dropdown or modal)
  const handleStatusChange = async (order, status) => {
    try {
      setUpdatingStatus(true);
      setUpdatingOrderId(order.id);
      
      await orderService.updateOrderStatus(order.id, status);
      
      setOrdersData(prevOrders => 
        prevOrders.map(o => 
          o.id === order.id 
            ? { ...o, status: status, raw: { ...o.raw, status: status } }
            : o
        )
      );
      
      if (selectedOrder && selectedOrder.id === order.id) {
        setSelectedOrder({ ...selectedOrder, status: status, raw: { ...selectedOrder.raw, status: status } });
      }
      
      setShowStatusModal(false);
      toast.success(`Order status updated to ${status}`);
    } catch (error) {
      console.error('Failed to update order status:', error);
      toast.error('Failed to update order status: ' + error.message);
    } finally {
      setUpdatingStatus(false);
      setUpdatingOrderId(null);
    }
  };

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = !searchTerm ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Calculate order analytics - use real stats if available
  const orderAnalytics = useMemo(() => {
    // Use real stats from API if available
    if (orderStats) {
      const formatRevenue = (amount) => {
        if (amount >= 1000000) {
          return `₹${(amount / 1000000).toFixed(2)}M`;
        } else if (amount >= 1000) {
          return `₹${(amount / 1000).toFixed(1)}K`;
        }
        return `₹${amount.toFixed(0)}`;
      };

      return {
        totalOrders: orderStats.totalOrders || 0,
        totalRevenue: orderStats.totalRevenue || 0,
        formattedRevenue: formatRevenue(orderStats.totalRevenue || 0),
        avgOrderValue: orderStats.totalOrders > 0 ? (orderStats.totalRevenue / orderStats.totalOrders) : 0,
        formattedAvgOrder: formatRevenue(orderStats.totalOrders > 0 ? (orderStats.totalRevenue / orderStats.totalOrders) : 0),
        ordersThisMonth: orderStats.paidOrders || 0,
        completedOrders: orderStats.deliveredOrders || 0,
        completionRate: orderStats.totalOrders > 0
          ? ((orderStats.deliveredOrders / orderStats.totalOrders) * 100).toFixed(1)
          : 0,
        cancelledOrders: 0,
        cancellationRate: 0,
        pendingOrders: orderStats.pendingOrders || 0
      };
    }

    // Fallback to local calculation
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
  }, [ordersData, orderStats]);

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">Order Details</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and track order information</p>
            </div>
            <button 
              onClick={() => setView('list')} 
              className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 font-semibold transition-all duration-200"
            >
              ← Back to Orders
            </button>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Order Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 md:px-8 py-6 md:py-8 border-b-4 border-blue-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div>
                  <p className="text-blue-100 text-xs font-black uppercase tracking-widest mb-2">Order ID</p>
                  <h2 className="text-2xl md:text-3xl font-black mb-3">{selectedOrder.orderId}</h2>
                  <p className="text-blue-100 text-sm font-semibold">📅 Placed on {selectedOrder.date}</p>
                </div>
                <div className="text-right md:text-left md:pl-4">
                  <p className="text-blue-100 text-xs font-black uppercase tracking-widest mb-2">Current Status</p>
                  <span className={`inline-block px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                    selectedOrder.status === 'Delivery Completed' ? 'bg-green-100 text-green-800' :
                    selectedOrder.status === 'Shipment In Transit' ? 'bg-blue-100 text-blue-800' :
                    selectedOrder.status === 'Handed to Courier' ? 'bg-orange-100 text-orange-800' :
                    selectedOrder.status === 'Packed' ? 'bg-purple-100 text-purple-800' :
                    selectedOrder.status === 'Processing Item' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Information Grid */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Customer Information */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                  <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-4">👤 Customer Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-black text-blue-700 uppercase mb-1">Name</p>
                      <p className="font-bold text-gray-900 text-lg">{selectedOrder.customer}</p>
                    </div>
                    {selectedOrder.shippingAddress && (
                      <>
                        <div>
                          <p className="text-[10px] font-black text-blue-700 uppercase mb-1">Address</p>
                          <p className="text-sm text-gray-700">{selectedOrder.shippingAddress.address}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-blue-700 uppercase mb-1">City</p>
                          <p className="text-sm text-gray-700">{selectedOrder.shippingAddress.cityState}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Vendor Information */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                  <h4 className="text-xs font-black text-green-900 uppercase tracking-widest mb-4">🏪 Vendor Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-black text-green-700 uppercase mb-1">Name</p>
                      <p className="font-bold text-gray-900 text-lg">{selectedOrder.vendor}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-green-700 uppercase mb-1">Email</p>
                      <p className="text-sm text-gray-700">vendor@example.com</p>
                    </div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
                  <h4 className="text-xs font-black text-blue-100 uppercase tracking-widest mb-4">💳 Payment Summary</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-blue-100 text-[10px] font-black uppercase mb-1">Total Amount</p>
                      <p className="text-3xl font-black">{selectedOrder.amount}</p>
                    </div>
                    <div className="pt-4 border-t border-blue-400 flex justify-between">
                      <span className="text-xs font-bold uppercase">Items</span>
                      <span className="text-xl font-black">{selectedOrder.items}</span>
                    </div>
                    <div className="pt-2 border-t border-blue-400">
                      <p className="text-[10px] font-bold text-blue-100">Status: <span className="font-black text-green-300">{selectedOrder.paymentStatus || 'Pending'}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Tracking Timeline */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">📍 Order Tracking Timeline</h3>
                  <button
                    onClick={() => {
                      setNewStatus(selectedOrder.status);
                      setShowStatusModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold"
                  >
                    <FaEdit /> Update Status
                  </button>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                  <div className="space-y-6">
                    {/* Stage 1 - Order Placed */}
                    <div className="flex gap-4 md:gap-6">
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                          STAGE_MAPPING[selectedOrder.status] >= 0 ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          <FaCheckCircle className="text-lg md:text-xl" />
                        </div>
                        {STAGE_MAPPING[selectedOrder.status] >= 1 && (
                          <div className="w-1.5 h-16 md:h-20 bg-green-300 mt-2 rounded-full"></div>
                        )}
                        {STAGE_MAPPING[selectedOrder.status] < 1 && STAGE_MAPPING[selectedOrder.status] >= 0 && (
                          <div className="w-1.5 h-16 md:h-20 bg-gray-300 mt-2 rounded-full"></div>
                        )}
                      </div>
                      <div className="pb-6 pt-1">
                        <p className="font-black text-gray-900 text-base md:text-lg">Order Placed</p>
                        <p className="text-sm text-gray-600 mt-1">Placed on {selectedOrder.date}</p>
                      </div>
                    </div>

                    {/* Stage 2 - Processing Item */}
                    <div className="flex gap-4 md:gap-6">
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                          STAGE_MAPPING[selectedOrder.status] >= 1 ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          <FaBox className="text-lg md:text-xl" />
                        </div>
                        {STAGE_MAPPING[selectedOrder.status] >= 2 && (
                          <div className="w-1.5 h-16 md:h-20 bg-green-300 mt-2 rounded-full"></div>
                        )}
                        {STAGE_MAPPING[selectedOrder.status] === 1 && (
                          <div className="w-1.5 h-16 md:h-20 bg-gray-300 mt-2 rounded-full"></div>
                        )}
                      </div>
                      <div className="pb-6 pt-1">
                        <p className="font-black text-gray-900 text-base md:text-lg">Processing Item</p>
                        <p className="text-sm text-gray-600 mt-1">Items are being processed for shipment</p>
                      </div>
                    </div>

                    {/* Stage 3 - Packed */}
                    <div className="flex gap-4 md:gap-6">
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                          STAGE_MAPPING[selectedOrder.status] >= 2 ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          <FaBox className="text-lg md:text-xl" />
                        </div>
                        {STAGE_MAPPING[selectedOrder.status] >= 3 && (
                          <div className="w-1.5 h-16 md:h-20 bg-green-300 mt-2 rounded-full"></div>
                        )}
                        {STAGE_MAPPING[selectedOrder.status] === 2 && (
                          <div className="w-1.5 h-16 md:h-20 bg-gray-300 mt-2 rounded-full"></div>
                        )}
                      </div>
                      <div className="pb-6 pt-1">
                        <p className="font-black text-gray-900 text-base md:text-lg">Packed</p>
                        <p className="text-sm text-gray-600 mt-1">Order has been packed and ready to ship</p>
                      </div>
                    </div>

                    {/* Stage 4 - Handed to Courier */}
                    <div className="flex gap-4 md:gap-6">
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                          STAGE_MAPPING[selectedOrder.status] >= 3 ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          <FaTruck className="text-lg md:text-xl" />
                        </div>
                        {STAGE_MAPPING[selectedOrder.status] >= 4 && (
                          <div className="w-1.5 h-16 md:h-20 bg-green-300 mt-2 rounded-full"></div>
                        )}
                        {STAGE_MAPPING[selectedOrder.status] === 3 && (
                          <div className="w-1.5 h-16 md:h-20 bg-gray-300 mt-2 rounded-full"></div>
                        )}
                      </div>
                      <div className="pb-6 pt-1">
                        <p className="font-black text-gray-900 text-base md:text-lg">Handed to Courier</p>
                        <p className="text-sm text-gray-600 mt-1">Package handed to courier for delivery</p>
                      </div>
                    </div>

                    {/* Stage 5 - Shipment In Transit */}
                    <div className="flex gap-4 md:gap-6">
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                          STAGE_MAPPING[selectedOrder.status] >= 4 ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          <FaTruck className="text-lg md:text-xl" />
                        </div>
                        {STAGE_MAPPING[selectedOrder.status] >= 5 && (
                          <div className="w-1.5 h-16 md:h-20 bg-green-300 mt-2 rounded-full"></div>
                        )}
                        {STAGE_MAPPING[selectedOrder.status] === 4 && (
                          <div className="w-1.5 h-16 md:h-20 bg-gray-300 mt-2 rounded-full"></div>
                        )}
                      </div>
                      <div className="pb-6 pt-1">
                        <p className="font-black text-gray-900 text-base md:text-lg">Shipment In Transit</p>
                        <p className="text-sm text-gray-600 mt-1">Your package is on the way to delivery</p>
                      </div>
                    </div>

                    {/* Stage 6 - Delivery Completed */}
                    <div className="flex gap-4 md:gap-6">
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                          STAGE_MAPPING[selectedOrder.status] >= 5 ? 'bg-green-600' : 'bg-gray-300'
                        }`}>
                          <FaCheckCircle className="text-lg md:text-xl" />
                        </div>
                      </div>
                      <div className="pt-1">
                        <p className="font-black text-gray-900 text-base md:text-lg">Delivery Completed</p>
                        <p className="text-sm text-gray-600 mt-1">Order delivered successfully</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        
        {/* Status Update Modal */}
        {showStatusModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-2xl">
                <h3 className="text-xl font-black">Update Order Status</h3>
                <p className="text-blue-100 text-sm">Order ID: {selectedOrder.orderId}</p>
              </div>
              
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">Select new status for this order:</p>
                
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-6"
                >
                  <option value="">-- Select Status --</option>
                  {ORDER_STATUSES.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowStatusModal(false);
                      setNewStatus('');
                    }}
                    disabled={updatingStatus}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!newStatus) {
                        toast.error('Please select a status');
                        return;
                      }
                      handleStatusChange(selectedOrder, newStatus);
                    }}
                    disabled={updatingStatus || !newStatus}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {updatingStatus ? (
                      <>
                        <FaSpinner className="animate-spin" /> Updating...
                      </>
                    ) : (
                      <>
                        <FaCheckCircle /> Update
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order, e.target.value)}
                      disabled={updatingOrderId === order.id}
                      className={`min-w-[140px] px-2 py-1 text-xs rounded-full border border-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-opacity-90 cursor-pointer disabled:opacity-70 ${
                        order.status === 'Delivery Completed' || order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipment In Transit' || order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Processing Item' || order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Cancelled' || order.status === 'Returned' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {ORDER_STATUSES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {updatingOrderId === order.id && (
                      <FaSpinner className="inline-block ml-1 animate-spin text-blue-600" />
                    )}
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
      
      {/* Status Update Modal */}
      {showStatusModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-2xl">
              <h3 className="text-xl font-black">Update Order Status</h3>
              <p className="text-blue-100 text-sm">Order ID: {selectedOrder.orderId}</p>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">Select new status for this order:</p>
              
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-6"
              >
                <option value="">-- Select Status --</option>
                {ORDER_STATUSES.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowStatusModal(false);
                    setNewStatus('');
                  }}
                  disabled={updatingStatus}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!newStatus) {
                      toast.error('Please select a status');
                      return;
                    }
                    handleStatusChange(selectedOrder, newStatus);
                  }}
                  disabled={updatingStatus || !newStatus}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {updatingStatus ? (
                    <>
                      <FaSpinner className="animate-spin" /> Updating...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle /> Update
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;

