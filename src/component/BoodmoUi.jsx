import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// ✅ Local images (inside src/assets/img/)
import bannerui from "../assets/img/bannerui.jpg";

// 🔹 Main Component
export const BoodmoUi = () => {
  // Banner images for scrolling carousel
  const bannerImages = [
    bannerui,
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
   
  ];

  return (
    <section className="bg-red-50 relative">
      {/* 🔹 Banner Section with Scrolling Images */}
      <div className="relative w-full h-[35vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        {/* 🔹 Scrolling Banner Carousel */}
        <div className="absolute inset-0 w-full h-full">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            className="w-full h-full"
          >
            {bannerImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <img
                    src={image}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover opacity-70"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/1200x600?text=Banner';
                    }}
                  />
                  {/* 🔹 Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 🔹 Centered Content - No Background */}
        <div className="relative z-10 w-full max-w-6xl px-6 md:px-8 text-center text-white">
          {/* Main Heading */}
          <h1 className="text-2xl md:text-4xl mb-4 text-white font-semibold">
            Find Genuine <span className="text-red-400">OEM</span> & <br />
            <span className="text-blue-400">Aftermarket</span> Auto Parts
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light">
            Your one-stop solution for all automotive spare parts
          </p>
        </div>
      </div>
    </section>
  );
};