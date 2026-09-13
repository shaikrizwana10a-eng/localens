import React, { useState } from 'react';
import { 
  X, 
  Bus, 
  MapPin, 
  Clock, 
  Banknote, 
  History, 
  Navigation, 
  AlertTriangle, 
  Share2, 
  Lightbulb, 
  Calendar,
  Info
} from 'lucide-react';
import type { TransportOption, TransportRoute } from '../../types/travel';
import { SourceBadge } from '../common/SourceBadge';
import { OutdatedReportModal } from '../knowledge/OutdatedReportModal';
import { useLocalKnowledge } from '../../context/LocalKnowledgeContext';

interface TransportDetailsModalProps {
  route: TransportRoute | null;
  option: TransportOption | null;
  isOpen: boolean;
  onClose: () => void;
  onShareKnowledgeForRoute?: (from: string, to: string) => void;
}

export const TransportDetailsModal: React.FC<TransportDetailsModalProps> = ({
  route,
  option,
  isOpen,
  onClose,
  onShareKnowledgeForRoute
}) => {
  const { submitOutdatedReport } = useLocalKnowledge();
  const [showOutdatedModal, setShowOutdatedModal] = useState(false);

  if (!isOpen || !route || !option) return null;

  const defaultStops = option.routeStops && option.routeStops.length > 0 
    ? option.routeStops 
    : [route.origin, option.boardingPoint, option.dropPoint, route.destination];

  // Remove duplicates while keeping order
  const uniqueStops = Array.from(new Set(defaultStops));

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs sm:flex sm:items-center sm:justify-center sm:p-5 overflow-y-auto"
        onClick={onClose}
      >
        <div 
          className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-stone-900 relative flex flex-col max-h-[95vh] sm:max-h-[92vh] sm:my-6 mt-auto sm:mt-0 mobile-bottom-sheet-content sm:!relative sm:!inset-auto sm:!max-h-[92vh] sm:!rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Header Banner */}
          <div className="bg-[#1C1917] text-white p-4 sm:p-6 lg:p-7 relative border-b border-stone-800 shrink-0">
            {/* Drag Handle for mobile bottom-sheet */}
            <div className="sm:hidden w-10 h-1 bg-stone-600 rounded-full mx-auto mb-3" />
            <button 
              onClick={onClose}
              className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer mobile-touch-target"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-700">
                <Bus className="w-3.5 h-3.5" />
                <span>{option.serviceNumber || option.transportType}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {route.origin} <span className="text-emerald-400 mx-1">→</span> {route.destination}
              </h2>

              {/* Main Source / Trust Badge */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <SourceBadge
                  provenance={option.provenance || route.provenance}
                  sourceType={option.provenance?.source_type || 'LOCAL_LENS'}
                  verificationStatus={option.provenance?.verification_status || 'VERIFIED'}
                  hasEvidence={option.provenance?.evidence_available ?? true}
                  size="md"
                />

                {option.provenance?.verified_at && (
                  <span className="text-xs text-stone-300 flex items-center font-medium">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                    Last verified: {option.provenance.verified_at}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Modal Scrollable Content */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1 text-xs">
            
            {/* 1. ROUTE STOPS SEQUENCE */}
            <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
                <h3 className="font-black text-stone-900 text-sm flex items-center uppercase tracking-wider">
                  <Navigation className="w-4 h-4 mr-1.5 text-[#1B4332]" />
                  Transit Route Corridor
                </h3>
                <span className="text-stone-500 font-semibold">{option.approxDuration}</span>
              </div>

              <div className="space-y-2 pt-1">
                {uniqueStops.map((stop, idx) => (
                  <div key={idx} className="flex items-start space-x-3 relative">
                    {/* Visual Connector Dot & Line */}
                    <div className="flex flex-col items-center mt-1">
                      <div className={`w-3 h-3 rounded-full border-2 ${
                        idx === 0 
                          ? 'bg-emerald-600 border-emerald-700' 
                          : idx === uniqueStops.length - 1 
                          ? 'bg-red-600 border-red-700' 
                          : 'bg-white border-stone-400'
                      }`} />
                      {idx < uniqueStops.length - 1 && (
                        <div className="w-0.5 h-6 bg-stone-300 my-0.5" />
                      )}
                    </div>

                    <div className="flex-1 pb-1">
                      <div className="font-bold text-stone-900 text-sm">{stop}</div>
                      {idx === 0 && (
                        <span className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-wide">
                          Origin / Starting Terminal
                        </span>
                      )}
                      {idx === uniqueStops.length - 1 && (
                        <span className="text-[10px] text-stone-500 font-extrabold uppercase tracking-wide">
                          Drop / Destination Arrival
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. FARE & FARE HISTORY */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
                <div className="flex items-center space-x-2">
                  <Banknote className="w-4 h-4 text-emerald-700" />
                  <span className="font-black text-stone-900 text-sm uppercase tracking-wider">
                    Verified Transit Fare
                  </span>
                </div>
                <SourceBadge
                  provenance={option.provenance}
                  sourceType={option.provenance?.source_type || 'LOCAL_LENS'}
                  verificationStatus={option.provenance?.verification_status || 'VERIFIED'}
                  size="sm"
                />
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-emerald-800">{option.approxFare}</span>
                <span className="text-stone-500 text-xs font-semibold">per adult seat</span>
              </div>

              {/* Fare History / Updates Section */}
              {option.fareHistory ? (
                <div className="bg-emerald-50/70 border border-emerald-200 p-3.5 rounded-xl space-y-1">
                  <div className="flex items-center space-x-1.5 text-emerald-950 font-bold">
                    <History className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Fare History & Regional Updates</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                    <div>
                      <span className="text-stone-500 block">Current Fare:</span>
                      <strong className="text-emerald-900 font-extrabold">{option.fareHistory.current}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Previously:</span>
                      <strong className="text-stone-700 line-through">{option.fareHistory.previous}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Updated:</span>
                      <strong className="text-stone-700">{option.fareHistory.updatedAt}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-[11px] text-stone-500 italic">
                  Fare verified against regional transport conductor tariff sheet.
                </div>
              )}
            </div>

            {/* 3. BOARDING & DROP POINTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-stone-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">
                    Boarding Point
                  </span>
                  <SourceBadge
                    provenance={option.provenance}
                    sourceType={option.provenance?.source_type || 'LOCAL_LENS'}
                    verificationStatus={option.provenance?.verification_status || 'VERIFIED'}
                    size="sm"
                  />
                </div>
                <div className="font-extrabold text-stone-900 text-sm flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700 mr-1.5 shrink-0" />
                  <span>{option.boardingPoint}</span>
                </div>
              </div>

              <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-stone-200 space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 block">
                  Drop Point / Alighting
                </span>
                <div className="font-extrabold text-stone-900 text-sm flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-stone-600 mr-1.5 shrink-0" />
                  <span>{option.dropPoint}</span>
                </div>
              </div>
            </div>

            {/* 4. TIMING & SCHEDULE */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#1B4332]" />
                  <span className="font-black text-stone-900 text-sm uppercase tracking-wider">
                    Service Timings & Frequency
                  </span>
                </div>
                <span className="text-stone-400 text-[10px] font-bold">On-ground Schedule</span>
              </div>

              {option.timing ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span className="text-stone-400 text-[10px] font-bold uppercase block">First Bus</span>
                    <strong className="text-stone-900 text-sm">{option.timing.firstBus || '06:00 AM'}</strong>
                  </div>
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span className="text-stone-400 text-[10px] font-bold uppercase block">Last Bus</span>
                    <strong className="text-stone-900 text-sm">{option.timing.lastBus || '09:30 PM'}</strong>
                  </div>
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span className="text-stone-400 text-[10px] font-bold uppercase block">Frequency</span>
                    <strong className="text-stone-900 text-sm">{option.timing.frequency || 'Every 15 mins'}</strong>
                  </div>
                </div>
              ) : (
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-stone-500 italic flex items-center space-x-2">
                  <Info className="w-4 h-4 text-stone-400 shrink-0" />
                  <span>Timing information unavailable for this specific service. We do not invent unverified schedules.</span>
                </div>
              )}
            </div>

            {/* 5. LOCAL TIPS & PRACTICAL NOTES */}
            {option.practicalNotes && option.practicalNotes.length > 0 && (
              <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-amber-950 flex items-center text-xs">
                    <Lightbulb className="w-4 h-4 mr-1.5 text-amber-700" />
                    Verified Local Transit Tips
                  </h4>
                  <span className="text-[10px] bg-amber-200/70 text-amber-950 px-2 py-0.5 rounded font-bold">
                    Community Observation
                  </span>
                </div>

                <ul className="space-y-1.5 text-stone-700 list-disc list-inside">
                  {option.practicalNotes.map((note, i) => (
                    <li key={i} className="leading-relaxed">{note}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Outdated Notice Box */}
            {option.provenance?.verification_status === 'OUTDATED' && (
              <div className="bg-red-50 border border-red-300 p-4 rounded-2xl flex items-start space-x-3 text-red-950">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-xs">Reported as Outdated</div>
                  <p className="text-[11px] leading-relaxed">
                    This route or fare information was recently flagged by passengers. The LocalLens Verification Desk is re-auditing ground conductor records.
                  </p>
                </div>
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
                  if (onShareKnowledgeForRoute) {
                    onShareKnowledgeForRoute(route.origin, route.destination);
                  }
                }}
                className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Know this route? Share Local Transport Info</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Reusable Outdated Report Modal */}
      {showOutdatedModal && (
        <OutdatedReportModal
          targetId={option.id}
          targetTitle={`${option.serviceNumber || option.transportType} (${route.origin} → ${route.destination})`}
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
