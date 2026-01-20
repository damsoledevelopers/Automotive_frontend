import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
import { generateCategoryWithProducts } from "../../utils/productDataGenerator";

const TowbarParts = () => {
  const towbarCategoriesBase = [
    {
      id: 1,
      name: "Towbar",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/4957913.jpg",
      link: "/catalog/part-p-24001",
    },
    {
      id: 2,
      name: "Tow Cable",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/096ef7b.jpg",
      link: "/catalog/part-p-24002",
    },
    {
      id: 3,
      name: "Towhook Cover",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/98b48d2.jpg",
      link: "/catalog/part-p-24003",
    },
  ];

  // Generate categories with product data
  const towbarCategories = generateCategoryWithProducts(towbarCategoriesBase, "Towbar Parts", 2200);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(towbarCategories);
  const [expanded, setExpanded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = towbarCategories.filter((item) =>
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
              Towbar Parts
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Discover a wide range of towbar parts for your vehicle, ensuring safety and reliability on the road.
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
              categoryName="Towbar Parts"
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
                    category: { name: "Towbar Parts", slug: "towbar_parts" }
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
            <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300 my-10">
              <div
                className={`space-y-4 overflow-hidden transition-all duration-500 ${expanded ? "max-h-full" : "max-h-[400px]"
                  }`}
              >
                <h2 className="text-2xl font-bold text-red-600">Catalog of Towbar Parts</h2>

                <p>
                  Traveling with a vehicle always carries certain risks — especially when towing a trailer. To ensure
                  your cargo remains safe and to avoid dangerous situations on the road, it’s essential to use a
                  reliable towing device — a <strong>towbar</strong>.
                </p>

                <p>
                  The internet is full of towbar parts listings, but finding trustworthy sellers can feel like a game
                  of chance — you might get a quality product or end up with something completely unreliable.
                </p>

                <p>
                  Fortunately, not all online stores are risky. At <strong>sparelo</strong>, one of India’s best online
                  auto parts marketplaces, you can find first-class products — both genuine and high-quality analogs.
                  We offer components for every car brand, whether you drive a sedan, SUV, or truck. It’s easy to
                  search by car code, model, or name to find exactly what you need.
                </p>

                <p>
                  Almost every car owner needs a towbar at some point. Towbars are traction-coupling devices used to
                  connect a trailer to a vehicle — commonly found on SUVs, crossovers, and even passenger cars.
                </p>

                <p>
                  Structurally, a towbar has two main parts:
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>
                      <strong>Crossbar (beam):</strong> Attached to the vehicle’s frame or body using special holes and
                      fasteners.
                    </li>
                    <li>
                      <strong>Tow ball:</strong> Mounted on the beam, it provides the coupling point for the trailer.
                    </li>
                  </ul>
                </p>

                <h2 className="text-2xl font-bold text-red-600">Buy Towbar Parts Online in India</h2>

                <p>
                  Installing a towbar is essential for those who tow trailers or lead an active lifestyle. Whether you
                  need to transport construction materials, oversized items, or travel with a trailer and tent,
                  towbars are a practical and secure solution.
                </p>

                <h2 className="text-2xl font-bold text-red-600">Price for Towbar Parts</h2>

                <p>
                  The <strong>sparelo</strong> catalog offers a wide selection of towbar components, including both
                  genuine and modified but high-quality parts. You’ll find over <strong>5,200+</strong> options in this
                  section, such as:
                </p>

                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Nagging</li>
                  <li>Roman bolt</li>
                  <li>Bumper cover bracket</li>
                  <li>Cover for towing eye</li>
                  <li>Towing hook</li>
                  <li>Front hook and more</li>
                </ul>

                <p>
                  Simply select your car model and part type, place your order, and enjoy quick delivery. Our reliable
                  service and competitive pricing will exceed your expectations.
                </p>

                <h3 className="text-xl font-semibold text-red-600">Sale Propositions on Sparelo</h3>

                <p>
                  At <strong>sparelo</strong>, we prioritize customer satisfaction and affordable pricing. Our towbar
                  parts range from as low as <strong>₹2</strong> to several thousand rupees, depending on the
                  component. Even without discounts, our prices remain some of the best in the market — and you can
                  often find great deals to save even more.
                </p>

                <p>
                  Don’t wait — order your towbar parts today and ensure your vehicle’s towing system performs safely
                  and efficiently with quality components from <strong>sparelo</strong>.
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

export default TowbarParts;
