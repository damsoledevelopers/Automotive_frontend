import React, { useState, useMemo } from 'react';
import {
  FaExclamationTriangle,
  FaBox,
  FaCheckCircle,
  FaTimesCircle,
  FaBell,
  FaEdit,
  FaPlus,
  FaSearch,
  FaFilter,
  FaArrowDown
} from 'react-icons/fa';

const Inventory = ({ products }) => {
  const [view, setView] = useState('list'); // 'list' or 'add'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Brakes',
    price: '',
    stock: '',
    description: '',
    brand: '',
    compatibility: ''
  });

  // Calculate stock statistics
  const stockStats = useMemo(() => {
    const totalSKUs = products.length;
    const inStock = products.filter(p => p.stock > 0).length;
    const outOfStock = products.filter(p => p.stock === 0).length;
    const lowStock = products.filter(p => p.stock > 0 && p.stock < 20).length;
    const totalStockValue = products.reduce((sum, p) => sum + (p.stock * (p.price || 0)), 0);

    return {
      totalSKUs,
      inStock,
      outOfStock,
      lowStock,
      totalStockValue
    };
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus === 'low') {
      filtered = filtered.filter(p => p.stock > 0 && p.stock < 20);
    } else if (filterStatus === 'out') {
      filtered = filtered.filter(p => p.stock === 0);
    } else if (filterStatus === 'in') {
      filtered = filtered.filter(p => p.stock >= 20);
    }

    return filtered;
  }, [products, searchTerm, filterStatus]);

  // Restocking alerts
  const restockingAlerts = useMemo(() => {
    return products
      .filter(p => p.stock < 20)
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 10);
  }, [products]);

  const handleRestock = (product) => {
    setSelectedProduct(product);
    setShowRestockModal(true);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800', icon: FaTimesCircle };
    if (stock < 20) return { label: 'Low Stock', color: 'bg-orange-100 text-orange-800', icon: FaExclamationTriangle };
    return { label: 'In Stock', color: 'bg-green-100 text-green-800', icon: FaCheckCircle };
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    alert(`Product "${formData.name}" added successfully! (Simulation)`);
    setView('list');
    setFormData({
      name: '',
      sku: '',
      category: 'Brakes',
      price: '',
      stock: '',
      description: '',
      brand: '',
      compatibility: ''
    });
  };

  if (view === 'add') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Add New Product</h3>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Expansion & Inventory Growth</p>
          </div>
          <button
            onClick={() => setView('list')}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold flex items-center gap-2 transition"
          >
            ← Back to Inventory
          </button>
        </div>

        <form onSubmit={handleAddProduct} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6">
              <h4 className="text-lg font-black text-gray-900 border-b pb-4">Product Details</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Name</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Premium Ceramic Brake Pads"
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SKU Number</label>
                  <input
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                    placeholder="PR-BK-772"
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-blue-500 outline-none transition font-bold appearance-none bg-white"
                  >
                    <option>Brakes</option>
                    <option>Suspension</option>
                    <option>Engine</option>
                    <option>Filters</option>
                    <option>Cooling</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Brand Name</label>
                  <input
                    value={formData.brand}
                    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                    placeholder="OEM / Bosch"
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-blue-500 outline-none transition font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">MRP Rate (₹)</label>
                  <input
                    required
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="2500"
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-blue-500 outline-none transition font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Description</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed technical specifications..."
                  className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-blue-500 outline-none transition font-medium"
                />
              </div>
            </section>

            <section className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6">
              <h4 className="text-lg font-black text-gray-900 border-b pb-4">Vehicle Compatibility</h4>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Compatible Models</label>
                <input
                  value={formData.compatibility}
                  onChange={(e) => setFormData(prev => ({ ...prev, compatibility: e.target.value }))}
                  placeholder="Toyota Innova (2015-2022), Mahindra XUV500..."
                  className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-blue-500 outline-none transition font-bold"
                />
                <p className="text-[10px] text-gray-400 italic">Separate multiple models with commas</p>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-indigo-900 text-white p-8 rounded-3xl shadow-xl space-y-6">
              <h4 className="text-lg font-bold border-b border-white/20 pb-4">Stock Management</h4>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Initial Opening Stock</label>
                <input
                  required
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                  placeholder="0"
                  className="w-full bg-white/10 border border-white/20 px-5 py-3 rounded-2xl focus:bg-white/20 outline-none transition font-black text-xl"
                />
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                <FaBell className="text-yellow-400" />
                <div>
                  <p className="text-[10px] font-bold text-white uppercase">Stock Alert</p>
                  <p className="text-[8px] text-indigo-200">Notify me when stock drops below 10 units.</p>
                </div>
              </div>
            </section>

            <div className="bg-white p-2 rounded-3xl shadow-lg border border-gray-100">
              <button
                type="submit"
                className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xl shadow-2xl shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <FaPlus /> SAVE PRODUCT
              </button>
            </div>

            <div className="p-6 bg-gray-50 rounded-3xl border border-dashed border-gray-300 text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Internal Note</p>
              <p className="text-[10px] text-gray-500 italic">Adding a product will automatically trigger a sync with the workshop catalog.</p>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Product Inventory</h3>
          <p className="text-sm text-gray-600 font-bold uppercase tracking-widest">Global Availability Control</p>
        </div>
        <button
          onClick={() => setView('add')}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black shadow-xl shadow-blue-100 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
        >
          <FaPlus /> ADD NEW PRODUCT
        </button>
      </div>

      {/* Stock Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-blue-900">Total SKUs</h4>
            <FaBox className="text-blue-500 text-xl" />
          </div>
          <p className="text-3xl font-bold text-blue-900">{stockStats.totalSKUs}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-green-900">In Stock</h4>
            <FaCheckCircle className="text-green-500 text-xl" />
          </div>
          <p className="text-3xl font-bold text-green-900">{stockStats.inStock}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-orange-900">Low Stock</h4>
            <FaExclamationTriangle className="text-orange-500 text-xl" />
          </div>
          <p className="text-3xl font-bold text-orange-900">{stockStats.lowStock}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-6 border border-red-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-red-900">Out of Stock</h4>
            <FaTimesCircle className="text-red-500 text-xl" />
          </div>
          <p className="text-3xl font-bold text-red-900">{stockStats.outOfStock}</p>
        </div>
      </div>

      {/* Restocking Alerts */}
      {restockingAlerts.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FaBell className="text-red-500 text-2xl" />
              <div>
                <h4 className="font-bold text-red-900 text-lg">Restocking Alerts</h4>
                <p className="text-sm text-red-700">{restockingAlerts.length} products need immediate attention</p>
              </div>
            </div>
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-bold">
              {restockingAlerts.length}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {restockingAlerts.slice(0, 6).map((product) => {
              const status = getStockStatus(product.stock);
              const StatusIcon = status.icon;
              return (
                <div key={product.id} className="bg-white rounded-lg p-4 border border-red-200 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 text-sm mb-1">{product.name}</h5>
                      <p className="text-xs text-gray-600 mb-2">SKU: {product.sku}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <StatusIcon className={`text-sm ${status.color.includes('red') ? 'text-red-600' : 'text-orange-600'}`} />
                        <span className={`text-xs px-2 py-1 rounded-full ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-gray-900">
                        Current Stock: <span className="text-red-600">{product.stock} units</span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRestock(product)}
                    className="w-full mt-2 btn-outline text-xs py-2 flex items-center justify-center gap-2"
                  >
                    <FaPlus className="text-xs" /> Restock Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Stock Value Summary */}
      <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-purple-900 mb-1">Total Stock Value</h4>
            <p className="text-3xl font-bold text-purple-900">
              ₹{(stockStats.totalStockValue / 1000000).toFixed(2)}M
            </p>
            <p className="text-sm text-purple-700 mt-1">Current inventory value</p>
          </div>
          <FaBox className="text-purple-300 text-5xl" />
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              <option value="all">All Products</option>
              <option value="in">In Stock (≥20)</option>
              <option value="low">Low Stock (&lt;20)</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">SKU</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => {
                const status = getStockStatus(product.stock);
                const StatusIcon = status.icon;
                return (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-600">{product.category}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700 font-mono">{product.sku}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${product.stock === 0 ? 'text-red-600' :
                            product.stock < 20 ? 'text-orange-600' :
                              'text-green-600'
                          }`}>
                          {product.stock}
                        </span>
                        {product.stock < 20 && product.stock > 0 && (
                          <FaArrowDown className="text-orange-500 text-xs" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-gray-900">₹{product.price?.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        <StatusIcon className="text-xs" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRestock(product)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Restock"
                        >
                          <FaPlus className="text-sm" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-800 p-1"
                          title="Edit"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <FaBox className="text-gray-300 text-4xl mx-auto mb-3" />
            <p className="text-gray-600">No products found</p>
          </div>
        )}
      </div>

      {/* Restock Modal */}
      {showRestockModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Restock Product</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Product</p>
                <p className="font-semibold text-gray-900">{selectedProduct.name}</p>
                <p className="text-xs text-gray-600">SKU: {selectedProduct.sku}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Stock</p>
                <p className="text-lg font-bold text-gray-900">{selectedProduct.stock} units</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter quantity to add"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRestockModal(false);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle restock logic here
                    alert(`Restock functionality for ${selectedProduct.name} will be implemented`);
                    setShowRestockModal(false);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Confirm Restock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;

