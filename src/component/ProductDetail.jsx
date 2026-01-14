import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaShare,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaCheckCircle,
  FaHome,
  FaEye,
  FaMapMarkerAlt,
  FaFileInvoice,
  FaRedoAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { useCart } from "../contexts/CartContext";
import Breadcrumbs from "./catalogue/Breadcrumbs";

const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/600x400?text=Product+Image";

const buildImageVariants = (imageUrl, productId) => {
  const baseImage = imageUrl || PLACEHOLDER_IMAGE;
  const appendParams = (suffix) => {
    const separator = baseImage.includes("?") ? "&" : "?";
    return `${baseImage}${separator}variant=${productId || "product"}_${suffix}&w=400&h=400&fit=crop&auto=format&q=80`;
  };

  return [
    baseImage,
    appendParams("1"),
    appendParams("2"),
    appendParams("3"),
  ];
};

const ProductDetail = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [inWishlist, setInWishlist] = useState(false);
  const [spareType, setSpareType] = useState('new'); // 'new' or 'used'
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

  // Get product from location state (passed from TimingBelt) or fetch it
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      
      // If product data is passed via state, use it
      if (location.state?.product) {
        const productData = location.state.product;
        
        // Generate multiple image views (main + different angles)
        const productImages =
          productData.images && productData.images.length > 0
            ? productData.images
            : buildImageVariants(productData.image, productData.id);
        
        // Calculate stock (random between 5-30)
        const stock = Math.floor(Math.random() * 25) + 5;
        
        // Calculate replacements price (60-80% of current price)
        const replacementsPrice = Math.floor(productData.price * (0.6 + Math.random() * 0.2));
        
        // Generate description based on product
        const description = `${productData.name} for CHEVROLET: TAVERA, MAHINDRA: GENIO, IMPERIO, QUANTO, SCORPIO, SCORPIO GETAWAY, XUV 500, XYLO, MARUTI: RITZ - ${productData.partNumber} - ${productData.brand}`;
        
        setProduct({
          ...productData,
          images: productImages,
          fullPartNumber: productData.partNumber,
          mrp: productData.mrp || productData.price * 1.05, // Add 5% if no MRP
          stock: stock,
          isCompatible: false,
          compatibility: "Not compatible with your cars",
          compatibleVehicles: [],
          replacementsPrice: replacementsPrice,
          category: "Maintenance Service Parts",
          subCategory: productData.class || "Parts",
          subSubCategory: productData.name,
          seller: productData.soldBy || "Pune/SWA",
          fulfilledBySparelo: productData.fulfilledBysparelo || productData.fulfilledByBoodmo || false,
          spareloChoice: productData.spareloChoice || productData.boodmoChoice || false,
          deliveryDays: productData.deliveryDays || 2,
          returnDays: productData.returnDays || 10,
          description: description,
          freeDelivery: productData.freeDelivery || false,
          origin: productData.origin || "Aftermarket",
          class: productData.class || "Parts",
        });
        setLoading(false);
        return;
      }

      // Otherwise, fetch mock data based on itemId
      setTimeout(() => {
        setProduct({
          id: itemId,
          name: "BELT,TIMING",
          partNumber: "127600C20",
          fullPartNumber: "127600C20",
          brand: "MARUTI SUZUKI",
          seller: "Bengaluru/BPN",
          price: 850.00,
          mrp: 850.00,
          category: "Maintenance Service Parts",
          subCategory: "Belt",
          subSubCategory: "Timing Belt",
          rating: 4.5,
          reviews: 23,
          images: [
            "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
            "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
            "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
            "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
          ],
          compatibility: "Not compatible with your cars",
          isCompatible: false,
          stock: 9,
          isOEM: true,
          origin: "OEM",
          class: "Timing Belt",
          fulfilledBySparelo: true,
          spareloChoice: true,
          deliveryDays: 4,
          replacementsPrice: 316,
          description: "Timing Belt for MARUTI EECO, ESTEEM, GYPSY, SUPER CARRY, SWIFT, SWIFT DZIRE, VERSA, ZEN - 127600C20 - MARUTI SUZUKI",
          compatibleVehicles: [],
        });
        setLoading(false);
      }, 800);
    };

    if (itemId) {
      fetchProduct();
    }
  }, [itemId, location.state]);

  const handleAddToCart = () => {
    if (product) {
      const cartProduct = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.mrp || product.price,
        discountPrice: product.mrp && product.mrp > product.price ? product.price : null,
        discount: product.mrp && product.mrp > product.price
          ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
          : null,
        imageUrl: product.images[0],
        rating: product.rating,
        reviews: product.reviews,
        partNumber: product.partNumber,
        seller: product.seller,
        quantity: quantity,
      };
      // Add quantity times
      for (let i = 0; i < quantity; i++) {
        addToCart(cartProduct);
      }
      alert(`${quantity} x ${product.name} added to cart!`);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleToggleWishlist = () => {
    setInWishlist(!inWishlist);
    alert(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  // Get shipping address for delivery location
  const getShippingAddress = () => {
    const savedAddress = localStorage.getItem('shippingAddress');
    if (savedAddress) {
      const address = JSON.parse(savedAddress);
      return `${address.cityState} - ${address.postalCode}`;
    }
    return "MAHARASHTRA - Pune 234544";
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

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // Format part number for display (truncate if needed)
  const displayPartNumber = product.partNumber.length > 10 
    ? `${product.partNumber.substring(0, 4)}...${product.partNumber.substring(product.partNumber.length - 4)}`
    : product.partNumber;

  // Calculate discount percentage
  const discount = product.mrp && product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Spares page</h1>
          {product && (
            <div>
              <h2 className="text-lg text-gray-600 mb-1">{product.brand}</h2>
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
            </div>
          )}
        </div>

        {/* New Spares / Used Spares Toggle Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSpareType('new')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              spareType === 'new'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            New spares
          </button>
          <button
            onClick={() => setSpareType('used')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              spareType === 'used'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Used spares
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-6">Based on selection spares will be shown.</p>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 sm:mb-8">
          {/* Left Column - Spare Pic Carousel */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Spare pic {selectedImage + 1}/{product.images.length}</h3>
            
            {/* Main Image */}
            <div className="relative mb-4 bg-gray-50 rounded-lg overflow-hidden" style={{ minHeight: '300px' }}>
              {product.isOEM && (
                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold z-10">
                  OEM
                </div>
              )}
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
                style={{ minHeight: '300px' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Product+Image';
                }}
              />
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-2 justify-center">
              {product.images.slice(0, 3).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden w-20 h-20 flex-shrink-0 ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
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
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Video</h3>
            <div className="bg-gray-100 rounded-lg overflow-hidden" style={{ minHeight: '300px' }}>
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <FaInfoCircle className="text-4xl text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Video will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Product Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-semibold text-gray-700">OEM Part number</label>
              <p className="text-base text-gray-900 mt-1">{product.partNumber || 'N/A'}</p>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-700">Manufacturer</label>
              <p className="text-base text-gray-900 mt-1">
                {productAttributes.manufacturer === 'OEM' && 'OEM'}
                {productAttributes.manufacturer === 'After Market (High quality)' && (
                  <span>After Market <span className="text-green-600">(High quality)</span></span>
                )}
                {productAttributes.manufacturer === 'After Market (Standard)' && (
                  <span>After Market <span className="text-gray-600">(Standard)</span></span>
                )}
                {productAttributes.manufacturer === 'Unknown' && 'Unknown'}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-700">Compatibility</label>
              <p className="text-base text-gray-900 mt-1">{productAttributes.compatibility}</p>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-700">Tested</label>
              <p className="text-base text-gray-900 mt-1 capitalize">{productAttributes.tested}</p>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-700">Part Age</label>
              <p className="text-base text-gray-900 mt-1">{productAttributes.partAge}</p>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-700">Condition</label>
              <p className="text-base text-gray-900 mt-1">{productAttributes.condition}</p>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-700">Warranty</label>
              <p className="text-base text-gray-900 mt-1">{productAttributes.warranty}</p>
            </div>
          </div>
        </div>

        {/* Pricing and Order Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pricing Box */}
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <div className="mb-2">
                <span className="text-sm text-gray-600">New price: </span>
                <span className="text-lg font-semibold text-gray-900">₹{(product.mrp || product.price).toLocaleString('en-IN')}</span>
              </div>
              <div className="mb-2">
                <span className="text-sm text-gray-600">Our price: </span>
                <span className="text-xl font-bold text-blue-600">₹{product.price.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div>
                  <span className="text-sm font-semibold text-green-600">Discount: {discount}%</span>
                </div>
              )}
            </div>

            {/* Order Section */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Place order
                </button>
                
                {/* Quantity Selector */}
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-900 font-semibold min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Estimated Delivery Time */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Estimated delivery time: <span className="font-semibold text-gray-900">{product.deliveryDays || 4} days</span>
                </p>
              </div>
              
              {/* Navigate to Delivery Address */}
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => navigate('/checkout/address')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2"
                >
                  <FaMapMarkerAlt />
                  Navigate to Delivery address
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantees/Services Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
            <div className="bg-blue-100 rounded-full p-2 sm:p-3 flex-shrink-0">
              <FaTruck className="text-blue-600 text-lg sm:text-xl" />
            </div>
            <div>
              <p className="text-[10px] sm:text-sm md:text-base font-semibold text-gray-800">Delivery within {product.deliveryDays || 4} days</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
            <div className="bg-blue-100 rounded-full p-2 sm:p-3 flex-shrink-0">
              <FaRedoAlt className="text-blue-600 text-base sm:text-lg md:text-xl" />
            </div>
            <div>
              <p className="text-[10px] sm:text-sm md:text-base font-semibold text-gray-800">10 Days Assured Return</p>
              <button className="text-blue-600 text-[8px] sm:text-xs mt-1">
                <FaInfoCircle className="inline" />
              </button>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 flex items-center gap-3 sm:gap-4 sm:col-span-2 lg:col-span-1">
            <div className="bg-blue-100 rounded-full p-2 sm:p-3 flex-shrink-0">
              <FaFileInvoice className="text-blue-600 text-base sm:text-lg md:text-xl" />
            </div>
            <div>
              <p className="text-[10px] sm:text-sm md:text-base font-semibold text-gray-800">GST invoice</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
