import React, { useState } from 'react';
import { ShieldCheck, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { VerificationTask } from '../../types/travel';
import { TrustBadge } from '../common/TrustBadge';

interface VerificationViewProps {
  tasks: VerificationTask[];
}

export const VerificationView: React.FC<VerificationViewProps> = ({ tasks: initialTasks }) => {
  const [taskList, setTaskList] = useState<VerificationTask[]>(initialTasks);

  const handleVote = (taskId: string, vote: 'match' | 'contradict') => {
    setTaskList((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const matchCount = vote === 'match' ? t.matchCount + 1 : t.matchCount;
          const contradictCount = vote === 'contradict' ? t.contradictCount + 1 : t.contradictCount;
          return {
            ...t,
            matchCount,
            contradictCount,
            userVote: vote
          };
        }
        return t;
      })
    );
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#1C1917] text-white p-8 rounded-2xl border border-stone-800 space-y-3">
        <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Community Verification Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Verify Claims & Maintain Trust Quality
        </h1>
        <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
          The community aggregates independent confirmations from travellers who actually stayed or traveled there. Confirm or dispute claims to keep data reliable.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#1C1917]">Pending Community Claims for Verification</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {taskList.map((task) => (
            <div key={task.id} className="bg-white p-6 rounded-xl border border-[#E7E5E4] space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-emerald-100 text-[#1B4332] px-2 py-0.5 rounded font-bold uppercase">
                    {task.category} Claim
                  </span>
                  <TrustBadge level={task.confidenceLevel} showDetails={false} />
                </div>

                <h3 className="font-bold text-[#1C1917] text-base">{task.placeName}</h3>
                <div className="bg-[#FAF9F6] p-3 rounded-lg border border-[#E7E5E4] text-xs text-stone-800 font-medium">
                  "{task.claimText}"
                </div>
                <p className="text-[11px] text-stone-500">Submitted by {task.submittedBy} • {task.submittedDaysAgo} days ago</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#E7E5E4]">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-emerald-700">{task.matchCount} Matches</span>
                  <span className="text-red-700">{task.contradictCount} Contradictions</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleVote(task.id, 'match')}
                    className={`py-2 rounded-lg font-bold border transition-colors flex items-center justify-center space-x-1 ${
                      task.userVote === 'match'
                        ? 'bg-[#1B4332] text-white border-[#1B4332]'
                        : 'bg-emerald-50 text-[#1B4332] border-emerald-300 hover:bg-emerald-100'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Matches Experience</span>
                  </button>

                  <button
                    onClick={() => handleVote(task.id, 'contradict')}
                    className={`py-2 rounded-lg font-bold border transition-colors flex items-center justify-center space-x-1 ${
                      task.userVote === 'contradict'
                        ? 'bg-red-800 text-white border-red-800'
                        : 'bg-red-50 text-red-800 border-red-300 hover:bg-red-100'
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    <span>Dispute Claim</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
