import React, { useEffect, useRef } from 'react';
import {
  X,
  Home,
  Compass,
  Bus,
  Hotel,
  Utensils,
  Sparkles,
  ShieldCheck,
  MapPin,
  Share2,
  User,
  Settings,
  HelpCircle,
  Award,
  Building2,
  Globe2,
  ChevronRight,
  Coins
} from 'lucide-react';
import type { UserRole } from '../../types/travel';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  walletBalance: number;
  profileName: string;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentView,
  onNavigate,
  userRole,
  onRoleChange,
  walletBalance,
  profileName
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNavClick = (view: string) => {
    onNavigate(view);
    onClose();
  };

  const roles: { role: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    { role: 'tourist', label: 'Traveller', icon: <Compass className="w-4 h-4" />, desc: 'Explore & Plan' },
    { role: 'contributor', label: 'Local Scout', icon: <Award className="w-4 h-4" />, desc: 'Verify & Earn' },
    { role: 'business', label: 'Business Owner', icon: <Building2 className="w-4 h-4" />, desc: 'Insights & Reach' },
    { role: 'foreign_tourist', label: 'Foreign Tourist', icon: <Globe2 className="w-4 h-4" />, desc: 'Safety & Guides' }
  ];

  const navSections = [
    {
      title: 'Explore',
      items: [
        { label: 'Home', icon: <Home className="w-4 h-4" />, view: 'home' },
        { label: 'Explore Knowledge', icon: <Compass className="w-4 h-4" />, view: 'explore-knowledge' },
        { label: 'Destinations', icon: <MapPin className="w-4 h-4" />, view: 'destination' },
        { label: 'Transport', icon: <Bus className="w-4 h-4" />, view: 'transport' },
        { label: 'Stays & Food', icon: <Hotel className="w-4 h-4" />, view: 'stays' },
      ]
    },
    {
      title: 'Plan & Create',
      items: [
        { label: 'AI Trip Planner', icon: <Sparkles className="w-4 h-4 text-emerald-600" />, view: 'planner' },
        { label: 'Share Knowledge', icon: <Share2 className="w-4 h-4" />, view: 'share-knowledge' },
        { label: 'Community Missions', icon: <Award className="w-4 h-4" />, view: 'missions' },
        { label: 'Verification Desk', icon: <ShieldCheck className="w-4 h-4" />, view: 'verification' },
      ]
    },
    {
      title: 'Account',
      items: [
        { label: 'Profile & Settings', icon: <User className="w-4 h-4" />, view: 'profile' },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs backdrop-enter"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="absolute top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white shadow-2xl drawer-enter flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation drawer"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E7E5E4] bg-[#FAF9F6]">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1B4332] text-white flex items-center justify-center font-black text-xl shadow-xs">
              L
            </div>
            <div>
              <span className="font-black text-lg tracking-tight text-[#1C1917]">LocalLens</span>
              <p className="text-[9px] text-stone-500 font-bold uppercase tracking-wider -mt-0.5">
                TRAVEL LIKE A LOCAL
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Summary */}
        <div
          className="p-4 bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white cursor-pointer"
          onClick={() => handleNavClick('profile')}
        >
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg font-black shrink-0">
              {profileName ? profileName.charAt(0).toUpperCase() : 'R'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{profileName || 'Traveler Profile'}</p>
              <p className="text-emerald-200 text-[11px] font-medium">View profile & saved places</p>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-300 shrink-0" />
          </div>
          {userRole === 'contributor' && (
            <div className="mt-2 flex items-center space-x-1.5 bg-emerald-800/50 px-2.5 py-1 rounded-lg text-[11px] font-bold w-fit">
              <Coins className="w-3 h-3 text-amber-400" />
              <span>Wallet: ₹{walletBalance}</span>
            </div>
          )}
        </div>

        {/* Scrollable Navigation Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
          {navSections.map((section) => (
            <div key={section.title} className="py-2">
              <p className="px-4 text-[10px] font-extrabold uppercase tracking-wider text-stone-400 mb-1.5">
                {section.title}
              </p>
              {section.items.map((item) => {
                const active = currentView === item.view;
                return (
                  <button
                    key={item.view}
                    type="button"
                    onClick={() => handleNavClick(item.view)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors mobile-touch-target ${
                      active
                        ? 'bg-emerald-50 text-[#1B4332] border-r-3 border-[#1B4332]'
                        : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span className={active ? 'text-[#1B4332]' : 'text-stone-400'}>{item.icon}</span>
                    <span className={`text-sm ${active ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1B4332]" />}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Role Switcher */}
          <div className="py-2 border-t border-[#E7E5E4] mx-4 mt-2">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 mb-2 pt-2">
              Switch Mode
            </p>
            <div className="space-y-1">
              {roles.map((r) => (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => {
                    onRoleChange(r.role);
                    onClose();
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left transition-all mobile-touch-target ${
                    userRole === r.role
                      ? 'bg-[#1B4332] text-white'
                      : 'bg-[#FAF9F6] text-stone-700 border border-[#E7E5E4] hover:bg-stone-100'
                  }`}
                >
                  <span>{r.icon}</span>
                  <div>
                    <span className="text-xs font-bold block">{r.label}</span>
                    <span className={`text-[10px] ${userRole === r.role ? 'text-emerald-200' : 'text-stone-400'}`}>
                      {r.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#E7E5E4] bg-[#FAF9F6]">
          <button
            type="button"
            onClick={() => handleNavClick('profile')}
            className="w-full flex items-center justify-center space-x-2 text-xs font-bold text-stone-500 hover:text-stone-700 py-2 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help & Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};
