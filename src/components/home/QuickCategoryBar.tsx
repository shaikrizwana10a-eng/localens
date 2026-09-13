import React from 'react';
import { 
  Compass, 
  Bus, 
  Hotel, 
  Utensils, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Share2
} from 'lucide-react';

interface QuickCategoryBarProps {
  onNavigate: (view: string) => void;
}

export const QuickCategoryBar: React.FC<QuickCategoryBarProps> = ({ onNavigate }) => {
  const categories = [
    { label: 'Explore Places', icon: <Compass className="w-4 h-4 text-[#1B4332]" />, view: 'destination', highlight: false },
    { label: 'Transport', icon: <Bus className="w-4 h-4 text-[#1B4332]" />, view: 'transport', highlight: false },
    { label: 'Stays', icon: <Hotel className="w-4 h-4 text-[#1B4332]" />, view: 'stays', highlight: false },
    { label: 'Food', icon: <Utensils className="w-4 h-4 text-[#1B4332]" />, view: 'stays', highlight: false },
    { label: 'AI Planner', icon: <Sparkles className="w-4 h-4 text-emerald-600" />, view: 'planner', highlight: true },
    { label: 'Verification', icon: <ShieldCheck className="w-4 h-4 text-[#1B4332]" />, view: 'verification', highlight: false },
    { label: 'Local Tips', icon: <MapPin className="w-4 h-4 text-[#1B4332]" />, view: 'explore-knowledge', highlight: false },
    { label: 'Share What You Know', icon: <Share2 className="w-4 h-4 text-emerald-600" />, view: 'share-knowledge', highlight: false }
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E7E5E4] p-3 sm:p-4 shadow-xs">
      <div className="grid grid-cols-4 sm:flex sm:items-center sm:justify-between gap-1.5 sm:gap-2 sm:overflow-x-auto scrollbar-none sm:pb-0">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onNavigate(cat.view)}
            className={`flex flex-col sm:flex-row items-center sm:space-x-2 px-2 sm:px-3.5 py-3 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold whitespace-nowrap transition-all shrink-0 border mobile-touch-target ${
              cat.highlight
                ? 'bg-emerald-50 text-[#1B4332] border-emerald-300 hover:bg-emerald-100 shadow-2xs'
                : 'bg-[#FAF9F6] text-stone-700 border-[#E7E5E4] hover:bg-stone-100 hover:border-stone-300'
            }`}
          >
            <span>{cat.icon}</span>
            <span className="mt-1 sm:mt-0 text-center leading-tight">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
