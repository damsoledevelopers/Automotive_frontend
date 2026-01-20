import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
import { generateCategoryWithProducts } from "../../utils/productDataGenerator";

// Categories Grid / Products Data
const catalogCategoriesBase = [
  { id: 1, name: "Air Filter", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a16bbf6.jpg", link: "/catalog/3729-air_filter/" },
  { id: 2, name: "Automatic Transmission Filter", img: "https://boodmo.com/media/cache/catalog_image/images/categories/21ce121.jpg", link: "/catalog/4895-automatic_transmission_filter/" },
  { id: 3, name: "Cabin Filter", img: "https://boodmo.com/media/cache/catalog_image/images/categories/5724225.jpg", link: "/catalog/3610-cabin_air_filter/" },
  { id: 4, name: "Filter", img: "https://boodmo.com/media/cache/catalog_image/images/categories/32a61d7.webp", link: "/catalog/5229-filter/" },
  { id: 5, name: "Filter Set", img: "https://boodmo.com/media/cache/catalog_image/images/categories/9e9e332.jpg", link: "/catalog/4573-filter_set/" },
  { id: 6, name: "Fuel Filter", img: "https://boodmo.com/media/cache/catalog_image/images/categories/82fc142.jpg", link: "/catalog/3707-fuel_filter/" },
  { id: 7, name: "Fuel Pump Filter", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e4ecb77.jpg", link: "/catalog/4337-filter_fuel_pump/" },
  { id: 8, name: "Oil Filter", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e59eb08.jpg", link: "/catalog/3725-oil_filter/" },
  { id: 9, name: "Receiver Drier", img: "https://boodmo.com/media/cache/catalog_image/images/categories/db9dad4.jpg", link: "/catalog/part-p-2009" },
];

// Generate categories with product data
const catalogCategories = generateCategoryWithProducts(catalogCategoriesBase, "Filter", 800);

const Filters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(catalogCategories);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Search
  useEffect(() => {
    const filtered = catalogCategories.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  // Sort (by name)
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

        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Filter Parts</h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              This section contains various filters for your vehicle including air filters, oil filters,
              fuel filters, and more.
            </p>
          </div>
          <div className="flex-shrink-0">
            {/* Search and Filter Bar */}
            <SearchFilterBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              handleSort={handleSort}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              categoryName="Filters"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          {/* Categories Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 my-4 sm:my-6 md:my-8">
              {filteredProducts.map((category) => (
                <Link
                  key={category.id}
                  to={category.link}
                  state={{ 
                    product: category.product,
                    category: { name: "Filters", slug: "filters" }
                  }}
                  className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
                >
                   <img
                    src={category.img}
                    alt={category.name}
                    className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-cover rounded-md mb-2 mx-auto"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=' + category.name;
                    }}
                  />
                  <span className="text-gray-800 font-medium text-[9px] sm:text-[10px] md:text-xs lg:text-sm line-clamp-2 px-1">{category.name}</span>
                </Link>
              ))}
            </div>

            {/* Content Section */}

            <section class="bg-white text-gray-800 py-10 px-6 w-full">
              <div class="space-y-4">
                {/* <!-- Section Title --> */}
                <h2 class="text-2xl md:text-3xl font-bold text-red-700 border-b-2 border-red-300 inline-block pb-2">
                  About Filters Parts
                </h2>

                {/* <!-- Intro Paragraphs --> */}
                <p class="font-medium leading-relaxed">
                  Filters are the dirtiest parts of the car. They need to be replaced much more often than any other parts.
                  The selection and installation of filters should be treated with special attention, since the "price" of an error
                  can be very high — damage to the engine or the entire fuel system. Installing a quality filter is much more
                  profitable than repairing expensive equipment.
                </p>

                {/* <!-- Online Purchase Info --> */}
                <h3 class="text-xl font-semibold text-red-700 mt-8">Buy Online Filters Parts in India</h3>
                <p class="font-medium leading-relaxed">
                  Now most purchases are made online. Spare parts for cars, in particular, are no exception.
                  <span class="text-red-600 font-semibold">Boodmo’s</span> auto parts online store has a wide range of components
                  and accessories for foreign cars at reasonable prices. Everything presented in the parts catalog has a quality
                  certificate, unlike those you can buy in auto markets, and our prices are much lower than in dealer service centers.
                </p>

                {/* <!-- Original Parts Info --> */}
                <h3 class="text-xl font-semibold text-red-700 mt-8">Find Original Details for Your Car on Boodmo</h3>
                <p class="font-medium leading-relaxed">
                  There are Internet portals that offer first-class products, regardless of whether they are original or analog.
                  Purchase online filters parts in India on the <span class="text-red-600 font-semibold">Boodmo</span> website.
                  Here you can purchase components for any brand of car, choosing new or modified details by car code or name.
                </p>

                {/* <!-- List of Filters --> */}
                <p class="font-medium leading-relaxed">
                  In modern cars, with rare exceptions, four filters are installed:
                </p>
                <ul class="list-disc list-inside space-y-2 ml-4 text-gray-700 font-medium">
                  <li>Oily filter</li>
                  <li>Fuel filter</li>
                  <li>Air filter</li>
                  <li>Cabin (salon) filter</li>
                </ul>

                <p class="font-medium leading-relaxed">
                  Of course, car designs differ. Some may not have a cabin filter, others have two, and V-type engines have two air filters.
                  The fuel filter is often combined with the pump and installed in the tank.
                </p>

                {/* <!-- Brand Choice Info --> */}
                <p class="font-medium leading-relaxed">
                  There are many manufacturers of car filters, so it is not always easy to make the right choice.
                  To avoid risk, we recommend choosing a proven brand with experience and reliability.
                </p>

                {/* <!-- Replacement Guidance --> */}
                <p class="font-medium leading-relaxed">
                  For each specific car, the manufacturer sets its own, clearly regulated terms for replacing filters.
                  You can deviate from these recommendations, but only to shorten the interval — never extend it.
                  Exceeding replacement intervals or using low-quality filters can lead to severe damage.
                  Therefore, do not delay replacement — contact <span class="text-red-600 font-semibold">Boodmo</span> today
                  and keep your car in perfect health!
                </p>

                {/* <!-- Price and Offers --> */}
                <h3 class="text-xl font-semibold text-red-700 mt-8">Availability & Price for Filters Car Parts</h3>
                <p class="font-medium leading-relaxed">
                  The service of the store will pleasantly surprise you, and the price for filters car parts will please you.
                  Thanks to sale offers, you can save from <span class="font-semibold">5% to 39%</span> on the price of parts.
                  Pretty good, right? Therefore, do not delay and do not look for a better store — you will find everything you need here
                  for the perfect performance of your car.
                </p>

                {/* <!-- Catalog Info --> */}
                <p class="font-medium leading-relaxed">
                  The catalog of auto components and details in <span class="text-red-600 font-semibold">Boodmo</span> allows you
                  to find all needed elements. The catalog includes only high-quality parts and features more than
                  <span class="font-semibold">164,500</span> offers. In particular, the site presents:
                </p>
                <ul class="list-disc list-inside space-y-2 ml-4 text-gray-700 font-medium">
                  <li>Fuel filters</li>
                  <li>Air filters</li>
                  <li>Oil filters</li>
                  <li>Filter sets and more</li>
                </ul>

                <p class="font-medium leading-relaxed">
                  Choosing and buying spare parts will not take much time: simply select your car model and modification,
                  make a request, and place your order. You can pick up the purchase yourself or use courier delivery.
                </p>

                {/* <!-- View More Button --> */}
                <div class="text-center mt-8">
                  <button
                    class="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-md"
                  >
                    View More
                  </button>
                </div>
              </div>
            </section>

            {/* Keep your existing content section unchanged */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;

