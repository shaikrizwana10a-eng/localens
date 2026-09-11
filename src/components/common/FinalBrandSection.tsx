import React from 'react';
import { Compass, Share2, ArrowRight } from 'lucide-react';

interface FinalBrandSectionProps {
  onExploreClick?: () => void;
  onShareClick?: () => void;
}

export const FinalBrandSection: React.FC<FinalBrandSectionProps> = ({
  onExploreClick,
  onShareClick
}) => {
  return (
    <section className="bg-gradient-to-b from-[#1C1917] to-[#12100F] text-white rounded-3xl p-8 sm:p-14 border border-stone-800 text-center space-y-8 shadow-2xl relative overflow-hidden my-12">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        
        {/* Brand Badge & Logo */}
        <div className="inline-flex items-center space-x-3 bg-stone-900 border border-stone-700 px-4 py-2 rounded-2xl shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-[#1B4332] text-white flex items-center justify-center font-extrabold text-lg">
            L
          </div>
          <span className="font-black text-2xl tracking-tight text-white">LOCAL</span>
        </div>

        {/* Brand Tagline & Supporting Message */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-white">
            TRAVEL LIKE A LOCAL.
          </h2>
          <p className="text-emerald-400 font-semibold text-lg sm:text-xl italic">
            Go like someone who knows the place.
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent w-full max-w-md mx-auto my-4" />

        {/* Core Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center max-w-2xl mx-auto pt-2">
          
          <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto font-bold text-xs">
              01
            </div>
            <h4 className="font-extrabold text-sm text-white">Discover Local Knowledge</h4>
            <p className="text-xs text-stone-400">Bus routes, actual fares, and affordable stays verified by the platform.</p>
          </div>

          <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded-full bg-blue-950 text-blue-400 flex items-center justify-center mx-auto font-bold text-xs">
              02
            </div>
            <h4 className="font-extrabold text-sm text-white">Share What You Know</h4>
            <p className="text-xs text-stone-400">Report bus numbers and boarding stands to help fellow travelers.</p>
          </div>

          <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded-full bg-purple-950 text-purple-400 flex items-center justify-center mx-auto font-bold text-xs">
              03
            </div>
            <h4 className="font-extrabold text-sm text-white">Travel With Confidence</h4>
            <p className="text-xs text-stone-400">Avoid overpaying or getting lost with community-verified travel guidance.</p>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {onExploreClick && (
            <button
              onClick={onExploreClick}
              className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center space-x-2"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Local Knowledge</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          )}

          {onShareClick && (
            <button
              onClick={onShareClick}
              className="bg-stone-800 hover:bg-stone-700 text-stone-100 font-extrabold text-sm px-6 py-3.5 rounded-xl border border-stone-700 transition-all flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share What You Know</span>
            </button>
          )}
        </div>

      </div>

    </section>
  );
};
