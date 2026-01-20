import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
import { generateCategoryWithProducts } from "../../utils/productDataGenerator";

const Engine_Cooling_System = () => {
  const coolingCategoriesBase = [
    {
      id: 1,
      name: "Coolant",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/12028d8.jpg",
      link: "/catalog/part-p-11001",
    },
    {
      id: 2,
      name: "Coolant Control Valve",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/c8e0d54.jpg",
      link: "/catalog/part-p-11002",
    },
    {
      id: 3,
      name: "Coolant Flange",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/ba3a808.jpg",
      link: "/catalog/part-p-11003",
    },
    {
      id: 4,
      name: "Coolant Pipe Seal",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/ae28059.jpg",
      link: "/catalog/part-p-11004",
    },
    {
      id: 5,
      name: "Coolant Tank",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/c5c03ed.jpg",
      link: "/catalog/part-p-11005",
    },
    {
      id: 6,
      name: "Coolant Tank Cap",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/43dd618.jpg",
      link: "/catalog/part-p-11006",
    },
    {
      id: 7,
      name: "Coolant Temperature Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/3da6532.jpg",
      link: "/catalog/part-p-11007",
    },
    {
      id: 8,
      name: "Cooling Fan",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/4bd53a9.jpg",
      link: "/catalog/part-p-11008",
    },
    {
      id: 9,
      name: "Fan Clutch",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/06f1747.jpg",
      link: "/catalog/part-p-11009",
    },
    {
      id: 10,
      name: "Radiator",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/a6892f8.jpg",
      link: "/catalog/part-p-11010",
    },
    {
      id: 11,
      name: "Radiator Cap",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/f6152e4.jpg",
      link: "/catalog/part-p-11011",
    },
    {
      id: 12,
      name: "Radiator Fan Cowling",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/18fe9e4.jpg",
      link: "/catalog/part-p-11012",
    },
    {
      id: 13,
      name: "Radiator Fan Motor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/5bcc9b3.jpg",
      link: "/catalog/part-p-11013",
    },
    {
      id: 14,
      name: "Radiator Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/d818dd1.webp",
      link: "/catalog/part-p-11014",
    },
    {
      id: 15,
      name: "Radiator Hose",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/f02e68a.jpg",
      link: "/catalog/part-p-11015",
    },
    {
      id: 16,
      name: "Radiator Mounting",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/e215fcc.jpg",
      link: "/catalog/part-p-11016",
    },
    {
      id: 17,
      name: "Thermostat",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/0ec43c0.jpg",
      link: "/catalog/part-p-11017",
    },
    {
      id: 18,
      name: "Thermostat Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/872d6e0.jpg",
      link: "/catalog/part-p-11018",
    },
    {
      id: 19,
      name: "Water Pump",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/5c2d85e.jpg",
      link: "/catalog/part-p-11019",
    },
    {
      id: 20,
      name: "Water Pump Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/9807081.jpg",
      link: "/catalog/part-p-11020",
    },
  ];

  // Generate categories with product data
  const coolingCategories = generateCategoryWithProducts(coolingCategoriesBase, "Engine Cooling System", 1800);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(coolingCategories);
  const [showMore, setShowMore] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  

  useEffect(() => {
    const filtered = coolingCategories.filter((item) =>
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

        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Engine Cooling System Parts
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore our wide range of engine cooling system parts designed to keep your vehicle running smoothly and efficiently.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Engine_Cooling_System"
        />

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          <div className="flex-1">
            {/* ✅ Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 my-4 sm:my-6 md:my-8">
              {filteredProducts.map((category, index) => (
                <Link
                  key={category.id || index}
                  to={category.link}
                  state={{ 
                    product: category.product,
                    category: { name: "Engine Cooling System", slug: "cooling_system" }
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

            {/* ✅ SEO Section */}
            <section className="bg-white text-gray-800 py-10 px-6 rounded-2xl shadow-sm mt-10">
              <div
                className={`transition-all duration-500 ease-in-out ${showMore ? "max-h-full" : "max-h-[600px] overflow-hidden"
                  }`}
              >
                <p className="mb-4 leading-relaxed">
                  Modern trends have brought the auto parts industry online. Boodmo offers a
                  wide selection of engine cooling system parts along with excellent service
                  and a vast catalog that will impress you with its variety. Whether you’re
                  looking for parts to maintain or repair your car’s cooling system, you’ll
                  find suitable options among nearly 210,000 listings.
                </p>

                <h2 className="text-2xl font-bold text-red-700 mt-6 mb-2">
                  About Engine Cooling System Parts
                </h2>
                <p className="leading-relaxed mb-4">
                  The cooling system plays a crucial role in maintaining your engine’s
                  temperature, ensuring optimal performance and preventing overheating. It
                  regulates the engine’s thermal balance by removing excess heat generated
                  during combustion. Without a properly functioning cooling system, your
                  engine may deform, oil may lose its protective qualities, and components
                  may wear out prematurely.
                </p>

                <h2 className="text-2xl font-bold text-red-700 mt-6 mb-2">
                  Common Cooling System Parts
                </h2>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                  <li>Water temperature sensors</li>
                  <li>Thermal switches</li>
                  <li>Radiator hose sets</li>
                  <li>Rubber hoses</li>
                  <li>Cooling liquids</li>
                  <li>Intercoolers</li>
                  <li>Water pumps and more</li>
                </ul>

                <p className="leading-relaxed mt-4">
                  The most vital part of a liquid engine cooling system is the water pump,
                  which circulates coolant (ethylene glycol-based) around the engine,
                  radiator, thermostat housing, and heater core, ensuring a consistent
                  temperature throughout.
                </p>

                <h2 className="text-2xl font-bold text-red-700 mt-6 mb-2">
                  Price and Quality Guarantee
                </h2>
                <p className="leading-relaxed mb-4">
                  The performance of your vehicle heavily depends on the quality of the
                  replacement parts. At Boodmo, you can confidently purchase original and
                  certified components. While OEM parts dominate the catalog, aftermarket
                  options also come with certifications and long service guarantees —
                  offering both reliability and affordability.
                </p>

                <h3 className="text-xl font-semibold text-red-700 mt-8 mb-2">
                  Engine Cooling System Parts: How Much Does It Cost?
                </h3>
                <p className="leading-relaxed mb-4">
                  With thousands of options available, prices at Boodmo vary widely to suit
                  every budget. Enjoy competitive pricing, customer loyalty benefits, and
                  discounts ranging from 5% to 40%. Don’t wait — explore the range, find the
                  right parts, and keep your car performing at its best!
                </p>
              </div>

              {/* Toggle Button */}
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-md"
                >
                  {showMore ? "View Less" : "View More"}
                </button>
              </div>
            </section>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Engine_Cooling_System;
