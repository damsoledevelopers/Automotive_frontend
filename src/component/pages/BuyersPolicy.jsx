import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Footer from '../Footer';

const BuyersPolicy = () => {
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
      content: 'This Buyers Policy outlines the terms and conditions that apply to all purchases made on Sparelo. By making a purchase, you agree to comply with this policy. This policy is designed to ensure a fair and transparent shopping experience for all our customers.'
    },
    {
      id: 'ordering',
      title: 'Ordering Process',
      content: 'All orders are subject to product availability. You must provide accurate vehicle information for part compatibility verification. Order confirmation will be sent via email and SMS. We reserve the right to cancel orders in case of pricing errors, unavailability, or suspected fraudulent activity. You will be notified immediately if your order is cancelled.'
    },
    {
      id: 'pricing',
      title: 'Pricing and Payment',
      content: 'All prices are displayed in Indian Rupees (INR) and include applicable taxes. We accept multiple payment methods including credit/debit cards, UPI, net banking, and cash on delivery (where available). Payment must be completed before order processing begins. Prices are subject to change without notice, but you will be charged the price displayed at the time of order confirmation.'
    },
    {
      id: 'shipping',
      title: 'Shipping and Delivery',
      content: 'Delivery times vary based on your location and product availability. Standard delivery takes 3-7 business days. Free shipping is available on orders above ₹999. You will receive tracking information via email and SMS once your order ships. Delivery charges (if applicable) will be displayed during checkout. We are not responsible for delays caused by courier services or external factors.'
    },
    {
      id: 'returns',
      title: 'Returns and Refunds',
      content: 'Items can be returned within 30 days of delivery if they are unused, in original packaging, and accompanied by proof of purchase. Custom or personalized items may not be eligible for return. Refunds will be processed to the original payment method within 7-14 business days after we receive and inspect the returned item. Return shipping costs may apply unless the item was defective or incorrect.'
    },
    {
      id: 'warranty',
      title: 'Warranty',
      content: 'Products come with manufacturer warranties as applicable. Warranty terms vary by product and manufacturer. OEM parts typically come with manufacturer warranty, while aftermarket parts may have limited warranties. Please check product details for specific warranty information. Warranty claims must be made directly with the manufacturer or through our customer service team.'
    },
    {
      id: 'product',
      title: 'Product Compatibility',
      content: 'It is your responsibility to ensure product compatibility with your vehicle. We provide compatibility information based on vehicle make, model, and year, but cannot guarantee fitment in all cases. We recommend consulting with a qualified mechanic before purchase. We are not liable for damages resulting from incorrect part selection or installation.'
    },
    {
      id: 'disputes',
      title: 'Disputes and Complaints',
      content: 'If you have any concerns or complaints about your purchase, please contact our customer service team immediately. We will investigate and attempt to resolve disputes fairly. If you are not satisfied with our resolution, you may contact consumer protection authorities. We are committed to resolving all customer issues promptly and fairly.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
            Buyers Policy
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
            This Buyers Policy outlines the terms and conditions that apply to all purchases made on Sparelo. 
            By making a purchase, you agree to comply with this policy. Please read this policy carefully before placing an order.
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
            If you have any questions about this Buyers Policy, please contact us:
          </p>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:support@sparelo.com" className="hover:text-gray-900">
                support@sparelo.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{' '}
              <a href="tel:+919876543210" className="hover:text-gray-900">
                +91 98765 43210
              </a>
            </p>
            <p>
              <strong>Address:</strong> Sparelo Customer Service, Gurugram, Haryana, India
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuyersPolicy;
