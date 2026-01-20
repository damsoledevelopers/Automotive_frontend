import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
import { generateCategoryWithProducts } from "../../utils/productDataGenerator";

const RepairKits = () => {
  const repairKitCategoriesBase = [
  {
    id: 1,
    name: "Accessory Kit Brake Pads",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/5301830.jpg",
    link: "/catalog/part-p-20001",
  },
  {
    id: 2,
    name: "Accessory Kit Brake Shoes",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7c21f31.jpg",
    link: "/catalog/part-p-20002",
  },
  {
    id: 3,
    name: "AC Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/c425f85.jpg",
    link: "/catalog/part-p-20003",
  },
  {
    id: 4,
    name: "Brake Caliper Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/6fafb90.jpg",
    link: "/catalog/part-p-20004",
  },
  {
    id: 5,
    name: "Brake Master Cylinder Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/f8ce1d4.jpg",
    link: "/catalog/part-p-20005",
  },
  {
    id: 6,
    name: "Carburettor Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/99ad124.jpg",
    link: "/catalog/part-p-20006",
  },
  {
    id: 7,
    name: "Clutch Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/8a3d983.jpg",
    link: "/catalog/part-p-20007",
  },
  {
    id: 8,
    name: "Gear Shifter Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/9df9491.jpg",
    link: "/catalog/part-p-20008",
  },
  {
    id: 9,
    name: "Handbrake Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7428b3e.jpg",
    link: "/catalog/part-p-20009",
  },
  {
    id: 10,
    name: "Pedal Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/3212040.jpg",
    link: "/catalog/part-p-20010",
  },
  {
    id: 11,
    name: "Power Steering Pump Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/5bc886f.jpg",
    link: "/catalog/part-p-20011",
  },
  {
    id: 12,
    name: "Starter Motor Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/d1be8f7.jpg",
    link: "/catalog/part-p-20012",
  },
  {
    id: 13,
    name: "Steering Gear Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/a1d8d99.jpg",
    link: "/catalog/part-p-20013",
  },
  {
    id: 14,
    name: "Suspension Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/4b9a03a.jpg",
    link: "/catalog/part-p-20014",
  },
  {
    id: 15,
    name: "Timing Belt Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/ca3d002.jpg",
    link: "/catalog/part-p-20015",
  },
  {
    id: 16,
    name: "Wheel Brake Cylinder Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/01ae522.jpg",
    link: "/catalog/part-p-20016",
  },
];

  // Generate categories with product data
  const repairKitCategories = generateCategoryWithProducts(repairKitCategoriesBase, "Repair Kits", 1300);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(repairKitCategories);
  const [expanded, setExpanded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  useEffect(() => {
    const filtered = repairKitCategories.filter((item) =>
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
            Repair Kits
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore our range of high-quality repair kits designed for various automotive applications.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Repair Kits"
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
                    category: { name: "Repair Kits", slug: "repair_kits" }
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
                <h2 className="text-2xl font-bold text-red-600">Repair Kits Parts</h2>

                <p>
                  Every car enthusiast knows that it’s not always easy to quickly find the necessary auto
                  parts for repair. Auto repair shops don’t always keep stock, and their prices are often
                  inflated. As a result, many people waste time searching for components in markets or small
                  shops — often without success. Unfortunately, spare elements bought in such markets are
                  not always high quality, which can negatively affect your car’s performance.
                </p>

                <h2 className="text-2xl font-bold text-red-600">Price for Repair Kits Parts</h2>

                <p>
                  Nowadays, almost everything can be bought online from specialized stores — and car spare
                  parts are no exception. There are reliable online portals offering high-quality products,
                  whether original or compatible analogs. You can buy repair kit parts online in India at{" "}
                  <strong>sparelo</strong>, where components for all car brands are available. It’s easy to
                  choose new or modified parts by car code or name.
                </p>

                <p>
                  The service at <strong>sparelo</strong> will pleasantly surprise you, and the prices will
                  too. Repair kit parts range from <strong>₹200</strong> to several thousand rupees,
                  depending on the specific part.
                </p>

                <h3 className="text-xl font-semibold text-red-600">
                  Catalog of Propositions in sparelo
                </h3>

                <p>
                  Our online store offers a wide range of components and accessories for foreign cars at
                  reasonable prices. All auto parts in our catalog are certified, unlike many that you’ll
                  find in auto markets, and our prices are much lower than those at dealer service centers.
                </p>

                <p>
                  The <strong>sparelo</strong> catalog includes only high-quality repair kit parts. In this
                  section, you’ll find over <strong>129,000+</strong> offers, including:
                </p>

                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Main set (master brake cylinder)</li>
                  <li>Small repair kit</li>
                  <li>Tandem set of the master cylinder</li>
                  <li>Set of piston and cup</li>
                  <li>Rack mounting kit</li>
                  <li>Rear suspension repair kit and more</li>
                </ul>

                <p>
                  Finding and buying the right spare parts takes just minutes — simply choose your car
                  brand, and all components are organized by groups (body, chassis, brake system, etc.).
                  After placing your order, you can either pick up your purchase yourself or use our courier
                  delivery option.
                </p>

                <h3 className="text-xl font-semibold text-red-600">
                  Buy Online Repair Kits Parts in India: Sale Propositions
                </h3>

                <p>
                  To help customers save more, <strong>sparelo</strong> regularly runs special offers. You
                  can save between <strong>5%</strong> and <strong>22%</strong> on various parts. That’s a
                  great deal! Don’t delay or look elsewhere — everything you need for your car’s perfect
                  performance is here: a huge assortment, attractive prices, and excellent service.
                </p>

                <p>
                  Didn’t find what you need? Just leave a request with our managers, and the required parts
                  will be sourced quickly from our partner warehouses.
                </p>

                <p>
                  Want to ensure quality and reliability without overpaying? Welcome to{" "}
                  <strong>sparelo</strong> — India’s trusted online destination for auto parts!
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

export default RepairKits;
