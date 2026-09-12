import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { 
  Profile, 
  TravelPreferences, 
  SavedPlace, 
  TripHistoryItem 
} from '../types/profile';

// Environment credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder') &&
  !supabaseAnonKey.includes('placeholder')
);

// Initialize Supabase Client if credentials exist
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// LocalStorage Keys for resilient offline/development fallback
const STORAGE_PROFILE_KEY = 'localens_profile_v1';
const STORAGE_PREFS_KEY = 'localens_travel_prefs_v1';
const STORAGE_SAVED_PLACES_KEY = 'localens_saved_places_v1';
const STORAGE_TRIPS_KEY = 'localens_trip_history_v1';

// Default Demo User Seed
export const DEFAULT_DEMO_PROFILE: Profile = {
  id: 'usr-localens-9876',
  full_name: 'Rahul Allamudi',
  email: 'rahul.allamudi@example.com',
  avatar_url: null,
  phone: '+91 98480 22334',
  date_of_birth: '1998-07-15',
  gender: 'Male',
  city: 'Visakhapatnam',
  state: 'Andhra Pradesh',
  country: 'India',
  created_at: '2025-09-12T10:00:00.000Z',
  updated_at: '2026-09-12T10:00:00.000Z'
};

export const DEFAULT_DEMO_PREFERENCES: TravelPreferences = {
  id: 'pref-localens-1',
  user_id: 'usr-localens-9876',
  travel_type: 'Friends',
  budget_preference: 'Moderate',
  preferred_transport: ['Train', 'Bus', 'Cab'],
  food_preference: 'Vegetarian',
  accommodation_preference: 'Homestay',
  created_at: '2025-09-12T10:00:00.000Z',
  updated_at: '2026-09-12T10:00:00.000Z'
};

export const DEFAULT_DEMO_SAVED_PLACES: SavedPlace[] = [
  {
    id: 'save-1',
    user_id: 'usr-localens-9876',
    place_id: 'att-8',
    place_name: 'INS Kursura Submarine Museum',
    city: 'Visakhapatnam',
    category: 'Tourist Places',
    description: 'Decommissioned Soviet-built submarine S20 preserved right on RK Beach sand promenade. Real interior torpedo room walkthrough.',
    image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    badge: 'Naval Heritage'
  },
  {
    id: 'save-2',
    user_id: 'usr-localens-9876',
    place_id: 'stay-3',
    place_name: 'Araku Valley Green Retreat',
    city: 'Araku Valley',
    category: 'Hotels',
    description: 'Gated mountain homestay surrounded by organic coffee bushes, serving fresh wood-ember Bamboo Chicken on pre-order.',
    image_url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    badge: '96% Cleanliness'
  },
  {
    id: 'save-3',
    user_id: 'usr-localens-9876',
    place_id: 'food-2',
    place_name: 'Hotel Maurya Mess (Rayalaseema Ragi Mudda)',
    city: 'Tirupati',
    category: 'Restaurants',
    description: 'Authentic local mess renowned for pure ghee Ragi Mudda thalis, quick table turnaround, and transparent local pricing.',
    image_url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    badge: 'Regional Food Mess'
  },
  {
    id: 'save-4',
    user_id: 'usr-localens-9876',
    place_id: 't-route-blr-1',
    place_name: 'Majestic to Cubbon Park Namma Metro Hub',
    city: 'Bengaluru',
    category: 'Transportation',
    description: 'Direct Purple Line contactless transit bypassing all city traffic bottlenecks, dropping right inside Cubbon Park greenery.',
    image_url: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    badge: 'Metro Corridor'
  }
];

export const DEFAULT_DEMO_TRIPS: TripHistoryItem[] = [
  {
    id: 'trip-101',
    user_id: 'usr-localens-9876',
    destination: 'Vizag → Araku Valley',
    origin: 'Visakhapatnam Railway Station',
    trip_date: '12 Sept 2026',
    travelers_count: 3,
    estimated_budget: 4500,
    status: 'Completed',
    itinerary_snippet: 'Vistadome Glass train journey, Borra Caves limestone hike, and tribal bamboo chicken dinner.'
  },
  {
    id: 'trip-102',
    user_id: 'usr-localens-9876',
    destination: 'Tirupati & Tirumala Ascent',
    origin: 'Tirupati Central Bus Stand',
    trip_date: '28 Oct 2026',
    travelers_count: 2,
    estimated_budget: 6420,
    status: 'Upcoming',
    itinerary_snippet: 'Early 4:30 AM SSD darshan pass collection, APS RTC hill shuttle, and Silathoranam rock trail.'
  }
];

