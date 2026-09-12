import React, { useState } from 'react';
import { 
  Share2, 
  ShieldAlert, 
  CheckCircle2, 
  Bus, 
<<<<<<< HEAD
  Hotel, 
  Utensils, 
  MapPin, 
  Navigation, 
  FileCheck, 
  Upload, 
  X, 
  AlertTriangle, 
  Lightbulb, 
  Check,
  Sparkles
} from 'lucide-react';
import { useLocalKnowledge } from '../../context/LocalKnowledgeContext';
import type { NewKnowledgeSubmission } from '../../types/localKnowledge';
import type { EvidenceType, EvidenceItem } from '../../types/provenance';
import { SourceBadge } from '../common/SourceBadge';

interface ShareKnowledgeFormProps {
  initialPlaceName?: string;
  initialCategory?: 'Transport' | 'Stay' | 'Food';
=======
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
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
  onSuccess?: () => void;
  onNavigateToExplore?: () => void;
}

export const ShareKnowledgeForm: React.FC<ShareKnowledgeFormProps> = ({
<<<<<<< HEAD
  initialPlaceName = '',
  initialCategory = 'Transport',
=======
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
  onSuccess,
  onNavigateToExplore
}) => {
  const { addSubmission } = useLocalKnowledge();

<<<<<<< HEAD
  // Primary Knowledge Type Selection (Section 9 Requirement)
  const [activeTab, setActiveTab] = useState<'Transport' | 'Stay' | 'Food'>(initialCategory);

  // Common Fields
  const [reporterName, setReporterName] = useState('');
  const [localTip, setLocalTip] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Transport Category Fields
  const [transportType, setTransportType] = useState('Bus');
  const [transportFrom, setTransportFrom] = useState('Gajuwaka');
  const [transportTo, setTransportTo] = useState(initialPlaceName || 'RK Beach');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [boardingPoint, setBoardingPoint] = useState('');
  const [dropPoint, setDropPoint] = useState('');
  const [transportFare, setTransportFare] = useState('');
  const [travelTime, setTravelTime] = useState('');
  const [serviceTiming, setServiceTiming] = useState('');

  // Stay Category Fields
  const [propertyName, setPropertyName] = useState('');
  const [stayCity, setStayCity] = useState(initialPlaceName || 'Visakhapatnam');
  const [stayType, setStayType] = useState('Budget Hotel');
  const [stayPrice, setStayPrice] = useState('');
  const [roomInfo, setRoomInfo] = useState('');
  const [amenities, setAmenities] = useState('Wi-Fi, AC, Hot Water, Parking');
  const [checkInOut, setCheckInOut] = useState('12:00 PM / 11:00 AM');

  // Food Category Fields
  const [restaurantName, setRestaurantName] = useState('');
  const [foodLocation, setFoodLocation] = useState(initialPlaceName || 'Visakhapatnam');
  const [cuisine, setCuisine] = useState('Andhra Cuisine');
  const [foodPriceRange, setFoodPriceRange] = useState('');
  const [popularDish, setPopularDish] = useState('');
  const [isVeg, setIsVeg] = useState(false);
  const [openingHours, setOpeningHours] = useState('11:30 AM – 10:30 PM');

  // Evidence Attachment State
  const [evidenceType, setEvidenceType] = useState<EvidenceType>('TICKET');
  const [evidenceFile, setEvidenceFile] = useState<{ name: string; size: string; previewUrl: string } | null>(null);

  // Submission State Feedback
  const [submittedItem, setSubmittedItem] = useState<{
    id: string;
    title: string;
    category: string;
    hasEvidence: boolean;
  } | null>(null);

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEvidenceFile({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        previewUrl: URL.createObjectURL(file)
      });
    }
  };

  const handleQuickAttachProof = (type: EvidenceType, label: string) => {
    setEvidenceType(type);
    setEvidenceFile({
      name: `${label.replace(/\s+/g, '_')}_Proof.jpg`,
      size: '142.5 KB',
      previewUrl: type === 'TICKET' 
        ? 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400'
        : 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400'
    });
  };
