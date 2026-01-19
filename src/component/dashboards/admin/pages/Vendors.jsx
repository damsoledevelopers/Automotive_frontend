import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaSearch, FaDownload, FaStore, FaStar } from 'react-icons/fa';

const Vendors = ({ topVendors }) => {
  const [view, setView] = useState('list'); // 'list', 'edit', 'view'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState(null);

  const [formData, setFormData] = useState({
    name: '', email: '', status: 'active', commission: '', registrationDate: ''
  });

  const handleAction = (type, vendor) => {
    setSelectedVendor(vendor);
    if (type === 'edit') {
      setFormData({ ...vendor });
      setView('edit');
    } else if (type === 'view') {
      setView('view');
    } else if (type === 'delete') {
      if (window.confirm(`Are you sure you want to delete ${vendor.name}?`)) {
        alert('Vendor deleted successfully');
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert(`Vendor "${formData.name}" updated successfully!`);
    setView('list');
  };

  const vendors = topVendors || [
    { id: 1, name: 'Auto Parts Hub', email: 'contact@autopartshub.com', orders: 1234, revenue: '₹2.5M', rating: 4.8, status: 'active', commission: '12%', registrationDate: '2023-01-15' },
    { id: 2, name: 'Premium Spares', email: 'info@premiumspares.com', orders: 987, revenue: '₹1.9M', rating: 4.7, status: 'active', commission: '10%', registrationDate: '2023-02-20' },
    { id: 3, name: 'Quick Auto Solutions', email: 'sales@quickauto.com', orders: 756, revenue: '₹1.5M', rating: 4.6, status: 'pending', commission: '15%', registrationDate: '2024-01-10' },
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = !searchTerm ||
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (view === 'view' && selectedVendor) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900 uppercase">Vendor Profile</h2>
          <button onClick={() => setView('list')} className="text-gray-500 font-bold hover:text-gray-900">← Back</button>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 flex flex-col md:flex-row gap-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
            <FaStore size={40} />
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="text-3xl font-black text-gray-900">{selectedVendor.name}</h3>
              <p className="text-gray-500 font-bold">{selectedVendor.email}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase">Status</p>
                <p className="font-bold text-gray-900">{selectedVendor.status}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase">Revenue</p>
                <p className="font-bold text-gray-900">{selectedVendor.revenue}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase">Commission</p>
                <p className="font-bold text-gray-900">{selectedVendor.commission}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase">Joined</p>
                <p className="font-bold text-gray-900">{selectedVendor.registrationDate}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => handleAction('edit', selectedVendor)} className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">Edit Profile</button>
              <button className="flex-1 py-4 bg-white border border-gray-200 text-gray-900 font-black rounded-2xl uppercase tracking-widest hover:bg-gray-50 transition">Message Vendor</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'edit') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900 uppercase">Edit Vendor</h2>
          <button onClick={() => setView('list')} className="text-gray-500 font-bold hover:text-gray-900">Cancel</button>
        </div>
        <form onSubmit={handleSave} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Vendor Name</label>
              <input required type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</label>
              <input required type="email" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Commission (%)</label>
              <input required type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.commission} onChange={e => setFormData({ ...formData, commission: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Status</label>
              <select className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest">Update Vendor Account</button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Vendor Management</h2>
          <p className="text-xs text-gray-600 mt-1">Approve and manage vendor registrations</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2 text-sm">
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending Approval</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                        <FaStore />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{vendor.name}</p>
                        <p className="text-xs text-gray-500">{vendor.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{vendor.orders}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{vendor.revenue}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500 text-xs" />
                      <span className="text-sm font-semibold">{vendor.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{vendor.commission}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${vendor.status === 'active' ? 'bg-green-100 text-green-800' :
                      vendor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAction('view', vendor)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleAction('edit', vendor)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleAction('delete', vendor)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete"
                      >
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

export default Vendors;

