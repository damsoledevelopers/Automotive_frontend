import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import CatalogueSidebar from "./CatalogueSidebar";
import { Grid, List, Truck, RotateCcw, FileText, CheckCircle, Info } from "lucide-react";
import { productService } from "../../services/apiService";

/**
 * Generic Category Product List Component
 * Reusable for all categories: Belt, Brake, Engine Oil, Filters, Engine, etc.
 * Accepts category data and displays products
 */
const CategoryProductList = ({ 
  categoryName = "Products",
  categorySlug = "",
  products = [],
  defaultFilters = {}
}) => {
  const { category } = useParams();
  const location = useLocation();
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("list");
  const [selectedOrigin, setSelectedOrigin] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [fulfilledBySparelo, setFulfilledBySparelo] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Get category data from location state or use defaults
  const categoryData = location.state?.category || {
    name: categoryName,
    slug: categorySlug || category,
    ...defaultFilters
  };

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  const [apiProducts, setApiProducts] = useState([]);

  // Map backend product to frontend format
  const mapProductToFrontend = (product) => {
    return {
      id: product._id || product.id,
      name: product.name,
      brand: product.brand || 'Unknown',
      partNumber: product.partNumber || product.sku || 'N/A',
      price: product.price || 0,
      mrp: product.mrp || null,
      discount: product.discount || 0,
      image: product.images && product.images.length > 0 ? product.images[0] : product.imageUrl || 'https://via.placeholder.com/200x150?text=Product',
      images: product.images || (product.imageUrl ? [product.imageUrl] : []),
      isOEM: product.origin === 'OEM',
      origin: product.origin || 'Aftermarket',
      class: product.class || 'Universal',
      soldBy: product.soldBy || 'Mumbai/MUM',
      deliveryDays: product.deliveryTime ? parseInt(product.deliveryTime) || 4 : 4,
      fulfilledBySparelo: true, // Default for approved products
      freeDelivery: false, // Can be added to product model later
      stock: product.stock || 0,
      category: product.category,
      description: product.description,
      vehicleCompatibility: product.vehicleCompatibility || []
    };
  };

  // Fetch products from API if no products provided
  useEffect(() => {
    const fetchProducts = async () => {
      // If products are passed as prop, use them (for backward compatibility)
      if (products && products.length > 0) {
        setApiProducts(products);
        return;
      }

      // Otherwise, fetch from API based on category
      const categorySlug = categoryData.slug || category;
      if (!categorySlug) {
        // If no category, fetch all products
        try {
          setLoading(true);
          const result = await productService.getUserProducts({ limit: 100 });
          const fetchedProducts = result.products || result.data?.products || [];
          setApiProducts(fetchedProducts.map(mapProductToFrontend));
        } catch (error) {
          console.error('Failed to fetch products:', error);
          setApiProducts([]);
        } finally {
          setLoading(false);
        }
        return;
      }

      // Map category slug to category name for API
      // This mapping covers common category slugs to their database category names
      const categoryMap = {
        'brakes': 'Brakes',
        'brake': 'Brakes',
        'filters': 'Filters',
        'filter': 'Filters',
        'engine': 'Engine',
        'lighting': 'Lighting',
        'suspension': 'Suspension',
        'cooling': 'Cooling',
        'cooling_system': 'Cooling',
        'electrical': 'Electrical',
        'electrical_components': 'Electrical',
        'electric_components': 'Electrical',
        'body': 'Body',
        'interior': 'Interior',
        'exhaust': 'Exhaust',
        'exhaust_system': 'Exhaust',
        'other': 'Other',
        'air_conditioning': 'Air Conditioning',
        'bearings': 'Bearings',
        'belts_chains_rollers': 'Belts Chains And Rollers',
        'belts': 'Belts Chains And Rollers',
        'car_accessories': 'Car Accessories',
        'clutch': 'Clutch',
        'control_cables': 'Control Cables',
        'fuel_system': 'Fuel Supply System',
        'fuelsystem': 'Fuel Supply System',
        'gaskets_sealingrings': 'Gaskets & Seals',
        'ignition_glowplug': 'Ignition & Glowplug',
        'interior_comfort': 'Interior Comfort',
        'oilsfluids': 'Oils & Fluids',
        'pipes_hoses': 'Pipes & Hoses',
        'repair_kits': 'Repair Kits',
        'sensors_control_units': 'Sensors & Control Units',
        'steering': 'Steering',
        'towbar': 'Towbar Parts',
        'trims': 'Trims',
        'tyres_and_alloys': 'Tyres and Alloys',
        'transmission': 'Transmission',
        'universal': 'Universal',
        'wheels': 'Wheels',
        'windscreen_cleaning_system': 'Windscreen Cleaning System'
      };

      // Try to extract category name from slug
      let categoryName = categoryMap[categorySlug.toLowerCase()];
      if (!categoryName) {
        // Try to extract from slug format like "4079-accessory_kit_disc_brake_pads"
        const slugWithoutNumbers = categorySlug.replace(/^\d+-/, '').replace(/_/g, ' ');
        // Try to match with category map first
        const normalizedSlug = slugWithoutNumbers.toLowerCase().replace(/\s+/g, '_');
        categoryName = categoryMap[normalizedSlug];
        
        // If still not found, convert to title case
        if (!categoryName) {
          categoryName = slugWithoutNumbers.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ');
        }
      }

      try {
        setLoading(true);
        const result = await productService.getUserProducts({
          category: categoryName,
          limit: 100
        });
        const fetchedProducts = result.products || result.data?.products || [];
        setApiProducts(fetchedProducts.map(mapProductToFrontend));
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setApiProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, categoryData.slug, products]);

  // Use API products if available, otherwise use prop products
  const allProducts = apiProducts.length > 0 ? apiProducts : products;

  // Filter products based on selected filters
  useEffect(() => {
    let filtered = [...allProducts];

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
  }, [selectedOrigin, selectedBrands, fulfilledBySparelo, freeDelivery, allProducts]);

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
  const uniqueBrands = [...new Set(allProducts.map((p) => p.brand))];

  // Determine product detail route based on category
  const getProductDetailRoute = (product) => {
    // Use category-specific detail route if available, otherwise use generic
    if (categoryData.slug === 'timing_belt' || categoryData.slug === '4390-timing_belt') {
      return `/catalog/timing-belt/${product.id}`;
    }
    return `/catalog/part-p-${product.id}`;
  };

  return (
    <div className="min-h-screen bg-white py-4 sm:py-6 md:py-8 w-full">
      <div className="w-full px-3 sm:px-4 md:px-6">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
            {categoryData.name || categoryName} Parts
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="text-[9px] sm:text-xs md:text-sm text-gray-600">
              Total {filteredProducts.length} part{filteredProducts.length !== 1 ? "s" : ""}
            </div>
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#131c36] focus:border-transparent text-[9px] sm:text-xs md:text-sm bg-white"
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
                      ? "bg-[#131c36] text-white"
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
                      ? "bg-[#131c36] text-white"
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
          {/* Left Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-4 order-2 lg:order-1">
            <CatalogueSidebar 
              isMobileOpen={isMobileSidebarOpen} 
              setIsMobileOpen={setIsMobileSidebarOpen} 
            />
            
            {/* Additional Filters */}
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100 sticky top-20">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                <h3 className="text-[10px] sm:text-sm font-semibold text-gray-800">Filters</h3>
                <button
                  onClick={() => {
                    setSelectedOrigin([]);
                    setSelectedBrands([]);
                    setFulfilledBySparelo(false);
                    setFreeDelivery(false);
                  }}
                  className="text-[9px] sm:text-xs text-[#131c36] hover:text-[#131c36]/80 font-medium"
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
                      className="w-4 h-4 text-[#131c36] border-gray-300 rounded focus:ring-[#131c36]"
                    />
                    <span className="ml-2 text-[9px] sm:text-xs text-gray-700">
                      Aftermarket ({allProducts.filter((p) => !p.isOEM).length})
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedOrigin.includes("OEM")}
                      onChange={() => handleOriginChange("OEM")}
                      className="w-4 h-4 text-[#131c36] border-gray-300 rounded focus:ring-[#131c36]"
                    />
                    <span className="ml-2 text-[9px] sm:text-xs text-gray-700">
                      OEM ({allProducts.filter((p) => p.isOEM).length})
                    </span>
                  </label>
                </div>
              </div>

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
                    className="w-4 h-4 text-[#131c36] border-gray-300 rounded focus:ring-[#131c36]"
                  />
                  <span className="ml-2 text-[9px] sm:text-xs text-gray-700">
                    Fulfilled by Sparelo ({allProducts.filter((p) => p.fulfilledBySparelo).length})
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
                    className="w-4 h-4 text-[#131c36] border-gray-300 rounded focus:ring-[#131c36]"
                  />
                  <span className="ml-2 text-[9px] sm:text-xs text-gray-700">
                    Free Delivery ({allProducts.filter((p) => p.freeDelivery).length})
                  </span>
                </label>
              </div>

              {/* Brand Filter */}
              <div className="mb-4">
                <h4 className="font-semibold text-[9px] sm:text-xs text-gray-800 mb-2">Brand</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {uniqueBrands.slice(0, 5).map((brand) => {
                    const count = allProducts.filter((p) => p.brand === brand).length;
                    return (
                      <label key={brand} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                          className="w-4 h-4 text-[#131c36] border-gray-300 rounded focus:ring-[#131c36]"
                        />
                        <span className="ml-2 text-[9px] sm:text-xs text-gray-700">
                          {brand} ({count})
                        </span>
                      </label>
                    );
                  })}
                  {uniqueBrands.length > 5 && (
                    <button className="text-[9px] sm:text-xs text-[#131c36] hover:text-[#131c36]/80 mt-2">
                      +{uniqueBrands.length - 5} More
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Products */}
          <div className="flex-1 order-1 lg:order-2">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#131c36] mx-auto mb-4"></div>
                <p className="text-gray-500 text-sm">Loading products...</p>
              </div>
            ) : (
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
                      <div className="absolute top-2 left-2 bg-[#131c36] text-white text-[9px] sm:text-xs font-bold px-2 py-1 rounded z-10">
                        OEM
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/200x150?text=Product";
                      }}
                    />
                    {viewMode === "list" && product.fulfilledBySparelo && (
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10">
                        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-gray-200">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600 fill-current" />
                          <span className="text-[10px] text-gray-700">Fulfilled by</span>
                          <span className="text-[#131c36] font-bold text-xs">S</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className={`${viewMode === "list" ? "flex-1 flex flex-col" : "p-4"}`}>
                    {viewMode === "list" ? (
                      <>
                        {/* List View */}
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
                              <span>{product.class || categoryData.name}</span>
                              <span className="text-gray-400">•</span>
                              <span>Sold By: {product.soldBy || "Bengaluru/BPN"}</span>
                              <span className="text-gray-400">•</span>
                              <span>{product.origin || "OEM (genuine)"}</span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-sm sm:text-lg font-bold text-gray-900">
                              ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            {product.mrp && product.mrp > product.price && (
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="text-[9px] sm:text-xs text-gray-500 line-through">
                                  MRP: ₹{product.mrp.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                                <span className="text-[9px] sm:text-xs font-semibold text-[#131c36] bg-[#131c36]/10 px-1.5 py-0.5 rounded">
                                  -{product.discount || Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Delivery & Return Info */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-[9px] sm:text-xs text-[#131c36]">
                            <Truck className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: '#131c36' }} />
                            <span>Delivery within {product.deliveryDays || 4} days</span>
                          </div>
                          <div className="flex items-center gap-2 text-[9px] sm:text-xs text-[#131c36]">
                            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: '#131c36' }} />
                            <span>10 Days Assured Return</span>
                            <Info className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 cursor-help" />
                          </div>
                          <div className="flex items-center gap-2 text-[9px] sm:text-xs text-[#131c36]">
                            <FileText className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: '#131c36' }} />
                            <span>GST invoice</span>
                          </div>
                        </div>

                        {/* View Details Button */}
                        <div className="flex items-center justify-end mt-auto">
                          <Link
                            to={getProductDetailRoute(product)}
                            state={{ product, category: categoryData }}
                            className="bg-[#131c36]/10 text-[#131c36] text-[9px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-[#131c36]/20 transition-colors"
                            style={{ backgroundColor: 'rgba(19, 28, 54, 0.1)', color: '#131c36' }}
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
                                <span className="text-[9px] sm:text-xs font-semibold text-[#131c36] bg-[#131c36]/10 px-1.5 py-0.5 rounded">
                                  -{product.discount || Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
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
                              <CheckCircle className="w-3.5 h-3.5 text-green-600 fill-current" />
                              <span className="text-[9px] sm:text-xs text-gray-700">Fulfilled by</span>
                              <span className="text-[#131c36] font-bold text-[10px] sm:text-sm">S</span>
                            </div>
                          )}
                        </div>
                        
                        {/* View Details Button for Grid View */}
                        <div className="flex items-center justify-end mt-auto">
                          <Link
                            to={getProductDetailRoute(product)}
                            state={{ product, category: categoryData }}
                            className="bg-[#131c36]/10 text-[#131c36] text-[9px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-[#131c36]/20 transition-colors"
                            style={{ backgroundColor: 'rgba(19, 28, 54, 0.1)', color: '#131c36' }}
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
            )}

            {/* No Results */}
            {!loading && filteredProducts.length === 0 && (
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
                  className="mt-4 text-[#131c36] hover:text-[#131c36]/80 underline text-[10px] sm:text-sm"
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

export default CategoryProductList;

