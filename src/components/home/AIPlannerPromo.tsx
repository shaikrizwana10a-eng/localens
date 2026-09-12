import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Wallet, 
  Clock, 
  Bot 
} from 'lucide-react';

interface AIPlannerPromoProps {
  onNavigate: (view: string) => void;
}

export const AIPlannerPromo: React.FC<AIPlannerPromoProps> = ({ onNavigate }) => {
  return (
    <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1B4332] via-[#24533e] to-[#1C1917] text-white p-8 sm:p-12 border border-emerald-800 shadow-xl">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl space-y-6">
        
        <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/40">
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          <span>LocaLens Neural Travel Planner</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Plan Your Journey with LocalLens AI
          </h2>
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
            Tell us where you want to go. We'll help you understand how to get there, where to stay, what to eat, and what locals recommend — with transparent human rationale and real ticket costs.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div className="bg-black/30 border border-emerald-500/30 p-3.5 rounded-2xl backdrop-blur-xs flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold">Verified Bus Numbers</strong>
              <span className="text-stone-300 text-[11px]">Real RTC routes and exact conductor fares.</span>
            </div>
          </div>

          <div className="bg-black/30 border border-emerald-500/30 p-3.5 rounded-2xl backdrop-blur-xs flex items-start space-x-2.5">
            <Clock className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold">Crowd-Aware Sequencing</strong>
              <span className="text-stone-300 text-[11px]">Early morning darshan and avoided queue peaks.</span>
            </div>
          </div>

          <div className="bg-black/30 border border-emerald-500/30 p-3.5 rounded-2xl backdrop-blur-xs flex items-start space-x-2.5">
            <Wallet className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold">Up to 65% Transit Savings</strong>
              <span className="text-stone-300 text-[11px]">Public routes calibrated against taxi surge rates.</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onNavigate('planner')}
            className="bg-white hover:bg-stone-100 text-[#1B4332] font-black text-sm px-6 py-3 rounded-xl shadow-lg transition-all flex items-center space-x-2 active:scale-95"
          >
            <Bot className="w-4 h-4 text-[#1B4332]" />
            <span>Try AI Planner</span>
            <ArrowRight className="w-4 h-4 text-[#1B4332]" />
          </button>
        </div>

      </div>
    </section>
  );
};
