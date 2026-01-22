import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Engine = () => {
  const description = useMemo(() => (
    <p>
      Explore a complete range of engine components — cylinder heads, gaskets,
      pistons, fuel systems, and more.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300">
      <div className="space-y-4">
        <p>
          The car engine parts require regular maintenance to ensure your car
          is running properly. It is not easy to inspect all of them to
          specify the right moment for replacement so that the failure of one
          item will not cause issues with the whole unit. There is a
          maintenance schedule provided in the manual coming with your car.
          Anyway, when there is a need for quality and affordable spare parts,
          go to boodmo — India's largest online marketplace for car spare
          parts.
        </p>

        <h2 className="text-xl font-semibold mt-6 text-red-600">About Car Engine Parts</h2>
        <p>
          There are parts which almost do not show the signs of failure until
          they fail. But if the engine comes out of order, the car will stop
          and need repair. That is why you should be aware of the condition of
          such parts like brake pads, bearings, timing belt kits, rings,
          pistons, valves, and others. The engine parts list is long. When a
          motor has accumulated tons of miles, its components will definitely
          be worn out. They can be damaged as a result of rough driving
          habits.
        </p>

        <p>
          When you start looking for the problems in your engine, you should
          identify it to find the items corresponding to the auto model. The
          VIN number will be of help. It is usually specified in the car
          registration or at the base of the windshield on the driver's side.
          Knowing the engine, you can start looking for its corresponding
          spare parts to replace the damaged items.
        </p>

        <h3 className="text-lg font-semibold text-red-600">
          When Should Car Engine Parts Be Replaced?
        </h3>
        <p>
          The engine parts will last depending on their functions. Some of
          them will run for 30,000 miles. Others will require replacement only
          at 90,000 miles of mileage. Under the perfect usage environment, the
          operating time can be longer but it is much easier to start
          considering the condition of your engine since your car has run 30
          thousand miles. Of course, the modern automobiles of the premium
          class are much more reliable. Still, it is important to inspect your
          engine system if:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            You hear a strange noise which can appear due to a loose mount
            supporting the engine.
          </li>
          <li>
            You observe constant low oil pressure caused by damaged bearings.
          </li>
          <li>
            You see low power, increased fuel consumption, sludge formation,
            or oil dilution indicating problems with pistons and rings.
          </li>
          <li>
            It is hard to start and the vehicle runs poorly, which can result
            from issues with the cam drive and timing chain.
          </li>
          <li>
            There is limited motor potential and low compression caused by
            weak valve springs or valve float.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-blue-600">Our Advantages</h3>
        <p>
          Sparelo — India's largest online marketplace for car spare parts —
          helps customers and suppliers in engine parts sales and
          communication. It's the most advanced platform for this purpose in
          India, full of options improving user experience and protecting
          transactions from third-party interference. Customers using our
          platform benefit from:
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Quality parts of various kinds supplied by trusted aftermarket
            brands and OEMs.
          </li>
          <li>
            Affordable rates that help repair a broken vehicle on a budget,
            especially with aftermarket products.
          </li>
          <li>
            A wide variety of parts available through partnerships with global
            suppliers.
          </li>
          <li>
            The ability to choose branded and original auto parts and buy them
            online without visiting retail stores.
          </li>
        </ol>

        <p>
          We offer many other options and favorable terms to make online
          shopping even more pleasant and efficient for our users. If you are
          looking for engine parts in Boodmo's unmatched catalogue, don't
          forget you can narrow your search using part or vehicle
          identification info. If you don't know the VIN or ID, you can simply
          browse the category list and find exactly what you need.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Engine"
      categorySlug="engine"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Engine;
