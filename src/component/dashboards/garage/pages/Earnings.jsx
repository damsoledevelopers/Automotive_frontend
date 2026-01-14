import React from 'react';

const Earnings = ({ timeSeriesData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Earnings & Payments</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Earnings and payment history will be displayed here.</p>
      </div>
    </div>
  );
};

export default Earnings;

