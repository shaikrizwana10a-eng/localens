import React, { useState } from 'react';
import { 
  Hotel, 
  Wifi, 
  Car, 
  Clock, 
  CheckCircle2
} from 'lucide-react';
import type { Accommodation } from '../../types/travel';
import { TrustBadge } from '../common/TrustBadge';

interface StayExplorerViewProps {
  stays: Accommodation[];
  onNavigate: (view: string) => void;
}

export const StayExplorerView: React.FC<StayExplorerViewProps> = ({ stays, onNavigate }) => {
  const [selectedStay, setSelectedStay] = useState<Accommodation | null>(stays[0] || null);
  const [maxPriceFilter, setMaxPriceFilter] = useState(3000);

  const filteredStays = stays.filter((s) => s.pricePerNight <= maxPriceFilter);

  return (
    <div className="space-y-10 pb-16">
      
      {/* Page Header */}
      <div className="bg-[#1C1917] text-white p-8 rounded-2xl border border-stone-800 space-y-3">
        <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
          <Hotel className="w-3.5 h-3.5" />
          <span>Accommodation Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Stay Confidently with Genuine Customer Evidence
        </h1>
        <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
          Not a hotel booking site. We catalog actual bathroom conditions, Wi-Fi speed tests, parking charges, and community-reported cleanliness scores so you stay with total peace of mind.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E7E5E4] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-[#1C1917]">Max Price per Night:</span>
          <input
            type="range"
            min={500}
            max={5000}
            step={250}
            value={maxPriceFilter}
            onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
            className="accent-[#1B4332]"
          />
          <span className="font-bold text-[#1B4332] text-sm">₹{maxPriceFilter}</span>
        </div>

        <div className="text-stone-500 font-medium">
          Showing {filteredStays.length} verified accommodations
        </div>
      </div>

      {/* Stays Grid & Selected Details Modal/Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Stays List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredStays.map((stay) => (
              <div
                key={stay.id}
                onClick={() => setSelectedStay(stay)}
                className={`bg-white rounded-xl border-2 overflow-hidden shadow-xs cursor-pointer transition-all flex flex-col justify-between ${
                  selectedStay?.id === stay.id
                    ? 'border-[#1B4332] ring-2 ring-[#1B4332]/20'
                    : 'border-[#E7E5E4] hover:border-stone-400'
                }`}
              >
                <div className="relative h-48 bg-stone-200">
                  <img src={stay.photos[0]} alt={stay.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-[#1C1917]/80 text-white px-2.5 py-1 rounded text-[10px] font-bold">
                    {stay.type}
                  </div>
                  {stay.isPartner && (
                    <div className="absolute top-3 right-3 bg-emerald-700 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                      Partner Visibility
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-[#1B4332] text-white px-2.5 py-1 rounded text-xs font-bold shadow-xs">
                    ₹{stay.pricePerNight} / night
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-[#1C1917] text-base">{stay.name}</h3>
                    <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">{stay.address}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#E7E5E4] text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-800">{stay.cleanlinessScore}</span>
                      <TrustBadge level={stay.confidenceLevel} verifiedCount={stay.verifiedCount} showDetails={false} />
                    </div>

                    <div className="bg-emerald-50 text-[#1B4332] p-2 rounded text-[11px] font-medium border border-emerald-200">
                      {stay.safetyTag}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Column: Full Selected Stay Detail Panel */}
        <div>
          {selectedStay ? (
            <div className="bg-white p-6 rounded-xl border border-[#E7E5E4] space-y-6 shadow-xs sticky top-24">
              <div className="border-b border-[#E7E5E4] pb-4">
                <span className="text-xs font-bold text-[#1B4332] uppercase tracking-wide">{selectedStay.type}</span>
                <h2 className="text-xl font-bold text-[#1C1917] mt-0.5">{selectedStay.name}</h2>
                <p className="text-xs text-stone-500 mt-1">{selectedStay.address}</p>
                <div className="flex items-baseline space-x-2 mt-2">
                  <span className="text-2xl font-extrabold text-[#1B4332]">₹{selectedStay.pricePerNight}</span>
                  <span className="text-xs text-stone-500">per night (verified no hidden tax)</span>
                </div>
              </div>

              {/* Bathroom & Cleanliness Report */}
              <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E7E5E4] space-y-2 text-xs">
                <h4 className="font-bold text-[#1C1917] flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-[#1B4332]" />
                  Verified Bathroom Hygiene & Hot Water
                </h4>
                <p className="text-stone-700 leading-relaxed">{selectedStay.bathroomInfo}</p>
              </div>

              {/* Wi-Fi & Parking Audit */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center space-x-2 text-stone-700">
                  <Wifi className="w-4 h-4 text-[#1B4332]" />
                  <div><strong>Wi-Fi Speed:</strong> {selectedStay.wifiSpeed}</div>
                </div>
                <div className="flex items-center space-x-2 text-stone-700">
                  <Car className="w-4 h-4 text-[#1B4332]" />
                  <div><strong>Parking Rules:</strong> {selectedStay.parkingRules}</div>
                </div>
                <div className="flex items-center space-x-2 text-stone-700">
                  <Clock className="w-4 h-4 text-[#1B4332]" />
                  <div><strong>Check-in/Out:</strong> {selectedStay.checkInOut}</div>
                </div>
              </div>

              {/* Verified Observations */}
              <div className="space-y-2 text-xs border-t border-[#E7E5E4] pt-4">
                <h4 className="font-bold text-[#1C1917]">Recent Traveller Observations</h4>
                <ul className="space-y-1.5 text-stone-600 list-disc list-inside">
                  {selectedStay.recentObservations.map((obs, i) => (
                    <li key={i}>{obs}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onNavigate('video')}
                className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white py-2.5 rounded-lg text-xs font-bold transition-colors"
              >
                Watch Video Room Proof →
              </button>
            </div>
          ) : (
            <div className="bg-[#FAF9F6] p-8 text-center rounded-xl border border-[#E7E5E4] text-xs text-stone-500">
              Select an accommodation to inspect verified evidence.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
