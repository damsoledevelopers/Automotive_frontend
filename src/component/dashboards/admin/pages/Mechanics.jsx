import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaTools, FaSearch, FaStar, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { mechanicGarageService } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const Mechanics = () => {
    const [view, setView] = useState('list'); // 'list', 'edit', 'view'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMechanic, setSelectedMechanic] = useState(null);
    const [mechanics, setMechanics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: '', email: '', specialization: '', location: '', phone: '', password: '', status: 'Active'
    });

    // Fetch mechanics from API
    useEffect(() => {
        fetchMechanics();
    }, []);

    const fetchMechanics = async () => {
        try {
            setLoading(true);
            const filters = {};
            if (searchTerm) {
                filters.search = searchTerm;
            }
            const result = await mechanicGarageService.getAllMechanics(filters);
            const mechanicsData = result.mechanics || result || [];
            setMechanics(mechanicsData);
        } catch (error) {
            console.error('Failed to fetch mechanics:', error);
            toast.error('Failed to load mechanics: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Refetch when search term changes
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (view === 'list') {
                fetchMechanics();
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const filteredMechanics = mechanics.filter(m =>
        !searchTerm || m.name?.toLowerCase().includes(searchTerm.toLowerCase()) || m.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAction = (type, mechanic) => {
        setSelectedMechanic(mechanic);
        if (type === 'view') {
            setView('view');
        } else if (type === 'edit') {
            setFormData({
                name: mechanic.name || '',
                email: mechanic.email || '',
                specialization: mechanic.specialization || '',
                location: mechanic.location || '',
                phone: mechanic.phone || '',
                password: '', // Don't show existing password
                status: mechanic.status || 'Active'
            });
            setView('edit');
        } else if (type === 'delete') {
            if (window.confirm(`Are you sure you want to remove ${mechanic.name}?`)) {
                handleDelete(mechanic.id || mechanic._id);
            }
        }
    };

    const handleDelete = async (mechanicId) => {
        try {
            setLoading(true);
            await mechanicGarageService.deleteMechanic(mechanicId);
            toast.success('Mechanic deleted successfully!');
            fetchMechanics();
        } catch (error) {
            console.error('Failed to delete mechanic:', error);
            toast.error('Failed to delete mechanic: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            
            if (view === 'edit' && selectedMechanic) {
                // Update existing mechanic
                const mechanicId = selectedMechanic.id || selectedMechanic._id;
                // Only send password if it's provided (not empty)
                const updateData = { ...formData };
                if (!updateData.password || updateData.password.trim() === '') {
                    delete updateData.password; // Don't send password if empty - keep existing password
                }
                await mechanicGarageService.updateMechanic(mechanicId, updateData);
                toast.success('Mechanic updated successfully!');
                
                // Reset form and go back to list
                setView('list');
                setFormData({ name: '', email: '', specialization: '', location: '', phone: '', password: '', status: 'Active' });
                setSelectedMechanic(null);
                fetchMechanics();
            }
        } catch (error) {
            console.error('Failed to save mechanic:', error);
            toast.error('Failed to save mechanic: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (view === 'edit') {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-900 uppercase">Edit Mechanic Profile</h2>
                    <button onClick={() => setView('list')} className="text-gray-500 font-bold hover:text-gray-900">← Back</button>
                </div>


                <form onSubmit={handleSave} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Mechanic Name *</label>
                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter mechanic name" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email *</label>
                            <input required type="email" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="mechanic@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Phone</label>
                            <input type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 1234567890" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Specialization</label>
                            <input type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.specialization} onChange={e => setFormData({ ...formData, specialization: e.target.value })} placeholder="e.g., Engine Specialist" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Location</label>
                            <input type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="e.g., Mumbai" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
                            <select className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold uppercase tracking-widest" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                                Password (Leave empty to keep existing password)
                            </label>
                            <input 
                                type="password" 
                                className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" 
                                value={formData.password} 
                                onChange={e => setFormData({ ...formData, password: e.target.value })} 
                                placeholder="Leave empty to keep existing password"
                            />
                            <p className="text-[10px] text-gray-500 mt-1">
                                If left empty, the existing password will remain unchanged. Only enter a new password if you want to change it.
                            </p>
                        </div>
                    </div>
                    <button type="submit" disabled={saving} className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2">
                        {saving && <FaSpinner className="animate-spin" />}
                        Update Mechanic Account
                    </button>
                </form>
            </div>
        );
    }

    if (view === 'view' && selectedMechanic) {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-900 uppercase">Mechanic Profile</h2>
                    <button onClick={() => setView('list')} className="text-gray-500 font-bold hover:text-gray-900">← Back</button>
                </div>
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 flex flex-col md:flex-row gap-8">
                    <div className="w-24 h-24 bg-yellow-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                        <FaTools size={40} />
                    </div>
                    <div className="flex-1 space-y-6">
                        <div>
                            <h3 className="text-3xl font-black text-gray-900">{selectedMechanic.name}</h3>
                            <p className="text-gray-500 font-bold">{selectedMechanic.email}</p>
                            {selectedMechanic.specialization && (
                                <div className="flex items-center gap-2 text-blue-600 font-black uppercase text-xs mt-2 tracking-widest">
                                    {selectedMechanic.specialization}
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone</p>
                                <p className="font-bold text-gray-900">{selectedMechanic.phone || 'N/A'}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</p>
                                <p className="font-bold text-gray-900 uppercase">{selectedMechanic.status || 'Active'}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</p>
                                <p className="font-bold text-gray-900">{selectedMechanic.location || 'N/A'}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</p>
                                <p className="font-bold text-gray-900 text-xs break-all">{selectedMechanic.email}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => handleAction('edit', selectedMechanic)} className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">Edit Mechanic</button>
                            <button className="flex-1 py-4 bg-white border border-gray-200 text-gray-900 font-black rounded-2xl uppercase tracking-widest hover:bg-gray-50 transition">Send Message</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Mechanic Management</h2>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Verify and Manage Field Experts</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100">
                <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search mechanics by name or skill..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-4 focus:ring-blue-500/10 font-bold transition"
                    />
                </div>
            </div>

            {loading && (
                <div className="flex justify-center items-center py-12">
                    <FaSpinner className="animate-spin text-blue-600 text-3xl" />
                </div>
            )}

            {!loading && filteredMechanics.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 font-semibold">No mechanics found</p>
                </div>
            )}

            {!loading && filteredMechanics.length > 0 && (
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Mechanic</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Specialization</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredMechanics.map((mechanic) => (
                                    <tr key={mechanic.id || mechanic._id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white shadow-sm">
                                                    <FaTools />
                                                </div>
                                                <div>
                                                    <span className="text-sm font-black text-gray-900 block">{mechanic.name}</span>
                                                    <span className="text-[10px] font-bold text-gray-400">{mechanic.phone || 'No phone'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-bold text-gray-700">{mechanic.email}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {mechanic.specialization ? (
                                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-md">{mechanic.specialization}</span>
                                            ) : (
                                                <span className="text-xs text-gray-400">N/A</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-bold text-gray-700">{mechanic.location || 'N/A'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest ${mechanic.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {mechanic.status || 'Active'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleAction('view', mechanic)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View Detail"><FaEye /></button>
                                                <button onClick={() => handleAction('edit', mechanic)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="Edit Profile"><FaEdit /></button>
                                                <button onClick={() => handleAction('delete', mechanic)} disabled={loading} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50" title="Remove"><FaTrash /></button>
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

export default Mechanics;

