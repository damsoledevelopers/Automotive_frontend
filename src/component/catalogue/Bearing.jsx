import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
const bearingCategories = [
  {
    id: 1,
    name: "Rear Wheel Bearing",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/1c06dba.jpg",
    link: "/catalog/5128-rear_wheel_bearing/",
  },
  {
    id: 2,
    name: "Pilot Bearing",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/67a74ba.jpg",
    link: "/catalog/5130-pilot_bearing/",
  },
  {
    id: 3,
    name: "Shock Absorber Bearing",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/e56e31f.jpg",
    link: "/catalog/5132-strut_mount_and_bearing/",
  },
  {
    id: 4,
    name: "Transmission Bearing",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/f97ddeb.jpg",
    link: "/catalog/5131-bearing_manual_transmission/",
  },
  {
    id: 5,
    name: "Alternator Bearing",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/bce414f.jpg",
    link: "/catalog/5133-alternator_bearing/",
  },
  {
    id: 6,
    name: "Big End Bearing",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/40e95ca.jpg",
    link: "/catalog/5126-crankshaft_bearing/",
  },
  {
    id: 7,
    name: "Clutch Release Bearing",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/58e3bef.jpg",
    link: "/catalog/5129-clutch_bearing/",
  },
  {
    id: 8,
    name: "Crankshaft Bearing",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/19bcb3d.jpg",
    link: "/catalog/5134-crankshaft_bearing/",
  },
  {
    id: 9,
    name: "Front Wheel Bearing",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/98c6577.jpg",
    link: "/catalog/5127-front_wheel_bearing/",
  },
];


export const Bearing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(bearingCategories);
  const [expanded, setExpanded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  useEffect(() => {
    const filtered = bearingCategories.filter((item) =>
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

        {/* Header Section */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Bearings</h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Discover a wide range of automotive bearings ensuring smooth
            operation and longevity of your vehicle's components — including
            wheel bearings, clutch bearings, and more.
          </p>
        </div>

        {/* Search and Filter */}
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Bearing"
        />

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 my-4 sm:my-6 md:my-8">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
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
                  <span className="text-gray-800 font-medium text-[9px] sm:text-[10px] md:text-xs lg:text-sm line-clamp-2 px-1">
                    {product.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* SEO Content Section */}
            <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300">
              <div className="space-y-4">
                {/* Intro Paragraph */}
                <p className="text-sm">
                  Bearings play a crucial role in automotive systems, enabling smooth
                  motion and reducing friction between moving parts. There are various
                  types of bearings used in vehicles, each with its specific function.
                  In this article, we will delve into some common types of automotive
                  bearings, including clutch release bearings, crankshaft bearings,
                  wheel bearings, shock absorber bearings, and transmission bearings.
                </p>

                {/* Expandable Content */}
                <div className={`${expanded ? "block" : "hidden"} space-y-4`}>
                  <div>
                    <h2 className="text-lg font-semibold text-red-600 mb-2">
                      Clutch Release Bearing
                    </h2>
                    <p className="text-sm">
                      The clutch release bearing, also known as a throw-out bearing, is
                      a critical component in manual transmission systems. Positioned
                      between the clutch fork and the pressure plate, the clutch release
                      bearing disengages the clutch when the clutch pedal is pressed. It
                      typically comprises an outer ring, an inner ring, and rolling
                      elements, such as balls or rollers. When the clutch pedal is
                      depressed, the release bearing applies pressure to the pressure
                      plate, releasing the clutch and interrupting power transmission to
                      the drivetrain. Proper lubrication and regular maintenance of the
                      clutch release bearing are essential for smooth clutch operation
                      and to prevent premature wear or damage.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-red-600 mb-2">
                      Crankshaft Bearing
                    </h2>
                    <p className="text-sm">
                      The crankshaft bearing is a vital component in an internal
                      combustion engine. Located in the engine block, it supports the
                      crankshaft, which converts linear motion from the pistons into
                      rotational motion. Crankshaft bearings are typically designed as
                      journal bearings and can be made of different materials, including
                      bi-metal or tri-metal alloys. They are lubricated by engine oil
                      and comprise a thin layer of bearing material to reduce friction
                      and wear. Regular oil changes and maintenance are crucial to
                      ensure proper lubrication and prevent damage to the crankshaft
                      bearing, which can lead to engine failure.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-red-600 mb-2">
                      Wheel Bearing
                    </h2>
                    <p className="text-sm">
                      Wheel bearings are used in the wheel hubs of a vehicle and are
                      responsible for supporting the weight of the vehicle and enabling
                      smooth rotation of the wheels. They are subjected to various
                      loads, including radial and axial loads, as well as side loads
                      during cornering. Wheel bearings are typically designed as ball
                      bearings or tapered roller bearings, enclosed in a sealed or
                      unsealed unit. Proper lubrication and regular inspection for signs
                      of wear, such as noise, vibration, or looseness, are important for
                      the safe and reliable operation of wheel bearings. Timely
                      replacement of worn wheel bearings is crucial to ensure vehicle
                      stability and handling.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-red-600 mb-2">
                      Shock Absorber Bearing
                    </h2>
                    <p className="text-sm">
                      Shock absorber bearings, also known as strut bearings or mount
                      bearings, are used in the suspension system of a vehicle.
                      Positioned between the shock absorber or strut and the vehicle
                      body or suspension components, shock absorber bearings allow for
                      smooth rotation and movement of the shock absorber or strut. They
                      are typically designed as ball bearings or rubber mounts and help
                      reduce noise, vibration, and harshness (NVH) in the vehicle.
                      Regular inspection and replacement of worn shock absorber bearings
                      are necessary to maintain optimal suspension performance and ride
                      comfort.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-red-600 mb-2">
                      Transmission Bearing
                    </h2>
                    <p className="text-sm">
                      Transmission bearings are used in the transmission system of a
                      vehicle and are responsible for supporting the various gears and
                      shafts in the transmission. They are designed to withstand high
                      rotational speeds and heavy loads. Transmission bearings can be of
                      different types, including ball bearings, roller bearings, or
                      needle bearings, depending on the specific application. Proper
                      lubrication and regular inspection for signs of wear or damage,
                      such as gear shifting issues, noise, or vibration, are crucial for
                      the smooth and reliable operation of the transmission system.
                      Timely replacement of worn transmission bearings is essential to
                      ensure optimal gear shifting and prolong the lifespan of the
                      transmission.
                    </p>
                  </div>

                  <p className="text-sm">
                    In conclusion, bearings are vital components in various automotive
                    systems, ensuring smooth motion and reducing friction between moving
                    parts. Clutch release bearings, crankshaft bearings, wheel bearings,
                    shock absorber bearings, and transmission bearings are some common
                    types of bearings used in vehicles.
                  </p>
                </div>
              </div>

              {/* Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="px-5 py-2 bg-red-600  text-white rounded-md shadow-md transition-all duration-200"
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

export default Bearing;
