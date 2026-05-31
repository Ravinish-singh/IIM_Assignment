import React from 'react';
import { AppData, AnalyticsResult } from '@/types';
import { Sparkles } from 'lucide-react';

interface AIInsightProps {
  data: AppData;
  results: AnalyticsResult;
}

export const AIInsight: React.FC<AIInsightProps> = ({ data, results }) => {
  const getInsight = () => {
    const viability = results.viabilityScore > 70 ? 'High' : results.viabilityScore > 40 ? 'Moderate' : 'Low';
    const growthNote = data.annualGrowthRate > 2 ? 'strong growth' : 'stable';
    const segmentNote = data.targetCategory === 'Apparel' || data.targetCategory === 'Fast Food' 
      ? 'Gen Z and Millennials' 
      : 'Gen X and Boomers';

    return `Analysis for ${data.locationName} shows ${viability} viability for ${data.targetCategory}. With a ${growthNote} rate of ${data.annualGrowthRate}%, the market size is projected to reach ${results.projections[5].population.toLocaleString()} by ${results.projections[5].year}. The high concentration of ${segmentNote} suggests a tailored marketing approach will yield the best ROI. ${results.viabilityScore < 40 ? 'Caution: High competition saturation may limit entry success.' : 'The market conditions are favorable for expansion.'}`;
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500/10 to-sky-500/10 border border-indigo-500/20 p-6 rounded-xl space-y-3">
      <div className="flex items-center gap-2 text-indigo-400 font-semibold">
        <Sparkles size={18} />
        <span>AI Market Insight</span>
      </div>
      <p className="text-zinc-300 text-sm leading-relaxed italic">
        &quot;{getInsight()}&quot;
      </p>
    </div>
  );
};
