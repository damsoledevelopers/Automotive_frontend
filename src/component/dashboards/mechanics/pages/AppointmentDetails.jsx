import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaUser, FaCar, FaTools, FaPhone, FaEnvelope, FaCheck, FaTimes } from 'react-icons/fa';

const AppointmentDetails = ({ upcomingAppointments }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [appointment, setAppointment] = useState(null);

    // Extract ID from path
    const appointmentId = location.pathname.split('/').pop();

    useEffect(() => {
        const found = upcomingAppointments.find(a => a.id.toString() === appointmentId.toString());
        if (found) {
            setAppointment(found);
        }
    }, [appointmentId, upcomingAppointments]);

    if (!appointment) {
        return <div className="p-8 text-center text-gray-500">Loading appointment details...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/mechanics/dashboard/appointments')} className="text-gray-500 hover:text-black transition-colors">
                        <FaArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
                        <span className="text-sm text-gray-500">Ref ID: #{appointmentId.slice(-6).toUpperCase()}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                        Reschedule
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-sm">
                        Confirm Appointment
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Status Card */}
                <div className="md:col-span-3 bg-white p-4 border rounded-xl shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-full ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                            <FaCalendarAlt size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</p>
                            <p className="font-bold text-gray-900 capitalize">{appointment.status}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Scheduled For</p>
                        <p className="font-bold text-gray-900">{appointment.date} at {appointment.time}</p>
                    </div>
                </div>

                {/* Patient / Vehicle Column */}
                <div className="md:col-span-2 space-y-6">
                    {/* Customer Info */}
                    <section className="bg-white p-6 border rounded-xl shadow-sm">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
                            <FaUser className="text-blue-500" /> Customer Information
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Customer Name</p>
                                <p className="text-gray-900 font-semibold">{appointment.customer}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Contact Number</p>
                                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                                    <FaPhone size={14} /> <span>+91 98765 43210</span>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <p className="text-xs font-bold text-gray-400 uppercase">Email Address</p>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaEnvelope size={14} /> <span>{appointment.customer.toLowerCase().replace(' ', '.')}@example.com</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Vehicle Info */}
                    <section className="bg-white p-6 border rounded-xl shadow-sm">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
                            <FaCar className="text-purple-500" /> Vehicle Details
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Vehicle</p>
                                <p className="text-gray-900 font-semibold">{appointment.vehicle}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Registration No.</p>
                                <p className="text-gray-900 font-semibold">MH 12 AB 1234</p>
                            </div>
                        </div>
                    </section>

                    {/* Service Info */}
                    <section className="bg-white p-6 border rounded-xl shadow-sm">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
                            <FaTools className="text-orange-500" /> Requested Service
                        </h3>
                        <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg">
                            <p className="text-orange-900 font-bold text-lg">{appointment.service}</p>
                            <p className="text-orange-700 text-sm mt-1">Standard inspection and diagnostics scheduled for this appointment.</p>
                        </div>
                    </section>
                </div>

                {/* Actions / Summary Sidebar */}
                <div className="space-y-6">
                    <section className="bg-white p-5 border rounded-xl shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center gap-3 p-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 border rounded-lg transition">
                                <FaCheck className="text-green-500" /> Accept Appointment
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 border rounded-lg transition">
                                <FaTimes className="text-red-500" /> Cancel Request
                            </button>
                            <div className="pt-4 border-t mt-4">
                                <button
                                    onClick={() => navigate('/mechanics/dashboard/jobs/new')}
                                    className="w-full py-3 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-black transition shadow-md"
                                >
                                    Convert to Job Card
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className="bg-blue-600 p-5 rounded-xl text-white shadow-lg">
                        <h3 className="font-bold mb-2">Technician Note</h3>
                        <p className="text-xs text-blue-100 leading-relaxed">
                            Please ensure the diagnostic bay is clear 15 minutes before the arrival.
                            Confirm availability of the required specialized tools for {appointment.service}.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AppointmentDetails;
