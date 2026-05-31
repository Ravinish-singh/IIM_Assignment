export type RetailCategory = 'Grocery' | 'Apparel' | 'Electronics' | 'Luxury Goods' | 'Fast Food';

export interface MarketSegmentation {
  age: {
    genZ: number;
    millennials: number;
    genX: number;
    boomers: number;
  };
  income: {
    low: number;
    middle: number;
    high: number;
  };
}

export interface AppData {
  locationName: string;
  totalPopulation: number;
  annualGrowthRate: number;
  segmentation: MarketSegmentation;
  targetCategory: RetailCategory;
  competitionIndex: number; // 0 to 1 (Low to High)
}

export interface AnalyticsResult {
  tam: number;
  targetDemographicCount: number;
  viabilityScore: number;
  projections: { year: string; population: number }[];
  ageData: { name: string; value: number }[];
  incomeData: { name: string; value: number }[];
}
