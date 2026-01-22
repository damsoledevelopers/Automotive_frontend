import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Filters = () => {
  const description = React.useMemo(() => (
    <p>
      Explore our wide range of filters including air, oil, fuel, and cabin filters designed to maintain your vehicle's health.
    </p>
  ), []);

  const footerContent = React.useMemo(() => (
    <section className="bg-white text-gray-800 py-10 px-6 w-full">
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-red-700 border-b-2 border-red-300 inline-block pb-2">
          About Filters Parts
        </h2>
        <p className="font-medium leading-relaxed">
          Filters are the dirtiest parts of the car. They need to be replaced much more often than any other parts.
          The selection and installation of filters should be treated with special attention, since the "price" of an error
          can be very high — damage to the engine or the entire fuel system.
        </p>
        <h3 className="text-xl font-semibold text-red-700 mt-8">Buy Online Filters Parts in India</h3>
        <p className="font-medium leading-relaxed">
          Now most purchases are made online. Spare parts for cars, in particular, are no exception.
          Auto parts online stores have a wide range of components and accessories for foreign cars at reasonable prices.
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 font-medium">
          <li>Oil filter</li>
          <li>Fuel filter</li>
          <li>Air filter</li>
          <li>Cabin (salon) filter</li>
        </ul>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Filters"
      categorySlug="filters"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Filters;
