import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";

const Body = () => {
const bodyPartsCategories = [
  { name: "Automotive Tape", img: "https://boodmo.com/media/cache/catalog_image/images/categories/5ea695b.jpg", link: "/catalog/5032-automotive_tape/" },
  { name: "Beam Axle", img: "https://boodmo.com/media/cache/catalog_image/images/categories/d68d31d.jpg", link: "/catalog/4490-beam_axle/" },
  { name: "Body Accessories", img: "https://boodmo.com/media/cache/catalog_image/images/categories/ab143a7.webp", link: "/catalog/5135-body_accessories/" },
  { name: "Body Frame", img: "https://boodmo.com/media/cache/catalog_image/images/categories/ff2dd35.jpg", link: "/catalog/4779-body_frame/" },
  { name: "Body Rubber Stop", img: "https://boodmo.com/media/cache/catalog_image/images/categories/b04e4e7.jpg", link: "/catalog/4828-door_rubber_stop/" },
  { name: "Bonnet", img: "https://boodmo.com/media/cache/catalog_image/images/categories/6899905.jpg", link: "/catalog/4979-bonnet/" },
  { name: "Boot", img: "https://boodmo.com/media/cache/catalog_image/images/categories/3a5bc8a.jpg", link: "/catalog/4978-boot/" },
  { name: "Bumper", img: "https://boodmo.com/media/cache/catalog_image/images/categories/40e6a4c.jpg", link: "/catalog/3671-bumper/" },
  { name: "Bumper Bracket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e823ebb.jpg", link: "/catalog/4241-bumper_brackets/" },
  { name: "Bumper Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/beccd06.jpg", link: "/catalog/4223-bumper_trim/" },
  { name: "Canopy", img: "https://boodmo.com/media/cache/catalog_image/images/categories/5529527.jpg", link: "/catalog/4896-canopy/" },
  { name: "Central Locking System", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a9e0c30.jpg", link: "/catalog/4265-control_unit_central_locking_system/" },
  { name: "Cowl Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/c2bd877.jpg", link: "/catalog/4714-wiper_cowl/" },
  { name: "Door Components", img: "https://boodmo.com/media/cache/catalog_image/images/categories/6647195.jpg", link: "/catalog/4953-door_components/" },
  { name: "Door Handle Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/96f64c4.jpg", link: "/catalog/4838-door_handle_cap/" },
  { name: "Emblem", img: "https://boodmo.com/media/cache/catalog_image/images/categories/ad8563b.jpg", link: "/catalog/4024-emblems/" },
  { name: "Engine Cover", img: "https://boodmo.com/media/cache/catalog_image/images/categories/aceebde.jpg", link: "/catalog/3339-engine_cover/" },
  { name: "Fender", img: "https://boodmo.com/media/cache/catalog_image/images/categories/7818cbf.jpg", link: "/catalog/4147-fender/" },
  { name: "Fender Bracket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a83d8e8.jpg", link: "/catalog/4824-fender_bracket/" },
  { name: "Fender Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/24e8317.jpg", link: "/catalog/4813-fender_trim/" },
  { name: "Fog Lamp Cover", img: "https://boodmo.com/media/cache/catalog_image/images/categories/7ec3708.jpg", link: "/catalog/4222-cover_fog_light/" },
  { name: "Foot Step", img: "https://boodmo.com/media/cache/catalog_image/images/categories/cf2c2c6.jpg", link: "/catalog/4780-foot_step/" },
  { name: "Front Grill", img: "https://boodmo.com/media/cache/catalog_image/images/categories/28dccef.jpg", link: "/catalog/4072-radiator_grill/" },
  { name: "Front Grill Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/697fbbe.jpg", link: "/catalog/4822-front_grill_trim/" },
  { name: "Fuel Tank", img: "https://boodmo.com/media/cache/catalog_image/images/categories/49ed220.jpg", link: "/catalog/4404-fuel_tank_and_fuel_tank_cap/" },
  { name: "Glove Box Lock", img: "https://boodmo.com/media/cache/catalog_image/images/categories/5eed3fe.jpg", link: "/catalog/4599-glove_box_lock/" },
  { name: "Hook", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a853f60.jpg", link: "/catalog/4845-hook/" },
  { name: "Horn Bracket", img: "https://boodmo.com/media/cache/catalog_image/images/categories/96e9f7f.jpg", link: "/catalog/4885-horn_bracket/" },
  { name: "Impact Absorber", img: "https://boodmo.com/media/cache/catalog_image/images/categories/326a691.jpg", link: "/catalog/4625-impact_absorber/" },
  { name: "Indicator", img: "https://boodmo.com/media/cache/catalog_image/images/categories/3b66936.jpg", link: "/catalog/4141-side_indicator/" },
  { name: "Inner Wing Panel", img: "https://boodmo.com/media/cache/catalog_image/images/categories/08a1674.jpg", link: "/catalog/4071-fender_lining/" },
  { name: "Interior Mirror", img: "https://boodmo.com/media/cache/catalog_image/images/categories/05a2b84.jpg", link: "/catalog/4145-interior_rear_view_mirror/" },
  { name: "Licence Plate Holder", img: "https://boodmo.com/media/cache/catalog_image/images/categories/1fc1926.jpg", link: "/catalog/4224-licence_plate_holder_bracket/" },
  { name: "Mirror Glass", img: "https://boodmo.com/media/cache/catalog_image/images/categories/1b0ba48.jpg", link: "/catalog/4591-mirror_glass/" },
  { name: "Mirror Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/46d1240.jpg", link: "/catalog/4883-mirror_sash/" },
  { name: "Noise Insulator", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a46bf39.jpg", link: "/catalog/4863-noise_insulator/" },
  { name: "Outside Mirror", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a1b61e8.jpg", link: "/catalog/3663-mirrors/" },
  { name: "Outside Mirror Cover", img: "https://boodmo.com/media/cache/catalog_image/images/categories/06eb8c5.jpg", link: "/catalog/4144-cover_outside_mirror/" },
  { name: "Panels", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a264cca.jpg", link: "/catalog/4778-panels/" },
  { name: "Pillars", img: "https://boodmo.com/media/cache/catalog_image/images/categories/eee2f36.webp", link: "/catalog/5194-pillars/" },
  { name: "Radiator Mounting", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e215fcc.jpg", link: "/catalog/4596-radiator_mounting/" },
  { name: "Roof Rail", img: "https://boodmo.com/media/cache/catalog_image/images/categories/6191f03.jpg", link: "/catalog/4735-roof_rail/" },
  { name: "Roof Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/2fc8429.jpg", link: "/catalog/4150-moldings/" },
  { name: "Side Body Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/f51a12e.jpg", link: "/catalog/4711-side_body_trim/" },
  { name: "Sill Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/bb7c7ad.jpg", link: "/catalog/4672-sill_trim/" },
  { name: "Spare Wheel Carrier", img: "https://boodmo.com/media/cache/catalog_image/images/categories/430177a.jpg", link: "/catalog/4847-spare_wheel_carrier/" },
  { name: "Speaker Grill", img: "https://boodmo.com/media/cache/catalog_image/images/categories/6450af1.jpg", link: "/catalog/4962-speaker_grill/" },
  { name: "Spoiler", img: "https://boodmo.com/media/cache/catalog_image/images/categories/52ac5f5.jpg", link: "/catalog/3675-spoilers_wings/" },
  { name: "Sunroof", img: "https://boodmo.com/media/cache/catalog_image/images/categories/edfd556.jpg", link: "/catalog/4671-sunroof/" },
  { name: "Sunroof Drain Hose", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e0b2a63.jpg", link: "/catalog/4997-sunroof_drain_hose/" },
  { name: "Tailgate Strut", img: "https://boodmo.com/media/cache/catalog_image/images/categories/f182f5f.jpg", link: "/catalog/3673-gas_spring/" },
  { name: "Towhook Cover", img: "https://boodmo.com/media/cache/catalog_image/images/categories/98b48d2.jpg", link: "/catalog/4555-cover_towhook/" },
  { name: "Wheel Arch Trim", img: "https://boodmo.com/media/cache/catalog_image/images/categories/6f70f16.jpg", link: "/catalog/4227-wheel_arch_trim/" },
  { name: "Window Guide Rail", img: "https://boodmo.com/media/cache/catalog_image/images/categories/1589711.jpg", link: "/catalog/4817-window_guide_rail/" },
  { name: "Window Seal", img: "https://boodmo.com/media/cache/catalog_image/images/categories/58281a4.jpg", link: "/catalog/4245-window_seal/" },
  { name: "Windshield", img: "https://boodmo.com/media/cache/catalog_image/images/categories/f6abd00.jpg", link: "/catalog/3536-windshield/" },
  { name: "Windshield Seal", img: "https://boodmo.com/media/cache/catalog_image/images/categories/488870a.jpg", link: "/catalog/4695-windshield_seal/" },
];



  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(bodyPartsCategories);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const filtered = bodyPartsCategories.filter((item) =>
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Body Parts
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Discover a wide range of body parts for your vehicle, including bumpers, doors, and more.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Body"
        />

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          <div className="flex-1 order-1 lg:order-2">
            {/* ✅ Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 my-4 sm:my-6 md:my-8">
              {filteredProducts.map((product, index) => (
                <Link
                  key={index}
                  to={product.link}
                  className="bg-white p-2 sm:p-3 rounded-lg shadow hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-md mb-2 mx-auto"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=' + product.name;
                    }}
                  />
                  <span className="text-gray-800 font-medium text-[10px] sm:text-xs line-clamp-2">
                    {product.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* ✅ SEO Section */}
            <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-md transition-all duration-300 my-6 sm:my-8 md:my-10">
              <div
                className={`space-y-3 sm:space-y-4 overflow-hidden transition-all duration-500 ${expanded ? "max-h-full" : "max-h-[300px] sm:max-h-[400px]"
                  }`}
              >
                <h2 className="text-base sm:text-lg font-bold text-red-600">
                  A Meaning of a Car Body and Body Parts of Car
                </h2>

                <p className="text-xs sm:text-sm">
                  A car enthusiast can be sure that the motor, transmission or brakes are the most essential
                  components of an automobile. But the car body – the component where all the other
                  components and systems are installed and fixed – still remains the main framework of a
                  vehicle. It locates the driver and passengers, holds the cargo, and protects everything
                  from external impacts.
                </p>

                <p className="text-xs sm:text-sm">
                  Exterior is not the least thing to care about. A new automobile attracts attention with
                  flawless lines, curves, and a shiny body surface. A well-maintained car looks elegant and
                  creates a positive impression about its owner.
                </p>

                <p className="text-xs sm:text-sm">
                  Yet, dents, scratches, or misaligned doors signal neglect or poor maintenance — sometimes
                  even danger. That's why maintaining and updating your car body is essential.
                </p>

                <p className="text-xs sm:text-sm">The main auto body parts include:</p>

                <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 pl-2 sm:pl-4 text-xs sm:text-sm">
                  <li>A boot lid and a hood</li>
                  <li>Front and rear splashers</li>
                  <li>Body sills</li>
                  <li>Front and rear bumpers and protective accessories</li>
                  <li>Doors, including locks and door handles</li>
                </ul>

                <p className="text-xs sm:text-sm">
                  Additionally, body parts include optics covers, mudguards, spoilers, and protective
                  elements for the gearbox and motor.
                </p>

                <h2 className="text-base sm:text-lg font-bold text-red-600">Why Do You Need Car Body Parts?</h2>

                <p className="text-xs sm:text-sm">Drivers usually buy body parts for two main purposes:</p>

                <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 pl-2 sm:pl-4 text-xs sm:text-sm">
                  <li>To repair or replace damaged parts</li>
                  <li>To perform car tuning or modification</li>
                </ul>

                <p className="text-xs sm:text-sm">The most common reasons for replacement include:</p>

                <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 pl-2 sm:pl-4 text-xs sm:text-sm">
                  <li>Damage from accidents or vandalism</li>
                  <li>Wear and tear due to long-term use</li>
                  <li>High-speed driving on rough roads</li>
                  <li>Improper vehicle handling</li>
                  <li>Poor-quality or unprofessional repairs</li>
                </ul>

                <p className="text-xs sm:text-sm">
                  A skilled mechanic and quality body parts can restore your car perfectly. It's always best
                  to choose original or licensed parts for reliability, though refurbished OEM parts can be a
                  budget-friendly alternative.
                </p>

                <p className="text-xs sm:text-sm">
                  Tuning allows improving aerodynamics, control, and aesthetics — often using lightweight
                  materials like fiberglass or carbon fiber for spoilers, arches, and ground effects.
                </p>

                <h2 className="text-base sm:text-lg font-bold text-red-600">
                  Where to Buy Car Body Parts and Accessories Online?
                </h2>

                <p className="text-xs sm:text-sm">
                  You can quickly buy the required spare parts at our online store at the best prices. Our
                  detailed price list with product images makes selection easy. We offer a wide range of
                  reliable, high-quality car body parts, absorbers, and accessories to enhance your vehicle's
                  performance and appearance.
                </p>
              </div>

              {/* View More / View Less Button */}
              <div className="seo-text__action mt-4 sm:mt-6 text-center">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-lg transition-all duration-300"
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

export default Body;
