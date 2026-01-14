import React, { useState } from 'react';

export const Document = () => {
  const [documentType, setDocumentType] = useState('All Documents');
  const [itemsPerPage, setItemsPerPage] = useState('10 per page');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleApply = () => {
    console.log({ documentType, itemsPerPage, fromDate, toDate });
  };

  const handleExport = () => {
    console.log('Exporting data...');
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between h-full mb-3 sm:mb-4 md:mb-8 px-3 sm:px-6 md:px-10 py-3 sm:py-4 md:py-10 pb-1.5 sm:pb-2 md:pb-3">
        <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-800 mb-1.5 sm:mb-2 md:mb-0">
          <span className="text-red-500">Documents</span>
        </h1>
      
      </div>

      {/* Filters Section */}
      <div className="p-2 sm:p-2.5 md:p-4 bg-white rounded-lg shadow-md mx-2 sm:mx-3 md:mx-0">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-4 mb-3 sm:mb-4 md:mb-6">
          {/* Document Type Dropdown */}
          <div className="relative w-full sm:w-auto">
            <select
              className="block w-full bg-white border border-gray-300 hover:border-gray-400 px-2 sm:px-3 md:px-6 py-1.5 sm:py-2 pr-5 sm:pr-6 md:pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-[10px] sm:text-xs md:text-base"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option>All Documents</option>
              <option>Invoices</option>
              <option>Credit Notes</option>
              <option>Debit Notes</option>
            </select>
          </div>

          {/* Items per page Dropdown */}
          <div className="relative w-full sm:w-auto">
            <select
              className="block w-full bg-white border border-gray-300 hover:border-gray-400 px-2 sm:px-3 md:px-6 py-1.5 sm:py-2 pr-5 sm:pr-6 md:pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-[10px] sm:text-xs md:text-base"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value)}
            >
              <option>10 per page</option>
              <option>20 per page</option>
              <option>50 per page</option>
              <option>100 per page</option>
            </select>
          </div>

          {/* From Date Input */}
          <div className="flex items-center border border-gray-300 rounded shadow w-full sm:w-auto">
            <input
              type="date"
              className="px-2 sm:px-3 md:px-6 py-1.5 sm:py-2 focus:outline-none text-[10px] sm:text-xs md:text-base w-full"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          {/* To Date Input */}
          <div className="flex items-center border border-gray-300 rounded shadow w-full sm:w-auto">
            <input
              type="date"
              className="px-2 sm:px-3 md:px-6 py-1.5 sm:py-2 focus:outline-none text-[10px] sm:text-xs md:text-base w-full"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          {/* Apply Button */}
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 md:px-10 rounded shadow focus:outline-none focus:shadow-outline text-[10px] sm:text-xs md:text-base w-full sm:w-auto"
            onClick={handleApply}
          >
            Apply
          </button>

          {/* Export Button */}
          <button
            className="border border-gray-300 hover:bg-sky-500 hover:text-white text-black py-1.5 sm:py-2 px-3 sm:px-4 md:px-6 rounded shadow focus:outline-none focus:shadow-outline ml-auto sm:ml-0 text-[10px] sm:text-xs md:text-base w-full sm:w-auto"
            onClick={handleExport}
          >
            Export
          </button>
        </div>

        <div className="bg-gray-100 p-2 sm:p-3 md:p-4 text-center text-gray-600 font-bold border-solid rounded text-[10px] sm:text-xs md:text-base">
          No items found
        </div>
      </div>
    </div>
  );
};
