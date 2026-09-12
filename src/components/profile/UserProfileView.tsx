<<<<<<< HEAD
import React, { useState } from 'react';
import { 
  User, 
  Compass, 
  Bookmark, 
  Clock, 
  Settings, 
  AlertCircle, 
  RefreshCw, 
  Database, 
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ProfileHeader } from './ProfileHeader';
import { PersonalInformation } from './PersonalInformation';
import { TravelPreferences } from './TravelPreferences';
import { SavedPlaces } from './SavedPlaces';
import { RecentTrips } from './RecentTrips';
import { AccountSettings } from './AccountSettings';
=======
import React from 'react';
import { Bookmark, Compass } from 'lucide-react';
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
import type { Destination, Accommodation } from '../../types/travel';

interface UserProfileViewProps {
  destinations: Destination[];
  stays: Accommodation[];
  onNavigate: (view: string) => void;
}

<<<<<<< HEAD
type ProfileTab = 'all' | 'personal' | 'preferences' | 'saved' | 'trips' | 'settings';

export const UserProfileView: React.FC<UserProfileViewProps> = ({ onNavigate }) => {
  const { 
    profile, 
    preferences, 
    savedPlaces, 
    trips, 
    loading, 
    error, 
    isSupabaseLive,
    updateProfileData, 
    updatePreferencesData, 
    removeBookmark, 
    handleSignOut,
    refreshData 
  } = useAuth();

  const [activeTab, setActiveTab] = useState<ProfileTab>('all');
  const [triggerEditPersonal, setTriggerEditPersonal] = useState(false);

  // Loading skeleton state
  if (loading) {
    return (
      <div className="space-y-6 py-12">
        <div className="bg-stone-200 animate-pulse h-48 rounded-3xl w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-stone-200 animate-pulse h-96 rounded-2xl lg:col-span-2" />
          <div className="bg-stone-200 animate-pulse h-96 rounded-2xl" />
        </div>
      </div>
    );
  }

  // Error state with retry button
  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center space-y-4 max-w-lg mx-auto my-12">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-rose-900">Unable to load profile data</h3>
          <p className="text-xs text-rose-700">{error}</p>
        </div>
        <button
          onClick={() => refreshData()}
          className="inline-flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Connection</span>
        </button>
      </div>
    );
  }

  const tabs: { id: ProfileTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'all', label: 'Overview', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'personal', label: 'Personal Info', icon: <User className="w-4 h-4" /> },
    { id: 'preferences', label: 'Travel Preferences', icon: <Compass className="w-4 h-4" /> },
    { id: 'saved', label: 'Saved Places', icon: <Bookmark className="w-4 h-4" />, count: savedPlaces.length },
    { id: 'trips', label: 'Travel History', icon: <Clock className="w-4 h-4" />, count: trips.length },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner indicating Supabase Integration */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-extrabold text-[#1C1917] text-sm">Traveler Profile & Hub</span>
          <span className="text-stone-400">•</span>
          <span className="text-stone-500 font-medium">Synced with Supabase PostgreSQL</span>
        </div>
        <div className="flex items-center space-x-2 text-[11px]">
          <span className="inline-flex items-center space-x-1 bg-emerald-50 text-[#1B4332] px-2.5 py-1 rounded-md border border-emerald-200 font-semibold">
            <Database className="w-3 h-3 text-[#1B4332]" />
            <span>{isSupabaseLive ? 'Live Cloud Supabase' : 'Local Supabase State (Demo Mode)'}</span>
          </span>
        </div>
      </div>

      {/* Profile Header */}
      <ProfileHeader
        profile={profile}
        onEditClick={() => {
          setActiveTab('personal');
          setTriggerEditPersonal(true);
        }}
        isSupabaseLive={isSupabaseLive}
      />

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-[#E7E5E4]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 border ${
              activeTab === tab.id
                ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                : 'bg-white text-stone-600 hover:text-[#1C1917] hover:bg-stone-100 border-transparent'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                activeTab === tab.id
                  ? 'bg-emerald-800 text-emerald-100'
                  : 'bg-stone-200 text-stone-700'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content Rendering Based on Active Tab */}
      {activeTab === 'all' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <PersonalInformation
                profile={profile}
                onSave={updateProfileData}
                isEditingExternal={triggerEditPersonal}
                onStopEditingExternal={() => setTriggerEditPersonal(false)}
              />
              <TravelPreferences
                preferences={preferences}
                onSave={updatePreferencesData}
              />
            </div>
            <div className="space-y-8">
              <RecentTrips
                trips={trips}
                onNavigate={onNavigate}
              />
              <AccountSettings
                onSignOut={handleSignOut}
                onNavigate={onNavigate}
              />
            </div>
          </div>

          <SavedPlaces
            savedPlaces={savedPlaces}
            onRemove={removeBookmark}
            onNavigate={onNavigate}
          />
        </div>
      )}

      {activeTab === 'personal' && (
        <PersonalInformation
          profile={profile}
          onSave={updateProfileData}
          isEditingExternal={triggerEditPersonal}
          onStopEditingExternal={() => setTriggerEditPersonal(false)}
        />
      )}

      {activeTab === 'preferences' && (
        <TravelPreferences
          preferences={preferences}
          onSave={updatePreferencesData}
        />
      )}

      {activeTab === 'saved' && (
        <SavedPlaces
          savedPlaces={savedPlaces}
          onRemove={removeBookmark}
          onNavigate={onNavigate}
        />
      )}

      {activeTab === 'trips' && (
        <RecentTrips
          trips={trips}
          onNavigate={onNavigate}
        />
      )}

      {activeTab === 'settings' && (
        <AccountSettings
          onSignOut={handleSignOut}
          onNavigate={onNavigate}
        />
      )}
