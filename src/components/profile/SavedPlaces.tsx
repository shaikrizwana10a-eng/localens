import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  MapPin, 
  Star, 
  Compass, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import type { SavedPlace, PlaceCategory } from '../../types/profile';

interface SavedPlacesProps {
  savedPlaces: SavedPlace[];
  onRemove: (savedPlaceId: string) => Promise<void>;
  onNavigate: (view: string) => void;
}

const CATEGORY_FILTERS: ('All' | PlaceCategory)[] = [
  'All',
  'Tourist Places',
  'Hotels',
  'Restaurants',
  'Transportation',
  'Shopping'
];

export const SavedPlaces: React.FC<SavedPlacesProps> = ({
  savedPlaces,
  onRemove,
  onNavigate
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | PlaceCategory>('All');
  const [removingId, setRemovingId] = useState<string | null>(null);

  const filteredPlaces = activeFilter === 'All'
    ? savedPlaces
    : savedPlaces.filter(p => p.category === activeFilter);

  const handleRemove = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRemovingId(id);
    await onRemove(id);
    setRemovingId(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5E4] pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#1C1917] flex items-center">
            <Bookmark className="w-5 h-5 mr-2 text-[#1B4332]" />
            Saved Places & Bookmarks ({savedPlaces.length})
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Your personal collection of bookmarked attractions, authentic food messes, and verified stays.
          </p>
        </div>

        {savedPlaces.length > 0 && (
          <button
            onClick={() => onNavigate('destination')}
            className="inline-flex items-center space-x-1 text-xs font-bold text-[#1B4332] hover:text-[#265e46] transition-colors"
          >
            <span>Explore more places</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      {savedPlaces.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === cat
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'bg-[#FAF9F6] text-stone-600 border border-[#E7E5E4] hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Places Grid or Empty State */}
      {filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="group bg-[#FAF9F6] rounded-xl border border-[#E7E5E4] overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Place Image */}
                <div className="relative h-44 w-full bg-stone-200 overflow-hidden">
                  <img
                    src={place.image_url}
                    alt={place.place_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    {place.category}
                  </span>

                  {/* Rating / Badge */}
                  {place.rating && (
                    <span className="absolute bottom-3 left-3 bg-[#1B4332] text-emerald-200 text-xs font-extrabold px-2 py-0.5 rounded flex items-center space-x-1 shadow-xs">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{place.rating}</span>
                    </span>
                  )}

                  {/* Remove Bookmark Button */}
                  <button
                    type="button"
                    title="Remove from saved"
                    onClick={(e) => handleRemove(place.id, e)}
                    disabled={removingId === place.id}
                    className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-rose-600 text-white rounded-lg transition-colors backdrop-blur-md"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-[#1C1917] text-sm leading-snug group-hover:text-[#1B4332] transition-colors">
                      {place.place_name}
                    </h3>
                  </div>

                  <div className="flex items-center text-xs text-stone-500">
                    <MapPin className="w-3 h-3 mr-1 text-[#1B4332] shrink-0" />
                    <span>{place.city}</span>
                    {place.badge && (
                      <span className="ml-2 bg-stone-200 text-stone-700 text-[10px] font-bold px-1.5 py-0.2 rounded">
                        {place.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {place.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-stone-200/60 text-xs">
                <span className="text-[11px] text-stone-400 font-medium">Saved in Supabase</span>
                <button
                  type="button"
                  onClick={() => onNavigate('destination')}
                  className="font-bold text-[#1B4332] hover:underline flex items-center"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 px-4 rounded-xl bg-[#FAF9F6] border border-dashed border-[#E7E5E4] space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#1B4332] flex items-center justify-center mx-auto shadow-xs">
            <Compass className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-base font-bold text-[#1C1917]">No saved places yet</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Explore LocalLens and bookmark attractions, verified stays, and food places you want to visit on your next trip.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('destination')}
            className="inline-flex items-center space-x-2 bg-[#1B4332] hover:bg-[#265e46] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Explore Places</span>
          </button>
        </div>
      )}

    </div>
  );
};
