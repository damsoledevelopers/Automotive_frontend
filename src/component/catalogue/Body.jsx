import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
import { generateCategoryWithProducts } from "../../utils/productDataGenerator";

const Body = () => {
const bodyPartsCategoriesBase = [
  { id: 1, name: "Automotive Tape", img: "https://boodmo.com/media/cache/catalog_image/images/categories/5ea695b.jpg", link: "/catalog/part-p-4001" },
  { id: 2, name: "Beam Axle", img: "https://boodmo.com/media/cache/catalog_image/images/categories/d68d31d.jpg", link: "/catalog/part-p-4002" },
  { id: 3, name: "Body Accessories", img: "https://boodmo.com/media/cache/catalog_image/images/categories/ab143a7.webp", link: "/catalog/part-p-4003" },
  { id: 4, name: "Body Frame", img: "https://boodmo.com/media/cache/catalog_image/images/categories/ff2dd35.jpg", link: "/catalog/part-p-4004" },
  { id: 5, name: "Body Rubber Stop", img: "https://boodmo.com/media/cache/catalog_image/images/categories/b04e4e7.jpg", link: "/catalog/part-p-4005" },
  { id: 6, name: "Bonnet", img: "https://boodmo.com/media/cache/catalog_image/images/categories/6899905.jpg", link: "/catalog/part-p-4006" },
  { id: 7, name: "Boot", img: "https://boodmo.com/media/cache/catalog_image/images/categories/3a5bc8a.jpg", link: "/catalog/part-p-4007" },
  { id: 8, name: "Bumper", img: "https://boodmo.com/media/cache/catalog_image/images/categories/40e6a4c.jpg", link: "/catalog/part-p-4008" },
  { id: 9, name: "Bumper Bracket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e823ebb.jpg", link: "/catalog/part-p-4009" },
  { id: 10, name: "Bumper Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/beccd06.jpg", link: "/catalog/part-p-4010" },
  { id: 11, name: "Canopy", img: "https://boodmo.com/media/cache/catalog_image/images/categories/5529527.jpg", link: "/catalog/part-p-4011" },
  { id: 12, name: "Central Locking System", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a9e0c30.jpg", link: "/catalog/part-p-4012" },
  { id: 13, name: "Cowl Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/c2bd877.jpg", link: "/catalog/part-p-4013" },
  { id: 14, name: "Door Components", img: "https://boodmo.com/media/cache/catalog_image/images/categories/6647195.jpg", link: "/catalog/part-p-4014" },
  { id: 15, name: "Door Handle Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/96f64c4.jpg", link: "/catalog/part-p-4015" },
  { id: 16, name: "Emblem", img: "https://boodmo.com/media/cache/catalog_image/images/categories/ad8563b.jpg", link: "/catalog/part-p-4016" },
  { id: 17, name: "Engine Cover", img: "https://boodmo.com/media/cache/catalog_image/images/categories/aceebde.jpg", link: "/catalog/part-p-4017" },
  { id: 18, name: "Fender", img: "https://boodmo.com/media/cache/catalog_image/images/categories/7818cbf.jpg", link: "/catalog/part-p-4018" },
  { id: 19, name: "Fender Bracket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a83d8e8.jpg", link: "/catalog/part-p-4019" },
  { id: 20, name: "Fender Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/24e8317.jpg", link: "/catalog/part-p-4020" },
  { id: 21, name: "Fog Lamp Cover", img: "https://boodmo.com/media/cache/catalog_image/images/categories/7ec3708.jpg", link: "/catalog/part-p-4021" },
  { id: 22, name: "Foot Step", img: "https://boodmo.com/media/cache/catalog_image/images/categories/cf2c2c6.jpg", link: "/catalog/part-p-4022" },
  { id: 23, name: "Front Grill", img: "https://boodmo.com/media/cache/catalog_image/images/categories/28dccef.jpg", link: "/catalog/part-p-4023" },
  { id: 24, name: "Front Grill Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/697fbbe.jpg", link: "/catalog/part-p-4024" },
  { id: 25, name: "Fuel Tank", img: "https://boodmo.com/media/cache/catalog_image/images/categories/49ed220.jpg", link: "/catalog/part-p-4025" },
  { id: 26, name: "Glove Box Lock", img: "https://boodmo.com/media/cache/catalog_image/images/categories/5eed3fe.jpg", link: "/catalog/part-p-4026" },
  { id: 27, name: "Hook", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a853f60.jpg", link: "/catalog/part-p-4027" },
  { id: 28, name: "Horn Bracket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/96e9f7f.jpg", link: "/catalog/part-p-4028" },
  { id: 29, name: "Impact Absorber", img: "https://boodmo.com/media/cache/catalog_image/images/categories/326a691.jpg", link: "/catalog/part-p-4029" },
  { id: 30, name: "Indicator", img: "https://boodmo.com/media/cache/catalog_image/images/categories/3b66936.jpg", link: "/catalog/part-p-4030" },
  { id: 31, name: "Inner Wing Panel", img: "https://boodmo.com/media/cache/catalog_image/images/categories/08a1674.jpg", link: "/catalog/part-p-4031" },
  { id: 32, name: "Interior Mirror", img: "https://boodmo.com/media/cache/catalog_image/images/categories/05a2b84.jpg", link: "/catalog/part-p-4032" },
  { id: 33, name: "Licence Plate Holder", img: "https://boodmo.com/media/cache/catalog_image/images/categories/1fc1926.jpg", link: "/catalog/part-p-4033" },
  { id: 34, name: "Mirror Glass", img: "https://boodmo.com/media/cache/catalog_image/images/categories/1b0ba48.jpg", link: "/catalog/part-p-4034" },
  { id: 35, name: "Mirror Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/46d1240.jpg", link: "/catalog/part-p-4035" },
  { id: 36, name: "Noise Insulator", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a46bf39.jpg", link: "/catalog/part-p-4036" },
  { id: 37, name: "Outside Mirror", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a1b61e8.jpg", link: "/catalog/part-p-4037" },
  { id: 38, name: "Outside Mirror Cover", img: "https://boodmo.com/media/cache/catalog_image/images/categories/06eb8c5.jpg", link: "/catalog/part-p-4038" },
  { id: 39, name: "Panels", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a264cca.jpg", link: "/catalog/part-p-4039" },
  { id: 40, name: "Pillars", img: "https://boodmo.com/media/cache/catalog_image/images/categories/eee2f36.webp", link: "/catalog/part-p-4040" },
  { id: 41, name: "Radiator Mounting", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e215fcc.jpg", link: "/catalog/part-p-4041" },
  { id: 42, name: "Roof Rail", img: "https://boodmo.com/media/cache/catalog_image/images/categories/6191f03.jpg", link: "/catalog/part-p-4042" },
  { id: 43, name: "Roof Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/2fc8429.jpg", link: "/catalog/part-p-4043" },
  { id: 44, name: "Side Body Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/f51a12e.jpg", link: "/catalog/part-p-4044" },
  { id: 45, name: "Sill Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/bb7c7ad.jpg", link: "/catalog/part-p-4045" },
  { id: 46, name: "Spare Wheel Carrier", img: "https://boodmo.com/media/cache/catalog_image/images/categories/430177a.jpg", link: "/catalog/part-p-4046" },
  { id: 47, name: "Speaker Grill", img: "https://boodmo.com/media/cache/catalog_image/images/categories/6450af1.jpg", link: "/catalog/part-p-4047" },
  { id: 48, name: "Spoiler", img: "https://boodmo.com/media/cache/catalog_image/images/categories/52ac5f5.jpg", link: "/catalog/part-p-4048" },
  { id: 49, name: "Sunroof", img: "https://boodmo.com/media/cache/catalog_image/images/categories/edfd556.jpg", link: "/catalog/part-p-4049" },
  { id: 50, name: "Sunroof Drain Hose", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e0b2a63.jpg", link: "/catalog/part-p-4050" },
  { id: 51, name: "Tailgate Strut", img: "https://boodmo.com/media/cache/catalog_image/images/categories/f182f5f.jpg", link: "/catalog/part-p-4051" },
  { id: 52, name: "Towhook Cover", img: "https://boodmo.com/media/cache/catalog_image/images/categories/98b48d2.jpg", link: "/catalog/part-p-4052" },
  { id: 53, name: "Wheel Arch Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/6f70f16.jpg", link: "/catalog/part-p-4053" },
  { id: 54, name: "Window Guide Rail", img: "https://boodmo.com/media/cache/catalog_image/images/categories/1589711.jpg", link: "/catalog/part-p-4054" },
  { id: 55, name: "Window Seal", img: "https://boodmo.com/media/cache/catalog_image/images/categories/58281a4.jpg", link: "/catalog/part-p-4055" },
  { id: 56, name: "Windshield", img: "https://boodmo.com/media/cache/catalog_image/images/categories/f6abd00.jpg", link: "/catalog/part-p-4056" },
  { id: 57, name: "Windshield Seal", img: "https://boodmo.com/media/cache/catalog_image/images/categories/488870a.jpg", link: "/catalog/part-p-4057" },
];

  // Generate categories with product data
  const bodyPartsCategories = generateCategoryWithProducts(bodyPartsCategoriesBase, "Body", 2500);

  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(bodyPartsCategories);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = bodyPartsCategories.filter((item) =>
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
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Body Parts
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Discover a wide range of body parts for your vehicle, including bumpers, doors, and more.
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
              categoryName="Body"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          <div className="flex-1 order-1 lg:order-2">
            {/* ✅ Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 my-4 sm:my-6 md:my-8">
              {filteredProducts.map((category, index) => (
                <Link
                  key={category.id || index}
                  to={category.link}
                  state={{ 
                    product: category.product,
                    category: { name: "Body", slug: "body" }
                  }}
                  className="bg-white p-2 sm:p-3 rounded-lg shadow hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
                >
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-md mb-2 mx-auto"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=' + category.name;
                    }}
                  />
                  <span className="text-gray-800 font-medium text-[10px] sm:text-xs line-clamp-2">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* ✅ SEO Section */}
            <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-md transition-all duration-300 my-6 sm:my-8 md:my-10">
              <div
                className={`space-y-3 sm:space-y-4 overflow-hidden transition-all duration-500 ${expanded ? "max-h-full" : "max-h-[300px] sm:max-h-[400px]"
                  }`}
              >
                <h2 className="text-base sm:text-lg font-bold text-red-600">
                  A Meaning of a Car Body and Body Parts of Car
                </h2>

                <p className="text-xs sm:text-sm">
                  A car enthusiast can be sure that the motor, transmission or brakes are the most essential
                  components of an automobile. But the car body – the component where all the other
                  components and systems are installed and fixed – still remains the main framework of a
                  vehicle. It locates the driver and passengers, holds the cargo, and protects everything
                  from external impacts.
                </p>

                <p className="text-xs sm:text-sm">
                  Exterior is not the least thing to care about. A new automobile attracts attention with
                  flawless lines, curves, and a shiny body surface. A well-maintained car looks elegant and
                  creates a positive impression about its owner.
                </p>

                <p className="text-xs sm:text-sm">
                  Yet, dents, scratches, or misaligned doors signal neglect or poor maintenance — sometimes
                  even danger. That's why maintaining and updating your car body is essential.
                </p>

                <p className="text-xs sm:text-sm">The main auto body parts include:</p>

                <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 pl-2 sm:pl-4 text-xs sm:text-sm">
                  <li>A boot lid and a hood</li>
                  <li>Front and rear splashers</li>
                  <li>Body sills</li>
                  <li>Front and rear bumpers and protective accessories</li>
                  <li>Doors, including locks and door handles</li>
                </ul>

                <p className="text-xs sm:text-sm">
                  Additionally, body parts include optics covers, mudguards, spoilers, and protective
                  elements for the gearbox and motor.
                </p>

                <h2 className="text-base sm:text-lg font-bold text-red-600">Why Do You Need Car Body Parts?</h2>

                <p className="text-xs sm:text-sm">Drivers usually buy body parts for two main purposes:</p>

                <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 pl-2 sm:pl-4 text-xs sm:text-sm">
                  <li>To repair or replace damaged parts</li>
                  <li>To perform car tuning or modification</li>
                </ul>

                <p className="text-xs sm:text-sm">The most common reasons for replacement include:</p>

                <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 pl-2 sm:pl-4 text-xs sm:text-sm">
                  <li>Damage from accidents or vandalism</li>
                  <li>Wear and tear due to long-term use</li>
                  <li>High-speed driving on rough roads</li>
                  <li>Improper vehicle handling</li>
                  <li>Poor-quality or unprofessional repairs</li>
                </ul>

                <p className="text-xs sm:text-sm">
                  A skilled mechanic and quality body parts can restore your car perfectly. It's always best
                  to choose original or licensed parts for reliability, though refurbished OEM parts can be a
                  budget-friendly alternative.
                </p>

                <p className="text-xs sm:text-sm">
                  Tuning allows improving aerodynamics, control, and aesthetics — often using lightweight
                  materials like fiberglass or carbon fiber for spoilers, arches, and ground effects.
                </p>

                <h2 className="text-base sm:text-lg font-bold text-red-600">
                  Where to Buy Car Body Parts and Accessories Online?
                </h2>

                <p className="text-xs sm:text-sm">
                  You can quickly buy the required spare parts at our online store at the best prices. Our
                  detailed price list with product images makes selection easy. We offer a wide range of
                  reliable, high-quality car body parts, absorbers, and accessories to enhance your vehicle's
                  performance and appearance.
                </p>
              </div>

              {/* View More / View Less Button */}
              <div className="seo-text__action mt-4 sm:mt-6 text-center">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-lg transition-all duration-300"
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

export default Body;
