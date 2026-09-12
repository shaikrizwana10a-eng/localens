import React, { createContext, useContext, useState, useEffect } from 'react';
import type { LocalKnowledgeItem, NewKnowledgeSubmission } from '../types/localKnowledge';
import type { 
  OutdatedReport, 
  ProvenanceMetrics, 
  VerificationHistory, 
  DataProvenance 
} from '../types/provenance';
import { INITIAL_KNOWLEDGE_ITEMS } from '../data/initialKnowledge';

interface LocalKnowledgeContextType {
  items: LocalKnowledgeItem[];
  outdatedReports: OutdatedReport[];
  metrics: ProvenanceMetrics;
  addSubmission: (submission: NewKnowledgeSubmission) => LocalKnowledgeItem;
  verifyItem: (id: string, verifierName?: string) => void;
  rejectItem: (id: string, reason?: string) => void;
  requestMoreInfoItem: (id: string, notes?: string) => void;
  rateItem: (id: string, newRating: number) => void;
  reportOutdated: (id: string, reasonCategory?: string) => void;
  reVerifyItem: (id: string, verifierName?: string) => void;
  submitOutdatedReport: (report: {
    targetId: string;
    targetTitle: string;
    reportedBy?: string;
    reasonCategory: 'fare_changed' | 'route_changed' | 'service_halted' | 'boarding_changed' | 'incorrect_info' | 'other';
    notes: string;
  }) => void;
}

const LocalKnowledgeContext = createContext<LocalKnowledgeContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'local_knowledge_items_v3';
const REPORTS_STORAGE_KEY = 'local_knowledge_outdated_reports_v1';

