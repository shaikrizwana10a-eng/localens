<<<<<<< HEAD
import React from 'react';
import type { 
  Destination, 
  TransportRoute, 
  Accommodation, 
  FoodItem, 
  VideoReview, 
  UserRole 
} from '../../types/travel';

import { HomeHero } from './HomeHero';
import { QuickCategoryBar } from './QuickCategoryBar';
import { VerifiedKnowledgeHighlight } from './VerifiedKnowledgeHighlight';
import { ExploreDestinations } from './ExploreDestinations';
import { TravelCategoriesSection } from './TravelCategoriesSection';
import { CommunityProcessSection } from './CommunityProcessSection';
import { AIPlannerPromo } from './AIPlannerPromo';
import { LocalRecommendations } from './LocalRecommendations';
import { ForeignTouristCard } from './ForeignTouristCard';
import { FinalCTASection } from './FinalCTASection';
=======
import React, { useState } from 'react';
import { 
  Search, 
  Compass, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  MapPin,
  Share2,
  Bus,
  Banknote,
  Star,
  Users
} from 'lucide-react';
import type { Destination, TransportRoute, Accommodation, FoodItem, VideoReview, UserRole } from '../../types/travel';
import { CommunityLoopSection } from './CommunityLoopSection';
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04

interface HomeViewProps {
  destinations: Destination[];
  routes: TransportRoute[];
  stays: Accommodation[];
  foodItems: FoodItem[];
  videoReviews: VideoReview[];
  onSelectDestination: (destId: string) => void;
  onNavigate: (view: string) => void;
  userRole: UserRole;
}

