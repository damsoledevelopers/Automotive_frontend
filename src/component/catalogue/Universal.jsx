import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
import { generateCategoryWithProducts } from "../../utils/productDataGenerator";

const Universal = () => {
  const universalCategoriesBase = [
  {
    name: "Bolt",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/af8d099.jpg",
    link: "/catalog/4789-bolt/",
  },
  {
    name: "Cable Strap",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7455b44.jpg",
    link: "/catalog/4850-cable_strap/",
  },
  {
    name: "Circlip",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/d741fdb.jpg",
    link: "/catalog/4839-circlip/",
  },
  {
    name: "Clamp",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/ba081e3.jpg",
    link: "/catalog/4809-clamp/",
  },
  {
    name: "Clip",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/4d382fb.jpg",
    link: "/catalog/4578-clip/",
  },
  {
    name: "Fasteners",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/f9b277f.webp",
    link: "/catalog/5227-fasteners/",
  },
  {
    name: "Grease",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/c89ce20.jpg",
    link: "/catalog/4915-grease/",
  },
  {
    name: "Grommet",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/b75343b.jpg",
    link: "/catalog/4837-grommet/",
  },
  {
    name: "Nut",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/9f2ba20.jpg",
    link: "/catalog/4788-nut/",
  },
  {
    name: "O-Ring",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/14b8753.jpg",
    link: "/catalog/4792-o_ring/",
  },
  {
    name: "Plug",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/e53edf2.jpg",
    link: "/catalog/4834-plug/",
  },
  {
    name: "Rivet",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/4a4381a.jpg",
    link: "/catalog/4882-rivet/",
  },
  {
    name: "Screw",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/cb643f8.jpg",
    link: "/catalog/4791-screw/",
  },
  {
    name: "Sealing Substance",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/bb8ff15.jpg",
    link: "/catalog/4987-sealing_substance/",
  },
  {
    name: "Spacer",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/5f462c5.jpg",
    link: "/catalog/4871-spacer/",
  },
  {
    name: "Stud",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/86c294b.jpg",
    link: "/catalog/4833-stud/",
  },
  {
    name: "Tightening Strap",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/53cf219.jpg",
    link: "/catalog/4945-tightening_strap/",
  },
  {
    name: "Washer",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/4f5e864.jpg",
    link: "/catalog/4790-washer/",
  },
];

  // Generate categories with product data
  const universalCategories = generateCategoryWithProducts(
    universalCategoriesBase.map((item, index) => ({
      ...item,
      id: item.id || (index + 1),
      link: item.link.startsWith('/catalog/part-p-') ? item.link : `/catalog/part-p-${28000 + index + 1}`
    })),
    "Universal",
    3200
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(universalCategories);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = universalCategories
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
              Universal parts
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Explore our wide range of universal parts and accessories designed to fit various vehicle makes and models.
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
              categoryName="Universal"
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
                    category: { name: "Universal", slug: "universal" }
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

export default Universal;
