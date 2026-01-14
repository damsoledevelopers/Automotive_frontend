import React, { useState } from 'react';
import { FaCalendar, FaUser, FaTag, FaArrowRight, FaSearch } from 'react-icons/fa';
import Footer from '../Footer';

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Maintenance', 'Repairs', 'Tips & Tricks', 'Product Reviews', 'News'];

  const articles = [
    {
      id: 1,
      title: 'Essential Car Maintenance Tips for Longevity',
      excerpt: 'Learn the fundamental maintenance practices that will keep your vehicle running smoothly for years to come.',
      content: 'Regular maintenance is crucial for extending your vehicle\'s lifespan. This comprehensive guide covers oil changes, tire rotations, brake inspections, and more essential practices every car owner should know.',
      category: 'Maintenance',
      author: 'John Smith',
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop&auto=format&q=80',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'How to Choose the Right Brake Pads',
      excerpt: 'A detailed guide to selecting brake pads that match your driving style and vehicle requirements.',
      content: 'Choosing the right brake pads can significantly impact your vehicle\'s safety and performance. We break down the different types, materials, and factors to consider when making your selection.',
      category: 'Repairs',
      author: 'Sarah Johnson',
      date: '2024-01-12',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format&q=80',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Top 10 Car Care Tips for Winter',
      excerpt: 'Protect your vehicle during harsh winter conditions with these expert-recommended tips.',
      content: 'Winter weather can be tough on your car. From battery maintenance to tire care, learn how to prepare your vehicle for cold temperatures and ensure reliable performance throughout the season.',
      category: 'Tips & Tricks',
      author: 'Mike Davis',
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop&auto=format&q=80',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Best Engine Oil Brands Reviewed',
      excerpt: 'Compare top engine oil brands and find the perfect match for your vehicle.',
      content: 'We\'ve tested and reviewed the leading engine oil brands in the market. Discover which oils offer the best protection, performance, and value for different vehicle types and driving conditions.',
      category: 'Product Reviews',
      author: 'Emily Chen',
      date: '2024-01-08',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format&q=80',
      readTime: '8 min read'
    },
    {
      id: 5,
      title: 'Electric Vehicle Maintenance Guide',
      excerpt: 'Everything you need to know about maintaining electric vehicles in 2024.',
      content: 'Electric vehicles have different maintenance needs compared to traditional cars. Learn about battery care, charging best practices, and maintenance schedules specific to EVs.',
      category: 'News',
      author: 'David Wilson',
      date: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=600&fit=crop&auto=format&q=80',
      readTime: '10 min read'
    },
    {
      id: 6,
      title: 'Understanding Your Car\'s Warning Lights',
      excerpt: 'Decode dashboard warning lights and know when to take immediate action.',
      content: 'Dashboard warning lights can be confusing. This guide explains what each light means, which ones require immediate attention, and when you can safely continue driving.',
      category: 'Tips & Tricks',
      author: 'Lisa Anderson',
      date: '2024-01-03',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop&auto=format&q=80',
      readTime: '5 min read'
    },
    {
      id: 7,
      title: 'DIY Car Wash: Do\'s and Don\'ts',
      excerpt: 'Master the art of washing your car at home without damaging the paint.',
      content: 'Washing your car at home can save money, but doing it wrong can cause scratches and damage. Learn the proper techniques, products, and tools needed for a professional-quality wash.',
      category: 'Maintenance',
      author: 'Robert Taylor',
      date: '2024-01-01',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop&auto=format&q=80',
      readTime: '4 min read'
    },
    {
      id: 8,
      title: 'Air Filter Replacement Guide',
      excerpt: 'When and how to replace your car\'s air filter for optimal performance.',
      content: 'A clean air filter is essential for engine performance and fuel efficiency. Learn how to identify when your filter needs replacement and how to do it yourself.',
      category: 'Maintenance',
      author: 'Jennifer Martinez',
      date: '2023-12-28',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format&q=80',
      readTime: '3 min read'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative border-b border-gray-200 bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop&auto=format&q=80')`,
          minHeight: '400px'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex items-center justify-center min-h-full">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Automotive Articles & Guides
            </h1>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
              Expert tips, maintenance guides, and insights to help you take better care of your vehicle.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors bg-white"
            >
              {/* Article Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <FaCalendar />
                    {formatDate(article.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaUser />
                    {article.author}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                  <button className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                    Read More
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            Stay Updated
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Subscribe to our newsletter to receive the latest automotive tips and articles directly in your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Articles;

