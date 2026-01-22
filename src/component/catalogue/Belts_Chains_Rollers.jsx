import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Belts_Chains_Rollers = () => {
  const description = useMemo(() => (
    <p>
      Explore our wide range of belts, chains, and rollers designed for optimal performance and durability in your vehicle's engine and transmission systems.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-red-600">About Belts, Chains and Rollers</h2>
        <p>
          Belts, chains, and rollers are essential components in automotive systems, responsible for transferring power and motion between different engine and transmission parts. They ensure smooth operation and proper synchronization of various mechanical components.
        </p>

        <h3 className="text-lg font-semibold text-red-600 mt-6">Types of Belts</h3>
        <p>
          Drive belts connect the crankshaft to various engine accessories like the alternator, power steering pump, and air conditioning compressor. Timing belts synchronize the rotation of the crankshaft and camshaft, ensuring proper valve timing in the engine.
        </p>

        <h3 className="text-lg font-semibold text-red-600 mt-6">Chains and Rollers</h3>
        <p>
          Timing chains serve a similar purpose to timing belts but are more durable and typically used in larger engines. Rollers help maintain proper tension and alignment of belts and chains, preventing slippage and ensuring efficient power transfer.
        </p>

        <p className="mt-4">
          Regular inspection and timely replacement of belts, chains, and rollers are crucial for maintaining engine performance and preventing costly repairs. Quality components ensure reliable operation and longevity of your vehicle's powertrain system.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Belts Chains And Rollers"
      categorySlug="drive_belts"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Belts_Chains_Rollers;

