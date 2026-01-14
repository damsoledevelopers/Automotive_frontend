import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaChevronDown,
  FaCamera,
  FaVideo,
  FaTimes,
  FaUpload,
  FaBell,
  FaWallet,
  FaMapMarkerAlt,
  FaChevronUp,
  FaMicrophone,
  FaCrown,
} from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import logo3 from "./logo3.png"; 
import { Sider } from "./Sider";
import { useCart } from '../contexts/CartContext';

export const Header = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [headerPN, setHeaderPN] = useState("");
  const { getTotalItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [isScrolled, setIsScrolled] = useState(false);
  const [show360UploadModal, setShow360UploadModal] = useState(false);
  const [uploadType, setUploadType] = useState('photo'); // 'photo' or 'video'
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState({
    area: "Gachibowli",
    city: "Hyderabad",
    state: "Telangana",
    country: "India"
  });
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [membershipType, setMembershipType] = useState("Gold"); // "Gold" or "Silver"
  const [notificationCount, setNotificationCount] = useState(3);

  // Scroll effect for header - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show header at the top of the page
      if (currentScrollY < 10) {
        setIsHeaderVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down
          setIsHeaderVisible(false);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setIsHeaderVisible(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const categories = [
    { value: "0", label: "All Categories", href: "/category" },
    { value: "1", label: "Air Conditioning", href: "/catalog/air_conditioning/" },
    { value: "2", label: "Bearings", href: "/catalog/bearings/" },
    { value: "3", label: "Belts Chains And Rollers", href: "/catalog/drive_belts/" },
    { value: "4", label: "Body", href: "/catalog/body/" },
    { value: "5", label: "Brake System", href: "/catalog/brakes/" },
    { value: "6", label: "Car Accessories", href: "/catalog/car_accessories/" },
    { value: "7", label: "Clutch System", href: "/catalog/clutch/" },
    { value: "8", label: "Control Cables", href: "/catalog/control_cables/" },
    { value: "9", label: "Electrical Components", href: "/catalog/electric_components/" },
    { value: "10", label: "Engine", href: "/catalog/engine/" },
    { value: "11", label: "Engine Cooling System", href: "/catalog/cooling_system/" },
    { value: "12", label: "Exhaust System", href: "/catalog/exhaust/" },
    { value: "13", label: "Filters", href: "/catalog/filters/" },
    { value: "14", label: "Fuel Supply System", href: "/catalog/fuelsystem/" },
    { value: "15", label: "Gaskets & Seals", href: "/catalog/Gasket_SealingRings/" },
    { value: "16", label: "Interior and Comfort", href: "/catalog/interior_comfort/" },
    { value: "17", label: "Lighting", href: "/catalog/lighting/" },
    { value: "18", label: "Maintenance Service Parts", href: "/catalog/maintenance_service_parts/" },
    { value: "19", label: "Oils and Fluids", href: "/catalog/oilsfluids/" },
    { value: "20", label: "Pipes & Hoses", href: "/catalog/pipes_hoses/" },
    { value: "21", label: "Sensors Relays and Control Units", href: "/catalog/sensors_control_units/" },
    { value: "22", label: "Steering", href: "/catalog/steering/" },
    { value: "23", label: "Suspension and Arms", href: "/catalog/suspension/" },
    { value: "24", label: "Towbar Parts", href: "/catalog/towbar/" },
    { value: "25", label: "Transmission", href: "/catalog/transmission/" },
    { value: "26", label: "Trims", href: "/catalog/trims/" },
    { value: "27", label: "Universal", href: "/catalog/universal/" },
    { value: "28", label: "Wheels", href: "/catalog/wheels/" },
    { value: "29", label: "Windscreen Cleaning System", href: "/catalog/windscreen_cleaning_system/" }
  ];

  // Navigation handlers
  const handleSelectChange = (e) => {
    const href = e.target.selectedOptions[0].getAttribute("data-href");
    setSelectedCategory(e.target.value);
    if (href && href !== "0") {
      navigate(href);
    }
  };

  const handleSearch = () => {
    const pn = headerPN.trim();
    if (!pn) return;

    // Oriparts search functionality
    const search = encodeURIComponent(pn);
    const backUrl = `${window.location.origin}/search/`;
    const url = `https://oriparts.com/?search=${search}&back_url_pn=${encodeURIComponent(backUrl)}${pn}`;
    window.open(url, "_blank", "noopener");
  };

  const goToWishlist = () => navigate("/mywishlist");
  const goToCart = () => navigate("/cart");
  const goToHomePage = () => navigate("/");
  const handleVoiceSearch = () => {
    // Voice search functionality
    alert("Voice search functionality will be implemented");
  };

  return (
    <>
      {/* Mobile Header - Dark Theme */}
      <motion.header
        className={`md:hidden w-full bg-gray-900/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50
          ${isScrolled ? "shadow-xl bg-gray-900/90 backdrop-blur-md" : "shadow-sm bg-gray-900/80 backdrop-blur-md"
        }`}
        initial={{ y: 0 }}
        animate={{ 
          y: isHeaderVisible ? 0 : -100,
          opacity: isHeaderVisible ? 1 : 0
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <div className="px-4 py-3">
          {/* Top Row: Location on Left, Cart on Right */}
          <div className="flex items-center justify-between mb-3">
            {/* Location */}
            <button
              onClick={() => setShowLocationModal(true)}
              className="flex items-start gap-2 text-white"
            >
              <FaMapMarkerAlt className="text-base text-white flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-bold text-white">
                  {selectedLocation.area}
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  {selectedLocation.city}- {selectedLocation.state}- {selectedLocation.country}
                  <FaChevronDown className="text-[10px] text-gray-400" />
                </p>
              </div>
            </button>

            {/* Cart Icon */}
            <motion.button
              onClick={goToCart}
              className="relative p-2 bg-white rounded-full border-2 border-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaShoppingCart className="text-xl text-gray-900" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {getTotalItems() > 9 ? '9+' : getTotalItems()}
                </span>
              )}
            </motion.button>
          </div>

          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-lg px-3 py-2.5">
            <FaSearch className="text-gray-600 text-base mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search for 'AC service'"
              className="flex-1 bg-transparent text-gray-900 text-sm placeholder-gray-500 focus:outline-none"
              value={headerPN}
              onChange={(e) => setHeaderPN(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
        </div>
      </motion.header>

      {/* Desktop Header - Original Design */}
      <motion.header
        className={`hidden md:block w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50
          ${isScrolled ? "shadow-xl bg-white/95 backdrop-blur-sm" : "shadow-sm"
        }`}
        initial={{ y: 0 }}
        animate={{ 
          y: isHeaderVisible ? 0 : -100,
          opacity: isHeaderVisible ? 1 : 0
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        {/* ===== MAIN HEADER ===== */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3">
          {/* Top Row: Logo + Location on Left, Icons on Right */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 mb-2 sm:mb-3">
            {/* Left Side: Logo and Location */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Logo */}
              <motion.div 
                onClick={goToHomePage}
                className="flex items-center cursor-pointer"
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={logo3}
                  alt="Sparelo Logo"
                  className="h-8 sm:h-10 md:h-12 w-auto"
                />
              </motion.div>

              {/* Location Display - Beside Logo */}
              <div className="flex items-start gap-1 sm:gap-1.5 flex-shrink-0">
                <button
                  onClick={() => setShowLocationModal(true)}
                  className="flex items-start gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-1 hover:bg-gray-50 transition-colors rounded-md text-left"
                >
                  <FaMapMarkerAlt className="text-[9px] sm:text-[10px] text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-left min-w-0">
                    <p className="text-[7px] sm:text-[8px] md:text-[9px] font-medium text-gray-700 whitespace-nowrap">
                      {selectedLocation.area}
                    </p>
                    <p className="text-[6px] sm:text-[7px] md:text-[8px] text-gray-600 whitespace-nowrap">
                      {selectedLocation.city}- {selectedLocation.state}- {selectedLocation.country}
                    </p>
                  </div>
                </button>
              </div>
            </div>

          {/* Right Side Icons: Notifications, Membership, Wallet, Cart, Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">
            {/* Notifications */}
            <motion.button
              onClick={() => navigate("/notifications")}
              className="relative p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Notifications"
            >
              <FaBell className="text-base sm:text-lg md:text-xl text-gray-700" />
              {notificationCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] sm:text-[10px] rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center font-bold shadow-md">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </motion.button>

            {/* Membership Badge */}
            <motion.button
              onClick={() => navigate("/membership")}
              className={`relative px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-md transition-all flex items-center gap-1 sm:gap-1.5 shadow-sm hover:shadow-md ${
                membershipType === "Gold"
                  ? "bg-yellow-50 hover:bg-yellow-100 border border-yellow-200"
                  : "bg-gray-100 hover:bg-gray-200 border border-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={`${membershipType} Membership`}
            >
              <FaCrown className={`text-[10px] sm:text-xs md:text-sm flex-shrink-0 ${
                membershipType === "Gold" ? "text-yellow-600" : "text-gray-600"
              }`} />
              <span className={`text-[8px] sm:text-[9px] md:text-[10px] font-semibold whitespace-nowrap ${
                membershipType === "Gold" ? "text-gray-900" : "text-gray-700"
              }`}>
                <span className="hidden sm:inline">{membershipType === "Gold" ? "Gold" : "Silver"} Membership</span>
                <span className="sm:hidden">{membershipType === "Gold" ? "Gold" : "Silver"}</span>
              </span>
            </motion.button>

            {/* Wallet */}
            <motion.button
              onClick={() => navigate("/wallet")}
              className="relative px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 bg-white rounded-md shadow-sm hover:shadow-md transition-all flex items-center gap-1 sm:gap-1.5 border border-gray-200 hover:border-gray-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Wallet"
            >
              <FaWallet className="text-[10px] sm:text-xs md:text-sm text-gray-700 flex-shrink-0" />
              <span className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-gray-700 whitespace-nowrap">
                Wallet
              </span>
            </motion.button>

            {/* Cart - Hidden on mobile, shown on larger screens */}
            <motion.button
              onClick={goToCart}
              className="hidden sm:flex relative p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Cart"
            >
              <FaShoppingCart className="text-base sm:text-lg md:text-xl text-gray-700" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] sm:text-[10px] rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center font-bold shadow-md">
                  {getTotalItems() > 9 ? '9+' : getTotalItems()}
                </span>
              )}
            </motion.button>

            {/* Sidebar/Menu button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1.5 sm:p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              title="Menu"
            >
              <IoReorderThreeOutline className="text-lg sm:text-xl md:text-2xl" />
            </button>
          </div>
        </div>

        {/* Search Bar Row - Below Logo and Location */}
        <div className="flex items-center gap-2">
          {/* Search Bar - Positioned between location and notifications */}
          <div className="flex items-center bg-gray-50 rounded-md shadow-sm border border-gray-200 overflow-hidden flex-1 max-w-md sm:max-w-lg md:max-w-xl ml-20 sm:ml-28 md:ml-36">
            {/* Search Input */}
            <input
              type="text"
              placeholder="search..."
              className="flex-1 px-2 sm:px-2.5 py-2 sm:py-1.5 bg-transparent text-gray-700 text-[8px] sm:text-[8px] md:text-[9px] focus:outline-none"
              value={headerPN}
              onChange={(e) => setHeaderPN(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            {/* Mic Icon for Voice Search */}
            <motion.button
              onClick={handleVoiceSearch}
              className="px-1.5 sm:px-2 py-1 sm:py-1.5 text-gray-600 hover:text-red-600 hover:bg-gray-100 transition-colors flex items-center justify-center border-l border-gray-200 flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Voice Search"
            >
              <FaMicrophone className="text-[8px] sm:text-[9px] md:text-[10px]" />
            </motion.button>
          </div>

          {/* Cart Button - Mobile Only */}
          <motion.button
            onClick={goToCart}
            className="sm:hidden relative p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaShoppingCart className="text-lg text-gray-700" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-md">
                {getTotalItems() > 9 ? '9+' : getTotalItems()}
              </span>
            )}
          </motion.button>
        </div>
        </div>
      </motion.header>

      {/* Location Selection Modal */}
      <AnimatePresence>
        {showLocationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowLocationModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 md:p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Select Location</h2>
                  <button
                    onClick={() => setShowLocationModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>
                <div className="space-y-2">
                  {[
                    { area: "Gachibowli", city: "Hyderabad", state: "Telangana", country: "India" },
                    { area: "Hitech City", city: "Hyderabad", state: "Telangana", country: "India" },
                    { area: "Banjara Hills", city: "Hyderabad", state: "Telangana", country: "India" }
                  ].map((location, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedLocation(location);
                        setShowLocationModal(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                        selectedLocation.area === location.area
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <p className="font-semibold text-gray-900">{location.area}</p>
                      <p className="text-sm text-gray-600">{location.city}- {location.state}- {location.country}</p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 360 Degree Upload Modal */}
      <AnimatePresence>
        {show360UploadModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setShow360UploadModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 md:p-5">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm md:text-xl font-bold text-gray-900">Upload 360° Content</h2>
                    <button
                      onClick={() => setShow360UploadModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      <FaTimes className="text-lg" />
                    </button>
                  </div>

                  {/* Type Selection */}
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setUploadType('photo')}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        uploadType === 'photo'
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <FaCamera className="inline-block mr-1.5 text-xs" />
                      Image
                    </button>
                    <button
                      onClick={() => setUploadType('video')}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        uploadType === 'video'
                          ? 'bg-cyan-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <FaVideo className="inline-block mr-1.5 text-xs" />
                      Video
                    </button>
                  </div>

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-5 text-center hover:border-blue-400 transition-colors mb-4 bg-gray-50">
                    <div className="flex flex-col items-center">
                      {uploadType === 'photo' ? (
                        <FaCamera className="text-3xl md:text-4xl text-gray-400 mb-2" />
                      ) : (
                        <FaVideo className="text-3xl md:text-4xl text-gray-400 mb-2" />
                      )}
                      <h3 className="text-xs md:text-base font-semibold text-gray-900 mb-1">
                        Upload {uploadType === 'photo' ? 'Image' : '360° Video'}
                      </h3>
                      <p className="text-[10px] text-gray-600 mb-3">
                        Drag and drop or click to browse
                      </p>
                      <input
                        type="file"
                        accept={uploadType === 'photo' ? 'image/*' : 'video/*'}
                        className="hidden"
                        id="360-upload-input"
                        multiple
                      />
                      <label
                        htmlFor="360-upload-input"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all cursor-pointer text-sm shadow-sm"
                      >
                        <FaUpload className="text-xs" />
                        <span>Choose File</span>
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        {uploadType === 'photo' ? 'JPG, PNG, HEIC' : 'MP4, MOV, AVI'} (Max 100MB)
                      </p>
                    </div>
                  </div>

                  {/* Additional Options */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        placeholder={`Enter ${uploadType === 'photo' ? 'photo' : 'video'} title...`}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Description (Optional)
                      </label>
                      <textarea
                        rows="2"
                        placeholder="Add a description..."
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Tags (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., car, parts, review"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShow360UploadModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Handle upload logic here
                        alert(`${uploadType === 'photo' ? 'Photo' : 'Video'} upload functionality will be implemented`);
                        setShow360UploadModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg transition-all font-medium text-sm shadow-md"
                    >
                      Upload {uploadType === 'photo' ? 'Photo' : 'Video'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <Sider isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;
