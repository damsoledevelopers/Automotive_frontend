import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Car_Accessories = () => {
  const description = useMemo(() => (
    <p>
      Explore essential car accessories to enhance comfort, safety, and style.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-white text-gray-800 py-6 px-4 rounded-2xl shadow-sm mt-10">
      <div className="space-y-4">
        <p className="mb-4 leading-relaxed text-sm">
          Do you need car accessories of any kind? Go to the unmatched
          catalogue with the widest range of car spare parts and
          accessories and find the items you need. Depending on the
          vehicle model you have, you can buy the stuff you need to
          update your car or improve its functionality. All accessories,
          sold on our online platform, are quality products developed
          and marketed by the reputable suppliers.
        </p>

        <h2 className="text-lg font-bold text-red-700 mt-6 mb-2">
          About Car Accessories
        </h2>
        <p className="leading-relaxed mb-4">
          Car accessories are essential components of any car serving
          multifold purposes. You just cannot do without mud flaps or
          floor mats. There are so many things being able to protect the
          vital parts, make them look better and serve longer. You may
          need elements intended for particular goals like to ensure a
          secure riding when you transport the cargo or to have a clean
          cabin when you travel with your pet. They just prevent early
          wear and tear. Also, auto accessories are able to make your
          driving experience smarter, adding more comfort and
          ergonomics. You can apply special electronics, improve your
          onboard music, and so on.
        </p>

        <h2 className="text-lg font-bold text-red-700 mt-6 mb-2">
          Why You May Need Car Accessories
        </h2>
        <p className="leading-relaxed mb-2">
          Buy car accessories online to have fewer issues with your car
          and save money.
        </p>
        <ul className="list-decimal list-inside space-y-2 ml-4 text-gray-700">
          <li>
            Replace the ones that are worn out or add benefits by
            introducing new accessories.
          </li>
          <li>
            Get items that make your car look better and protect it from
            damage.
          </li>
          <li>
            Install new elements to improve functionality and create
            more value.
          </li>
          <li>
            Easily find the right products that suit your needs using
            our platform.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-red-700 mt-8 mb-2">
          Our Advantages
        </h3>
        <p className="leading-relaxed mb-2">
          The{" "}
          <span className="text-red-600 font-semibold">Sparelo</span> –
          India's largest online marketplace for car spare parts – was
          launched in 2015. Since then, our database has expanded
          continuously with new suppliers, manufacturers, and product
          categories. We're now a trusted mediator in India's automotive
          sector.
        </p>

        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
          <li>
            A perfectly designed website full of features that make
            browsing convenient.
          </li>
          <li>
            A wide range of auto accessories and devices — both
            aftermarket and branded.
          </li>
          <li>
            Access to a safe deal feature to prevent fraudulent
            transactions.
          </li>
          <li>
            Easy returns if there are any issues, provided terms are
            met.
          </li>
        </ul>

        <p className="mt-4 leading-relaxed">
          Browse through our car accessories list in{" "}
          <span className="text-red-600 font-semibold">Sparelo's</span>{" "}
          unmatched catalogue — offering a wide range of quality
          products. Enjoy our favorable conditions and professional
          support!
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Car Accessories"
      categorySlug="car_accessories"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Car_Accessories;
