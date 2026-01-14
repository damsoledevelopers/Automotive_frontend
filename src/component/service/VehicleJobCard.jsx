import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJob } from '../../contexts/JobContext';
import { useAuth } from '../../auth/AuthContext';
import { FaPrint, FaSave } from 'react-icons/fa';

const VehicleJobCard = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { jobs, updateJob } = useJob();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    jobNo: '',
    jobDate: new Date().toISOString().split('T')[0],
    carRegistrationNo: '',
    year: '',
    mileage: '',
    dateTimeIn: '',
    dateTimeOut: '',
    carMake: '',
    carModel: '',
    customerName: '',
    customerContactNo: '',
    engineNo: '',
    vinNo: '',
    reportedDefect: '',
    completedAction: '',
    vehicleBodyReportComments: '',
    parts: [],
    labour: 0,
    subTotal: 0,
    vat: 0,
    total: 0,
    technicianName: '',
    technicianSignature: '',
    technicianDate: new Date().toISOString().split('T')[0],
    bodyDamageAreas: {}
  });

  useEffect(() => {
    const foundJob = jobs.find(j => j.id === parseInt(jobId));
    if (foundJob) {
      setJob(foundJob);
      // Populate form with job data
      setFormData(prev => ({
        ...prev,
        jobNo: foundJob.id.toString().padStart(6, '0'),
        jobDate: foundJob.createdAt ? new Date(foundJob.createdAt).toISOString().split('T')[0] : prev.jobDate,
        carRegistrationNo: foundJob.vehicle?.registrationNumber || '',
        year: foundJob.vehicle?.year || '',
        mileage: foundJob.mileage || '',
        dateTimeIn: foundJob.preferredSlot || '',
        carMake: foundJob.vehicle?.make || '',
        carModel: `${foundJob.vehicle?.model || ''} ${foundJob.vehicle?.variant || ''}`.trim(),
        customerName: foundJob.customerName || '',
        customerContactNo: foundJob.customerContactNo || '',
        engineNo: foundJob.vehicle?.engine || '',
        vinNo: foundJob.vehicle?.vin || '',
        reportedDefect: foundJob.symptoms || '',
        completedAction: foundJob.diagnosis || foundJob.completedAction || '',
        parts: (foundJob.estimate?.parts || []).map(part => ({
          partNo: part.sku || part.partNo || '',
          partDescription: part.name || part.partDescription || '',
          qty: part.quantity || part.qty || 1,
          unitPrice: part.price || part.selectedOption?.price || part.unitPrice || 0,
          lineTotal: (part.quantity || part.qty || 1) * (part.price || part.selectedOption?.price || 0),
          labour: part.labour || 0
        })),
        labour: foundJob.estimate?.labor || 0,
        subTotal: (() => {
          const partsTotal = (foundJob.estimate?.parts || []).reduce((sum, part) => {
            const qty = part.quantity || part.qty || 1;
            const price = part.price || part.selectedOption?.price || 0;
            return sum + (qty * price);
          }, 0);
          const perPartLabour = (foundJob.estimate?.parts || []).reduce((sum, part) => sum + (part.labour || 0), 0);
          const totalLabour = foundJob.estimate?.labor || 0;
          return partsTotal + totalLabour + perPartLabour;
        })(),
        vat: (() => {
          const partsTotal = (foundJob.estimate?.parts || []).reduce((sum, part) => {
            const qty = part.quantity || part.qty || 1;
            const price = part.price || part.selectedOption?.price || 0;
            return sum + (qty * price);
          }, 0);
          const perPartLabour = (foundJob.estimate?.parts || []).reduce((sum, part) => sum + (part.labour || 0), 0);
          const totalLabour = foundJob.estimate?.labor || 0;
          const subTotal = partsTotal + totalLabour + perPartLabour;
          return subTotal * 0.18;
        })(),
        total: (() => {
          const partsTotal = (foundJob.estimate?.parts || []).reduce((sum, part) => {
            const qty = part.quantity || part.qty || 1;
            const price = part.price || part.selectedOption?.price || 0;
            return sum + (qty * price);
          }, 0);
          const perPartLabour = (foundJob.estimate?.parts || []).reduce((sum, part) => sum + (part.labour || 0), 0);
          const totalLabour = foundJob.estimate?.labor || 0;
          const subTotal = partsTotal + totalLabour + perPartLabour;
          return subTotal * 1.18;
        })(),
        technicianName: user?.name || '',
        bodyDamageAreas: foundJob.bodyDamageAreas || {}
      }));
    }
  }, [jobId, jobs, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Calculate totals when labour changes
      if (name === 'labour') {
        const partsTotal = updated.parts.reduce((sum, part) => {
          return sum + (parseFloat(part.lineTotal || 0) || 0);
        }, 0);
        const perPartLabour = updated.parts.reduce((sum, part) => {
          return sum + (parseFloat(part.labour || 0) || 0);
        }, 0);
        const labour = parseFloat(updated.labour) || 0;
        updated.subTotal = partsTotal + labour + perPartLabour;
        updated.vat = updated.subTotal * 0.18; // 18% VAT
        updated.total = updated.subTotal + updated.vat;
      }
      
      return updated;
    });
  };

  const handlePartChange = (index, field, value) => {
    setFormData(prev => {
      const updatedParts = [...prev.parts];
      const part = updatedParts[index] || {};
      
      // Update the field
      updatedParts[index] = { 
        ...part, 
        [field]: field === 'qty' || field === 'unitPrice' || field === 'labour' 
          ? parseFloat(value) || 0 
          : value
      };
      
      // Recalculate line total when qty or unitPrice changes
      if (field === 'qty' || field === 'unitPrice') {
        const qty = parseFloat(updatedParts[index].qty || 1) || 1;
        const unitPrice = parseFloat(updatedParts[index].unitPrice || 0) || 0;
        updatedParts[index].lineTotal = qty * unitPrice;
      }
      
      // Calculate totals (include per-part labour)
      const partsTotal = updatedParts.reduce((sum, part) => {
        return sum + (parseFloat(part.lineTotal || 0) || 0);
      }, 0);
      const perPartLabour = updatedParts.reduce((sum, part) => {
        return sum + (parseFloat(part.labour || 0) || 0);
      }, 0);
      const totalLabour = parseFloat(prev.labour) || 0;
      const subTotal = partsTotal + totalLabour + perPartLabour;
      const vat = subTotal * 0.18;
      const total = subTotal + vat;
      
      return {
        ...prev,
        parts: updatedParts,
        subTotal,
        vat,
        total
      };
    });
  };

  const addPartRow = () => {
    setFormData(prev => ({
      ...prev,
      parts: [...prev.parts, {
        partNo: '',
        partDescription: '',
        qty: 1,
        unitPrice: 0,
        lineTotal: 0,
        labour: 0
      }]
    }));
  };

  const handleLabourChange = (e) => {
    const labour = parseFloat(e.target.value) || 0;
    setFormData(prev => {
      const partsTotal = prev.parts.reduce((sum, part) => {
        return sum + (parseFloat(part.lineTotal || 0) || 0);
      }, 0);
      const perPartLabour = prev.parts.reduce((sum, part) => {
        return sum + (parseFloat(part.labour || 0) || 0);
      }, 0);
      const subTotal = partsTotal + labour + perPartLabour;
      const vat = subTotal * 0.18;
      const total = subTotal + vat;
      return {
        ...prev,
        labour,
        subTotal,
        vat,
        total
      };
    });
  };

  // const removePartRow = (index) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     parts: prev.parts.filter((_, i) => i !== index)
  //   }));
  // };

  const handleSave = () => {
    if (job) {
      updateJob(job.id, {
        jobCard: formData,
        completedAction: formData.completedAction,
        vehicleBodyReport: formData.vehicleBodyReportComments
      });
      alert('Job card saved successfully!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // const handleBodyDamageMark = (area) => {
  //   // Toggle damage mark on body diagram
  //   setFormData(prev => ({
  //     ...prev,
  //     bodyDamageAreas: {
  //       ...prev.bodyDamageAreas,
  //       [area]: !prev.bodyDamageAreas?.[area]
  //     }
  //   }));
  // };

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

  return (
    <div className="min-h-screen bg-yellow-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Action Buttons */}
        <div className="mb-6 flex gap-4 justify-end print:hidden">
          <button onClick={handleSave} className="btn-primary flex items-center gap-2">
            <FaSave /> Save
          </button>
          <button onClick={handlePrint} className="btn-secondary flex items-center gap-2">
            <FaPrint /> Print
          </button>
          <button onClick={() => navigate(`/service/job/${jobId}`)} className="btn-outline">
            Back to Job
          </button>
        </div>

        {/* Job Card Form */}
        <div className="bg-white shadow-lg p-8 print:shadow-none">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-black mb-2">VEHICLE JOB CARD</h1>
          </div>

          {/* Top Section - Vehicle and Customer Details */}
          <div className="mb-6 space-y-4">
            {/* Row 1 */}
            <div className="grid grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Job No.</label>
                <input
                  type="text"
                  name="jobNo"
                  value={formData.jobNo}
                  onChange={handleInputChange}
                  className="w-full border-2 border-black px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Job Date</label>
                <input
                  type="date"
                  name="jobDate"
                  value={formData.jobDate}
                  onChange={handleInputChange}
                  className="w-full border-2 border-black px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Car Registration No.</label>
                <input
                  type="text"
                  name="carRegistrationNo"
                  value={formData.carRegistrationNo}
                  onChange={handleInputChange}
                  className="w-full border-2 border-black px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Year</label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full border-2 border-black px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Mileage</label>
                <input
                  type="text"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  className="w-full border-2 border-black px-2 py-1 text-sm"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Date/Time In</label>
                <input
                  type="text"
                  name="dateTimeIn"
                  value={formData.dateTimeIn}
                  onChange={handleInputChange}
                  placeholder="DD/MM/YYYY HH:MM"
                  className="w-full border-2 border-black px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Date/Time Out</label>
                <input
                  type="text"
                  name="dateTimeOut"
                  value={formData.dateTimeOut}
                  onChange={handleInputChange}
                  placeholder="DD/MM/YYYY HH:MM"
                  className="w-full border-2 border-black px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Car Make</label>
                <input
                  type="text"
                  name="carMake"
                  value={formData.carMake}
                  onChange={handleInputChange}
                  className="w-full border-2 border-black px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Car Model</label>
                <input
                  type="text"
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleInputChange}
                  className="w-full border-2 border-black px-2 py-1 text-sm"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full border-2 border-black px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Customer Contact No.</label>
                <input
                  type="text"
                  name="customerContactNo"
                  value={formData.customerContactNo}
                  onChange={handleInputChange}
                  className="w-full border-2 border-black px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Engine No.</label>
                <input
                  type="text"
                  name="engineNo"
                  value={formData.engineNo}
                  onChange={handleInputChange}
                  className="w-full border-2 border-black px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">VIN No.</label>
                <input
                  type="text"
                  name="vinNo"
                  value={formData.vinNo}
                  onChange={handleInputChange}
                  className="w-full border-2 border-black px-2 py-1 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Left - Reported Defect and Completed Action */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Reported Defect</label>
                <textarea
                  name="reportedDefect"
                  value={formData.reportedDefect}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full border-2 border-black px-2 py-1 text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Completed Action</label>
                <textarea
                  name="completedAction"
                  value={formData.completedAction}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full border-2 border-black px-2 py-1 text-sm resize-none"
                />
              </div>
            </div>

            {/* Right - Vehicle Body Report */}
            <div>
              <h3 className="text-sm font-semibold text-black mb-4">
                Vehicle Body Report (Mark with X where damage)
              </h3>
              
              {/* Car Diagrams */}
              <div className="space-y-4 mb-4">
                {/* Top View */}
                <div className="border-2 border-black p-4">
                  <div className="text-center mb-2">
                    <span className="text-xs font-semibold">TOP VIEW</span>
                  </div>
                  <div className="relative h-32 bg-gray-100 flex items-center justify-center">
                    <div className="w-48 h-24 border-2 border-black rounded relative">
                      <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-xs font-semibold">LEFT</div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 text-xs font-semibold">FRONT</div>
                      <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-xs font-semibold">RIGHT</div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 text-xs font-semibold">REAR</div>
                      {/* Damage marks */}
                      {formData.bodyDamageAreas && Object.entries(formData.bodyDamageAreas).map(([area, marked]) => (
                        marked && (
                          <div
                            key={area}
                            className="absolute w-4 h-4 bg-red-600 rounded-full"
                            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                          >
                            <span className="text-white text-xs font-bold">X</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom View */}
                <div className="border-2 border-black p-4">
                  <div className="text-center mb-2">
                    <span className="text-xs font-semibold">BOTTOM VIEW</span>
                  </div>
                  <div className="relative h-32 bg-gray-100 flex items-center justify-center">
                    <div className="w-48 h-24 border-2 border-black rounded relative">
                      <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-xs font-semibold">LEFT</div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 text-xs font-semibold">FRONT</div>
                      <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-xs font-semibold">RIGHT</div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 text-xs font-semibold">REAR</div>
                    </div>
                  </div>
                </div>

                {/* Side View */}
                <div className="border-2 border-black p-4">
                  <div className="text-center mb-2">
                    <span className="text-xs font-semibold">SIDE VIEW</span>
                  </div>
                  <div className="relative h-32 bg-gray-100 flex items-center justify-center">
                    <div className="w-48 h-24 border-2 border-black rounded relative">
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 text-xs font-semibold">RIGHT</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">Vehicle Body Report Comments</label>
                <textarea
                  name="vehicleBodyReportComments"
                  value={formData.vehicleBodyReportComments}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full border-2 border-black px-2 py-1 text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Parts and Labour Table */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-black mb-2">Parts and Labour</h3>
            <div className="border-2 border-black">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-black px-2 py-1 text-left font-semibold">Part No.</th>
                    <th className="border border-black px-2 py-1 text-left font-semibold">Part Description</th>
                    <th className="border border-black px-2 py-1 text-center font-semibold">Qty</th>
                    <th className="border border-black px-2 py-1 text-right font-semibold">Unit Price</th>
                    <th className="border border-black px-2 py-1 text-right font-semibold">Line Total</th>
                    <th className="border border-black px-2 py-1 text-right font-semibold">Labour</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.parts.map((part, index) => (
                    <tr key={index}>
                      <td className="border border-black px-2 py-1">
                        <input
                          type="text"
                          value={part.partNo || part.sku || ''}
                          onChange={(e) => handlePartChange(index, 'partNo', e.target.value)}
                          className="w-full border-0 focus:outline-none text-sm"
                        />
                      </td>
                      <td className="border border-black px-2 py-1">
                        <input
                          type="text"
                          value={part.partDescription || part.name || ''}
                          onChange={(e) => handlePartChange(index, 'partDescription', e.target.value)}
                          className="w-full border-0 focus:outline-none text-sm"
                        />
                      </td>
                      <td className="border border-black px-2 py-1">
                        <input
                          type="number"
                          value={part.qty || part.quantity || 1}
                          onChange={(e) => handlePartChange(index, 'qty', e.target.value)}
                          className="w-full border-0 focus:outline-none text-sm text-center"
                          min="1"
                        />
                      </td>
                      <td className="border border-black px-2 py-1">
                        <input
                          type="number"
                          value={part.unitPrice || part.price || 0}
                          onChange={(e) => handlePartChange(index, 'unitPrice', e.target.value)}
                          className="w-full border-0 focus:outline-none text-sm text-right"
                          step="0.01"
                        />
                      </td>
                      <td className="border border-black px-2 py-1 text-right">
                        ₹{(part.lineTotal || 0).toFixed(2)}
                      </td>
                      <td className="border border-black px-2 py-1">
                        <input
                          type="number"
                          value={part.labour || 0}
                          onChange={(e) => handlePartChange(index, 'labour', e.target.value)}
                          className="w-full border-0 focus:outline-none text-sm text-right"
                          step="0.01"
                        />
                      </td>
                    </tr>
                  ))}
                  {/* Add empty rows if needed */}
                  {formData.parts.length < 10 && Array.from({ length: 10 - formData.parts.length }).map((_, index) => (
                    <tr key={`empty-${index}`}>
                      <td className="border border-black px-2 py-1 h-8"></td>
                      <td className="border border-black px-2 py-1"></td>
                      <td className="border border-black px-2 py-1"></td>
                      <td className="border border-black px-2 py-1"></td>
                      <td className="border border-black px-2 py-1"></td>
                      <td className="border border-black px-2 py-1"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Section */}
            <div className="flex justify-end mt-4">
              <div className="w-64 space-y-2">
                <div className="flex justify-between border-2 border-black px-2 py-1">
                  <span className="font-semibold text-sm">Parts Total</span>
                  <span className="text-sm text-right font-semibold">
                    ₹{formData.parts.reduce((sum, part) => sum + (parseFloat(part.lineTotal || 0) || 0), 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-2 border-black px-2 py-1">
                  <span className="font-semibold text-sm">Total Labour</span>
                  <input
                    type="number"
                    name="labour"
                    value={formData.labour}
                    onChange={handleLabourChange}
                    className="w-24 border-0 focus:outline-none text-sm text-right font-semibold bg-transparent"
                    step="0.01"
                  />
                </div>
                <div className="flex justify-between border-2 border-black px-2 py-1">
                  <span className="font-semibold text-sm">Sub Total</span>
                  <input
                    type="text"
                    name="subTotal"
                    value={`₹${formData.subTotal.toFixed(2)}`}
                    readOnly
                    className="w-24 border-0 focus:outline-none text-sm text-right font-semibold bg-transparent"
                  />
                </div>
                <div className="flex justify-between border-2 border-black px-2 py-1">
                  <span className="font-semibold text-sm">VAT (18%)</span>
                  <input
                    type="text"
                    name="vat"
                    value={`₹${formData.vat.toFixed(2)}`}
                    readOnly
                    className="w-24 border-0 focus:outline-none text-sm text-right font-semibold bg-transparent"
                  />
                </div>
                <div className="flex justify-between border-2 border-black px-2 py-1 bg-gray-200">
                  <span className="font-bold text-sm">TOTAL</span>
                  <input
                    type="text"
                    name="total"
                    value={`₹${formData.total.toFixed(2)}`}
                    readOnly
                    className="w-24 border-0 focus:outline-none text-sm text-right font-bold bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Add Part Button */}
          <div className="mb-6 print:hidden">
            <button
              onClick={addPartRow}
              className="btn-outline text-sm"
            >
              + Add Part Row
            </button>
          </div>

          {/* Footer */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Technician Name</label>
              <input
                type="text"
                name="technicianName"
                value={formData.technicianName}
                onChange={handleInputChange}
                className="w-full border-2 border-black px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Technician Signature</label>
              <input
                type="text"
                name="technicianSignature"
                value={formData.technicianSignature}
                onChange={handleInputChange}
                className="w-full border-2 border-black px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Date</label>
              <input
                type="date"
                name="technicianDate"
                value={formData.technicianDate}
                onChange={handleInputChange}
                className="w-full border-2 border-black px-2 py-1 text-sm"
              />
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 text-xs text-gray-600 italic">
            This is not an invoice, all estimates are valid for 30 days
          </div>

          {/* Copyright */}
          <div className="mt-4 text-xs text-gray-500 text-right">
            DESIGN BY BIGBOLDCREATIVE.COM © COPYRIGHT 2019
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          body {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
};

export default VehicleJobCard;

