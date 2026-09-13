import React from 'react';
import { Home, Search, Heart, Map, User } from 'lucide-react';

interface BottomNavBarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentView, onNavigate }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home, view: 'home' },
    { id: 'explore', label: 'Explore', icon: Search, view: 'explore-knowledge' },
    { id: 'saved', label: 'Saved', icon: Heart, view: 'profile' },
    { id: 'trips', label: 'Trips', icon: Map, view: 'planner' },
    { id: 'profile', label: 'Profile', icon: User, view: 'profile' },
  ];

  const isActive = (tab: typeof tabs[0]) => {
    if (tab.id === 'saved' && currentView === 'profile') return false; // Profile tab takes priority
    if (tab.id === 'profile') return currentView === 'profile';
    return currentView === tab.view;
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white border-t border-[#E7E5E4] shadow-[0_-2px_10px_rgba(0,0,0,0.06)] pb-safe"
      style={{ height: 'var(--bottom-nav-height)' }}
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div className="flex items-stretch justify-around h-full max-w-lg mx-auto px-1">
        {tabs.map((tab) => {
          const active = isActive(tab);
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.view)}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-colors mobile-touch-target ${
                active
                  ? 'text-[#1B4332]'
                  : 'text-stone-400 hover:text-stone-600'
              }`}
              aria-label={tab.label}
              aria-current={active ? 'page' : undefined}
            >
              <IconComponent
                className={`w-5 h-5 transition-all ${
                  active ? 'text-[#1B4332] scale-110' : ''
                }`}
                strokeWidth={active ? 2.5 : 2}
              />
              <span
                className={`text-[10px] mt-0.5 font-semibold transition-colors ${
                  active ? 'text-[#1B4332] font-bold' : ''
                }`}
              >
                {tab.label}
              </span>
              {active && (
                <div className="w-1 h-1 rounded-full bg-[#1B4332] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
