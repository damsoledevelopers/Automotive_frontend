import React, { useState } from 'react';
import { FaHeadset, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaQuestionCircle, FaComments, FaPaperPlane, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import Footer from '../Footer';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    questionType: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Your support ticket has been submitted successfully!');
    setFormData({ name: '', email: '', subject: '', message: '', questionType: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const supportOptions = [
    {
      icon: <FaPhoneAlt />,
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      contact: '+91 114 1189222',
      href: 'tel:+911141189222',
      available: '10:00 AM - 7:00 PM IST'
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      description: 'Chat with us on WhatsApp',
      contact: '+91 98765 43210',
      href: 'https://wa.me/919876543210',
      available: '24/7 Available'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email Support',
      description: 'Send us an email',
      contact: 'support@sparelo.com',
      href: 'mailto:support@sparelo.com',
      available: 'Response within 24 hours'
    },
    {
      icon: <FaComments />,
      title: 'Live Chat',
      description: 'Chat with our support team',
      contact: 'Available Now',
      href: '#',
      available: '24/7 Available'
    }
  ];

  const quickLinks = [
    { name: 'FAQ', href: '/faq', icon: <FaQuestionCircle /> },
    { name: 'Return Policy', href: '/return-policy', icon: <FaCheckCircle /> },
    { name: 'Contact Us', href: '/contact', icon: <FaEnvelope /> },
    { name: 'Track Order', href: '/myorder', icon: <FaClock /> }
  ];

  const questionTypes = [
    'Help me find spare part for my car',
    'Order related query',
    'Refund and return related',
    'I want to become seller',
    'I want to become B2B customer',
    'Error or problem with website/app',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative border-b border-gray-200 bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&auto=format&q=80')`,
          minHeight: '400px'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex items-center justify-center min-h-full">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Customer Support
            </h1>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
              We're here to help you 24/7. Get in touch with our support team for any queries or assistance.
            </p>
          </div>
        </div>
      </div>

      {/* Support Options */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Get Support</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportOptions.map((option, index) => (
            <a
              key={index}
              href={option.href}
              className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors text-center group"
            >
              <div className="text-3xl sm:text-4xl text-gray-400 mb-4 flex justify-center group-hover:text-gray-600 transition-colors">
                {option.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{option.description}</p>
              <p className="text-sm font-semibold text-gray-900 mb-1">{option.contact}</p>
              <p className="text-xs text-gray-500">{option.available}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Submit a Support Ticket</h2>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="questionType" className="block text-sm font-medium text-gray-900 mb-2">
                Question Type *
              </label>
              <select
                id="questionType"
                name="questionType"
                value={formData.questionType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
              >
                <option value="">Select question type</option>
                {questionTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                placeholder="Enter subject"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none resize-none"
                placeholder="Describe your issue or question..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <FaPaperPlane />
              Submit Ticket
            </button>
          </form>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors text-center group"
            >
              <div className="text-2xl text-gray-400 mb-2 flex justify-center group-hover:text-gray-600 transition-colors">
                {link.icon}
              </div>
              <p className="text-sm font-medium text-gray-900">{link.name}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-gray-400 text-2xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Office Address</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Smart Parts Online Private Limited<br />
                  Unit Nos. 1609 & 1610, 16th floor, Magnum Global Park<br />
                  Golf Course Extension Road, Sector - 58<br />
                  Gurugram, Haryana, 122011
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaClock className="text-gray-400 text-2xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Operating Hours</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Phone Support: 10:00 AM - 7:00 PM IST<br />
                  (All days except public holidays)<br />
                  Email & Live Chat: 24/7 Available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Support;

