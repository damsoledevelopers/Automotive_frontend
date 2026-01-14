import React, { useState } from 'react';
import { FaSearch, FaFileInvoice, FaExclamationTriangle } from 'react-icons/fa';

const Fines = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const fines = [
    { id: 1, user: 'Vendor ABC', type: 'Late Delivery', amount: '₹5,000', status: 'Pending', date: '2024-01-15' },
    { id: 2, user: 'Mechanic XYZ', type: 'Service Quality', amount: '₹2,500', status: 'Paid', date: '2024-01-14' },
    { id: 3, user: 'Vendor DEF', type: 'Policy Violation', amount: '₹10,000', status: 'Pending', date: '2024-01-13' },
  ];

  const filteredFines = fines.filter(fine => 
    !searchTerm || fine.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Fines & Penalties</h2>
        <p className="text-xs text-gray-600 mt-1">Manage fines and penalties for users</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-orange-100 rounded-lg p-4 border border-orange-200">
          <p className="text-sm text-orange-700 mb-1">Pending Fines</p>
          <p className="text-xl font-bold text-orange-900">{fines.filter(f => f.status === 'Pending').length}</p>
        </div>
        <div className="bg-green-100 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-green-700 mb-1">Paid Fines</p>
          <p className="text-xl font-bold text-green-900">{fines.filter(f => f.status === 'Paid').length}</p>
        </div>
        <div className="bg-red-100 rounded-lg p-4 border border-red-200">
          <p className="text-sm text-red-700 mb-1">Total Amount</p>
          <p className="text-xl font-bold text-red-900">₹17,500</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search fines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFines.map((fine) => (
                <tr key={fine.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{fine.user}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{fine.type}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-red-600">{fine.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      fine.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {fine.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">{fine.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Fines;

