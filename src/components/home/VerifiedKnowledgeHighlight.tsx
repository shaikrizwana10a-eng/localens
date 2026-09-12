import React from 'react';
import { 
  MapPin, 
  Bus, 
  Banknote, 
  Star, 
  Users, 
  ArrowRight, 
  ShieldCheck,
  Clock
} from 'lucide-react';
import { INITIAL_KNOWLEDGE_ITEMS } from '../../data/initialKnowledge';
import { SourceBadge } from '../common/SourceBadge';

interface VerifiedKnowledgeHighlightProps {
  onNavigate: (view: string) => void;
}

export const VerifiedKnowledgeHighlight: React.FC<VerifiedKnowledgeHighlightProps> = ({ onNavigate }) => {
  // Use real initial knowledge item: Bus 99 (Gajuwaka -> RK Beach)
  const highlightItem = INITIAL_KNOWLEDGE_ITEMS.find(k => k.id === 'lk-vizag-1') || INITIAL_KNOWLEDGE_ITEMS[0];

  return (
    <section className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5E4] pb-4">
        <div>
          <span className="bg-emerald-100 text-[#1B4332] font-black text-[10px] uppercase px-2.5 py-0.5 rounded border border-emerald-300 tracking-wider">
            Verified Knowledge Spotlight
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#1C1917] mt-1.5">
            Know Before You Go
          </h2>
          <p className="text-xs text-stone-500 font-medium mt-0.5">
            Real ground-truth travel details shared by verified locals and audited by the platform desk.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('explore-knowledge')}
          className="text-xs font-black text-[#1B4332] hover:text-[#265e46] flex items-center space-x-1 shrink-0 w-fit cursor-pointer"
        >
          <span>Explore More Local Tips</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Featured Card */}
      <div className="bg-gradient-to-br from-[#FAF9F6] to-emerald-50/40 rounded-2xl border border-emerald-200/80 p-6 space-y-5 max-w-4xl mx-auto shadow-2xs">
        
        {/* Origin -> Destination & Stamp */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shrink-0 shadow-xs">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="font-black text-lg sm:text-xl text-[#1C1917] flex items-center">
                <span>{highlightItem.from}</span>
                <span className="text-emerald-700 mx-2 font-bold">→</span>
                <span>{highlightItem.to}</span>
              </div>
              <span className="text-[11px] text-stone-500">
                Direct coastal route via Scindia & Convent Junction
              </span>
            </div>
          </div>

          <SourceBadge 
            sourceType="LOCAL_LENS"
            verificationStatus="VERIFIED"
            size="lg"
            provenance={{
              source_type: 'LOCAL_LENS',
              verification_status: 'VERIFIED',
              verified_by: 'LocalLens Verification Desk',
              verified_at: '2026-09-10',
              submitted_by: 'Local Scout @vizag_transit',
              submitted_at: '2026-09-08',
              last_updated_at: '2026-09-10',
              evidence_available: true,
              disclaimer: 'Audited against on-ground APSRTC conductor ticket meters.'
            }}
          />
        </div>

        {/* 4 Feature Metric Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          
          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Local Transit</span>
            <div className="font-extrabold text-stone-900 text-sm sm:text-base flex items-center text-ellipsis overflow-hidden">
              <Bus className="w-4 h-4 text-[#1B4332] mr-1.5 shrink-0" />
              <span>{highlightItem.busNumber || 'Bus 99'}</span>
            </div>
            <span className="text-[10px] text-stone-500 block">Runs every 12 mins</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Verified Fare</span>
            <div className="font-black text-emerald-800 text-sm sm:text-base flex items-center">
              <Banknote className="w-4 h-4 text-emerald-600 mr-1.5 shrink-0" />
              <span>{highlightItem.fare || '₹45'}</span>
            </div>
            <span className="text-[10px] text-stone-500 block">Cash or UPI accepted</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Boarding Stand</span>
            <div className="font-bold text-stone-900 text-xs sm:text-sm truncate block">
              {highlightItem.boardingPoint || 'Platform 2, Gajuwaka'}
            </div>
            <span className="text-[10px] text-stone-500 block">Drop: Submarine Museum</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Community Rating</span>
            <div className="font-black text-amber-900 text-sm sm:text-base flex items-center">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400 mr-1.5 shrink-0" />
              <span>{highlightItem.communityRating || 4.8} / 5</span>
            </div>
            <span className="text-[10px] text-stone-500 block">{highlightItem.ratingCount || 42} verified votes</span>
          </div>

        </div>

        {/* Tip Quote Box */}
        {highlightItem.additionalInfo && (
          <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-[#1C1917]">Local Contributor Tip: </strong>
              <span>{highlightItem.additionalInfo}</span>
            </div>
          </div>
        )}

        {/* Action Buttons & Metadata Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-stone-200 text-xs">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-stone-500">
            <span className="flex items-center">
              <Users className="w-3.5 h-3.5 mr-1 text-stone-400" />
              Reported by {highlightItem.reportedBy}
            </span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-stone-400" />
              Verified on {highlightItem.verifiedAt || '2026-09-08'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => onNavigate('transport')}
              className="px-4 py-2 bg-[#1B4332] hover:bg-[#265e46] text-white rounded-xl font-bold transition-colors shadow-2xs flex items-center space-x-1"
            >
              <span>View Route</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('explore-knowledge')}
              className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-700 rounded-xl font-bold border border-stone-200 transition-colors"
            >
              All Verified Tips
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};
