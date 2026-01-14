import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Footer from '../Footer';

const SellersPolicy = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      content: 'This Sellers Policy outlines the terms and conditions for vendors and sellers who list products on Sparelo. By becoming a seller, you agree to comply with this policy. This policy ensures quality standards, fair practices, and a positive experience for both sellers and customers.'
    },
    {
      id: 'requirements',
      title: 'Seller Requirements',
      content: 'To become a seller on Sparelo, you must have: valid business registration and GST certificate, quality products that meet our standards, accurate product descriptions and images, ability to fulfill orders within specified timeframes, and commitment to excellent customer service. All sellers undergo a verification process before being approved.'
    },
    {
      id: 'listing',
      title: 'Product Listing Guidelines',
      content: 'Provide accurate and detailed product information including specifications, compatibility, and condition. Use high-quality product images (minimum 3 images per product). Set competitive and fair pricing. Maintain adequate inventory levels and update stock status regularly. Use appropriate product categories and tags. Include warranty information if applicable. Prohibited content includes misleading descriptions, duplicate listings, and prohibited items.'
    },
    {
      id: 'commission',
      title: 'Commission and Payments',
      content: 'Commission rates vary by product category (typically 8-15%). Payments are processed on a weekly or monthly basis, depending on your seller tier. Payment schedule and commission rates are detailed in your seller agreement. Deductions may apply for returns, refunds, and chargebacks. All payments are subject to applicable tax deductions as per Indian tax laws.'
    },
    {
      id: 'fulfillment',
      title: 'Order Fulfillment',
      content: 'Process orders within 24-48 hours of receipt. Ship products using approved shipping partners or Sparelo logistics. Update order status and provide tracking information promptly. Ensure proper packaging to prevent damage during transit. Maintain high fulfillment rates (target: above 95%). Late shipments or cancellations may result in penalties or account restrictions.'
    },
    {
      id: 'quality',
      title: 'Quality Standards',
      content: 'All products must meet our quality standards. We reserve the right to remove listings that don\'t meet these standards or violate our policies. Sellers are responsible for ensuring product authenticity and quality. Regular quality audits may be conducted. Products must match their descriptions accurately. Counterfeit or substandard products are strictly prohibited.'
    },
    {
      id: 'prohibited',
      title: 'Prohibited Items',
      content: 'The following items are prohibited from being sold on Sparelo: counterfeit or fake products, stolen goods, products that violate intellectual property rights, used parts sold as new, products that don\'t meet safety standards, and any items that violate local laws or regulations. Violation of this policy may result in immediate account suspension and legal action.'
    },
    {
      id: 'performance',
      title: 'Performance Metrics',
      content: 'Seller performance is monitored based on: order fulfillment rate, customer ratings and reviews, response time to customer inquiries, return and refund rates, and compliance with policies. Sellers with excellent performance may receive benefits such as lower commission rates, featured listings, and priority support. Poor performance may result in restrictions or account suspension.'
    },
    {
      id: 'termination',
      title: 'Account Termination',
      content: 'We reserve the right to suspend or terminate seller accounts for: violation of policies, poor performance metrics, fraudulent activity, customer complaints, or legal violations. Sellers will be notified before termination and given an opportunity to appeal. Upon termination, pending orders must still be fulfilled, and outstanding payments will be processed according to the payment schedule.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
            Sellers Policy
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
            This Sellers Policy outlines the terms and conditions for vendors and sellers who list products on Sparelo. 
            By becoming a seller, you agree to comply with this policy. Please read this policy carefully before listing products.
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
            If you have any questions about this Sellers Policy or want to become a seller, please contact us:
          </p>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:sellers@sparelo.com" className="hover:text-gray-900">
                sellers@sparelo.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{' '}
              <a href="tel:+919876543212" className="hover:text-gray-900">
                +91 98765 43212
              </a>
            </p>
            <p>
              <strong>Address:</strong> Sparelo Seller Relations, Gurugram, Haryana, India
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellersPolicy;
