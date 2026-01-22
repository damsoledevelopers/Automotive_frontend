import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Pipes_Hoses = () => {
  const description = useMemo(() => (
    <p>
      Explore our extensive range of pipes and hoses designed for various automotive applications.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300 my-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-red-600">
          Price for Pipes and Hoses Parts
        </h2>

        <p>
          Today, almost everything can be purchased online by placing an order in a specialized
          store. Spare parts for cars, in particular, were no exception. There are trusted online
          portals that offer first-class products, whether original or analog. You can buy pipes and
          hoses parts online in India at <strong>Sparelo</strong>, where components for any car brand
          are available. It's easy to choose new or modified parts by car code or name.
        </p>

        <p>
          Sparelo's auto parts store offers a wide range of components and accessories for foreign
          cars at reasonable prices. All parts in the catalog come with a quality certificate,
          unlike those often found in open markets — and our prices are much lower than those at
          dealer service centers.
        </p>

        <p>
          You'll be pleasantly surprised by the service and the pricing. The parts you need start
          from <strong>₹589</strong> and go up to several thousand rupees depending on the part.
        </p>

        <h2 className="text-2xl font-bold text-red-600">
          Catalog of Pipes and Hoses Parts
        </h2>

        <p>
          A hose is generally an elastic, flexible connection that transports gases, liquids, or
          solids. Together with a coupling, it connects to other components and is often called a
          connecting hose. The quality of hoses varies widely since they serve many functions across
          industries.
        </p>

        <p>
          In cars, hoses are used in various systems — engine management, tires, intake tract, water
          cooling, power steering, windshield wiper, brake system, cable harness, and heating. They
          must insulate, seal, resist heat and external damage, and easily fit around corners and
          edges.
        </p>

        <p>
          The Sparelo catalog allows you to find every required component easily. Our inventory
          includes only high-quality parts, with more than <strong>195,000+</strong> options such as:
        </p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>A set of radiator hoses</li>
          <li>Diesel pump hoses and pipes</li>
          <li>Rubber hose for coolant</li>
          <li>Air cleaner cover and more</li>
        </ul>

        <p>
          Choosing and buying spare parts is quick and easy — just select your car model and
          modification. After ordering, you can either pick up your purchase or opt for courier
          delivery.
        </p>

        <h3 className="text-xl font-semibold text-red-600">
          Buy Online Pipes and Hoses Parts in India: Sale Offers on Sparelo
        </h3>

        <p>
          To make car maintenance more affordable, <strong>Sparelo</strong> regularly offers sales and
          discounts ranging from <strong>11%</strong> to <strong>26%</strong> on various parts.
          There's no need to search elsewhere — here you'll find a wide range of products, great
          prices, and excellent customer service.
        </p>

        <p>
          Didn't find what you need? Simply leave a request, and our managers will arrange delivery
          from partner warehouses as soon as possible.
        </p>

        <p>
          For high-quality and reliable components without overpaying, shop confidently at{" "}
          <strong>Sparelo</strong>.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Pipes & Hoses"
      categorySlug="pipes_hoses"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Pipes_Hoses;