// Transform initial items into provenance-rich models
const SEED_PROVENANCE_ITEMS: LocalKnowledgeItem[] = INITIAL_KNOWLEDGE_ITEMS.map((item) => {
  const isVerified = item.status === 'VERIFIED';
  const provenance: DataProvenance = {
    source_type: isVerified ? 'LOCAL_LENS' : 'COMMUNITY',
    verification_status: item.status,
    submitted_by: item.reportedBy,
    submitted_at: item.submittedAt,
    verified_by: item.verifiedBy,
    verified_at: item.verifiedAt,
    last_updated_at: item.verifiedAt || item.submittedAt,
    evidence_available: isVerified,
    disclaimer: isVerified 
      ? 'Audited by LocalLens Verification Desk against on-ground transit conductors.'
      : 'Community submitted report awaiting verification.'
  };

  const initialHistory: VerificationHistory[] = [
    {
      id: `vh-${item.id}-1`,
      contribution_id: item.id,
      previous_status: 'PENDING',
      new_status: item.status,
      changed_by: isVerified ? 'LocalLens Platform Desk' : item.reportedBy,
      changed_at: item.verifiedAt || item.submittedAt,
      reason: isVerified ? 'Initial route validation' : 'Submitted by local user'
    }
  ];

  return {
    ...item,
    sourceType: provenance.source_type,
    provenance,
    evidence: isVerified ? [
      {
        id: `ev-${item.id}`,
        contribution_id: item.id,
        uploaded_by: item.reportedBy,
        evidence_type: 'TICKET',
        file_path: '/evidence/bus_ticket_verified.jpg',
        file_name: 'APSRTC_Express_Ticket.jpg',
        created_at: item.submittedAt,
        is_verified: true
      }
    ] : [],
    history: initialHistory
  };
});

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
    return SEED_PROVENANCE_ITEMS;
  });

  const [outdatedReports, setOutdatedReports] = useState<OutdatedReport[]>(() => {
    try {
      const saved = localStorage.getItem(REPORTS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [
      {
        id: 'rep-sample-1',
        target_id: 'lk-vizag-vignan-1',
        target_title: 'Gajuwaka to Vignan College (Bus 38K)',
        reported_by: 'Local Traveler @anand_r',
        reason_category: 'fare_changed',
        notes: 'Fare revised to ₹25 this week due to regional fare restructuring.',
        created_at: '2026-09-11',
        status: 'PENDING_REVIEW'
      }
    ];
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save items to localStorage:', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(outdatedReports));
    } catch (e) {
      console.error('Failed to save reports to localStorage:', e);
    }
  }, [outdatedReports]);

  // Compute live metrics
  const metrics: ProvenanceMetrics = {
    totalContributions: items.length,
    pendingVerification: items.filter(i => i.status === 'PENDING').length,
    underReview: items.filter(i => i.status === 'UNDER_REVIEW').length,
    verifiedCount: items.filter(i => i.status === 'VERIFIED').length,
    rejectedCount: items.filter(i => i.status === 'REJECTED').length,
    outdatedCount: items.filter(i => i.status === 'OUTDATED').length,
    externalReferencesCount: 5,
    evidenceBackedCount: items.filter(i => Boolean(i.evidence && i.evidence.length > 0)).length
  };

  const addSubmission = (submission: NewKnowledgeSubmission): LocalKnowledgeItem => {
    const today = new Date().toISOString().split('T')[0];
    const newId = `lk-user-${Date.now()}`;
    const hasEvidence = Boolean(submission.evidence && submission.evidence.length > 0);

    const provenance: DataProvenance = {
      source_type: submission.sourceType || 'COMMUNITY',
      verification_status: 'PENDING',
      submitted_by: submission.reportedBy || 'Local Contributor',
      submitted_at: today,
      last_updated_at: today,
      evidence_available: hasEvidence,
      evidence_items: submission.evidence || [],
      disclaimer: 'Submitted by community member. Pending review by the LocalLens Verification Desk.'
    };

    const initialHistory: VerificationHistory = {
      id: `vh-${newId}-1`,
      contribution_id: newId,
      previous_status: 'PENDING',
      new_status: 'PENDING',
      changed_by: submission.reportedBy || 'Local Contributor',
      changed_at: today,
      reason: 'User submitted local knowledge report'
    };

    const newItem: LocalKnowledgeItem = {
      id: newId,
      from: submission.from.trim(),
      to: submission.to.trim(),
      category: submission.category,
      busNumber: submission.busNumber?.trim() || undefined,
      fare: submission.fare?.trim() || undefined,
      autoFare: submission.autoFare?.trim() || undefined,
      boardingPoint: submission.boardingPoint?.trim() || undefined,
      dropPoint: submission.dropPoint?.trim() || undefined,
      intermediateStop: submission.intermediateStop?.trim() || undefined,
      lastMileMode: submission.lastMileMode,
      explicitNoDirectBus: submission.explicitNoDirectBus,
      additionalInfo: submission.additionalInfo?.trim() || undefined,
      status: 'PENDING',
      sourceType: 'COMMUNITY',
      reportedBy: submission.reportedBy || 'Local Contributor',
      submittedAt: today,
      communityRating: 0,
      ratingCount: 0,
      outdatedReportsCount: 0,
      evidence: submission.evidence || [],
      provenance,
      history: [initialHistory],

      // Extended category fields
      transportType: submission.transportType,
      travelTime: submission.travelTime,
      timing: submission.timing,
      propertyName: submission.propertyName,
      stayType: submission.stayType,
      roomInfo: submission.roomInfo,
      amenities: submission.amenities,
      checkInOut: submission.checkInOut,
      restaurantName: submission.restaurantName,
      cuisine: submission.cuisine,
      popularDish: submission.popularDish,
      isVeg: submission.isVeg,
      openingHours: submission.openingHours
    };

    setItems((prev) => [newItem, ...prev]);
    return newItem;
  };

  const verifyItem = (id: string, verifierName = 'LocalLens Verification Desk') => {
    const today = new Date().toISOString().split('T')[0];
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const updatedHistory: VerificationHistory = {
          id: `vh-${id}-${Date.now()}`,
          contribution_id: id,
          previous_status: item.status,
          new_status: 'VERIFIED',
          changed_by: verifierName,
          changed_at: today,
          reason: 'Audited and verified by LocalLens Desk'
        };

        const updatedProvenance: DataProvenance = {
          ...(item.provenance || {
            source_type: item.sourceType || 'COMMUNITY',
            verification_status: 'VERIFIED',
            last_updated_at: today,
            evidence_available: Boolean(item.evidence?.length)
          }),
          verification_status: 'VERIFIED',
          verified_by: verifierName,
          verified_at: today,
          last_updated_at: today,
          disclaimer: 'Verified by LocalLens Verification Desk against on-ground schedules.'
        };

        return {
          ...item,
          status: 'VERIFIED',
          verifiedAt: today,
          verifiedBy: verifierName,
          outdatedReportsCount: 0,
          provenance: updatedProvenance,
          history: [...(item.history || []), updatedHistory]
        };
      })
    );
  };

  const rejectItem = (id: string, reason = 'Details could not be verified by platform desk') => {
    const today = new Date().toISOString().split('T')[0];
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const updatedHistory: VerificationHistory = {
          id: `vh-${id}-${Date.now()}`,
          contribution_id: id,
          previous_status: item.status,
          new_status: 'REJECTED',
          changed_by: 'LocalLens Verification Desk',
          changed_at: today,
          reason
        };

        const updatedProvenance: DataProvenance = {
          ...(item.provenance || {
            source_type: item.sourceType || 'COMMUNITY',
            verification_status: 'REJECTED',
            last_updated_at: today,
            evidence_available: Boolean(item.evidence?.length)
          }),
          verification_status: 'REJECTED',
          rejection_reason: reason,
          last_updated_at: today
        };

        return {
          ...item,
          status: 'REJECTED',
          rejectionReason: reason,
          provenance: updatedProvenance,
          history: [...(item.history || []), updatedHistory]
        };
      })
    );
  };

  const requestMoreInfoItem = (id: string, notes = 'Requested additional evidence or ticket confirmation') => {
    const today = new Date().toISOString().split('T')[0];
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const updatedHistory: VerificationHistory = {
          id: `vh-${id}-${Date.now()}`,
          contribution_id: id,
          previous_status: item.status,
          new_status: 'UNDER_REVIEW',
          changed_by: 'LocalLens Verification Desk',
          changed_at: today,
          notes
        };

        const updatedProvenance: DataProvenance = {
          ...(item.provenance || {
            source_type: item.sourceType || 'COMMUNITY',
            verification_status: 'UNDER_REVIEW',
            last_updated_at: today,
            evidence_available: Boolean(item.evidence?.length)
          }),
          verification_status: 'UNDER_REVIEW',
          last_updated_at: today
        };

        return {
          ...item,
          status: 'UNDER_REVIEW',
          provenance: updatedProvenance,
          history: [...(item.history || []), updatedHistory]
        };
      })
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

  const reportOutdated = (id: string, reason = 'Flagged by community as outdated') => {
    const today = new Date().toISOString().split('T')[0];
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newCount = (item.outdatedReportsCount || 0) + 1;

        const updatedHistory: VerificationHistory = {
          id: `vh-${id}-${Date.now()}`,
          contribution_id: id,
          previous_status: item.status,
          new_status: 'OUTDATED',
          changed_by: 'Community Traveler',
          changed_at: today,
          reason
        };

        const updatedProvenance: DataProvenance = {
          ...(item.provenance || {
            source_type: item.sourceType || 'COMMUNITY',
            verification_status: 'OUTDATED',
            last_updated_at: today,
            evidence_available: false
          }),
          verification_status: 'OUTDATED',
          outdated_at: today,
          last_updated_at: today
        };

        return {
          ...item,
          outdatedReportsCount: newCount,
          status: 'OUTDATED',
          provenance: updatedProvenance,
          history: [...(item.history || []), updatedHistory]
        };
      })
    );
  };

  const reVerifyItem = (id: string, verifierName = 'LocalLens Re-verification Desk') => {
    const today = new Date().toISOString().split('T')[0];
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const updatedHistory: VerificationHistory = {
          id: `vh-${id}-${Date.now()}`,
          contribution_id: id,
          previous_status: 'OUTDATED',
          new_status: 'VERIFIED',
          changed_by: verifierName,
          changed_at: today,
          reason: 'Re-audit confirmed current status'
        };

        const updatedProvenance: DataProvenance = {
          ...(item.provenance || {
            source_type: item.sourceType || 'COMMUNITY',
            verification_status: 'VERIFIED',
            last_updated_at: today,
            evidence_available: true
          }),
          verification_status: 'VERIFIED',
          verified_at: today,
          verified_by: verifierName,
          outdated_at: undefined,
          last_updated_at: today
        };

        return {
          ...item,
          status: 'VERIFIED',
          outdatedReportsCount: 0,
          verifiedAt: today,
          verifiedBy: verifierName,
          provenance: updatedProvenance,
          history: [...(item.history || []), updatedHistory]
        };
      })
    );
  };

  const submitOutdatedReport = (reportData: {
    targetId: string;
    targetTitle: string;
    reportedBy?: string;
    reasonCategory: 'fare_changed' | 'route_changed' | 'service_halted' | 'boarding_changed' | 'incorrect_info' | 'other';
    notes: string;
  }) => {
    const newReport: OutdatedReport = {
      id: `rep-${Date.now()}`,
      target_id: reportData.targetId,
      target_title: reportData.targetTitle,
      reported_by: reportData.reportedBy || 'Local Traveler',
      reason_category: reportData.reasonCategory,
      notes: reportData.notes,
      created_at: new Date().toISOString().split('T')[0],
      status: 'PENDING_REVIEW'
    };

    setOutdatedReports((prev) => [newReport, ...prev]);
    reportOutdated(reportData.targetId, `${reportData.reasonCategory}: ${reportData.notes}`);
  };

  return (
    <LocalKnowledgeContext.Provider
      value={{
        items,
        outdatedReports,
        metrics,
        addSubmission,
        verifyItem,
        rejectItem,
        requestMoreInfoItem,
        rateItem,
        reportOutdated,
        reVerifyItem,
        submitOutdatedReport
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
