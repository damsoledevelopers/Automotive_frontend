import React, { useState, useMemo } from 'react';
import { FaEye, FaEdit, FaTrash, FaTools, FaSearch, FaStar, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Mechanics = () => {
    const [view, setView] = useState('list'); // 'list', 'edit', 'view'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMechanic, setSelectedMechanic] = useState(null);

    const [formData, setFormData] = useState({
        name: '', email: '', specialization: '', location: '', status: 'Active'
    });

    const mechanics = useMemo(() => [
        { id: 1, name: 'Rajesh Kumar', email: 'rajesh@mechanic.com', specialization: 'Engine Specialist', location: 'Mumbai', rating: 4.9, completedJobs: 145, status: 'Active' },
        { id: 2, name: 'Amit Sharma', email: 'amit@mechanic.com', specialization: 'Brake Expert', location: 'Delhi', rating: 4.8, completedJobs: 98, status: 'Active' },
        { id: 3, name: 'Vikram Singh', email: 'vikram@mechanic.com', specialization: 'Electrical', location: 'Bangalore', rating: 4.7, completedJobs: 210, status: 'Suspended' },
    ], []);

    const filteredMechanics = mechanics.filter(m =>
        !searchTerm || m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAction = (type, mechanic) => {
        setSelectedMechanic(mechanic);
        if (type === 'view') {
            setView('view');
        } else if (type === 'edit') {
            setFormData({ ...mechanic });
            setView('edit');
        } else if (type === 'delete') {
            if (window.confirm(`Are you sure you want to remove ${mechanic.name}?`)) {
                alert('Mechanic removed from platform');
            }
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        alert(`Mechanic "${formData.name}" profile updated!`);
        setView('list');
    };

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
                            <div className="flex items-center gap-2 text-blue-600 font-black uppercase text-xs mt-2 tracking-widest">
                                {selectedMechanic.specialization}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rating</p>
                                <div className="flex items-center gap-1 font-bold text-gray-900">
                                    <FaStar className="text-yellow-500" /> {selectedMechanic.rating}
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Completed</p>
                                <p className="font-bold text-gray-900">{selectedMechanic.completedJobs} Jobs</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</p>
                                <p className="font-bold text-gray-900 uppercase">{selectedMechanic.status}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</p>
                                <p className="font-bold text-gray-900">{selectedMechanic.location}</p>
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

    if (view === 'edit') {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-900 uppercase">Edit Mechanic Profile</h2>
                    <button onClick={() => setView('list')} className="text-gray-500 font-bold hover:text-gray-900">Cancel</button>
                </div>
                <form onSubmit={handleSave} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Mechanic Name</label>
                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                            <input required type="email" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Specialization</label>
                            <input required type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.specialization} onChange={e => setFormData({ ...formData, specialization: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
                            <select className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold uppercase tracking-widest" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest shadow-lg shadow-blue-500/20">Update Mechanic Account</button>
                </form>
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
                <button className="px-6 py-3 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest shadow-lg shadow-blue-500/20">Add Mechanic</button>
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

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Mechanic</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Specialization</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Performance</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredMechanics.map((mechanic) => (
                                <tr key={mechanic.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white shadow-sm">
                                                <FaTools />
                                            </div>
                                            <div>
                                                <span className="text-sm font-black text-gray-900 block">{mechanic.name}</span>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase">{mechanic.location}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-md">{mechanic.specialization}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 font-bold text-gray-900 text-sm">
                                            <FaStar className="text-yellow-500 text-xs" /> {mechanic.rating}
                                            <span className="text-[10px] text-gray-400 font-medium ml-2 uppercase">({mechanic.completedJobs} Jobs)</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest ${mechanic.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {mechanic.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => handleAction('view', mechanic)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View Detail"><FaEye /></button>
                                            <button onClick={() => handleAction('edit', mechanic)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="Edit Profile"><FaEdit /></button>
                                            <button onClick={() => handleAction('delete', mechanic)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Remove"><FaTrash /></button>
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

export default Mechanics;
