import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const EscrowContext = createContext(null);

export const EscrowProvider = ({ children }) => {
  const [escrows, setEscrows] = useState(() => {
    const stored = localStorage.getItem('escrows');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('escrows', JSON.stringify(escrows));
  }, [escrows]);

  const createEscrow = useCallback((escrowData) => {
    const newEscrow = {
      id: Date.now(),
      ...escrowData,
      status: 'reserved',
      createdAt: new Date().toISOString(),
      transactions: [{
        type: 'reservation',
        amount: escrowData.amount,
        timestamp: new Date().toISOString(),
        description: 'Reservation fee paid'
      }]
    };

    setEscrows(prev => [...prev, newEscrow]);
    return newEscrow;
  }, []);

  const releaseEscrow = useCallback((escrowId, splits) => {
    setEscrows(prev => prev.map(escrow => {
      if (escrow.id === escrowId) {
        return {
          ...escrow,
          status: 'released',
          releasedAt: new Date().toISOString(),
          splits: splits || escrow.splits,
          transactions: [
            ...escrow.transactions,
            {
              type: 'release',
              amount: escrow.amount,
              timestamp: new Date().toISOString(),
              description: 'Funds released',
              splits: splits || escrow.splits
            }
          ]
        };
      }
      return escrow;
    }));
  }, []);

  const refundEscrow = useCallback((escrowId, reason) => {
    setEscrows(prev => prev.map(escrow => {
      if (escrow.id === escrowId) {
        return {
          ...escrow,
          status: 'refunded',
          refundedAt: new Date().toISOString(),
          refundReason: reason,
          transactions: [
            ...escrow.transactions,
            {
              type: 'refund',
              amount: escrow.amount,
              timestamp: new Date().toISOString(),
              description: `Refund: ${reason}`
            }
          ]
        };
      }
      return escrow;
    }));
  }, []);

  const getEscrowByJobId = useCallback((jobId) => {
    return escrows.find(e => e.jobId === jobId);
  }, [escrows]);

  const calculateSplits = useCallback((totalAmount, jobData) => {
    // Default split: 70% vendor, 20% mechanic, 10% platform
    const vendorSplit = totalAmount * 0.70;
    const mechanicSplit = totalAmount * 0.20;
    const platformFee = totalAmount * 0.10;

    return {
      vendor: vendorSplit,
      mechanic: mechanicSplit,
      platform: platformFee,
      total: totalAmount
    };
  }, []);

  const value = {
    escrows,
    createEscrow,
    releaseEscrow,
    refundEscrow,
    getEscrowByJobId,
    calculateSplits,
  };

  return (
    <EscrowContext.Provider value={value}>
      {children}
    </EscrowContext.Provider>
  );
};

export const useEscrow = () => {
  const context = useContext(EscrowContext);
  if (!context) {
    throw new Error('useEscrow must be used within an EscrowProvider');
  }
  return context;
};
