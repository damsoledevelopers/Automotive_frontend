import React, { useState } from 'react';
import {
  FaSave,
  FaStore,
  FaCreditCard,
  FaTruck,
  FaBell
} from 'react-icons/fa';

const Settings = () => {
  const [settings, setSettings] = useState({
    store: {
      name: 'My Auto Parts Store',
      description: 'Premium automotive parts and accessories',
      address: '123 Auto Street, Mumbai, Maharashtra 400001',
      phone: '+91 98765 43210',
      email: 'store@example.com',
    },
    payment: {
      bankName: 'State Bank of India',
      accountNumber: '****1234',
      ifsc: 'SBIN0001234',
    },
    shipping: {
      freeShippingThreshold: 5000,
      standardShipping: 200,
      expressShipping: 500,
    },
    notifications: {
      newOrder: true,
      lowStock: true,
      paymentReceived: true,
    },
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Vendor Settings</h3>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <FaSave /> Save Changes
        </button>
      </div>

      {/* Store Information */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaStore className="text-blue-600 text-xl" />
          <h4 className="font-semibold text-gray-900 text-lg">Store Information</h4>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
            <input
              type="text"
              value={settings.store.name}
              onChange={(e) => setSettings({
                ...settings,
                store: { ...settings.store, name: e.target.value }
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={settings.store.description}
              onChange={(e) => setSettings({
                ...settings,
                store: { ...settings.store, description: e.target.value }
              })}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={settings.store.address}
                onChange={(e) => setSettings({
                  ...settings,
                  store: { ...settings.store, address: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={settings.store.phone}
                onChange={(e) => setSettings({
                  ...settings,
                  store: { ...settings.store, phone: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={settings.store.email}
              onChange={(e) => setSettings({
                ...settings,
                store: { ...settings.store, email: e.target.value }
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaCreditCard className="text-green-600 text-xl" />
          <h4 className="font-semibold text-gray-900 text-lg">Payment Settings</h4>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
            <input
              type="text"
              value={settings.payment.bankName}
              onChange={(e) => setSettings({
                ...settings,
                payment: { ...settings.payment, bankName: e.target.value }
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
              <input
                type="text"
                value={settings.payment.accountNumber}
                onChange={(e) => setSettings({
                  ...settings,
                  payment: { ...settings.payment, accountNumber: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
              <input
                type="text"
                value={settings.payment.ifsc}
                onChange={(e) => setSettings({
                  ...settings,
                  payment: { ...settings.payment, ifsc: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Settings */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaTruck className="text-purple-600 text-xl" />
          <h4 className="font-semibold text-gray-900 text-lg">Shipping Settings</h4>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Free Shipping Threshold (₹)</label>
            <input
              type="number"
              value={settings.shipping.freeShippingThreshold}
              onChange={(e) => setSettings({
                ...settings,
                shipping: { ...settings.shipping, freeShippingThreshold: parseInt(e.target.value) }
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Standard Shipping (₹)</label>
              <input
                type="number"
                value={settings.shipping.standardShipping}
                onChange={(e) => setSettings({
                  ...settings,
                  shipping: { ...settings.shipping, standardShipping: parseInt(e.target.value) }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Express Shipping (₹)</label>
              <input
                type="number"
                value={settings.shipping.expressShipping}
                onChange={(e) => setSettings({
                  ...settings,
                  shipping: { ...settings.shipping, expressShipping: parseInt(e.target.value) }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
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
              <label className="block text-sm font-medium text-gray-700">New Order Alerts</label>
              <p className="text-xs text-gray-500">Get notified when a new order is placed</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.newOrder}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, newOrder: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">Low Stock Alerts</label>
              <p className="text-xs text-gray-500">Get notified when inventory is low</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.lowStock}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, lowStock: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Received</label>
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
