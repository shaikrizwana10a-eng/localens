import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Share2, 
  ShieldCheck, 
  Compass, 
  Star, 
  RefreshCw, 
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  CheckCircle2
} from 'lucide-react';

interface LoopStep {
  id: string;
  number: number;
  title: string;
  subTitle: string;
  icon: React.ReactNode;
  color: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  exampleText: string;
  badgeLabel: string;
}

export const CommunityLoopSection: React.FC<{
  onExploreClick?: () => void;
  onShareClick?: () => void;
}> = ({ onExploreClick, onShareClick }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const steps: LoopStep[] = [
    {
      id: 'know',
      number: 1,
      title: 'KNOW',
      subTitle: 'Local Experience',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-900',
      description: 'Locals possess practical travel wisdom — exact bus numbers, boarding stands, actual fares, and affordable stays that search engines miss.',
      exampleText: 'E.g., "Bus 99 from Gajuwaka to RK Beach costs ₹45 and runs every 12 minutes."',
      badgeLabel: 'LOCAL WISDOM'
    },
    {
      id: 'share',
      number: 2,
      title: 'SHARE',
      subTitle: 'Community Report',
      icon: <Share2 className="w-5 h-5" />,
      color: 'from-blue-500 to-indigo-600',
      badgeBg: 'bg-blue-100',
      badgeText: 'text-blue-900',
      description: 'Users submit their real-world travel observations. Submissions enter the system with PENDING status so raw unverified data is never falsely trusted.',
      exampleText: 'Status: PENDING → Stored safely in verification queue.',
      badgeLabel: 'STATUS: PENDING'
    },
    {
      id: 'verify',
      number: 3,
      title: 'VERIFY',
      subTitle: 'Platform Verification',
      icon: <ShieldCheck className="w-5 h-5" />,
      color: 'from-amber-500 to-orange-600',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-900',
      description: 'Platform verification team and local scouts audit submitted routes, ticket receipts, and boarding points to confirm authenticity.',
      exampleText: 'PENDING → VERIFIED (Stamped with verification date).',
      badgeLabel: 'STATUS: VERIFIED'
    },
    {
      id: 'travel',
      number: 4,
      title: 'TRAVEL',
      subTitle: 'Confident Journey',
      icon: <Compass className="w-5 h-5" />,
      color: 'from-purple-500 to-violet-600',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-900',
      description: 'Travelers use verified route details to get around affordably without getting overcharged by private taxis or lost at wrong bus stops.',
      exampleText: 'Traveler boards Bus 99 at Gajuwaka for exact ₹45 fare.',
      badgeLabel: 'SMART TRAVEL'
    },
    {
      id: 'rate',
      number: 5,
      title: 'RATE',
      subTitle: 'Traveler Feedback',
      icon: <Star className="w-5 h-5" />,
      color: 'from-yellow-500 to-amber-600',
      badgeBg: 'bg-yellow-100',
      badgeText: 'text-yellow-900',
      description: 'After using the information, travelers answer: "Was this accurate?" and submit 1–5 star ratings to reflect real community sentiment.',
      exampleText: '4.8 / 5 rating based on 42 traveler votes.',
      badgeLabel: 'COMMUNITY RATING'
    },
    {
      id: 'update',
      number: 6,
      title: 'UPDATE',
      subTitle: 'Freshness Audit',
      icon: <RefreshCw className="w-5 h-5" />,
      color: 'from-rose-500 to-pink-600',
      badgeBg: 'bg-rose-100',
      badgeText: 'text-rose-900',
      description: 'If bus numbers or fares change, users click "This information may be outdated", moving items to OUTDATED status for re-verification.',
      exampleText: 'Triggers Re-Verification Workflow → Keeps data 100% fresh.',
      badgeLabel: 'RE-VERIFICATION'
    },
    {
      id: 'know-more',
      number: 7,
      title: 'KNOW MORE',
      subTitle: 'Evergreen Knowledge',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'from-emerald-600 to-teal-700',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-950',
      description: 'The loop completes and restarts continuous cycle: verified local travel knowledge that grows more trustworthy every single day!',
      exampleText: 'Continuous Loop ↺ Travel like someone who knows the place.',
      badgeLabel: 'EVERGREEN LOOP'
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  return (
    <section className="bg-gradient-to-br from-[#1C1917] via-[#2A2421] to-[#1C1917] text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-xl overflow-hidden relative">
      
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-8 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>How LOCAL Works — The Central Product Loop</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Community Knowledge + Platform Verification
            </h2>
            <p className="text-stone-300 text-sm mt-1 max-w-2xl">
              The community generates the local knowledge. The platform verifies it. Travelers use it. The community keeps it updated.
            </p>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="self-start sm:self-auto inline-flex items-center space-x-2 bg-stone-800 hover:bg-stone-700 text-stone-200 px-3.5 py-1.5 rounded-full text-xs font-medium border border-stone-700 transition-colors shrink-0"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pause Cycle</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Auto Play Cycle</span>
              </>
            )}
          </button>
        </div>

        {/* Visual Flow Node Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStep(idx);
                  setIsPlaying(false);
                }}
                className={`flex flex-col items-center p-3 rounded-2xl transition-all border text-left relative overflow-hidden group ${
                  isActive
                    ? 'bg-emerald-950/90 border-emerald-500 shadow-lg shadow-emerald-950/50 scale-105'
                    : 'bg-stone-900/60 hover:bg-stone-800/80 border-stone-800 text-stone-400'
                }`}
              >
                {/* Active Indicator Top Bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-300 animate-pulse" />
                )}

                <div className="flex items-center justify-between w-full mb-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-emerald-400 text-stone-950' : 'bg-stone-800 text-stone-400'
                  }`}>
                    0{step.number}
                  </span>
                  <div className={`p-1 rounded-lg ${isActive ? 'text-emerald-400' : 'text-stone-400'}`}>
                    {step.icon}
                  </div>
                </div>

                <span className={`text-xs font-extrabold tracking-tight ${isActive ? 'text-white' : 'text-stone-300'}`}>
                  {step.title}
                </span>
                <span className="text-[10px] text-stone-400 truncate w-full mt-0.5">
                  {step.subTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Card */}
        <div className="bg-stone-900/90 border border-emerald-900/50 rounded-2xl p-6 sm:p-8 backdrop-blur-xs relative space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${steps[activeStep].color} text-white flex items-center justify-center font-bold shadow-md`}>
                {steps[activeStep].icon}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-emerald-400">STAGE {steps[activeStep].number} OF 7</span>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${steps[activeStep].badgeBg} ${steps[activeStep].badgeText}`}>
                    {steps[activeStep].badgeLabel}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {steps[activeStep].title} — <span className="text-stone-300 font-normal">{steps[activeStep].subTitle}</span>
                </h3>
              </div>
            </div>

            <div className="text-xs text-stone-400 flex items-center space-x-1 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Step {activeStep + 1} / 7</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Core Process</h4>
              <p className="text-sm text-stone-200 leading-relaxed">
                {steps[activeStep].description}
              </p>
            </div>

            <div className="bg-stone-950/80 border border-stone-800 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Live System Demonstration
              </h4>
              <p className="text-xs text-stone-300 font-mono bg-stone-900 p-2.5 rounded border border-stone-800">
                {steps[activeStep].exampleText}
              </p>
            </div>
          </div>

          {/* Action CTAs inside loop view */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-800">
            <div className="text-xs text-stone-400 italic">
              Central Loop: KNOW → SHARE → VERIFY → TRAVEL → RATE → UPDATE → KNOW MORE ↺
            </div>

            <div className="flex items-center space-x-3">
              {onExploreClick && (
                <button
                  onClick={onExploreClick}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center space-x-1"
                >
                  <span>Explore Verified Knowledge</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              {onShareClick && (
                <button
                  onClick={onShareClick}
                  className="bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold px-4 py-2 rounded-lg border border-stone-700 transition-colors"
                >
                  Share What You Know
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
