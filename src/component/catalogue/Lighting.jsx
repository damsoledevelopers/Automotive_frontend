import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";

const lightingcategories = [
  {
    id: 1,
    name: "Auxiliary Exterior Light",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/95d0a83.webp",
    link: "/catalog/5113-auxiliary_exterior_light/",
  },
  {
    id: 2,
    name: "Auxiliary Stop Light",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/898fdae.jpg",
    link: "/catalog/4207-auxiliary_stop_light/",
  },
  {
    id: 3,
    name: "Bulb",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/592779e.jpg",
    link: "/catalog/5080-bulb/",
  },
  {
    id: 4,
    name: "Cargo Area Light",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/fece449.jpg",
    link: "/catalog/4589-cargo_area_light/",
  },
  {
    id: 5,
    name: "Daytime Running Light",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/4c93b4b.jpg",
    link: "/catalog/4210-daytime_running_light/",
  },
  {
    id: 6,
    name: "Fog Lamp",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/2d5b4ee.jpg",
    link: "/catalog/3687-fog_lamp/",
  },
  {
    id: 7,
    name: "Fog Lamp Components",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/4db24e1.jpg",
    link: "/catalog/4857-fog_lamp_components/",
  },
  {
    id: 8,
    name: "Headlight",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/fbefce9.jpg",
    link: "/catalog/3686-headlight/",
  },
  {
    id: 9,
    name: "Headlight Components",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/1cf96ec.jpg",
    link: "/catalog/4208-headlight_parts/",
  },
  {
    id: 10,
    name: "Indicator",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7f56283.jpg",
    link: "/catalog/4140-side_indicator/",
  },
  {
    id: 11,
    name: "Indicator Components",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/a574629.jpg",
    link: "/catalog/4995-indicator_components/",
  },
  {
    id: 12,
    name: "Interior Light Components",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/897accb.jpg",
    link: "/catalog/4917-interior_light_components/",
  },
  {
    id: 13,
    name: "Number Plate Light",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/f80f19b.jpg",
    link: "/catalog/4206-number_plate_light/",
  },
  {
    id: 14,
    name: "Passenger Compartment Light",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/f5b6af5.jpg",
    link: "/catalog/4205-passenger_compartment_light/",
  },
  {
    id: 15,
    name: "Puddle Light",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/1b1e49b.jpg",
    link: "/catalog/4893-puddle_light/",
  },
  {
    id: 16,
    name: "Rearlight Components",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7711576.jpg",
    link: "/catalog/4211-rearlight_parts/",
  },
  {
    id: 17,
    name: "Tail Light",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/8470c91.jpg",
    link: "/catalog/3691-rear_lamp/",
  },
];

const Lighting = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(lightingcategories);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = lightingcategories.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  const handleSort = (value) => {
    setSortBy(value);
    let sorted = [...filteredProducts];
    if (value === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredProducts(sorted);
  };

  return (
    <div className="min-h-screen bg-white py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <Breadcrumbs />

        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Lighting Parts
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore a complete range of lighting components for your vehicle —
            headlights, fog lamps, indicators, interior lights, and more.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Lighting"
        />

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 my-4 sm:my-6 md:my-8">
              {filteredProducts.map((product, index) => (
                <Link
                  key={product.id}
                  to={product.link}
                  className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-cover rounded-md mb-2 mx-auto"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=' + (product.name || 'Part');
                    }}
                  />
                  <span className="text-gray-800 font-medium text-[9px] sm:text-[10px] md:text-xs lg:text-sm line-clamp-2 px-1">
                    {product.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* SEO Content Section */}
            <section className="bg-white text-gray-800 py-10 px-6 max-w-5xl mx-auto">
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

          </div>
        </div>
      </div>
    </div>
  );
};

export default Lighting;
