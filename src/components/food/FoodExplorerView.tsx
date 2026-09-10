import React, { useState } from 'react';
import { Utensils, Plus } from 'lucide-react';
import type { FoodItem } from '../../types/travel';
import { TrustBadge, FreshnessTag } from '../common/TrustBadge';

interface FoodExplorerViewProps {
  foodItems: FoodItem[];
  onNavigate: (view: string) => void;
}

export const FoodExplorerView: React.FC<FoodExplorerViewProps> = ({ foodItems, onNavigate }) => {
  const [filterVeg, setFilterVeg] = useState<boolean | null>(null);

  const filteredItems = foodItems.filter((item) => {
    if (filterVeg === true) return item.isVeg === true;
    if (filterVeg === false) return item.isVeg === false;
    return true;
  });

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#1C1917] text-white p-8 rounded-2xl border border-stone-800 space-y-3">
        <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
          <Utensils className="w-3.5 h-3.5" />
          <span>Local Cuisine & Price Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Where to Eat & What Prices to Expect
        </h1>
        <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
          Authentic regional dishes cataloged with community-reported price bands, hygiene notes, and recent price verifications.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E7E5E4] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-[#1C1917] mr-2">Filter Dietary:</span>
          <button
            onClick={() => setFilterVeg(null)}
            className={`px-3 py-1 rounded-md font-medium ${
              filterVeg === null ? 'bg-[#1B4332] text-white' : 'bg-[#FAF9F6] text-stone-700 hover:bg-stone-200'
            }`}
          >
            All Dishes
          </button>
          <button
            onClick={() => setFilterVeg(true)}
            className={`px-3 py-1 rounded-md font-medium ${
              filterVeg === true ? 'bg-emerald-700 text-white' : 'bg-[#FAF9F6] text-stone-700 hover:bg-stone-200'
            }`}
          >
            🟢 Pure Veg Only
          </button>
          <button
            onClick={() => setFilterVeg(false)}
            className={`px-3 py-1 rounded-md font-medium ${
              filterVeg === false ? 'bg-red-800 text-white' : 'bg-[#FAF9F6] text-stone-700 hover:bg-stone-200'
            }`}
          >
            🔴 Non-Veg Specialties
          </button>
        </div>

        <button
          onClick={() => onNavigate('missions')}
          className="bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1 hover:bg-amber-200"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Report Meal Price (Earn ₹20)</span>
        </button>
      </div>

      {/* Dishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-[#E7E5E4] overflow-hidden shadow-xs space-y-4 p-5 flex flex-col justify-between">
            <div className="flex items-start space-x-4">
              <img src={item.image} alt={item.dishName} className="w-28 h-28 rounded-lg object-cover shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    item.isVeg ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.isVeg ? 'PURE VEG' : 'NON-VEG'}
                  </span>
                  <TrustBadge level={item.confidenceLevel} verifiedCount={item.verifiedCount} showDetails={false} />
                </div>

                <h3 className="font-bold text-[#1C1917] text-base">{item.dishName}</h3>
                <p className="text-xs text-stone-500 font-semibold">{item.restaurantName}</p>
                <p className="text-xs text-stone-600 line-clamp-2">{item.description}</p>
              </div>
            </div>

            <div className="bg-[#FAF9F6] p-3 rounded-lg border border-[#E7E5E4] flex flex-wrap items-center justify-between text-xs gap-2">
              <div>
                <span className="text-stone-500 font-medium">Verified Price Band: </span>
                <span className="font-extrabold text-[#1B4332] text-sm ml-1">{item.priceRange}</span>
              </div>

              <div className="flex items-center space-x-2">
                <FreshnessTag daysAgo={item.freshnessDaysAgo} />
                <span className="text-stone-500 font-medium">({item.verifiedCount} confirmations)</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
