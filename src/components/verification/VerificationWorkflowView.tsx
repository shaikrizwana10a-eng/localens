import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RotateCcw,
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
          </div>
        </div>

      </div>

      {/* Action Toast Alert */}
      {actionNotice && (
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
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
