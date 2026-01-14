import React from 'react';
import { FaStar } from 'react-icons/fa';

const Analytics = ({ jobs, timeSeriesData, stats }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 border border-blue-100">
          <h4 className="font-semibold text-blue-900 mb-2">Total Jobs</h4>
          <p className="text-3xl font-bold text-blue-900 mb-1">
            {jobs.length}
          </p>
          <p className="text-sm text-blue-700">All time</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 border border-green-100">
          <h4 className="font-semibold text-green-900 mb-2">Completion Rate</h4>
          <p className="text-3xl font-bold text-green-900 mb-1">
            {jobs.length > 0 ? Math.round((jobs.filter(j => j.status === 'completed').length / jobs.length) * 100) : 0}%
          </p>
          <p className="text-sm text-green-700">Success rate</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-6 border border-purple-100">
          <h4 className="font-semibold text-purple-900 mb-2">Average Earnings</h4>
          <p className="text-3xl font-bold text-purple-900 mb-1">
            ₹{timeSeriesData.length > 0 ? Math.round(timeSeriesData.reduce((sum, d) => sum + d.earnings, 0) / timeSeriesData.length) : 0}
          </p>
          <p className="text-sm text-purple-700">Per day</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg p-6 border border-orange-100">
          <h4 className="font-semibold text-orange-900 mb-2">Customer Rating</h4>
          <p className="text-3xl font-bold text-orange-900 mb-1">
            {stats.find(s => s.label === 'Avg Rating')?.value || '4.8'}
          </p>
          <p className="text-sm text-orange-700">Average rating</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

