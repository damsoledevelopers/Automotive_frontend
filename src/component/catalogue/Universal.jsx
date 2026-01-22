import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Universal = () => {
  const description = useMemo(() => (
    <p>
      Explore our wide range of universal parts and accessories designed to fit various vehicle makes and models.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-red-600">About Universal Parts</h2>
        <p>
          Universal parts are designed to fit multiple vehicle makes and models, providing flexibility and convenience
          for car owners. These parts offer a cost-effective solution while maintaining quality and performance standards.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Universal"
      categorySlug="universal"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Universal;
