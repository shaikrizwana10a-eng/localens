import React, { useState } from 'react';
import { Award, Coins, CheckCircle2, Camera, Send } from 'lucide-react';
import type { ContributionMission } from '../../types/travel';

interface MissionsViewProps {
  missions: ContributionMission[];
  onCompleteMission: (missionId: string, reward: number) => void;
  walletBalance: number;
}

export const MissionsView: React.FC<MissionsViewProps> = ({ missions, onCompleteMission, walletBalance }) => {
  const [activeMission, setActiveMission] = useState<ContributionMission | null>(null);
  const [submissionNote, setSubmissionNote] = useState('');
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMission) return;

    onCompleteMission(activeMission.id, activeMission.rewardAmount);
    setIsSubmittedSuccess(true);
    setTimeout(() => {
      setIsSubmittedSuccess(false);
      setActiveMission(null);
      setSubmissionNote('');
    }, 2000);
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#1C1917] text-white p-8 rounded-2xl border border-stone-800 space-y-3 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
            <Award className="w-3.5 h-3.5" />
            <span>Community Scout Micro-Missions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Contribute Local Data & Earn Rewards
          </h1>
          <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
            Verify bus routes, photograph room conditions, or update meal prices. High quality submissions earn instant payouts into your wallet.
          </p>
        </div>

        <div className="bg-emerald-950 border border-emerald-800 p-4 rounded-xl text-emerald-300 text-right">
          <div className="text-xs text-emerald-400 font-semibold uppercase">My Wallet Balance</div>
          <div className="text-3xl font-extrabold text-white mt-0.5 flex items-center justify-end">
            <Coins className="w-6 h-6 mr-1.5 text-amber-400" />
            ₹{walletBalance}
          </div>
        </div>
      </div>

      {/* Missions Board Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#1C1917]">Open Contribution Missions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {missions.map((m) => (
            <div key={m.id} className="bg-white p-6 rounded-xl border border-[#E7E5E4] space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-emerald-100 text-[#1B4332] px-2.5 py-0.5 rounded font-bold uppercase">
                    {m.category} Mission
                  </span>
                  <span className="text-stone-500 font-medium">{m.location}</span>
                </div>

                <h3 className="font-bold text-[#1C1917] text-lg">{m.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{m.description}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#E7E5E4]">
                <div className="text-xs space-y-1">
                  <strong className="text-[#1C1917]">Task Requirements:</strong>
                  <ul className="list-disc list-inside text-stone-600">
                    {m.taskSteps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-[11px] text-amber-900 font-medium">
                  <strong>Quality Guidance: </strong> {m.qualityGuidance}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center text-[#1B4332] font-extrabold text-lg">
                    <Coins className="w-5 h-5 mr-1 text-amber-500" />
                    <span>Reward: ₹{m.rewardAmount}</span>
                  </div>

                  <button
                    onClick={() => setActiveMission(m)}
                    className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                  >
                    Accept & Submit →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submission Modal Simulation */}
      {activeMission && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 space-y-5 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3">
              <div>
                <span className="text-xs font-bold text-[#1B4332] uppercase">Submit Contribution</span>
                <h3 className="text-lg font-bold text-[#1C1917]">{activeMission.title}</h3>
              </div>
              <button 
                onClick={() => setActiveMission(null)}
                className="text-stone-400 hover:text-stone-600 font-bold text-base"
              >
                ✕
              </button>
            </div>

            {isSubmittedSuccess ? (
              <div className="bg-emerald-50 text-emerald-900 p-6 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-[#1B4332] mx-auto" />
                <h4 className="font-bold text-lg">Contribution Submitted!</h4>
                <p className="text-xs">₹{activeMission.rewardAmount} reward added to your Scout Wallet pending instant verification.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="bg-[#FAF9F6] p-3 rounded-lg border border-[#E7E5E4]">
                  <strong className="text-[#1C1917]">Mission Reward: </strong>
                  <span className="text-emerald-800 font-bold">₹{activeMission.rewardAmount}</span>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1C1917]">Observation / Fare Details</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Provide clear details (e.g. Bus ticket fare, exact boarding gate location, hygiene status...)"
                    value={submissionNote}
                    onChange={(e) => setSubmissionNote(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF9F6] border border-[#E7E5E4] rounded-lg focus:outline-none focus:border-[#1B4332]"
                  />
                </div>

                <div className="border-2 border-dashed border-stone-300 rounded-xl p-4 text-center cursor-pointer hover:border-[#1B4332]">
                  <Camera className="w-6 h-6 text-stone-400 mx-auto mb-1" />
                  <span className="font-semibold text-stone-700">Upload Photo or Video Evidence</span>
                  <p className="text-[10px] text-stone-400 mt-0.5">JPG, PNG, MP4 up to 50MB</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white py-3 rounded-lg font-bold shadow-md transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit for Verification</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
