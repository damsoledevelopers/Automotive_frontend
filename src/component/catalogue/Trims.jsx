import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Trims = () => {
  const description = useMemo(() => (
    <p>
      Explore our wide range of trims and accessories.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300">
      <div className="space-y-4">
        <h1 className="text-xl font-semibold text-red-800 mb-2">About Car Trims</h1>
        <p className="text-gray-600">
          The trims are elements incorporated into the jointing edges of the walls, windows, and doors to cover the gap between the glass and the frame and protect the cabin of the car from running water.
          They can also be used for aesthetic purposes and come in different widths and lengths to fit specific sections.
          When looking for a trim, it's important to know its intended purpose and consider all parameters including shape.
          If the old one is partially damaged, you'll need to buy and install a new trim instead. The cost varies depending on the car model.
          A mechanic at a service station can determine whether the trim needs replacement or if it can be repaired and restored.
        </p>

        <h1 className="text-xl font-semibold text-red-800 mb-2">When Should Car Trims Be Replaced?</h1>
        <p className="text-gray-600">
          The best way to restore your car is to install new trims to prevent water leakage through the windows, which could cause dashboard issues or interior damage.
          You can tell it's time to replace them if:
        </p>
        <ul className="list-disc pl-6 text-gray-600">
          <li>You see leaks around the edges of your doors and windows.</li>
          <li>The original color of the trim changes.</li>
          <li>There is a musty smell and mold in the cabin.</li>
          <li>The windows become foggy from the inside.</li>
          <li>Exterior trim pieces have become weak and loose.</li>
        </ul>

        <h1 className="text-xl font-semibold text-red-800 mb-2">Our Advantages</h1>
        <p className="text-gray-600">
          Boodmo — India's largest online marketplace for car spare parts — is where everyone can achieve their goals.
          Sellers can reach a wide audience, and buyers can purchase needed items under the most favorable conditions.
          We provide a convenient, efficient experience with access to a diverse selection of auto spares and accessories from all over the world. You'll enjoy:
        </p>
        <ul className="list-disc pl-6 text-gray-600">
          <li>An efficient search system with three ways to find products and smart filters to narrow results.</li>
          <li>A well-designed product page with detailed descriptions and accurate images.</li>
          <li>Shopping tools like related parts and compatible product suggestions.</li>
          <li>Frequent discounts and special offers, including weekly delivery deals.</li>
        </ul>
        <p className="text-gray-600 mt-4">
          Need trims for your car? Browse Boodmo's unmatched catalogue featuring the widest range of car spare parts and find items that help you restore your vehicle cost-efficiently.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Trims"
      categorySlug="trims"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Trims;
