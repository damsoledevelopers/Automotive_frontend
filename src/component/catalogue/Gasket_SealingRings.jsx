import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
import { generateCategoryWithProducts } from "../../utils/productDataGenerator";

const Gasket_SealingRings = () => {
  const gasketSealCategoriesBase = [
    {
      id: 1,
      name: "Bonnet Seal",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/0bd6e33.jpg",
      link: "/catalog/part-p-14001",
    },
    {
      name: "Camshaft Seal",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/d2a2960.jpg",
      link: "/catalog/4679-camshaft_seal/",
    },
    {
      name: "Coolant Pipe Seal",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/ae28059.jpg",
      link: "/catalog/4571-radiator_gasket/",
    },
    {
      name: "Crankcase Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/d19747a.jpg",
      link: "/catalog/4682-crankcase_gasket/",
    },
    {
      name: "Crankshaft Seal",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/2139389.jpg",
      link: "/catalog/4693-crankshaft_seal/",
    },
    {
      name: "Cylinder Head Cover Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/520fae5.jpg",
      link: "/catalog/4680-rocker_cover_gasket/",
    },
    {
      name: "Cylinder Head Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/e0937f7.jpg",
      link: "/catalog/4521-gaskets_seals/",
    },
    {
      name: "Cylinder Head Gasket Set",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/e441efa.jpg",
      link: "/catalog/4691-cylinder_head_gasket_set/",
    },
    {
      name: "Door Seal",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/62b47fe.jpg",
      link: "/catalog/4513-door_seal/",
    },
    {
      name: "EGR Valve Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/16f8c0a.jpg",
      link: "/catalog/4359-egr_valve_gasket/",
    },
    {
      name: "Engine Full Gasket Set",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/5ed9cdc.jpg",
      link: "/catalog/4514-full_gasket_set_engine/",
    },
    {
      name: "Exhaust Manifold Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/955b4a7.jpg",
      link: "/catalog/4681-exhaust_manifold_gasket/",
    },
    {
      name: "Exhaust Pipe Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/f18aa67.jpg",
      link: "/catalog/4636-exhaust_system_complete/",
    },
    {
      name: "Injector Seal",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/01a0592.jpg",
      link: "/catalog/4683-injector_seals/",
    },
    {
      name: "Intake Manifold Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/b75f884.jpg",
      link: "/catalog/4525-intake_manifold_gasket/",
    },
    {
      name: "Oil Cooler Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/5b32cdf.jpg",
      link: "/catalog/4528-oil_cooler_gasket/",
    },
    {
      name: "Oil Pump Seal Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/370d2e9.jpg",
      link: "/catalog/4304-shaft_seal_oil_pump/",
    },
    {
      name: "Oil Sump Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/23236b8.jpg",
      link: "/catalog/4969-oil_sump_gasket/",
    },
    {
      name: "O-Ring Set Cylinder Sleeve",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/a6a0a95.jpg",
      link: "/catalog/4684-o_ring_set_cylinder_sleeve/",
    },
    {
      name: "Seal Fuel Filter",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/72fd928.jpg",
      link: "/catalog/4296-seal_fuel_filter/",
    },
    {
      name: "Seal Injection Pump",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/a14098e.jpg",
      link: "/catalog/4257-seal_injection_pump/",
    },
    {
      name: "Shaft Seal Wheel Hub",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/981682b.jpg",
      link: "/catalog/4545-shaft_seal_wheel_hub/",
    },
    {
      name: "Thermostat Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/872d6e0.jpg",
      link: "/catalog/4553-thermostat_gasket/",
    },
    {
      name: "Throttle Body Seal",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/c41e331.jpg",
      link: "/catalog/4954-throttle_body_seal/",
    },
    {
      name: "Timing Case Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/0fa1fda.jpg",
      link: "/catalog/4292-timing_case_gasket/",
    },
    {
      name: "Transmission Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/50066df.jpg",
      link: "/catalog/4739-gaskets/",
    },
    {
      name: "Transmission Seal",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/ac27a1e.jpg",
      link: "/catalog/4659-shaft_seal_differential/",
    },
    {
      name: "Turbocharger Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/cf18261.jpg",
      link: "/catalog/4560-turbocharger_gasket/",
    },
    {
      name: "Water Pump Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/9807081.jpg",
      link: "/catalog/4685-water_pump_gasket/",
    },
    {
      name: "Window Seal",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/58281a4.jpg",
      link: "/catalog/4563-window_seal/",
    },
  ];

  // Generate categories with product data
  const gasketSealCategories = generateCategoryWithProducts(
    gasketSealCategoriesBase.map((item, index) => ({
      ...item,
      id: item.id || (index + 1),
      link: item.link.startsWith('/catalog/part-p-') ? item.link : `/catalog/part-p-${14000 + index + 1}`
    })),
    "Gaskets & Seals",
    1200
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(gasketSealCategories);
  const [expanded, setExpanded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = gasketSealCategories.filter((item) =>
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
            Gasket and Sealing Rings
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore our wide range of gasket and sealing rings designed to provide a reliable seal and prevent leaks in your engine.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Gasket_SealingRings"
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
                    category: { name: "Gaskets & Seals", slug: "gaskets_seals" }
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
            <section className="seo-text my-10 px-4 sm:px-8 lg:px-16">
              <div
                className={`seo-text__body transition-all duration-500 overflow-hidden ${
                  expanded ? "max-h-full" : "max-h-[500px]"
                }`}
              >
                <div className="space-y-4 text-gray-800 dark:text-gray-200">
                  <h1 className="text-3xl font-bold mb-4">
                    Gaskets and Sealing Rings
                  </h1>
                  <p>
                    The car engine is composed of numerous metal, plastic, and rubber components.
                    Gaskets and sealing rings play a crucial role in maintaining tightness within
                    these mechanisms. They ensure that technical fluids circulating under pressure
                    do not leak, while also preventing dust, moisture, and dirt from entering from
                    the outside.
                  </p>

                  <p>
                    Gaskets help achieve an ideal fit between surfaces, compensating for irregularities
                    and small defects. Their elasticity allows them to seal the housing and prevent
                    fluid leakage, keeping internal components well-protected.
                  </p>

                  {expanded && (
                    <>
                      <h2 className="text-xl font-semibold text-red-600 dark:text-pink-400">
                        Buy Gasket Ring: Mechanical Properties
                      </h2>
                      <p>
                        The shape and material of a gasket depend on its function and operating environment:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Some gaskets keep technical fluids inside the case.</li>
                        <li>
                          Others provide maximum sealing where parts meet, withstanding high temperatures
                          and internal tension.
                        </li>
                        <li>
                          Oil seals (a type of gasket) are used where moving and stationary parts meet.
                        </li>
                      </ul>

                      <p>
                        Each gasket is designed for specific engine types and configurations, meaning
                        they are not interchangeable between different motors. Always purchase gaskets
                        that fit the exact model of your power unit.
                      </p>

                      <h2 className="text-xl font-semibold text-red-600 dark:text-pink-400">
                        Buy Sealing Rings
                      </h2>
                      <p>
                        Gaskets are generally divided into two main types based on their material:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Metal</li>
                        <li>Non-metallic</li>
                      </ul>

                      <p>
                        Metal gaskets are multi-layered, often made from steel or copper alloys. They
                        offer excellent durability and resistance to wear, though they tend to cost more.
                        Non-metallic gaskets include asbestos-based, asbestos-free, and rubberized
                        varieties — sometimes reinforced with graphite or other materials for improved
                        sealing.
                      </p>

                      <h2 className="text-xl font-semibold text-red-600 dark:text-pink-400">
                        Gaskets and Sealing Rings Car Parts
                      </h2>
                      <p>
                        You can easily purchase gasket rings and sealing rings for your vehicle at the
                        best price in India from our online store. We offer a large selection of over
                        220,000 parts, attractive discounts, and reliable customer service.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* ✅ Toggle Button */}
              <div className="seo-text__action mt-6 text-center">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="btn btn-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
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

export default Gasket_SealingRings;
