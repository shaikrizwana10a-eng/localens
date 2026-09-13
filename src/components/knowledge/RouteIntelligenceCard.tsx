import React, { useState } from 'react';
import { 
  Bus, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  HelpCircle,
  Share2,
  Navigation,
  ArrowRight,
  ArrowDown,
  Lightbulb,
  Ban,
  ShieldCheck,
  Banknote,
  ThumbsUp,
  ThumbsDown,
  RefreshCw
} from 'lucide-react';
import type { ComposedRouteResult } from '../../utils/routeComposer';
import { SourceBadge } from '../common/SourceBadge';

interface RouteIntelligenceCardProps {
  routeResult: ComposedRouteResult;
  onNavigateToShare?: () => void;
}

export const RouteIntelligenceCard: React.FC<RouteIntelligenceCardProps> = ({
  routeResult,
  onNavigateToShare
}) => {
  const [helpfulState, setHelpfulState] = useState<'yes' | 'no' | null>(null);

  // Case 1: No Verified Information Available (DO NOT confuse "no data" with "no bus")
  if (routeResult.overallStatus === 'NO_DATA') {
    return (
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-4">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-500/20 text-amber-300 font-extrabold text-[11px] px-2.5 py-1 rounded border border-amber-500/40 uppercase tracking-wider">
              LOCAL ROUTE INTELLIGENCE
            </span>
            <h3 className="text-xl font-extrabold text-white">
              {routeResult.origin} <span className="text-emerald-400 mx-1">→</span> {routeResult.destination}
            </h3>
          </div>
        </div>

        <div className="bg-stone-950/80 border border-stone-800 p-6 rounded-2xl text-center space-y-3">
          <HelpCircle className="w-10 h-10 text-stone-500 mx-auto" />
          <div className="space-y-1">
            <h4 className="font-extrabold text-stone-200 text-base">
              No verified local transport information is currently available for this route.
            </h4>
            <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
              LOCAL relies on community-generated knowledge. No verified contributor has reported step-by-step transport details for this route yet.
            </p>
          </div>

          {onNavigateToShare && (
            <button
              onClick={onNavigateToShare}
              className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors inline-flex items-center space-x-2 mt-2"
            >
              <Share2 className="w-4 h-4 text-emerald-300" />
              <span>Be the First Local to Share This Route</span>
            </button>
          )}
        </div>

        <div className="text-[11px] text-stone-500 italic text-center">
          Note: "No verified information" does not mean no bus exists — it means LOCAL does not have verified data for this route yet.
        </div>
      </div>
    );
  }

  // Case 2: Community Conflict Detected
  if (routeResult.overallStatus === 'CONFLICT') {
    return (
      <div className="bg-rose-950/40 border border-rose-800 text-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
        <div className="flex items-center space-x-2 border-b border-rose-800/60 pb-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <span className="bg-rose-500/20 text-rose-300 font-extrabold text-[11px] px-2.5 py-1 rounded border border-rose-500/40 uppercase tracking-wider">
            COMMUNITY INFORMATION DIFFERENCE
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-white">
            {routeResult.origin} → {routeResult.destination}
          </h3>
          <p className="text-xs text-rose-200 leading-relaxed">
            Community information differs for this route. To maintain strict data integrity, this route has been flagged for re-verification.
          </p>
        </div>

        {routeResult.conflictingItems && (
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-stone-300 uppercase tracking-wider text-[10px]">Conflicting Community Submissions:</h4>
            {routeResult.conflictingItems.map((item, idx) => (
              <div key={idx} className="bg-stone-900 p-3 rounded-xl border border-stone-800 flex justify-between items-center text-stone-300">
                <div>
                  <strong>Report {idx + 1} ({item.reportedBy}):</strong> {item.busNumber ? `Bus ${item.busNumber}` : 'Route'} via {item.intermediateStop || item.boardingPoint} ({item.fare || 'Fare unverified'})
                </div>
                <span className="text-rose-400 text-[10px] font-bold">Needs Re-verification</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Generate Natural-Language "What to do" Summary
  const generateWhatToDoSummary = () => {
    if (routeResult.hasDirectBus) {
      const busNo = routeResult.segments[0]?.busNumber ? ` (Bus ${routeResult.segments[0].busNumber})` : '';
      return `Take a bus from ${routeResult.origin} directly to ${routeResult.destination}${busNo}.`;
    }
    const seg1 = routeResult.segments[0];
    const seg2 = routeResult.segments[1];
    const transferStop = seg1?.getDownAt || seg1?.destination || 'the transfer bus stop';
    const modeLabel = seg2?.mode === 'Walk' ? 'walk' : seg2?.mode === 'Shared Auto' ? 'take a shared auto' : 'take an auto';
    return `Take a bus from ${routeResult.origin} to ${transferStop}, then ${modeLabel} to ${routeResult.destination}.`;
  };

  // Helper for fare breakdown string
  const getFareBreakdown = () => {
    if (routeResult.segments.length > 1) {
      const fare1 = routeResult.segments[0]?.fareLabel?.split(' ')[0];
      const fare2 = routeResult.segments[1]?.fareLabel?.split(' ')[0];
      if (fare1 && fare2 && fare1.startsWith('₹') && fare2.startsWith('₹')) {
        return `${fare1} bus + ${fare2} auto`;
      }
    }
    return null;
  };

  const fareBreakdown = getFareBreakdown();
  const seg1 = routeResult.segments[0];
  const seg2 = routeResult.segments[1];
  const intermediateStopName = seg1?.getDownAt || seg1?.destination || 'Transfer Stop';

  // Case 3: Verified / Pending Journey Result Presentation
  return (
    <div className="bg-[#1C1917] text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-2xl space-y-6">
      
      {/* 1. ROUTE TITLE & BADGE */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {routeResult.origin} <span className="text-emerald-400 mx-1.5">→</span> {routeResult.destination}
          </h2>
          <p className="text-emerald-300 text-sm font-bold flex items-center pt-0.5">
            <Sparkles className="w-4 h-4 mr-1.5 text-emerald-400 shrink-0" />
            {generateWhatToDoSummary()}
          </p>
        </div>

        {/* Route Type & Provenance Badges */}
        <div className="flex items-center space-x-2">
          <SourceBadge
            sourceType={routeResult.overallStatus === 'VERIFIED' ? 'LOCAL_LENS' : 'COMMUNITY'}
            verificationStatus={routeResult.overallStatus === 'VERIFIED' ? 'VERIFIED' : 'PENDING'}
            size="md"
            provenance={{
              source_type: routeResult.overallStatus === 'VERIFIED' ? 'LOCAL_LENS' : 'COMMUNITY',
              verification_status: routeResult.overallStatus === 'VERIFIED' ? 'VERIFIED' : 'PENDING',
              verified_by: 'LocalLens Verification Desk',
              verified_at: '2026-09-10',
              last_updated_at: '2026-09-10',
              evidence_available: routeResult.overallStatus === 'VERIFIED',
              disclaimer: 'Calculated by LocalLens Route Intelligence from verified multimodal segments.'
            }}
          />
          <div className="bg-stone-800 px-3.5 py-1.5 rounded-xl border border-stone-700 text-xs font-bold text-stone-200 flex items-center space-x-1.5">
            <Bus className="w-4 h-4 text-emerald-400" />
            <span>{routeResult.hasDirectBus ? 'Direct Bus Route' : 'Multimodal Route (Bus + Auto)'}</span>
          </div>
        </div>
      </div>

      {/* 2. PROMINENT "NO DIRECT BUS TO [DESTINATION]" WARNING BANNER (When verified data indicates no direct bus) */}
      {!routeResult.hasDirectBus && routeResult.overallStatus === 'VERIFIED' && (
        <div className="bg-red-950/80 border-2 border-red-600/80 rounded-2xl p-6 text-red-100 space-y-3 shadow-xl relative overflow-hidden">
          <div className="flex items-start space-x-3.5">
            <div className="bg-red-500/20 p-2.5 rounded-xl border border-red-500/40 text-red-400 shrink-0 mt-0.5">
              <Ban className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-400 block">
                IMPORTANT ROUTE NOTICE
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                NO DIRECT BUS TO {routeResult.destination.toUpperCase()}
              </h3>
              <p className="text-xs sm:text-sm text-red-200 font-medium leading-relaxed pt-1">
                Buses do not go directly to {routeResult.destination}. Take a bus to {intermediateStopName}, then take an auto to {routeResult.destination}.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. VISUAL STEP-BY-STEP JOURNEY FLOW */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-400 flex items-center">
            <Navigation className="w-4 h-4 mr-1.5 text-emerald-400" />
            Step-by-Step Journey
          </h4>
          <span className="text-[11px] text-stone-400 font-medium">Follow step sequence below</span>
        </div>

        {/* Responsive Step Journey Grid: Horizontal on Desktop, Vertical Stack on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
          
          {/* STEP 1: Catch the Bus */}
          {seg1 && (
            <div className="bg-stone-950 border border-stone-800 p-5 rounded-2xl space-y-3 relative overflow-hidden shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-7 h-7 rounded-full bg-emerald-500 text-stone-950 font-black text-xs flex items-center justify-center">
                      1
                    </span>
                    <span className="font-extrabold text-white text-sm uppercase tracking-wide">CATCH THE BUS</span>
                  </div>
                  <Bus className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">From</span>
                  <span className="font-bold text-white text-sm flex items-center">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 mr-1 shrink-0" />
                    {seg1.origin}
                  </span>
                </div>

                <div className="space-y-1 text-xs bg-stone-900/80 p-3 rounded-xl border border-stone-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Bus</span>
                  <span className="font-extrabold text-emerald-300 text-sm block">
                    {seg1.busNumber ? `Bus ${seg1.busNumber}` : 'Local Bus'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Bus fare</span>
                  <span className={`font-extrabold ${seg1.isFareVerified ? 'text-emerald-400' : 'text-amber-300'}`}>
                    {seg1.fareLabel.split(' ')[0]}
                  </span>
                </div>
                {seg1.isFareVerified ? (
                  <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-800 flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-400" /> Verified
                  </span>
                ) : (
                  <span className="bg-amber-950 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-800">
                    Pending
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Desktop Arrow Connector 1 */}
          <div className="hidden md:flex absolute top-1/2 left-[31.5%] -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-stone-800 border border-stone-700 items-center justify-center text-emerald-400 shadow-md">
            <ArrowRight className="w-4 h-4" />
          </div>
          {/* Mobile Arrow Connector 1 */}
          <div className="md:hidden flex justify-center py-1 text-emerald-400">
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>

          {/* STEP 2: Get Down Here / Destination Stop */}
          {routeResult.hasDirectBus ? (
            /* Direct Bus Step 2 */
            <div className="bg-stone-950 border border-stone-800 p-5 rounded-2xl space-y-3 relative overflow-hidden shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-7 h-7 rounded-full bg-emerald-500 text-stone-950 font-black text-xs flex items-center justify-center">
                      2
                    </span>
                    <span className="font-extrabold text-white text-sm uppercase tracking-wide">GET DOWN HERE</span>
                  </div>
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Destination</span>
                  <span className="font-black text-emerald-300 text-lg block">{routeResult.destination}</span>
                  <p className="text-stone-400 text-[11px] pt-1">
                    Direct bus drops you at the destination.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-emerald-400 font-bold">
                <span>Final Stop</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
          ) : (
            /* Multimodal Step 2: Intermediate Stop */
            <div className="bg-stone-950 border border-amber-900/50 p-5 rounded-2xl space-y-3 relative overflow-hidden shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-7 h-7 rounded-full bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center">
                      2
                    </span>
                    <span className="font-extrabold text-white text-sm uppercase tracking-wide">GET DOWN HERE</span>
                  </div>
                  <MapPin className="w-4 h-4 text-amber-400" />
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">Get Down Here</span>
                  <span className="font-black text-white text-xl block">
                    {intermediateStopName}
                  </span>
                  <p className="text-stone-300 text-xs leading-relaxed pt-1 font-medium">
                    Get down here before continuing to {routeResult.destination}.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-amber-300 font-bold">
                <span>Transfer Bus Stop</span>
                <Navigation className="w-4 h-4 text-amber-400" />
              </div>
            </div>
          )}

          {/* Desktop Arrow Connector 2 (only for multimodal) */}
          {!routeResult.hasDirectBus && (
            <>
              <div className="hidden md:flex absolute top-1/2 left-[64.8%] -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-stone-800 border border-stone-700 items-center justify-center text-amber-400 shadow-md">
                <ArrowRight className="w-4 h-4" />
              </div>
              {/* Mobile Arrow Connector 2 */}
              <div className="md:hidden flex justify-center py-1 text-amber-400">
                <ArrowDown className="w-6 h-6 animate-bounce" />
              </div>
            </>
          )}

          {/* STEP 3: Take an Auto (Only for Multimodal) */}
          {!routeResult.hasDirectBus && seg2 && (
            <div className="bg-stone-950 border border-stone-800 p-5 rounded-2xl space-y-3 relative overflow-hidden shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-7 h-7 rounded-full bg-emerald-500 text-stone-950 font-black text-xs flex items-center justify-center">
                      3
                    </span>
                    <span className="font-extrabold text-white text-sm uppercase tracking-wide">
                      {seg2.mode === 'Walk' ? 'WALK TO DESTINATION' : 'TAKE AN AUTO'}
                    </span>
                  </div>
                  <Navigation className="w-4 h-4 text-amber-400" />
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Final Journey</span>
                  <span className="font-extrabold text-amber-300 text-sm block">
                    {seg2.origin} → {routeResult.destination}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Auto fare</span>
                  <span className={`font-extrabold ${seg2.isFareVerified ? 'text-emerald-400' : 'text-amber-300'}`}>
                    {seg2.fareLabel.split(' ')[0]}
                  </span>
                </div>
                {seg2.isFareVerified ? (
                  <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-800 flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-400" /> Verified
                  </span>
                ) : (
                  <span className="bg-amber-950 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-800">
                    Pending
                  </span>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 4. TOTAL ESTIMATED FARE SUMMARY CARD */}
      <div className="bg-stone-950 border border-stone-800 p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 flex items-center">
            <Banknote className="w-4 h-4 text-emerald-400 mr-1.5" />
            TOTAL ESTIMATED FARE
          </span>
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-black text-emerald-400">
              {routeResult.totalEstimatedFare}
            </span>
            {fareBreakdown && (
              <span className="text-xs text-stone-300 font-semibold bg-stone-900 px-2.5 py-1 rounded-lg border border-stone-800">
                {fareBreakdown}
              </span>
            )}
          </div>
        </div>

        <div className="text-right text-xs">
          {routeResult.isTotalFareVerified ? (
            <span className="text-emerald-400 font-bold flex items-center justify-end">
              <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-400" />
              Fares calculated from verified reports
            </span>
          ) : (
            <span className="text-amber-300 font-semibold">
              Fare not yet verified
            </span>
          )}
        </div>
      </div>

      {/* 5. LOCAL TIP BOX */}
      {routeResult.localTip && (
        <div className="bg-emerald-950/40 border border-emerald-800/80 p-5 rounded-2xl space-y-1.5 shadow-md">
          <h4 className="font-extrabold text-emerald-300 uppercase tracking-wider text-xs flex items-center">
            <Lightbulb className="w-4 h-4 mr-1.5 text-amber-400" />
            LOCAL TIP
          </h4>
          <p className="text-stone-200 text-xs sm:text-sm leading-relaxed italic">
            "{routeResult.localTip}"
          </p>
        </div>
      )}

      {/* 6. VERIFICATION & TRUST SECTION */}
      <div className="bg-stone-950/80 p-5 rounded-2xl border border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-300">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white uppercase tracking-wider text-xs">VERIFIED BY LOCAL</span>
          </div>
          <p className="text-stone-400 text-xs">
            Based on {routeResult.verifiedReportCount} verified local report{routeResult.verifiedReportCount === 1 ? '' : 's'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <span className="text-stone-400 text-[11px] mr-1">Was this helpful?</span>
            <button
              onClick={() => setHelpfulState('yes')}
              className={`p-1.5 px-3 rounded-lg border text-xs font-bold flex items-center transition-colors ${
                helpfulState === 'yes' ? 'bg-emerald-900 border-emerald-600 text-emerald-300' : 'bg-stone-900 border-stone-700 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Yes
            </button>
            <button
              onClick={() => setHelpfulState('no')}
              className={`p-1.5 px-3 rounded-lg border text-xs font-bold flex items-center transition-colors ${
                helpfulState === 'no' ? 'bg-rose-900 border-rose-600 text-rose-300' : 'bg-stone-900 border-stone-700 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <ThumbsDown className="w-3.5 h-3.5 mr-1 text-rose-400" /> No
            </button>
          </div>

          {onNavigateToShare && (
            <button
              onClick={onNavigateToShare}
              className="text-emerald-400 hover:text-emerald-300 text-xs font-bold underline flex items-center"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1" />
              Suggest an Update
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
