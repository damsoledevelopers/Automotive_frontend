import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Lighting = () => {
  const description = useMemo(() => (
    <p>
      Explore a complete range of lighting components for your vehicle —
      headlights, fog lamps, indicators, interior lights, and more.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-white text-gray-800 py-10 w-full">
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-red-700 border-b-2 border-red-300 inline-block pb-2">
          Lighting Parts
        </h2>

        <p className="font-medium leading-relaxed">
          Henrik Fisker, the highly popular Danish-American automotive designer, said that,
          "You can make them so small that they almost disappear, but I think headlights are also
          part of the face of a car." This is something that a majority of car buyers believe is
          a true statement.
        </p>

        <p className="font-medium leading-relaxed">
          Rightly so, as lights are to a car what eyes are to a human. The overall front and rear profile
          of any car depends upon the styling of headlight and{" "}
          <a
            href="/catalog/rearlight_parts/"
            className="text-blue-600 font-semibold hover:underline"
          >
            tail light
          </a>.
          In fact, the modern day cars also come with front and rear fog lamps to further add zing to the
          car's design. You might not believe it but a few luxury automakers have introduced LED Matrix
          bulbs as well in the headlamps for improved illumination. Also, the brake lights are an equally
          significant unit as they create awareness among people driving in low visibility. Below we will
          talk about some of the most integral components of the lighting system of a car.
        </p>

        <p className="font-medium leading-relaxed">
          <a
            href="/catalog/bulb/"
            className="text-blue-600 font-semibold hover:underline"
          >
            Bulb
          </a>{" "}
          is the 'heart' of any lighting system as it is responsible for creating light and illumination.
          Presently, there are three kinds of headlight bulbs available in the market: Halogen, Xenon and
          LED. First things first, Halogen bulbs are the most common and budget friendly units which have
          been in the trend for several decades now. They can be easily spotted in affordable cars even
          today. Moving on, Xenon bulbs are far advanced and brighter than the Halogen bulbs as they use
          an even modern and up-market technology. They provide clear and long lasting illumination with
          bright light during darkness. Today, when we see the split and narrow headlamp setup in most of
          the contemporary vehicles, Xenon bulbs are at the helm of affairs.
        </p>

        <p className="font-medium leading-relaxed">
          Last but not the least, the LED headlamps are the newest in the market currently and mostly used
          in the daytime running lights{" "}
          <a
            href="/catalog/daytime_running_light/"
            className="text-blue-600 font-semibold hover:underline"
          >
            (DRLs)
          </a>{" "}
          of a car but several high-end premium cars also come with LED headlight and tail light. They are
          the most expensive of all the three types mentioned before. The typical life expectancy of
          halogen, Xenon and LED light bulb is 2000 hours, 10,000 hours and 30,000 hours, respectively.
          Headlight is switchable to high and low beams as the former is helpful in illumination for far
          away distance while the latter covers a shorter distance.
        </p>

        <p className="font-medium leading-relaxed">
          If we talk about fog lamp units, Halogen bulbs are the most commonly used units as they don't
          require to be placed inside a watertight unit due to the use of Tungsten filament. Though,
          automakers have started offering LED bulbs in the fog lamps as they are highly energy efficient
          as they do not generate excessive heat. The brake lights in the tail lamp cluster are also
          offered in two forms: Halogen and LED. Majorly, what we see today around us are the LED units.
          The interior lighting, also known as ambient lighting, is also becoming increasingly popular
          these days. Predominantly, LED bulbs in different color shades are installed at various places
          in the cabin of a car such as the door panel, the center console, the foot well or the roof
          liner. These light bulbs create an amazing effect, depending upon the driving style and music
          in the car.
        </p>

        <div className="text-center mt-8">
          <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-md">
            View Less
          </button>
        </div>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Lighting"
      categorySlug="lighting"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Lighting;
