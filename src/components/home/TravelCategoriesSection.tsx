import React, { useState } from 'react';
import { 
  Bus, 
  Hotel, 
  Utensils, 
  MapPin, 
  Star, 
  ArrowRight, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import type { 
  TransportRoute, 
  Accommodation, 
  FoodItem, 
  Destination 
} from '../../types/travel';

interface TravelCategoriesSectionProps {
  routes: TransportRoute[];
  stays: Accommodation[];
  foodItems: FoodItem[];
  destinations: Destination[];
  onNavigate: (view: string) => void;
}

type TravelTab = 'all' | 'transport' | 'food' | 'stay' | 'places' | 'essentials';

export const TravelCategoriesSection: React.FC<TravelCategoriesSectionProps> = ({
  routes,
  stays,
  foodItems,
  destinations,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<TravelTab>('all');

  const tabs: { id: TravelTab; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Categories', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'transport', label: 'Verified Transport', icon: <Bus className="w-3.5 h-3.5" /> },
    { id: 'stay', label: 'Vetted Stays', icon: <Hotel className="w-3.5 h-3.5" /> },
    { id: 'food', label: 'Authentic Food', icon: <Utensils className="w-3.5 h-3.5" /> },
    { id: 'places', label: 'Attractions & Hidden Gems', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'essentials', label: 'Local Essentials', icon: <ShieldCheck className="w-3.5 h-3.5" /> }
  ];

  return (
    <section className="bg-[#FAF9F6] rounded-2xl sm:rounded-3xl border border-[#E7E5E4] p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-[#E7E5E4] pb-3 sm:pb-4">
        <div>
          <span className="bg-emerald-100 text-[#1B4332] font-black text-[10px] uppercase px-2.5 py-0.5 rounded border border-emerald-300 tracking-wider">
            Comprehensive Directory
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1C1917] mt-1.5">
            Everything You Need for the Journey
          </h2>
          <p className="text-xs text-stone-500 font-medium mt-0.5">
            No sponsored placement. Verified bus steps, clean verified dharamshalas & hotels, and authentic regional meals.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('transport')}
          className="text-xs font-black text-[#1B4332] hover:text-[#265e46] flex items-center space-x-1 shrink-0 w-fit"
        >
          <span>Explore Detailed Directory</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id)}
            className={`px-3 sm:px-4 py-2.5 sm:py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 border mobile-touch-target ${
              activeTab === t.id
                ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-900 border-[#E7E5E4] hover:bg-stone-50'
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Transport Cards (Visible on 'all' or 'transport') */}
        {(activeTab === 'all' || activeTab === 'transport') && routes.slice(0, 2).map((route) => {
          const opt = route.options[0];
          return (
            <div
              key={route.id}
              onClick={() => onNavigate('transport')}
              className="bg-white rounded-2xl border border-[#E7E5E4] p-5 space-y-3 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-100 text-[#1B4332] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                    {opt?.transportType || 'Transit'}
                  </span>
                  <span className="font-extrabold text-sm text-[#1B4332]">{opt?.approxFare || '₹25'}</span>
                </div>

                <h4 className="font-black text-stone-900 text-sm flex items-center">
                  <Bus className="w-4 h-4 mr-1.5 text-[#1B4332] shrink-0" />
                  <span>{route.origin.split('/')[0]} → {route.destination.split('(')[0]}</span>
                </h4>

                <p className="text-xs text-stone-500 line-clamp-2">
                  {opt?.practicalNotes?.[0] || 'High frequency route with verified conductor fare.'}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                <span>{opt?.verifiedCount || 42} verified reports</span>
                <span className="font-bold text-[#1B4332] flex items-center">
                  View Steps <ArrowRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}

        {/* Stays Cards (Visible on 'all' or 'stay') */}
        {(activeTab === 'all' || activeTab === 'stay') && stays.slice(0, 2).map((stay) => (
          <div
            key={stay.id}
            onClick={() => onNavigate('stays')}
            className="bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="h-36 w-full bg-stone-200 overflow-hidden relative">
                <img 
                  src={stay.photos[0]} 
                  alt={stay.name} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
                <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  ₹{stay.pricePerNight}/night
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-emerald-800 font-bold uppercase">{stay.type}</span>
                  <span className="text-[11px] font-black text-amber-900 flex items-center">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                    {stay.rating}
                  </span>
                </div>
                <h4 className="font-black text-stone-900 text-sm truncate">{stay.name}</h4>
                <p className="text-xs text-stone-500 truncate">{stay.address}</p>
                <div className="text-[11px] text-emerald-900 font-bold bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                  {stay.cleanlinessScore}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <span>{stay.verifiedCount} verified stays</span>
              <span className="font-bold text-[#1B4332] flex items-center">
                Inspect Stay <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        ))}

        {/* Food Cards (Visible on 'all' or 'food') */}
        {(activeTab === 'all' || activeTab === 'food') && foodItems.slice(0, 2).map((food) => (
          <div
            key={food.id}
            onClick={() => onNavigate('stays')}
            className="bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="h-36 w-full bg-stone-200 overflow-hidden relative">
                <img 
                  src={food.image} 
                  alt={food.dishName} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
                <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {food.priceRange.split('(')[0]}
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <div className="flex items-center space-x-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${food.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                  <span className="text-[10px] text-stone-500 font-bold uppercase">{food.cuisine}</span>
                </div>
                <h4 className="font-black text-stone-900 text-sm line-clamp-1">{food.dishName}</h4>
                <p className="text-xs text-stone-500 truncate">{food.restaurantName}</p>
                <p className="text-xs text-stone-600 line-clamp-2">{food.description}</p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <span>Verified Food Spot</span>
              <span className="font-bold text-[#1B4332] flex items-center">
                Food Guide <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        ))}

        {/* Attractions / Places Cards */}
        {(activeTab === 'places' || activeTab === 'all') && destinations[0]?.attractions.slice(0, 1).map((att) => (
          <div
            key={att.id}
            onClick={() => onNavigate('destination')}
            className="bg-white rounded-2xl border border-[#E7E5E4] p-5 space-y-3 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-amber-100 text-amber-950 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                  {att.category}
                </span>
                <span className="font-extrabold text-xs text-[#1B4332]">{att.entryFee}</span>
              </div>
              <h4 className="font-black text-stone-900 text-sm">{att.name}</h4>
              <p className="text-xs text-stone-600 line-clamp-2">{att.description}</p>
              <div className="text-[11px] text-stone-500">
                Best Time: <strong>{att.bestTimeOfDay}</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <span>Time: {att.timeRequired}</span>
              <span className="font-bold text-[#1B4332] flex items-center">
                Details <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        ))}

        {/* Essentials Cards */}
        {activeTab === 'essentials' && (
          <div className="col-span-full bg-white p-6 rounded-2xl border border-[#E7E5E4] space-y-3">
            <h4 className="font-black text-stone-900 text-sm flex items-center">
              <ShieldCheck className="w-4 h-4 text-[#1B4332] mr-2" />
              Official Traveler Helplines & Ground Guidance
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#FAF9F6] p-3 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">Tourist Helpline</span>
                <span className="font-extrabold text-stone-900 text-sm">Call 1363 (24x7 Free)</span>
              </div>
              <div className="bg-[#FAF9F6] p-3 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">Emergency Services</span>
                <span className="font-extrabold text-stone-900 text-sm">Dial 112 (Police & Medical)</span>
              </div>
              <div className="bg-[#FAF9F6] p-3 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">Contactless Transit</span>
                <span className="font-extrabold text-stone-900 text-sm">UPI / QR Transit passes</span>
              </div>
            </div>
          </div>
        )}

      </div>

    </section>
  );
};
