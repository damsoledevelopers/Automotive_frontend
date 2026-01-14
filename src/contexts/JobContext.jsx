import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const JobContext = createContext(null);

const initialState = {
  jobs: [],
  activeJob: null,
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
