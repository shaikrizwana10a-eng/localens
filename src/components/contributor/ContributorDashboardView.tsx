import React from 'react';
import { Award, Coins, ShieldCheck } from 'lucide-react';

interface ContributorDashboardViewProps {
  walletBalance: number;
}

export const ContributorDashboardView: React.FC<ContributorDashboardViewProps> = ({ walletBalance }) => {
  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <div className="bg-[#1C1917] text-white p-8 rounded-2xl border border-stone-800 space-y-3">
        <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
          <Award className="w-3.5 h-3.5" />
          <span>Local Scout Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Scout Reputation & Wallet Dashboard
        </h1>
        <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
          Track your contribution accuracy, community verification rate, approved rewards, and payout wallet.
        </p>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-xl border border-[#E7E5E4] space-y-2 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold uppercase">Contributor Trust Score</div>
          <div className="text-3xl font-extrabold text-[#1B4332] flex items-center">
            <span>94%</span>
            <ShieldCheck className="w-5 h-5 ml-2 text-emerald-600" />
          </div>
          <p className="text-[11px] text-stone-500">Based on 127 total submissions</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E7E5E4] space-y-2 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold uppercase">Wallet Balance</div>
          <div className="text-3xl font-extrabold text-[#1C1917] flex items-center">
            <Coins className="w-6 h-6 mr-1.5 text-amber-500" />
            ₹{walletBalance}
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold">Available for instant UPI withdrawal</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E7E5E4] space-y-2 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold uppercase">Verified Claims</div>
          <div className="text-3xl font-extrabold text-emerald-800">116</div>
          <p className="text-[11px] text-stone-500">11 disputed by community</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E7E5E4] space-y-2 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold uppercase">Travellers Helped</div>
          <div className="text-3xl font-extrabold text-[#1B4332]">2,410+</div>
          <p className="text-[11px] text-stone-500">Estimated transit & stay savings</p>
        </div>

      </div>

      {/* Payout History & Approved Missions Table */}
      <div className="bg-white rounded-xl border border-[#E7E5E4] p-6 space-y-4">
        <h3 className="font-bold text-[#1C1917] text-lg">Recent Contribution Payout Logs</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E7E5E4] text-stone-500 font-semibold bg-[#FAF9F6]">
                <th className="p-3">Mission Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Reward</th>
                <th className="p-3">Verification Status</th>
                <th className="p-3">Date Approved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5E4]">
              <tr>
                <td className="p-3 font-semibold text-[#1C1917]">Verify Alipiri Token Counter Queue</td>
                <td className="p-3 text-stone-600">Place</td>
                <td className="p-3 font-bold text-[#1B4332]">₹35</td>
                <td className="p-3"><span className="bg-emerald-100 text-[#1B4332] px-2 py-0.5 rounded font-bold">100% Verified</span></td>
                <td className="p-3 text-stone-500">2 days ago</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#1C1917]">Upload Room Video Sapthagiri Residency</td>
                <td className="p-3 text-stone-600">Stay</td>
                <td className="p-3 font-bold text-[#1B4332]">₹75</td>
                <td className="p-3"><span className="bg-emerald-100 text-[#1B4332] px-2 py-0.5 rounded font-bold">100% Verified</span></td>
                <td className="p-3 text-stone-500">3 days ago</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#1C1917]">Report Shared Auto Fare Tirupati Station</td>
                <td className="p-3 text-stone-600">Transport</td>
                <td className="p-3 font-bold text-[#1B4332]">₹25</td>
                <td className="p-3"><span className="bg-emerald-100 text-[#1B4332] px-2 py-0.5 rounded font-bold">100% Verified</span></td>
                <td className="p-3 text-stone-500">5 days ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
