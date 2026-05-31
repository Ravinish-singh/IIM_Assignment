import React from 'react';
import { RetailCategory } from '@/types';
import { Briefcase, ChevronRight, Zap } from 'lucide-react';

interface OpportunityListProps {
  category: RetailCategory;
  isDarkMode?: boolean;
}

const OPPORTUNITIES: Record<RetailCategory, { name: string; fit: number }[]> = {
  'Electronics': [
    { name: 'Mobile Phones & Accessories', fit: 95 },
    { name: 'High-End Computing', fit: 88 },
    { name: 'Premium Audio & Headphones', fit: 82 },
    { name: 'Smart Home Systems', fit: 75 },
    { name: 'Professional Photography', fit: 70 },
  ],
  'Apparel': [
    { name: 'Eco-Conscious Fashion', fit: 92 },
    { name: 'Active & Performance Wear', fit: 85 },
    { name: 'Streetwear Collection', fit: 80 },
    { name: 'Boutique Footwear', fit: 78 },
    { name: 'Designer Accessories', fit: 72 },
  ],
  'Grocery': [
    { name: 'Organic & Natural Foods', fit: 94 },
    { name: 'International Gourmet', fit: 86 },
    { name: 'Plant-Based Alternatives', fit: 84 },
    { name: 'Artisan Bakery Products', fit: 79 },
    { name: 'Specialty Coffee & Tea', fit: 75 },
  ],
  'Luxury Goods': [
    { name: 'Investment Timepieces', fit: 98 },
    { name: 'High Jewelry', fit: 90 },
    { name: 'Designer Leather Goods', fit: 88 },
    { name: 'Collector Art Editions', fit: 82 },
    { name: 'Bespoke Fragrances', fit: 76 },
  ],
  'Fast Food': [
    { name: 'Health-Focused QSR', fit: 91 },
    { name: 'Artisan Pizza Concept', fit: 84 },
    { name: 'Specialty Burger Bar', fit: 82 },
    { name: 'Asian Fusion Express', fit: 78 },
    { name: 'Fresh Juice & Smoothies', fit: 74 },
  ],
};

export const OpportunityList: React.FC<OpportunityListProps> = ({ category, isDarkMode = false }) => {
  const items = OPPORTUNITIES[category];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full max-h-[400px] shadow-sm">
      <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <Briefcase size={18} className="text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-zinc-900 dark:text-white font-semibold text-sm">Key Opportunities</h3>
        </div>
        <span className="text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
          Top 5
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
        {items.map((item) => (
          <div 
            key={item.name} 
            className="group flex items-center justify-between p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700/50"
          >
            <div className="flex flex-col gap-1.5 flex-1 pr-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors line-clamp-1">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-1000" 
                    style={{ width: `${item.fit}%` }}
                  />
                </div>
                <span className="text-[10px] text-zinc-500 font-mono w-8">{item.fit}%</span>
              </div>
            </div>
            <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 group-hover:bg-indigo-600 transition-colors">
              <ChevronRight size={14} className="text-zinc-400 dark:text-zinc-500 group-hover:text-white" />
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-zinc-50 dark:bg-zinc-950/30 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
        <Zap size={14} className="text-yellow-600 dark:text-yellow-500" />
        <span className="text-[10px] text-zinc-500 dark:text-zinc-500 font-medium">Market Fit Score based on local demographics.</span>
      </div>
    </div>
  );
};
