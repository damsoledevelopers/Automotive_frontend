import React from "react";
 import { OpenOemCatalogue } from "./OpenOemCatalog"; // ✅ Named export
import VehicleBreadcrumbs from "./VehicleBreadcrumbs";

// ✅ Map vehicle names to OriParts links
const brandLinks = {
  MARUTI: "https://oriparts.com/7",
  HYUNDAI: "https://oriparts.com/10",
  MAHINDRA: "https://oriparts.com/14",
  TATA: "https://oriparts.com/21",
  CHEVROLET: "https://oriparts.com/20",
  HONDA: "https://oriparts.com/5",
  SKODA: "https://oriparts.com/8",
  VW: "https://oriparts.com/9",
  TOYOTA: "https://oriparts.com/6",
  NISSAN: "https://oriparts.com/13",
  RENAULT: "https://oriparts.com/15",
  FORD: "https://oriparts.com/4",
  FIAT: "https://oriparts.com/16",
  KIA: "https://oriparts.com/23",
};

const VehiclePage = ({ brand }) => {
  const link = brandLinks[brand?.toUpperCase()] || "https://oriparts.com/";

  return (
    <section className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <VehicleBreadcrumbs />

      {/* Vehicle Info */}
      <div className="bg-white shadow-md rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 uppercase">
          {brand}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
          Explore genuine OEM parts for your {brand?.toUpperCase()} vehicle.
        </p>

        {/* Button to open OEM Catalogue */}
        <button
          onClick={() => OpenOemCatalogue(link)}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 mt-3 sm:mt-4 rounded-full shadow transition text-sm sm:text-base"
        >
          View OEM Catalogue
        </button>
      </div>
    </section>
  );
};

export default VehiclePage;
