import React, { useState } from "react";
import VehicleBreadcrumbs from "./VehicleBreadcrumbs";

// Vehicle makers data
const vehicleMakers = [
  { name: "MARUTI", link: "/vehicles/maruti/", popular: true },
  { name: "HYUNDAI", link: "/vehicles/hyundai/", popular: true },
  { name: "MAHINDRA", link: "/vehicles/mahindra/", popular: true },
  { name: "TATA", link: "/vehicles/tata/", popular: true },
  { name: "CHEVROLET", link: "/vehicles/chevrolet/", popular: true },
  { name: "HONDA", link: "/vehicles/honda/", popular: true },
  { name: "SKODA", link: "/vehicles/skoda/", popular: true },
  { name: "VW", link: "/vehicles/vw/", popular: true },
  { name: "TOYOTA", link: "/vehicles/toyota/", popular: true },
  { name: "NISSAN", link: "/vehicles/nissan/", popular: true },
  { name: "RENAULT", link: "/vehicles/renault/", popular: true },
  { name: "FORD", link: "/vehicles/ford/", popular: true },
  { name: "FIAT", link: "/vehicles/fiat/", popular: true },
  { name: "KIA", link: "/vehicles/kia/", popular: true },
  { name: "ASHOK LEYLAND", link: "/vehicles/ashok-layland/", popular: false },
  { name: "AUDI", link: "/vehicles/audi/", popular: false },
  { name: "BMW", link: "/vehicles/bmw-56/", popular: false },
  { name: "BYD", link: "/vehicles/byd-12628/", popular: false },
  { name: "CITROEN", link: "/vehicles/citro_n-12643/", popular: false },
  { name: "DAEWOO", link: "/vehicles/daewoo-104/", popular: false },
  { name: "DATSUN", link: "/vehicles/datsun-110/", popular: false },
  { name: "HINDUSTAN MOTORS", link: "/vehicles/hindustanmotors-198/", popular: false },
  { name: "ICML", link: "/vehicles/icml-215/", popular: false },
  { name: "ISUZU", link: "/vehicles/isuzu-228/", popular: false },
  { name: "JAGUAR", link: "/vehicles/jaguar-232/", popular: false },
  { name: "JEEP", link: "/vehicles/jeep-235/", popular: false },
  { name: "LAND ROVER", link: "/vehicles/land_rover-262/", popular: false },
  { name: "LEXUS", link: "/vehicles/lexus-267/", popular: false },
  { name: "MERCEDES-BENZ", link: "/vehicles/mercedes_benz-302/", popular: false },
  { name: "MINI", link: "/vehicles/mini-313/", popular: false },
  { name: "MITSUBISHI", link: "/vehicles/mitsubishi-314/", popular: false },
  { name: "MORRIS GARAGES", link: "/vehicles/morris_garages-12332/", popular: false },
  { name: "TATA COMMERCIAL", link: "/vehicles/tata_commercial-12537/", popular: false },
  { name: "OPEL", link: "/vehicles/opel-11900/", popular: false },
  { name: "PORSCHE", link: "/vehicles/porsche-360/", popular: false },
  { name: "PREMIER", link: "/vehicles/premier-361/", popular: false },
  { name: "VOLVO", link: "/vehicles/volvo-459/", popular: false },
  { name: "MARUTI COMMERCIAL", link: "/vehicles/maruti_commercial-12345/", popular: false },
  { name: "SUZUKI", link: "/vehicles/suzuki-501/", popular: false },
  { name: "TESLA", link: "/vehicles/tesla-502/", popular: false },
  { name: "MOTO GUZZI", link: "/vehicles/motoguzzi-503/", popular: false },
  { name: "HARLEY-DAVIDSON", link: "/vehicles/harley-davidson-504/", popular: false },
  { name: "HINO", link: "/vehicles/hino-505/", popular: false },
  { name: "Bajaj", link: "/vehicles/bajaj-506/", popular: false },
  { name: "TVS", link: "/vehicles/tvs-507/", popular: false },
  { name: "KTM", link: "/vehicles/ktm-508/", popular: false },
  { name: "ROYAL ENFIELD", link: "/vehicles/royalenfield-509/", popular: false },
];


const VehicleMaker = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter makers
  const filteredMakers = vehicleMakers.filter((maker) =>
    maker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group makers by first letter
  const groupedMakers = filteredMakers.reduce((groups, maker) => {
    const letter = maker.name[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(maker);
    return groups;
  }, {});

  const alphabet = "ABCDFHIJKLMNOPRSTV".split("");

  // Scroll to section
  const handleLetterClick = (letter) => {
    const el = document.getElementById(letter);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Breadcrumbs */}
      <div className="mb-4 sm:mb-6">
        <VehicleBreadcrumbs />
      </div>
      
      {/* Heading & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          Search Parts by{" "}
          <span className="text-red-500">VEHICLE MAKERS</span>
        </h1>
        <input
          type="search"
          placeholder="Filter Car Maker"
          className="border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Popular Makers */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3">Popular Vehicle Makers</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {vehicleMakers
            .filter((maker) => maker.popular)
            .map((maker, idx) => (
              <a
                key={idx}
                href={maker.link}
                className="flex justify-center items-center bg-white text-red-500 font-semibold px-2 sm:px-3 py-3 sm:py-4 rounded-lg hover:bg-gray-50 transition transform hover:scale-110 shadow-sm text-xs sm:text-sm"
              >
                {maker.name}
              </a>
            ))}
        </div>
      </div>

      {/* Alphabet Navigation */}
      <ul className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm font-medium justify-center md:justify-start">
        {alphabet.map((letter) => (
          <li
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className="cursor-pointer px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600 transition transform hover:scale-110 rounded"
          >
            {letter}
          </li>
        ))}
      </ul>

      {/* Makers List */}
      <div className="space-y-6 sm:space-y-8">
        {alphabet.map(
          (letter) =>
            groupedMakers[letter] && (
              <div key={letter} id={letter}>
                <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 border-b-2 border-red-200 inline-block pb-1">
                  {letter}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
                  {groupedMakers[letter].map((maker, idx) => (
                    <a
                      key={idx}
                      href={maker.link}
                      className="flex justify-center items-center bg-gray-100 text-gray-800 px-2 sm:px-3 py-3 sm:py-4 rounded-lg hover:bg-gray-200 hover:text-red-600 transition transform hover:scale-105 shadow-sm text-xs sm:text-sm"
                    >
                      {maker.name}
                    </a>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default VehicleMaker;
