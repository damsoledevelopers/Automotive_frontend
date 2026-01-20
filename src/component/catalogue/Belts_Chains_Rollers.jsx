import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
import { generateCategoryWithProducts } from "../../utils/productDataGenerator";

const Belts_Chains_Rollers = () => {
  const beltchainCategoriesBase = [
    {
      id: 1,
      name: "Alternator Pulley",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/c5dd61e.jpg",
      link: "/catalog/part-p-6001",
    },
    {
      id: 2,
      name: "Belt Pulley",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/929ed3b.jpg",
      link: "/catalog/part-p-6002",
    },
    {
      id: 3,
      name: "Crankshaft Pulley",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/8feca49.jpg",
      link: "/catalog/part-p-6003",
    },
    {
      id: 4,
      name: "Deflection Pulley",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/61df28c.jpg",
      link: "/catalog/part-p-6004",
    },
    {
      id: 5,
      name: "Timing Belt",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
      link: "/catalog/part-p-6005",
    },
    {
      id: 6,
      name: "Timing Belt Kit",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/ca3d002.jpg",
      link: "/catalog/part-p-6006",
    },
    {
      id: 7,
      name: "Timing Chain",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/9cf64ba.jpg",
      link: "/catalog/part-p-6007",
    },
    {
      id: 8,
      name: "Timing Chain Guide",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/bcd5e9d.jpg",
      link: "/catalog/part-p-6008",
    },
    {
      id: 9,
      name: "V-belt",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/bd71bdc.jpg",
      link: "/catalog/part-p-6009",
    },
  ];

  // Generate categories with product data
  const beltchainCategories = generateCategoryWithProducts(beltchainCategoriesBase, "Belts Chains And Rollers", 1200);


  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(beltchainCategories);
  const [expanded, setExpanded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = beltchainCategories.filter((item) =>
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
            Belts, Chains & Rollers Parts
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore our extensive range of belts, chains, and rollers for all your automotive needs.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Belts_Chains_Rollers"
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
                    category: { name: "Belts Chains And Rollers", slug: "belts_chains_rollers" }
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
              <div
                className={`transition-all duration-500 overflow-hidden ${expanded ? "max-h-full" : "max-h-[500px]"
                  }`}
              >
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">
                    Buy online belts chains and rollers parts in India
                  </h2>
                  <p className="text-sm">
                    On cars with internal combustion engines, the crankshaft works in one
                    connection with the camshaft. This is necessary for the timely opening
                    of the intake and exhaust valves with the simultaneous injection of a
                    portion of the fuel mixture into the combustion chambers, the emission
                    of exhaust gases into the exhaust manifold.
                  </p>
                  <p className="text-sm">
                    Both shafts are connected by a belt or chain. All elements wear out
                    over time, which causes frictional forces and mechanical loads. To
                    understand when you need to change the timing belt, you need to
                    periodically inspect it. This is done during scheduled technical
                    inspections. And with significant runs, it is better to do them more
                    often.
                  </p>
                  <p className="text-sm">
                    New belts, rollers, chains and tensioners (drive belt, timing belt)
                    must be completely identical to the parts to be replaced.
                  </p>
                  <p className="text-sm">
                    Current new tendencies contribute to the transition of all industries
                    to the Internet. This transition also applies to auto parts stores. If
                    you are looking for a place to buy the necessary parts for your auto,
                    welcome to Boodmo.
                  </p>
                  <p className="text-sm">
                    Before buying the necessary part, you should make sure that it is
                    exactly what is needed to eliminate the problem and find out how it
                    works and what its work consists of.
                  </p>
                  <p className="text-sm">
                    For those who are looking for belts, chains and rollers parts, it is
                    necessary to go to the appropriate section on the website and choose
                    the desired option. Among almost 151,500 offers in availability, you
                    will definitely find the necessary modification for your car model.
                  </p>

                  <h2 className="text-lg font-semibold">
                    Belts Chains and Rollers Parts
                  </h2>
                  <p className="text-sm">The most popular are:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Polyclinic belt</li>
                    <li>Tensioner</li>
                    <li>Guide pulley</li>
                    <li>Tension roller</li>
                    <li>Toothed belt and others</li>
                  </ul>
                  <p className="text-sm">
                    You will be delighted with the high level of service, and the catalog
                    of offers will pleasantly surprise you with its assortment.
                  </p>

                  <h3 className="text-xl font-semibold">
                    Only original spare parts for your car in the Boodmo
                  </h3>
                  <p className="text-sm">
                    The performance of your car directly depends on the quality of the
                    replaced parts. As for the goods purchased on Boodmo, you can rest
                    assured. The online store guarantees the quality of all presented
                    parts. Mainly original spare parts are presented here. However, even
                    modified spare parts have appropriate quality certificates and
                    guarantees of long-term operation. Therefore, if you want to save a
                    little by installing analog parts, then their shelf life does not
                    differ from the original ones.
                  </p>
                  <p className="text-sm">
                    Be sure that it is from us that you can buy a timing chain, timing
                    belt tensioner and other elements that will optimally fit your car in
                    terms of shape and size.
                  </p>
                  <p className="text-sm">
                    Thanks to the constant quality control of the goods supplied by us,
                    you will be able to quickly restore your vehicle. In addition to the
                    fact that we have a wide range of belts, rollers, chains and
                    tensioners, our customers have the opportunity to choose: for example,
                    you can buy a set of timing belts from different manufacturers.
                  </p>

                  <h3 className="text-xl font-semibold">
                    Price for belts chains and rollers parts: how much does it cost?
                  </h3>
                  <p className="text-sm">
                    A huge assortment of products provides the maximum possible price
                    range for spare parts and their components. In addition, the store is
                    famous for its democratic prices and loyalty to customers. Price for
                    belts chains and rollers parts will pleasantly surprise you and
                    encourage you to place an order immediately. And if even this is not
                    enough, we offer a sale offer. Here you can save from 5% to 26%. Not
                    bad, right? Therefore, do not delay, contact the store representatives
                    right now and complete the purchase.
                  </p>
                </div>
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
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

export default Belts_Chains_Rollers;
