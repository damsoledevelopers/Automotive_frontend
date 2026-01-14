import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";

// Accessories Grid Data (like Sparelo)
const accessoriesCategories = [
  {
    name: "Audio System",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/f783c05.webp",
    link: "/catalog/5238-audio_system/",
  },
  {
    name: "Backup Camera",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/acc2e07.jpg",
    link: "/catalog/4781-backup_camera/",
  },
  {
    name: "Car Decal Sticker",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/cd57fbe.jpg",
    link: "/catalog/4746-sticker/",
  },
  {
    name: "Car Exterior Accessories",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/133fe77.jpg",
    link: "/catalog/5056-car_exterior_accessories/",
  },
  {
    name: "Car Interior Accessories",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/ff5c219.jpg",
    link: "/catalog/5040-car_interior_accessories/",
  },
  {
    name: "Emergency Breakdown",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7a96b35.jpg",
    link: "/catalog/4310-emergency_breakdown/",
  },
  {
    name: "Mobile Holder",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/0596f56.jpg",
    link: "/catalog/4759-mobile_holder/",
  },
  {
    name: "Other Accessories",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/0a482bd.webp",
    link: "/catalog/4795-other_accessories/",
  },
];

const Car_Accessories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <Breadcrumbs />

        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Car Accessories
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore essential car accessories to enhance comfort, safety, and
            style.
          </p>
        </div>

        {/* Search and Filters */}
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={setSortBy}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Car Accessories"
        />

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          {/* Accessories Grid */}
          <div className="flex-1">
            <div className="bg-white py-4 sm:py-6 md:py-8 px-3 sm:px-4 rounded-lg shadow-md mb-6 sm:mb-8 md:mb-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                {accessoriesCategories.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className="flex flex-col items-center bg-gray-50 hover:bg-blue-50 p-2 sm:p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-cover rounded-md mb-2"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100?text=' + item.name;
                      }}
                    />
                    <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium text-gray-700 hover:text-red-600 text-center line-clamp-2 px-1">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Info Section */}
            <section className="bg-white text-gray-800 py-6 px-4 rounded-2xl shadow-sm mt-10">
              <div
                className={`transition-all duration-500 ease-in-out ${
                  showMore ? "max-h-full" : "max-h-[600px] overflow-hidden"
                }`}
              >
                <p className="mb-4 leading-relaxed text-sm">
                  Do you need car accessories of any kind? Go to the unmatched
                  catalogue with the widest range of car spare parts and
                  accessories and find the items you need. Depending on the
                  vehicle model you have, you can buy the stuff you need to
                  update your car or improve its functionality. All accessories,
                  sold on our online platform, are quality products developed
                  and marketed by the reputable suppliers.
                </p>

                <h2 className="text-lg font-bold text-red-700 mt-6 mb-2">
                  About Car Accessories
                </h2>
                <p className="leading-relaxed mb-4">
                  Car accessories are essential components of any car serving
                  multifold purposes. You just cannot do without mud flaps or
                  floor mats. There are so many things being able to protect the
                  vital parts, make them look better and serve longer. You may
                  need elements intended for particular goals like to ensure a
                  secure riding when you transport the cargo or to have a clean
                  cabin when you travel with your pet. They just prevent early
                  wear and tear. Also, auto accessories are able to make your
                  driving experience smarter, adding more comfort and
                  ergonomics. You can apply special electronics, improve your
                  onboard music, and so on.
                </p>

                <h2 className="text-lg font-bold text-red-700 mt-6 mb-2">
                  Why You May Need Car Accessories
                </h2>
                <p className="leading-relaxed mb-2">
                  Buy car accessories online to have fewer issues with your car
                  and save money.
                </p>
                <ul className="list-decimal list-inside space-y-2 ml-4 text-gray-700">
                  <li>
                    Replace the ones that are worn out or add benefits by
                    introducing new accessories.
                  </li>
                  <li>
                    Get items that make your car look better and protect it from
                    damage.
                  </li>
                  <li>
                    Install new elements to improve functionality and create
                    more value.
                  </li>
                  <li>
                    Easily find the right products that suit your needs using
                    our platform.
                  </li>
                </ul>

                <h3 className="text-base font-semibold text-red-700 mt-8 mb-2">
                  Our Advantages
                </h3>
                <p className="leading-relaxed mb-2">
                  The{" "}
                  <span className="text-red-600 font-semibold">Sparelo</span> –
                  India’s largest online marketplace for car spare parts – was
                  launched in 2015. Since then, our database has expanded
                  continuously with new suppliers, manufacturers, and product
                  categories. We’re now a trusted mediator in India’s automotive
                  sector.
                </p>

                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                  <li>
                    A perfectly designed website full of features that make
                    browsing convenient.
                  </li>
                  <li>
                    A wide range of auto accessories and devices — both
                    aftermarket and branded.
                  </li>
                  <li>
                    Access to a safe deal feature to prevent fraudulent
                    transactions.
                  </li>
                  <li>
                    Easy returns if there are any issues, provided terms are
                    met.
                  </li>
                </ul>

                <p className="mt-4 leading-relaxed">
                  Browse through our car accessories list in{" "}
                  <span className="text-red-600 font-semibold">Sparelo’s</span>{" "}
                  unmatched catalogue — offering a wide range of quality
                  products. Enjoy our favorable conditions and professional
                  support!
                </p>
              </div>

              {/* Toggle Button */}
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-md"
                >
                  {showMore ? "View Less" : "View More"}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car_Accessories;
