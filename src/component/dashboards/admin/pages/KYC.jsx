import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaEye, FaSearch, FaUserShield } from 'react-icons/fa';

const KYC = () => {
  const [statusFilter, setStatusFilter] = useState('all');

  const kycRequests = [
    { id: 1, user: 'John Doe', type: 'Vendor', status: 'Pending', submittedDate: '2024-01-15', documents: 3 },
    { id: 2, user: 'Jane Smith', type: 'Mechanic', status: 'Approved', submittedDate: '2024-01-14', documents: 2 },
    { id: 3, user: 'Bob Johnson', type: 'Vendor', status: 'Rejected', submittedDate: '2024-01-13', documents: 3 },
  ];

  const filteredRequests = kycRequests.filter(req => 
    statusFilter === 'all' || req.status.toLowerCase() === statusFilter.toLowerCase()
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">KYC Management</h2>
        <p className="text-xs text-gray-600 mt-1">Review and verify user KYC documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-100 rounded-lg p-4 border border-yellow-200">
          <p className="text-sm text-yellow-700 mb-1">Pending</p>
          <p className="text-xl font-bold text-yellow-900">{kycRequests.filter(r => r.status === 'Pending').length}</p>
        </div>
        <div className="bg-green-100 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-green-700 mb-1">Approved</p>
          <p className="text-xl font-bold text-green-900">{kycRequests.filter(r => r.status === 'Approved').length}</p>
        </div>
        <div className="bg-red-100 rounded-lg p-4 border border-red-200">
          <p className="text-sm text-red-700 mb-1">Rejected</p>
          <p className="text-xl font-bold text-red-900">{kycRequests.filter(r => r.status === 'Rejected').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{req.user}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{req.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{req.documents} files</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      req.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      req.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">{req.submittedDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View Documents">
                        <FaEye />
                      </button>
                      {req.status === 'Pending' && (
                        <>
                          <button className="text-green-600 hover:text-green-900" title="Approve">
                            <FaCheckCircle />
                          </button>
                          <button className="text-red-600 hover:text-red-900" title="Reject">
                            <FaTimesCircle />
                          </button>
                        </>
                      )}
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

export default KYC;

