import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";

const Wheels = () => {
  const wheelsCategories = [
    {
      name: "ABS Ring",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/c7fb168.jpg",
      link: "/catalog/4371-abs_ring/",
    },
    {
      name: "Drive Shaft",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/3039a13.jpg",
      link: "/catalog/4278-cv_axle/",
    },
    {
      name: "Drive Shaft Boot",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/68568c2.jpg",
      link: "/catalog/4279-cv_boot/",
    },
    {
      name: "Propeller Shaft",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/9c4c831.jpg",
      link: "/catalog/4442-axles_shafts/",
    },
    {
      name: "Rim",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/a7c102c.jpg",
      link: "/catalog/3624-rims/",
    },
    {
      name: "Spare Wheel Cover",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/c201207.jpg",
      link: "/catalog/4922-spare_wheel_cover/",
    },
    {
      name: "Wheel Balancing Weight",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/079615d.jpg",
      link: "/catalog/4911-wheel_balancing_weight/",
    },
    {
      name: "Wheel Bearing",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/7d499a7.jpg",
      link: "/catalog/3622-wheel_bearing/",
    },
    {
      name: "Wheel Hubs",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/4ee29a7.jpg",
      link: "/catalog/3621-wheel_hub/",
    },
  ];


  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(wheelsCategories);
  const [expanded, setExpanded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = wheelsCategories
      .filter((item) =>
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
            Wheels Parts
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore our wide range of wheels parts for all vehicle types.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Wheels"
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
                className={`space-y-4 overflow-hidden transition-all duration-500 ${expanded ? "max-h-full" : "max-h-[400px]"
                  }`}
              >
                <h2 className="text-2xl font-bold text-red-600">Buy Online Wheels Car Parts in India</h2>

                <p>
                  The wheel, being an essential part of the chassis, connects the car to the road. Through the wheels,
                  the vehicle achieves motion, transfers vertical loads, and absorbs road vibrations. Additionally,
                  the wheels create traction force when in contact with the road, meaning the car’s drivability and stability
                  depend greatly on them.
                </p>

                <p>
                  If you’re looking to buy quality parts for your vehicle, welcome to <strong>Sparelo</strong>. Here you’ll find:
                </p>

                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Highly professional service</li>
                  <li>Incredible range of necessary parts</li>
                  <li>Quality and certified spare parts</li>
                  <li>Original and modified details</li>
                  <li>Attractive prices for wheels car parts</li>
                  <li>Sales and much more!</li>
                </ul>

                <p>
                  Whether you choose original or analog parts, at full price or discount, you’ll receive a high-quality product
                  that extends your vehicle’s lifespan and ensures comfortable performance.
                </p>

                <h2 className="text-2xl font-bold text-red-600">Wheels Parts: Choose for Your Auto the Best Spares</h2>

                <p>A car wheel consists of two main components:</p>

                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Wheel disc</li>
                  <li>Tires</li>
                </ul>

                <p>
                  The wheel disc serves as the foundation for installing the tire and transferring rotation from the axle.
                  It structurally combines the disc and rim. There are two types of wheel rims — steel and light alloy.
                  In steel wheels, the rim and disc are welded together, while in alloy wheels, both form a single solid unit.
                </p>

                <p>The wheel disc is characterized by the following parameters:</p>

                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Rim width (distance between shelves)</li>
                  <li>Disc diameter (measured at the level of the shelves)</li>
                  <li>Offset (distance from the centerline of the disc to the hub mounting plane)</li>
                </ul>

                <p>
                  The car tire performs critical functions — ensuring grip on the road, providing stability, and supporting
                  the vehicle’s weight. A tubeless tire consists of several components: frame, breaker, tread, sidewall, and bead.
                </p>

                <h3 className="text-xl font-semibold text-red-600">
                  Prices for Wheels Car Parts: Catalog of Propositions on Sparelo
                </h3>

                <p>
                  On the Sparelo website, you’ll find everything your car needs. The wheel parts catalog includes more than
                  <strong> 171,000 items</strong>. You can search by part name, car model, or modification, and instantly view
                  all available options with technical specifications and prices.
                </p>

                <p>
                  A car is a complex system of interconnected components. The failure of a single part can lead to damage
                  in related assemblies and degrade the overall vehicle performance.
                </p>

                <p>
                  Remember — there are no unnecessary components in a modern car. Each part serves a purpose.
                  If a technical component fails, don’t delay the repair — it’ll save you costs in the future.
                  Partner with the best — visit <strong>Sparelo</strong> and keep your car performing like new.
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

export default Wheels;
