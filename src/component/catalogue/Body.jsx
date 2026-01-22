import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Body = () => {
  const description = useMemo(() => (
    <p>
      Discover a wide range of body parts for your vehicle, including bumpers, doors, and more.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-md transition-all duration-300">
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-red-600">
          A Meaning of a Car Body and Body Parts of Car
        </h2>

        <p className="text-xs sm:text-sm">
          A car enthusiast can be sure that the motor, transmission or brakes are the most essential
          components of an automobile. But the car body – the component where all the other
          components and systems are installed and fixed – still remains the main framework of a
          vehicle. It locates the driver and passengers, holds the cargo, and protects everything
          from external impacts.
        </p>

        <p className="text-xs sm:text-sm">
          Exterior is not the least thing to care about. A new automobile attracts attention with
          flawless lines, curves, and a shiny body surface. A well-maintained car looks elegant and
          creates a positive impression about its owner.
        </p>

        <p className="text-xs sm:text-sm">
          Yet, dents, scratches, or misaligned doors signal neglect or poor maintenance — sometimes
          even danger. That's why maintaining and updating your car body is essential.
        </p>

        <p className="text-xs sm:text-sm">The main auto body parts include:</p>

        <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 pl-2 sm:pl-4 text-xs sm:text-sm">
          <li>A boot lid and a hood</li>
          <li>Front and rear splashers</li>
          <li>Body sills</li>
          <li>Front and rear bumpers and protective accessories</li>
          <li>Doors, including locks and door handles</li>
        </ul>

        <p className="text-xs sm:text-sm">
          Additionally, body parts include optics covers, mudguards, spoilers, and protective
          elements for the gearbox and motor.
        </p>

        <h2 className="text-base sm:text-lg font-bold text-red-600">Why Do You Need Car Body Parts?</h2>

        <p className="text-xs sm:text-sm">Drivers usually buy body parts for two main purposes:</p>

        <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 pl-2 sm:pl-4 text-xs sm:text-sm">
          <li>To repair or replace damaged parts</li>
          <li>To perform car tuning or modification</li>
        </ul>

        <p className="text-xs sm:text-sm">The most common reasons for replacement include:</p>

        <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 pl-2 sm:pl-4 text-xs sm:text-sm">
          <li>Damage from accidents or vandalism</li>
          <li>Wear and tear due to long-term use</li>
          <li>High-speed driving on rough roads</li>
          <li>Improper vehicle handling</li>
          <li>Poor-quality or unprofessional repairs</li>
        </ul>

        <p className="text-xs sm:text-sm">
          A skilled mechanic and quality body parts can restore your car perfectly. It's always best
          to choose original or licensed parts for reliability, though refurbished OEM parts can be a
          budget-friendly alternative.
        </p>

        <p className="text-xs sm:text-sm">
          Tuning allows improving aerodynamics, control, and aesthetics — often using lightweight
          materials like fiberglass or carbon fiber for spoilers, arches, and ground effects.
        </p>

        <h2 className="text-base sm:text-lg font-bold text-red-600">
          Where to Buy Car Body Parts and Accessories Online?
        </h2>

        <p className="text-xs sm:text-sm">
          You can quickly buy the required spare parts at our online store at the best prices. Our
          detailed price list with product images makes selection easy. We offer a wide range of
          reliable, high-quality car body parts, absorbers, and accessories to enhance your vehicle's
          performance and appearance.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Body"
      categorySlug="body"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Body;
