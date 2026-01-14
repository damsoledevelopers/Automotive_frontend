import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";

const Oil_Fluids = () => {
  const fluidCategories = [
  {
    name: "AC Compressor Oil",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/2224a28.jpg",
    link: "/catalog/4991-ac_compressor_oil/",
  },
  {
    name: "Additives",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/2f6c6b5.jpg",
    link: "/catalog/5077-additives/",
  },
  {
    name: "Brake Fluid",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/3de286d.jpg",
    link: "/catalog/4318-brake_fluid/",
  },
  {
    name: "Coolant",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/12028d8.jpg",
    link: "/catalog/4725-coolant/",
  },
  {
    name: "Engine Oil",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/eb8ece2.jpg",
    link: "/catalog/3728-oil/",
  },
  {
    name: "Exhaust Fluid",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/922f615.webp",
    link: "/catalog/5105-exhaust_fluid/",
  },
  {
    name: "Steering Oil",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/316834f.jpg",
    link: "/catalog/4552-steering_oil/",
  },
  {
    name: "Transmission Oil",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/fd37652.jpg",
    link: "/catalog/4556-transmission_oil/",
  },
  {
    name: "Windshield Washer Fluid",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7ecbe41.jpg",
    link: "/catalog/4734-windshield_washer_fluid/",
  },
];

  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(fluidCategories);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = fluidCategories.filter((item) =>
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
           Oil and Fluids
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore our extensive range of oil and fluids designed to keep your engine running smoothly and efficiently.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Oil_Fluids"
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
        <h2 className="text-2xl font-bold text-red-600">About Automobile Lubricants</h2>

        <p>
          The most required lubricants are motor oil and transmission fluid. These fluidic
          substances reduce friction between contacting surfaces of moving parts. They are composed
          of two main ingredients — base oils and additives, which form about 20% of the mixture.
          Additives enhance friction reduction, increase viscosity, and provide protection against
          corrosion. Quality and efficient engine oil ensures the engine performs properly and
          prevents component damage.
        </p>

        <p>
          There are three groups of automotive lubricants. Engine oils keep the motor clean and
          rust-free, improving fuel efficiency, reducing emissions, and extending engine life. Gear
          oils are designed for vehicle gearboxes and are known for their high viscosity. Hydraulic
          oils are used in hydraulic systems to transmit hydrostatic power.
        </p>

        <h3 className="text-xl font-semibold text-red-600">
          When Should Automobile Lubricants Be Replaced?
        </h3>

        <p>
          There’s no universal standard for changing lubricants since it depends on car make and
          model. On average, it should be replaced every 3,000 miles or three months. For newer cars,
          the interval may be longer. Always follow the manufacturer’s guide. You may also notice
          signs indicating it’s time for an oil change:
        </p>

        <ol className="list-decimal list-inside space-y-2 pl-4">
          <li>
            The oil change light or engine warning light appears, indicating low oil or engine
            issues.
          </li>
          <li>
            Knocking or unusual noises from the motor — due to lack of lubrication between moving
            parts.
          </li>
          <li>Dark, dirty oil signals old or contaminated lubricants.</li>
          <li>
            Smell of oil inside the cabin may indicate a lubricant leak that needs attention.
          </li>
          <li>
            Smoke emissions from the exhaust — a serious sign of engine distress that needs a
            check-up.
          </li>
        </ol>

        <h3 className="text-xl font-semibold text-red-600">Our Advantages</h3>

        <p>
          Enjoy shopping with <strong>boodmo</strong> — India’s largest online marketplace for car
          spare parts and accessories. We offer numerous brands and manufacturers to meet your
          personal requirements, along with convenient user experience features:
        </p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Free registration — no fees to join or use our marketplace.</li>
          <li>
            Transparent pricing — no hidden charges or administrative interference in transactions.
          </li>
          <li>
            A convenient personal account where you can easily add, edit, or delete information.
          </li>
          <li>
            Security — your personal and financial data is never misused and only used for relevant
            notifications.
          </li>
          <li>Special offers, promotions, and events for additional benefits.</li>
        </ul>

        <p>
          Lubricants are essential for every car and should always be replaced as per manufacturer
          recommendations for optimal performance. Visit the{" "}
          <strong>boodmo car spare parts catalogue</strong> to explore the widest range of
          high-quality lubricants with easy navigation and advanced search options.
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

export default Oil_Fluids;
