import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Bus, 
  ArrowLeftRight, 
  Sparkles, 
  Compass,
  Navigation
} from 'lucide-react';
import type { Destination } from '../../types/travel';

interface HomeHeroProps {
  destinations: Destination[];
  onSelectDestination: (destId: string) => void;
  onNavigate: (view: string) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  destinations,
  onSelectDestination,
  onNavigate
}) => {
  const [searchTab, setSearchTab] = useState<'transit' | 'city' | 'guide'>('transit');
  const [fromQuery, setFromQuery] = useState('Gajuwaka');
  const [toQuery, setToQuery] = useState('RK Beach');
  const [transitMode, setTransitMode] = useState('Local Bus (Direct)');
  const [travellers, setTravellers] = useState('1-2 Travellers • Budget');

  const popularRoutes = [
    { label: 'Gajuwaka → RK Beach (Bus 99)', from: 'Gajuwaka', to: 'RK Beach' },
    { label: 'Tirupati → Tirumala (Hill Bus)', from: 'Tirupati Central Stand', to: 'Tirumala CRO' },
    { label: 'Majestic → Cubbon Park (Metro)', from: 'Majestic Metro', to: 'Cubbon Park' },
    { label: 'Secunderabad → Charminar (Bus 8A)', from: 'Secunderabad', to: 'Charminar' },
    { label: 'Gajuwaka → VIIT (Bus + Auto)', from: 'Gajuwaka', to: 'VIIT Duvvada' }
  ];

  const handleSwap = () => {
    const temp = fromQuery;
    setFromQuery(toQuery);
    setToQuery(temp);
  };

  const handleSearch = (overrideFrom?: string, overrideTo?: string) => {
    const fromVal = (overrideFrom || fromQuery).toLowerCase();
    const toVal = (overrideTo || toQuery).toLowerCase();

    // Check if user is searching for a destination directly
    const matchedDest = destinations.find(
      (d) =>
        fromVal.includes(d.id) ||
        toVal.includes(d.id) ||
        fromVal.includes(d.name.toLowerCase()) ||
        toVal.includes(d.name.toLowerCase()) ||
        fromVal.includes(d.state.toLowerCase()) ||
        toVal.includes(d.state.toLowerCase())
    );

    if (matchedDest) {
      onSelectDestination(matchedDest.id);
      onNavigate('destination');
      return;
    }

    onNavigate('explore-knowledge');
  };

  const handleSelectRoutePill = (from: string, to: string) => {
    setFromQuery(from);
    setToQuery(to);
    handleSearch(from, to);
  };

  return (
    <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#1C1917] via-[#241E1C] to-[#1B4332] text-white py-8 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-12 border border-stone-800 shadow-xl">
      {/* Background Travel Photography Overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1627894013066-9f65cb717eb6?auto=format&fit=crop&q=80&w=1600" 
          alt="Travel Horizon"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Glow Effect */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-5 sm:space-y-8">
        
        {/* Hero Text & Brand Badges */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span className="hidden sm:inline">Platform-Verified Ground Truth Travel Knowledge</span>
            <span className="sm:hidden">Verified Travel Knowledge</span>
          </div>

          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-tight">
            TRAVEL LIKE A LOCAL.
          </h1>

          <p className="text-emerald-300 font-extrabold text-base sm:text-lg lg:text-xl italic">
            Go like someone who knows the place.
          </p>

          <p className="text-stone-300 text-[11px] sm:text-xs lg:text-sm max-w-2xl mx-auto leading-relaxed hidden sm:block">
            Discover verified bus numbers, boarding stands, actual fares, and authentic stays that standard map engines overlook.
          </p>
        </div>

        {/* MAIN SMART SEARCH PANEL (Inspired by Reference UX) */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-2xl border border-stone-200 text-stone-900 space-y-3 sm:space-y-4">
          
          {/* Top Search Tabs */}
          <div className="flex flex-wrap items-center justify-between border-b border-stone-200 pb-2 sm:pb-3 gap-2">
            <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto scrollbar-none">
              <button
                type="button"
                onClick={() => setSearchTab('transit')}
                className={`px-3 sm:px-3.5 py-2 sm:py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 mobile-touch-target shrink-0 ${
                  searchTab === 'transit'
                    ? 'bg-[#1B4332] text-white shadow-xs'
                    : 'bg-[#FAF9F6] text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Bus className="w-3.5 h-3.5" />
                <span>Local Bus & Transit</span>
              </button>

              <button
                type="button"
                onClick={() => setSearchTab('city')}
                className={`px-3 sm:px-3.5 py-2 sm:py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 mobile-touch-target shrink-0 ${
                  searchTab === 'city'
                    ? 'bg-[#1B4332] text-white shadow-xs'
                    : 'bg-[#FAF9F6] text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>City Exploration</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('planner')}
                className="hidden sm:flex px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-all items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>AI Trip Planner</span>
              </button>
            </div>

            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md hidden md:inline">
              ✓ 100% Real Community Data
            </span>
          </div>

          {/* Segmented Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-2 relative">
            
            {/* FROM Box */}
            <div className="md:col-span-3 bg-[#FAF9F6] p-3 rounded-2xl border border-stone-200 hover:border-[#1B4332] transition-colors relative">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 block">
                FROM (Starting Point / Stop)
              </label>
              <input
                type="text"
                value={fromQuery}
                onChange={(e) => setFromQuery(e.target.value)}
                placeholder="e.g. Gajuwaka"
                className="w-full bg-transparent font-black text-stone-900 text-base sm:text-lg focus:outline-none placeholder-stone-400 pt-0.5 min-h-[44px]"
              />
              <span className="text-[11px] text-stone-500 truncate block">Platform 2 / Bus Stand</span>
            </div>

            {/* Swap Button (Center) */}
            <div className="flex items-center justify-center -my-2 md:my-0 md:-mx-3 z-10">
              <button
                type="button"
                onClick={handleSwap}
                title="Swap Locations"
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-white border border-stone-300 shadow-md hover:border-[#1B4332] text-stone-600 hover:text-[#1B4332] flex items-center justify-center transition-all mobile-touch-target"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* TO Box */}
            <div className="md:col-span-3 bg-[#FAF9F6] p-3 rounded-2xl border border-stone-200 hover:border-[#1B4332] transition-colors">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 block">
                TO (Destination / Landmark)
              </label>
              <input
                type="text"
                value={toQuery}
                onChange={(e) => setToQuery(e.target.value)}
                placeholder="e.g. RK Beach"
                className="w-full bg-transparent font-black text-stone-900 text-base sm:text-lg focus:outline-none placeholder-stone-400 pt-0.5 min-h-[44px]"
              />
              <span className="text-[11px] text-stone-500 truncate block">Submarine Museum Stop</span>
            </div>

            {/* TRAVEL MODE Box */}
            <div className="md:col-span-2 bg-[#FAF9F6] p-3 rounded-2xl border border-stone-200">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 block">
                TRANSIT MODE
              </label>
              <select
                value={transitMode}
                onChange={(e) => setTransitMode(e.target.value)}
                className="w-full bg-transparent font-bold text-stone-900 text-xs sm:text-sm focus:outline-none pt-1 min-h-[44px]"
              >
                <option value="Local Bus (Direct)">Direct Local Bus</option>
                <option value="Shared Auto">Shared Auto</option>
                <option value="Metro Line">Metro Transit</option>
                <option value="Multimodal Bus + Auto">Bus + Last Mile Auto</option>
                <option value="Any Transit">Any Local Mode</option>
              </select>
              <span className="text-[10px] text-stone-500 block pt-0.5">Verified Ticket Fares</span>
            </div>

            {/* TRAVELLERS / BUDGET Box */}
            <div className="md:col-span-2 bg-[#FAF9F6] p-3 rounded-2xl border border-stone-200">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 block">
                TRAVELLERS
              </label>
              <select
                value={travellers}
                onChange={(e) => setTravellers(e.target.value)}
                className="w-full bg-transparent font-bold text-stone-900 text-xs sm:text-sm focus:outline-none pt-1 min-h-[44px]"
              >
                <option value="1-2 Travellers • Budget">1–2 Travellers • Budget</option>
                <option value="Solo Backpacker">Solo Backpacker</option>
                <option value="Family • Comfortable">Family • Comfortable</option>
                <option value="Friends Group">Friends Group</option>
              </select>
              <span className="text-[10px] text-stone-500 block pt-0.5">Community Fair Fare</span>
            </div>

            {/* SEARCH Primary CTA Button */}
            <div className="md:col-span-2 flex items-center">
              <button
                type="button"
                onClick={() => handleSearch()}
                className="w-full h-full min-h-[48px] sm:min-h-[54px] bg-[#1B4332] hover:bg-[#265e46] active:scale-[0.99] text-white rounded-2xl font-black text-sm shadow-md transition-all flex items-center justify-center space-x-2 px-4 mobile-touch-target"
              >
                <Search className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="tracking-wide uppercase">Search</span>
              </button>
            </div>

          </div>

          {/* Quick Route Suggestions Pills */}
          <div className="pt-2 border-t border-stone-100 flex items-center gap-2 text-xs overflow-x-auto scrollbar-none snap-scroll-x pb-1">
            <span className="text-[11px] font-bold text-stone-500 flex items-center mr-1 shrink-0">
              <Navigation className="w-3 h-3 text-[#1B4332] mr-1" />
              <span className="hidden sm:inline">Popular Verified Routes:</span>
              <span className="sm:hidden">Popular:</span>
            </span>
            {popularRoutes.map((r, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectRoutePill(r.from, r.to)}
                className="bg-[#FAF9F6] hover:bg-emerald-50 text-stone-700 hover:text-[#1B4332] px-2.5 py-1.5 sm:py-1 rounded-lg text-[11px] font-semibold border border-stone-200 transition-colors shadow-2xs shrink-0 whitespace-nowrap"
              >
                {r.label}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
