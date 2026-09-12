// ============================================================================
// LocalLens: Data Source & Trust Indicator System Types
// ============================================================================

/**
 * Standardized Data Source Types
 * Identifies WHERE the data originated.
 * SOURCE != TRUST STATUS.
 */
export type DataSourceType = 
  | 'GOOGLE_MAPS'    // External reference retrieved from Google Maps / Places API
  | 'GOOGLE_SEARCH'  // External web discovery from Google Search
  | 'COMMUNITY'      // Community submitted information from local travelers/scouts
  | 'LOCAL_LENS'     // First-party audited LocalLens proprietary intelligence
  | 'ADMIN';         // Direct administrative / desk entry

/**
 * Verification Status
 * Identifies the current TRUST STATE in the verification workflow.
 * External Google data is NEVER automatically VERIFIED.
 */
export type VerificationStatus = 
  | 'PENDING'       // Submitted by user, awaiting review by Verification Desk
  | 'UNDER_REVIEW'  // Verification Desk / Local Scout actively verifying
  | 'VERIFIED'      // Approved and stamped by LocalLens Verification Desk
  | 'REJECTED'      // Reviewed and found inaccurate or unverifiable
  | 'OUTDATED';     // Previously verified, but reported or detected as changed

/**
 * Contribution Category Types
 */
export type ContributionType = 
  | 'TRANSPORT'
  | 'FARE'
  | 'BOARDING_POINT'
  | 'ROUTE'
  | 'FOOD'
  | 'STAY'
  | 'LOCAL_TIP'
  | 'SAFETY'
  | 'PARKING'
  | 'ACCESSIBILITY'
  | 'OTHER';

/**
 * Supporting Evidence Types
 */
export type EvidenceType = 
  | 'TICKET'
  | 'RECEIPT'
  | 'PHOTO'
  | 'DOCUMENT'
  | 'SCREENSHOT'
  | 'OTHER';

/**
 * Supporting Evidence Item
 */
export interface EvidenceItem {
  id: string;
  contribution_id?: string;
  uploaded_by: string;
  evidence_type: EvidenceType;
  file_path: string;
  file_name: string;
  file_size_bytes?: number;
  mime_type?: string;
  preview_url?: string;
  created_at: string;
  is_verified?: boolean;
}

/**
 * Verification Audit History Trail
 * Records every status transition for strict compliance and provenance.
 */
export interface VerificationHistory {
  id: string;
  contribution_id: string;
  previous_status: VerificationStatus;
  new_status: VerificationStatus;
  changed_by: string;
  changed_at: string;
  reason?: string;
  notes?: string;
}

/**
 * Outdated Information Report
 * Created when a traveler flags verified or community information.
 */
export interface OutdatedReport {
  id: string;
  target_id: string;
  target_title: string;
  reported_by: string;
  reason_category: 
    | 'fare_changed' 
    | 'route_changed' 
    | 'service_halted' 
    | 'boarding_changed' 
    | 'incorrect_info' 
    | 'other';
  notes: string;
  created_at: string;
  status: 'PENDING_REVIEW' | 'REVIEWED' | 'DISMISSED';
}

/**
 * Comprehensive Data Provenance Metadata
 * Associated with every important fact or entity.
 */
export interface DataProvenance {
  source_type: DataSourceType;
  external_reference?: string;   // e.g. "ChIJRz1gD-s... (Google Place ID)" or URL
  source_url?: string;
  verification_status: VerificationStatus;
  submitted_by?: string;
  submitted_at?: string;
  verified_by?: string;
  verified_at?: string;
  last_updated_at: string;
  outdated_at?: string;
  rejection_reason?: string;
  evidence_available: boolean;
  evidence_items?: EvidenceItem[];
  retrieved_at?: string;         // For external Google data
  disclaimer?: string;           // e.g. "External reference. Not verified by LocalLens."
}

/**
 * Standardized Place Entity
 */
export interface Place {
  id: string;
  name: string;
  description: string;
  category: string;
  address?: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  external_place_id?: string;
  source_type: DataSourceType;
  verification_status: VerificationStatus;
  created_at: string;
  updated_at: string;
  provenance: DataProvenance;
}

/**
 * Community Contribution Entity
 */
export interface Contribution {
  id: string;
  user_id: string;
  user_name?: string;
  place_id?: string;
  place_name: string;
  contribution_type: ContributionType;
  title: string;
  content: string;
  location_detail?: string;       // e.g. "Platform 2, RTC Complex"
  reported_fare?: string;         // e.g. "₹45"
  source_type: DataSourceType;
  verification_status: VerificationStatus;
  submitted_at: string;
  updated_at: string;
  verified_at?: string;
  verified_by?: string;
  rejection_reason?: string;
  outdated_at?: string;
  evidence: EvidenceItem[];
  provenance: DataProvenance;
  history: VerificationHistory[];
}

/**
 * Provenance Metrics for Verification Desk
 */
export interface ProvenanceMetrics {
  totalContributions: number;
  pendingVerification: number;
  underReview: number;
  verifiedCount: number;
  rejectedCount: number;
  outdatedCount: number;
  externalReferencesCount: number;
  evidenceBackedCount: number;
}
