import type { LocalKnowledgeItem } from '../types/localKnowledge';

export type RouteType = 
  | 'DIRECT_BUS'
  | 'MULTIMODAL_BUS_AUTO'
  | 'COMMUNITY_CONFLICT'
  | 'NO_VERIFIED_INFO';

export interface RouteStepSegment {
  stepNumber: number;
  mode: 'Bus' | 'Auto' | 'Walk' | 'Shared Auto';
  origin: string;
  destination: string;
  busNumber?: string;
  getDownAt?: string;
  fareLabel: string; // e.g. "₹20 ✓ Verified" or "Not yet verified" or "₹20 · PENDING"
  isFareVerified: boolean;
  status: 'VERIFIED' | 'PENDING' | 'UNVERIFIED';
}

export interface ComposedRouteResult {
  id: string;
  origin: string;
  destination: string;
  routeType: RouteType;
  
  // Direct bus vs Multimodal indicators
  hasDirectBus: boolean;
  explicitNoDirectBusMessage?: string; // Set only if verified submission explicitly states no direct bus exists

  // Total Fare
  totalEstimatedFare: string; // e.g. "₹60" or "₹50–₹70" or "Fare not yet verified"
  isTotalFareVerified: boolean;

  // Source & Evidence Attribution
  verifiedReportCount: number;
  sourceEvidenceLabel: string; // e.g. "✓ Verified — Based on 1 verified local report"
  
  // Overall Status
  overallStatus: 'VERIFIED' | 'PENDING' | 'CONFLICT' | 'NO_DATA';
  
  // Local Tip
  localTip?: string;

  // Step Segments
  segments: RouteStepSegment[];
  
  // Conflicting items if any
  conflictingItems?: LocalKnowledgeItem[];
}

/**
 * Extracts raw numeric value from strings like "₹20", "₹20 per seat", "20"
 */
