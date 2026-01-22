import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Wheels = () => {
  const description = useMemo(() => (
    <p>
      Explore our wide range of wheel components designed for optimal performance and safety.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300 my-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-red-600">Buy Online Wheels Car Parts in India</h2>

        <p>
          The wheel, being an essential part of the chassis, connects the car to the road. Through the wheels,
          the vehicle achieves motion, transfers vertical loads, and absorbs road vibrations. Additionally,
          the wheels create traction force when in contact with the road, meaning the car's drivability and stability
          depend greatly on them.
        </p>

        <p>
          If you're looking to buy quality parts for your vehicle, welcome to <strong>Sparelo</strong>. Here you'll find:
        </p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Highly professional service</li>
          <li>Incredible range of necessary parts</li>
          <li>Quality and certified spare parts</li>
          <li>Original and modified details</li>
          <li>Attractive prices for wheels car parts</li>
          <li>Sales and much more!</li>
        </ul>

        <p>
          Whether you choose original or analog parts, at full price or discount, you'll receive a high-quality product
          that extends your vehicle's lifespan and ensures comfortable performance.
        </p>

        <h2 className="text-2xl font-bold text-red-600">Wheels Parts: Choose for Your Auto the Best Spares</h2>

        <p>A car wheel consists of two main components:</p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Wheel disc</li>
          <li>Tires</li>
        </ul>

        <p>
          The wheel disc serves as the foundation for installing the tire and transferring rotation from the axle.
          It structurally combines the disc and rim. There are two types of wheel rims — steel and light alloy.
          In steel wheels, the rim and disc are welded together, while in alloy wheels, both form a single solid unit.
        </p>

        <p>The wheel disc is characterized by the following parameters:</p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Rim width (distance between shelves)</li>
          <li>Disc diameter (measured at the level of the shelves)</li>
          <li>Offset (distance from the centerline of the disc to the hub mounting plane)</li>
        </ul>

        <p>
          The car tire performs critical functions — ensuring grip on the road, providing stability, and supporting
          the vehicle's weight. A tubeless tire consists of several components: frame, breaker, tread, sidewall, and bead.
        </p>

        <h3 className="text-xl font-semibold text-red-600">
          Prices for Wheels Car Parts: Catalog of Propositions on Sparelo
        </h3>

        <p>
          On the Sparelo website, you'll find everything your car needs. The wheel parts catalog includes more than
          <strong> 171,000 items</strong>. You can search by part name, car model, or modification, and instantly view
          all available options with technical specifications and prices.
        </p>

        <p>
          A car is a complex system of interconnected components. The failure of a single part can lead to damage
          in related assemblies and degrade the overall vehicle performance.
        </p>

        <p>
          Remember — there are no unnecessary components in a modern car. Each part serves a purpose.
          If a technical component fails, don't delay the repair — it'll save you costs in the future.
          Partner with the best — visit <strong>Sparelo</strong> and keep your car performing like new.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Wheels"
      categorySlug="wheels"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Wheels;
