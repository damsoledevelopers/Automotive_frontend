import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const JobContext = createContext(null);

const initialState = {
  jobs: [],
  activeJob: null,
  purchaseOrders: [],
};

export const JobProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem('jobs');
    return stored ? JSON.parse(stored) : initialState;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(state));
  }, [state]);

  const createJob = useCallback((jobData) => {
    const newJob = {
      id: Date.now(),
      ...jobData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      milestones: [{
        type: 'job_created',
        timestamp: new Date().toISOString(),
        description: 'Job created by customer'
      }],
      media: [],
      approvals: {
        customer: false,
        mechanic: false
      }
    };

    setState(prev => ({
      ...prev,
      jobs: [...prev.jobs, newJob],
      activeJob: newJob
    }));

    return newJob;
  }, []);

  const updateJob = useCallback((jobId, updates) => {
    setState(prev => ({
      ...prev,
      jobs: prev.jobs.map(job =>
        job.id === jobId ? { ...job, ...updates } : job
      ),
      activeJob: prev.activeJob?.id === jobId
        ? { ...prev.activeJob, ...updates }
        : prev.activeJob
    }));
  }, []);

  const addDiagnosis = useCallback((jobId, diagnosis) => {
    const milestone = {
      type: 'diagnosis_completed',
      timestamp: new Date().toISOString(),
      description: 'Mechanic completed diagnosis'
    };

    setState(prev => ({
      ...prev,
      jobs: prev.jobs.map(job =>
        job.id === jobId
          ? {
            ...job,
            diagnosis,
            status: 'diagnosed',
            milestones: [...(job.milestones || []), milestone]
          }
          : job
      )
    }));
  }, []);

  const buildPartsBasket = useCallback((jobId, parts) => {
    setState(prev => ({
      ...prev,
      jobs: prev.jobs.map(job =>
        job.id === jobId
          ? { ...job, partsBasket: parts }
          : job
      )
    }));
  }, []);

  const createEstimate = useCallback((jobId, estimate) => {
    const milestone = {
      type: 'estimate_created',
      timestamp: new Date().toISOString(),
      description: 'Estimate created by mechanic'
    };

    setState(prev => ({
      ...prev,
      jobs: prev.jobs.map(job =>
        job.id === jobId
          ? {
            ...job,
            estimate,
            status: 'estimate_ready',
            milestones: [...(job.milestones || []), milestone]
          }
          : job
      )
    }));
  }, []);

  const approveEstimate = useCallback((jobId, approver) => {
    const milestone = {
      type: 'estimate_approved',
      timestamp: new Date().toISOString(),
      description: `Estimate approved by ${approver}`
    };

    setState(prev => ({
      ...prev,
      jobs: prev.jobs.map(job => {
        if (job.id === jobId) {
          const approvals = { ...job.approvals, [approver]: true };
          const allApproved = approvals.customer && approvals.mechanic;

          return {
            ...job,
            approvals,
            status: allApproved ? 'approved' : job.status,
            milestones: [...(job.milestones || []), milestone]
          };
        }
        return job;
      })
    }));
  }, []);

  const addMedia = useCallback((jobId, mediaItem) => {
    setState(prev => ({
      ...prev,
      jobs: prev.jobs.map(job =>
        job.id === jobId
          ? {
            ...job,
            media: [...(job.media || []), {
              ...mediaItem,
              uploadedAt: new Date().toISOString()
            }]
          }
          : job
      )
    }));
  }, []);

  const updateJobStatus = useCallback((jobId, status, description) => {
    const milestone = {
      type: status,
      timestamp: new Date().toISOString(),
      description: description || `Job status changed to ${status}`
    };

    setState(prev => ({
      ...prev,
      jobs: prev.jobs.map(job =>
        job.id === jobId
          ? {
            ...job,
            status,
            milestones: [...(job.milestones || []), milestone]
          }
          : job
      )
    }));
  }, []);

  const completeQC = useCallback((jobId, qcData) => {
    const milestone = {
      type: 'qc_completed',
      timestamp: new Date().toISOString(),
      description: 'Quality check completed'
    };

    setState(prev => ({
      ...prev,
      jobs: prev.jobs.map(job =>
        job.id === jobId
          ? {
            ...job,
            qc: qcData,
            status: 'qc_completed',
            milestones: [...(job.milestones || []), milestone]
          }
          : job
      )
    }));
  }, []);

  const closeJob = useCallback((jobId, finalData) => {
    const milestone = {
      type: 'job_completed',
      timestamp: new Date().toISOString(),
      description: 'Job completed and closed'
    };

    setState(prev => ({
      ...prev,
      jobs: prev.jobs.map(job =>
        job.id === jobId
          ? {
            ...job,
            ...finalData,
            status: 'completed',
            completedAt: new Date().toISOString(),
            milestones: [...(job.milestones || []), milestone]
          }
          : job
      )
    }));
  }, []);

  const addAuditLog = useCallback((jobId, logEntry) => {
    setState(prev => ({
      ...prev,
      jobs: prev.jobs.map(job =>
        job.id === jobId
          ? {
            ...job,
            auditLog: [...(job.auditLog || []), {
              ...logEntry,
              timestamp: new Date().toISOString()
            }]
          }
          : job
      )
    }));
  }, []);

  const createPurchaseOrder = useCallback((poData) => {
    const newPO = {
      id: `PO-${Math.floor(Math.random() * 100000)}`,
      createdAt: new Date().toISOString(),
      ...poData,
      status: 'Ordered',
      eta: poData.eta || new Date(Date.now() + 86400000 * 2).toISOString(), // Default 2 days ETA
    };

    setState(prev => {
      // Update requisitions status in jobs
      const updatedJobs = prev.jobs.map(job => ({
        ...job,
        partRequisitions: (job.partRequisitions || []).map(req =>
          poData.requisitionIds.includes(req.id)
            ? { ...req, status: 'Ordered', poId: newPO.id, eta: newPO.eta }
            : req
        )
      }));

      return {
        ...prev,
        purchaseOrders: [...(prev.purchaseOrders || []), newPO],
        jobs: updatedJobs
      };
    });

    return newPO;
  }, []);

  const receivePurchaseOrder = useCallback((poId) => {
    setState(prev => {
      const po = prev.purchaseOrders.find(p => p.id === poId);
      if (!po) return prev;

      const updatedJobs = prev.jobs.map(job => ({
        ...job,
        partRequisitions: (job.partRequisitions || []).map(req =>
          req.poId === poId ? { ...req, status: 'Received' } : req
        )
      }));

      return {
        ...prev,
        purchaseOrders: (prev.purchaseOrders || []).map(p =>
          p.id === poId ? { ...p, status: 'Received', receivedAt: new Date().toISOString() } : p
        ),
        jobs: updatedJobs
      };
    });
  }, []);

  const startWork = useCallback((jobId) => {
    setState(prev => ({
      ...prev,
      jobs: prev.jobs.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            status: 'repairing',
            repairStartTime: new Date().toISOString(),
            isWorking: true,
            auditLog: [...(job.auditLog || []), {
              user: 'Mechanic',
              action: 'Started Repair',
              details: 'Work timer started.',
              timestamp: new Date().toISOString()
            }],
            milestones: [...(job.milestones || []), {
              type: 'repair_started',
              timestamp: new Date().toISOString(),
              description: 'Repair work started'
            }]
          };
        }
        return job;
      })
    }));
  }, []);

  const stopWork = useCallback((jobId, laborDurationMinutes) => {
    setState(prev => ({
      ...prev,
      jobs: prev.jobs.map(job => {
        if (job.id === jobId) {
          const totalLabor = (job.actualLaborMinutes || 0) + laborDurationMinutes;
          return {
            ...job,
            isWorking: false,
            actualLaborMinutes: totalLabor,
            auditLog: [...(job.auditLog || []), {
              user: 'Mechanic',
              action: 'Stopped Repair / Logged Time',
              details: `Session duration: ${laborDurationMinutes}m. Total: ${totalLabor}m`,
              timestamp: new Date().toISOString()
            }]
          };
        }
        return job;
      })
    }));
  }, []);

  const logPartsConsumption = useCallback((jobId, requisitionId, consumedQty) => {
    setState(prev => ({
      ...prev,
      jobs: prev.jobs.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            partRequisitions: (job.partRequisitions || []).map(req =>
              req.id === requisitionId
                ? { ...req, consumedQty: (req.consumedQty || 0) + consumedQty, status: 'Consumed' }
                : req
            ),
            auditLog: [...(job.auditLog || []), {
              user: 'Mechanic',
              action: 'Consumed Part',
              details: `Consumed ${consumedQty} units of a requisition item.`,
              timestamp: new Date().toISOString()
            }]
          };
        }
        return job;
      })
    }));
  }, []);

  const generateInvoice = useCallback((jobId, invoiceData) => {
    setState(prev => ({
      ...prev,
      jobs: prev.jobs.map(job => {
        if (job.id === jobId) {
          const invoice = {
            invoiceNo: `INV-${Math.floor(Math.random() * 100000)}`,
            generatedAt: new Date().toISOString(),
            ...invoiceData,
            status: 'unpaid'
          };

          return {
            ...job,
            status: 'ready_billing',
            invoice,
            auditLog: [...(job.auditLog || []), {
              user: 'System',
              action: 'Invoice Generated',
              details: `Invoice ${invoice.invoiceNo} generated for total: ₹${invoiceData.finalTotal}`,
              timestamp: new Date().toISOString()
            }],
            milestones: [...(job.milestones || []), {
              type: 'ready_billing',
              timestamp: new Date().toISOString(),
              description: 'Invoice generated and ready for payment'
            }]
          };
        }
        return job;
      })
    }));
  }, []);

  const payInvoice = useCallback((jobId, paymentData) => {
    setState(prev => ({
      ...prev,
      jobs: prev.jobs.map(job => {
        if (job.id === jobId) {
          const transactionId = paymentData.transactionId || `TXN-${Math.floor(Math.random() * 1000000)}`;
          return {
            ...job,
            status: 'paid',
            invoice: {
              ...job.invoice,
              status: 'paid',
              paidAt: new Date().toISOString(),
              paymentMethod: paymentData.method,
              transactionId
            },
            auditLog: [...(job.auditLog || []), {
              user: 'Customer',
              action: 'Payment Completed',
              details: `Paid via ${paymentData.method}. Transaction: ${transactionId}`,
              timestamp: new Date().toISOString()
            }],
            milestones: [...(job.milestones || []), {
              type: 'paid',
              timestamp: new Date().toISOString(),
              description: 'Payment received. Awaiting vehicle delivery.'
            }]
          };
        }
        return job;
      })
    }));
  }, []);

  const deliverVehicle = useCallback((jobId, deliveryData) => {
    setState(prev => ({
      ...prev,
      jobs: prev.jobs.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            status: 'completed',
            deliveredAt: new Date().toISOString(),
            deliveryDetails: {
              ...deliveryData,
              signature: 'DIGITAL_SIGNATURE_CAPTURED'
            },
            auditLog: [...(job.auditLog || []), {
              user: 'Advisor',
              action: 'Vehicle Delivered',
              details: `Delivered to ${deliveryData.receiverName}. Unused parts returned: ${deliveryData.partsReturned ? 'Yes' : 'No'}`,
              timestamp: new Date().toISOString()
            }],
            milestones: [...(job.milestones || []), {
              type: 'delivered',
              timestamp: new Date().toISOString(),
              description: 'Vehicle successfully handed over to customer'
            }]
          };
        }
        return job;
      })
    }));
  }, []);

  const processCustomerApproval = useCallback((jobId) => {
    setState(prev => ({
      ...prev,
      jobs: prev.jobs.map(job => {
        if (job.id === jobId) {
          const approvedParts = job.estimate?.parts || [];

          // Generate Part Requisitions
          // Logic: Check if source is 'In Stock'
          const requisitions = approvedParts.map(part => {
            const isAvailable = part.source === 'In Stock';
            return {
              id: `REQ-${Math.floor(Math.random() * 100000)}`,
              partName: part.name,
              qty: part.quantity,
              status: isAvailable ? 'Reserved' : 'Procure Needed',
              source: part.source,
              timestamp: new Date().toISOString(),
              jobId: job.id,
              regNo: job.vehicle?.regNo
            };
          });

          return {
            ...job,
            status: 'approved',
            partRequisitions: requisitions,
            auditLog: [...(job.auditLog || []), {
              user: 'System (Auto-Punch)',
              action: 'Generated Part Requisitions',
              details: `Created ${requisitions.length} requisition records. ${requisitions.filter(r => r.status === 'Reserved').length} Reserved, ${requisitions.filter(r => r.status === 'Procure Needed').length} Pending Procurement.`,
              timestamp: new Date().toISOString()
            }, {
              user: 'Customer',
              action: 'Approved Job Card',
              details: 'Customer finalized the estimate and parts list.',
              timestamp: new Date().toISOString()
            }],
            milestones: [...(job.milestones || []), {
              type: 'approved',
              timestamp: new Date().toISOString(),
              description: 'Customer approved the estimate'
            }]
          };
        }
        return job;
      })
    }));
  }, []);

  const value = {
    jobs: state.jobs,
    activeJob: state.activeJob,
    createJob,
    updateJob,
    addDiagnosis,
    buildPartsBasket,
    createEstimate,
    approveEstimate,
    addMedia,
    updateJobStatus,
    addAuditLog,
    processCustomerApproval,
    createPurchaseOrder,
    receivePurchaseOrder,
    startWork,
    stopWork,
    logPartsConsumption,
    generateInvoice,
    payInvoice,
    deliverVehicle,
    purchaseOrders: state.purchaseOrders || [],
    completeQC,
    closeJob,
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJob must be used within a JobProvider');
  }
  return context;
};