function parseNumericFare(fareStr?: string): number | null {
  if (!fareStr) return null;
  const match = fareStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

/**
 * Dynamically composes route intelligence results from community-generated knowledge items.
 * Evaluates verified community reports, detects single vs multiple user reports, 
 * multimodal transfers, pending statuses, and community conflicts.
 */
export function composeRouteIntelligence(
  queryOrigin: string,
  queryDestination: string,
  knowledgeItems: LocalKnowledgeItem[]
): ComposedRouteResult | null {
  const normOrigin = queryOrigin.trim().toLowerCase();
  const normDest = queryDestination.trim().toLowerCase();

  if (!normOrigin || !normDest) return null;

  // 1. Filter matching knowledge items for this route (Origin -> Destination or substring matches)
  const matchingItems = knowledgeItems.filter((item) => {
    const itemFrom = item.from.toLowerCase();
    const itemTo = item.to.toLowerCase();

    const matchesFrom = itemFrom.includes(normOrigin) || normOrigin.includes(itemFrom);
    const matchesTo = itemTo.includes(normDest) || normDest.includes(itemTo);

    return matchesFrom && matchesTo;
  });

  // 2. Separate verified vs pending items
  const verifiedItems = matchingItems.filter((i) => i.status === 'VERIFIED');
  const pendingItems = matchingItems.filter((i) => i.status === 'PENDING');

  // 3. Check for Community Conflicts among verified reports
  if (verifiedItems.length > 1) {
    const stops = new Set(verifiedItems.map((i) => (i.intermediateStop || i.dropPoint || '').toLowerCase()).filter(Boolean));
    if (stops.size > 1) {
      return {
        id: `route-conflict-${Date.now()}`,
        origin: queryOrigin,
        destination: queryDestination,
        routeType: 'COMMUNITY_CONFLICT',
        hasDirectBus: false,
        totalEstimatedFare: 'Fare not yet verified',
        isTotalFareVerified: false,
        verifiedReportCount: verifiedItems.length,
        sourceEvidenceLabel: `Community information differs (${verifiedItems.length} reports) · Needs re-verification`,
        overallStatus: 'CONFLICT',
        localTip: 'Different travelers have reported conflicting intermediate stops for this route. Re-verification requested.',
        segments: [],
        conflictingItems: verifiedItems
      };
    }
  }

  // 4. Case A: Verified Community Data Available (1 or more verified users)
  if (verifiedItems.length > 0) {
    const primaryItem = verifiedItems[0];
    const reportCount = verifiedItems.length;
    const sourceEvidenceLabel = reportCount === 1
      ? '✓ Verified — Based on 1 verified local report'
      : `✓ Verified — Based on ${reportCount} verified local reports`;

    // Check if this is a Multimodal Route (Bus -> Intermediate Stop -> Auto / Walk)
    const isMultimodal = Boolean(primaryItem.intermediateStop || primaryItem.autoFare || primaryItem.lastMileMode);

    if (isMultimodal) {
      const intermediateStop = primaryItem.intermediateStop || primaryItem.dropPoint || 'Nearest verified bus stop';
      const busFareNum = parseNumericFare(primaryItem.fare);
      const autoFareNum = parseNumericFare(primaryItem.autoFare);

      // Bus segment fare label
      const busFareLabel = primaryItem.fare ? `${primaryItem.fare} ✓ Verified` : 'Not yet verified';
      // Auto segment fare label
      const autoFareLabel = primaryItem.autoFare ? `${primaryItem.autoFare} ✓ Verified` : 'Not yet verified';

      // Total fare calculation
      let totalFare = 'Fare not yet verified';
      let isTotalVerified = false;

      if (busFareNum !== null && autoFareNum !== null) {
        totalFare = `₹${busFareNum + autoFareNum}`;
        isTotalVerified = true;
      } else if (busFareNum !== null) {
        totalFare = `From ₹${busFareNum} (Auto fare pending verification)`;
      }

      const localTip = primaryItem.additionalInfo || 
        `Take the bus until ${intermediateStop}, then use an auto for the final stretch to ${queryDestination}.`;

      return {
        id: `route-multimodal-${primaryItem.id}`,
        origin: primaryItem.from,
        destination: primaryItem.to,
        routeType: 'MULTIMODAL_BUS_AUTO',
        hasDirectBus: false,
        explicitNoDirectBusMessage: primaryItem.explicitNoDirectBus ? 'No direct bus reaches this destination.' : undefined,
        totalEstimatedFare: totalFare,
        isTotalFareVerified: isTotalVerified,
        verifiedReportCount: reportCount,
        sourceEvidenceLabel,
        overallStatus: 'VERIFIED',
        localTip,
        segments: [
          {
            stepNumber: 1,
            mode: 'Bus',
            origin: primaryItem.from,
            destination: intermediateStop,
            busNumber: primaryItem.busNumber,
            getDownAt: intermediateStop,
            fareLabel: busFareLabel,
            isFareVerified: Boolean(primaryItem.fare),
            status: 'VERIFIED'
          },
          {
            stepNumber: 2,
            mode: (primaryItem.lastMileMode as 'Auto' | 'Walk' | 'Shared Auto') || 'Auto',
            origin: intermediateStop,
            destination: primaryItem.to,
            fareLabel: autoFareLabel,
            isFareVerified: Boolean(primaryItem.autoFare),
            status: 'VERIFIED'
          }
        ]
      };
    }

    // Direct Bus Route
    const busFareLabel = primaryItem.fare ? `${primaryItem.fare} ✓ Verified` : 'Not yet verified';
    
    return {
      id: `route-direct-${primaryItem.id}`,
      origin: primaryItem.from,
      destination: primaryItem.to,
      routeType: 'DIRECT_BUS',
      hasDirectBus: true,
      totalEstimatedFare: primaryItem.fare || 'Fare not yet verified',
      isTotalFareVerified: Boolean(primaryItem.fare),
      verifiedReportCount: reportCount,
      sourceEvidenceLabel,
      overallStatus: 'VERIFIED',
      localTip: primaryItem.additionalInfo || `Direct bus available from ${primaryItem.boardingPoint || primaryItem.from}.`,
      segments: [
        {
          stepNumber: 1,
          mode: 'Bus',
          origin: primaryItem.from,
          destination: primaryItem.to,
          busNumber: primaryItem.busNumber,
          getDownAt: primaryItem.dropPoint || primaryItem.to,
          fareLabel: busFareLabel,
          isFareVerified: Boolean(primaryItem.fare),
          status: 'VERIFIED'
        }
      ]
    };
  }

  // 5. Case B: Only Pending Community Data Available
  if (pendingItems.length > 0) {
    const pendingItem = pendingItems[0];
    const busFareLabel = pendingItem.fare ? `${pendingItem.fare} · PENDING` : 'Not yet verified';
    
    return {
      id: `route-pending-${pendingItem.id}`,
      origin: pendingItem.from,
      destination: pendingItem.to,
      routeType: 'MULTIMODAL_BUS_AUTO',
      hasDirectBus: Boolean(pendingItem.busNumber),
      totalEstimatedFare: 'Fare not yet verified',
      isTotalFareVerified: false,
      verifiedReportCount: 0,
      sourceEvidenceLabel: 'PENDING — awaiting platform verification',
      overallStatus: 'PENDING',
      localTip: pendingItem.additionalInfo || 'Recently submitted by a community member. Pending platform verification desk review.',
      segments: [
        {
          stepNumber: 1,
          mode: 'Bus',
          origin: pendingItem.from,
          destination: pendingItem.intermediateStop || pendingItem.to,
          busNumber: pendingItem.busNumber,
          fareLabel: busFareLabel,
          isFareVerified: false,
          status: 'PENDING'
        }
      ]
    };
  }

  // 6. Case C: Insufficient / No Verified Information in LOCAL
  return {
    id: `route-nodata-${Date.now()}`,
    origin: queryOrigin,
    destination: queryDestination,
    routeType: 'NO_VERIFIED_INFO',
    hasDirectBus: false,
    totalEstimatedFare: 'Fare not yet verified',
    isTotalFareVerified: false,
    verifiedReportCount: 0,
    sourceEvidenceLabel: 'No verified community knowledge',
    overallStatus: 'NO_DATA',
    localTip: 'Be the first local to share travel guidance for this route using "Share What You Know"!',
    segments: []
  };
}
