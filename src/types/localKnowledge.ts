import type { DataProvenance, DataSourceType, EvidenceItem, VerificationHistory } from './provenance';

export type KnowledgeCategory = 
  | 'Transport' 
  | 'Stay' 
  | 'Food' 
  | 'Destination' 
  | 'Bus' 
  | 'Auto' 
  | 'Experience' 
  | 'Tip';

export type KnowledgeStatus = 'VERIFIED' | 'PENDING' | 'UNDER_REVIEW' | 'REJECTED' | 'OUTDATED';

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
  sourceType?: DataSourceType;
  reportedBy: string;
  submittedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  communityRating: number;
  ratingCount: number;
  outdatedReportsCount: number;
  rejectionReason?: string;
  evidence?: EvidenceItem[];
  provenance?: DataProvenance;
  history?: VerificationHistory[];

  // Extended category attributes
  transportType?: string;
  travelTime?: string;
  timing?: string;
  propertyName?: string;
  stayType?: string;
  roomInfo?: string;
  amenities?: string;
  checkInOut?: string;
  restaurantName?: string;
  cuisine?: string;
  popularDish?: string;
  isVeg?: boolean;
  openingHours?: string;
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
  sourceType?: DataSourceType;
  evidence?: EvidenceItem[];

  // Extended category attributes
  transportType?: string;
  travelTime?: string;
  timing?: string;
  propertyName?: string;
  stayType?: string;
  priceRange?: string;
  roomInfo?: string;
  amenities?: string;
  checkInOut?: string;
  restaurantName?: string;
  cuisine?: string;
  popularDish?: string;
  isVeg?: boolean;
  openingHours?: string;
}

