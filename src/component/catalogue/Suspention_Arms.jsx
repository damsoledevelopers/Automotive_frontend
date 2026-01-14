import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";

const Suspention_Arms = () => {
  const suspensionCategories = [
    {
      name: "Air Suspension Boot",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/05ccea6.jpg",
      link: "/catalog/4347-boot_air_suspension/",
    },
    {
      name: "Arm Bush",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/12fcda5.jpg",
      link: "/catalog/4124-arm_bushes/",
    },
    {
      name: "Beam Axle",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/d659387.jpg",
      link: "/catalog/4983-beam_axle/",
    },
    {
      name: "Compressed Air System",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/0e8909a.jpg",
      link: "/catalog/5183-compressed_air_system/",
    },
    {
      name: "Inner Tie Rod",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/3eceb44.jpg",
      link: "/catalog/4524-inner_tie_rod/",
    },
    {
      name: "Leaf Spring Shackle",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/3f4b117.jpg",
      link: "/catalog/4903-leaf_spring_shackle/",
    },
    {
      name: "Shaft Seal Wheel Hub",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/981682b.jpg",
      link: "/catalog/4294-shaft_seal_wheel_hub/",
    },
    {
      name: "Shock Absorber and Strut",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/f26073e.jpg",
      link: "/catalog/3359-shock_absorber/",
    },
    {
      name: "Spring",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/c28be9b.jpg",
      link: "/catalog/3358-springs/",
    },
    {
      name: "Stabilizer Components",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/01da6e6.jpg",
      link: "/catalog/3682-stabilizer/",
    },
    {
      name: "Steering Knuckle",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/087f1a6.jpg",
      link: "/catalog/4551-joints_steering_knuckle/",
    },
    {
      name: "Suspension Bracket",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/bd9bd05.jpg",
      link: "/catalog/4575-suspension_bracket/",
    },
    {
      name: "Suspension Kit",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/4b9a03a.jpg",
      link: "/catalog/3363-suspension_kit/",
    },
    {
      name: "Suspension Links",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/30527a0.jpg",
      link: "/catalog/3684-suspension_links/",
    },
    {
      name: "Suspension Nut Bolt",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/dcbc54b.jpg",
      link: "/catalog/4574-suspension_nut/",
    },
    {
      name: "Suspension Seal",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/a4ba5bf.jpg",
      link: "/catalog/4989-suspension_seal/",
    },
    {
      name: "Tie Rod End",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/eb55b8b.jpg",
      link: "/catalog/4587-steering_linkage_tie_rod/",
    },
  ];


  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(suspensionCategories);
  const [expanded, setExpanded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = suspensionCategories.filter((item) =>
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
            Suspention and Arms
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore our wide range of suspension and arm components designed for optimal performance and safety.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Suspention and Arms"
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
    <h2 className="text-2xl font-bold text-red-600">About Car Air Suspension</h2>

    <p>
      The air suspension is one of the types of vehicle suspension. It is powered by an electric air pump
      that inflates flexible bellows, disconnecting the chassis from the axle. Some systems use pressurized
      liquid for the same function. This setup ensures a smooth and stable driving experience, supports
      the vehicle’s weight, and absorbs road shocks. Many low-riding trucks use this system to keep the
      wheels even and reduce body roll when turning.
    </p>

    <h2 className="text-2xl font-bold text-red-600">
      When Should Car Air Suspension Be Replaced?
    </h2>

    <p>
      The air suspension in cars should generally be replaced between <strong>50,000</strong> and{" "}
      <strong>70,000 miles</strong>, or every 10 years. However, you should check it sooner if you notice
      any issues. Common signs of a failing air suspension include:
    </p>

    <ul className="list-disc list-inside space-y-2 pl-4">
      <li>
        The car begins to sink because the suspension can no longer support its weight, affecting
        performance.
      </li>
      <li>
        The compressor continues running instead of stopping once the desired air pressure is reached.
      </li>
      <li>
        The ride becomes rough and bumpy, with noticeable rolling or leaning during braking or cornering.
      </li>
    </ul>

    <p>
      If you observe any of these signs, seek professional inspection immediately. Replacing worn-out
      suspension components early can prevent more costly damage and ensure safe driving.
    </p>

    <h2 className="text-2xl font-bold text-red-600">Our Advantages</h2>

    <p>
      Buying air suspension parts is easier than ever with <strong>sparelo</strong> — India’s largest
      online marketplace for car spare parts. You can purchase quality air suspension components with
      warranty and enjoy a seamless shopping experience. Here’s what you get:
    </p>

    <ul className="list-decimal list-inside space-y-2 pl-4">
      <li>
        Efficient search tools — find parts using the ID number, VIN, or other specifications to speed up
        your search.
      </li>
      <li>
        Access to your personal account — manage favorites, track sellers, and easily reorder from
        suppliers.
      </li>
      <li>
        A vast catalog — browse a wide range of products with clear images and detailed descriptions.
      </li>
      <li>
        Convenient ordering — choose from multiple payment and delivery options with email confirmations
        for every purchase.
      </li>
    </ul>

    <p>
      Looking for affordable, high-quality air suspension systems like <strong>AirRide</strong> or{" "}
      <strong>AirLift</strong>? You’ll find them all in the <strong>sparelo</strong> catalog. Browse freely
      without registration and contact us for assistance anytime.
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

export default Suspention_Arms;
