import React from 'react';
import { Bookmark, Compass } from 'lucide-react';
import type { Destination, Accommodation } from '../../types/travel';

interface UserProfileViewProps {
  destinations: Destination[];
  stays: Accommodation[];
  onNavigate: (view: string) => void;
}

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

    </div>
  );
};
