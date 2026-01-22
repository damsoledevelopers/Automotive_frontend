import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Tyres_Alloys = () => {
  const description = useMemo(() => (
    <p>
      Explore our wide range of tyres and alloy wheels designed for optimal performance and style.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-red-600">About Tyres and Alloys</h2>
        <p>
          Tyres and alloy wheels are essential components that directly impact your vehicle's performance, safety, and appearance.
          Quality tyres ensure proper grip, handling, and fuel efficiency, while alloy wheels provide durability and aesthetic appeal.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Tyres and Alloys"
      categorySlug="tyres_and_alloys"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Tyres_Alloys;
