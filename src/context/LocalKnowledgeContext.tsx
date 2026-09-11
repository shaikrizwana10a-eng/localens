import React, { createContext, useContext, useState, useEffect } from 'react';
import type { LocalKnowledgeItem, NewKnowledgeSubmission } from '../types/localKnowledge';
import { INITIAL_KNOWLEDGE_ITEMS } from '../data/initialKnowledge';

interface LocalKnowledgeContextType {
  items: LocalKnowledgeItem[];
  addSubmission: (submission: NewKnowledgeSubmission) => LocalKnowledgeItem;
  verifyItem: (id: string) => void;
  rejectItem: (id: string, reason?: string) => void;
  rateItem: (id: string, newRating: number) => void;
  reportOutdated: (id: string) => void;
  reVerifyItem: (id: string) => void;
}

const LocalKnowledgeContext = createContext<LocalKnowledgeContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'local_knowledge_items_v1';

export const LocalKnowledgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<LocalKnowledgeItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_KNOWLEDGE_ITEMS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [items]);

  const addSubmission = (submission: NewKnowledgeSubmission): LocalKnowledgeItem => {
    const newItem: LocalKnowledgeItem = {
      id: `lk-user-${Date.now()}`,
      from: submission.from.trim(),
      to: submission.to.trim(),
      category: submission.category,
      busNumber: submission.busNumber?.trim() || undefined,
      fare: submission.fare?.trim() || undefined,
      autoFare: submission.autoFare?.trim() || undefined,
      boardingPoint: submission.boardingPoint?.trim() || undefined,
      dropPoint: submission.dropPoint?.trim() || undefined,
      additionalInfo: submission.additionalInfo?.trim() || undefined,
      status: 'PENDING',
      reportedBy: submission.reportedBy || 'Local Contributor',
      submittedAt: new Date().toISOString().split('T')[0],
      communityRating: 0,
      ratingCount: 0,
      outdatedReportsCount: 0
    };

    setItems((prev) => [newItem, ...prev]);
    return newItem;
  };

  const verifyItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'VERIFIED',
              verifiedAt: new Date().toISOString().split('T')[0],
              verifiedBy: 'LOCAL Platform Desk'
            }
          : item
      )
    );
  };

  const rejectItem = (id: string, reason?: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'OUTDATED',
              rejectionReason: reason || 'Details could not be verified by platform desk'
            }
          : item
      )
    );
  };

  const rateItem = (id: string, newRating: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const currentCount = item.ratingCount || 0;
        const currentSum = (item.communityRating || 0) * currentCount;
        const newCount = currentCount + 1;
        const updatedRating = Number(((currentSum + newRating) / newCount).toFixed(1));
        return {
          ...item,
          communityRating: updatedRating,
          ratingCount: newCount
        };
      })
    );
  };

  const reportOutdated = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newCount = (item.outdatedReportsCount || 0) + 1;
        return {
          ...item,
          outdatedReportsCount: newCount,
          status: 'OUTDATED'
        };
      })
    );
  };

  const reVerifyItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'VERIFIED',
              outdatedReportsCount: 0,
              verifiedAt: new Date().toISOString().split('T')[0],
              verifiedBy: 'LOCAL Platform Re-verification Desk'
            }
          : item
      )
    );
  };

  return (
    <LocalKnowledgeContext.Provider
      value={{
        items,
        addSubmission,
        verifyItem,
        rejectItem,
        rateItem,
        reportOutdated,
        reVerifyItem
      }}
    >
      {children}
    </LocalKnowledgeContext.Provider>
  );
};

export const useLocalKnowledge = () => {
  const context = useContext(LocalKnowledgeContext);
  if (!context) {
    throw new Error('useLocalKnowledge must be used within a LocalKnowledgeProvider');
  }
  return context;
};
