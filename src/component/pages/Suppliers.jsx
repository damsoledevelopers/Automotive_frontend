import React, { useState } from 'react';
import Footer from '../Footer';

const Suppliers = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    productCategory: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Supplier application:', formData);
    alert('Thank you for your interest! We will contact you soon.');
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      productCategory: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">Suppliers Relations</h1>
        
        <div className="space-y-6 sm:space-y-8">
          <section>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">Partner With Us</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Sparelo is always looking for reliable suppliers and manufacturers to expand our product catalog. We value long-term partnerships and offer competitive terms to our suppliers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">Benefits of Partnering</h2>
            <ul className="space-y-3 text-base sm:text-lg text-gray-700">
              <li className="flex items-start">
                <span className="mr-3 text-gray-900">•</span>
                <span>Access to a large customer base across India</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-gray-900">•</span>
                <span>Competitive pricing and payment terms</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-gray-900">•</span>
                <span>Marketing and promotional support</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-gray-900">•</span>
                <span>Efficient order management system</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-gray-900">•</span>
                <span>Regular business reviews and growth opportunities</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">Become a Supplier</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Contact Name</label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Product Category</label>
                <select
                  name="productCategory"
                  value={formData.productCategory}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <option value="">Select Category</option>
                  <option value="engine">Engine Parts</option>
                  <option value="brakes">Brake System</option>
                  <option value="suspension">Suspension</option>
                  <option value="electrical">Electrical Components</option>
                  <option value="body">Body Parts</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors font-semibold"
              >
                Submit Application
              </button>
            </form>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Suppliers;

