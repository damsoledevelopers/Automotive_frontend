import React, { useState } from 'react';
import { FaGift, FaUsers, FaCalendar, FaTrophy } from 'react-icons/fa';

const LuckyDraw = () => {
  const [activeTab, setActiveTab] = useState('draws');

  const draws = [
    { id: 1, name: 'New Year Lucky Draw', participants: 1250, prize: '₹50,000', status: 'Active', endDate: '2024-01-31' },
    { id: 2, name: 'Festival Special', participants: 890, prize: '₹25,000', status: 'Completed', endDate: '2023-12-25' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Lucky Draw Management</h2>
        <p className="text-xs text-gray-600 mt-1">Manage lucky draw campaigns and winners</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-purple-100 rounded-lg p-4 border border-purple-200">
          <p className="text-sm text-purple-700 mb-1">Active Draws</p>
          <p className="text-xl font-bold text-purple-900">{draws.filter(d => d.status === 'Active').length}</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-700 mb-1">Total Participants</p>
          <p className="text-xl font-bold text-blue-900">{draws.reduce((sum, d) => sum + d.participants, 0).toLocaleString()}</p>
        </div>
        <div className="bg-yellow-100 rounded-lg p-4 border border-yellow-200">
          <p className="text-sm text-yellow-700 mb-1">Total Prizes</p>
          <p className="text-xl font-bold text-yellow-900">₹75,000</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Draw Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participants</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prize</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {draws.map((draw) => (
                <tr key={draw.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FaGift className="text-purple-600" />
                      <span className="text-sm font-semibold text-gray-900">{draw.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{draw.participants.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-yellow-600">{draw.prize}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      draw.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {draw.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">{draw.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LuckyDraw;

