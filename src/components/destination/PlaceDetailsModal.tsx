import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Users, 
  AlertTriangle, 
  FileCheck, 
  Navigation, 
  PlusCircle,
  ChevronRight
} from 'lucide-react';
import type { Destination, Attraction } from '../../types/travel';
import { SourceBadge } from '../common/SourceBadge';
import { OutdatedReportModal } from '../knowledge/OutdatedReportModal';
import type { DataProvenance } from '../../types/provenance';

interface PlaceDetailsModalProps {
  attraction: Attraction | null;
  destination: Destination;
  isOpen: boolean;
  onClose: () => void;
  onShareKnowledgeForPlace: (placeName: string) => void;
  onNavigateToTransport?: () => void;
}

export const PlaceDetailsModal: React.FC<PlaceDetailsModalProps> = ({
  attraction,
  destination,
  isOpen,
  onClose,
  onShareKnowledgeForPlace,
  onNavigateToTransport
}) => {
  const [activeOutdatedTarget, setActiveOutdatedTarget] = useState<string | null>(null);

  if (!isOpen || !attraction) return null;

  // Basic Google Place Provenance (External Reference)
  const googleProvenance: DataProvenance = {
    source_type: 'GOOGLE_MAPS',
    verification_status: 'PENDING',
    retrieved_at: new Date().toISOString(),
    last_updated_at: new Date().toISOString(),
    evidence_available: false,
    disclaimer: 'External reference retrieved from Google Maps Platform. Basic coordinates and location are reference data.'
  };

  // LocalLens Verified Facts (Proprietary ground-truth)
  const verifiedFacts = [
    {
      id: 'vf-1',
      title: 'Local Transit Access',
      content: `Direct bus service connects from ${destination.name} central stand. Last mile auto standard union fare is ₹30–₹45 per seat.`,
      boarding: 'Platform 2, RTC Central Bus Complex',
      provenance: {
        source_type: 'LOCAL_LENS' as const,
        verification_status: 'VERIFIED' as const,
        verified_by: 'LocalLens Verification Desk',
        verified_at: '2026-09-10',
        last_updated_at: '2026-09-10',
        evidence_available: true
      }
    },
    {
      id: 'vf-2',
      title: 'Verified Fair Timing & Entry Fee',
      content: `Official counter entry fee is ${attraction.entryFee}. No hidden guide charges mandatory. Best visiting time is ${attraction.bestTimeOfDay}.`,
      boarding: 'Main Entrance Ticket Counter',
      provenance: {
        source_type: 'LOCAL_LENS' as const,
        verification_status: 'VERIFIED' as const,
        verified_by: 'Local Scout @kiran_vizag',
        verified_at: '2026-09-08',
        last_updated_at: '2026-09-08',
        evidence_available: true
      }
    }
  ];

  // Community Contributions (Unverified or Community + Evidence)
  const communityTips = [
    {
      id: 'ct-1',
      title: 'Cheaper Shared Auto Stand Behind Complex',
      content: 'Instead of prepaid auto at the main gate, walk 100m past the coconut stall. Shared 7-seater autos charge only ₹20 to the main junction.',
      submittedBy: 'Traveler @sunil_hyd',
      submittedAt: '2026-09-07',
      hasEvidence: true,
      evidenceText: 'Attached meter receipt photo',
      provenance: {
        source_type: 'COMMUNITY' as const,
        verification_status: 'PENDING' as const,
        submitted_by: 'Traveler @sunil_hyd',
        submitted_at: '2026-09-07',
        last_updated_at: '2026-09-07',
        evidence_available: true
      }
    }
  ];

  // Information Under Review
  const underReviewTips = [
    {
      id: 'ur-1',
      title: 'Reported Cloakroom & Luggage Facility',
      content: 'New cloakroom launched near gate 2 charging ₹20 per bag. Desk is verifying locker security tokens.',
      submittedBy: 'Local Scout @priya_m',
      submittedAt: '2026-09-11',
      provenance: {
        source_type: 'COMMUNITY' as const,
        verification_status: 'UNDER_REVIEW' as const,
        submitted_by: 'Local Scout @priya_m',
        submitted_at: '2026-09-11',
        last_updated_at: '2026-09-11',
        evidence_available: false
      }
    }
  ];

  // Potentially Outdated
  const outdatedTips = [
    {
      id: 'od-1',
      title: 'Previous ₹10 Camera Photography Ticket',
      content: 'Mobile photography fee of ₹10 was reported eliminated by municipal order in August 2026. Awaiting re-audit from on-site inspector.',
      reportedAt: '2026-09-02',
      provenance: {
        source_type: 'COMMUNITY' as const,
        verification_status: 'OUTDATED' as const,
        outdated_at: '2026-09-02',
        last_updated_at: '2026-09-02',
        evidence_available: false
      }
    }
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 sm:flex sm:items-center sm:justify-center bg-black/60 backdrop-blur-xs sm:p-4 overflow-y-auto">
        <div 
          className="bg-white w-full sm:max-w-3xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden sm:my-8 max-h-[95vh] sm:max-h-[90vh] flex flex-col mt-auto sm:mt-0 mobile-bottom-sheet-content sm:!relative sm:!inset-auto sm:!max-h-[90vh] sm:!rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image & Summary */}
          <div className="relative h-44 sm:h-56 lg:h-64 w-full bg-stone-900 shrink-0">
            <div className="sm:hidden absolute top-2 left-1/2 -translate-x-1/2 z-10 w-10 h-1 bg-white/50 rounded-full" />
            <img 
              src={attraction.image} 
              alt={attraction.name}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/50 to-transparent" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors mobile-touch-target"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6 space-y-1 text-white">
              <div className="flex items-center space-x-2">
                <span className="bg-white/20 backdrop-blur-md text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {attraction.category}
                </span>
                <SourceBadge 
                  sourceType="GOOGLE_MAPS" 
                  verificationStatus="PENDING" 
                  size="sm" 
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">{attraction.name}</h2>
              <p className="text-xs text-stone-300 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                {destination.name}, {destination.state} • Coordinates ({attraction.coordinates.lat.toFixed(4)}, {attraction.coordinates.lng.toFixed(4)})
              </p>
            </div>
          </div>

          {/* Scrollable Content Body with MANDATORY Separation */}
          <div className="p-6 overflow-y-auto space-y-8 text-xs custom-scrollbar">
            
            {/* Quick Action Bar */}
            <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-extrabold text-stone-900 block text-sm">Know something about this place?</span>
                <span className="text-[11px] text-stone-500">Contribute bus routes, updated entry fees, or local advice.</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onShareKnowledgeForPlace(attraction.name);
                }}
                className="bg-[#1B4332] hover:bg-[#286048] text-white px-4 py-2 rounded-xl font-bold flex items-center space-x-1.5 shadow-xs transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Share Local Knowledge</span>
              </button>
            </div>

            {/* ========================================================================= */}
            {/* 1. BASIC PLACE INFORMATION (Google Maps External Reference) */}
            {/* ========================================================================= */}
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-black text-stone-900 text-sm uppercase tracking-wider">
                    1. Basic Place Information
                  </h3>
                  <SourceBadge 
                    provenance={googleProvenance} 
                    size="sm" 
                  />
                </div>
                <span className="text-[10px] text-stone-400">External Reference</span>
              </div>

              <div className="bg-sky-50/50 border border-sky-200 rounded-2xl p-4 space-y-2 text-stone-700">
                <p className="leading-relaxed">{attraction.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
                  <div>
                    <span className="text-stone-400 block font-semibold">Recommended Duration</span>
                    <span className="font-bold text-stone-900">{attraction.timeRequired}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-semibold">Published Timing</span>
                    <span className="font-bold text-stone-900">{attraction.bestTimeOfDay}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-semibold">Base Entry</span>
                    <span className="font-bold text-stone-900">{attraction.entryFee}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================================= */}
            {/* 2. LOCALLENS KNOWLEDGE (Verified Local Information) */}
            {/* ========================================================================= */}
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-black text-stone-900 text-sm uppercase tracking-wider">
                    2. LocalLens Knowledge
                  </h3>
                  <SourceBadge 
                    sourceType="LOCAL_LENS" 
                    verificationStatus="VERIFIED" 
                    size="sm" 
                  />
                </div>
                <span className="text-[10px] text-emerald-800 font-bold">Audited Ground Truth</span>
              </div>

              <div className="space-y-3">
                {verifiedFacts.map((fact) => (
                  <div key={fact.id} className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-emerald-950 text-sm flex items-center">
                        <ShieldCheck className="w-4 h-4 text-emerald-700 mr-1.5 shrink-0" />
                        {fact.title}
                      </h4>
                      <SourceBadge provenance={fact.provenance} size="sm" />
                    </div>
                    <p className="text-stone-800 leading-relaxed">{fact.content}</p>
                    <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-[11px] text-emerald-900">
                      <span>Boarding / Location: <strong>{fact.boarding}</strong></span>
                      <button
                        onClick={() => setActiveOutdatedTarget(fact.title)}
                        className="text-stone-500 hover:text-red-700 underline font-semibold transition-colors"
                      >
                        Report Outdated
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================================= */}
            {/* 3. COMMUNITY CONTRIBUTIONS (Community Submitted) */}
            {/* ========================================================================= */}
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-black text-stone-900 text-sm uppercase tracking-wider">
                    3. Community Contributions
                  </h3>
                  <span className="bg-purple-100 text-purple-900 font-bold text-[10px] px-2 py-0.5 rounded">
                    Community Wisdom
                  </span>
                </div>
                <span className="text-[10px] text-stone-400">Crowdsourced Intelligence</span>
              </div>

              <div className="space-y-3">
                {communityTips.map((tip) => (
                  <div key={tip.id} className="bg-purple-50/50 border border-purple-200 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-purple-950 text-sm flex items-center">
                        <Users className="w-4 h-4 text-purple-700 mr-1.5 shrink-0" />
                        {tip.title}
                      </h4>
                      <SourceBadge 
                        provenance={tip.provenance} 
                        hasEvidence={tip.hasEvidence} 
                        size="sm" 
                      />
                    </div>
                    <p className="text-stone-800 leading-relaxed">{tip.content}</p>
                    <div className="pt-2 border-t border-purple-100 flex items-center justify-between text-[11px] text-purple-900">
                      <span>Submitted by {tip.submittedBy} • {tip.submittedAt}</span>
                      {tip.evidenceText && (
                        <span className="font-bold text-amber-800 flex items-center">
                          <FileCheck className="w-3 h-3 mr-1" /> {tip.evidenceText}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================================= */}
            {/* 4. INFORMATION UNDER REVIEW */}
            {/* ========================================================================= */}
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-black text-stone-900 text-sm uppercase tracking-wider">
                    4. Information Under Review
                  </h3>
                  <SourceBadge 
                    verificationStatus="UNDER_REVIEW" 
                    size="sm" 
                  />
                </div>
                <span className="text-[10px] text-amber-800 font-bold">Verification Desk Checking</span>
              </div>

              <div className="space-y-2">
                {underReviewTips.map((tip) => (
                  <div key={tip.id} className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-amber-950 flex items-center">
                        <Clock className="w-3.5 h-3.5 text-amber-700 mr-1.5 shrink-0" />
                        {tip.title}
                      </h4>
                      <span className="text-[10px] text-amber-700 font-semibold">In Audit Queue</span>
                    </div>
                    <p className="text-stone-700 leading-relaxed">{tip.content}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================================= */}
            {/* 5. POTENTIALLY OUTDATED */}
            {/* ========================================================================= */}
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-black text-stone-900 text-sm uppercase tracking-wider">
                    5. Potentially Outdated
                  </h3>
                  <SourceBadge 
                    verificationStatus="OUTDATED" 
                    size="sm" 
                  />
                </div>
                <span className="text-[10px] text-red-700 font-bold">Flagged by Travelers</span>
              </div>

              <div className="space-y-2">
                {outdatedTips.map((tip) => (
                  <div key={tip.id} className="bg-red-50/50 border border-red-200 rounded-2xl p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-red-950 flex items-center">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600 mr-1.5 shrink-0" />
                        {tip.title}
                      </h4>
                      <span className="text-[10px] text-red-700 font-bold">Flagged {tip.reportedAt}</span>
                    </div>
                    <p className="text-stone-700 leading-relaxed">{tip.content}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Footer Navigation */}
          <div className="bg-stone-100 p-4 px-6 border-t border-stone-200 flex items-center justify-between text-xs shrink-0">
            {onNavigateToTransport && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToTransport();
                }}
                className="text-[#1B4332] font-extrabold flex items-center hover:underline"
              >
                <Navigation className="w-4 h-4 mr-1" />
                <span>Explore Verified Transit Routes to {attraction.name}</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-white border border-stone-300 hover:bg-stone-200 px-4 py-2 rounded-xl font-bold text-stone-800 transition-colors ml-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Outdated Report Modal */}
      {activeOutdatedTarget && (
        <OutdatedReportModal
          targetId={attraction.id}
          targetTitle={activeOutdatedTarget}
          isOpen={Boolean(activeOutdatedTarget)}
          onClose={() => setActiveOutdatedTarget(null)}
          onSubmitReport={(report) => {
            console.log('Outdated report submitted:', report);
          }}
        />
      )}
    </>
  );
};
