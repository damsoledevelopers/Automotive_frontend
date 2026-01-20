import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
import { generateCategoryWithProducts } from "../../utils/productDataGenerator";

const AirConditioning = () => {
  const airConditioningCategoriesBase = [
    {
      id: 1,
      name: "AC Compressor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/66617d2.jpg",
      link: "/catalog/part-p-3001",
    },
    {
      id: 2,
      name: "AC Compressor Clutch",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/13b308d.jpg",
      link: "/catalog/part-p-3002",
    },
    {
      id: 3,
      name: "AC Compressor Oil",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/b0c7133.jpg",
      link: "/catalog/part-p-3003",
    },
    {
      id: 4,
      name: "AC Compressor Valve",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/c9b37c4.jpg",
      link: "/catalog/part-p-3004",
    },
    {
      id: 5,
      name: "AC Control Unit",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/63dbad4.jpg",
      link: "/catalog/part-p-3005",
    },
    {
      id: 6,
      name: "AC Pressure Switch",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/a6a0e7a.jpg",
      link: "/catalog/part-p-3006",
    },
    {
      id: 7,
      name: "AC Repair Kit",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/c425f85.jpg",
      link: "/catalog/part-p-3007",
    },
    {
      id: 8,
      name: "Air Duct",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/6f792c1.jpg",
      link: "/catalog/part-p-3008",
    },
    {
      id: 9,
      name: "Air Vent",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/699e30c.jpg",
      link: "/catalog/part-p-3009",
    },
    {
      id: 10,
      name: "Blower Motor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/85d9a2b.jpg",
      link: "/catalog/part-p-3010",
    },
    {
      id: 11,
      name: "Blower Motor Resistor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/0588546.jpg",
      link: "/catalog/part-p-3011",
    },
    {
      id: 12,
      name: "Cabin Filter",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/4adac9b.jpg",
      link: "/catalog/part-p-3012",
    },
    {
      id: 13,
      name: "Cabin Temperature Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/0bbbcd9.jpg",
      link: "/catalog/part-p-3013",
    },
    {
      id: 14,
      name: "Condenser",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/863b27e.jpg",
      link: "/catalog/part-p-3014",
    },
    {
      id: 15,
      name: "Condenser Fan",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/9b70bd1.jpg",
      link: "/catalog/part-p-3015",
    },
    {
      id: 16,
      name: "Condenser Fan Cowling",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/cd0293c.jpg",
      link: "/catalog/part-p-3016",
    },
    {
      id: 17,
      name: "Defroster Hose",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/e4a5a78.jpg",
      link: "/catalog/part-p-3017",
    },
    {
      id: 18,
      name: "Evaporator",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/f32e160.jpg",
      link: "/catalog/part-p-3018",
    },
    {
      id: 19,
      name: "Expansion Valve",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/93e471b.jpg",
      link: "/catalog/part-p-3019",
    },
    {
      id: 20,
      name: "Heat Exchanger",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/5fbb86f.jpg",
      link: "/catalog/part-p-3020",
    },
    {
      id: 21,
      name: "HVAC Hose",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/99820f7.jpg",
      link: "/catalog/part-p-3021",
    },
    {
      id: 22,
      name: "Receiver Drier",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/db9dad4.jpg",
      link: "/catalog/part-p-3022",
    },
    {
      id: 23,
      name: "Refrigerant",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/ed85720.jpg",
      link: "/catalog/part-p-3023",
    },
    {
      id: 24,
      name: "V-belt",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/bd71bdc.jpg",
      link: "/catalog/part-p-3024",
    },
  ];

  // Generate categories with product data
  const airConditioningCategories = generateCategoryWithProducts(airConditioningCategoriesBase, "Air Conditioning", 2000);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(airConditioningCategories);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = airConditioningCategories.filter((item) =>
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

        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
              Air Conditioning Parts
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Explore our wide range of air conditioning parts designed to keep your vehicle cool and comfortable.
            </p>
          </div>
          <div className="flex-shrink-0">
            <SearchFilterBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              handleSort={handleSort}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              categoryName="AirConditioning"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 my-4 sm:my-6 md:my-8">
              {filteredProducts.map((category, index) => (
                <Link
                  key={category.id || index}
                  to={category.link}
                  state={{ 
                    product: category.product,
                    category: { name: "Air Conditioning", slug: "air_conditioning" }
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
            <section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300">
              <div className="space-y-4">
                {/* Intro Paragraph */}
                <p className="text-sm">
                  Basic necessities have been food, clothing, and shelter right from the beginning of the human race.
                  However, if you live in the scorching heat of northern India, where temperatures sometimes even touch the 50°C mark during summer,
                  you will agree that an air conditioner (AC) is the lone saviour in such conditions.
                  Air conditioning has become a standard feature in cars of all ranges — from small entry-level cars and budget sedans to high-end SUVs.
                  In this section, we’ll explore how a car’s AC functions and the roles of its key components.
                </p>

                {/* Compressor */}
                <h2 className="text-lg font-semibold text-red-600">
                  <a href="https://boodmo.com/catalog/3555-compressor/" target="_blank" rel="noopener noreferrer">
                    Compressor
                  </a>
                </h2>
                <p className="text-sm">
                  The most important and significant part of the air conditioning system is the <strong>Compressor</strong>,
                  as the quality of cool air depends upon it. It carries out several key tasks in the functioning of an AC unit.
                  The compressor pressurises the refrigerant to generate cool air and manages temperature changes inside and outside the car.
                  It also controls the temperature output of the Air Conditioner while moving air to the condenser.
                  In short, the compressor is the “heart” of the AC, and its maintenance is crucial for optimal cooling performance.
                </p>

                {/* Condenser */}
                <h2 className="text-lg font-semibold text-red-600">
                  <a href="https://boodmo.com/catalog/3524-condenser/" target="_blank" rel="noopener noreferrer">
                    Condenser
                  </a>
                </h2>
                <p className="text-sm">
                  Generally, the AC condenser in any passenger vehicle is positioned in front of the radiator — earning it the nickname “mini radiator.”
                  The condenser is another crucial component after the compressor. When the compressor pressurises the refrigerant to produce cool air,
                  the condenser lowers the temperature and pressure of the hot gases generated from the refrigerant.
                  It then moves the cooled liquid refrigerant to the accumulator, also known as the receiver/dryer.
                </p>

                {/* Tube */}
                <h2 className="text-lg font-semibold text-red-600">Tube</h2>
                <p>
                  The <strong>Orifice Tube</strong> is found in cars equipped with an accumulator, while those with a thermal expansion valve use a receiver/dryer.
                  The tube sits between the condenser and evaporator, monitoring the pressure and temperature of the car’s AC system.
                  It also determines the precise amount of refrigerant to send to the evaporator for smooth operation.
                </p>

                {/* Evaporator */}
                <h2 className="text-lg font-semibold text-red-600">
                  <a href="https://boodmo.com/catalog/4163-evaporator/" target="_blank" rel="noopener noreferrer">
                    Evaporator
                  </a>
                </h2>
                <p className="text-sm">
                  The <strong>Evaporator</strong> plays a substantial role in generating cold air from the air conditioner.
                  Located behind the dashboard, it cools the air with refrigerant before it exits the vents and enters your car’s cabin,
                  providing the refreshing cool air you enjoy.
                </p>

                {/* Air Filter */}
                <h2 className="text-lg font-semibold text-red-600">
                  <a href="https://boodmo.com/catalog/3330-cabin_filter/" target="_blank" rel="noopener noreferrer">
                    Air Filter
                  </a>
                </h2>
                <p className="text-sm">
                  Everyone prefers colder and cleaner air from the air conditioner, whether at home or in a car.
                  The <strong>Air Filter</strong> plays a key role in maintaining air quality by preventing dust, dirt, pollen, bacteria, and exhaust gases
                  from entering your car’s AC system. It also stops bugs, leaves, and other debris from clogging the system.
                  It’s recommended to replace the cabin air filter every year, as it gets clogged with debris over time,
                  reducing AC efficiency and compromising air quality.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AirConditioning;
