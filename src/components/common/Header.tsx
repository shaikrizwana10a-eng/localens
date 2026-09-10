import React, { useState } from 'react';
import { 
  Compass, 
  Award, 
  Building2, 
  Globe2, 
  User, 
  Coins,
  HelpCircle,
  Bus,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';
import type { UserRole } from '../../types/travel';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  walletBalance: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  userRole,
  onRoleChange,
  walletBalance
}) => {
  const [showGuideModal, setShowGuideModal] = useState(false);

  const roles: { role: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    { role: 'tourist', label: 'Traveller', icon: <Compass className="w-4 h-4" />, desc: 'Explore & Plan' },
    { role: 'contributor', label: 'Local Scout', icon: <Award className="w-4 h-4" />, desc: 'Verify & Earn' },
    { role: 'business', label: 'Business Owner', icon: <Building2 className="w-4 h-4" />, desc: 'Insights & Reach' },
    { role: 'foreign_tourist', label: 'Foreign Tourist', icon: <Globe2 className="w-4 h-4" />, desc: 'Safety & Guides' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6] border-b border-[#E7E5E4] shadow-xs">
      {/* Top Banner / Role Status */}
      <div className="bg-[#1C1917] text-[#FAF9F6] px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="bg-[#1B4332] text-emerald-300 font-semibold px-2 py-0.5 rounded text-[11px] tracking-wide uppercase">
            Trusted Platform
          </span>
          <span className="text-stone-300 hidden sm:inline">
            Verified local travel details • Genuine reviews only
          </span>
          <button
            onClick={() => setShowGuideModal(true)}
            className="text-emerald-400 hover:underline text-[11px] font-bold inline-flex items-center ml-2"
          >
            <HelpCircle className="w-3 h-3 mr-1" /> How LOKAL Works (User Guide)
          </button>
        </div>

        {/* Role Switcher Pill Bar */}
        <div className="flex items-center space-x-1">
          <span className="text-stone-400 mr-1 text-[11px] font-medium">Mode:</span>
          {roles.map((r) => (
            <button
              key={r.role}
              onClick={() => onRoleChange(r.role)}
              className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                userRole === r.role
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
              title={r.desc}
            >
              <span className="mr-1">{r.icon}</span>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 rounded-lg bg-[#1B4332] text-white flex items-center justify-center font-bold text-xl shadow-xs group-hover:bg-[#2D6A4F] transition-colors">
              L
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-extrabold text-xl tracking-tight text-[#1C1917]">LOKAL</span>
                <span className="text-xs bg-[#EFECE6] text-[#1B4332] px-1.5 py-0.2 rounded font-semibold border border-stone-300">
                  INDIA
                </span>
              </div>
              <p className="text-[11px] text-[#57534E] leading-none font-medium">
                Travel like someone who knows the place
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView === 'home' ? 'bg-[#EFECE6] text-[#1B4332] font-semibold' : 'text-[#57534E] hover:text-[#1C1917] hover:bg-stone-100'
              }`}
            >
              Home
            </button>
            
            <button
              onClick={() => onNavigate('destination')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView === 'destination' ? 'bg-[#EFECE6] text-[#1B4332] font-semibold' : 'text-[#57534E] hover:text-[#1C1917] hover:bg-stone-100'
              }`}
            >
              Destinations
            </button>

            <button
              onClick={() => onNavigate('planner')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView === 'planner' ? 'bg-[#EFECE6] text-[#1B4332] font-semibold' : 'text-[#57534E] hover:text-[#1C1917] hover:bg-stone-100'
              }`}
            >
              Trip Planner
            </button>

            <button
              onClick={() => onNavigate('transport')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView === 'transport' ? 'bg-[#EFECE6] text-[#1B4332] font-semibold' : 'text-[#57534E] hover:text-[#1C1917] hover:bg-stone-100'
              }`}
            >
              Local Transport
            </button>

            <button
              onClick={() => onNavigate('stays')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView === 'stays' ? 'bg-[#EFECE6] text-[#1B4332] font-semibold' : 'text-[#57534E] hover:text-[#1C1917] hover:bg-stone-100'
              }`}
            >
              Stays & Food
            </button>

            <button
              onClick={() => onNavigate('video')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView === 'video' ? 'bg-[#EFECE6] text-[#1B4332] font-semibold' : 'text-[#57534E] hover:text-[#1C1917] hover:bg-stone-100'
              }`}
            >
              Video Proofs
            </button>

            <button
              onClick={() => onNavigate('missions')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView === 'missions' || currentView === 'verification'
                  ? 'bg-[#EFECE6] text-[#1B4332] font-semibold' 
                  : 'text-[#57534E] hover:text-[#1C1917] hover:bg-stone-100'
              }`}
            >
              Missions
            </button>

            {userRole === 'business' && (
              <button
                onClick={() => onNavigate('business')}
                className={`px-3 py-2 rounded-md transition-colors ${
                  currentView === 'business' ? 'bg-[#1B4332] text-white font-semibold' : 'text-stone-700 bg-amber-100 hover:bg-amber-200'
                }`}
              >
                Business Hub
              </button>
            )}
          </nav>

          {/* Right Action Icons & Wallet */}
          <div className="flex items-center space-x-3">
            {userRole === 'contributor' && (
              <div 
                onClick={() => onNavigate('contributor')}
                className="cursor-pointer bg-emerald-50 border border-emerald-300 text-[#1B4332] px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 hover:bg-emerald-100 transition-colors"
              >
                <Coins className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>Wallet: ₹{walletBalance}</span>
              </div>
            )}

            <button
              onClick={() => onNavigate('profile')}
              className="p-2 text-[#57534E] hover:text-[#1C1917] hover:bg-stone-100 rounded-full transition-colors flex items-center space-x-1 text-sm border border-[#E7E5E4]"
            >
              <User className="w-4 h-4 text-[#1B4332]" />
              <span className="hidden sm:inline font-medium text-xs text-[#1C1917]">My Saved</span>
            </button>
          </div>

        </div>
      </div>

      {/* User Guide Modal ("What is What") */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button 
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="bg-[#1B4332] text-emerald-300 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded">
                Platform Guide & Feature Overview
              </span>
              <h2 className="text-2xl font-extrabold text-[#1C1917]">How LOKAL Works — What is What</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E7E5E4] space-y-2">
                <h4 className="font-bold text-[#1C1917] flex items-center text-sm">
                  <Compass className="w-4 h-4 mr-1.5 text-[#1B4332]" />
                  1. Destinations Explorer
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  Search any city or landmark (e.g., INS Kursura, Rushikonda, Simhachalam in Vizag). Click any place card to auto-center the interactive map on that exact location.
                </p>
              </div>

              <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E7E5E4] space-y-2">
                <h4 className="font-bold text-[#1C1917] flex items-center text-sm">
                  <Bus className="w-4 h-4 mr-1.5 text-[#1B4332]" />
                  2. Local Transport Engine
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  Type any Origin A and Destination B. Get step-by-step local bus numbers, boarding shelters, shared auto per-seat fares, and walking directions. Avoid private taxi gouging.
                </p>
              </div>

              <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E7E5E4] space-y-2">
                <h4 className="font-bold text-[#1C1917] flex items-center text-sm">
                  <ShieldCheck className="w-4 h-4 mr-1.5 text-[#1B4332]" />
                  3. Stays, Food & Video Proofs
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  Inspect real video walk-throughs of hotel rooms and bathrooms, confirmed food dish price tags, and Information Confidence Scores verified by travellers.
                </p>
              </div>

              <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E7E5E4] space-y-2">
                <h4 className="font-bold text-[#1C1917] flex items-center text-sm">
                  <Award className="w-4 h-4 mr-1.5 text-amber-700" />
                  4. Scout Missions & Rewards
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  Switch to <strong>Local Scout Mode</strong> to complete micro-missions (e.g. verify bus fares) and earn real cash payouts into your Scout Wallet!
                </p>
              </div>

            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-950 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>Ready to start exploring? Select any destination or route from the top menu.</span>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="bg-[#1B4332] text-white font-bold px-4 py-2 rounded-lg shrink-0 ml-2"
              >
                Got It!
              </button>
            </div>

          </div>
        </div>
      )}

    </header>
  );
};
