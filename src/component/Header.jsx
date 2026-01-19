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

  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const [selectedLocation, setSelectedLocation] = useState({
    area: "Gachibowli",
    city: "Hyderabad",
    state: "Telangana",
    country: "India"
  });

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [membershipType, setMembershipType] = useState("Gold");
  const [notificationCount, setNotificationCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsHeaderVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsHeaderVisible(false);
        } else {
          setIsHeaderVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSearch = () => {
    const pn = headerPN.trim();
    if (!pn) return;

    const search = encodeURIComponent(pn);
    const backUrl = `${window.location.origin}/search/`;
    const url = `https://oriparts.com/?search=${search}&back_url_pn=${encodeURIComponent(backUrl)}${pn}`;
    window.open(url, "_blank", "noopener");
  };

  const goToCart = () => navigate("/cart");
  const goToHomePage = () => navigate("/");

  return (
    <>
      <motion.header
        className={`hidden md:block w-full bg-white fixed top-0 left-0 right-0 z-50 ${
          isScrolled ? "shadow-xl bg-white/95 backdrop-blur-sm" : "shadow-sm"
        }`}
        initial={{ y: 0 }}
        animate={{
          y: isHeaderVisible ? 0 : -100,
          opacity: isHeaderVisible ? 1 : 0
        }}
      >
        {/* ===== FULL WIDTH CONTAINER FIXED ===== */}
        <div className="w-full px-6 py-3">
          
          {/* TOP ROW */}
          <div className="flex items-center justify-between w-full">

            {/* LEFT SECTION */}
            <div className="flex items-center gap-4">
              <motion.div
                onClick={goToHomePage}
                className="flex items-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={logo3}
                  alt="Logo"
                  className="h-12 w-auto"
                />
              </motion.div>

              <button
                onClick={() => setShowLocationModal(true)}
                className="flex items-start gap-2 px-3 py-1 hover:bg-gray-50 rounded-md"
              >
                <FaMapMarkerAlt className="text-red-600 mt-1" />
                <div>
                  <p className="text-sm font-semibold">
                    {selectedLocation.area}
                  </p>
                  <p className="text-xs text-gray-600">
                    {selectedLocation.city} - {selectedLocation.state}
                  </p>
                </div>
              </button>
            </div>

            {/* SEARCH BAR - CENTERED PROPERLY */}
            <div className="flex-1 flex justify-center">
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md w-full max-w-xl">
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 px-3 py-2 bg-transparent outline-none"
                  value={headerPN}
                  onChange={(e) => setHeaderPN(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />

                <motion.button
                  onClick={handleSearch}
                  className="px-3 text-gray-600 hover:text-red-600"
                >
                  <FaSearch />
                </motion.button>
              </div>
            </div>

            {/* RIGHT SECTION - CORNER FIXED */}
            <div className="flex items-center gap-4">

              {/* Notifications */}
              <motion.button
                className="relative p-2 hover:bg-gray-100 rounded-full"
              >
                <FaBell className="text-xl" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </motion.button>

              {/* Membership */}
              <motion.button
                onClick={() => navigate("/membership")}
                className="px-3 py-1 border rounded-md bg-yellow-50 hover:bg-yellow-100 transition-colors"
              >
                <FaCrown className="inline mr-1 text-yellow-600" />
                {membershipType}
              </motion.button>

              {/* Wallet */}
              <motion.button
                onClick={() => navigate("/wallet")}
                className="px-3 py-1 border rounded-md hover:bg-gray-100 transition-colors"
              >
                <FaWallet className="inline mr-1" />
                Wallet
              </motion.button>

              {/* Cart */}
              <motion.button
                onClick={goToCart}
                className="relative p-2 hover:bg-gray-100 rounded-full"
              >
                <FaShoppingCart className="text-xl" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </motion.button>

              {/* Menu */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <IoReorderThreeOutline className="text-2xl" />
              </button>

            </div>
          </div>
        </div>
      </motion.header>

      {/* SIDEBAR */}
      <Sider isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;
