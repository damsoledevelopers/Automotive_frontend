import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWrench, FaPlus, FaFilter, FaClock } from 'react-icons/fa';

const Jobs = ({ activeJobs }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">All Jobs</h3>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2 text-sm">
            <FaFilter /> Filter
          </button>
          <button className="btn-primary flex items-center gap-2 text-sm">
            <FaPlus /> New Job
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {activeJobs.length > 0 ? activeJobs.map((job) => (
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
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <FaClock /> {job.time}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => navigate(`/service/job/${job.id}`)}
                  className="btn-primary text-sm"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-8 text-gray-500">
            <FaWrench className="text-4xl mx-auto mb-2 text-gray-400" />
            <p>No jobs available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;

