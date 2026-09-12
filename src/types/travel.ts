export type UserRole = 'tourist' | 'contributor' | 'business' | 'foreign_tourist';

export type ConfidenceLevel = 'High Confidence' | 'Moderate Confidence' | 'Low Confidence' | 'Needs Verification';

export interface TrustFactor {
  evidenceQuality: 'High (Video/Receipt)' | 'Moderate (Photo/Text)' | 'Basic';
  recencyDays: number;
  verificationCount: number;
  contradictionCount: number;
  contributorTrustScore: number; // e.g. 94%
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Attraction {
  id: string;
  name: string;
  category: string;
  description: string;
  timeRequired: string;
  entryFee: string;
  bestTimeOfDay: string;
  image: string;
  coordinates: Coordinates;
  isHiddenGem?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  tagline: string;
  heroImage: string;
  description: string;
  history: string;
  culture: string;
  bestVisitingTime: string;
  avgDailyBudget: string;
  crowdStatus: 'Low Crowd' | 'Moderate Crowd' | 'High Peak Crowd';
  coordinates: Coordinates;
  attractions: Attraction[];
  foodSpecialties: string[];
  communityObservations: string[];
}

<<<<<<< HEAD
import type { DataProvenance } from './provenance';

=======
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
export interface TransportStep {
  stepNumber: number;
  instruction: string;
  distanceOrTime: string;
  iconType: 'walk' | 'bus' | 'auto' | 'cab';
}

export interface TransportOption {
  id: string;
<<<<<<< HEAD
  transportType: 'Local Bus' | 'Shared Auto' | 'Bus + Walk' | 'Private Cab' | 'Train' | 'Metro' | 'Rental' | 'Other';
  serviceNumber?: string; // e.g. "APSRTC Bus 99"
  routeStops?: string[]; // e.g. ["Gajuwaka", "NAD Junction", "Maddilapalem", "RK Beach"]
=======
  transportType: 'Local Bus' | 'Shared Auto' | 'Bus + Walk' | 'Private Cab';
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
  approxFare: string;
  approxDuration: string;
  boardingPoint: string;
  dropPoint: string;
  walkingDistance: string;
  transfers: number;
  steps: TransportStep[];
  practicalNotes: string[];
  freshnessDaysAgo: number;
  verifiedCount: number;
  confidenceLevel: ConfidenceLevel;
  routePolyline?: Coordinates[];
<<<<<<< HEAD
  timing?: {
    firstBus?: string;
    lastBus?: string;
    frequency?: string;
  } | null;
  fareHistory?: {
    current: string;
    previous: string;
    updatedAt: string;
  };
  provenance?: DataProvenance;
=======
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
}

export interface TransportRoute {
  id: string;
  origin: string;
  destination: string;
  distanceKm: number;
  options: TransportOption[];
<<<<<<< HEAD
  provenance?: DataProvenance;
=======
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
}

export interface Accommodation {
  id: string;
  name: string;
<<<<<<< HEAD
  type: 'Budget Hotel' | 'Homestay' | 'Dharamshala' | 'Boutique Stay' | 'Resort' | 'Hostel';
  destinationId: string;
  address: string;
  pricePerNight: number;
  priceRange?: string;
=======
  type: 'Budget Hotel' | 'Homestay' | 'Dharamshala' | 'Boutique Stay';
  destinationId: string;
  address: string;
  pricePerNight: number;
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
  rating: number;
  confidenceLevel: ConfidenceLevel;
  cleanlinessScore: string;
  safetyTag: string;
  photos: string[];
  facilities: string[];
  bathroomInfo: string;
  wifiSpeed: string;
  parkingRules: string;
  checkInOut: string;
  recentObservations: string[];
  coordinates: Coordinates;
  verifiedCount: number;
  isPartner?: boolean;
<<<<<<< HEAD
  contactNumber?: string;
  roomTypes?: string[];
  provenance?: DataProvenance;
=======
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
}

export interface FoodItem {
  id: string;
  dishName: string;
  restaurantName: string;
  destinationId: string;
  priceRange: string;
  cuisine: string;
  isVeg: boolean;
  description: string;
  image: string;
  freshnessDaysAgo: number;
  verifiedCount: number;
  confidenceLevel: ConfidenceLevel;
  isPartner?: boolean;
<<<<<<< HEAD
  address?: string;
  openingHours?: string;
  popularDishes?: string[];
  localSpecialties?: string[];
  parkingAvailable?: boolean;
  paymentOptions?: string[];
  provenance?: DataProvenance;
=======
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
}

export interface VideoReview {
  id: string;
  placeName: string;
  placeType: 'Accommodation' | 'Food' | 'Transport' | 'Attraction';
  contributorName: string;
  contributorTrustScore: number;
  videoThumbnail: string;
  videoDuration: string;
  transcript: string;
  keyObservations: { type: 'positive' | 'negative' | 'neutral'; text: string }[];
  dateOfExperience: string;
  confidenceLevel: ConfidenceLevel;
  verifiedCount: number;
}

export interface ContributionMission {
  id: string;
  title: string;
  category: 'Transport' | 'Stay' | 'Food' | 'Place';
  location: string;
  rewardAmount: number; // in INR
  description: string;
  taskSteps: string[];
  qualityGuidance: string;
  status: 'Open' | 'Submitted' | 'Verified';
}

export interface VerificationTask {
  id: string;
  claimId: string;
  category: 'Transport' | 'Stay' | 'Food' | 'Rules';
  placeName: string;
  claimText: string;
  submittedBy: string;
  submittedDaysAgo: number;
  matchCount: number;
  contradictCount: number;
  confidenceLevel: ConfidenceLevel;
  userVote?: 'match' | 'contradict';
}

export interface BusinessAnalytics {
  id: string;
  businessName: string;
  category: 'Hotel' | 'Restaurant' | 'Transport Union';
  subscriptionTier: 'Local Provider' | 'Tourism Business' | 'Enterprise Intelligence';
  monthlySubscriptionPrice: number;
  organicRating: number;
  totalVerifiedReviews: number;
  satisfactionTrend: { month: string; satisfactionScore: number }[];
  customerLikes: string[];
  frequentlyMentionedIssues: string[];
  recentObservations: string[];
  promotedVisibilityActive: boolean;
  nonPaidRatingProtectionVerified: boolean;
}

export interface TripPlanRequest {
  destinationId: string;
  startingLocation: string;
  travelDates: string;
  days: number;
  budget: number;
  travellers: number;
  interests: string[];
  preferredTransport: 'Public/Shared' | 'Cab' | 'Any';
  stayStyle: 'Budget' | 'Standard' | 'Heritage';
}

export interface ItineraryActivity {
  time: string;
  placeName: string;
  category: string;
  duration: string;
  travelMethod: string;
  approxTravelCost: number;
  activityDescription: string;
  foodOption: string;
  costBreakdown: string;
<<<<<<< HEAD
  aiBadge?: string;
=======
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
}

export interface DayItinerary {
  dayNumber: number;
  title: string;
  morning: ItineraryActivity;
  afternoon: ItineraryActivity;
  evening: ItineraryActivity;
  suggestedStay: string;
  stayCost: number;
  dailyTotalSpent: number;
<<<<<<< HEAD
  aiLocalTip?: string;
=======
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
}

export interface GeneratedItinerary {
  id: string;
  destinationName: string;
  daysCount: number;
  totalEstimatedCost: number;
  whyThisPlan: string[];
  days: DayItinerary[];
<<<<<<< HEAD
  aiPromptUsed?: string;
  aiOptimizationScore?: number;
  aiModeActive?: boolean;
}

=======
}
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
