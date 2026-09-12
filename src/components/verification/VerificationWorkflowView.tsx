import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RotateCcw,
<<<<<<< HEAD
  Clock, 
  FileCheck, 
  History,
  UserCheck,
  Filter,
  Bus,
  Hotel,
  Utensils,
  Compass,
  Database,
  Search
} from 'lucide-react';
import { useLocalKnowledge } from '../../context/LocalKnowledgeContext';
import { SourceBadge } from '../common/SourceBadge';
import type { LocalKnowledgeItem } from '../../types/localKnowledge';
import { TransportDatasetService } from '../../services/transportDatasetService';
import type { ScoredRouteRecord } from '../../types/transportDataset';

export const VerificationWorkflowView: React.FC = () => {
  const { 
    items, 
    outdatedReports, 
    metrics, 
    verifyItem, 
    rejectItem, 
    requestMoreInfoItem, 
    reVerifyItem,
    reportOutdated 
  } = useLocalKnowledge();

  // Section 12 Filters
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'DESTINATIONS' | 'TRANSPORT' | 'STAYS' | 'FOOD'>('ALL');
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'under_review' | 'verified' | 'outdated' | 'rejected' | 'reports' | 'dataset'>('pending');
  const [actionNotice, setActionNotice] = useState<string>('');

  // Rejection & Request Info Modal States
  const [rejectingItemId, setRejectingItemId] = useState<string | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState<string>('Fact could not be confirmed with official ground-truth records.');
  const [requestingItemId, setRequestingItemId] = useState<string | null>(null);
  const [requestNotesInput, setRequestNotesInput] = useState<string>('Please provide a physical ticket photo or conductor confirmation for this stop.');
  const [viewingAuditItem, setViewingAuditItem] = useState<string | null>(null);

  // Transport Dataset Management State
  const datasetStats = TransportDatasetService.getDatasetStats();
  const datasetDepots = TransportDatasetService.getDepots();
  const [adminTestFrom, setAdminTestFrom] = useState('Duvvada');
  const [adminTestTo, setAdminTestTo] = useState('RTC Complex');
  const [adminTestResults, setAdminTestResults] = useState<ScoredRouteRecord[]>([]);

  const runAdminTestQuery = () => {
    TransportDatasetService.searchRoutes({
      from: adminTestFrom,
      to: adminTestTo,
      limit: 10
    }).then(res => {
      setAdminTestResults(res.results);
    });
  };

  // Helper to categorize item
  const getItemCategoryType = (item: LocalKnowledgeItem): 'DESTINATIONS' | 'TRANSPORT' | 'STAYS' | 'FOOD' => {
    const cat = item.category?.toLowerCase() || '';
    if (cat === 'stay') return 'STAYS';
    if (cat === 'food') return 'FOOD';
    if (cat === 'destination' || cat === 'experience' || cat === 'tip') return 'DESTINATIONS';
    return 'TRANSPORT';
  };

  // Filter items by category first
  const categoryFilteredItems = items.filter((item) => {
    if (selectedCategory === 'ALL') return true;
    return getItemCategoryType(item) === selectedCategory;
  });

  // Filter items by status tab
  const getTabFilteredItems = () => {
    if (activeTab === 'all') return categoryFilteredItems;
    if (activeTab === 'pending') return categoryFilteredItems.filter((i) => i.status === 'PENDING');
    if (activeTab === 'under_review') return categoryFilteredItems.filter((i) => i.status === 'UNDER_REVIEW');
    if (activeTab === 'verified') return categoryFilteredItems.filter((i) => i.status === 'VERIFIED');
    if (activeTab === 'outdated') return categoryFilteredItems.filter((i) => i.status === 'OUTDATED');
    if (activeTab === 'rejected') return categoryFilteredItems.filter((i) => i.status === 'REJECTED');
    return [];
  };

  const displayedItems = getTabFilteredItems();

  const handleApprove = (id: string, label: string) => {
    verifyItem(id, 'Admin @localens_desk');
    setActionNotice(`Approved "${label}"! Status transitioned to VERIFIED. Audited date & badge stamped.`);
    setTimeout(() => setActionNotice(''), 4500);
  };

  const handleRejectConfirm = (id: string, label: string) => {
    rejectItem(id, rejectionReasonInput);
    setRejectingItemId(null);
    setActionNotice(`Rejected submission for "${label}". Reason logged in immutable audit history.`);
    setTimeout(() => setActionNotice(''), 4500);
  };

  const handleRequestInfoConfirm = (id: string, label: string) => {
    requestMoreInfoItem(id, requestNotesInput);
    setRequestingItemId(null);
    setActionNotice(`Moved "${label}" to UNDER_REVIEW. Audit note recorded.`);
    setTimeout(() => setActionNotice(''), 4500);
  };

  const handleMarkOutdated = (id: string, label: string) => {
    reportOutdated(id, 'Admin flagged information as outdated for on-ground re-audit');
    setActionNotice(`Marked "${label}" as OUTDATED. Queued for desk re-audit.`);
    setTimeout(() => setActionNotice(''), 4500);
  };

  const handleReVerify = (id: string, label: string) => {
    reVerifyItem(id, 'Admin Re-verification Desk');
    setActionNotice(`Re-verified "${label}"! Outdated flag cleared, status reset to VERIFIED.`);
    setTimeout(() => setActionNotice(''), 4500);
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'STAYS':
        return <Hotel className="w-3.5 h-3.5 text-amber-500" />;
      case 'FOOD':
        return <Utensils className="w-3.5 h-3.5 text-rose-500" />;
      case 'DESTINATIONS':
        return <Compass className="w-3.5 h-3.5 text-blue-500" />;
      default:
        return <Bus className="w-3.5 h-3.5 text-emerald-500" />;
    }
  };

  const getTargetItemForAudit = () => items.find((i) => i.id === viewingAuditItem);

  return (
    <div className="space-y-8 pb-16 text-xs">
      
      {/* Verification Desk Header */}
      <div className="bg-[#1C1917] text-white p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border border-emerald-700">
              <ShieldCheck className="w-4 h-4" />
              <span>LocalLens Verification Desk Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Cross-Module Verification & Audit Dashboard
            </h1>
            <p className="text-stone-400 text-xs max-w-2xl leading-relaxed">
              Google Maps discovers basic places. Local travelers submit routes, stays, and regional dishes. The Verification Desk audits evidence, verifies ground-truth data, and maintains the trusted <strong>LocalLens Verified</strong> state across <strong>Destinations, Transport, Stays & Food</strong>.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-stone-900 px-4 py-2.5 rounded-2xl border border-stone-800 shrink-0">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-[10px] text-stone-400 block font-bold uppercase">Authorized Officer</span>
              <span className="font-extrabold text-white text-xs">Platform Lead Auditor</span>
            </div>
          </div>
        </div>

        {/* Real Live Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          <div className="bg-stone-900/90 border border-stone-800 p-3 rounded-2xl space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Total Items</span>
            <div className="text-2xl font-black text-white">{metrics.totalContributions}</div>
          </div>

          <div className="bg-amber-950/40 border border-amber-800/40 p-3 rounded-2xl space-y-1">
            <span className="text-[10px] font-bold text-amber-300 uppercase">Pending</span>
            <div className="text-2xl font-black text-amber-400">{metrics.pendingVerification}</div>
          </div>

          <div className="bg-orange-950/40 border border-orange-800/40 p-3 rounded-2xl space-y-1">
            <span className="text-[10px] font-bold text-orange-300 uppercase">Under Review</span>
            <div className="text-2xl font-black text-orange-400">{metrics.underReview}</div>
          </div>

          <div className="bg-emerald-950/50 border border-emerald-800/40 p-3 rounded-2xl space-y-1">
            <span className="text-[10px] font-bold text-emerald-300 uppercase">Verified</span>
            <div className="text-2xl font-black text-emerald-400">{metrics.verifiedCount}</div>
          </div>

          <div className="bg-red-950/40 border border-red-800/40 p-3 rounded-2xl space-y-1">
            <span className="text-[10px] font-bold text-red-300 uppercase">Outdated</span>
            <div className="text-2xl font-black text-red-400">{metrics.outdatedCount}</div>
          </div>

          <div className="bg-stone-900 border border-stone-800 p-3 rounded-2xl space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Rejected</span>
            <div className="text-2xl font-black text-stone-400">{metrics.rejectedCount}</div>
          </div>

          <div className="bg-amber-900/30 border border-amber-700/30 p-3 rounded-2xl space-y-1">
            <span className="text-[10px] font-bold text-amber-200 uppercase">With Evidence</span>
            <div className="text-2xl font-black text-amber-300">{metrics.evidenceBackedCount}</div>
=======
  Clock,
  Star,
  Bus,
  Banknote,
  Sparkles,
  PartyPopper
} from 'lucide-react';
import { useLocalKnowledge } from '../../context/LocalKnowledgeContext';

export const VerificationWorkflowView: React.FC = () => {
  const { items, verifyItem, rejectItem, reVerifyItem } = useLocalKnowledge();
  const [activeTab, setActiveTab] = useState<'pending' | 'outdated' | 'verified'>('pending');
  const [actionNotice, setActionNotice] = useState<string>('');

  const pendingItems = items.filter((i) => i.status === 'PENDING');
  const outdatedItems = items.filter((i) => i.status === 'OUTDATED');
  const verifiedItems = items.filter((i) => i.status === 'VERIFIED');

  const handleApprove = (id: string, route: string) => {
    verifyItem(id);
    setActionNotice(`Approved report for "${route}"! Status transitioned PENDING → VERIFIED.`);
    setTimeout(() => setActionNotice(''), 4000);
  };

  const handleReject = (id: string, route: string) => {
    rejectItem(id, 'Information unconfirmed by platform audit');
    setActionNotice(`Rejected submission for "${route}".`);
    setTimeout(() => setActionNotice(''), 4000);
  };

  const handleReVerify = (id: string, route: string) => {
    reVerifyItem(id);
    setActionNotice(`Re-verified report for "${route}"! Status reset to VERIFIED with current date.`);
    setTimeout(() => setActionNotice(''), 4000);
  };

  const workflowSteps = [
    { title: 'USER SUBMITS', desc: 'Traveler submits local bus number, fare, or tip' },
    { title: 'PENDING STATUS', desc: 'Stored as unverified pending report (₹ fare hidden from official stamp)' },
    { title: 'ADMIN REVIEW', desc: 'Platform desk & scouts verify bus routes and ticket data' },
    { title: 'VERIFIED BRAND', desc: 'Stamped with Verified badge and actual verification date' },
    { title: 'TRAVELER USES IT', desc: 'Traveler boards bus using accurate local knowledge' },
    { title: 'TRAVELER RATES IT', desc: 'Traveler leaves 1-5 star community rating' },
    { title: 'RE-VERIFICATION', desc: 'Outdated info flagged by community gets refreshed' }
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* View Header */}
      <div className="bg-[#1C1917] text-white p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-xl space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>LOCAL Verification Desk</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Platform Verification Workflow
        </h2>

        <p className="text-stone-300 text-sm max-w-3xl leading-relaxed">
          Why verification matters: Raw internet advice can be wrong or outdated. LOCAL validates community reports before stamping them as <strong>VERIFIED</strong> with real audit dates.
        </p>

        {/* Visual Workflow Pipeline Diagram */}
        <div className="pt-4 border-t border-stone-800">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
            The 7-Step Verification Loop
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="bg-stone-900/90 border border-stone-800 p-2.5 rounded-xl space-y-1">
                <span className="text-[10px] font-extrabold text-emerald-400 bg-stone-800 px-1.5 py-0.5 rounded">
                  0{idx + 1}
                </span>
                <div className="font-extrabold text-white text-[11px] leading-tight">
                  {step.title}
                </div>
                <div className="text-[10px] text-stone-400 leading-snug">
                  {step.desc}
                </div>
              </div>
            ))}
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
          </div>
        </div>

      </div>

      {/* Action Toast Alert */}
      {actionNotice && (
<<<<<<< HEAD
        <div className="bg-emerald-900 text-emerald-100 p-4 rounded-2xl border border-emerald-700 font-bold flex items-center justify-between shadow-md animate-in fade-in duration-150">
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
            <span>{actionNotice}</span>
          </div>
          <button 
            onClick={() => setActionNotice('')}
            className="text-xs text-emerald-300 hover:text-white underline font-semibold cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION 12: CATEGORY FILTERS */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1 text-[#1B4332]" />
            Filter by Module Category
          </span>
          <span className="text-[11px] text-stone-400">
            Unified verification architecture across modules
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'ALL', label: 'All Categories', count: items.length },
            { id: 'DESTINATIONS', label: '📍 Destinations', count: items.filter(i => getItemCategoryType(i) === 'DESTINATIONS').length },
            { id: 'TRANSPORT', label: '🚌 Transport', count: items.filter(i => getItemCategoryType(i) === 'TRANSPORT').length },
            { id: 'STAYS', label: '🏨 Stays', count: items.filter(i => getItemCategoryType(i) === 'STAYS').length },
            { id: 'FOOD', label: '🍴 Food', count: items.filter(i => getItemCategoryType(i) === 'FOOD').length }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-[#1B4332] text-white shadow-sm'
                  : 'bg-[#FAF9F6] text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-black ${
                selectedCategory === cat.id ? 'bg-emerald-800 text-emerald-200' : 'bg-stone-200 text-stone-600'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 12: STATUS FILTERS */}
      {/* ------------------------------------------------------------- */}
      <div className="flex items-center space-x-2 border-b border-stone-200 pb-3 overflow-x-auto custom-scrollbar">
        {[
          { id: 'all', label: `All Statuses (${categoryFilteredItems.length})` },
          { id: 'pending', label: `Pending (${categoryFilteredItems.filter(i => i.status === 'PENDING').length})` },
          { id: 'under_review', label: `Under Review (${categoryFilteredItems.filter(i => i.status === 'UNDER_REVIEW').length})` },
          { id: 'verified', label: `Verified (${categoryFilteredItems.filter(i => i.status === 'VERIFIED').length})` },
          { id: 'outdated', label: `Outdated (${categoryFilteredItems.filter(i => i.status === 'OUTDATED').length})` },
          { id: 'rejected', label: `Rejected (${categoryFilteredItems.filter(i => i.status === 'REJECTED').length})` },
          { id: 'reports', label: `User Outdated Reports (${outdatedReports.length})` },
          { id: 'dataset', label: `🚌 Transport Dataset (${datasetStats.uniqueRoutesCount})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TRANSPORT DATASET MANAGEMENT TAB                              */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'dataset' ? (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <div className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-950 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-1">
                  <Database className="w-3 h-3 text-emerald-800" />
                  <span>Structured Transit Dataset Registry</span>
                </div>
                <h3 className="font-black text-stone-900 text-lg">
                  Visakhapatnam APSRTC Bus Dataset
                </h3>
                <p className="text-xs text-stone-500">
                  Cleaned, deduplicated, and normalized bus routes stored in PostgreSQL transport_routes table.
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-stone-400 font-bold uppercase block">Source File</span>
                <span className="text-xs font-extrabold text-stone-800 bg-stone-100 px-2.5 py-1 rounded-lg inline-block">
                  {datasetStats.sourceFile}
                </span>
              </div>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-[#FAF9F6] p-3.5 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-400 font-bold uppercase block">Total Raw Rows</span>
                <strong className="text-xl font-black text-stone-900">{datasetStats.totalRawRows}</strong>
              </div>
              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
                <span className="text-[10px] text-emerald-700 font-bold uppercase block">Clean Active Routes</span>
                <strong className="text-xl font-black text-emerald-800">{datasetStats.uniqueRoutesCount}</strong>
              </div>
              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200">
                <span className="text-[10px] text-amber-700 font-bold uppercase block">Duplicates Filtered</span>
                <strong className="text-xl font-black text-amber-800">{datasetStats.duplicatesCount}</strong>
              </div>
              <div className="bg-sky-50 p-3.5 rounded-xl border border-sky-200">
                <span className="text-[10px] text-sky-700 font-bold uppercase block">Invalid / Broken</span>
                <strong className="text-xl font-black text-sky-800">{datasetStats.invalidRecordsCount}</strong>
              </div>
            </div>

            {/* Extensibility Architecture Box */}
            <div className="bg-stone-900 text-white p-4 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-xs text-emerald-400 flex items-center">
                <Database className="w-3.5 h-3.5 mr-1.5" />
                Extensible Multi-Dataset Architecture
              </h4>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                LocalLens is architected to ingest future tabular datasets (Train Routes, Auto Stands, Hotels, Restaurants, Hospitals, ATMs) using the same <code>DatasetRegistry</code> interface without modifying core application code.
              </p>
            </div>

            {/* Depot Distribution Table */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-xs text-stone-800 uppercase tracking-wider">
                Routes by APSRTC Depot ({datasetDepots.length} Depots)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {datasetDepots.map(d => (
                  <div key={d.depot} className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-center justify-between">
                    <span className="font-bold text-stone-800">{d.depot}</span>
                    <span className="bg-[#1B4332] text-white px-2 py-0.5 rounded-full font-black text-[10px]">
                      {d.count} routes
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Search & Match Testing Tool */}
            <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-stone-200 space-y-3">
              <h4 className="font-black text-xs text-stone-900 flex items-center">
                <Search className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
                Live Ingestion Query Tester
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <input
                  type="text"
                  value={adminTestFrom}
                  onChange={(e) => setAdminTestFrom(e.target.value)}
                  placeholder="Test From (e.g. Duvvada, RTC)"
                  className="p-2 bg-white border border-stone-300 rounded-lg text-stone-900 font-bold"
                />
                <input
                  type="text"
                  value={adminTestTo}
                  onChange={(e) => setAdminTestTo(e.target.value)}
                  placeholder="Test To (e.g. Complex, RK Beach)"
                  className="p-2 bg-white border border-stone-300 rounded-lg text-stone-900 font-bold"
                />
                <button
                  type="button"
                  onClick={runAdminTestQuery}
                  className="bg-[#1B4332] text-white font-extrabold p-2 rounded-lg hover:bg-[#2D6A4F] transition-colors cursor-pointer"
                >
                  Simulate Match
                </button>
              </div>

              {adminTestResults.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] text-stone-400 font-bold uppercase">Simulation Results ({adminTestResults.length} matches):</span>
                  <div className="max-h-48 overflow-y-auto space-y-1 custom-scrollbar">
                    {adminTestResults.map((m, idx) => (
                      <div key={idx} className="bg-white p-2.5 rounded-lg border border-stone-200 flex items-center justify-between text-[11px]">
                        <div>
                          <strong className="text-emerald-800 font-black">[{m.route.route_number || 'REGIONAL'}]</strong>{' '}
                          <span className="font-bold text-stone-800">{m.route.from_location}</span> → <span className="font-bold text-stone-800">{m.route.to_location}</span>
                          <span className="text-stone-400 ml-2">({m.route.depot})</span>
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-900 font-black px-2 py-0.5 rounded">
                          Score: {m.matchScore}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      ) : activeTab === 'reports' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-stone-900 text-sm">
              Community Outdated Flags Awaiting Desk Audit ({outdatedReports.length})
            </h3>
            <span className="text-stone-500 text-[11px]">
              Flagged entries are sent here for conductor/merchant cross-checking.
            </span>
          </div>

          <div className="space-y-3">
            {outdatedReports.map((rep) => (
              <div key={rep.id} className="bg-white rounded-2xl border border-red-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded font-black text-[10px] uppercase">
                      OUTDATED REPORT
                    </span>
                    <strong className="text-stone-900 text-sm">{rep.target_title}</strong>
                  </div>
                  <span className="text-stone-500 text-[11px]">Reported on {rep.created_at}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span className="text-stone-400 font-bold uppercase text-[10px] block">Reason Category</span>
                    <span className="font-extrabold text-stone-900 uppercase">{rep.reason_category.replace('_', ' ')}</span>
                  </div>
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span className="text-stone-400 font-bold uppercase text-[10px] block">Reporter</span>
                    <span className="font-bold text-stone-800">{rep.reported_by}</span>
                  </div>
                </div>

                <div className="bg-red-50/60 p-3 rounded-xl border border-red-200 text-xs text-stone-700">
                  <strong>Traveler Notes:</strong> "{rep.notes}"
=======
        <div className="bg-emerald-900 text-emerald-100 p-4 rounded-xl border border-emerald-700 text-sm font-bold flex items-center justify-between animate-fade-in shadow-md">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{actionNotice}</span>
          </div>
        </div>
      )}

      {/* Admin Review Desk Tabs */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-[#1C1917]">
              Platform Audit & Moderation Queue
            </h3>
            <p className="text-xs text-stone-500">Review pending user reports and re-verify flagged outdated data</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'pending'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5 mr-1 inline" /> Pending Queue ({pendingItems.length})
            </button>

            <button
              onClick={() => setActiveTab('outdated')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'outdated'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 mr-1 inline" /> Flagged Outdated ({outdatedItems.length})
            </button>

            <button
              onClick={() => setActiveTab('verified')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'verified'
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 inline" /> Active Verified ({verifiedItems.length})
            </button>
          </div>
        </div>

        {/* Tab 1: PENDING Items */}
        {activeTab === 'pending' && (
          <div className="space-y-4">
            {pendingItems.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 rounded-xl text-stone-500 text-xs">
                <PartyPopper className="w-4 h-4 mr-1.5 inline text-emerald-600" /> No pending submissions awaiting review! All community knowledge has been audited.
              </div>
            ) : (
              pendingItems.map((item) => (
                <div key={item.id} className="bg-amber-50/50 border border-amber-300 p-5 rounded-2xl space-y-4 shadow-xs">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <span className="bg-amber-200 text-amber-950 font-extrabold text-[10px] px-2 py-0.5 rounded uppercase">
                        PENDING PLATFORM REVIEW
                      </span>
                      <h4 className="text-lg font-extrabold text-stone-900 mt-1">
                        {item.from} → {item.to}
                      </h4>
                      <p className="text-xs text-stone-600">Reported by {item.reportedBy} on {item.submittedAt}</p>
                    </div>

                    <span className="text-xs font-bold text-stone-700 bg-white px-2.5 py-1 rounded border border-stone-200">
                      Category: {item.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-3 rounded-xl border border-amber-200">
                    <div>
                      <span className="text-stone-400 font-bold block text-[10px] uppercase">Bus Number</span>
                      <span className="font-extrabold text-stone-900">{item.busNumber || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block text-[10px] uppercase">Reported Fare</span>
                      <span className="font-extrabold text-emerald-800">{item.fare || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block text-[10px] uppercase">Boarding Stand</span>
                      <span className="font-semibold text-stone-800">{item.boardingPoint || 'N/A'}</span>
                    </div>
                  </div>

                  {item.additionalInfo && (
                    <div className="text-xs text-stone-700 bg-white p-3 rounded-xl border border-stone-200">
                      <strong>Submitted Notes:</strong> {item.additionalInfo}
                    </div>
                  )}

                  <div className="flex items-center justify-end space-x-3 pt-2 border-t border-amber-200">
                    <button
                      onClick={() => handleReject(item.id, `${item.from} → ${item.to}`)}
                      className="bg-stone-200 hover:bg-rose-100 text-rose-800 text-xs font-bold px-4 py-2 rounded-xl transition-colors inline-flex items-center space-x-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject Submission</span>
                    </button>

                    <button
                      onClick={() => handleApprove(item.id, `${item.from} → ${item.to}`)}
                      className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold px-5 py-2 rounded-xl transition-colors inline-flex items-center space-x-1 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Approve & Stamp Verified</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: OUTDATED Items */}
        {activeTab === 'outdated' && (
          <div className="space-y-4">
            {outdatedItems.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 rounded-xl text-stone-500 text-xs">
                <Sparkles className="w-4 h-4 mr-1.5 inline text-emerald-600" /> No items currently flagged as outdated.
              </div>
            ) : (
              outdatedItems.map((item) => (
                <div key={item.id} className="bg-rose-50/50 border border-rose-300 p-5 rounded-2xl space-y-4 shadow-xs">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <span className="bg-rose-200 text-rose-950 font-extrabold text-[10px] px-2 py-0.5 rounded uppercase flex items-center w-max">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Flagged Outdated ({item.outdatedReportsCount} reports)
                      </span>
                      <h4 className="text-lg font-extrabold text-stone-900 mt-1">
                        {item.from} → {item.to}
                      </h4>
                    </div>

                    <span className="text-xs font-bold text-stone-700 bg-white px-2.5 py-1 rounded border border-stone-200">
                      Category: {item.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-3 rounded-xl border border-rose-200">
                    <div>
                      <span className="text-stone-400 font-bold block text-[10px] uppercase">Bus Number</span>
                      <span className="font-extrabold text-stone-900">{item.busNumber || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block text-[10px] uppercase">Recorded Fare</span>
                      <span className="font-extrabold text-stone-900">{item.fare || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block text-[10px] uppercase">Last Verified Date</span>
                      <span className="font-semibold text-stone-600">{item.verifiedAt || 'Unknown'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-2 border-t border-rose-200">
                    <button
                      onClick={() => handleReVerify(item.id, `${item.from} → ${item.to}`)}
                      className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-5 py-2 rounded-xl transition-colors inline-flex items-center space-x-1 shadow-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Re-Verify Data & Update Date</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Active VERIFIED Items */}
        {activeTab === 'verified' && (
          <div className="space-y-4">
            {verifiedItems.map((item) => (
              <div key={item.id} className="bg-emerald-50/40 border border-emerald-200 p-4 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-stone-900 text-sm flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 mr-1.5" />
                    {item.from} → {item.to}
                  </div>
                  <div className="text-stone-500 mt-0.5">
                    <Bus className="w-3.5 h-3.5 mr-0.5 inline text-stone-500" /> {item.busNumber || 'Local Route'} | <Banknote className="w-3.5 h-3.5 mr-0.5 inline text-emerald-600" /> {item.fare || 'Standard'} | Verified: {item.verifiedAt}
                  </div>
                </div>

                <div className="text-right">
                  <span className="bg-emerald-100 text-emerald-950 font-bold px-2 py-0.5 rounded text-[10px]">
                    <Star className="w-3.5 h-3.5 mr-0.5 inline text-amber-500 fill-amber-400" /> {item.communityRating > 0 ? item.communityRating : 'New'} ({item.ratingCount} ratings)
                  </span>
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
                </div>
              </div>
            ))}
          </div>
<<<<<<< HEAD
        </div>
      ) : (
        /* ------------------------------------------------------------- */
        /* ITEMS QUEUE (PENDING / UNDER REVIEW / VERIFIED / OUTDATED / REJECTED) */
        /* ------------------------------------------------------------- */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-stone-900 text-sm">
              {selectedCategory} Queue — {activeTab.toUpperCase()} ({displayedItems.length})
            </h3>
            <span className="text-stone-500 text-[11px]">
              Every fact is traceable to contributor, evidence, and audit history.
            </span>
          </div>

          {displayedItems.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center text-stone-500 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <p className="font-bold text-stone-800 text-base">No entries in this view</p>
              <p className="text-xs text-stone-400">
                All submissions in this category and status have been processed.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {displayedItems.map((item) => {
                const itemCat = getItemCategoryType(item);
                const titleLabel = item.propertyName || item.restaurantName || `${item.from} → ${item.to}`;

                return (
                  <div key={item.id} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
                    
                    {/* Header: Category Badge + Trust Badge + Contributor info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-[#1C1917] text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase flex items-center space-x-1">
                          {getCategoryIcon(itemCat)}
                          <span>{itemCat}</span>
                        </span>

                        <SourceBadge 
                          sourceType={item.sourceType || 'COMMUNITY'}
                          verificationStatus={item.status}
                          hasEvidence={Boolean(item.evidence?.length)}
                          size="sm"
                        />
                      </div>

                      <div className="text-[11px] text-stone-500">
                        Submitted by <strong className="text-stone-800">{item.reportedBy}</strong> on {item.submittedAt}
                      </div>
                    </div>

                    {/* Main Place / Route & Details */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-base sm:text-lg font-black text-stone-900">
                          {titleLabel}
                        </h4>
                      </div>

                      {/* Category-Specific Facts Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-[#FAF9F6] p-4 rounded-2xl border border-stone-200 text-xs">
                        
                        {/* Column 1: Corridor or Address */}
                        <div>
                          <span className="text-stone-400 block font-bold text-[10px] uppercase">
                            {itemCat === 'TRANSPORT' ? 'Corridor' : 'Location / City'}
                          </span>
                          <span className="font-extrabold text-stone-900 text-sm">
                            {itemCat === 'TRANSPORT' ? `${item.from} → ${item.to}` : item.from}
                          </span>
                        </div>

                        {/* Column 2: Mode / Stay Type / Cuisine */}
                        <div>
                          <span className="text-stone-400 block font-bold text-[10px] uppercase">
                            {itemCat === 'TRANSPORT' ? 'Bus / Mode' : itemCat === 'STAYS' ? 'Stay Type' : itemCat === 'FOOD' ? 'Cuisine' : 'Category'}
                          </span>
                          <span className="font-bold text-stone-900">
                            {item.busNumber || item.stayType || item.cuisine || item.category}
                          </span>
                        </div>

                        {/* Column 3: Tariff / Fare */}
                        <div>
                          <span className="text-stone-400 block font-bold text-[10px] uppercase">
                            {itemCat === 'TRANSPORT' ? 'Reported Fare' : itemCat === 'STAYS' ? 'Tariff' : 'Price Band'}
                          </span>
                          <span className="font-black text-emerald-800 text-sm">
                            {item.fare || 'Unspecified'}
                          </span>
                        </div>

                        {/* Column 4: Boarding Point / Amenities / Dish */}
                        <div>
                          <span className="text-stone-400 block font-bold text-[10px] uppercase">
                            {itemCat === 'TRANSPORT' ? 'Boarding Stand' : itemCat === 'STAYS' ? 'Amenities' : 'Popular Dish'}
                          </span>
                          <span className="font-bold text-stone-900 truncate block" title={item.boardingPoint || item.amenities || item.popularDish}>
                            {item.boardingPoint || item.amenities || item.popularDish || 'General Stand'}
                          </span>
                        </div>

                      </div>
                    </div>

                    {/* Contributor Practical Note / Advice */}
                    {item.additionalInfo && (
                      <div className="text-stone-700 bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs leading-relaxed">
                        <strong className="text-stone-900">Submitted Observations:</strong> "{item.additionalInfo}"
                      </div>
                    )}

                    {/* Supporting Evidence Bar if attached */}
                    {item.evidence && item.evidence.length > 0 ? (
                      <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileCheck className="w-4 h-4 text-amber-800 shrink-0" />
                          <span className="font-bold text-amber-950 text-xs">
                            Supporting Evidence Attached: {item.evidence[0].file_name} ({item.evidence[0].evidence_type})
                          </span>
                        </div>
                        <span className="text-[10px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded font-black">
                          Proof Uploaded
                        </span>
                      </div>
                    ) : (
                      <div className="text-[11px] text-stone-400 italic">
                        No physical proof attached by contributor. Requires on-ground verification.
                      </div>
                    )}

                    {/* Audit History Snapshot */}
                    {item.verifiedAt && item.status === 'VERIFIED' && (
                      <div className="text-[11px] text-emerald-800 font-medium flex items-center space-x-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified by <strong>{item.verifiedBy || 'LocalLens Verification Desk'}</strong> on {item.verifiedAt}</span>
                      </div>
                    )}

                    {item.rejectionReason && item.status === 'REJECTED' && (
                      <div className="text-[11px] text-red-800 bg-red-50 p-2.5 rounded-xl border border-red-200">
                        <strong>Rejection Reason:</strong> {item.rejectionReason}
                      </div>
                    )}

                    {/* ------------------------------------------------------------- */}
                    {/* SECTION 12: ADMIN ACTIONS TOOLBAR */}
                    {/* ------------------------------------------------------------- */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
                      <button
                        onClick={() => setViewingAuditItem(item.id)}
                        className="text-stone-500 hover:text-stone-900 font-bold flex items-center cursor-pointer transition-colors"
                      >
                        <History className="w-3.5 h-3.5 mr-1" />
                        <span>Audit Trail ({item.history?.length || 1})</span>
                      </button>

                      <div className="flex flex-wrap items-center gap-2">
                        {/* Request More Info */}
                        {item.status !== 'VERIFIED' && item.status !== 'REJECTED' && (
                          <button
                            onClick={() => setRequestingItemId(item.id)}
                            className="bg-amber-50 hover:bg-amber-100 text-amber-900 px-3.5 py-2 rounded-xl font-bold border border-amber-200 transition-colors cursor-pointer"
                          >
                            Request More Info
                          </button>
                        )}

                        {/* Reject */}
                        {item.status !== 'REJECTED' && (
                          <button
                            onClick={() => setRejectingItemId(item.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-800 px-3.5 py-2 rounded-xl font-bold border border-red-200 transition-colors cursor-pointer"
                          >
                            Reject
                          </button>
                        )}

                        {/* Mark Outdated (for Verified items) */}
                        {item.status === 'VERIFIED' && (
                          <button
                            onClick={() => handleMarkOutdated(item.id, titleLabel)}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-800 px-3.5 py-2 rounded-xl font-bold border border-rose-200 transition-colors cursor-pointer flex items-center space-x-1"
                          >
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Mark Outdated</span>
                          </button>
                        )}

                        {/* Re-verify (for Outdated items) */}
                        {item.status === 'OUTDATED' && (
                          <button
                            onClick={() => handleReVerify(item.id, titleLabel)}
                            className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-black transition-colors cursor-pointer flex items-center space-x-1"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Re-verify & Restore</span>
                          </button>
                        )}

                        {/* Approve (for Pending or Under Review) */}
                        {(item.status === 'PENDING' || item.status === 'UNDER_REVIEW') && (
                          <button
                            onClick={() => handleApprove(item.id, titleLabel)}
                            className="bg-[#1B4332] hover:bg-[#276147] text-white px-5 py-2 rounded-xl font-black shadow-sm flex items-center space-x-1.5 transition-colors cursor-pointer"
                          >
                            <ShieldCheck className="w-4 h-4 text-emerald-300" />
                            <span>Approve as LocalLens Verified</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* REJECTION REASON DIALOG MODAL */}
      {/* ------------------------------------------------------------- */}
      {rejectingItemId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center space-x-2 text-red-700">
              <XCircle className="w-5 h-5" />
              <h3 className="font-extrabold text-base">Reject Submission</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              State the audit finding why this information could not be verified. This reason will be logged in the public immutable provenance history.
            </p>
            <textarea
              rows={3}
              value={rejectionReasonInput}
              onChange={(e) => setRejectionReasonInput(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            />
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setRejectingItemId(null)}
                className="px-4 py-2 rounded-xl border border-stone-300 font-bold text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRejectConfirm(rejectingItemId, 'Contribution')}
                className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* REQUEST MORE INFO DIALOG MODAL */}
      {/* ------------------------------------------------------------- */}
      {requestingItemId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center space-x-2 text-amber-800">
              <Clock className="w-5 h-5" />
              <h3 className="font-extrabold text-base">Request Additional Verification Info</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Transition this submission to <strong>UNDER_REVIEW</strong>. Enter what clarification or supporting evidence is needed.
            </p>
            <textarea
              rows={3}
              value={requestNotesInput}
              onChange={(e) => setRequestNotesInput(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            />
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setRequestingItemId(null)}
                className="px-4 py-2 rounded-xl border border-stone-300 font-bold text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRequestInfoConfirm(requestingItemId, 'Contribution')}
                className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold cursor-pointer"
              >
                Set Under Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* AUDIT HISTORY MODAL */}
      {/* ------------------------------------------------------------- */}
      {viewingAuditItem && getTargetItemForAudit() && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 space-y-5 shadow-2xl border border-stone-200 max-h-[85vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <History className="w-5 h-5 text-[#1B4332]" />
                <h3 className="font-black text-base text-stone-900">Provenance Audit Trail</h3>
              </div>
              <button 
                onClick={() => setViewingAuditItem(null)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-full cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-400">Target Entity</span>
              <h4 className="font-extrabold text-stone-900 text-sm">
                {getTargetItemForAudit()?.propertyName || getTargetItemForAudit()?.restaurantName || `${getTargetItemForAudit()?.from} → ${getTargetItemForAudit()?.to}`}
              </h4>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Immutable State Transitions</span>
              {getTargetItemForAudit()?.history && getTargetItemForAudit()!.history!.map((entry, idx) => (
                <div key={idx} className="bg-stone-50 border border-stone-200 p-3 rounded-2xl space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-stone-900">{entry.previous_status} → {entry.new_status}</span>
                    <span className="text-stone-500 text-[10px]">{entry.changed_at}</span>
                  </div>
                  <div className="text-stone-600 text-[11px]">
                    Changed by: <strong>{entry.changed_by}</strong>
                  </div>
                  {entry.reason && (
                    <div className="text-stone-500 italic text-[11px] pt-0.5">
                      Note: "{entry.reason}"
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setViewingAuditItem(null)}
                className="bg-stone-900 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer hover:bg-stone-800"
              >
                Close Audit Trail
              </button>
            </div>
          </div>
        </div>
      )}
=======
        )}

      </div>
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04

    </div>
  );
};
