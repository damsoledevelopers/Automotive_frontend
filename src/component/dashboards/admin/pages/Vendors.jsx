import React, { useState, useEffect, useMemo } from 'react';
import { FaEye, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaSearch, FaDownload, FaStore, FaStar, FaBox, FaTags, FaSpinner } from 'react-icons/fa';
import { productService } from '../../../../services/apiService';
import { userService } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const Vendors = ({ topVendors }) => {
  const [activeTab, setActiveTab] = useState('vendors'); // 'vendors' or 'products'
  const [view, setView] = useState('list'); // 'list', 'edit', 'view', 'productDetail'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [productSearchTerm, setProductSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '', email: '', status: 'active', commission: '', registrationDate: ''
  });

  // Fetch vendors
  useEffect(() => {
    fetchVendors();
  }, []);

  // Fetch pending products count on mount and when tab changes
  useEffect(() => {
    fetchPendingProducts();
  }, []);

  // Fetch pending products when products tab is active
  useEffect(() => {
    if (activeTab === 'products') {
      fetchPendingProducts();
    }
  }, [activeTab]);

  // Auto-refresh pending products every 10 seconds (to show updated count)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPendingProducts(); // Always fetch to update count
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers();
      const users = response.data || response.users || response;
      const vendorUsers = Array.isArray(users) ? users.filter(user => user.role === 'vendor').map(user => ({
        id: user._id || user.id,
        name: user.name || user.vendorDetails?.storeName || 'Unknown Vendor',
        email: user.email,
        orders: 0,
        revenue: 'N/A',
        rating: null,
        status: user.isActive ? 'active' : 'inactive',
        commission: 'N/A',
        registrationDate: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : 'N/A',
        vendorDetails: user.vendorDetails
      })) : [];
      
      // Merge with topVendors if provided
      const mergedVendors = topVendors ? [...topVendors, ...vendorUsers] : vendorUsers;
      setVendors(mergedVendors);
    } catch (error) {
      toast.error('Failed to fetch vendors');
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAdminProducts({ approved: false });
      // Handle different response structures
      // Backend returns: { success: true, data: { products: [...], pagination: {...} } }
      // apiService returns: response.data.data which is { products: [...], pagination: {...} }
      let products = [];
      if (response && typeof response === 'object') {
        if (Array.isArray(response)) {
          products = response;
        } else if (response.products && Array.isArray(response.products)) {
          products = response.products;
        } else if (response.data && response.data.products && Array.isArray(response.data.products)) {
          products = response.data.products;
        } else if (response.data && Array.isArray(response.data)) {
          products = response.data;
        }
      }
      setPendingProducts(products);
      console.log('Pending products fetched:', products.length);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch pending products');
      console.error('Error fetching pending products:', error);
      setPendingProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (type, vendor) => {
    setSelectedVendor(vendor);
    if (type === 'edit') {
      setFormData({ ...vendor });
      setView('edit');
    } else if (type === 'view') {
      setView('view');
    } else if (type === 'delete') {
      if (window.confirm(`Are you sure you want to permanently delete vendor "${vendor.name}"? This action cannot be undone.`)) {
        try {
          setLoading(true);
          await userService.deleteUser(vendor.id);
          toast.success('Vendor deleted successfully');
          fetchVendors(); // Refresh the list
        } catch (error) {
          console.error('Failed to delete vendor:', error);
          toast.error(error.message || 'Failed to delete vendor');
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert(`Vendor "${formData.name}" updated successfully!`);
    setView('list');
  };

  const handleProductAction = async (type, product) => {
    if (type === 'view') {
      setSelectedProduct(product);
      setView('productDetail');
    } else if (type === 'approve') {
      try {
        setLoading(true);
        await productService.approveProduct(product._id || product.id);
        toast.success('Product approved successfully! It will now appear on user page.');
        await fetchPendingProducts();
      } catch (error) {
        toast.error(error.message || 'Failed to approve product');
      } finally {
        setLoading(false);
      }
    } else if (type === 'delete') {
      if (window.confirm(`Are you sure you want to delete/reject product "${product.name}"?`)) {
        try {
          setLoading(true);
          await productService.rejectProduct(product._id || product.id);
          toast.success('Product rejected and deleted successfully!');
          await fetchPendingProducts();
        } catch (error) {
          toast.error(error.message || 'Failed to reject product');
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const filteredVendors = useMemo(() => {
    if (!vendors || !Array.isArray(vendors)) return [];
    return vendors.filter(vendor => {
      if (!vendor) return false;
      const matchesSearch = !searchTerm ||
        (vendor.name && vendor.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (vendor.email && vendor.email.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [vendors, searchTerm, statusFilter]);

  const filteredProducts = useMemo(() => {
    if (!pendingProducts || !Array.isArray(pendingProducts)) return [];
    return pendingProducts.filter(product => {
      if (!product) return false;
      const searchLower = productSearchTerm ? productSearchTerm.toLowerCase() : '';
      const matchesSearch = !productSearchTerm ||
        (product.name && product.name.toLowerCase().includes(searchLower)) ||
        (product.sku && product.sku.toLowerCase().includes(searchLower)) ||
        (product.partNumber && product.partNumber.toLowerCase().includes(searchLower));
      return matchesSearch;
    });
  }, [pendingProducts, productSearchTerm]);

  // Export vendors data to CSV
  const handleExport = () => {
    try {
      setExporting(true);
      
      // Determine what to export based on active tab
      let dataToExport = [];
      let fileName = '';
      let csvContent = '';
      
      if (activeTab === 'vendors') {
        // Export filtered vendors or all vendors
        dataToExport = filteredVendors.length > 0 ? filteredVendors : vendors;
        fileName = `vendors_report_${new Date().toISOString().split('T')[0]}.csv`;
        
        // Generate CSV content for vendors
        csvContent = 'Vendor Management Report\n';
        csvContent += `Generated: ${new Date().toLocaleString()}\n`;
        csvContent += `Total Vendors: ${dataToExport.length}\n\n`;
        
        // CSV Headers
        csvContent += 'Vendor Name,Email,Orders,Revenue,Rating,Commission,Status,Registration Date\n';
        
        // CSV Data
        dataToExport.forEach(vendor => {
          const name = (vendor.name || '').replace(/,/g, ';');
          const email = (vendor.email || '').replace(/,/g, ';');
          const orders = vendor.orders || 0;
          const revenue = (vendor.revenue || 'N/A').replace(/,/g, '');
          const rating = vendor.rating || 'N/A';
          const commission = (vendor.commission || 'N/A').replace(/,/g, '');
          const status = (vendor.status || 'N/A').replace(/,/g, ';');
          const regDate = vendor.registrationDate || 'N/A';
          
          csvContent += `${name},${email},${orders},${revenue},${rating},${commission},${status},${regDate}\n`;
        });
      } else if (activeTab === 'products') {
        // Export filtered products or all pending products
        dataToExport = filteredProducts.length > 0 ? filteredProducts : pendingProducts;
        fileName = `pending_products_report_${new Date().toISOString().split('T')[0]}.csv`;
        
        // Generate CSV content for products
        csvContent = 'Pending Products Report\n';
        csvContent += `Generated: ${new Date().toLocaleString()}\n`;
        csvContent += `Total Pending Products: ${dataToExport.length}\n\n`;
        
        // CSV Headers
        csvContent += 'Product Name,SKU,Part Number,Vendor,Price,Stock,Category,Brand,Status\n';
        
        // CSV Data
        dataToExport.forEach(product => {
          const name = (product.name || '').replace(/,/g, ';');
          const sku = (product.sku || 'N/A').replace(/,/g, ';');
          const partNumber = (product.partNumber || 'N/A').replace(/,/g, ';');
          const vendor = (product.vendorId?.name || product.vendorId?.vendorDetails?.storeName || 'N/A').replace(/,/g, ';');
          const price = product.price || 0;
          const stock = product.stock || 0;
          const category = (product.category || 'N/A').replace(/,/g, ';');
          const brand = (product.brand || 'N/A').replace(/,/g, ';');
          const status = (product.status || 'pending').replace(/,/g, ';');
          
          csvContent += `${name},${sku},${partNumber},${vendor},₹${price},${stock},${category},${brand},${status}\n`;
        });
      }
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`Exported ${dataToExport.length} ${activeTab === 'vendors' ? 'vendors' : 'products'} successfully!`);
    } catch (error) {
      console.error('Failed to export data:', error);
      toast.error('Failed to export data: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  // Product Detail View
  if (view === 'productDetail' && selectedProduct) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900 uppercase">Product Details</h2>
          <button onClick={() => { setView('list'); setSelectedProduct(null); }} className="text-gray-500 font-bold hover:text-gray-900">← Back</button>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              {selectedProduct.images && selectedProduct.images.length > 0 ? (
                <div className="space-y-4">
                  <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-lg" />
                  {selectedProduct.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {selectedProduct.images.slice(1, 5).map((img, idx) => (
                        <img key={idx} src={img} alt={`${selectedProduct.name} ${idx + 2}`} className="w-full h-20 object-cover rounded" />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FaBox className="text-6xl text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-black text-gray-900 mb-2">{selectedProduct.name}</h3>
                <p className="text-gray-500 font-bold">SKU: {selectedProduct.sku || 'N/A'}</p>
                <p className="text-gray-500 font-bold">Part Number: {selectedProduct.partNumber || 'N/A'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Price</p>
                  <p className="font-bold text-gray-900">₹{selectedProduct.price?.toLocaleString() || 'N/A'}</p>
                  {selectedProduct.mrp && selectedProduct.mrp > selectedProduct.price && (
                    <p className="text-xs text-gray-500 line-through">MRP: ₹{selectedProduct.mrp.toLocaleString()}</p>
                  )}
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Stock</p>
                  <p className="font-bold text-gray-900">{selectedProduct.stock || 0} units</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Category</p>
                  <p className="font-bold text-gray-900">{selectedProduct.category || 'N/A'}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Brand</p>
                  <p className="font-bold text-gray-900">{selectedProduct.brand || 'N/A'}</p>
                </div>
              </div>

              {selectedProduct.description && (
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase mb-2">Description</p>
                  <p className="text-gray-700">{selectedProduct.description}</p>
                </div>
              )}

              {selectedProduct.vehicleCompatibility && selectedProduct.vehicleCompatibility.length > 0 && (
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase mb-2">Vehicle Compatibility</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.vehicleCompatibility.map((vehicle, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                        {vehicle}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => handleProductAction('approve', selectedProduct)}
                  className="flex-1 py-3 bg-green-600 text-white font-black rounded-xl uppercase tracking-widest hover:bg-green-700 transition shadow-lg"
                  disabled={loading}
                >
                  <FaCheckCircle className="inline mr-2" /> Approve Product
                </button>
                <button
                  onClick={() => handleProductAction('delete', selectedProduct)}
                  className="flex-1 py-3 bg-red-600 text-white font-black rounded-xl uppercase tracking-widest hover:bg-red-700 transition shadow-lg"
                  disabled={loading}
                >
                  <FaTimesCircle className="inline mr-2" /> Reject/Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'view' && selectedVendor) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900 uppercase">Vendor Profile</h2>
          <button onClick={() => setView('list')} className="text-gray-500 font-bold hover:text-gray-900">← Back</button>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 flex flex-col md:flex-row gap-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
            <FaStore size={40} />
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="text-3xl font-black text-gray-900">{selectedVendor.name}</h3>
              <p className="text-gray-500 font-bold">{selectedVendor.email}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase">Status</p>
                <p className="font-bold text-gray-900">{selectedVendor.status}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase">Revenue</p>
                <p className="font-bold text-gray-900">{selectedVendor.revenue}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase">Commission</p>
                <p className="font-bold text-gray-900">{selectedVendor.commission}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase">Joined</p>
                <p className="font-bold text-gray-900">{selectedVendor.registrationDate}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => handleAction('edit', selectedVendor)} className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">Edit Profile</button>
              <button className="flex-1 py-4 bg-white border border-gray-200 text-gray-900 font-black rounded-2xl uppercase tracking-widest hover:bg-gray-50 transition">Message Vendor</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'edit') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900 uppercase">Edit Vendor</h2>
          <button onClick={() => setView('list')} className="text-gray-500 font-bold hover:text-gray-900">Cancel</button>
        </div>
        <form onSubmit={handleSave} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Vendor Name</label>
              <input required type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</label>
              <input required type="email" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Commission (%)</label>
              <input required type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.commission} onChange={e => setFormData({ ...formData, commission: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Status</label>
              <select className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest">Update Vendor Account</button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Vendor Management</h2>
          <p className="text-xs text-gray-600 mt-1">Approve and manage vendor registrations and products</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExport}
            disabled={exporting || (activeTab === 'vendors' && filteredVendors.length === 0 && vendors.length === 0) || (activeTab === 'products' && filteredProducts.length === 0 && pendingProducts.length === 0)}
            className="bg-white border border-red-500 text-red-500 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-50 transition-colors"
            title={`Export ${activeTab === 'vendors' ? 'vendors' : 'pending products'} to CSV`}
          >
            {exporting ? <FaSpinner className="animate-spin text-red-500" /> : <FaDownload className="text-red-500" />} <span className="text-red-500">Export</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => { setActiveTab('vendors'); setView('list'); }}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'vendors'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaStore className="inline mr-2" /> Vendors
            </button>
            <button
              onClick={() => { setActiveTab('products'); setView('list'); }}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'products'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaBox className="inline mr-2" /> Pending Products ({pendingProducts.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Pending Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name, SKU, or part number..."
                value={productSearchTerm}
                onChange={(e) => setProductSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-lg shadow-md border border-gray-100 p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          )}

          {/* Products Table */}
          {!loading && (
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                          No pending products found.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product) => (
                        <tr key={product._id || product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {product.images && product.images.length > 0 ? (
                                <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded" />
                              ) : (
                                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                                  <FaBox className="text-gray-400" />
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                                <p className="text-xs text-gray-500">{product.brand || 'N/A'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {product.vendorId?.name || product.vendorId?.vendorDetails?.storeName || 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{product.sku || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{product.price?.toLocaleString() || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{product.stock || 0}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{product.category || 'N/A'}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleProductAction('view', product)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                title="View Details"
                              >
                                <FaEye />
                              </button>
                              <button
                                onClick={() => handleProductAction('approve', product)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                title="Approve Product"
                                disabled={loading}
                              >
                                <FaCheckCircle />
                              </button>
                              <button
                                onClick={() => handleProductAction('delete', product)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                title="Reject/Delete"
                                disabled={loading}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Vendors Tab */}
      {activeTab === 'vendors' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vendors..."
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
                <option value="active">Active</option>
                <option value="pending">Pending Approval</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Vendors Table */}
          <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredVendors.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                        No vendors found.
                      </td>
                    </tr>
                  ) : (
                    filteredVendors.map((vendor) => (
                      <tr key={vendor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                              <FaStore />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{vendor.name}</p>
                              <p className="text-xs text-gray-500">{vendor.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{vendor.orders}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{vendor.revenue}</td>
                        <td className="px-6 py-4">
                          {vendor.rating ? (
                            <div className="flex items-center gap-1">
                              <FaStar className="text-yellow-500 text-xs" />
                              <span className="text-sm font-semibold">{vendor.rating}</span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{vendor.commission}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${vendor.status === 'active' ? 'bg-green-100 text-green-800' :
                            vendor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                            {vendor.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAction('view', vendor)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => handleAction('edit', vendor)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleAction('delete', vendor)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendors;

