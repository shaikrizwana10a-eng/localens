import React, { useState } from 'react';
import { AlertTriangle, X, CheckCircle2, ShieldAlert } from 'lucide-react';

interface OutdatedReportModalProps {
  targetId: string;
  targetTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (report: {
    targetId: string;
    targetTitle: string;
    reasonCategory: 'fare_changed' | 'route_changed' | 'service_halted' | 'boarding_changed' | 'incorrect_info' | 'other';
    notes: string;
  }) => void;
}

export const OutdatedReportModal: React.FC<OutdatedReportModalProps> = ({
  targetId,
  targetTitle,
  isOpen,
  onClose,
  onSubmitReport
}) => {
  const [reasonCategory, setReasonCategory] = useState<
    'fare_changed' | 'route_changed' | 'service_halted' | 'boarding_changed' | 'incorrect_info' | 'other'
  >('fare_changed');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) return;

    onSubmitReport({
      targetId,
      targetTitle,
      reasonCategory,
      notes: notes.trim()
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setNotes('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1C1917] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-400/30 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Report Outdated Information</h3>
              <p className="text-xs text-stone-400 truncate max-w-xs">{targetTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-stone-900 text-lg">Thank You for Reporting!</h4>
            <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
              Your report has been sent to the <strong>LocalLens Verification Desk</strong>. The status has been flagged for audit so other travelers are alerted.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Warning Note */}
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex items-start space-x-2.5 text-amber-900">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-snug">
                LocalLens relies on travelers to keep bus timings, fares, and boarding points up to date. Verified information is re-checked by local scouts upon receiving your report.
              </p>
            </div>

            {/* Reason Selection */}
            <div className="space-y-1.5">
              <label className="font-extrabold text-stone-800 uppercase text-[10px] tracking-wider block">
                Why is this information outdated or incorrect?
              </label>
              <select
                value={reasonCategory}
                onChange={(e) => setReasonCategory(e.target.value as any)}
                className="w-full bg-[#FAF9F6] border border-stone-200 rounded-xl px-3.5 py-2.5 font-bold text-stone-900 focus:outline-none focus:border-[#1B4332]"
              >
                <option value="fare_changed">Ticket / Travel Fare has changed</option>
                <option value="route_changed">Bus Route or Stops have been diverted</option>
                <option value="service_halted">Bus service is discontinued / not operating</option>
                <option value="boarding_changed">Boarding platform or bus stand moved</option>
                <option value="incorrect_info">Information is factually inaccurate</option>
                <option value="other">Other reason / New local development</option>
              </select>
            </div>

            {/* Detailed Notes */}
            <div className="space-y-1.5">
              <label className="font-extrabold text-stone-800 uppercase text-[10px] tracking-wider block">
                What is the latest updated information? (Required)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                required
                placeholder="e.g. Bus fare was revised from ₹35 to ₹45 last week. Departs from Platform 3 now instead of Platform 2."
                className="w-full bg-[#FAF9F6] border border-stone-200 rounded-xl p-3 font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#1B4332]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 font-bold hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!notes.trim()}
                className="px-5 py-2.5 rounded-xl bg-red-800 hover:bg-red-900 text-white font-extrabold shadow-sm disabled:opacity-50 transition-colors"
              >
                Flag as Outdated
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
