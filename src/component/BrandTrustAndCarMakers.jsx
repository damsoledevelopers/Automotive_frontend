import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { getVehicleImageUrl } from "../data/vehicleData";
import { marutiModels } from "./Vehicles/Maruti";
import { hyundaiModels } from "./Vehicles/Hyundai";
import { tataModels } from "./Vehicles/Tata";
import { mahindraModels } from "./Vehicles/Mahindra";
import { chevroletModels } from "./Vehicles/Chevrolet";

// Map of vehicle models by maker for direct access
const vehicleModelsMap = {
  MARUTI: marutiModels,
  HYUNDAI: hyundaiModels,
  TATA: tataModels,
  MAHINDRA: mahindraModels,
  CHEVROLET: chevroletModels,
};

// Helper function to get a representative car image for each maker
const getMakerImage = (makerName) => {
  // Try to get image from first popular model of each maker
  const makerModelMap = {
    "MARUTI": ["SWIFT", "ALTO", "800"],
    "HYUNDAI": ["I20", "I10", "CRETA"],
    "MAHINDRA": ["XUV 500", "XUV500", "BOLERO", "SCORPIO"],
    "TATA": ["NEXON", "TIAGO", "HARRIER"],
    "CHEVROLET": ["CRUZE", "BEAT", "AVEO"],
    "HONDA": ["CITY", "AMAZE", "CIVIC"],
    "SKODA": ["OCTAVIA", "RAPID", "SUPERB"],
    "VW": ["POLO", "VENTO", "JETTA"],
    "TOYOTA": ["INNOVA", "FORTUNER", "ETIOS"],
    "NISSAN": ["MAGNITE", "MICRA", "SUNNY"],
    "RENAULT": ["KWID", "DUSTER", "TRIBER"],
    "FORD": ["ECOSPORT", "FIGO", "ENDEAVOUR"],
    "FIAT": ["PUNTO", "LINEA", "PALIO"],
    "KIA": ["SELTOS", "SONET", "CARNIVAL"],
    "ASHOK LEYLAND": ["DOST", "PARTNER"],
  };
  
  // Try mapped models first
  const modelNames = makerModelMap[makerName];
  if (modelNames) {
    for (const modelName of modelNames) {
      // Try with full name first (e.g., "MARUTI SWIFT")
      const fullModelName = `${makerName} ${modelName}`;
      let imageUrl = getVehicleImageUrl(makerName, fullModelName);
      if (!imageUrl) {
        // Try with just model name
        imageUrl = getVehicleImageUrl(makerName, modelName);
      }
      if (imageUrl) return imageUrl;
    }
  }
  
  // Fallback: Get first available model from the maker's models array
  const models = vehicleModelsMap[makerName];
  if (models && Array.isArray(models) && models.length > 0) {
    const firstModel = models[0];
    if (firstModel && firstModel.image) {
      return firstModel.image;
    }
  }
  
  // Final fallback placeholder
  return 'https://via.placeholder.com/200x120?text=' + makerName;
};

const brands = [
  { name: "PHC", logo: "https://boodmo.com/media/images/brand/4f106b0.webp", link: "/brands/3529-phc/" },
  { name: "DKMAX", logo: "https://boodmo.com/media/images/brand/ff1cc61.webp", link: "/brands/6341-dkmax/" },
  { name: "Elofic", logo: "https://boodmo.com/media/images/brand/6d1831f.webp", link: "/brands/5935-elofic/" },
  { name: "Lemforder", logo: "https://boodmo.com/media/images/brand/987fd20.webp", link: "/brands/1550-lemforder/" },
  { name: "Sachs", logo: "https://boodmo.com/media/images/brand/1586c06.webp", link: "/brands/2232-sachs/" },
  { name: "Spark Minda", logo: "https://boodmo.com/media/images/brand/6b0985f.webp", link: "/brands/5931-sparkminda/" },
  { name: "EuroMac", logo: "https://boodmo.com/media/images/brand/7fab5d4.webp", link: "/brands/6261-euromac/" },
  { name: "Shinshine", logo: "https://boodmo.com/media/images/brand/551a859.webp", link: "/brands/6374-sheen/" },
  { name: "IGB", logo: "https://boodmo.com/media/images/brand/3408b8a.webp", link: "/brands/6360-indo_german_brakes/" },
  { name: "UNO Mind", logo: "https://boodmo.com/media/images/brand/e5b18f5.webp", link: "/brands/2818-unominda/" },
  { name: "Technix", logo: "https://boodmo.com/media/images/brand/52704b7.webp", link: "/brands/6326-technix/" },
  { name: "Valeo", logo: "https://boodmo.com/media/images/brand/af34236.webp", link: "/brands/2622-valeo/" },
  { name: "Macklite", logo: "https://boodmo.com/media/images/brand/af34236.webp", link: "/brands/6367-maclite/" },
  { name: "SC", logo: "https://boodmo.com/media/images/brand/a2c58ac.webp", link: "/brands/6377-super_circle/" },
  { name: "MGT", logo: "https://boodmo.com/media/images/brand/f50f113.webp", link: "/brands/6381-mgt/" },
];

