import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  ArrowRight,
  Clock
} from 'lucide-react';
import type { Accommodation, FoodItem, TransportRoute, Destination } from '../../types/travel';

interface LocalRecommendationsProps {
  stays: Accommodation[];
  foodItems: FoodItem[];
  routes: TransportRoute[];
  destinations: Destination[];
  onNavigate: (view: string) => void;
}

type RecTab = 'recommended' | 'transport' | 'food' | 'stay' | 'activities' | 'essentials';

export const LocalRecommendations: React.FC<LocalRecommendationsProps> = ({
  stays,
  foodItems,
  routes,
  destinations,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<RecTab>('recommended');

  const tabs: { id: RecTab; label: string }[] = [
    { id: 'recommended', label: 'Top Recommended' },
    { id: 'transport', label: 'Local Transit' },
    { id: 'food', label: 'Culinary Messes' },
    { id: 'stay', label: 'Verified Stays' },
    { id: 'activities', label: 'Experiences' },
    { id: 'essentials', label: 'Essentials' }
  ];

  return (
    <section className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7E5E4] pb-4">
        <div>
          <span className="bg-emerald-100 text-[#1B4332] font-black text-[10px] uppercase px-2.5 py-0.5 rounded border border-emerald-300 tracking-wider">
            Curated For Travelers
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1C1917] mt-1.5">
            LocalLens Recommendations
          </h2>
          <p className="text-xs text-stone-500 font-medium mt-0.5">
            Real ground picks verified for fair pricing, cleanliness, and authentic local flavor.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('stays')}
          className="text-xs font-black text-[#1B4332] hover:text-[#265e46] flex items-center space-x-1 shrink-0 w-fit"
        >
          <span>View All Recommendations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Category Filter Tabs (Inspired by EaseMyTrip Exclusive Offers tabs) */}
      <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
              activeTab === tab.id
                ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-900 border-[#E7E5E4] hover:bg-stone-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Recommended & Stays Cards */}
        {(activeTab === 'recommended' || activeTab === 'stay') && stays.slice(0, 3).map((stay) => (
          <div
            key={stay.id}
            onClick={() => onNavigate('stays')}
            className="group bg-white rounded-3xl border border-[#E7E5E4] overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-stone-200 overflow-hidden">
                <img 
                  src={stay.photos[0]} 
                  alt={stay.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {stay.type}
                </div>
                <div className="absolute bottom-3 left-3 bg-[#1B4332] text-white text-xs font-black px-2.5 py-1 rounded-lg flex items-center space-x-1 shadow-xs">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{stay.rating}</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 text-[#1B4332] font-black text-xs px-2.5 py-1 rounded-lg shadow-xs">
                  ₹{stay.pricePerNight} / night
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-bold text-[#1C1917] text-sm group-hover:text-[#1B4332] transition-colors line-clamp-1">
                  {stay.name}
                </h3>
                <p className="text-xs text-stone-500 truncate flex items-center">
                  <MapPin className="w-3 h-3 mr-1 text-stone-400 shrink-0" />
                  <span>{stay.address}</span>
                </p>
                <div className="text-[11px] text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md font-bold inline-block border border-emerald-200">
                  {stay.cleanlinessScore}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>{stay.verifiedCount} verified reviews</span>
              <span className="font-bold text-[#1B4332] flex items-center">
                Inspect <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        ))}

        {/* Transport Recommendations */}
        {(activeTab === 'recommended' || activeTab === 'transport') && routes.slice(0, 2).map((route) => {
          const opt = route.options[0];
          return (
            <div
              key={route.id}
              onClick={() => onNavigate('transport')}
              className="bg-white rounded-3xl border border-[#E7E5E4] p-5 space-y-3 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-100 text-[#1B4332] text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    {opt?.transportType || 'Local Transit'}
                  </span>
                  <span className="font-black text-base text-[#1B4332]">{opt?.approxFare || '₹15'}</span>
                </div>

                <h3 className="font-bold text-stone-900 text-sm">
                  {route.origin.split('/')[0]} → {route.destination.split('(')[0]}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2">
                  {opt?.practicalNotes?.[0] || 'Direct connection running every 5-10 minutes with verified ticket prices.'}
                </p>
                
                <div className="text-[11px] text-stone-500 flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-stone-400" />
                  <span>Approx Duration: {opt?.approxDuration || '25 mins'}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="text-emerald-700 font-bold">✓ High Confidence</span>
                <span className="font-bold text-[#1B4332] flex items-center">
                  Route Steps <ArrowRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}

        {/* Food Recommendations */}
        {(activeTab === 'recommended' || activeTab === 'food') && foodItems.slice(0, 3).map((food) => (
          <div
            key={food.id}
            onClick={() => onNavigate('stays')}
            className="group bg-white rounded-3xl border border-[#E7E5E4] overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-stone-200 overflow-hidden">
                <img 
                  src={food.image} 
                  alt={food.dishName} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {food.cuisine}
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 text-[#1B4332] font-black text-xs px-2.5 py-1 rounded-lg shadow-xs">
                  {food.priceRange.split('(')[0]}
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <h3 className="font-bold text-[#1C1917] text-sm group-hover:text-[#1B4332] transition-colors line-clamp-1">
                  {food.dishName}
                </h3>
                <p className="text-xs text-stone-500 truncate">{food.restaurantName}</p>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{food.description}</p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="text-emerald-800 font-semibold">{food.verifiedCount} verified meals</span>
              <span className="font-bold text-[#1B4332] flex items-center">
                Food Guide <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        ))}

        {/* Activities / Experiences */}
        {(activeTab === 'activities' || activeTab === 'recommended') && destinations[1]?.attractions.slice(0, 2).map((att) => (
          <div
            key={att.id}
            onClick={() => onNavigate('destination')}
            className="bg-white rounded-3xl border border-[#E7E5E4] p-5 space-y-3 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-purple-100 text-purple-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  {att.category}
                </span>
                <span className="font-black text-xs text-[#1B4332]">{att.entryFee}</span>
              </div>
              <h3 className="font-bold text-stone-900 text-sm">{att.name}</h3>
              <p className="text-xs text-stone-600 line-clamp-2">{att.description}</p>
              <div className="text-[11px] text-stone-500">
                Best Timing: <strong>{att.bestTimeOfDay}</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Time: {att.timeRequired}</span>
              <span className="font-bold text-[#1B4332] flex items-center">
                Explore <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        ))}

      </div>

    </section>
  );
};
