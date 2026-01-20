import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
import { generateCategoryWithProducts } from "../../utils/productDataGenerator";

const Ignition_Glowplug = () => {
  const ignitionCategoriesBase = [
    {
      id: 1,
      name: "Contact Breaker",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/642c31f.jpg",
      link: "/catalog/part-p-15001",
    },
    {
      name: "Control Unit Glow Plug System",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/2676bd2.jpg",
      link: "/catalog/4115-control_unit_glow_plug_system/",
    },
    {
      name: "Distributor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/b8173dd.jpg",
      link: "/catalog/4173-distributor_and_parts/",
    },
    {
      name: "Distributor Cap",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/acb5c92.jpg",
      link: "/catalog/4580-distributor_cap/",
    },
    {
      name: "Distributor Rotor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/25a45f4.jpg",
      link: "/catalog/4221-distributor_rotor/",
    },
    {
      name: "Glow Plug",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/d6d71f0.jpg",
      link: "/catalog/3651-glow_plug/",
    },
    {
      name: "Ignition Cable",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/e8f253d.jpg",
      link: "/catalog/4189-plug_spark_plug/",
    },
    {
      name: "Ignition Coil",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/ea7e9fc.jpg",
      link: "/catalog/4182-igniton_coil/",
    },
    {
      name: "Ignition Module",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/c83380f.jpg",
      link: "/catalog/4584-ignition_module/",
    },
    {
      name: "Ignition Plug Sleeve Connector",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/0a87d5d.jpg",
      link: "/catalog/4999-ignition_plug_sleeve/",
    },
    {
      name: "Ignition Switch",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/0489ab9.jpg",
      link: "/catalog/4153-ignition_switch/",
    },
    {
      name: "Spark Plug",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/acd0058.jpg",
      link: "/catalog/3630-spark_glow_plug/",
    },
  ];

  // Generate categories with product data
  const ignitionCategories = generateCategoryWithProducts(
    ignitionCategoriesBase.map((item, index) => ({
      ...item,
      id: item.id || (index + 1),
      link: item.link.startsWith('/catalog/part-p-') ? item.link : `/catalog/part-p-${15000 + index + 1}`
    })),
    "Ignition & Glowplug System",
    1400
  );

  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(ignitionCategories);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = ignitionCategories.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, ignitionCategories]);

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

        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Ignition and Glowplug System
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore our range of high-quality ignition and glowplug systems designed for optimal performance and durability.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Ignition_Glowplug"
        />

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
                    category: { name: "Ignition & Glowplug System", slug: "ignition_glowplug" }
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
              <div className={`space-y-4 overflow-hidden transition-all duration-500 ${expanded ? "max-h-full" : "max-h-[400px]"}`}>
                <h2 className="text-2xl font-bold text-red-600">
                  Buy Online Ignition and Glow Plug System Parts in India
                </h2>

                <p>
                  Now most purchases are made online on the Internet. Spare parts for cars, in particular, were no exception.
                  Boodmo’s auto parts online store has a wide range of components and accessories for foreign cars at reasonable
                  prices. Everything presented in the parts catalog has a quality certificate, unlike those you can buy in auto
                  markets, and our prices are much lower than in dealer service centers.
                </p>

                <p>
                  Since car spark plugs are not the most expensive component, replacing them is a simple maintenance job that can
                  definitely improve the performance of your car. With the help of an accurate selection of spare parts by car
                  brand and model on the website Boodmo, you can quickly find the right spark plugs for your car. We wish you
                  successful purchases and reliable operation of all components of your car!
                </p>

                <h2 className="text-2xl font-bold text-red-600">
                  Find Original Details for Your Car in Boodmo: Price for Ignition and Glow Plug System Parts
                </h2>

                <p>
                  There are really Internet portals that offer a first-class product, regardless of whether it is original or
                  analog. You can buy online different parts in India on the site Boodmo. Here you can purchase components for any
                  brand of car. It is easy to choose new or modified details by car code or name.
                </p>

                <p>
                  Most drivers will never know what a glow plug is. If your car runs on gasoline, you won't have a glow plug in
                  the engine, but you will have spark plugs. However, if you've come across the term glow plug before, you might be
                  wondering what it means. Similarly, if you drive a car with a diesel engine, you definitely need to know what a
                  glow plug is.
                </p>

                <p>
                  Simply put, a glow plug is a diesel version of a spark plug or even a tiny heater for a diesel engine. It's not
                  exactly the same, but similar. A glow plug is a heating device that makes it easier to start a diesel engine in
                  cold weather. This is because diesel can have trouble starting in cold weather because it is slightly thicker
                  than gasoline. The lower the temperature drops, the harder it is to get diesel fuel moving.
                </p>

                <p>
                  While the spark plug in a traditional gasoline engine literally creates a spark that allows the fuel-air mixture
                  to ignite, a glow plug simply raises the temperature of the diesel fuel and air so that when the mixture is
                  compressed, it can ignite.
                </p>

                <h3 className="text-xl font-semibold text-red-600">
                  Ignition and Glow Plug System Parts: Availability of Propositions
                </h3>

                <p>
                  The service of the store will pleasantly surprise you, and the price for ignition and glow plug system parts will
                  please you. The parts you need cost a minimum. Thanks to sale offers, you can save from 17% to 52% on the price
                  of parts. Pretty good, right? Therefore, do not delay and do not look for a better store. You will find here
                  everything you need for the perfect performance of your car.
                </p>

                <p>
                  The catalog of auto components and details in Boodmo allows you to find all needed elements. The catalog includes
                  only high-quality parts. If you go to this section, you will see the product range, which includes almost 90
                  thousand offers. In particular, the site presents:
                </p>

                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Set of locks of 3 units with 2 keys</li>
                  <li>Set of 4 locks with 2 keys</li>
                  <li>Set of locks of 5 units with 2 keys</li>
                  <li>Steering wheel ignition lock with 2 keys</li>
                  <li>Incandescent candles</li>
                  <li>Spark plugs and more</li>
                </ul>

                <p>
                  Choosing and buying spare parts will not take you much time: just choose the car model and modification and make
                  a demand. After placing the order, you can pick up the purchase yourself or use courier delivery.
                </p>
              </div>

              {/* Toggle Button */}
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

export default Ignition_Glowplug;
