import React, { useState } from "react";
import { Link } from "react-router-dom";
import VehicleBreadcrumbs from "./VehicleBreadcrumbs";
import Article_Review from "../Article_Review";
import { getOriPartsLink } from "../../utils/oripartsBackUrl";

// 🔹 Models Data - Exported for use in other components
export const chevroletModels = [
  {
    id: 1,
    name: "CHEVROLET AVEO",
    image: "https://boodmo.com/media/cache/vehicle_model/images/model/CHEVROLET-AVEO-Saloon-(T250,-T255)_WEB_556c16d7f1844.webp",
    years: "12.2006 - 07.2012",
    link: "/vehicles/chevrolet-91/aveo-11188/",
    modifications: [
      {
        generation: "AVEO U-VA 12.2006 - 05.2012",
        options: [
          "1.2L/Petrol/BS3"
        ]
      },
      {
        generation: "AVEO 09.2009 - 07.2012",
        options: [
          "1.4L/Petrol/BS3",
          "1.4L/Petrol/CNG/BS4",
          "1.6L/Petrol/BS3"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "CHEVROLET BEAT",
    image: "https://boodmo.com/media/cache/vehicle_model/images/model/0bb6d71.webp",
    years: "01.2010 - 12.2017",
    link: "/vehicles/chevrolet-91/beat-11189/",
    modifications: [
      {
        generation: "BEAT 1ST GEN 01.2010 - 02.2014",
        options: [
          "1.0L MT/Diesel/BS4",
          "1.2L MT/Petrol/BS4",
          "1.2L MT/Petrol/LPG/BS4"
        ]
      },
      {
        generation: "BEAT 1ST GEN F/L 02.2014 - 12.2017",
        options: [
          "1.0L MT/Diesel/BS4",
          "1.2L MT/Petrol/BS4"
        ]
      }
    ]
  },
  {
    id: 3,
    name: "CHEVROLET CAPTIVA",
    image: "https://boodmo.com/media/cache/vehicle_model/images/model/85d4200.webp",
    years: "01.2008 - 12.2017",
    link: "/vehicles/chevrolet-91/captiva-11190/",
    modifications: [
      {
        generation: "CAPTIVA 1ST GEN 01.2008 - 01.2011",
        options: [
          "2.0L/Diesel/BS3"
        ]
      },
      {
        generation: "CAPTIVA 1ST GEN F/L 01.2011 - 12.2017",
        options: [
          "2.2L AT/MT/Diesel/184h.p./BS4",
          "2.2L AT/MT/Diesel/184h.p./BS4"
        ]
      }
    ]
  },
  {
    id: 4,
    name: "CHEVROLET CRUZE",
    image: "https://boodmo.com/media/cache/vehicle_model/images/model/CHEVROLET-CRUZE-(J300)_WEB_556c1e664d879.webp",
    years: "10.2009 - 12.2017",
    link: "/vehicles/chevrolet-91/cruze-11191/",
    modifications: [
      {
        generation: "CRUZE 10.2009 - 12.2017",
        options: [
          "2.0L/Diesel/150h.p./BS3",
          "2.0L/Diesel/164h.p./BS4"
        ]
      }
    ]
  },
  {
    id: 5,
    name: "CHEVROLET ENJOY",
    image: "https://boodmo.com/media/cache/vehicle_model/images/model/CHEVROLET-ENJOY_web_556d564e9d40f.webp",
    years: "03.2012 - 12.2017",
    link: "/vehicles/chevrolet-91/enjoy-11192/",
    modifications: [
      {
        generation: "ENJOY 03.2012 - 12.2017",
        options: [
          "1.3L/Diesel/BS4",
          "1.4L/Petrol/BS4"
        ]
      }
    ]
  }
  
  
  


];

export const Chevrolet = () => {
  const link = getOriPartsLink(51, "CHEVROLET");

  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Use exported models
  const models = chevroletModels;

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
          CHEVROLET
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
           <section className="max-w-7xl mx-auto brand-info__desc mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8">
             <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-200">
               <p>
                 Mahindra is a leading automobile manufacturer known for its
                 reliability and innovation. Established in YEAR, it continues to
                 produce a diverse range of models suitable for Indian conditions.
               </p>
               <p>
                 The company is recognized for its strong after-sales network and
                 commitment to customer satisfaction.
               </p>
               <p>
                 Spare parts for Mahindra cars are available at{" "}
                 <a
                   href="https://boodmo.com/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-blue-500 hover:underline"
                 >
                   sparelo
                 </a>
                 .
               </p>
             </div>
           </section>
     
           {/* Model Filter Section */}
           <div className="max-w-7xl mx-auto heading-filters flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 border-b border-gray-200 pb-3 px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
             <div className="h2-section text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
               Choose Your{" "}
               <span className="h2-section__name text-red-500 font-bold">
                 Model
               </span>
             </div>
     
             {/* Search Input */}
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
     
           {/* Models Grid */}
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
                     to={`/vehicles/chevrolet/${model.id}`}
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
                       <optgroup
                         key={i}
                         label={group.generation}
                         className="font-semibold text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700"
                       >
                         {group.options.map((opt, j) => (
                           <option key={j} value={opt}>
                             {opt}
                           </option>
                         ))}
                       </optgroup>
                     ))}
                   </select>
                 </div>
               </li>
             ))}
     
             {/* No Models Found */}
             {filteredModels.length === 0 && (
               <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
                 No models found.
               </p>
             )}
           </ul>
     
     
           {/* ---------chevrolet parts and accssories------------- */}
           <section className="max-w-7xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 lg:px-8">
             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 sm:mb-6 mt-4 sm:mt-6">
               {/* Heading */}
               <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200">
                 CHEVROLET Parts and{" "}
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
