import React from 'react';
import { Globe2, PhoneCall, ShieldAlert, BookOpen, DollarSign, CheckCircle2 } from 'lucide-react';

export const ForeignTouristView: React.FC = () => {
  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#1C1917] text-white p-8 rounded-2xl border border-stone-800 space-y-3">
        <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
          <Globe2 className="w-3.5 h-3.5" />
          <span>International Traveller Safety & Guidance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Foreign Tourist Experience & Assistance
        </h1>
        <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
          Specialized guidance for international visitors exploring India: verified transit fare benchmarks, emergency helplines, temple dress codes, and local language cheat sheets.
        </p>
      </div>

      {/* Safety Disclaimer Banner */}
      <div className="bg-emerald-950 text-emerald-100 p-5 rounded-xl border border-emerald-800 flex items-start space-x-3 text-xs">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-white text-sm">Safety Information Notice</h4>
          <p className="text-stone-300 leading-relaxed">
            LOCAL provides safety-oriented community information and transport guidance. It does not replace police, emergency services, embassies, or professional security.
          </p>
        </div>
      </div>

      {/* Emergency Helplines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-[#E7E5E4] space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-amber-800 font-bold">
            <PhoneCall className="w-4 h-4" />
            <span>National Tourist Helpline</span>
          </div>
          <div className="text-2xl font-extrabold text-[#1C1917]">1363</div>
          <p className="text-stone-500">24x7 Multi-lingual support (Toll Free in India)</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E7E5E4] space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-red-700 font-bold">
            <PhoneCall className="w-4 h-4" />
            <span>Emergency Unified Services</span>
          </div>
          <div className="text-2xl font-extrabold text-[#1C1917]">112</div>
          <p className="text-stone-500">Police, Fire, Ambulance & Safety</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E7E5E4] space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-emerald-800 font-bold">
            <PhoneCall className="w-4 h-4" />
            <span>Medical Emergency</span>
          </div>
          <div className="text-2xl font-extrabold text-[#1C1917]">108</div>
          <p className="text-stone-500">State Ambulance & Trauma Response</p>
        </div>
      </div>

      {/* Local Etiquette & Bargaining Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Cultural & Temple Etiquette */}
        <div className="bg-white p-6 rounded-xl border border-[#E7E5E4] space-y-4">
          <h3 className="font-bold text-[#1C1917] text-lg flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-[#1B4332]" />
            Cultural & Temple Etiquette Rules
          </h3>
          <ul className="space-y-2.5 text-xs text-stone-700">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
              <span><strong>Footwear:</strong> Remove shoes and socks at designated footwear counters before entering temple complexes.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
              <span><strong>Dress Code:</strong> Cover shoulders and knees. Traditional attire (kurta/saree/dupatta) is required in sacred inner sanctums like Tirumala.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
              <span><strong>Photography:</strong> Cellphones and cameras are strictly banned inside temple inner sanctums. Deposit them at free TTD locker bays.</span>
            </li>
          </ul>
        </div>

        {/* Local Transit Bargaining Benchmarks */}
        <div className="bg-white p-6 rounded-xl border border-[#E7E5E4] space-y-4">
          <h3 className="font-bold text-[#1C1917] text-lg flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-amber-700" />
            Fare Benchmarks & Overcharge Protection
          </h3>
          <ul className="space-y-2.5 text-xs text-stone-700">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
              <span><strong>Shared Auto Rate:</strong> ₹25–₹40 per head for standard 3-5 km city routes. Never pay ₹200+ for a shared seat.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
              <span><strong>City Buses:</strong> Pay exact change (₹15–₹35) to the conductor inside the bus.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
              <span><strong>SIM Card & Payments:</strong> UPI digital payments work everywhere; keep ₹500 in small ₹20/₹50 cash notes for street food stalls.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Language Cheat Sheet Table */}
      <div className="bg-white rounded-xl border border-[#E7E5E4] p-6 space-y-4">
        <h3 className="font-bold text-[#1C1917] text-lg">Essential Transit Language Phrases (Telugu / English)</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E7E5E4] text-stone-500 font-semibold bg-[#FAF9F6]">
                <th className="p-3">English Phrase</th>
                <th className="p-3">Phonetic Telugu / Local Phrase</th>
                <th className="p-3">Meaning / Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5E4] text-stone-800">
              <tr>
                <td className="p-3 font-semibold">How much is the fare?</td>
                <td className="p-3 font-bold text-[#1B4332]">"Entha avuthundi?"</td>
                <td className="p-3 text-stone-500">Asking auto or stall price</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Where is the bus stop?</td>
                <td className="p-3 font-bold text-[#1B4332]">"Bus stop ekkada?"</td>
                <td className="p-3 text-stone-500">Directions to local bus bay</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Please stop here.</td>
                <td className="p-3 font-bold text-[#1B4332]">"Ikkada aapandi."</td>
                <td className="p-3 text-stone-500">Alighting auto or bus</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Is this pure vegetarian?</td>
                <td className="p-3 font-bold text-[#1B4332]">"Idi pure veg ah?"</td>
                <td className="p-3 text-stone-500">Dietary check at food stalls</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
