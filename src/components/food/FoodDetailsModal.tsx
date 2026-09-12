import React, { useState } from 'react';
import { 
  X, 
  Utensils, 
  MapPin, 
  Clock, 
  Car, 
  CreditCard, 
  Flame, 
  AlertTriangle, 
  Share2, 
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import type { FoodItem } from '../../types/travel';
import { SourceBadge } from '../common/SourceBadge';
import { OutdatedReportModal } from '../knowledge/OutdatedReportModal';
import { useLocalKnowledge } from '../../context/LocalKnowledgeContext';

interface FoodDetailsModalProps {
  foodItem: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
  onShareKnowledgeForFood?: (restaurantName: string) => void;
}

export const FoodDetailsModal: React.FC<FoodDetailsModalProps> = ({
  foodItem,
  isOpen,
  onClose,
  onShareKnowledgeForFood
}) => {
  const { submitOutdatedReport } = useLocalKnowledge();
  const [showOutdatedModal, setShowOutdatedModal] = useState(false);

  if (!isOpen || !foodItem) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div 
          className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6 text-stone-900 relative flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Banner with Food Photo */}
          <div className="relative h-52 sm:h-64 bg-stone-900 shrink-0 overflow-hidden">
            <img 
              src={foodItem.image} 
              alt={foodItem.dishName}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer backdrop-blur-xs"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-5 right-5 space-y-2 text-white">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  foodItem.isVeg ? 'bg-emerald-600 text-white' : 'bg-red-700 text-white'
                }`}>
                  {foodItem.isVeg ? 'PURE VEGETARIAN' : 'NON-VEGETARIAN'}
                </span>

                <SourceBadge
                  provenance={foodItem.provenance}
                  sourceType={foodItem.provenance?.source_type || 'LOCAL_LENS'}
                  verificationStatus={foodItem.provenance?.verification_status || 'VERIFIED'}
                  hasEvidence={foodItem.provenance?.evidence_available ?? true}
                  size="sm"
                />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {foodItem.dishName}
              </h2>

              <p className="text-xs text-stone-300 flex items-center">
                <Utensils className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0" />
                <strong className="text-white mr-1">{foodItem.restaurantName}</strong>
                <span>• {foodItem.cuisine}</span>
              </p>
            </div>
          </div>

          {/* Modal Scrollable Content */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1 text-xs">
            
            {/* Price & Provenance Overview */}
            <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-stone-400 font-extrabold uppercase text-[10px] block">Verified Price Range</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-800">
                    {foodItem.priceRange}
                  </span>
                  <span className="text-stone-500 font-medium">per serving / plate</span>
                </div>
              </div>

              {foodItem.provenance?.verified_at && (
                <div className="text-right">
                  <span className="text-stone-400 font-bold uppercase text-[10px] block">Last Audited</span>
                  <span className="font-bold text-stone-800 flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-emerald-700" />
                    {foodItem.provenance.verified_at}
                  </span>
                </div>
              )}
            </div>

            {/* Description & Taste Notes */}
            <div className="space-y-1.5">
              <h3 className="font-black text-stone-900 text-sm uppercase tracking-wider">
                Culinary Description & Origin
              </h3>
              <p className="text-stone-700 leading-relaxed text-xs">
                {foodItem.description}
              </p>
            </div>

            {/* Location & Opening Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center space-x-2 text-stone-900 font-bold">
                  <MapPin className="w-4 h-4 text-[#1B4332]" />
                  <span>Restaurant Location</span>
                </div>
                <div className="text-stone-600 pl-6">{foodItem.address || `${foodItem.restaurantName}, City Center`}</div>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center space-x-2 text-stone-900 font-bold">
                  <Clock className="w-4 h-4 text-[#1B4332]" />
                  <span>Serving Hours</span>
                </div>
                <div className="text-stone-600 pl-6">{foodItem.openingHours || '11:30 AM – 3:30 PM, 7:00 PM – 10:00 PM'}</div>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center space-x-2 text-stone-900 font-bold">
                  <Car className="w-4 h-4 text-[#1B4332]" />
                  <span>Parking Facility</span>
                </div>
                <div className="text-stone-600 pl-6">
                  {foodItem.parkingAvailable ? 'Customer two-wheeler & car parking available' : 'Street parking / Nearby paid parking'}
                </div>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center space-x-2 text-stone-900 font-bold">
                  <CreditCard className="w-4 h-4 text-[#1B4332]" />
                  <span>Payment Methods</span>
                </div>
                <div className="text-stone-600 pl-6">
                  {foodItem.paymentOptions?.join(', ') || 'UPI (PhonePe/GPay), Cash'}
                </div>
              </div>
            </div>

            {/* Popular Dishes & Local Specialties */}
            {foodItem.popularDishes && foodItem.popularDishes.length > 0 && (
              <div className="space-y-2">
                <span className="text-stone-400 font-extrabold uppercase text-[10px] block">
                  Top Recommended Orders by Local Scouts
                </span>
                <div className="flex flex-wrap gap-2">
                  {foodItem.popularDishes.map((dish, i) => (
                    <span key={i} className="bg-amber-50 border border-amber-300 text-amber-950 px-3 py-1 rounded-lg font-bold flex items-center">
                      <Flame className="w-3.5 h-3.5 mr-1 text-amber-600" />
                      {dish}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Local Dining Tip */}
            <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl space-y-1.5">
              <h4 className="font-bold text-emerald-950 flex items-center text-xs">
                <Sparkles className="w-4 h-4 mr-1.5 text-emerald-700" />
                Local Food Scout Recommendation
              </h4>
              <p className="text-stone-700 leading-relaxed">
                Best time to visit is before 1:00 PM for lunch to get freshly steamed rice and avoid afternoon peak queues.
              </p>
            </div>

            {/* External Reference Disclaimer if Google Maps */}
            {foodItem.provenance?.source_type === 'GOOGLE_MAPS' && (
              <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-xl text-sky-950 flex items-start space-x-2">
                <Info className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>External Reference:</strong> Menu items and location are referenced from Google Maps Platform. Physical kitchen hygiene and exact pricing are pending Local Scout audit.
                </p>
              </div>
            )}

          </div>

          {/* Modal Action Bar */}
          <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <button
              onClick={() => setShowOutdatedModal(true)}
              className="text-red-700 hover:text-red-900 text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Report Outdated</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  onClose();
                  if (onShareKnowledgeForFood) {
                    onShareKnowledgeForFood(foodItem.restaurantName);
                  }
                }}
                className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Share Local Food Information</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Outdated Report Modal */}
      {showOutdatedModal && (
        <OutdatedReportModal
          targetId={foodItem.id}
          targetTitle={`${foodItem.dishName} at ${foodItem.restaurantName}`}
          isOpen={showOutdatedModal}
          onClose={() => setShowOutdatedModal(false)}
          onSubmitReport={(rep) => {
            submitOutdatedReport({
              targetId: rep.targetId,
              targetTitle: rep.targetTitle,
              reasonCategory: rep.reasonCategory,
              notes: rep.notes
            });
            setShowOutdatedModal(false);
          }}
        />
      )}
    </>
  );
};
