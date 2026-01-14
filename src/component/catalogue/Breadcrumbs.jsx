import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();

  // Extract the last part of the URL (after the last slash)
  const pathParts = location.pathname.split("/").filter(Boolean);
  const categorySlug = pathParts[pathParts.length - 1];

  // Convert slug to readable format (e.g. "maintenance_service_parts" → "Maintenance Service Parts")
  const formatSlug = (slug) => {
    if (!slug) return "";
    // Handle numeric prefixes like "4032-belts" → "Belts"
    const cleaned = slug.replace(/^\d+-/, "").replace(/-/g, " ");
    return cleaned
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const categoryName = categorySlug ? formatSlug(categorySlug) : "Catalog";

  // Special handling for Belt page - show Maintenance Service Parts in breadcrumb
  const isBeltPage = location.pathname === "/catalog/4032-belts/";
  const isTimingBeltPage = location.pathname === "/catalog/4390-timing_belt/" || location.pathname === "/catalog/4033-time_belt/";
  const isProductDetailPage = location.pathname.startsWith("/catalog/part-p-");

  return (
    <nav className="mb-3 sm:mb-4 md:mb-6 overflow-x-auto">
      <ol className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-medium text-gray-600 flex-wrap min-w-max">
        <li>
          <Link to="/" className="hover:text-red-600 transition-colors flex items-center">
            <span className="mr-1">🏠</span>
            Home
          </Link>
        </li>
        {isProductDetailPage ? (
          <>
            <li><span className="text-gray-400">/</span></li>
            <li>
              <Link to="/catalog" className="hover:text-red-600 transition-colors">
                Catalogues
              </Link>
            </li>
            <li><span className="text-gray-400">/</span></li>
            <li>
              <Link to="/catalog/maintenance_service_parts/" className="hover:text-red-600 transition-colors">
                Maintenance Service Parts
              </Link>
            </li>
            <li><span className="text-gray-400">/</span></li>
            <li>
              <Link to="/catalog/4032-belts/" className="hover:text-red-600 transition-colors">
                Belt
              </Link>
            </li>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-gray-800 font-semibold">Timing Belt</li>
          </>
        ) : isTimingBeltPage ? (
          <>
            <li><span className="text-gray-400">/</span></li>
            <li>
              <Link to="/catalog/maintenance_service_parts/" className="hover:text-red-600 transition-colors">
                Maintenance Service Parts
              </Link>
            </li>
            <li><span className="text-gray-400">/</span></li>
            <li>
              <Link to="/catalog/4032-belts/" className="hover:text-red-600 transition-colors">
                Belt
              </Link>
            </li>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-gray-800 font-semibold">{categoryName}</li>
          </>
        ) : isBeltPage ? (
          <>
            <li><span className="text-gray-400">/</span></li>
            <li>
              <Link to="/catalog/maintenance_service_parts/" className="hover:text-red-600 transition-colors">
                Maintenance Service Parts
              </Link>
            </li>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-gray-800 font-semibold">{categoryName}</li>
          </>
        ) : (
          <>
            <li><span className="text-gray-400">/</span></li>
            <li>
              <Link to="/catalog" className="hover:text-red-600 transition-colors">
                Catalog
              </Link>
            </li>
            {categorySlug && (
              <>
                <li><span className="text-gray-400">/</span></li>
                <li className="text-gray-800 font-semibold">{categoryName}</li>
              </>
            )}
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
