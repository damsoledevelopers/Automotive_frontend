import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaClock, FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';
import Footer from '../Footer';

const DiscoveryPoints = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const locations = [
    {
      id: 1,
      name: 'Mumbai Discovery Point',
      address: '123 Auto Street, Andheri East',
      city: 'Mumbai, Maharashtra',
      phone: '+91 98765 43210',
      hours: 'Mon-Sat: 9:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM',
      services: [
        'Product demonstrations and consultations',
        'Expert advice on part selection',
        'Same-day pickup for online orders',
        'Return and exchange services',
        'Technical support and guidance'
      ],
      coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    {
      id: 2,
      name: 'Delhi Discovery Point',
      address: '456 Parts Avenue, Connaught Place',
      city: 'New Delhi',
      phone: '+91 98765 43211',
      hours: 'Mon-Sat: 9:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM',
      services: [
        'Product demonstrations and consultations',
        'Expert advice on part selection',
        'Same-day pickup for online orders',
        'Return and exchange services',
        'Technical support and guidance'
      ],
      coordinates: { lat: 28.6139, lng: 77.2090 }
    },
    {
      id: 3,
      name: 'Bangalore Discovery Point',
      address: '789 Vehicle Road, Koramangala',
      city: 'Bangalore, Karnataka',
      phone: '+91 98765 43212',
      hours: 'Mon-Sat: 9:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM',
      services: [
        'Product demonstrations and consultations',
        'Expert advice on part selection',
        'Same-day pickup for online orders',
        'Return and exchange services',
        'Technical support and guidance'
      ],
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    {
      id: 4,
      name: 'Chennai Discovery Point',
      address: '321 Spare Parts Lane, T. Nagar',
      city: 'Chennai, Tamil Nadu',
      phone: '+91 98765 43213',
      hours: 'Mon-Sat: 9:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM',
      services: [
        'Product demonstrations and consultations',
        'Expert advice on part selection',
        'Same-day pickup for online orders',
        'Return and exchange services',
        'Technical support and guidance'
      ],
      coordinates: { lat: 13.0827, lng: 80.2707 }
    }
  ];

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Discovery Points
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Visit our physical locations to explore, learn about, and purchase automotive spare parts with expert guidance.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by city or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>

        {/* What are Discovery Points */}
        <div className="mb-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">What are Discovery Points?</h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Discovery Points are our physical locations where customers can explore, learn about, and purchase automotive spare parts. 
            These points serve as knowledge centers and retail outlets combined, offering expert guidance and hands-on product demonstrations.
          </p>
        </div>

        {/* Services Offered */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Services Offered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Product demonstrations and consultations',
              'Expert advice on part selection',
              'Same-day pickup for online orders',
              'Return and exchange services',
              'Technical support and guidance',
              'Vehicle compatibility checks'
            ].map((service, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">{service}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Find a Discovery Point ({filteredLocations.length})
          </h2>
          <div className="space-y-4">
            {filteredLocations.map((location) => (
              <div
                key={location.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
              >
                <button
                  onClick={() => setSelectedLocation(selectedLocation === location.id ? null : location.id)}
                  className="w-full p-5 sm:p-6 text-left"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                        {location.name}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-gray-400" />
                          <span>{location.address}, {location.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaPhone className="text-gray-400" />
                          <span>{location.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaClock className="text-gray-400" />
                          <span>{location.hours}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {selectedLocation === location.id ? (
                        <FaChevronUp className="text-gray-400" />
                      ) : (
                        <FaChevronDown className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>

                {selectedLocation === location.id && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-gray-200 bg-gray-50">
                    <div className="pt-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Available Services</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {location.services.map((service, index) => (
                          <li key={index}>{service}</li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                          Get Directions
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Operating Hours */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Standard Operating Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Monday - Saturday</h3>
              <p className="text-sm text-gray-700">9:00 AM - 7:00 PM</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Sunday</h3>
              <p className="text-sm text-gray-700">10:00 AM - 5:00 PM</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            *Hours may vary by location. Please call ahead to confirm.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiscoveryPoints;
