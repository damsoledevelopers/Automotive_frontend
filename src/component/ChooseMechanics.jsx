import React, { useRef, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

// Mechanics data with coordinates
const mechanics = [
  {
    id: 1,
    name: "Rajesh Auto Service",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
    location: "Delhi",
    specialization: "Engine & Transmission",
    experience: "15+ Years",
    rating: 4.8,
    lat: 28.6139,
    lng: 77.2090
  },
  {
    id: 2,
    name: "Mumbai Car Care",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    location: "Mumbai",
    specialization: "AC & Electrical",
    experience: "12+ Years",
    rating: 4.9,
    lat: 19.0760,
    lng: 72.8777
  },
  {
    id: 3,
    name: "Bangalore Expert Mechanics",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    location: "Bangalore",
    specialization: "Brake & Suspension",
    experience: "18+ Years",
    rating: 4.7,
    lat: 12.9716,
    lng: 77.5946
  },
  {
    id: 4,
    name: "Chennai Auto Solutions",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    location: "Chennai",
    specialization: "General Service",
    experience: "10+ Years",
    rating: 4.6,
    lat: 13.0827,
    lng: 80.2707
  },
  {
    id: 5,
    name: "Kolkata Mobile Mechanic",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
    location: "Kolkata",
    specialization: "On-Site Service",
    experience: "8+ Years",
    rating: 4.5,
    lat: 22.5726,
    lng: 88.3639
  },
  {
    id: 6,
    name: "Hyderabad Car Doctor",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    location: "Hyderabad",
    specialization: "Diagnostics & Repair",
    experience: "14+ Years",
    rating: 4.8,
    lat: 17.3850,
    lng: 78.4867
  },
  {
    id: 7,
    name: "Pune Auto Experts",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
    location: "Pune",
    specialization: "Performance Tuning",
    experience: "16+ Years",
    rating: 4.9,
    lat: 18.5204,
    lng: 73.8567
  },
  {
    id: 8,
    name: "Ahmedabad Car Masters",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    location: "Ahmedabad",
    specialization: "Body & Paint",
    experience: "13+ Years",
    rating: 4.7,
    lat: 23.0225,
    lng: 72.5714
  }
];

// Default center (Delhi)
const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090
};

const mapOptions = {
  zoom: 5,
  center: defaultCenter,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ]
};

