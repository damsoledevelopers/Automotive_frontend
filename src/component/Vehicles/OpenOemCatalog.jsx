import React, { useState } from "react";

// ✅ Common function that opens the OriParts link in a new tab
export const OpenOemCatalogue = (link) => {
  if (link) {
    window.open(link, "_blank", "noopener,noreferrer");
  } else {
    window.open("https://oriparts.com/", "_blank", "noopener,noreferrer"); // fallback
  }
};

// ✅ Car brand list with OEM links
const carBrands = [
  { name: "MARUTI", link: "https://oriparts.com/7" },
  { name: "HYUNDAI", link: "https://oriparts.com/8" },
  { name: "MAHINDRA", link: "https://oriparts.com/4" },
  { name: "TATA", link: "https://oriparts.com/3" },
  { name: "CHEVROLET", link: "https://oriparts.com/51" },
  { name: "HONDA", link: "https://oriparts.com/48" },
  { name: "SKODA", link: "https://oriparts.com/59" },
  { name: "VW", link: "https://oriparts.com/39" },
  { name: "TOYOTA", link: "https://oriparts.com/5" },
  { name: "NISSAN", link: "https://oriparts.com/13" },
  { name: "RENAULT", link: "https://oriparts.com/35" },
  { name: "FORD", link: "https://oriparts.com/42" },
  { name: "FIAT", link: "https://oriparts.com/41" },
  { name: "KIA", link: "https://oriparts.com/74" },
];

const OpenOemCatalog = () => {
  const [filter, setFilter] = useState("");

  const filteredBrands = carBrands.filter((brand) =>
    brand.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className="bg-white shadow-md rounded-2xl p-6 mb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h3 className="text-3xl font-semibold text-gray-800">
          OEM <span className="text-red-600">Catalogue</span>
        </h3>

        <input
          type="search"
          placeholder="Filter Car Maker..."
          aria-label="Filter car maker"
          className="mt-4 md:mt-0 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Car Brand Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {filteredBrands.map((brand) => (
          <div
            key={brand.name}
            onClick={() => OpenOemCatalogue(brand.link)}
            className="cursor-pointer select-none text-center py-4 bg-gray-50 hover:bg-blue-50 hover:shadow-md rounded-xl font-medium text-gray-700 shadow-sm transition-transform duration-200 hover:scale-105"
          >
            {brand.name}
          </div>
        ))}

        {filteredBrands.length === 0 && (
          <p className="col-span-full text-center text-gray-500 italic">
            No matching brands found.
          </p>
        )}
      </div>
    </section>
  );
};

export default OpenOemCatalog;
