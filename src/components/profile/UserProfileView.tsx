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
import type { Destination, Accommodation } from '../../types/travel';

interface UserProfileViewProps {
  destinations: Destination[];
  stays: Accommodation[];
  onNavigate: (view: string) => void;
}

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

    </div>
  );
};
