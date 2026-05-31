'use client';

import React from 'react';
import { AnalyticsResult } from '@/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

interface ChartsProps {
  results: AnalyticsResult;
  isPrinting?: boolean;
}

const COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b'];

export const Charts: React.FC<ChartsProps> = ({ results, isPrinting = false }) => {
  const chartContent = (type: 'bar' | 'line') => {
    if (type === 'bar') {
      return (
        <BarChart data={results.ageData} width={isPrinting ? 500 : undefined} height={isPrinting ? 250 : undefined}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
          {!isPrinting && (
            <Tooltip
              contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
          )}
          <Bar dataKey="value" radius={[4, 4, 0, 0]} isAnimationActive={!isPrinting}>
            {results.ageData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      );
    }
    return (
      <LineChart data={results.projections} width={isPrinting ? 500 : undefined} height={isPrinting ? 250 : undefined}>
        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
        <XAxis dataKey="year" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
        {!isPrinting && (
          <Tooltip
            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
          />
        )}
        <Line
          type="monotone"
          dataKey="population"
          stroke="#6366f1"
          strokeWidth={3}
          dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#18181b' }}
          activeDot={{ r: 6 }}
          isAnimationActive={!isPrinting}
        />
      </LineChart>
    );
  };

  return (
    <div className={`grid grid-cols-1 ${isPrinting ? 'grid-cols-2' : 'lg:grid-cols-2'} gap-6`}>
      {/* Age Distribution */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-4 min-h-[350px]">
        <h3 className="text-white font-medium text-sm">Age & Income Breakdown</h3>
        <div className="h-[280px] w-full flex items-center justify-center">
          {isPrinting ? (
            chartContent('bar')
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {chartContent('bar') as React.ReactElement}
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Population Projections */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-4 min-h-[350px]">
        <h3 className="text-white font-medium text-sm">5-Year Growth Projection</h3>
        <div className="h-[280px] w-full flex items-center justify-center">
          {isPrinting ? (
            chartContent('line')
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {chartContent('line') as React.ReactElement}
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};
