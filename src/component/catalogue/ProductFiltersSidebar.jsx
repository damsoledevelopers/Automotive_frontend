import React from "react";

const ProductFiltersSidebar = ({
  products = [],
  selectedOrigin = [],
  selectedBrands = [],
  fulfilledBySparelo = false,
  freeDelivery = false,
  onOriginChange,
  onBrandChange,
  onFulfilledBySpareloChange,
  onFreeDeliveryChange,
  onReset,
  uniqueBrands = [],
}) => {
  const handleOriginChange = (origin) => {
    if (onOriginChange) {
      onOriginChange(origin);
    }
  };

  const handleBrandChange = (brand) => {
    if (onBrandChange) {
      onBrandChange(brand);
    }
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100 sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
        <h3 className="text-[10px] sm:text-sm font-semibold text-gray-800">Filters</h3>
        <button
          onClick={handleReset}
          className="text-[9px] sm:text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          RESET
        </button>
      </div>

      {/* Origin Filter */}
      <div className="mb-4">
        <h4 className="font-semibold text-[9px] sm:text-xs text-gray-800 mb-2">Origin</h4>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedOrigin.includes("Aftermarket")}
              onChange={() => handleOriginChange("Aftermarket")}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-[9px] sm:text-xs text-gray-700">
              Aftermarket ({products.filter((p) => !p.isOEM).length})
            </span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedOrigin.includes("OEM")}
              onChange={() => handleOriginChange("OEM")}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-[9px] sm:text-xs text-gray-700">
              OEM ({products.filter((p) => p.isOEM).length})
            </span>
          </label>
        </div>
      </div>

      {/* Fulfilled by Sparelo */}
      <div className="mb-4">
        <h4 className="font-semibold text-[9px] sm:text-xs text-gray-800 mb-2">
          Fulfilled by Sparelo
        </h4>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={fulfilledBySparelo}
            onChange={(e) => {
              if (onFulfilledBySpareloChange) {
                onFulfilledBySpareloChange(e.target.checked);
              }
            }}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-[9px] sm:text-xs text-gray-700">
            Fulfilled by Sparelo ({products.filter((p) => p.fulfilledBySparelo).length})
          </span>
        </label>
      </div>

      {/* Free Delivery */}
      <div className="mb-4">
        <h4 className="font-semibold text-[9px] sm:text-xs text-gray-800 mb-2">Free Delivery</h4>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={freeDelivery}
            onChange={(e) => {
              if (onFreeDeliveryChange) {
                onFreeDeliveryChange(e.target.checked);
              }
            }}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-[9px] sm:text-xs text-gray-700">
            Free Delivery ({products.filter((p) => p.freeDelivery).length})
          </span>
        </label>
      </div>

      {/* Brand Filter */}
      <div className="mb-4">
        <h4 className="font-semibold text-[9px] sm:text-xs text-gray-800 mb-2">Brand</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {uniqueBrands.slice(0, 5).map((brand) => {
            const count = products.filter((p) => p.brand === brand).length;
            return (
              <label key={brand} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-[9px] sm:text-xs text-gray-700">
                  {brand} ({count})
                </span>
              </label>
            );
          })}
          {uniqueBrands.length > 5 && (
            <button className="text-[9px] sm:text-xs text-blue-600 hover:text-blue-700 mt-2">
              +{uniqueBrands.length - 5} More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFiltersSidebar;

