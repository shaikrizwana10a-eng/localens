import React, { useState } from 'react';
import { Video, Play, CheckCircle2, FileText, Award } from 'lucide-react';
import type { VideoReview } from '../../types/travel';
import { TrustBadge } from '../common/TrustBadge';

interface VideoReviewsViewProps {
  videoReviews: VideoReview[];
}

export const VideoReviewsView: React.FC<VideoReviewsViewProps> = ({ videoReviews }) => {
  const [selectedVid, setSelectedVid] = useState<VideoReview>(videoReviews[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#1C1917] text-white p-8 rounded-2xl border border-stone-800 space-y-3">
        <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
          <Video className="w-3.5 h-3.5" />
          <span>Multimodal Review Proofs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Video-Based Customer Experiences & Evidence
        </h1>
        <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
          Previous travellers upload raw video proofs of room conditions, bathroom hygiene, and transport routes. Inspect auto-transcripts and evidence confidence scores.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Video Player & Transcript Details */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-xl border border-[#E7E5E4] overflow-hidden shadow-xs space-y-6 p-6">
            
            {/* Simulated Video Player Box */}
            <div className="relative h-64 sm:h-96 rounded-xl overflow-hidden bg-stone-900 flex items-center justify-center">
              <img src={selectedVid.videoThumbnail} alt={selectedVid.placeName} className="w-full h-full object-cover opacity-60" />
              
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute w-16 h-16 rounded-full bg-[#1B4332] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>

              <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-md text-xs font-bold backdrop-blur-xs flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Contributor Trust: {selectedVid.contributorTrustScore}%</span>
              </div>

              <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2.5 py-1 rounded text-xs font-mono">
                Duration: {selectedVid.videoDuration}
              </div>
            </div>

            {/* Video Overview Title & Contributor Info */}
            <div className="flex flex-wrap items-center justify-between border-b border-[#E7E5E4] pb-4 gap-2">
              <div>
                <span className="text-xs font-bold text-[#1B4332] uppercase tracking-wide">{selectedVid.placeType} Proof</span>
                <h2 className="text-xl font-bold text-[#1C1917] mt-0.5">{selectedVid.placeName}</h2>
                <p className="text-xs text-stone-500 mt-0.5">Recorded by {selectedVid.contributorName} • {selectedVid.dateOfExperience}</p>
              </div>
              <TrustBadge level={selectedVid.confidenceLevel} verifiedCount={selectedVid.verifiedCount} />
            </div>

            {/* Auto-Transcript Section */}
            <div className="bg-[#FAF9F6] p-5 rounded-xl border border-[#E7E5E4] space-y-2 text-xs">
              <h4 className="font-bold text-[#1C1917] flex items-center text-sm">
                <FileText className="w-4 h-4 mr-1.5 text-[#1B4332]" />
                Auto-Generated Video Transcript
              </h4>
              <p className="text-stone-700 italic leading-relaxed">
                "{selectedVid.transcript}"
              </p>
            </div>

            {/* Key Positive / Negative Observations */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#1C1917] text-sm">Key Empirical Observations</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {selectedVid.keyObservations.map((obs, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-lg border flex items-start space-x-2 ${
                      obs.type === 'positive'
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        : obs.type === 'negative'
                        ? 'bg-red-50 text-red-900 border-red-200'
                        : 'bg-stone-50 text-stone-900 border-stone-200'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{obs.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right 1 Column: Video Proof List */}
        <div className="space-y-4">
          <h3 className="font-bold text-[#1C1917] text-base">All Multimodal Video Proofs</h3>
          <div className="space-y-3">
            {videoReviews.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setSelectedVid(vid)}
                className={`bg-white p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center space-x-3 ${
                  selectedVid.id === vid.id
                    ? 'border-[#1B4332] bg-emerald-50/40 shadow-xs'
                    : 'border-[#E7E5E4] hover:border-stone-400'
                }`}
              >
                <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-stone-900 shrink-0">
                  <img src={vid.videoThumbnail} alt={vid.placeName} className="w-full h-full object-cover opacity-70" />
                  <Play className="absolute inset-0 m-auto w-6 h-6 text-white" />
                </div>

                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-[#1C1917] line-clamp-1">{vid.placeName}</h4>
                  <p className="text-[11px] text-stone-500">By {vid.contributorName.split('(')[0]}</p>
                  <TrustBadge level={vid.confidenceLevel} showDetails={false} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
