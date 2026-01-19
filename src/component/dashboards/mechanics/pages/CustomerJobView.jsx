import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJob } from '../../../../contexts/JobContext';
import {
    FaArrowLeft, FaCheck, FaTimes, FaPlus, FaTrash, FaUndo,
    FaCommentDots, FaInfoCircle, FaFileInvoice, FaExchangeAlt, FaShoppingCart, FaCreditCard, FaMoneyBillWave, FaFileSignature, FaCheckCircle
} from 'react-icons/fa';

const PART_CATALOG = [
    { name: 'Engine Oil (5W-30)', category: 'OEM', price: 2500, leadTime: 'Immediate', source: 'In Stock' },
    { name: 'Engine Oil (Shell Helix)', category: 'Aftermarket', price: 1800, leadTime: 'Immediate', source: 'In Stock' },
    { name: 'Brake Pads (Front)', category: 'OEM', price: 3200, leadTime: '1-2 Days', source: 'Order Needed' },
    { name: 'Brake Pads (Brembo)', category: 'Aftermarket', price: 4500, leadTime: 'Immediate', source: 'In Stock' },
    { name: 'Air Filter', category: 'OEM', price: 850, leadTime: 'Immediate', source: 'In Stock' },
    { name: 'Air Filter (Generic)', category: 'Aftermarket', price: 450, leadTime: 'Immediate', source: 'In Stock' },
    { name: 'Spark Plug (Set of 4)', category: 'OEM', price: 1200, leadTime: 'Immediate', source: 'In Stock' },
];

