import React, { useState } from "react";
import { Link } from "react-router-dom";
import VehicleBreadcrumbs from "./VehicleBreadcrumbs";
import Article_Review from "../Article_Review";
import { getOriPartsLink } from "../../utils/oripartsBackUrl";

// 🔹 Models Data - Exported for use in other components
export const toyotaModels = [
  {
    id: 1,
    name: "TOYOTA CAMRY",
    image: "https://boodmo.com/media/cache/vehicle_model/images/model/8cc7f20.webp",
    years: "09.2001 - now",
    link: "/vehicles/toyota-440/camry-11386/",
    modifications: [
      {
        generation: "CAMRY XV30 09.2001 - 01.2006",
        options: [
          "2.0L LE AT/Petrol/BS2",
          "2.4L LE/Petrol/BS2",
          "2.4L LE AT/Petrol/BS2",
          "3.0L XLE AT/Petrol/BS2"
        ]
      },
      {
        generation: "CAMRY XV40 01.2006 - 08.2011",
        options: [
          "2.4L LE/Petrol/BS3",
          "2.4L LE AT/Petrol/BS3",
          "3.5L XLE AT/Petrol/BS3"
        ]
      },
      {
        generation: "CAMRY XV50 07.2012 - 11.2015",
        options: [
          "2.5L G AT/Petrol/BS4",
          "2.5L V AT/Hybrid/BS4"
        ]
      },
      {
        generation: "CAMRY XV70 04.2015 - 12.2018",
        options: [
          "2.5L/Hybrid/BS4"
        ]
      },
      {
        generation: "CAMRY 01.2019 - 01.2022",
        options: [
          "2.5L HYBRID/Hybrid/BS4"
        ]
      },
      {
        generation: "CAMRY XV70 F/L 01.2022 - 12.2024",
        options: [
          "2.5L/Hybrid/BS6"
        ]
      },
      {
        generation: "CAMRY XV80 12.2024 - now",
        options: [
          "2.5L CVT/Hybrid/BS6.2"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "TOYOTA COROLLA",
    image: "https://boodmo.com/media/cache/vehicle_model/images/model/ad83901.webp",
    years: "01.1997 - 04.2020",
    link: "/vehicles/toyota-440/corolla-11385/",
    modifications: [
      {
        generation: "COROLLA E100 8TH GEN 01.1997 - 01.2000",
        options: [
          "2.0L /Diesel/BS1"
        ]
      },
      {
        generation: "COROLLA E120 9TH GEN 01.2003 - 08.2008",
        options: [
          "1.8L E/Petrol/BS3",
          "1.8L G AT/Petrol/BS3",
          "1.8L J/Petrol/BS3"
        ]
      },
      {
        generation: "COROLLA ALTIS E140 10TH GEN 08.2008 - 05.2011",
        options: [
          "1.8L G/Petrol/BS4",
          "1.8L G AT/Petrol/BS4",
          "1.8L J/Petrol/BS4",
          "1.8L V AT/Petrol/BS4"
        ]
      },
      {
        generation: "COROLLA ALTIS E140 10TH GEN F/L 06.2010 - 12.2013",
        options: [
          "1.4L E/Diesel/BS4",
          "1.4L G/Diesel/BS4",
          "1.8L E/Petrol/BS4",
          "1.8L G/Petrol/BS4",
          "1.8L G AT/Petrol/BS4",
          "1.8L J/Petrol/BS4",
          "1.8L V AT/Petrol/BS4"
        ]
      },
      {
        generation: "COROLLA ALTIS E170 11TH GEN 05.2014 - 03.2017",
        options: [
          "1.4L G/Diesel/BS4",
          "1.4L GL/Diesel/BS4",
          "1.8L G/Petrol/BS4",
          "1.8L G AT/Petrol/BS4",
          "1.8L GL/Petrol/BS4",
          "1.8L J/Petrol/BS4",
          "1.8L VL AT/Petrol/BS4"
        ]
      },
      {
        generation: "COROLLA ALTIS E170 11TH GEN F/L 03.2017 - 04.2020",
        options: [
          "1.4L G/Diesel/BS4",
          "1.4L GL/Diesel/BS4",
          "1.8L G/Petrol/BS4",
          "1.8L G AT/Petrol/BS4",
          "1.8L GL/Petrol/BS4",
          "1.8L J/Petrol/BS4",
          "1.8L VL AT/Petrol/BS4"
        ]
      }
    ]
  },
  {
    id: 3,
    name: "TOYOTA ETIOS",
    image: "https://boodmo.com/media/cache/vehicle_model/images/model/ea45c5d.webp",
    years: "12.2010 - 04.2020",
    link: "/vehicles/toyota-440/etios-11387/",
    modifications: [
      {
        generation: "ETIOS 12.2010 - 09.2014",
        options: [
          "1.4L G MT/Diesel/BS4",
          "1.4L STD MT/Diesel/BS4",
          "1.4L V MT/Diesel/BS4",
          "1.5L G MT/Petrol/BS4",
          "1.5L STD MT/Petrol/BS4",
          "1.5L V MT/Petrol/BS4",
          "1.5L V TRD SPORTIVO MT/Petrol/BS4"
        ]
      },
      {
        generation: "ETIOS F/L 01.2014 - 09.2016",
        options: [
          "1.4L G MT/Diesel/BS4",
          "1.4L GD MT/Diesel/BS4",
          "1.4L VD MT/Diesel/BS4",
          "1.4L VXD MT/Diesel/BS4",
          "1.5L G MT/Petrol/90h.p./BS4",
          "1.5L G MT/Petrol/92h.p./BS4",
          "1.5L V MT/Petrol/BS4",
          "1.5L VX MT/Petrol/BS4"
        ]
      },
      {
        generation: "PLATINUM ETIOS 09.2016 - 04.2020",
        options: [
          "1.4L GD MT/Diesel/BS4",
          "1.4L VD MT/Diesel/BS4",
          "1.4L VXD MT/Diesel/BS4",
          "1.5L G MT/Petrol/BS4",
          "1.5L V MT/Petrol/BS4",
          "1.5L VX MT/Petrol/BS4"
        ]
      }
    ]
  },
  
  {
    id: 4,
    name: "TOYOTA ETIOS LIVA",
    image: "https://boodmo.com/media/cache/vehicle_model/images/model/85ba726.webp",
    years: "06.2011 - 04.2020",
    link: "/vehicles/toyota-440/etios_liva-12463/",
    modifications: [
      {
        generation: "ETIOS LIVA 06.2011 - 04.2016",
        options: [
          "1.2L G/Petrol/80h.p./BS4",
          "1.2L STD/Petrol/80h.p./BS4",
          "1.2L V/Petrol/80h.p./BS4",
          "1.4L G/Diesel/BS4",
          "1.4L STD/Diesel/BS4",
          "1.4L V/Diesel/BS4"
        ]
      },
      {
        generation: "ETIOS LIVA TRD SPORTIVO 03.2013 - 09.2016",
        options: [
          "1.5L G/Petrol/BS4"
        ]
      },
      {
        generation: "ETIOS CROSS 04.2014 - 04.2020",
        options: [
          "1.2L G/Petrol/BS4",
          "1.4L G/Diesel/BS4",
          "1.4L V/Diesel/BS4",
          "1.5L V/Petrol/BS4"
        ]
      },
      {
        generation: "ETIOS LIVA F/L 11.2016 - 02.2020",
        options: [
          "1.2L G/Petrol/BS4",
          "1.2L V/Petrol/BS4",
          "1.2L VX/Petrol/BS4",
          "1.4L GD/Diesel/BS4",
          "1.4L VD/Diesel/BS4",
          "1.4L VXD/Diesel/BS4"
        ]
      }
    ]
  },
  {
    id: 5,
    name: "TOYOTA FORTUNER",
    image: "https://boodmo.com/media/cache/vehicle_model/images/model/65f4400.webp",
    years: "08.2009 - now",
    link: "/vehicles/toyota-440/fortuner-11391/",
    modifications: [
      {
        generation: "FORTUNER 1ST GEN 08.2009 - 12.2011",
        options: [
          "3.0L SR 4WD/Diesel/BS4"
        ]
      },
      {
        generation: "FORTUNER 1ST GEN F/L 01.2012 - 11.2018",
        options: [
          "2.5L SR 2WD/Diesel/BS4",
          "2.5L SR 2WD AT/Diesel/BS4",
          "3.0L SR 2WD/Diesel/BS4",
          "3.0L SR 2WD AT/Diesel/171h.p./BS4",
          "3.0L SR 4WD AT/Diesel/BS4"
        ]
      },
      {
        generation: "FORTUNER 2ND GEN 10.2016 - 01.2020",
        options: [
          "2.7L/Petrol/BS4",
          "2.7L AT/Petrol/BS4",
          "2.8L/Diesel/BS4",
          "2.8L 4WD/Diesel/BS4",
          "2.8L 4WD AT/Diesel/BS4",
          "2.8L 4X4/Diesel/BS4",
          "2.8L 4X4 AT/Diesel/BS4",
          "2.8L AT/Diesel/BS4"
        ]
      },
      {
        generation: "FORTUNER 2ND GEN F/L 01.2021 - now",
        options: [
          "2.7L/Petrol/BS6",
          "2.7L AT/Petrol/BS6",
          "2.8L/Diesel/BS6",
          "2.8L 4X4/Diesel/BS6",
          "2.8L 4X4 AT/Diesel/BS6",
          "2.8L AT/Diesel/BS6",
          "2.8L Neodrive 48V 4X4 AT/Diesel/BS6.2"
        ]
      },
      {
        generation: "FORTUNER LEGENDER 01.2021 - now",
        options: [
          "2.8L 4X2 AT/Diesel/BS6",
          "2.8L 4X4 /Diesel/BS6.2",
          "2.8L 4X4 AT/Diesel/BS6",
          "2.8L Neodrive 48V 4X4 AT/Diesel/BS6.2"
        ]
      },
      {
        generation: "FORTUNER GR SPORTS 08.2022 - now",
        options: [
          "2.8L GR-S AT/Diesel/BS6"
        ]
      },
      {
        generation: "FORTUNER LEADER EDITION 04.2024 - now",
        options: [
          "2.8L/Diesel/BS6.2",
          "2.8L AT/Diesel/BS6.2"
        ]
      }
    ]
  }
  

  
];

export const Toyota = () => {
  const link = getOriPartsLink(5, "TOYOTA");

  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Use exported models
  const models = toyotaModels;

  const categories = [
    { name: "Air Conditioning", img: "https://boodmo.com/media/cache/catalog_image/images/categories/db9dad4.jpg", link: "/catalog/air_conditioning/" },
    { name: "Bearings", img: "https://boodmo.com/media/cache/catalog_image/images/categories/40e95ca.jpg", link: "/catalog/bearings/" },
    { name: "Belts Chains And Rollers", img: "https://boodmo.com/media/cache/catalog_image/images/categories/ddbeb81.jpg", link: "/catalog/drive_belts/" },
    { name: "Body", img: "https://boodmo.com/media/cache/catalog_image/images/categories/40e6a4c.jpg", link: "/catalog/body/" },
    { name: "Brake System", img: "https://boodmo.com/media/cache/catalog_image/images/categories/5301830.jpg", link: "/catalog/brakes/" },
    { name: "Car Accessories", img: "https://boodmo.com/media/cache/catalog_image/images/categories/ab143a7.webp", link: "/catalog/car_accessories/" },
    { name: "Clutch System", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e8cb288.jpg", link: "/catalog/clutch/" },
    { name: "Control Cables", img: "https://boodmo.com/media/cache/catalog_image/images/categories/7455b44.jpg", link: "/catalog/control_cables/" },
    { name: "Electrical Components", img: "https://boodmo.com/media/cache/catalog_image/images/categories/d5b3ac7.jpg", link: "/catalog/electric_components/" },
    { name: "Engine", img: "https://boodmo.com/media/cache/catalog_image/images/categories/8fea232.jpg", link: "/catalog/engine/" },
    { name: "Engine Cooling System", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e215fcc.jpg", link: "/catalog/cooling_system/" },
    { name: "Exhaust System", img: "https://boodmo.com/media/cache/catalog_image/images/categories/d1e33d6.jpg", link: "/catalog/exhaust/" },
    { name: "Filters", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a16bbf6.jpg", link: "/catalog/filters/" },
    { name: "Fuel Supply System", img: "https://boodmo.com/media/cache/catalog_image/images/categories/49ed220.jpg", link: "/catalog/fuelsystem/" },
    { name: "Gaskets & Seals", img: "https://boodmo.com/media/cache/catalog_image/images/categories/14b8753.jpg", link: "/catalog/Gasket_SealingRings/" },
    { name: "Interior and Comfort", img: "https://boodmo.com/media/cache/catalog_image/images/categories/05a2b84.jpg", link: "/catalog/interior_comfort/" },
    { name: "Lighting", img: "https://boodmo.com/media/cache/catalog_image/images/categories/53380d3.webp", link: "/catalog/lighting/" },
    { name: "Maintenance Service Parts", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e8cb288.jpg", link: "/catalog/maintenance_service_parts/" },
    { name: "Oils and Fluids", img: "https://boodmo.com/media/cache/catalog_image/images/categories/4614ecf.webp", link: "/catalog/oilsfluids/" },
    { name: "Pipes & Hoses", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e0b2a63.jpg", link: "/catalog/pipes_hoses/" },
    { name: "Sensors Relays and Control Units", img: "https://boodmo.com/media/cache/catalog_image/images/categories/2676bd2.jpg", link: "/catalog/sensors_control_units/" },
    { name: "Steering", img: "https://boodmo.com/media/cache/catalog_image/images/categories/72fb97b.jpg", link: "/catalog/steering/" },
    { name: "Suspension and Arms", img: "https://boodmo.com/media/cache/catalog_image/images/categories/f26073e.jpg", link: "/catalog/suspension/" },
    { name: "Towbar Parts", img: "https://boodmo.com/media/cache/catalog_image/images/categories/98b48d2.jpg", link: "/catalog/towbar/" },
    { name: "Transmission", img: "https://boodmo.com/media/cache/catalog_image/images/categories/21ce121.jpg", link: "/catalog/transmission/" },
    { name: "Trims", img: "https://boodmo.com/media/cache/catalog_image/images/categories/beccd06.jpg", link: "/catalog/trims/" },
    { name: "Universal", img: "https://boodmo.com/media/cache/catalog_image/images/categories/af8d099.jpg", link: "/catalog/universal/" },
    { name: "Wheels", img: "https://boodmo.com/media/cache/catalog_image/images/categories/430177a.jpg", link: "/catalog/wheels/" },
    { name: "Windscreen Cleaning System", img: "https://boodmo.com/media/cache/catalog_image/images/categories/1053d82.jpg", link: "/catalog/windscreen_cleaning_system/" },
  ];

  // 🔹 Filtering Logic
  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(filter.toLowerCase())
  );

  // 🔹 Filter parts/categories by title or name using the categoryFilter state
  const filteredParts = categories.filter((c) =>
    (c.title || c.name || "").toLowerCase().includes(categoryFilter.toLowerCase())
  );

  return (
    <section className="min-h-screen py-6">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8">
        <VehicleBreadcrumbs />

        <h1 className="text-2xl sm:text-3xl md:text-4xl px-2 font-bold text-gray-800 uppercase mb-4 sm:mb-6">
          TOYOTA
        </h1>

        {/* OEM Catalogue Button */}
        <a
          href={link}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-block border border-1 border-gray-600 mb-2 text-black text-xs sm:text-sm rounded-md px-3 py-2 sm:px-4 sm:py-2 transition-all duration-300 hover:bg-red-400"
        >
          View OEM Catalogue
        </a>
      </div>

      {/* Brand Info Section */}
      <div className="max-w-7xl mx-auto heading-filters flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 border-b border-gray-200 pb-3 px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        {/* Left Section - Heading */}
        <div className="h2-section text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Choose Your{" "}
          <span className="h2-section__name text-red-500 font-bold">Model</span>
        </div>

        {/* Right Section - Search Input */}
        <div className="heading-filters__action w-full sm:w-auto">
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter Model"
            className="form-control form-control--search w-full sm:w-64 md:w-72 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-400 transition duration-200"
          />
        </div>
      </div>

      {/* Vehicle Model Grid */}
      <ul className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
        {filteredModels.map((model) => (
          <li
            key={model.id}
            className="bg-white dark:bg-gray-800 rounded-md shadow-md hover:shadow-red-500/30 transform hover:-translate-y-1 transition duration-110 overflow-hidden"
          >
            {/* Image */}
            <div className="bg-white dark:bg-gray-700 flex items-center justify-center h-32 sm:h-40">
              <img
                src={model.image}
                alt={model.name}
                className="object-contain h-full w-full p-4 sm:p-6"
              />
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 space-y-2">
              <Link
                to={`/vehicles/toyota/${model.id}`}
                className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white transition block hover:text-red-500"
              >
                {model.name}
              </Link>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {model.years}
              </p>

              {/* Dropdown */}
              <select className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-xs sm:text-sm rounded-md px-2 sm:px-3 py-1.5 sm:py-2 outline-none transition">
                <option className="font-semibold" value="">
                  SELECT YOUR CAR
                </option>

                {model.modifications.map((group, i) => (
                  <optgroup key={i} label={group.generation}>
                    {group.options.map((option, j) => (
                      <option key={j} value={option}>
                        {option}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </li>
        ))}
        {filteredModels.length === 0 && (
          <li className="col-span-full text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No models found.
            </p>
          </li>
        )}
      </ul>

      {/* ---------toyota parts and accessories------------- */}
      <section className="max-w-7xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 sm:mb-6 mt-4 sm:mt-6">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200">
            TOYOTA Parts and{" "}
            <span className="text-red-600 dark:text-pink-400">Accessories</span>
          </h2>

          {/* Search Filter */}
          <div className="w-full md:w-1/3">
            <input
              type="search"
              placeholder="Filter Category ..."
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 
                     px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 
                     transition duration-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {filteredParts.map((part, index) => {
            const displayName = part.title || part.name || "Category";
            const href = part.href || part.link || "#";
            const itemKey = `${displayName.replace(/\s+/g, "_")}-${index}`;
            return (
              <a
                key={itemKey}
                href={href}
                title={displayName}
                aria-label={displayName}
                className="flex flex-col items-center rounded-lg sm:rounded-xl p-3 sm:p-4 transition-transform transform hover:scale-105"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 flex items-center justify-center mb-2 sm:mb-3">
                  {part.img ? (
                    <img
                      src={part.img}
                      alt={displayName}
                      className="w-full h-full object-contain"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div
                      className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg"
                      aria-hidden
                    />
                  )}
                </div>
                <span className="mt-1 text-xs sm:text-sm text-gray-700 dark:text-gray-200 text-center font-medium break-words">
                  {displayName}
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <Article_Review />
    </section>
  );
};
