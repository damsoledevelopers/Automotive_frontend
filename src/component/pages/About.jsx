import React, { useState } from 'react';
import { FaAward, FaUsers, FaShippingFast, FaHeadset, FaShieldAlt, FaCheckCircle, FaBuilding, FaChartLine } from 'react-icons/fa';
import Footer from '../Footer';

const About = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { icon: <FaUsers />, number: '500K+', label: 'Happy Customers' },
    { icon: <FaShippingFast />, number: '1M+', label: 'Parts Delivered' },
    { icon: <FaAward />, number: '10K+', label: 'Verified Suppliers' },
    { icon: <FaHeadset />, number: '24/7', label: 'Support Available' }
  ];

  const values = [
    {
      title: 'Quality Assurance',
      description: 'We ensure all parts meet strict quality standards before reaching our customers.',
      icon: <FaShieldAlt />
    },
    {
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go the extra mile to serve you better.',
      icon: <FaUsers />
    },
    {
      title: 'Transparency',
      description: 'Clear pricing, detailed product information, and honest communication.',
      icon: <FaCheckCircle />
    },
    {
      title: 'Innovation',
      description: 'Constantly improving our platform and services using latest technology.',
      icon: <FaAward />
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'mission', label: 'Mission & Vision' },
    { id: 'values', label: 'Our Values' },
    { id: 'team', label: 'Leadership' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative border-b border-gray-200 bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop&auto=format&q=80')`,
          minHeight: '400px'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex items-center justify-center min-h-full">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              About Sparelo
            </h1>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
              India's leading online platform for automotive spare parts, connecting customers with quality parts and exceptional service.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="text-2xl sm:text-3xl text-gray-400 mb-2 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'overview' && (
            <div className="space-y-6 sm:space-y-8">
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Who We Are</h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                  Sparelo is India's leading online platform for automotive spare parts, connecting customers with quality parts and accessories for their vehicles. Founded with a vision to revolutionize the automotive spare parts industry, we have grown to become a trusted name in the market.
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  We are committed to providing genuine OEM and aftermarket parts with exceptional service, making vehicle maintenance accessible and affordable for everyone across India.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-gray-300 pl-3 sm:pl-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">2015 - The Beginning</h3>
                    <p className="text-sm text-gray-700">Sparelo was founded with a mission to simplify automotive parts procurement.</p>
                  </div>
                  <div className="border-l-4 border-gray-300 pl-3 sm:pl-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">2018 - Expansion</h3>
                    <p className="text-sm text-gray-700">Expanded operations across major cities in India, reaching 50+ cities.</p>
                  </div>
                  <div className="border-l-4 border-gray-300 pl-3 sm:pl-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">2021 - Digital Transformation</h3>
                    <p className="text-sm text-gray-700">Launched mobile app and enhanced digital platform for better customer experience.</p>
                  </div>
                  <div className="border-l-4 border-gray-900 pl-3 sm:pl-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">2024 - Today</h3>
                    <p className="text-sm text-gray-700">Serving 500K+ customers with 1M+ parts delivered and 10K+ verified suppliers.</p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'mission' && (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  To revolutionize the automotive spare parts industry by making quality parts accessible, affordable, and easily available to everyone across India. We aim to simplify vehicle maintenance and repair processes, ensuring that every vehicle owner has access to genuine parts at competitive prices.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Our Vision</h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                  To become the most trusted and preferred destination for automotive spare parts in India, known for quality, reliability, and customer satisfaction. We envision a future where finding the right automotive part is as simple as a few clicks.
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  We strive to build a platform that connects customers, suppliers, and service providers in a seamless ecosystem that benefits everyone.
                </p>
              </section>
            </div>
          )}

          {activeTab === 'values' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {values.map((value, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                  <div className="text-2xl sm:text-3xl text-gray-400 mb-3">{value.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-8">
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Leadership Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'Rajesh Kumar', role: 'CEO & Founder', bio: '20+ years in automotive industry' },
                    { name: 'Priya Sharma', role: 'CTO', bio: 'Tech visionary with 15+ years experience' },
                    { name: 'Amit Patel', role: 'COO', bio: 'Operations expert specializing in logistics' }
                  ].map((member, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 text-center">
                      <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{member.role}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{member.bio}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Wide selection of genuine OEM and aftermarket parts',
              'Competitive pricing and special offers',
              'Fast and reliable delivery across India',
              'Expert customer support team available 24/7',
              'Easy return and refund policy',
              'Verified suppliers and quality assurance'
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <FaCheckCircle className="text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Get in Touch</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <a href="mailto:info@sparelo.com" className="text-gray-600 hover:text-gray-900">
              info@sparelo.com
            </a>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
            <a href="tel:+919876543210" className="text-gray-600 hover:text-gray-900">
              +91 98765 43210
            </a>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600">Gurugram, Haryana, India</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;

