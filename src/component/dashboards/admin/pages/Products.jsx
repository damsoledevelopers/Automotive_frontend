import React, { useState, useMemo } from 'react';
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
    FaPlus
} from 'react-icons/fa';

const Products = () => {
    const [view, setView] = useState('list'); // 'list', 'add', 'edit', 'view_detail'
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const [formData, setFormData] = useState({
        name: '', sku: '', category: 'Brakes', price: '', stock: '',
        description: '', brand: '', compatibility: '', vendor: ''
    });

    const handleAction = (type, product) => {
        setSelectedProduct(product);
        if (type === 'edit') {
            setFormData({ ...product });
            setView('edit');
        } else if (type === 'delete') {
            if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
                alert('Product deleted successfully (Simulation)');
            }
        } else if (type === 'view') {
            setView('view_detail');
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        alert(`Product "${formData.name}" ${view === 'edit' ? 'updated' : 'added'} successfully!`);
        setView('list');
    };

    // Simulated Global Product Data
    const products = useMemo(() => [
        { id: 1, name: 'Premium Brake Pads', sku: 'BK-772-PR', vendor: 'Auto Parts Hub', category: 'Brakes', price: 2500, stock: 450, sales: 1200, status: 'active' },
        { id: 2, name: 'Engine Oil Filter', sku: 'FL-001-EN', vendor: 'Premium Spares', category: 'Filters', price: 650, stock: 120, sales: 850, status: 'low_stock' },
        { id: 3, name: 'Clutch Assembly', sku: 'CL-990-AS', vendor: 'Quick Auto Solutions', category: 'Engine', price: 8900, stock: 15, sales: 340, status: 'low_stock' },
        { id: 4, name: 'Radiator Fan', sku: 'RD-552-FN', vendor: 'Auto Parts Hub', category: 'Cooling', price: 3200, stock: 0, sales: 560, status: 'out_of_stock' },
        { id: 5, name: 'Spark Plug Set', sku: 'SP-101-NG', vendor: 'Genuine Parts Store', category: 'Electrical', price: 1200, stock: 890, sales: 2300, status: 'active' },
        { id: 6, name: 'Air Filter', sku: 'AF-202-PR', vendor: 'Budget Auto Parts', category: 'Filters', price: 450, stock: 56, sales: 1100, status: 'active' },
        { id: 7, name: 'Shock Absorber - Front', sku: 'SA-881-FR', vendor: 'Premium Spares', category: 'Suspension', price: 5600, stock: 34, sales: 210, status: 'active' },
    ], []);

    const categories = ['Brakes', 'Filters', 'Engine', 'Cooling', 'Electrical', 'Suspension'];

    const filteredProducts = products.filter(product => {
        const matchesSearch = !searchTerm ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.vendor.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || product.status === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const getStatusStyle = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'low_stock': return 'bg-orange-100 text-orange-800';
            case 'out_of_stock': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return <FaCheckCircle className="text-xs" />;
            case 'low_stock': return <FaExclamationTriangle className="text-xs" />;
            case 'out_of_stock': return <FaTimesCircle className="text-xs" />;
            default: return null;
        }
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
                        <div className="w-full aspect-square bg-gray-50 rounded-2xl flex items-center justify-center text-gray-200">
                            <FaBox size={100} />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(selectedProduct.status)}`}>
                                {selectedProduct.status}
                            </span>
                            <h3 className="text-3xl font-black text-gray-900 mt-2">{selectedProduct.name}</h3>
                            <p className="text-gray-500 font-bold">SKU: {selectedProduct.sku}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase">Vendor</p>
                                <p className="font-bold text-gray-900">{selectedProduct.vendor}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase">Category</p>
                                <p className="font-bold text-gray-900">{selectedProduct.category}</p>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase">Price</p>
                                <p className="text-xl font-black text-blue-600">₹{selectedProduct.price.toLocaleString()}</p>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase">Stock Level</p>
                                <p className="text-xl font-black text-gray-900">{selectedProduct.stock.toLocaleString()} Units</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => handleAction('edit', selectedProduct)} className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest hover:bg-blue-700 transition">Edit Product</button>
                            <button onClick={() => handleAction('delete', selectedProduct)} className="px-6 py-4 border border-red-200 text-red-600 font-black rounded-2xl uppercase tracking-widest hover:bg-red-50 transition">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (view === 'add' || view === 'edit') {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{view === 'edit' ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={() => setView('list')} className="text-gray-500 font-bold hover:text-gray-900">Cancel</button>
                </div>
                <form onSubmit={handleSave} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Product Name</label>
                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">SKU</label>
                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Category</label>
                            <select className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                {categories.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Vendor</label>
                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.vendor} onChange={e => setFormData({ ...formData, vendor: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Price (₹)</label>
                            <input required type="number" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Stock</label>
                            <input required type="number" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} />
                        </div>
                    </div>
                    <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest shadow-lg shadow-blue-500/20">{view === 'edit' ? 'Update Product' : 'Add Product'}</button>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Global Catalog Management</h2>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Monitor & Manage Multi-Vendor Products</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setView('add')} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-sm">
                        <FaPlus className="mr-1" /> Add Product
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition shadow-sm">
                        <FaDownload /> Export CSV
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Products</p>
                    <p className="text-3xl font-black text-blue-600">84,520</p>
                    <div className="flex items-center gap-1 mt-2 text-green-600 text-xs font-bold">
                        <FaArrowUp /> 12% growth
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Active Listings</p>
                    <p className="text-3xl font-black text-green-600">72,105</p>
                    <p className="text-xs text-gray-400 mt-2">Across 1,200 Vendors</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Low Stock Alerts</p>
                    <p className="text-3xl font-black text-orange-500">1,402</p>
                    <p className="text-xs text-red-500 font-bold mt-2">Urgent restock needed</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Global Sales (MTD)</p>
                    <p className="text-3xl font-black text-purple-600">₹42.8M</p>
                    <div className="flex items-center gap-1 mt-2 text-green-600 text-xs font-bold">
                        <FaArrowUp /> 8.4% WoW
                    </div>
                </div>
            </div>

            {/* Filters Area */}
            <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by Product Name, SKU, or Vendor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-4 focus:ring-blue-500/10 font-bold transition"
                        />
                    </div>
                    <div className="relative">
                        <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl font-bold appearance-none transition"
                        >
                            <option value="all">All Categories</option>
                            {categories.map(cat => <option key={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl font-bold appearance-none transition"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="low_stock">Low Stock</option>
                            <option value="out_of_stock">Out of Stock</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
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
                                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 transition-transform group-hover:scale-110">
                                                <FaBox />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 leading-tight">{product.name}</p>
                                                <p className="text-[10px] font-mono text-gray-400 font-bold">{product.sku}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <FaStore className="text-gray-300" />
                                            {product.vendor}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-black text-gray-900 text-center">
                                        ₹{product.price.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="inline-block px-3 py-1 bg-gray-50 rounded-lg text-sm font-black text-gray-700">
                                            {product.stock.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(product.status)}`}>
                                            {getStatusIcon(product.status)}
                                            {product.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleAction('view', product)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition shadow-sm bg-white border border-gray-100" title="View Detail"
                                            >
                                                <FaEye size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleAction('edit', product)}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition shadow-sm bg-white border border-gray-100" title="Edit Listing"
                                            >
                                                <FaEdit size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleAction('delete', product)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition shadow-sm bg-white border border-gray-100" title="Remove Listing"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredProducts.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-gray-200">
                            <FaBox size={30} className="text-gray-300" />
                        </div>
                        <p className="text-gray-900 font-black text-xl mb-1 uppercase tracking-tight">No Products Found</p>
                        <p className="text-gray-500 font-medium">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>

            {/* Internal Security Note */}
            <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                <FaExclamationTriangle className="text-yellow-600 shrink-0" />
                <p className="text-[10px] font-bold text-yellow-800 uppercase leading-relaxed">
                    Admin Notice: All global catalog changes are logged with user ID. Unauthorized deletion of products will trigger a security audit.
                </p>
            </div>
        </div>
    );
};

export default Products;
