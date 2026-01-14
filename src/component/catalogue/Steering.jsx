import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";

const Steering = () => {
 const steeringCategories = [
  {
    name: "Centre Rod Assembly",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/3267847.jpg",
    link: "/catalog/4632-centre_rod_assembly/",
  },
  {
    name: "Horn Pad",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/63002d0.jpg",
    link: "/catalog/4701-horn_pad/",
  },
  {
    name: "Idler Arm",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/d9a080c.jpg",
    link: "/catalog/4159-steering_linkage/",
  },
  {
    name: "Inner Tie Rod",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/3eceb44.jpg",
    link: "/catalog/4126-inner_tie_rod/",
  },
  {
    name: "King Pin",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/5f74c54.jpg",
    link: "/catalog/4783-king_pin/",
  },
  {
    name: "Pitman Arm",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/870eaeb.jpg",
    link: "/catalog/4160-steering_arm/",
  },
  {
    name: "Power Steering Motor",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/d824657.jpg",
    link: "/catalog/4956-power_steering_motor/",
  },
  {
    name: "Power Steering Pump",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/af9c983.jpg",
    link: "/catalog/3806-steering_pump/",
  },
  {
    name: "Power Steering Pump Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/db3a2fe.jpg",
    link: "/catalog/4256-gasket_set_hydraulic_pump/",
  },
  {
    name: "Power Steering Reservoir",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/005ca07.jpg",
    link: "/catalog/4249-hydraulic_oil_expansion_tank/",
  },
  {
    name: "Power Steering Reservoir Cap",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/8379bb5.jpg",
    link: "/catalog/4918-power_steering_reservoir_cap/",
  },
  {
    name: "Steering Angle Sensor",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/69ba830.jpg",
    link: "/catalog/4623-steering_angle_sensor/",
  },
  {
    name: "Steering Bracket",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/adb8d8d.jpg",
    link: "/catalog/4935-steering_bracket/",
  },
  {
    name: "Steering Column",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7db00cb.jpg",
    link: "/catalog/4408-steering_column/",
  },
  {
    name: "Steering Column Coupler",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/44a3b9b.jpg",
    link: "/catalog/4622-steering_column_joint/",
  },
  {
    name: "Steering Column Cover",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/1466881.jpg",
    link: "/catalog/4687-steering_column_cover/",
  },
  {
    name: "Steering Column Switch",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/990e4c6.jpg",
    link: "/catalog/4549-steering_column_switch/",
  },
  {
    name: "Steering Damper",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/d28a7aa.jpg",
    link: "/catalog/4910-steering_damper/",
  },
  {
    name: "Steering Gear",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/72fb97b.jpg",
    link: "/catalog/3543-steering_gear_box/",
  },
  {
    name: "Steering Gear Assembly",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/c750a42.jpg",
    link: "/catalog/5009-steering_gear_assembly/",
  },
  {
    name: "Steering Gear Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/a1d8d99.jpg",
    link: "/catalog/4624-steering_gear_repair_kit/",
  },
  {
    name: "Steering Hose",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/bc7d2d4.jpg",
    link: "/catalog/3548-steering_hydraulics_hoses/",
  },
  {
    name: "Steering Knuckle",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/087f1a6.jpg",
    link: "/catalog/3545-joints_steering_knuckle/",
  },
  {
    name: "Steering Mounting",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/c5bb97a.jpg",
    link: "/catalog/4694-steering_mounting/",
  },
  {
    name: "Steering Oil",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/316834f.jpg",
    link: "/catalog/3838-steering_oil/",
  },
  {
    name: "Steering Rack Boot",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/e2222b2.jpg",
    link: "/catalog/4127-steering_rack_boot/",
  },
  {
    name: "Steering Wheel",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/9330f09.jpg",
    link: "/catalog/3547-steering_column_steering_wheel/",
  },
  {
    name: "Tie Rod End",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/eb55b8b.jpg",
    link: "/catalog/3546-steering_linkage_tie_rod/",
  },
  {
    name: "Tie Rod Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/bfe4971.webp",
    link: "/catalog/5237-repair_kit_tie_rod/",
  },
];

  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(steeringCategories);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = steeringCategories.filter((item) =>
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
           Steering
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore our wide range of steering components designed for optimal performance and safety.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Steering"
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
          <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300 my-10">
  <div
    className={`space-y-4 overflow-hidden transition-all duration-500 ${
      expanded ? "max-h-full" : "max-h-[400px]"
    }`}
  >
    <h2 className="text-2xl font-bold text-red-600">Car Steering System Parts</h2>

    <p>
      The steering system allows a driver to precisely control the vehicle’s direction and stability.
      It consists of several key components that work together to convert the driver’s input from the
      steering wheel into motion of the wheels.
    </p>

    <p>The mechanism operates using the following parts:</p>

    <ul className="list-disc list-inside space-y-2 pl-4">
      <li>
        <strong>Steering wheel:</strong> The driver controls the car using this component. Modern versions
        often include buttons or sensors for driving torque and steering angle detection.
      </li>
      <li>
        <strong>Steering mechanism:</strong> Increases the driver’s input power and transmits it to the
        steering gear connection. The most common type is the rack-and-pinion mechanism, consisting of a
        toothed gear connected to a rack.
      </li>
      <li>
        <strong>Steering tube:</strong> Connects the steering wheel to the steering mechanism.
      </li>
      <li>
        <strong>Steering linkage:</strong> Transfers the turning force from the steering wheel to the
        vehicle’s front wheels.
      </li>
      <li>
        <strong>Additional power steering components:</strong> Installed to reduce the effort required by
        the driver.
      </li>
    </ul>

    <p>
      To make steering smoother and reduce physical effort, vehicles use various types of power steering
      systems. Depending on the design, there are three main types:
    </p>

    <ul className="list-disc list-inside space-y-2 pl-4">
      <li>Hydraulic power steering</li>
      <li>Electric power steering</li>
      <li>Hybrid electric-hydraulic power steering</li>
    </ul>

    <p>
      Some car brands also include <strong>rear axle control</strong> mechanisms to enhance stability and
      reduce the risk of sideslip. Additionally, modern advancements have introduced
      <strong> steer-by-wire systems</strong>, although the lack of mechanical feedback can increase
      accident risk if not properly managed.
    </p>

    <h2 className="text-2xl font-bold text-red-600">How to Buy Car Steering Parts in India Quickly?</h2>

    <p>
      There’s no need to spend hours searching for steering system parts in stores or markets. At{" "}
      <strong>sparelo</strong>, you’ll find a complete list of steering system components from top global
      manufacturers at the best prices. Our easy-to-navigate online catalog helps you quickly find,
      compare, and order genuine or high-quality replacement steering parts for your vehicle.
    </p>

    <p>
      Shop conveniently from home and ensure your car maintains excellent control, precision, and safety
      with reliable steering components from <strong>sparelo</strong>.
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

export default Steering;
