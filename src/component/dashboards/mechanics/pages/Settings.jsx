import React, { useState } from 'react';
import {
  FaSave,
  FaUser,
  FaClock,
  FaBell,
  FaEnvelope,
  FaCertificate,
  FaMapMarkerAlt,
  FaPhone,
  FaTools,
  FaCalendar
} from 'react-icons/fa';

const Settings = () => {
  const [settings, setSettings] = useState({
    profile: {
      name: 'John Mechanic',
      email: 'mechanic@example.com',
      phone: '+91 98765 43210',
      address: '123 Garage Street, Mumbai',
      specialization: 'Engine & Transmission',
      experience: '10 years',
    },
    availability: {
      monday: { available: true, start: '09:00', end: '18:00' },
      tuesday: { available: true, start: '09:00', end: '18:00' },
      wednesday: { available: true, start: '09:00', end: '18:00' },
      thursday: { available: true, start: '09:00', end: '18:00' },
      friday: { available: true, start: '09:00', end: '18:00' },
      saturday: { available: true, start: '10:00', end: '16:00' },
      sunday: { available: false, start: '09:00', end: '18:00' },
    },
    certifications: [
      { name: 'ASE Certified', number: 'ASE-12345', expiry: '2025-12-31' },
      { name: 'Engine Specialist', number: 'ENG-67890', expiry: '2026-06-30' },
    ],
    notifications: {
      newJob: true,
      appointmentReminder: true,
      paymentReceived: true,
    },
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Mechanic Settings</h3>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <FaSave /> Save Changes
        </button>
      </div>

      {/* Profile Information */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaUser className="text-blue-600 text-xl" />
          <h4 className="font-semibold text-gray-900 text-lg">Profile Information</h4>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={settings.profile.name}
                onChange={(e) => setSettings({
                  ...settings,
                  profile: { ...settings.profile, name: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={settings.profile.email}
                onChange={(e) => setSettings({
                  ...settings,
                  profile: { ...settings.profile, email: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={settings.profile.phone}
                onChange={(e) => setSettings({
                  ...settings,
                  profile: { ...settings.profile, phone: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <input
                type="text"
                value={settings.profile.specialization}
                onChange={(e) => setSettings({
                  ...settings,
                  profile: { ...settings.profile, specialization: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={settings.profile.address}
              onChange={(e) => setSettings({
                ...settings,
                profile: { ...settings.profile, address: e.target.value }
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaClock className="text-green-600 text-xl" />
          <h4 className="font-semibold text-gray-900 text-lg">Working Hours</h4>
        </div>
        <div className="space-y-3">
          {days.map((day) => (
            <div key={day} className="flex items-center gap-4">
              <div className="w-24">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.availability[day].available}
                    onChange={(e) => setSettings({
                      ...settings,
                      availability: {
                        ...settings.availability,
                        [day]: { ...settings.availability[day], available: e.target.checked }
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700 capitalize">{day}</span>
                </label>
              </div>
              {settings.availability[day].available && (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="time"
                    value={settings.availability[day].start}
                    onChange={(e) => setSettings({
                      ...settings,
                      availability: {
                        ...settings.availability,
                        [day]: { ...settings.availability[day], start: e.target.value }
                      }
                    })}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    value={settings.availability[day].end}
                    onChange={(e) => setSettings({
                      ...settings,
                      availability: {
                        ...settings.availability,
                        [day]: { ...settings.availability[day], end: e.target.value }
                      }
                    })}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaCertificate className="text-purple-600 text-xl" />
          <h4 className="font-semibold text-gray-900 text-lg">Certifications</h4>
        </div>
        <div className="space-y-4">
          {settings.certifications.map((cert, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certification Name</label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => {
                      const newCerts = [...settings.certifications];
                      newCerts[index].name = e.target.value;
                      setSettings({ ...settings, certifications: newCerts });
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Number</label>
                  <input
                    type="text"
                    value={cert.number}
                    onChange={(e) => {
                      const newCerts = [...settings.certifications];
                      newCerts[index].number = e.target.value;
                      setSettings({ ...settings, certifications: newCerts });
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="date"
                    value={cert.expiry}
                    onChange={(e) => {
                      const newCerts = [...settings.certifications];
                      newCerts[index].expiry = e.target.value;
                      setSettings({ ...settings, certifications: newCerts });
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
          <button className="btn-outline text-sm">
            + Add Certification
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaBell className="text-orange-600 text-xl" />
          <h4 className="font-semibold text-gray-900 text-lg">Notification Preferences</h4>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">New Job Alerts</label>
              <p className="text-xs text-gray-500">Get notified when a new job is assigned</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.newJob}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, newJob: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">Appointment Reminders</label>
              <p className="text-xs text-gray-500">Get reminded before appointments</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.appointmentReminder}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, appointmentReminder: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Notifications</label>
              <p className="text-xs text-gray-500">Get notified when payment is received</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.paymentReceived}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, paymentReceived: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
