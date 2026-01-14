import React, { useState } from 'react';
import Footer from '../Footer';

const TermsOfUse = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use this website.'
    },
    {
      id: 'use',
      title: 'Use License',
      content: 'Permission is granted to temporarily download one copy of the materials on Sparelo\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose; attempt to decompile or reverse engineer any software; remove any copyright or other proprietary notations.'
    },
    {
      id: 'account',
      title: 'User Accounts',
      content: 'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.'
    },
    {
      id: 'orders',
      title: 'Orders and Payment',
      content: 'All orders are subject to product availability and our acceptance. We reserve the right to refuse or cancel any order for any reason. Prices are subject to change without notice. Payment must be received before order processing.'
    },
    {
      id: 'intellectual',
      title: 'Intellectual Property',
      content: 'All content on this website, including text, graphics, logos, images, and software, is the property of Sparelo or its content suppliers and is protected by copyright and other intellectual property laws.'
    },
    {
      id: 'prohibited',
      title: 'Prohibited Uses',
      content: 'You may not use this website: in any way that violates any applicable law or regulation; to transmit any harmful code or viruses; to collect or track personal information of others; to spam or harass other users; or for any unlawful purpose.'
    },
    {
      id: 'termination',
      title: 'Termination',
      content: 'We reserve the right to terminate or suspend your account and access to the website immediately, without prior notice, for conduct that we believe violates these Terms of Use or is harmful to other users, us, or third parties.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Terms of Use</h1>
        
        <div className="mb-6 text-sm sm:text-base text-gray-700">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            Please read these Terms of Use carefully before using our website. By using our website, you agree to be bound by these terms.
          </p>
        </div>

        <div className="space-y-3">
          {sections.map((section) => (
            <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">{section.title}</h2>
                <span className="text-gray-600">{openSections[section.id] ? '−' : '+'}</span>
              </button>
              {openSections[section.id] && (
                <div className="px-5 pb-4">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{section.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Contact Us</h2>
          <p className="text-sm sm:text-base text-gray-700 mb-2">
            If you have any questions about these Terms of Use, please contact us:
          </p>
          <p className="text-sm text-gray-700">
            <strong>Email:</strong> legal@sparelo.com<br />
            <strong>Phone:</strong> +91 98765 43210
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfUse;

