import React, { useRef, useState, useCallback, useMemo, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { categoryService } from "../services/apiService";
import "swiper/css";
import "swiper/css/navigation";

// Helper function to map category name to slug and image
const mapCategoryToDisplay = (categoryName) => {
  // Dynamic mapping only - no hardcoded data
  const slug = categoryName.toLowerCase().replace(/\s+/g, '_').replace(/&/g, '').replace(/\//g, '');
  
  return {
    title: categoryName,
    href: `/catalog/${slug}/`,
    img: `https://via.placeholder.com/80x80/9ca3af/ffffff?text=${categoryName.substring(0, 2).toUpperCase()}`
  };
};

export let categories = [];

// Category Card Component
const CategoryCard = React.memo(({ category, index, isGrid = false }) => {
  const handleImageError = useCallback((e) => {
    e.target.src = `https://via.placeholder.com/80x80?text=${category.title.substring(0, 2)}`;
  }, [category.title]);

  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: isGrid ? index * 0.03 : index * 0.05 }
  };

  return (
    <motion.div
      {...animationProps}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group"
    >
      <Link 
        to={category.href} 
        className="flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 rounded-md bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 w-full h-full"
      >
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 mb-3 flex items-center justify-center">
          <img 
            src={category.img} 
            alt={category.title} 
            className="w-full h-full object-contain transition-transform duration-300" 
            onError={handleImageError}
            loading="lazy"
          />
        </div>
        <span className="text-center font-medium text-gray-700 text-xs sm:text-sm">
          {category.title}
        </span>
      </Link>
    </motion.div>
  );
});

CategoryCard.displayName = 'CategoryCard';

