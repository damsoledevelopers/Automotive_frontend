import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const ClutchParts = () => {
  const description = useMemo(() => (
    <p>
      Explore our range of high-quality clutch parts designed for optimal performance and durability.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-red-600">About Clutch Parts</h2>
        <p>
          The clutch is a crucial component in manual transmission vehicles, allowing smooth gear changes
          and power transfer from the engine to the transmission. Quality clutch parts ensure reliable
          performance and longevity of your vehicle's transmission system.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Clutch"
      categorySlug="clutch"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default ClutchParts;
