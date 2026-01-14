import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaChartBar, FaDownload, FaWrench, FaClock } from 'react-icons/fa';

const Overview = ({ timeSeriesData, dateRange, activeJobs, EarningsChart, JobsChart }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Performance Overview</h3>
        <button className="btn-outline flex items-center gap-2 text-sm">
          <FaDownload /> Export Report
        </button>
      </div>

      {/* Earnings Chart */}
      <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-6 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-purple-900 mb-1">Earnings Trend</h4>
            <p className="text-2xl font-bold text-purple-900">
              ₹{(timeSeriesData.reduce((sum, d) => sum + d.earnings, 0) / 1000).toFixed(0)}K
            </p>
            <p className="text-sm text-purple-700">Last {dateRange === '7d' ? '7' : dateRange === '30d' ? '30' : '90'} days</p>
          </div>
          <FaChartLine className="text-4xl text-purple-300" />
        </div>
        {EarningsChart && <EarningsChart />}
      </div>

      {/* Jobs Completed Chart */}
      <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 border border-green-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-green-900 mb-1">Jobs Completed</h4>
            <p className="text-2xl font-bold text-green-900">
              {timeSeriesData.reduce((sum, d) => sum + d.completed, 0)}
            </p>
            <p className="text-sm text-green-700">Last {dateRange === '7d' ? '7' : dateRange === '30d' ? '30' : '90'} days</p>
          </div>
          <FaChartBar className="text-4xl text-green-300" />
        </div>
        {JobsChart && <JobsChart />}
      </div>

      {/* Active Jobs */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Active Jobs</h4>
        <div className="space-y-3">
          {activeJobs.length > 0 ? activeJobs.slice(0, 5).map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{job.vehicle}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      job.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      job.status === 'diagnosed' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Service: {job.service}</p>
                  <p className="text-sm text-gray-600 mb-1">Customer: {job.customer}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <FaClock /> {job.time}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => navigate(`/service/job/${job.id}`)}
                    className="btn-primary text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-8 text-gray-500">
              <FaWrench className="text-4xl mx-auto mb-2 text-gray-400" />
              <p>No active jobs at the moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;

