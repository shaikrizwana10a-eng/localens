import React from 'react';
import { 
  BookOpen, 
  Share2, 
  ShieldCheck, 
  Compass, 
  Star, 
  RefreshCw, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface CommunityProcessSectionProps {
  onShareClick: () => void;
  onExploreClick: () => void;
}

export const CommunityProcessSection: React.FC<CommunityProcessSectionProps> = ({
  onShareClick,
  onExploreClick
}) => {
  const steps = [
    {
      num: '01',
      title: 'KNOW',
      subtitle: 'Local Insight',
      icon: <BookOpen className="w-5 h-5 text-emerald-400" />,
      desc: 'Locals possess unindexed transit wisdom — exact bus numbers, boarding stands, and fair auto rates.'
    },
    {
      num: '02',
      title: 'SHARE',
      subtitle: 'Community Report',
      icon: <Share2 className="w-5 h-5 text-blue-400" />,
      desc: 'Users submit real travel facts. Entries enter as PENDING so unverified data is never falsely trusted.'
    },
    {
      num: '03',
      title: 'VERIFY',
      subtitle: 'Platform Audit',
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      desc: 'Auditors and local scouts verify ticket receipts, bus schedules, and locations, stamping as VERIFIED.'
    },
    {
      num: '04',
      title: 'TRAVEL',
      subtitle: 'Confident Commute',
      icon: <Compass className="w-5 h-5 text-purple-400" />,
      desc: 'Travelers use verified facts to commute smoothly at genuine fares without private taxi surge pricing.'
    },
    {
      num: '05',
      title: 'RATE',
      subtitle: 'Traveler Review',
      icon: <Star className="w-5 h-5 text-yellow-400" />,
      desc: 'After the journey, travelers rate accuracy with 1–5 stars to maintain community trust scores.'
    },
    {
      num: '06',
      title: 'UPDATE',
      subtitle: 'Freshness Cycle',
      icon: <RefreshCw className="w-5 h-5 text-rose-400" />,
      desc: 'If fares or routes change, one tap triggers re-verification, keeping all data 100% evergreen.'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-[#1C1917] via-[#25201D] to-[#1B4332] text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-xl space-y-8 relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-6 relative z-10">
        <div className="space-y-1">
          <span className="bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full border border-emerald-500/40 tracking-wider">
            Closed-Loop Verification
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Powered by Local Knowledge
          </h2>
          <p className="text-xs text-stone-300 font-medium">
            How LocalLens transforms invisible local knowledge into audited, trustworthy travel intelligence.
          </p>
        </div>

        <button
          type="button"
          onClick={onShareClick}
          className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all border border-emerald-600 shadow-md flex items-center space-x-1.5 shrink-0 w-fit"
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-300" />
          <span>Share Local Knowledge</span>
        </button>
      </div>

      {/* 6 Steps Horizontal / Grid Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 relative z-10">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-stone-900/80 border border-stone-700/60 hover:border-emerald-500/60 rounded-2xl p-4 space-y-2.5 transition-all hover:bg-stone-800/80 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-stone-500">{step.num}</span>
                <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>

              <div>
                <h3 className="font-black text-sm text-white tracking-wider uppercase">{step.title}</h3>
                <span className="text-[10px] text-emerald-400 font-bold block">{step.subtitle}</span>
              </div>

              <p className="text-[11px] text-stone-300 leading-relaxed">
                {step.desc}
              </p>
            </div>

            {idx < steps.length - 1 && (
              <div className="hidden lg:flex justify-end text-stone-600 pt-1">
                <ArrowRight className="w-3.5 h-3.5 text-stone-600" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Assurance Banner */}
      <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs relative z-10 backdrop-blur-xs">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-stone-200 font-semibold">
            Every submission is date-stamped and undergoes strict community-matching before becoming a Verified Route.
          </span>
        </div>
        <button
          type="button"
          onClick={onExploreClick}
          className="text-emerald-400 hover:underline font-bold text-xs flex items-center"
        >
          <span>Explore Verified Entries</span>
          <ArrowRight className="w-3 h-3 ml-1" />
        </button>
      </div>

    </section>
  );
};
