import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";

// ✅ Brake System Categories / Products
export const brakeSystemCategory = [
 {
    name: "Accessory Kit Brake Pads",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/5301830.jpg",
    link: "/catalog/4079-accessory_kit_disc_brake_pads/",
  },
  {
    name: "Accessory Kit Brake Shoes",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7c21f31.jpg",
    link: "/catalog/4078-accessory_kit_brake_shoes/",
  },
  {
    name: "Anti Lock Braking System",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/8f5c1a8.jpg",
    link: "/catalog/4977-anti_lock_braking_system/",
  },
  {
    name: "Brake Booster",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/53f3538.jpg",
    link: "/catalog/3613-brake_booster/",
  },
  {
    name: "Brake Cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/ba2a08c.jpg",
    link: "/catalog/4081-brake_cable/",
  },
  {
    name: "Brake Caliper",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/b32d5b3.jpg",
    link: "/catalog/3617-brake_caliper/",
  },
  {
    name: "Brake Caliper Piston",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/6f34472.jpg",
    link: "/catalog/4088-piston_brake_caliper/",
  },
  {
    name: "Brake Caliper Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/e814060.jpg",
    link: "/catalog/4082-brake_caliper_repair_kit/",
  },
  {
    name: "Brake Disc",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7eaaa12.jpg",
    link: "/catalog/4067-brake_discs/",
  },
  {
    name: "Brake Disc Back Plate",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/8a10f30.jpg",
    link: "/catalog/4083-brake_disc_back_plate/",
  },
  {
    name: "Brake Disc Bolt",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/07bf068.jpg",
    link: "/catalog/4096-bolt_brake_disc/",
  },
  {
    name: "Brake Drum Back Plate",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/df87719.jpg",
    link: "/catalog/4572-brake_drum_back_plate/",
  },
  {
    name: "Brake Fluid",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/3de286d.jpg",
    link: "/catalog/3665-brake_fluid/",
  },
  {
    name: "Brake Fluid Reservoir",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/b25f76c.jpg",
    link: "/catalog/4076-brake_fluid_reservoir/",
  },
  {
    name: "Brake Hose",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7664137.jpg",
    link: "/catalog/3525-brake_hydraulics_hoses/",
  },
  {
    name: "Brake Hose Connector",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/a9ba9c5.jpg",
    link: "/catalog/4981-brake_hose_connector/",
  },
  {
    name: "Brake Light Switch",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/bb8c6bf.jpg",
    link: "/catalog/4084-brake_light_switch/",
  },
  {
    name: "Brake Master Cylinder",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/01c4258.jpg",
    link: "/catalog/3614-brake_master_cylinder/",
  },
  {
    name: "Brake Master Cylinder Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/f8ce1d4.jpg",
    link: "/catalog/4091-repair_kit_brake_master_cylinder/",
  },
  {
    name: "Brake Pads",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/a237d70.jpg",
    link: "/catalog/4066-brake_pads/",
  },
  {
    name: "Brake Pad Wear Sensor",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/e077c87.jpg",
    link: "/catalog/4092-brake_pad_wear_sensor/",
  },
  {
    name: "Brake Pedal",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/fb720c8.jpg",
    link: "/catalog/4718-brake_pedal/",
  },
  {
    name: "Brake Pipe",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/151a598.jpg",
    link: "/catalog/4095-brake_pipes/",
  },
  {
    name: "Brake Power Regulator",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/dd5743e.jpg",
    link: "/catalog/4094-brake_power_regulator/",
  },
  {
    name: "Brake Proportioning Valve",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/a1ba1b4.jpg",
    link: "/catalog/4887-brake_pressure_control_valve/",
  },
  {
    name: "Brake Shoe Lining",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/0083846.jpg",
    link: "/catalog/4093-drum_brake_lining_kit/",
  },
  {
    name: "Brake Shoes",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/e4404d8.jpg",
    link: "/catalog/3722-brake_shoes/",
  },
  {
    name: "Brake System Bracket",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/b2291e9.jpg",
    link: "/catalog/4861-brake_system_bracket/",
  },
  {
    name: "Caliper Bracket",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/69fb874.jpg",
    link: "/catalog/4089-caliper_bracket/",
  },
  {
    name: "Drum Brake",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/39e04d3.jpg",
    link: "/catalog/3383-drum_brake/",
  },
  {
    name: "Drum Brake Adjuster",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/c282445.jpg",
    link: "/catalog/4080-adjuster_drum_brake/",
  },
  {
    name: "Handbrake",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/d3d6760.jpg",
    link: "/catalog/3384-hand_brake/",
  },
  {
    name: "Handbrake Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7428b3e.jpg",
    link: "/catalog/4959-handbrake_repair_kit/",
  },
  {
    name: "Handbrake Warning Light Switch",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/6523392.jpg",
    link: "/catalog/4293-switch_handbrake_warning_light/",
  },
  {
    name: "Vacuum Hose",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/1322d53.jpg",
    link: "/catalog/5001-brake_vacuum_hose/",
  },
  {
    name: "Vacuum Pump",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/bee8d1e.jpg",
    link: "/catalog/3805-vacuum_pump_brake/",
  },
  {
    name: "Wheel Brake Cylinder",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/452d84b.jpg",
    link: "/catalog/3723-wheel_brake_cylinder/",
  },
  {
    name: "Wheel Brake Cylinder Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/01ae522.jpg",
    link: "/catalog/4090-repair_kit_wheel_brake_cylinder/",
  },
];

