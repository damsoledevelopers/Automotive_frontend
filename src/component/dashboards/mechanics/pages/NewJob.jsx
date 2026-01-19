import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJob } from '../../../../contexts/JobContext';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';

const NewJob = () => {
    const navigate = useNavigate();
    const { createJob } = useJob();

    const [formData, setFormData] = useState({
        customerName: '',
        customerContactNo: '',
        customerEmail: '',
        contactPreference: 'sms', // sms, email, call
        vehicle: {
            registrationNumber: '',
            make: '',
            model: '',
            year: '',
            kmReading: ''
        },
        dropOffTime: new Date().toISOString().slice(0, 16),
        expectedPickup: '',
        priority: 'normal',
        assignedTeam: '',
        estimatedLaborHours: '',
        symptoms: '',
        media: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newJob = createJob({
            ...formData,
            status: 'draft',
            createdAt: new Date().toISOString(),
            milestones: [{
                type: 'job_created',
                timestamp: new Date().toISOString(),
                description: 'Job Intake Completed - Draft Created'
            }],
            estimate: {
                labor: parseFloat(formData.estimatedLaborHours || 0) * 500, // Assuming 500/hr base
                parts: []
            }
        });

        // Notification Simulation
        alert(`NOTIFICATION SENT TO CUSTOMER (${formData.customerContactNo}): \n"Your car has been checked in. Job card #${newJob.id.toString().slice(-6)} created."`);

        navigate(`/mechanics/dashboard/jobs`);
    };

    const handleVehicleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            vehicle: { ...prev.vehicle, [field]: value }
        }));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
            <div className="flex items-center gap-4 border-b pb-4">
                <button onClick={() => navigate('/mechanics/dashboard/jobs')} className="text-gray-500 hover:text-black">
                    <FaArrowLeft size={20} />
                </button>
                <h2 className="text-2xl font-bold text-gray-900">Vehicle Intake & New Job Card</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Customer & Preferences */}
                <section className="bg-white p-6 border rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">1. Customer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Customer Name *</label>
                            <input
                                required
                                type="text"
                                value={formData.customerName}
                                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                placeholder="Full Name"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contact Number *</label>
                            <input
                                required
                                type="tel"
                                value={formData.customerContactNo}
                                onChange={(e) => setFormData({ ...formData, customerContactNo: e.target.value })}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                placeholder="+91 00000 00000"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                            <input
                                type="email"
                                value={formData.customerEmail}
                                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                placeholder="customer@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contact Preference</label>
                            <select
                                value={formData.contactPreference}
                                onChange={(e) => setFormData({ ...formData, contactPreference: e.target.value })}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            >
                                <option value="sms">SMS / WhatsApp</option>
                                <option value="email">Email</option>
                                <option value="call">Phone Call</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* 2. Vehicle Details */}
                <section className="bg-white p-6 border rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">2. Vehicle Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Registration No. *</label>
                            <input
                                required
                                type="text"
                                value={formData.vehicle.registrationNumber}
                                onChange={(e) => handleVehicleChange('registrationNumber', e.target.value.toUpperCase())}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                placeholder="MH 12 AB 1234"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Make/Model</label>
                            <input
                                type="text"
                                value={`${formData.vehicle.make} ${formData.vehicle.model}`.trim()}
                                onChange={(e) => {
                                    const parts = e.target.value.split(' ');
                                    handleVehicleChange('make', parts[0] || '');
                                    handleVehicleChange('model', parts.slice(1).join(' ') || '');
                                }}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                placeholder="e.g. Maruti Swift"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">KM Reading</label>
                            <input
                                type="number"
                                value={formData.vehicle.kmReading}
                                onChange={(e) => handleVehicleChange('kmReading', e.target.value)}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                placeholder="Current Odometer"
                            />
                        </div>
                    </div>
                </section>

                {/* 3. Drop-off & Planning */}
                <section className="bg-white p-6 border rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">3. Intake & Schedule</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Drop-off Time</label>
                            <input
                                type="datetime-local"
                                value={formData.dropOffTime}
                                onChange={(e) => setFormData({ ...formData, dropOffTime: e.target.value })}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expected Pickup</label>
                            <input
                                type="date"
                                value={formData.expectedPickup}
                                onChange={(e) => setFormData({ ...formData, expectedPickup: e.target.value })}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Assigned Team / Mechanic</label>
                            <input
                                type="text"
                                value={formData.assignedTeam}
                                onChange={(e) => setFormData({ ...formData, assignedTeam: e.target.value })}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                placeholder="e.g. Engine Team A"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Est. Labor Hours</label>
                            <input
                                type="number"
                                value={formData.estimatedLaborHours}
                                onChange={(e) => setFormData({ ...formData, estimatedLaborHours: e.target.value })}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                placeholder="Hours"
                            />
                        </div>
                    </div>
                </section>

                {/* 4. Symptoms & Media */}
                <section className="bg-white p-6 border rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">4. Symptoms & Observations</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Complaint / Symptoms *</label>
                            <textarea
                                required
                                rows={3}
                                value={formData.symptoms}
                                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                placeholder="Describe the issues reported..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Attach Photos / Videos</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 transition-colors cursor-pointer">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="text-sm text-gray-600">Click to upload media of vehicle condition</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Priority</label>
                            <div className="flex gap-4">
                                {['low', 'normal', 'high', 'urgent'].map(p => (
                                    <label key={p} className="flex items-center gap-2 cursor-pointer capitalize">
                                        <input
                                            type="radio"
                                            name="priority"
                                            value={p}
                                            checked={formData.priority === p}
                                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium text-gray-600">{p}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/mechanics/dashboard/jobs')}
                        className="px-6 py-2 border rounded-lg font-semibold text-gray-600 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-md flex items-center gap-2"
                    >
                        Complete Intake <FaCheck />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewJob;
