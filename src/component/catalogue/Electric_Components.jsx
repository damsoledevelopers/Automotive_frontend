import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
import { generateCategoryWithProducts } from "../../utils/productDataGenerator";

const catalogCategoriesBase = [
  {
    name: "Alternator",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/fc36a32.webp",
    link: "/catalog/4924-alternator_components/",
  },
  {
    name: "Antenna Cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7bed729.jpg",
    link: "/catalog/4820-antenna_cable/",
  },
  {
    name: "Audio System",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/f783c05.webp",
    link: "/catalog/5103-audio_system/",
  },
  {
    name: "Battery",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/0353536.jpg",
    link: "/catalog/3394-battery/",
  },
  {
    name: "Battery Cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/938c814.jpg",
    link: "/catalog/4821-battery_cable/",
  },
  {
    name: "Battery Cover",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/13c8c53.jpg",
    link: "/catalog/4835-battery_cover/",
  },
  {
    name: "Battery Holder",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/84951b1.jpg",
    link: "/catalog/4377-battery_holder/",
  },
  {
    name: "Battery Terminal",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/c53458b.jpg",
    link: "/catalog/4902-electric_terminal/",
  },
  {
    name: "Battery Terminal Cap",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/e23a735.jpg",
    link: "/catalog/4938-battery_terminal_cap/",
  },
  {
    name: "Bonnet Release Cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/b478d6a.jpg",
    link: "/catalog/4816-bonnet_release_cable/",
  },
  {
    name: "Boot Release Cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7efa684.jpg",
    link: "/catalog/4812-trunk_release_cable/",
  },
  {
    name: "Central Locking System",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/44d334d.jpg",
    link: "/catalog/4631-locking_system/",
  },
  {
    name: "Charging Station",
    img: "https://boodmo.com/media/cache/catalog_list/placeholder/product_default.jpg",
    link: "/catalog/5250-charging_station/",
  },
  {
    name: "Control Unit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/35cec10.jpg",
    link: "/catalog/3566-control_units/",
  },
  {
    name: "Control Unit Bracket",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/5a159ab.jpg",
    link: "/catalog/4865-control_unit_bracket/",
  },
  {
    name: "Electric Drive",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/090a41d.jpg",
    link: "/catalog/3432-electric_drive/",
  },
  {
    name: "Fuse",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/f04266a.jpg",
    link: "/catalog/4138-fuse/",
  },
  {
    name: "Fuse Box",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/c1a6955.jpg",
    link: "/catalog/4218-fuse_box_holder/",
  },
  {
    name: "Glow Plug",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/d6d71f0.jpg",
    link: "/catalog/4387-glow_plug/",
  },
  {
    name: "Horn",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/73f26ff.jpg",
    link: "/catalog/3573-horn/",
  },
  {
    name: "Horn Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_list/placeholder/product_default.jpg",
    link: "/catalog/5249-horn_repair_kit/",
  },
  {
    name: "Information and Communication System",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/1812a94.jpg",
    link: "/catalog/3415-information_communication_systems_parts/",
  },
  {
    name: "Intake Air Temperature Sender Unit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/3f656e1.jpg",
    link: "/catalog/4216-sender_unit_intake_air_temperature/",
  },
  {
    name: "Light",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/3f5669b.jpg",
    link: "/catalog/3392-lights/",
  },
  {
    name: "Mirror Actuator",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/28328c9.jpg",
    link: "/catalog/4794-mirror_actuator/",
  },
  {
    name: "Power Window Motor",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/15136a2.jpg",
    link: "/catalog/4136-electric_motor_window_winder/",
  },
  {
    name: "Printed Circuit Board",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/d3e0888.jpg",
    link: "/catalog/4899-printed_circuit_board/",
  },
  {
    name: "Radiator Fan Motor",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/5bcc9b3.jpg",
    link: "/catalog/4618-radiator_fan_motor/",
  },
  {
    name: "Reflector",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/06899a1.jpg",
    link: "/catalog/4212-reflectors/",
  },
  {
    name: "Relay",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/feaf1d7.jpg",
    link: "/catalog/3570-fuses_relays/",
  },
  {
    name: "Seat Cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/d062912.jpg",
    link: "/catalog/4862-seat_cable/",
  },
  {
    name: "Security System",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/cd1d0c9.jpg",
    link: "/catalog/3757-security_system/",
  },
  {
    name: "Sensor",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/43d8869.jpg",
    link: "/catalog/3569-sensors/",
  },
  {
    name: "Spark Plug",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/acd0058.jpg",
    link: "/catalog/3649-ignition/",
  },
  {
    name: "Speedometer Cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/9efd9d6.jpg",
    link: "/catalog/4231-speedometer_cable/",
  },
  {
    name: "Starter",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/d0d1147.webp",
    link: "/catalog/4934-starter_motor_components/",
  },
  {
    name: "Starter Relay",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/994361b.jpg",
    link: "/catalog/4629-starter_relay/",
  },
  {
    name: "Sunroof Motor",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/0d166f1.jpg",
    link: "/catalog/4786-sunroof_motor/",
  },
  {
    name: "Switch",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/1491b23.jpg",
    link: "/catalog/3604-switches/",
  },
  {
    name: "Temperature Control Cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/6e8366a.jpg",
    link: "/catalog/4815-temperature_control_cable/",
  },
  {
    name: "V-belt",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/d62eec8.jpg",
    link: "/catalog/3732-v_belt/",
  },
  {
    name: "Voltage Stabilizer",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/c51d241.jpg",
    link: "/catalog/4943-voltage_stablizer/",
  },
  {
    name: "Windscreen Cleaning Parts",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/070fa64.jpg",
    link: "/catalog/3411-windscreen_cleaning_parts/",
  },
  {
    name: "Wiring Cover",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/9175ca5.jpg",
    link: "/catalog/4942-wiring_cover/",
  },
  {
    name: "Wiring Harness",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/63b394d.jpg",
    link: "/catalog/3572-wiring_harness/",
  },
  {
    name: "Wiring Harness Bracket",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/41722f8.jpg",
    link: "/catalog/4948-wiring_harness_bracket/",
  },
];

