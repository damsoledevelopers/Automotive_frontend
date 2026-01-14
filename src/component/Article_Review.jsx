import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaCalendar, FaUser, FaArrowRight } from "react-icons/fa";
import "swiper/css";

// First 3 articles from Articles.jsx
const articles = [
  {
    id: 1,
    title: "Essential Car Maintenance Tips for Longevity",
    excerpt: "Learn the fundamental maintenance practices that will keep your vehicle running smoothly for years to come.",
    category: "Maintenance",
    author: "John Smith",
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop&auto=format&q=80",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "How to Choose the Right Brake Pads",
    excerpt: "A detailed guide to selecting brake pads that match your driving style and vehicle requirements.",
    category: "Repairs",
    author: "Sarah Johnson",
    date: "2024-01-12",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format&q=80",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Top 10 Car Care Tips for Winter",
    excerpt: "Protect your vehicle during harsh winter conditions with these expert-recommended tips.",
    category: "Tips & Tricks",
    author: "Mike Davis",
    date: "2024-01-10",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop&auto=format&q=80",
    readTime: "6 min read"
  }
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function ArticleReview() {
  const swiperRef = useRef(null);

  return (
    <section className="py-4 sm:py-6 md:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Red Accent Line */}
        <div className="w-16 h-0.5 bg-red-600 mb-3 md:mb-4"></div>

        {/* Section Header */}
        <div className="flex flex-row items-center justify-between mb-4 sm:mb-5 md:mb-6 gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
              Article & <span className="text-red-500">Review</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">
              Stay updated with expert insights, maintenance tips, and automotive trends.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/articles"
              className="text-xs sm:text-sm text-blue-600 hover:underline font-semibold transition-colors whitespace-nowrap"
            >
              VIEW ALL
            </Link>
          </div>
        </div>

        {/* Articles Swiper */}
        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            loop={articles.length > 3}
            speed={800}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
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
                spaceBetween: 16
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20
              }
            }}
            className="article-swiper"
          >
            {articles.map((article) => (
              <SwiperSlide key={article.id}>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md h-full">
                  {/* Article Image */}
                  <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden bg-gray-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop&auto=format&q=80';
                      }}
                    />
                    {/* Category Tag - Top Left */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <span className="px-2 sm:px-3 py-1 bg-gray-900 text-white text-[10px] sm:text-xs font-medium rounded">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-3 sm:p-4 md:p-5">
                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3">
                      <span className="flex items-center gap-1">
                        <FaCalendar className="text-[10px] sm:text-xs" />
                        <span className="whitespace-nowrap">{formatDate(article.date)}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <FaUser className="text-[10px] sm:text-xs" />
                        <span className="whitespace-nowrap">{article.author}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3 min-h-[3rem] sm:min-h-[3.5rem]">
                      {article.excerpt}
                    </p>

                    {/* Footer with Read Time and Read More */}
                    <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100">
                      <span className="text-[10px] sm:text-xs text-gray-500">{article.readTime}</span>
                      <button className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors group">
                        <span>Read More</span>
                        <FaArrowRight className="text-[10px] sm:text-xs group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