export default function ChooseMechanics() {
  const swiperRef = useRef(null);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  // Google Maps API Key - Replace with your actual API key or use environment variable
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";

  // Group mechanics into chunks of 4 (2 rows x 2 columns) for mobile
  const mobileMechanicsChunks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < mechanics.length; i += 4) {
      chunks.push(mechanics.slice(i, i + 4));
    }
    return chunks;
  }, []);

  const handleMarkerClick = (mechanic) => {
    setSelectedMechanic(mechanic);
  };

  const handleMapLoad = () => {
    setMapLoaded(true);
    setMapError(false);
  };

  const handleMapError = () => {
    setMapError(true);
    setMapLoaded(false);
  };

  const handleLoadScriptError = () => {
    setMapError(true);
  };

  // Create custom marker icon for mechanics
  const createMarkerIcon = () => {
    if (typeof window !== 'undefined' && window.google && window.google.maps) {
      return {
        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
          <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0C9.507 0 1 8.507 1 19c0 13.5 19 31 19 31s19-17.5 19-31C39 8.507 30.493 0 20 0z" fill="#2563eb"/>
            <circle cx="20" cy="19" r="8" fill="white"/>
            <text x="20" y="24" font-size="16" text-anchor="middle" fill="#2563eb">🔧</text>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(40, 50),
        anchor: new window.google.maps.Point(20, 50)
      };
    }
    return undefined; // Use default marker if Google Maps not loaded
  };

  return (
    <section className="relative bg-white py-4 sm:py-6 md:py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        {/* Red Accent Line */}
        <div className="w-16 h-0.5 bg-red-600 mb-4 md:mb-5"></div>

        {/* Header Section */}
        <div className="mb-5 md:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
            Choose the Mechanic Near You
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">
            Book a Service Appointment Today!
          </p>
        </div>

        {/* Main Content: Carousel + Map */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-5 lg:gap-6">
          {/* Left Side - Mechanics Carousel */}
          <div className="w-full lg:w-2/3 relative">
            {/* Mobile Map Button - Right Side */}
            <motion.button
              onClick={() => setShowMapModal(true)}
              className="lg:hidden absolute right-2 top-2 z-20 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaMapMarkerAlt className="text-base" />
              <span className="text-xs sm:text-sm">View Map</span>
            </motion.button>

            <div className="relative">
              {/* Mobile View: 2 rows x 2 columns (4 items) Auto-scrolling Carousel */}
              <div className="block md:hidden">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={8}
                  slidesPerView={1}
                  loop={mobileMechanicsChunks.length > 1}
                  speed={400}
                  autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                  }}
                  className="mechanic-swiper-mobile"
                >
                  {mobileMechanicsChunks.map((chunk, chunkIndex) => (
                    <SwiperSlide key={chunkIndex}>
                      <div className="grid grid-cols-2 grid-rows-2 gap-3 px-2">
                        {chunk.map((mechanic) => (
                          <motion.div
                            key={mechanic.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative h-[120px] sm:h-[140px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                          >
                            <img
                              src={mechanic.image}
                              alt={mechanic.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/800x450?text=' + mechanic.name;
                              }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-2">
                              <h3 className="text-white text-xs font-bold mb-0.5 truncate">
                                {mechanic.name}
                              </h3>
                              <p className="text-white/90 text-[10px] mb-0.5 truncate">
                                {mechanic.location}
                              </p>
                              <div className="flex items-center gap-1 text-[9px]">
                                <span className="text-white/90 truncate">{mechanic.specialization}</span>
                                <span className="text-white/70">•</span>
                                <div className="flex items-center gap-0.5">
                                  <svg className="w-2.5 h-2.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                  </svg>
                                  <span className="text-white/90 font-semibold">{mechanic.rating}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Desktop View: Swiper Container */}
              <div className="hidden md:block">
                <Swiper
                  modules={[Autoplay, Navigation]}
                  spaceBetween={12}
                  slidesPerView={1}
                  loop={true}
                  speed={800}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                  }}
                  navigation={{
                    prevEl: '.mechanic-prev',
                    nextEl: '.mechanic-next',
                  }}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    if (swiper.autoplay) {
                      swiper.autoplay.start();
                    }
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 12
                    },
                    1024: {
                      slidesPerView: 2,
                      spaceBetween: 14
                    },
                    1280: {
                      slidesPerView: 2,
                      spaceBetween: 16
                    }
                  }}
                  className="mechanic-swiper"
                >
                  {mechanics.map((mechanic) => (
                    <SwiperSlide key={mechanic.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative h-[200px] sm:h-[220px] md:h-[250px] lg:h-[280px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <img
                          src={mechanic.image}
                          alt={mechanic.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/800x450?text=' + mechanic.name;
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-2 md:p-3">
                          <h3 className="text-white text-sm md:text-base font-bold mb-0.5">
                            {mechanic.name}
                          </h3>
                          <p className="text-white/90 text-xs md:text-sm mb-1">
                            {mechanic.location}
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-white/90">{mechanic.specialization}</span>
                            <span className="text-white/70">•</span>
                            <span className="text-white/90">{mechanic.experience}</span>
                            <span className="text-white/70">•</span>
                            <div className="flex items-center gap-0.5">
                              <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                              <span className="text-white/90 font-semibold">{mechanic.rating}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Navigation Arrows */}
              <button
                className="mechanic-prev absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="Previous slide"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="mechanic-next absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="Next slide"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side - Google Map */}
          <div className="w-full lg:w-1/3 relative">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[200px] sm:h-[220px] md:h-[250px] lg:h-[280px] rounded-lg overflow-hidden shadow-md border border-gray-200 bg-gray-50 hidden lg:block"
            >
              {!mapError && googleMapsApiKey && googleMapsApiKey !== "YOUR_GOOGLE_MAPS_API_KEY" ? (
                <LoadScript
                  googleMapsApiKey={googleMapsApiKey}
                  onLoad={handleMapLoad}
                  onError={handleLoadScriptError}
                >
                  <GoogleMap
                    mapContainerStyle={{
                      width: "100%",
                      height: "100%"
                    }}
                    options={mapOptions}
                    onLoad={handleMapLoad}
                    onError={handleMapError}
                    className="w-full h-full rounded-lg"
                  >
                    {mapLoaded && mechanics.map((mechanic) => (
                      <Marker
                        key={mechanic.id}
                        position={{ lat: mechanic.lat, lng: mechanic.lng }}
                        onClick={() => handleMarkerClick(mechanic)}
                        icon={createMarkerIcon()}
                      />
                    ))}
                    
                    {selectedMechanic && (
                      <InfoWindow
                        position={{ lat: selectedMechanic.lat, lng: selectedMechanic.lng }}
                        onCloseClick={() => setSelectedMechanic(null)}
                      >
                        <div className="p-3 min-w-[200px]">
                          <h3 className="font-bold text-sm text-gray-900 mb-1.5">
                            {selectedMechanic.name}
                          </h3>
                          <p className="text-xs text-gray-600 mb-1">
                            📍 {selectedMechanic.location}
                          </p>
                          <p className="text-xs text-gray-600 mb-1">
                            🔧 {selectedMechanic.specialization}
                          </p>
                          <div className="flex items-center gap-1 mb-3">
                            <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                            <span className="text-xs text-gray-600 font-semibold">{selectedMechanic.rating}</span>
                            <span className="text-xs text-gray-500">• {selectedMechanic.experience}</span>
                          </div>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${selectedMechanic.lat},${selectedMechanic.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                          >
                            View on Google Maps
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                </LoadScript>
              ) : (
                // Fallback: Use Google Maps iframe with search query (works without API key)
                <div className="w-full h-full relative bg-gray-100 rounded-lg flex items-center justify-center">
                  <iframe
                    width="100%"
                    height="100%"
                    className="rounded-lg border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=auto+mechanic+car+repair+near+me&output=embed&zoom=5&center=${defaultCenter.lat},${defaultCenter.lng}`}
                    title="Mechanic Locations Map"
                  />
                  {/* Clickable mechanics list overlay */}
                  <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-2 max-h-[60%] overflow-y-auto z-20 hidden lg:block">
                    <p className="text-xs font-semibold text-gray-800 mb-2 px-2">Mechanics:</p>
                    <div className="space-y-1">
                      {mechanics.map((mechanic) => (
                        <button
                          key={mechanic.id}
                          onClick={() => {
                            window.open(`https://www.google.com/maps/search/?api=1&query=${mechanic.lat},${mechanic.lng}`, '_blank');
                          }}
                          className="w-full text-left px-2 py-1.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors flex items-center gap-2"
                        >
                          <svg className="w-3 h-3 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="truncate">{mechanic.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Overlay Text */}
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-md shadow-sm z-10 border border-gray-200/50">
                <p className="text-xs md:text-sm font-semibold text-gray-800 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {mechanics.length} Mechanics
                </p>
              </div>

              {/* LOCATE US Button */}
              <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-10">
                <button 
                  onClick={() => {
                    const url = `https://www.google.com/maps/search/?api=1&query=auto+mechanic+car+repair+near+me`;
                    window.open(url, '_blank');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-xs md:text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  FIND MECHANIC
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Map Modal */}
      <AnimatePresence>
        {showMapModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setShowMapModal(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-white text-xl" />
                  <h3 className="text-white font-bold text-lg">Mechanic Locations</h3>
                </div>
                <button
                  onClick={() => setShowMapModal(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Map Content */}
              <div className="h-[70vh] relative">
                {!mapError && googleMapsApiKey && googleMapsApiKey !== "YOUR_GOOGLE_MAPS_API_KEY" ? (
                  <LoadScript
                    googleMapsApiKey={googleMapsApiKey}
                    onLoad={handleMapLoad}
                    onError={handleLoadScriptError}
                  >
                    <GoogleMap
                      mapContainerStyle={{
                        width: "100%",
                        height: "100%"
                      }}
                      options={mapOptions}
                      onLoad={handleMapLoad}
                      onError={handleMapError}
                      className="w-full h-full rounded-lg"
                    >
                      {mapLoaded && mechanics.map((mechanic) => (
                        <Marker
                          key={mechanic.id}
                          position={{ lat: mechanic.lat, lng: mechanic.lng }}
                          onClick={() => handleMarkerClick(mechanic)}
                          icon={createMarkerIcon()}
                        />
                      ))}
                      
                      {selectedMechanic && (
                        <InfoWindow
                          position={{ lat: selectedMechanic.lat, lng: selectedMechanic.lng }}
                          onCloseClick={() => setSelectedMechanic(null)}
                        >
                          <div className="p-3 min-w-[200px]">
                            <h3 className="font-bold text-sm text-gray-900 mb-1.5">
                              {selectedMechanic.name}
                            </h3>
                            <p className="text-xs text-gray-600 mb-1">
                              📍 {selectedMechanic.location}
                            </p>
                            <p className="text-xs text-gray-600 mb-1">
                              🔧 {selectedMechanic.specialization}
                            </p>
                            <div className="flex items-center gap-1 mb-3">
                              <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                              <span className="text-xs text-gray-600 font-semibold">{selectedMechanic.rating}</span>
                              <span className="text-xs text-gray-500">• {selectedMechanic.experience}</span>
                            </div>
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${selectedMechanic.lat},${selectedMechanic.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                            >
                              View on Google Maps
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </a>
                          </div>
                        </InfoWindow>
                      )}
                    </GoogleMap>
                  </LoadScript>
                ) : (
                  <div className="w-full h-full relative bg-gray-100">
                    <iframe
                      width="100%"
                      height="100%"
                      className="border-0"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=auto+mechanic+car+repair+near+me&output=embed&zoom=5&center=${defaultCenter.lat},${defaultCenter.lng}`}
                      title="Mechanic Locations Map"
                    />
                  </div>
                )}

                {/* FIND MECHANIC Button */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                  <button 
                    onClick={() => {
                      const url = `https://www.google.com/maps/search/?api=1&query=auto+mechanic+car+repair+near+me`;
                      window.open(url, '_blank');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm flex items-center gap-2"
                  >
                    <FaMapMarkerAlt className="text-lg" />
                    FIND MECHANIC
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Styles for Swiper */}
      <style>{`
        .mechanic-swiper .swiper-slide {
          height: auto;
        }
        .mechanic-swiper-mobile .swiper-slide {
          height: auto;
        }
        .mechanic-prev,
        .mechanic-next {
          display: flex;
        }
        .mechanic-prev.swiper-button-disabled,
        .mechanic-next.swiper-button-disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}

