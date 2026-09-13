import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  AlertTriangle, 
  Star, 
  MapPin, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  HelpCircle, 
  Share2, 
  Sparkles, 
  Lightbulb 
} from 'lucide-react';
import { useLocalKnowledge } from '../../context/LocalKnowledgeContext';
import { composeRouteIntelligence } from '../../utils/routeComposer';
import { RouteIntelligenceCard } from './RouteIntelligenceCard';
import { SourceBadge } from '../common/SourceBadge';
import { OutdatedReportModal } from './OutdatedReportModal';

interface LocalKnowledgeExplorerProps {
  initialSearchQuery?: string;
  onNavigateToShare?: () => void;
}

export const LocalKnowledgeExplorer: React.FC<LocalKnowledgeExplorerProps> = ({
  initialSearchQuery = '',
  onNavigateToShare
}) => {
  const { items, rateItem, submitOutdatedReport } = useLocalKnowledge();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Rating input state per item
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});
  const [ratedFeedbackMessage, setRatedFeedbackMessage] = useState<Record<string, string>>({});
  const [activeOutdatedItem, setActiveOutdatedItem] = useState<{ id: string; title: string } | null>(null);

  const categories: { label: string; value: string }[] = [
    { label: 'All Knowledge', value: 'ALL' },
    { label: '🚌 Transport', value: 'Transport' },
    { label: '🏨 Stays', value: 'Stay' },
    { label: '🍴 Food', value: 'Food' },
    { label: '📍 Destinations', value: 'Destination' },
    { label: '💡 Secret Hacks', value: 'Tip' }
  ];

  const statuses: { label: string; value: string; badge: string }[] = [
    { label: 'All Statuses', value: 'ALL', badge: 'bg-stone-100 text-stone-700' },
    { label: 'Verified', value: 'VERIFIED', badge: 'bg-emerald-100 text-emerald-900 border border-emerald-300' },
    { label: 'Pending Review', value: 'PENDING', badge: 'bg-amber-100 text-amber-900 border border-amber-300' },
    { label: 'Outdated / Re-check', value: 'OUTDATED', badge: 'bg-rose-100 text-rose-900 border border-rose-300' }
  ];

  // Helper to parse origin & destination from search string
  const getParsedSearchRoute = () => {
    if (!searchQuery.trim()) return null;
    const clean = searchQuery.trim();
    if (clean.includes('→')) {
      const parts = clean.split('→');
      return { origin: parts[0].trim(), dest: parts[1].trim() };
    }
    if (clean.includes('->')) {
      const parts = clean.split('->');
      return { origin: parts[0].trim(), dest: parts[1].trim() };
    }
    if (clean.toLowerCase().includes(' to ')) {
      const parts = clean.toLowerCase().split(' to ');
      return { origin: parts[0].trim(), dest: parts[1].trim() };
    }
    if (clean.toLowerCase().includes('vignan')) {
      return { origin: 'Gajuwaka', dest: 'Vignan College' };
    }
    if (clean.toLowerCase().includes('rk beach') || clean.toLowerCase().includes('gajuwaka')) {
      return { origin: 'Gajuwaka', dest: 'RK Beach' };
    }
    return null;
  };

  const parsedRoute = getParsedSearchRoute();
  const routeIntelligenceResult = parsedRoute 
    ? composeRouteIntelligence(parsedRoute.origin, parsedRoute.dest, items)
    : null;

  // Filter items across all entities (Destination, Transport, Stay, Food)
  const filteredItems = items.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.from.toLowerCase().includes(q) ||
      item.to.toLowerCase().includes(q) ||
      (item.propertyName && item.propertyName.toLowerCase().includes(q)) ||
      (item.restaurantName && item.restaurantName.toLowerCase().includes(q)) ||
      (item.popularDish && item.popularDish.toLowerCase().includes(q)) ||
      (item.cuisine && item.cuisine.toLowerCase().includes(q)) ||
      (item.busNumber && item.busNumber.toLowerCase().includes(q)) ||
      (item.boardingPoint && item.boardingPoint.toLowerCase().includes(q)) ||
      (item.additionalInfo && item.additionalInfo.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory === 'ALL' ||
      item.category === selectedCategory ||
      (selectedCategory === 'Transport' && (item.category === 'Bus' || item.category === 'Auto')) ||
      (selectedCategory === 'Destination' && (item.category === 'Experience' || item.category === 'Tip'));

    const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Banner explaining Data Integrity */}
      <div className="bg-stone-900 text-stone-100 p-6 rounded-2xl border border-stone-800 shadow-md space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-500/20 text-emerald-300 font-extrabold text-xs px-2.5 py-1 rounded border border-emerald-500/40 uppercase tracking-wider">
              DATA INTEGRITY SYSTEM
            </span>
            <h2 className="text-xl font-extrabold text-white">Explore Verified Local Knowledge</h2>
          </div>
          {onNavigateToShare && (
            <button
              onClick={onNavigateToShare}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center space-x-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share What You Know</span>
            </button>
          )}
        </div>

        <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
          <strong className="text-emerald-400">Strict Verification Rule:</strong> LOCAL never invents fares or bus numbers. Unverified user reports remain marked as <span className="bg-amber-900/60 text-amber-200 px-1.5 py-0.5 rounded text-xs font-semibold">PENDING</span> until reviewed by platform auditors. Single verified user reports construct practical routes with full attribution.
        </p>

        {/* Quick Route Shortcut Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-stone-400 font-medium">Try Route Intelligence:</span>
          <button
            onClick={() => setSearchQuery('Gajuwaka → VIIT')}
            className="bg-[#1B4332] hover:bg-[#2D6A4F] text-emerald-200 px-3 py-1 rounded-md transition-colors border border-emerald-700 font-bold flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Gajuwaka → VIIT (No Direct Bus)</span>
          </button>
          <button
            onClick={() => setSearchQuery('Gajuwaka → Vignan College')}
            className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-2.5 py-1 rounded-md transition-colors border border-stone-700 font-medium"
          >
            Gajuwaka → Vignan College
          </button>
          <button
            onClick={() => setSearchQuery('Gajuwaka → RK Beach')}
            className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-2.5 py-1 rounded-md transition-colors border border-stone-700"
          >
            Gajuwaka → RK Beach (Direct Bus 99)
          </button>
          <button
            onClick={() => setSearchQuery('Tirupati → Kapila Theertham')}
            className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-2.5 py-1 rounded-md transition-colors border border-stone-700"
          >
            Tirupati → Kapila Theertham (Multimodal)
          </button>
          <button
            onClick={() => setSearchQuery('Secunderabad → Salar Jung Museum')}
            className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-2.5 py-1 rounded-md transition-colors border border-stone-700"
          >
            Secunderabad → Salar Jung Museum (Bus + Walk)
          </button>
        </div>
      </div>

      {/* Controls Bar: Search & Category & Status Filters */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search origin → destination (e.g., Gajuwaka → Vignan College, Bus 99)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 custom-scrollbar">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setSelectedCategory(c.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === c.value
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* DYNAMIC LOCAL ROUTE INTELLIGENCE CARD RESULT */}
      {routeIntelligenceResult && (
        <RouteIntelligenceCard
          routeResult={routeIntelligenceResult}
          onNavigateToShare={onNavigateToShare}
        />
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-extrabold text-[#1C1917]">
          Community Knowledge Submissions ({filteredItems.length})
        </h3>
        <span className="text-xs text-stone-500">
          Showing {selectedStatus === 'ALL' ? 'Verified, Pending & Outdated' : selectedStatus} entries
        </span>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && !routeIntelligenceResult && (
        <div className="bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl p-12 text-center space-y-4">
          <HelpCircle className="w-12 h-12 text-stone-400 mx-auto" />
          <div className="space-y-1">
            <h4 className="font-bold text-stone-800 text-base">No verified local transport information is currently available for this route.</h4>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              No reported information matches your search query or filters. Be the first local to share details about this route!
            </p>
          </div>
          {onNavigateToShare && (
            <button
              onClick={onNavigateToShare}
              className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors inline-flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Knowledge For This Route</span>
            </button>
          )}
        </div>
      )}

      {/* Knowledge Item Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border transition-all shadow-xs flex flex-col justify-between overflow-hidden relative ${
              item.status === 'VERIFIED'
                ? 'border-emerald-200 hover:border-emerald-400 hover:shadow-md'
                : item.status === 'PENDING'
                ? 'border-amber-300 bg-amber-50/20'
                : 'border-rose-300 bg-rose-50/20'
            }`}
          >
            {/* Top Status Header with Standardized SourceBadge */}
            <div className="px-5 py-2.5 flex items-center justify-between border-b border-stone-100 bg-[#FAF9F6]">
              <div className="flex items-center space-x-2">
                <SourceBadge 
                  provenance={item.provenance}
                  sourceType={item.sourceType || 'COMMUNITY'}
                  verificationStatus={item.status}
                  hasEvidence={Boolean(item.evidence && item.evidence.length > 0)}
                  size="sm"
                />
              </div>

              <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                {item.category}
              </span>
            </div>

            {/* Main Content Body */}
            <div className="p-5 space-y-4 flex-1">
              
              {/* Entity Heading */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[#1B4332]" />
                  <span>
                    {item.propertyName ? 'Stay Property' : item.restaurantName ? 'Food & Restaurant' : item.category === 'Destination' ? 'Destination Experience' : 'Transit Corridor'}
                  </span>
                </div>
                <h4 className="text-xl font-extrabold text-[#1C1917]">
                  {item.propertyName ? (
                    <span>🏨 {item.propertyName} <span className="text-stone-400 font-normal text-sm">({item.from})</span></span>
                  ) : item.restaurantName ? (
                    <span>🍴 {item.restaurantName} <span className="text-stone-400 font-normal text-sm">({item.cuisine || item.from})</span></span>
                  ) : (
                    <span>{item.from} <span className="text-emerald-700 mx-1">→</span> {item.to}</span>
                  )}
                </h4>
              </div>

              {/* Data Grid: Bus, Fare, Boarding Point / Amenities / Dish */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                {(item.busNumber || item.stayType || item.cuisine) && (
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      {item.stayType ? 'Stay Type' : item.cuisine ? 'Cuisine' : 'Transit Service'}
                    </span>
                    <span className="font-extrabold text-stone-900 text-sm flex items-center">
                      {item.stayType || item.cuisine || (item.busNumber ? `Bus ${item.busNumber}` : 'Local Transit')}
                    </span>
                  </div>
                )}

                {item.fare && (
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      {item.status === 'VERIFIED' ? 'Verified Tariff' : 'Reported Rate'}
                    </span>
                    <span className="font-extrabold text-emerald-800 text-sm flex items-center">
                      <DollarSign className="w-4 h-4 text-emerald-600 mr-0.5" />
                      {item.fare}
                    </span>
                  </div>
                )}

                {(item.autoFare || item.popularDish) && (
                  <div className="space-y-0.5 col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      {item.popularDish ? 'Must-Try Dish' : 'Auto Fare'}
                    </span>
                    <span className="font-semibold text-stone-800">
                      {item.popularDish || item.autoFare}
                    </span>
                  </div>
                )}

                {(item.boardingPoint || item.amenities) && (
                  <div className="space-y-0.5 col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      {item.amenities ? 'Audited Amenities' : 'Where to board'}
                    </span>
                    <span className="font-semibold text-stone-800 truncate flex items-center" title={item.amenities || item.boardingPoint}>
                      <MapPin className="w-3.5 h-3.5 text-stone-500 mr-1 shrink-0" />
                      {item.amenities || item.boardingPoint}
                    </span>
                  </div>
                )}
              </div>

                <div className="text-xs text-stone-700 leading-relaxed bg-amber-50/50 p-3 rounded-lg border border-amber-200/60">
                  <strong className="text-amber-900 flex items-center mb-0.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 mr-1 inline shrink-0" />
                    Local Tip / Advice:
                  </strong>
                  {item.additionalInfo}
                </div>

              {/* Data Integrity Notice for Pending Items */}
              {item.status === 'PENDING' && (
                <div className="bg-amber-100/70 border border-amber-300 p-3 rounded-xl text-xs text-amber-950 space-y-1">
                  <div className="font-bold flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-amber-800" />
                    Unverified Community Submission
                  </div>
                  <p className="text-[11px] leading-snug">
                    This fare and bus number were recently submitted by a local user. The {item.fare || 'reported fare'} is not shown as an official verified fact until reviewed by our verification team.
                  </p>
                </div>
              )}

              {/* Metadata Footer: Contributor & Verification Date */}
              <div className="text-[11px] text-stone-500 space-y-1 pt-1 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Users className="w-3.5 h-3.5 mr-1 text-stone-400" />
                    Reported by: <strong className="text-stone-700 ml-1">{item.reportedBy}</strong>
                  </span>
                  <span>Submitted: {item.submittedAt}</span>
                </div>

                {item.status === 'VERIFIED' && item.verifiedAt && (
                  <div className="flex items-center justify-between text-emerald-800 font-medium">
                    <span><CheckCircle2 className="w-3.5 h-3.5 mr-1 inline text-emerald-700" /> Last verified: <strong>{item.verifiedAt}</strong></span>
                    <span>{item.verifiedBy}</span>
                  </div>
                )}

                {item.status === 'OUTDATED' && (
                  <div className="text-rose-700 font-semibold flex items-center">
                    <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                    Reported as outdated by {item.outdatedReportsCount} travelers. Re-verification in progress.
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Actions Bar: Community Rating & Report Outdated */}
            <div className="bg-stone-50 px-5 py-3 border-t border-stone-200 space-y-2">
              
              {/* Rating summary & rate action */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                
                {/* Community Rating Score */}
                <div className="flex items-center space-x-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span className="font-extrabold text-stone-900 text-sm">
                    {item.communityRating > 0 ? item.communityRating : 'New'}
                  </span>
                  <span className="text-stone-500 text-[11px]">
                    ({item.ratingCount} {item.ratingCount === 1 ? 'rating' : 'ratings'})
                  </span>
                </div>

                {/* Rating Input Buttons */}
                <div className="flex items-center space-x-1">
                  <span className="text-[11px] text-stone-500 font-medium mr-1">Rate accuracy:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => {
                        setUserRatings((prev) => ({ ...prev, [item.id]: star }));
                        rateItem(item.id, star);
                        setRatedFeedbackMessage((prev) => ({
                          ...prev,
                          [item.id]: `Rated ${star}★!`
                        }));
                        setTimeout(() => {
                          setRatedFeedbackMessage((prev) => ({ ...prev, [item.id]: '' }));
                        }, 3000);
                      }}
                      className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-all ${
                        userRatings[item.id] === star
                          ? 'bg-amber-400 text-stone-900 scale-110 shadow-xs'
                          : 'bg-white text-stone-700 hover:bg-amber-100 border border-stone-200'
                      }`}
                      title={`Rate ${star} star`}
                    >
                      {star}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Alert Toast */}
              {ratedFeedbackMessage[item.id] && (
                <div className="text-[11px] text-emerald-800 font-bold bg-emerald-100 p-1.5 rounded text-center animate-fade-in">
                  {ratedFeedbackMessage[item.id]}
                </div>
              )}

              {/* Outdated Reporting Action */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setActiveOutdatedItem({ id: item.id, title: `${item.from} → ${item.to}` })}
                  disabled={item.status === 'OUTDATED'}
                  className={`text-[11px] font-semibold flex items-center space-x-1 transition-colors cursor-pointer ${
                    item.status === 'OUTDATED'
                      ? 'text-stone-400 cursor-not-allowed'
                      : 'text-red-700 hover:text-red-900 hover:underline'
                  }`}
                >
                  <AlertTriangle className="w-3 h-3" />
                  <span>
                    {item.status === 'OUTDATED'
                      ? 'Re-verification Requested'
                      : 'Report Outdated Information'}
                  </span>
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Outdated Report Modal */}
      {activeOutdatedItem && (
        <OutdatedReportModal
          targetId={activeOutdatedItem.id}
          targetTitle={activeOutdatedItem.title}
          isOpen={Boolean(activeOutdatedItem)}
          onClose={() => setActiveOutdatedItem(null)}
          onSubmitReport={(report) => {
            submitOutdatedReport({
              targetId: report.targetId,
              targetTitle: report.targetTitle,
              reasonCategory: report.reasonCategory,
              notes: report.notes
            });
          }}
        />
      )}

    </div>
  );
};
