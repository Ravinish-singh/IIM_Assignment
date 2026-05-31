'use client';

import React, { useState, useEffect } from 'react';
import { Newspaper, TrendingUp, Globe, Award } from 'lucide-react';

const NEWS_ITEMS = [
  {
    id: 1,
    tag: 'Market',
    title: 'Retail sector shows 4.2% growth in Q1 2026',
    icon: <TrendingUp size={14} />,
  },
  {
    id: 2,
    tag: 'Global',
    title: 'New trade agreements opening emerging markets in Southeast Asia',
    icon: <Globe size={14} />,
  },
  {
    id: 3,
    tag: 'Innovation',
    title: 'AI-driven supply chain optimization reducing costs by 15%',
    icon: <Newspaper size={14} />,
  },
  {
    id: 4,
    tag: 'Business',
    title: 'Consumer sentiment reaches 24-month high in urban centers',
    icon: <Award size={14} />,
  },
];

export const BusinessNewsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % NEWS_ITEMS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-indigo-600/10 border-b border-indigo-500/20 h-10 overflow-hidden no-print">
      <div className="max-w-7xl mx-auto h-full px-8 flex items-center">
        <div className="flex items-center gap-2 mr-6 shrink-0">
          <Newspaper size={16} className="text-indigo-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Latest News</span>
          <div className="h-4 w-px bg-indigo-500/30 ml-2" />
        </div>
        
        <div className="relative flex-1 h-full overflow-hidden">
          {NEWS_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 flex items-center gap-3 transition-all duration-700 ease-in-out ${
                index === currentIndex 
                  ? 'translate-y-0 opacity-100' 
                  : index < currentIndex 
                    ? '-translate-y-full opacity-0' 
                    : 'translate-y-full opacity-0'
              }`}
            >
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded flex items-center gap-1.5 font-medium">
                {item.icon}
                {item.tag}
              </span>
              <p className="text-sm text-zinc-300 font-medium truncate">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-1 ml-4">
          {NEWS_ITEMS.map((_, index) => (
            <div 
              key={index} 
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-indigo-500' : 'bg-zinc-800'
              }`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