export const HomeView: React.FC<HomeViewProps> = ({
  destinations,
<<<<<<< HEAD
  routes,
  stays,
  foodItems,
=======
  routes: _routes,
  stays: _stays,
  foodItems: _foodItems,
  videoReviews: _videoReviews,
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
  onSelectDestination,
  onNavigate,
  userRole
}) => {
<<<<<<< HEAD
  return (
    <div className="space-y-12 pb-20">
      
      {/* 1. Foreign Tourist Dedicated Guidance (Role-Activated) */}
      {userRole === 'foreign_tourist' && (
        <ForeignTouristCard />
      )}

      {/* 2. Main Travel Hero with Large Smart Search Panel */}
      <HomeHero
        destinations={destinations}
        onSelectDestination={onSelectDestination}
        onNavigate={onNavigate}
      />

      {/* 3. Quick Discovery Category Bar (Horizontal below Hero) */}
      <QuickCategoryBar onNavigate={onNavigate} />

      {/* 4. Verified Knowledge Highlight ("Know Before You Go") */}
      <VerifiedKnowledgeHighlight onNavigate={onNavigate} />

      {/* 5. Explore Local Destinations ("Explore Like a Local") */}
      <ExploreDestinations
        destinations={destinations}
        onSelectDestination={onSelectDestination}
        onNavigate={onNavigate}
      />

      {/* 6. Travel Categories ("Everything You Need for the Journey") */}
      <TravelCategoriesSection
        routes={routes}
        stays={stays}
        foodItems={foodItems}
        destinations={destinations}
        onNavigate={onNavigate}
      />

      {/* 7. Community Closed-Loop Verification ("Powered by Local Knowledge") */}
      <CommunityProcessSection
        onShareClick={() => onNavigate('share-knowledge')}
        onExploreClick={() => onNavigate('explore-knowledge')}
      />

      {/* 8. AI Trip Planner Promotion ("Plan Your Journey with LocalLens AI") */}
      <AIPlannerPromo onNavigate={onNavigate} />

      {/* 9. Local Recommendations ("LocalLens Recommendations" - Inspired by Offers UX) */}
      <LocalRecommendations
        stays={stays}
        foodItems={foodItems}
        routes={routes}
        destinations={destinations}
        onNavigate={onNavigate}
      />

      {/* 10. Final Call to Action */}
      <FinalCTASection onNavigate={onNavigate} />

=======
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handlePerformSearch = (customQuery?: string) => {
    const query = (customQuery !== undefined ? customQuery : searchQuery).trim().toLowerCase();
    if (!query) {
      onNavigate('explore-knowledge');
      return;
    }

    if (query.includes('gajuwaka') || query.includes('rk beach') || query.includes('99') || query.includes('bus')) {
      onNavigate('explore-knowledge');
      return;
    }

    const matchedDest = destinations.find(
      (d) =>
        d.id.toLowerCase() === query ||
        d.name.toLowerCase().includes(query) ||
        d.state.toLowerCase().includes(query) ||
        (query.includes('vizag') && d.id === 'vizag') ||
        (query.includes('bangalore') && d.id === 'bangalore')
    );

    if (matchedDest) {
      onSelectDestination(matchedDest.id);
      onNavigate('destination');
      return;
    }

    onNavigate('explore-knowledge');
  };

  const handleSelectPopular = (destId: string) => {
    onSelectDestination(destId);
    onNavigate('destination');
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Foreign Tourist Warning Banner */}
      {userRole === 'foreign_tourist' && (
        <div className="bg-amber-900 text-amber-100 px-4 py-3 rounded-xl border border-amber-700 flex items-start space-x-3 shadow-xs">
          <Sparkles className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-white">International Tourist Mode Active</h4>
            <p className="text-xs text-amber-200 mt-0.5">
              Showing verified local fare guidance, emergency helpline numbers (1363 / 112), currency tips, and cultural etiquette for international visitors.
            </p>
          </div>
        </div>
      )}

      {/* Main Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-[#1C1917] text-white py-16 px-6 sm:px-12 border border-stone-800 shadow-xl">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1627894013066-9f65cb717eb6?auto=format&fit=crop&q=80&w=1600" 
            alt="Travel Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-700 shadow-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>LOCAL — Platform Verified Travel Knowledge</span>
          </div>

          {/* Primary Tagline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-tight">
              TRAVEL LIKE A LOCAL.
            </h1>
            <p className="text-emerald-400 font-extrabold text-xl sm:text-2xl italic">
              Go like someone who knows the place.
            </p>
          </div>

          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Discover the practical information that only someone who knows the place would know — exact bus numbers, boarding stands, actual fares, and affordable stays.
          </p>

          {/* Search Bar */}
          <div className="pt-2 max-w-2xl mx-auto relative">
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl border border-stone-200 p-2">
              <Search className="w-5 h-5 text-stone-400 ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Search route or city (e.g. Gajuwaka → RK Beach, Bus 99, Tirupati...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handlePerformSearch();
                }}
                className="w-full px-3 py-2.5 text-stone-900 placeholder-stone-400 text-sm focus:outline-none"
              />
              <button 
                onClick={() => handlePerformSearch()}
                className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white px-6 py-2.5 rounded-xl text-xs font-extrabold transition-colors shrink-0 flex items-center space-x-1"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {/* Real-time Interactive Search Suggestions Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-50 text-left p-2 space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1.5">
                  Matching Verified Knowledge & Places
                </div>

                <div
                  onClick={() => {
                    setSearchQuery('Gajuwaka → RK Beach');
                    onNavigate('explore-knowledge');
                  }}
                  className="flex items-center space-x-3 p-2.5 hover:bg-emerald-50 rounded-xl cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 rounded bg-emerald-100 text-[#1B4332] flex items-center justify-center font-bold text-xs shrink-0">
                    <Bus className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-stone-900 text-sm">Gajuwaka → RK Beach (Bus 99)</div>
                    <p className="text-xs text-stone-500">Fare: ₹45 • Verified by Platform</p>
                  </div>
                </div>

                {destinations
                  .filter((d) =>
                    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    d.id.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .slice(0, 4)
                  .map((dest) => (
                    <div
                      key={dest.id}
                      onClick={() => handleSelectPopular(dest.id)}
                      className="flex items-center space-x-3 p-2.5 hover:bg-emerald-50 rounded-xl cursor-pointer transition-colors"
                    >
                      <img
                        src={dest.heroImage}
                        alt={dest.name}
                        className="w-8 h-8 rounded object-cover border border-stone-200 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-stone-900 text-sm">{dest.name}</div>
                        <p className="text-xs text-stone-500 truncate">{dest.tagline}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('explore-knowledge')}
              className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-extrabold text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center space-x-2 border border-emerald-700"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Local Knowledge</span>
            </button>

            <button
              onClick={() => onNavigate('share-knowledge')}
              className="bg-stone-800 hover:bg-stone-700 text-stone-100 font-extrabold text-sm px-6 py-3 rounded-xl transition-all border border-stone-700 flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span>Share What You Know</span>
            </button>
          </div>

        </div>

        {/* Hero Location Tag (Lower Right) */}
        <div className="absolute bottom-4 right-6 hidden md:flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-700/60 text-xs z-10">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-extrabold text-white">Visakhapatnam</span>
          <span className="text-stone-400">• People · Places · Real Experiences</span>
        </div>
      </section>

      {/* SAMPLE VERIFIED KNOWLEDGE HIGHLIGHT CARD */}
      <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-4">
          <div>
            <span className="bg-emerald-100 text-emerald-950 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded border border-emerald-300">
              Verified Knowledge Example
            </span>
            <h2 className="text-xl font-extrabold text-[#1C1917] mt-1">
              "If you already knew this place, what would you tell me before I travel?"
            </h2>
          </div>
          <button
            onClick={() => onNavigate('explore-knowledge')}
            className="text-xs font-extrabold text-[#1B4332] hover:underline flex items-center"
          >
            <span>View All Knowledge Items</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        {/* Structured Example Card */}
        <div className="bg-[#FAF9F6] rounded-2xl border border-stone-300 p-6 space-y-4 max-w-3xl mx-auto shadow-xs">
          
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="font-extrabold text-xl text-[#1C1917] flex items-center">
              <MapPin className="w-5 h-5 text-[#1B4332]" />
              Gajuwaka <span className="text-emerald-700 mx-2">→</span> RK Beach
            </div>
            <span className="bg-emerald-600 text-white font-extrabold text-xs px-3 py-1 rounded-full flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Verified by LOCAL
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 font-bold uppercase block">Transport</span>
              <span className="font-extrabold text-stone-900 text-base flex items-center"><Bus className="w-4 h-4 text-[#1B4332] mr-1" /> Bus 99</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 font-bold uppercase block">Verified Fare</span>
              <span className="font-extrabold text-emerald-800 text-base flex items-center"><Banknote className="w-4 h-4 text-emerald-600 mr-1" /> ₹45</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 font-bold uppercase block">Boarding Point</span>
              <span className="font-bold text-stone-800 truncate block flex items-center"><MapPin className="w-4 h-4 text-stone-500 mr-1 shrink-0" /> Gajuwaka Stand</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 font-bold uppercase block">Community Score</span>
              <span className="font-extrabold text-amber-900 flex items-center">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400 mr-1" /> 4.8 / 5
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-200">
            <span><Users className="w-3.5 h-3.5 mr-1 inline text-stone-400" /> Reported by local users</span>
            <span><CheckCircle2 className="w-3.5 h-3.5 mr-1 inline text-emerald-600" /> Verified by the platform desk</span>
            <span>Last verified: 2026-09-08</span>
          </div>

        </div>

      </section>

      {/* CENTRAL PRODUCT LOOP ANIMATED SECTION */}
      <CommunityLoopSection
        onExploreClick={() => onNavigate('explore-knowledge')}
        onShareClick={() => onNavigate('share-knowledge')}
      />

>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
    </div>
  );
};
