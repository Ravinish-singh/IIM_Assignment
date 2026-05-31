import React from 'react';
import { AnalyticsResult } from '@/types';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { DollarSign, Users, Activity } from 'lucide-react';

interface KPICardsProps {
  results: AnalyticsResult;
  isDarkMode?: boolean;
}

export const KPICards: React.FC<KPICardsProps> = ({ results, isDarkMode = false }) => {
  const getScoreColor = (score: number) => {
    if (score < 40) return 'text-red-500 bg-red-500/10 border-red-500/20';
    if (score < 70) return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl space-y-2 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500 dark:text-zinc-500 text-sm font-medium">Total Addressable Market</span>
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <DollarSign className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-white">{formatCurrency(results.tam)}</div>
        <div className="text-xs text-zinc-500">Estimated annual spending capacity</div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl space-y-2 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500 dark:text-zinc-500 text-sm font-medium">Target Demographic</span>
          <div className="p-2 bg-sky-500/10 rounded-lg">
            <Users className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          </div>
        </div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-white">{formatNumber(results.targetDemographicCount)}</div>
        <div className="text-xs text-zinc-500">Size of primary target audience</div>
      </div>

      <div className={`border p-6 rounded-xl space-y-2 shadow-sm ${getScoreColor(results.viabilityScore)}`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium opacity-80">Viability Score</span>
          <div className="p-2 bg-current rounded-lg opacity-10">
            <Activity className="w-5 h-5" />
          </div>
        </div>
        <div className="text-3xl font-black">{results.viabilityScore.toFixed(0)}%</div>
        <div className="text-xs font-medium opacity-80 uppercase tracking-wider">
          {results.viabilityScore < 40 ? 'High Risk' : results.viabilityScore < 70 ? 'Moderate' : 'Lucrative'}
        </div>
      </div>
    </div>
  );
};