export const Break_System = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(brakeSystemCategory);
  const [expanded, setExpanded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // 🔍 Search Functionality
  useEffect(() => {
    const filtered = brakeSystemCategory.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  // 🔠 Sort Functionality
  const handleSort = (value) => {
    setSortBy(value);
    let sorted = [...filteredProducts];
    if (value === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredProducts(sorted);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <Breadcrumbs />

        {/* 🔖 Page Title */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Brake System
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
            Explore a complete range of brake system components including pads,
            discs, calipers, hoses, and master cylinders to ensure safe and
            efficient braking performance.
          </p>
        </div>

        {/* 🔎 Search & Filter Bar */}
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Brake System"
        />

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          {/* 🧩 Categories Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 my-4 sm:my-6 md:my-8">
              {filteredProducts.map((product, index) => (
                <Link
                  key={index}
                  to={product.link}
                  className="bg-white dark:bg-gray-800 p-2 sm:p-3 md:p-4 rounded-lg shadow hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-cover rounded-md mb-2 mx-auto"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=' + product.name;
                    }}
                  />
                  <span className="text-gray-800 dark:text-gray-100 font-medium text-[9px] sm:text-[10px] md:text-xs lg:text-sm line-clamp-2 px-1">
                    {product.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* 🧾 SEO Description Section */}
             <section className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-10 rounded-2xl shadow-md">
      <div className="max-w-4xl mx-auto">
        <div className={`transition-all duration-500 ${expanded ? "max-h-full" : "max-h-[450px] overflow-hidden"}`}>
          <h2 className="text-lg font-bold mb-4 text-red-700">The brake system keeps everyone safe and sound</h2>
          <p className="mb-4">
            The car braking system is a classification of mechanical, electronic, and hydraulic components that works
            together with friction for the cleaner stopping of the vehicle. Moreover, it comforts you during bumpy rides.
            When a driver depresses the brake pedal, the pressure moves the piston to the master cylinder, which puts the
            brake fluid from the master cylinder to the wheel cylinders and calipers through brake lines and flexible hoses.
            The modern-day automotive braking system has been refined over 100 years and has become efficient and dependable.
          </p>

          <p className="mb-6">
            Generally, the braking system in automobiles comprises of disc brakes at the front and disk or drum brakes at
            the rear end, connected by tubes and hoses that link the brake system at each wheel to the master cylinder.
            Other components connected with the braking system includes parking brakes, a power booster, and an anti-lock system.
          </p>

          <h2 className="text-lg font-bold mb-4 text-red-700">Types of Car Brakes</h2>
          <p className="mb-4">The automotive vehicles usually come equipped with two types of braking systems.</p>

          <p className="mb-4">
            <strong className="text-blue-700">Disk Brakes:</strong> It is a type of braking system which uses calipers to squeeze pairs of pads
            against a disc in order to create friction. This as a result slows down the shaft rotation including axle, to
            reduce its rotational speed. The energy of motion is converted into waste heat which needs to be dispersed.
            Most of the vehicles these days use hydraulic actuated disc brakes.
          </p>

          <p className="mb-6">
            <strong className="text-blue-700">Drum Brakes:</strong> It is a type that uses friction caused as a result of shoes or pads that are pressed
            outwards against a cylinder-shaped part called a brake drum. The presently used drum brake kits were first
            invented by Maybach in 1900 and patented by Louis Renault in 1902.
          </p>

          <h2 className="text-lg font-bold mb-4 text-red-700">Where to buy braking components in India?</h2>
          <p className="mb-4">
            The rise of the internet has made it easy for buyers and sellers to come together to get the best deal. In order
            to fulfill that demand, <strong className="text-red-700">sparelo</strong> was incorporated. The company was formed with an aim to bridge
            the gap and bring the best spare parts from various manufacturers across the globe.
          </p>

          <p className="mb-4">
            The auto parts industry in India is growing exponentially, and to meet market demands, various companies are
            building genuine aftermarket parts. Customers can browse the online catalogue of brake parts, compare prices,
            and get them at the best rates. The parts available for sale on our website are either OEM or of high quality.
          </p>
        </div>

        {/* View More Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-all"
          >
            {expanded ? "View Less" : "View More"}
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

export default Break_System;
