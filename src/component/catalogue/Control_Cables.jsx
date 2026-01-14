import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";

// ✅ Updated Categories Grid / Products Data
const controlCableCategories = [
  {
    id: 1,
    name: "Accelerator Cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/0edf63b.webp",
    link: "/catalog/5118-accelerator_cable/",
  },
  {
    id: 2,
    name: "Bonnet Release cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/5344f8a.webp",
    link: "/catalog/5119-bonnet_release_cable/",
  },
  {
    id: 3,
    name: "Brake Cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/4823cf9.webp",
    link: "/catalog/5117-brake_cable/",
  },
  {
    id: 4,
    name: "Clutch Cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/d716a55.webp",
    link: "/catalog/5115-clutch_cable/",
  },
  {
    id: 5,
    name: "Door Lock Link",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/411146f.webp",
    link: "/catalog/5120-door_lock_link/",
  },
  {
    id: 6,
    name: "Fuel Lid Cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/56b01c7.webp",
    link: "/catalog/5116-fuel_lid_cable/",
  },
  {
    id: 7,
    name: "Gear Shift Cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/85b79c7.webp",
    link: "/catalog/5121-gear_shift_cable/",
  },
  {
    id: 8,
    name: "Seat Cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/d062912.jpg",
    link: "/catalog/5122-seat_cable/",
  },
  {
    id: 9,
    name: "Temperature Control Cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/6e8366a.jpg",
    link: "/catalog/5123-temperature_control_cable/",
  },
];

