import React, { useState } from 'react';
import Footer from '../Footer';

const APISolution = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Sparelo API Solution</h1>
        
        <div className="mb-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'overview' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('documentation')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'documentation' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Documentation
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'pricing' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Pricing
            </button>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8 text-gray-700">
          {activeTab === 'overview' && (
            <>
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">API Overview</h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  Sparelo API provides developers and businesses with programmatic access to our extensive catalog of automotive spare parts. Integrate our API into your application to offer parts search, pricing, and ordering capabilities.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Key Features</h2>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-900">•</span>
                    <span>Real-time product catalog access</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-900">•</span>
                    <span>Product search and filtering</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-900">•</span>
                    <span>Pricing and availability information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-900">•</span>
                    <span>Order placement and tracking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-900">•</span>
                    <span>RESTful API with JSON responses</span>
                  </li>
                </ul>
              </section>
            </>
          )}

          {activeTab === 'documentation' && (
            <>
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">API Documentation</h2>
                <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                  Our comprehensive API documentation includes endpoints, authentication methods, request/response formats, and code examples.
                </p>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <code className="text-sm">
                    GET /api/v1/products<br />
                    POST /api/v1/orders<br />
                    GET /api/v1/orders/{'{id}'}
                  </code>
                </div>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Authentication</h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  All API requests require authentication using API keys. You can generate your API keys from the developer dashboard after signing up.
                </p>
              </section>
            </>
          )}

          {activeTab === 'pricing' && (
            <>
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Pricing Plans</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Starter</h3>
                    <p className="text-xl sm:text-2xl font-bold mb-2">Free</p>
                    <p className="text-sm text-gray-600 mb-4">1000 requests/month</p>
                    <button className="w-full border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">Get Started</button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Professional</h3>
                    <p className="text-xl sm:text-2xl font-bold mb-2">₹5,000/mo</p>
                    <p className="text-sm text-gray-600 mb-4">50,000 requests/month</p>
                    <button className="w-full border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">Get Started</button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Enterprise</h3>
                    <p className="text-xl sm:text-2xl font-bold mb-2">Custom</p>
                    <p className="text-sm text-gray-600 mb-4">Unlimited requests</p>
                    <button className="w-full border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">Contact Sales</button>
                  </div>
                </div>
              </section>
            </>
          )}

          <section className="pt-8 border-t border-gray-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Get Started</h2>
            <p className="text-sm sm:text-base mb-3 sm:mb-4">
              Ready to integrate? Sign up for a developer account and get your API keys.
            </p>
            <button className="px-6 py-3 border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors font-semibold">
              Sign Up for API Access
            </button>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default APISolution;

