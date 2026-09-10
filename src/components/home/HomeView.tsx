import React, { useState } from 'react';
import { 
  Search, 
  Bus, 
  Compass, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  TrendingUp,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  MapPin,
  Calendar,
  Building2,
  Video,
  Coins
} from 'lucide-react';
import type { Destination, TransportRoute, Accommodation, FoodItem, VideoReview, UserRole } from '../../types/travel';
import { TrustBadge, FreshnessTag } from '../common/TrustBadge';

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
  routes,
  stays: _stays,
  foodItems: _foodItems,
  videoReviews: _videoReviews,
  onSelectDestination,
  onNavigate,
  userRole
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handlePerformSearch = (customQuery?: string) => {
    const query = (customQuery !== undefined ? customQuery : searchQuery).trim().toLowerCase();
    if (!query) {
      onNavigate('destination');
      return;
    }

    // 1. Direct match by destination id, name, or state
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

    // 2. Search inside attractions (e.g. Borra Caves, Charminar, Simhachalam, Benne Dosa, etc.)
    const matchedAttractionDest = destinations.find((d) =>
      d.attractions.some(
        (att) =>
          att.name.toLowerCase().includes(query) ||
          att.category.toLowerCase().includes(query) ||
          att.description.toLowerCase().includes(query)
      )
    );

    if (matchedAttractionDest) {
      onSelectDestination(matchedAttractionDest.id);
      onNavigate('destination');
      return;
    }

    // Default fallback to destination view
    onNavigate('destination');
  };

  const handleSelectPopular = (destId: string) => {
    onSelectDestination(destId);
    onNavigate('destination');
  };

  const filteredDestinations = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-16">
      
      {/* Foreign Tourist Warning / Assistance Banner if role is foreign_tourist */}
      {userRole === 'foreign_tourist' && (
        <div className="bg-amber-900 text-amber-100 px-4 py-3 rounded-lg border border-amber-700 flex items-start space-x-3 shadow-xs">
          <Sparkles className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm text-white">International Tourist Safety Mode Active</h4>
            <p className="text-xs text-amber-200 mt-0.5">
              Showing verified local fare guidance, emergency helpline numbers (1363 / 112), currency tips, and cultural etiquette for international visitors.
            </p>
          </div>
        </div>
      )}

      {/* Hero Section - Clean Editorial Travel Aesthetic */}
      <section className="relative rounded-2xl overflow-hidden bg-[#1C1917] text-white py-14 px-6 sm:px-12 border border-stone-800 shadow-md">
        <div className="absolute inset-0 opacity-25">
          <img 
            src="https://images.unsplash.com/photo-1627894013066-9f65cb717eb6?auto=format&fit=crop&q=80&w=1600" 
            alt="Travel Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide border border-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>What is LOKAL? — Community-Verified Travel Guide</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Travel like someone who <br className="hidden sm:inline" />
            <span className="text-emerald-400">knows the place.</span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Find out how to travel affordably by bus or auto, stay in clean verified hotels, and plan your entire trip within your budget.
          </p>

          {/* Primary Search Bar with Direct Navigation */}
          <div className="pt-2 max-w-xl mx-auto relative">
            <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-stone-200 p-1.5">
              <Search className="w-5 h-5 text-stone-400 ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Type city or sight (e.g. Tirupati, Araku, Borra Caves, Vizag...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handlePerformSearch();
                  }
                }}
                className="w-full px-3 py-2.5 text-stone-900 placeholder-stone-400 text-sm focus:outline-none"
              />
              <button 
                onClick={() => handlePerformSearch()}
                className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shrink-0 flex items-center space-x-1"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {/* Real-time Interactive Search Suggestions Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden z-50 text-left p-2 space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1.5">
                  Matching Destinations & Sights
                </div>

                {destinations
                  .filter((d) =>
                    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    d.attractions.some((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .slice(0, 6)
                  .map((dest) => (
                    <div
                      key={dest.id}
                      onClick={() => handleSelectPopular(dest.id)}
                      className="flex items-center space-x-3 p-2.5 hover:bg-emerald-50 rounded-lg cursor-pointer transition-colors group"
                    >
                      <img
                        src={dest.heroImage}
                        alt={dest.name}
                        className="w-10 h-10 rounded-md object-cover border border-stone-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-stone-900 text-sm group-hover:text-[#1B4332] flex items-center justify-between">
                          <span>{dest.name}</span>
                          <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">{dest.state}</span>
                        </div>
                        <p className="text-xs text-stone-500 truncate">{dest.tagline}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            <div className="flex items-center justify-center space-x-2 text-xs text-stone-400 mt-2.5">
              <span>Popular searches:</span>
              <button onClick={() => handleSelectPopular('tirupati')} className="hover:text-emerald-400 underline">Tirupati</button>
              <span>•</span>
              <button onClick={() => handleSelectPopular('araku')} className="hover:text-emerald-400 underline">Araku Valley</button>
              <span>•</span>
              <button onClick={() => handleSelectPopular('vizag')} className="hover:text-emerald-400 underline">Visakhapatnam</button>
              <span>•</span>
              <button onClick={() => handleSelectPopular('hyderabad')} className="hover:text-emerald-400 underline">Hyderabad</button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK 1-LINE "WHAT IS WHAT?" GUIDE WIDGET */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
          <div className="flex items-center space-x-2">
            <div className="bg-[#1B4332] text-white p-1.5 rounded-lg">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1C1917]">What is What on LOKAL? (Quick 1-Line Guide)</h2>
              <p className="text-xs text-stone-500">Simple one-line breakdown of every tool & feature on this website</p>
            </div>
          </div>
          <span className="text-[11px] bg-emerald-50 text-[#1B4332] font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
            Click any feature to open
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          <div 
            onClick={() => onNavigate('destination')} 
            className="p-3.5 bg-[#FAF9F6] rounded-xl border border-stone-200 hover:border-[#1B4332] hover:bg-emerald-50/50 cursor-pointer transition-all group"
          >
            <div className="font-bold text-[#1C1917] group-hover:text-[#1B4332] flex items-center justify-between">
              <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1.5 text-[#1B4332]" /> Destinations</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#1B4332]" />
            </div>
            <p className="text-[11px] text-stone-600 mt-1 leading-snug">
              Explore 6 top Indian cities with entry fees, maps, and real local travel advice.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('planner')} 
            className="p-3.5 bg-[#FAF9F6] rounded-xl border border-stone-200 hover:border-[#1B4332] hover:bg-emerald-50/50 cursor-pointer transition-all group"
          >
            <div className="font-bold text-[#1C1917] group-hover:text-[#1B4332] flex items-center justify-between">
              <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5 text-amber-700" /> Trip Planner</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#1B4332]" />
            </div>
            <p className="text-[11px] text-stone-600 mt-1 leading-snug">
              Build daily itineraries with budget sliders & transparent "Why this plan?" notes.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('transport')} 
            className="p-3.5 bg-[#FAF9F6] rounded-xl border border-stone-200 hover:border-[#1B4332] hover:bg-emerald-50/50 cursor-pointer transition-all group"
          >
            <div className="font-bold text-[#1C1917] group-hover:text-[#1B4332] flex items-center justify-between">
              <span className="flex items-center"><Bus className="w-3.5 h-3.5 mr-1.5 text-blue-700" /> Local Transport</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#1B4332]" />
            </div>
            <p className="text-[11px] text-stone-600 mt-1 leading-snug">
              Find exact RTC bus numbers, shared auto stands & real fares from point A to B.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('stays')} 
            className="p-3.5 bg-[#FAF9F6] rounded-xl border border-stone-200 hover:border-[#1B4332] hover:bg-emerald-50/50 cursor-pointer transition-all group"
          >
            <div className="font-bold text-[#1C1917] group-hover:text-[#1B4332] flex items-center justify-between">
              <span className="flex items-center"><Building2 className="w-3.5 h-3.5 mr-1.5 text-purple-700" /> Stays & Food</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#1B4332]" />
            </div>
            <p className="text-[11px] text-stone-600 mt-1 leading-snug">
              Check verified hotel bathroom cleanliness scores and real food dish price tags.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('video')} 
            className="p-3.5 bg-[#FAF9F6] rounded-xl border border-stone-200 hover:border-[#1B4332] hover:bg-emerald-50/50 cursor-pointer transition-all group"
          >
            <div className="font-bold text-[#1C1917] group-hover:text-[#1B4332] flex items-center justify-between">
              <span className="flex items-center"><Video className="w-3.5 h-3.5 mr-1.5 text-red-700" /> Video Proofs</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#1B4332]" />
            </div>
            <p className="text-[11px] text-stone-600 mt-1 leading-snug">
              Watch unedited video walkthroughs of hotel rooms and sights with AI transcripts.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('missions')} 
            className="p-3.5 bg-[#FAF9F6] rounded-xl border border-stone-200 hover:border-[#1B4332] hover:bg-emerald-50/50 cursor-pointer transition-all group"
          >
            <div className="font-bold text-[#1C1917] group-hover:text-[#1B4332] flex items-center justify-between">
              <span className="flex items-center"><Coins className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> Scout Missions</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#1B4332]" />
            </div>
            <p className="text-[11px] text-stone-600 mt-1 leading-snug">
              Verify local prices or bus fares in your city to earn cash rewards in your wallet.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('foreign')} 
            className="p-3.5 bg-[#FAF9F6] rounded-xl border border-stone-200 hover:border-[#1B4332] hover:bg-emerald-50/50 cursor-pointer transition-all group"
          >
            <div className="font-bold text-[#1C1917] group-hover:text-[#1B4332] flex items-center justify-between">
              <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-teal-700" /> Foreign Safety</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#1B4332]" />
            </div>
            <p className="text-[11px] text-stone-600 mt-1 leading-snug">
              Access 1363 tourist helpline, auto meter rules & local language phrase cards.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('business')} 
            className="p-3.5 bg-[#FAF9F6] rounded-xl border border-stone-200 hover:border-[#1B4332] hover:bg-emerald-50/50 cursor-pointer transition-all group"
          >
            <div className="font-bold text-[#1C1917] group-hover:text-[#1B4332] flex items-center justify-between">
              <span className="flex items-center"><Building2 className="w-3.5 h-3.5 mr-1.5 text-amber-800" /> Business Hub</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#1B4332]" />
            </div>
            <p className="text-[11px] text-stone-600 mt-1 leading-snug">
              Local hotel & restaurant owners view authentic, un-purchasable rating analytics.
            </p>
          </div>

        </div>
      </section>

      {/* Three Core Pillars Section */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1C1917]">How LOKAL Helps You Travel</h2>
          <p className="text-xs text-[#57534E] mt-1">Built to remove guesswork and help you travel with confidence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1 */}
          <div className="bg-[#FAF9F6] p-6 rounded-xl border border-[#E7E5E4] space-y-3 hover:border-[#1B4332] transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#1B4332] flex items-center justify-center font-bold">
              <Bus className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#1C1917] text-lg">Travel Cheaply by Bus & Auto</h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Find step-by-step local bus routes, shared auto stands, bus stop locations, and real ticket prices so you never overpay.
            </p>
            <button 
              onClick={() => onNavigate('transport')}
              className="text-xs font-semibold text-[#1B4332] inline-flex items-center hover:underline pt-1"
            >
              Explore Local Routes & Fares <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#FAF9F6] p-6 rounded-xl border border-[#E7E5E4] space-y-3 hover:border-[#1B4332] transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#1C1917] text-lg">Plan Your Entire Trip</h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Create easy day-by-day travel plans matching your exact daily budget and personal preferences with helpful travel explanations.
            </p>
            <button 
              onClick={() => onNavigate('planner')}
              className="text-xs font-semibold text-[#1B4332] inline-flex items-center hover:underline pt-1"
            >
              Build Custom Itinerary <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#FAF9F6] p-6 rounded-xl border border-[#E7E5E4] space-y-3 hover:border-[#1B4332] transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#1C1917] text-lg">Clean Hotels & Fair Food Prices</h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              View real photos and videos of hotel rooms and bathrooms, verified food prices, and trusted reviews from real travellers.
            </p>
            <button 
              onClick={() => onNavigate('stays')}
              className="text-xs font-semibold text-[#1B4332] inline-flex items-center hover:underline pt-1"
            >
              Discover Verified Stays & Food <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

        </div>
      </section>

      {/* Popular Destinations Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#1C1917]">Popular Indian Destinations</h2>
            <p className="text-xs text-[#57534E]">Real travel advice and verified details for famous places.</p>
          </div>
          <button 
            onClick={() => onNavigate('destination')}
            className="text-xs font-semibold text-[#1B4332] hover:underline flex items-center"
          >
            View All Destinations <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => (
            <div 
              key={dest.id}
              onClick={() => {
                onSelectDestination(dest.id);
                onNavigate('destination');
              }}
              className="bg-white rounded-xl border border-[#E7E5E4] overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-stone-200">
                <img 
                  src={dest.heroImage} 
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#1C1917]/80 text-white px-2.5 py-1 rounded-md text-[11px] font-semibold backdrop-blur-xs">
                  {dest.state}
                </div>
                <div className="absolute bottom-3 right-3 bg-[#1B4332] text-white px-2.5 py-1 rounded-md text-[11px] font-medium shadow-xs">
                  {dest.avgDailyBudget}
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#1C1917] group-hover:text-[#1B4332] transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-[#57534E] line-clamp-2 mt-1">
                    {dest.tagline}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E7E5E4] text-xs">
                  <div className="flex items-center justify-between text-[#57534E]">
                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-stone-500" /> Best Time:</span>
                    <span className="font-medium text-[#1C1917]">{dest.bestVisitingTime.split('(')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#57534E]">
                    <span className="flex items-center"><TrendingUp className="w-3.5 h-3.5 mr-1 text-stone-500" /> Crowd Level:</span>
                    <span className="font-semibold text-emerald-800">{dest.crowdStatus}</span>
                  </div>
                </div>

                <div className="bg-[#FAF9F6] p-2.5 rounded-lg border border-[#E7E5E4] text-[11px] text-[#57534E]">
                  <span className="font-semibold text-[#1B4332]">Top Local Note: </span>
                  "{dest.communityObservations[0]}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Transport Routes Section */}
      <section className="bg-[#FAF9F6] p-6 sm:p-8 rounded-2xl border border-[#E7E5E4] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#1C1917]">Popular Local Bus & Auto Routes</h2>
            <p className="text-xs text-[#57534E]">Step-by-step travel routes with real bus numbers and verified ticket prices.</p>
          </div>
          <button 
            onClick={() => onNavigate('transport')}
            className="text-xs font-semibold text-[#1B4332] hover:underline"
          >
            Search All Routes →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {routes.map((route) => (
            <div key={route.id} className="bg-white p-5 rounded-xl border border-[#E7E5E4] space-y-4">
              <div className="flex items-start justify-between border-b border-[#E7E5E4] pb-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1B4332]">Route Overview</div>
                  <h3 className="font-bold text-[#1C1917] text-base mt-0.5">
                    {route.origin} → {route.destination}
                  </h3>
                </div>
                <span className="bg-emerald-50 text-[#1B4332] px-2.5 py-1 rounded text-xs font-semibold">
                  {route.distanceKm} km
                </span>
              </div>

              <div className="space-y-3">
                {route.options.slice(0, 2).map((opt) => (
                  <div key={opt.id} className="bg-[#FAF9F6] p-3 rounded-lg border border-[#E7E5E4] flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-[#1C1917] flex items-center">
                        <span>{opt.transportType}</span>
                        <span className="mx-2 text-stone-300">•</span>
                        <span className="text-emerald-800 font-semibold">{opt.approxFare}</span>
                      </div>
                      <p className="text-[11px] text-[#57534E] mt-0.5">{opt.approxDuration} • Boarding: {opt.boardingPoint}</p>
                    </div>
                    <TrustBadge level={opt.confidenceLevel} verifiedCount={opt.verifiedCount} showDetails={false} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Verified Community Feed & Missions Callout */}
      <section className="bg-[#1C1917] text-white p-6 sm:p-8 rounded-2xl border border-stone-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 font-semibold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Live Community Feed</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">Recently Verified Information by Travellers</h2>
          </div>

          <button 
            onClick={() => onNavigate('missions')}
            className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1"
          >
            <span>Earn Money by Verifying Prices</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-stone-400 text-[11px]">
              <span>Tirupati Hotel Parking</span>
              <FreshnessTag daysAgo={2} />
            </div>
            <p className="text-stone-200 font-medium">
              "Sapthagiri Residency free open parking confirmed for 8 cars with zero extra charge."
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold">
              Verified by 14 independent travellers
            </div>
          </div>

          <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-stone-400 text-[11px]">
              <span>Tirumala RTC Bus Fare</span>
              <FreshnessTag daysAgo={1} />
            </div>
            <p className="text-stone-200 font-medium">
              "Electric AC Bus fare confirmed at ₹85 per head from Tirupati Central Stand."
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold">
              Verified by 28 independent travellers
            </div>
          </div>

          <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-stone-400 text-[11px]">
              <span>Borra Caves Meal Price</span>
              <FreshnessTag daysAgo={4} />
            </div>
            <p className="text-stone-200 font-medium">
              "Bamboo Chicken portion price confirmed at ₹250 per bamboo stalk."
            </p>
            <div className="text-[11px] text-amber-400 font-semibold">
              Verified by 9 travellers (2 disputes logged)
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
