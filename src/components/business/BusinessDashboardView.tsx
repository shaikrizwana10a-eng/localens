import React, { useState } from 'react';
import { Building2, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { BusinessAnalytics } from '../../types/travel';

interface BusinessDashboardViewProps {
  businessData: BusinessAnalytics[];
}

export const BusinessDashboardView: React.FC<BusinessDashboardViewProps> = ({ businessData }) => {
  const [selectedBiz, setSelectedBiz] = useState<BusinessAnalytics>(businessData[0]);

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#1C1917] text-white p-8 rounded-2xl border border-stone-800 space-y-3">
        <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
          <Building2 className="w-3.5 h-3.5" />
          <span>Service Provider & Business Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Customer Satisfaction Insights & Reach
        </h1>
        <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
          Help your hotel, restaurant, or transport business understand genuine customer sentiment, address frequent complaints, and enhance promotional reach.
        </p>
      </div>

      {/* STRICT NON-PAID RATING ASSURANCE BANNER */}
      <div className="bg-amber-50 border-2 border-amber-300 p-5 rounded-xl flex items-start space-x-3 text-amber-900 shadow-xs">
        <ShieldCheck className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <h4 className="font-bold text-sm text-amber-950">Platform Strict Ranking Protection Policy</h4>
          <p className="leading-relaxed text-amber-900">
            <strong>Business subscriptions CANNOT buy or alter organic customer star ratings.</strong> Paid plans provide analytics insights and promoted partner badges only. All customer feedback remains 100% unedited and verified.
          </p>
        </div>
      </div>

      {/* Business Selector */}
      <div className="flex items-center space-x-3">
        <span className="text-xs font-bold text-stone-600">Select Provider Dashboard:</span>
        {businessData.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBiz(b)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              b.id === selectedBiz.id
                ? 'bg-[#1B4332] text-white border-[#1B4332]'
                : 'bg-white text-stone-700 border-[#E7E5E4] hover:bg-stone-100'
            }`}
          >
            {b.businessName} ({b.category})
          </button>
        ))}
      </div>

      {/* Stats Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-[#E7E5E4] space-y-1 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold uppercase">Organic Customer Rating</div>
          <div className="text-3xl font-extrabold text-[#1B4332]">{selectedBiz.organicRating} ★</div>
          <p className="text-[11px] text-stone-500">From {selectedBiz.totalVerifiedReviews} verified stays</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E7E5E4] space-y-1 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold uppercase">Current Subscription Tier</div>
          <div className="text-xl font-extrabold text-amber-900">{selectedBiz.subscriptionTier}</div>
          <p className="text-[11px] text-emerald-800 font-semibold">₹{selectedBiz.monthlySubscriptionPrice} / month</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E7E5E4] space-y-1 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold uppercase">Promoted Partner Visibility</div>
          <div className="text-xl font-extrabold text-emerald-700">ACTIVE</div>
          <p className="text-[11px] text-stone-500">Highlighted in search results</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E7E5E4] space-y-1 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold uppercase">Rating Protection</div>
          <div className="text-xl font-extrabold text-[#1B4332]">VERIFIED</div>
          <p className="text-[11px] text-stone-500">Unbiased customer scores</p>
        </div>
      </div>

      {/* Customer Insights: Likes vs Pain Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Positive Aspects */}
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200 space-y-4">
          <h3 className="font-bold text-[#1B4332] text-lg flex items-center">
            <CheckCircle2 className="w-5 h-5 mr-2 text-[#1B4332]" />
            What Customers Praise Most
          </h3>
          <ul className="space-y-2 text-xs text-emerald-950 font-medium">
            {selectedBiz.customerLikes.map((like, i) => (
              <li key={i} className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                {like}
              </li>
            ))}
          </ul>
        </div>

        {/* Frequently Mentioned Complaints / Pain Points */}
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 space-y-4">
          <h3 className="font-bold text-amber-900 text-lg flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-amber-700" />
            Frequently Mentioned Issues to Fix
          </h3>
          <ul className="space-y-2 text-xs text-amber-950 font-medium">
            {selectedBiz.frequentlyMentionedIssues.map((issue, i) => (
              <li key={i} className="bg-white p-3 rounded-lg border border-amber-200 shadow-2xs">
                {issue}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Subscription Model Selector */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7E5E4] space-y-6">
        <h3 className="text-xl font-bold text-[#1C1917]">Business Subscription Plans</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-[#E7E5E4] space-y-3">
            <h4 className="font-bold text-[#1C1917] text-base">Local Provider</h4>
            <div className="text-2xl font-extrabold text-[#1B4332]">₹499 <span className="text-xs font-normal text-stone-500">/ mo</span></div>
            <p className="text-xs text-stone-600">Basic provider profile, verified badge & customer complaint digest.</p>
          </div>

          <div className="p-5 rounded-xl border-2 border-[#1B4332] bg-emerald-50/50 space-y-3">
            <span className="bg-[#1B4332] text-white text-[10px] font-bold px-2 py-0.5 rounded">RECOMMENDED</span>
            <h4 className="font-bold text-[#1C1917] text-base">Tourism Business</h4>
            <div className="text-2xl font-extrabold text-[#1B4332]">₹1,499 <span className="text-xs font-normal text-stone-500">/ mo</span></div>
            <p className="text-xs text-stone-600">Promoted recommendation exposure, detailed sentiment trends & response tools.</p>
          </div>

          <div className="p-5 rounded-xl border border-[#E7E5E4] space-y-3">
            <h4 className="font-bold text-[#1C1917] text-base">Enterprise Intelligence</h4>
            <div className="text-2xl font-extrabold text-[#1B4332]">₹4,999 <span className="text-xs font-normal text-stone-500">/ mo</span></div>
            <p className="text-xs text-stone-600">Multi-property analytics, competitor benchmark & custom satisfaction surveys.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
