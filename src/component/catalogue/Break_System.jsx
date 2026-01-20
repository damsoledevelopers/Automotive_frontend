import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";

// Helper function to generate product data for each category
const generateProductData = (id, name, img, basePrice = 1000) => {
  const brands = ["BOSCH", "BREMBO", "DELPHI", "LUCAS", "ZURICH"];
  const origins = ["OEM (genuine)", "Aftermarket"];
  const sellers = ["Bengaluru/BPN", "Mumbai/MUM", "Delhi/DEL", "Pune/SWA"];
  
  const brand = brands[id % brands.length];
  const isOEM = id % 2 === 1;
  const origin = isOEM ? origins[0] : origins[1];
  const seller = sellers[id % sellers.length];
  const price = basePrice + (id * 100);
  const mrp = price * 1.2;
  const discount = Math.floor(((mrp - price) / mrp) * 100);
  
  return {
    id: id,
    name: name.toUpperCase(),
    brand: brand,
    partNumber: `${brand.substring(0, 2)}-${id.toString().padStart(3, '0')}`,
    price: price,
    mrp: mrp,
    discount: discount,
    isOEM: isOEM,
    fulfilledBySparelo: id % 3 !== 0,
    freeDelivery: id % 2 === 0,
    image: img,
    spareloChoice: id % 4 === 0,
    class: "Brake",
    soldBy: seller,
    origin: origin,
    deliveryDays: 3 + (id % 3),
  };
};

