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
    <div className="flex justify-end">
      {/* Search - Small, Right Corner */}
      <div className="relative w-48 sm:w-56 md:w-64">
        <FaSearch className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm" />
        <input
          type="text"
          placeholder={`Search ${categoryName.toLowerCase()}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-7 sm:pl-8 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default SearchFilterBar;
