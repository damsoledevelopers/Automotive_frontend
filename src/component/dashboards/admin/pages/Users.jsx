import React, { useState, useMemo } from 'react';
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaFilter,
  FaDownload,
  FaSearch,
  FaUser,
  FaStore,
  FaTools,
  FaTag,
  FaBan,
  FaCheckCircle,
  FaTimesCircle,
  FaGift,
  FaShieldAlt,
  FaStar
} from 'react-icons/fa';

const Users = ({ usersData }) => {
  const [view, setView] = useState('list'); // 'list', 'edit', 'view', 'discount'
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  const [formData, setFormData] = useState({
    name: '', email: '', role: 'customer', status: 'Active'
  });

  const handleAction = (type, user) => {
    setSelectedUser(user);
    if (type === 'edit') {
      setFormData({ ...user });
      setView('edit');
    } else if (type === 'view') {
      setView('view');
    } else if (type === 'discount') {
      setView('discount');
    } else if (type === 'delete') {
      if (window.confirm(`Delete ${user.name}?`)) {
        alert('User deleted');
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert(`User "${formData.name}" updated!`);
    setView('list');
  };

  // Enhanced users data with vendors, mechanics, and customers
  const enhancedUsersData = useMemo(() => [
    ...usersData,
    {
      id: usersData.length + 1,
      name: 'Auto Parts Hub',
      email: 'vendor@autopartshub.com',
      role: 'vendor',
      status: 'Active',
      orders: 1245,
      rating: 4.8,
      revenue: '₹45.2L',
      registrationDate: '2023-01-15',
      lastLogin: '2024-01-15 10:30',
      specialDiscount: null,
      privileges: ['product_management', 'order_management']
    },
    {
      id: usersData.length + 2,
      name: 'Rajesh Kumar',
      email: 'rajesh@mechanic.com',
      role: 'mechanics',
      status: 'Active',
      orders: 89,
      rating: 4.9,
      revenue: '₹2.1L',
      registrationDate: '2023-03-20',
      lastLogin: '2024-01-15 09:15',
      specialDiscount: null,
      privileges: ['job_management', 'service_booking']
    },
  ], [usersData]);

  const filteredUsers = useMemo(() => {
    return enhancedUsersData.filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [enhancedUsersData, searchTerm, roleFilter, statusFilter]);

  const getRoleIcon = (role) => {
    switch (role) {
      case 'vendor': return <FaStore className="text-green-600" />;
      case 'mechanics': return <FaTools className="text-blue-600" />;
      default: return <FaUser className="text-gray-600" />;
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      vendor: 'bg-green-100 text-green-800',
      mechanics: 'bg-blue-100 text-blue-800',
      customer: 'bg-purple-100 text-purple-800',
      admin: 'bg-red-100 text-red-800'
    };
    return badges[role] || 'bg-gray-100 text-gray-800';
  };

  if (view === 'view' && selectedUser) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900 uppercase">User Profile</h2>
          <button onClick={() => setView('list')} className="text-gray-500 font-bold hover:text-gray-900">← Back</button>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 flex flex-col md:flex-row gap-8">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg font-black text-3xl">
            {selectedUser.name.charAt(0)}
          </div>
          <div className="flex-1 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-3xl font-black text-gray-900">{selectedUser.name}</h3>
                <p className="text-gray-500 font-bold">{selectedUser.email}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleAction('edit', selectedUser)} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-sm">Edit profile</button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase">Role</p>
                <p className="font-bold text-gray-900 uppercase">{selectedUser.role}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase">Status</p>
                <p className="font-bold text-gray-900 uppercase">{selectedUser.status}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase">Total Orders</p>
                <p className="font-bold text-gray-900">{selectedUser.orders || 0}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase">Registered</p>
                <p className="font-bold text-gray-900">{selectedUser.registrationDate || 'N/A'}</p>
              </div>
            </div>
            {selectedUser.privileges && (
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-4">Account Privileges</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.privileges.map(p => <span key={p} className="px-3 py-1 bg-white rounded-full text-xs font-bold text-blue-600 border border-blue-100 shadow-sm">{p}</span>)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'edit') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900 uppercase">Modify User</h2>
          <button onClick={() => setView('list')} className="text-gray-500 font-bold hover:text-gray-900">Cancel</button>
        </div>
        <form onSubmit={handleSave} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</label>
              <input required type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</label>
              <input required type="email" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Access Role</label>
              <select className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
                <option value="mechanics">Mechanic</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Account Status</label>
              <select className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest">Update Permissions</button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">User Management</h2>
          <p className="text-xs text-gray-600 mt-1">Manage customers, vendors, and mechanics</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2 text-sm">
            <FaFilter /> Filter
          </button>
          <button className="btn-primary flex items-center gap-2 text-sm">
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customers</option>
            <option value="vendor">Vendors</option>
            <option value="mechanics">Mechanics</option>
            <option value="admin">Admins</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>
      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders/Jobs</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(user.role)}
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' :
                        user.status === 'Suspended' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                      }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.orders || 0}</td>
                  <td className="px-6 py-4">
                    {user.rating ? (
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500 text-xs" />
                        <span className="text-sm font-semibold">{user.rating}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{user.revenue || 'N/A'}</td>
                  <td className="px-6 py-4 text-xs text-gray-500">{user.lastLogin || 'Never'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleAction('view', user)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleAction('edit', user)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleAction('delete', user)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
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

export default Users;

