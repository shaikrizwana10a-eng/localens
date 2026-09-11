import React, { useState } from 'react';
import { 
  Bus, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import type { TransportRoute } from '../../types/travel';
import { useLocalKnowledge } from '../../context/LocalKnowledgeContext';
import { composeRouteIntelligence } from '../../utils/routeComposer';
import { RouteIntelligenceCard } from '../knowledge/RouteIntelligenceCard';

interface TransportExplorerViewProps {
  routes: TransportRoute[];
  onNavigate: (view: string) => void;
}


export const TransportExplorerView: React.FC<TransportExplorerViewProps> = ({ routes: _routes, onNavigate }) => {
  const { items } = useLocalKnowledge();

  // Custom A -> B Navigation Inputs
  const [originInput, setOriginInput] = useState('Gajuwaka');
  const [destInput, setDestInput] = useState('Vignan College');

  // Evaluate Route Intelligence dynamically from LocalKnowledgeContext
  const routeIntelligenceResult = composeRouteIntelligence(originInput, destInput, items);

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Page Header Banner */}
      <div className="bg-[#1C1917] text-white p-8 rounded-3xl border border-stone-800 space-y-5 shadow-xl">
        <div className="inline-flex items-center space-x-2 bg-[#1B4332] text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-700">
          <Bus className="w-3.5 h-3.5" />
          <span>LOCAL Route Intelligence Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Step-by-Step Local Transport Navigation
        </h1>
        <p className="text-stone-300 text-sm max-w-3xl leading-relaxed">
          LOCAL evaluates verified community knowledge to determine whether your destination can be reached by a direct bus or a step-by-step journey (Bus → Get down at bus stop → Take an auto).
        </p>

        {/* Custom A -> B Route Intelligence Search Form */}
        <form onSubmit={handleCustomSearch} className="bg-white p-4 rounded-2xl shadow-xl border border-stone-200 grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
          <div className="md:col-span-5 relative">
            <label className="text-[10px] font-extrabold text-stone-500 uppercase px-1">Origin A</label>
            <input
              type="text"
              value={originInput}
              onChange={(e) => setOriginInput(e.target.value)}
              placeholder="e.g. Gajuwaka or Tirupati Station"
              className="w-full p-2.5 bg-[#FAF9F6] border border-stone-300 rounded-xl text-stone-900 font-extrabold focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            />
          </div>

          <div className="md:col-span-5 relative">
            <label className="text-[10px] font-extrabold text-stone-500 uppercase px-1">Destination B</label>
            <input
              type="text"
              value={destInput}
              onChange={(e) => setDestInput(e.target.value)}
              placeholder="e.g. Vignan College or RK Beach"
              className="w-full p-2.5 bg-[#FAF9F6] border border-stone-300 rounded-xl text-stone-900 font-extrabold focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            />
          </div>

          <div className="md:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white p-2.5 rounded-xl font-extrabold transition-colors flex items-center justify-center space-x-1 shadow-sm"
            >
              <span>Evaluate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Popular Quick Route Shortcut Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-stone-400 font-medium">Quick Evaluator:</span>
          <button
            onClick={() => {
              setOriginInput('Gajuwaka');
              setDestInput('VIIT');
            }}
            className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-lg font-bold flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Gajuwaka → VIIT (No Direct Bus)</span>
          </button>
          <button
            onClick={() => {
              setOriginInput('Gajuwaka');
              setDestInput('Vignan College');
            }}
            className="bg-stone-800 text-stone-200 border border-stone-700 px-2.5 py-1 rounded-lg font-medium"
          >
            Gajuwaka → Vignan College
          </button>
          <button
            onClick={() => {
              setOriginInput('Gajuwaka');
              setDestInput('RK Beach');
            }}
            className="bg-stone-800 text-stone-200 border border-stone-700 px-2.5 py-1 rounded-lg font-medium"
          >
            Gajuwaka → RK Beach (Direct Bus 99)
          </button>
          <button
            onClick={() => {
              setOriginInput('Tirupati Railway Station');
              setDestInput('Kapila Theertham');
            }}
            className="bg-stone-800 text-stone-200 border border-stone-700 px-2.5 py-1 rounded-lg font-medium"
          >
            Tirupati → Kapila Theertham
          </button>
        </div>
      </div>

      {/* DYNAMIC LOCAL ROUTE INTELLIGENCE CARD RESULT */}
      {routeIntelligenceResult && (
        <RouteIntelligenceCard
          routeResult={routeIntelligenceResult}
          onNavigateToShare={() => onNavigate('share-knowledge')}
        />
      )}

    </div>
  );
};
