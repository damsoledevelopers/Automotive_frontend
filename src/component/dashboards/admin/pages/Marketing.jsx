import React, { useState, useEffect, useMemo } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaTag, FaCalendar, FaChartLine, FaSpinner, FaTimes, FaCheckCircle, FaFilter } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Marketing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    discount: '',
    startDate: '',
    endDate: '',
    status: 'Active'
  });

  // Load campaigns from localStorage on mount
  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = () => {
    try {
      const savedCampaigns = localStorage.getItem('marketingCampaigns');
      if (savedCampaigns) {
        const parsed = JSON.parse(savedCampaigns);
        setCampaigns(parsed);
      } else {
        // Initialize with default campaigns
        const defaultCampaigns = [
          { 
            id: 1, 
            name: 'Summer Sale 2024', 
            code: 'SUMMER24', 
            discount: '20%', 
            discountValue: 20,
            status: 'Active', 
            startDate: '2024-01-01', 
            endDate: '2024-12-31', 
            usage: 1245, 
            revenue: 2500000 
          },
          { 
            id: 2, 
            name: 'New Year Discount', 
            code: 'NEWYEAR24', 
            discount: '15%', 
            discountValue: 15,
            status: 'Active', 
            startDate: '2024-01-01', 
            endDate: '2024-01-15', 
            usage: 890, 
            revenue: 1800000 
          },
          { 
            id: 3, 
            name: 'Flash Sale', 
            code: 'FLASH50', 
            discount: '50%', 
            discountValue: 50,
            status: 'Expired', 
            startDate: '2023-12-20', 
            endDate: '2023-12-25', 
            usage: 2340, 
            revenue: 4200000 
          },
        ];
        setCampaigns(defaultCampaigns);
        localStorage.setItem('marketingCampaigns', JSON.stringify(defaultCampaigns));
      }
    } catch (error) {
      console.error('Failed to load campaigns:', error);
      toast.error('Failed to load campaigns');
    }
  };

  const saveCampaigns = (updatedCampaigns) => {
    try {
      localStorage.setItem('marketingCampaigns', JSON.stringify(updatedCampaigns));
      setCampaigns(updatedCampaigns);
    } catch (error) {
      console.error('Failed to save campaigns:', error);
      toast.error('Failed to save campaigns');
    }
  };

  // Calculate real-time stats from campaigns
  const campaignStats = useMemo(() => {
    const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
    const totalUsage = campaigns.reduce((sum, c) => sum + (c.usage || 0), 0);
    const totalRevenue = campaigns.reduce((sum, c) => sum + (c.revenue || 0), 0);
    
    return {
      active: activeCampaigns,
      totalUsage,
      totalRevenue
    };
  }, [campaigns]);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(campaign => {
      const matchesSearch = !searchTerm || 
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || 
        campaign.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [campaigns, searchTerm, statusFilter]);

  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `₹${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const handleCreateCampaign = () => {
    setFormData({
      name: '',
      code: '',
      discount: '',
      startDate: '',
      endDate: '',
      status: 'Active'
    });
    setSelectedCampaign(null);
    setShowCampaignModal(true);
  };

  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setFormData({
      name: campaign.name || '',
      code: campaign.code || '',
      discount: campaign.discountValue?.toString() || campaign.discount?.replace('%', '') || '',
      startDate: campaign.startDate || '',
      endDate: campaign.endDate || '',
      status: campaign.status || 'Active'
    });
    setShowEditModal(true);
  };

  const handleDeleteCampaign = (campaignId) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) {
      return;
    }
    
    const updatedCampaigns = campaigns.filter(c => c.id !== campaignId);
    saveCampaigns(updatedCampaigns);
    toast.success('Campaign deleted successfully!');
  };

  const handleSaveCampaign = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.code || !formData.discount || !formData.startDate || !formData.endDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const discountValue = parseInt(formData.discount);
    if (isNaN(discountValue) || discountValue < 0 || discountValue > 100) {
      toast.error('Discount must be between 0 and 100');
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      toast.error('Start date must be before end date');
      return;
    }

    if (showCampaignModal) {
      // Create new campaign
      const newCampaign = {
        id: Date.now(),
        name: formData.name,
        code: formData.code.toUpperCase(),
        discount: `${discountValue}%`,
        discountValue: discountValue,
        status: formData.status,
        startDate: formData.startDate,
        endDate: formData.endDate,
        usage: 0,
        revenue: 0
      };
      
      const updatedCampaigns = [...campaigns, newCampaign];
      saveCampaigns(updatedCampaigns);
      toast.success('Campaign created successfully!');
      setShowCampaignModal(false);
    } else if (showEditModal && selectedCampaign) {
      // Update existing campaign
      const updatedCampaigns = campaigns.map(c => 
        c.id === selectedCampaign.id
          ? {
              ...c,
              name: formData.name,
              code: formData.code.toUpperCase(),
              discount: `${discountValue}%`,
              discountValue: discountValue,
              status: formData.status,
              startDate: formData.startDate,
              endDate: formData.endDate
            }
          : c
      );
      saveCampaigns(updatedCampaigns);
      toast.success('Campaign updated successfully!');
      setShowEditModal(false);
      setSelectedCampaign(null);
    }
    
    setFormData({
      name: '',
      code: '',
      discount: '',
      startDate: '',
      endDate: '',
      status: 'Active'
    });
  };

  const handleViewAnalytics = (campaign) => {
    setSelectedCampaign(campaign);
    setShowAnalyticsModal(true);
  };

  const handleExport = () => {
    try {
      setExporting(true);
      
      const dataToExport = filteredCampaigns.length > 0 ? filteredCampaigns : campaigns;
      
      // Generate CSV content
      let csvContent = 'Marketing Campaigns Report\n';
      csvContent += `Generated: ${new Date().toLocaleString()}\n`;
      csvContent += `Total Campaigns: ${dataToExport.length}\n`;
      csvContent += `Active Campaigns: ${campaignStats.active}\n`;
      csvContent += `Total Usage: ${campaignStats.totalUsage.toLocaleString()}\n`;
      csvContent += `Total Revenue: ${formatCurrency(campaignStats.totalRevenue)}\n\n`;
      
      // CSV Headers
      csvContent += 'Campaign Name,Code,Discount,Start Date,End Date,Usage,Revenue,Status\n';
      
      // CSV Data
      dataToExport.forEach(campaign => {
        const name = (campaign.name || '').replace(/,/g, ';');
        const code = (campaign.code || '').replace(/,/g, ';');
        const discount = (campaign.discount || '').replace(/,/g, ';');
        const startDate = campaign.startDate || 'N/A';
        const endDate = campaign.endDate || 'N/A';
        const usage = campaign.usage || 0;
        const revenue = formatCurrency(campaign.revenue || 0).replace(/,/g, '');
        const status = (campaign.status || 'N/A').replace(/,/g, ';');
        
        csvContent += `${name},${code},${discount},${startDate},${endDate},${usage},${revenue},${status}\n`;
      });
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `marketing_campaigns_report_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`Exported ${dataToExport.length} campaigns successfully!`);
    } catch (error) {
      console.error('Failed to export campaigns:', error);
      toast.error('Failed to export campaigns: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Marketing & Promotion Management</h2>
          <p className="text-xs text-gray-600 mt-1">Create and manage promotional campaigns</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExport}
            disabled={exporting || campaigns.length === 0}
            className="bg-white border border-red-500 text-red-500 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-50 transition-colors"
            title="Export campaigns to CSV"
          >
            {exporting ? <FaSpinner className="animate-spin text-red-500" /> : <FaDownload className="text-red-500" />} <span className="text-red-500">Export</span>
          </button>
          <button 
            onClick={handleCreateCampaign}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <FaPlus /> Create Campaign
          </button>
        </div>
      </div>

      {/* Summary Cards - Real-time Data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-6 border border-green-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-green-700 mb-1">Active Campaigns</p>
              <p className="text-2xl font-bold text-green-900">
                {campaignStats.active.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-xl text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-700 mb-1">Total Usage</p>
              <p className="text-2xl font-bold text-blue-900">
                {campaignStats.totalUsage.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FaTag className="text-xl text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-purple-700 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-purple-900">
                {formatCurrency(campaignStats.totalRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FaChartLine className="text-xl text-purple-600" />
        </div>
        </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Loading campaigns...</p>
          </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {filteredCampaigns.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                      No campaigns found. Create your first campaign to get started.
                    </td>
                  </tr>
                ) : (
                  filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                        <FaTag />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{campaign.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm font-mono">
                      {campaign.code}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">{campaign.discount}</td>
                  <td className="px-6 py-4 text-xs text-gray-600">
                    {campaign.startDate} to {campaign.endDate}
                  </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{campaign.usage?.toLocaleString() || 0}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatCurrency(campaign.revenue || 0)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleViewAnalytics(campaign)}
                            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition" 
                            title="View Analytics"
                          >
                        <FaChartLine />
                      </button>
                          <button 
                            onClick={() => handleEditCampaign(campaign)}
                            className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition" 
                            title="Edit"
                          >
                        <FaEdit />
                      </button>
                          <button 
                            onClick={() => handleDeleteCampaign(campaign.id)}
                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition" 
                            title="Delete"
                          >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
                  ))
                )}
            </tbody>
          </table>
          </div>
        )}
      </div>

      {/* Create Campaign Modal */}
      {showCampaignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Create New Campaign</h3>
              <button
                onClick={() => setShowCampaignModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleSaveCampaign} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Summer Sale 2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Code *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
                  placeholder="e.g., SUMMER24"
                  maxLength={20}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={(e) => setFormData({...formData, discount: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">End date must be a future date</p>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCampaignModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Campaign Modal */}
      {showEditModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Edit Campaign</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedCampaign(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleSaveCampaign} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Code *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
                  maxLength={20}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={(e) => setFormData({...formData, discount: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">End date must be a future date</p>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedCampaign(null);
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Update Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalyticsModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Campaign Analytics</h3>
              <button
                onClick={() => {
                  setShowAnalyticsModal(false);
                  setSelectedCampaign(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">{selectedCampaign.name}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-blue-700 mb-1">Total Usage</p>
                    <p className="text-2xl font-bold text-blue-900">{selectedCampaign.usage?.toLocaleString() || 0}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-green-700 mb-1">Revenue Generated</p>
                    <p className="text-2xl font-bold text-green-900">{formatCurrency(selectedCampaign.revenue || 0)}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <p className="text-sm text-purple-700 mb-1">Discount</p>
                    <p className="text-2xl font-bold text-purple-900">{selectedCampaign.discount}</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <p className="text-sm text-yellow-700 mb-1">Status</p>
                    <p className="text-2xl font-bold text-yellow-900">{selectedCampaign.status}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Campaign Period</p>
                <p className="text-gray-900 font-medium">
                  {selectedCampaign.startDate} to {selectedCampaign.endDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Campaign Code</p>
                <p className="text-gray-900 font-mono font-medium">{selectedCampaign.code}</p>
              </div>
        </div>
      </div>
        </div>
      )}
    </div>
  );
};

export default Marketing;