// Generate categories with product data - IDs will be auto-generated from index if missing
const catalogCategories = generateCategoryWithProducts(
  catalogCategoriesBase.map((item, index) => ({
    ...item,
    id: item.id || (index + 1),
    link: item.link.startsWith('/catalog/part-p-') ? item.link : `/catalog/part-p-${10000 + index + 1}`
  })),
  "Electrical Components",
  1500
);

export const Electric_Components = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(catalogCategories);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Search filter
  useEffect(() => {
    const filtered = catalogCategories.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  // Sort by name
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
      <div className="w-full px-3 sm:px-4 md:px-6">
        <Breadcrumbs />

        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Electric Components
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore a wide range of electric components including alternators,
            batteries, starter motors, ignition coils, bulbs, and more for your vehicle.
          </p>
        </div>

        {/* Search Filter Bar */}
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Electric Components"
        />

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          {/* Categories Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 my-4 sm:my-6 md:my-8">
              {filteredProducts.map((category, index) => (
                <Link
                  key={category.id || index}
                  to={category.link}
                  state={{ 
                    product: category.product,
                    category: { name: "Electrical Components", slug: "electric_components" }
                  }}
                  className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
                >
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-14 h-14 object-cover rounded-md mb-2 mx-auto"
                  />
                  <span className="text-gray-800 font-medium text-xs">{category.name}</span>
                </Link>
              ))}
            </div>

            {/* SEO Content Section */}
            <section className="bg-white text-gray-800 py-10 px-6 w-full">
              <div className="space-y-4">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-red-700 border-b-2 border-red-300 inline-block pb-2">
                  About Electric Components
                </h2>

                <p className="font-medium leading-relaxed">
                  The electrical system of a car is the lifeline that powers
                  everything from ignition to lighting. Without reliable electric
                  components, your vehicle can face serious performance issues or even fail to start.
                </p>

                <h3 className="text-xl font-semibold text-red-700 mt-8">
                  Importance of Electric Car Parts
                </h3>
                <p className="font-medium leading-relaxed">
                  Electrical components control all vital systems — starting the
                  engine, charging the battery, powering the lights, and ensuring
                  smooth operation of sensors and safety mechanisms.
                  A well-maintained electrical system ensures better performance
                  and long-lasting reliability.
                </p>

                <h3 className="text-xl font-semibold text-red-700 mt-8">
                  Buy Car Electrical Parts Online in India
                </h3>
                <p className="font-medium leading-relaxed">
                  <span className="text-red-600 font-semibold">Boodmo</span> offers a wide selection of electrical
                  components — from alternators and batteries to relays and
                  wiring harnesses. All parts come from trusted suppliers,
                  ensuring OEM-grade quality and fair pricing.
                </p>

                <p className="font-medium leading-relaxed">
                  Shopping online for car electric parts is simple and quick.
                  Compare brands, check reviews, and order the right part
                  that fits your car perfectly.
                </p>

                <h3 className="text-xl font-semibold text-red-700 mt-8">
                  Common Electric Components in Cars
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 font-medium">
                  <li>Battery</li>
                  <li>Alternator</li>
                  <li>Starter Motor</li>
                  <li>Ignition Coil</li>
                  <li>Fuse Box</li>
                  <li>Headlights & Tail Lights</li>
                  <li>Wiring Harness</li>
                </ul>

                <p className="font-medium leading-relaxed">
                  Each of these components plays a crucial role in maintaining
                  your vehicle’s electrical health. Faulty parts can lead to
                  dim lights, weak ignition, or complete electrical failure.
                </p>

                <h3 className="text-xl font-semibold text-red-700 mt-8">
                  Availability & Price for Electric Car Parts
                </h3>
                <p className="font-medium leading-relaxed">
                  You can save up to <span className="font-semibold">10% - 35%</span> on selected
                  electric components at <span className="text-red-600 font-semibold">Boodmo</span>.
                  Get authentic products, easy returns, and doorstep delivery
                  for all your electrical needs.
                </p>

                <p className="font-medium leading-relaxed">
                  With over <span className="font-semibold">100,000+</span> parts available in the
                  catalogue, finding the correct match for your vehicle has never
                  been easier. Maintain your car’s electrical system efficiently
                  and drive confidently with trusted components.
                </p>

                {/* View More Button */}
                <div className="text-center mt-8">
                  <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-md">
                    View More
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