const carMakers = [
  { name: "MARUTI", link: "/vehicles/maruti/" },
  { name: "HYUNDAI", link: "/vehicles/hyundai/" },
  { name: "MAHINDRA", link: "/vehicles/mahindra/" },
  { name: "TATA", link: "/vehicles/tata/" },
  { name: "CHEVROLET", link: "/vehicles/chevrolet/" },
  { name: "HONDA", link: "/vehicles/honda/" },
  { name: "SKODA", link: "/vehicles/skoda/" },
  { name: "VW", link: "/vehicles/vw/" },
  { name: "TOYOTA", link: "/vehicles/toyota/" },
  { name: "NISSAN", link: "/vehicles/nissan/" },
  { name: "RENAULT", link: "/vehicles/renault/" },
  { name: "FORD", link: "/vehicles/ford/" },
  { name: "FIAT", link: "/vehicles/fiat/" },
  { name: "KIA", link: "/vehicles/kia/" },
  // { name: "ASHOK LEYLAND", link: "/vehicles/ashok-layland/" },
  
];

export default function BrandTrustAndCarMakers() {
  const navigate = useNavigate();

  const handleBrandViewAll = () => navigate("/brands");
  const handleCarMakerViewAll = () => navigate("/vehicles");

  return (
    <div className="py-6 sm:py-8 md:py-10 bg-gray-50 text-gray-800">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================== BRANDS SECTION ===================== */}
        <section className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-row justify-between items-center mb-4 sm:mb-5 md:mb-6 gap-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-left flex-1">
              Brands we <span className="text-red-500">Trust</span>
            </h2>
            <button
              onClick={handleBrandViewAll}
              className="text-xs sm:text-sm text-blue-600 hover:underline font-semibold transition-colors whitespace-nowrap flex-shrink-0"
            >
              VIEW ALL
            </button>
          </div>

        {/* Swiper for Brands */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={2}
          slidesPerView={6}
          loop
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={4000}
          className="w-full"
          breakpoints={{
            320: { slidesPerView: 3, spaceBetween: 8 },
            640: { slidesPerView: 4, spaceBetween: 10 },
            1024: { slidesPerView: 6, spaceBetween: 16 },
          }}
        >
          {brands.map((brand, idx) => (
            <SwiperSlide key={idx}>
              <a
                href={brand.link}
                className="flex items-center justify-center p-6 rounded-md 
                           shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300 group"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-18 w-auto object-contain transition"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

        {/* ===================== CAR MAKERS SECTION ===================== */}
        <section>
          <div className="flex flex-row justify-between items-center mb-4 sm:mb-5 md:mb-6 gap-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-left flex-1">
              Popular <span className="text-red-500">Car Makers</span>
            </h2>
            <button
              onClick={handleCarMakerViewAll}
              className="text-xs sm:text-sm text-blue-600 hover:underline font-semibold transition-colors whitespace-nowrap flex-shrink-0"
            >
              VIEW ALL
            </button>
          </div>

          {/* Swiper for Car Makers */}
          <Swiper
            modules={[Autoplay]}
            spaceBetween={2}
            slidesPerView={6}
            loop
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={4000}
            className="w-full"
            breakpoints={{
              320: { slidesPerView: 3, spaceBetween: 8 },
              640: { slidesPerView: 4, spaceBetween: 10 },
              1024: { slidesPerView: 6, spaceBetween: 16 },
            }}
          >
            {carMakers.map((maker, idx) => (
              <SwiperSlide key={idx}>
                <button
                  onClick={() => navigate(maker.link)}
                  className="rounded-xl p-3 flex flex-col items-center justify-center
                             hover:scale-105 transition-all duration-300 group w-full"
                >
                  <img
                    src={getMakerImage(maker.name)}
                    alt={maker.name}
                    className="w-full h-16 object-contain mb-2"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x120?text=' + maker.name;
                    }}
                  />
                  <span className="text-base font-medium text-gray-700 text-center">
                    {maker.name}
                  </span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </div>
  );
}