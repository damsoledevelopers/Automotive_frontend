import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';

const Sitemap2 = () => {
  const sitemapData = {
    'Products': [
      { name: 'Engine Parts', path: '/catalog/engine' },
      { name: 'Brake System', path: '/catalog/brakes' },
      { name: 'Suspension', path: '/catalog/suspension' },
      { name: 'Electrical Components', path: '/catalog/electric_components' },
      { name: 'Body Parts', path: '/catalog/body' },
      { name: 'Filters', path: '/catalog/filters' }
    ],
    'Services': [
      { name: 'Service Booking', path: '/service/booking' },
      { name: 'Diagnostic', path: '/diagnostic' },
      { name: 'Garage', path: '/garage' },
      { name: 'OEM Catalogue', path: '/oem-catalogue' }
    ],
    'Information': [
      { name: 'Articles', path: '/articles' },
      { name: 'Discovery Points', path: '/discovery-points' },
      { name: 'Damaged Parts', path: '/damaged-parts' },
      { name: 'Best Offers', path: '/offers' }
    ],
    'Legal': [
      { name: 'Buyers Policy', path: '/buyers-policy' },
      { name: 'Sellers Policy', path: '/sellers-policy' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Terms of Use', path: '/terms-of-use' }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">Sitemap 2</h1>
        
        <p className="text-base sm:text-lg text-gray-700 mb-8">
          Additional site navigation organized by product categories and services.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {Object.entries(sitemapData).map(([section, links]) => (
            <div key={section}>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">{section}</h2>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm sm:text-base text-gray-700 hover:text-gray-900 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sitemap2;

