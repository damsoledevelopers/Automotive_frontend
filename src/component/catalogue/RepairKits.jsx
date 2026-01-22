import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const RepairKits = () => {
  const description = useMemo(() => (
    <p>
      Explore our range of high-quality repair kits designed for various automotive applications.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300 my-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-red-600">Repair Kits Parts</h2>

        <p>
          Every car enthusiast knows that it's not always easy to quickly find the necessary auto
          parts for repair. Auto repair shops don't always keep stock, and their prices are often
          inflated. As a result, many people waste time searching for components in markets or small
          shops — often without success. Unfortunately, spare elements bought in such markets are
          not always high quality, which can negatively affect your car's performance.
        </p>

        <h2 className="text-2xl font-bold text-red-600">Price for Repair Kits Parts</h2>

        <p>
          Nowadays, almost everything can be bought online from specialized stores — and car spare
          parts are no exception. There are reliable online portals offering high-quality products,
          whether original or compatible analogs. You can buy repair kit parts online in India at{" "}
          <strong>sparelo</strong>, where components for all car brands are available. It's easy to
          choose new or modified parts by car code or name.
        </p>

        <p>
          The service at <strong>sparelo</strong> will pleasantly surprise you, and the prices will
          too. Repair kit parts range from <strong>₹200</strong> to several thousand rupees,
          depending on the specific part.
        </p>

        <h3 className="text-xl font-semibold text-red-600">
          Catalog of Propositions in sparelo
        </h3>

        <p>
          Our online store offers a wide range of components and accessories for foreign cars at
          reasonable prices. All auto parts in our catalog are certified, unlike many that you'll
          find in auto markets, and our prices are much lower than those at dealer service centers.
        </p>

        <p>
          The <strong>sparelo</strong> catalog includes only high-quality repair kit parts. In this
          section, you'll find over <strong>129,000+</strong> offers, including:
        </p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Main set (master brake cylinder)</li>
          <li>Small repair kit</li>
          <li>Tandem set of the master cylinder</li>
          <li>Set of piston and cup</li>
          <li>Rack mounting kit</li>
          <li>Rear suspension repair kit and more</li>
        </ul>

        <p>
          Finding and buying the right spare parts takes just minutes — simply choose your car
          brand, and all components are organized by groups (body, chassis, brake system, etc.).
          After placing your order, you can either pick up your purchase yourself or use our courier
          delivery option.
        </p>

        <h3 className="text-xl font-semibold text-red-600">
          Buy Online Repair Kits Parts in India: Sale Propositions
        </h3>

        <p>
          To help customers save more, <strong>sparelo</strong> regularly runs special offers. You
          can save between <strong>5%</strong> and <strong>22%</strong> on various parts. That's a
          great deal! Don't delay or look elsewhere — everything you need for your car's perfect
          performance is here: a huge assortment, attractive prices, and excellent service.
        </p>

        <p>
          Didn't find what you need? Just leave a request with our managers, and the required parts
          will be sourced quickly from our partner warehouses.
        </p>

        <p>
          Want to ensure quality and reliability without overpaying? Welcome to{" "}
          <strong>sparelo</strong> — India's trusted online destination for auto parts!
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Repair Kits"
      categorySlug="repair_kits"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default RepairKits;
