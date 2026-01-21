import React, { useState } from 'react';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaExclamationTriangle,
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaTimesCircle,
  FaTag,
  FaImage,
  FaTimes,
  FaBox,
  FaUpload,
  FaCloudUploadAlt
} from 'react-icons/fa';
import { productService } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const Products = ({ products, searchTerm, setSearchTerm, onProductAdded }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    mrp: '',
    stock: '',
    description: '',
    brand: '',
    partNumber: '',
    origin: 'Aftermarket',
    class: 'Universal',
    vehicleCompatibility: [],
    condition: 'new', // new, used, refurbished
    warranty: '',
    deliveryTime: '',
    images: [],
    minOrderQty: '1',
    availability: 'in_stock' // in_stock, out_of_stock, pre_order
  });
  const [vehicleInput, setVehicleInput] = useState('');

  const categories = [
    'Brakes', 'Engine', 'Filters', 'Suspension', 'Electrical', 
    'Cooling', 'Body', 'Interior', 'Lighting', 'Exhaust', 'Other'
  ];

  const origins = ['Aftermarket', 'OEM'];
  const productClasses = ['Universal', 'Vehicle-specific'];

  const handleAddProduct = () => {
    setFormData({
      name: '',
      sku: '',
      category: '',
      price: '',
      mrp: '',
      stock: '',
      description: '',
      brand: '',
      partNumber: '',
      origin: 'Aftermarket',
      class: 'Universal',
      vehicleCompatibility: [],
      condition: 'new',
      warranty: '',
      deliveryTime: '',
      images: [],
      minOrderQty: '1',
      availability: 'in_stock'
    });
    setVehicleInput('');
    setShowAddModal(true);
  };

  // Compress image to reduce base64 size (aggressive compression for multiple images)
  const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.6) => {
    return new Promise((resolve, reject) => {
      // Check file size first - if already small, use as is
      if (file.size < 500000) { // Less than 500KB
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions (more aggressive)
            if (width > height) {
              if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width = (width * maxHeight) / height;
                height = maxHeight;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to base64 with aggressive compression
            const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
            resolve(compressedBase64);
          };
          img.onerror = () => reject(new Error('Failed to load image'));
          img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      } else {
        // For larger files, compress more aggressively
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // More aggressive resizing for large files
            const maxSize = 800;
            if (width > height) {
              if (width > maxSize) {
                height = (height * maxSize) / width;
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width = (width * maxSize) / height;
                height = maxSize;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Lower quality for larger files
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.5);
            resolve(compressedBase64);
          };
          img.onerror = () => reject(new Error('Failed to load image'));
          img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      }
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Limit to maximum 5 images total
    const remainingSlots = 5 - formData.images.length;
    const filesToProcess = files.slice(0, remainingSlots);
    
    if (files.length > remainingSlots) {
      toast.warning(`Maximum 5 images allowed. Only ${remainingSlots} image(s) will be added.`);
    }

    if (filesToProcess.length === 0) {
      toast.warning('Maximum 5 images allowed per product');
      return;
    }

    // Show loading toast
    toast.info('Compressing images...', { autoClose: 2000 });

    const imagePromises = filesToProcess.map(file => {
      // Compress images before converting to base64
      return compressImage(file).catch(error => {
        console.error('Image compression error:', error);
        toast.error(`Failed to compress ${file.name}`);
        return null;
      });
    });

    Promise.all(imagePromises).then(images => {
      const validImages = images.filter(img => img !== null);
      if (validImages.length > 0) {
        setFormData({...formData, images: [...formData.images, ...validImages]});
        toast.success(`${validImages.length} image(s) added successfully`);
      }
    });
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({...formData, images: newImages});
  };

  const handleVehicleInputChange = (e) => {
    setVehicleInput(e.target.value);
  };

  const handleVehicleInputKeyPress = (e) => {
    if (e.key === 'Enter' && vehicleInput.trim()) {
      e.preventDefault();
      if (!formData.vehicleCompatibility.includes(vehicleInput.trim())) {
        setFormData({
          ...formData,
          vehicleCompatibility: [...formData.vehicleCompatibility, vehicleInput.trim()]
        });
      }
      setVehicleInput('');
    }
  };

  const handleRemoveVehicle = (vehicle) => {
    setFormData({
      ...formData,
      vehicleCompatibility: formData.vehicleCompatibility.filter(v => v !== vehicle)
    });
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    const vehicleCompatibility = Array.isArray(product.vehicleCompatibility) 
      ? product.vehicleCompatibility 
      : (product.vehicleCompatibility ? product.vehicleCompatibility.split(',').map(v => v.trim()) : []);
    
    setFormData({
      name: product.name || '',
      sku: product.sku || '',
      category: product.category || '',
      price: product.price || '',
      mrp: product.mrp || '',
      stock: product.stock || '',
      description: product.description || '',
      brand: product.brand || '',
      partNumber: product.partNumber || '',
      origin: product.origin || 'Aftermarket',
      class: product.class || 'Universal',
      vehicleCompatibility: vehicleCompatibility,
      condition: product.condition || 'new',
      warranty: product.warranty || '',
      deliveryTime: product.deliveryTime || '',
      images: product.images || [],
      minOrderQty: product.minOrderQty || '1',
      availability: product.stock > 0 ? 'in_stock' : 'out_of_stock'
    });
    setVehicleInput('');
    setShowEditModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate required fields
      if (!formData.name?.trim()) {
        toast.error('Product name is required');
        return;
      }
      
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        toast.error('Valid price is required');
        return;
      }

      // Format data according to the JSON structure
      // Clean and validate data before sending
      const productData = {
        name: formData.name.trim(),
        price: price,
        origin: formData.origin || 'Aftermarket',
        class: formData.class || 'Universal',
        stock: parseInt(formData.stock) || 0,
        minOrderQty: parseInt(formData.minOrderQty) || 1,
        vehicleCompatibility: formData.vehicleCompatibility || [],
        deliveryTime: formData.deliveryTime?.trim() || ''
      };

      // Add optional fields only if they have values
      if (formData.sku?.trim()) productData.sku = formData.sku.trim();
      if (formData.category?.trim()) productData.category = formData.category.trim();
      if (formData.brand?.trim()) productData.brand = formData.brand.trim();
      if (formData.partNumber?.trim()) productData.partNumber = formData.partNumber.trim();
      if (formData.mrp && !isNaN(parseFloat(formData.mrp))) productData.mrp = parseFloat(formData.mrp);
      if (formData.description?.trim()) productData.description = formData.description.trim();
      if (formData.warranty?.trim()) productData.warranty = formData.warranty.trim();
      
      // Add images with size validation
      if (formData.images && formData.images.length > 0) {
        // Estimate total payload size (rough calculation: base64 is ~33% larger than binary)
        const totalSize = formData.images.reduce((sum, img) => {
          // Base64 string length * 3/4 gives approximate binary size
          return sum + (img.length * 0.75);
        }, 0);
        
        // If total size is too large, show warning but still try to send
        if (totalSize > 50 * 1024 * 1024) { // 50MB
          toast.warning('Images are large. This may take a moment...');
        }
        
        productData.images = formData.images;
      }

      if (showAddModal) {
        // Add new product
        await productService.createVendorProduct(productData);
        toast.success('Product added successfully! Waiting for admin approval.');
      } else if (showEditModal && selectedProduct) {
        // Update existing product
        const productId = selectedProduct._id || selectedProduct.id;
        await productService.updateVendorProduct(productId, productData);
        toast.success('Product updated successfully!');
      }
      
      // Close modals and reset form
      setShowAddModal(false);
      setShowEditModal(false);
      setSelectedProduct(null);
      
      // Reset form data
      setFormData({
        name: '',
        sku: '',
        category: '',
        price: '',
        mrp: '',
        stock: '',
        description: '',
        brand: '',
        partNumber: '',
        origin: 'Aftermarket',
        class: 'Universal',
        vehicleCompatibility: [],
        condition: 'new',
        warranty: '',
        deliveryTime: '',
        images: [],
        minOrderQty: '1',
        availability: 'in_stock'
      });
      setVehicleInput('');
      
      // Refresh product list
      if (onProductAdded) {
        onProductAdded();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to save product');
      console.error('Error saving product:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchTerm || 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    
    // Determine status based on status field (or approved for backward compatibility) and stock
    const productStatusValue = product.status || (product.approved ? 'approved' : 'pending');
    const productStatus = productStatusValue === 'approved'
      ? (product.stock > 0 ? 'Active' : 'Out of Stock')
      : productStatusValue === 'rejected' ? 'Rejected' : 'Pending Approval';
    
    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'active' && productStatus === 'Active') ||
      (filterStatus === 'out' && productStatus === 'Out of Stock') ||
      (filterStatus === 'low' && product.stock > 0 && product.stock < 20) ||
      (filterStatus === 'pending' && productStatus === 'Pending Approval');
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Supply Automotive Parts & Equipment</h3>
          <p className="text-sm text-gray-600 mt-1">Manage your product catalog and inventory</p>
        </div>
        <button 
          onClick={handleAddProduct}
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus /> Add New Product
        </button>
      </div>
      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name, SKU, or part number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending Approval</option>
              <option value="low">Low Stock</option>
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">SKU / Part #</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Availability</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sales</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center ${product.images && product.images.length > 0 ? 'hidden' : ''}`}>
                        <FaImage className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.brand || 'No Brand'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm text-gray-700 font-mono">{product.sku}</p>
                      {product.partNumber && (
                        <p className="text-xs text-gray-500">PN: {product.partNumber}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      <FaTag className="text-xs" />
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${
                        product.stock === 0 ? 'text-red-600' :
                        product.stock < 20 ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {product.stock}
                      </span>
                      {product.stock < 20 && product.stock > 0 && (
                        <FaExclamationTriangle className="text-orange-500 text-xs" />
                      )}
                      {product.stock === 0 && (
                        <FaTimesCircle className="text-red-500 text-xs" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-gray-900">₹{product.price?.toLocaleString()}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                      product.approved && product.stock > 0 
                        ? 'bg-green-100 text-green-800' 
                        : !product.approved 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.approved && product.stock > 0 ? (
                        <>
                          <FaCheckCircle className="text-xs" />
                          Available
                        </>
                      ) : !product.approved ? (
                        <>
                          <FaExclamationTriangle className="text-xs" />
                          Pending Approval
                        </>
                      ) : (
                        <>
                          <FaTimesCircle className="text-xs" />
                          Unavailable
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-600">{product.sales || 0}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-800 p-1" 
                        title="Edit Product"
                      >
                        <FaEdit className="text-sm" />
                      </button>
                      <button 
                        className="text-primary-600 hover:text-primary-800 p-1" 
                        title="View Details"
                      >
                        <FaEye className="text-sm" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800 p-1" 
                        title="Delete"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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

      {/* Add/Edit Product Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {showAddModal ? 'Add New Product' : 'Edit Product'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setSelectedProduct(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Images Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <FaCloudUploadAlt className="text-4xl text-gray-400" />
                      <div className="text-center">
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <span className="btn-primary inline-flex items-center gap-2">
                            <FaUpload /> Upload Images
                          </span>
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB each</p>
                      </div>
                      {formData.images.length > 0 && (
                        <div className="grid grid-cols-4 gap-4 w-full mt-4">
                          {formData.images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image}
                                alt={`Product ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border border-gray-300"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <FaTimes className="text-xs" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Brake Pad Set - Front"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SKU *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.sku}
                      onChange={(e) => setFormData({...formData, sku: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., BP-F-001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand
                    </label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Bosch, Delphi, Honda"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Part Number
                    </label>
                    <input
                      type="text"
                      value={formData.partNumber}
                      onChange={(e) => setFormData({...formData, partNumber: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="OEM Part Number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Origin *
                    </label>
                    <select
                      required
                      value={formData.origin}
                      onChange={(e) => setFormData({...formData, origin: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Aftermarket">Aftermarket</option>
                      <option value="OEM">OEM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Class *
                    </label>
                    <select
                      required
                      value={formData.class}
                      onChange={(e) => setFormData({...formData, class: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Universal">Universal</option>
                      <option value="Vehicle-specific">Vehicle-specific</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Condition *
                    </label>
                    <select
                      required
                      value={formData.condition}
                      onChange={(e) => setFormData({...formData, condition: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="new">New</option>
                      <option value="used">Used</option>
                      <option value="refurbished">Refurbished</option>
                    </select>
                  </div>
                </div>

                {/* Pricing & Inventory */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="6300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      MRP (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.mrp}
                      onChange={(e) => setFormData({...formData, mrp: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="7560"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Order Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.minOrderQty}
                      onChange={(e) => setFormData({...formData, minOrderQty: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="1"
                    />
                  </div>
                </div>

                {/* Vehicle Compatibility */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Compatibility *
                  </label>
                  <input
                    type="text"
                    value={vehicleInput}
                    onChange={handleVehicleInputChange}
                    onKeyPress={handleVehicleInputKeyPress}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter vehicle name and press Enter (e.g., Maruti Swift, Chevrolet Tavera)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter vehicle name and press Enter to add</p>
                  {formData.vehicleCompatibility.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.vehicleCompatibility.map((vehicle, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {vehicle}
                          <button
                            type="button"
                            onClick={() => handleRemoveVehicle(vehicle)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Description
                  </label>
                  <textarea
                    rows="4"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Detailed product description, specifications, and features..."
                  />
                </div>

                {/* Warranty and Delivery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Warranty / Return Policy
                    </label>
                    <input
                      type="text"
                      value={formData.warranty}
                      onChange={(e) => setFormData({...formData, warranty: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 10 Days Return, 1 Year Warranty"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Time *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.deliveryTime}
                      onChange={(e) => setFormData({...formData, deliveryTime: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 4 Days, 5-7 Business Days"
                    />
                  </div>
                </div>

                {/* Availability Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability Status *
                  </label>
                  <select
                    required
                    value={formData.availability}
                    onChange={(e) => setFormData({...formData, availability: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="pre_order">Pre-Order</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {showAddModal ? 'Add Product' : 'Update Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

