import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaTruck,
  FaCheckCircle,
  FaHome,
  FaEye,
  FaMapMarkerAlt,
  FaFileInvoice,
  FaRedoAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import Breadcrumbs from "./Breadcrumbs";

const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/600x400?text=Product+Image";

const TimingBeltDetail = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [inWishlist, setInWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Get product from location state (passed from TimingBelt page)
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      
      // If product data is passed via state, use it
      if (location.state?.product) {
        const productData = location.state.product;
        
        // Use the exact same image from the product card
        const mainImage = productData.image || (productData.images && productData.images[0]) || PLACEHOLDER_IMAGE;
        const productImages =
          productData.images && productData.images.length > 0
            ? productData.images
            : [mainImage, mainImage, mainImage, mainImage];
        
        // Calculate stock (random between 5-30)
        const stock = Math.floor(Math.random() * 25) + 5;
        
        // Calculate replacements price (60-80% of current price)
        const replacementsPrice = Math.floor(productData.price * (0.6 + Math.random() * 0.2));
        
        // Generate description based on product
        const description = `${productData.name} for MARUTI SUZUKI, FORD, TATA and other vehicles - ${productData.partNumber} - ${productData.brand}`;
        
        setProduct({
          ...productData,
          images: productImages,
          fullPartNumber: productData.partNumber,
          mrp: productData.mrp || productData.price * 1.05,
          stock: stock,
          replacementsPrice: replacementsPrice,
          seller: productData.soldBy || "Bengaluru/BPN",
          fulfilledBySparelo: productData.fulfilledBySparelo || false,
          spareloChoice: productData.spareloChoice || false,
          deliveryDays: productData.deliveryDays || 4,
          returnDays: 10,
          description: description,
          freeDelivery: productData.freeDelivery || false,
          origin: productData.origin || "OEM (genuine)",
          class: productData.class || "Timing Belt",
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
          stock: 9,
          isOEM: true,
          origin: "OEM (genuine)",
          class: "Timing Belt",
          fulfilledBySparelo: true,
          spareloChoice: true,
          deliveryDays: 4,
          replacementsPrice: 316,
          description: "Timing Belt for MARUTI EECO, ESTEEM, GYPSY, SUPER CARRY, SWIFT, SWIFT DZIRE, VERSA, ZEN - 127600C20 - MARUTI SUZUKI",
          images: [
            "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
            "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
            "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
            "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
          ],
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
        imageUrl: product.images[0] || product.image,
        partNumber: product.partNumber,
        seller: product.seller,
        quantity: quantity,
      };
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
            onClick={() => navigate('/catalog/4390-timing_belt/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Timing Belt Parts
          </button>
        </div>
      </div>
    );
  }

  const displayPartNumber = product.partNumber.length > 10 
    ? `${product.partNumber.substring(0, 4)}...${product.partNumber.substring(product.partNumber.length - 4)}`
    : product.partNumber;

  const discount = product.mrp && product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-3 h-full flex flex-col">
        {/* Compact Header - Brand and Product Name */}
        <div className="mb-2 flex-shrink-0">
          <h1 className="text-xl font-bold text-gray-900">{product.brand}</h1>
          <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        </div>

        {/* Main Content Area - Compact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-hidden">
          {/* Left Column - Product Images with Thumbnails */}
          <div className="flex gap-2 h-full">
            {/* Thumbnail Images - Left Side */}
            <div className="flex flex-col gap-1.5 flex-shrink-0">
              {product.images.slice(0, 3).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded overflow-hidden w-12 h-12 flex-shrink-0 ${
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

            {/* Main Image */}
            <div className="flex-1 relative bg-white border border-gray-200 rounded-lg overflow-hidden">
              {product.isOEM && (
                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold z-10">
                  OEM
                </div>
              )}
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <img
                  src={product.images[selectedImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-3"
                  onError={(e) => {
                    e.target.src = PLACEHOLDER_IMAGE;
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Product Information - Compact */}
          <div className="space-y-2 overflow-y-auto pr-2">
            {/* Delivery Info */}
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <FaTruck className="text-blue-600 text-xs" />
              <span>Free Delivery (within {product.deliveryDays || 5} days)</span>
            </div>

            {/* Fulfillment Badges */}
            <div className="flex flex-wrap gap-1.5">
              {product.fulfilledBySparelo && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                  <FaCheckCircle className="text-green-600 text-xs" />
                  Fulfilled by b
                </span>
              )}
              {product.freeDelivery && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                  <FaTruck className="text-xs" />
                  Free Delivery
                </span>
              )}
              {product.spareloChoice && (
                <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">
                  boodmo's Choice
                </span>
              )}
            </div>

            {/* Seller Info */}
            <div className="text-xs text-gray-600">
              <span>Sold by: </span>
              <span className="font-semibold text-gray-900">{product.seller || product.soldBy || "Bengaluru/BPN"}</span>
            </div>

            {/* Replacements Link */}
            {product.replacementsPrice && (
              <div>
                <Link to="#" className="text-blue-600 hover:underline text-xs font-medium">
                  Replacements from ₹{product.replacementsPrice.toLocaleString('en-IN')}
                </Link>
              </div>
            )}

            {/* Price Section */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              {product.mrp && product.mrp > product.price && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 line-through">
                    MRP: ₹{product.mrp.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-semibold">
                    -{discount}%
                  </span>
                </div>
              )}
              <p className="text-xs text-gray-500">Incl. of all taxes</p>
              <p className="text-xs text-blue-600">
                {product.stock || 6} in stock
              </p>
            </div>

            {/* Check Compatibility Button */}
            <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-blue-600 text-blue-600 px-3 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm">
              <FaHome className="text-sm" />
              Check Compatibility
            </button>

            {/* Product Specifications */}
            <div className="border-t border-gray-200 pt-2">
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-0.5">Part Number</p>
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-semibold text-gray-900">
                      {displayPartNumber}
                    </p>
                    <FaEye className="text-gray-400 text-xs cursor-pointer" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-0.5">Origin</p>
                  <p className="text-xs font-semibold text-gray-900">{product.origin || "OEM (genuine)"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-0.5">Class</p>
                  <p className="text-xs font-semibold text-gray-900">{product.class || "Timing Belt"}</p>
                </div>
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap gap-2">
                <Link to="#" className="text-blue-600 hover:underline text-xs font-medium">
                  View OEM Catalog
                </Link>
                <Link to="#" className="text-blue-600 hover:underline text-xs font-medium">
                  View Compatibility
                </Link>
                {product.replacementsPrice && (
                  <Link to="#" className="text-blue-600 hover:underline text-xs font-medium">
                    View Replacements from ₹{product.replacementsPrice.toLocaleString('en-IN')}
                  </Link>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                Add to cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full bg-white border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm"
              >
                Buy now
              </button>
            </div>

            {/* Delivery Location and Guarantees - Compact */}
            <div className="border-t border-gray-200 pt-2 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <FaMapMarkerAlt className="text-blue-600 text-xs" />
                <span>Deliver to {getShippingAddress()}</span>
              </div>
              
              {/* Compact Guarantees */}
              <div className="grid grid-cols-3 gap-1.5">
                <div className="bg-blue-50 border border-blue-200 rounded p-1.5 flex items-center gap-1">
                  <FaTruck className="text-blue-600 text-xs" />
                  <p className="text-[9px] font-semibold text-gray-800">{product.deliveryDays || 4} days</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded p-1.5 flex items-center gap-1">
                  <FaRedoAlt className="text-blue-600 text-xs" />
                  <p className="text-[9px] font-semibold text-gray-800">10 Days Return</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded p-1.5 flex items-center gap-1">
                  <FaFileInvoice className="text-blue-600 text-xs" />
                  <p className="text-[9px] font-semibold text-gray-800">GST invoice</p>
                </div>
              </div>
            </div>

            {/* Wishlist */}
            <button
              onClick={handleToggleWishlist}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors pt-1"
            >
              <FaHeart className={inWishlist ? "text-red-600 fill-current" : ""} />
              <span className="text-xs font-medium">ADD TO WISHLIST</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimingBeltDetail;

