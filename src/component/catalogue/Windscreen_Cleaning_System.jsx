import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
import { generateCategoryWithProducts } from "../../utils/productDataGenerator";

const windscreenComponentsBase = [
  {
    id: 1,
    name: "Connector Washer Fluid Pipe",
    // brand: "Generic", price: 400, 
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/473b002.jpg",
    link: "/catalog/4274-connector_washer_fluid_pipe/"
  },
  {
    id: 2,
    name: "Rain Sensor",
    brand: "Generic", price: 2500,
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/b113c54.jpg",
    link: "/catalog/4201-rain_sensor/"
  },
  {
    id: 3,
    name: "Washer Fluid Pipe",
    brand: "Generic", price: 500,
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/6fb9125.jpg",
    link: "/catalog/4888-washer_fluid_pipe/"
  },
  {
    id: 4,
    name: "Windshield Washer Bracket",
    brand: "Generic", price: 350,
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/178ecaa.jpg",
    link: "/catalog/4916-wiper_motor_bracket/"
  },
  {
    id: 5, name: "Windshield Washer Fluid",
    brand: "Generic", price: 200, img: "https://boodmo.com/media/cache/catalog_image/images/categories/7ecbe41.jpg", link: "/catalog/4733-windshield_washer_fluid/"
  },
  {
    id: 6, name: "Windshield Washer Jet",
    brand: "Generic", price: 350, img: "https://boodmo.com/media/cache/catalog_image/images/categories/9bd69fe.jpg", link: "/catalog/4194-windscreen_washer_jet/"
  },
  {
    id: 7, name: "Windshield Washer Pump",
    brand: "Generic", price: 800, img: "https://boodmo.com/media/cache/catalog_image/images/categories/5909ddc.jpg", link: "/catalog/4576-windshield_washer_pump/"
  },
  {
    id: 8, name: "Windshield Washer Reservoir",
    brand: "Generic", price: 1200, 
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/2f98067.jpg", 
    link: "/catalog/4120-windscreen_washer_reservoir/"
  },
  { id: 9, 
    name: "Windshield Washer Reservoir Cap",
     brand: "Generic", price: 150, 
     img: "https://boodmo.com/media/cache/catalog_image/images/categories/b14c678.jpg",
      link: "/catalog/4814-windscreen_washer_reservoir_cap/" 
    },
  { id: 10, 
    name: "Wiper Arm", 
    brand: "Generic", price: 900,
     img: "https://boodmo.com/media/cache/catalog_image/images/categories/f5e2c4c.jpg", 
     link: "/catalog/4118-wiper_arm/" 
    },
  { id: 11, 
    name: "Wiper Arm Cap", 
    brand: "Generic", price: 120, 
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/0a5f3ce.jpg", 
    link: "/catalog/4829-wiper_arm_cap/"
   },
  { id: 12, 
    name: "Wiper Blade", 
    brand: "Generic", price: 500,
     img: "https://boodmo.com/media/cache/catalog_image/images/categories/833727a.jpg", 
     link: "/catalog/3628-wiper_blades/"
     },
  { id: 13,
     name: "Wiper Blade Headlight Cleaning",
      brand: "Generic", price: 650, 
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/8bda937.jpg", 
      link: "/catalog/4122-wiper_blade_headlight_cleaning/" 
    },
  { id: 14,
     name: "Wiper Blade Rubber",
      brand: "Generic", price: 300,
       img: "https://boodmo.com/media/cache/catalog_image/images/categories/8711fb6.jpg",
        link: "/catalog/4119-wiper_blade_rubber/"
       },
  { id: 15,
     name: "Wiper Blade Set", 
     brand: "Generic", price: 1200, 
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/6bd80fc.jpg",
     link: "/catalog/4060-wiper_blade_set/"
     },
  { id: 16,
     name: "Wiper Linkage", 
     brand: "Generic", price: 950, 
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/c523d7c.jpg",
     link: "/catalog/4195-wiper_linkage/"
     },
  { id: 17, name: "Wiper Motor", 
    brand: "Generic", price: 3500, 
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/2fbd906.jpg", 
    link: "/catalog/4121-wiper_motor/" 
  },
  { id: 18, name: "Wiper System Seal", 
    brand: "Generic", price: 450, 
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/16921d8.jpg",
     link: "/catalog/4937-wiper_system_seal/"
     },
];

