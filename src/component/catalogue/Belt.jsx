import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import CatalogueSidebar from "./CatalogueSidebar";

const Belt = () => {
  const [expanded, setExpanded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Belt subcategories
  const beltSubcategories = [
    {
      name: "Timing Belt",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
      link: "/catalog/4390-timing_belt/",
    },
    {
      name: "Timing Belt Kit",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/ca3d002.jpg",
      link: "/catalog/4393-timing_belt_kit/",
    },
    {
      name: "V-belt",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/bd71bdc.jpg",
      link: "/catalog/3720-v_belt/",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Belt Parts
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          {/* Right Content */}
          <div className="flex-1">
            {/* Drive Belt Description */}
            <div className="mb-4 sm:mb-6 text-gray-800">
              <p className="text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4">
                Drive belt is a rubber belt connecting the crankshaft and camshaft in an internal combustion engine. 
                It is easily found under the hood. The belt has teeth that connect to various components.
              </p>
              <p className="text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4">
                Drive belt is a rubber belt connecting the crankshaft and camshaft in an internal combustion engine. 
                It is easily found under the hood. The belt has teeth that connect to various components.
              </p>
            </div>

            {/* Belt Type Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
              {beltSubcategories.map((belt, index) => (
                <Link
                  key={index}
                  to={belt.link}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100"
                >
                  <div className="p-3 sm:p-4 flex flex-col items-center">
                    <img
                      src={belt.img}
                      alt={belt.name}
                      className="w-full h-24 sm:h-32 object-contain mb-2 sm:mb-3"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x150?text=' + belt.name;
                      }}
                    />
                    <span className="text-gray-800 font-medium text-xs sm:text-sm text-center">
                      {belt.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* FAQ Sections */}
            <div className="space-y-4 sm:space-y-6">
              {/* What can happen if a timing belt gets ripped? */}
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
                <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
                  What can happen if a timing belt gets ripped?
                </h2>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
                  <p>
                    If a timing belt gets ripped, you will hear a loud clap, and the engine will die. 
                    If you try to restart the engine, you will hear metal smashing sounds. This happens 
                    because the connected mechanisms are damaged.
                  </p>
                  <p>
                    In diesel engines, the damage can be more severe. The timing belt connects the 
                    crankshaft and camshaft, and if it breaks, the valves and pistons can collide, 
                    causing significant engine damage.
                  </p>
                  <p>
                    Sometimes, only some teeth are cut out. In this case, the belt will rotate 
                    incorrectly, and the valves will be damaged. This can lead to expensive repairs 
                    or even engine replacement.
                  </p>
                </div>
              </div>

              {/* What is needed to change a car engine belt? */}
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
                <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
                  What is needed to change a car engine belt?
                </h2>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
                  <p>
                    When changing a car engine belt, you might need additional spare materials depending 
                    on the damage. These may include manifold gaskets, cylinder head, valve caps, and 
                    fastening bolts.
                  </p>
                  <p>
                    For the replacement, you will need tools such as a screwdriver, wrench set, and 
                    special installation shafts. It's recommended to find a car elevator or apply to 
                    a service station for the change, as this requires technical expertise.
                  </p>
                  <p>
                    Check our catalog for prices and availability. If you have any questions about 
                    which belt is right for your vehicle, feel free to contact us. Our experts can 
                    help you find the correct replacement part for your car model.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Belt;

