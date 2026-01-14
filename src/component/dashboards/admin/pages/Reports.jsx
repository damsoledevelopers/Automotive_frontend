import React from 'react';
import { FaDownload, FaFilePdf, FaFileExcel, FaChartBar } from 'react-icons/fa';

const Reports = () => {
  const reports = [
    { id: 1, name: 'Sales Report', type: 'PDF', date: '2024-01-15', size: '2.5 MB' },
    { id: 2, name: 'User Analytics', type: 'Excel', date: '2024-01-14', size: '1.8 MB' },
    { id: 3, name: 'Revenue Summary', type: 'PDF', date: '2024-01-13', size: '3.2 MB' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Reports</h2>
        <p className="text-xs text-gray-600 mt-1">Generate and download platform reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              {report.type === 'PDF' ? (
                <FaFilePdf className="text-3xl text-red-600" />
              ) : (
                <FaFileExcel className="text-3xl text-green-600" />
              )}
              <button className="text-blue-600 hover:text-blue-900">
                <FaDownload />
              </button>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">{report.name}</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Type: {report.type}</p>
              <p>Date: {report.date}</p>
              <p>Size: {report.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;

