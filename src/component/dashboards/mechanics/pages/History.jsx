import React from 'react';
import { FaCheckCircle, FaDownload, FaFileInvoice, FaStar } from 'react-icons/fa';

const History = ({ jobHistory }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Job History</h3>
        <button className="btn-outline flex items-center gap-2 text-sm">
          <FaDownload /> Export
        </button>
      </div>
      <div className="space-y-3">
        {jobHistory.length > 0 ? jobHistory.map((job) => (
          <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-gray-900">{job.vehicle}</h4>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">Service: {job.service}</p>
                <p className="text-sm text-gray-600 mb-1">Customer: {job.customer}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-gray-500">
                    {job.completedAt ? new Date(job.completedAt).toLocaleString() : 'Recently'}
                  </span>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400 text-xs" />
                    <span className="text-xs text-gray-600">{job.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 mb-1">₹{job.amount.toLocaleString()}</p>
                <button className="btn-outline text-sm">
                  <FaFileInvoice /> Invoice
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-8 text-gray-500">
            <FaCheckCircle className="text-4xl mx-auto mb-2 text-gray-400" />
            <p>No completed jobs yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;