/* -------------------------------------------------------------------------- */
/* Profile API Helpers                                                        */
/* -------------------------------------------------------------------------- */

export async function fetchUserProfile(userId?: string): Promise<Profile> {
  if (supabase && userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      return data as Profile;
    }
  }

  // Fallback to localStorage
  try {
    const cached = localStorage.getItem(STORAGE_PROFILE_KEY);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    console.warn('Failed to parse cached profile:', e);
  }

  // Seed default demo profile
  localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(DEFAULT_DEMO_PROFILE));
  return DEFAULT_DEMO_PROFILE;
}

export async function saveUserProfile(profileData: Partial<Profile> & { id: string }): Promise<Profile> {
  const updatedPayload: Profile = {
    ...DEFAULT_DEMO_PROFILE,
    ...profileData,
    updated_at: new Date().toISOString()
  };

  if (supabase && profileData.id) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(updatedPayload)
      .select()
      .single();

    if (!error && data) {
      localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(data));
      return data as Profile;
    }
  }

  // Persist in localStorage
  localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(updatedPayload));
  return updatedPayload;
}

/* -------------------------------------------------------------------------- */
/* Travel Preferences API Helpers                                             */
/* -------------------------------------------------------------------------- */

export async function fetchTravelPreferences(userId?: string): Promise<TravelPreferences> {
  if (supabase && userId) {
    const { data, error } = await supabase
      .from('travel_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!error && data) {
      return data as TravelPreferences;
    }
  }

  try {
    const cached = localStorage.getItem(STORAGE_PREFS_KEY);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    console.warn('Failed to parse cached preferences:', e);
  }

  localStorage.setItem(STORAGE_PREFS_KEY, JSON.stringify(DEFAULT_DEMO_PREFERENCES));
  return DEFAULT_DEMO_PREFERENCES;
}

export async function saveTravelPreferences(prefsData: TravelPreferences): Promise<TravelPreferences> {
  const updatedPayload: TravelPreferences = {
    ...prefsData,
    updated_at: new Date().toISOString()
  };

  if (supabase && prefsData.user_id) {
    const { data, error } = await supabase
      .from('travel_preferences')
      .upsert(updatedPayload)
      .select()
      .single();

    if (!error && data) {
      localStorage.setItem(STORAGE_PREFS_KEY, JSON.stringify(data));
      return data as TravelPreferences;
    }
  }

  localStorage.setItem(STORAGE_PREFS_KEY, JSON.stringify(updatedPayload));
  return updatedPayload;
}

/* -------------------------------------------------------------------------- */
/* Saved Places API Helpers                                                   */
/* -------------------------------------------------------------------------- */

export async function fetchSavedPlaces(userId?: string): Promise<SavedPlace[]> {
  if (supabase && userId) {
    const { data, error } = await supabase
      .from('saved_places')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      return data as SavedPlace[];
    }
  }

  try {
    const cached = localStorage.getItem(STORAGE_SAVED_PLACES_KEY);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    console.warn('Failed to parse saved places:', e);
  }

  localStorage.setItem(STORAGE_SAVED_PLACES_KEY, JSON.stringify(DEFAULT_DEMO_SAVED_PLACES));
  return DEFAULT_DEMO_SAVED_PLACES;
}

export async function deleteSavedPlace(savedPlaceId: string, userId?: string): Promise<void> {
  if (supabase && userId) {
    await supabase
      .from('saved_places')
      .delete()
      .eq('id', savedPlaceId)
      .eq('user_id', userId);
  }

  try {
    const current = await fetchSavedPlaces(userId);
    const filtered = current.filter(p => p.id !== savedPlaceId);
    localStorage.setItem(STORAGE_SAVED_PLACES_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Error removing saved place:', e);
  }
}

/* -------------------------------------------------------------------------- */
/* Trip History API Helpers                                                   */
/* -------------------------------------------------------------------------- */

export async function fetchTripHistory(_userId?: string): Promise<TripHistoryItem[]> {
  try {
    const cached = localStorage.getItem(STORAGE_TRIPS_KEY);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    console.warn('Failed to parse trip history:', e);
  }

  localStorage.setItem(STORAGE_TRIPS_KEY, JSON.stringify(DEFAULT_DEMO_TRIPS));
  return DEFAULT_DEMO_TRIPS;
}

/* -------------------------------------------------------------------------- */
/* Sign Out Helper                                                            */
/* -------------------------------------------------------------------------- */

export async function signOutUser(): Promise<{ success: boolean; error?: string }> {
  if (supabase) {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false, error: error.message };
    }
  }

  return { success: true };
}
