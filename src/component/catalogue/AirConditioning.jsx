import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const AirConditioning = () => {
  const description = useMemo(() => (
    <p>
      Explore our wide range of air conditioning parts designed to keep your vehicle cool and comfortable, including compressors, condensers, and evaporators.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300">
      <div className="space-y-4">
        <p className="text-sm">
          Basic necessities have been food, clothing, and shelter right from the beginning of the human race.
          However, if you live in the scorching heat of northern India, where temperatures sometimes even touch the 50°C mark during summer,
          you will agree that an air conditioner (AC) is the lone saviour in such conditions.
        </p>

        <h2 className="text-lg font-semibold text-red-600">Compressor</h2>
        <p className="text-sm">
          The most important and significant part of the air conditioning system is the Compressor,
          as the quality of cool air depends upon it. It carries out several key tasks in the functioning of an AC unit.
        </p>

        <h2 className="text-lg font-semibold text-red-600">Condenser</h2>
        <p className="text-sm">
          Generally, the AC condenser in any passenger vehicle is positioned in front of the radiator — earning it the nickname "mini radiator."
          The condenser lowers the temperature and pressure of the hot gases generated from the refrigerant.
        </p>

        <h2 className="text-lg font-semibold text-red-600">Evaporator</h2>
        <p className="text-sm">
          The Evaporator plays a substantial role in generating cold air from the air conditioner.
          Located behind the dashboard, it cools the air with refrigerant before it exits the vents and enters your car's cabin.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Air Conditioning"
      categorySlug="air_conditioning"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default AirConditioning;

