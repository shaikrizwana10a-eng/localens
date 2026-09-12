import React, { useState } from 'react';
import { 
  Camera, 
  Calendar, 
  Mail, 
  Edit3, 
  CheckCircle2, 
  Database,
  Shield
} from 'lucide-react';
import type { Profile } from '../../types/profile';

interface ProfileHeaderProps {
  profile: Profile;
  onEditClick: () => void;
  isSupabaseLive: boolean;
  onAvatarChange?: (file: File) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  onEditClick,
  isSupabaseLive
}) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile.avatar_url || null);

  // Get initials from user's full name
  const getInitials = (name: string): string => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const formattedDate = React.useMemo(() => {
    try {
      const date = new Date(profile.created_at || '2025-09-12');
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch {
      return 'September 2025';
    }
  }, [profile.created_at]);

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit. Please select a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#1C1917] via-[#262220] to-[#1B4332] text-white p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-md">
      {/* Subtle ambient light glow */}
      <div className="absolute -right-16 -top-16 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        
        {/* Left: Avatar + Details */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
          
          {/* Avatar Container with Upload overlay */}
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#1B4332] text-white border-2 border-emerald-500/40 flex items-center justify-center font-black text-3xl sm:text-4xl shrink-0 shadow-lg overflow-hidden">
              {avatarPreview ? (
                <img 
                  src={avatarPreview} 
                  alt={profile.full_name} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="tracking-wider">{getInitials(profile.full_name)}</span>
              )}
            </div>

            {/* Avatar upload button overlay */}
            <label 
              htmlFor="avatar-upload"
              className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-xs font-semibold text-white space-y-1"
            >
              <Camera className="w-5 h-5 text-emerald-300" />
              <span>Update</span>
              <input 
                id="avatar-upload" 
                type="file" 
                accept="image/png,image/jpeg,image/webp" 
                className="hidden" 
                onChange={handleAvatarFile} 
              />
            </label>
          </div>

          {/* User Details */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {profile.full_name}
              </h1>
              <span className="inline-flex items-center space-x-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs px-2.5 py-0.5 rounded-full font-bold">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Verified Traveler</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-stone-300">
              <div className="flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>Member since {formattedDate}</span>
              </div>
            </div>

            {/* Location & Supabase Sync status */}
            <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px]">
              {profile.city && (
                <span className="bg-white/10 text-stone-200 px-2.5 py-0.5 rounded-md font-medium">
                  📍 {profile.city}, {profile.state}
                </span>
              )}
              <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md font-semibold ${
                isSupabaseLive 
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50' 
                  : 'bg-stone-800 text-stone-300 border border-stone-700'
              }`}>
                <Database className="w-3 h-3 text-emerald-400" />
                <span>{isSupabaseLive ? 'Supabase Connected' : 'Supabase (Local Active)'}</span>
              </span>
            </div>
          </div>

        </div>

        {/* Right Action: Edit Profile Button */}
        <div className="shrink-0">
          <button
            onClick={onEditClick}
            className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 active:scale-98 text-white px-4 py-2.5 rounded-xl border border-white/20 text-xs font-bold transition-all shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Edit Profile</span>
          </button>
        </div>

      </div>

      {/* Trust banner */}
      <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400">
        <div className="flex items-center space-x-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Profile protected by Supabase Row-Level Security (RLS). Private data is never shared.</span>
        </div>
      </div>
    </div>
  );
};