=======
export const UserProfileView: React.FC<UserProfileViewProps> = ({ stays, onNavigate }) => {
  return (
    <div className="space-y-10 pb-16">
      
      {/* Profile Header */}
      <div className="bg-[#1C1917] text-white p-8 rounded-2xl border border-stone-800 flex items-center space-x-6">
        <div className="w-20 h-20 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center font-bold text-3xl shrink-0 shadow-lg">
          A
        </div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white">Ananya Sharma</h1>
            <span className="bg-emerald-800 text-emerald-200 text-xs px-2 py-0.5 rounded font-semibold">
              Verified Traveller & Scout
            </span>
          </div>
          <p className="text-xs text-stone-400">Member since May 2025 • 14 verified contributions logged</p>
        </div>
      </div>

      {/* Saved Itineraries Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#1C1917] flex items-center">
          <Compass className="w-5 h-5 mr-2 text-[#1B4332]" />
          My Saved Trips & Itineraries
        </h2>

        <div className="bg-white p-6 rounded-xl border border-[#E7E5E4] space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="bg-emerald-100 text-[#1B4332] text-[10px] font-bold px-2 py-0.5 rounded">3 DAYS • TIRUPATI & TIRUMALA</span>
              <h3 className="font-bold text-[#1C1917] text-base mt-1">Sacred Temple Ascent & Waterfalls Trail</h3>
            </div>
            <span className="font-extrabold text-[#1B4332] text-base">₹6,420 total est.</span>
          </div>

          <p className="text-xs text-stone-600">
            Includes Alipiri Footpath token collection at 4:30 AM, Kapila Theertham waterfalls visit, Chandragiri Fort light show, and Sapthagiri Residency stay.
          </p>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onNavigate('planner')}
              className="text-xs font-semibold text-[#1B4332] hover:underline"
            >
              Open Saved Plan →
            </button>
          </div>
        </div>
      </div>

      {/* Bookmarked Stays & Places */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#1C1917] flex items-center">
          <Bookmark className="w-5 h-5 mr-2 text-[#1B4332]" />
          Bookmarked Stays
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stays.slice(0, 2).map((stay) => (
            <div key={stay.id} className="bg-white p-4 rounded-xl border border-[#E7E5E4] space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-[#1C1917] text-sm">{stay.name}</h4>
                <span className="font-bold text-[#1B4332] text-xs">₹{stay.pricePerNight}/night</span>
              </div>
              <p className="text-xs text-stone-500">{stay.address}</p>
              <div className="text-[11px] text-emerald-800 font-semibold">{stay.cleanlinessScore}</div>
            </div>
          ))}
        </div>
      </div>
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04

    </div>
  );
};
