import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useJob } from '../../../../contexts/JobContext';
import {
    FaArrowLeft, FaSave, FaShareAlt, FaCheck, FaTools,
    FaFileInvoiceDollar, FaRegMoneyBillAlt, FaTimes, FaPlus, FaTrash, FaEye, FaClock, FaCheckCircle
} from 'react-icons/fa';

const STAGES = [
    { id: 'draft', label: 'Draft' },
    { id: 'pending_customer', label: 'Pending Customer' },
    { id: 'approved', label: 'Approved' },
    { id: 'parts_ordered', label: 'Parts Ordered' },
    { id: 'repairing', label: 'In Progress' },
    { id: 'ready_billing', label: 'Ready for Bill' },
    { id: 'paid', label: 'Paid' },
    { id: 'completed', label: 'Delivered' },
    { id: 'closed', label: 'Archived' }
];

const JobWorkflow = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { jobs, updateJob, updateJobStatus, addAuditLog, startWork, stopWork, logPartsConsumption, generateInvoice, deliverVehicle } = useJob();
    const [job, setJob] = useState(null);

    // Extract ID from path since named params might not be available in sub-routes
    const jobIdFromPath = location.pathname.split('/').pop();

    const [formData, setFormData] = useState({
        vehicle: { make: '', model: '', year: '', regNo: '' },
        customer: { name: '', email: '', phone: '' },
        inspectionNotes: '',
        inspectionPhotos: [],
        laborItems: [], // [{ description, hours, rate }]
        parts: [] // [{ sku, name, qty, price, mrp, leadTime, source, tax, approved }]
    });

    useEffect(() => {
        const foundJob = jobs.find(j => j.id.toString() === jobIdFromPath.toString());
        if (foundJob) {
            const normalizedJob = {
                ...foundJob,
                status: foundJob.status === 'pending' ? 'draft' : foundJob.status
            };
            setJob(normalizedJob);
            setFormData({
                vehicle: {
                    make: foundJob.vehicle?.make || '',
                    model: foundJob.vehicle?.model || '',
                    year: foundJob.vehicle?.year || '',
                    regNo: foundJob.vehicle?.registrationNumber || ''
                },
                customer: {
                    name: foundJob.customerName || '',
                    email: foundJob.customerEmail || '',
                    phone: foundJob.customerContactNo || ''
                },
                inspectionNotes: foundJob.inspectionNotes || foundJob.symptoms || '',
                inspectionPhotos: foundJob.inspectionPhotos || [],
                laborItems: foundJob.estimate?.laborItems || [{ description: 'General Labor', hours: 1, rate: foundJob.estimate?.labor || 500 }],
                parts: (foundJob.estimate?.parts || []).map(p => ({
                    ...p,
                    sku: p.sku || `SKU-${Math.floor(Math.random() * 10000)}`,
                    mrp: p.mrp || p.price || 0,
                    tax: p.tax || 18,
                    leadTime: p.leadTime || 'Immediate',
                    source: p.source || 'In Stock',
                    status: p.status || 'reserved'
                }))
            });
        }
    }, [jobIdFromPath, jobs]);

    const handleInputChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    };

    const addPart = () => {
        setFormData(prev => ({
            ...prev,
            parts: [...prev.parts, {
                sku: `SKU-${Math.floor(Math.random() * 10000)}`,
                name: '',
                quantity: 1,
                price: 0,
                mrp: 0,
                tax: 18,
                leadTime: '1-2 Days',
                source: 'In Stock',
                status: 'reserved',
                customerApproved: false
            }]
        }));
    };

    const addLabor = () => {
        setFormData(prev => ({
            ...prev,
            laborItems: [...prev.laborItems, { description: '', hours: 1, rate: 500 }]
        }));
    };

    const updatePart = (index, field, value) => {
        setFormData(prev => {
            const newParts = [...prev.parts];
            newParts[index] = { ...newParts[index], [field]: value };
            return { ...prev, parts: newParts };
        });
    };

    const updateLabor = (index, field, value) => {
        setFormData(prev => {
            const newLabor = [...prev.laborItems];
            newLabor[index] = { ...newLabor[index], [field]: value };
            return { ...prev, laborItems: newLabor };
        });
    };

    const removePart = (index) => {
        setFormData(prev => ({
            ...prev,
            parts: prev.parts.filter((_, i) => i !== index)
        }));
    };

    const removeLabor = (index) => {
        setFormData(prev => ({
            ...prev,
            laborItems: prev.laborItems.filter((_, i) => i !== index)
        }));
    };

    const handleShare = () => {
        updateJobStatus(job.id, 'pending_customer');
        addAuditLog(job.id, {
            user: 'Mechanic',
            action: 'Shared Job Card with Customer',
            details: `Total Estimate: ₹${totals.grandTotal}`
        });
        alert('JOB CARD SHARED: Customer will receive an SMS/Email to review and approve parts.');
    };

    const handleSave = () => {
        const laborTotal = formData.laborItems.reduce((sum, item) => sum + (item.hours * item.rate), 0);
        const partsTotal = formData.parts.reduce((sum, p) => sum + (p.price * p.quantity), 0);

        updateJob(job.id, {
            inspectionNotes: formData.inspectionNotes,
            inspectionPhotos: formData.inspectionPhotos,
            estimate: {
                ...job.estimate,
                laborItems: formData.laborItems,
                labor: laborTotal,
                parts: formData.parts,
                estimated_parts_total: partsTotal,
                estimated_labor_total: laborTotal,
                estimated_total: laborTotal + partsTotal
            }
        });
        addAuditLog(job.id, { user: 'Mechanic', action: 'Updated Draft', details: 'Notes/Parts/Labor updated' });
        alert('Job Card Updated - Estimate Saved as Draft');
    };

    const advanceStage = () => {
        const currentIndex = STAGES.findIndex(s => s.id === job.status) || 0;
        if (currentIndex < STAGES.length - 1) {
            const nextStage = STAGES[currentIndex + 1].id;
            updateJobStatus(job.id, nextStage);
        } else {
            navigate('/mechanics/dashboard/jobs');
        }
    };

    const currentStageIndex = job ? STAGES.findIndex(s => s.id === job.status) : -1;

    const totals = useMemo(() => {
        if (!job) return { estLabor: 0, estParts: 0, approvedParts: 0, grandTotal: 0 };
        const estLabor = formData.laborItems.reduce((sum, item) => sum + (item.hours * item.rate), 0);
        const estParts = formData.parts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
        const approvedParts = formData.parts.reduce((sum, p) => {
            const isApproved = p.customerApproved || currentStageIndex < 2; // Auto-sum if not yet shared
            return sum + (isApproved ? (p.price * p.quantity) : 0);
        }, 0);
        return { estLabor, estParts, approvedParts, grandTotal: estLabor + (currentStageIndex < 2 ? estParts : approvedParts) };
    }, [formData, currentStageIndex, job]);

    const [activeTimer, setActiveTimer] = useState(0);

    useEffect(() => {
        let interval;
        if (job?.isWorking) {
            const start = new Date(job.repairStartTime).getTime();
            interval = setInterval(() => {
                setActiveTimer(Math.floor((Date.now() - start) / 1000));
            }, 1000);
        } else {
            setActiveTimer(0);
        }
        return () => clearInterval(interval);
    }, [job?.isWorking, job?.repairStartTime]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStartWork = () => {
        const unreadyParts = (job.partRequisitions || []).filter(r => r.status === 'Procure Needed' || r.status === 'Ordered');
        if (unreadyParts.length > 0) {
            if (!window.confirm(`Warning: ${unreadyParts.length} parts are still pending procurement. Proceed anyway?`)) return;
        }
        startWork(job.id);
    };

    const handleStopWork = () => {
        const durationMins = Math.max(1, Math.floor(activeTimer / 60));
        stopWork(job.id, durationMins);
    };

    const handleConsumePart = (reqId) => {
        const qty = parseInt(prompt("Enter quantity consumed:", "1"));
        if (qty > 0) {
            logPartsConsumption(job.id, reqId, qty);
        }
    };

    const handleGenerateInvoice = () => {
        const laborSubtotal = formData.laborItems.reduce((sum, item) => sum + (item.hours * item.rate), 0);
        const partsSubtotal = formData.parts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
        const total = laborSubtotal + partsSubtotal;
        const tax = total * 0.18;

        generateInvoice(job.id, {
            laborSubtotal,
            partsSubtotal,
            tax,
            finalTotal: total + tax,
            parts: formData.parts,
            laborItems: formData.laborItems
        });
        alert('Invoice generated and shared with customer for final payment.');
    };

    const [deliveryData, setDeliveryData] = useState({
        receiverName: '',
        partsReturned: true
    });

    const handleDeliver = () => {
        if (!deliveryData.receiverName) {
            alert('Please enter the name of the person receiving the vehicle.');
            return;
        }
        deliverVehicle(job.id, deliveryData);
        alert('Vehicle marked as DELIVERED. Digital receipt sent to customer.');
    };

    if (!job) return <div className="p-8">Loading...</div>;

    return (
        <div className="space-y-4 max-w-[1400px] mx-auto pb-10">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/mechanics/dashboard/jobs')} className="text-gray-500 hover:text-black">
                        <FaArrowLeft size={18} />
                    </button>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        Job Card # {jobIdFromPath.slice(-6)}
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-bold uppercase tracking-tighter">
                            {STAGES[currentStageIndex]?.label}
                        </span>
                    </h2>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleSave} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded text-sm font-bold hover:bg-gray-200">
                        <FaSave /> Save Draft
                    </button>
                    <button
                        onClick={advanceStage}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-sm"
                    >
                        {STAGES[currentStageIndex + 1]?.label || 'Mark Complete'} <FaCheck />
                    </button>
                </div>
            </div>

            {/* Workflow Progress Bar */}
            <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg overflow-x-auto gap-2 border">
                {STAGES.map((stage, index) => (
                    <div key={stage.id} className="flex flex-col items-center min-w-[90px]">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-0.5 
              ${index <= currentStageIndex ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {index + 1}
                        </div>
                        <span className={`text-[9px] text-center font-bold leading-tight ${index === currentStageIndex ? 'text-blue-600' : 'text-gray-500'}`}>
                            {stage.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left Side: Info & Inspection */}
                <div className="space-y-4">
                    <section className="bg-white p-4 border rounded-lg shadow-sm">
                        <h3 className="text-sm font-bold mb-3 border-b pb-1 text-gray-700 uppercase tracking-wider">Vehicle & Customer</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Registration</p>
                                <p className="font-bold text-gray-900">{formData.vehicle.regNo}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Make / Model</p>
                                <p className="font-bold text-gray-900">{formData.vehicle.make} {formData.vehicle.model}</p>
                            </div>
                            <div className="col-span-2 pt-2 border-t">
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Customer</p>
                                <p className="font-bold text-gray-900">{formData.customer.name} ({formData.customer.phone})</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-4 border rounded-lg shadow-sm">
                        <h3 className="text-sm font-bold mb-3 border-b pb-1 text-gray-700 uppercase tracking-wider">Mechanic Inspection</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Detailed Findings & Notes</label>
                                <textarea
                                    rows={4}
                                    value={formData.inspectionNotes}
                                    onChange={(e) => setFormData(prev => ({ ...prev, inspectionNotes: e.target.value }))}
                                    placeholder="Enter detailed repair needs, component wear, etc..."
                                    className="w-full border p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Inspection Photos</label>
                                <div className="grid grid-cols-4 gap-2">
                                    <div className="aspect-video bg-gray-100 border-2 border-dashed rounded flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 cursor-pointer transition">
                                        <FaPlus size={14} />
                                        <span className="text-[9px] font-bold mt-1">Add Photo</span>
                                    </div>
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="aspect-video bg-gray-200 rounded border border-gray-300 relative group overflow-hidden">
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                                <button className="text-white text-xs"><FaTrash /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Audit Trail Section */}
                    <section className="bg-white p-4 border rounded-lg shadow-sm">
                        <h3 className="text-sm font-bold mb-3 border-b pb-1 text-gray-700 uppercase tracking-wider">Audit Trail (History)</h3>
                        <div className="space-y-3 max-h-40 overflow-y-auto no-scrollbar">
                            {(job.auditLog || []).length > 0 ? (
                                job.auditLog.map((log, idx) => (
                                    <div key={idx} className="text-[10px] border-l-2 border-blue-200 pl-2 py-1">
                                        <div className="flex justify-between font-bold">
                                            <span>{log.action}</span>
                                            <span className="text-gray-400 font-normal">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                        </div>
                                        <p className="text-gray-500">{log.user}: {log.details}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[10px] text-gray-400 italic">No activity recorded yet.</p>
                            )}
                        </div>
                    </section>

                    {/* Part Requisitions (Auto-Punched) */}
                    {job.partRequisitions && job.partRequisitions.length > 0 && (
                        <section className="bg-white p-4 border rounded-lg shadow-sm">
                            <h3 className="text-sm font-bold mb-3 border-b pb-1 text-gray-700 uppercase tracking-wider">Part Requisitions</h3>
                            <div className="space-y-2">
                                {job.partRequisitions.map((req, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded border text-[10px]">
                                        <div>
                                            <p className="font-bold text-gray-800">{req.partName}</p>
                                            <p className="text-gray-400">ID: {req.id} • Qty: {req.qty}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${req.status === 'Reserved' || req.status === 'Received' ? 'bg-green-100 text-green-700' :
                                                req.status === 'Consumed' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                                }`}>
                                                {req.status}
                                            </span>
                                            {(req.status === 'Received' || req.status === 'Reserved') && (
                                                <button
                                                    onClick={() => handleConsumePart(req.id)}
                                                    className="px-2 py-1 bg-blue-600 text-white rounded text-[9px] font-bold hover:bg-blue-700 shadow transition"
                                                >
                                                    CONSUME
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Side: Labor & Parts Builder */}
                <div className="space-y-4">
                    {/* Labor Items */}
                    <section className="bg-white p-4 border rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-2 border-b pb-1">
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Labor Line Items</h3>
                            <button onClick={addLabor} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-[10px] font-bold">
                                <FaPlus size={8} /> Add Labor
                            </button>
                        </div>
                        <div className="space-y-2">
                            {formData.laborItems.map((item, idx) => (
                                <div key={idx} className="flex gap-2 items-end border-b pb-2">
                                    <div className="flex-1">
                                        <input
                                            value={item.description}
                                            onChange={(e) => updateLabor(idx, 'description', e.target.value)}
                                            placeholder="Repair description"
                                            className="w-full text-xs font-bold border-none focus:ring-0 bg-transparent p-0"
                                        />
                                    </div>
                                    <div className="w-16">
                                        <label className="text-[8px] font-bold text-gray-400 block">Hrs</label>
                                        <div className="flex items-center gap-1">
                                            <input
                                                type="number"
                                                value={item.hours}
                                                onChange={(e) => updateLabor(idx, 'hours', parseFloat(e.target.value) || 0)}
                                                className="w-full text-xs text-center border-none focus:ring-0 bg-transparent p-0 font-bold"
                                            />
                                            {job.actualLaborMinutes > 0 && (
                                                <button
                                                    onClick={() => updateLabor(idx, 'hours', (job.actualLaborMinutes / 60).toFixed(2))}
                                                    className="text-[8px] bg-blue-100 text-blue-600 px-1 rounded hover:bg-blue-200"
                                                    title="Use tracked time"
                                                >
                                                    ACT
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-16">
                                        <label className="text-[8px] font-bold text-gray-400 block">Rate</label>
                                        <input
                                            type="number"
                                            value={item.rate}
                                            onChange={(e) => updateLabor(idx, 'rate', parseFloat(e.target.value) || 0)}
                                            className="w-full text-xs text-right border-none focus:ring-0 bg-transparent p-0 font-bold"
                                        />
                                    </div>
                                    <button onClick={() => removeLabor(idx)} className="text-red-300 hover:text-red-500 p-1">
                                        <FaTrash size={10} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Repair Execution Console */}
                    {(job.status === 'approved' || job.status === 'repairing' || job.status === 'parts_ordered') && (
                        <section className="bg-indigo-900 text-white p-5 rounded-lg shadow-lg">
                            <h3 className="text-sm font-bold mb-4 border-b border-white/10 pb-2 uppercase tracking-widest flex justify-between">
                                Repair Execution Console
                                <div className="flex gap-2">
                                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded">
                                        Tracked: {job.actualLaborMinutes || 0} mins
                                    </span>
                                </div>
                            </h3>

                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`p-4 rounded-full ${job.isWorking ? 'bg-green-500 animate-pulse' : 'bg-white/10'}`}>
                                        <FaClock size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-tighter">Session Timer</p>
                                        <h4 className="text-3xl font-black font-mono">{formatTime(activeTimer)}</h4>
                                    </div>
                                </div>
                                <div>
                                    {!job.isWorking ? (
                                        <button
                                            onClick={handleStartWork}
                                            className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white rounded-xl font-bold shadow-lg transition transform active:scale-95 flex items-center gap-2"
                                        >
                                            <FaTools /> START WORK
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleStopWork}
                                            className="px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-xl font-bold shadow-lg transition transform active:scale-95 flex items-center gap-2"
                                        >
                                            <FaTimes /> STOP & LOG
                                        </button>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Parts Builder */}
                    <section className="bg-white p-4 border rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-2 border-b pb-1">
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Spare Parts Breakdown</h3>
                            <button onClick={addPart} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-[10px] font-bold">
                                <FaPlus size={8} /> Add Spare
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="p-1.5 text-left text-[9px] uppercase font-bold text-gray-400 w-1/3">Description / SKU</th>
                                        <th className="p-1.5 text-center text-[9px] uppercase font-bold text-gray-400">Source</th>
                                        <th className="p-1.5 text-center text-[9px] uppercase font-bold text-gray-400">Qty</th>
                                        <th className="p-1.5 text-right text-[9px] uppercase font-bold text-gray-400">Price (Unit)</th>
                                        <th className="p-1.5 text-center text-[9px] uppercase font-bold text-gray-400">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.parts.map((part, index) => (
                                        <tr key={index} className="border-t hover:bg-gray-50 transition-colors">
                                            <td className="p-1.5">
                                                <input
                                                    value={part.name}
                                                    onChange={(e) => updatePart(index, 'name', e.target.value)}
                                                    className="w-full font-bold focus:outline-none bg-transparent"
                                                    placeholder="Part Name"
                                                />
                                                <div className="flex gap-2">
                                                    <input
                                                        value={part.sku}
                                                        onChange={(e) => updatePart(index, 'sku', e.target.value)}
                                                        className="text-[9px] text-gray-400 focus:outline-none bg-transparent"
                                                        placeholder="SKU"
                                                    />
                                                    <span className="text-[9px] text-blue-500 font-bold">Tax: {part.tax}%</span>
                                                </div>
                                            </td>
                                            <td className="p-1.5">
                                                <select
                                                    value={part.source}
                                                    onChange={(e) => updatePart(index, 'source', e.target.value)}
                                                    className="w-full text-[10px] bg-transparent border-none p-0 focus:ring-0 font-semibold"
                                                >
                                                    <option value="In Stock">Stock</option>
                                                    <option value="Order Needed">Order</option>
                                                </select>
                                                <div className="text-[8px] text-gray-400 text-center font-bold">{part.leadTime}</div>
                                            </td>
                                            <td className="p-1.5">
                                                <input
                                                    type="number"
                                                    value={part.quantity}
                                                    onChange={(e) => updatePart(index, 'quantity', parseInt(e.target.value) || 0)}
                                                    className="w-full text-center font-bold focus:outline-none bg-transparent"
                                                />
                                            </td>
                                            <td className="p-1.5">
                                                <input
                                                    type="number"
                                                    value={part.price}
                                                    onChange={(e) => updatePart(index, 'price', parseFloat(e.target.value) || 0)}
                                                    className="w-full text-right font-bold focus:outline-none bg-transparent"
                                                />
                                                <div className="text-[8px] text-gray-400 text-right">MRP: ₹{part.mrp}</div>
                                            </td>
                                            <td className="p-1.5 text-center">
                                                <button onClick={() => removePart(index)} className="text-red-300 hover:text-red-500">
                                                    <FaTrash size={10} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Summary Footer */}
                        <div className="mt-4 pt-4 border-t-2 border-gray-100 bg-gray-50/50 p-2 rounded">
                            <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                                <span>Sub-Total (Labor)</span>
                                <span>₹{totals.estLabor.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                                <span>Sub-Total (Parts)</span>
                                <span>₹{totals.estParts.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-md font-bold text-blue-900 border-t pt-2 mt-2">
                                <span>Estimated Total</span>
                                <span>₹{totals.grandTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </section>

                    {/* Delivery Console */}
                    {job.status === 'paid' && (
                        <section className="bg-green-900 text-white p-5 rounded-lg shadow-lg">
                            <h3 className="text-sm font-bold mb-4 border-b border-white/10 pb-2 uppercase tracking-widest flex justify-between">
                                Vehicle Delivery Console
                                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded italic">Payment Verified</span>
                            </h3>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-green-300 uppercase mb-1">Receiver Name</label>
                                        <input
                                            value={deliveryData.receiverName}
                                            onChange={(e) => setDeliveryData(prev => ({ ...prev, receiverName: e.target.value }))}
                                            placeholder="Enter name..."
                                            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-end">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={deliveryData.partsReturned}
                                                onChange={(e) => setDeliveryData(prev => ({ ...prev, partsReturned: e.target.checked }))}
                                                className="rounded border-white/20 bg-white/10 text-green-500 focus:ring-green-400"
                                            />
                                            <span className="text-xs font-bold text-green-100 uppercase tracking-tighter">Return Unused Parts</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleDeliver}
                                        className="flex-1 py-3 bg-green-500 hover:bg-green-400 text-white rounded-xl font-bold shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <FaCheckCircle /> MARK AS DELIVERED
                                    </button>
                                    <button className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-xs uppercase tracking-tighter">
                                        Attach ID Proof
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Final Status Display */}
                    {job.status === 'completed' && (
                        <section className="bg-gray-100 p-8 rounded-xl border border-dashed border-gray-300 text-center">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">
                                <FaCheckCircle size={32} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-1 uppercase tracking-tight">Job Completed</h3>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4">Delivered to: {job.deliveryDetails?.receiverName}</p>
                            <div className="bg-white p-3 rounded-lg border text-[10px] text-left space-y-1">
                                <div className="flex justify-between font-bold text-gray-400 border-b pb-1 mb-1">
                                    <span>POST-DELIVERY SUMMARY</span>
                                    <span>#{job.id.toString().slice(-6)}</span>
                                </div>
                                <p className="text-gray-600">Delivered At: <span className="text-gray-900 font-bold">{new Date(job.deliveredAt).toLocaleString()}</span></p>
                                <p className="text-gray-600">Unused Parts Returned: <span className="text-gray-900 font-bold">{job.deliveryDetails?.partsReturned ? 'Yes' : 'No'}</span></p>
                                <p className="text-gray-600">Payment Ref: <span className="text-gray-900 font-bold font-mono">{job.invoice?.transactionId}</span></p>
                            </div>
                        </section>
                    )}

                    {/* Context Specific Actions */}
                    <section className="bg-white p-3 border rounded-lg shadow-sm">
                        <h4 className="text-[10px] font-bold mb-2 border-b pb-1 text-gray-400 uppercase tracking-widest">Job Actions</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={handleShare}
                                className="flex items-center justify-center gap-1.5 py-2 border rounded hover:bg-gray-50 text-[11px] font-bold transition"
                            >
                                <FaShareAlt className="text-blue-500" /> Share with Customer
                            </button>
                            <button
                                onClick={() => navigate(`/mechanics/dashboard/jobs/customer-view/${job.id}`)}
                                className="flex items-center justify-center gap-1.5 py-2 border rounded bg-indigo-50 hover:bg-indigo-100 text-[11px] font-bold transition text-indigo-700"
                            >
                                <FaEye /> Preview as Customer
                            </button>
                            <button className="flex items-center justify-center gap-1.5 py-2 border rounded hover:bg-gray-50 text-[11px] font-bold transition">
                                <FaTools className="text-orange-500" /> Repair Log
                            </button>
                            <button
                                onClick={handleGenerateInvoice}
                                className="flex items-center justify-center gap-1.5 py-2 border rounded bg-blue-50 hover:bg-blue-100 text-[11px] font-bold transition text-blue-700"
                            >
                                <FaFileInvoiceDollar /> Generate Final Invoice
                            </button>
                            <button
                                onClick={() => updateJobStatus(job.id, 'paid')}
                                className="col-span-2 flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-bold shadow-md transition"
                            >
                                <FaRegMoneyBillAlt fontSize={14} /> Settlement / Mark Paid
                            </button>
                            {job.status === 'completed' && (
                                <button
                                    onClick={() => {
                                        updateJobStatus(job.id, 'closed', 'Job archived and moved to history.');
                                        alert('Job moved to permanent archives.');
                                        navigate('/mechanics/dashboard/jobs');
                                    }}
                                    className="col-span-2 flex items-center justify-center gap-2 py-3 bg-gray-800 text-white rounded hover:bg-black text-xs font-bold shadow-md transition mt-2"
                                >
                                    <FaSave fontSize={14} /> Close & Archive Job
                                </button>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default JobWorkflow;
