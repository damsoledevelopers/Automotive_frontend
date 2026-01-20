import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";
import { generateCategoryWithProducts } from "../../utils/productDataGenerator";

const Interior_Comfort = () => {
  const interiorCategoriesBase = [
    {
      id: 1,
      name: "Window Regulator",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/61ed4e0.jpg",
      link: "/catalog/part-p-16001",
    },
    {
      name: "Accelerator Pedal",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/e52b7c1.jpg",
      link: "/catalog/4230-accelerator_pedal/",
    },
    {
      name: "AC Control Unit",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/63dbad4.jpg",
      link: "/catalog/4670-control_unit_air_conditioning/",
    },
    {
      name: "Air Bag System",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/dbed5a5.jpg",
      link: "/catalog/3662-air_bag_system/",
    },
    {
      name: "Air Vent",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/699e30c.jpg",
      link: "/catalog/4704-air_vents/",
    },
    {
      name: "Armrest",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/6b5cd8b.jpg",
      link: "/catalog/4309-armrests/",
    },
    {
      name: "Ashtray",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/c2e7d80.jpg",
      link: "/catalog/4689-ashtray/",
    },
    {
      name: "Brake Light Switch",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/bb8c6bf.jpg",
      link: "/catalog/4320-brake_light_switch/",
    },
    {
      name: "Brake Pedal",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/fb720c8.jpg",
      link: "/catalog/4727-brake_pedal/",
    },
    {
      name: "Cargo Area Light",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/fece449.jpg",
      link: "/catalog/4656-cargo_area_light/",
    },
    {
      name: "Central Locking System",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/e54b47d.jpg",
      link: "/catalog/5175-locking_system/",
    },
    {
      name: "Centre Console",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/17775e2.jpg",
      link: "/catalog/4232-cupholder/",
    },
    {
      name: "Clutch Pedal",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/a20873c.jpg",
      link: "/catalog/4728-pedals_and_pedal_covers/",
    },
    {
      name: "Cup Holder",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/0d5a789.jpg",
      link: "/catalog/4858-cup_holder/",
    },
    {
      name: "Dashboard",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/12ced25.jpg",
      link: "/catalog/3579-dashboard/",
    },
    {
      name: "Dashboard Trim",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/2cc46c0.jpg",
      link: "/catalog/4724-dashboard_trims/",
    },
    {
      name: "Door Handle",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/6e4e7a6.jpg",
      link: "/catalog/4403-door_handles/",
    },
    {
      name: "Door Lock",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/119533b.jpg",
      link: "/catalog/4593-door_lock/",
    },
    {
      name: "Door Lock Knob",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/845cd1d.jpg",
      link: "/catalog/4598-door_lock_knob/",
    },
    {
      name: "Fog Lamp Switch",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/58d019c.jpg",
      link: "/catalog/4567-switch_fog_light/",
    },
    {
      name: "Fuel Lid Opener Lever",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/a05da33.jpg",
      link: "/catalog/4994-fuel_lid_opener_lever/",
    },
    {
      name: "Gear Selector Mechanism",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/7948f56.jpg",
      link: "/catalog/4700-gear_selector_mechanism/",
    },
    {
      name: "Glove Box",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/a9d064e.jpg",
      link: "/catalog/4688-glove_box/",
    },
    {
      name: "Glove Box Lock",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/5eed3fe.jpg",
      link: "/catalog/4600-glove_box_lock/",
    },
    {
      name: "Handbrake Warning Light Switch",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/6523392.jpg",
      link: "/catalog/4327-switch_handbrake_warning_light/",
    },
    {
      name: "Hazard Light Switch",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/be6c8c1.jpg",
      link: "/catalog/4628-hazard_light_switch/",
    },
    {
      name: "Headliner",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/95d1dbf.jpg",
      link: "/catalog/4708-headliner/",
    },
    {
      name: "Headrest",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/a3f0029.jpg",
      link: "/catalog/4702-headrest/",
    },
    {
      name: "Interior Attachment",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/848059f.jpg",
      link: "/catalog/3423-accessories/",
    },
    {
      name: "Interior Door Panel",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/e673a27.jpg",
      link: "/catalog/4239-interior_door_panel/",
    },
    {
      name: "Interior Grab Handle",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/3c28a08.jpg",
      link: "/catalog/4686-interior_grab_handle/",
    },
    {
      name: "Interior Mirror",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/05a2b84.jpg",
      link: "/catalog/4568-interior_rear_view_mirror/",
    },
    {
      name: "Locking Pins",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/838a3f5.webp",
      link: "/catalog/5221-locking_pins/",
    },
    {
      name: "Mirror Adjustment Switch",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/4a2a2fd.jpg",
      link: "/catalog/4634-mirror_adjustment_switch/",
    },
    {
      name: "Parcel Tray",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/d47369c.jpg",
      link: "/catalog/3661-panel_tray/",
    },
    {
      name: "Passenger Compartment Light",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/f5b6af5.jpg",
      link: "/catalog/4530-passenger_compartment_light/",
    },
    {
      name: "Pedal",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/1604b8a.jpg",
      link: "/catalog/3581-pedals/",
    },
    {
      name: "Pedal Pad",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/01efebc.jpg",
      link: "/catalog/4737-pedal_pad/",
    },
    {
      name: "Pedal Repair Kit",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/3212040.jpg",
      link: "/catalog/4851-pedal_repair_kit/",
    },
    {
      name: "Power Window Motor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/15136a2.jpg",
      link: "/catalog/4499-electric_motor_window_winder/",
    },
    {
      name: "Seating System",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/04fb3c6.jpg",
      link: "/catalog/4909-seating_system/",
    },
    {
      name: "Speedometer Cable",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/9efd9d6.jpg",
      link: "/catalog/4569-speedometer_cable/",
    },
    {
      name: "Steering Column Switch",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/990e4c6.jpg",
      link: "/catalog/4548-steering_column_switch/",
    },
    {
      name: "Sunglass Holder",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/120cec7.webp",
      link: "/catalog/5230-sunglass_holder/",
    },
    {
      name: "Sun Visor",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/40599ac.jpg",
      link: "/catalog/4703-sun_visor/",
    },
    {
      name: "Sun Visor Holder",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/cb9af2e.jpg",
      link: "/catalog/4848-sunvisor_holder/",
    },
    {
      name: "Window Crank",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/889f386.jpg",
      link: "/catalog/4228-window_crank/",
    },
    {
      name: "Window Regulator Sliding Shoe",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/631668f.jpg",
      link: "/catalog/4998-window_regulator_sliding_shoe/",
    },
    {
      name: "Window Switch",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/e881fc7.jpg",
      link: "/catalog/4501-window_switch/",
    },
  ];

  // Generate categories with product data
  const interiorCategories = generateCategoryWithProducts(
    interiorCategoriesBase.map((item, index) => ({
      ...item,
      id: item.id || (index + 1),
      link: item.link.startsWith('/catalog/part-p-') ? item.link : `/catalog/part-p-${16000 + index + 1}`
    })),
    "Interior Comfort",
    1700
  );

  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(interiorCategories);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = interiorCategories.filter((item) =>
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
    <div className="min-h-screen bg-white py-4 sm:py-6 md:py-8 w-full">
      <div className="w-full px-3 sm:px-4 md:px-6">
        <Breadcrumbs />

        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Interior and Comfort
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore our wide range of interior and comfort products designed to enhance your driving experience.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Interior_Comfort"
        />

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 my-4 sm:my-6 md:my-8">
              {filteredProducts.map((category, index) => (
                <Link
                  key={category.id || index}
                  to={category.link}
                  state={{ 
                    product: category.product,
                    category: { name: "Interior Comfort", slug: "interior_comfort" }
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

            {/* ✅ SEO Section */}
            <section className="bg-white text-gray-800 py-10 px-6 w-full rounded-2xl shadow-md">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-red-700 border-b-2 border-red-300 inline-block pb-2">
                  {/* About Section Heading */}
                </h2>

                <p className="font-medium leading-relaxed">
                  {/* SEO paragraph text here */}
                </p>

                {/* More headings, lists, etc., as in Filters.jsx */}

                <div className="text-center mt-8">
                  <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-md">
                    View More
                  </button>
                </div>
              </div>
            </section><section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300 my-10">
              <div
                className={`space-y-4 overflow-hidden transition-all duration-500 ${expanded ? "max-h-full" : "max-h-[400px]"
                  }`}
              >
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

              {/* View More / View Less Button */}
              <div className="seo-text__action mt-6 text-center">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
                >
                  {expanded ? "View Less" : "View More"}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interior_Comfort;
