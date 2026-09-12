import React, { useState } from 'react';
import { 
  Bell, 
  Shield, 
  Key, 
  LogOut, 
  Check, 
  AlertCircle, 
  Eye, 
  MapPin, 
  Lock, 
  Loader2,
  X
} from 'lucide-react';
import type { NotificationSettings, PrivacySettings } from '../../types/profile';

interface AccountSettingsProps {
  onSignOut: () => Promise<{ success: boolean; error?: string }>;
  onNavigate: (view: string) => void;
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({
  onSignOut,
  onNavigate
}) => {
  // Notifications Toggles
  const [notifications, setNotifications] = useState<NotificationSettings>(() => {
    const saved = localStorage.getItem('localens_notifications_v1');
    return saved ? JSON.parse(saved) : {
      travel_recommendations: true,
      saved_place_updates: true,
      booking_notifications: true,
      promotional_notifications: false
    };
  });

  // Privacy Options
  const [privacy, setPrivacy] = useState<PrivacySettings>(() => {
    const saved = localStorage.getItem('localens_privacy_v1');
    return saved ? JSON.parse(saved) : {
      profile_visibility: 'Community Only',
      location_sharing: true
    };
  });

  // Modals
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', newPass: '', confirm: '' });
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isChangingPass, setIsChangingPass] = useState(false);

