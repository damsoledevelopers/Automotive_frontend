import React, { useState } from 'react';
import Footer from '../Footer';

const DamagedParts = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'Engine', 'Body', 'Electrical', 'Suspension', 'Brakes'];
  const parts = [
    { id: 1, name: 'Damaged Engine Block', category: 'Engine', condition: 'Severe', price: '₹5,000' },
    { id: 2, name: 'Cracked Windshield', category: 'Body', condition: 'Moderate', price: '₹2,500' },
    { id: 3, name: 'Faulty Alternator', category: 'Electrical', condition: 'Repairable', price: '₹1,500' },
    { id: 4, name: 'Bent Suspension Arm', category: 'Suspension', condition: 'Moderate', price: '₹3,000' },
    { id: 5, name: 'Worn Brake Discs', category: 'Brakes', condition: 'Severe', price: '₹1,200' }
  ];

  const filteredParts = selectedCategory === 'all' 
    ? parts 
    : parts.filter(part => part.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">Damaged Parts</h1>
        
        <div className="mb-8">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
            Browse our collection of damaged automotive parts available at discounted prices. These parts may require repair or refurbishment but can be a cost-effective solution for your needs.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  selectedCategory === category.toLowerCase()
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredParts.map((part) => (
            <div key={part.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-gray-300 transition-colors">
              <div className="mb-3">
                <span className="text-xs px-2 py-1 border border-gray-300 rounded">{part.category}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{part.name}</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">Condition: {part.condition}</span>
                <span className="text-lg font-bold text-gray-900">{part.price}</span>
              </div>
              <button className="w-full border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                View Details
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Important Notice</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            All damaged parts are sold "as-is" and may require professional inspection and repair. We recommend consulting with a qualified mechanic before purchase. Returns are not accepted on damaged parts unless otherwise specified.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DamagedParts;

