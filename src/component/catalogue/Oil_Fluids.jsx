import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Oil_Fluids = () => {
  const description = useMemo(() => (
    <p>
      Explore our extensive range of oil and fluids designed to keep your engine running smoothly and efficiently.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300 my-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-red-600">About Automobile Lubricants</h2>

        <p>
          The most required lubricants are motor oil and transmission fluid. These fluidic
          substances reduce friction between contacting surfaces of moving parts. They are composed
          of two main ingredients — base oils and additives, which form about 20% of the mixture.
          Additives enhance friction reduction, increase viscosity, and provide protection against
          corrosion. Quality and efficient engine oil ensures the engine performs properly and
          prevents component damage.
        </p>

        <p>
          There are three groups of automotive lubricants. Engine oils keep the motor clean and
          rust-free, improving fuel efficiency, reducing emissions, and extending engine life. Gear
          oils are designed for vehicle gearboxes and are known for their high viscosity. Hydraulic
          oils are used in hydraulic systems to transmit hydrostatic power.
        </p>

        <h3 className="text-xl font-semibold text-red-600">
          When Should Automobile Lubricants Be Replaced?
        </h3>

        <p>
          There's no universal standard for changing lubricants since it depends on car make and
          model. On average, it should be replaced every 3,000 miles or three months. For newer cars,
          the interval may be longer. Always follow the manufacturer's guide. You may also notice
          signs indicating it's time for an oil change:
        </p>

        <ol className="list-decimal list-inside space-y-2 pl-4">
          <li>
            The oil change light or engine warning light appears, indicating low oil or engine
            issues.
          </li>
          <li>
            Knocking or unusual noises from the motor — due to lack of lubrication between moving
            parts.
          </li>
          <li>Dark, dirty oil signals old or contaminated lubricants.</li>
          <li>
            Smell of oil inside the cabin may indicate a lubricant leak that needs attention.
          </li>
          <li>
            Smoke emissions from the exhaust — a serious sign of engine distress that needs a
            check-up.
          </li>
        </ol>

        <h3 className="text-xl font-semibold text-red-600">Our Advantages</h3>

        <p>
          Enjoy shopping with <strong>boodmo</strong> — India's largest online marketplace for car
          spare parts and accessories. We offer numerous brands and manufacturers to meet your
          personal requirements, along with convenient user experience features:
        </p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Free registration — no fees to join or use our marketplace.</li>
          <li>
            Transparent pricing — no hidden charges or administrative interference in transactions.
          </li>
          <li>
            A convenient personal account where you can easily add, edit, or delete information.
          </li>
          <li>
            Security — your personal and financial data is never misused and only used for relevant
            notifications.
          </li>
          <li>Special offers, promotions, and events for additional benefits.</li>
        </ul>

        <p>
          Lubricants are essential for every car and should always be replaced as per manufacturer
          recommendations for optimal performance. Visit the{" "}
          <strong>boodmo car spare parts catalogue</strong> to explore the widest range of
          high-quality lubricants with easy navigation and advanced search options.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Oils & Fluids"
      categorySlug="oilsfluids"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Oil_Fluids;
