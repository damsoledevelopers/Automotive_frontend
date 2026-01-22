import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Transmission = () => {
  const description = useMemo(() => (
    <p>
      Explore our wide range of transmission parts and accessories.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300">
      <div className="space-y-4">
        <h1 className="text-xl font-semibold text-red-800 mb-2">Understanding of Car Transmission</h1>
        <p className="text-gray-600">
          In words, it is very easy to describe the transmission, but there are a lot of things happening simultaneously during the process of transmitting engine energy to wheels.
          The vehicle's gearbox is entirely dependent on power supplied by an engine—no power means it won't transmit any power to the wheel.
          The power produced by engine depends on the speed of the engine. Here, power is usable energy or torque that can be transmitted to the powertrain.
          The problem is, the produced torque is in predefined engine speed or not. This range of engine speed is needed to produce optimum torque.
        </p>

        <h1 className="text-xl text-gray-800 mb-2">Importance of Car Transmission</h1>
        <p className="text-gray-600">
          It ensures that the produced power does not get wasted and makes sure it is right enough to turn the wheels.
          If conditions require more power, it goes to lower gear ratios to allow usable power at low speeds.
        </p>

        <h1 className="text-xl font-semibold text-red-800 mb-2">Buy Transmission Parts Online in India</h1>
        <p className="text-gray-600">
          In order to help you find the right spare parts, Boodmo was incorporated. It is changing the way people used to purchase spares at a wonderful cost.
          Customers can browse a huge catalogue of automatic transmission parts, transmission spare parts, mounts, brake parts, housings, gaskets, adapters, hoses, bearings, harnesses, and many more.
          To buy online, you need to register yourself with us and search the spare part using the part number or VIN.
          Our customer service team will help you with the rest of the process, making it even easier to shop for automotive parts.
          We are working to solve real-life problems of car owners who find it really difficult to get top-quality spare parts at a great price.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Transmission"
      categorySlug="transmission"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Transmission;
