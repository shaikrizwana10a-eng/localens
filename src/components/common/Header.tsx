import React, { useState } from 'react';
import { 
  Compass, 
  Award, 
  Building2, 
  Globe2, 
<<<<<<< HEAD
=======
  User, 
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
  Coins,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Search,
<<<<<<< HEAD
  X,
  Menu,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import type { UserRole } from '../../types/travel';
import { useAuth } from '../../context/AuthContext';
=======
  X
} from 'lucide-react';
import type { UserRole } from '../../types/travel';
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04

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
<<<<<<< HEAD
  const { profile } = useAuth();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roles: { role: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    { role: 'tourist', label: 'Traveller', icon: <Compass className="w-3.5 h-3.5" />, desc: 'Explore & Plan' },
    { role: 'contributor', label: 'Local Scout', icon: <Award className="w-3.5 h-3.5" />, desc: 'Verify & Earn' },
    { role: 'business', label: 'Business Owner', icon: <Building2 className="w-3.5 h-3.5" />, desc: 'Insights & Reach' },
    { role: 'foreign_tourist', label: 'Foreign Tourist', icon: <Globe2 className="w-3.5 h-3.5" />, desc: 'Safety & Guides' }
  ];

  const currentRoleObj = roles.find(r => r.role === userRole) || roles[0];

  const navItems = [
    { id: 'explore-knowledge', label: 'Explore', view: 'explore-knowledge' },
    { id: 'destination', label: 'Destinations', view: 'destination' },
    { id: 'transport', label: 'Transport', view: 'transport' },
    { id: 'stays', label: 'Stays & Food', view: 'stays' },
    { id: 'planner', label: 'AI Planner', view: 'planner', isAi: true },
    { id: 'missions', label: 'Community', view: 'missions' },
    { id: 'verification', label: 'Verification', view: 'verification' }
  ];

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6] border-b border-[#E7E5E4] shadow-2xs">
      
      {/* 1. Thin Professional Top Bar */}
      <div className="bg-[#1C1917] text-[#FAF9F6] px-4 sm:px-8 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Left: Platform Verified Assurance */}
          <div className="flex items-center space-x-2">
            <span className="bg-[#1B4332] text-emerald-300 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 mr-0.5" />
              <span>Platform Verified</span>
            </span>
            <span className="text-stone-300 hidden md:inline text-[11px] font-medium">
              Verified ground-truth travel intelligence • Real fares & stops
            </span>
            <button
              onClick={() => setShowGuideModal(true)}
              className="text-emerald-400 hover:text-emerald-300 hover:underline text-[11px] font-semibold inline-flex items-center ml-1"
            >
              <HelpCircle className="w-3 h-3 mr-1" /> How LOCAL Works
            </button>
          </div>

          {/* Right: Role Switcher & Contributor Wallet */}
          <div className="flex items-center space-x-3">
            {userRole === 'contributor' && (
              <button 
                onClick={() => onNavigate('contributor')}
                className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-2.5 py-0.5 rounded-md text-[11px] font-bold flex items-center space-x-1 hover:bg-emerald-900 transition-colors"
              >
                <Coins className="w-3 h-3 text-amber-400" />
                <span>Wallet: ₹{walletBalance}</span>
              </button>
            )}

            {/* Desktop Mode Selector Pills */}
            <div className="hidden sm:flex items-center space-x-1 bg-stone-900/80 p-0.5 rounded-lg border border-stone-800">
              <span className="text-stone-400 text-[10px] font-semibold px-1.5 uppercase">Mode:</span>
              {roles.map((r) => (
                <button
                  key={r.role}
                  onClick={() => onRoleChange(r.role)}
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                    userRole === r.role
                      ? 'bg-[#1B4332] text-white font-bold shadow-2xs'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                  title={r.desc}
                >
                  <span className="mr-1">{r.icon}</span>
                  {r.label}
                </button>
              ))}
            </div>

            {/* Mobile Mode Dropdown Button */}
            <div className="relative sm:hidden">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="bg-stone-800 text-stone-200 px-2 py-0.5 rounded text-[11px] font-bold flex items-center space-x-1"
              >
                <span>{currentRoleObj.icon}</span>
                <span>{currentRoleObj.label}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>
              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-stone-900 border border-stone-700 rounded-xl shadow-xl z-50 p-1 space-y-0.5">
                  {roles.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => {
                        onRoleChange(r.role);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center space-x-2 ${
                        userRole === r.role ? 'bg-[#1B4332] text-white font-bold' : 'text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      <span>{r.icon}</span>
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Name */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
            onClick={() => onNavigate('home')}
          >
            <div className="w-9 h-9 rounded-xl bg-[#1B4332] text-white flex items-center justify-center font-black text-xl shadow-xs group-hover:bg-[#265e46] transition-colors">
=======
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
            Platform Verified
          </span>
          <span className="text-stone-300 hidden sm:inline font-medium">
            Verified local travel details • Genuine community reports only
          </span>
          <button
            onClick={() => setShowGuideModal(true)}
            className="text-emerald-400 hover:underline text-[11px] font-bold inline-flex items-center ml-2"
          >
            <HelpCircle className="w-3 h-3 mr-1" /> How LOCAL Works (User Guide)
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
            className="flex items-center space-x-3 cursor-pointer group shrink-0"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 rounded-lg bg-[#1B4332] text-white flex items-center justify-center font-extrabold text-xl shadow-xs group-hover:bg-[#2D6A4F] transition-colors">
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
              L
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
<<<<<<< HEAD
                <span className="font-black text-xl sm:text-2xl tracking-tight text-[#1C1917]">LocalLens</span>
                <span className="text-[9px] bg-emerald-100 text-[#1B4332] px-1.5 py-0.2 rounded font-extrabold border border-emerald-300 uppercase">
                  VERIFIED
                </span>
              </div>
              <p className="text-[9px] text-stone-500 font-bold uppercase tracking-wider -mt-0.5">
                TRAVEL LIKE A LOCAL
=======
                <span className="font-black text-2xl tracking-tight text-[#1C1917]">LOCAL</span>
                <span className="text-[10px] bg-emerald-100 text-[#1B4332] px-1.5 py-0.2 rounded font-bold border border-emerald-300 uppercase">
                  VERIFIED
                </span>
              </div>
              <p className="text-[11px] text-[#57534E] leading-none font-bold uppercase tracking-wider">
                TRAVEL LIKE A LOCAL.
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
              </p>
            </div>
          </div>

<<<<<<< HEAD
          {/* Desktop Center Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs font-bold">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-3 py-2 rounded-lg transition-all flex items-center space-x-1 ${
                    isActive 
                      ? 'bg-[#EFECE6] text-[#1B4332] font-black' 
                      : 'text-stone-600 hover:text-[#1C1917] hover:bg-stone-100 font-semibold'
                  }`}
                >
                  {item.isAi && <Sparkles className="w-3.5 h-3.5 text-emerald-600 mr-0.5" />}
                  <span>{item.label}</span>
                </button>
              );
            })}

            {userRole === 'business' && (
              <button
                onClick={() => handleNavClick('business')}
                className={`px-3 py-2 rounded-lg transition-all ${
=======
          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-2 text-xs font-bold">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView === 'home' ? 'bg-[#EFECE6] text-[#1B4332]' : 'text-[#57534E] hover:text-[#1C1917] hover:bg-stone-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('destination')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView === 'destination' ? 'bg-[#EFECE6] text-[#1B4332]' : 'text-[#57534E] hover:text-[#1C1917] hover:bg-stone-100'
              }`}
            >
              Destinations
            </button>

            <button
              onClick={() => onNavigate('transport')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView === 'transport' ? 'bg-[#EFECE6] text-[#1B4332]' : 'text-[#57534E] hover:text-[#1C1917] hover:bg-stone-100'
              }`}
            >
              Transport
            </button>

            <button
              onClick={() => onNavigate('stays')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView === 'stays' ? 'bg-[#EFECE6] text-[#1B4332]' : 'text-[#57534E] hover:text-[#1C1917] hover:bg-stone-100'
              }`}
            >
              Stays & Food
            </button>

            <button
              onClick={() => onNavigate('planner')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView === 'planner' ? 'bg-[#EFECE6] text-[#1B4332]' : 'text-[#57534E] hover:text-[#1C1917] hover:bg-stone-100'
              }`}
            >
              AI Planner
            </button>

            <button
              onClick={() => onNavigate('verification')}
              className={`px-3 py-2 rounded-md transition-colors flex items-center space-x-1 ${
                currentView === 'verification' ? 'bg-[#1B4332] text-white' : 'text-[#57534E] hover:text-[#1C1917] hover:bg-stone-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#1B4332]" />
              <span>Verification Desk</span>
            </button>

            {userRole === 'business' && (
              <button
                onClick={() => onNavigate('business')}
                className={`px-3 py-2 rounded-md transition-colors ${
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
                  currentView === 'business' ? 'bg-[#1B4332] text-white' : 'text-stone-700 bg-amber-100 hover:bg-amber-200'
                }`}
              >
                Business Hub
              </button>
            )}
          </nav>

<<<<<<< HEAD
          {/* Right Action Icons & User Profile */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Profile / Avatar Pill */}
            <button
              onClick={() => onNavigate('profile')}
              title="View Profile, Preferences & Saved Places"
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border shadow-2xs ${
=======
          {/* Right Action Icons & Wallet */}
          <div className="flex items-center space-x-2 shrink-0">
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
              className={`px-3 py-2 rounded-md text-xs font-bold transition-colors flex items-center space-x-1 border ${
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
                currentView === 'profile'
                  ? 'bg-[#1B4332] text-white border-[#1B4332]'
                  : 'bg-white text-[#1C1917] hover:bg-stone-100 border-[#E7E5E4]'
              }`}
            >
<<<<<<< HEAD
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${
                currentView === 'profile' ? 'bg-emerald-600 text-white' : 'bg-[#1B4332] text-white'
              }`}>
                {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : 'R'}
              </div>
              <span className="hidden sm:inline font-bold">
                {profile.full_name ? profile.full_name.split(' ')[0] : 'Profile'}
              </span>
              <span className="sm:hidden font-bold">Profile</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 border border-[#E7E5E4]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
=======
              <User className="w-3.5 h-3.5 text-[#1B4332]" />
              <span>Saved</span>
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
            </button>
          </div>

        </div>
      </div>

<<<<<<< HEAD
      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E7E5E4] px-4 py-4 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.view)}
                className={`p-2.5 rounded-xl text-left flex items-center space-x-1.5 ${
                  currentView === item.view
                    ? 'bg-[#1B4332] text-white'
                    : 'bg-[#FAF9F6] text-stone-700 hover:bg-stone-100 border border-[#E7E5E4]'
                }`}
              >
                {item.isAi && <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E7E5E4] flex items-center justify-between text-xs">
            <button
              onClick={() => handleNavClick('profile')}
              className="font-bold text-[#1B4332] flex items-center space-x-1"
            >
              <span>View Traveler Profile</span>
            </button>
            <button
              onClick={() => setShowGuideModal(true)}
              className="text-stone-500 font-semibold"
            >
              User Guide
            </button>
          </div>
        </div>
      )}

      {/* User Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
=======
      {/* User Guide Modal ("How LOCAL Works") */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
            <button 
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="bg-[#1B4332] text-emerald-300 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded">
                Platform Guide & Data Integrity
              </span>
<<<<<<< HEAD
              <h2 className="text-2xl font-extrabold text-[#1C1917]">How LocalLens Works</h2>
=======
              <h2 className="text-2xl font-extrabold text-[#1C1917]">How LOCAL Works</h2>
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
              <p className="text-xs text-stone-500 font-medium">TRAVEL LIKE A LOCAL. Go like someone who knows the place.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E7E5E4] space-y-2">
                <h4 className="font-bold text-[#1C1917] flex items-center text-sm">
                  <Search className="w-4 h-4 mr-1.5 text-[#1B4332]" />
                  1. Explore Local Knowledge
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  Search routes like Gajuwaka → RK Beach or Tirupati → Tirumala. Inspect bus numbers, boarding stands, actual fares, auto rates, and tips.
                </p>
              </div>

              <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E7E5E4] space-y-2">
                <h4 className="font-bold text-[#1C1917] flex items-center text-sm">
                  <Share2 className="w-4 h-4 mr-1.5 text-emerald-700" />
                  2. Share What You Know
                </h4>
                <p className="text-stone-600 leading-relaxed">
<<<<<<< HEAD
                  Submit real local travel observations. Submissions enter the system as <strong>PENDING</strong> so raw unverified data is never falsely trusted.
=======
                  Submit real local travel information. Submissions enter the system as <strong>PENDING</strong> so raw unverified data is never falsely trusted.
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
                </p>
              </div>

              <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E7E5E4] space-y-2">
                <h4 className="font-bold text-[#1C1917] flex items-center text-sm">
                  <ShieldCheck className="w-4 h-4 mr-1.5 text-[#1B4332]" />
                  3. Platform Verification
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  Platform auditors verify submitted bus numbers, fares, and boarding points, updating status to <strong>VERIFIED</strong> with real verification dates.
                </p>
              </div>

              <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E7E5E4] space-y-2">
                <h4 className="font-bold text-[#1C1917] flex items-center text-sm">
                  <Award className="w-4 h-4 mr-1.5 text-amber-700" />
                  4. Traveler Feedback & Updates
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  Rate accuracy with 1–5 stars and report outdated data to trigger re-verification, keeping local travel knowledge 100% accurate.
                </p>
              </div>

            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-950 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>Ready to explore? Search any route or city from the navigation bar.</span>
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
<<<<<<< HEAD
=======

>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
