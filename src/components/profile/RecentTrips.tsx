import React from 'react';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  ArrowRight,
  PlusCircle,
  Briefcase
} from 'lucide-react';
import type { TripHistoryItem } from '../../types/profile';

interface RecentTripsProps {
  trips: TripHistoryItem[];
  onNavigate: (view: string) => void;
}

export const RecentTrips: React.FC<RecentTripsProps> = ({
  trips,
  onNavigate
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5E4] pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#1C1917] flex items-center">
            <Clock className="w-5 h-5 mr-2 text-[#1B4332]" />
            Recent Trips & Travel History
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Your planned, ongoing, and completed travel itineraries with budget estimates.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('planner')}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#FAF9F6] hover:bg-stone-100 text-[#1B4332] rounded-lg border border-[#E7E5E4] text-xs font-bold transition-colors w-fit"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Plan New Trip</span>
        </button>
      </div>

      {/* Trips List or Empty State */}
      {trips && trips.length > 0 ? (
        <div className="space-y-4">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-[#FAF9F6] p-5 rounded-xl border border-[#E7E5E4] hover:border-emerald-300 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      trip.status === 'Completed'
                        ? 'bg-stone-200 text-stone-700'
                        : trip.status === 'Upcoming'
                        ? 'bg-emerald-100 text-[#1B4332] border border-emerald-300'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {trip.status}
                    </span>
                    <span className="text-xs text-stone-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1 text-stone-400" />
                      {trip.trip_date}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-[#1C1917] text-base mt-1 flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-[#1B4332]" />
                    {trip.destination}
                  </h3>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-stone-400 block font-medium">Estimated Budget</span>
                  <span className="text-base font-black text-[#1B4332]">
                    ₹{trip.estimated_budget.toLocaleString()}
                  </span>
                </div>
              </div>

              {trip.itinerary_snippet && (
                <p className="text-xs text-stone-600 leading-relaxed bg-white p-3 rounded-lg border border-[#E7E5E4]">
                  {trip.itinerary_snippet}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between pt-1 text-xs text-stone-500 border-t border-stone-200/60">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <Users className="w-3.5 h-3.5 mr-1 text-stone-400" />
                    {trip.travelers_count} {trip.travelers_count === 1 ? 'Traveler' : 'Travelers'}
                  </span>
                  {trip.origin && (
                    <span className="hidden sm:inline">
                      From: <strong>{trip.origin}</strong>
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('planner')}
                  className="font-bold text-[#1B4332] hover:text-[#265e46] flex items-center space-x-1"
                >
                  <span>View in Planner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 px-4 rounded-xl bg-[#FAF9F6] border border-dashed border-[#E7E5E4] space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#1B4332] flex items-center justify-center mx-auto shadow-xs">
            <Briefcase className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-base font-bold text-[#1C1917]">No travel history yet</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Generate an intelligent itinerary using the LocaLens AI Trip Planner to start building your travel history.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('planner')}
            className="inline-flex items-center space-x-2 bg-[#1B4332] hover:bg-[#265e46] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            <span>Launch AI Planner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};