export default function SearchByCategory() {
  const swiperRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isCategoryPage = location.pathname === '/category';
  
  // Show all categories by default on /category route
  const [showAll, setShowAll] = useState(isCategoryPage);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const result = await categoryService.getAllActiveCategoriesFlat();
        const categoriesData = result.categories || result || [];
        
        // Map backend categories to display format
        const mappedCategories = categoriesData
          .map(cat => {
            const mapped = mapCategoryToDisplay(cat.name || cat);
            // Use category icon from backend if available, otherwise use mapped image
            if (cat && cat.icon) {
              mapped.img = cat.icon;
            }
            return mapped;
          })
          .filter(cat => cat && cat.title);
        
        if (mappedCategories.length > 0) {
          setCategories(mappedCategories);
        } else {
          // No categories found
          setCategories([]);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };
    
    fetchCategories();
  }, []);

  useEffect(() => {
    // Update showAll state when route changes
    setShowAll(isCategoryPage);
  }, [isCategoryPage]);

  const handleShowAll = useCallback(() => {
    setShowAll(true);
  }, []);

  // Group categories into chunks of 12 (3 rows x 4 columns) for mobile
  const mobileCategoriesChunks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < categories.length; i += 12) {
      chunks.push(categories.slice(i, i + 12));
    }
    return chunks;
  }, []);

  // Mobile Swiper Config (3 rows x 4 columns = 12 items per slide, no autoplay)
  const mobileSwiperConfig = useMemo(() => ({
    modules: [],
    spaceBetween: 0,
    slidesPerView: 1,
    loop: false,
    speed: 400,
    allowTouchMove: true
  }), []);

  // Desktop Swiper Config
  const swiperConfig = useMemo(() => ({
    modules: [Autoplay, Navigation],
    spaceBetween: 12,
    slidesPerView: 3,
    loop: true,
    speed: 400,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    navigation: {
      prevEl: '.category-prev',
      nextEl: '.category-next',
    },
    onSwiper: (swiper) => {
      swiperRef.current = swiper;
      if (swiper.autoplay) {
        swiper.autoplay.start();
      }
    },
    breakpoints: {
      640: {
        slidesPerView: 4,
        spaceBetween: 12
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 14
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 16
      },
      1280: {
        slidesPerView: 6,
        spaceBetween: 16
      }
    }
  }), []);

  return (
    <section className={`relative bg-gray-50 ${isCategoryPage ? 'pt-20 md:pt-24 pb-8 md:pb-12' : 'py-6 sm:py-8 md:py-10'} overflow-hidden`}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="mb-4 sm:mb-5 md:mb-6 flex flex-row items-center justify-between gap-3">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              {isCategoryPage ? 'All Categories' : 'Search by'} <span className="text-blue-600">{isCategoryPage ? '' : 'Spares Catalogue'}</span>
            </h2>
            {isCategoryPage && (
              <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium mt-2">
                Browse through all available product categories
              </p>
            )}
          </div>
          {!showAll && !isCategoryPage && (
            <Link
              to="/category"
              className="text-xs sm:text-sm text-blue-600 hover:underline font-semibold transition-colors whitespace-nowrap flex-shrink-0"
              aria-label="View All Categories"
            >
              VIEW ALL
            </Link>
          )}
        </div>

        {/* Categories Display - Grid for Mobile, Swiper for Desktop */}
        {loadingCategories ? (
          <div className="flex justify-center items-center py-12">
            <FaSpinner className="animate-spin text-4xl text-blue-600" />
          </div>
        ) : showAll || isCategoryPage ? (
          /* All Categories Grid - 4 columns mobile, 6 columns desktop */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
            {categories.map((cat, index) => (
              <CategoryCard 
                key={cat.title} 
                category={cat} 
                index={index} 
                isGrid={true}
              />
            ))}
          </div>
        ) : (
          <>
            {/* Mobile View: Horizontal Scrollable Swiper */}
            <div className="block md:hidden">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={12}
                slidesPerView={3}
                loop={true}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                speed={400}
                className="w-full"
                breakpoints={{
                  320: { slidesPerView: 3, spaceBetween: 12 },
                  640: { slidesPerView: 4, spaceBetween: 12 },
                }}
              >
                {categories.map((cat, index) => (
                  <SwiperSlide key={cat.title}>
                    <CategoryCard 
                      category={cat} 
                      index={index} 
                      isGrid={false}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            
            {/* Desktop View: Swiper Container */}
            <div className="hidden md:block relative">
              <Swiper {...swiperConfig} className="category-swiper">
                {categories.map((cat, index) => (
                  <SwiperSlide key={cat.title}>
                    <CategoryCard 
                      category={cat} 
                      index={index} 
                      isGrid={false}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Arrows */}
              <button
                className="category-prev absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="Previous slide"
                type="button"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="category-next absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="Next slide"
                type="button"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Custom Styles */}
      <style>{`
        .category-swiper .swiper-slide {
          height: auto;
        }
        .category-prev,
        .category-next {
          display: flex;
        }
        .category-prev.swiper-button-disabled,
        .category-next.swiper-button-disabled {
          opacity: 0.35;
          cursor: not-allowed;
          transform: scale(1);
        }
        .category-image {
          background: transparent;
        }
        .category-image:hover {
          filter: brightness(1.05);
        }
      `}</style>

    </section>
  );
}
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Link } from "react-router-dom";

// // Category data with real product images from boodmo.com
// const categories = [
//   { 
//     title: "AIR CONDITIONING", 
//     href: "/catalog/air_conditioning/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/db9dad4.jpg" // Receiver Drier
//   },
//   { 
//     title: "BEARINGS", 
//     href: "/catalog/bearings/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/40e95ca.jpg" // Big End Bearing
//   },
//   { 
//     title: "BELTS CHAINS ROLLERS", 
//     href: "/catalog/drive_belts/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/ddbeb81.jpg" // Belt
//   },
//   { 
//     title: "BODY PARTS", 
//     href: "/catalog/body/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/40e6a4c.jpg" // Bumper
//   },
//   { 
//     title: "BRAKE SYSTEM", 
//     href: "/catalog/brakes/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/5301830.jpg" // Brake Pads
//   },
//   { 
//     title: "CAR ACCESSORIES", 
//     href: "/catalog/car_accessories/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/ab143a7.webp" // Body Accessories
//   },
//   { 
//     title: "CLUTCH SYSTEM", 
//     href: "/catalog/clutch/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/e8cb288.jpg" // Clutch
//   },
//   { 
//     title: "CONTROL CABLES", 
//     href: "/catalog/control_cables/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/7455b44.jpg" // Cable Strap
//   },
//   { 
//     title: "ELECTRICAL COMPONENTS", 
//     href: "/catalog/electric_components/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/d5b3ac7.jpg" // Horn
//   },
//   { 
//     title: "ENGINE", 
//     href: "/catalog/engine/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/8fea232.jpg" // Air Supply
//   },
//   { 
//     title: "ENGINE COOLING", 
//     href: "/catalog/cooling_system/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/e215fcc.jpg" // Radiator Mounting
//   },
//   { 
//     title: "EXHAUST SYSTEM", 
//     href: "/catalog/exhaust/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/d1e33d6.jpg" // Cooler EGR
//   },
//   { 
//     title: "FILTERS", 
//     href: "/catalog/filters/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/a16bbf6.jpg" // Air Filter
//   },
//   { 
//     title: "FUEL SUPPLY SYSTEM", 
//     href: "/catalog/fuelsystem/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/49ed220.jpg" // Fuel Tank
//   },
//   { 
//     title: "GASKETS & SEALS", 
//     href: "/catalog/Gasket_SealingRings/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/14b8753.jpg" // O-Ring
//   },
//   { 
//     title: "INTERIOR & COMFORT", 
//     href: "/catalog/interior_comfort/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/05a2b84.jpg" // Interior Mirror
//   },
//   { 
//     title: "LIGHTING", 
//     href: "/catalog/lighting/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/53380d3.webp" // Light
//   },
//   { 
//     title: "MAINTENANCE PARTS", 
//     href: "/catalog/maintenance_service_parts/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/4614ecf.webp" // Engine Oil
//   },
//   { 
//     title: "OILS & FLUIDS", 
//     href: "/catalog/oilsfluids/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/4614ecf.webp" // Engine Oil
//   },
//   { 
//     title: "PIPES & HOSES", 
//     href: "/catalog/pipes_hoses/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/e0b2a63.jpg" // Sunroof Drain Hose
//   },
//   { 
//     title: "SENSORS & CONTROL", 
//     href: "/catalog/sensors_control_units/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/2676bd2.jpg" // Control Unit
//   },
//   { 
//     title: "STEERING", 
//     href: "/catalog/steering/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/15cfbae.svg" // Steering (keeping SVG as fallback)
//   },
//   { 
//     title: "SUSPENSION & ARMS", 
//     href: "/catalog/suspension/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/f26073e.jpg" // Shock Absorber
//   },
//   { 
//     title: "TOWBAR PARTS", 
//     href: "/catalog/towbar/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/98b48d2.jpg" // Towhook Cover
//   },
//   { 
//     title: "TRANSMISSION", 
//     href: "/catalog/transmission/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/21ce121.jpg" // Automatic Transmission Filter
//   },
//   { 
//     title: "TRIMS", 
//     href: "/catalog/trims/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/beccd06.jpg" // Bumper Trim
//   },
//   { 
//     title: "UNIVERSAL", 
//     href: "/catalog/universal/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/af8d099.jpg" // Bolt
//   },
//   { 
//     title: "WHEELS", 
//     href: "/catalog/wheels/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/430177a.jpg" // Spare Wheel Carrier
//   },
//   { 
//     title: "WINDScreen CLEANING", 
//     href: "/catalog/windscreen_cleaning_system/", 
//     bgImg: "https://boodmo.com/media/cache/catalog_image/images/categories/1053d82.jpg" // Wiper Blade
//   },
// ];

// export default function SearchByCategory() {
//   const swiperRef = useRef(null);
//   const [activeDot, setActiveDot] = useState(0);

//   useEffect(() => {
//     // Initialize first dot as active
//     const dots = document.querySelectorAll('.category-dot');
//     if (dots.length > 0) {
//       dots[0].classList.add('bg-red-600');
//       dots[0].classList.remove('bg-gray-300');
//     }
//   }, []);

//   const updateDots = (realIndex) => {
//     const visibleSlides = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
//     const dotsToShow = Math.min(visibleSlides, 3);
//     const activeIndex = realIndex % dotsToShow;
//     setActiveDot(activeIndex);
    
//     const dots = document.querySelectorAll('.category-dot');
//     dots.forEach((dot, index) => {
//       if (index < dotsToShow) {
//         dot.style.display = 'block';
//         if (index === activeIndex) {
//           dot.classList.add('bg-red-600');
//           dot.classList.remove('bg-gray-300');
//         } else {
//           dot.classList.remove('bg-red-600');
//           dot.classList.add('bg-gray-300');
//         }
//       } else {
//         dot.style.display = 'none';
//       }
//     });
//   };

//   return (
//     <section className="relative bg-white py-8 md:py-12 lg:py-16 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
//           {/* Left Content Area */}
//           <div className="w-full lg:w-2/5 relative">
//             {/* Vertical CATEGORY Label */}
//             {/* <div className="hidden lg:flex absolute -left-8 top-0 bottom-0 items-center">
//               <span className="text-gray-300 text-6xl font-bold uppercase tracking-wider writing-vertical-rl transform rotate-180">
//                 CATEGORY
//               </span>
//             </div> */}

//             {/* Welcome Content */}
//             <div className="pl-0 lg:pl-12">
//               <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase mb-4 md:mb-6 leading-tight">
//                 WELCOME TO <span className="text-red-600">AUTOPARTS</span>
//               </h2>
//               <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//               </p>

//               {/* Carousel Indicators & Navigation */}
//               <div className="flex items-center gap-4">
//                 {/* Custom Pagination Dots */}
//                 <div className="flex gap-2">
//                   {[0, 1, 2].map((index) => (
//                     <div
//                       key={index}
//                       className="w-2 h-2 rounded-full bg-gray-300 category-dot"
//                       data-index={index}
//                     />
//                   ))}
//                 </div>

//                 {/* Navigation Arrows */}
//                 <div className="flex gap-2 ml-auto">
//                   <button
//                     onClick={() => swiperRef.current?.slidePrev()}
//                     className="w-10 h-10 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center hover:border-red-600 hover:text-red-600 transition-all duration-300"
//                     aria-label="Previous slide"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                     </svg>
//                   </button>
//                   <button
//                     onClick={() => swiperRef.current?.slideNext()}
//                     className="w-10 h-10 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center hover:border-red-600 hover:text-red-600 transition-all duration-300"
//                     aria-label="Next slide"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Content Area - Swiper Carousel */}
//           <div className="w-full lg:w-3/5">
//             <Swiper
//               modules={[Autoplay, Navigation, Pagination]}
//               spaceBetween={20}
//               slidesPerView={1}
//               loop={true}
//               autoplay={{
//                 delay: 4000,
//                 disableOnInteraction: false,
//                 pauseOnMouseEnter: true
//               }}
//               onSwiper={(swiper) => {
//                 swiperRef.current = swiper;
//               }}
//               onSlideChange={(swiper) => {
//                 updateDots(swiper.realIndex);
//               }}
//               breakpoints={{
//                 640: {
//                   slidesPerView: 2,
//                   spaceBetween: 20
//                 },
//                 1024: {
//                   slidesPerView: 3,
//                   spaceBetween: 20
//                 }
//               }}
//               className="category-swiper"
//             >
//               {categories.map((category, index) => (
//                 <SwiperSlide key={index}>
//                   <Link
//                     to={category.href}
//                     className="group block relative h-56 md:h-64 lg:h-72 rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200 hover:border-red-500"
//                   >
//                     {/* Product Image */}
//                     <div className="absolute inset-0 flex items-center justify-center p-4 bg-transparent group-hover:bg-gray-50 transition-colors duration-300">
//                       <img
//                         src={category.bgImg}
//                         alt={category.title}
//                         className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
//                         loading="lazy"
//                       />
//                     </div>

//                     {/* Overlay Gradient - Only at bottom */}
//                     <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                     {/* Category Title Overlay */}
//                     <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 lg:p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
//                       <h3 className="text-gray-800 group-hover:text-white text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide drop-shadow-lg transition-colors duration-300">
//                         {category.title}
//                       </h3>
//                     </div>
//                   </Link>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       </div>

//       {/* Custom Styles */}
//       <style>{`
//         .writing-vertical-rl {
//           writing-mode: vertical-rl;
//         }
//         .category-swiper .swiper-slide {
//           height: auto;
//         }
//         .category-dot {
//           transition: all 0.3s ease;
//         }
//       `}</style>
//     </section>
//   );
// }



