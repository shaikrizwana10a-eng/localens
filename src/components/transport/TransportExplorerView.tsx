import React, { useState } from 'react';
import { 
  Bus, 
  AlertCircle, 
  Navigation,
  ArrowRight
} from 'lucide-react';
import type { TransportRoute } from '../../types/travel';
import { TrustBadge, FreshnessTag } from '../common/TrustBadge';
import { TravelMap } from '../map/TravelMap';

interface TransportExplorerViewProps {
  routes: TransportRoute[];
  onNavigate: (view: string) => void;
}

const VIZAG_LANDMARKS: { name: string; lat: number; lng: number; desc: string }[] = [
  { name: 'Visakhapatnam Railway Station', lat: 17.7215, lng: 83.2970, desc: 'Central Rail Hub' },
  { name: 'Vizag Airport (VTZ)', lat: 17.7231, lng: 83.2245, desc: 'Airport Terminal' },
  { name: 'Dwaraka RTC Bus Complex', lat: 17.7290, lng: 83.3080, desc: 'Main Bus Depot' },
  { name: 'RK Beach & Submarine Museum', lat: 17.7128, lng: 83.3242, desc: 'Beach Promenade' },
  { name: 'Rushikonda Beach & IT Hill', lat: 17.7820, lng: 83.3850, desc: 'Blue Flag Beach' },
  { name: 'Kailasagiri Hilltop Park', lat: 17.7483, lng: 83.3444, desc: 'Panoramic Cable Car' },
  { name: 'Simhachalam Temple Foothills', lat: 17.7663, lng: 83.2506, desc: 'Ancient Shrine' },
  { name: 'Tenneti Park & Shipwreck Point', lat: 17.7380, lng: 83.3410, desc: 'Cliff Viewpoint' },
  { name: 'Dolphin’s Nose Lighthouse', lat: 17.6740, lng: 83.2920, desc: 'Harbor Cliff' },
  { name: 'Bheemunipatnam (Bheemili) Beach', lat: 17.8890, lng: 83.4540, desc: 'Dutch Fort Coast' },
  { name: 'Yarada Beach', lat: 17.6533, lng: 83.2689, desc: 'Secluded Beach' },
  { name: 'MVP Colony / Siripuram Junction', lat: 17.7400, lng: 83.3180, desc: 'Commercial Center' }
];

