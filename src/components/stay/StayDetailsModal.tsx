import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Wifi, 
  Car, 
  Clock, 
  AlertTriangle, 
  Share2, 
  Phone, 
  Calendar,
  Sparkles,
  ShieldCheck,
  Info
} from 'lucide-react';
import type { Accommodation } from '../../types/travel';
import { SourceBadge } from '../common/SourceBadge';
import { OutdatedReportModal } from '../knowledge/OutdatedReportModal';
import { useLocalKnowledge } from '../../context/LocalKnowledgeContext';

interface StayDetailsModalProps {
  stay: Accommodation | null;
  isOpen: boolean;
  onClose: () => void;
  onShareKnowledgeForStay?: (stayName: string) => void;
}

export const StayDetailsModal: React.FC<StayDetailsModalProps> = ({
  stay,
  isOpen,
  onClose,
  onShareKnowledgeForStay
}) => {
  const { submitOutdatedReport } = useLocalKnowledge();
  const [showOutdatedModal, setShowOutdatedModal] = useState(false);

  if (!isOpen || !stay) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div 
          className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6 text-stone-900 relative flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Banner */}
          <div className="relative h-52 sm:h-64 bg-stone-900 shrink-0 overflow-hidden">
            <img 
              src={stay.photos[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600'} 
              alt={stay.name}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer backdrop-blur-xs"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-5 right-5 space-y-2 text-white">
              <div className="flex items-center space-x-2">
                <span className="bg-[#1B4332] text-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-700">
                  {stay.type}
                </span>
                <SourceBadge
                  provenance={stay.provenance}
                  sourceType={stay.provenance?.source_type || 'LOCAL_LENS'}
                  verificationStatus={stay.provenance?.verification_status || 'VERIFIED'}
                  hasEvidence={stay.provenance?.evidence_available ?? true}
                  size="sm"
                />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {stay.name}
              </h2>

              <p className="text-xs text-stone-300 flex items-center">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0" />
                <span>{stay.address}</span>
              </p>
            </div>
          </div>

          {/* Modal Scrollable Content */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1 text-xs">
            
            {/* Price & Provenance Bar */}
            <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-stone-400 font-extrabold uppercase text-[10px] block">Verified Tariff</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-800">
                    {stay.priceRange || `₹${stay.pricePerNight} / night`}
                  </span>
                  <span className="text-stone-500 font-medium">(verified no hidden tax)</span>
                </div>
              </div>

              {stay.provenance?.verified_at && (
                <div className="text-right">
                  <span className="text-stone-400 font-bold uppercase text-[10px] block">Last Audited</span>
                  <span className="font-bold text-stone-800 flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-emerald-700" />
                    {stay.provenance.verified_at}
                  </span>
                </div>
              )}
            </div>

            {/* Hygiene & Cleanliness Score */}
            <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-2xl space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-emerald-950 flex items-center text-xs">
                  <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-700" />
                  Cleanliness & Safety Audit
                </h4>
                <span className="text-[10px] bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded font-extrabold">
                  {stay.cleanlinessScore}
                </span>
              </div>
              <p className="text-stone-700 leading-relaxed">{stay.bathroomInfo}</p>
              <div className="text-[11px] text-emerald-900 font-semibold pt-1">
                {stay.safetyTag}
              </div>
            </div>

            {/* Amenities Grid with Individual Badges */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <h3 className="font-black text-stone-900 text-sm uppercase tracking-wider">
                  Verified Amenities & Facility Checks
                </h3>
                <span className="text-stone-400 text-[10px] font-bold">Audited on-ground</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
                  <div className="flex items-center space-x-2 text-stone-900 font-bold">
                    <Wifi className="w-4 h-4 text-[#1B4332]" />
                    <span>Wi-Fi Connection</span>
                  </div>
                  <div className="text-stone-600 pl-6">{stay.wifiSpeed}</div>
                </div>

                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
                  <div className="flex items-center space-x-2 text-stone-900 font-bold">
                    <Car className="w-4 h-4 text-[#1B4332]" />
                    <span>Parking Policy</span>
                  </div>
                  <div className="text-stone-600 pl-6">{stay.parkingRules}</div>
                </div>

                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
                  <div className="flex items-center space-x-2 text-stone-900 font-bold">
                    <Clock className="w-4 h-4 text-[#1B4332]" />
                    <span>Check-in / Check-out</span>
                  </div>
                  <div className="text-stone-600 pl-6">{stay.checkInOut}</div>
                </div>

                {stay.contactNumber && (
                  <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
                    <div className="flex items-center space-x-2 text-stone-900 font-bold">
                      <Phone className="w-4 h-4 text-[#1B4332]" />
                      <span>Verified Contact</span>
                    </div>
                    <div className="text-stone-600 pl-6">{stay.contactNumber}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Room Types if available */}
            {stay.roomTypes && stay.roomTypes.length > 0 && (
              <div className="space-y-2">
                <span className="text-stone-400 font-extrabold uppercase text-[10px] block">
                  Available Room Types
                </span>
                <div className="flex flex-wrap gap-2">
                  {stay.roomTypes.map((rt, i) => (
                    <span key={i} className="bg-stone-100 border border-stone-300 text-stone-800 px-3 py-1 rounded-lg font-bold">
                      {rt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Local Community Tips */}
            {stay.recentObservations && stay.recentObservations.length > 0 && (
              <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-purple-950 flex items-center text-xs">
                    <Sparkles className="w-4 h-4 mr-1.5 text-purple-700" />
                    Local Traveler Tips & Room Hacks
                  </h4>
                  <span className="text-[10px] bg-purple-200/70 text-purple-950 px-2 py-0.5 rounded font-bold">
                    Community Advice
                  </span>
                </div>

                <ul className="space-y-1.5 text-stone-700 list-disc list-inside">
                  {stay.recentObservations.map((obs, i) => (
                    <li key={i} className="leading-relaxed">{obs}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* External Reference Disclaimer if Google Maps */}
            {stay.provenance?.source_type === 'GOOGLE_MAPS' && (
              <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-xl text-sky-950 flex items-start space-x-2">
                <Info className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>External Reference:</strong> Basic location and amenities are referenced from Google Maps Platform. Physical hygiene score and hidden surcharge checks await Local Scout inspection.
                </p>
              </div>
            )}

          </div>

          {/* Modal Action Bar */}
          <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <button
              onClick={() => setShowOutdatedModal(true)}
              className="text-red-700 hover:text-red-900 text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Report Outdated</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  onClose();
                  if (onShareKnowledgeForStay) {
                    onShareKnowledgeForStay(stay.name);
                  }
                }}
                className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Share Local Stay Information</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Outdated Report Modal */}
      {showOutdatedModal && (
        <OutdatedReportModal
          targetId={stay.id}
          targetTitle={`${stay.name} (${stay.address})`}
          isOpen={showOutdatedModal}
          onClose={() => setShowOutdatedModal(false)}
          onSubmitReport={(rep) => {
            submitOutdatedReport({
              targetId: rep.targetId,
              targetTitle: rep.targetTitle,
              reportedBy: 'Traveler',
              reasonCategory: rep.reasonCategory,
              notes: rep.notes
            });
            setShowOutdatedModal(false);
          }}
        />
      )}
    </>
  );
};
