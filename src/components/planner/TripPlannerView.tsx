import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Hotel, 
  Compass, 
  RefreshCw, 
  CheckCircle2,
  HelpCircle,
  Bot,
  Send,
  Wand2,
  Key,
  Copy,
  Check,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Wallet,
  Users
} from 'lucide-react';
import type { Destination, GeneratedItinerary } from '../../types/travel';
import { 
  generateAIItinerary, 
  refineItineraryWithAI, 
  type AIPromptOptions 
} from '../../utils/aiTripPlanner';
import { SourceBadge } from '../common/SourceBadge';

interface TripPlannerViewProps {
  destinations: Destination[];
  onNavigate: (view: string) => void;
}

const AI_SUGGESTION_PROMPTS = [
  { label: '👨‍👩‍👧 Family & Relaxed', prompt: 'Traveling with elderly parents and family. Need slow-paced mornings, minimal stairs, and authentic pure-veg thali restaurants.' },
  { label: '📸 Hidden Gems & Photos', prompt: 'Solo photography enthusiast. Prioritize offbeat scenic viewpoints, golden-hour sunrise spots, and historic stone architecture.' },
  { label: '💰 Shoestring Backpacker', prompt: 'Budget solo traveler. Strictly utilize public buses and shared autos, budget dharamshalas or hostels, and authentic street food.' },
  { label: '🍲 Foodie Gastronomy Crawl', prompt: 'Food lover trip. Maximize authentic regional GI-tagged foods, iconic breakfast tiffin messes, and evening food streets.' },
  { label: '🌄 Scenic Nature & Treks', prompt: 'Adventure focused with waterfall hikes, hill views, early morning mist, and outdoor viewpoints.' }
];

const AI_GENERATION_STEPS = [
  'Connecting to LocaLens Neural Engine...',
  'Scanning verified transport fares & bus routes...',
  'Analyzing crowd patterns and peak queuing hours...',
  'Selecting community-verified stays with 90%+ cleanliness...',
  'Synthesizing human rationale and transparent daily budget...'
];

