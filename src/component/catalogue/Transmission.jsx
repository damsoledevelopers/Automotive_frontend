import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";

const Transmission = () => {
  const transmissionCategories = [
    {
      name: "Automatic Transmission Filter",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/21ce121.jpg",
      link: "/catalog/4894-automatic_transmission_filter/",
    },
    {
      name: "Automatic Transmission Lining Disc",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/e34f2ce.jpg",
      link: "/catalog/4950-automatic_transmission_lining_disc/",
    },
    {
      name: "Automatic Transmission Oil Cooler",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/d976a25.jpg",
      link: "/catalog/4164-automatic_transmission_oil_cooler/",
    },
    {
      name: "Axle Driveshaft",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/45380ae.jpg",
      link: "/catalog/4982-axle/",
    },
    {
      name: "Clutch",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/e8cb288.jpg",
      link: "/catalog/3701-clutch/",
    },
    {
      name: "Dowel Pins Transmission",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/6120626.webp",
      link: "/catalog/5218-dowel_pins/",
    },
    {
      name: "Flywheel",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/4b009f3.jpg",
      link: "/catalog/4519-flywheel/",
    },
    {
      name: "Gearbox",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/f5699c5.jpg",
      link: "/catalog/3700-gearbox/",
    },
    {
      name: "Gear Selector Mechanism",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/6a5de74.jpg",
      link: "/catalog/4483-gear_selector_mechanism/",
    },
    {
      name: "Reverse Light Switch",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/5036e0b.jpg",
      link: "/catalog/4533-reverse_light_switch/",
    },
    {
      name: "Torque Converter",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/835eea1.jpg",
      link: "/catalog/5100-torque_converter/",
    },
    {
      name: "Transfer Case Repair Kit",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/17c04a2.jpg",
      link: "/catalog/5003-transfer_case_repair_kit/",
    },
    {
      name: "Transmission Bearing",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/f97ddeb.jpg",
      link: "/catalog/4268-bearing_manual_transmission/",
    },
    {
      name: "Transmission Collar",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/f931701.jpg",
      link: "/catalog/4897-transmission_collar/",
    },
    {
      name: "Transmission Gasket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/50066df.jpg",
      link: "/catalog/3704-gaskets/",
    },
    {
      name: "Transmission Hose",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/859dfa3.jpg",
      link: "/catalog/5004-transmission_hose/",
    },
    {
      name: "Transmission Oil",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/fd37652.jpg",
      link: "/catalog/3837-transmission_oil/",
    },
    {
      name: "Transmission Oil Sump",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/5efc02b.jpg",
      link: "/catalog/4267-transmission_oil_pan/",
    },
    {
      name: "Transmission RPM Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/43d8869.jpg",
      link: "/catalog/4217-sensor_speed/",
    },
    {
      name: "Transmission Seal",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/ac27a1e.jpg",
      link: "/catalog/4295-shaft_seal_differential/",
    },
    {
      name: "Transmission Woodruff Key",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/6ad136b.webp",
      link: "/catalog/5232-transmission_woodruff_key/",
    },
    {
      name: "Universal Joint",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/7b0198e.jpg",
      link: "/catalog/3699-joints/",
    },
  ];


  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(transmissionCategories);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = transmissionCategories.filter((item) =>
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
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <Breadcrumbs />

        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-2">
            Transmission
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore our wide range of transmission parts and accessories.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Transmission"
        />

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 my-4 sm:my-6 md:my-8">
              {filteredProducts.map((product, index) => (
                <Link
                  key={product.id || index}
                  to={product.link}
                  className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-cover rounded-md mb-2 mx-auto"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=' + (product.name || 'Part');
                    }}
                  />
                  <span className="text-gray-800 font-medium text-[9px] sm:text-[10px] md:text-xs lg:text-sm line-clamp-2 px-1">
                    {product.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* ✅ SEO Section */}
            <section>
              <div className="mb-8">
                <h1 className="text-xl font-semibold text-red-800 mb-2">Understanding of Car Transmission</h1>
                <p className="text-gray-600">
                  In words, it is very easy to describe the transmission, but there are a lot of things happening simultaneously during the process of transmitting engine energy to wheels.
                  The vehicle's gearbox is entirely dependent on power supplied by an engine—no power means it won't transmit any power to the wheel.
                  The power produced by engine depends on the speed of the engine. Here, power is usable energy or torque that can be transmitted to the powertrain.
                  The problem is, the produced torque is in predefined engine speed or not. This range of engine speed is needed to produce optimum torque.
                </p>
              </div>

              <div className="mb-8">
                <h1 className="text-xl text-gray-800 mb-2">Importance of Car Transmission</h1>
                <p className="text-gray-600">
                  It ensures that the produced power does not get wasted and makes sure it is right enough to turn the wheels.
                  If conditions require more power, it goes to lower gear ratios to allow usable power at low speeds.
                </p>
              </div>

              <div className="mb-8">
                <h1 className="text-xl font-semibold text-red-800 mb-2">Buy Transmission Parts Online in India</h1>
                <p className="text-gray-600">
                  In order to help you find the right spare parts, Boodmo was incorporated. It is changing the way people used to purchase spares at a wonderful cost.
                  Customers can browse a huge catalogue of automatic transmission parts, transmission spare parts, mounts, brake parts, housings, gaskets, adapters, hoses, bearings, harnesses, and many more.
                  To buy online, you need to register yourself with us and search the spare part using the part number or VIN.
                  Our customer service team will help you with the rest of the process, making it even easier to shop for automotive parts.
                  We are working to solve real-life problems of car owners who find it really difficult to get top-quality spare parts at a great price.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Transmission;
