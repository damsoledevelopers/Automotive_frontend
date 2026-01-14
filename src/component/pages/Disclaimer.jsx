import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Footer from '../Footer';

const Disclaimer = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: 'general',
      title: 'General Information',
      content: 'The information contained on this website is for general information purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is strictly at your own risk.'
    },
    {
      id: 'product',
      title: 'Product Information',
      content: 'Product descriptions, images, and specifications are provided for informational purposes. While we strive to ensure accuracy, we cannot guarantee that product descriptions or other content on this website is accurate, complete, reliable, current, or error-free. Actual products may vary from images shown. Colors, sizes, and specifications may differ slightly from what is displayed. We recommend verifying product compatibility and specifications before making a purchase.'
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      content: 'In no event will Sparelo be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website. This includes but is not limited to: damages from product defects, incorrect part selection, installation errors, or misuse of products. Our liability is limited to the purchase price of the product.'
    },
    {
      id: 'external',
      title: 'External Links',
      content: 'Through this website you are able to link to other websites which are not under the control of Sparelo. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them. We are not responsible for the privacy practices or content of external websites. Use of external links is at your own risk.'
    },
    {
      id: 'professional',
      title: 'Professional Advice',
      content: 'The information on this website is not intended to replace professional automotive advice. Always consult with a qualified mechanic or automotive professional before making decisions about vehicle repairs or modifications. We are not responsible for any damages or injuries resulting from improper installation, use, or application of products purchased from our website. Installation and use of automotive parts should be performed by qualified professionals.'
    },
    {
      id: 'availability',
      title: 'Website Availability',
      content: 'Every effort is made to keep the website up and running smoothly. However, Sparelo takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control. This includes but is not limited to: server maintenance, network issues, or unforeseen technical problems. We strive to minimize downtime and will notify users of scheduled maintenance when possible.'
    },
    {
      id: 'pricing',
      title: 'Pricing and Availability',
      content: 'Product prices and availability are subject to change without notice. While we strive to maintain accurate pricing and stock information, errors may occur. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice. If a product is listed at an incorrect price due to an error, we reserve the right to refuse or cancel orders placed at the incorrect price.'
    },
    {
      id: 'changes',
      title: 'Changes to Disclaimer',
      content: 'We reserve the right to update this disclaimer at any time. We encourage you to review this page periodically for any changes. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes constitutes acceptance of the updated disclaimer. The "Last updated" date at the top of this page indicates when the disclaimer was last modified.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
            Disclaimer
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Introduction */}
        <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Please read this disclaimer carefully before using our website. By using this website, 
            you acknowledge that you have read, understood, and agree to be bound by this disclaimer.
          </p>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {sections.map((section) => {
            const isOpen = openSections[section.id];
            return (
              <div key={section.id} className="bg-gray-100 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-gray-200 transition-colors"
                >
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <FaMinus className="text-gray-500 text-lg" />
                    ) : (
                      <FaPlus className="text-gray-500 text-lg" />
                    )}
                  </div>
                  <h2 className="text-sm sm:text-base font-semibold text-gray-900 flex-1">
                    {section.title}
                  </h2>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-4 pl-12">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed pt-2">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Contact Us</h2>
          <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
            If you have any questions about this Disclaimer, please contact us:
          </p>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:legal@sparelo.com" className="hover:text-gray-900">
                legal@sparelo.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{' '}
              <a href="tel:+919876543210" className="hover:text-gray-900">
                +91 98765 43210
              </a>
            </p>
            <p>
              <strong>Address:</strong> Sparelo Legal Department, Gurugram, Haryana, India
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Disclaimer;
