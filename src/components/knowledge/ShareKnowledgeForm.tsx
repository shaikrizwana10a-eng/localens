import React, { useState } from 'react';
import { 
  Share2, 
  ShieldAlert, 
  CheckCircle2, 
  Bus, 
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
  onSuccess?: () => void;
  onNavigateToExplore?: () => void;
}

export const ShareKnowledgeForm: React.FC<ShareKnowledgeFormProps> = ({
  initialPlaceName = '',
  initialCategory = 'Transport',
  onSuccess,
  onNavigateToExplore
}) => {
  const { addSubmission } = useLocalKnowledge();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
      return;
    }

    setErrorMsg('');

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

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      
      {/* Page Header */}
      <div className="text-center space-y-2">
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
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 text-amber-950 space-y-2 shadow-xs">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-amber-800 shrink-0" />
          <h4 className="font-extrabold text-sm text-amber-900">
            LocalLens Verification Guarantee
          </h4>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed">
          Every submission is registered as <strong className="bg-amber-200/80 px-1 py-0.5 rounded text-amber-950">PENDING</strong>. Submissions with uploaded tickets, bills, or photo evidence receive the <span className="font-bold text-amber-950">Community + Evidence</span> badge. The platform Verification Desk will audit the details before granting the <strong className="text-emerald-900">LocalLens Verified</strong> stamp.
        </p>
      </div>

      {/* Post-submission Success Banner */}
      {submittedItem && (
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
          </div>
        </div>
      )}

      {/* Main Contribution Dynamic Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        
        {errorMsg && (
          <div className="bg-red-50 text-red-800 p-3.5 rounded-xl border border-red-200 text-xs font-bold flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

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
              </button>
            ))}
          </div>
        </div>

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

      </form>

    </div>
  );
};
