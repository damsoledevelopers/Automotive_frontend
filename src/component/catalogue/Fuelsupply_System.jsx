import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
import { generateCategoryWithProducts } from "../../utils/productDataGenerator";

const Fuelsupply_System = () => {
  const fuelSystemCategoriesBase = [
    {
      id: 1,
      name: "Accelerator Cable",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/9b3d796.jpg",
      link: "/catalog/part-p-13001",
    },
    {
      name: "Accelerator Pedal",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/e52b7c1.jpg",
      link: "/catalog/4489-accelerator_pedal/",
    },
    {
      name: "Carburettor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/7103bee.jpg",
      link: "/catalog/4626-carburettor/",
    },
    {
      name: "Carburettor Flange",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/0442561.jpg",
      link: "/catalog/4358-carburetor_flange/",
    },
    {
      name: "Carburettor Repair Kit",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/99ad124.jpg",
      link: "/catalog/4254-repair_kit_carburettor/",
    },
    {
      name: "Carburettor Solenoid Valve",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/8c64480.jpg",
      link: "/catalog/3436-carburettor_system/",
    },
    {
      name: "Charcoal Canister",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/21309c7.jpg",
      link: "/catalog/4775-charcoal_canister/",
    },
    {
      name: "Engine Stop Cable",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/01f311c.webp",
      link: "/catalog/5236-engine_stop_cable/",
    },
    {
      name: "Fuel Cap",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/d0441f3.jpg",
      link: "/catalog/4250-fuel_cap/",
    },
    {
      name: "Fuel Filter",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/c76c371.jpg",
      link: "/catalog/3328-fuel_filter/",
    },
    {
      name: "Fuel Pump",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/0d0854a.jpg",
      link: "/catalog/3620-fuel_pump/",
    },
    {
      name: "Fuel Rail",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/6c34042.jpg",
      link: "/catalog/4579-fuel_rail/",
    },
    {
      name: "Fuel Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/99642a3.jpg",
      link: "/catalog/4252-sensor_fuel_tank_pressure/",
    },
    {
      name: "Fuel Tank",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/49ed220.jpg",
      link: "/catalog/4152-fuel_tank_and_fuel_tank_cap/",
    },
    {
      name: "Throttle Body",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/9724afe.jpg",
      link: "/catalog/4554-throttle/",
    },
  ];

  // Generate categories with product data
  const fuelSystemCategories = generateCategoryWithProducts(
    fuelSystemCategoriesBase.map((item, index) => ({
      ...item,
      id: item.id || (index + 1),
      link: item.link.startsWith('/catalog/part-p-') ? item.link : `/catalog/part-p-${13000 + index + 1}`
    })),
    "Fuel Supply System",
    1600
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(fuelSystemCategories);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = fuelSystemCategories.filter((item) =>
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
            Fuel Supply System
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore our wide range of fuel supply system parts designed to keep your engine running smoothly and efficiently.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Fuel Supply System"
        />

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
                    category: { name: "Fuel Supply System", slug: "fuelsystem" }
                  }}
                  className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
                >
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-cover rounded-md mb-2 mx-auto"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=' + (category.name || 'Part');
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
                {/* Title */}
                <h2 className="text-3xl font-bold text-red-600">
                  Buy Online Fuel Supply System Parts in India
                </h2>

                {/* Intro */}
                <p>
                  No car with an internal combustion engine will run if its fuel tank is empty.
                  However, just having fuel in the tank isn’t enough — the <strong>fuel system</strong>
                  is what ensures the proper supply of energy to the engine.
                </p>

                <p>
                  The primary function of the fuel system is to deliver the required amount of fuel
                  to the engine, regardless of operating conditions. Structurally, it’s quite complex
                  as it integrates components from several subsystems. Modern engines use a design
                  that controls injection through a distributor, allowing independent regulation
                  of fuel mixture formation and supply dosing. This optimizes fuel quality and composition,
                  improving power output, reducing toxicity, and minimizing fuel consumption — all managed
                  by an electronic control unit (ECU) using various sensors to monitor speed, temperature,
                  and engine load.
                </p>

                {/* Fuel Supply System Parts */}
                <h2 className="text-lg font-semibold text-red-600">Fuel Supply System Parts</h2>
                <p>
                  If you’re looking for high-quality spare parts for your vehicle,
                  the <strong>Boodmo</strong> online store offers:
                </p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Highly professional service</li>
                  <li>Incredible range of necessary parts</li>
                  <li>Certified and high-quality spare parts</li>
                  <li>Original and modified options</li>
                  <li>Attractive prices for fuel supply system parts</li>
                  <li>Special sale offers and discounts</li>
                </ul>

                <p>
                  Whether you choose original or analog parts — at full price or discounted —
                  you’ll receive a durable, reliable component that extends your car’s lifespan
                  and ensures optimal performance.
                </p>

                {/* Choose the Best Spares */}
                <h3 className="text-xl font-semibold text-red-600">Choose the Best Spares for Your Car</h3>
                <p>
                  The fuel supply system of any internal combustion engine prepares the fuel-air mixture,
                  consisting of fuel and air in a specific proportion.
                </p>

                <p>The main components of the fuel system include:</p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    A tank containing fuel, pipelines, filters, a pressure regulator,
                    and a fuel rail with injectors.
                  </li>
                  <li>
                    Air supply components — idle regulator, throttle mechanisms, and air filter.
                  </li>
                  <li>
                    Fuel vapor trap — adsorber with purge valve and connecting pipelines.
                  </li>
                </ul>

                <p>
                  Fuel is fed to the carburetor (or injectors, in modern systems), where it mixes with
                  air in the proper ratio. The resulting mixture enters the engine’s cylinders,
                  where it burns to generate power. Exhaust gases are expelled through the manifold
                  and muffler.
                </p>

                {/* Price Section */}
                <h3 className="text-xl font-semibold text-red-600">
                  Price for Fuel Supply System Parts: Explore the Boodmo Catalog
                </h3>
                <p>
                  On the <strong>Boodmo</strong> website, you’ll find everything you need for your car —
                  including over <strong>184,000</strong> fuel supply system parts.
                  You can search by name, model, or modification, and instantly view
                  detailed descriptions, technical specifications, and pricing.
                </p>

                <p>
                  The fuel system of a gasoline engine includes components like a fuel tank, pump, filter,
                  lines, carburetor, injectors, and fuel rail.
                  Shop with the best — visit <strong>Boodmo</strong> and keep your car running like new!
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Fuelsupply_System;