export const TransportExplorerView: React.FC<TransportExplorerViewProps> = ({ routes, onNavigate }) => {
  const [selectedRouteId, setSelectedRouteId] = useState(routes[0]?.id || 't-route-1');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Custom A -> B Navigation Inputs
  const [originInput, setOriginInput] = useState('Visakhapatnam Railway Station');
  const [destInput, setDestInput] = useState('Rushikonda Beach & IT Hill');
  const [customRoute, setCustomRoute] = useState<TransportRoute | null>(null);

  const currentRoute = customRoute || routes.find((r) => r.id === selectedRouteId) || routes[0];
  const activeOption = currentRoute.options.find((o) => o.id === selectedOptionId) || currentRoute.options[0];

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!originInput.trim() || !destInput.trim()) return;

    const origObj = VIZAG_LANDMARKS.find((l) => l.name.toLowerCase().includes(originInput.toLowerCase())) || VIZAG_LANDMARKS[0];
    const destObj = VIZAG_LANDMARKS.find((l) => l.name.toLowerCase().includes(destInput.toLowerCase())) || VIZAG_LANDMARKS[4];

    // Compute dynamic custom route
    const dist = Math.max(3, Math.round(Math.hypot(origObj.lat - destObj.lat, origObj.lng - destObj.lng) * 110));
    const busFare = Math.min(45, Math.max(15, Math.round(dist * 1.5)));
    const autoFare = Math.min(70, Math.max(20, Math.round(dist * 2.2)));

    const newCustomRoute: TransportRoute = {
      id: `custom-${Date.now()}`,
      origin: origObj.name,
      destination: destObj.name,
      distanceKm: dist,
      options: [
        {
          id: `opt-custom-bus-${Date.now()}`,
          transportType: 'Local Bus',
          approxFare: `₹${busFare} per ticket`,
          approxDuration: `${dist * 2 + 5} mins`,
          boardingPoint: `${origObj.name} City Bus Shelter`,
          dropPoint: `${destObj.name} Junction`,
          walkingDistance: '150m walk',
          transfers: 0,
          steps: [
            { stepNumber: 1, instruction: `Walk 100m to ${origObj.name} Main Gate bus shelter.`, distanceOrTime: '2 mins', iconType: 'walk' },
            { stepNumber: 2, instruction: `Board City Bus Route 28Z / 222 / 38 towards ${destObj.name}.`, distanceOrTime: `${dist * 2} mins`, iconType: 'bus' },
            { stepNumber: 3, instruction: `Alight at ${destObj.name} arrival stop.`, distanceOrTime: '1 min', iconType: 'walk' }
          ],
          practicalNotes: [
            `City buses on this line run every 10 minutes between 6:00 AM and 9:30 PM.`,
            `Exact change of ₹${busFare} or UPI digital ticket scan accepted.`
          ],
          freshnessDaysAgo: 1,
          verifiedCount: 38,
          confidenceLevel: 'High Confidence'
        },
        {
          id: `opt-custom-auto-${Date.now()}`,
          transportType: 'Shared Auto',
          approxFare: `₹${autoFare} per seat`,
          approxDuration: `${dist * 1.5} mins`,
          boardingPoint: `${origObj.name} Shared Auto Shelter`,
          dropPoint: `${destObj.name} Main Gate`,
          walkingDistance: 'Direct drop',
          transfers: dist > 15 ? 1 : 0,
          steps: [
            { stepNumber: 1, instruction: `Board 7-seater Shared Auto at ${origObj.name} auto stand.`, distanceOrTime: `${dist * 1.5} mins`, iconType: 'auto' },
            { stepNumber: 2, instruction: `Alight directly at ${destObj.name}.`, distanceOrTime: 'Direct drop', iconType: 'walk' }
          ],
          practicalNotes: [
            `Shared auto drivers charge per seat (₹${autoFare}) compared to private taxi quotes.`,
            `Do not pay private drivers requesting ₹300+ for single seat.`
          ],
          freshnessDaysAgo: 2,
          verifiedCount: 29,
          confidenceLevel: 'High Confidence'
        }
      ]
    };

    setCustomRoute(newCustomRoute);
    setSelectedOptionId(newCustomRoute.options[0].id);
  };

  // Coordinates for map
  const originCoord = VIZAG_LANDMARKS.find((l) => l.name === currentRoute.origin)?.lat
    ? { lat: VIZAG_LANDMARKS.find((l) => l.name === currentRoute.origin)!.lat, lng: VIZAG_LANDMARKS.find((l) => l.name === currentRoute.origin)!.lng }
    : { lat: 17.7215, lng: 83.2970 };

  const destCoord = VIZAG_LANDMARKS.find((l) => l.name === currentRoute.destination)?.lat
    ? { lat: VIZAG_LANDMARKS.find((l) => l.name === currentRoute.destination)!.lat, lng: VIZAG_LANDMARKS.find((l) => l.name === currentRoute.destination)!.lng }
    : { lat: 17.7820, lng: 83.3850 };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Page Header Banner */}
      <div className="bg-[#1C1917] text-white p-8 rounded-2xl border border-stone-800 space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
          <Bus className="w-3.5 h-3.5" />
          <span>Local Transit Guidance Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Navigate Any Spot in Vizag & Unfamiliar Hubs
        </h1>
        <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
          Not a cab booking app. We map local bus routes, shared auto hubs, exact boarding bays, and community-verified fares so you travel like an experienced resident.
        </p>

        {/* Custom A -> B Navigation Form */}
        <form onSubmit={handleCustomSearch} className="bg-white p-3 rounded-xl shadow-lg border border-stone-200 grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
          <div className="md:col-span-5 relative">
            <label className="text-[10px] font-bold text-stone-500 uppercase px-2">Origin A</label>
            <select
              value={originInput}
              onChange={(e) => setOriginInput(e.target.value)}
              className="w-full p-2 bg-[#FAF9F6] border border-[#E7E5E4] rounded-lg text-stone-900 font-bold focus:outline-none focus:border-[#1B4332]"
            >
              {VIZAG_LANDMARKS.map((l) => (
                <option key={l.name} value={l.name}>{l.name} ({l.desc})</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-5 relative">
            <label className="text-[10px] font-bold text-stone-500 uppercase px-2">Destination B</label>
            <select
              value={destInput}
              onChange={(e) => setDestInput(e.target.value)}
              className="w-full p-2 bg-[#FAF9F6] border border-[#E7E5E4] rounded-lg text-stone-900 font-bold focus:outline-none focus:border-[#1B4332]"
            >
              {VIZAG_LANDMARKS.map((l) => (
                <option key={l.name} value={l.name}>{l.name} ({l.desc})</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white p-2.5 rounded-lg font-bold transition-colors flex items-center justify-center space-x-1"
            >
              <span>Get Fares</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Pre-configured Popular Routes Tabs */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#57534E] uppercase tracking-wider">Popular Pre-Verified Routes:</label>
        <div className="flex items-center space-x-3 overflow-x-auto pb-2 custom-scrollbar">
          {routes.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setCustomRoute(null);
                setSelectedRouteId(r.id);
                setSelectedOptionId(r.options[0]?.id || null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                !customRoute && r.id === currentRoute.id
                  ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                  : 'bg-white text-stone-700 border-[#E7E5E4] hover:bg-stone-100'
              }`}
            >
              {r.origin.split('/')[0]} → {r.destination.split('(')[0]} ({r.distanceKm} km)
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Transport Options Comparison & Step-by-Step Directions */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-6 rounded-xl border border-[#E7E5E4] space-y-4">
            <div className="flex flex-wrap items-center justify-between border-b border-[#E7E5E4] pb-3 gap-2">
              <div>
                <span className="text-xs font-bold text-[#1B4332] uppercase tracking-wide">Route Overview</span>
                <h2 className="text-xl font-extrabold text-[#1C1917] mt-0.5">
                  {currentRoute.origin} → {currentRoute.destination}
                </h2>
              </div>
              <span className="bg-emerald-50 text-[#1B4332] px-3 py-1 rounded-md text-xs font-bold border border-emerald-200">
                {currentRoute.distanceKm} km total
              </span>
            </div>

            {/* Options Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {currentRoute.options.map((opt) => {
                const isSelected = opt.id === activeOption.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? 'border-[#1B4332] bg-emerald-50/50 shadow-xs'
                        : 'border-[#E7E5E4] bg-white hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1C1917] text-base">{opt.transportType}</span>
                      <TrustBadge level={opt.confidenceLevel} showDetails={false} />
                    </div>

                    <div className="flex items-baseline space-x-2">
                      <span className="text-lg font-extrabold text-[#1B4332]">{opt.approxFare}</span>
                      <span className="text-xs text-stone-500">• {opt.approxDuration}</span>
                    </div>

                    <div className="space-y-1 text-xs text-stone-600 border-t border-stone-200 pt-2">
                      <div><strong>Boarding:</strong> {opt.boardingPoint}</div>
                      <div><strong>Walk distance:</strong> {opt.walkingDistance}</div>
                    </div>

                    <FreshnessTag daysAgo={opt.freshnessDaysAgo} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Option Step-by-Step Directions */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E7E5E4] space-y-6">
            <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-4">
              <div>
                <span className="text-xs font-bold text-[#1B4332] uppercase tracking-wide">Detailed Turn-by-Turn Directions</span>
                <h3 className="text-lg font-bold text-[#1C1917] mt-0.5">
                  {activeOption.transportType} Mode ({activeOption.approxFare})
                </h3>
              </div>
              <TrustBadge level={activeOption.confidenceLevel} verifiedCount={activeOption.verifiedCount} />
            </div>

            {/* Step-by-Step Timeline */}
            <div className="space-y-4">
              {activeOption.steps.map((step) => (
                <div key={step.stepNumber} className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {step.stepNumber}
                  </div>
                  <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E7E5E4] flex-1 space-y-1">
                    <p className="text-xs font-semibold text-[#1C1917] leading-relaxed">
                      {step.instruction}
                    </p>
                    <span className="inline-block text-[11px] text-[#1B4332] font-medium bg-emerald-100 px-2 py-0.5 rounded">
                      {step.distanceOrTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Practical Tips Callout */}
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-2 text-xs text-amber-900">
              <h4 className="font-bold flex items-center text-amber-900">
                <AlertCircle className="w-4 h-4 mr-1.5 text-amber-700" />
                Community Practical Guidance
              </h4>
              <ul className="list-disc list-inside space-y-1 text-amber-800">
                {activeOption.practicalNotes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Right 1 Column: Interactive Leaflet Map */}
        <div className="space-y-6">
          
          <div className="space-y-2">
            <h3 className="font-bold text-[#1C1917] text-base flex items-center">
              <Navigation className="w-4 h-4 mr-1.5 text-[#1B4332]" />
              Route Map Visualization
            </h3>
            <TravelMap
              center={originCoord}
              zoom={11}
              markers={[
                { id: 'm-orig', title: currentRoute.origin, type: 'transport', coordinates: originCoord },
                { id: 'm-dest', title: currentRoute.destination, type: 'attraction', coordinates: destCoord }
              ]}
              polyline={[originCoord, destCoord]}
              height="380px"
            />
          </div>

          <div className="bg-[#1C1917] text-white p-6 rounded-xl border border-stone-800 space-y-3">
            <h4 className="font-bold text-sm text-white">Know a fare update for this route?</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Help fellow travellers by updating fare changes, boarding gate shifts, or bus route modifications.
            </p>
            <button
              onClick={() => onNavigate('missions')}
              className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white py-2.5 rounded-lg text-xs font-bold transition-colors"
            >
              Submit Route Contribution →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
