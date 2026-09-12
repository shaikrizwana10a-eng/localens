import React, { useState } from 'react';
import { 
  Compass, 
  Wallet, 
  Bus, 
  Utensils, 
  Hotel, 
  Edit2, 
  Save, 
  X, 
  Check, 
  Loader2,
  Users
} from 'lucide-react';
import type { 
  TravelPreferences as TravelPreferencesType, 
  TravelType, 
  BudgetPreference, 
  TransportMode, 
  FoodPreference, 
  AccommodationPreference 
} from '../../types/profile';

interface TravelPreferencesProps {
  preferences: TravelPreferencesType;
  onSave: (data: Partial<TravelPreferencesType>) => Promise<{ success: boolean; error?: string }>;
}

const TRAVEL_TYPES: TravelType[] = ['Solo', 'Couple', 'Family', 'Friends', 'Business'];
const BUDGET_OPTIONS: BudgetPreference[] = ['Budget', 'Moderate', 'Premium', 'Luxury'];
const TRANSPORT_OPTIONS: TransportMode[] = ['Bus', 'Train', 'Flight', 'Cab', 'Rental Vehicle'];
const FOOD_OPTIONS: FoodPreference[] = ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'No Preference'];
const ACCOMMODATION_OPTIONS: AccommodationPreference[] = ['Budget Hotel', 'Hotel', 'Resort', 'Homestay', 'No Preference'];

export const TravelPreferences: React.FC<TravelPreferencesProps> = ({
  preferences,
  onSave
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState<TravelPreferencesType>(preferences);

  const startEditing = () => {
    setFormData(preferences);
    setIsEditing(true);
  };

  const toggleTransport = (mode: TransportMode) => {
    const current = formData.preferred_transport || [];
    if (current.includes(mode)) {
      if (current.length === 1) return; // keep at least one
      setFormData({ ...formData, preferred_transport: current.filter(m => m !== mode) });
    } else {
      setFormData({ ...formData, preferred_transport: [...current, mode] });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    const res = await onSave(formData);
    setIsSaving(false);

    if (res.success) {
      setFeedback({ type: 'success', message: 'Travel preferences saved to Supabase!' });
      setIsEditing(false);
      setTimeout(() => setFeedback(null), 3500);
    } else {
      setFeedback({ type: 'error', message: res.error || 'Failed to save travel preferences' });
    }
  };

  const handleCancel = () => {
    setFormData(preferences);
    setIsEditing(false);
    setFeedback(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#1C1917] flex items-center">
            <Compass className="w-5 h-5 mr-2 text-[#1B4332]" />
            Travel Preferences
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Personalize your trip plans and recommendations according to your travel style.
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
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{feedback.message}</span>
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* 1. Travel Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1C1917] flex items-center">
              <Users className="w-3.5 h-3.5 mr-1 text-[#1B4332]" />
              Preferred Travel Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {TRAVEL_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, travel_type: type })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                    formData.travel_type === type
                      ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                      : 'bg-[#FAF9F6] text-stone-700 border-[#E7E5E4] hover:bg-stone-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Budget Preference */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1C1917] flex items-center">
              <Wallet className="w-3.5 h-3.5 mr-1 text-[#1B4332]" />
              Budget Preference
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BUDGET_OPTIONS.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setFormData({ ...formData, budget_preference: b })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                    formData.budget_preference === b
                      ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                      : 'bg-[#FAF9F6] text-stone-700 border-[#E7E5E4] hover:bg-stone-100'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Preferred Transport (Multi-select) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1C1917] flex items-center justify-between">
              <span className="flex items-center">
                <Bus className="w-3.5 h-3.5 mr-1 text-[#1B4332]" />
                Preferred Transport Modes
              </span>
              <span className="text-[10px] text-stone-400 font-normal">Select all that apply</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {TRANSPORT_OPTIONS.map((mode) => {
                const isSelected = formData.preferred_transport?.includes(mode);
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => toggleTransport(mode)}
                    className={`py-2 px-3.5 rounded-xl text-xs font-semibold border transition-all flex items-center space-x-1.5 ${
                      isSelected
                        ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                        : 'bg-[#FAF9F6] text-stone-700 border-[#E7E5E4] hover:bg-stone-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-emerald-300" />}
                    <span>{mode}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Food Preference */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1C1917] flex items-center">
              <Utensils className="w-3.5 h-3.5 mr-1 text-[#1B4332]" />
              Food Preference
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FOOD_OPTIONS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormData({ ...formData, food_preference: f })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                    formData.food_preference === f
                      ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                      : 'bg-[#FAF9F6] text-stone-700 border-[#E7E5E4] hover:bg-stone-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Accommodation Preference */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1C1917] flex items-center">
              <Hotel className="w-3.5 h-3.5 mr-1 text-[#1B4332]" />
              Accommodation Preference
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {ACCOMMODATION_OPTIONS.map((acc) => (
                <button
                  key={acc}
                  type="button"
                  onClick={() => setFormData({ ...formData, accommodation_preference: acc })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                    formData.accommodation_preference === acc
                      ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                      : 'bg-[#FAF9F6] text-stone-700 border-[#E7E5E4] hover:bg-stone-100'
                  }`}
                >
                  {acc}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
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
                  <span>Save Preferences</span>
                </>
              )}
            </button>
          </div>

        </form>
      ) : (
        /* Read-only Display View */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
          
          <div>
            <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">Travel Type</span>
            <span className="text-sm font-bold text-[#1C1917] mt-0.5 inline-block">
              {preferences.travel_type || 'Friends'}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">Budget Category</span>
            <span className="text-sm font-bold text-[#1B4332] mt-0.5 inline-block">
              {preferences.budget_preference || 'Moderate'}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">Preferred Transit</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {(preferences.preferred_transport || ['Train', 'Bus']).map((m) => (
                <span key={m} className="bg-emerald-50 text-[#1B4332] text-xs font-semibold px-2.5 py-0.5 rounded-md border border-emerald-200">
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">Dietary Preference</span>
            <span className="text-sm font-bold text-[#1C1917] mt-0.5 inline-block">
              {preferences.food_preference || 'Vegetarian'}
            </span>
          </div>

          <div className="sm:col-span-2">
            <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">Preferred Stay Style</span>
            <span className="text-sm font-bold text-[#1C1917] mt-0.5 inline-block">
              {preferences.accommodation_preference || 'Homestay'}
            </span>
          </div>

        </div>
      )}

    </div>
  );
};
