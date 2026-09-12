import React, { useState } from 'react';
import { 
  Utensils, 
  Sparkles, 
  Info, 
  Landmark, 
  Compass, 
  CheckCircle2,
  Search
} from 'lucide-react';
import type { Destination, Attraction } from '../../types/travel';
import type { MapMarker } from '../map/TravelMap';
import { TravelMap } from '../map/TravelMap';
import { SourceBadge } from '../common/SourceBadge';
import { PlaceDetailsModal } from './PlaceDetailsModal';

interface DestinationViewProps {
  destinations: Destination[];
  selectedDestId: string;
  onSelectDestination: (id: string) => void;
  onNavigate: (view: string) => void;
}

export const DestinationView: React.FC<DestinationViewProps> = ({
  destinations,
  selectedDestId,
  onSelectDestination,
  onNavigate
}) => {
  const currentDest = destinations.find((d) => d.id === selectedDestId) || destinations[0];
  const [activeTab, setActiveTab] = useState<'all' | 'attractions' | 'hidden'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCenter, setActiveCenter] = useState(currentDest.coordinates);
  const [selectedAttractionModal, setSelectedAttractionModal] = useState<Attraction | null>(null);

  const filteredAttractions = currentDest.attractions.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === 'all' || (activeTab === 'hidden' && a.isHiddenGem);
    return matchesSearch && matchesTab;
  });

  const mapMarkers: MapMarker[] = filteredAttractions.map((a) => ({
    id: a.id,
    title: a.name,
    category: a.category,
    type: 'attraction',
    coordinates: a.coordinates,
    description: a.description
  }));

  const handleSpotClick = (coords: { lat: number; lng: number }) => {
    setActiveCenter(coords);
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Destination Switcher Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#E7E5E4] pb-3 overflow-x-auto custom-scrollbar">
        <span className="text-xs font-semibold text-[#57534E] uppercase tracking-wider shrink-0 mr-2">Select Destination:</span>
        {destinations.map((d) => (
          <button
            key={d.id}
            onClick={() => {
              onSelectDestination(d.id);
              setActiveCenter(d.coordinates);
              setSearchQuery('');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              d.id === currentDest.id
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'bg-white text-[#57534E] border border-[#E7E5E4] hover:bg-stone-100'
            }`}
          >
            {d.name} ({d.state})
          </button>
        ))}
      </div>

      {/* Hero Editorial Banner */}
      <section className="relative rounded-2xl overflow-hidden bg-[#1C1917] text-white border border-stone-800 shadow-md">
        <div className="relative h-72 sm:h-96 w-full">
          <img 
            src={currentDest.heroImage} 
            alt={currentDest.name}
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 max-w-4xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
                {currentDest.state}
              </span>
              <span className="bg-stone-900/80 text-stone-200 px-3 py-1 rounded-md text-xs font-medium border border-stone-700">
                {currentDest.crowdStatus}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {currentDest.name}
            </h1>
            
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed max-w-2xl">
              {currentDest.tagline}
            </p>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="bg-[#1B4332] px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-white border-t border-emerald-800">
          <div>
            <div className="text-emerald-300 font-medium">Average Daily Budget</div>
            <div className="font-bold text-sm mt-0.5">{currentDest.avgDailyBudget}</div>
          </div>
          <div>
            <div className="text-emerald-300 font-medium">Best Visiting Season</div>
            <div className="font-bold text-sm mt-0.5">{currentDest.bestVisitingTime.split('(')[0]}</div>
          </div>
          <div>
            <div className="text-emerald-300 font-medium">Attractions Cataloged</div>
            <div className="font-bold text-sm mt-0.5">{currentDest.attractions.length} Verified Spots</div>
          </div>
          <div>
            <div className="text-emerald-300 font-medium">Local Specialties</div>
            <div className="font-bold text-sm mt-0.5 truncate">{currentDest.foodSpecialties[0]}</div>
          </div>
        </div>
      </section>

      {/* Main Split Layout: Editorial Content & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Editorial Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Overview & History */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E7E5E4] space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#1C1917] flex items-center">
                <Info className="w-5 h-5 mr-2 text-[#1B4332]" />
                Destination Overview
              </h2>
              <p className="text-stone-700 text-sm leading-relaxed mt-2">
                {currentDest.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E7E5E4] grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="bg-[#FAF9F6] p-4 rounded-lg border border-[#E7E5E4]">
                <h4 className="font-bold text-[#1C1917] flex items-center mb-1 text-sm">
                  <Landmark className="w-4 h-4 mr-1.5 text-[#1B4332]" />
                  Historical Heritage
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  {currentDest.history}
                </p>
              </div>

              <div className="bg-[#FAF9F6] p-4 rounded-lg border border-[#E7E5E4]">
                <h4 className="font-bold text-[#1C1917] flex items-center mb-1 text-sm">
                  <Sparkles className="w-4 h-4 mr-1.5 text-amber-600" />
                  Cultural Significance
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  {currentDest.culture}
                </p>
              </div>
            </div>
          </div>

          {/* Attractions & Search Filter Bar */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#1C1917]">
                Places in {currentDest.name} ({filteredAttractions.length})
              </h2>

              <div className="flex items-center space-x-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder={`Search place in ${currentDest.name.split(' ')[0]}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#E7E5E4] rounded-lg text-xs text-[#1C1917] focus:outline-none focus:border-[#1B4332]"
                  />
                </div>

                <div className="flex items-center space-x-1 text-xs shrink-0">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1.5 rounded-md font-medium ${
                      activeTab === 'all' ? 'bg-[#1B4332] text-white' : 'bg-[#FAF9F6] text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveTab('hidden')}
                    className={`px-3 py-1.5 rounded-md font-medium ${
                      activeTab === 'hidden' ? 'bg-amber-800 text-white' : 'bg-[#FAF9F6] text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Gems <Sparkles className="w-3.5 h-3.5 ml-1 inline text-amber-500" />
                  </button>
                </div>
              </div>
            </div>

            {filteredAttractions.length === 0 ? (
              <div className="bg-white p-8 rounded-xl border border-[#E7E5E4] text-center text-xs text-stone-500">
                No places matched "{searchQuery}" in {currentDest.name}. Try searching for "Beach", "Temple", "Museum", or "Hill".
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredAttractions.map((a) => (
                  <div 
                    key={a.id} 
                    onClick={() => {
                      handleSpotClick(a.coordinates);
                      setSelectedAttractionModal(a);
                    }}
                    className="bg-white rounded-xl border border-[#E7E5E4] overflow-hidden shadow-xs hover:border-[#1B4332] transition-all cursor-pointer space-y-3 p-4 flex flex-col justify-between group"
                  >
                    <div className="relative h-40 rounded-lg overflow-hidden bg-stone-100">
                      <img src={a.image} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      {a.isHiddenGem && (
                        <span className="absolute top-2 left-2 bg-amber-900 text-amber-100 px-2 py-0.5 rounded text-[10px] font-bold">
                          Hidden Gem
                        </span>
                      )}
                      <div className="absolute top-2 right-2">
                        <SourceBadge sourceType="GOOGLE_MAPS" verificationStatus="PENDING" size="sm" showPopover={false} />
                      </div>
                      <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-0.5 rounded text-[10px] font-semibold backdrop-blur-xs">
                        {a.category}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-[#1C1917] text-base group-hover:text-[#1B4332] transition-colors">
                          {a.name}
                        </h3>
                      </div>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2">{a.description}</p>
                    </div>

                    <div className="pt-2 border-t border-[#E7E5E4] flex items-center justify-between text-[11px] text-stone-600">
                      <div><span className="font-medium">Time:</span> {a.timeRequired}</div>
                      <span className="text-[#1B4332] font-semibold flex items-center group-hover:underline">
                        View Provenance & Tips →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Food Specialties Section */}
          <div className="bg-[#FAF9F6] p-6 rounded-xl border border-[#E7E5E4] space-y-4">
            <h3 className="font-bold text-[#1C1917] text-lg flex items-center">
              <Utensils className="w-5 h-5 mr-2 text-amber-700" />
              Must-Try Regional Food Specialties
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {currentDest.foodSpecialties.map((item, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-[#E7E5E4] font-medium text-[#1C1917] flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-[#1B4332] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => onNavigate('stays')}
              className="text-xs font-semibold text-[#1B4332] hover:underline pt-2 block"
            >
              Search verified restaurants & price reports in {currentDest.name} →
            </button>
          </div>

        </div>

        {/* Right 1 Column: Interactive Leaflet Map & Recent Observations */}
        <div className="space-y-6">
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[#1C1917] text-base flex items-center">
                <Compass className="w-4 h-4 mr-1.5 text-[#1B4332]" />
                Interactive Location Map
              </h3>
              <span className="text-[11px] text-stone-500 font-medium">Click card to focus</span>
            </div>
            <TravelMap
              center={activeCenter}
              zoom={12}
              markers={mapMarkers}
              height="420px"
            />
          </div>

          {/* Community Observations Panel */}
          <div className="bg-[#1C1917] text-white p-6 rounded-xl border border-stone-800 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400" />
              Recent Traveller Observations
            </h3>
            <div className="space-y-3 text-xs text-stone-300">
              {currentDest.communityObservations.map((obs, i) => (
                <div key={i} className="bg-stone-900 p-3 rounded-lg border border-stone-800 space-y-1">
                  <div className="text-[10px] text-emerald-400 font-semibold">Verified Observation #{i+1}</div>
                  <p className="leading-relaxed">"{obs}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="bg-emerald-900 text-white p-6 rounded-xl space-y-3 text-center">
            <h4 className="font-bold text-base">Plan a Trip to {currentDest.name}</h4>
            <p className="text-xs text-emerald-100">Get an exact itinerary with budget, daily travel cost, and rationale.</p>
            <button
              onClick={() => onNavigate('planner')}
              className="w-full bg-white text-[#1B4332] hover:bg-emerald-50 px-4 py-2.5 rounded-lg text-xs font-bold shadow-sm transition-colors"
            >
              Open Trip Planner →
            </button>
          </div>

        </div>

      </div>

      {/* Place Details Modal with Mandatory 5-Source Separation */}
      {selectedAttractionModal && (
        <PlaceDetailsModal
          attraction={selectedAttractionModal}
          destination={currentDest}
          isOpen={Boolean(selectedAttractionModal)}
          onClose={() => setSelectedAttractionModal(null)}
          onShareKnowledgeForPlace={(_placeName) => {
            onNavigate('share-knowledge');
          }}
          onNavigateToTransport={() => onNavigate('transport')}
        />
      )}

    </div>
  );
};