const Windscreen_Cleaning_System = () => {
  // Generate categories with product data (memoized to prevent infinite loops)
  const windscreenComponents = useMemo(() => {
    return generateCategoryWithProducts(
      windscreenComponentsBase.map((item) => ({
        ...item,
        link: item.link.startsWith('/catalog/part-p-') ? item.link : `/catalog/part-p-${30000 + item.id}`
      })),
      "Windscreen Cleaning System",
      3600
    );
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(windscreenComponents);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Search
  useEffect(() => {
    const filtered = windscreenComponents.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.product?.brand && product.product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProducts(filtered);
  }, [searchTerm, windscreenComponents]);

  // Sort
  const handleSort = (value) => {
    setSortBy(value);
    let sorted = [...filteredProducts];
    switch (value) {
      case "price-low":
        sorted.sort((a, b) => (a.product?.price || 0) - (b.product?.price || 0));
        break;
      case "price-high":
        sorted.sort((a, b) => (b.product?.price || 0) - (a.product?.price || 0));
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    setFilteredProducts(sorted);
  };

  return (
    <div className="min-h-screen bg-white w-full">
      <div className="w-full px-3 sm:px-4 md:px-6 pt-2 pb-4">
        <Breadcrumbs />

        <div className="mb-3 sm:mb-4">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">Windscreen Cleaning System</h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore our collection of windscreens, wiper blades, washer fluids, and all components for an optimal cleaning system.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Windscreen Cleaning System"
        />

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Sidebar */}
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 my-4 sm:my-6 md:my-8">
              {filteredProducts.map((category, index) => (
                <Link
                  key={category.id || index}
                  to={category.link}
                  state={{ 
                    product: category.product,
                    category: { name: "Windscreen Cleaning System", slug: "windscreen_cleaning_system" }
                  }}
                  className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
                >
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-cover rounded-md mb-2 mx-auto"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=' + (category.name || 'Part');
                    }}
                  />
                  <span className="text-gray-800 font-medium text-[9px] sm:text-[10px] md:text-xs lg:text-sm line-clamp-2 px-1">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* Content Section */}
            <section className="bg-white text-gray-800 py-10 px-6 w-full">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-red-700 border-b-2 border-red-300 inline-block pb-2">
                  About Windscreen Cleaning System
                </h2>

                <p className="font-medium leading-relaxed">
                  Car windscreen wipers are something that most people take for granted. That is until it rains. Good visibility is necessary when driving and it becomes even more crucial when it is raining or snowing and the tires could easily lose traction. A pair of good wipers can clear water clogging on the windscreen and help you reach your destination safely. Good car wipers should be able to wipe away the water falling on your windscreen without leaving too many water trails behind. They should also be able to clean any debris that falls on the windscreen.
                </p>

                <p className="font-medium leading-relaxed">
                  As with everything, wipers can degrade in quality with time and a quick look at the rubber element’s surface can tell you if you need to change it. Deformations, cuts, or any kind of damage can not only result in bad performance, they can also make an unpleasant squeaking noise when used. Before changing the blades on your car, first check the size of the wiper blades that are already installed and buy new blades of the same size. Be careful as some cars can have different sized blades on the front, so make sure to get the size of both blades. Next, decide which type of blade you want. Broadly speaking, there are three types of wiper blades found in the market these days:
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

                <div className="text-center mt-8">
                  <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-md">
                    View More
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

export default Windscreen_Cleaning_System;

