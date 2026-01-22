import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Gasket_SealingRings = () => {
  const description = useMemo(() => (
    <p>
      Explore our wide range of gasket and sealing rings designed to provide a reliable seal and prevent leaks in your engine.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="seo-text my-10 px-4 sm:px-8 lg:px-16">
      <div className="space-y-4 text-gray-800 dark:text-gray-200">
        <h1 className="text-3xl font-bold mb-4">
          Gaskets and Sealing Rings
        </h1>
        <p>
          The car engine is composed of numerous metal, plastic, and rubber components.
          Gaskets and sealing rings play a crucial role in maintaining tightness within
          these mechanisms. They ensure that technical fluids circulating under pressure
          do not leak, while also preventing dust, moisture, and dirt from entering from
          the outside.
        </p>

        <p>
          Gaskets help achieve an ideal fit between surfaces, compensating for irregularities
          and small defects. Their elasticity allows them to seal the housing and prevent
          fluid leakage, keeping internal components well-protected.
        </p>

        <h2 className="text-xl font-semibold text-red-600 dark:text-pink-400">
          Buy Gasket Ring: Mechanical Properties
        </h2>
        <p>
          The shape and material of a gasket depend on its function and operating environment:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Some gaskets keep technical fluids inside the case.</li>
          <li>
            Others provide maximum sealing where parts meet, withstanding high temperatures
            and internal tension.
          </li>
          <li>
            Oil seals (a type of gasket) are used where moving and stationary parts meet.
          </li>
        </ul>

        <p>
          Each gasket is designed for specific engine types and configurations, meaning
          they are not interchangeable between different motors. Always purchase gaskets
          that fit the exact model of your power unit.
        </p>

        <h2 className="text-xl font-semibold text-red-600 dark:text-pink-400">
          Buy Sealing Rings
        </h2>
        <p>
          Gaskets are generally divided into two main types based on their material:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Metal</li>
          <li>Non-metallic</li>
        </ul>

        <p>
          Metal gaskets are multi-layered, often made from steel or copper alloys. They
          offer excellent durability and resistance to wear, though they tend to cost more.
          Non-metallic gaskets include asbestos-based, asbestos-free, and rubberized
          varieties — sometimes reinforced with graphite or other materials for improved
          sealing.
        </p>

        <h2 className="text-xl font-semibold text-red-600 dark:text-pink-400">
          Gaskets and Sealing Rings Car Parts
        </h2>
        <p>
          You can easily purchase gasket rings and sealing rings for your vehicle at the
          best price in India from our online store. We offer a large selection of over
          220,000 parts, attractive discounts, and reliable customer service.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Gaskets & Seals"
      categorySlug="gaskets_sealingrings"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Gasket_SealingRings;