export const Control_Cables = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(controlCableCategories);
  const [expanded, setExpanded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // 🔍 Search Functionality
  useEffect(() => {
    const filtered = controlCableCategories.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  // 🔠 Sort Functionality
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
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Control Cables</h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            This section contains various control cables for your vehicle including accelerator, clutch,
            gear shift, and brake cables.
          </p>
        </div>

        {/* 🔎 Search and Filter Bar */}
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Control Cables"
        />

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          {/* 🧩 Categories Grid */}
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
                      e.target.src = 'https://via.placeholder.com/100x100?text=' + product.name;
                    }}
                  />
                  <span className="text-gray-800 font-medium text-[9px] sm:text-[10px] md:text-xs lg:text-sm line-clamp-2 px-1">{product.name}</span>
                </Link>
              ))}
            </div>

            {/* 🧾 Description Section */}
            <section className="seo-text my-10 px-4 sm:px-8 lg:px-16">
              <div
                className={`seo-text__body transition-all duration-500 overflow-hidden ${expanded ? "max-h-full" : "max-h-[500px]"
                  }`}
              >
                <div className="space-y-4 text-gray-800 dark:text-gray-200">
                  <p>
                    Cables are an essential part of the complex network of components that make up an automotive system. They are used to transmit mechanical force or motion from one point to another, enabling various functions and operations within a vehicle. In this article, we will take a closer look at some common types of automotive cables, including seat cables, temperature control cables, accelerator cables, bonnet release cables, brake cables, clutch cables, door lock links, fuel lid cables, and gear shift cables.
                  </p>

                  <h2 className="text-xl font-semibold text-red-600 dark:text-pink-400">
                    Seat Cable
                  </h2>
                  <p>
                    Seat cables are used in the seats of a vehicle to control the movement and adjustment of the seats. They are typically made of high-quality steel wire ropes encased in a protective sheath. Seat cables allow for the forward and backward movement, as well as the reclining and tilting adjustments of the seats. Proper lubrication and regular inspection for signs of wear or damage are crucial for the smooth and reliable operation of seat cables, ensuring optimal comfort and safety for the vehicle occupants.
                  </p>

                  <h2 className="text-xl font-semibold text-red-600 dark:text-pink-400">
                    Temperature Control Cable
                  </h2>
                  <p>
                    Temperature control cables are used in the HVAC (Heating, Ventilation, and Air Conditioning) system of a vehicle to control the temperature settings. They are typically made of steel wire ropes or Bowden cables, which consist of a flexible inner cable and a protective outer sheath. Temperature control cables allow for the adjustment of the temperature settings, such as hot and cold air, as well as the direction and intensity of airflow. Regular inspection and lubrication of temperature control cables are important to maintain proper HVAC operation and ensure optimal comfort for the vehicle occupants.
                  </p>

                  <h2 className="text-xl font-semibold text-red-600 dark:text-pink-400">
                    Accelerator Cable
                  </h2>
                  <p>
                    Accelerator cables, also known as throttle cables or gas cables, are used in the throttle system of a vehicle to control the opening and closing of the throttle valve. They are typically made of steel wire ropes or Bowden cables and transmit the driver's input from the accelerator pedal to the throttle body or carburetor. Accelerator cables allow for the control of engine speed and power, and proper adjustment and lubrication are crucial for smooth and responsive throttle operation, ensuring safe and efficient driving.
                  </p>

                  <h2 className="text-xl font-semibold text-red-600 dark:text-pink-400">
                    Bonnet Release Cable
                  </h2>
                  <p>
                    Bonnet release cables, also known as hood release cables or latch cables, are used to release the bonnet or hood of a vehicle, allowing access to the engine compartment. They are typically made of steel wire ropes or Bowden cables and transmit the driver's input from the bonnet release lever or handle to the hood latch mechanism. Bonnet release cables need to be properly adjusted and lubricated to ensure reliable and smooth operation, enabling convenient access to the engine compartment for maintenance and repairs.
                  </p>

                  <h2 className="text-xl font-semibold text-red-600 dark:text-pink-400">
                    Brake Cable
                  </h2>
                  <p>
                    Brake cables are used in the braking system of a vehicle to transmit force from the brake pedal to the brake calipers or drums, causing the vehicle to slow down or come to a stop. They are typically made of steel wire ropes or Bowden cables and are crucial for safe and efficient braking. Brake cables need to be properly adjusted and lubricated to ensure optimal brake performance, preventing excessive wear or damage to the braking system and ensuring the safety of the vehicle occupants and other road users.
                  </p>

                  <h2 className="text-xl font-semibold text-red-600 dark:text-pink-400">
                    Clutch Cable
                  </h2>
                  <p>
                    Clutch cables, also known as clutch control cables or release cables, are used in the clutch system of a manual transmission vehicle to transmit force from the clutch pedal to the clutch release mechanism, allowing for smooth engagement and disengagement of the clutch. They are typically made of steel wire ropes or Bowden cables and are critical for proper clutch operation. Clutch cables need to be properly adjusted and lubricated to ensure smooth clutch engagement and disengagement, preventing premature wear or damage to the clutch components and ensuring smooth gear shifting.
                  </p>

                  <h2 className="text-xl font-semibold text-red-600 dark:text-pink-400">
                    Door Lock Link
                  </h2>
                  <p>
                    Door lock links, also known as door lock rods or door lock actuator cables, are used in the locking system of vehicle doors. They are responsible for transmitting the force from the door lock actuator to the door latch mechanism, allowing for the locking and unlocking of the doors. Door lock links are typically made of steel wire ropes or Bowden cables and work in conjunction with the door lock actuator, which is an electric or mechanical device that controls the locking and unlocking of the doors. When the door lock actuator is activated, it exerts force on the door lock link, which in turn moves the door latch mechanism to lock or unlock the door. Proper adjustment and lubrication of door lock links are essential for reliable door locking and unlocking, ensuring the security and convenience of the vehicle.
                  </p>

                  <h2 className="text-xl font-semibold text-red-600 dark:text-pink-400">
                    Fuel Lid Cable
                  </h2>
                  <p>
                    Fuel lid cables, also known as fuel filler cables or fuel door release cables, are used to release the fuel lid or fuel filler door of a vehicle, allowing access to the fuel tank for refueling. They are typically made of steel wire ropes or Bowden cables and transmit the force from the fuel lid release lever or handle to the fuel lid latch mechanism. Fuel lid cables are usually routed through the vehicle's body and connect the fuel lid release lever to the fuel lid latch, enabling the fuel lid to open or close upon activation of the release lever. Proper adjustment and lubrication of fuel lid cables are important to ensure reliable and smooth operation, allowing for convenient refueling of the vehicle.
                  </p>

                  <h2 className="text-xl font-semibold text-red-600 dark:text-pink-400">
                    Gear Shift Cable
                  </h2>
                  <p>
                    Gear shift cables, also known as gear selector cables or shifter cables, are used in the transmission system of a vehicle to control the gear selection. They are typically made of steel wire ropes or Bowden cables and are responsible for transmitting the driver's input from the gear shift lever to the transmission, allowing for the engagement of different gears. Gear shift cables are crucial for smooth and precise gear shifting, enabling the driver to control the vehicle's speed and power effectively. Proper adjustment and lubrication of gear shift cables are important to ensure smooth gear shifting, preventing premature wear or damage to the transmission components and ensuring optimal driving performance.
                  </p>
                </div>
              </div>

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

export default Control_Cables;
