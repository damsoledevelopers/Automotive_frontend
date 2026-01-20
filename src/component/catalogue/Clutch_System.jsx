import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
import { generateCategoryWithProducts } from "../../utils/productDataGenerator";

const clutchCategoriesBase = [
  {
    id: 1,
    name: "Clutch Cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/502c1f3.jpg",
    link: "/catalog/part-p-8001",
  },
  {
    id: 2,
    name: "Clutch Control Switch",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/b9cb465.jpg",
    link: "/catalog/part-p-8002",
  },
  {
    id: 3,
    name: "Clutch Disc",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/ac626db.jpg",
    link: "/catalog/part-p-8003",
  },
  {
    id: 4,
    name: "Clutch Hose",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/84792a6.jpg",
    link: "/catalog/part-p-8004",
  },
  {
    id: 5,
    name: "Clutch Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/4f437d1.jpg",
    link: "/catalog/part-p-8005",
  },
  {
    id: 6,
    name: "Clutch Master Cylinder",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/57be749.jpg",
    link: "/catalog/part-p-8006",
  },
  {
    id: 7,
    name: "Clutch Master Cylinder Reservoir",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/54adae4.jpg",
    link: "/catalog/part-p-8007",
  },
  {
    id: 8,
    name: "Clutch Pedal",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/a20873c.jpg",
    link: "/catalog/part-p-8008",
  },
  {
    id: 9,
    name: "Clutch Pressure Plate",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/e698864.jpg",
    link: "/catalog/part-p-8009",
  },
  {
    id: 10,
    name: "Clutch Release Bearing",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/58e3bef.jpg",
    link: "/catalog/part-p-8010",
  },
  {
    id: 11,
    name: "Clutch Release Fork",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/9bf75c6.jpg",
    link: "/catalog/part-p-8011",
  },
  {
    id: 12,
    name: "Clutch Release Lever",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/fc67e26.jpg",
    link: "/catalog/part-p-8012",
  },
  {
    id: 13,
    name: "Clutch Release Shaft",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/cd5d53d.jpg",
    link: "/catalog/part-p-8013",
  },
  {
    id: 14,
    name: "Clutch Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/8a3d983.jpg",
    link: "/catalog/part-p-8014",
  },
  {
    id: 15,
    name: "Clutch Slave Cylinder",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/07421e2.jpg",
    link: "/catalog/part-p-8015",
  },
  {
    id: 16,
    name: "Clutch Sleeve",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/da833d4.jpg",
    link: "/catalog/part-p-8016",
  },
  {
    id: 17,
    name: "Flywheel",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/4b009f3.jpg",
    link: "/catalog/part-p-8017",
  },
  {
    id: 18,
    name: "Pilot Bearing",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/67a74ba.jpg",
    link: "/catalog/part-p-8018",
  },
];

// Generate categories with product data
const clutchCategories = generateCategoryWithProducts(clutchCategoriesBase, "Clutch", 1800);

