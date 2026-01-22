import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Interior_Comfort = () => {
  const description = useMemo(() => (
    <p>
      Explore our wide range of interior and comfort products designed to enhance your driving experience.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300 my-10">
      <div className="space-y-4">
        <p>The following accessories can refresh the compartment inside an automobile:</p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Coats and covers for seats</li>
          <li>New trimming of the headline, doors, side panels, cubbyhole and armrests</li>
          <li>Decorative floor covering, as well as floor mats and luggage space carpet</li>
          <li>Mouldings and cover plates for the front panel</li>
          <li>Covers and adapters for steering wheel</li>
        </ul>

        <p>These details ease your driving and improve your security:</p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Dimmer arrangements and mirrors</li>
          <li>Cover plates for fittings and pedals</li>
          <li>
            Interior door handles, as well as window rollers and transmission control lever
          </li>
          <li>Precise, properly working fittings and indicators</li>
        </ul>

        <p>
          The compartment will become more cozy with an installed acoustic shelf, a podium for
          speakers and a stereo system, window dimmers and electronics adapters. The comfort of the
          auto compartment can also be improved with the help of sound and vibration insulation.
        </p>

        <h2 className="text-2xl font-bold text-red-600">Interior Parts of a Car in India</h2>

        <p>
          You can buy any and all possible accessories and internal automotive design details on our
          e-commerce website. Production on sale comes from multiple companies of Europe, the UAE,
          the USA, South Korea, Japan and PRC. Reliable and fashionable car interior parts will help
          you make the interior comfy, stylish and secure. An explicit price list with pictures makes
          it easier to search and find the goods which satisfy your requests and ideas.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Interior Comfort"
      categorySlug="interior_comfort"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Interior_Comfort;
