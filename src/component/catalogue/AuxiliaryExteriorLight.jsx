import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import CatalogueSidebar from "./CatalogueSidebar";
import ProductFiltersSidebar from "./ProductFiltersSidebar";
import { Grid, List, Truck, RotateCcw, FileText, CheckCircle, Info } from "lucide-react";

const AuxiliaryExteriorLight = () => {
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedOrigin, setSelectedOrigin] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [fulfilledBySparelo, setFulfilledBySparelo] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);

  const products = [
    {
      id: 1,
      name: "AUXILIARY EXTERIOR LIGHT",
      brand: "MARUTI SUZUKI",
      partNumber: "127600C20",
      price: 850.00,
      mrp: null,
      discount: 0,
      isOEM: true,
      fulfilledBySparelo: true,
      freeDelivery: false,
      image: "https://boodmo.com/media/cache/catalog_image/images/categories/95d0a83.webp",
      spareloChoice: true,
      class: "Auxiliary Exterior Light",
      soldBy: "Bengaluru/BPN",
      origin: "OEM (genuine)",
      deliveryDays: 4,
    },
    {
      id: 2,
      name: "AUXILIARY EXTERIOR LIGHT ASSEMBLY",
      brand: "BOSCH",
      partNumber: "BOSCH-AUXILIARY-EXTERIOR-LIGHT-12345",
      price: 1200.00,
      mrp: 1600.00,
      discount: 25,
      isOEM: false,
      fulfilledBySparelo: true,
      freeDelivery: true,
      image: "https://boodmo.com/media/cache/catalog_image/images/categories/95d0a83.webp",
      spareloChoice: true,
      class: "Auxiliary Exterior Light",
      soldBy: "Bengaluru/BPN",
      origin: "Aftermarket",
      deliveryDays: 4,
    },
    {
      id: 3,
      name: "AUXILIARY EXTERIOR LIGHT",
      brand: "PHILIPS",
      partNumber: "PHIL-AUXILIARY-EXTERIOR-LIGHT-67890",
      price: 980.00,
      mrp: 1200.00,
      discount: 18,
      isOEM: false,
      fulfilledBySparelo: true,
      freeDelivery: false,
      image: "https://boodmo.com/media/cache/catalog_image/images/categories/95d0a83.webp",
      spareloChoice: false,
      class: "Auxiliary Exterior Light",
      soldBy: "Mumbai/MUM",
      origin: "Aftermarket",
      deliveryDays: 3,
    },
    {
      id: 4,
      name: "AUXILIARY EXTERIOR LIGHT COMPLETE SET",
      brand: "HELLA",
      partNumber: "HELLA-AUXILIARY-EXTERIOR-LIGHT-111",
      price: 1500.00,
      mrp: 2000.00,
      discount: 25,
      isOEM: false,
      fulfilledBySparelo: false,
      freeDelivery: false,
      image: "https://boodmo.com/media/cache/catalog_image/images/categories/95d0a83.webp",
      spareloChoice: false,
      class: "Auxiliary Exterior Light",
      soldBy: "Delhi/DEL",
      origin: "Aftermarket",
      deliveryDays: 5,
    },
    {
      id: 5,
      name: "AUXILIARY EXTERIOR LIGHT MODULE",
      brand: "VALEO",
      partNumber: "VALEO-AUXILIARY-EXTERIOR-LIGHT-222",
      price: 750.00,
      mrp: 950.00,
      discount: 21,
      isOEM: false,
      fulfilledBySparelo: true,
      freeDelivery: true,
      image: "https://boodmo.com/media/cache/catalog_image/images/categories/95d0a83.webp",
      spareloChoice: true,
      class: "Auxiliary Exterior Light",
      soldBy: "Bengaluru/BPN",
      origin: "Aftermarket",
      deliveryDays: 4,
    },
    {
      id: 6,
      name: "AUXILIARY EXTERIOR LIGHT KIT",
      brand: "OSRAM",
      partNumber: "OSRAM-AUXILIARY-EXTERIOR-LIGHT-9999",
      price: 1350.00,
      mrp: 1800.00,
      discount: 25,
      isOEM: false,
      fulfilledBySparelo: true,
      freeDelivery: true,
      image: "https://boodmo.com/media/cache/catalog_image/images/categories/95d0a83.webp",
      spareloChoice: true,
      class: "Auxiliary Exterior Light",
      soldBy: "Bengaluru/BPN",
      origin: "Aftermarket",
      deliveryDays: 4,
    },
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);
  const totalParts = 4673;
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    let filtered = [...products];
    if (selectedOrigin.length > 0) {
      filtered = filtered.filter((product) => {
        if (selectedOrigin.includes("OEM") && product.isOEM) return true;
        if (selectedOrigin.includes("Aftermarket") && !product.isOEM) return true;
        return false;
      });
    }
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand));
    }
    if (fulfilledBySparelo) {
      filtered = filtered.filter((product) => product.fulfilledBySparelo);
    }
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

  const uniqueBrands = [...new Set(products.map((p) => p.brand))];

  return (
    <div className="min-h-screen bg-white py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <Breadcrumbs />

        <div className="mb-4 sm:mb-6">
          <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
            Auxiliary Exterior Light Parts
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="text-[9px] sm:text-xs md:text-sm text-gray-600">
              Total {totalParts} part{totalParts !== 1 ? "s" : ""}
            </div>
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
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

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <div className="w-full lg:w-64 flex-shrink-0 space-y-4 order-2 lg:order-1">
            <CatalogueSidebar 
              isMobileOpen={isMobileSidebarOpen} 
              setIsMobileOpen={setIsMobileSidebarOpen} 
            />
            
            <ProductFiltersSidebar
              products={products}
              selectedOrigin={selectedOrigin}
              selectedBrands={selectedBrands}
              fulfilledBySparelo={fulfilledBySparelo}
              freeDelivery={freeDelivery}
              onOriginChange={handleOriginChange}
              onBrandChange={handleBrandChange}
              onFulfilledBySpareloChange={setFulfilledBySparelo}
              onFreeDeliveryChange={setFreeDelivery}
              onReset={() => {
                setSelectedOrigin([]);
                setSelectedBrands([]);
                setFulfilledBySparelo(false);
                setFreeDelivery(false);
              }}
              uniqueBrands={uniqueBrands}
            />
          </div>

          <div className="flex-1 order-1 lg:order-2">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
              Auxiliary Exterior Light
            </h2>

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
                        e.target.src = "https://via.placeholder.com/200x150?text=Auxiliary+Exterior+Light";
                      }}
                    />
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

                  <div className={`${viewMode === "list" ? "flex-1 flex flex-col" : "p-4"}`}>
                    {viewMode === "list" ? (
                      <>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 pr-4">
                            <h3 className="text-[10px] sm:text-sm font-bold text-gray-800 mb-1.5">
                              {product.name}
                            </h3>
                            <p className="text-[9px] sm:text-xs text-gray-500 font-mono mb-2">
                              {product.partNumber?.length > 8 
                                ? `${product.partNumber.substring(0, 4)}...${product.partNumber.substring(product.partNumber.length - 4)}`
                                : product.partNumber}
                            </p>
                            <div className="flex flex-wrap gap-1.5 text-[9px] sm:text-xs text-gray-600">
                              <span className="font-medium">{product.brand}</span>
                              <span className="text-gray-400">•</span>
                              <span>{product.class || "Auxiliary Exterior Light"}</span>
                              <span className="text-gray-400">•</span>
                              <span>Sold By: {product.soldBy || "Bengaluru/BPN"}</span>
                              <span className="text-gray-400">•</span>
                              <span>{product.origin || "OEM (genuine)"}</span>
                            </div>
                          </div>
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

                        <div className="flex items-center justify-end mt-auto">
                          <Link
                            to={`/catalog/part-p-${product.id}`}
                            state={{ product }}
                            className="bg-blue-100 text-blue-600 text-[9px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-blue-200 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
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
                          {product.partNumber?.length > 8 
                            ? `${product.partNumber.substring(0, 4)}...${product.partNumber.substring(product.partNumber.length - 4)}`
                            : product.partNumber}
                        </p>
                        <div className="space-y-2">
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
                          {product.freeDelivery && (
                            <div className="flex items-center gap-1.5">
                              <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600" />
                              <span className="text-[9px] sm:text-xs text-gray-700">Free Delivery</span>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

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

export default AuxiliaryExteriorLight;
