import React, { useState } from 'react';
import { FaEye, FaSearch, FaFilter, FaDownload, FaComments, FaUser, FaClock, FaCheckCircle } from 'react-icons/fa';

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = [
    { id: 1, ticketId: 'TKT-001', customer: 'John Doe', subject: 'Order not delivered', status: 'Open', priority: 'High', assignedTo: 'Agent 1', createdAt: '2024-01-15', updatedAt: '2024-01-15' },
    { id: 2, ticketId: 'TKT-002', customer: 'Jane Smith', subject: 'Product quality issue', status: 'In Progress', priority: 'Medium', assignedTo: 'Agent 2', createdAt: '2024-01-14', updatedAt: '2024-01-15' },
    { id: 3, ticketId: 'TKT-003', customer: 'Bob Johnson', subject: 'Refund request', status: 'Resolved', priority: 'Low', assignedTo: 'Agent 1', createdAt: '2024-01-13', updatedAt: '2024-01-14' },
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = !searchTerm || 
      ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status.toLowerCase() === statusFilter.toLowerCase().replace(' ', '');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Customer Support Management</h2>
          <p className="text-xs text-gray-600 mt-1">Respond to queries and manage support tickets</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2 text-sm">
            <FaFilter /> Filter
          </button>
          <button className="btn-outline flex items-center gap-2 text-sm">
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-700 mb-1">Open Tickets</p>
          <p className="text-xl font-bold text-blue-900">{tickets.filter(t => t.status === 'Open').length}</p>
        </div>
        <div className="bg-yellow-100 rounded-lg p-4 border border-yellow-200">
          <p className="text-sm text-yellow-700 mb-1">In Progress</p>
          <p className="text-xl font-bold text-yellow-900">{tickets.filter(t => t.status === 'In Progress').length}</p>
        </div>
        <div className="bg-green-100 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-green-700 mb-1">Resolved</p>
          <p className="text-xl font-bold text-green-900">{tickets.filter(t => t.status === 'Resolved').length}</p>
        </div>
        <div className="bg-purple-100 rounded-lg p-4 border border-purple-200">
          <p className="text-sm text-purple-700 mb-1">Total Tickets</p>
          <p className="text-xl font-bold text-purple-900">{tickets.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
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
              {filteredTickets.map((ticket) => (
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
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">{ticket.createdAt}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setSelectedTicket(ticket)}
                      className="text-blue-600 hover:text-blue-900" 
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Support;

