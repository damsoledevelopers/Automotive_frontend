import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaCar, FaCog, FaFilter, FaShoppingCart, FaHeart, FaShare, FaStar, FaChevronDown, FaSyncAlt } from "react-icons/fa";

const useQuery = () => new URLSearchParams(useLocation().search);

const VehicleSearchResults = () => {
  const query = useQuery();
  // Cart integration removed — Add to Cart will be a no-op to keep behavior internal
  const maker = query.get("maker") || "";
  const model = query.get("model") || "";
  const year = query.get("year") || "";
  const modification = query.get("mod") || "";
  
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");


  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // (Add to Cart / external catalog handlers were removed — reverting to static UI)

  // Mock product data
  const products = [
    {
      id: 1,
      name: "Performance Brake Pads Set",
      oem: "BP-2345-X1",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.8,
      reviews: 124,
      image: "/brake-pads.jpg",
      category: "Brake System",
      compatibility: "Perfect Fit",
      delivery: "Free Shipping",
      stock: 15
    },
    {
      id: 2,
      name: "Air Filter Premium",
      oem: "AF-5678-P",
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.5,
      reviews: 89,
      image: "/air-filter.jpg",
      category: "Engine",
      compatibility: "Direct Fit",
      delivery: "Free Shipping",
      stock: 8
    },
    {
      id: 3,
      name: "Spark Plugs (Set of 4)",
      oem: "SP-9012-I",
      price: 45.99,
      originalPrice: 65.99,
      rating: 4.9,
      reviews: 203,
      image: "/spark-plugs.jpg",
      category: "Ignition",
      compatibility: "OEM Equivalent",
      delivery: "Free Shipping",
      stock: 25
    },
    {
      id: 4,
      name: "Oil Filter Synthetic",
      oem: "OF-3456-S",
      price: 12.99,
      originalPrice: 18.99,
      rating: 4.6,
      reviews: 167,
      image: "/oil-filter.jpg",
      category: "Maintenance",
      compatibility: "Perfect Fit",
      delivery: "Free Shipping",
      stock: 42
    },
    {
      id: 5,
      name: "Front Shock Absorbers",
      oem: "SA-7890-F",
      price: 156.99,
      originalPrice: 219.99,
      rating: 4.7,
      reviews: 78,
      image: "/shock-absorber.jpg",
      category: "Suspension",
      compatibility: "Direct Fit",
      delivery: "Free Shipping",
      stock: 6
    },
    {
      id: 6,
      name: "Timing Belt Kit",
      oem: "TB-1234-K",
      price: 134.99,
      originalPrice: 189.99,
      rating: 4.8,
      reviews: 95,
      image: "/timing-belt.jpg",
      category: "Engine",
      compatibility: "Complete Kit",
      delivery: "Free Shipping",
      stock: 12
    }
  ];

  const filters = [
    { name: "Category", options: ["All", "Brake System", "Engine", "Ignition", "Suspension", "Maintenance"] },
    { name: "Price Range", options: ["All", "Under $50", "$50-$100", "$100-$200", "Above $200"] },
    { name: "Brand", options: ["All", "Bosch", "NGK", "Brembo", "Mann Filter", "KYB"] },
    { name: "Compatibility", options: ["All", "Perfect Fit", "Direct Fit", "OEM Equivalent", "Universal"] }
  ];

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Loading Skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-20 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-white rounded-xl p-4 shadow">
                  <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Parts for Your <span className="text-red-600">{maker} {model}</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover compatible parts and accessories specifically for your vehicle configuration
          </p>
        </div>

        {/* Vehicle Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Maker", value: maker, icon: FaCar, color: "bg-blue-500" },
            { label: "Model", value: model, icon: FaCog, color: "bg-green-500" },
            { label: "Year", value: year, icon: FaStar, color: "bg-orange-500" },
            { label: "Modification", value: modification, icon: FaSyncAlt, color: "bg-purple-500" }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className={`inline-flex items-center justify-center w-12 h-12 ${item.color} text-white rounded-full mb-3 group-hover:scale-110 transition-transform`}>
                <item.icon className="text-lg" />
              </div>
              <div className="text-sm text-gray-500 font-medium mb-1">{item.label}</div>
              <div className="text-lg font-bold text-gray-900">{item.value || "Not specified"}</div>
            </div>
          ))}
        </div>

        {/* Filters and Sort Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaFilter />
                Filters
              </button>
              
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-red-600">{products.length}</span> compatible parts found
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600 font-medium">Sort by:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filters.map((filter, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {filter.name}
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                      {filter.options.map((option, optIndex) => (
                        <option key={optIndex} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Reset Filters
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className="absolute top-3 left-3">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {product.compatibility}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex gap-1">
                  <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                    <FaHeart className="text-sm" />
                  </button>
                  <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                    <FaShare className="text-sm" />
                  </button>
                </div>
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <FaCar className="text-4xl" />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {product.category}
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {product.delivery}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-red-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="text-sm text-gray-500 mb-2">OEM: {product.oem}</div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-red-600">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                  {product.originalPrice && (
                    <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded font-bold">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Stock Info */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-medium ${
                    product.stock > 10 ? "text-green-600" : 
                    product.stock > 5 ? "text-orange-600" : "text-red-600"
                  }`}>
                    {product.stock > 10 ? "In Stock" : 
                     product.stock > 5 ? "Low Stock" : "Last Few"}
                  </span>
                  <span className="text-xs text-gray-500">{product.stock} available</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => { /* no-op: cart disabled */ }}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                  <button
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => { /* detail navigation left intentionally simple */ }}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 font-semibold">
            Load More Parts
          </button>
        </div>
      </div>
    </section>
  );
};

export default VehicleSearchResults;