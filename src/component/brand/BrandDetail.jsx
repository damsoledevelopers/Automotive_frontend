import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCar,
  FaCheckCircle,
  FaTruck,
  FaUndo,
  FaFileInvoice,
  FaFilter,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaArrowsAltV,
  FaHeadset,
  FaInfoCircle
} from 'react-icons/fa';

const BrandDetail = () => {
  const { brandSlug } = useParams();
  const [sortBy, setSortBy] = useState('best-match');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGarage, setSelectedGarage] = useState([]);
  const [fulfilledBysparelo, setFulfilledBysparelo] = useState(false);
  const [fulfilledByBoodmo, setFulfilledByBoodmo] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expandedFilters, setExpandedFilters] = useState({
    garage: false,
    class: false,
    category: false
  });

  // Parse brand slug (format: "362-bosch")
  const parseBrandSlug = (slug) => {
    if (!slug) return { id: '362', name: 'BOSCH', slug: 'bosch' };
    const parts = slug.split('-');
    const id = parts[0];
    const nameSlug = parts.slice(1).join('-');
    // Convert slug to brand name (e.g., "bosch" -> "BOSCH")
    const name = nameSlug.toUpperCase().replace(/-/g, ' ');
    return { id, name, slug: nameSlug };
  };

  const parsedBrand = parseBrandSlug(brandSlug);

  // Mock brand data - in real app, fetch based on brandSlug
  const brandData = {
    id: parsedBrand.id,
    name: parsedBrand.name,
    slug: parsedBrand.slug,
    logo: 'https://via.placeholder.com/150x80?text=' + parsedBrand.name,
    description: 'For more than 100 years, Bosch has been a major supplier of automotive technologies and spare parts. The company opened its first factory in Stuttgart (Germany) in 1901. In 1951, Bosch established its manufacturing unit in Chennai (India).',
    totalParts: 25678
  };

  // Mock garage data
  const garages = [
    { id: 1, name: 'SELTOS', icon: FaCar },
    { id: 2, name: '800', icon: FaCar },
    { id: 3, name: 'CARENS', icon: FaCar }
  ];

  // Mock classes data
  const classes = [
    { id: 1, name: 'Accessory Kit, Brake', count: 129 },
    { id: 2, name: 'Air Filter', count: 581 },
    { id: 3, name: 'Alternator', count: 1041 },
    { id: 4, name: 'Brake Pad Set', count: 856 },
    { id: 5, name: 'Fuel Filter', count: 432 },
    { id: 6, name: 'Glow Plug', count: 298 }
  ];

  // Mock categories data
  const categories = [
    'Maintenance Service Parts',
    'Filters',
    'Windscreen Cleaning System',
    'Car Accessories',
    'Lighting',
    'Control Cables',
    'Brake System',
    'Bearings',
    'Clutch System',
    'Electric Components',
    'Engine',
    'Engine Cooling System',
    'Exhaust System',
    'Air Conditioning',
    'Fuel Supply System',
    'Gaskets and Sealing Rings',
    'Ignition and Glowplug System',
    'Interior and comfort',
    'Body',
    'Oils and Fluids',
    'Pipes and Hoses',
    'Repair Kits',
    'Sensors Relays and Control units'
  ];

  const DEFAULT_PART_IMAGE =
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&h=400&q=80";

  // Helper function to get product image based on product type
  const getProductImage = (productName = "", productId = 1) => {
    const imageLibrary = {
      "fuel filter": [
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&h=400&q=80",
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&h=400&q=80",
      ],
      "oil filter": [
        "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=400&h=400&q=80",
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&h=400&q=80",
      ],
      "air filter": [
        "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?auto=format&fit=crop&w=400&h=400&q=80",
      ],
      "brake pad": [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&h=400&q=80",
        "https://images.unsplash.com/photo-1517467139951-f5a925c9f9de?auto=format&fit=crop&w=400&h=400&q=80",
      ],
      "brake shoe": [
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=400&h=400&q=80",
      ],
      "spark plug": [
        "https://images.unsplash.com/photo-1452716726610-30ed68426a6b?auto=format&fit=crop&w=400&h=400&q=80",
      ],
      "glow plug": [
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=400&h=400&q=80",
      ],
      alternator: [
        "https://images.unsplash.com/photo-1469402658686-36c69afa4161?auto=format&fit=crop&w=400&h=400&q=80",
      ],
      "water pump": [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&h=400&q=80",
      ],
      "timing belt": [
        "https://images.unsplash.com/photo-1469398718052-b9d13df0d7c9?auto=format&fit=crop&w=400&h=400&q=80",
      ],
      "radiator fan": [
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&h=400&q=80",
      ],
      "clutch plate": [
        "https://images.unsplash.com/photo-1514373941175-5a9c01ea7e2a?auto=format&fit=crop&w=400&h=400&q=80",
      ],
      headlight: [
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&h=400&q=80",
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&h=400&q=80",
      ],
      battery: [
        "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=400&h=400&q=80",
      ],
    };

    const normalizedName = productName.toLowerCase();
    const keyword = Object.keys(imageLibrary)
      .sort((a, b) => b.length - a.length)
      .find((key) => normalizedName.includes(key));

    if (keyword) {
      const options = imageLibrary[keyword];
      return options[productId % options.length];
    }

    return DEFAULT_PART_IMAGE;
  };

  // Mock products data
  const products = [
    {
      id: 1,
      name: 'Fuel Filter',
      partNumber: 'F00...6307',
      price: 649.00,
      mrp: 3888.00,
      discount: 5,
      brand: 'BOSCH',
      class: 'Fuel Filter',
      soldBy: 'Pune/SWA',
      origin: 'Aftermarket',
      deliveryDays: 2,
      returnDays: 10,
      fulfilledBysparelo: true,
      freeDelivery: true,
      spareloChoice: true,
      image: getProductImage('Fuel Filter', 1)
    },
    {
      id: 2,
      name: 'Front Brake Pad Set',
      partNumber: 'F00...4188',
      price: 690.00,
      mrp: 3881.00,
      discount: 22,
      brand: 'BOSCH',
      class: 'Brake Pad Set',
      soldBy: 'Pune/SWA',
      origin: 'Aftermarket',
      deliveryDays: 2,
      returnDays: 10,
      fulfilledBysparelo: true,
      freeDelivery: true,
      spareloChoice: true,
      image: getProductImage('Front Brake Pad Set', 2)
    },
    {
      id: 3,
      name: 'Front Brake Pad Set',
      partNumber: 'F00...0030',
      price: 675.00,
      mrp: 3863.00,
      discount: 22,
      brand: 'BOSCH',
      class: 'Brake Pad Set',
      soldBy: 'Pune/SWA',
      origin: 'Aftermarket',
      deliveryDays: 2,
      returnDays: 10,
      fulfilledBysparelo: true,
      freeDelivery: true,
      spareloChoice: true,
      image: getProductImage('Front Brake Pad Set', 3)
    },
    {
      id: 4,
      name: 'Glow Plug',
      partNumber: 'F00...0031',
      price: 641.00,
      mrp: null,
      discount: 0,
      brand: 'BOSCH',
      class: 'Glow Plug',
      soldBy: 'Pune/SWA',
      origin: 'Aftermarket',
      deliveryDays: 2,
      returnDays: 10,
      fulfilledBysparelo: true,
      freeDelivery: true,
      spareloChoice: true,
      image: getProductImage('Glow Plug', 4)
    },
    {
      id: 5,
      name: 'Rear Brake Shoe Set',
      partNumber: 'F00...6422',
      price: 739.00,
      mrp: 3843.00,
      discount: 12,
      brand: 'BOSCH',
      class: 'Brake Shoe Set',
      soldBy: 'Pune/SWA',
      origin: 'Aftermarket',
      deliveryDays: 2,
      returnDays: 10,
      fulfilledBysparelo: true,
      freeDelivery: true,
      spareloChoice: true,
      image: getProductImage('Rear Brake Shoe Set', 5)
    },
    {
      id: 6,
      name: 'Air Filter',
      partNumber: 'F00...7821',
      price: 450.00,
      mrp: 650.00,
      discount: 31,
      brand: 'BOSCH',
      class: 'Air Filter',
      soldBy: 'Mumbai/SWA',
      origin: 'Aftermarket',
      deliveryDays: 1,
      returnDays: 10,
      fulfilledBysparelo: true,
      freeDelivery: true,
      spareloChoice: false,
      image: getProductImage('Air Filter', 6)
    },
    {
      id: 7,
      name: 'Oil Filter',
      partNumber: 'F00...4523',
      price: 320.00,
      mrp: 480.00,
      discount: 33,
      brand: 'BOSCH',
      class: 'Oil Filter',
      soldBy: 'Delhi/SWA',
      origin: 'Aftermarket',
      deliveryDays: 2,
      returnDays: 10,
      fulfilledBysparelo: true,
      freeDelivery: true,
      spareloChoice: true,
      image: getProductImage('Oil Filter', 7)
    },
    {
      id: 8,
      name: 'Spark Plug',
      partNumber: 'F00...8912',
      price: 280.00,
      mrp: 350.00,
      discount: 20,
      brand: 'BOSCH',
      class: 'Spark Plug',
      soldBy: 'Bangalore/SWA',
      origin: 'Aftermarket',
      deliveryDays: 3,
      returnDays: 10,
      fulfilledBysparelo: true,
      freeDelivery: false,
      spareloChoice: false,
      image: getProductImage('Spark Plug', 8)
    },
    {
      id: 9,
      name: 'Alternator',
      partNumber: 'F00...3456',
      price: 4500.00,
      mrp: 5500.00,
      discount: 18,
      brand: 'BOSCH',
      class: 'Alternator',
      soldBy: 'Chennai/SWA',
      origin: 'Aftermarket',
      deliveryDays: 4,
      returnDays: 10,
      fulfilledBysparelo: true,
      freeDelivery: true,
      spareloChoice: true,
      image: getProductImage('Alternator', 9)
    },
    {
      id: 10,
      name: 'Water Pump',
      partNumber: 'F00...7890',
      price: 1200.00,
      mrp: 1500.00,
      discount: 20,
      brand: 'BOSCH',
      class: 'Water Pump',
      soldBy: 'Pune/SWA',
      origin: 'Aftermarket',
      deliveryDays: 2,
      returnDays: 10,
      fulfilledBysparelo: true,
      freeDelivery: true,
      spareloChoice: false,
      image: getProductImage('Water Pump', 10)
    },
    {
      id: 11,
      name: 'Timing Belt',
      partNumber: 'F00...2345',
      price: 850.00,
      mrp: 1100.00,
      discount: 23,
      brand: 'BOSCH',
      class: 'Timing Belt',
      soldBy: 'Hyderabad/SWA',
      origin: 'Aftermarket',
      deliveryDays: 3,
      returnDays: 10,
      fulfilledBysparelo: true,
      freeDelivery: true,
      spareloChoice: true,
      image: getProductImage('Timing Belt', 11)
    },
    {
      id: 12,
      name: 'Radiator Fan',
      partNumber: 'F00...5678',
      price: 1800.00,
      mrp: 2200.00,
      discount: 18,
      brand: 'BOSCH',
      class: 'Radiator Fan',
      soldBy: 'Kolkata/SWA',
      origin: 'Aftermarket',
      deliveryDays: 2,
      returnDays: 10,
      fulfilledBysparelo: true,
      freeDelivery: true,
      spareloChoice: false,
      image: getProductImage('Radiator Fan', 12)
    },
    {
      id: 13,
      name: 'Clutch Plate',
      partNumber: 'F00...9012',
      price: 2500.00,
      mrp: 3200.00,
      discount: 22,
      brand: 'BOSCH',
      class: 'Clutch Plate',
      soldBy: 'Ahmedabad/SWA',
      origin: 'Aftermarket',
      deliveryDays: 3,
      returnDays: 10,
      fulfilledBysparelo: true,
      freeDelivery: true,
      spareloChoice: true,
      image: getProductImage('Clutch Plate', 13)
    },
    {
      id: 14,
      name: 'Headlight Bulb',
      partNumber: 'F00...6789',
      price: 350.00,
      mrp: 450.00,
      discount: 22,
      brand: 'BOSCH',
      class: 'Headlight Bulb',
      soldBy: 'Pune/SWA',
      origin: 'Aftermarket',
      deliveryDays: 1,
      returnDays: 10,
      fulfilledBysparelo: true,
      freeDelivery: true,
      spareloChoice: false,
      image: getProductImage('Headlight Bulb', 14)
    },
    {
      id: 15,
      name: 'Battery',
      partNumber: 'F00...1234',
      price: 3500.00,
      mrp: 4200.00,
      discount: 17,
      brand: 'BOSCH',
      class: 'Battery',
      soldBy: 'Mumbai/SWA',
      origin: 'Aftermarket',
      deliveryDays: 2,
      returnDays: 10,
      fulfilledBysparelo: true,
      freeDelivery: true,
      spareloChoice: true,
      image: getProductImage('Battery', 15)
    }
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter products
  useEffect(() => {
    let filtered = [...products];

    if (fulfilledBysparelo) {
      filtered = filtered.filter(p => p.fulfilledBysparelo);
    }

    if (freeDelivery) {
      filtered = filtered.filter(p => p.freeDelivery);
    }

    if (selectedClasses.length > 0) {
      filtered = filtered.filter(p => selectedClasses.includes(p.class));
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [fulfilledBysparelo, freeDelivery, selectedClasses]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage <= 3) {
        // Show first 5 pages
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        // Add ellipsis and last page
        if (totalPages > 5) {
          pages.push('ellipsis');
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // Show first page, ellipsis, and last 5 pages
        pages.push('ellipsis');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleClass = (className) => {
    setSelectedClasses(prev =>
      prev.includes(className)
        ? prev.filter(c => c !== className)
        : [...prev, className]
    );
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const resetFilters = () => {
    setFulfilledBysparelo(false);
    setFreeDelivery(false);
    setSelectedClasses([]);
    setSelectedCategories([]);
    setSelectedGarage([]);
  };

  const toggleFilterSection = (section) => {
    setExpandedFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-24">
 
      <div className="max-w-6xl mx-auto px-0 sm:px-2 md:px-4 lg:px-5 py-0 sm:py-2 md:py-4">
        {/* Breadcrumbs */}
        <nav className="mb-1.5 sm:mb-2 px-3 sm:px-0 bg-white py-1.5">
          <ol className="flex items-center space-x-1 text-[10px] sm:text-xs text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-0.5">
                <FaHome className="text-[9px]" />
                <span>Home</span>
              </Link>
            </li>
            <li><span className="mx-0.5">/</span></li>
            <li>
              <Link to="/brands" className="hover:text-blue-600 transition-colors">Brands</Link>
            </li>
            <li><span className="mx-0.5">/</span></li>
            <li className="text-gray-800 font-semibold">{brandData.name}</li>
          </ol>
        </nav>

        {/* Brand Header */}
        <div className="bg-white px-3 sm:px-4 py-3 sm:py-4 mb-3 sm:mb-4 mx-0 sm:mx-0 border border-gray-100 shadow-sm">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              <span className="text-gray-900">{brandData.name}</span>{" "}
              <span className="text-sky-500">Auto Parts</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-5xl">
              {brandData.description}
            </p>
          </div>
        </div>

        {/* Filter Toggle Section - Mobile */}
        <div className="bg-white px-2 py-2 mb-2 flex items-center justify-between lg:hidden border-b">
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={fulfilledBysparelo || fulfilledByBoodmo}
                  onChange={(e) => {
                    setFulfilledBysparelo(e.target.checked);
                    setFulfilledByBoodmo(e.target.checked);
                  }}
                  className="sr-only"
                />
                <div className={`w-9 h-5 rounded-full transition-colors ${
                  (fulfilledBysparelo || fulfilledByBoodmo) ? 'bg-blue-600' : 'bg-gray-300'
                }`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                    (fulfilledBysparelo || fulfilledByBoodmo) ? 'translate-x-4' : 'translate-x-0.5'
                  } mt-0.5`}></div>
                </div>
              </div>
            </label>
          </div>
          <button
            onClick={() => setFreeDelivery(!freeDelivery)}
            className={`px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 ${
              freeDelivery 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <FaTruck className="text-[10px]" />
            Free Delivery
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 md:gap-4 px-0 sm:px-0">
          {/* Mobile Filter Overlay */}
          {showFilters && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* Left Sidebar - Filters (Desktop Only) */}
          <aside className={`lg:w-48 xl:w-56 flex-shrink-0 ${showFilters ? 'fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-2 sm:p-2.5 sticky top-2 h-full lg:h-auto overflow-y-auto">
              <div className="flex items-center justify-between mb-2 lg:hidden">
                <h3 className="text-sm font-bold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <FaTimes className="text-xs text-gray-600" />
                </button>
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm sm:text-base font-bold text-gray-900">Filters</h3>
                <button
                  onClick={resetFilters}
                  className="text-[10px] sm:text-xs text-blue-600 hover:text-blue-700 font-semibold"
                >
                  RESET
                </button>
              </div>
              
              {/* Total Parts Count in Filters */}
              <p className="text-xs text-gray-700 mb-3">
                Total <span className="font-bold">{brandData.totalParts.toLocaleString()}</span> parts
              </p>

              <div className="space-y-3">
                {/* Garage Filter */}
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Garage</h4>
                  <div className="space-y-1.5 mb-2">
                    <div className="flex flex-wrap gap-1.5">
                      {garages.map((garage) => (
                        <button
                          key={garage.id}
                          onClick={() => {
                            setSelectedGarage(prev =>
                              prev.includes(garage.id)
                                ? prev.filter(g => g !== garage.id)
                                : [...prev, garage.id]
                            );
                          }}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg border-2 transition-all ${
                            selectedGarage.includes(garage.id)
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <garage.icon className="text-xs" />
                          <span className="text-[10px] sm:text-xs">{garage.name}</span>
                          {garage.id === 2 && <span className="text-[10px] text-gray-500 ml-1">(800)</span>}
                        </button>
                      ))}
                    </div>
                    <select className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-[10px] sm:text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Choose car maker</option>
                      <option>Hyundai</option>
                      <option>Maruti</option>
                      <option>Tata</option>
                    </select>
                  </div>
                </div>


                {/* Free Delivery */}
                <div>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={freeDelivery}
                      onChange={(e) => setFreeDelivery(e.target.checked)}
                      className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-[10px] sm:text-xs text-gray-700">Free Delivery</span>
                    <span className="text-[9px] sm:text-[10px] text-gray-500">(3488)</span>
                  </label>
                </div>

                {/* Class Filter */}
                <div>
                  <button
                    onClick={() => toggleFilterSection('class')}
                    className="w-full flex items-center justify-between text-[10px] sm:text-xs font-semibold text-gray-900 mb-1.5"
                  >
                    Class
                    {expandedFilters.class ? <FaChevronUp className="text-[9px]" /> : <FaChevronDown className="text-[9px]" />}
                  </button>
                  {expandedFilters.class && (
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {classes.map((classItem) => (
                        <label key={classItem.id} className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedClasses.includes(classItem.name)}
                            onChange={() => toggleClass(classItem.name)}
                            className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-[9px] sm:text-[10px] text-gray-700">{classItem.name}</span>
                          <span className="text-[9px] text-gray-500">({classItem.count})</span>
                        </label>
                      ))}
                      <button className="text-[9px] sm:text-[10px] text-blue-600 hover:text-blue-700 font-medium mt-1">
                        +47 More
                      </button>
                    </div>
                  )}
                </div>

                {/* Category Filter */}
                <div>
                  <button
                    onClick={() => toggleFilterSection('category')}
                    className="w-full flex items-center justify-between text-[10px] sm:text-xs font-semibold text-gray-900 mb-1.5"
                  >
                    Category
                    {expandedFilters.category ? <FaChevronUp className="text-[9px]" /> : <FaChevronDown className="text-[9px]" />}
                  </button>
                  {expandedFilters.category && (
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {categories.map((category, index) => (
                        <label key={index} className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-[9px] sm:text-[10px] text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar - Desktop Only */}
            <div className="hidden lg:flex bg-white rounded-lg shadow-md p-2 mb-3 items-center justify-end">
              <div className="flex items-center gap-1.5">
                <label className="text-xs text-gray-600">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2 py-1.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="best-match">Best match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="space-y-3 sm:space-y-4 px-0 sm:px-0">
              {paginatedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg sm:rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row gap-0 sm:gap-4">
                    {/* Product Image Section - Full width on mobile */}
                    <div className="flex-shrink-0 w-full sm:w-40 md:w-48 lg:w-56">
                      <div className="bg-gray-100 sm:rounded-lg overflow-hidden relative mb-0 sm:mb-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 sm:h-48 md:h-56 object-cover sm:object-contain"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x400?text=Product';
                          }}
                        />
                      </div>
                      
                      {/* Badges below image */}
                      <div className="flex flex-wrap items-center gap-1.5 px-3 sm:px-0 mb-2 sm:mb-0 mt-2 sm:mt-0">
                        {product.freeDelivery && (
                          <span className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-semibold border border-blue-200">
                            <FaTruck className="text-[9px]" />
                            <span>Free Delivery</span>
                          </span>
                        )}
                    
                      </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="flex-1 min-w-0 px-3 sm:px-4 pb-3 sm:pb-4 pt-2 sm:pt-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1.5">
                        {product.name}
                      </h3>

                      {/* Part Number */}
                      <p className="text-xs sm:text-sm text-gray-600 mb-2 font-mono">
                        {product.partNumber.includes('...') 
                          ? product.partNumber
                          : product.partNumber.length > 10 
                            ? `${product.partNumber.substring(0, 3)}...${product.partNumber.substring(product.partNumber.length - 4)}`
                            : product.partNumber}
                      </p>

                      {/* Product Info Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3 text-xs">
                        <div>
                          <span className="text-gray-600">Brand:</span>
                          <Link to={`/brands/${brandData.slug}`} className="font-semibold text-blue-600 hover:underline ml-1">
                            {product.brand}
                          </Link>
                        </div>
                        <div>
                          <span className="text-gray-600">Class:</span>
                          <span className="font-semibold text-gray-900 ml-1">{product.class}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Sold By:</span>
                          <span className="font-semibold text-gray-900 ml-1">{product.soldBy}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Origin:</span>
                          <span className="font-semibold text-gray-900 ml-1">{product.origin}</span>
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl sm:text-2xl font-bold text-gray-900">
                          ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                        {product.mrp && (
                          <>
                            <span className="text-sm sm:text-base text-gray-500 line-through">
                              MRP: ₹{product.mrp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </span>
                            {product.discount > 0 && (
                              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">
                                -{product.discount}%
                              </span>
                            )}
                          </>
                        )}
                      </div>

                      {/* Delivery & Return Info */}
                      <div className="flex flex-wrap items-center gap-2.5 mb-3 text-xs">
                        <div className="flex items-center gap-1 text-green-700">
                          <FaTruck className="text-[10px]" />
                          <span>Free Delivery within {product.deliveryDays} days</span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-700">
                          <FaUndo className="text-[10px]" />
                          <span>{product.returnDays} Days Assured Return</span>
                          <FaInfoCircle className="text-[9px]" />
                        </div>
                        <div className="flex items-center gap-1 text-gray-700">
                          <FaFileInvoice className="text-[10px]" />
                          <span>GST invoice</span>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <Link
                        to={`/catalog/part-p-${product.id}/`}
                        state={{ product: product }}
                        className="inline-block px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg font-semibold text-xs transition-colors shadow-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination - Desktop Only */}
            {totalPages > 1 && (
              <div className="hidden lg:flex mt-3 sm:mt-4 flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 bg-white rounded-lg shadow-md p-2 sm:p-3">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs font-medium transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  <FaChevronLeft className="text-[9px] sm:text-[10px]" />
                  <span>PREVIOUS</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) => {
                    if (page === 'ellipsis') {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-1.5 text-[10px] sm:text-xs text-gray-500 font-medium"
                        >
                          000
                        </span>
                      );
                    }
                    
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`min-w-[28px] sm:min-w-[32px] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded text-[10px] sm:text-xs font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                        }`}
                      >
                        {page.toLocaleString()}
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs font-medium transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  <span>NEXT</span>
                  <FaChevronRight className="text-[9px] sm:text-[10px]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white z-50 lg:hidden">
        <div className="flex items-center justify-between px-3 py-2">
          <button
            onClick={() => setSortBy(sortBy === 'price-low' ? 'price-high' : 'price-low')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs font-medium transition-colors"
          >
            <FaArrowsAltV className="text-[10px]" />
            <span>SORT</span>
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs font-medium transition-colors"
          >
            <FaFilter className="text-[10px]" />
            <span>FILTERS</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandDetail;