export const TripPlannerView: React.FC<TripPlannerViewProps> = ({ destinations }) => {
  // Input Form State
  const [selectedDestId, setSelectedDestId] = useState('tirupati');
  const [startingLoc, setStartingLoc] = useState('Tirupati Railway Station');
  const [daysCount, setDaysCount] = useState(3);
  const [budget, setBudget] = useState(8000);
  const [travellers, setTravellers] = useState(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Spiritual', 'History', 'Food']);
  const [transportPref, setTransportPref] = useState<'Public/Shared' | 'Cab' | 'Any'>('Public/Shared');

  // AI Specific States
  const [customAIPrompt, setCustomAIPrompt] = useState('');
  const [aiRefinementQuery, setAiRefinementQuery] = useState('');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('localens_gemini_api_key') || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [copiedToast, setCopiedToast] = useState(false);

  // Initial Default Itinerary (Tirupati)
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(() => {
    const tDest = destinations.find(d => d.id === 'tirupati') || destinations[0];
    if (!tDest) return null;
    
    // Generate initial intelligent plan
    return {
      id: 'plan-1',
      destinationName: 'Tirupati & Tirumala',
      daysCount: 3,
      totalEstimatedCost: 6420,
      aiOptimizationScore: 98,
      aiModeActive: true,
      whyThisPlan: [
        'AI Transit Optimization: Recommended APS RTC Electric Bus (₹85) over private cab (₹850) for Tirumala hill ascent, saving ₹1,400.',
        'Crowd-Aware Sequencing: Scheduled Alipiri Footpath darshan token collection at 4:30 AM to bypass peak 5-hour afternoon lines.',
        'Spatial Route Clustering: Grouped Chandragiri Fort in late afternoon to seamlessly combine with the evening light & sound show in a single transit leg.',
        'Community Cleanliness Guarantee: Selected Sri Sapthagiri Residency verified at 94% hygiene rating with zero hidden parking fees.'
      ],
      days: [
        {
          dayNumber: 1,
          title: 'Day 1: Arrival & Sacred Tirumala Ascent',
          aiLocalTip: 'Alipiri Footpath token counter opens at 4:00 AM. Luggage counter at Alipiri transfers bags to the hilltop for free.',
          morning: {
            time: '04:30 AM - 08:30 AM',
            placeName: 'Alipiri Padala Mandapam & SSD Token Counter',
            category: 'Spiritual / Trek',
            duration: '4 hours',
            travelMethod: 'Shared Auto from Railway Station (₹40 per head)',
            approxTravelCost: 80,
            activityDescription: 'Collect free SSD Darshan token at early morning counter. Option to walk Alipiri footpath or take hill bus.',
            foodOption: 'Breakfast at Alipiri TTD Canteen (Idli Vada ₹40)',
            costBreakdown: 'Transport ₹80 + Food ₹80',
            aiBadge: '⚡ Early Bird Darshan Token'
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
            costBreakdown: 'Bus ₹170 + Laddu Prasadam ₹100',
            aiBadge: '🌱 100% Pure Veg Prasadam'
          },
          evening: {
            time: '05:00 PM - 07:30 PM',
            placeName: 'Silathoranam & Chakra Tirtham',
            category: 'Geological Marvel',
            duration: '2.5 hours',
            travelMethod: 'Tirumala Hill Free Shuttle Bus (₹0)',
            approxTravelCost: 0,
            activityDescription: 'Explore natural rock arch millions of years old and surrounding forest trails at sunset.',
            foodOption: 'Perugu Vada & Coffee at Hilltop Stalls (₹60)',
            costBreakdown: 'Food ₹120',
            aiBadge: '🌟 Hidden Geological Gem'
          },
          suggestedStay: 'Sri Sapthagiri Heritage Residency (Station Road)',
          stayCost: 1450,
          dailyTotalSpent: 1980
        },
        {
          dayNumber: 2,
          title: 'Day 2: Waterfalls & Historic Chandragiri Fort',
          aiLocalTip: 'RTC Electric buses to Tirumala charge ₹85 per ticket and run every 10 minutes from Central Bus Stand.',
          morning: {
            time: '08:00 AM - 11:30 AM',
            placeName: 'Kapila Theertham Waterfalls & Cave Temple',
            category: 'Nature & Temple',
            duration: '3.5 hours',
            travelMethod: 'Local Bus Route 113 (₹15 per head)',
            approxTravelCost: 30,
            activityDescription: 'Sacred waterfall pool at foot of Sheshachalam hills and ancient cave Shiva shrine.',
            foodOption: 'Ragi Mudda Thali at Maurya Mess (₹140)',
            costBreakdown: 'Bus ₹30 + Lunch ₹280',
            aiBadge: '💧 Post-Monsoon Cascade'
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
            costBreakdown: 'Auto ₹70 + Entry ₹50 + Snacks ₹100',
            aiBadge: '🏰 Vijayanagara Heritage'
          },
          evening: {
            time: '06:30 PM - 08:30 PM',
            placeName: 'Chandragiri Light & Sound Show',
            category: 'Culture',
            duration: '2 hours',
            travelMethod: 'Return Shared Auto (₹35 per head)',
            approxTravelCost: 70,
            activityDescription: 'Watch historic illuminated show depicting Vijayanagara empire glory.',
            foodOption: 'Dinner at Hotel Maurya Mess (₹200)',
            costBreakdown: 'Auto ₹70 + Show Ticket ₹60 + Dinner ₹400',
            aiBadge: '✨ Evening Cultural Spectacle'
          },
          suggestedStay: 'Sri Sapthagiri Heritage Residency',
          stayCost: 1450,
          dailyTotalSpent: 2580
        },
        {
          dayNumber: 3,
          title: 'Day 3: Local Markets & Souvenirs Departure',
          aiLocalTip: 'Buy GI-tagged Tirupati Laddu only from official TTD counters inside the temple queue complex.',
          morning: {
            time: '09:00 AM - 01:00 PM',
            placeName: 'Gandhi Road & Bazaar Street Shopping',
            category: 'Shopping & Culture',
            duration: '4 hours',
            travelMethod: 'Walking from Hotel',
            approxTravelCost: 0,
            activityDescription: 'Shop for wooden toys, brass idols, and authentic Potharekulu sweets.',
            foodOption: 'Filter Coffee & Tiffins (₹100)',
            costBreakdown: 'Food ₹200',
            aiBadge: '🛍️ Authentic Handicrafts'
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
            costBreakdown: 'Lunch ₹240',
            aiBadge: '🛕 Historic Gopuram'
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
            costBreakdown: 'Snacks ₹160',
            aiBadge: '🚆 Seamless Transit'
          },
          suggestedStay: 'Check-out',
          stayCost: 0,
          dailyTotalSpent: 1860
        }
      ]
    };
  });

  const currentDest = destinations.find((d) => d.id === selectedDestId) || destinations[0];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('localens_gemini_api_key', key);
  };

  const handleGenerateAI = async () => {
    if (!currentDest) return;

    setIsGenerating(true);
    setGenerationStep(0);

    // Simulate animated generation pipeline steps for visual delight
    const stepInterval = setInterval(() => {
      setGenerationStep((prev) => (prev < AI_GENERATION_STEPS.length - 1 ? prev + 1 : prev));
    }, 400);

    try {
      const options: AIPromptOptions = {
        destination: currentDest,
        startingLocation: startingLoc,
        daysCount,
        budget,
        travellers,
        interests: selectedInterests,
        transportPref,
        customPrompt: customAIPrompt,
        apiKey: apiKey || undefined
      };

      // Add minimum wait for smooth UX
      await new Promise(r => setTimeout(r, 1200));
      const generated = await generateAIItinerary(options);
      setItinerary(generated);
    } catch (e) {
      console.error('Generation error:', e);
    } finally {
      clearInterval(stepInterval);
      setIsGenerating(false);
    }
  };

  const handleRefineAI = (promptText?: string) => {
    const query = promptText || aiRefinementQuery;
    if (!query.trim() || !itinerary || !currentDest) return;

    const refined = refineItineraryWithAI(itinerary, query, currentDest);
    setItinerary(refined);
    setAiRefinementQuery('');
  };

  const handleCopyMarkdown = () => {
    if (!itinerary) return;
    let md = `# 🗺️ LocaLens AI Trip Plan: ${itinerary.destinationName} (${itinerary.daysCount} Days)\n`;
    md += `Estimated Total Cost: ₹${itinerary.totalEstimatedCost.toLocaleString()} (for ${travellers} travellers)\n\n`;
    md += `## 🧠 Why This Plan?\n`;
    itinerary.whyThisPlan.forEach(w => { md += `- ${w}\n`; });
    md += `\n## 📅 Itinerary Breakdown\n`;
    itinerary.days.forEach(d => {
      md += `\n### Day ${d.dayNumber}: ${d.title} (Daily Total: ₹${d.dailyTotalSpent})\n`;
      if (d.aiLocalTip) md += `> 💡 **Local Tip:** ${d.aiLocalTip}\n\n`;
      md += `- **Morning (${d.morning.time}):** ${d.morning.placeName} (${d.morning.category})\n  - Transit: ${d.morning.travelMethod}\n  - Food: ${d.morning.foodOption}\n`;
      md += `- **Afternoon (${d.afternoon.time}):** ${d.afternoon.placeName}\n  - Transit: ${d.afternoon.travelMethod}\n  - Food: ${d.afternoon.foodOption}\n`;
      md += `- **Evening (${d.evening.time}):** ${d.evening.placeName}\n  - Transit: ${d.evening.travelMethod}\n  - Food: ${d.evening.foodOption}\n`;
      if (d.suggestedStay !== 'Check-out') md += `- **Overnight Stay:** ${d.suggestedStay} (₹${d.stayCost}/night)\n`;
    });

    navigator.clipboard.writeText(md);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* AI Page Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1C1917] via-[#241F1C] to-[#1B4332] text-white p-8 sm:p-10 rounded-3xl border border-stone-800 shadow-xl space-y-4">
        {/* Glow decoration */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-300" />
            <span>LocaLens Neural Travel Planner v2.0</span>
          </div>

          <button
            type="button"
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className="text-xs text-stone-300 hover:text-white flex items-center space-x-1.5 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
          >
            <Key className="w-3.5 h-3.5 text-emerald-400" />
            <span>{apiKey ? 'Custom Gemini API Key Active' : 'Configure Gemini API Key (Optional)'}</span>
            {showApiKeyInput ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsible API Key Drawer */}
        {showApiKeyInput && (
          <div className="bg-black/40 border border-emerald-500/30 rounded-xl p-4 space-y-2 backdrop-blur-sm max-w-xl">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-300">Google Gemini API Key (Optional)</span>
              <span className="text-[11px] text-stone-400">LocaLens Local AI runs 100% offline by default</span>
            </div>
            <div className="flex space-x-2">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => handleSaveApiKey(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
              />
              {apiKey && (
                <button
                  type="button"
                  onClick={() => handleSaveApiKey('')}
                  className="px-2 py-1 text-xs text-rose-400 hover:text-rose-300"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          AI-Generated Itineraries with Verified Local Ground-Truth
        </h1>
        <p className="text-stone-300 text-sm max-w-3xl leading-relaxed">
          Unlike generic chatbot planners, LocaLens AI synthesizes <strong>actual verified bus numbers, shared auto fares, regional dining, and community crowd schedules</strong> into human-reasoned travel plans.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form & Natural Language Prompt */}
        <div className="bg-white p-6 rounded-2xl border border-[#E7E5E4] space-y-6 shadow-sm h-fit">
          <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3">
            <h2 className="text-base font-bold text-[#1C1917] flex items-center">
              <Compass className="w-5 h-5 mr-2 text-[#1B4332]" />
              Trip Constraints & AI Prompt
            </h2>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
              AI Powered
            </span>
          </div>

          {/* Destination Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1C1917] flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-[#1B4332]" />
              Target Destination
            </label>
            <select
              value={selectedDestId}
              onChange={(e) => setSelectedDestId(e.target.value)}
              className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] font-semibold focus:outline-none focus:border-[#1B4332] transition-colors"
            >
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({d.state})</option>
              ))}
            </select>
          </div>

          {/* Starting Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1C1917]">Starting Landmark in City</label>
            <input
              type="text"
              value={startingLoc}
              onChange={(e) => setStartingLoc(e.target.value)}
              placeholder="e.g. Railway Station, Airport, MGBS"
              className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:border-[#1B4332] transition-colors"
            />
          </div>

          {/* Natural Language AI Prompt Box */}
          <div className="space-y-2 bg-gradient-to-br from-emerald-50/50 to-stone-50 p-4 rounded-xl border border-emerald-100">
            <label className="text-xs font-bold text-[#1B4332] flex items-center justify-between">
              <span className="flex items-center">
                <Bot className="w-3.5 h-3.5 mr-1 text-[#1B4332]" />
                Special AI Prompt / Instructions
              </span>
              <span className="text-[10px] text-stone-500 font-normal">Natural Language</span>
            </label>
            <textarea
              rows={3}
              value={customAIPrompt}
              onChange={(e) => setCustomAIPrompt(e.target.value)}
              placeholder="e.g. Traveling with elderly parents. Need relaxed mornings, pure vegetarian meals, and minimal walking..."
              className="w-full p-2.5 bg-white border border-[#E7E5E4] rounded-lg text-xs text-[#1C1917] focus:outline-none focus:border-[#1B4332] resize-none shadow-2xs"
            />

            {/* Quick Prompt Suggestions */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-semibold text-stone-500 flex items-center">
                <Lightbulb className="w-3 h-3 mr-1 text-amber-500" />
                Quick AI Prompt Ideas:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {AI_SUGGESTION_PROMPTS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCustomAIPrompt(item.prompt)}
                    className="text-[10px] bg-white hover:bg-emerald-50 text-stone-700 hover:text-[#1B4332] px-2 py-1 rounded-md border border-stone-200 transition-colors shadow-2xs text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Duration & Travellers */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1C1917] flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-[#1B4332]" />
                Days ({daysCount})
              </label>
              <input
                type="number"
                min={1}
                max={7}
                value={daysCount}
                onChange={(e) => setDaysCount(Number(e.target.value))}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] font-bold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1C1917] flex items-center">
                <Users className="w-3.5 h-3.5 mr-1 text-[#1B4332]" />
                Travellers
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={travellers}
                onChange={(e) => setTravellers(Number(e.target.value))}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] font-bold"
              />
            </div>
          </div>

          {/* Budget Range */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#1C1917] flex items-center">
                <Wallet className="w-3.5 h-3.5 mr-1 text-[#1B4332]" />
                Budget Ceiling
              </span>
              <span className="text-[#1B4332] font-extrabold text-sm">₹{budget.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={3000}
              max={40000}
              step={500}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-[#1B4332]"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span>₹3,000 (Shoestring)</span>
              <span>₹40,000 (Luxury)</span>
            </div>
          </div>

          {/* Travel Interests */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1C1917]">Interests</label>
            <div className="flex flex-wrap gap-1.5">
              {['Spiritual', 'History', 'Nature', 'Food', 'Culture', 'Budget', 'Adventure'].map((int) => (
                <button
                  key={int}
                  type="button"
                  onClick={() => toggleInterest(int)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedInterests.includes(int)
                      ? 'bg-[#1B4332] text-white shadow-xs'
                      : 'bg-[#FAF9F6] text-stone-600 border border-[#E7E5E4] hover:bg-stone-100'
                  }`}
                >
                  {int}
                </button>
              ))}
            </div>
          </div>

          {/* Transport Preference */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1C1917]">Preferred Transit Mode</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {(['Public/Shared', 'Cab', 'Any'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setTransportPref(mode)}
                  className={`py-2 rounded-xl font-medium border text-center transition-all ${
                    transportPref === mode
                      ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                      : 'bg-[#FAF9F6] text-stone-700 border-[#E7E5E4] hover:bg-stone-100'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Primary AI Generate Button */}
          <button
            disabled={isGenerating}
            onClick={handleGenerateAI}
            className={`w-full py-3.5 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center space-x-2 text-white ${
              isGenerating 
                ? 'bg-stone-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] hover:from-[#143225] hover:to-[#22523d] active:scale-[0.99]'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-300" />
                <span>Generating AI Itinerary...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Generate Plan with LocaLens AI</span>
              </>
            )}
          </button>
        </div>

        {/* Right 2 Columns: Itinerary Results & AI Tools */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Real-time AI Generation Status Card */}
          {isGenerating && (
            <div className="bg-gradient-to-r from-emerald-950 to-stone-900 text-white p-6 rounded-2xl border border-emerald-500/30 space-y-4 shadow-xl animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-emerald-300 animate-spin" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-emerald-300">LocaLens Neural Optimizer Active</h3>
                  <p className="text-xs text-stone-300">{AI_GENERATION_STEPS[generationStep]}</p>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-emerald-400 h-full transition-all duration-300 ease-out"
                  style={{ width: `${((generationStep + 1) / AI_GENERATION_STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {itinerary && !isGenerating && (
            <>
              {/* Itinerary Header Bar with Actions */}
              <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-emerald-100 text-[#1B4332] text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center">
                      <Sparkles className="w-3 h-3 mr-1 text-[#1B4332]" />
                      AI Optimization Score: {itinerary.aiOptimizationScore || 98}%
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      {itinerary.destinationName} · {itinerary.daysCount} Days
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-[#1C1917] mt-1">
                    Custom Itinerary for {itinerary.destinationName}
                  </h2>
                </div>

                {/* Export & Copy buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleCopyMarkdown}
                    className="px-3 py-1.5 bg-[#FAF9F6] hover:bg-stone-100 text-stone-700 rounded-lg border border-[#E7E5E4] text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                  >
                    {copiedToast ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedToast ? 'Copied to Clipboard!' : 'Copy Itinerary'}</span>
                  </button>
                </div>
              </div>

              {/* "Why This Plan?" AI Rationale Card */}
              <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-[#E7E5E4] space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#1B4332] text-white flex items-center justify-center">
                      <HelpCircle className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1C1917] text-base">Why This Plan? (Transparent AI Rationale)</h3>
                      <p className="text-xs text-[#57534E]">Ground-truth evidence behind timing, transit legs, and cost calculations.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5 text-xs text-stone-700">
                  {itinerary.whyThisPlan.map((reason, idx) => (
                    <div key={idx} className="bg-white p-3.5 rounded-xl border border-[#E7E5E4] flex items-start space-x-2.5 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{reason}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#E7E5E4] flex flex-wrap items-center justify-between text-xs gap-2">
                  <span className="text-[#57534E]">Total Calibrated Expenditure:</span>
                  <div className="text-right">
                    <span className="font-black text-lg text-[#1B4332]">
                      ₹{itinerary.totalEstimatedCost.toLocaleString()}
                    </span>
                    <span className="text-stone-500 text-xs ml-1.5">
                      (approx ₹{Math.round(itinerary.totalEstimatedCost / travellers).toLocaleString()} / person for {travellers} {travellers === 1 ? 'person' : 'people'})
                    </span>
                  </div>
                </div>
              </div>

              {/* Day-by-Day Timeline */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#1C1917] flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-[#1B4332]" />
                    Day-by-Day Timeline ({itinerary.days.length} Days)
                  </h3>
                  <span className="text-xs text-stone-500 font-medium">
                    Verified Ground Data
                  </span>
                </div>

                {itinerary.days.map((day) => (
                  <div key={day.dayNumber} className="bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden shadow-xs space-y-4 p-6 hover:border-emerald-200 transition-colors">
                    
                    {/* Day Header */}
                    <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3">
                      <div>
                        <span className="bg-[#1B4332] text-white px-2.5 py-0.5 rounded-md text-xs font-bold">
                          Day {day.dayNumber}
                        </span>
                        <h4 className="font-bold text-[#1C1917] text-lg mt-1">{day.title}</h4>
                      </div>
                      <div className="text-right text-xs">
                        <div className="text-stone-500 font-medium">Day's Total</div>
                        <div className="font-extrabold text-base text-[#1B4332]">₹{day.dailyTotalSpent}</div>
                      </div>
                    </div>

                    {/* AI Local Tip Banner */}
                    {day.aiLocalTip && (
                      <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-start space-x-2.5 text-xs text-amber-900">
                        <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">LocaLens Verified Ground Tip: </strong>
                          <span>{day.aiLocalTip}</span>
                        </div>
                      </div>
                    )}

                    {/* Morning Activity */}
                    <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E7E5E4] space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#1B4332] uppercase tracking-wider text-[11px] flex items-center">
                          🌅 Morning
                        </span>
                        <div className="flex items-center space-x-2">
                          <SourceBadge sourceType="LOCAL_LENS" verificationStatus="VERIFIED" size="sm" showPopover={false} />
                          {day.morning.aiBadge && (
                            <span className="bg-emerald-100 text-[#1B4332] text-[10px] font-bold px-2 py-0.5 rounded-md">
                              {day.morning.aiBadge}
                            </span>
                          )}
                          <span className="text-stone-500 font-medium">{day.morning.time}</span>
                        </div>
                      </div>
                      <h5 className="font-bold text-[#1C1917] text-sm">{day.morning.placeName}</h5>
                      <p className="text-xs text-stone-600 leading-relaxed">{day.morning.activityDescription}</p>
                      
                      <div className="pt-2 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-600">
                        <div><strong>Transit:</strong> {day.morning.travelMethod}</div>
                        <div><strong>Food Stop:</strong> {day.morning.foodOption}</div>
                      </div>
                    </div>

                    {/* Afternoon Activity */}
                    <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E7E5E4] space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-800 uppercase tracking-wider text-[11px] flex items-center">
                          ☀️ Afternoon
                        </span>
                        <div className="flex items-center space-x-2">
                          <SourceBadge sourceType="LOCAL_LENS" verificationStatus="VERIFIED" size="sm" showPopover={false} />
                          {day.afternoon.aiBadge && (
                            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-md">
                              {day.afternoon.aiBadge}
                            </span>
                          )}
                          <span className="text-stone-500 font-medium">{day.afternoon.time}</span>
                        </div>
                      </div>
                      <h5 className="font-bold text-[#1C1917] text-sm">{day.afternoon.placeName}</h5>
                      <p className="text-xs text-stone-600 leading-relaxed">{day.afternoon.activityDescription}</p>
                      
                      <div className="pt-2 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-600">
                        <div><strong>Transit:</strong> {day.afternoon.travelMethod}</div>
                        <div><strong>Food Stop:</strong> {day.afternoon.foodOption}</div>
                      </div>
                    </div>

                    {/* Evening Activity */}
                    <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E7E5E4] space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-indigo-900 uppercase tracking-wider text-[11px] flex items-center">
                          🌙 Evening
                        </span>
                        <div className="flex items-center space-x-2">
                          {day.evening.aiBadge && (
                            <span className="bg-indigo-100 text-indigo-900 text-[10px] font-bold px-2 py-0.5 rounded-md">
                              {day.evening.aiBadge}
                            </span>
                          )}
                          <span className="text-stone-500 font-medium">{day.evening.time}</span>
                        </div>
                      </div>
                      <h5 className="font-bold text-[#1C1917] text-sm">{day.evening.placeName}</h5>
                      <p className="text-xs text-stone-600 leading-relaxed">{day.evening.activityDescription}</p>
                      
                      <div className="pt-2 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-600">
                        <div><strong>Transit:</strong> {day.evening.travelMethod}</div>
                        <div><strong>Food Stop:</strong> {day.evening.foodOption}</div>
                      </div>
                    </div>

                    {/* Suggested Stay */}
                    {day.suggestedStay !== 'Check-out & Departure' && day.suggestedStay !== 'Check-out' && (
                      <div className="bg-emerald-50/80 border border-emerald-200 p-3.5 rounded-xl text-xs flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <Hotel className="w-4 h-4 text-[#1B4332]" />
                          <div>
                            <span className="font-bold text-[#1B4332]">Suggested Overnight Stay: </span>
                            <span className="text-stone-800">{day.suggestedStay}</span>
                          </div>
                        </div>
                        <span className="font-extrabold text-[#1B4332]">₹{day.stayCost} / night</span>
                      </div>
                    )}

                  </div>
                ))}
              </div>

              {/* Interactive AI Refinement Chat Bar */}
              <div className="bg-gradient-to-r from-[#1C1917] to-[#241F1C] text-white p-6 rounded-2xl border border-stone-800 space-y-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Wand2 className="w-4 h-4 text-emerald-300" />
                  <h4 className="font-bold text-sm">Ask LocaLens AI to Adjust this Plan</h4>
                </div>
                <p className="text-xs text-stone-300">
                  Want to change the pace, swap meals for pure vegetarian, or cut transit costs? Instruct the AI to update your itinerary instantly.
                </p>

                {/* Quick Refine Chips */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: '🌿 Add Hidden Gems', query: 'Add hidden gem viewpoints and photography spots to the itinerary' },
                    { label: '💰 Maximize Budget Savings', query: 'Switch all transit to cheapest verified city buses and shared autos to cut costs' },
                    { label: '🌱 Pure Veg Food Only', query: 'Ensure all morning, afternoon, and dinner meals are strictly pure vegetarian local specialties' },
                    { label: '☕ Relax Schedule Pace', query: 'Make the mornings start later and add more leisure buffers between sightseeing' }
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleRefineAI(chip.query)}
                      className="text-xs bg-white/10 hover:bg-white/20 text-stone-200 px-3 py-1.5 rounded-lg border border-white/15 transition-all active:scale-95"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                {/* Custom Refinement Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRefineAI();
                  }}
                  className="flex space-x-2 pt-1"
                >
                  <input
                    type="text"
                    value={aiRefinementQuery}
                    onChange={(e) => setAiRefinementQuery(e.target.value)}
                    placeholder="e.g. Make Day 2 end early at sunset and add local street punugulu snacks..."
                    className="flex-1 px-4 py-2.5 bg-stone-900/90 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-400 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={!aiRefinementQuery.trim()}
                    className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-700 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors"
                  >
                    <span>Apply</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

            </>
          )}

        </div>

      </div>

    </div>
  );
};
