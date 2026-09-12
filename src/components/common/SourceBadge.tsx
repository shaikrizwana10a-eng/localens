import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  Users, 
  FileCheck, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  X,
  ExternalLink,
  Info
} from 'lucide-react';
import type { 
  DataSourceType, 
  VerificationStatus, 
  DataProvenance 
} from '../../types/provenance';

export interface SourceBadgeProps {
  provenance?: DataProvenance;
  sourceType?: DataSourceType;
  verificationStatus?: VerificationStatus;
  hasEvidence?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showPopover?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({
  provenance,
  sourceType = provenance?.source_type || 'COMMUNITY',
  verificationStatus = provenance?.verification_status || 'PENDING',
  hasEvidence = provenance?.evidence_available || false,
  size = 'md',
  showPopover = true,
  className = '',
  onClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Determine badge visuals based on SOURCE + VERIFICATION STATUS
  // Critical principle: SOURCE != TRUST STATUS
  let badgeLabel = '';
  let badgeClass = '';
  let icon = <Info className="w-3.5 h-3.5 mr-1" />;
  let ariaLabel = '';

  if (verificationStatus === 'OUTDATED') {
    badgeLabel = 'Reported Outdated';
    badgeClass = 'bg-red-50 text-red-800 border-red-300 hover:bg-red-100';
    icon = <AlertTriangle className="w-3.5 h-3.5 mr-1 text-red-600 shrink-0" />;
    ariaLabel = 'Trust Status: Reported Outdated by community';
  } else if (verificationStatus === 'VERIFIED') {
    badgeLabel = 'LocalLens Verified';
    badgeClass = 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100';
    icon = <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-700 shrink-0" />;
    ariaLabel = 'Trust Status: LocalLens Verified by platform desk';
  } else if (verificationStatus === 'UNDER_REVIEW') {
    badgeLabel = 'Under Review';
    badgeClass = 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100';
    icon = <Clock className="w-3.5 h-3.5 mr-1 text-amber-700 shrink-0" />;
    ariaLabel = 'Trust Status: Under Review by LocalLens Verification Desk';
  } else if (sourceType === 'GOOGLE_MAPS') {
    badgeLabel = 'Google Maps';
    badgeClass = 'bg-sky-50 text-sky-900 border-sky-300 hover:bg-sky-100';
    icon = <MapPin className="w-3.5 h-3.5 mr-1 text-sky-600 shrink-0" />;
    ariaLabel = 'Data Source: Google Maps (External Reference)';
  } else if (sourceType === 'GOOGLE_SEARCH') {
    badgeLabel = 'Google Search';
    badgeClass = 'bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100';
    icon = <Search className="w-3.5 h-3.5 mr-1 text-blue-600 shrink-0" />;
    ariaLabel = 'Data Source: Google Search (External Web Index)';
  } else if (hasEvidence) {
    badgeLabel = 'Community + Evidence';
    badgeClass = 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100';
    icon = <FileCheck className="w-3.5 h-3.5 mr-1 text-amber-600 shrink-0" />;
    ariaLabel = 'Data Source: Community with attached proof (Pending verification)';
  } else {
    badgeLabel = 'Community Contribution';
    badgeClass = 'bg-purple-50 text-purple-900 border-purple-300 hover:bg-purple-100';
    icon = <Users className="w-3.5 h-3.5 mr-1 text-purple-600 shrink-0" />;
    ariaLabel = 'Data Source: Community Contribution (Unverified)';
  }

  // Size styling
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-[11px] px-2.5 py-1',
    lg: 'text-xs px-3 py-1.5'
  }[size];

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
    if (showPopover) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={handleToggle}
        title={ariaLabel}
        aria-label={ariaLabel}
        className={`inline-flex items-center font-bold rounded-lg border transition-all cursor-pointer shadow-2xs select-none ${sizeStyles} ${badgeClass} ${className}`}
      >
        {icon}
        <span className="truncate">{badgeLabel}</span>
      </button>

      {/* Provenance Details Popover */}
      {isOpen && showPopover && (
        <div 
          className="absolute z-50 left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 text-xs text-stone-700 space-y-3 animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-stone-100 pb-2.5">
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-stone-400">
                Data Provenance & Trust
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm flex items-center mt-0.5">
                {badgeLabel}
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Details Table */}
          <div className="space-y-2 py-0.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-stone-500 font-medium">Source:</span>
              <span className="font-bold text-stone-900">
                {sourceType === 'GOOGLE_MAPS' && 'Google Maps Platform'}
                {sourceType === 'GOOGLE_SEARCH' && 'Google Search Reference'}
                {sourceType === 'COMMUNITY' && 'Local Traveler / Scout'}
                {sourceType === 'LOCAL_LENS' && 'LocalLens Audited Intelligence'}
                {sourceType === 'ADMIN' && 'LocalLens Platform Desk'}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-stone-500 font-medium">Trust Status:</span>
              <span className={`font-black px-1.5 py-0.2 rounded text-[10px] uppercase ${
                verificationStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' :
                verificationStatus === 'OUTDATED' ? 'bg-red-100 text-red-800' :
                verificationStatus === 'UNDER_REVIEW' ? 'bg-amber-100 text-amber-800' :
                'bg-stone-100 text-stone-800'
              }`}>
                {verificationStatus}
              </span>
            </div>

            {provenance?.submitted_by && (
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-stone-500 font-medium">Submitted By:</span>
                <span className="font-semibold text-stone-800">{provenance.submitted_by}</span>
              </div>
            )}

            {provenance?.submitted_at && (
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-stone-500 font-medium">Submitted Date:</span>
                <span className="font-medium text-stone-700">{provenance.submitted_at}</span>
              </div>
            )}

            {hasEvidence && (
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-stone-500 font-medium">Evidence:</span>
                <span className="font-bold text-amber-800 flex items-center">
                  <FileCheck className="w-3 h-3 mr-1" /> Attached Proof
                </span>
              </div>
            )}

            {verificationStatus === 'VERIFIED' && (
              <>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-500 font-medium">Verified By:</span>
                  <span className="font-bold text-emerald-800">{provenance?.verified_by || 'LocalLens Desk'}</span>
                </div>
                {provenance?.verified_at && (
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-500 font-medium">Last Audited:</span>
                    <span className="font-semibold text-stone-800">{provenance.verified_at}</span>
                  </div>
                )}
              </>
            )}

            {verificationStatus === 'OUTDATED' && provenance?.outdated_at && (
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-stone-500 font-medium">Reported Outdated:</span>
                <span className="font-bold text-red-700">{provenance.outdated_at}</span>
              </div>
            )}
          </div>

          {/* Transparent Disclaimer Box */}
          <div className="bg-[#FAF9F6] p-2.5 rounded-xl border border-stone-200 text-[11px] text-stone-600 space-y-1">
            <div className="font-bold text-stone-800 flex items-center">
              <Info className="w-3 h-3 mr-1 text-[#1B4332]" />
              Trust Guarantee
            </div>
            <p className="leading-snug">
              {sourceType.startsWith('GOOGLE')
                ? 'External reference data helps discover basic places. It is not verified by the LocalLens Verification Desk.'
                : verificationStatus === 'VERIFIED'
                ? 'Audited and verified against ground-truth local transport schedules and community receipts.'
                : 'Community submitted advice. Always confirm with on-ground bus conductors or local scouts.'}
            </p>
          </div>

          {/* External Reference Link if present */}
          {provenance?.source_url && (
            <a 
              href={provenance.source_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-[#1B4332] hover:underline flex items-center justify-center pt-1"
            >
              <span>View Source Reference</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};
