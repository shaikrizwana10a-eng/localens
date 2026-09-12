<<<<<<< HEAD
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
=======
export type KnowledgeCategory = 'Bus' | 'Auto' | 'Stay' | 'Experience' | 'Tip';

export type KnowledgeStatus = 'VERIFIED' | 'PENDING' | 'OUTDATED';
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04

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
<<<<<<< HEAD
  sourceType?: DataSourceType;
=======
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
  reportedBy: string;
  submittedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  communityRating: number;
  ratingCount: number;
  outdatedReportsCount: number;
  rejectionReason?: string;
<<<<<<< HEAD
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
=======
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
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
<<<<<<< HEAD
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

=======
}
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
