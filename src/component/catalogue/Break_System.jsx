import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

export const Break_System = () => {
  const description = useMemo(() => (
    <p>
      Explore a complete range of brake system components including pads, discs, calipers, hoses, and master cylinders to ensure safe and efficient braking performance.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-10 rounded-2xl shadow-md">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-bold mb-4 text-red-700">The brake system keeps everyone safe and sound</h2>
        <p className="mb-4">
          The car braking system is a classification of mechanical, electronic, and hydraulic components that works
          together with friction for the cleaner stopping of the vehicle. When a driver depresses the brake pedal, the pressure moves the piston to the master cylinder, which puts the
          brake fluid from the master cylinder to the wheel cylinders and calipers through brake lines and flexible hoses.
        </p>

        <h2 className="text-lg font-bold mb-4 text-red-700">Types of Car Brakes</h2>
        <p className="mb-4">
          <strong className="text-[#131c36]">Disk Brakes:</strong> It is a type of braking system which uses calipers to squeeze pairs of pads
          against a disc in order to create friction.
        </p>
        <p className="mb-6">
          <strong className="text-[#131c36]">Drum Brakes:</strong> It is a type that uses friction caused as a result of shoes or pads that are pressed
          outwards against a cylinder-shaped part called a brake drum.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Brake"
      categorySlug="brakes"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Break_System;
