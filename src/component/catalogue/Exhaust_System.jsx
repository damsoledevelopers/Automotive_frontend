import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
import { generateCategoryWithProducts } from "../../utils/productDataGenerator";

const Exhaust_System = () => {
  const exhaustCategoriesBase = [
  {
    id: 1,
    name: "Catalytic Converter",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/5acb744.jpg",
    link: "/catalog/part-p-12001",
  },
  {
    id: 2,
    name: "Cooler EGR",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/d1e33d6.jpg",
    link: "/catalog/part-p-12002",
  },
  {
    id: 3,
    name: "Diesel Particulate Filter",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/4509007.webp",
    link: "/catalog/part-p-12003",
  },
  {
    id: 4,
    name: "EGR Pipe",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/3f1a689.jpg",
    link: "/catalog/part-p-12004",
  },
  {
    id: 5,
    name: "EGR Valve",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/80f936e.jpg",
    link: "/catalog/part-p-12005",
  },
  {
    id: 6,
    name: "EGR Valve Gasket",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/16f8c0a.jpg",
    link: "/catalog/part-p-12006",
  },
  {
    id: 7,
    name: "Exhaust Gas Temperature Sensor",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/e813476.jpg",
    link: "/catalog/part-p-12007",
  },
  {
    id: 8,
    name: "Exhaust Manifold",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/f5db622.jpg",
    link: "/catalog/part-p-12008",
  },
  {
    id: 9,
    name: "Exhaust Manifold Gasket",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/955b4a7.jpg",
    link: "/catalog/part-p-12009",
  },
  {
    id: 10,
    name: "Exhaust Pipe",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/853e56e.jpg",
    link: "/catalog/part-p-12010",
  },
  {
    id: 11,
    name: "Exhaust Pipe Gasket",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/bad1141.jpg",
    link: "/catalog/part-p-12011",
  },
  {
    id: 12,
    name: "Exhaust System Bracket",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/342bada.jpg",
    link: "/catalog/part-p-12012",
  },
  {
    id: 13,
    name: "Exhaust System Rubber Strip",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/5188978.jpg",
    link: "/catalog/part-p-12013",
  },
  {
    id: 14,
    name: "Exhaust Tip",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/25a8ed2.jpg",
    link: "/catalog/part-p-12014",
  },
  {
    id: 15,
    name: "Intercooler",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/03c5278.jpg",
    link: "/catalog/part-p-12015",
  },
  {
    id: 16,
    name: "Lambda Sensor",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7a22417.jpg",
    link: "/catalog/part-p-12016",
  },
  {
    id: 17,
    name: "Resonator",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/c443254.jpg",
    link: "/catalog/part-p-12017",
  },
  {
    id: 18,
    name: "Silencer",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/90383f1.jpg",
    link: "/catalog/part-p-12018",
  },
  {
    id: 19,
    name: "Turbocharger",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7f1fc19.jpg",
    link: "/catalog/part-p-12019",
  },
  {
    id: 20,
    name: "Turbocharger Gasket",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/cf18261.jpg",
    link: "/catalog/part-p-12020",
  },
  {
    id: 21,
    name: "Turbocharger Hose",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/38b3dfc.jpg",
    link: "/catalog/part-p-12021",
  },
];

  // Generate categories with product data
  const exhaustCategories = generateCategoryWithProducts(exhaustCategoriesBase, "Exhaust System", 2000);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(exhaustCategories);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = exhaustCategories.filter((item) =>
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

        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
          Exhaust System Parts
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore our wide range of exhaust system parts designed to enhance your vehicle's performance and efficiency.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Exhaust System"
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
                    category: { name: "Exhaust System", slug: "exhaust" }
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
           <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300">
  <div className="space-y-4">
    {/* Intro Paragraph */}
    <p>
      Automobile exhaust system includes an exhaust manifold, car exhaust silencer and a catalytic converter. 
      The latter one is uncommon for old car models, it is installed mostly on modern automobiles. 
      The system realizes the transportation of high-temperature toxic polluting gases out of the entire vehicle, 
      and also reduces the level of noise inside an automobile and the waste gas concentration. 
      Eventually, the environment is polluted much less and an automobile, in its turn, produces less clatter in the process of movement.
    </p>

    {/* How it Works */}
    <h2 className="text-lg font-semibold text-red-600">How does an exhaust system work?</h2>
    <p>
      After the fuel-air mixture gets burnt all the poisonous gases left or produced get gathered in the collector. 
      The system transports all the elements left after burning to this part of the construction under high pressure. 
      Then all the poisonous compounds are transported from the collector to the receiver pipe.
    </p>
    <p>
      There is extremely high temperature in this part of exhaust system. It can reach up to one thousand degrees centigrade. 
      Then the gases get directly to the catalyzator through the goffer of the receiver pipe. 
      In this area of the system poisonous compounds that left mostly burn down and the toxic level of exhaust gas gets reduced. 
      In some models of cars the catalyzator essentially reduces the level of engine noise in addition to the resonator. 
      After gas-like products of burning pass the catalyzator and resonator they get inside the automobile silencer which additionally reduces 
      the noise produced and finally lets the rests of burnt compounds out of the automobile’s body.
    </p>

    {/* Fault Detection */}
    <h2 className="text-lg font-semibold text-red-600">How to notice foul-ups in the exhaust system?</h2>
    <p>The following symptoms can help you find out that your car has some problems with its exhaust system:</p>
    <ul className="list-disc list-inside space-y-1">
      <li>The movement of gases out of the silencer for car comes with unusually loud noise.</li>
      <li>The engine noticeably loses its power — for example, you may notice reduced acceleration.</li>
      <li>The engine works in an unstable manner, and you can notice RPM fluctuations at idle.</li>
      <li>You can notice a strong smell of exhaust gases inside the car.</li>
      <li>The details inside the construction get covered with carbon black.</li>
    </ul>
    <p>
      In case you notice at least one symptom out of the list, it is recommended to immediately apply to the car service station. 
      There is no point in waiting for the car to “heal itself” — otherwise, the damage may spread incrementally, 
      and engine repair costs will increase significantly.
    </p>
    <p>
      Mechanical damages and component rusting are the most widely spread reasons for exhaust system malfunction.
    </p>

    {/* Where to Buy */}
    <h2 className="text-lg font-semibold text-red-600">Where to buy spare parts for exhaust system?</h2>
    <p>
      There is a great list of original and aftermarket car spare parts from all over the world available at reasonable prices in our online shop. 
      We cooperate with a great number of car manufacturers and can easily pick up the necessary spares for any automobile make.
    </p>
    <p>
      Have a look at the price list, and if you need assistance selecting a component or placing an order, 
      please get in touch with us using any preferred means of communication.
    </p>
  </div>
</section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Exhaust_System;
