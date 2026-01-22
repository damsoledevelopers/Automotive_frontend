import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const MaintenanceServiceParts = () => {
  const description = useMemo(() => (
    <p>
      Discover high-quality maintenance parts designed to keep your vehicle in top performance and condition, from filters to brake pads and belts.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-white text-gray-800 py-4 sm:py-6 px-3 sm:px-4 rounded-xl sm:rounded-2xl shadow-sm mt-4 sm:mt-6">
      <div className="space-y-4">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-red-700 border-b-2 border-red-300 inline-block pb-2">
          About Car Maintenance Parts
        </h2>

        <p className="font-medium leading-relaxed text-xs sm:text-sm">
          Regular maintenance parts like oil and air filters, headlights, drive belts, brake pads,
          wheel speed, humidity and temperature sensors are vital. They may last longer depending on driving habits and environment conditions.
        </p>

        <h3 className="text-sm sm:text-base font-semibold text-red-700 mt-4 sm:mt-6">
          When should car maintenance parts be replaced?
        </h3>
        <p className="font-medium leading-relaxed text-xs sm:text-sm">
          Car makers usually determine the time when maintenance should be performed. Some parts need replacement
          after 30,000 miles, others can last up to 90,000 miles. Always check your owner’s manual.
        </p>

        <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 ml-2 sm:ml-4 text-xs sm:text-sm text-gray-700 font-medium">
          <li>Engine oil and fluids — should not appear muddy or dark.</li>
          <li>Battery — ensures the vehicle runs smoothly.</li>
          <li>Tires — must be properly inflated and checked regularly.</li>
          <li>Filters — keep the air and engine clean from contaminants.</li>
          <li>Belts — replace if cracked, loose, or frayed.</li>
        </ul>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Maintenance Service Parts"
      categorySlug="maintenance_service_parts"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default MaintenanceServiceParts;
