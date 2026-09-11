export type KnowledgeCategory = 'Bus' | 'Auto' | 'Stay' | 'Experience' | 'Tip';

export type KnowledgeStatus = 'VERIFIED' | 'PENDING' | 'OUTDATED';

export interface LocalKnowledgeItem {
  id: string;
  from: string;
  to: string;
  category: KnowledgeCategory;
  busNumber?: string;
  fare?: string;
  autoFare?: string;
  boardingPoint?: string;
  dropPoint?: string;
  intermediateStop?: string; // e.g. "Duvvada Bus Stop"
  lastMileMode?: 'Auto' | 'Walk' | 'Shared Auto';
  explicitNoDirectBus?: boolean; // Set if user explicitly notes no direct bus exists
  additionalInfo?: string;
  status: KnowledgeStatus;
  reportedBy: string;
  submittedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  communityRating: number;
  ratingCount: number;
  outdatedReportsCount: number;
  rejectionReason?: string;
}

export interface NewKnowledgeSubmission {
  from: string;
  to: string;
  category: KnowledgeCategory;
  busNumber?: string;
  fare?: string;
  autoFare?: string;
  boardingPoint?: string;
  dropPoint?: string;
  intermediateStop?: string;
  lastMileMode?: 'Auto' | 'Walk' | 'Shared Auto';
  explicitNoDirectBus?: boolean;
  additionalInfo?: string;
  reportedBy?: string;
}
