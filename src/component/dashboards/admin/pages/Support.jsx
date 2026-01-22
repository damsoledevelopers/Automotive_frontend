import React, { useState, useEffect, useMemo } from 'react';
import { FaEye, FaSearch, FaDownload, FaComments, FaUser, FaClock, FaCheckCircle, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Load tickets from localStorage on mount
  useEffect(() => {
    loadTickets();
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadTickets, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadTickets = () => {
    try {
      const savedTickets = localStorage.getItem('supportTickets');
      if (savedTickets) {
        const parsed = JSON.parse(savedTickets);
        setTickets(parsed);
      } else {
        // Initialize with default tickets
        const defaultTickets = [
          { 
            id: 1, 
            ticketId: 'TKT-001', 
            customer: 'John Doe', 
            subject: 'Order not delivered', 
            status: 'Open', 
            priority: 'High', 
            assignedTo: 'Agent 1', 
            createdAt: '2024-01-15', 
            updatedAt: '2024-01-15' 
          },
          { 
            id: 2, 
            ticketId: 'TKT-002', 
            customer: 'Jane Smith', 
            subject: 'Product quality issue', 
            status: 'In Progress', 
            priority: 'Medium', 
            assignedTo: 'Agent 2', 
            createdAt: '2024-01-14', 
            updatedAt: '2024-01-15' 
          },
          { 
            id: 3, 
            ticketId: 'TKT-003', 
            customer: 'Bob Johnson', 
            subject: 'Refund request', 
            status: 'Resolved', 
            priority: 'Low', 
            assignedTo: 'Agent 1', 
            createdAt: '2024-01-13', 
            updatedAt: '2024-01-14' 
          },
        ];
        setTickets(defaultTickets);
        localStorage.setItem('supportTickets', JSON.stringify(defaultTickets));
      }
    } catch (error) {
      console.error('Failed to load tickets:', error);
      toast.error('Failed to load tickets');
    }
  };

  // Calculate real-time stats from tickets
  const ticketStats = useMemo(() => {
    const inProgress = tickets.filter(t => t.status === 'In Progress').length;
    const highPriority = tickets.filter(t => t.priority === 'High').length;
    const total = tickets.length;
    
    return {
      inProgress,
      highPriority,
      total
    };
  }, [tickets]);

  // Fixed status filter - properly handles "In Progress" with space and priority filter
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = !searchTerm || 
        ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Fix: Normalize both values for comparison
      let matchesStatus = true;
      if (statusFilter !== 'all') {
        const ticketStatusNormalized = ticket.status.toLowerCase().replace(/\s+/g, ' ');
        const filterStatusNormalized = statusFilter.toLowerCase().replace(/\s+/g, ' ');
        matchesStatus = ticketStatusNormalized === filterStatusNormalized;
      }
      
      // Priority filter
      let matchesPriority = true;
      if (priorityFilter !== 'all') {
        matchesPriority = ticket.priority.toLowerCase() === priorityFilter.toLowerCase();
      }
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, searchTerm, statusFilter, priorityFilter]);

  // Export tickets to CSV
  const handleExport = () => {
    try {
      setExporting(true);
      
      const dataToExport = filteredTickets.length > 0 ? filteredTickets : tickets;
      
      // Generate CSV content
      let csvContent = 'Support Tickets Report\n';
      csvContent += `Generated: ${new Date().toLocaleString()}\n`;
      csvContent += `Total Tickets: ${dataToExport.length}\n`;
      csvContent += `In Progress: ${ticketStats.inProgress}\n`;
      csvContent += `High Priority: ${ticketStats.highPriority}\n\n`;
      
      // CSV Headers
      csvContent += 'Ticket ID,Customer,Subject,Priority,Assigned To,Status,Created Date,Updated Date\n';
      
      // CSV Data
      dataToExport.forEach(ticket => {
        const ticketId = (ticket.ticketId || '').replace(/,/g, ';');
        const customer = (ticket.customer || '').replace(/,/g, ';');
        const subject = (ticket.subject || '').replace(/,/g, ';');
        const priority = (ticket.priority || 'N/A').replace(/,/g, ';');
        const assignedTo = (ticket.assignedTo || 'N/A').replace(/,/g, ';');
        const status = (ticket.status || 'N/A').replace(/,/g, ';');
        const createdAt = ticket.createdAt || 'N/A';
        const updatedAt = ticket.updatedAt || 'N/A';
        
        csvContent += `${ticketId},${customer},${subject},${priority},${assignedTo},${status},${createdAt},${updatedAt}\n`;
      });
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `support_tickets_report_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`Exported ${dataToExport.length} tickets successfully!`);
    } catch (error) {
      console.error('Failed to export tickets:', error);
      toast.error('Failed to export tickets: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Customer Support Management</h2>
          <p className="text-xs text-gray-600 mt-1">Respond to queries and manage support tickets</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExport}
            disabled={exporting || tickets.length === 0}
            className="bg-white border border-red-500 text-red-500 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-50 transition-colors"
            title="Export tickets to CSV"
          >
            {exporting ? <FaSpinner className="animate-spin" /> : <FaDownload className="text-red-500" />} <span className="text-red-500">Export</span>
          </button>
        </div>
      </div>

      {/* Summary Cards - Real-time Data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-purple-700 mb-1">Total Tickets</p>
              <p className="text-2xl font-bold text-purple-900">
                {ticketStats.total.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FaUser className="text-xl text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-yellow-700 mb-1">In Progress</p>
              <p className="text-2xl font-bold text-yellow-900">
                {ticketStats.inProgress.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <FaComments className="text-xl text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-red-50 rounded-lg p-6 border border-red-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-red-700 mb-1">High Priority</p>
              <p className="text-2xl font-bold text-red-900">
                {ticketStats.highPriority.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="text-xl text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priority</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Loading tickets...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                      No tickets found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{ticket.ticketId}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{ticket.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{ticket.subject}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                          ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{ticket.assignedTo}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                          ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          ticket.status === 'Closed' ? 'bg-gray-100 text-gray-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">{ticket.createdAt}</td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => setSelectedTicket(ticket)}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition" 
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
