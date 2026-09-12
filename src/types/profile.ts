export interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string | null;
  phone?: string | null;
  date_of_birth?: string | null;
  gender?: 'Male' | 'Female' | 'Non-Binary' | 'Prefer not to say' | string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  created_at: string;
  updated_at?: string | null;
}

export type TravelType = 'Solo' | 'Couple' | 'Family' | 'Friends' | 'Business';
export type BudgetPreference = 'Budget' | 'Moderate' | 'Premium' | 'Luxury';
export type TransportMode = 'Bus' | 'Train' | 'Flight' | 'Cab' | 'Rental Vehicle';
export type FoodPreference = 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'No Preference';
export type AccommodationPreference = 'Budget Hotel' | 'Hotel' | 'Resort' | 'Homestay' | 'No Preference';

export interface TravelPreferences {
  id?: string;
  user_id: string;
  travel_type: TravelType;
  budget_preference: BudgetPreference;
  preferred_transport: TransportMode[];
  food_preference: FoodPreference;
  accommodation_preference: AccommodationPreference;
  created_at?: string;
  updated_at?: string;
}

export type PlaceCategory = 
  | 'Tourist Places' 
  | 'Restaurants' 
  | 'Hotels' 
  | 'Medical' 
  | 'Shopping' 
  | 'Transportation';

export interface SavedPlace {
  id: string;
  user_id: string;
  place_id: string;
  place_name: string;
  city: string;
  category: PlaceCategory;
  description: string;
  image_url: string;
  rating?: number;
  badge?: string;
  created_at?: string;
}

export interface TripHistoryItem {
  id: string;
  user_id?: string;
  destination: string;
  origin?: string;
  trip_date: string;
  travelers_count: number;
  estimated_budget: number;
  status: 'Completed' | 'Upcoming' | 'Draft';
  itinerary_snippet?: string;
}

export interface NotificationSettings {
  travel_recommendations: boolean;
  saved_place_updates: boolean;
  booking_notifications: boolean;
  promotional_notifications: boolean;
}

export interface PrivacySettings {
  profile_visibility: 'Public' | 'Community Only' | 'Private';
  location_sharing: boolean;
}