export const Clutch_System = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(clutchCategories);
  const [expanded, setExpanded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);


  useEffect(() => {
    const filtered = clutchCategories.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  const handleSort = (value) => {
    setSortBy(value);
    let sorted = [...filteredProducts];
    if (value === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredProducts(sorted);
  };

  return (
    <div className="min-h-screen bg-white py-4 sm:py-6 md:py-8 w-full">
      <div className="w-full px-3 sm:px-4 md:px-6">
        <Breadcrumbs />

        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Clutch System
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore essential clutch system components — from clutch plates to
            release bearings — designed to ensure smooth power transmission and
            reliable vehicle performance.
          </p>
        </div>

        {/* Search + Filter */}
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Clutch System"
        />

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 my-4 sm:my-6 md:my-8">
              {filteredProducts.map((category, index) => (
                <Link
                  key={category.id || index}
                  to={category.link}
                  state={{ 
                    product: category.product,
                    category: { name: "Clutch", slug: "clutch" }
                  }}
                  className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
                >
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-cover rounded-md mb-2 mx-auto"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=' + category.name;
                    }}
                  />
                  <span className="text-gray-800 font-medium text-[9px] sm:text-[10px] md:text-xs lg:text-sm line-clamp-2 px-1">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* SEO Description Section */}
            <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-10 px-5 rounded-2xl shadow-sm max-w-6xl mx-auto">
              <div
                className={`transition-all duration-500 overflow-hidden ${expanded ? "max-h-[9999px]" : "max-h-[400px]"
                  }`}
              >
                <p className="mb-4 leading-relaxed">
                  The clutch system parts are the flywheel, clutch, and pressure plates.
                  When one of the kit is broken, there is no connection between the
                  transmission and motor and that means that a driver will not make a
                  move or if there are some minor issues it will not be able to move
                  properly. Anyway, if you manage to continue driving, you will cause
                  damage to other components including the gear. It is clear that you
                  should replace a damaged item and you can buy the replacement in
                  boodmo - India's largest online marketplace for car spare parts at an
                  affordable price.
                </p>

                <h2 className="text-xl font-bold mt-6 mb-2 text-red-600">About clutch system parts</h2>
                <p className="mb-4 leading-relaxed">
                  The key function of the clutch is to transmit engine power to the
                  transmission through the gear box. Thus, the required power reaches
                  the wheels and makes the car ride. When you release the clutch pedal,
                  an auto starts moving under power with the involved clutch. The motor
                  sends the power to the flywheel making it spin which spins the clutch
                  plate and that spins the driven shaft in its turn. This way the wheels
                  get the kick start and begin spinning too. If you press the clutch
                  pedal, you release the clutch plate from the flywheel disconnecting
                  the gearbox from the motor and that leads to smooth slowdown. If every
                  stage of this process is performed correctly, driving is possible
                  without stalling and other confusing reactions.
                </p>

                <p className="mb-4 leading-relaxed">
                  All three parts of the clutch take part in this process being pressed
                  together providing the required connection of the transmission and
                  engine. You just cannot do without this unit in the construction
                  because the engine spins all the time, while the transmission does
                  not. Having a worn out or broken clutch, car cannot move because the
                  transmission will not be engaged in driving and stay motionless.
                </p>

                <h3 className="text-lg font-bold mt-6 mb-2 text-red-600">
                  When should clutch system parts be replaced?
                </h3>
                <p className="mb-4 leading-relaxed">
                  Mostly the clutches are made to continue about 60,000 miles. This is
                  an average performance. There are cars equipped with clutches that are
                  designed to serve over 100,000 miles, which is not common. Experts
                  highly recommend against driving with a damaged clutch, because it is
                  dangerous and causes much more severe damages to the vehicle. There
                  are some signs to understand that there can be issues with your clutch
                  system:
                </p>

                <ol className="list-decimal list-inside space-y-2 mb-4">
                  <li>The gear is shifted with difficulty;</li>
                  <li>There is a squeaking noise when you press the clutch pedal.</li>
                  <li>There is vibration when you release the clutch pedal.</li>
                  <li>The clutch is slipping with further loss of acceleration.</li>
                  <li>The burning smell appears.</li>
                </ol>

                <h3 className="text-lg font-bold mt-6 mb-2 text-red-600">Our advantages</h3>
                <p className="mb-4 leading-relaxed">
                  Go to boodmo - India's largest online marketplace for car spare parts
                  to buy or to sell clutch car parts. This is the best environment over
                  the Internet where you can relax and enjoy easy shopping. We have done
                  our best to create a reliable, comprehensive, and convenient website
                  for any user. It is well-designed and delivers a range of tools for a
                  confident product choice. After simple registration you will get:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li>
                    Access to the widest assortment of auto spare parts marketed by
                    various suppliers.
                  </li>
                  <li>
                    A useful personal account where you can track orders, generate
                    statistics, and explore the market easily.
                  </li>
                  <li>
                    Three ways to search for parts — by VIN, part ID, or car model to
                    save time.
                  </li>
                  <li>
                    Continuously updated catalogue with accurate descriptions and fair
                    prices.
                  </li>
                  <li>
                    Many benefits like free delivery (under conditions), discounts, and
                    seller ratings.
                  </li>
                </ul>

                <p className="mb-4 leading-relaxed">
                  In other words, you will not only find the required auto clutch in
                  boodmo’s unmatched catalogue with the widest range of car spare parts,
                  but you will also buy it at an advantage. If you feel confused about
                  the functionality of the website, please contact our customer support
                  and get professional consultation.
                </p>
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition"
                >
                  {expanded ? "View Less" : "View More"}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clutch_System;
