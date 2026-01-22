import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaSearch, FaTools, FaMapMarkerAlt, FaStar, FaPlus, FaSpinner } from 'react-icons/fa';
import { mechanicGarageService } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const Garages = () => {
  const [view, setView] = useState('list'); // 'list', 'add', 'edit', 'view'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '', email: '', location: '', phone: '', password: '', status: 'Active'
  });

  // Fetch garages from API
  useEffect(() => {
    fetchGarages();
  }, []);

  const fetchGarages = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (searchTerm) {
        filters.search = searchTerm;
      }
      const result = await mechanicGarageService.getAllGarages(filters);
      const garagesData = result.garages || result || [];
      setGarages(garagesData);
    } catch (error) {
      console.error('Failed to fetch garages:', error);
      toast.error('Failed to load garages: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Refetch when search term changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (view === 'list') {
        fetchGarages();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const filteredGarages = garages.filter(garage =>
    !searchTerm || garage.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (type, garage) => {
    setSelectedGarage(garage);
    if (type === 'edit') {
      setFormData({
        name: garage.name || '',
        email: garage.email || '',
        location: garage.location || '',
        phone: garage.phone || '',
        password: '', // Don't show existing password
        status: garage.status || 'Active'
      });
      setView('edit');
    } else if (type === 'view') {
      setView('view');
    } else if (type === 'delete') {
      if (window.confirm(`Are you sure you want to delete ${garage.name}?`)) {
        handleDelete(garage.id || garage._id);
      }
    }
  };

  const handleDelete = async (garageId) => {
    try {
      setLoading(true);
      await mechanicGarageService.deleteGarage(garageId);
      toast.success('Garage deleted successfully!');
      fetchGarages();
    } catch (error) {
      console.error('Failed to delete garage:', error);
      toast.error('Failed to delete garage: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      
      if (view === 'add') {
        // Create new garage
        const result = await mechanicGarageService.createGarage(formData);
        const garage = result.garage || result;
        
        // Show password in toast notification (non-blocking)
        if (garage.generatedPassword) {
          toast.success(
            <div>
              <div className="font-bold mb-1">Garage Created Successfully!</div>
              <div className="text-sm">Email: <strong>{garage.email}</strong></div>
              <div className="text-sm">Password: <strong className="font-mono">{garage.generatedPassword}</strong></div>
              <div className="text-xs mt-1 text-gray-600">Share these credentials with the garage</div>
            </div>,
            { 
              autoClose: 10000, // Show for 10 seconds
              position: "top-right"
            }
          );
        } else {
          toast.success('Garage created successfully!');
        }
        
        // Reset form and go back to list (don't block the flow)
        setView('list');
        setFormData({ name: '', email: '', location: '', phone: '', password: '', status: 'Active' });
        setSelectedGarage(null);
        fetchGarages();
        return; // Exit early to prevent duplicate reset
      } else if (view === 'edit' && selectedGarage) {
        // Update existing garage
        const garageId = selectedGarage.id || selectedGarage._id;
        // Only send password if it's provided (not empty)
        const updateData = { ...formData };
        if (!updateData.password || updateData.password.trim() === '') {
          delete updateData.password; // Don't send password if empty - keep existing password
        }
        await mechanicGarageService.updateGarage(garageId, updateData);
        toast.success('Garage updated successfully!');
        
        // Reset form and go back to list
        setView('list');
        setFormData({ name: '', email: '', location: '', phone: '', password: '', status: 'Active' });
        setSelectedGarage(null);
        fetchGarages();
      }
    } catch (error) {
      console.error('Failed to save garage:', error);
      toast.error('Failed to save garage: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddGarage = () => {
    setFormData({ name: '', email: '', location: '', phone: '', password: '', status: 'Active' });
    setSelectedGarage(null);
    setView('add');
  };

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

  if (view === 'add' || view === 'edit') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900 uppercase">{view === 'edit' ? 'Edit Garage' : 'Add New Garage'}</h2>
          <button onClick={() => setView('list')} className="text-gray-500 font-bold hover:text-gray-900">← Back</button>
        </div>


        <form onSubmit={handleSave} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Garage Name *</label>
              <input required type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter garage name" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email *</label>
              <input required type="email" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="garage@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Phone</label>
              <input type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 1234567890" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Location</label>
              <input type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="e.g., Mumbai" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Status</label>
              <select className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Password {view === 'add' ? (formData.password ? '(Custom)' : '(Auto-generated if empty)') : '(Leave empty to keep existing password)'}
              </label>
              <input 
                type="password" 
                className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" 
                value={formData.password} 
                onChange={e => setFormData({ ...formData, password: e.target.value })} 
                placeholder={view === 'add' ? "Leave empty to auto-generate password" : "Leave empty to keep existing password"}
              />
              <p className="text-[10px] text-gray-500 mt-1">
                {view === 'add' 
                  ? "If left empty, a random password will be generated and shown after creation."
                  : "If left empty, the existing password will remain unchanged. Only enter a new password if you want to change it."
                }
              </p>
            </div>
          </div>
          <button type="submit" disabled={saving} className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2">
            {saving && <FaSpinner className="animate-spin" />}
            {view === 'edit' ? 'Update Garage Profile' : 'Create Garage Account'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Garage Management</h2>
          <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Manage registered garages</p>
        </div>
        <button onClick={handleAddGarage} className="px-6 py-3 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 transition active:scale-95 flex items-center gap-2">
          <FaPlus /> Add Garage
        </button>
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

      {loading && (
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="animate-spin text-blue-600 text-3xl" />
        </div>
      )}

      {!loading && filteredGarages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 font-semibold">No garages found</p>
        </div>
      )}

      {!loading && filteredGarages.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Garage</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredGarages.map((garage) => (
                  <tr key={garage.id || garage._id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-sm">
                          <FaTools />
                        </div>
                        <span className="text-sm font-black text-gray-900">{garage.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-gray-700">{garage.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <FaMapMarkerAlt className="text-xs" />
                        <span className="text-xs font-bold">{garage.location || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-gray-700">{garage.phone || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest ${garage.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {garage.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
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
                          disabled={loading}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                          title="Delete"
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
      )}
    </div>
  );
};

export default Garages;

