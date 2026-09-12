import React, { useState } from 'react';
import { 
  Hotel, 
  Wifi, 
  Car, 
  Clock, 
<<<<<<< HEAD
  CheckCircle2, 
  MapPin, 
  Share2, 
  AlertTriangle, 
  ChevronRight
} from 'lucide-react';
import type { Accommodation } from '../../types/travel';
import { SourceBadge } from '../common/SourceBadge';
import { StayDetailsModal } from './StayDetailsModal';
import { OutdatedReportModal } from '../knowledge/OutdatedReportModal';
import { useLocalKnowledge } from '../../context/LocalKnowledgeContext';
=======
  CheckCircle2
} from 'lucide-react';
import type { Accommodation } from '../../types/travel';
import { TrustBadge } from '../common/TrustBadge';
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04

interface StayExplorerViewProps {
  stays: Accommodation[];
  onNavigate: (view: string) => void;
}

export const StayExplorerView: React.FC<StayExplorerViewProps> = ({ stays, onNavigate }) => {
<<<<<<< HEAD
  const { submitOutdatedReport } = useLocalKnowledge();
  const [selectedStay, setSelectedStay] = useState<Accommodation | null>(stays[0] || null);
  const [modalStay, setModalStay] = useState<Accommodation | null>(null);
  const [outdatedTargetStay, setOutdatedTargetStay] = useState<Accommodation | null>(null);
  const [maxPriceFilter, setMaxPriceFilter] = useState(3500);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const filteredStays = stays.filter((s) => {
    const matchesPrice = s.pricePerNight <= maxPriceFilter;
    const matchesCategory = categoryFilter === 'ALL' || s.type === categoryFilter;
    return matchesPrice && matchesCategory;
  });
=======
  const [selectedStay, setSelectedStay] = useState<Accommodation | null>(stays[0] || null);
  const [maxPriceFilter, setMaxPriceFilter] = useState(3000);

  const filteredStays = stays.filter((s) => s.pricePerNight <= maxPriceFilter);
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04

  return (
    <div className="space-y-10 pb-16">
      
      {/* Page Header */}
<<<<<<< HEAD
      <div className="bg-[#1C1917] text-white p-6 sm:p-8 rounded-3xl border border-stone-800 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-emerald-700">
            <Hotel className="w-3.5 h-3.5" />
            <span>Accommodation Intelligence</span>
          </div>

          <button
            onClick={() => onNavigate('share-knowledge')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5 shadow-xs cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Stay Info</span>
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Stay Confidently with Verified Accommodation Evidence
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Not an OTA booking aggregator. LocalLens catalogs physically audited bathroom hygiene, verified Wi-Fi speeds, actual parking rules, and community-reported cleanliness scores so you avoid unexpected surprises.
=======
      <div className="bg-[#1C1917] text-white p-8 rounded-2xl border border-stone-800 space-y-3">
        <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
          <Hotel className="w-3.5 h-3.5" />
          <span>Accommodation Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Stay Confidently with Genuine Customer Evidence
        </h1>
        <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
          Not a hotel booking site. We catalog actual bathroom conditions, Wi-Fi speed tests, parking charges, and community-reported cleanliness scores so you stay with total peace of mind.
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
        </p>
      </div>

      {/* Filter Bar */}
<<<<<<< HEAD
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-3">
            <span className="font-extrabold text-stone-900">Max Nightly Tariff:</span>
            <input
              type="range"
              min={500}
              max={5000}
              step={250}
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
              className="accent-[#1B4332] cursor-pointer"
            />
            <span className="font-black text-[#1B4332] text-sm">₹{maxPriceFilter}</span>
          </div>

          {/* Stay Type Filter */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-1 custom-scrollbar">
            {['ALL', 'Budget Hotel', 'Homestay', 'Dharamshala', 'Boutique Stay'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#1B4332] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat === 'ALL' ? 'All Types' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="text-stone-500 font-bold text-[11px]">
          Showing {filteredStays.length} verified stays
=======
      <div className="bg-white p-4 rounded-xl border border-[#E7E5E4] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-[#1C1917]">Max Price per Night:</span>
          <input
            type="range"
            min={500}
            max={5000}
            step={250}
            value={maxPriceFilter}
            onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
            className="accent-[#1B4332]"
          />
          <span className="font-bold text-[#1B4332] text-sm">₹{maxPriceFilter}</span>
        </div>

        <div className="text-stone-500 font-medium">
          Showing {filteredStays.length} verified accommodations
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
        </div>
      </div>

      {/* Stays Grid & Selected Details Modal/Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Stays List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredStays.map((stay) => (
              <div
                key={stay.id}
                onClick={() => setSelectedStay(stay)}
<<<<<<< HEAD
                className={`bg-white rounded-2xl border-2 overflow-hidden shadow-xs cursor-pointer transition-all flex flex-col justify-between ${
                  selectedStay?.id === stay.id
                    ? 'border-[#1B4332] ring-2 ring-[#1B4332]/20'
                    : 'border-stone-200 hover:border-stone-400'
=======
                className={`bg-white rounded-xl border-2 overflow-hidden shadow-xs cursor-pointer transition-all flex flex-col justify-between ${
                  selectedStay?.id === stay.id
                    ? 'border-[#1B4332] ring-2 ring-[#1B4332]/20'
                    : 'border-[#E7E5E4] hover:border-stone-400'
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
                }`}
              >
                <div className="relative h-48 bg-stone-200">
                  <img src={stay.photos[0]} alt={stay.name} className="w-full h-full object-cover" />
<<<<<<< HEAD
                  <div className="absolute top-3 left-3 bg-[#1C1917]/85 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold">
                    {stay.type}
                  </div>
                  
                  {/* Standardized SourceBadge in top-right */}
                  <div className="absolute top-3 right-3">
                    <SourceBadge
                      provenance={stay.provenance}
                      sourceType={stay.provenance?.source_type || 'LOCAL_LENS'}
                      verificationStatus={stay.provenance?.verification_status || 'VERIFIED'}
                      hasEvidence={stay.provenance?.evidence_available ?? true}
                      size="sm"
                    />
                  </div>

                  <div className="absolute bottom-3 left-3 bg-[#1B4332] text-white px-2.5 py-1 rounded-lg text-xs font-black shadow-xs">
                    {stay.priceRange || `₹${stay.pricePerNight} / night`}
=======
                  <div className="absolute top-3 left-3 bg-[#1C1917]/80 text-white px-2.5 py-1 rounded text-[10px] font-bold">
                    {stay.type}
                  </div>
                  {stay.isPartner && (
                    <div className="absolute top-3 right-3 bg-emerald-700 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                      Partner Visibility
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-[#1B4332] text-white px-2.5 py-1 rounded text-xs font-bold shadow-xs">
                    ₹{stay.pricePerNight} / night
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
<<<<<<< HEAD
                    <h3 className="font-extrabold text-stone-900 text-base">{stay.name}</h3>
                    <p className="text-xs text-stone-500 mt-0.5 line-clamp-1 flex items-center">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 mr-1 shrink-0" />
                      <span>{stay.address}</span>
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-stone-200 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-emerald-800">{stay.cleanlinessScore}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalStay(stay);
                        }}
                        className="text-[#1B4332] font-black text-xs hover:underline flex items-center"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </button>
                    </div>

                    <div className="bg-emerald-50 text-[#1B4332] p-2 rounded-xl text-[11px] font-medium border border-emerald-200 truncate">
=======
                    <h3 className="font-bold text-[#1C1917] text-base">{stay.name}</h3>
                    <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">{stay.address}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#E7E5E4] text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-800">{stay.cleanlinessScore}</span>
                      <TrustBadge level={stay.confidenceLevel} verifiedCount={stay.verifiedCount} showDetails={false} />
                    </div>

                    <div className="bg-emerald-50 text-[#1B4332] p-2 rounded text-[11px] font-medium border border-emerald-200">
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
                      {stay.safetyTag}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Column: Full Selected Stay Detail Panel */}
        <div>
          {selectedStay ? (
<<<<<<< HEAD
            <div className="bg-white p-6 rounded-3xl border border-stone-200 space-y-6 shadow-sm sticky top-24">
              <div className="border-b border-stone-100 pb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1B4332] uppercase tracking-wider">{selectedStay.type}</span>
                  <SourceBadge
                    provenance={selectedStay.provenance}
                    sourceType={selectedStay.provenance?.source_type || 'LOCAL_LENS'}
                    verificationStatus={selectedStay.provenance?.verification_status || 'VERIFIED'}
                    size="sm"
                  />
                </div>

                <h2 className="text-xl font-black text-stone-900">{selectedStay.name}</h2>
                <p className="text-xs text-stone-500">{selectedStay.address}</p>
                <div className="flex items-baseline space-x-2 pt-1">
                  <span className="text-2xl font-black text-[#1B4332]">
                    {selectedStay.priceRange || `₹${selectedStay.pricePerNight}`}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">/ night (verified tariff)</span>
=======
            <div className="bg-white p-6 rounded-xl border border-[#E7E5E4] space-y-6 shadow-xs sticky top-24">
              <div className="border-b border-[#E7E5E4] pb-4">
                <span className="text-xs font-bold text-[#1B4332] uppercase tracking-wide">{selectedStay.type}</span>
                <h2 className="text-xl font-bold text-[#1C1917] mt-0.5">{selectedStay.name}</h2>
                <p className="text-xs text-stone-500 mt-1">{selectedStay.address}</p>
                <div className="flex items-baseline space-x-2 mt-2">
                  <span className="text-2xl font-extrabold text-[#1B4332]">₹{selectedStay.pricePerNight}</span>
                  <span className="text-xs text-stone-500">per night (verified no hidden tax)</span>
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
                </div>
              </div>

              {/* Bathroom & Cleanliness Report */}
<<<<<<< HEAD
              <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
                <h4 className="font-bold text-stone-900 flex items-center">
=======
              <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E7E5E4] space-y-2 text-xs">
                <h4 className="font-bold text-[#1C1917] flex items-center">
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-[#1B4332]" />
                  Verified Bathroom Hygiene & Hot Water
                </h4>
                <p className="text-stone-700 leading-relaxed">{selectedStay.bathroomInfo}</p>
              </div>

              {/* Wi-Fi & Parking Audit */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center space-x-2 text-stone-700">
                  <Wifi className="w-4 h-4 text-[#1B4332]" />
                  <div><strong>Wi-Fi Speed:</strong> {selectedStay.wifiSpeed}</div>
                </div>
                <div className="flex items-center space-x-2 text-stone-700">
                  <Car className="w-4 h-4 text-[#1B4332]" />
                  <div><strong>Parking Rules:</strong> {selectedStay.parkingRules}</div>
                </div>
                <div className="flex items-center space-x-2 text-stone-700">
                  <Clock className="w-4 h-4 text-[#1B4332]" />
                  <div><strong>Check-in/Out:</strong> {selectedStay.checkInOut}</div>
                </div>
              </div>

              {/* Verified Observations */}
<<<<<<< HEAD
              <div className="space-y-2 text-xs border-t border-stone-100 pt-4">
                <h4 className="font-bold text-stone-900">Recent Traveller Observations</h4>
=======
              <div className="space-y-2 text-xs border-t border-[#E7E5E4] pt-4">
                <h4 className="font-bold text-[#1C1917]">Recent Traveller Observations</h4>
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
                <ul className="space-y-1.5 text-stone-600 list-disc list-inside">
                  {selectedStay.recentObservations.map((obs, i) => (
                    <li key={i}>{obs}</li>
                  ))}
                </ul>
              </div>

<<<<<<< HEAD
              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setModalStay(selectedStay)}
                  className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  View Full Stay Details & Provenance →
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={() => setOutdatedTargetStay(selectedStay)}
                    className="text-red-700 hover:text-red-900 font-bold flex items-center space-x-1 cursor-pointer"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Report Outdated</span>
                  </button>

                  <button
                    onClick={() => onNavigate('share-knowledge')}
                    className="text-stone-600 hover:text-stone-900 font-bold flex items-center space-x-1 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Add Tip</span>
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-[#FAF9F6] p-8 text-center rounded-3xl border border-stone-200 text-xs text-stone-500">
=======
              <button
                onClick={() => onNavigate('video')}
                className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white py-2.5 rounded-lg text-xs font-bold transition-colors"
              >
                Watch Video Room Proof →
              </button>
            </div>
          ) : (
            <div className="bg-[#FAF9F6] p-8 text-center rounded-xl border border-[#E7E5E4] text-xs text-stone-500">
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
              Select an accommodation to inspect verified evidence.
            </div>
          )}
        </div>

      </div>

<<<<<<< HEAD
      {/* Stay Details Modal */}
      {modalStay && (
        <StayDetailsModal
          stay={modalStay}
          isOpen={Boolean(modalStay)}
          onClose={() => setModalStay(null)}
          onShareKnowledgeForStay={() => onNavigate('share-knowledge')}
        />
      )}

      {/* Outdated Report Modal */}
      {outdatedTargetStay && (
        <OutdatedReportModal
          targetId={outdatedTargetStay.id}
          targetTitle={outdatedTargetStay.name}
          isOpen={Boolean(outdatedTargetStay)}
          onClose={() => setOutdatedTargetStay(null)}
          onSubmitReport={(rep) => {
            submitOutdatedReport({
              targetId: rep.targetId,
              targetTitle: rep.targetTitle,
              reportedBy: 'Traveler',
              reasonCategory: rep.reasonCategory,
              notes: rep.notes
            });
            setOutdatedTargetStay(null);
          }}
        />
      )}

=======
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
    </div>
  );
};
