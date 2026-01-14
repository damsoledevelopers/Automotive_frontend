import React, { useState } from 'react';
import { FaDownload, FaFilePdf, FaChartLine, FaBuilding, FaEnvelope, FaPhone } from 'react-icons/fa';
import Footer from '../Footer';

const InvestorRelations = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const financialReports = [
    {
      id: 1,
      title: 'Annual Report 2023',
      type: 'Annual',
      year: '2023',
      date: '2024-01-15',
      size: '2.5 MB',
      description: 'Complete annual financial report including financial statements, management discussion, and analysis.'
    },
    {
      id: 2,
      title: 'Q4 2023 Quarterly Report',
      type: 'Quarterly',
      year: '2023',
      date: '2024-01-10',
      size: '1.8 MB',
      description: 'Fourth quarter financial results and business highlights.'
    },
    {
      id: 3,
      title: 'Q3 2023 Quarterly Report',
      type: 'Quarterly',
      year: '2023',
      date: '2023-10-05',
      size: '1.7 MB',
      description: 'Third quarter financial results and operational updates.'
    },
    {
      id: 4,
      title: 'Q2 2023 Quarterly Report',
      type: 'Quarterly',
      year: '2023',
      date: '2023-07-12',
      size: '1.6 MB',
      description: 'Second quarter financial performance and strategic initiatives.'
    }
  ];

  const keyMetrics = [
    { label: 'Revenue Growth', value: '35%', period: 'YoY' },
    { label: 'Customer Base', value: '500K+', period: 'Active' },
    { label: 'Market Share', value: '12%', period: 'India' },
    { label: 'Orders Delivered', value: '1M+', period: '2023' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'reports', label: 'Financial Reports' },
    { id: 'governance', label: 'Governance' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Investor Relations
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Committed to transparency and maintaining strong relationships with our investors.
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {keyMetrics.map((metric, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-xs sm:text-sm text-gray-600 mb-1">{metric.label}</div>
              <div className="text-xs text-gray-500">{metric.period}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
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
            <div className="space-y-8">
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Welcome Investors</h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                  Sparelo is committed to transparency and maintaining strong relationships with our investors. 
                  This section provides comprehensive information about our company's financial performance, 
                  corporate governance, and strategic initiatives.
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  We believe in creating long-term value for our shareholders through sustainable growth, 
                  operational excellence, and strategic investments in technology and market expansion.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Company Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <FaChartLine className="text-2xl text-gray-400" />
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">Strong Growth</h3>
                    </div>
                    <p className="text-gray-700">
                      Consistent revenue growth driven by expanding customer base and market penetration.
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <FaBuilding className="text-2xl text-gray-400" />
                      <h3 className="text-lg font-semibold text-gray-900">Market Leadership</h3>
                    </div>
                    <p className="text-gray-700">
                      Leading position in the online automotive spare parts market in India.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Financial Reports</h2>
              {financialReports.map((report) => (
                <div
                  key={report.id}
                  className="border border-gray-200 rounded-lg p-5 sm:p-6 hover:border-gray-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FaFilePdf className="text-gray-400" />
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">{report.title}</h3>
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {report.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{report.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>Date: {new Date(report.date).toLocaleDateString()}</span>
                        <span>Size: {report.size}</span>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <FaDownload />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'governance' && (
            <div className="space-y-8">
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Corporate Governance</h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                  We maintain the highest standards of corporate governance and ethical business practices. 
                  Our board of directors and management team are committed to creating long-term value for our shareholders.
                </p>
              </section>

              <section>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Board of Directors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: 'Rajesh Kumar', role: 'Chairman & CEO' },
                    { name: 'Priya Sharma', role: 'Independent Director' },
                    { name: 'Amit Patel', role: 'Independent Director' },
                    { name: 'Sneha Reddy', role: 'CFO & Director' }
                  ].map((director, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-1">{director.name}</h4>
                      <p className="text-sm text-gray-600">{director.role}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Governance Policies</h3>
                <div className="space-y-3">
                  {[
                    'Code of Conduct and Ethics',
                    'Whistleblower Policy',
                    'Board Diversity Policy',
                    'Risk Management Framework'
                  ].map((policy, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900">{policy}</h4>
                      <button className="mt-2 text-sm text-gray-600 hover:text-gray-900">
                        View Policy →
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-8">
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Contact Investor Relations</h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                  For investor inquiries, please contact our Investor Relations team.
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <FaEnvelope className="text-xl text-gray-400" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Email</h3>
                  </div>
                  <a href="mailto:investors@sparelo.com" className="text-gray-700 hover:text-gray-900">
                    investors@sparelo.com
                  </a>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <FaPhone className="text-xl text-gray-400" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Phone</h3>
                  </div>
                  <a href="tel:+919876543211" className="text-gray-700 hover:text-gray-900">
                    +91 98765 43211
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InvestorRelations;

