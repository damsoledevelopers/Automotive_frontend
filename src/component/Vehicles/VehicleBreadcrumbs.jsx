import React, { useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const VehicleBreadcrumbs = ({ modelName: propModelName }) => {
  const location = useLocation();
  const params = useParams();

  // Memoize computed values for better performance
  const breadcrumbData = useMemo(() => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    const isModelDetailPage = Boolean(params.maker && params.modelId);
    const maker = params.maker || pathParts[1];

    // Format maker name helper function
    const formatMakerName = (slug) => {
      if (!slug) return "";
      if (slug === "ashok-layland") return "ASHOK LEYLAND";
      return slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const makerName = formatMakerName(maker);

    // Get model display name
    let modelDisplayName = propModelName || "";
    if (!modelDisplayName && isModelDetailPage && params.modelId) {
      const modelIdStr = params.modelId.toString();
      if (!isNaN(modelIdStr)) {
        modelDisplayName = "";
      } else {
        modelDisplayName = modelIdStr
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toUpperCase())
          .join(" ");
      }
    }

    return {
      isModelDetailPage,
      maker,
      makerName,
      modelDisplayName,
    };
  }, [location.pathname, params.maker, params.modelId, propModelName]);

  const { isModelDetailPage, maker, makerName, modelDisplayName } = breadcrumbData;

  return (
    <div className="w-full mb-4">
      <nav className="w-full bg-white py-3 px-3 sm:px-4 md:px-6">
        <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm sm:text-base">
          {/* Home Icon */}
          <li className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-blue-800 hover:text-blue-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
              aria-label="Home"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M3.012,10.981,3,11H5v9a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V11h2a1,1,0,0,0,.555-1.832l-9-6a1,1,0,0,0-1.11,0l-9,6a1,1,0,0,0-.277,1.387A.98.98,0,0,0,3.012,10.981ZM10,14a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1v5H10Z" />
              </svg>
            </Link>
          </li>

          {/* Separator */}
          <li className="text-blue-400 mx-1" aria-hidden="true">
            &gt;
          </li>

          {/* Car Makers Link */}
          <li>
            <Link
              to="/vehicles"
              className="text-blue-800 hover:text-blue-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-1"
            >
              Car Makers
            </Link>
          </li>

          {/* Maker Name (if on maker or model page) */}
          {makerName && (
            <>
              {/* Separator */}
              <li className="text-blue-400 mx-1" aria-hidden="true">
                &gt;
              </li>
              <li>
                {isModelDetailPage ? (
                  <Link
                    to={`/vehicles/${maker}`}
                    className="text-blue-800 hover:text-blue-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-1 font-medium"
                  >
                    {makerName.toUpperCase()}
                  </Link>
                ) : (
                  <span className="text-blue-600 font-medium">
                    {makerName.toUpperCase()} spare parts and accessories
                  </span>
                )}
              </li>
            </>
          )}

          {/* Model Name (if on model detail page) */}
          {isModelDetailPage && modelDisplayName && (
            <>
              {/* Separator */}
              <li className="text-blue-400 mx-1" aria-hidden="true">
                &gt;
              </li>
              <li>
                <span className="text-blue-500 font-medium">
                  {modelDisplayName} spare parts and accessories
                </span>
              </li>
            </>
          )}
        </ol>
      </nav>
      {/* Light blue divider line */}
      <div className="w-full h-px bg-blue-300" aria-hidden="true" />
    </div>
  );
};

export default VehicleBreadcrumbs;