=======
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
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

<<<<<<< HEAD
    // Validation per tab
    if (activeTab === 'Transport' && (!transportFrom.trim() || !transportTo.trim())) {
      setErrorMsg('Please specify both Origin (From) and Destination (To) for this transport route.');
      return;
    }
    if (activeTab === 'Stay' && !propertyName.trim()) {
      setErrorMsg('Please specify the Property / Hotel name.');
      return;
    }
    if (activeTab === 'Food' && !restaurantName.trim()) {
      setErrorMsg('Please specify the Restaurant or Food Stall name.');
=======
    if (!from.trim() || !to.trim()) {
      setErrorMsg('Please enter both Origin (From) and Destination (To).');
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
      return;
    }

    setErrorMsg('');

<<<<<<< HEAD
    const evidenceList: EvidenceItem[] = evidenceFile ? [
      {
        id: `ev-${Date.now()}`,
        uploaded_by: reporterName ? `@${reporterName.replace('@', '')}` : 'Local Contributor',
        evidence_type: evidenceType,
        file_path: `/evidence/${evidenceFile.name}`,
        file_name: evidenceFile.name,
        preview_url: evidenceFile.previewUrl,
        created_at: new Date().toISOString().split('T')[0],
        is_verified: false
      }
    ] : [];

    let submission: NewKnowledgeSubmission;

    if (activeTab === 'Transport') {
      submission = {
        from: transportFrom,
        to: transportTo,
        category: 'Transport',
        transportType,
        busNumber: vehicleNumber || undefined,
        fare: transportFare ? (transportFare.startsWith('₹') ? transportFare : `₹${transportFare}`) : undefined,
        boardingPoint: boardingPoint || undefined,
        dropPoint: dropPoint || undefined,
        travelTime: travelTime || undefined,
        timing: serviceTiming || undefined,
        additionalInfo: localTip || undefined,
        reportedBy: reporterName ? `Local User @${reporterName.replace('@', '')}` : 'Local Contributor',
        sourceType: 'COMMUNITY',
        evidence: evidenceList
      };
    } else if (activeTab === 'Stay') {
      submission = {
        from: stayCity,
        to: propertyName,
        category: 'Stay',
        propertyName,
        stayType,
        fare: stayPrice ? (stayPrice.startsWith('₹') ? stayPrice : `₹${stayPrice}`) : undefined,
        roomInfo: roomInfo || undefined,
        amenities,
        checkInOut,
        boardingPoint: stayCity,
        dropPoint: propertyName,
        additionalInfo: localTip || undefined,
        reportedBy: reporterName ? `Local User @${reporterName.replace('@', '')}` : 'Local Contributor',
        sourceType: 'COMMUNITY',
        evidence: evidenceList
      };
    } else {
      submission = {
        from: foodLocation,
        to: restaurantName,
        category: 'Food',
        restaurantName,
        cuisine,
        popularDish,
        fare: foodPriceRange ? (foodPriceRange.startsWith('₹') ? foodPriceRange : `₹${foodPriceRange}`) : undefined,
        isVeg,
        openingHours,
        boardingPoint: foodLocation,
        dropPoint: restaurantName,
        additionalInfo: localTip || undefined,
        reportedBy: reporterName ? `Local User @${reporterName.replace('@', '')}` : 'Local Contributor',
        sourceType: 'COMMUNITY',
        evidence: evidenceList
      };
    }

    const created = addSubmission(submission);

    setSubmittedItem({
      id: created.id,
      title: activeTab === 'Transport' ? `${created.from} → ${created.to}` : created.to,
      category: activeTab,
      hasEvidence: evidenceList.length > 0
    });

    // Reset fields
    setVehicleNumber('');
    setTransportFare('');
    setBoardingPoint('');
    setDropPoint('');
    setPropertyName('');
    setRestaurantName('');
    setPopularDish('');
    setLocalTip('');
    setEvidenceFile(null);
=======
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
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      
      {/* Page Header */}
      <div className="text-center space-y-2">
<<<<<<< HEAD
        <div className="inline-flex items-center space-x-1.5 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border border-emerald-700">
          <Share2 className="w-3.5 h-3.5" />
          <span>Local Community Contribution Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Share Local Travel Knowledge
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Help fellow travelers with ground-truth local information. Submissions enter the Verification Desk as <strong>Pending</strong> with evidence auditing.
        </p>
      </div>

      {/* Verification Policy Alert */}
=======
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
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 text-amber-950 space-y-2 shadow-xs">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-amber-800 shrink-0" />
          <h4 className="font-extrabold text-sm text-amber-900">
<<<<<<< HEAD
            LocalLens Verification Guarantee
          </h4>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed">
          Every submission is registered as <strong className="bg-amber-200/80 px-1 py-0.5 rounded text-amber-950">PENDING</strong>. Submissions with uploaded tickets, bills, or photo evidence receive the <span className="font-bold text-amber-950">Community + Evidence</span> badge. The platform Verification Desk will audit the details before granting the <strong className="text-emerald-900">LocalLens Verified</strong> stamp.
=======
            How Submission Verification Works
          </h4>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed">
          When you submit information (e.g., Gajuwaka → Vignan College, Bus 38K to Duvvada Stop, Auto to Campus, Fare ₹20 + ₹40), it is stored as <strong className="bg-amber-200 px-1 py-0.5 rounded text-amber-950">PENDING</strong>. Even a <strong>single verified report</strong> allows LOCAL Route Intelligence to generate practical routes for future travelers!
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
        </p>
      </div>

      {/* Post-submission Success Banner */}
      {submittedItem && (
<<<<<<< HEAD
        <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-7 border border-emerald-700 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-black uppercase tracking-wide">
                  {submittedItem.category} SUBMISSION
                </span>
                <h3 className="font-black text-xl text-white">
                  Contribution Submitted for Verification!
                </h3>
                <p className="text-xs text-emerald-200">
                  Your information for <strong>{submittedItem.title}</strong> has been sent to the LocalLens Verification Desk.
                </p>
              </div>
            </div>

            <SourceBadge 
              sourceType="COMMUNITY" 
              verificationStatus="PENDING" 
              hasEvidence={submittedItem.hasEvidence} 
              size="md"
            />
          </div>

          <div className="bg-emerald-900/60 p-4 rounded-2xl border border-emerald-700/60 text-xs space-y-1.5">
            <div className="font-bold text-emerald-300 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              🟡 Pending Verification Desk Review
            </div>
            <p className="text-emerald-100 text-[11px] leading-relaxed">
              Your information has been submitted to the LocalLens Verification Desk. It is safely recorded and awaiting auditor validation before becoming publicly stamped.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {onNavigateToExplore && (
              <button
                onClick={onNavigateToExplore}
                className="bg-white text-[#1B4332] hover:bg-emerald-50 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                View in Knowledge Explorer →
              </button>
            )}
            <button
              onClick={() => setSubmittedItem(null)}
              className="text-xs text-emerald-300 hover:text-white underline font-medium cursor-pointer"
            >
              Submit Another Fact
            </button>
=======
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
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
          </div>
        </div>
      )}

<<<<<<< HEAD
      {/* Main Contribution Dynamic Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        
        {errorMsg && (
          <div className="bg-red-50 text-red-800 p-3.5 rounded-xl border border-red-200 text-xs font-bold flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
=======
      {/* Main Submission Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
        
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-300 text-rose-800 p-3.5 rounded-xl text-xs font-semibold flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1.5 text-rose-600 shrink-0" />
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
            <span>{errorMsg}</span>
          </div>
        )}

<<<<<<< HEAD
        {/* SECTION 9: WHAT DO YOU KNOW? Category Selector */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            What do you know? (Select Category)
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'Transport', label: 'Transport', icon: <Bus className="w-4 h-4" />, desc: 'Buses, Routes, Fares, Stands' },
              { id: 'Stay', label: 'Stay', icon: <Hotel className="w-4 h-4" />, desc: 'Hotels, Homestays, Hygiene' },
              { id: 'Food', label: 'Food', icon: <Utensils className="w-4 h-4" />, desc: 'Restaurants, Dishes, Price bands' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  activeTab === tab.id
                    ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-md scale-[1.01]'
                    : 'bg-[#FAF9F6] text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`p-1.5 rounded-lg ${activeTab === tab.id ? 'bg-emerald-800 text-white' : 'bg-stone-200 text-stone-700'}`}>
                    {tab.icon}
                  </div>
                  <span className="font-black text-sm">{tab.label}</span>
                </div>
                <span className={`text-[10px] mt-2 hidden sm:block ${activeTab === tab.id ? 'text-emerald-200' : 'text-stone-500'}`}>
                  {tab.desc}
                </span>
=======
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
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
              </button>
            ))}
          </div>
        </div>

