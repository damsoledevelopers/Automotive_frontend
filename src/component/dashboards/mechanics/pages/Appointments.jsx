import React from 'react';
import { FaCalendar, FaClock, FaPhone } from 'react-icons/fa';

const Appointments = ({ upcomingAppointments }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Appointments</h3>
      <div className="space-y-4">
        {upcomingAppointments.map((appointment) => (
          <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <FaCalendar className="text-primary-600" />
                  <h4 className="font-semibold text-gray-900">{appointment.vehicle}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">Service: {appointment.service}</p>
                <p className="text-sm text-gray-600 mb-1">Customer: {appointment.customer}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <FaClock /> {appointment.date} at {appointment.time}
                  </span>
                 
                </div>
              </div>
              <button className="btn-outline text-sm">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;

