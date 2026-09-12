import React from 'react';
import { 
  Compass, 
  Share2, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface FinalCTASectionProps {
  onNavigate: (view: string) => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1C1917] via-[#221C1A] to-[#1B4332] text-white p-8 sm:p-12 border border-stone-800 shadow-xl text-center space-y-6">
      {/* Decorative Glow */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/40">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
          <span>Local Intelligence Community</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
          Know the place before you travel.
        </h2>

        <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Discover verified local information that helps you travel smarter — exact bus numbers, boarding stands, genuine fares, and authentic culinary spots.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={() => onNavigate('explore-knowledge')}
            className="px-6 py-3.5 bg-[#1B4332] hover:bg-[#265e46] active:scale-98 text-white rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2 border border-emerald-600"
          >
            <Compass className="w-4 h-4 text-emerald-300" />
            <span>Explore Local Knowledge</span>
            <ArrowRight className="w-4 h-4 text-emerald-300" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('share-knowledge')}
            className="px-6 py-3.5 bg-white/10 hover:bg-white/20 active:scale-98 text-white rounded-2xl font-black text-xs sm:text-sm transition-all border border-white/20 flex items-center space-x-2 shadow-xs"
          >
            <Share2 className="w-4 h-4 text-emerald-400" />
            <span>Share What You Know</span>
          </button>
        </div>
      </div>
    </section>
  );
};
