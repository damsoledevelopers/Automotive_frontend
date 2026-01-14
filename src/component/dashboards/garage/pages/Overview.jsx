import React from 'react';
import { FaChartLine, FaTools, FaClock } from 'react-icons/fa';

const Overview = ({ timeSeriesData, dateRange, stats, activeJobs }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Jobs</h3>
          <div className="space-y-3">
            {activeJobs.slice(0, 5).map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Job #{job.id}</p>
                  <p className="text-sm text-gray-600">{job.status}</p>
                </div>
                <FaTools className="text-blue-600" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Performance</h3>
          <p className="text-gray-600">Performance metrics and charts will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;

