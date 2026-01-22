import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Windscreen_Cleaning_System = () => {
  const description = useMemo(() => (
    <p>
      Explore our wide range of windscreen cleaning system components including wipers, washer fluids, and cleaning kits.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-white text-gray-800 py-10 px-6 w-full">
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-red-700 border-b-2 border-red-300 inline-block pb-2">
          About Windscreen Cleaning System
        </h2>

        <p className="font-medium leading-relaxed">
          Car windscreen wipers are something that most people take for granted. That is until it rains. Good visibility is necessary when driving and it becomes even more crucial when it is raining or snowing and the tires could easily lose traction. A pair of good wipers can clear water clogging on the windscreen and help you reach your destination safely. Good car wipers should be able to wipe away the water falling on your windscreen without leaving too many water trails behind. They should also be able to clean any debris that falls on the windscreen.
        </p>

        <p className="font-medium leading-relaxed">
          As with everything, wipers can degrade in quality with time and a quick look at the rubber element's surface can tell you if you need to change it. Deformations, cuts, or any kind of damage can not only result in bad performance, they can also make an unpleasant squeaking noise when used. Before changing the blades on your car, first check the size of the wiper blades that are already installed and buy new blades of the same size. Be careful as some cars can have different sized blades on the front, so make sure to get the size of both blades. Next, decide which type of blade you want. Broadly speaking, there are three types of wiper blades found in the market these days:
        </p>

        <h3 className="text-xl font-semibold text-red-700 mt-8">
          Conventional Blades
        </h3>
        <p className="font-medium leading-relaxed">
          Conventional blades are the most common type of wiper design that is seen on most cars. This style of blade consists of a rubber squeegee held by a metal frame. The frame has a number of pressure points that keep the rubber held to the windscreen. Conventional blades are generally very cheap to buy but not as effective as other designs. They also do not have great aerodynamic properties and can be affected by driving at high speeds.
        </p>

        <h3 className="text-xl font-semibold text-red-700 mt-6">
          Beam Blades
        </h3>
        <p className="font-medium leading-relaxed">
          Beam blades have an infinite amount of contact points with the squeegee. This makes them very effective at exerting an even pressure throughout the length of the blade and ideal for curved windscreens. They have very few moving parts, making them a great choice for areas that experience frequent snowfall and low temperatures. Beam blades are more expensive than conventional blades.
        </p>

        <h3 className="text-xl font-semibold text-red-700 mt-6">
          Hybrid Blades
        </h3>
        <p className="font-medium leading-relaxed">
          Hybrid wipers borrow the good things from conventional and beam designs. They use a conventional design with an aerodynamic rubber shell to provide clean and even contact with the surface. Hybrid wipers fall in between conventional and beam blades in terms of price and performance. They come with a rubber spoiler that helps reduce the effect of strong winds when driving at high speeds.
        </p>

        <h3 className="text-xl font-semibold text-red-700 mt-8">
          Buy Windscreen Components Online
        </h3>
        <p className="font-medium leading-relaxed">
          Purchase wipers, washer fluids, and cleaning kits from trusted brands online. Ensure high quality and durability for your vehicle. Regular maintenance of wipers, washer fluid, and associated components ensures safety and clear visibility during driving.
        </p>

        <h3 className="text-xl font-semibold text-red-700 mt-8">
          Components Included
        </h3>
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 font-medium">
          <li>Front Wiper Blades</li>
          <li>Rear Wiper Blades</li>
          <li>Washer Fluid</li>
          <li>Wiper Motors and Arms</li>
          <li>Cleaning Kits</li>
        </ul>

        <p className="font-medium leading-relaxed">
          Select your car model to find compatible windscreens and cleaning components. Regular replacement ensures safety and longevity of your windscreen system.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Windscreen Cleaning System"
      categorySlug="windscreen_cleaning_system"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Windscreen_Cleaning_System;
