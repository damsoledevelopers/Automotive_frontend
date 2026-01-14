import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';

const Sitemap = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sitemapData = {
    'Main Pages': [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQ', path: '/faq' }
    ],
    'Shopping': [
      { name: 'Catalog', path: '/catalog' },
      { name: 'Brands', path: '/brands' },
      { name: 'Car Makers', path: '/vehicles' },
      { name: 'Cart', path: '/cart' }
    ],
    'Account': [
      { name: 'My Profile', path: '/myprofile' },
      { name: 'My Orders', path: '/myorder' },
      { name: 'My Wishlist', path: '/mywishlist' },
      { name: 'Addresses', path: '/addresses' }
    ],
    'Policies': [
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Terms of Use', path: '/terms-of-use' },
      { name: 'Return Policy', path: '/return-policy' },
      { name: 'Disclaimer', path: '/disclaimer' }
    ],
    'Company': [
      { name: 'Careers', path: '/careers' },
      { name: 'Investor Relations', path: '/investor-relations' },
      { name: 'Suppliers', path: '/suppliers' },
      { name: 'API Solution', path: '/api-solution' }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">Sitemap</h1>
        
        <p className="text-base sm:text-lg text-gray-700 mb-8">
          Find all pages and sections of our website organized by category.
        </p>

        <div className="space-y-3">
          {Object.entries(sitemapData).map(([section, links]) => (
            <div key={section} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{section}</h2>
                <span className="text-gray-600">{openSections[section] ? '−' : '+'}</span>
              </button>
              {openSections[section] && (
                <div className="px-5 pb-4">
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className="text-base text-gray-700 hover:text-gray-900 hover:underline"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sitemap;

