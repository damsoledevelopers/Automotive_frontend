import React from 'react';

const Overview = ({ timeSeriesData, stats }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Shipping Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Performance</h3>
          <p className="text-gray-600">Performance metrics and charts will be displayed here.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Deliveries</h3>
          <p className="text-gray-600">Recent delivery updates will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;