// ✅ Brake System Categories / Products with Product Data
export const brakeSystemCategory = [
  {
    id: 1,
    name: "Accessory Kit Brake Pads",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/5301830.jpg",
    link: "/catalog/part-p-1",
    product: {
      id: 1,
      name: "ACCESSORY KIT BRAKE PADS",
      brand: "BOSCH",
      partNumber: "BP-ACC-001",
      price: 850.00,
      mrp: 1100.00,
      discount: 23,
      isOEM: true,
      fulfilledBySparelo: true,
      freeDelivery: true,
      image: "https://boodmo.com/media/cache/catalog_image/images/categories/5301830.jpg",
      spareloChoice: true,
      class: "Brake",
      soldBy: "Bengaluru/BPN",
      origin: "OEM (genuine)",
      deliveryDays: 4,
    },
  },
  {
    id: 2,
    name: "Accessory Kit Brake Shoes",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7c21f31.jpg",
    link: "/catalog/part-p-2",
    product: generateProductData(2, "Accessory Kit Brake Shoes", "https://boodmo.com/media/cache/catalog_image/images/categories/7c21f31.jpg", 650),
  },
  {
    id: 3,
    name: "Anti Lock Braking System",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/8f5c1a8.jpg",
    link: "/catalog/part-p-3",
    product: generateProductData(3, "Anti Lock Braking System", "https://boodmo.com/media/cache/catalog_image/images/categories/8f5c1a8.jpg", 8500),
  },
  {
    id: 4,
    name: "Brake Booster",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/53f3538.jpg",
    link: "/catalog/part-p-4",
    product: generateProductData(4, "Brake Booster", "https://boodmo.com/media/cache/catalog_image/images/categories/53f3538.jpg", 3200),
  },
  {
    id: 5,
    name: "Brake Cable",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/ba2a08c.jpg",
    link: "/catalog/part-p-5",
    product: generateProductData(5, "Brake Cable", "https://boodmo.com/media/cache/catalog_image/images/categories/ba2a08c.jpg", 450),
  },
  {
    id: 6,
    name: "Brake Caliper",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/b32d5b3.jpg",
    link: "/catalog/part-p-6",
    product: generateProductData(6, "Brake Caliper", "https://boodmo.com/media/cache/catalog_image/images/categories/b32d5b3.jpg", 4500),
  },
  {
    id: 7,
    name: "Brake Caliper Piston",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/6f34472.jpg",
    link: "/catalog/part-p-7",
    product: generateProductData(7, "Brake Caliper Piston", "https://boodmo.com/media/cache/catalog_image/images/categories/6f34472.jpg", 1200),
  },
  {
    id: 8,
    name: "Brake Caliper Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/e814060.jpg",
    link: "/catalog/part-p-8",
    product: generateProductData(8, "Brake Caliper Repair Kit", "https://boodmo.com/media/cache/catalog_image/images/categories/e814060.jpg", 550),
  },
  {
    id: 9,
    name: "Brake Disc",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7eaaa12.jpg",
    link: "/catalog/part-p-9",
    product: generateProductData(9, "Brake Disc", "https://boodmo.com/media/cache/catalog_image/images/categories/7eaaa12.jpg", 2500),
  },
  {
    id: 10,
    name: "Brake Disc Back Plate",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/8a10f30.jpg",
    link: "/catalog/part-p-10",
    product: generateProductData(10, "Brake Disc Back Plate", "https://boodmo.com/media/cache/catalog_image/images/categories/8a10f30.jpg", 850),
  },
  {
    id: 11,
    name: "Brake Disc Bolt",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/07bf068.jpg",
    link: "/catalog/part-p-11",
    product: generateProductData(11, "Brake Disc Bolt", "https://boodmo.com/media/cache/catalog_image/images/categories/07bf068.jpg", 150),
  },
  {
    id: 12,
    name: "Brake Drum Back Plate",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/df87719.jpg",
    link: "/catalog/part-p-12",
    product: generateProductData(12, "Brake Drum Back Plate", "https://boodmo.com/media/cache/catalog_image/images/categories/df87719.jpg", 1200),
  },
  {
    id: 13,
    name: "Brake Fluid",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/3de286d.jpg",
    link: "/catalog/part-p-13",
    product: generateProductData(13, "Brake Fluid", "https://boodmo.com/media/cache/catalog_image/images/categories/3de286d.jpg", 350),
  },
  {
    id: 14,
    name: "Brake Fluid Reservoir",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/b25f76c.jpg",
    link: "/catalog/part-p-14",
    product: generateProductData(14, "Brake Fluid Reservoir", "https://boodmo.com/media/cache/catalog_image/images/categories/b25f76c.jpg", 450),
  },
  {
    id: 15,
    name: "Brake Hose",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7664137.jpg",
    link: "/catalog/part-p-15",
    product: generateProductData(15, "Brake Hose", "https://boodmo.com/media/cache/catalog_image/images/categories/7664137.jpg", 650),
  },
  {
    id: 16,
    name: "Brake Hose Connector",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/a9ba9c5.jpg",
    link: "/catalog/part-p-16",
    product: generateProductData(16, "Brake Hose Connector", "https://boodmo.com/media/cache/catalog_image/images/categories/a9ba9c5.jpg", 550),
  },
  {
    id: 17,
    name: "Brake Light Switch",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/bb8c6bf.jpg",
    link: "/catalog/part-p-17",
    product: generateProductData(17, "Brake Light Switch", "https://boodmo.com/media/cache/catalog_image/images/categories/bb8c6bf.jpg", 450),
  },
  {
    id: 18,
    name: "Brake Master Cylinder",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/01c4258.jpg",
    link: "/catalog/part-p-18",
    product: generateProductData(18, "Brake Master Cylinder", "https://boodmo.com/media/cache/catalog_image/images/categories/01c4258.jpg", 3200),
  },
  {
    id: 19,
    name: "Brake Master Cylinder Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/f8ce1d4.jpg",
    link: "/catalog/part-p-19",
    product: generateProductData(19, "Brake Master Cylinder Repair Kit", "https://boodmo.com/media/cache/catalog_image/images/categories/f8ce1d4.jpg", 750),
  },
  {
    id: 20,
    name: "Brake Pads",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/a237d70.jpg",
    link: "/catalog/part-p-20",
    product: generateProductData(20, "Brake Pads", "https://boodmo.com/media/cache/catalog_image/images/categories/a237d70.jpg", 1250),
  },
  {
    id: 21,
    name: "Brake Pad Wear Sensor",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/e077c87.jpg",
    link: "/catalog/part-p-21",
    product: generateProductData(21, "Brake Pad Wear Sensor", "https://boodmo.com/media/cache/catalog_image/images/categories/e077c87.jpg", 850),
  },
  {
    id: 22,
    name: "Brake Pedal",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/fb720c8.jpg",
    link: "/catalog/part-p-22",
    product: generateProductData(22, "Brake Pedal", "https://boodmo.com/media/cache/catalog_image/images/categories/fb720c8.jpg", 950),
  },
  {
    id: 23,
    name: "Brake Pipe",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/151a598.jpg",
    link: "/catalog/part-p-23",
    product: generateProductData(23, "Brake Pipe", "https://boodmo.com/media/cache/catalog_image/images/categories/151a598.jpg", 550),
  },
  {
    id: 24,
    name: "Brake Power Regulator",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/dd5743e.jpg",
    link: "/catalog/part-p-24",
    product: generateProductData(24, "Brake Power Regulator", "https://boodmo.com/media/cache/catalog_image/images/categories/dd5743e.jpg", 1200),
  },
  {
    id: 25,
    name: "Brake Proportioning Valve",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/a1ba1b4.jpg",
    link: "/catalog/part-p-25",
    product: generateProductData(25, "Brake Proportioning Valve", "https://boodmo.com/media/cache/catalog_image/images/categories/a1ba1b4.jpg", 1100),
  },
  {
    id: 26,
    name: "Brake Shoe Lining",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/0083846.jpg",
    link: "/catalog/part-p-26",
    product: generateProductData(26, "Brake Shoe Lining", "https://boodmo.com/media/cache/catalog_image/images/categories/0083846.jpg", 650),
  },
  {
    id: 27,
    name: "Brake Shoes",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/e4404d8.jpg",
    link: "/catalog/part-p-27",
    product: generateProductData(27, "Brake Shoes", "https://boodmo.com/media/cache/catalog_image/images/categories/e4404d8.jpg", 980),
  },
  {
    id: 28,
    name: "Brake System Bracket",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/b2291e9.jpg",
    link: "/catalog/part-p-28",
    product: generateProductData(28, "Brake System Bracket", "https://boodmo.com/media/cache/catalog_image/images/categories/b2291e9.jpg", 750),
  },
  {
    id: 29,
    name: "Caliper Bracket",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/69fb874.jpg",
    link: "/catalog/part-p-29",
    product: generateProductData(29, "Caliper Bracket", "https://boodmo.com/media/cache/catalog_image/images/categories/69fb874.jpg", 850),
  },
  {
    id: 30,
    name: "Drum Brake",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/39e04d3.jpg",
    link: "/catalog/part-p-30",
    product: generateProductData(30, "Drum Brake", "https://boodmo.com/media/cache/catalog_image/images/categories/39e04d3.jpg", 1800),
  },
  {
    id: 31,
    name: "Drum Brake Adjuster",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/c282445.jpg",
    link: "/catalog/part-p-31",
    product: generateProductData(31, "Drum Brake Adjuster", "https://boodmo.com/media/cache/catalog_image/images/categories/c282445.jpg", 450),
  },
  {
    id: 32,
    name: "Handbrake",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/d3d6760.jpg",
    link: "/catalog/part-p-32",
    product: generateProductData(32, "Handbrake", "https://boodmo.com/media/cache/catalog_image/images/categories/d3d6760.jpg", 1200),
  },
  {
    id: 33,
    name: "Handbrake Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7428b3e.jpg",
    link: "/catalog/part-p-33",
    product: generateProductData(33, "Handbrake Repair Kit", "https://boodmo.com/media/cache/catalog_image/images/categories/7428b3e.jpg", 550),
  },
  {
    id: 34,
    name: "Handbrake Warning Light Switch",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/6523392.jpg",
    link: "/catalog/part-p-34",
    product: generateProductData(34, "Handbrake Warning Light Switch", "https://boodmo.com/media/cache/catalog_image/images/categories/6523392.jpg", 350),
  },
  {
    id: 35,
    name: "Vacuum Hose",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/1322d53.jpg",
    link: "/catalog/part-p-35",
    product: generateProductData(35, "Vacuum Hose", "https://boodmo.com/media/cache/catalog_image/images/categories/1322d53.jpg", 450),
  },
  {
    id: 36,
    name: "Vacuum Pump",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/bee8d1e.jpg",
    link: "/catalog/part-p-36",
    product: generateProductData(36, "Vacuum Pump", "https://boodmo.com/media/cache/catalog_image/images/categories/bee8d1e.jpg", 2800),
  },
  {
    id: 37,
    name: "Wheel Brake Cylinder",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/452d84b.jpg",
    link: "/catalog/part-p-37",
    product: generateProductData(37, "Wheel Brake Cylinder", "https://boodmo.com/media/cache/catalog_image/images/categories/452d84b.jpg", 1500),
  },
  {
    id: 38,
    name: "Wheel Brake Cylinder Repair Kit",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/01ae522.jpg",
    link: "/catalog/part-p-38",
    product: generateProductData(38, "Wheel Brake Cylinder Repair Kit", "https://boodmo.com/media/cache/catalog_image/images/categories/01ae522.jpg", 650),
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
    <div className="min-h-screen bg-white dark:bg-gray-900 py-4 sm:py-6 md:py-8 w-full">
      <div className="w-full px-3 sm:px-4 md:px-6">
        <Breadcrumbs />

        {/* 🔖 Page Title */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Brake System
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
            Explore a complete range of brake system components including pads,
            discs, calipers, hoses, and master cylinders to ensure safe and
            efficient braking performance.
          </p>
          </div>
          <div className="flex-shrink-0">
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
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <CatalogueSidebar 
            isMobileOpen={isMobileSidebarOpen} 
            setIsMobileOpen={setIsMobileSidebarOpen} 
          />

          {/* 🧩 Categories Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 my-4 sm:my-6 md:my-8">
              {filteredProducts.map((category) => (
                <Link
                  key={category.id}
                  to={category.link}
                  state={{ 
                    product: category.product,
                    category: { name: "Brake System", slug: "brakes" }
                  }}
                  className="bg-white dark:bg-gray-800 p-2 sm:p-3 md:p-4 rounded-lg shadow hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
                >
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-cover rounded-md mb-2 mx-auto"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=' + category.name;
                    }}
                  />
                  <span className="text-gray-800 dark:text-gray-100 font-medium text-[9px] sm:text-[10px] md:text-xs lg:text-sm line-clamp-2 px-1">
                    {category.name}
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
            <strong className="text-[#131c36]">Disk Brakes:</strong> It is a type of braking system which uses calipers to squeeze pairs of pads
            against a disc in order to create friction. This as a result slows down the shaft rotation including axle, to
            reduce its rotational speed. The energy of motion is converted into waste heat which needs to be dispersed.
            Most of the vehicles these days use hydraulic actuated disc brakes.
          </p>

          <p className="mb-6">
            <strong className="text-[#131c36]">Drum Brakes:</strong> It is a type that uses friction caused as a result of shoes or pads that are pressed
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
            className="px-5 py-2 bg-[#131c36] hover:bg-[#0f1528] text-white rounded-lg shadow transition-all"
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
