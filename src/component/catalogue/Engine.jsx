import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";

const engineCategories = [
  { id: 1, name: "Air Supply", img: "https://boodmo.com/media/cache/catalog_image/images/categories/8fea232.jpg", link: "/catalog/3332-air_supply/" },
  { id: 2, name: "Belt and Chain Drive", img: "https://boodmo.com/media/cache/catalog_image/images/categories/cfa6334.jpg", link: "/catalog/3717-belt_chain_drive/" },
  { id: 3, name: "Big End Bearing", img: "https://boodmo.com/media/cache/catalog_image/images/categories/40e95ca.jpg", link: "/catalog/4104-crankshaft_bearing/" },
  { id: 4, name: "Camshaft Bush", img: "https://boodmo.com/media/cache/catalog_image/images/categories/3759fa0.jpg", link: "/catalog/4286-camshaft_bushes/" },
  { id: 5, name: "Camshaft Gear", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a3c7c58.jpg", link: "/catalog/4372-gear_camshaft/" },
  { id: 6, name: "Camshaft Seal", img: "https://boodmo.com/media/cache/catalog_image/images/categories/d2a2960.jpg", link: "/catalog/4167-camshaft_seal/" },
  { id: 7, name: "Carburettor", img: "https://boodmo.com/media/cache/catalog_image/images/categories/7103bee.jpg", link: "/catalog/4477-carburettor/" },
  { id: 8, name: "Carburettor Flange", img: "https://boodmo.com/media/cache/catalog_image/images/categories/0442561.jpg", link: "/catalog/4253-carburetor_flange/" },
  { id: 9, name: "Connecting Rod", img: "https://boodmo.com/media/cache/catalog_image/images/categories/cb86c3c.jpg", link: "/catalog/4103-connecting_rod/" },
  { id:10, name: "Control Unit Glow Plug System", img: "https://boodmo.com/media/cache/catalog_image/images/categories/2676bd2.jpg", link: "/catalog/4503-control_unit_glow_plug_system/" },
  { id:11, name: "Cooler EGR", img: "https://boodmo.com/media/cache/catalog_image/images/categories/d1e33d6.jpg", link: "/catalog/4116-cooler_egr/" },
  { id:12, name: "Cooling System", img: "https://boodmo.com/media/cache/catalog_image/images/categories/6406680.jpg", link: "/catalog/3592-cooling/" },
  { id:13, name: "Crankcase Gasket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/d19747a.jpg", link: "/catalog/4106-crankcase_gasket/" },
  { id:14, name: "Crankshaft Bearing", img: "https://boodmo.com/media/cache/catalog_image/images/categories/19bcb3d.jpg", link: "/catalog/4696-crankshaft_bearing/" },
  { id:15, name: "Crankshaft Gear", img: "https://boodmo.com/media/cache/catalog_image/images/categories/abc8452.jpg", link: "/catalog/4373-gear_crankshaft/" },
  { id:16, name: "Crankshaft Seal", img: "https://boodmo.com/media/cache/catalog_image/images/categories/2139389.jpg", link: "/catalog/4168-crankshaft_seal/" },
  { id:17, name: "Cylinder Block", img: "https://boodmo.com/media/cache/catalog_image/images/categories/bbde1df.jpg", link: "/catalog/3593-cylinder_block/" },
  { id:18, name: "Cylinder Head", img: "https://boodmo.com/media/cache/catalog_image/images/categories/7a30f2b.jpg", link: "/catalog/4944-cylinder_head/" },
  { id:19, name: "Cylinder Head Cover", img: "https://boodmo.com/media/cache/catalog_image/images/categories/9d2e750.jpg", link: "/catalog/4188-cylinder_head_cover/" },
  { id:20, name: "Cylinder Head Cover Gasket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/520fae5.jpg", link: "/catalog/4162-rocker_cover_gasket/" },
  { id:21, name: "Cylinder Head Gasket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e0937f7.jpg", link: "/catalog/3325-gaskets_seals/" },
  { id:22, name: "Cylinder Head Gasket Set", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e441efa.jpg", link: "/catalog/4172-cylinder_head_gasket_set/" },
  { id:23, name: "Distributor", img: "https://boodmo.com/media/cache/catalog_image/images/categories/b8173dd.jpg", link: "/catalog/4511-distributor_and_parts/" },
  { id:24, name: "Distributor Cap", img: "https://boodmo.com/media/cache/catalog_image/images/categories/acb5c92.jpg", link: "/catalog/4581-distributor_cap/" },
  { id:25, name: "Distributor Rotor", img: "https://boodmo.com/media/cache/catalog_image/images/categories/25a45f4.jpg", link: "/catalog/4512-distributor_rotor/" },
  { id:26, name: "Drain Plug", img: "https://boodmo.com/media/cache/catalog_image/images/categories/0d23308.jpg", link: "/catalog/4374-drain_plug/" },
  { id:27, name: "EGR Valve", img: "https://boodmo.com/media/cache/catalog_image/images/categories/80f936e.jpg", link: "/catalog/4515-exhaust_gas_recirculation_valve/" },
  { id:28, name: "EGR Valve Gasket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/16f8c0a.jpg", link: "/catalog/4360-egr_valve_gasket/" },
  { id:29, name: "Engine Block", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a87ae03.jpg", link: "/catalog/4736-engine/" },
  { id:30, name: "Engine Bracket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/65a0b62.jpg", link: "/catalog/3337-mountings/" },
  { id:31, name: "Engine Full Gasket Set", img: "https://boodmo.com/media/cache/catalog_image/images/categories/5ed9cdc.jpg", link: "/catalog/4181-full_gasket_set_engine/" },
  { id:32, name: "Engine Gasket Seals", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e6cb1a4.webp", link: "/catalog/5225-engine_gasket_seals/" },
  { id:33, name: "Engine Manifold", img: "https://boodmo.com/media/cache/catalog_image/images/categories/5aa96ca.jpg", link: "/catalog/4986-engine_manifolds/" },
  { id:34, name: "Engine Woodruff Key", img: "https://boodmo.com/media/cache/catalog_image/images/categories/cbbfc0e.webp", link: "/catalog/5231-engine_woodruff_key/" },
  { id:35, name: "Exhaust Manifold Gasket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/955b4a7.jpg", link: "/catalog/4517-exhaust_manifold_gasket/" },
  { id:36, name: "Fan Clutch", img: "https://boodmo.com/media/cache/catalog_image/images/categories/06f1747.jpg", link: "/catalog/4246-fan_clutch/" },
  { id:37, name: "Flywheel", img: "https://boodmo.com/media/cache/catalog_image/images/categories/4b009f3.jpg", link: "/catalog/4105-flywheel/" },
  { id:38, name: "Fuel Rail", img: "https://boodmo.com/media/cache/catalog_image/images/categories/6c34042.jpg", link: "/catalog/4577-fuel_rail/" },
  { id:39, name: "Heat Shield", img: "https://boodmo.com/media/cache/catalog_image/images/categories/cecad10.jpg", link: "/catalog/4235-heat_shield/" },
  { id:40, name: "Idle Control Valve Air Supply", img: "https://boodmo.com/media/cache/catalog_image/images/categories/0c39c06.jpg", link: "/catalog/4213-idle_control_valve_air_supply/" },
  { id:41, name: "Ignition", img: "https://boodmo.com/media/cache/catalog_image/images/categories/d258c19.jpg", link: "/catalog/3398-ignition/" },
  { id:42, name: "Ignition Cable", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e8f253d.jpg", link: "/catalog/4523-plug_spark_plug/" },
  { id:43, name: "Ignition Capacitor", img: "https://boodmo.com/media/cache/catalog_image/images/categories/5291b56.jpg", link: "/catalog/4478-ignition_capacitor/" },
  { id:44, name: "Ignition Coil", img: "https://boodmo.com/media/cache/catalog_image/images/categories/ea7e9fc.jpg", link: "/catalog/4220-ignition_coil/" },
  { id:45, name: "Ignition Module", img: "https://boodmo.com/media/cache/catalog_image/images/categories/c83380f.jpg", link: "/catalog/4637-ignition_module/" },
  { id:46, name: "Ignition Plug Sleeve Connector", img: "https://boodmo.com/media/cache/catalog_image/images/categories/0a87d5d.jpg", link: "/catalog/5000-ignition_plug_sleeve_connector/" },
  { id:47, name: "Injector", img: "https://boodmo.com/media/cache/catalog_image/images/categories/7f152d0.jpg", link: "/catalog/4582-injector/" },
  { id:48, name: "Injector Seal", img: "https://boodmo.com/media/cache/catalog_image/images/categories/01a0592.jpg", link: "/catalog/4183-injector_seals/" },
  { id:49, name: "Intake Manifold Gasket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/b75f884.jpg", link: "/catalog/4107-intake_manifold_gasket/" },
  { id:50, name: "Intercooler Mounting Bracket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/f559426.jpg", link: "/catalog/4827-intercooler_mounting_bracket/" },
  { id:51, name: "Lubrication", img: "https://boodmo.com/media/cache/catalog_image/images/categories/7b1dc63.webp", link: "/catalog/3336-lubrication/" },
  { id:52, name: "Oil Cooler Gasket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/5b32cdf.jpg", link: "/catalog/4243-oil_cooler_gasket/" },
  { id:53, name: "Oil Dipstick", img: "https://boodmo.com/media/cache/catalog_image/images/categories/4cdd2a8.jpg", link: "/catalog/4185-oil_dipstick/" },
  { id:54, name: "Oil Dipstick Funnel", img: "https://boodmo.com/media/cache/catalog_image/images/categories/9997c1d.jpg", link: "/catalog/5007-oil_dipstick_funnel/" },
  { id:55, name: "Oil Filler Cap and Seal", img: "https://boodmo.com/media/cache/catalog_image/images/categories/5682a68.jpg", link: "/catalog/4187-oil_filler_cap_seal/" },
  { id:56, name: "Oil Hose", img: "https://boodmo.com/media/cache/catalog_image/images/categories/041e518.jpg", link: "/catalog/4282-oil_hose/" },
  { id:57, name: "Oil Pressure Switch", img: "https://boodmo.com/media/cache/catalog_image/images/categories/68b39b5.jpg", link: "/catalog/4381-oil_pressure_switch/" },
  { id:58, name: "Oil Pump Seal Gasket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/370d2e9.jpg", link: "/catalog/4186-oil_pump_seal_gasket/" },
  { id:59, name: "Oil Separator", img: "https://boodmo.com/media/cache/catalog_image/images/categories/3432add.jpg", link: "/catalog/4946-oil_separator/" },
  { id:60, name: "Oil Spray Nozzle", img: "https://boodmo.com/media/cache/catalog_image/images/categories/5d10d47.jpg", link: "/catalog/4908-engine_spray_nozzle/" },
  { id:61, name: "Oil Sump Gasket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/23236b8.jpg", link: "/catalog/4836-oil_sump_gasket/" },
  { id:62, name: "O-Ring Set Cylinder Sleeve", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a6a0a95.jpg", link: "/catalog/4303-o_ring_set_cylinder_sleeve/" },
  { id:63, name: "PCV Breather Hose", img: "https://boodmo.com/media/cache/catalog_image/images/categories/588789f.jpg", link: "/catalog/4874-crankcase_breather_hose/" },
  { id:64, name: "PCV Valve", img: "https://boodmo.com/media/cache/catalog_image/images/categories/6cb7967.jpg", link: "/catalog/4886-pcv_valve/" },
  { id:65, name: "Radiator Cap", img: "https://boodmo.com/media/cache/catalog_image/images/categories/f6152e4.jpg", link: "/catalog/4110-radiator_cap/" },
  { id:66, name: "Radiator Hose", img: "https://boodmo.com/media/cache/catalog_image/images/categories/f02e68a.jpg", link: "/catalog/4111-radiator_hose/" },
  { id:67, name: "Sensor", img: "https://boodmo.com/media/cache/catalog_image/images/categories/43d8869.jpg", link: "/catalog/3652-sensors/" },
  { id:68, name: "Starter Motor Assembly", img: "https://boodmo.com/media/cache/catalog_image/images/categories/c3f5a7e.jpg", link: "/catalog/3658-starter/" },
  { id:69, name: "Thermostat Gasket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/872d6e0.jpg", link: "/catalog/4191-thermostat_gasket/" },
  { id:70, name: "Throttle Body", img: "https://boodmo.com/media/cache/catalog_image/images/categories/9724afe.jpg", link: "/catalog/4192-throttle/" },
  { id:71, name: "Throttle Body Seal", img: "https://boodmo.com/media/cache/catalog_image/images/categories/c41e331.jpg", link: "/catalog/4952-throttle_body_seal/" },
  { id:72, name: "Timing Case Gasket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/0fa1fda.jpg", link: "/catalog/4284-timing_case_gasket/" },
  { id:73, name: "Vacuum Hose", img: "https://boodmo.com/media/cache/catalog_image/images/categories/1322d53.jpg", link: "/catalog/4844-brake_vacuum_hose/" },
  { id:74, name: "Vacuum Modulator", img: "https://boodmo.com/media/cache/catalog_image/images/categories/367da6c.jpg", link: "/catalog/4744-vacuum_modulator/" },
  { id:75, name: "Vacuum Pump", img: "https://boodmo.com/media/cache/catalog_image/images/categories/da8dbf3.jpg", link: "/catalog/3804-vacuum_pump_engine/" },
  { id:76, name: "Water Pump Gasket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/9807081.jpg", link: "/catalog/4236-water_pump_gasket/" }
];


const Engine = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(engineCategories);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = engineCategories.filter((item) =>
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
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Engine Parts
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore a complete range of engine components — cylinder heads, gaskets,
            pistons, fuel systems, and more.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Engine"
        />

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 my-4 sm:my-6 md:my-8">
              {filteredProducts.map((product) => (
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
                      e.target.src = 'https://via.placeholder.com/100x100?text=' + product.name;
                    }}
                  />
                  <span className="text-gray-800 font-medium text-[9px] sm:text-[10px] md:text-xs lg:text-sm line-clamp-2 px-1">{product.name}</span>
                </Link>
              ))}
            </div>

            {/* SEO Content Section */}
             <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300">
      <div className="space-y-4">
        {/* Intro */}
        <p>
         
            The car engine parts require regular maintenance to ensure your car
            is running properly. It is not easy to inspect all of them to
            specify the right moment for replacement so that the failure of one
            item will not cause issues with the whole unit. There is a
            maintenance schedule provided in the manual coming with your car.
            Anyway, when there is a need for quality and affordable spare parts,
            go to boodmo — India's largest online marketplace for car spare
            parts.
       
        </p>

        {/* About car engine parts */}
        <h2 className="text-xl font-semibold mt-6 text-red-600">About Car Engine Parts</h2>
        <p>
         
            There are parts which almost do not show the signs of failure until
            they fail. But if the engine comes out of order, the car will stop
            and need repair. That is why you should be aware of the condition of
            such parts like brake pads, bearings, timing belt kits, rings,
            pistons, valves, and others. The engine parts list is long. When a
            motor has accumulated tons of miles, its components will definitely
            be worn out. They can be damaged as a result of rough driving
            habits.
          
        </p>

        <p>
        
            When you start looking for the problems in your engine, you should
            identify it to find the items corresponding to the auto model. The
            VIN number will be of help. It is usually specified in the car
            registration or at the base of the windshield on the driver's side.
            Knowing the engine, you can start looking for its corresponding
            spare parts to replace the damaged items.
       
        </p>

        {/* Replacement timing */}
        <h3 className="text-lg font-semibold text-red-600">
          When Should Car Engine Parts Be Replaced?
        </h3>
        <p>
      
            The engine parts will last depending on their functions. Some of
            them will run for 30,000 miles. Others will require replacement only
            at 90,000 miles of mileage. Under the perfect usage environment, the
            operating time can be longer but it is much easier to start
            considering the condition of your engine since your car has run 30
            thousand miles. Of course, the modern automobiles of the premium
            class are much more reliable. Still, it is important to inspect your
            engine system if:
        
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
              You hear a strange noise which can appear due to a loose mount
              supporting the engine.
          </li>
          <li>           
              You observe constant low oil pressure caused by damaged bearings.         
          </li>
          <li>
            
              You see low power, increased fuel consumption, sludge formation,
              or oil dilution indicating problems with pistons and rings.
            
          </li>
          <li>
            
              It is hard to start and the vehicle runs poorly, which can result
              from issues with the cam drive and timing chain.
            
          </li>
          <li>
            
              There is limited motor potential and low compression caused by
              weak valve springs or valve float.
            
          </li>
        </ul>

        {/* Advantages */}
        <h3 className="text-lg font-semibold text-blue-600">Our Advantages</h3>
        <p>
          
            Sparelo — India’s largest online marketplace for car spare parts —
            helps customers and suppliers in engine parts sales and
            communication. It’s the most advanced platform for this purpose in
            India, full of options improving user experience and protecting
            transactions from third-party interference. Customers using our
            platform benefit from:
          
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>
            
              Quality parts of various kinds supplied by trusted aftermarket
              brands and OEMs.
            
          </li>
          <li>
            
              Affordable rates that help repair a broken vehicle on a budget,
              especially with aftermarket products.
            
          </li>
          <li>
            
              A wide variety of parts available through partnerships with global
              suppliers.
            
          </li>
          <li>
            
              The ability to choose branded and original auto parts and buy them
              online without visiting retail stores.
            
          </li>
        </ol>

        <p>
          
            We offer many other options and favorable terms to make online
            shopping even more pleasant and efficient for our users. If you are
            looking for engine parts in Boodmo’s unmatched catalogue, don’t
            forget you can narrow your search using part or vehicle
            identification info. If you don’t know the VIN or ID, you can simply
            browse the category list and find exactly what you need.
          
        </p>
      </div>
    </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Engine;