const CustomerJobView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { jobs, updateJob, addAuditLog, processCustomerApproval, payInvoice } = useJob();
    const [job, setJob] = useState(null);
    const [customerParts, setCustomerParts] = useState([]);
    const [showCatalog, setShowCatalog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [view, setView] = useState('review'); // review | invoice
    const [paymentMethod, setPaymentMethod] = useState('');
    const [feedback, setFeedback] = useState({ rating: 0, comment: '' });
    const [submittedFeedback, setSubmittedFeedback] = useState(false);

    useEffect(() => {
        const foundJob = jobs.find(j => j.id.toString() === id.toString());
        if (foundJob) {
            setJob(foundJob);
            setCustomerParts(foundJob.estimate?.parts || []);
        }
    }, [id, jobs]);

    const totals = useMemo(() => {
        if (!job) return { labor: 0, parts: 0, total: 0 };
        const labor = job.estimate?.labor || 0;
        const parts = customerParts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
        return {
            labor,
            parts,
            total: labor + parts
        };
    }, [job, customerParts]);

    const handleUpdateParts = (newParts, action, details) => {
        setCustomerParts(newParts);
        updateJob(job.id, {
            estimate: {
                ...job.estimate,
                parts: newParts,
                estimated_parts_total: newParts.reduce((sum, p) => sum + (p.price * p.quantity), 0),
                estimated_total: (job.estimate?.labor || 0) + newParts.reduce((sum, p) => sum + (p.price * p.quantity), 0)
            }
        });
        addAuditLog(job.id, {
            user: 'Customer',
            action,
            details
        });
    };

    const addFromCatalog = (catalogItem) => {
        const newPart = {
            id: Date.now(),
            name: `${catalogItem.name} (${catalogItem.category})`,
            quantity: 1,
            price: catalogItem.price,
            category: catalogItem.category,
            status: 'Requested by Customer',
            customerApproved: true,
            source: catalogItem.source,
            leadTime: catalogItem.leadTime
        };
        handleUpdateParts([...customerParts, newPart], 'Added Part (Catalog)', `Added: ${newPart.name}`);
        setShowCatalog(false);
    };

    const addCustomPart = () => {
        const newPart = {
            id: Date.now(),
            name: '',
            quantity: 1,
            price: 0,
            category: 'Custom',
            status: 'Requested by Customer',
            customerApproved: true,
            source: 'Stock'
        };
        handleUpdateParts([...customerParts, newPart], 'Added Custom Request', 'Customer initiated custom part request');
    };

    const removePart = (index) => {
        const part = customerParts[index];
        const newParts = customerParts.filter((_, i) => i !== index);
        handleUpdateParts(newParts, 'Removed Part', `Customer removed: ${part.name || 'Unnamed'}`);
    };

    const toggleSubstitute = (index) => {
        const part = customerParts[index];
        const isOEM = part.category === 'OEM';
        const searchName = part.name.split(' (')[0];
        const substitute = PART_CATALOG.find(p => p.name === searchName && p.category !== part.category);

        if (substitute) {
            const newParts = [...customerParts];
            newParts[index] = {
                ...newParts[index],
                name: `${substitute.name} (${substitute.category})`,
                price: substitute.price,
                category: substitute.category,
                source: substitute.source,
                leadTime: substitute.leadTime
            };
            handleUpdateParts(newParts, 'Substituted Part', `Switched ${searchName} to ${substitute.category}`);
        } else {
            alert(`No ${isOEM ? 'Aftermarket' : 'OEM'} alternative found in catalog for this item.`);
        }
    };

    const updatePartField = (index, field, value) => {
        const newParts = [...customerParts];
        newParts[index] = { ...newParts[index], [field]: value };
        setCustomerParts(newParts);
    };

    const handleApprove = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            processCustomerApproval(job.id);
            alert('CONFIRMED! Your estimate is approved. Parts have been reserved/ordered and work is scheduled.');
            setIsSubmitting(false);
        }, 800);
    };

    const handlePayment = () => {
        if (!paymentMethod) {
            alert('Please select a payment method.');
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            payInvoice(job.id, paymentMethod);
            alert('Payment Successful! Thank you for choosing our workshop.');
            setIsSubmitting(false);
            navigate('/mechanics/dashboard/jobs');
        }, 1500);
    };

    if (!job) return <div className="p-10 text-center">Loading Job Card...</div>;

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen relative">
            {/* Catalog Modal */}
            {showCatalog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-800">Part Catalog</h3>
                            <button onClick={() => setShowCatalog(false)}><FaTimes /></button>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {PART_CATALOG.map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => addFromCatalog(item)}
                                    className="p-3 hover:bg-blue-50 cursor-pointer rounded-lg border border-transparent hover:border-blue-200 transition mb-1"
                                >
                                    <div className="flex justify-between font-bold text-sm">
                                        <span>{item.name}</span>
                                        <span className="text-blue-600">₹{item.price.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-wider">
                                        <span>{item.category}</span>
                                        <span className={item.source === 'In Stock' ? 'text-green-500' : 'text-orange-500'}>{item.source}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t bg-gray-50">
                            <button
                                onClick={addCustomPart}
                                className="w-full py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg"
                            >
                                Request Custom Item
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <header className="flex items-center justify-between mb-8 bg-white p-4 rounded-xl shadow-sm border">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-blue-600 transition">
                        <FaArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 border-none">Vehicle Job Card</h1>
                        <p className="text-sm text-gray-500">ID: {job.id.toString().slice(-6)} • {job.vehicle?.regNo || 'MH-12-AS-1234'}</p>
                    </div>
                </div>
                <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase">
                    {job.invoice ? 'Final Billing Phase' : 'Review & Approval Phase'}
                </div>
            </header>

            {job.invoice && (
                <div className="flex bg-gray-200 p-1 rounded-xl mb-6 w-fit mx-auto">
                    <button
                        onClick={() => setView('review')}
                        className={`px-6 py-2 rounded-lg text-xs font-bold transition ${view === 'review' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                    >
                        JOB DETAILS
                    </button>
                    <button
                        onClick={() => setView('invoice')}
                        className={`px-6 py-2 rounded-lg text-xs font-bold transition ${view === 'invoice' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                    >
                        VIEW INVOICE
                    </button>
                </div>
            )}

            {view === 'invoice' && job.invoice ? (
                <div className="max-w-3xl mx-auto space-y-6">
                    <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="bg-indigo-900 p-8 text-white relative">
                            <div className="flex justify-between items-start relative z-10">
                                <div>
                                    <h2 className="text-3xl font-black mb-1">Tax Invoice</h2>
                                    <p className="text-indigo-300 font-mono text-sm uppercase tracking-widest">{job.invoice.invoiceNo}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-indigo-300 uppercase">Issue Date</p>
                                    <p className="font-bold">{new Date(job.invoice.generatedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="mt-8 flex gap-8 relative z-10">
                                <div>
                                    <p className="text-[10px] font-bold text-indigo-300 uppercase mb-1">Billed To</p>
                                    <p className="font-bold">Customer Name</p>
                                    <p className="text-xs text-indigo-200 opacity-80">{job.vehicle?.regNo}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-indigo-300 uppercase mb-1">Vehicle</p>
                                    <p className="font-bold">{job.vehicle?.make} {job.vehicle?.model}</p>
                                </div>
                            </div>
                            <FaFileInvoice className="absolute bottom-[-20px] right-8 text-white/5" size={120} />
                        </div>

                        <div className="p-8">
                            <table className="w-full text-sm mb-6">
                                <thead className="border-b-2">
                                    <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        <th className="py-4 text-left">Description</th>
                                        <th className="py-4 text-center">Unit</th>
                                        <th className="py-4 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    <tr className="bg-gray-50/50">
                                        <td className="py-4 font-bold text-gray-700">Spare Parts (Consolidated)</td>
                                        <td className="py-4 text-center">Bulk</td>
                                        <td className="py-4 text-right font-bold">₹{job.invoice.partsSubtotal.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 font-bold text-gray-700">Service & Labor</td>
                                        <td className="py-4 text-center">Hours</td>
                                        <td className="py-4 text-right font-bold">₹{job.invoice.laborSubtotal.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="flex flex-col items-end gap-3 border-t-2 pt-6">
                                <div className="flex justify-between w-full max-w-[240px] text-gray-500 font-bold">
                                    <span>Sub-Total</span>
                                    <span className="text-gray-900 font-black">₹{(job.invoice.partsSubtotal + job.invoice.laborSubtotal).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between w-full max-w-[240px] text-gray-500 font-bold">
                                    <span>GST (18%)</span>
                                    <span className="text-gray-900 font-black">₹{job.invoice.tax.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between w-full max-w-[240px] py-4 border-t border-dashed mt-2">
                                    <span className="text-lg font-bold text-gray-900">Final Total</span>
                                    <span className="text-2xl font-black text-indigo-700">₹{job.invoice.finalTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {job.invoice.status !== 'paid' ? (
                        <section className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                            <h3 className="text-lg font-black mb-6 text-gray-900 border-none">Select Payment Method</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <button
                                    onClick={() => setPaymentMethod('online')}
                                    className={`p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${paymentMethod === 'online' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                                >
                                    <div className={`p-4 rounded-xl ${paymentMethod === 'online' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                        <FaCreditCard size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-gray-900">Online Payment</p>
                                        <p className="text-xs text-gray-500">UPI, Cards, Net Banking</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('manual')}
                                    className={`p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${paymentMethod === 'manual' ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-green-200'}`}
                                >
                                    <div className={`p-4 rounded-xl ${paymentMethod === 'manual' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                        <FaMoneyBillWave size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-gray-900">Pay at Workshop</p>
                                        <p className="text-xs text-gray-500">Cash, POS Machine</p>
                                    </div>
                                </button>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={isSubmitting || !paymentMethod}
                                className="w-full py-5 bg-indigo-900 text-white rounded-2xl font-black text-xl shadow-2xl hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                <FaCheckCircle /> {isSubmitting ? 'PROCESSING...' : `PAY ₹${job.invoice.finalTotal.toLocaleString()}`}
                            </button>
                        </section>
                    ) : (
                        <div className="bg-green-100 border-2 border-green-500 rounded-3xl p-10 text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-200">
                                <FaCheck size={32} />
                            </div>
                            <h2 className="text-3xl font-black text-green-900 mb-2">Payment Received</h2>
                            <p className="text-green-700 font-bold">Ref: <span className="font-mono text-xs">{job.invoice.transactionId}</span></p>

                            {job.status === 'completed' && (
                                <div className="mt-6 p-4 bg-white/50 rounded-2xl border border-green-200">
                                    <p className="text-sm font-bold text-green-800">Vehicle Delivered to {job.deliveryDetails?.receiverName}</p>
                                    <p className="text-[10px] text-green-600 uppercase font-black">{new Date(job.deliveredAt).toLocaleString()} • ID Verified</p>
                                </div>
                            )}

                            {!submittedFeedback ? (
                                <div className="mt-8 pt-8 border-t border-green-200">
                                    <p className="font-bold text-green-900 mb-4 uppercase tracking-widest text-xs">How was your experience?</p>
                                    <div className="flex justify-center gap-2 mb-4">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                                                className={`text-2xl transition ${feedback.rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                    <textarea
                                        placeholder="Add a comment..."
                                        value={feedback.comment}
                                        onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
                                        className="w-full p-3 rounded-xl border border-green-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                                    />
                                    <button
                                        onClick={() => {
                                            if (feedback.rating === 0) return alert('Please select a rating');
                                            setSubmittedFeedback(true);
                                            addAuditLog(job.id, { user: 'Customer', action: 'Feedback Submitted', details: `Rating: ${feedback.rating}/5. Comment: ${feedback.comment}` });
                                        }}
                                        className="mt-4 px-8 py-2 bg-green-600 text-white rounded-lg font-bold text-sm shadow-md"
                                    >
                                        Submit Feedback
                                    </button>
                                </div>
                            ) : (
                                <p className="mt-8 text-green-800 font-bold italic">"Thank you for your valuable feedback!"</p>
                            )}

                            <p className="text-sm text-green-600 mt-10">A digital copy of the invoice has been sent to your registered email.</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Vehicle & Notes */}
                    <div className="lg:col-span-1 space-y-6">
                        <section className="bg-white p-5 rounded-xl shadow-sm border">
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Vehicle Identity</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Make & Model</p>
                                    <p className="font-semibold text-gray-900">{job.vehicle?.make} {job.vehicle?.model}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Odometer Reading</p>
                                    <p className="font-semibold text-gray-900">{job.kmReading || '12,450'} KM</p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white p-5 rounded-xl shadow-sm border">
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Mechanic's Report</h2>
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 italic text-sm text-blue-800 leading-relaxed">
                                "{job.inspectionNotes || 'Visual inspection completed. Brake life at 20%. Suggesting immediate replacement of pads and oil service.'}"
                            </div>
                        </section>

                        <section className="bg-white p-5 rounded-xl shadow-sm border">
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Price Summary</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Service/Labor</span>
                                    <span className="font-bold">₹{totals.labor.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Spare Parts</span>
                                    <span className="font-bold">₹{totals.parts.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-lg font-black pt-2 border-t text-indigo-700">
                                    <span>Total Est.</span>
                                    <span>₹{totals.total.toLocaleString()}</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Interactive Estimate */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-white p-6 rounded-xl shadow-sm border">
                            <div className="flex justify-between items-center mb-6 border-b pb-4">
                                <h2 className="text-lg font-bold text-gray-900">Recommended Spares</h2>
                                <button onClick={() => setShowCatalog(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition">
                                    <FaPlus /> ADD MORE ITEMS
                                </button>
                            </div>

                            {/* Parts Breakdown */}
                            <div className="space-y-4 mb-8">
                                {customerParts.map((part, idx) => (
                                    <div key={part.id || idx} className="bg-gray-50 border rounded-2xl p-4 hover:border-blue-300 transition-all relative overflow-hidden group">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <input
                                                        value={part.name}
                                                        onChange={(e) => updatePartField(idx, 'name', e.target.value)}
                                                        onBlur={() => handleUpdateParts(customerParts, 'Edited Part Name', `Renamed to: ${part.name}`)}
                                                        placeholder="Part Name..."
                                                        className="font-bold text-gray-900 border-none focus:ring-0 p-0 text-base bg-transparent flex-1"
                                                    />
                                                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-widest ${part.category === 'OEM' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                        {part.category || 'Custom'}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap gap-4 items-center">
                                                    <div className="flex items-center gap-1.5 px-2 py-1 bg-white border rounded-lg">
                                                        <span className="text-[10px] font-bold text-gray-400">QTY</span>
                                                        <input
                                                            type="number"
                                                            value={part.quantity}
                                                            onChange={(e) => updatePartField(idx, 'quantity', parseInt(e.target.value) || 0)}
                                                            onBlur={() => handleUpdateParts(customerParts, 'Adjusted Qty', `${part.name} set to ${part.quantity}`)}
                                                            className="w-10 border-none p-0 text-center font-bold text-sm bg-transparent"
                                                        />
                                                    </div>
                                                    <div className="text-[11px] text-gray-500 font-medium">
                                                        Rate: <span className="text-gray-900 font-bold">₹{part.price.toLocaleString()}</span>
                                                    </div>
                                                    <div className="text-[10px] text-indigo-500 font-bold flex items-center gap-1">
                                                        <FaShoppingCart size={10} /> {part.source} {part.leadTime && `(${part.leadTime})`}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-lg font-black text-blue-600">₹{(part.price * part.quantity).toLocaleString()}</p>
                                                <div className="flex gap-2 justify-end mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => toggleSubstitute(idx)}
                                                        className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors title='Switch Alternative'"
                                                    >
                                                        <FaExchangeAlt size={12} />
                                                    </button>
                                                    <button
                                                        onClick={() => removePart(idx)}
                                                        className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                                                    >
                                                        <FaTrash size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {customerParts.length === 0 && (
                                    <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-100 text-gray-400">
                                        <FaFileInvoice size={40} className="mx-auto mb-3 opacity-20" />
                                        <p className="font-bold">No parts added yet</p>
                                        <p className="text-xs">Add items from catalog or request custom parts</p>
                                    </div>
                                )}
                            </div>

                            {/* Final Approval Action */}
                            <div className="bg-indigo-900 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <FaCheck size={100} />
                                </div>

                                <div className="relative z-10">
                                    <p className="text-indigo-300 text-xs font-bold uppercase tracking-[0.2em] mb-1">Grand Total (Parts + Labor)</p>
                                    <h3 className="text-4xl font-black mb-6">₹{totals.total.toLocaleString()}</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <button
                                            onClick={handleApprove}
                                            disabled={isSubmitting}
                                            className={`flex items-center justify-center gap-3 py-4 bg-green-500 hover:bg-green-400 text-white rounded-2xl font-black transition-all shadow-xl hover:scale-[1.02] active:scale-95 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {isSubmitting ? 'PROCESSING...' : (
                                                <>
                                                    <FaCheck /> APPROVE PARTS & CONTINUE
                                                </>
                                            )}
                                        </button>
                                        <button
                                            className="flex items-center justify-center gap-3 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-black transition-all"
                                        >
                                            <FaCommentDots /> CHAT WITH ADVISOR
                                        </button>
                                    </div>
                                    <p className="text-center mt-4 text-[10px] text-indigo-300 uppercase font-bold tracking-widest">
                                        By clicking approve, you authorize the garage to start work and procurement.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerJobView;
