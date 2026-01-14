import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaTag, FaCalendar, FaChartLine } from 'react-icons/fa';

const Marketing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCampaignModal, setShowCampaignModal] = useState(false);

  const campaigns = [
    { id: 1, name: 'Summer Sale 2024', code: 'SUMMER24', discount: '20%', status: 'Active', startDate: '2024-01-01', endDate: '2024-01-31', usage: 1245, revenue: '₹2.5M' },
    { id: 2, name: 'New Year Discount', code: 'NEWYEAR24', discount: '15%', status: 'Active', startDate: '2024-01-01', endDate: '2024-01-15', usage: 890, revenue: '₹1.8M' },
    { id: 3, name: 'Flash Sale', code: 'FLASH50', discount: '50%', status: 'Expired', startDate: '2023-12-20', endDate: '2023-12-25', usage: 2340, revenue: '₹4.2M' },
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    return !searchTerm || 
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.code.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Marketing & Promotion Management</h2>
          <p className="text-xs text-gray-600 mt-1">Create and manage promotional campaigns</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2 text-sm">
            <FaDownload /> Export
          </button>
          <button 
            onClick={() => setShowCampaignModal(true)}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <FaPlus /> Create Campaign
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-green-700 mb-1">Active Campaigns</p>
          <p className="text-xl font-bold text-green-900">{campaigns.filter(c => c.status === 'Active').length}</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-700 mb-1">Total Usage</p>
          <p className="text-xl font-bold text-blue-900">{campaigns.reduce((sum, c) => sum + c.usage, 0).toLocaleString()}</p>
        </div>
        <div className="bg-purple-100 rounded-lg p-4 border border-purple-200">
          <p className="text-sm text-purple-700 mb-1">Total Revenue</p>
          <p className="text-xl font-bold text-purple-900">₹8.5M</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                        <FaTag />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{campaign.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm font-mono">
                      {campaign.code}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">{campaign.discount}</td>
                  <td className="px-6 py-4 text-xs text-gray-600">
                    {campaign.startDate} to {campaign.endDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{campaign.usage.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{campaign.revenue}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View Analytics">
                        <FaChartLine />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="Edit">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Marketing;

