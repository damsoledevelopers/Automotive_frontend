import React, { useState, useMemo } from 'react';
import { useJob } from '../../../../contexts/JobContext';
import {
    FaShoppingCart, FaTruck, FaCheckCircle, FaClock,
    FaPlus, FaBuilding, FaSearch, FaHistory
} from 'react-icons/fa';

const SUPPLIERS = [
    { id: 1, name: 'Metro Auto Spares', contact: '+91 99001 22334', rating: 4.8 },
    { id: 2, name: 'City Engines & Parts', contact: '+91 99001 55667', rating: 4.5 },
    { id: 3, name: 'Global Aftermarket Ltd', contact: '+91 99001 88990', rating: 4.2 },
];

const Procurement = () => {
    const { jobs, purchaseOrders, createPurchaseOrder, receivePurchaseOrder } = useJob();
    const [selectedReqs, setSelectedReqs] = useState([]);
    const [supplierId, setSupplierId] = useState('');
    const [view, setView] = useState('requisitions'); // requisitions | orders

    // Extract all requisitions from all jobs
    const allRequisitions = useMemo(() => {
        return jobs.flatMap(job =>
            (job.partRequisitions || []).map(req => ({
                ...req,
                vehicleInfo: `${job.vehicle?.make} ${job.vehicle?.model} (${job.vehicle?.regNo})`,
                jobId: job.id
            }))
        );
    }, [jobs]);

    const pendingRequisitions = allRequisitions.filter(r => r.status === 'Procure Needed');
    const reservedRequisitions = allRequisitions.filter(r => r.status === 'Reserved');
    const orderedRequisitions = allRequisitions.filter(r => r.status === 'Ordered');

    const handleToggleReq = (id) => {
        setSelectedReqs(prev =>
            prev.includes(id) ? prev.filter(reqId => reqId !== id) : [...prev, id]
        );
    };

    const handleGeneratePO = () => {
        if (!supplierId || selectedReqs.length === 0) {
            alert('Please select a supplier and at least one item.');
            return;
        }

        const supplier = SUPPLIERS.find(s => s.id === parseInt(supplierId));
        const items = allRequisitions.filter(r => selectedReqs.includes(r.id));

        createPurchaseOrder({
            supplierName: supplier.name,
            supplierId: supplier.id,
            requisitionIds: selectedReqs,
            items: items.map(i => ({ name: i.partName, qty: i.qty })),
            totalItems: items.length
        });

        setSelectedReqs([]);
        setSupplierId('');
        setView('orders');
        alert(`PO Generated for ${supplier.name}`);
    };

    return (
        <div className="p-4 md:p-6 space-y-6">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 border-none">Parts Procurement</h1>
                    <p className="text-sm text-gray-500 font-medium">Manage requisitions, purchase orders, and inventory stock-ins.</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setView('requisitions')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition ${view === 'requisitions' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                    >
                        REQUISITIONS
                    </button>
                    <button
                        onClick={() => setView('orders')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition ${view === 'orders' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                    >
                        PURCHASE ORDERS
                    </button>
                </div>
            </header>

            {view === 'requisitions' ? (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Requisition List */}
                    <div className="xl:col-span-2 space-y-4">
                        <section className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Pending Procurement ({pendingRequisitions.length})</h3>
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                                    <input placeholder="Filter parts..." className="pl-8 pr-4 py-1.5 bg-white border rounded-lg text-xs focus:ring-1 focus:ring-blue-500 outline-none w-48" />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-white text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b">
                                            <th className="px-6 py-4 w-10">Select</th>
                                            <th className="px-6 py-4">Part / Spec</th>
                                            <th className="px-6 py-4 text-center">Qty</th>
                                            <th className="px-6 py-4">Vehicle / Job</th>
                                            <th className="px-6 py-4">Source</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y text-sm">
                                        {pendingRequisitions.map((req) => (
                                            <tr key={req.id} className={`hover:bg-blue-50/50 transition cursor-pointer ${selectedReqs.includes(req.id) ? 'bg-blue-50' : ''}`} onClick={() => handleToggleReq(req.id)}>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedReqs.includes(req.id)}
                                                        onChange={() => { }} // Handled by row click
                                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-gray-900">{req.partName}</p>
                                                    <p className="text-[10px] text-gray-400">ID: {req.id}</p>
                                                </td>
                                                <td className="px-6 py-4 text-center font-black text-blue-600">{req.qty}</td>
                                                <td className="px-6 py-4">
                                                    <p className="text-[11px] font-bold text-gray-700">{req.vehicleInfo}</p>
                                                    <p className="text-[9px] text-gray-400 uppercase">Job #{req.jobId.toString().slice(-6)}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-[9px] font-bold uppercase">
                                                        {req.source}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {pendingRequisitions.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                                    <FaCheckCircle size={40} className="mx-auto mb-3 opacity-20" />
                                                    <p className="font-bold">No items pending procurement</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <section className="bg-white p-4 rounded-xl border shadow-sm">
                                <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 px-2 flex items-center gap-2">
                                    <FaClock className="text-green-500" /> Recently Reserved (Stock)
                                </h4>
                                <div className="space-y-2">
                                    {reservedRequisitions.slice(0, 5).map(req => (
                                        <div key={req.id} className="flex justify-between items-center p-2 bg-green-50 rounded-lg border border-green-100 italic">
                                            <span className="text-xs font-bold text-green-800">{req.partName}</span>
                                            <span className="text-[10px] text-green-600 font-black">Qty {req.qty}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            <section className="bg-white p-4 rounded-xl border shadow-sm">
                                <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 px-2 flex items-center gap-2">
                                    <FaTruck className="text-blue-500" /> Active Shipments
                                </h4>
                                <div className="space-y-2">
                                    {orderedRequisitions.slice(0, 5).map(req => (
                                        <div key={req.id} className="flex justify-between items-center p-2 bg-blue-50 rounded-lg border border-blue-100">
                                            <span className="text-xs font-bold text-blue-800">{req.partName}</span>
                                            <span className="text-[9px] text-blue-500 font-bold uppercase">ETA: {new Date(req.eta).toLocaleDateString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Action Panel */}
                    <div className="xl:col-span-1">
                        <section className="bg-indigo-900 rounded-2xl p-6 text-white shadow-xl sticky top-24">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <FaShoppingCart /> Batch PO Generator
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-indigo-300 uppercase mb-2">Selected Items ({selectedReqs.length})</label>
                                    <div className="bg-white/10 rounded-xl p-3 border border-white/10 min-h-[100px] max-h-[200px] overflow-y-auto no-scrollbar">
                                        {selectedReqs.map(id => {
                                            const req = pendingRequisitions.find(r => r.id === id);
                                            return req ? (
                                                <div key={id} className="flex justify-between text-xs py-1.5 border-b border-white/5 last:border-0">
                                                    <span className="font-bold opacity-90">{req.partName}</span>
                                                    <span className="font-black text-indigo-300">x{req.qty}</span>
                                                </div>
                                            ) : null;
                                        })}
                                        {selectedReqs.length === 0 && <p className="text-xs text-indigo-300/50 italic">Select parts from the list to bundle into a PO.</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-indigo-300 uppercase mb-2">Select Supplier</label>
                                    <select
                                        value={supplierId}
                                        onChange={(e) => setSupplierId(e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                                    >
                                        <option value="" className="text-gray-900">Choose a supplier...</option>
                                        {SUPPLIERS.map(s => (
                                            <option key={s.id} value={s.id} className="text-gray-900">{s.name} (⭐ {s.rating})</option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    onClick={handleGeneratePO}
                                    className="w-full py-4 bg-green-500 hover:bg-green-400 text-white rounded-2xl font-black transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                                    disabled={selectedReqs.length === 0 || !supplierId}
                                >
                                    <FaPlus /> GENERATE PURCHASE ORDER
                                </button>

                                <p className="text-[9px] text-center text-indigo-300 uppercase font-bold tracking-widest opacity-60">
                                    System will auto-notify mechanics upon PO generation.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Active Purchase Orders View */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {purchaseOrders.map((po) => (
                            <div key={po.id} className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                                        <FaBuilding size={20} />
                                    </div>
                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${po.status === 'Received' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {po.status}
                                    </span>
                                </div>
                                <h4 className="font-black text-gray-900 text-lg mb-1">{po.supplierName}</h4>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter mb-4">PO #{po.id.replace('PO-', '')}</p>

                                <div className="space-y-2 mb-6">
                                    {po.items.map((item, i) => (
                                        <div key={i} className="flex justify-between text-sm">
                                            <span className="text-gray-600">{item.name}</span>
                                            <span className="font-bold">x{item.qty}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 bg-gray-50 p-2 rounded-lg">
                                    <FaClock /> <span>Expected: {new Date(po.eta).toLocaleDateString()}</span>
                                </div>

                                {po.status !== 'Received' ? (
                                    <button
                                        onClick={() => receivePurchaseOrder(po.id)}
                                        className="w-full py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
                                    >
                                        MARK AS RECEIVED
                                    </button>
                                ) : (
                                    <div className="flex items-center justify-center gap-2 py-2 text-green-600 font-bold text-xs bg-green-50 rounded-xl border border-green-100">
                                        <FaCheckCircle /> INVENTORY STOCKED-IN
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {purchaseOrders.length === 0 && (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <FaHistory size={48} className="mx-auto mb-4 text-gray-300" />
                            <h3 className="text-lg font-bold text-gray-400">No Purchase Orders Found</h3>
                            <p className="text-sm text-gray-400">Generate a PO from the Requisitions tab to see it here.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Procurement;
