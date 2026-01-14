import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Footer from '../Footer';

const PrivacyPolicy = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: 'collection',
      title: 'Information We Collect',
      content: 'We collect information that you provide directly to us, including name, email address, phone number, shipping address, payment information, and vehicle details. We also automatically collect certain information about your device and how you interact with our website, such as IP address, browser type, pages visited, and time spent on pages.'
    },
    {
      id: 'usage',
      title: 'How We Use Your Information',
      content: 'We use the information we collect to: process your orders and transactions, communicate with you about your orders and account, send you marketing communications (with your consent), improve our services and website functionality, prevent fraud and ensure security, comply with legal obligations, and personalize your shopping experience.'
    },
    {
      id: 'sharing',
      title: 'Information Sharing',
      content: 'We do not sell your personal information. We may share your information with: service providers who assist us in operating our website and conducting our business (as long as they agree to keep your information confidential), payment processors for transaction processing, shipping companies for order fulfillment, legal authorities when required by law, and business partners in case of mergers or acquisitions (with prior notice).'
    },
    {
      id: 'security',
      title: 'Data Security',
      content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include SSL encryption, secure payment gateways, regular security audits, and restricted access to personal data. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.'
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      content: 'We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies help us remember your preferences, improve site functionality, and provide personalized content. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of our website may not function properly without cookies.'
    },
    {
      id: 'rights',
      title: 'Your Rights',
      content: 'You have the right to: access your personal information, update or correct inaccurate information, delete your personal information, opt-out of marketing communications, request data portability, and object to processing of your data. To exercise these rights, please contact us using the information provided below. We will respond to your request within 30 days.'
    },
    {
      id: 'retention',
      title: 'Data Retention',
      content: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.'
    },
    {
      id: 'children',
      title: 'Children\'s Privacy',
      content: 'Our website is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.'
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
            Privacy Policy
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
            At Sparelo, we are committed to protecting your privacy. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you visit our website and use our services. 
            Please read this policy carefully to understand our practices regarding your personal data.
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
            If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
          </p>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:privacy@sparelo.com" className="hover:text-gray-900">
                privacy@sparelo.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{' '}
              <a href="tel:+919876543210" className="hover:text-gray-900">
                +91 98765 43210
              </a>
            </p>
            <p>
              <strong>Address:</strong> Sparelo Headquarters, Gurugram, Haryana, India
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

