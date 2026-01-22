import React, { useState, useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Engine_Cooling_System = () => {
  const [showMore, setShowMore] = useState(false);

  const description = useMemo(() => (
    <p>
      Explore our wide range of engine cooling system parts designed to keep your vehicle running smoothly and efficiently.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-white text-gray-800 py-10 rounded-2xl shadow-sm mt-10">
      <div
        className={`transition-all duration-500 ease-in-out ${showMore ? "max-h-full" : "max-h-[600px] overflow-hidden"
          }`}
      >
        <p className="mb-4 leading-relaxed">
          Modern trends have brought the auto parts industry online. Boodmo offers a
          wide selection of engine cooling system parts along with excellent service
          and a vast catalog that will impress you with its variety. Whether you’re
          looking for parts to maintain or repair your car’s cooling system, you’ll
          find suitable options among nearly 210,000 listings.
        </p>

        <h2 className="text-2xl font-bold text-red-700 mt-6 mb-2">
          About Engine Cooling System Parts
        </h2>
        <p className="leading-relaxed mb-4">
          The cooling system plays a crucial role in maintaining your engine’s
          temperature, ensuring optimal performance and preventing overheating. It
          regulates the engine’s thermal balance by removing excess heat generated
          during combustion. Without a properly functioning cooling system, your
          engine may deform, oil may lose its protective qualities, and components
          may wear out prematurely.
        </p>

        <h2 className="text-2xl font-bold text-red-700 mt-6 mb-2">
          Common Cooling System Parts
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
          <li>Water temperature sensors</li>
          <li>Thermal switches</li>
          <li>Radiator hose sets</li>
          <li>Rubber hoses</li>
          <li>Cooling liquids</li>
          <li>Intercoolers</li>
          <li>Water pumps and more</li>
        </ul>

        <p className="leading-relaxed mt-4">
          The most vital part of a liquid engine cooling system is the water pump,
          which circulates coolant (ethylene glycol-based) around the engine,
          radiator, thermostat housing, and heater core, ensuring a consistent
          temperature throughout.
        </p>

        <h2 className="text-2xl font-bold text-red-700 mt-6 mb-2">
          Price and Quality Guarantee
        </h2>
        <p className="leading-relaxed mb-4">
          The performance of your vehicle heavily depends on the quality of the
          replacement parts. At Boodmo, you can confidently purchase original and
          certified components. While OEM parts dominate the catalog, aftermarket
          options also come with certifications and long service guarantees —
          offering both reliability and affordability.
        </p>

        <h3 className="text-xl font-semibold text-red-700 mt-8 mb-2">
          Engine Cooling System Parts: How Much Does It Cost?
        </h3>
        <p className="leading-relaxed mb-4">
          With thousands of options available, prices at Boodmo vary widely to suit
          every budget. Enjoy competitive pricing, customer loyalty benefits, and
          discounts ranging from 5% to 40%. Don’t wait — explore the range, find the
          right parts, and keep your car performing at its best!
        </p>
      </div>

      {/* Toggle Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => setShowMore(!showMore)}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-md"
        >
          {showMore ? "View Less" : "View More"}
        </button>
      </div>
    </section>
  ), [showMore]);

  return (
    <CategoryProductList
      categoryName="Engine Cooling System"
      categorySlug="cooling_system"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Engine_Cooling_System;
