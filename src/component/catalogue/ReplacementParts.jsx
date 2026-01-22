import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { categoryService } from "../../services/apiService";
import { FaSpinner } from "react-icons/fa";

// Category name to display format mapping (with images and slugs)
const mapCategoryToDisplay = (categoryName) => {
  const categoryMap = {
    "Air Conditioning": { slug: "air_conditioning", img: "https://boodmo.com/media/cache/catalog_image/images/categories/db9dad4.jpg" },
    "Bearings": { slug: "bearings", img: "https://boodmo.com/media/cache/catalog_image/images/categories/40e95ca.jpg" },
    "Belts Chains And Rollers": { slug: "drive_belts", img: "https://boodmo.com/media/cache/catalog_image/images/categories/ddbeb81.jpg" },
    "Body": { slug: "body", img: "https://boodmo.com/media/cache/catalog_image/images/categories/40e6a4c.jpg" },
    "Brake System": { slug: "brakes", img: "https://boodmo.com/media/cache/catalog_image/images/categories/5301830.jpg" },
    "Car Accessories": { slug: "car_accessories", img: "https://boodmo.com/media/cache/catalog_image/images/categories/ab143a7.webp" },
    "Clutch": { slug: "clutch", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e8cb288.jpg" },
    "Clutch System": { slug: "clutch", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e8cb288.jpg" },
    "Control Cables": { slug: "control_cables", img: "https://boodmo.com/media/cache/catalog_image/images/categories/7455b44.jpg" },
    "Electrical Components": { slug: "electric_components", img: "https://boodmo.com/media/cache/catalog_image/images/categories/d5b3ac7.jpg" },
    "Engine": { slug: "engine", img: "https://boodmo.com/media/cache/catalog_image/images/categories/8fea232.jpg" },
    "Engine Cooling System": { slug: "cooling_system", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e215fcc.jpg" },
    "Exhaust System": { slug: "exhaust", img: "https://boodmo.com/media/cache/catalog_image/images/categories/d1e33d6.jpg" },
    "Filters": { slug: "filters", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a16bbf6.jpg" },
    "Fuel Supply System": { slug: "fuelsystem", img: "https://boodmo.com/media/cache/catalog_image/images/categories/49ed220.jpg" },
    "Gaskets & Seals": { slug: "gaskets_sealingrings", img: "https://boodmo.com/media/cache/catalog_image/images/categories/14b8753.jpg" },
    "Interior Comfort": { slug: "interior_comfort", img: "https://boodmo.com/media/cache/catalog_image/images/categories/05a2b84.jpg" },
    "Interior and Comfort": { slug: "interior_comfort", img: "https://boodmo.com/media/cache/catalog_image/images/categories/05a2b84.jpg" },
    "Lighting": { slug: "lighting", img: "https://boodmo.com/media/cache/catalog_image/images/categories/53380d3.webp" },
    "Maintenance Service Parts": { slug: "maintenance_service_parts", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e8cb288.jpg" },
    "Oils & Fluids": { slug: "oilsfluids", img: "https://boodmo.com/media/cache/catalog_image/images/categories/4614ecf.webp" },
    "Oils and Fluids": { slug: "oilsfluids", img: "https://boodmo.com/media/cache/catalog_image/images/categories/4614ecf.webp" },
    "Pipes & Hoses": { slug: "pipes_hoses", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e0b2a63.jpg" },
    "Repair Kits": { slug: "repair_kits", img: "https://boodmo.com/media/cache/catalog_image/images/categories/2676bd2.jpg" },
    "Sensors Relay and Control Units": { slug: "sensors_control_units", img: "https://boodmo.com/media/cache/catalog_image/images/categories/2676bd2.jpg" },
    "Sensors Relays and Control Units": { slug: "sensors_control_units", img: "https://boodmo.com/media/cache/catalog_image/images/categories/2676bd2.jpg" },
    "Steering": { slug: "steering", img: "https://boodmo.com/media/cache/catalog_image/images/categories/72fb97b.jpg" },
    "Suspension and Arms": { slug: "suspension_arms", img: "https://boodmo.com/media/cache/catalog_image/images/categories/f26073e.jpg" },
    "Towbar Parts": { slug: "towbar", img: "https://boodmo.com/media/cache/catalog_image/images/categories/98b48d2.jpg" },
    "Transmission": { slug: "transmission", img: "https://boodmo.com/media/cache/catalog_image/images/categories/21ce121.jpg" },
    "Trims": { slug: "trims", img: "https://boodmo.com/media/cache/catalog_image/images/categories/beccd06.jpg" },
    "Universal": { slug: "universal", img: "https://boodmo.com/media/cache/catalog_image/images/categories/af8d099.jpg" },
    "Wheels": { slug: "wheels", img: "https://boodmo.com/media/cache/catalog_image/images/categories/430177a.jpg" },
    "Windscreen Cleaning System": { slug: "windscreen_cleaning_system", img: "https://boodmo.com/media/cache/catalog_image/images/categories/1053d82.jpg" },
  };

  const mapped = categoryMap[categoryName];
  if (mapped) {
    return {
      title: categoryName,
      href: `/catalog/${mapped.slug}/`,
      img: mapped.img
    };
  }
  
  // Default mapping if not found - use category icon from backend or placeholder
  const slug = categoryName.toLowerCase().replace(/\s+/g, '_').replace(/&/g, '').replace(/\//g, '');
  return {
    title: categoryName,
    href: `/catalog/${slug}/`,
    img: `https://via.placeholder.com/80x80/9ca3af/ffffff?text=${categoryName.substring(0, 2).toUpperCase()}`
  };
};

const ReplacementParts = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const navigate = useNavigate();

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        // Use getAllActiveCategoriesFlat to get all categories in a simple array (same as CatalogueSidebar.jsx)
        // This ensures both pages show the same categories created by admin
        const result = await categoryService.getAllActiveCategoriesFlat();
        
        // Handle response structure (same as CatalogueSidebar.jsx)
        let categoriesData = [];
        
        if (result && result.categories && Array.isArray(result.categories)) {
          categoriesData = result.categories;
        } else if (Array.isArray(result)) {
          categoriesData = result;
        } else if (result && result.data && Array.isArray(result.data.categories)) {
          categoriesData = result.data.categories;
        } else if (result && result.data && Array.isArray(result.data)) {
          categoriesData = result.data;
        }
        
        // Map backend categories to display format
        const mappedCategories = categoriesData
          .map(cat => {
            // Handle both string and object formats
            let categoryName;
            if (typeof cat === 'string') {
              categoryName = cat;
            } else if (cat && cat.name) {
              categoryName = cat.name;
            } else {
              return null;
            }
            
            if (!categoryName || typeof categoryName !== 'string') {
              return null;
            }
            return mapCategoryToDisplay(categoryName);
          })
          .filter(cat => cat && cat.title);
        
        if (mappedCategories.length > 0) {
          setCategories(mappedCategories);
        } else {
          // If no categories found, show empty array (no fallback)
          setCategories([]);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        // Don't use fallback - show empty state if API fails
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };
    
    fetchCategories();
  }, []);

  const filteredParts = categories.filter((part) =>
    part.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Replacement <span className="text-sky-600">Parts</span>
        </h3>

        <input
          type="search"
          placeholder="Filter Category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-64 border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Grid List */}
      {loadingCategories ? (
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="animate-spin text-sky-600 text-3xl" />
        </div>
      ) : filteredParts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 font-semibold">
            {categories.length === 0 
              ? "No categories available. Please add categories from admin panel."
              : "No categories match your search."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {filteredParts.map((part, index) => (
            <a
              key={index}
              href={part.href}
              className="flex flex-col items-center bg-white shadow hover:shadow-lg rounded-lg sm:rounded-xl p-2 sm:p-3 transition-transform transform hover:scale-105"
            >
              <img
                src={part.img}
                alt={part.title}
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain mb-2"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/100x100/9ca3af/ffffff?text=${(part.title || 'Part').substring(0, 2).toUpperCase()}`;
                }}
              />
              <span className="text-[10px] sm:text-xs text-gray-700 text-center font-medium line-clamp-2">
                {part.title}
              </span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReplacementParts;
