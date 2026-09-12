import React, { useState } from 'react';
import { 
  Utensils, 
  Plus, 
  ChevronRight, 
  AlertTriangle, 
  Share2
} from 'lucide-react';
import type { FoodItem } from '../../types/travel';
import { FreshnessTag } from '../common/TrustBadge';
import { SourceBadge } from '../common/SourceBadge';
import { FoodDetailsModal } from './FoodDetailsModal';
import { OutdatedReportModal } from '../knowledge/OutdatedReportModal';
import { useLocalKnowledge } from '../../context/LocalKnowledgeContext';

interface FoodExplorerViewProps {
  foodItems: FoodItem[];
  onNavigate: (view: string) => void;
}

export const FoodExplorerView: React.FC<FoodExplorerViewProps> = ({ foodItems, onNavigate }) => {
  const { submitOutdatedReport } = useLocalKnowledge();
  const [filterVeg, setFilterVeg] = useState<boolean | null>(null);
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(null);
  const [outdatedTargetFood, setOutdatedTargetFood] = useState<FoodItem | null>(null);

  const filteredItems = foodItems.filter((item) => {
    if (filterVeg === true) return item.isVeg === true;
    if (filterVeg === false) return item.isVeg === false;
    return true;
  });

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#1C1917] text-white p-6 sm:p-8 rounded-3xl border border-stone-800 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-emerald-700">
            <Utensils className="w-3.5 h-3.5" />
            <span>Local Cuisine & Price Intelligence</span>
          </div>

          <button
            onClick={() => onNavigate('share-knowledge')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5 shadow-xs cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Food Info</span>
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Where to Eat & What Prices to Expect
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Authentic regional dishes cataloged with community-reported price bands, hygiene notes, and recent price verifications. Every eatery listing distinguishes Google reference data from ground-truth local scout verification.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-extrabold text-stone-900 mr-1">Filter Dietary:</span>
          <button
            onClick={() => setFilterVeg(null)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterVeg === null ? 'bg-[#1B4332] text-white shadow-xs' : 'bg-[#FAF9F6] text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            All Dishes
          </button>
          <button
            onClick={() => setFilterVeg(true)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterVeg === true ? 'bg-emerald-700 text-white shadow-xs' : 'bg-[#FAF9F6] text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            🟢 Pure Veg Only
          </button>
          <button
            onClick={() => setFilterVeg(false)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterVeg === false ? 'bg-red-800 text-white shadow-xs' : 'bg-[#FAF9F6] text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            🔴 Non-Veg Specialties
          </button>
        </div>

        <button
          onClick={() => onNavigate('share-knowledge')}
          className="bg-amber-100 text-amber-900 border border-amber-300 px-3.5 py-2 rounded-xl font-extrabold flex items-center space-x-1.5 hover:bg-amber-200 cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Report Meal Price & Tips</span>
        </button>
      </div>

      {/* Dishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedFoodItem(item)}
            className="bg-white rounded-2xl border-2 border-stone-200 hover:border-[#1B4332] overflow-hidden shadow-xs hover:shadow-md transition-all space-y-4 p-5 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-start space-x-4">
              <img 
                src={item.image} 
                alt={item.dishName} 
                className="w-28 h-28 rounded-xl object-cover shrink-0 border border-stone-200 group-hover:scale-102 transition-transform" 
              />
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                    item.isVeg ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.isVeg ? 'PURE VEG' : 'NON-VEG'}
                  </span>

                  {/* Standardized SourceBadge */}
                  <SourceBadge
                    provenance={item.provenance}
                    sourceType={item.provenance?.source_type || 'LOCAL_LENS'}
                    verificationStatus={item.provenance?.verification_status || 'VERIFIED'}
                    hasEvidence={item.provenance?.evidence_available ?? true}
                    size="sm"
                  />
                </div>

                <h3 className="font-extrabold text-stone-900 text-base leading-snug truncate group-hover:text-[#1B4332] transition-colors">
                  {item.dishName}
                </h3>
                <p className="text-xs text-stone-500 font-bold flex items-center">
                  <Utensils className="w-3 h-3 mr-1 text-stone-400 shrink-0" />
                  <span className="truncate">{item.restaurantName}</span>
                </p>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="bg-[#FAF9F6] p-3.5 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between text-xs gap-2">
              <div>
                <span className="text-stone-400 font-bold uppercase text-[10px]">Verified Tariff: </span>
                <span className="font-black text-emerald-800 text-sm ml-1">{item.priceRange}</span>
              </div>

              <div className="flex items-center space-x-2">
                <FreshnessTag daysAgo={item.freshnessDaysAgo} />
                <span className="text-stone-500 font-medium">({item.verifiedCount} audits)</span>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-xs">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOutdatedTargetFood(item);
                }}
                className="text-red-700 hover:text-red-900 font-bold flex items-center space-x-1 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Report Outdated</span>
              </button>

              <span className="text-[#1B4332] font-black group-hover:translate-x-0.5 transition-transform flex items-center">
                <span>View Details & Tips</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Food Details Modal */}
      {selectedFoodItem && (
        <FoodDetailsModal
          foodItem={selectedFoodItem}
          isOpen={Boolean(selectedFoodItem)}
          onClose={() => setSelectedFoodItem(null)}
          onShareKnowledgeForFood={() => onNavigate('share-knowledge')}
        />
      )}

      {/* Outdated Report Modal */}
      {outdatedTargetFood && (
        <OutdatedReportModal
          targetId={outdatedTargetFood.id}
          targetTitle={`${outdatedTargetFood.dishName} at ${outdatedTargetFood.restaurantName}`}
          isOpen={Boolean(outdatedTargetFood)}
          onClose={() => setOutdatedTargetFood(null)}
          onSubmitReport={(rep) => {
            submitOutdatedReport({
              targetId: rep.targetId,
              targetTitle: rep.targetTitle,
              reasonCategory: rep.reasonCategory,
              notes: rep.notes
            });
            setOutdatedTargetFood(null);
          }}
        />
      )}

    </div>
  );
};
