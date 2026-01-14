import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJob } from '../../contexts/JobContext';
import { useVehicle } from '../../contexts/VehicleContext';
import { useEscrow } from '../../contexts/EscrowContext';
import { useAuth } from '../../auth/AuthContext';
import PartsBasketBuilder from './PartsBasketBuilder';
import { 
  FaCheckCircle, FaTimesCircle, FaFileInvoice, 
  FaShieldAlt, FaTruck, FaStar 
} from 'react-icons/fa';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { jobs, activeJob, updateJob, addDiagnosis, buildPartsBasket, createEstimate, approveEstimate } = useJob();
  const { getCompatibleParts } = useVehicle();
  const { getEscrowByJobId } = useEscrow();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [selectedParts, setSelectedParts] = useState([]);
  const [laborCost, setLaborCost] = useState(0);
  const [consumablesCost, setConsumablesCost] = useState(0);

  useEffect(() => {
    const foundJob = jobs.find(j => j.id === parseInt(jobId));
    if (foundJob) {
      setJob(foundJob);
    } else if (activeJob && activeJob.id === parseInt(jobId)) {
      setJob(activeJob);
    }
  }, [jobId, jobs, activeJob]);

  useEffect(() => {
    if (job?.vehicle) {
      getCompatibleParts(job.symptoms);
      // This would be set by mechanic during diagnosis
    }
  }, [job, getCompatibleParts]);

  const escrow = job ? getEscrowByJobId(job.id) : null;

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Job not found</p>
          <button onClick={() => navigate('/service/booking')} className="btn-primary">
            Book New Service
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      diagnosed: 'bg-blue-100 text-blue-800',
      estimate_pending: 'bg-purple-100 text-purple-800',
      estimate_ready: 'bg-indigo-100 text-indigo-800',
      approved: 'bg-green-100 text-green-800',
      in_progress: 'bg-blue-100 text-blue-800',
      qc_completed: 'bg-teal-100 text-teal-800',
      completed: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const calculateTotal = () => {
    const partsTotal = selectedParts.reduce((sum, part) => {
      const selectedOption = part.selectedOption;
      return sum + (selectedOption?.price || 0);
    }, 0);
    return partsTotal + laborCost + consumablesCost;
  };

  const handleCreateEstimate = () => {
    if (selectedParts.length === 0) {
      alert('Please select at least one part');
      return;
    }
    const estimate = {
      parts: selectedParts,
      labor: laborCost,
      consumables: consumablesCost,
      total: calculateTotal(),
      createdAt: new Date().toISOString(),
    };
    createEstimate(job.id, estimate);
    updateJob(job.id, { estimate, status: 'estimate_ready' });
  };

  const handleApproveEstimate = () => {
    approveEstimate(job.id, 'customer');
    setJob({ ...job, status: 'approved', approvals: { ...job.approvals, customer: true } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8">
      <div className="section-container">
        <div className="mb-6">
          <button onClick={() => navigate(-1)} className="text-primary-600 hover:text-primary-700 mb-4">
            ← Back
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Job #{job.id}</h1>
              <p className="text-gray-600 mt-1">
                {job.vehicle?.make} {job.vehicle?.model} {job.vehicle?.variant}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(job.status)}`}>
              {job.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Timeline */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Job Timeline</h2>
              <div className="space-y-4">
                {job.milestones?.map((milestone, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <FaCheckCircle />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 capitalize">
                        {milestone.type.replace('_', ' ')}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(milestone.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnosis & Parts Selection (Mechanic View) */}
            {user?.role === 'mechanics' && job.status === 'pending' && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Diagnosis & Parts Selection</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                    <textarea
                      className="input-field"
                      rows={4}
                      placeholder="Enter diagnosis details..."
                      onChange={(e) => {
                        addDiagnosis(job.id, e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Parts</label>
                    <PartsBasketBuilder
                      vehicle={job.vehicle}
                      symptoms={job.symptoms ? [job.symptoms] : []}
                      onPartsSelected={(parts) => {
                        setSelectedParts(parts);
                        buildPartsBasket(job.id, parts);
                      }}
                      initialParts={selectedParts}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Labor Cost</label>
                      <input
                        type="number"
                        value={laborCost}
                        onChange={(e) => setLaborCost(parseFloat(e.target.value) || 0)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Consumables</label>
                      <input
                        type="number"
                        value={consumablesCost}
                        onChange={(e) => setConsumablesCost(parseFloat(e.target.value) || 0)}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <button onClick={handleCreateEstimate} className="btn-primary w-full">
                    Create Estimate
                  </button>
                </div>
              </div>
            )}

            {/* Estimate (Customer View) */}
            {job.estimate && job.status === 'estimate_ready' && user?.role === 'customer' && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Service Estimate</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Parts</h3>
                    <div className="space-y-2">
                      {job.estimate.parts?.map((part, idx) => (
                        <div key={idx} className="flex justify-between p-3 bg-gray-50 rounded">
                          <span className="text-gray-700">{part.name}</span>
                          <span className="font-semibold">₹{part.selectedOption?.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Labor</span>
                      <span className="font-semibold">₹{job.estimate.labor}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Consumables</span>
                      <span className="font-semibold">₹{job.estimate.consumables}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-primary-600 pt-2 border-t">
                      <span>Total</span>
                      <span>₹{job.estimate.total}</span>
                    </div>
                  </div>
                  {!job.approvals?.customer && (
                    <button onClick={handleApproveEstimate} className="btn-primary w-full mt-4">
                      Approve & Proceed
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Media Gallery */}
            {job.media && job.media.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Media</h2>
                <div className="grid grid-cols-3 gap-4">
                  {job.media.map((media, idx) => (
                    <div key={idx} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img src={media.url} alt={media.type} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Info */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Job Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Service Mode</p>
                  <p className="font-semibold capitalize">{job.serviceMode === 'garage' ? 'Garage Service' : 'At-Home Service'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Symptoms</p>
                  <p className="font-semibold">{job.symptoms || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Preferred Slot</p>
                  <p className="font-semibold">{job.preferredSlot || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="font-semibold">{new Date(job.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Escrow Info */}
            {escrow && (
              <div className="card">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Payment</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Reservation Fee</p>
                    <p className="text-2xl font-bold text-primary-600">₹{escrow.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      escrow.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                      escrow.status === 'released' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {escrow.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => navigate(`/service/job/${job.id}/jobcard`)}
                  className="w-full btn-primary justify-start"
                >
                  <FaFileInvoice className="mr-2" /> View Job Card
                </button>
                <button className="w-full btn-outline justify-start">
                  <FaTruck className="mr-2" /> Track Order
                </button>
                <button className="w-full btn-outline justify-start">
                  <FaShieldAlt className="mr-2" /> Warranty Info
                </button>
                <button className="w-full btn-outline justify-start">
                  <FaStar className="mr-2" /> Rate Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

