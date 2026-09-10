import React from 'react';
import { ShieldCheck, Clock, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import type { ConfidenceLevel } from '../../types/travel';

interface TrustBadgeProps {
  level: ConfidenceLevel;
  verifiedCount?: number;
  showDetails?: boolean;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ level, verifiedCount, showDetails = true }) => {
  let badgeStyle = '';
  let icon = <ShieldCheck className="w-3.5 h-3.5 mr-1" />;

  switch (level) {
    case 'High Confidence':
      badgeStyle = 'bg-[#1B4332] text-white border-[#1B4332]';
      icon = <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#D8F3DC]" />;
      break;
    case 'Moderate Confidence':
      badgeStyle = 'bg-amber-100 text-amber-900 border-amber-300';
      icon = <Clock className="w-3.5 h-3.5 mr-1 text-amber-700" />;
      break;
    case 'Low Confidence':
      badgeStyle = 'bg-orange-100 text-orange-900 border-orange-300';
      icon = <AlertTriangle className="w-3.5 h-3.5 mr-1 text-orange-700" />;
      break;
    case 'Needs Verification':
      badgeStyle = 'bg-stone-200 text-stone-800 border-stone-300';
      icon = <HelpCircle className="w-3.5 h-3.5 mr-1 text-stone-600" />;
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${badgeStyle}`}>
      {icon}
      <span>{level}</span>
      {verifiedCount !== undefined && showDetails && (
        <span className="ml-1 opacity-90 font-normal">
          ({verifiedCount} confirmed)
        </span>
      )}
    </span>
  );
};

export const FreshnessTag: React.FC<{ daysAgo: number }> = ({ daysAgo }) => {
  let text = '';
  let bg = 'bg-emerald-50 text-emerald-800 border-emerald-200';

  if (daysAgo === 0) {
    text = 'Verified Today';
  } else if (daysAgo === 1) {
    text = 'Verified Yesterday';
  } else if (daysAgo <= 7) {
    text = `Verified ${daysAgo} days ago`;
  } else if (daysAgo <= 30) {
    text = `Verified ${Math.round(daysAgo / 7)} weeks ago`;
    bg = 'bg-amber-50 text-amber-800 border-amber-200';
  } else {
    text = `Needs Re-verification (${daysAgo}d old)`;
    bg = 'bg-red-50 text-red-800 border-red-200';
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${bg}`}>
      <Clock className="w-3 h-3 mr-1" />
      {text}
    </span>
  );
};
