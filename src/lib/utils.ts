import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AppData, AnalyticsResult, RetailCategory } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CATEGORY_SPEND: Record<RetailCategory, number> = {
  'Grocery': 5000,
  'Apparel': 1200,
  'Electronics': 800,
  'Luxury Goods': 3000,
  'Fast Food': 1500,
};

export function calculateAnalytics(data: AppData): AnalyticsResult {
  const { totalPopulation, annualGrowthRate, segmentation, targetCategory, competitionIndex } = data;
  
  // Target segment logic (example: mix of age and income)
  // Let's assume different categories target different age groups
  let targetAgePercent = 0;
  if (targetCategory === 'Apparel' || targetCategory === 'Fast Food') {
    targetAgePercent = (segmentation.age.genZ + segmentation.age.millennials) / 100;
  } else if (targetCategory === 'Luxury Goods') {
    targetAgePercent = (segmentation.age.genX + segmentation.age.boomers) / 100;
  } else {
    targetAgePercent = 1; // Grocery/Electronics targets everyone
  }

  const targetDemographicCount = Math.round(totalPopulation * targetAgePercent);
  
  // TAM = Target Pop * Average Spend
  const tam = targetDemographicCount * CATEGORY_SPEND[targetCategory];
  
  // Viability Score logic
  // Factors: Growth rate, Target Pop %, Competition (negative impact)
  const baseScore = 60;
  const growthImpact = annualGrowthRate * 5;
  const competitionImpact = competitionIndex * -30;
  const popImpact = (targetAgePercent - 0.5) * 40;
  
  const viabilityScore = Math.min(100, Math.max(0, baseScore + growthImpact + competitionImpact + popImpact));

  // 5-year projections
  const projections = Array.from({ length: 6 }, (_, i) => {
    const year = new Date().getFullYear() + i;
    const population = Math.round(totalPopulation * Math.pow(1 + annualGrowthRate / 100, i));
    return { year: year.toString(), population };
  });

  // Chart data
  const ageData = [
    { name: 'Gen Z', value: segmentation.age.genZ },
    { name: 'Millennials', value: segmentation.age.millennials },
    { name: 'Gen X', value: segmentation.age.genX },
    { name: 'Boomers', value: segmentation.age.boomers },
  ];

  const incomeData = [
    { name: 'Low', value: segmentation.income.low },
    { name: 'Middle', value: segmentation.income.middle },
    { name: 'High', value: segmentation.income.high },
  ];

  return {
    tam,
    targetDemographicCount,
    viabilityScore,
    projections,
    ageData,
    incomeData,
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}
