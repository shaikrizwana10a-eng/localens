import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Hotel, 
  Compass, 
  RefreshCw, 
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import type { Destination, GeneratedItinerary } from '../../types/travel';

interface TripPlannerViewProps {
  destinations: Destination[];
  onNavigate: (view: string) => void;
}

export const TripPlannerView: React.FC<TripPlannerViewProps> = ({ destinations }) => {
  // Input Form State
  const [selectedDestId, setSelectedDestId] = useState('tirupati');
  const [startingLoc, setStartingLoc] = useState('Tirupati Railway Station');
  const [daysCount, setDaysCount] = useState(3);
  const [budget, setBudget] = useState(8000);
  const [travellers, setTravellers] = useState(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Spiritual', 'History', 'Food']);
  const [transportPref, setTransportPref] = useState<'Public/Shared' | 'Cab' | 'Any'>('Public/Shared');

  // Generated Itinerary State
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>({
    id: 'plan-1',
    destinationName: 'Tirupati & Tirumala',
    daysCount: 3,
    totalEstimatedCost: 6420,
    whyThisPlan: [
      'Saved ₹1,400 by recommending APS RTC Electric Bus (₹85) over private cab (₹850) for Tirumala hill ascent.',
      'Scheduled Alipiri Footpath darshan token collection at 4:30 AM to bypass peak 5-hour afternoon lines.',
      'Grouped Chandragiri Fort visit in the late afternoon to catch the light and sound show within single transport leg.',
      'Selected Sri Sapthagiri Residency due to 94% verified cleanliness score and zero hidden parking charges.'
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Arrival & Sacred Tirumala Ascent',
        morning: {
          time: '04:30 AM - 08:30 AM',
          placeName: 'Alipiri Padala Mandapam & SSD Token Counter',
          category: 'Spiritual / Trek',
          duration: '4 hours',
          travelMethod: 'Shared Auto from Railway Station (₹40 per head)',
          approxTravelCost: 80,
          activityDescription: 'Collect free SSD Darshan token at early morning counter. Option to walk Alipiri footpath or take hill bus.',
          foodOption: 'Breakfast at Alipiri TTD Canteen (Idli Vada ₹40)',
          costBreakdown: 'Transport ₹80 + Food ₹80'
        },
        afternoon: {
          time: '11:00 AM - 03:00 PM',
          placeName: 'Tirumala Venkateswara Temple Darshan',
          category: 'Spiritual Heritage',
          duration: '4 hours',
          travelMethod: 'APS RTC Electric Bus (₹85 per head)',
          approxTravelCost: 170,
          activityDescription: 'Special entry darshan at hill top temple. Collect GI-tagged Tirupati Laddu prasadam.',
          foodOption: 'Free TTD Annaprasadam Complex lunch (Pure Veg)',
          costBreakdown: 'Bus ₹170 + Laddu Prasadam ₹100'
        },
        evening: {
          time: '05:00 PM - 07:30 PM',
          placeName: 'Silathoranam & Chakra Tirtham',
          category: 'Geological Marvel',
          duration: '2.5 hours',
          travelMethod: 'Tirumala Hill Free Shuttle Bus (₹0)',
          approxTravelCost: 0,
          activityDescription: 'Explore natural rock arch and surrounding forest trails at sunset.',
          foodOption: 'Perugu Vada & Coffee at Hilltop Stalls (₹60)',
          costBreakdown: 'Food ₹120'
        },
        suggestedStay: 'Sri Sapthagiri Heritage Residency (Station Road)',
        stayCost: 1450,
        dailyTotalSpent: 1980
      },
      {
        dayNumber: 2,
        title: 'Waterfalls & Historic Chandragiri Fort',
        morning: {
          time: '08:00 AM - 11:30 AM',
          placeName: 'Kapila Theertham Waterfalls & Cave Temple',
          category: 'Nature & Temple',
          duration: '3.5 hours',
          travelMethod: 'Local Bus Route 113 (₹15 per head)',
          approxTravelCost: 30,
          activityDescription: 'Visit sacred waterfall pool at foot of Sheshachalam hills and ancient cave Shiva shrine.',
          foodOption: 'Ragi Mudda Thali at Maurya Mess (₹140)',
          costBreakdown: 'Bus ₹30 + Lunch ₹280'
        },
        afternoon: {
          time: '02:00 PM - 05:30 PM',
          placeName: 'Chandragiri Fort & Raja Mahal',
          category: 'History & Architecture',
          duration: '3.5 hours',
          travelMethod: 'Shared Auto via Chittoor Road (₹35 per head)',
          approxTravelCost: 70,
          activityDescription: 'Tour 11th-century Vijayanagara palace, arms museum, and manicured gardens.',
          foodOption: 'Tea & Snacks at Fort Canteen (₹50)',
          costBreakdown: 'Auto ₹70 + Entry ₹50 + Snacks ₹100'
        },
        evening: {
          time: '06:30 PM - 08:30 PM',
          placeName: 'Chandragiri Light & Sound Show',
          category: 'Culture',
          duration: '2 hours',
          travelMethod: 'Return Shared Auto (₹35 per head)',
          approxTravelCost: 70,
          activityDescription: 'Watch historic light show depicting Vijayanagara empire glory.',
          foodOption: 'Dinner at Hotel Maurya Mess (₹200)',
          costBreakdown: 'Auto ₹70 + Show Ticket ₹60 + Dinner ₹400'
        },
        suggestedStay: 'Sri Sapthagiri Heritage Residency',
        stayCost: 1450,
        dailyTotalSpent: 2580
      },
      {
        dayNumber: 3,
        title: 'Local Markets & Shopping Souvenirs',
        morning: {
          time: '09:00 AM - 01:00 PM',
          placeName: 'Gandhi Road & Bazaar Street Shopping',
          category: 'Shopping & Culture',
          duration: '4 hours',
          travelMethod: 'Walking from Hotel',
          approxTravelCost: 0,
          activityDescription: 'Shop for wooden toys, brass idols, and authentic Potharekulu sweets.',
          foodOption: 'Filter Coffee & Tiffins (₹100)',
          costBreakdown: 'Food ₹200'
        },
        afternoon: {
          time: '01:30 PM - 04:00 PM',
          placeName: 'Govindaraja Swamy Temple',
          category: 'Heritage',
          duration: '2.5 hours',
          travelMethod: 'Walking (300m)',
          approxTravelCost: 0,
          activityDescription: 'Admire massive 7-tier gopuram right near railway station before departure.',
          foodOption: 'South Indian Meal Thali (₹120)',
          costBreakdown: 'Lunch ₹240'
        },
        evening: {
          time: '04:30 PM',
          placeName: 'Departure from Tirupati Railway Station',
          category: 'Transit',
          duration: '1 hour',
          travelMethod: 'Walk to Station',
          approxTravelCost: 0,
          activityDescription: 'Board return train with verified memory luggage delivery.',
          foodOption: 'Train Snacks (₹80)',
          costBreakdown: 'Snacks ₹160'
        },
        suggestedStay: 'Check-out',
        stayCost: 0,
        dailyTotalSpent: 1860
      }
    ]
  });

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGenerate = () => {
    // Simulates dynamic plan creation tailored to user inputs
    const dest = destinations.find((d) => d.id === selectedDestId);
    if (!dest) return;

    const estCost = Math.round(budget * 0.82);

    setItinerary({
      id: `plan-${Date.now()}`,
      destinationName: dest.name,
      daysCount: daysCount,
      totalEstimatedCost: estCost,
      whyThisPlan: [
        `Adjusted total spend to ₹${estCost} staying comfortably within your ₹${budget} budget limit for ${travellers} travellers.`,
        `Prioritized ${selectedInterests.join(', ')} spots within short local transit distance.`,
        `Selected ${transportPref} transport routes to save travel costs.`,
        `Selected community-verified stays with minimum 90% cleanliness ratings.`
      ],
      days: itinerary?.days || []
    });
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Page Header */}
      <div className="bg-[#1C1917] text-white p-8 rounded-2xl border border-stone-800 space-y-3">
        <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intelligent Itinerary Generator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Plan Smart with Human Rationale
        </h1>
        <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
          Input your budget, duration, and interests. The platform calculates a practical itinerary with exact local transport fares, food options, daily cost breakdown, and human reasoning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form Inputs */}
        <div className="bg-white p-6 rounded-xl border border-[#E7E5E4] space-y-6 shadow-xs h-fit">
          <h2 className="text-lg font-bold text-[#1C1917] border-b border-[#E7E5E4] pb-3 flex items-center">
            <Compass className="w-5 h-5 mr-2 text-[#1B4332]" />
            Trip Requirements
          </h2>

          {/* Destination Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1C1917]">Target Destination</label>
            <select
              value={selectedDestId}
              onChange={(e) => setSelectedDestId(e.target.value)}
              className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-lg text-xs text-[#1C1917] font-medium focus:outline-none focus:border-[#1B4332]"
            >
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({d.state})</option>
              ))}
            </select>
          </div>

          {/* Starting Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1C1917]">Starting Location in City</label>
            <input
              type="text"
              value={startingLoc}
              onChange={(e) => setStartingLoc(e.target.value)}
              className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-lg text-xs text-[#1C1917] focus:outline-none focus:border-[#1B4332]"
            />
          </div>

          {/* Duration & Budget Sliders */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1C1917]">Duration (Days)</label>
              <input
                type="number"
                min={1}
                max={7}
                value={daysCount}
                onChange={(e) => setDaysCount(Number(e.target.value))}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-lg text-xs text-[#1C1917] font-bold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1C1917]">Travellers</label>
              <input
                type="number"
                min={1}
                max={10}
                value={travellers}
                onChange={(e) => setTravellers(Number(e.target.value))}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-lg text-xs text-[#1C1917] font-bold"
              />
            </div>
          </div>

          {/* Budget Range */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#1C1917]">Total Trip Budget</span>
              <span className="text-[#1B4332] font-bold">₹{budget.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={3000}
              max={30000}
              step={500}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-[#1B4332]"
            />
          </div>

          {/* Interests Checkboxes */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#1C1917]">Travel Interests</label>
            <div className="flex flex-wrap gap-2">
              {['Spiritual', 'History', 'Nature', 'Food', 'Culture', 'Budget'].map((int) => (
                <button
                  key={int}
                  type="button"
                  onClick={() => toggleInterest(int)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedInterests.includes(int)
                      ? 'bg-[#1B4332] text-white'
                      : 'bg-[#FAF9F6] text-stone-600 border border-[#E7E5E4] hover:bg-stone-200'
                  }`}
                >
                  {int}
                </button>
              ))}
            </div>
          </div>

          {/* Transport Preference */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1C1917]">Preferred Transport</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {(['Public/Shared', 'Cab', 'Any'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setTransportPref(mode)}
                  className={`py-2 rounded-lg font-medium border text-center ${
                    transportPref === mode
                      ? 'bg-[#1B4332] text-white border-[#1B4332]'
                      : 'bg-[#FAF9F6] text-stone-700 border-[#E7E5E4]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white py-3 rounded-lg text-sm font-bold shadow-md transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Generate Practical Plan</span>
          </button>
        </div>

        {/* Right 2 Columns: Generated Itinerary & Why This Plan */}
        <div className="lg:col-span-2 space-y-8">
          
          {itinerary && (
            <>
              {/* "Why This Plan?" Rationale Card */}
              <div className="bg-[#FAF9F6] p-6 rounded-xl border border-[#E7E5E4] space-y-4 shadow-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-[#1B4332] text-white flex items-center justify-center">
                    <HelpCircle className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1C1917] text-base">Why This Plan?</h3>
                    <p className="text-xs text-[#57534E]">Transparent human rationale behind every route and location choice.</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-stone-700">
                  {itinerary.whyThisPlan.map((reason, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-[#E7E5E4] flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 mr-1 text-[#1B4332] shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#E7E5E4] flex items-center justify-between text-xs">
                  <span className="text-[#57534E]">Estimated Cost Breakdown:</span>
                  <span className="font-bold text-base text-[#1B4332]">
                    ₹{itinerary.totalEstimatedCost.toLocaleString()} total (₹{(itinerary.totalEstimatedCost / travellers).toFixed(0)} / person)
                  </span>
                </div>
              </div>

              {/* Day-by-Day Timeline */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#1C1917] flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-[#1B4332]" />
                  Day-by-Day Timeline ({itinerary.daysCount} Days)
                </h2>

                {itinerary.days.map((day) => (
                  <div key={day.dayNumber} className="bg-white rounded-xl border border-[#E7E5E4] overflow-hidden shadow-xs space-y-4 p-6">
                    
                    {/* Day Header */}
                    <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3">
                      <div>
                        <span className="bg-[#1B4332] text-white px-2.5 py-0.5 rounded text-xs font-bold">
                          Day {day.dayNumber}
                        </span>
                        <h3 className="font-bold text-[#1C1917] text-lg mt-1">{day.title}</h3>
                      </div>
                      <div className="text-right text-xs">
                        <div className="text-stone-500 font-medium">Daily Spend</div>
                        <div className="font-bold text-sm text-[#1B4332]">₹{day.dailyTotalSpent}</div>
                      </div>
                    </div>

                    {/* Morning Activity */}
                    <div className="bg-[#FAF9F6] p-4 rounded-lg border border-[#E7E5E4] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#1B4332] uppercase tracking-wider text-[11px]">🌅 Morning Session</span>
                        <span className="text-stone-500 font-medium">{day.morning.time}</span>
                      </div>
                      <h4 className="font-bold text-[#1C1917] text-sm">{day.morning.placeName}</h4>
                      <p className="text-xs text-stone-600">{day.morning.activityDescription}</p>
                      
                      <div className="pt-2 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-600">
                        <div><strong>Transit:</strong> {day.morning.travelMethod}</div>
                        <div><strong>Food Stop:</strong> {day.morning.foodOption}</div>
                      </div>
                    </div>

                    {/* Afternoon Activity */}
                    <div className="bg-[#FAF9F6] p-4 rounded-lg border border-[#E7E5E4] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-800 uppercase tracking-wider text-[11px]">☀️ Afternoon Session</span>
                        <span className="text-stone-500 font-medium">{day.afternoon.time}</span>
                      </div>
                      <h4 className="font-bold text-[#1C1917] text-sm">{day.afternoon.placeName}</h4>
                      <p className="text-xs text-stone-600">{day.afternoon.activityDescription}</p>
                      
                      <div className="pt-2 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-600">
                        <div><strong>Transit:</strong> {day.afternoon.travelMethod}</div>
                        <div><strong>Food Stop:</strong> {day.afternoon.foodOption}</div>
                      </div>
                    </div>

                    {/* Evening Activity */}
                    <div className="bg-[#FAF9F6] p-4 rounded-lg border border-[#E7E5E4] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-indigo-900 uppercase tracking-wider text-[11px]">🌙 Evening Session</span>
                        <span className="text-stone-500 font-medium">{day.evening.time}</span>
                      </div>
                      <h4 className="font-bold text-[#1C1917] text-sm">{day.evening.placeName}</h4>
                      <p className="text-xs text-stone-600">{day.evening.activityDescription}</p>
                      
                      <div className="pt-2 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-600">
                        <div><strong>Transit:</strong> {day.evening.travelMethod}</div>
                        <div><strong>Food Stop:</strong> {day.evening.foodOption}</div>
                      </div>
                    </div>

                    {/* Suggested Stay */}
                    {day.suggestedStay !== 'Check-out' && (
                      <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-xs flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Hotel className="w-4 h-4 text-[#1B4332]" />
                          <div>
                            <span className="font-semibold text-[#1B4332]">Suggested Overnight Stay: </span>
                            <span className="text-stone-800">{day.suggestedStay}</span>
                          </div>
                        </div>
                        <span className="font-bold text-[#1B4332]">₹{day.stayCost} / night</span>
                      </div>
                    )}

                  </div>
                ))}
              </div>

            </>
          )}

        </div>

      </div>

    </div>
  );
};
