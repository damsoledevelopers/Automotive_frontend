import React, { useState } from 'react';
import Footer from '../Footer';

const Offers = () => {
  const [activeTab, setActiveTab] = useState('all');

  const offers = [
    { id: 1, title: 'Engine Parts Sale', discount: 'Up to 30% OFF', category: 'engine', validUntil: '2024-12-31' },
    { id: 2, title: 'Brake System Discount', discount: '25% OFF', category: 'brakes', validUntil: '2024-12-25' },
    { id: 3, title: 'Free Shipping', discount: 'On orders above ₹999', category: 'shipping', validUntil: 'Ongoing' },
    { id: 4, title: 'Suspension Parts', discount: '20% OFF', category: 'suspension', validUntil: '2024-12-20' },
    { id: 5, title: 'Electrical Components', discount: '15% OFF', category: 'electrical', validUntil: '2024-12-18' },
    { id: 6, title: 'Body Parts Special', discount: 'Up to 40% OFF', category: 'body', validUntil: '2024-12-15' }
  ];

  const filteredOffers = activeTab === 'all' 
    ? offers 
    : offers.filter(offer => offer.category === activeTab);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">Best Offers</h1>
        
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                activeTab === 'all'
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              All Offers
            </button>
            <button
              onClick={() => setActiveTab('engine')}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                activeTab === 'engine'
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              Engine
            </button>
            <button
              onClick={() => setActiveTab('brakes')}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                activeTab === 'brakes'
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              Brakes
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                activeTab === 'shipping'
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              Shipping
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-gray-300 transition-colors">
              <div className="mb-3">
                <span className="text-xs px-2 py-1 border border-gray-300 rounded uppercase">{offer.category}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{offer.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-3">{offer.discount}</p>
              <p className="text-sm text-gray-600 mb-4">Valid until: {offer.validUntil}</p>
              <button className="w-full border border-gray-900 px-4 py-2 rounded-lg hover:bg-gray-900 hover:text-white transition-colors font-medium">
                Shop Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-base text-gray-700 mb-4">
            Subscribe to our newsletter to receive exclusive offers and discounts directly in your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button className="px-6 py-2 border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Offers;

