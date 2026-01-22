import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Ignition_Glowplug = () => {
  const description = useMemo(() => (
    <p>
      Explore our range of high-quality ignition and glowplug systems designed for optimal performance and durability.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300 my-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-red-600">
          Buy Online Ignition and Glow Plug System Parts in India
        </h2>

        <p>
          Now most purchases are made online on the Internet. Spare parts for cars, in particular, were no exception.
          Boodmo's auto parts online store has a wide range of components and accessories for foreign cars at reasonable
          prices. Everything presented in the parts catalog has a quality certificate, unlike those you can buy in auto
          markets, and our prices are much lower than in dealer service centers.
        </p>

        <p>
          Since car spark plugs are not the most expensive component, replacing them is a simple maintenance job that can
          definitely improve the performance of your car. With the help of an accurate selection of spare parts by car
          brand and model on the website Boodmo, you can quickly find the right spark plugs for your car. We wish you
          successful purchases and reliable operation of all components of your car!
        </p>

        <h2 className="text-2xl font-bold text-red-600">
          Find Original Details for Your Car in Boodmo: Price for Ignition and Glow Plug System Parts
        </h2>

        <p>
          There are really Internet portals that offer a first-class product, regardless of whether it is original or
          analog. You can buy online different parts in India on the site Boodmo. Here you can purchase components for any
          brand of car. It is easy to choose new or modified details by car code or name.
        </p>

        <p>
          Most drivers will never know what a glow plug is. If your car runs on gasoline, you won't have a glow plug in
          the engine, but you will have spark plugs. However, if you've come across the term glow plug before, you might be
          wondering what it means. Similarly, if you drive a car with a diesel engine, you definitely need to know what a
          glow plug is.
        </p>

        <p>
          Simply put, a glow plug is a diesel version of a spark plug or even a tiny heater for a diesel engine. It's not
          exactly the same, but similar. A glow plug is a heating device that makes it easier to start a diesel engine in
          cold weather. This is because diesel can have trouble starting in cold weather because it is slightly thicker
          than gasoline. The lower the temperature drops, the harder it is to get diesel fuel moving.
        </p>

        <p>
          While the spark plug in a traditional gasoline engine literally creates a spark that allows the fuel-air mixture
          to ignite, a glow plug simply raises the temperature of the diesel fuel and air so that when the mixture is
          compressed, it can ignite.
        </p>

        <h3 className="text-xl font-semibold text-red-600">
          Ignition and Glow Plug System Parts: Availability of Propositions
        </h3>

        <p>
          The service of the store will pleasantly surprise you, and the price for ignition and glow plug system parts will
          please you. The parts you need cost a minimum. Thanks to sale offers, you can save from 17% to 52% on the price
          of parts. Pretty good, right? Therefore, do not delay and do not look for a better store. You will find here
          everything you need for the perfect performance of your car.
        </p>

        <p>
          The catalog of auto components and details in Boodmo allows you to find all needed elements. The catalog includes
          only high-quality parts. If you go to this section, you will see the product range, which includes almost 90
          thousand offers. In particular, the site presents:
        </p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Set of locks of 3 units with 2 keys</li>
          <li>Set of 4 locks with 2 keys</li>
          <li>Set of locks of 5 units with 2 keys</li>
          <li>Steering wheel ignition lock with 2 keys</li>
          <li>Incandescent candles</li>
          <li>Spark plugs and more</li>
        </ul>

        <p>
          Choosing and buying spare parts will not take you much time: just choose the car model and modification and make
          a demand. After placing the order, you can pick up the purchase yourself or use courier delivery.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Ignition & Glowplug System"
      categorySlug="ignition_glowplug"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Ignition_Glowplug;
