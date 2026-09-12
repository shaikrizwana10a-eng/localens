export type TransportMode = 'Bus' | 'Auto' | 'Walk' | 'Train';

export type SegmentVerificationStatus = 'VERIFIED' | 'PENDING' | 'UNVERIFIED';

export interface MultimodalSegment {
  segmentNumber: number;
  mode: TransportMode;
  segmentTitle: string; // e.g. "STEP 1: Bus" or "STEP 2: Last Mile Auto"
  origin: string;
  destination: string;
  busNumber?: string;
  getDownAt?: string;
  fare?: string;
  fareStatusLabel: string; // "₹20" or "Fare not yet verified"
  isFareVerified: boolean;
  status: SegmentVerificationStatus;
  reportedBy?: string;
  verifiedAt?: string;
  sourceInfo?: string;
  tip?: string;
}

export type RouteDecisionType = 
  | 'DIRECT_BUS_VERIFIED'        // Direct bus route with verified data
  | 'MULTIMODAL_BUS_AUTO'        // Bus + Last-Mile Auto (no direct bus verified)
  | 'PARTIAL_ROUTE_LAST_MILE'    // Partial route + last mile
  | 'EXPLICIT_NO_DIRECT_BUS'     // Admin/Community verified: Explicitly no direct bus operates
  | 'NO_VERIFIED_DATA_AVAILABLE';// Insufficient data in LOCAL

export interface RouteIntelligenceResult {
  id: string;
  origin: string;
  destination: string;
  routeType: RouteDecisionType;
  hasDirectBus: boolean;
  explicitNoDirectBusMessage?: string; // Only set if explicitly verified note states no direct bus exists
  totalEstimatedFareLabel: string; // e.g. "₹50–₹70" or "Fare not yet verified"
  isTotalFareVerified: boolean;
  overallStatus: 'VERIFIED' | 'PENDING' | 'UNVERIFIED';
  localTip: string;
  segments: MultimodalSegment[];
  lastVerifiedDate?: string;
}
