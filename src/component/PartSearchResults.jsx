import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaTruck, FaMapMarkerAlt, FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCart } from '../contexts/CartContext';
import Footer from './Footer';

const PartSearchResults = () => {
  const { pn } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  
  // Get car maker from URL params or location state
  const searchParams = new URLSearchParams(location.search);
  const carMaker = searchParams.get('maker') || location.state?.maker || null;
  const [loading, setLoading] = useState(true);
  const [spareType, setSpareType] = useState('new'); // 'new' or 'used'
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // Product attributes based on image design
  const [productAttributes, setProductAttributes] = useState({
    manufacturer: 'OEM', // OEM / After Market (High quality) / Unknown / After Market (Standard)
    compatibility: 'MARUTI: RITZ, SWIFT, DZIRE (2010-2015)', // Show models/year
    tested: 'on car', // on car / Bench test / Not tested
    partAge: '1yr / 20,000kms', // 1yr / 20,000kms
    condition: 'Like New', // Like New / Good / Temporary use
    warranty: '90 days' // 7 days / 90 days / 30 days
  });

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [pn]);

  // Handle Add to Cart
  const handleAddToCart = (part) => {
    // Convert part data to match cart context format
    const cartProduct = {
      id: part.id,
      name: part.name,
      brand: part.brand,
      price: part.originalPrice || part.price,
      discountPrice: part.originalPrice ? part.price : null,
      discount: part.originalPrice ? Math.round(((part.originalPrice - part.price) / part.originalPrice) * 100) : null,
      imageUrl: part.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      rating: part.rating,
      reviews: part.reviews,
    };
    addToCart(cartProduct);
    alert(`${part.name} added to cart!`);
  };

  // Mock product data - single product for spares page
  const [product, setProduct] = useState({
    id: 1,
    name: "Timing Belt",
    partNumber: pn || "543816212007",
    brand: "MARUTI SUZUKI",
    price: 850.00,
    mrp: 1000.00,
    images: [
      "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
      "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
      "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
    ],
    deliveryDays: 4,
    stock: 9,
    isOEM: true,
  });

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [pn]);

  // Calculate discount percentage
  const discount = product.mrp && product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handlePlaceOrder = () => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.mrp || product.price,
      discountPrice: product.mrp && product.mrp > product.price ? product.price : null,
      discount: discount,
      imageUrl: product.images[0],
      partNumber: product.partNumber,
      quantity: quantity,
    };
    // Add quantity times
    for (let i = 0; i < quantity; i++) {
      addToCart(cartProduct);
    }
    alert(`${quantity} x ${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Title - Professional */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">Spares Page</h1>
          {product && (
            <div className="mt-3">
              <span className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</span>
              <h2 className="text-lg sm:text-xl font-medium text-gray-900 mt-1">{product.name}</h2>
            </div>
          )}
        </div>

        {/* New Spares / Used Spares Toggle Buttons - Professional */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSpareType('new')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              spareType === 'new'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            New spares
          </button>
          <button
            onClick={() => setSpareType('used')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              spareType === 'used'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Used spares
          </button>
        </div>
        <p className="text-xs text-gray-500 mb-6">Based on selection spares will be shown.</p>

        {/* Main Content Area - Professional */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Left Column - Spare Pic Carousel */}
          <div className="bg-white border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                Image {selectedImage + 1} of {product.images.length}
              </span>
              {product.isOEM && (
                <span className="px-2 py-1 bg-gray-900 text-white text-xs font-medium">
                  OEM
                </span>
              )}
            </div>
            
            {/* Main Image */}
            <div className="relative mb-3 bg-gray-50 border border-gray-200" style={{ minHeight: '280px' }}>
              {/* Previous Button */}
              {selectedImage > 0 && (
                <button
                  onClick={() => setSelectedImage(selectedImage - 1)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 p-1.5 border border-gray-300 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaChevronLeft className="text-xs" />
                </button>
              )}
              
              {/* Next Button */}
              {selectedImage < product.images.length - 1 && (
                <button
                  onClick={() => setSelectedImage(selectedImage + 1)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 p-1.5 border border-gray-300 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaChevronRight className="text-xs" />
                </button>
              )}
              
              <div className="flex items-center justify-center" style={{ minHeight: '280px' }}>
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="max-w-full max-h-[280px] sm:max-h-[320px] lg:max-h-[240px] object-contain group"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400?text=Product+Image';
                  }}
                />
              </div>
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-2 justify-center">
              {product.images.slice(0, 3).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border overflow-hidden w-16 h-16 flex-shrink-0 transition-colors ${
                    selectedImage === index 
                      ? 'border-gray-900' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-contain bg-white"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=Image';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Video */}
          <div className="bg-white border border-gray-200 p-4">
            <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-3">Video</h3>
            <div className="bg-gray-50 border border-gray-200 flex items-center justify-center" style={{ minHeight: '280px' }}>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaPlay className="text-gray-400 text-sm ml-0.5" />
                </div>
                <p className="text-xs text-gray-400">Video placeholder</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section - Professional */}
        <div className="bg-white border border-gray-200 p-4 sm:p-6 mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Product Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="pb-3 border-b border-gray-100">
              <label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">OEM Part number</label>
              <p className="text-sm font-medium text-gray-900 font-mono">{product.partNumber || 'N/A'}</p>
            </div>
            
            <div className="pb-3 border-b border-gray-100">
              <label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">Manufacturer</label>
              <p className="text-sm font-medium text-gray-900">
                {productAttributes.manufacturer === 'OEM' && 'OEM'}
                {productAttributes.manufacturer === 'After Market (High quality)' && (
                  <span>After Market <span className="text-gray-600">(High quality)</span></span>
                )}
                {productAttributes.manufacturer === 'After Market (Standard)' && (
                  <span>After Market <span className="text-gray-600">(Standard)</span></span>
                )}
                {productAttributes.manufacturer === 'Unknown' && 'Unknown'}
              </p>
            </div>
            
            <div className="pb-3 border-b border-gray-100">
              <label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">Compatibility</label>
              <p className="text-sm font-medium text-gray-900">{productAttributes.compatibility}</p>
            </div>
            
            <div className="pb-3 border-b border-gray-100">
              <label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">Tested</label>
              <p className="text-sm font-medium text-gray-900 capitalize">{productAttributes.tested}</p>
            </div>
            
            <div className="pb-3 border-b border-gray-100">
              <label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">Part Age</label>
              <p className="text-sm font-medium text-gray-900">{productAttributes.partAge}</p>
            </div>
            
            <div className="pb-3 border-b border-gray-100">
              <label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">Condition</label>
              <p className="text-sm font-medium text-gray-900">{productAttributes.condition}</p>
            </div>
            
            <div className="pb-3 border-b border-gray-100 sm:col-span-2 lg:col-span-1">
              <label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">Warranty</label>
              <p className="text-sm font-medium text-gray-900">{productAttributes.warranty}</p>
            </div>
          </div>
        </div>

        {/* Pricing and Order Section - Professional */}
        <div className="bg-white border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pricing Box */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-3">Pricing</h3>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-gray-500">MRP:</span>
                  <span className="text-sm text-gray-400 line-through">₹{(product.mrp || product.price).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-gray-500">Price:</span>
                  <span className="text-xl font-semibold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-xs text-gray-600">You save ₹{((product.mrp || product.price) - product.price).toLocaleString('en-IN')} ({discount}%)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Order Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 text-sm font-medium transition-colors"
                >
                  Place order
                </button>
                
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 text-sm transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-gray-900 font-medium text-sm min-w-[3rem] text-center border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 text-sm transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Estimated Delivery Time */}
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600">
                  Estimated delivery: <span className="font-medium text-gray-900">{product.deliveryDays || 4} days</span>
                </p>
              </div>
              
              {/* Navigate to Delivery Address */}
              <button
                onClick={() => navigate('/checkout/address')}
                className="text-xs text-gray-600 hover:text-gray-900 underline flex items-center gap-1 transition-colors"
              >
                <FaMapMarkerAlt className="text-xs" />
                Delivery address
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PartSearchResults;