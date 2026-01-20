







































import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";

const CurrentOffers = () => {
  const swiperRef = useRef(null);

  // Array of offer images
  const offers = [
    {
      id: 1,
      image: "/fd1.jpeg"
    },
    {
      id: 2,
      image: "/fd2.png"
    },
    {
      id: 3,
      image: "/fd1.jpeg"
    },
    {
      id: 4,
      image: "/fd2.png"
    },
    {
      id: 5,
      image: "/fd1.jpeg"
    }
  ];

  return (
    <section className="relative bg-white py-4 sm:py-6 md:py-8 overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        
        {/* Header Section */}
        {/* <div className="mb-5 md:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
        Current <span className="text-gray-900">Hot Deals</span>
          </h2>
        </div> */}

        {/* Swiper Container */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={8}
            slidesPerView={2}
            loop={true}
            speed={800}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            navigation={{
              prevEl: '.offers-prev',
              nextEl: '.offers-next',
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              if (swiper.autoplay) {
                swiper.autoplay.start();
              }
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 12
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 14
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 16
              }
            }}
            className="offers-swiper"
          >
            {offers.map((offer) => (
              <SwiperSlide key={offer.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-[140px] sm:h-[180px] md:h-[200px] lg:h-[220px] rounded-sm overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={offer.image}
                    alt={`Offer ${offer.id}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x450?text=Offer';
                    }}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <button
            className="offers-prev absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-sm bg-white/90 hover:bg-white border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md"
            aria-label="Previous slide"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="offers-next absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-sm bg-white/90 hover:bg-white border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md"
            aria-label="Next slide"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .offers-swiper .swiper-slide {
          height: auto;
        }
        .offers-prev,
        .offers-next {
          display: flex;
        }
        .offers-prev.swiper-button-disabled,
        .offers-next.swiper-button-disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
};
export default CurrentOffers;
