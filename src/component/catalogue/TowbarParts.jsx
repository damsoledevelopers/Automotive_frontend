import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const TowbarParts = () => {
  const description = useMemo(() => (
    <p>
      Discover a wide range of towbar parts for your vehicle, ensuring safety and reliability on the road.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300 my-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-red-600">Catalog of Towbar Parts</h2>

        <p>
          Traveling with a vehicle always carries certain risks — especially when towing a trailer. To ensure
          your cargo remains safe and to avoid dangerous situations on the road, it's essential to use a
          reliable towing device — a <strong>towbar</strong>.
        </p>

        <p>
          The internet is full of towbar parts listings, but finding trustworthy sellers can feel like a game
          of chance — you might get a quality product or end up with something completely unreliable.
        </p>

        <p>
          Fortunately, not all online stores are risky. At <strong>sparelo</strong>, one of India's best online
          auto parts marketplaces, you can find first-class products — both genuine and high-quality analogs.
          We offer components for every car brand, whether you drive a sedan, SUV, or truck. It's easy to
          search by car code, model, or name to find exactly what you need.
        </p>

        <p>
          Almost every car owner needs a towbar at some point. Towbars are traction-coupling devices used to
          connect a trailer to a vehicle — commonly found on SUVs, crossovers, and even passenger cars.
        </p>

        <p>
          Structurally, a towbar has two main parts:
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <strong>Crossbar (beam):</strong> Attached to the vehicle's frame or body using special holes and
              fasteners.
            </li>
            <li>
              <strong>Tow ball:</strong> Mounted on the beam, it provides the coupling point for the trailer.
            </li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold text-red-600">Buy Towbar Parts Online in India</h2>

        <p>
          Installing a towbar is essential for those who tow trailers or lead an active lifestyle. Whether you
          need to transport construction materials, oversized items, or travel with a trailer and tent,
          towbars are a practical and secure solution.
        </p>

        <h2 className="text-2xl font-bold text-red-600">Price for Towbar Parts</h2>

        <p>
          The <strong>sparelo</strong> catalog offers a wide selection of towbar components, including both
          genuine and modified but high-quality parts. You'll find over <strong>5,200+</strong> options in this
          section, such as:
        </p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Nagging</li>
          <li>Roman bolt</li>
          <li>Bumper cover bracket</li>
          <li>Cover for towing eye</li>
          <li>Towing hook</li>
          <li>Front hook and more</li>
        </ul>

        <p>
          Simply select your car model and part type, place your order, and enjoy quick delivery. Our reliable
          service and competitive pricing will exceed your expectations.
        </p>

        <h3 className="text-xl font-semibold text-red-600">Sale Propositions on Sparelo</h3>

        <p>
          At <strong>sparelo</strong>, we prioritize customer satisfaction and affordable pricing. Our towbar
          parts range from as low as <strong>₹2</strong> to several thousand rupees, depending on the
          component. Even without discounts, our prices remain some of the best in the market — and you can
          often find great deals to save even more.
        </p>

        <p>
          Don't wait — order your towbar parts today and ensure your vehicle's towing system performs safely
          and efficiently with quality components from <strong>sparelo</strong>.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Towbar Parts"
      categorySlug="towbar"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default TowbarParts;
