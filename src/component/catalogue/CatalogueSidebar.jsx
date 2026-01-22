import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useVehicle } from "../../contexts/VehicleContext";
import { getVehicleImageUrl } from "../../data/vehicleData";
import { FaTimes, FaFilter, FaSpinner } from "react-icons/fa";
import { categoryService } from "../../services/apiService";

const CatalogueSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { vehicles } = useVehicle();
  const [selectedMaker, setSelectedMaker] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [categories, setCategories] = useState([]); // Only show categories from backend
  const [loadingCategories, setLoadingCategories] = useState(true);
  const location = useLocation();
  
  // Auto-expand Maintenance Service Parts if on Belt or Timing Belt page
  const isBeltPage = location.pathname === "/catalog/4032-belts/";
  const isTimingBeltPage = location.pathname === "/catalog/4390-timing_belt/" || location.pathname === "/catalog/4033-time_belt/";
  const [expandedCategories, setExpandedCategories] = useState({
    "Maintenance Service Parts": isBeltPage || isTimingBeltPage ? true : false
  });

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      // Use getAllActiveCategoriesFlat to get ALL categories (same as ReplacementParts.jsx)
      // This ensures both pages show the same categories created by admin
      const result = await categoryService.getAllActiveCategoriesFlat();
      
      // Handle response structure:
      // Backend returns: { success: true, data: { categories: [...] } }
      // apiService.getAllActiveCategoriesFlat() returns: response.data.data which is { categories: [...] }
      // So: result = { categories: [...] }
      // Extract: result.categories to get the array
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
      
      // If no categories found in database, show empty state
      if (!categoriesData || categoriesData.length === 0) {
        setCategories([]);
        setLoadingCategories(false);
        return;
      }
      
      // Transform API data to match existing structure
      // Handle both string arrays and object arrays
      const transformedCategories = categoriesData.map(cat => {
        // If category is a string, convert it to an object
        let categoryName, categorySlug, categoryLink;
        
        if (typeof cat === 'string') {
          // Handle string format: "Clutch", "Cooling", etc.
          categoryName = cat;
          categorySlug = cat.toLowerCase().replace(/\s+/g, '_').replace(/&/g, '').replace(/\//g, '');
          categoryLink = `/catalog/${categorySlug}/`;
        } else if (cat && cat.name) {
          // Handle object format: { name: "Clutch", slug: "clutch", ... }
          categoryName = cat.name;
          categorySlug = cat.slug || cat.name.toLowerCase().replace(/\s+/g, '_').replace(/&/g, '').replace(/\//g, '');
          categoryLink = `/catalog/${categorySlug}/`;
        } else {
          return null; // Skip invalid categories
        }
        
        const categoryObj = {
          name: categoryName,
          link: categoryLink,
          subCategories: [] // Flat list doesn't have subcategories structure
        };
        
        return categoryObj;
      }).filter(cat => cat !== null); // Remove null entries
      
      // Set categories from API (same categories as ReplacementParts page)
      setCategories(transformedCategories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      // Don't use fallback - show empty state if API fails
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Get car image from vehicle data
  const getCarImage = (make, model) => {
    const imageUrl = getVehicleImageUrl(make, model);
    return imageUrl || 'https://via.placeholder.com/100x60?text=Car';
  };

  const popularCarmakers = [
    "CHEVROLET", "FIAT", "FORD", "HONDA", "HYUNDAI", "KIA",
    "MAHINDRA", "MARUTI", "NISSAN", "RENAULT", "SKODA", "TATA", "TOYOTA", "VW",
  ];

  const alphabeticalCarmakers = [
    "ASHOK LEYLAND", "AUDI", "BMW", "CHEVROLET", "CITROEN", "DAEWOO",
    "DATSUN", "FIAT", "FORCE", "FORD", "HINDUSTAN MOTORS", "HONDA",
    "HYUNDAI", "ICML", "ISUZU", "JAGUAR", "JEEP", "KIA", "LAND ROVER",
    "LEXUS", "MAHINDRA", "MARUTI", "MERCEDES-BENZ", "MINI", "MITSUBISHI",
    "MORRIS GARAGES", "NISSAN", "OPEL", "PORSCHE", "RENAULT", "SKODA",
    "TATA", "TATA COMMERCIAL", "TOYOTA", "VOLVO", "VW",
  ];

  // Categories are now fetched from API (see useEffect above)

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const handleReset = () => {
    setSelectedMaker("");
    setExpandedCategories({});
  };

  const brands = [
    { name: "Bosch", link: "/brands/362-bosch/" }, 
    { name: "Fram", link: "/brands" },
    { name: "Hengst", link: "/brands" },
    { name: "Mahle", link: "/brands/1641-mahleoriginal/" },
    { name: "Mann Filter", link: "/brands/1651-mannfilter/" },
    { name: "Wix", link: "/brands/2746-wixfilters/" },
  ];

  const isActive = (path) => location.pathname === path;

  const sidebarContent = (
    <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 lg:sticky lg:top-4 max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-hide">

        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
          <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold text-gray-800 dark:text-gray-100">Filters</h3>
          <button 
            onClick={handleReset}
            className="text-[9px] sm:text-[10px] md:text-xs text-[#131c36] hover:text-[#0f1528] dark:text-[#131c36] font-medium"
          >
            RESET
          </button>
        </div>

        {/* Garage Section */}
        <div
          className={`filters__item  rounded-lg overflow-hidden mb-2 ${
            isOpen ? "bg-white dark:bg-gray-900" : "bg-white dark:bg-gray-800"
          }`}
        >
          <div
            className="flex items-center justify-between px-4 py-2 cursor-pointer border-b dark:border-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              Garage
            </span>
            <span className="text-xs sm:text-sm text-[#131c36] dark:text-[#131c36]">
              {isOpen ? "−" : "+"}
            </span>
          </div>

          {isOpen && (
            <div className="p-3 space-y-3">
              {/* Vehicles from Garage */}
              {vehicles.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-1.5 sm:gap-2 mb-3">
                  {vehicles.slice(0, 6).map((vehicle) => (
                    <Link
                      key={vehicle.id}
                      to={`/catalog?maker=${encodeURIComponent(vehicle.make)}&model=${encodeURIComponent(vehicle.model)}&year=${vehicle.year}`}
                      className="flex flex-col items-center p-1.5 sm:p-2 bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-200"
                      title={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
                    >
                      <img
                        src={getCarImage(vehicle.make, vehicle.model)}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="w-full h-auto object-contain mb-1"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/100x60?text=Car';
                        }}
                      />
                      <span className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-700 font-medium text-center line-clamp-1">
                        {vehicle.model}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-2 mb-3">
                  <p className="text-[9px] sm:text-[10px] text-gray-500">No vehicles in garage</p>
                </div>
              )}

              <form className="space-y-1.5">
                <label
                  htmlFor="carMaker"
                  className="block text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                  Choose car maker
                </label>
                <select
                  id="carMaker"
                  value={selectedMaker}
                  onChange={(e) => setSelectedMaker(e.target.value)}
                  className="form-select w-full p-1.5 border rounded-md text-[10px] sm:text-xs dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                >
                  <option value="">Choose car maker</option>
                  <optgroup label="Popular carmakers">
                    {popularCarmakers.map((maker) => (
                      <option key={maker} value={maker}>
                        {maker}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Carmakers in alphabetical order">
                    {alphabeticalCarmakers.map((maker) => (
                      <option key={maker} value={maker}>
                        {maker}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </form>
            </div>
          )}
        </div>

        {/* Category Section */}
        <div className="mb-6 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-xs sm:text-sm text-gray-800 dark:text-gray-300 mb-3">
            Category
          </h4>
          {loadingCategories ? (
            <div className="text-center py-4">
              <FaSpinner className="animate-spin text-blue-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Loading categories...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-xs text-gray-500">No categories available</p>
              <p className="text-[10px] text-gray-400 mt-1">Please add categories from admin panel</p>
            </div>
          ) : (
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {categories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between">
                  <Link
                    to={category.link}
                    className={`flex-1 block text-xs px-2 py-1.5 rounded transition-all duration-200 ${
                      isActive(category.link)
                        ? "font-semibold text-white bg-[#131c36]"
                        : "text-gray-700 dark:text-gray-300 hover:text-[#131c36] hover:bg-[#131c36]/10"
                    }`}
                  >
                    {category.name}
                  </Link>
                  {category.subCategories && category.subCategories.length > 0 && (
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="text-gray-500 hover:text-gray-700 px-1 text-xs"
                      aria-label={expandedCategories[category.name] ? "Collapse" : "Expand"}
                    >
                      {expandedCategories[category.name] ? "−" : "+"}
                    </button>
                  )}
                </div>
                {category.subCategories && category.subCategories.length > 0 && expandedCategories[category.name] && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-3">
                    {category.subCategories.map((subCat) => (
                      <div key={subCat.name || subCat.link}>
                        {subCat.subItems ? (
                          // Nested sub-category (e.g., Belt with sub-items)
                          <div>
                            <Link
                              to={subCat.link}
                              className={`block text-[10px] font-medium px-2 py-1 mb-0.5 rounded transition-all duration-200 ${
                                isActive(subCat.link)
                                  ? "text-[#131c36] bg-[#131c36]/10"
                                  : "text-gray-700 hover:text-[#131c36] hover:bg-gray-50"
                              }`}
                            >
                              {subCat.name}
                            </Link>
                            <div className="ml-2 space-y-0.5">
                              {subCat.subItems.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.link}
                                  className={`block text-[10px] px-2 py-0.5 rounded transition-all duration-200 ${
                                    isActive(item.link)
                                      ? "font-medium text-[#131c36] bg-[#131c36]/10"
                                      : "text-gray-600 hover:text-[#131c36] hover:bg-gray-50"
                                  }`}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          // Regular sub-category
                          <Link
                            to={subCat.link}
                            className={`block text-[10px] px-2 py-1 rounded transition-all duration-200 ${
                              isActive(subCat.link)
                                ? "font-medium text-[#131c36] bg-[#131c36]/10"
                                : "text-gray-600 hover:text-[#131c36] hover:bg-gray-50"
                            }`}
                          >
                            {subCat.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              ))}
            </div>
          )}
        </div>

        {/* Brand Section */}
        <div className="mb-6">
          <h4 className="font-semibold text-xs sm:text-sm text-gray-800 dark:text-gray-300 mb-3">Brand</h4>
          <div className="space-y-1">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                to={brand.link}
                className={`block text-xs px-2 py-1.5 rounded transition-all duration-200 ${
                  isActive(brand.link)
                    ? "font-semibold text-white bg-[#131c36]"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#131c36] hover:bg-[#131c36]/10 dark:hover:bg-gray-700"
                }`}
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-40 bg-[#131c36] text-white p-4 rounded-full shadow-lg hover:bg-[#0f1528] transition-all duration-200 flex items-center gap-2"
        aria-label="Open filters"
      >
        <FaFilter className="text-lg" />
        <span className="text-sm font-semibold">Filters</span>
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Mobile Drawer & Desktop Sidebar */}
      <div
        className={`${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-80 lg:w-64 flex-shrink-0 mb-4 sm:mb-6 lg:mb-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full bg-white dark:bg-gray-900 shadow-xl lg:shadow-sm">
          {/* Mobile Close Button */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Filters</h3>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="text-gray-500 hover:text-gray-700 p-2"
              aria-label="Close filters"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          {sidebarContent}
        </div>
      </div>
    </>
  );
};

export default CatalogueSidebar;
