import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaEye, FaSearch, FaUserShield } from 'react-icons/fa';

const KYC = () => {
  const [view, setView] = useState('list'); // 'list', 'details'
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const kycRequests = [
    { id: 1, user: 'John Doe', type: 'Vendor', status: 'Pending', submittedDate: '2024-01-15', documents: 3 },
    { id: 2, user: 'Jane Smith', type: 'Mechanic', status: 'Approved', submittedDate: '2024-01-14', documents: 2 },
    { id: 3, user: 'Bob Johnson', type: 'Vendor', status: 'Rejected', submittedDate: '2024-01-13', documents: 3 },
  ];

  const filteredRequests = kycRequests.filter(req =>
    statusFilter === 'all' || req.status.toLowerCase() === statusFilter.toLowerCase()
  );

  const handleAction = (type, req) => {
    setSelectedRequest(req);
    if (type === 'view') {
      setView('details');
    } else if (type === 'approve') {
      if (window.confirm(`Approve KYC for ${req.user}?`)) {
        alert('KYC Approved');
      }
    } else if (type === 'reject') {
      if (window.confirm(`Reject KYC for ${req.user}?`)) {
        alert('KYC Rejected');
      }
    }
  };

  if (view === 'details' && selectedRequest) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900 uppercase">KYC Verification</h2>
          <button onClick={() => setView('list')} className="text-gray-500 font-bold hover:text-gray-900">← Back</button>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
              <FaUserShield size={32} />
            </div>
            <div>
              <h3 className="text-3xl font-black text-gray-900">{selectedRequest.user}</h3>
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{selectedRequest.type} Account</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Submitted Documents</h4>
              <div className="space-y-3">
                {[1, 2, 3].slice(0, selectedRequest.documents).map(i => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition shadow-sm">
                        <FaEye />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 uppercase tracking-tight">Identity_Proof_{i}.pdf</p>
                        <p className="text-[10px] text-gray-400 font-black tracking-widest uppercase">Verified on Blockchain</p>
                      </div>
                    </div>
                    <button className="text-blue-600 font-black uppercase text-[10px] tracking-widest pr-2 hover:underline">Download</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Verification Status</h4>
              <div className={`p-6 rounded-3xl border-2 border-dashed ${selectedRequest.status === 'Approved' ? 'border-green-200 bg-green-50' :
                  selectedRequest.status === 'Rejected' ? 'border-red-200 bg-red-50' :
                    'border-yellow-200 bg-yellow-50'
                } flex flex-col items-center justify-center text-center gap-4`}>
                <span className={`text-3xl font-black uppercase tracking-tighter ${selectedRequest.status === 'Approved' ? 'text-green-600' :
                    selectedRequest.status === 'Rejected' ? 'text-red-600' :
                      'text-yellow-600'
                  }`}>{selectedRequest.status}</span>
                <p className="text-xs font-bold text-gray-500 max-w-[200px]">Account will be {selectedRequest.status === 'Approved' ? 'unlocked' : 'restricted'} based on this decision.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button onClick={() => handleAction('approve', selectedRequest)} className="flex-1 py-4 bg-green-600 text-white font-black rounded-2xl uppercase tracking-widest hover:bg-green-700 transition shadow-lg shadow-green-500/20">Approve Access</button>
            <button onClick={() => handleAction('reject', selectedRequest)} className="flex-1 py-4 bg-red-600 text-white font-black rounded-2xl uppercase tracking-widest hover:bg-red-700 transition shadow-lg shadow-red-500/20">Reject Request</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
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
                    <span className={`px-2 py-1 text-xs rounded-full ${req.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        req.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                      }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">{req.submittedDate}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleAction('view', req)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View Documents"
                      >
                        <FaEye />
                      </button>
                      {req.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleAction('approve', req)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="Approve"
                          >
                            <FaCheckCircle />
                          </button>
                          <button
                            onClick={() => handleAction('reject', req)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Reject"
                          >
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

