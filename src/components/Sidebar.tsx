'use client';

import React from 'react';
import { AppData, RetailCategory } from '@/types';
import { LayoutDashboard, MapPin, Users, Target, Percent } from 'lucide-react';

interface SidebarProps {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
  isDarkMode?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ data, setData, isDarkMode = false }) => {
  const handleAgeChange = (key: keyof AppData['segmentation']['age'], value: number) => {
    setData((prev) => ({
      ...prev,
      segmentation: {
        ...prev.segmentation,
        age: { ...prev.segmentation.age, [key]: value },
      },
    }));
  };

  const handleIncomeChange = (key: keyof AppData['segmentation']['income'], value: number) => {
    setData((prev) => ({
      ...prev,
      segmentation: {
        ...prev.segmentation,
        income: { ...prev.segmentation.income, [key]: value },
      },
    }));
  };

  return (
    <aside className="w-80 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 h-screen overflow-y-auto p-6 flex flex-col gap-8 text-zinc-600 dark:text-zinc-300 transition-colors duration-300 shadow-sm z-20">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <LayoutDashboard className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">Retail Opportunity</h1>
      </div>

      {/* Location Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-medium uppercase tracking-wider">
          <MapPin size={16} />
          <span>Location & Basics</span>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs text-zinc-500 font-semibold uppercase tracking-tighter">Location Name</label>
            <input
              type="text"
              value={data.locationName}
              onChange={(e) => setData({ ...data, locationName: e.target.value })}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-zinc-900 dark:text-zinc-100 shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-zinc-500 font-semibold uppercase tracking-tighter">Target Category</label>
            <select
              value={data.targetCategory}
              onChange={(e) => setData({ ...data, targetCategory: e.target.value as RetailCategory })}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-zinc-900 dark:text-zinc-100 shadow-sm"
            >
              <option>Grocery</option>
              <option>Apparel</option>
              <option>Electronics</option>
              <option>Luxury Goods</option>
              <option>Fast Food</option>
            </select>
          </div>
        </div>
      </section>

      {/* Population Metrics */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-medium uppercase tracking-wider">
          <Users size={16} />
          <span>Population Metrics</span>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label className="text-zinc-500 font-semibold uppercase tracking-tighter">Total Population</label>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">{(data.totalPopulation / 1000).toFixed(0)}k</span>
            </div>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={data.totalPopulation}
              onChange={(e) => setData({ ...data, totalPopulation: parseInt(e.target.value) })}
              className="w-full accent-indigo-500 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label className="text-zinc-500 font-semibold uppercase tracking-tighter">Annual Growth (%)</label>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">{data.annualGrowthRate}%</span>
            </div>
            <input
              type="range"
              min="-5"
              max="15"
              step="0.5"
              value={data.annualGrowthRate}
              onChange={(e) => setData({ ...data, annualGrowthRate: parseFloat(e.target.value) })}
              className="w-full accent-indigo-500 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* Segmentation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-medium uppercase tracking-wider">
          <Target size={16} />
          <span>Age Demographics (%)</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {(['genZ', 'millennials', 'genX', 'boomers'] as const).map((age) => (
            <div key={age} className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase font-bold">{age}</label>
              <input
                type="number"
                value={data.segmentation.age[age]}
                onChange={(e) => handleAgeChange(age, parseInt(e.target.value) || 0)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 text-xs focus:outline-none text-zinc-900 dark:text-zinc-100 shadow-sm"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-medium uppercase tracking-wider">
          <Percent size={16} />
          <span>Income Levels (%)</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(['low', 'middle', 'high'] as const).map((level) => (
            <div key={level} className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase font-bold">{level}</label>
              <input
                type="number"
                value={data.segmentation.income[level]}
                onChange={(e) => handleIncomeChange(level, parseInt(e.target.value) || 0)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 text-xs focus:outline-none text-zinc-900 dark:text-zinc-100 shadow-sm"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-auto pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs items-center">
            <label className="text-zinc-500 font-semibold uppercase tracking-wider">Competition</label>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
              data.competitionIndex > 0.7 ? 'bg-red-500/20 text-red-600 dark:text-red-400' : 
              data.competitionIndex > 0.3 ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' : 
              'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
            }`}>
              {data.competitionIndex > 0.7 ? 'High Saturation' : data.competitionIndex > 0.3 ? 'Moderate' : 'Low Entry Barrier'}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={data.competitionIndex}
            onChange={(e) => setData({ ...data, competitionIndex: parseFloat(e.target.value) })}
            className="w-full accent-indigo-500 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer hover:accent-indigo-400 transition-all"
          />
          <p className="text-[10px] text-zinc-500 dark:text-zinc-600 italic">Adjusts viability based on existing market density.</p>
        </div>
      </section>
    </aside>
  );
};
