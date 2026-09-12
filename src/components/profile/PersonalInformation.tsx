import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Globe, 
  Edit2, 
  Save, 
  X, 
  Check, 
  AlertCircle, 
  Loader2,
  Lock
} from 'lucide-react';
import type { Profile } from '../../types/profile';

interface PersonalInformationProps {
  profile: Profile;
  onSave: (data: Partial<Profile>) => Promise<{ success: boolean; error?: string }>;
  isEditingExternal?: boolean;
  onStopEditingExternal?: () => void;
}

export const PersonalInformation: React.FC<PersonalInformationProps> = ({
  profile,
  onSave,
  isEditingExternal,
  onStopEditingExternal
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile.full_name || '',
    email: profile.email || '',
    phone: profile.phone || '',
    date_of_birth: profile.date_of_birth || '',
    gender: profile.gender || 'Male',
    city: profile.city || '',
    state: profile.state || '',
    country: profile.country || 'India'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const startEditing = () => {
    setFormData({
      full_name: profile.full_name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      date_of_birth: profile.date_of_birth || '',
      gender: profile.gender || 'Male',
      city: profile.city || '',
      state: profile.state || '',
      country: profile.country || 'India'
    });
    setErrors({});
    setIsEditing(true);
  };

  // Sync external editing trigger (from Header's Edit Profile button)
  React.useEffect(() => {
    if (isEditingExternal) {
      startEditing();
      if (onStopEditingExternal) onStopEditingExternal();
    }
  }, [isEditingExternal, onStopEditingExternal]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.full_name.trim()) errs.full_name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (formData.phone && !/^[+0-9\s-]{8,15}$/.test(formData.phone)) {
      errs.phone = 'Please enter a valid phone number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    setFeedback(null);

    const res = await onSave(formData);
    setIsSaving(false);

    if (res.success) {
      setFeedback({ type: 'success', message: 'Personal information updated successfully in Supabase!' });
      setIsEditing(false);
      setTimeout(() => setFeedback(null), 3500);
    } else {
      setFeedback({ type: 'error', message: res.error || 'Failed to save changes. Please try again.' });
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile.full_name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      date_of_birth: profile.date_of_birth || '',
      gender: profile.gender || 'Male',
      city: profile.city || '',
      state: profile.state || '',
      country: profile.country || 'India'
    });
    setErrors({});
    setIsEditing(false);
    setFeedback(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#1C1917] flex items-center">
            <User className="w-5 h-5 mr-2 text-[#1B4332]" />
            Personal Information
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage your personal profile details and contact verification.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={startEditing}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#FAF9F6] hover:bg-stone-100 text-[#1B4332] rounded-lg border border-[#E7E5E4] text-xs font-bold transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        )}
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className={`p-3.5 rounded-xl border text-xs flex items-center space-x-2 ${
          feedback.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
            : 'bg-rose-50 border-rose-200 text-rose-900'
        }`}>
          {feedback.type === 'success' ? (
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span className="font-semibold">{feedback.message}</span>
        </div>
      )}

      {/* Content Form or View */}
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1C1917] flex items-center">
                Full Name <span className="text-rose-500 ml-0.5">*</span>
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className={`w-full p-2.5 bg-[#FAF9F6] border rounded-xl text-xs text-[#1C1917] focus:outline-none focus:border-[#1B4332] ${
                  errors.full_name ? 'border-rose-400 bg-rose-50/50' : 'border-[#E7E5E4]'
                }`}
                placeholder="e.g. Rahul Allamudi"
              />
              {errors.full_name && <p className="text-[11px] text-rose-600 font-medium">{errors.full_name}</p>}
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1C1917] flex items-center justify-between">
                <span>Email Address <span className="text-rose-500 ml-0.5">*</span></span>
                <span className="text-[10px] text-stone-400 flex items-center">
                  <Lock className="w-3 h-3 mr-0.5 text-stone-400" /> Supabase Auth
                </span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full p-2.5 bg-[#FAF9F6] border rounded-xl text-xs text-[#1C1917] focus:outline-none focus:border-[#1B4332] ${
                  errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-[#E7E5E4]'
                }`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-[11px] text-rose-600 font-medium">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1C1917]">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:border-[#1B4332]"
                placeholder="+91 98480 22334"
              />
              {errors.phone && <p className="text-[11px] text-rose-600 font-medium">{errors.phone}</p>}
            </div>

            {/* Date of Birth */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1C1917]">Date of Birth</label>
              <input
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:border-[#1B4332]"
              />
            </div>

            {/* Gender */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1C1917]">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] font-medium focus:outline-none focus:border-[#1B4332]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1C1917]">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:border-[#1B4332]"
                placeholder="e.g. Visakhapatnam"
              />
            </div>

            {/* State */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1C1917]">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:border-[#1B4332]"
                placeholder="e.g. Andhra Pradesh"
              />
            </div>

            {/* Country */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1C1917]">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:border-[#1B4332]"
                placeholder="e.g. India"
              />
            </div>

          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#E7E5E4]">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="px-4 py-2 bg-[#FAF9F6] hover:bg-stone-100 text-stone-700 rounded-xl text-xs font-bold border border-[#E7E5E4] transition-colors flex items-center space-x-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 bg-[#1B4332] hover:bg-[#265e46] text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5 disabled:bg-stone-400"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving to Supabase...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Read-only Display View */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
              <User className="w-4 h-4 text-[#1B4332]" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">Full Name</span>
              <span className="text-sm font-bold text-[#1C1917]">{profile.full_name || 'Not provided'}</span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
              <Mail className="w-4 h-4 text-[#1B4332]" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">Email</span>
              <span className="text-sm font-bold text-[#1C1917]">{profile.email || 'Not provided'}</span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
              <Phone className="w-4 h-4 text-[#1B4332]" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">Phone Number</span>
              <span className="text-sm font-bold text-[#1C1917]">{profile.phone || 'Not provided'}</span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
              <Calendar className="w-4 h-4 text-[#1B4332]" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">Date of Birth</span>
              <span className="text-sm font-bold text-[#1C1917]">{profile.date_of_birth || 'Not provided'}</span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
              <User className="w-4 h-4 text-[#1B4332]" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">Gender</span>
              <span className="text-sm font-bold text-[#1C1917]">{profile.gender || 'Not specified'}</span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
              <MapPin className="w-4 h-4 text-[#1B4332]" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">City & State</span>
              <span className="text-sm font-bold text-[#1C1917]">
                {profile.city ? `${profile.city}, ${profile.state}` : 'Not provided'}
              </span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
              <Globe className="w-4 h-4 text-[#1B4332]" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">Country</span>
              <span className="text-sm font-bold text-[#1C1917]">{profile.country || 'India'}</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
