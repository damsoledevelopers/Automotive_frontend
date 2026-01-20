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

  // Get product from location state (passed from product cards) or fetch it
  useEffect(() => {
    // If product data is passed via state, use it immediately (from View Details click)
    // This should be instant - no delay needed
    if (location.state?.product) {
      setLoading(true);
      const productData = location.state.product;
      
      // Use the exact same image from the product card
      // If multiple images exist, use them; otherwise use the same image for all thumbnails
      const mainImage = productData.image || (productData.images && productData.images[0]) || PLACEHOLDER_IMAGE;
      const productImages =
        productData.images && productData.images.length > 0
          ? productData.images
          : [mainImage, mainImage, mainImage, mainImage]; // Use same image for all thumbnails
      
      // Calculate stock (random between 5-30)
      const stock = Math.floor(Math.random() * 25) + 5;
      
      // Calculate replacements price (60-80% of current price)
      const replacementsPrice = Math.floor(productData.price * (0.6 + Math.random() * 0.2));
      
      // Get category data from location state
      const categoryData = location.state?.category || { name: "Maintenance Service Parts", slug: "" };
      
      // Generate description based on product and category
      const description = categoryData.name === "Brake System" 
        ? `${productData.name} for MARUTI SUZUKI, FORD, TATA, HYUNDAI and other vehicles - ${productData.partNumber} - ${productData.brand}`
        : `${productData.name} for CHEVROLET: TAVERA, MAHINDRA: GENIO, IMPERIO, QUANTO, SCORPIO, SCORPIO GETAWAY, XUV 500, XYLO, MARUTI: RITZ - ${productData.partNumber} - ${productData.brand}`;
      
      setProduct({
        ...productData,
        // Preserve original name and brand from productData
        name: productData.name || 'Unknown Product',
        brand: productData.brand || 'Unknown Brand',
        images: productImages,
        fullPartNumber: productData.partNumber || productData.fullPartNumber,
        mrp: productData.mrp || Math.round(productData.price * 1.05 * 100) / 100, // Add 5% if no MRP, rounded to 2 decimals
        stock: stock,
        isCompatible: false,
        compatibility: "Not compatible with your cars",
        compatibleVehicles: [],
        replacementsPrice: productData.replacementsPrice || replacementsPrice,
        category: categoryData.name || "Maintenance Service Parts",
        subCategory: productData.class || "Parts",
        subSubCategory: productData.name,
        seller: productData.soldBy || "Pune/SWA",
        fulfilledBySparelo: productData.fulfilledBySparelo || productData.fulfilledBysparelo || productData.fulfilledByBoodmo || false,
        spareloChoice: productData.spareloChoice || productData.boodmoChoice || false,
        deliveryDays: productData.deliveryDays || 4,
        returnDays: productData.returnDays || 10,
        description: description,
        freeDelivery: productData.freeDelivery || false,
        origin: productData.origin || "Aftermarket",
        class: productData.class || "Parts",
      });
      setLoading(false);
      return;
    }

    // Otherwise, fetch mock data based on itemId (fallback case)
    if (itemId) {
      setLoading(true);
      // Use minimal delay for fallback data
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
      }, 50); // Minimal delay for fallback
    } else if (!location.state?.product) {
      // No itemId and no product data - show error
      setLoading(false);
    }
  }, [itemId, location.state?.product, location.state?.category]);

  const handleAddToCart = () => {
    if (product) {
      const cartProduct = {
        id: product.id,
        name: product.name || 'Unknown Product',
        brand: product.brand || 'Unknown Brand',
        price: product.mrp || product.price,
        discountPrice: product.mrp && product.mrp > product.price ? product.price : null,
        discount: product.mrp && product.mrp > product.price
          ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
          : null,
        imageUrl: product.images && product.images[0] ? product.images[0] : (product.image || PLACEHOLDER_IMAGE),
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        partNumber: product.partNumber || product.fullPartNumber || '',
        seller: product.seller || 'Unknown Seller',
        quantity: quantity,
      };
      // Add to cart with the specified quantity (don't loop - addToCart handles quantity)
      cartProduct.quantity = quantity;
      addToCart(cartProduct);
      alert(`${quantity} x ${cartProduct.name} added to cart!`);
    } else {
      alert('Product not loaded yet. Please wait...');
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#131c36] mx-auto mb-4"></div>
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
            className="bg-[#131c36] text-white px-6 py-2 rounded-lg hover:bg-[#0f1528]"
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

        {/* Breadcrumbs and Page Title */}
        <div className="mb-6">
          {product && (
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.brand}</h1>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{product.name}</h2>
            </div>
          )}
        </div>

        {/* Main Content Area - Product Images and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 sm:mb-8">
          {/* Left Column - Product Images with Thumbnails */}
          <div className="flex gap-4">
            {/* Thumbnail Images - Left Side */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              {product.images.slice(0, 3).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 ${
                    selectedImage === index ? 'border-[#131c36]' : 'border-gray-200'
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

            {/* Main Image */}
            <div className="flex-1 relative bg-white border border-gray-200 rounded-lg overflow-hidden">
              {product.isOEM && (
                <div className="absolute top-3 left-3 bg-[#131c36] text-white px-3 py-1.5 rounded text-xs font-bold z-10">
                  OEM
                </div>
              )}
              <div className="w-full h-full flex items-center justify-center bg-gray-50" style={{ minHeight: '400px' }}>
                <img
                  src={product.images[selectedImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                  style={{ maxHeight: '500px' }}
                  onError={(e) => {
                    e.target.src = PLACEHOLDER_IMAGE;
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Product Information */}
          <div className="space-y-4">
            {/* Brand and Product Name */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{product.brand}</h2>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">{product.name}</h3>
            </div>

            {/* Delivery Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <FaTruck className="text-[#131c36]" />
              <span>Free Delivery (within {product.deliveryDays || 5} days)</span>
            </div>

            {/* Fulfillment Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.fulfilledBySparelo && (
                <span className="inline-flex items-center gap-1.5 bg-[#131c36]/10 text-[#131c36] px-3 py-1.5 rounded-full text-xs font-semibold">
                  <FaCheckCircle className="text-green-600" />
                  Fulfilled by b
                </span>
              )}
              {product.freeDelivery && (
                <span className="inline-flex items-center gap-1.5 bg-[#131c36]/10 text-[#131c36] px-3 py-1.5 rounded-full text-xs font-semibold">
                  <FaTruck />
                  Free Delivery
                </span>
              )}
              {product.spareloChoice && (
                <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                  boodmo's Choice
                </span>
              )}
            </div>

            {/* Seller Info */}
            <div className="text-sm text-gray-600 mb-2">
              <span>Sold by: </span>
              <span className="font-semibold text-gray-900">{product.seller || product.soldBy || "Delhi/TKL"}</span>
            </div>

            {/* Replacements Link */}
            {product.replacementsPrice && (
              <div className="mb-4">
                <Link to="#" className="text-[#131c36] hover:underline text-sm font-medium">
                  Replacements from ₹{product.replacementsPrice.toLocaleString('en-IN')}
                </Link>
              </div>
            )}

            {/* Price Section */}
            <div className="mb-4">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              {product.mrp && product.mrp > product.price && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-500 line-through">
                    MRP: ₹{product.mrp.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="bg-[#131c36]/10 text-[#131c36] px-2 py-0.5 rounded text-xs font-semibold">
                    -{discount}%
                  </span>
                </div>
              )}
              <p className="text-xs text-gray-500">Incl. of all taxes</p>
              <p className="text-sm text-[#131c36] mt-2">
                {product.stock || 6} in stock
              </p>
            </div>

            {/* Check Compatibility Button */}
            <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-[#131c36] text-[#131c36] px-4 py-2.5 rounded-lg font-semibold hover:bg-[#131c36]/5 transition-colors mb-4">
              <FaHome className="text-lg" />
              Check Compatibility
            </button>

            {/* Product Specifications */}
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Part Number</p>
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {displayPartNumber}
                    </p>
                    <FaEye className="text-gray-400 text-xs cursor-pointer" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Origin</p>
                  <p className="text-sm font-semibold text-gray-900">{product.origin || "OEM"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Class</p>
                  <p className="text-sm font-semibold text-gray-900">{product.class || "Timing Belt"}</p>
                </div>
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap gap-3 mt-3">
                <Link to="#" className="text-[#131c36] hover:underline text-sm font-medium">
                  View OEM Catalog
                </Link>
                <Link to="#" className="text-[#131c36] hover:underline text-sm font-medium">
                  View Compatibility
                </Link>
                {product.replacementsPrice && (
                  <Link to="#" className="text-[#131c36] hover:underline text-sm font-medium">
                    View Replacements from ₹{product.replacementsPrice.toLocaleString('en-IN')}
                  </Link>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#131c36] hover:bg-[#0f1528] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Add to cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full bg-white border-2 border-[#131c36] text-[#131c36] px-6 py-3 rounded-lg font-semibold hover:bg-[#131c36]/5 transition-colors"
              >
                Buy now
              </button>
            </div>

            {/* Delivery Location */}
            <div className="flex items-center gap-2 text-sm text-gray-600 pt-3 border-t border-gray-200">
              <FaMapMarkerAlt className="text-[#131c36]" />
              <span>Deliver to {getShippingAddress()}</span>
            </div>

            {/* Wishlist */}
            <button
              onClick={handleToggleWishlist}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <FaHeart className={inWishlist ? "text-red-600 fill-current" : ""} />
              <span className="text-sm font-medium">ADD TO WISHLIST</span>
            </button>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
          <p className="text-sm text-gray-700">{product.description}</p>
        </div>

        {/* Guarantees/Services Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-[#131c36]/5 border border-[#131c36]/20 rounded-lg p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
            <div className="bg-[#131c36]/10 rounded-full p-2 sm:p-3 flex-shrink-0">
              <FaTruck className="text-[#131c36] text-lg sm:text-xl" />
            </div>
            <div>
              <p className="text-[10px] sm:text-sm md:text-base font-semibold text-gray-800">Delivery within {product.deliveryDays || 4} days</p>
            </div>
          </div>
          <div className="bg-[#131c36]/5 border border-[#131c36]/20 rounded-lg p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
            <div className="bg-[#131c36]/10 rounded-full p-2 sm:p-3 flex-shrink-0">
              <FaRedoAlt className="text-[#131c36] text-base sm:text-lg md:text-xl" />
            </div>
            <div>
              <p className="text-[10px] sm:text-sm md:text-base font-semibold text-gray-800">10 Days Assured Return</p>
              <button className="text-[#131c36] text-[8px] sm:text-xs mt-1">
                <FaInfoCircle className="inline" />
              </button>
            </div>
          </div>
          <div className="bg-[#131c36]/5 border border-[#131c36]/20 rounded-lg p-3 sm:p-4 flex items-center gap-3 sm:gap-4 sm:col-span-2 lg:col-span-1">
            <div className="bg-[#131c36]/10 rounded-full p-2 sm:p-3 flex-shrink-0">
              <FaFileInvoice className="text-[#131c36] text-base sm:text-lg md:text-xl" />
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
