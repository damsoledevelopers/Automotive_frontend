import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
import { generateCategoryWithProducts } from "../../utils/productDataGenerator";

const Tyres_Alloys = () => {
  const tyresCategoriesBase =[
  {
    id: 1,
    name: "Alloy Wheels",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/43da440.webp",
    link: "/catalog/part-p-26001",
  },
  {
    id: 2,
    name: "Passenger Car Tyres",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/9efb038.jpg",
    link: "/catalog/part-p-26002",
  },
  {
    id: 3,
    name: "Tyre Tube",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/6a463af.jpg",
    link: "/catalog/part-p-26003",
  },
  {
    id: 4,
    name: "Tyre Valve",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/1c6d2a6.jpg",
    link: "/catalog/part-p-26004",
  },
  {
    id: 5,
    name: "Wheel Cover",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/f6a9dfb.jpg",
    link: "/catalog/part-p-26005",
  },
  {
    id: 6,
    name: "Wheel Rim",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/35e4f16.webp",
    link: "/catalog/part-p-26006",
  },
];

  // Generate categories with product data
  const tyresCategories = generateCategoryWithProducts(tyresCategoriesBase, "Tyres and Alloys", 2800);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(tyresCategories);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = tyresCategories
.filter((item) =>
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
              Tyres and Alloys
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Explore our wide range of tyres and alloy wheels designed for optimal performance and style.
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
              categoryName="Tyres and Alloys"
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
                    category: { name: "Tyres and Alloys", slug: "tyres_alloys" }
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
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tyres_Alloys;
