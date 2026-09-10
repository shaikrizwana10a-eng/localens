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

export interface TransportStep {
  stepNumber: number;
  instruction: string;
  distanceOrTime: string;
  iconType: 'walk' | 'bus' | 'auto' | 'cab';
}

export interface TransportOption {
  id: string;
  transportType: 'Local Bus' | 'Shared Auto' | 'Bus + Walk' | 'Private Cab';
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
}

export interface TransportRoute {
  id: string;
  origin: string;
  destination: string;
  distanceKm: number;
  options: TransportOption[];
}

export interface Accommodation {
  id: string;
  name: string;
  type: 'Budget Hotel' | 'Homestay' | 'Dharamshala' | 'Boutique Stay';
  destinationId: string;
  address: string;
  pricePerNight: number;
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
}

export interface GeneratedItinerary {
  id: string;
  destinationName: string;
  daysCount: number;
  totalEstimatedCost: number;
  whyThisPlan: string[];
  days: DayItinerary[];
}
