import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { 
  Profile, 
  TravelPreferences, 
  SavedPlace, 
  TripHistoryItem 
} from '../types/profile';
import { 
  supabase, 
  isSupabaseConfigured,
  fetchUserProfile, 
  saveUserProfile, 
  fetchTravelPreferences, 
  saveTravelPreferences, 
  fetchSavedPlaces, 
  deleteSavedPlace, 
  fetchTripHistory,
  signOutUser,
  DEFAULT_DEMO_PROFILE,
  DEFAULT_DEMO_PREFERENCES
} from '../lib/supabase';

interface AuthContextType {
  profile: Profile;
  preferences: TravelPreferences;
  savedPlaces: SavedPlace[];
  trips: TripHistoryItem[];
  loading: boolean;
  error: string | null;
  isSupabaseLive: boolean;
  updateProfileData: (data: Partial<Profile>) => Promise<{ success: boolean; error?: string }>;
  updatePreferencesData: (data: Partial<TravelPreferences>) => Promise<{ success: boolean; error?: string }>;
  removeBookmark: (savedPlaceId: string) => Promise<void>;
  handleSignOut: () => Promise<{ success: boolean; error?: string }>;
  refreshData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(DEFAULT_DEMO_PROFILE);
  const [preferences, setPreferences] = useState<TravelPreferences>(DEFAULT_DEMO_PREFERENCES);
  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>([]);
  const [trips, setTrips] = useState<TripHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadUserData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let activeUserId: string | undefined = undefined;

      if (supabase && isSupabaseConfigured) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          activeUserId = user.id;
        }
      }

      const [loadedProfile, loadedPrefs, loadedPlaces, loadedTrips] = await Promise.all([
        fetchUserProfile(activeUserId),
        fetchTravelPreferences(activeUserId),
        fetchSavedPlaces(activeUserId),
        fetchTripHistory(activeUserId)
      ]);

      setProfile(loadedProfile);
      setPreferences(loadedPrefs);
      setSavedPlaces(loadedPlaces);
      setTrips(loadedTrips);
    } catch (err: unknown) {
      console.error('Failed to load user data:', err);
      setError(err instanceof Error ? err.message : 'Error loading profile data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();

    // Listen for Supabase auth state changes if configured
    if (supabase && isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
        loadUserData();
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [loadUserData]);

  const updateProfileData = async (data: Partial<Profile>): Promise<{ success: boolean; error?: string }> => {
    try {
      const updated = await saveUserProfile({ ...profile, ...data, id: profile.id });
      setProfile(updated);
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update profile';
      return { success: false, error: msg };
    }
  };

  const updatePreferencesData = async (data: Partial<TravelPreferences>): Promise<{ success: boolean; error?: string }> => {
    try {
      const updated = await saveTravelPreferences({ ...preferences, ...data, user_id: profile.id });
      setPreferences(updated);
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update travel preferences';
      return { success: false, error: msg };
    }
  };

  const removeBookmark = async (savedPlaceId: string): Promise<void> => {
    try {
      await deleteSavedPlace(savedPlaceId, profile.id);
      setSavedPlaces(prev => prev.filter(p => p.id !== savedPlaceId));
    } catch (err) {
      console.error('Error removing bookmark:', err);
    }
  };

  const handleSignOut = async (): Promise<{ success: boolean; error?: string }> => {
    const res = await signOutUser();
    if (res.success) {
      // Clear demo or session storage
      localStorage.removeItem('localens_profile_v1');
      localStorage.removeItem('localens_travel_prefs_v1');
      setProfile(DEFAULT_DEMO_PROFILE);
      setPreferences(DEFAULT_DEMO_PREFERENCES);
    }
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        profile,
        preferences,
        savedPlaces,
        trips,
        loading,
        error,
        isSupabaseLive: isSupabaseConfigured,
        updateProfileData,
        updatePreferencesData,
        removeBookmark,
        handleSignOut,
        refreshData: loadUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
