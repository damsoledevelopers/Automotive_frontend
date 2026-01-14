import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";

const Sensors_ControlUnits = () => {
  const sensorCategories = [
    {
      name: "ABS Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/2ac18a5.jpg",
      link: "/catalog/4301-abs_sensor/",
    },
    {
      name: "AC Control Unit",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/63dbad4.jpg",
      link: "/catalog/4669-control_unit_air_conditioning/",
    },
    {
      name: "Adjusting Potentiometer",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/13571ec.jpg",
      link: "/catalog/4955-adjusting_potentiometer/",
    },
    {
      name: "Blower Motor Resistor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/0588546.jpg",
      link: "/catalog/4491-blower_motor_resistor/",
    },
    {
      name: "Brake Light Switch",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/bb8c6bf.jpg",
      link: "/catalog/4321-brake_light_switch/",
    },
    {
      name: "Brake Pad Wear Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/e077c87.jpg",
      link: "/catalog/4323-brake_pad_wear_sensor/",
    },
    {
      name: "Cabin Temperature Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/0bbbcd9.jpg",
      link: "/catalog/4993-ambient_temperature_sensor/",
    },
    {
      name: "Camshaft Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/cc7e26f.jpg",
      link: "/catalog/4543-camshaft_sensor/",
    },
    {
      name: "Control Unit Glow Plug System",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/2676bd2.jpg",
      link: "/catalog/4506-control_unit_glow_plug_system/",
    },
    {
      name: "Coolant Temperature Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/3da6532.jpg",
      link: "/catalog/4662-coolant_temperature_sensor/",
    },
    {
      name: "Crankshaft RPM Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/b49c492.jpg",
      link: "/catalog/4509-crankshaft_sensor/",
    },
    {
      name: "Exhaust Gas Temperature Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/e813476.jpg",
      link: "/catalog/4661-sensor_exhaust_gas_temperature/",
    },
    {
      name: "Fuel Pressure Regulator",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/be9f211.jpg",
      link: "/catalog/4507-fuel_pressure_regulator/",
    },
    {
      name: "Fuel Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/b7b3392.jpg",
      link: "/catalog/4666-sensor_fuel_tank_pressure/",
    },
    {
      name: "Horn Relay",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/9a161d0.jpg",
      link: "/catalog/4291-relay_horn/",
    },
    {
      name: "Knock Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/3e3610b.jpg",
      link: "/catalog/4690-knock_sensor/",
    },
    {
      name: "Lambda Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/7a22417.jpg",
      link: "/catalog/4541-lambda_sensor/",
    },
    {
      name: "Mass Air Flow Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/d98aade.jpg",
      link: "/catalog/4535-mass_air_flow_sensor/",
    },
    {
      name: "Oil Pressure Switch",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/68b39b5.jpg",
      link: "/catalog/4380-oil_pressure_switch/",
    },
    {
      name: "Parking Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/9c4031c.jpg",
      link: "/catalog/4542-parking_sensors/",
    },
    {
      name: "Power Window Motor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/15136a2.jpg",
      link: "/catalog/4500-electric_motor_window_winder/",
    },
    {
      name: "Sensor Intake Manifold Pressure",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/5e66a1e.jpg",
      link: "/catalog/4536-sensor_intake_manifold_pressure/",
    },
    {
      name: "Starter Motor Solenoid Switch",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/8ecc466.jpg",
      link: "/catalog/4588-starter_solenoid/",
    },
    {
      name: "Starter Relay",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/994361b.jpg",
      link: "/catalog/4630-starter_relay/",
    },
    {
      name: "Throttle Position Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/ee9651d.jpg",
      link: "/catalog/4538-throttle_position_sensor/",
    },
    {
      name: "Transmission RPM Sensor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/43d8869.jpg",
      link: "/catalog/4664-sensor_speed/",
    },
    {
      name: "Window Switch",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/e881fc7.jpg",
      link: "/catalog/4502-window_switch/",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(sensorCategories);
  const [expanded, setExpanded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = sensorCategories.filter((item) =>
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
    <div className="min-h-screen bg-white py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <Breadcrumbs />

        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Sensors, Relays & Control Units
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore our wide range of sensors, relays, and control units designed
            for optimal performance and reliability.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Sensors, Relays & Control Units"
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
                  key={index}
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

            {/* ✅ SEO Section with Expandable Text */}
            <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300 my-10">
              <div
                className={`space-y-4 overflow-hidden transition-all duration-500 ${expanded ? "max-h-full" : "max-h-[400px]"
                  }`}
              >
                <h2 className="text-2xl font-bold text-red-600">Buy Online Sensors, Relays & Control Units in India</h2>

                <p>
                  Nowadays, almost everything can be purchased online — and car parts are no exception. Sensors, relays, and control units are essential components that ensure proper vehicle operation.
                  <strong> sparelo </strong> offers a wide selection of high-quality original and compatible parts for all car brands.
                  You can easily find and order them by car code or part name.
                </p>

                <h2 className="text-2xl font-bold text-red-600">Catalog of Sensors, Relays & Control Units Parts</h2>

                <p>
                  Sensors and relays are fundamentally different in function — yet both are crucial for vehicle systems.
                  Sensors measure values and send data for processing, while relays act as switches that open or close circuits based on input signals.
                </p>

                <p>
                  On <strong>sparelo</strong>, you can find both sensors and relays depending on your needs.
                  Before ordering, determine whether your vehicle requires a sensor, relay, or control unit.
                </p>

                <p>
                  Sensors serve as converters, translating physical values into readable signals for the vehicle’s systems.
                  Relays, on the other hand, control circuit connections, responding to electrical or non-electrical triggers — acting like a switch or key.
                </p>

                <p>
                  The <strong>sparelo</strong> catalog offers over <strong>134,500+</strong> items under this category, ensuring a wide range of options to suit every car model.
                  Available parts include:
                </p>

                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Water temperature sensor</li>
                  <li>Thermal switch</li>
                  <li>Window switch</li>
                  <li>Hazard warning switch</li>
                  <li>Rear brake pad wear sensor</li>
                  <li>Oil pressure switch</li>
                  <li>Wheel speed sensor and more</li>
                </ul>

                <h2 className="text-2xl font-bold text-red-600">Price for Sensors, Relays & Control Units</h2>

                <p>
                  At <strong>sparelo</strong>, customers enjoy quality service and fair prices.
                  Components are available from as low as <strong>₹250</strong> and can go up to several thousand rupees depending on the part and brand.
                </p>

                <p>
                  Additionally, ongoing sale offers allow customers to save between <strong>5%</strong> and <strong>22%</strong> on selected parts.
                  So why wait? Explore our catalog today and find everything you need for your car — high-quality components, reasonable prices, and excellent customer service.
                </p>
              </div>

              {/* View More / View Less Button */}
              <div className="seo-text__action mt-6 text-center">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
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

export default Sensors_ControlUnits;
