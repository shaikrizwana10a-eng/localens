import React, { useState } from 'react';
import { 
  Share2, 
  ShieldAlert, 
  CheckCircle2, 
  Bus, 
  DollarSign, 
  MapPin, 
  ArrowRight,
  Navigation,
  Home,
  Sparkles,
  Lightbulb,
  AlertTriangle,
  Ban
} from 'lucide-react';
import { useLocalKnowledge } from '../../context/LocalKnowledgeContext';
import type { KnowledgeCategory, NewKnowledgeSubmission } from '../../types/localKnowledge';

interface ShareKnowledgeFormProps {
  onSuccess?: () => void;
  onNavigateToExplore?: () => void;
}

export const ShareKnowledgeForm: React.FC<ShareKnowledgeFormProps> = ({
  onSuccess,
  onNavigateToExplore
}) => {
  const { addSubmission } = useLocalKnowledge();

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [category, setCategory] = useState<KnowledgeCategory>('Bus');
  const [busNumber, setBusNumber] = useState('');
  const [fare, setFare] = useState('');
  const [autoFare, setAutoFare] = useState('');
  const [boardingPoint, setBoardingPoint] = useState('');
  const [dropPoint, setDropPoint] = useState('');
  const [intermediateStop, setIntermediateStop] = useState('');
  const [lastMileMode, setLastMileMode] = useState<'Auto' | 'Walk' | 'Shared Auto'>('Auto');
  const [explicitNoDirectBus, setExplicitNoDirectBus] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [reporterName, setReporterName] = useState('');

  const [submittedItem, setSubmittedItem] = useState<{ id: string; from: string; to: string; fare?: string; busNumber?: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!from.trim() || !to.trim()) {
      setErrorMsg('Please enter both Origin (From) and Destination (To).');
      return;
    }

    setErrorMsg('');

    const submission: NewKnowledgeSubmission = {
      from,
      to,
      category,
      busNumber: busNumber || undefined,
      fare: fare ? (fare.startsWith('₹') ? fare : `₹${fare}`) : undefined,
      autoFare: autoFare ? (autoFare.startsWith('₹') ? autoFare : `₹${autoFare}`) : undefined,
      boardingPoint: boardingPoint || undefined,
      dropPoint: dropPoint || undefined,
      intermediateStop: intermediateStop || undefined,
      lastMileMode: lastMileMode || undefined,
      explicitNoDirectBus: explicitNoDirectBus,
      additionalInfo: additionalInfo || undefined,
      reportedBy: reporterName ? `Local User @${reporterName.replace('@', '')}` : 'Local Contributor'
    };

    const created = addSubmission(submission);
    setSubmittedItem({
      id: created.id,
      from: created.from,
      to: created.to,
      fare: created.fare,
      busNumber: created.busNumber
    });

    // Reset form fields
    setFrom('');
    setTo('');
    setBusNumber('');
    setFare('');
    setAutoFare('');
    setBoardingPoint('');
    setDropPoint('');
    setIntermediateStop('');
    setLastMileMode('Auto');
    setExplicitNoDirectBus(false);
    setAdditionalInfo('');
    setReporterName('');

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
          <Share2 className="w-3.5 h-3.5" />
          <span>Community Contribution</span>
        </div>
        <h2 className="text-3xl font-extrabold text-[#1C1917] tracking-tight">
          Share What You Know
        </h2>
        <p className="text-stone-600 text-sm max-w-xl mx-auto">
          Help fellow travelers by reporting real bus numbers, actual fares, intermediate stops, and last-mile auto details.
        </p>
      </div>

      {/* Verification Notice Banner */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 text-amber-950 space-y-2 shadow-xs">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-amber-800 shrink-0" />
          <h4 className="font-extrabold text-sm text-amber-900">
            How Submission Verification Works
          </h4>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed">
          When you submit information (e.g., Gajuwaka → Vignan College, Bus 38K to Duvvada Stop, Auto to Campus, Fare ₹20 + ₹40), it is stored as <strong className="bg-amber-200 px-1 py-0.5 rounded text-amber-950">PENDING</strong>. Even a <strong>single verified report</strong> allows LOCAL Route Intelligence to generate practical routes for future travelers!
        </p>
      </div>

      {/* Post-submission Success Banner */}
      {submittedItem && (
        <div className="bg-emerald-900 text-white rounded-2xl p-6 border border-emerald-700 shadow-lg space-y-4 animate-fade-in">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-extrabold text-lg">Knowledge Submitted Successfully!</h4>
              <p className="text-xs text-emerald-200">
                Your report for <strong>{submittedItem.from} → {submittedItem.to}</strong> has been received and registered into the platform queue.
              </p>
            </div>
          </div>

          <div className="bg-emerald-950/80 p-4 rounded-xl border border-emerald-800 text-xs space-y-2">
            <div className="flex items-center justify-between text-emerald-300">
              <span>Status: <strong className="bg-amber-400 text-stone-900 px-2 py-0.5 rounded font-bold uppercase">PENDING VERIFICATION</strong></span>
              <span>Report ID: {submittedItem.id}</span>
            </div>
            <p className="text-emerald-200 flex items-center space-x-3">
              <span className="flex items-center"><Bus className="w-3.5 h-3.5 mr-1" /> {submittedItem.busNumber ? `Bus ${submittedItem.busNumber}` : 'Local Route'}</span>
              <span className="flex items-center"><DollarSign className="w-3.5 h-3.5 mr-0.5" /> {submittedItem.fare || 'Fare reported'}</span>
              <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Pending audit date</span>
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-emerald-300">Thank you for helping travelers travel like a local!</span>
            {onNavigateToExplore && (
              <button
                onClick={onNavigateToExplore}
                className="bg-white text-[#1B4332] hover:bg-stone-100 font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center space-x-1"
              >
                <span>View All Knowledge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Submission Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
        
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-300 text-rose-800 p-3.5 rounded-xl text-xs font-semibold flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1.5 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* General UX Improvement: Intro sentence */}
        <div className="space-y-1 pb-2">
          <p className="text-sm font-extrabold text-[#1B4332] flex items-center">
            <MapPin className="w-4 h-4 mr-1.5 text-emerald-600" />
            Help another traveler reach this place like a local.
          </p>
          <p className="text-xs text-stone-500">Share what you know — bus numbers, fares, where to board, where to get down, and the easiest way to reach the destination.</p>
        </div>

        {/* Origin & Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-[#1C1917] flex items-center">
              <MapPin className="w-3.5 h-3.5 text-[#1B4332] mr-1" />
              From (Origin) *
            </label>
            <input
              type="text"
              placeholder="e.g. Gajuwaka"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-[#1C1917] flex items-center">
              <MapPin className="w-3.5 h-3.5 text-emerald-700 mr-1" />
              To (Destination) *
            </label>
            <input
              type="text"
              placeholder="e.g. Vignan College"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            />
          </div>
        </div>

        {/* Category Radio / Pill Selector */}
        <div className="space-y-2">
          <label className="text-xs font-extrabold text-[#1C1917] block">
            Category *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            {(['Bus', 'Auto', 'Stay', 'Experience', 'Tip'] as KnowledgeCategory[]).map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setCategory(cat)}
                className={`py-2.5 px-3 rounded-xl font-bold transition-all border text-center flex items-center justify-center space-x-1.5 ${
                  category === cat
                    ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border-stone-200'
                }`}
              >
                {cat === 'Bus' && <Bus className="w-3.5 h-3.5" />}
                {cat === 'Auto' && <Navigation className="w-3.5 h-3.5" />}
                {cat === 'Stay' && <Home className="w-3.5 h-3.5" />}
                {cat === 'Experience' && <Sparkles className="w-3.5 h-3.5" />}
                {cat === 'Tip' && <Lightbulb className="w-3.5 h-3.5" />}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Specific Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
          
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-[#1C1917] flex items-center">
              <Bus className="w-3.5 h-3.5 text-[#1B4332] mr-1" />
              Which bus can I take?
            </label>
            <p className="text-[10px] text-stone-500 mb-1">Enter the bus number(s), e.g. 55Y, 38Y, 311</p>
            <input
              type="text"
              placeholder="e.g. 55Y, 38Y, 311"
              value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-[#1C1917] flex items-center">
              <DollarSign className="w-3.5 h-3.5 text-emerald-700 mr-1" />
              How much does the bus cost?
            </label>
            <p className="text-[10px] text-stone-500 mb-1">Enter the fare you paid.</p>
            <input
              type="text"
              placeholder="e.g. ₹25"
              value={fare}
              onChange={(e) => setFare(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-[#1C1917]">
              Where should I get down?
            </label>
            <p className="text-[10px] text-stone-500 mb-1">If you cannot reach the destination directly, enter the bus stop where you should get down.</p>
            <input
              type="text"
              placeholder="e.g. Duvvada"
              value={intermediateStop}
              onChange={(e) => setIntermediateStop(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-[#1C1917] flex items-center">
              <Navigation className="w-3.5 h-3.5 text-amber-700 mr-1" />
              How much does the auto usually cost?
            </label>
            <p className="text-[10px] text-stone-500 mb-1">Enter the fare you normally pay for the final part of the journey.</p>
            <input
              type="text"
              placeholder="e.g. ₹40"
              value={autoFare}
              onChange={(e) => setAutoFare(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-[#1C1917]">
              Where should I catch the bus?
            </label>
            <p className="text-[10px] text-stone-500 mb-1">Tell travelers where they should board the bus.</p>
            <input
              type="text"
              placeholder="e.g. Gajuwaka Main Bus Stop"
              value={boardingPoint}
              onChange={(e) => setBoardingPoint(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-[#1C1917]">
              How do I reach the destination from there?
            </label>
            <p className="text-[10px] text-stone-500 mb-1">Choose what travelers should use after getting off the bus.</p>
            <select
              value={lastMileMode}
              onChange={(e) => setLastMileMode(e.target.value as 'Auto' | 'Walk' | 'Shared Auto')}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            >
              <option value="Auto">Auto</option>
              <option value="Shared Auto">Other</option>
              <option value="Walk">Walk</option>
            </select>
          </div>

        </div>

        {/* Optional explicit note checkbox */}
        <div className="pt-2 border-t border-stone-100 flex items-start space-x-2">
          <input
            type="checkbox"
            id="noDirectBus"
            checked={explicitNoDirectBus}
            onChange={(e) => setExplicitNoDirectBus(e.target.checked)}
            className="w-4 h-4 text-[#1B4332] border-stone-300 rounded focus:ring-[#1B4332] mt-0.5"
          />
          <div className="space-y-1">
            <label htmlFor="noDirectBus" className="text-sm font-extrabold text-[#1C1917] flex items-center space-x-1 cursor-pointer">
              <Ban className="w-4 h-4 text-rose-600 mr-1 shrink-0" />
              <span>There is no direct bus to the destination</span>
            </label>
            <p className="text-xs text-stone-500">
              Check this if travelers need to get down at another stop and use another transport to reach the destination.
            </p>
          </div>
        </div>

        {/* Additional Local Tips */}
        <div className="space-y-1.5 pt-2 border-t border-stone-100">
          <label className="text-xs font-extrabold text-[#1C1917]">
            Anything else a traveler should know?
          </label>
          <textarea
            rows={3}
            placeholder="Share useful tips, recent changes, landmarks, timings, or anything that could help a first-time traveler..."
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
          />
        </div>

        {/* User Identity optional */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-[#1C1917]">
            Your name or nickname (optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Vizag Traveller"
            value={reporterName}
            onChange={(e) => setReporterName(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
          />
        </div>

        {/* Submit CTA */}
        <div className="pt-4 border-t border-stone-200">
          <button
            type="submit"
            className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-extrabold text-base py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <Share2 className="w-5 h-5" />
            <span>SHARE WHAT YOU KNOW</span>
          </button>
          
          <p className="text-[11px] text-stone-500 text-center mt-2">
            Status after submission: <strong className="text-amber-800">PENDING</strong>. Your information will be queued for platform verification.
          </p>
        </div>

      </form>

    </div>
  );
};
