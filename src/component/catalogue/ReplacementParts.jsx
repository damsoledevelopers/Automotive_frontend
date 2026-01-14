import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const replacementPartsData = [
  { title: "Air Conditioning", href: "/catalog/air_conditioning/", img:"https://boodmo.com/media/cache/catalog_image/images/categories/db9dad4.jpg"}, // Receiver Drier
  { title: "Bearings", href: "/catalog/bearings/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/40e95ca.jpg" }, // Big End Bearing
  { title: "Belts Chains And Rollers", href: "/catalog/drive_belts/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/ddbeb81.jpg" }, // Belt
  { title: "Body", href: "/catalog/body/", img:  "https://boodmo.com/media/cache/catalog_image/images/categories/40e6a4c.jpg" }, // Bumper
  { title: "Brake System", href: "/catalog/brakes/", img:"https://boodmo.com/media/cache/catalog_image/images/categories/5301830.jpg" }, // Brake Pads
  { title: "Car Accessories", href: "/catalog/car_accessories/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/ab143a7.webp" }, // Body Accessories
  { title: "Clutch System", href: "/catalog/clutch/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e8cb288.jpg" }, // Clutch
  { title: "Control Cables", href: "/catalog/control_cables/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/7455b44.jpg" }, // Cable Strap
  { title: "Electrical Components", href: "/catalog/electric_components/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/d5b3ac7.jpg" }, // Horn
  { title: "Engine", href: "/catalog/engine/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/8fea232.jpg" }, // Air Supply/Engine Parts
  { title: "Engine Cooling System", href: "/catalog/cooling_system/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e215fcc.jpg" }, // Radiator Mounting
  { title: "Exhaust System", href: "/catalog/exhaust/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/d1e33d6.jpg" }, // Cooler EGR
  { title: "Filters", href: "/catalog/filters/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a16bbf6.jpg" }, // Air Filter
  { title: "Fuel Supply System", href: "/catalog/fuelsystem/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/49ed220.jpg" }, // Fuel Tank
  { title: "Gaskets & Seals", href: "/catalog/Gasket_SealingRings/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/14b8753.jpg" }, // O-Ring
  { title: "Interior and Comfort", href: "/catalog/interior_comfort/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/05a2b84.jpg" }, // Interior Mirror
  { title: "Lighting", href: "/catalog/lighting/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/53380d3.webp" }, // Light
  { title: "Maintenance Service Parts", href: "/catalog/maintenance_service_parts/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e8cb288.jpg" }, // Engine Oil
  { title: "Oils and Fluids", href: "/catalog/oilsfluids/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/4614ecf.webp" }, // Engine Oil
  { title: "Pipes & Hoses", href: "/catalog/pipes_hoses/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e0b2a63.jpg" }, // Sunroof Drain Hose
  { title: "Sensors Relays and Control Units", href: "/catalog/sensors_control_units/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/2676bd2.jpg" }, // Control Unit
  { title: "Steering", href: "/catalog/steering/", img:  "https://boodmo.com/media/cache/catalog_image/images/categories/72fb97b.jpg" }, // Steering Component
  { title: "Suspension and Arms", href: "/catalog/suspension/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/f26073e.jpg" }, // Shock Absorber
  { title: "Towbar Parts", href: "/catalog/towbar/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/98b48d2.jpg" }, // Towhook Cover
  { title: "Transmission", href: "/catalog/transmission/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/21ce121.jpg" }, // Automatic Transmission Filter
  { title: "Trims", href: "/catalog/trims/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/beccd06.jpg" }, // Bumper Trim
  { title: "Universal", href: "/catalog/universal/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/af8d099.jpg" }, // Bolt
  { title: "Wheels", href: "/catalog/wheels/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/430177a.jpg" }, // Spare Wheel Carrier
  { title: "Windscreen Cleaning System", href: "/catalog/windscreen_cleaning_system/", img: "https://boodmo.com/media/cache/catalog_image/images/categories/1053d82.jpg" }, // Wiper Blade
];

const ReplacementParts = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredParts = replacementPartsData.filter((part) =>
    part.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Replacement <span className="text-sky-600">Parts</span>
        </h3>

        <input
          type="search"
          placeholder="Filter Category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-64 border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        {filteredParts.map((part, index) => (
          <a
            key={index}
            href={part.href}
            className="flex flex-col items-center bg-white shadow hover:shadow-lg rounded-lg sm:rounded-xl p-2 sm:p-3 transition-transform transform hover:scale-105"
          >
            <img
              src={part.img}
              alt={part.title}
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain mb-2"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/100x100?text=' + (part.title || 'Part');
              }}
            />
            <span className="text-[10px] sm:text-xs text-gray-700 text-center font-medium line-clamp-2">
              {part.title}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ReplacementParts;
