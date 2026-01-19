import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import CatalogueSidebar from "./CatalogueSidebar";
import { Grid, List, Truck, RotateCcw, FileText, CheckCircle, Info } from "lucide-react";

const TimingBelt = () => {
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("list");
  const [selectedOrigin, setSelectedOrigin] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [fulfilledBySparelo, setFulfilledBySparelo] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);

  // Mock products data - matching the image
  const products = [
    {
      id: 1,
      name: "BELT,TIMING",
      brand: "MARUTI SUZUKI",
      partNumber: "127600C20",
      price: 850.00,
      mrp: null,
      discount: 0,
      isOEM: true,
      fulfilledBySparelo: true,
      freeDelivery: false,
      image: "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
      spareloChoice: true,
      bestOffer: false,
      class: "Timing Belt",
      soldBy: "Bengaluru/BPN",
      origin: "OEM (genuine)",
      deliveryDays: 4,
    },
    {
      id: 2,
      name: "BELT TIMING (1.5L SOHC DI TC I4 DIESEL DV5)",
      brand: "FORD",
      partNumber: "AV668B",
      price: 1487.00,
      mrp: null,
      discount: 0,
      isOEM: true,
      fulfilledBySparelo: true,
      freeDelivery: false,
      image: "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
      spareloChoice: true,
      bestOffer: false,
      class: "Timing Belt",
      soldBy: "Bengaluru/BPN",
      origin: "OEM (genuine)",
      deliveryDays: 4,
    },
    {
      id: 3,
      name: "TIMING BELT",
      brand: "TATA",
      partNumber: "278916303",
      price: 2135.00,
      mrp: 2178.00,
      discount: 2,
      isOEM: true,
      fulfilledBySparelo: true,
      freeDelivery: false,
      image: "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
      spareloChoice: true,
      bestOffer: false,
      class: "Timing Belt",
      soldBy: "Bengaluru/BPN",
      origin: "OEM (genuine)",
      deliveryDays: 4,
    },
    {
      id: 4,
      name: "TOOTHED BELT",
      brand: "VAG (VW, AUDI, SKODA)",
      partNumber: "VAG-98765",
      price: 1500.00,
      mrp: 2000.00,
      discount: 25,
      isOEM: true,
      fulfilledBySparelo: true,
      freeDelivery: true,
      image: "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
      spareloChoice: true,
      bestOffer: false,
    },
    {
      id: 5,
      name: "TIMING BELT",
      brand: "CONTITECH",
      partNumber: "CT-54321",
      price: 950.00,
      mrp: 1200.00,
      discount: 21,
      isOEM: false,
      fulfilledBySparelo: false,
      freeDelivery: true,
      image: "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
      spareloChoice: false,
      bestOffer: false,
    },
    {
      id: 6,
      name: "BELT,TIMING",
      brand: "BOSCH",
      partNumber: "BOSCH-11111",
      price: 1100.00,
      mrp: 1400.00,
      discount: 21,
      isOEM: false,
      fulfilledBySparelo: true,
      freeDelivery: true,
      image: "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
      spareloChoice: false,
      bestOffer: false,
    },
    {
      id: 7,
      name: "TIMING BELT KIT",
      brand: "BANDO",
      partNumber: "BANDO-22222",
      price: 2000.00,
      mrp: 2500.00,
      discount: 20,
      isOEM: false,
      fulfilledBySparelo: true,
      freeDelivery: false,
      image: "https://boodmo.com/media/cache/catalog_image/images/categories/ca3d002.jpg",
      spareloChoice: true,
      bestOffer: false,
    },
    {
      id: 8,
      name: "BELT TIMING",
      brand: "BMW",
      partNumber: "BMW-33333",
      price: 3500.00,
      mrp: 4000.00,
      discount: 13,
      isOEM: true,
      fulfilledBySparelo: true,
      freeDelivery: true,
      image: "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
      spareloChoice: false,
      bestOffer: false,
    },
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);
  const totalParts = 4673; // Total parts count as shown in image
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Filter products based on selected filters
  useEffect(() => {
    let filtered = [...products];

    // Filter by origin
    if (selectedOrigin.length > 0) {
      filtered = filtered.filter((product) => {
        if (selectedOrigin.includes("OEM") && product.isOEM) return true;
        if (selectedOrigin.includes("Aftermarket") && !product.isOEM) return true;
        return false;
      });
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Filter by fulfilled by sparelo
    if (fulfilledBySparelo) {
      filtered = filtered.filter((product) => product.fulfilledBySparelo);
    }

    // Filter by free delivery
    if (freeDelivery) {
      filtered = filtered.filter((product) => product.freeDelivery);
    }

    setFilteredProducts(filtered);
  }, [selectedOrigin, selectedBrands, fulfilledBySparelo, freeDelivery]);

  const handleOriginChange = (origin) => {
    setSelectedOrigin((prev) =>
      prev.includes(origin)
        ? prev.filter((o) => o !== origin)
        : [...prev, origin]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const handleSort = (value) => {
    setSortBy(value);
    let sorted = [...filteredProducts];
    switch (value) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    setFilteredProducts(sorted);
  };

  // Get unique brands
  const uniqueBrands = [...new Set(products.map((p) => p.brand))];

  return (
    <div className="min-h-screen bg-white py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
            Timing Belt Parts
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="text-[9px] sm:text-xs md:text-sm text-gray-600">
              Total {totalParts} part{totalParts !== 1 ? "s" : ""}
            </div>
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[9px] sm:text-xs md:text-sm bg-white"
              >
                <option value="relevance">Best match</option>
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 sm:gap-2 border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 sm:p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 sm:p-2 rounded ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Left Sidebar - CatalogueSidebar + Additional Filters */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-4 order-2 lg:order-1">
            {/* Catalogue Sidebar */}
            <CatalogueSidebar 
              isMobileOpen={isMobileSidebarOpen} 
              setIsMobileOpen={setIsMobileSidebarOpen} 
            />
            
            {/* Additional Filters */}
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100 sticky top-20">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                <h3 className="text-[10px] sm:text-sm font-semibold text-gray-800">Filters</h3>
                <button
                  onClick={() => {
                    setSelectedOrigin([]);
                    setSelectedBrands([]);
                    setFulfilledBySparelo(false);
                    setFreeDelivery(false);
                  }}
                  className="text-[9px] sm:text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  RESET
                </button>
              </div>

              {/* Origin Filter */}
              <div className="mb-4">
                <h4 className="font-semibold text-[9px] sm:text-xs text-gray-800 mb-2">Origin</h4>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedOrigin.includes("Aftermarket")}
                      onChange={() => handleOriginChange("Aftermarket")}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-[9px] sm:text-xs text-gray-700">
                      Aftermarket ({products.filter((p) => !p.isOEM).length})
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedOrigin.includes("OEM")}
                      onChange={() => handleOriginChange("OEM")}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-[9px] sm:text-xs text-gray-700">
                      OEM ({products.filter((p) => p.isOEM).length})
                    </span>
                  </label>
                </div>
              </div>

              {/* Garage Filter - Already in CatalogueSidebar */}
              {/* This will be handled by CatalogueSidebar component */}

              {/* Fulfilled by sparelo */}
              <div className="mb-4">
                <h4 className="font-semibold text-[9px] sm:text-xs text-gray-800 mb-2">
                  Fulfilled by Sparelo
                </h4>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fulfilledBySparelo}
                    onChange={(e) => setFulfilledBySparelo(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-[9px] sm:text-xs text-gray-700">
                    Fulfilled by Sparelo ({products.filter((p) => p.fulfilledBySparelo).length})
                  </span>
                </label>
              </div>

              {/* Free Delivery */}
              <div className="mb-4">
                <h4 className="font-semibold text-[9px] sm:text-xs text-gray-800 mb-2">Free Delivery</h4>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={freeDelivery}
                    onChange={(e) => setFreeDelivery(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-[9px] sm:text-xs text-gray-700">
                    Free Delivery ({products.filter((p) => p.freeDelivery).length})
                  </span>
                </label>
              </div>

              {/* Brand Filter */}
              <div className="mb-4">
                <h4 className="font-semibold text-[9px] sm:text-xs text-gray-800 mb-2">Brand</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {uniqueBrands.slice(0, 5).map((brand) => {
                    const count = products.filter((p) => p.brand === brand).length;
                    return (
                      <label key={brand} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-[9px] sm:text-xs text-gray-700">
                          {brand} ({count})
                        </span>
                      </label>
                    );
                  })}
                  {uniqueBrands.length > 5 && (
                    <button className="text-[9px] sm:text-xs text-blue-600 hover:text-blue-700 mt-2">
                      +{uniqueBrands.length - 5} More
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Products */}
          <div className="flex-1 order-1 lg:order-2">
            {/* Products List/Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 ${
                    viewMode === "list" ? "flex gap-4 p-4 items-start" : ""
                  }`}
                >
                  {/* Product Image */}
                  <div className={`relative ${viewMode === "list" ? "w-48 h-48 flex-shrink-0" : "h-48"} bg-white border border-gray-100 rounded`}>
                    {product.isOEM && (
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] sm:text-xs font-bold px-2 py-1 rounded z-10">
                        OEM
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/200x150?text=Timing+Belt";
                      }}
                    />
                    {/* Fulfillment & Badge - Overlay on image (list view) */}
                    {viewMode === "list" && (
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10">
                        {product.fulfilledBySparelo && (
                          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-gray-200">
                            <CheckCircle className="w-3.5 h-3.5 text-green-600 fill-current" />
                            <span className="text-[10px] text-gray-700">Fulfilled by</span>
                            <span className="text-blue-600 font-bold text-xs">S</span>
                          </div>
                        )}
                 
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className={`${viewMode === "list" ? "flex-1 flex flex-col" : "p-4"}`}>
                    {viewMode === "list" ? (
                      <>
                        {/* Top Section - Name, Price */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 pr-4">
                            <h3 className="text-[10px] sm:text-sm font-bold text-gray-800 mb-1.5">
                              {product.name}
                            </h3>
                            <p className="text-[9px] sm:text-xs text-gray-500 font-mono mb-2">
                              {product.partNumber.length > 8 
                                ? `${product.partNumber.substring(0, 4)}...${product.partNumber.substring(product.partNumber.length - 4)}`
                                : product.partNumber}
                            </p>
                            <div className="flex flex-wrap gap-1.5 text-[9px] sm:text-xs text-gray-600">
                              <span className="font-medium">{product.brand}</span>
                              <span className="text-gray-400">•</span>
                              <span>{product.class || "Timing Belt"}</span>
                              <span className="text-gray-400">•</span>
                              <span>Sold By: {product.soldBy || "Bengaluru/BPN"}</span>
                              <span className="text-gray-400">•</span>
                              <span>{product.origin || "OEM (genuine)"}</span>
                            </div>
                          </div>
                          {/* Price */}
                          <div className="text-right flex-shrink-0">
                            <div className="flex flex-col items-end">
                              <span className="text-sm sm:text-lg font-bold text-gray-900">
                                ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </span>
                              {product.mrp && product.mrp > product.price && (
                                <div className="flex items-center gap-1.5 mt-1">
                                  <span className="text-[9px] sm:text-xs text-gray-500 line-through">
                                    MRP: ₹{product.mrp.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </span>
                                  <span className="text-[9px] sm:text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                    -{product.discount}%
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Delivery & Return Info */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-[9px] sm:text-xs text-blue-600">
                            <Truck className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                            <span>Delivery within {product.deliveryDays || 4} days</span>
                          </div>
                          <div className="flex items-center gap-2 text-[9px] sm:text-xs text-blue-600">
                            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                            <span>10 Days Assured Return</span>
                            <Info className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-400 cursor-help" />
                          </div>
                          <div className="flex items-center gap-2 text-[9px] sm:text-xs text-blue-600">
                            <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                            <span>GST invoice</span>
                          </div>
                        </div>

                        {/* Bottom Section - View Details Button */}
                        <div className="flex items-center justify-end mt-auto">
                          <Link
                            to={`/catalog/timing-belt/${product.id}`}
                            state={{ product }}
                            className="bg-blue-100 text-blue-600 text-[9px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-blue-200 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Grid View */}
                        <h3 className="text-[10px] sm:text-sm font-bold text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem]">
                          {product.name}
                        </h3>
                        <div className="mb-2">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-xs sm:text-base font-bold text-gray-900">
                              ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            {product.mrp && product.mrp > product.price && (
                              <>
                                <span className="text-[9px] sm:text-xs text-gray-500 line-through">
                                  MRP: ₹{product.mrp.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                                <span className="text-[9px] sm:text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                  -{product.discount}%
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <p className="text-[9px] sm:text-xs text-gray-600 mb-1 font-medium">{product.brand}</p>
                        <p className="text-[9px] sm:text-xs text-gray-500 font-mono mb-3 truncate">
                          {product.partNumber}
                        </p>
                        <div className="space-y-2 mb-3">
                          {product.fulfilledBySparelo && (
                            <div className="flex items-center gap-1.5">
                              <input
                                type="checkbox"
                                checked
                                readOnly
                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <span className="text-[9px] sm:text-xs text-gray-700">Fulfilled by</span>
                              <span className="text-blue-600 font-bold text-[10px] sm:text-sm">S</span>
                            </div>
                          )}
                        </div>
                        
                        {/* View Details Button for Grid View */}
                        <div className="flex items-center justify-end mt-auto">
                          <Link
                            to={`/catalog/timing-belt/${product.id}`}
                            state={{ product }}
                            className="bg-blue-100 text-blue-600 text-[9px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-blue-200 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-xs sm:text-base md:text-lg">
                  No products found matching your filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedOrigin([]);
                    setSelectedBrands([]);
                    setFulfilledBySparelo(false);
                    setFreeDelivery(false);
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700 underline text-[10px] sm:text-sm"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimingBelt;

