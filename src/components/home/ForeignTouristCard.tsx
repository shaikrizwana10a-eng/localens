import React from 'react';
import { 
  Globe2, 
  PhoneCall, 
  ShieldCheck, 
  CreditCard, 
  AlertCircle
} from 'lucide-react';

export const ForeignTouristCard: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-amber-950 via-stone-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-amber-600/40 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center space-x-3 border-b border-stone-800 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
          <Globe2 className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-amber-500/30 text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              International Visitor Assistance
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
            Travel India with Local Confidence
          </h2>
        </div>
      </div>

      {/* 4 Guidance Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        
        <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-bold">
            <PhoneCall className="w-4 h-4" />
            <span>Tourist Helpline</span>
          </div>
          <p className="text-stone-300 font-black text-base">Call 1363 (Toll Free)</p>
          <p className="text-stone-400 text-[11px] leading-relaxed">
            24x7 multi-lingual tourist assistance supported by Ministry of Tourism, India.
          </p>
        </div>

        <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-rose-400 font-bold">
            <AlertCircle className="w-4 h-4" />
            <span>National Emergency</span>
          </div>
          <p className="text-stone-300 font-black text-base">Dial 112</p>
          <p className="text-stone-400 text-[11px] leading-relaxed">
            Single emergency number for police, medical assistance, and fire services.
          </p>
        </div>

        <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <CreditCard className="w-4 h-4" />
            <span>Currency & Smart Cards</span>
          </div>
          <p className="text-stone-300 font-bold text-xs">UPI & Metro Cards</p>
          <p className="text-stone-400 text-[11px] leading-relaxed">
            Get an authorized UPI One World digital wallet at international airports or carry exact small cash bills.
          </p>
        </div>

        <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-purple-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Fair Fare Guidance</span>
          </div>
          <p className="text-stone-300 font-bold text-xs">Zero Taxi Overcharging</p>
          <p className="text-stone-400 text-[11px] leading-relaxed">
            Always verify standard public bus rates or use pre-paid government auto booths at rail stations.
          </p>
        </div>

      </div>

    </section>
  );
};
