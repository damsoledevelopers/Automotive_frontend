import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Fuelsupply_System = () => {
  const description = useMemo(() => (
    <p>
      Explore our wide range of fuel supply system parts designed to keep your engine running smoothly and efficiently.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-red-600">
          Buy Online Fuel Supply System Parts in India
        </h2>

        <p>
          No car with an internal combustion engine will run if its fuel tank is empty.
          However, just having fuel in the tank isn't enough — the <strong>fuel system</strong>
          is what ensures the proper supply of energy to the engine.
        </p>

        <p>
          The primary function of the fuel system is to deliver the required amount of fuel
          to the engine, regardless of operating conditions. Structurally, it's quite complex
          as it integrates components from several subsystems. Modern engines use a design
          that controls injection through a distributor, allowing independent regulation
          of fuel mixture formation and supply dosing. This optimizes fuel quality and composition,
          improving power output, reducing toxicity, and minimizing fuel consumption — all managed
          by an electronic control unit (ECU) using various sensors to monitor speed, temperature,
          and engine load.
        </p>

        <h2 className="text-lg font-semibold text-red-600">Fuel Supply System Parts</h2>
        <p>
          If you're looking for high-quality spare parts for your vehicle,
          the <strong>Boodmo</strong> online store offers:
        </p>

        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Highly professional service</li>
          <li>Incredible range of necessary parts</li>
          <li>Certified and high-quality spare parts</li>
          <li>Original and modified options</li>
          <li>Attractive prices for fuel supply system parts</li>
          <li>Special sale offers and discounts</li>
        </ul>

        <p>
          Whether you choose original or analog parts — at full price or discounted —
          you'll receive a durable, reliable component that extends your car's lifespan
          and ensures optimal performance.
        </p>

        <h3 className="text-xl font-semibold text-red-600">Choose the Best Spares for Your Car</h3>
        <p>
          The fuel supply system of any internal combustion engine prepares the fuel-air mixture,
          consisting of fuel and air in a specific proportion.
        </p>

        <p>The main components of the fuel system include:</p>

        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            A tank containing fuel, pipelines, filters, a pressure regulator,
            and a fuel rail with injectors.
          </li>
          <li>
            Air supply components — idle regulator, throttle mechanisms, and air filter.
          </li>
          <li>
            Fuel vapor trap — adsorber with purge valve and connecting pipelines.
          </li>
        </ul>

        <p>
          Fuel is fed to the carburetor (or injectors, in modern systems), where it mixes with
          air in the proper ratio. The resulting mixture enters the engine's cylinders,
          where it burns to generate power. Exhaust gases are expelled through the manifold
          and muffler.
        </p>

        <h3 className="text-xl font-semibold text-red-600">
          Price for Fuel Supply System Parts: Explore the Boodmo Catalog
        </h3>
        <p>
          On the <strong>Boodmo</strong> website, you'll find everything you need for your car —
          including over <strong>184,000</strong> fuel supply system parts.
          You can search by name, model, or modification, and instantly view
          detailed descriptions, technical specifications, and pricing.
        </p>

        <p>
          The fuel system of a gasoline engine includes components like a fuel tank, pump, filter,
          lines, carburetor, injectors, and fuel rail.
          Shop with the best — visit <strong>Boodmo</strong> and keep your car running like new!
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Fuel Supply System"
      categorySlug="fuelsystem"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Fuelsupply_System;
