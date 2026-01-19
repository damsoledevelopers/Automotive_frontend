import React, { useMemo } from 'react';
import {
  FaWrench, FaCubes, FaMoneyBillWave, FaClock, FaChartBar,
  FaUserTie, FaCheckCircle, FaExclamationTriangle
} from 'react-icons/fa';

const Analytics = ({ jobs }) => {
  // 1. Jobs per Mechanic
  const jobsPerMechanic = useMemo(() => {
    const counts = {};
    jobs.forEach(job => {
      const mech = job.mechanic || 'Unassigned';
      counts[mech] = (counts[mech] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [jobs]);

  // 2. Parts Consumption
  const partsConsumption = useMemo(() => {
    let totalPartsCost = 0;
    let totalPartsCount = 0;
    jobs.forEach(job => {
      if (job.invoice) {
        totalPartsCost += job.invoice.partsSubtotal || 0;
        const parts = job.invoice.parts || [];
        totalPartsCount += parts.reduce((sum, p) => sum + (p.quantity || 0), 0);
      }
    });
    return { totalPartsCost, totalPartsCount };
  }, [jobs]);

  // 3. Profitability (Simplified: Labor + Markup)
  const financialStats = useMemo(() => {
    let totalRevenue = 0;
    let totalLaborProfit = 0;
    let completedJobs = 0;

    jobs.forEach(job => {
      if (job.status === 'completed' || job.status === 'paid') {
        completedJobs++;
        if (job.invoice) {
          totalRevenue += job.invoice.finalTotal || 0;
          totalLaborProfit += job.invoice.laborSubtotal || 0;
        }
      }
    });

    return { totalRevenue, totalLaborProfit, completedJobs };
  }, [jobs]);

  // 4. Average Turnaround Time (TAT)
  const averageTAT = useMemo(() => {
    const completedWithDates = jobs.filter(j => j.createdAt && j.deliveredAt);
    if (completedWithDates.length === 0) return 'N/A';

    const totalTime = completedWithDates.reduce((sum, job) => {
      const start = new Date(job.createdAt).getTime();
      const end = new Date(job.deliveredAt).getTime();
      return sum + (end - start);
    }, 0);

    const avgMs = totalTime / completedWithDates.length;
    const avgHrs = Math.floor(avgMs / (1000 * 60 * 60));
    return `${avgHrs} Hours`;
  }, [jobs]);

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Performance Analytics</h3>
        <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase">Live Operations Data</span>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><FaMoneyBillWave size={20} /></div>
            <span className="text-[10px] font-bold text-green-500">+12% vs last month</span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Gross Revenue</p>
          <h4 className="text-2xl font-black text-gray-900">₹{financialStats.totalRevenue.toLocaleString()}</h4>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><FaChartBar size={20} /></div>
            <span className="text-[10px] font-bold text-indigo-500">Service Margin</span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Labor Profitability</p>
          <h4 className="text-2xl font-black text-gray-900">₹{financialStats.totalLaborProfit.toLocaleString()}</h4>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><FaClock size={20} /></div>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Avg Turnaround</p>
          <h4 className="text-2xl font-black text-gray-900">{averageTAT}</h4>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl"><FaCheckCircle size={20} /></div>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Completion Rate</p>
          <h4 className="text-2xl font-black text-gray-900">
            {jobs.length > 0 ? Math.round((financialStats.completedJobs / jobs.length) * 100) : 0}%
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Jobs per Mechanic */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b flex justify-between items-center">
            <h4 className="font-bold text-gray-900 flex items-center gap-2">
              <FaUserTie className="text-blue-500" /> Jobs per Mechanic
            </h4>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {jobsPerMechanic.map(([name, count]) => (
                <div key={name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-bold text-gray-700">{name}</span>
                    <span className="font-black text-blue-600">{count} Jobs</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(100, (count / jobs.length) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
              {jobsPerMechanic.length === 0 && (
                <p className="text-center py-10 text-gray-400 text-sm italic">No assignments recorded</p>
              )}
            </div>
          </div>
        </section>

        {/* Parts Consumption Details */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b flex justify-between items-center">
            <h4 className="font-bold text-gray-900 flex items-center gap-2">
              <FaCubes className="text-orange-500" /> Parts Consumption
            </h4>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-orange-50 p-4 rounded-xl">
                <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">Total Units Consumed</p>
                <p className="text-2xl font-black text-orange-600">{partsConsumption.totalPartsCount}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Inventory Flow Value</p>
                <p className="text-2xl font-black text-blue-600">₹{partsConsumption.totalPartsCost.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-dashed border-gray-200">
              <h5 className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">Consumption Analytics</h5>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-600">Avg Parts per Job</span>
                  <span className="text-sm font-black text-gray-900">
                    {jobs.length > 0 ? (partsConsumption.totalPartsCount / jobs.length).toFixed(1) : 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-600">Avg Parts Value</span>
                  <span className="text-sm font-black text-gray-900">
                    ₹{jobs.length > 0 ? (partsConsumption.totalPartsCost / jobs.length).toLocaleString() : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Low Stock / Alerts Placeholder */}
      <section className="bg-red-50 border border-red-100 rounded-2xl p-5 flex items-center gap-4">
        <div className="p-3 bg-red-100 text-red-600 rounded-xl">
          <FaExclamationTriangle size={20} />
        </div>
        <div>
          <h4 className="font-bold text-red-900 text-sm">Inventory Alerts</h4>
          <p className="text-red-700 text-xs">3 high-demand parts are running below safety stock levels. Check procurement.</p>
        </div>
        <button className="ml-auto px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold shadow-md">
          Manage Stock
        </button>
      </section>
    </div>
  );
};

export default Analytics;
