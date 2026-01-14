import React, { useState } from "react";

const carBrands = [
  { name: "MARUTI", link: "/vehicles/maruti/" },
  { name: "HYUNDAI", link: "/vehicles/hyundai/" },
  { name: "MAHINDRA", link: "/vehicles/mahindra/" },
  { name: "TATA", link: "/vehicles/tata/" },
  { name: "CHEVROLET", link: "/vehicles/chevrolet/" },
  { name: "HONDA", link: "/vehicles/honda/" },
  { name: "SKODA", link: "/vehicles/skoda/" },
  { name: "VW", link: "/vehicles/vw/" },
  { name: "TOYOTA", link: "/vehicles/toyota/" },
  { name: "NISSAN", link: "/vehicles/nissan/" },
  { name: "RENAULT", link: "/vehicles/renault/" },
  { name: "FORD", link: "/vehicles/ford/" },
  { name: "FIAT", link: "/vehicles/fiat/" },
  { name: "KIA", link: "/vehicles/kia/" },
];

const OEMCatalogue = () => {
  const [filter, setFilter] = useState("");

  // ✅ Fix: use brand.name instead of brand
  const filteredBrands = carBrands.filter((brand) =>
    brand.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className="bg-white shadow-md rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-8 sm:mb-10 md:mb-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 sm:mb-6 gap-4">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          OEM <span className="text-red-600">Catalogue</span>
        </h3>
        <input
          type="search"
          placeholder="Filter Car Maker"
          className="w-full md:w-auto border border-gray-300 rounded-full px-3 sm:px-4 py-2 text-sm sm:text-base"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {filteredBrands.map((brand) => (
          <a
            key={brand.name}
            href={brand.link}
            className="block text-center py-3 sm:py-4 bg-white hover:bg-gray-50 hover:shadow-md rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm text-gray-700 shadow-sm transition"
          >
            {brand.name}
          </a>
        ))}
      </div>
    </section>
  );
};

export default OEMCatalogue;
