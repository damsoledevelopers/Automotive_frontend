import React from "react";
import { FaFilter, FaSort, FaSearch } from "react-icons/fa";

const SearchFilterBar = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  handleSort,
  showFilters,
  setShowFilters,
  categoryName = "parts", // default fallback
}) => {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm  mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
          <input
            type="text"
            placeholder={`Search ${categoryName.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          />
        </div>

      </div>
    </div>
  );
};

export default SearchFilterBar;
