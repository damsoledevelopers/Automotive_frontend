import React from 'react';
import { FaDownload, FaFilePdf, FaFileExcel, FaChartBar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Reports = () => {
  const reports = [
    { id: 1, name: 'Sales Report', type: 'PDF', date: '2024-01-15', size: '2.5 MB' },
    { id: 2, name: 'User Analytics', type: 'Excel', date: '2024-01-14', size: '1.8 MB' },
    { id: 3, name: 'Revenue Summary', type: 'PDF', date: '2024-01-13', size: '3.2 MB' },
  ];

  const handleDownload = (report) => {
    try {
      let content = '';
      let mimeType = '';
      let fileExtension = '';

      if (report.type === 'PDF') {
        // Generate PDF-like content (HTML that can be converted to PDF)
        content = `
<!DOCTYPE html>
<html>
<head>
  <title>${report.name}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
    .header { margin-bottom: 30px; }
    .section { margin: 20px 0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    th { background-color: #f2f2f2; font-weight: bold; }
    .footer { margin-top: 40px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${report.name}</h1>
    <p><strong>Generated Date:</strong> ${report.date}</p>
    <p><strong>Report Type:</strong> ${report.type}</p>
  </div>
  
  <div class="section">
    <h2>Executive Summary</h2>
    <p>This report contains comprehensive data and analytics for ${report.name.toLowerCase()}.</p>
    <p>Report generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}.</p>
  </div>

  <div class="section">
    <h2>Key Metrics</h2>
    <table>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Value</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Total Revenue</td>
          <td>₹1,250,000</td>
          <td>+15.2%</td>
        </tr>
        <tr>
          <td>Total Orders</td>
          <td>1,450</td>
          <td>+8.5%</td>
        </tr>
        <tr>
          <td>Active Users</td>
          <td>3,200</td>
          <td>+12.3%</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="footer">
    <p>This is an automatically generated report. For questions, please contact support.</p>
    <p>© ${new Date().getFullYear()} Automotive Platform. All rights reserved.</p>
  </div>
</body>
</html>
        `;
        mimeType = 'text/html';
        fileExtension = 'html';
      } else if (report.type === 'Excel') {
        // Generate CSV content (Excel-compatible)
        content = `${report.name}\n`;
        content += `Generated: ${report.date}\n\n`;
        content += 'Metric,Value,Change,Status\n';
        content += 'Total Revenue,₹1,250,000,+15.2%,Positive\n';
        content += 'Total Orders,1,450,+8.5%,Positive\n';
        content += 'Active Users,3,200,+12.3%,Positive\n';
        content += 'Average Order Value,₹862.07,+6.2%,Positive\n';
        content += 'Customer Retention Rate,78.5%,+4.1%,Positive\n';
        content += 'Conversion Rate,3.2%,+0.5%,Positive\n';
        content += 'Total Products,5,800,+12.0%,Positive\n';
        content += 'Active Vendors,245,+8.0%,Positive\n';
        mimeType = 'text/csv;charset=utf-8;';
        fileExtension = 'csv';
      }

      // Create blob and download
      const blob = new Blob([content], { type: mimeType });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${report.name.replace(/\s+/g, '_')}_${report.date}.${fileExtension}`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`${report.name} downloaded successfully!`);
    } catch (error) {
      console.error('Failed to download report:', error);
      toast.error('Failed to download report: ' + error.message);
    }
  };

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
              <button 
                onClick={() => handleDownload(report)}
                className="text-blue-600 hover:text-blue-900 transition-colors p-2 hover:bg-blue-50 rounded-lg"
                title={`Download ${report.name}`}
              >
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

