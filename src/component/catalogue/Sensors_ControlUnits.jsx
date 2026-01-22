import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Sensors_ControlUnits = () => {
  const description = useMemo(() => (
    <p>
      Explore our wide range of sensors, relays, and control units designed
      for optimal performance and reliability.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300 my-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-red-600">Buy Online Sensors, Relays & Control Units in India</h2>

        <p>
          Nowadays, almost everything can be purchased online — and car parts are no exception. Sensors, relays, and control units are essential components that ensure proper vehicle operation.
          <strong> sparelo </strong> offers a wide selection of high-quality original and compatible parts for all car brands.
          You can easily find and order them by car code or part name.
        </p>

        <h2 className="text-2xl font-bold text-red-600">Catalog of Sensors, Relays & Control Units Parts</h2>

        <p>
          Sensors and relays are fundamentally different in function — yet both are crucial for vehicle systems.
          Sensors measure values and send data for processing, while relays act as switches that open or close circuits based on input signals.
        </p>

        <p>
          On <strong>sparelo</strong>, you can find both sensors and relays depending on your needs.
          Before ordering, determine whether your vehicle requires a sensor, relay, or control unit.
        </p>

        <p>
          Sensors serve as converters, translating physical values into readable signals for the vehicle's systems.
          Relays, on the other hand, control circuit connections, responding to electrical or non-electrical triggers — acting like a switch or key.
        </p>

        <p>
          The <strong>sparelo</strong> catalog offers over <strong>134,500+</strong> items under this category, ensuring a wide range of options to suit every car model.
          Available parts include:
        </p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Water temperature sensor</li>
          <li>Thermal switch</li>
          <li>Window switch</li>
          <li>Hazard warning switch</li>
          <li>Rear brake pad wear sensor</li>
          <li>Oil pressure switch</li>
          <li>Wheel speed sensor and more</li>
        </ul>

        <h2 className="text-2xl font-bold text-red-600">Price for Sensors, Relays & Control Units</h2>

        <p>
          At <strong>sparelo</strong>, customers enjoy quality service and fair prices.
          Components are available from as low as <strong>₹250</strong> and can go up to several thousand rupees depending on the part and brand.
        </p>

        <p>
          Additionally, ongoing sale offers allow customers to save between <strong>5%</strong> and <strong>22%</strong> on selected parts.
          So why wait? Explore our catalog today and find everything you need for your car — high-quality components, reasonable prices, and excellent customer service.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Sensors Relay and Control Units"
      categorySlug="sensors_control_units"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Sensors_ControlUnits;