  const toggleNotification = (key: keyof NotificationSettings) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    localStorage.setItem('localens_notifications_v1', JSON.stringify(updated));
  };

  const updatePrivacyVisibility = (val: 'Public' | 'Community Only' | 'Private') => {
    const updated: PrivacySettings = { ...privacy, profile_visibility: val };
    setPrivacy(updated);
    localStorage.setItem('localens_privacy_v1', JSON.stringify(updated));
  };

  const toggleLocationSharing = () => {
    const updated: PrivacySettings = { ...privacy, location_sharing: !privacy.location_sharing };
    setPrivacy(updated);
    localStorage.setItem('localens_privacy_v1', JSON.stringify(updated));
  };

  const handleSignOutConfirm = async () => {
    setIsSigningOut(true);
    const res = await onSignOut();
    setIsSigningOut(false);
    setShowSignOutConfirm(false);
    if (res.success) {
      onNavigate('home');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (!passwordData.newPass || passwordData.newPass.length < 6) {
      setPasswordStatus({ type: 'error', message: 'New password must be at least 6 characters long.' });
      return;
    }

    if (passwordData.newPass !== passwordData.confirm) {
      setPasswordStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    setIsChangingPass(true);
    // Simulate Supabase auth password change
    await new Promise(r => setTimeout(r, 900));
    setIsChangingPass(false);
    setPasswordStatus({ type: 'success', message: 'Password updated securely via Supabase Auth!' });

    setTimeout(() => {
      setShowChangePasswordModal(false);
      setPasswordData({ current: '', newPass: '', confirm: '' });
      setPasswordStatus(null);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-8 shadow-xs space-y-8">
      
      {/* Section Header */}
      <div className="border-b border-[#E7E5E4] pb-4">
        <h2 className="text-lg font-bold text-[#1C1917] flex items-center">
          <Shield className="w-5 h-5 mr-2 text-[#1B4332]" />
          Account & Privacy Settings
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Control your notification alerts, profile visibility, security, and session settings.
        </p>
      </div>

      {/* 1. Notifications Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center">
          <Bell className="w-4 h-4 mr-1.5 text-[#1B4332]" />
          Notifications
        </h3>

        <div className="space-y-3">
          {[
            {
              key: 'travel_recommendations' as const,
              title: 'Travel Recommendations',
              desc: 'Receive AI-curated tips and hidden gem spots based on your travel history.'
            },
            {
              key: 'saved_place_updates' as const,
              title: 'Saved Place Updates',
              desc: 'Get notified when community contributors post new verified fares or hours for your bookmarked places.'
            },
            {
              key: 'booking_notifications' as const,
              title: 'Booking & Trip Notifications',
              desc: 'Receive departure alerts, token timing reminders, and schedule updates.'
            },
            {
              key: 'promotional_notifications' as const,
              title: 'Promotional Notifications',
              desc: 'Receive partner stay discounts, mission reward announcements, and community badges.'
            }
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4]"
            >
              <div className="space-y-0.5 pr-4">
                <h4 className="font-bold text-[#1C1917] text-xs">{item.title}</h4>
                <p className="text-[11px] text-stone-500 leading-normal">{item.desc}</p>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={notifications[item.key]}
                onClick={() => toggleNotification(item.key)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifications[item.key] ? 'bg-[#1B4332]' : 'bg-stone-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Privacy Section */}
      <div className="space-y-4 pt-4 border-t border-[#E7E5E4]">
        <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center">
          <Eye className="w-4 h-4 mr-1.5 text-[#1B4332]" />
          Privacy & Visibility
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Profile Visibility */}
          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4] space-y-2">
            <label className="text-xs font-bold text-[#1C1917] block">Profile Visibility</label>
            <p className="text-[11px] text-stone-500">Who can see your verified contributions and reviews.</p>
            <select
              value={privacy.profile_visibility}
              onChange={(e) => updatePrivacyVisibility(e.target.value as 'Public' | 'Community Only' | 'Private')}
              className="w-full p-2 bg-white border border-[#E7E5E4] rounded-lg text-xs font-semibold text-[#1C1917] focus:outline-none focus:border-[#1B4332]"
            >
              <option value="Public">Public (Anyone)</option>
              <option value="Community Only">Community Only (Logged-in Travelers)</option>
              <option value="Private">Private (Only Me)</option>
            </select>
          </div>

          {/* Location Sharing */}
          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4] flex items-center justify-between">
            <div className="space-y-0.5 pr-3">
              <div className="flex items-center text-xs font-bold text-[#1C1917]">
                <MapPin className="w-3.5 h-3.5 mr-1 text-[#1B4332]" />
                Location Sharing
              </div>
              <p className="text-[11px] text-stone-500">Allow location detection for nearest transit stops.</p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={privacy.location_sharing}
              onClick={toggleLocationSharing}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                privacy.location_sharing ? 'bg-[#1B4332]' : 'bg-stone-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                  privacy.location_sharing ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

        </div>
      </div>

      {/* 3. Security & Sign Out Section */}
      <div className="space-y-4 pt-4 border-t border-[#E7E5E4]">
        <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center">
          <Lock className="w-4 h-4 mr-1.5 text-[#1B4332]" />
          Security & Account Access
        </h3>

        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200">
          <div>
            <h4 className="font-bold text-xs text-[#1C1917]">Password & Authentication</h4>
            <p className="text-[11px] text-stone-500">Managed through encrypted Supabase Auth tokens.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowChangePasswordModal(true)}
            className="px-3.5 py-2 bg-white hover:bg-stone-100 text-stone-700 rounded-xl border border-stone-300 text-xs font-bold flex items-center space-x-1.5 shadow-2xs transition-colors"
          >
            <Key className="w-3.5 h-3.5 text-[#1B4332]" />
            <span>Change Password</span>
          </button>
        </div>

        {/* Sign Out Card */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-rose-50/60 border border-rose-200">
          <div>
            <h4 className="font-bold text-xs text-rose-900">Sign Out of LocalLens</h4>
            <p className="text-[11px] text-rose-700">Safely terminate your current session on this device.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowSignOutConfirm(true)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center space-x-3 text-rose-600">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#1C1917]">Confirm Sign Out</h3>
                <p className="text-xs text-stone-500">Are you sure you want to sign out of your account?</p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed bg-[#FAF9F6] p-3 rounded-lg border border-[#E7E5E4]">
              You will need to sign in again to access your private saved places, preferences, and contributor missions.
            </p>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSignOutConfirm(false)}
                disabled={isSigningOut}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSignOutConfirm}
                disabled={isSigningOut}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5"
              >
                {isSigningOut ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Signing out...</span>
                  </>
                ) : (
                  <span>Yes, Sign Out</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setShowChangePasswordModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-[#1C1917] flex items-center">
                <Key className="w-4 h-4 mr-2 text-[#1B4332]" />
                Change Password
              </h3>
              <p className="text-xs text-stone-500">Update your account authentication credentials securely.</p>
            </div>

            {passwordStatus && (
              <div className={`p-3 rounded-xl border text-xs flex items-center space-x-2 ${
                passwordStatus.type === 'success' 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                {passwordStatus.type === 'success' ? (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span className="font-semibold">{passwordStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1C1917]">Current Password</label>
                <input
                  type="password"
                  value={passwordData.current}
                  onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:border-[#1B4332]"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1C1917]">New Password (min 6 chars)</label>
                <input
                  type="password"
                  value={passwordData.newPass}
                  onChange={(e) => setPasswordData({ ...passwordData, newPass: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:border-[#1B4332]"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1C1917]">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:border-[#1B4332]"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChangePasswordModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isChangingPass}
                  className="px-5 py-2 bg-[#1B4332] hover:bg-[#265e46] text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5"
                >
                  {isChangingPass ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <span>Update Password</span>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
