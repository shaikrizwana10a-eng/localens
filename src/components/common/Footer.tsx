import React from 'react';
import { ShieldCheck, PhoneCall, MapPin, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1917] text-stone-300 pt-12 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3 Pillars Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-stone-800">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#1B4332] text-white flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Travel Locally & Affordably</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Step-by-step local bus and shared auto guidance with community-verified fares. Save up to 75% on local transit.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#1B4332] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Plan Smart with Rationale</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Practical itineraries tailored to budget, duration and interests, explaining the exact human reasoning behind every location choice.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#1B4332] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Stay & Eat Confidently</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Empirical Information Confidence Scores backed by video proofs, bathroom condition checks, and independent community votes.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-b border-stone-800 text-xs">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 rounded bg-[#1B4332] text-white flex items-center justify-center font-bold text-sm">L</div>
              <span className="font-bold text-white text-base tracking-tight">LOKAL</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Community-powered local travel intelligence platform. Helping travellers understand unfamiliar places through verified local knowledge.
            </p>
            <p className="mt-3 text-[11px] text-emerald-400 font-medium">
              Free Traveller Access Phase (Initial 2-Year Early Adoption Program)
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">Destinations</h5>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#tirupati" className="hover:text-white transition-colors">Tirupati & Tirumala Hills</a></li>
              <li><a href="#araku" className="hover:text-white transition-colors">Araku Valley Coffee Hills</a></li>
              <li><a href="#vizag" className="hover:text-white transition-colors">Visakhapatnam (Vizag Port)</a></li>
              <li><a href="#hyderabad" className="hover:text-white transition-colors">Hyderabad Heritage & Food</a></li>
              <li><a href="#vijayawada" className="hover:text-white transition-colors">Vijayawada Kanaka Durga</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">Community & Business</h5>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#scout" className="hover:text-white transition-colors">Become a Local Scout (Earn Payouts)</a></li>
              <li><a href="#verification" className="hover:text-white transition-colors">Community Verification Rules</a></li>
              <li><a href="#business" className="hover:text-white transition-colors">Hotel & Restaurant Provider Portal</a></li>
              <li><a href="#nonpaid" className="hover:text-white transition-colors">Strict Non-Paid Rating Protection</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">Emergency & Safety Guidance</h5>
            <div className="bg-stone-900 p-3 rounded border border-stone-800 space-y-2">
              <div className="flex items-center text-amber-400 font-semibold">
                <PhoneCall className="w-3.5 h-3.5 mr-1.5" />
                <span>Tourist Helpline: 1363</span>
              </div>
              <p className="text-[11px] text-stone-400">
                National Emergency: 112 | Police: 100
              </p>
              <p className="text-[10px] text-stone-500 italic mt-1">
                LOKAL provides community-reported guidance and does not replace official police or security services.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© 2026 LOKAL Travel Technologies Inc. Designed for authentic local exploration.</p>
          <div className="flex space-x-4">
            <span className="hover:text-stone-300">Privacy Policy</span>
            <span className="hover:text-stone-300">Trust Guidelines</span>
            <span className="hover:text-stone-300">Contributor Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
