import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { categoryService } from "../../services/apiService";
import { FaSpinner } from "react-icons/fa";

// Helper function to map category name to display format
const mapCategoryToDisplay = (categoryName) => {
  // Dynamic mapping: Convert category name to slug and use backend icon if available
  // If no icon, use a placeholder
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
            const mapped = mapCategoryToDisplay(categoryName);
            // Use category icon from backend if available, otherwise use mapped image
            if (cat && cat.icon) {
              mapped.img = cat.icon;
            }
            return mapped;
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
    <section className="max-w-7xl mx-auto px-2 sm:px-3 py-6 sm:py-8 md:py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-10 gap-4">
        <div>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-600 to-blue-600 mb-3 rounded-full"></div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Replacement <span className="text-blue-600">Parts</span>
          </h3>
        </div>

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {filteredParts.map((part, index) => (
            <a
              key={index}
              href={part.href}
              className="group flex flex-col items-center p-3 transition-all duration-300"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-2 flex items-center justify-center">
                <img
                  src={part.img}
                  alt={part.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/100x100/9ca3af/ffffff?text=${(part.title || 'Part').substring(0, 2).toUpperCase()}`;
                  }}
                />
              </div>
              <span className="text-center font-medium text-gray-800 text-xs sm:text-sm">
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
