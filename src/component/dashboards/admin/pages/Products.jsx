import React, { useState, useEffect } from 'react';
import {
    FaSearch,
    FaFilter,
    FaDownload,
    FaBox,
    FaStore,
    FaExclamationTriangle,
    FaCheckCircle,
    FaTimesCircle,
    FaEye,
    FaEdit,
    FaTrash,
    FaArrowUp,
    FaArrowDown,
    FaPlus,
    FaClock,
    FaSpinner
} from 'react-icons/fa';
import { productService, categoryService } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const Products = () => {
    const [view, setView] = useState('list'); // 'list', 'view_detail'
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('approved'); // 'pending', 'approved', 'all' - Default to approved/live products
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0
    });

    // Fetch products from API
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const filters = {
                search: searchTerm || undefined,
                category: categoryFilter !== 'all' ? categoryFilter : undefined,
                status: statusFilter, // Always filter by status (approved or pending)
                limit: 100 // Get more products
            };

            // Remove undefined filters
            Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);

            const response = await productService.getAdminProducts(filters);
            const fetchedProducts = response.products || [];
            setProducts(fetchedProducts);

            // Don't update categories from products - use backend categories instead

            // Calculate stats - always fetch fresh counts in parallel for better performance
            const [totalResult, pendingResult, approvedResult, rejectedResult] = await Promise.all([
                productService.getAdminProducts({ limit: 1 }),
                productService.getAdminProducts({ status: 'pending', limit: 1 }),
                productService.getAdminProducts({ status: 'approved', limit: 1 }),
                productService.getAdminProducts({ status: 'rejected', limit: 1 })
            ]);

            setStats({
                total: totalResult.pagination?.total || 0,
                pending: pendingResult.pagination?.total || 0,
                approved: approvedResult.pagination?.total || 0,
                rejected: rejectedResult.pagination?.total || 0
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error(error.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    // Fetch categories from backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoadingCategories(true);
                const result = await categoryService.getAllActiveCategoriesFlat();
                const categoriesData = result.categories || result || [];
                const categoryNames = categoriesData
                    .map(cat => cat.name)
                    .filter(name => name && name.trim() !== '')
                    .sort();
                setCategories(categoryNames);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                // Fallback: extract from products if API fails
                if (products.length > 0) {
                    const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
                    setCategories(uniqueCategories.sort());
                }
            } finally {
                setLoadingCategories(false);
            }
        };
        fetchCategories();
    }, []);

    // Fetch products when status or category filter changes
    useEffect(() => {
        fetchProducts();
    }, [statusFilter, categoryFilter]); // Refetch when status or category changes

    // Handle approve product
    const handleApprove = async (productId) => {
        try {
            const response = await productService.approveProduct(productId);
            console.log('Approve response:', response);
            
            // Remove the product from current list immediately (optimistic update)
            setProducts(prevProducts => prevProducts.filter(p => (p._id || p.id) !== productId));
            
            // Refresh stats immediately to update counts
            const [totalResult, pendingResult, approvedResult, rejectedResult] = await Promise.all([
                productService.getAdminProducts({ limit: 1 }),
                productService.getAdminProducts({ status: 'pending', limit: 1 }),
                productService.getAdminProducts({ status: 'approved', limit: 1 }),
                productService.getAdminProducts({ status: 'rejected', limit: 1 })
            ]);

            setStats({
                total: totalResult.pagination?.total || 0,
                pending: pendingResult.pagination?.total || 0,
                approved: approvedResult.pagination?.total || 0,
                rejected: rejectedResult.pagination?.total || 0
            });
            
            // If currently viewing pending, switch to approved and fetch
            if (statusFilter === 'pending') {
                // Fetch approved products first
                const approvedFilters = {
                    search: searchTerm || undefined,
                    category: categoryFilter !== 'all' ? categoryFilter : undefined,
                    status: 'approved',
                    limit: 100
                };
                Object.keys(approvedFilters).forEach(key => approvedFilters[key] === undefined && delete approvedFilters[key]);
                const approvedResponse = await productService.getAdminProducts(approvedFilters);
                setProducts(approvedResponse.products || []);
                // Then switch tab
                setStatusFilter('approved');
            } else {
                // Refresh products list for current filter
                await fetchProducts();
            }
            
            toast.success('Product approved successfully!');
        } catch (error) {
            console.error('Error approving product:', error);
            toast.error(error.message || 'Failed to approve product');
            // Re-fetch on error to restore correct state
            await fetchProducts();
        }
    };

    // Handle reject product
    const handleReject = async (productId) => {
        if (!window.confirm('Are you sure you want to reject this product? It will be marked as rejected.')) {
            return;
        }
        try {
            await productService.rejectProduct(productId);
            toast.success('Product rejected successfully!');
            
            // Remove the product from current list immediately (optimistic update)
            setProducts(prevProducts => prevProducts.filter(p => (p._id || p.id) !== productId));
            
            // Refresh stats immediately to update counts
            const [totalResult, pendingResult, approvedResult, rejectedResult] = await Promise.all([
                productService.getAdminProducts({ limit: 1 }),
                productService.getAdminProducts({ status: 'pending', limit: 1 }),
                productService.getAdminProducts({ status: 'approved', limit: 1 }),
                productService.getAdminProducts({ status: 'rejected', limit: 1 })
            ]);

            setStats({
                total: totalResult.pagination?.total || 0,
                pending: pendingResult.pagination?.total || 0,
                approved: approvedResult.pagination?.total || 0,
                rejected: rejectedResult.pagination?.total || 0
            });
            
            // Refresh products list for current filter
            await fetchProducts();
        } catch (error) {
            console.error('Error rejecting product:', error);
            toast.error(error.message || 'Failed to reject product');
            // Re-fetch on error to restore correct state
            await fetchProducts();
        }
    };

    const handleAction = (type, product) => {
        setSelectedProduct(product);
        if (type === 'view') {
            setView('view_detail');
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = !searchTerm ||
            product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.vendorId?.name?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    // Get inventory status based on stock levels (for approved products)
    const getInventoryStatus = (product) => {
        if (product.status !== 'approved') {
            return null; // Only show inventory status for approved products
        }
        const stock = product.stock || 0;
        if (stock === 0) {
            return { label: 'OUT OF STOCK', style: 'bg-red-100 text-red-800', icon: <FaTimesCircle className="text-xs" /> };
        } else if (stock < 20) {
            return { label: 'LOW STOCK', style: 'bg-orange-100 text-orange-800', icon: <FaExclamationTriangle className="text-xs" /> };
        } else {
            return { label: 'ACTIVE', style: 'bg-green-100 text-green-800', icon: <FaCheckCircle className="text-xs" /> };
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved': return <FaCheckCircle className="text-xs" />;
            case 'pending': return <FaClock className="text-xs" />;
            case 'rejected': return <FaTimesCircle className="text-xs" />;
            default: return null;
        }
    };

    const getVendorName = (product) => {
        if (product.vendorId?.name) return product.vendorId.name;
        if (product.vendorId?.email) return product.vendorId.email;
        if (typeof product.vendorId === 'string') return product.vendorId;
        return 'Unknown Vendor';
    };

    if (view === 'view_detail' && selectedProduct) {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Product Details</h2>
                    <button onClick={() => setView('list')} className="text-gray-500 font-bold hover:text-gray-900">← Back</button>
                </div>
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="w-full aspect-square bg-gray-50 rounded-2xl flex items-center justify-center text-gray-200 overflow-hidden">
                            {selectedProduct.images && selectedProduct.images.length > 0 ? (
                                <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full h-full object-cover" />
                            ) : selectedProduct.imageUrl ? (
                                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-full object-cover" />
                            ) : (
                                <FaBox size={100} />
                            )}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(selectedProduct.status)}`}>
                                {selectedProduct.status || 'pending'}
                            </span>
                            <h3 className="text-3xl font-black text-gray-900 mt-2">{selectedProduct.name}</h3>
                            <p className="text-gray-500 font-bold">SKU: {selectedProduct.sku || 'N/A'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase">Vendor</p>
                                <p className="font-bold text-gray-900">{getVendorName(selectedProduct)}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase">Category</p>
                                <p className="font-bold text-gray-900">{selectedProduct.category || 'N/A'}</p>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase">Price</p>
                                <p className="text-xl font-black text-blue-600">₹{selectedProduct.price?.toLocaleString() || '0'}</p>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase">Stock Level</p>
                                <p className="text-xl font-black text-gray-900">{selectedProduct.stock?.toLocaleString() || '0'} Units</p>
                            </div>
                        </div>
                        {/* Additional Product Details */}
                        <div className="grid grid-cols-2 gap-4">
                            {selectedProduct.brand && (
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-[10px] font-black text-gray-400 uppercase">Brand</p>
                                    <p className="font-bold text-gray-900">{selectedProduct.brand}</p>
                                </div>
                            )}
                            {selectedProduct.partNumber && (
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-[10px] font-black text-gray-400 uppercase">Part Number</p>
                                    <p className="font-bold text-gray-900">{selectedProduct.partNumber}</p>
                                </div>
                            )}
                            {selectedProduct.origin && (
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-[10px] font-black text-gray-400 uppercase">Origin</p>
                                    <p className="font-bold text-gray-900">{selectedProduct.origin}</p>
                                </div>
                            )}
                            {selectedProduct.class && (
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-[10px] font-black text-gray-400 uppercase">Class</p>
                                    <p className="font-bold text-gray-900">{selectedProduct.class}</p>
                                </div>
                            )}
                            {selectedProduct.mrp && (
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-[10px] font-black text-gray-400 uppercase">MRP</p>
                                    <p className="font-bold text-gray-900">₹{selectedProduct.mrp.toLocaleString()}</p>
                                </div>
                            )}
                            {selectedProduct.discount && selectedProduct.discount > 0 && (
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-[10px] font-black text-gray-400 uppercase">Discount</p>
                                    <p className="font-bold text-green-600">-{selectedProduct.discount}%</p>
                                </div>
                            )}
                            {selectedProduct.minOrderQty && (
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-[10px] font-black text-gray-400 uppercase">Min Order Qty</p>
                                    <p className="font-bold text-gray-900">{selectedProduct.minOrderQty} Units</p>
                                </div>
                            )}
                            {selectedProduct.soldBy && (
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-[10px] font-black text-gray-400 uppercase">Sold By</p>
                                    <p className="font-bold text-gray-900">{selectedProduct.soldBy}</p>
                                </div>
                            )}
                        </div>
                        {selectedProduct.vehicleCompatibility && selectedProduct.vehicleCompatibility.length > 0 && (
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Vehicle Compatibility</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProduct.vehicleCompatibility.map((vehicle, index) => (
                                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold">
                                            {vehicle}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {selectedProduct.warranty && (
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase">Warranty</p>
                                <p className="font-bold text-gray-900">{selectedProduct.warranty}</p>
                            </div>
                        )}
                        {selectedProduct.deliveryTime && (
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase">Delivery Time</p>
                                <p className="font-bold text-gray-900">{selectedProduct.deliveryTime}</p>
                            </div>
                        )}
                        {selectedProduct.description && (
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Description</p>
                                <p className="text-sm text-gray-700">{selectedProduct.description}</p>
                            </div>
                        )}
                        {selectedProduct.status === 'pending' && (
                            <div className="flex gap-4">
                                <button 
                                    onClick={async () => {
                                        await handleApprove(selectedProduct._id || selectedProduct.id);
                                        setView('list');
                                    }} 
                                    className="flex-1 py-4 bg-green-600 text-white font-black rounded-2xl uppercase tracking-widest hover:bg-green-700 transition"
                                >
                                    Approve Product
                                </button>
                                <button 
                                    onClick={async () => {
                                        await handleReject(selectedProduct._id || selectedProduct.id);
                                        setView('list');
                                    }} 
                                    className="px-6 py-4 border border-red-200 text-red-600 font-black rounded-2xl uppercase tracking-widest hover:bg-red-50 transition"
                                >
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Products Management</h2>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Review & Manage Product Approvals</p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={fetchProducts}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition shadow-sm"
                    >
                        <FaDownload /> Refresh
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Products</p>
                    <p className="text-3xl font-black text-blue-600">{stats.total.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pending Review</p>
                    <p className="text-3xl font-black text-yellow-600">{stats.pending.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Approved (Live)</p>
                    <p className="text-3xl font-black text-green-600">{stats.approved.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Rejected</p>
                    <p className="text-3xl font-black text-red-600">{stats.rejected.toLocaleString()}</p>
                </div>
            </div>

            {/* Tabs for Status Filter */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-2">
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setStatusFilter('approved');
                            setSearchTerm('');
                            setCategoryFilter('all');
                        }}
                        className={`flex-1 px-4 py-3 rounded-xl font-black uppercase tracking-widest text-sm transition ${
                            statusFilter === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <FaCheckCircle className="inline mr-2" />
                        All Live Products ({stats.approved})
                    </button>
                    <button
                        onClick={() => {
                            setStatusFilter('pending');
                            setSearchTerm('');
                            setCategoryFilter('all');
                        }}
                        className={`flex-1 px-4 py-3 rounded-xl font-black uppercase tracking-widest text-sm transition ${
                            statusFilter === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <FaClock className="inline mr-2" />
                        Pending Review ({stats.pending})
                    </button>
                </div>
            </div>

            {/* Filters Area */}
            <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                        <input
                            type="text"
                            placeholder="Search by Product Name, SKU, or Vendor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    fetchProducts();
                                }
                            }}
                            className="w-full pl-12 pr-24 py-3 bg-gray-50 border-none rounded-xl focus:ring-4 focus:ring-blue-500/10 font-bold transition"
                        />
                        <button
                            onClick={fetchProducts}
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-bold"
                        >
                            Search
                        </button>
                    </div>
                    <div className="relative">
                        <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl font-bold appearance-none transition"
                            disabled={loadingCategories}
                        >
                            <option value="all">All Categories</option>
                            {loadingCategories ? (
                                <option disabled>Loading categories...</option>
                            ) : (
                                categories.map(cat => <option key={cat} value={cat}>{cat}</option>)
                            )}
                        </select>
                        {loadingCategories && (
                            <FaSpinner className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" />
                        )}
                    </div>
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-20 text-center">
                        <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">Loading products...</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product & SKU</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Vendor</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Price</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Stock</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredProducts.map(product => (
                                        <tr key={product._id || product.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 transition-transform group-hover:scale-110">
                                                        <FaBox />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-gray-900 leading-tight">{product.name}</p>
                                                        <p className="text-[10px] font-mono text-gray-400 font-bold">{product.sku || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <FaStore className="text-gray-300" />
                                                    {getVendorName(product)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                                                    {product.category || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-black text-gray-900 text-center">
                                                ₹{product.price?.toLocaleString() || '0'}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="inline-block px-3 py-1 bg-gray-50 rounded-lg text-sm font-black text-gray-700">
                                                    {product.stock?.toLocaleString() || '0'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {(() => {
                                                    const inventoryStatus = getInventoryStatus(product);
                                                    if (inventoryStatus) {
                                                        // Show inventory status for approved products
                                                        return (
                                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${inventoryStatus.style}`}>
                                                                {inventoryStatus.icon}
                                                                {inventoryStatus.label}
                                                            </span>
                                                        );
                                                    } else {
                                                        // Show approval status for pending/rejected products
                                                        return (
                                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(product.status || 'pending')}`}>
                                                                {getStatusIcon(product.status || 'pending')}
                                                                {product.status || 'pending'}
                                                            </span>
                                                        );
                                                    }
                                                })()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleAction('view', product)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition shadow-sm bg-white border border-gray-100" 
                                                        title="View Detail"
                                                    >
                                                        <FaEye size={14} />
                                                    </button>
                                                    {product.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleApprove(product._id || product.id)}
                                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition shadow-sm bg-white border border-gray-100" 
                                                                title="Approve Product"
                                                            >
                                                                <FaCheckCircle size={14} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(product._id || product.id)}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition shadow-sm bg-white border border-gray-100" 
                                                                title="Reject Product"
                                                            >
                                                                <FaTimesCircle size={14} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredProducts.length === 0 && !loading && (
                            <div className="p-20 text-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-gray-200">
                                    <FaBox size={30} className="text-gray-300" />
                                </div>
                                <p className="text-gray-900 font-black text-xl mb-1 uppercase tracking-tight">No Products Found</p>
                                <p className="text-gray-500 font-medium">Try adjusting your filters or search terms.</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Internal Security Note */}
            <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                <FaExclamationTriangle className="text-yellow-600 shrink-0" />
                <p className="text-[10px] font-bold text-yellow-800 uppercase leading-relaxed">
                    Admin Notice: All product approval actions are logged. Only approved products are visible to customers on the public website.
                </p>
            </div>
        </div>
    );
};

export default Products;








