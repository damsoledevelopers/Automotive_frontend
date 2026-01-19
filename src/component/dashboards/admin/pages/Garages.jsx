import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaSearch, FaTools, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const Garages = () => {
  const [view, setView] = useState('list'); // 'list', 'edit', 'view'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGarage, setSelectedGarage] = useState(null);

  const [formData, setFormData] = useState({
    name: '', location: '', status: 'Active'
  });

  const handleAction = (type, garage) => {
    setSelectedGarage(garage);
    if (type === 'edit') {
      setFormData({ ...garage });
      setView('edit');
    } else if (type === 'view') {
      setView('view');
    } else if (type === 'delete') {
      if (window.confirm(`Delete ${garage.name}?`)) {
        alert('Garage deleted');
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert(`Garage "${formData.name}" updated!`);
    setView('list');
  };

  const garages = [
    { id: 1, name: 'Quick Fix Garage', location: 'Mumbai', rating: 4.8, services: 45, status: 'Active' },
    { id: 2, name: 'Premium Auto Service', location: 'Delhi', rating: 4.6, services: 32, status: 'Active' },
    { id: 3, name: 'Express Car Care', location: 'Bangalore', rating: 4.9, services: 67, status: 'Active' },
  ];

  const filteredGarages = garages.filter(garage =>
    !searchTerm || garage.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (view === 'view' && selectedGarage) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900 uppercase">Garage Details</h2>
          <button onClick={() => setView('list')} className="text-gray-500 font-bold hover:text-gray-900">← Back</button>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 flex flex-col md:flex-row gap-8">
          <div className="w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
            <FaTools size={40} />
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="text-3xl font-black text-gray-900">{selectedGarage.name}</h3>
              <div className="flex items-center gap-2 text-gray-500 font-bold mt-1">
                <FaMapMarkerAlt /> {selectedGarage.location}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</p>
                <p className="font-bold text-gray-900">{selectedGarage.status}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rating</p>
                <div className="flex items-center gap-1 font-bold text-gray-900">
                  <FaStar className="text-yellow-500" /> {selectedGarage.rating}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Services</p>
                <p className="font-bold text-gray-900">{selectedGarage.services}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => handleAction('edit', selectedGarage)} className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest hover:bg-blue-700 transition">Update Settings</button>
              <button className="flex-1 py-4 bg-white border border-gray-200 text-gray-900 font-black rounded-2xl uppercase tracking-widest hover:bg-gray-50 transition">Contact Garage</button>
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
          <h2 className="text-2xl font-black text-gray-900 uppercase">Edit Garage</h2>
          <button onClick={() => setView('list')} className="text-gray-500 font-bold hover:text-gray-900">Cancel</button>
        </div>
        <form onSubmit={handleSave} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Garage Name</label>
              <input required type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Location</label>
              <input required type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Status</label>
              <select className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest">Update Garage Profile</button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Garage Management</h2>
        <p className="text-xs text-gray-600 mt-1">Manage registered garages</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search garages..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Garage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Services</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredGarages.map((garage) => (
                <tr key={garage.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        <FaTools />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{garage.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <FaMapMarkerAlt className="text-xs" />
                      {garage.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500 text-xs" />
                      <span className="text-sm font-semibold">{garage.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{garage.services}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {garage.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAction('view', garage)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleAction('edit', garage)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleAction('delete', garage)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <FaTrash className="text-xs" />
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

export default Garages;