<<<<<<< HEAD
        {/* ------------------------------------------------------------- */}
        {/* DYNAMIC FORM SECTION 1: TRANSPORT */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'Transport' && (
          <div className="space-y-4 pt-2 border-t border-stone-100">
            <h3 className="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center">
              <Bus className="w-4 h-4 mr-1.5 text-[#1B4332]" />
              Transport Route & Fare Details
            </h3>

            {/* Transport Type Pills */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-stone-600">Transport Type</label>
              <div className="flex flex-wrap gap-2">
                {['Bus', 'Train', 'Metro', 'Auto', 'Cab', 'Rental', 'Other'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTransportType(type)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      transportType === type
                        ? 'bg-[#1B4332] text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Route Origin & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-700 flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-[#1B4332]" />
                  From (Origin) *
                </label>
                <input
                  type="text"
                  required
                  value={transportFrom}
                  onChange={(e) => setTransportFrom(e.target.value)}
                  placeholder="e.g. Gajuwaka Bus Stand"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2.5 text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-700 flex items-center">
                  <Navigation className="w-3.5 h-3.5 mr-1 text-[#1B4332]" />
                  To (Destination) *
                </label>
                <input
                  type="text"
                  required
                  value={transportTo}
                  onChange={(e) => setTransportTo(e.target.value)}
                  placeholder="e.g. RK Beach"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2.5 text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>
            </div>

            {/* Service Number, Fare, Travel Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-600">Service / Vehicle Number</label>
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  placeholder="e.g. APSRTC Bus 99"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-600">Actual Ticket Fare (₹)</label>
                <input
                  type="text"
                  value={transportFare}
                  onChange={(e) => setTransportFare(e.target.value)}
                  placeholder="e.g. ₹45"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-emerald-800 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-600">Travel Time</label>
                <input
                  type="text"
                  value={travelTime}
                  onChange={(e) => setTravelTime(e.target.value)}
                  placeholder="e.g. 45 minutes"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>
            </div>

            {/* Boarding Point, Drop Point & Timing */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-600">Boarding Point / Platform</label>
                <input
                  type="text"
                  value={boardingPoint}
                  onChange={(e) => setBoardingPoint(e.target.value)}
                  placeholder="e.g. Gajuwaka Bus Stand — Platform 2"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-600">Drop Point</label>
                <input
                  type="text"
                  value={dropPoint}
                  onChange={(e) => setDropPoint(e.target.value)}
                  placeholder="e.g. Submarine Museum Shelter"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-600">First / Last Bus Timings</label>
                <input
                  type="text"
                  value={serviceTiming}
                  onChange={(e) => setServiceTiming(e.target.value)}
                  placeholder="e.g. First: 06:00 AM, Last: 09:30 PM"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* DYNAMIC FORM SECTION 2: STAY */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'Stay' && (
          <div className="space-y-4 pt-2 border-t border-stone-100">
            <h3 className="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center">
              <Hotel className="w-4 h-4 mr-1.5 text-[#1B4332]" />
              Accommodation Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-700">Property / Stay Name *</label>
                <input
                  type="text"
                  required
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  placeholder="e.g. Sagar Kanya Homestay or Hotel Sea Pearl"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2.5 text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-700">City / Destination *</label>
                <input
                  type="text"
                  required
                  value={stayCity}
                  onChange={(e) => setStayCity(e.target.value)}
                  placeholder="e.g. Visakhapatnam or Tirupati"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2.5 text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-600">Stay Type</label>
                <select
                  value={stayType}
                  onChange={(e) => setStayType(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                >
                  <option value="Budget Hotel">Budget Hotel</option>
                  <option value="Homestay">Homestay</option>
                  <option value="Dharamshala">Dharamshala</option>
                  <option value="Boutique Stay">Boutique Stay</option>
                  <option value="Resort">Resort</option>
                  <option value="Hostel">Hostel</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-600">Price per Night (₹)</label>
                <input
                  type="text"
                  value={stayPrice}
                  onChange={(e) => setStayPrice(e.target.value)}
                  placeholder="e.g. ₹1,200 – ₹1,800"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-emerald-800 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-600">Check-in / Check-out</label>
                <input
                  type="text"
                  value={checkInOut}
                  onChange={(e) => setCheckInOut(e.target.value)}
                  placeholder="e.g. 12:00 PM / 11:00 AM"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-600">Amenities (Comma separated)</label>
                <input
                  type="text"
                  value={amenities}
                  onChange={(e) => setAmenities(e.target.value)}
                  placeholder="e.g. Wi-Fi, Parking, AC, Hot Water"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-600">Room Types</label>
                <input
                  type="text"
                  value={roomInfo}
                  onChange={(e) => setRoomInfo(e.target.value)}
                  placeholder="e.g. Standard AC, Deluxe Sea View"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* DYNAMIC FORM SECTION 3: FOOD */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'Food' && (
          <div className="space-y-4 pt-2 border-t border-stone-100">
            <h3 className="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center">
              <Utensils className="w-4 h-4 mr-1.5 text-[#1B4332]" />
              Food & Restaurant Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-700">Restaurant / Food Location Name *</label>
                <input
                  type="text"
                  required
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  placeholder="e.g. Sri Kanya Comfort or Maurya Mess"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2.5 text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-700">Location / City *</label>
                <input
                  type="text"
                  required
                  value={foodLocation}
                  onChange={(e) => setFoodLocation(e.target.value)}
                  placeholder="e.g. Dwaraka Nagar, Visakhapatnam"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2.5 text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-600">Cuisine Style</label>
                <input
                  type="text"
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  placeholder="e.g. Andhra Meals, Rayalaseema, Seafood"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-600">Price Range (₹)</label>
                <input
                  type="text"
                  value={foodPriceRange}
                  onChange={(e) => setFoodPriceRange(e.target.value)}
                  placeholder="e.g. ₹200 – ₹400"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-emerald-800 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-600">Dietary Availability</label>
                <select
                  value={isVeg ? 'veg' : 'nonveg'}
                  onChange={(e) => setIsVeg(e.target.value === 'veg')}
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                >
                  <option value="veg">🟢 Pure Vegetarian</option>
                  <option value="nonveg">🔴 Non-Vegetarian / Mixed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-600">Popular Dish / Must-Try</label>
                <input
                  type="text"
                  value={popularDish}
                  onChange={(e) => setPopularDish(e.target.value)}
                  placeholder="e.g. Andhra Meals, Tiger Prawn Roast"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-600">Opening Hours</label>
                <input
                  type="text"
                  value={openingHours}
                  onChange={(e) => setOpeningHours(e.target.value)}
                  placeholder="e.g. 11:30 AM – 4:00 PM, 7:00 PM – 10:30 PM"
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* COMMON SECTION: LOCAL TIP / ADVICE */}
        {/* ------------------------------------------------------------- */}
        <div className="space-y-1.5 pt-2 border-t border-stone-100">
          <label className="text-xs font-black text-stone-800 flex items-center">
            <Lightbulb className="w-3.5 h-3.5 mr-1 text-amber-600" />
            Local Practical Tip / Advice
          </label>
          <textarea
            rows={3}
            value={localTip}
            onChange={(e) => setLocalTip(e.target.value)}
            placeholder={
              activeTab === 'Transport' 
                ? 'e.g. During peak hours, board from Platform 2 to get a seat.'
                : activeTab === 'Stay'
                ? 'e.g. Ask for rooms facing the main road if you want easier transport access.'
                : 'e.g. Best time to visit is before 1:00 PM to avoid long lunch lines.'
            }
            className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
          />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* COMMON SECTION: EVIDENCE UPLOADER */}
        {/* ------------------------------------------------------------- */}
        <div className="space-y-3 pt-3 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-xs font-black text-stone-900 flex items-center uppercase tracking-wider">
                <FileCheck className="w-4 h-4 mr-1.5 text-amber-700" />
                Attach Supporting Evidence (Receipt / Ticket / Photo)
              </label>
              <p className="text-[11px] text-stone-500">
                Evidence is securely held for the Verification Desk and unlocks the <strong>Community + Evidence</strong> badge.
              </p>
            </div>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded">
              Audited Securely
            </span>
          </div>

          {/* Evidence Type Selector */}
          <div className="flex flex-wrap gap-2 text-xs">
            {(['TICKET', 'RECEIPT', 'PHOTO', 'SCREENSHOT', 'OTHER'] as EvidenceType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setEvidenceType(type)}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  evidenceType === type
                    ? 'bg-amber-800 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Upload Input Area */}
          {!evidenceFile ? (
            <div className="border-2 border-dashed border-stone-300 hover:border-amber-500 rounded-2xl p-4 sm:p-5 text-center bg-[#FAF9F6] space-y-2 transition-colors">
              <Upload className="w-6 h-6 text-stone-400 mx-auto" />
              <div className="space-y-0.5">
                <span className="font-bold text-stone-800 text-xs block">
                  Upload file (JPG, PNG, PDF up to 10MB)
                </span>
                <span className="text-[11px] text-stone-400 block">
                  Drag and drop here, or select a file
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <label className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl cursor-pointer">
                  Browse File
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleSimulatedFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Quick attach demo helpers */}
                <button
                  type="button"
                  onClick={() => handleQuickAttachProof(
                    activeTab === 'Transport' ? 'TICKET' : activeTab === 'Stay' ? 'RECEIPT' : 'RECEIPT',
                    activeTab === 'Transport' ? 'Bus Ticket' : activeTab === 'Stay' ? 'Hotel Bill' : 'Restaurant Receipt'
                  )}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-extrabold px-3 py-1.5 rounded-xl border border-amber-300 transition-colors cursor-pointer"
                >
                  ⚡ Attach Demo {activeTab === 'Transport' ? 'Ticket' : 'Receipt'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50/80 border border-amber-300 p-3.5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src={evidenceFile.previewUrl} 
                  alt="Proof preview" 
                  className="w-12 h-12 rounded-xl object-cover border border-amber-200" 
                />
                <div>
                  <strong className="text-xs text-amber-950 font-black block truncate max-w-xs">
                    {evidenceFile.name}
                  </strong>
                  <span className="text-[11px] text-amber-800 font-bold block">
                    Type: {evidenceType} • Size: {evidenceFile.size}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEvidenceFile(null)}
                className="p-1.5 rounded-full text-amber-800 hover:text-red-700 hover:bg-amber-200/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Contributor Nickname */}
        <div className="space-y-1 pt-1 border-t border-stone-100">
          <label className="text-[11px] font-bold text-stone-600">
            Contributor Name or Handle (Optional)
          </label>
          <input
            type="text"
            value={reporterName}
            onChange={(e) => setReporterName(e.target.value)}
            placeholder="e.g. vizag_commuter or rohit_travels"
            className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
          />
        </div>

        {/* Form Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white py-3 rounded-2xl font-black text-sm transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
        >
          <Check className="w-4 h-4 text-emerald-300" />
          <span>Submit for Verification</span>
        </button>
=======
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
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04

      </form>

    </div>
  );
};
