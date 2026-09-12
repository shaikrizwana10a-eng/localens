import React from 'react';
import { 
  MapPin, 
  ArrowRight, 
  Sparkles,
  Wallet
} from 'lucide-react';
import type { Destination } from '../../types/travel';

interface ExploreDestinationsProps {
  destinations: Destination[];
  onSelectDestination: (destId: string) => void;
  onNavigate: (view: string) => void;
}

export const ExploreDestinations: React.FC<ExploreDestinationsProps> = ({
  destinations,
  onSelectDestination,
  onNavigate
}) => {
  const handleDestinationClick = (destId: string) => {
    onSelectDestination(destId);
    onNavigate('destination');
  };

  return (
    <section className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7E5E4] pb-4">
        <div>
          <span className="bg-emerald-100 text-[#1B4332] font-black text-[10px] uppercase px-2.5 py-0.5 rounded border border-emerald-300 tracking-wider">
            Curated Hubs
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1C1917] mt-1.5">
            Explore Like a Local
          </h2>
          <p className="text-xs text-stone-500 font-medium mt-0.5">
            Discover destinations through genuine ground wisdom, avoiding tourist traps and taxi surge pricing.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('destination')}
          className="text-xs font-black text-[#1B4332] hover:text-[#265e46] flex items-center space-x-1 shrink-0 w-fit"
        >
          <span>View All {destinations.length} Hubs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of Destination Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            onClick={() => handleDestinationClick(dest.id)}
            className="group bg-white rounded-3xl border border-[#E7E5E4] overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Image with Gradient Overlay */}
              <div className="relative h-52 w-full bg-stone-200 overflow-hidden">
                <img 
                  src={dest.heroImage} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* State Tag */}
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {dest.state}
                </span>

                {/* Crowd Status Badge */}
                <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md shadow-xs ${
                  dest.crowdStatus === 'Low Crowd'
                    ? 'bg-emerald-600/90 text-white'
                    : dest.crowdStatus === 'Moderate Crowd'
                    ? 'bg-amber-600/90 text-white'
                    : 'bg-rose-600/90 text-white'
                }`}>
                  {dest.crowdStatus}
                </span>

                {/* Name & Tagline Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-xl font-black tracking-tight drop-shadow-sm flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-emerald-400 shrink-0" />
                    <span>{dest.name}</span>
                  </h3>
                  <p className="text-xs text-stone-200 line-clamp-1 drop-shadow-xs mt-0.5">
                    {dest.tagline}
                  </p>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>

                {/* Highlights Pill Info */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-stone-100">
                  <div className="bg-[#FAF9F6] p-2 rounded-xl border border-stone-200">
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Budget</span>
                    <span className="font-extrabold text-[#1B4332] flex items-center">
                      <Wallet className="w-3 h-3 mr-1 text-emerald-600" />
                      {dest.avgDailyBudget.split('–')[0] || '₹1,800/day'}
                    </span>
                  </div>

                  <div className="bg-[#FAF9F6] p-2 rounded-xl border border-stone-200">
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Verified Tips</span>
                    <span className="font-extrabold text-stone-900 flex items-center">
                      <Sparkles className="w-3 h-3 mr-1 text-amber-500" />
                      {dest.communityObservations?.length || 3}+ local insights
                    </span>
                  </div>
                </div>

                {/* Regional Food Specialties */}
                {dest.foodSpecialties && dest.foodSpecialties.length > 0 && (
                  <div className="pt-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                      Must-Try Specialties:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {dest.foodSpecialties.slice(0, 2).map((food, fIdx) => (
                        <span key={fIdx} className="bg-stone-100 text-stone-700 text-[10px] px-2 py-0.5 rounded-md font-medium">
                          {food.split('(')[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Card CTA Footer */}
            <div className="p-5 pt-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDestinationClick(dest.id);
                }}
                className="w-full py-2.5 bg-[#FAF9F6] group-hover:bg-[#1B4332] group-hover:text-white text-stone-800 rounded-xl text-xs font-bold border border-[#E7E5E4] group-hover:border-[#1B4332] transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Explore Destination</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
