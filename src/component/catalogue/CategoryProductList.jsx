import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import CatalogueSidebar from "./CatalogueSidebar";
import { Grid, List, Truck, RotateCcw, FileText, CheckCircle, Info } from "lucide-react";
import { productService } from "../../services/apiService";

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

/**
 * Generic Category Product List Component
 * Reusable for all categories: Belt, Brake, Engine Oil, Filters, Engine, etc.
 * Accepts category data and displays products
 */
const CategoryProductList = ({
  categoryName = "Products",
  categorySlug = "",
  products = EMPTY_ARRAY,
  defaultFilters = EMPTY_OBJECT,
  description = null,
  footerContent = null
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
  const categoryData = React.useMemo(() => location.state?.category || {
    name: categoryName,
    slug: categorySlug || category,
    ...defaultFilters
  }, [location.state?.category, categoryName, categorySlug, category, defaultFilters]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  const [apiProducts, setApiProducts] = useState([]);

  // Map backend product to frontend format
  const mapProductToFrontend = React.useCallback((product) => {
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
  }, []);

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
      // We keep a minimal map for backward compatibility with old URLs
      // but primarily rely on dynamic slug matching
      const categoryMap = {
        // Minimal map for legacy URLs if needed
      };

      // Try to extract category name from slug
      let categoryName = categoryMap[categorySlug.toLowerCase()];
      let subCategoryName = null;

      if (!categoryName) {
        // Try to extract from slug format like "4079-accessory_kit_disc_brake_pads"
        const slugWithoutNumbers = categorySlug.replace(/^\d+-/, '').replace(/_/g, ' ');
        
        // Convert underscore/hyphen slug to Title Case (e.g., "brake_system" -> "Brake System")
        // This is the primary dynamic matching logic
        const titleCaseName = slugWithoutNumbers.split(/[\s_-]+/).map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        categoryName = titleCaseName;
      }

      // If we have a parent category from location state, use that
      const parentCategory = location.state?.category?.name;

      try {
        setLoading(true);
        let result;

        if (parentCategory && subCategoryName) {
          // Fetch products for specific category + subcategory
          console.log(`Fetching products for ${parentCategory} > ${subCategoryName}`);
          result = await productService.getUserProducts({
            category: parentCategory,
            subCategory: subCategoryName,
            limit: 100
          });
        } else if (categoryName) {
          // Fetch products for the category
          console.log(`Fetching products for category: ${categoryName}`);
          result = await productService.getUserProducts({
            category: categoryName,
            limit: 100
          });
        } else {
          // Fallback: fetch all approved products
          console.log('Fetching all approved products');
          result = await productService.getUserProducts({ limit: 100 });
        }

        const fetchedProducts = result.products || result.data?.products || [];
        console.log(`Received ${fetchedProducts.length} products`);
        setApiProducts(fetchedProducts.map(mapProductToFrontend));
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setApiProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, categoryData.slug, products?.length, mapProductToFrontend]);

  // Use API products if available, otherwise use prop products
  const allProducts = apiProducts.length > 0 ? apiProducts : products;

  // Filter and Sort products based on selected options
  useEffect(() => {
    let result = [...allProducts];

    // Filter by origin
    if (selectedOrigin.length > 0) {
      result = result.filter((product) => {
        if (selectedOrigin.includes("OEM") && product.isOEM) return true;
        if (selectedOrigin.includes("Aftermarket") && !product.isOEM) return true;
        return false;
      });
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Filter by fulfilled by sparelo
    if (fulfilledBySparelo) {
      result = result.filter((product) => product.fulfilledBySparelo);
    }

    // Filter by free delivery
    if (freeDelivery) {
      result = result.filter((product) => product.freeDelivery);
    }

    // Apply Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Already sorted by relevance/createdAt in API or stays in default order
        break;
    }

    setFilteredProducts(result);
  }, [selectedOrigin, selectedBrands, fulfilledBySparelo, freeDelivery, allProducts, sortBy]);

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
        <div className="mb-6 sm:mb-8">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {categoryData.name || categoryName} Parts
            </h1>
            {description && (
              <div className="text-gray-600 text-sm sm:text-base">
                {description}
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div className="text-xs sm:text-sm text-gray-500 font-medium order-2 md:order-1">
              Total {filteredProducts.length} part{filteredProducts.length !== 1 ? "s" : ""}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto order-1 md:order-2">
              {/* Search Bar - Matching Image */}
              <div className="relative flex-1 md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder={`Search ${categoryData.name.toLowerCase()} parts...`}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#131c36] focus:border-transparent text-sm bg-gray-50/50 transition-all"
                />
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#131c36] focus:border-transparent text-sm bg-white cursor-pointer"
              >
                <option value="relevance">Best match</option>
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
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
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
              >
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={getProductDetailRoute(product)}
                    state={{ product, category: categoryData }}
                    className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center p-4 sm:p-6 group"
                  >
                    {/* Product Image */}
                    <div className="w-full aspect-square max-h-32 sm:max-h-40 flex items-center justify-center mb-4 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/200x150?text=Product";
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="w-full text-center mt-auto">
                      <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 line-clamp-2">
                        {product.name}
                      </h3>
                    </div>
                  </Link>
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

      {/* Footer Content */}
      {footerContent && (
        <div className="mt-8 px-3 sm:px-4 md:px-6">
          {footerContent}
        </div>
      )}
    </div>
  );
};

export default CategoryProductList;

