'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { KPICards } from '@/components/KPICards';
import { Charts } from '@/components/Charts';
import { AIInsight } from '@/components/AIInsight';
import { OpportunityList } from '@/components/OpportunityList';
import { BusinessNewsSlider } from '@/components/BusinessNewsSlider';
import { AppData } from '@/types';
import { calculateAnalytics } from '@/lib/utils';
import { Search, Bell, User, HelpCircle, CheckCircle2, AlertCircle, Loader2, Moon, Sun } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const initialData: AppData = {
  locationName: 'Metropolis Central',
  totalPopulation: 500000,
  annualGrowthRate: 2.5,
  segmentation: {
    age: {
      genZ: 25,
      millennials: 35,
      genX: 25,
      boomers: 15,
    },
    income: {
      low: 20,
      middle: 50,
      high: 30,
    },
  },
  targetCategory: 'Apparel',
  competitionIndex: 0.4,
};

export default function Home() {
  const [data, setData] = useState<AppData>(initialData);
  const [isExporting, setIsExporting] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => calculateAnalytics(data), [data]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleExportPDF = async () => {
    if (!dashboardRef.current) return;
    
    const originalScrollPos = dashboardRef.current.scrollTop;
    setIsExporting(true);
    setIsPrinting(true);
    
    try {
      // Ensure we're at the top for proper capture
      dashboardRef.current.scrollTop = 0;
      
      // Allow more time for Recharts to re-render without animations and fixed sizes
      await new Promise(resolve => setTimeout(resolve, 500));

      const element = dashboardRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: isDarkMode ? '#09090b' : '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: false,
        onclone: (clonedDoc) => {
          const clonedEl = clonedDoc.querySelector('.dashboard-container') as HTMLElement;
          if (clonedEl) {
            clonedEl.style.height = 'auto';
            clonedEl.style.overflow = 'visible';
            clonedEl.style.width = '1200px';
          }
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / (imgWidth / 2), pdfHeight / (imgHeight / 2));
      
      const finalWidth = (imgWidth / 2) * ratio;
      const finalHeight = (imgHeight / 2) * ratio;
      
      pdf.addImage(
        imgData, 
        'PNG', 
        (pdfWidth - finalWidth) / 2, 
        10,
        finalWidth, 
        finalHeight,
        undefined,
        'FAST'
      );
      
      pdf.save(`Market_Analysis_${data.locationName.replace(/[^a-z0-9]/gi, '_')}.pdf`);
      showNotification('PDF Exported successfully!');
    } catch (err) {
      console.error('PDF Export failed:', err);
      showNotification('Export failed. Please try again.', 'error');
    } finally {
      if (dashboardRef.current) {
        dashboardRef.current.scrollTop = originalScrollPos;
      }
      setIsPrinting(false);
      setIsExporting(false);
    }
  };

  const handleSaveAnalysis = () => {
    try {
      const savedAnalyses = JSON.parse(localStorage.getItem('retail_analyses') || '[]');
      const newSave = {
        id: Date.now(),
        date: new Date().toISOString(),
        data: data,
        results: results
      };
      
      localStorage.setItem('retail_analyses', JSON.stringify([...savedAnalyses, newSave]));
      showNotification('Analysis saved to local storage');
    } catch (err) {
      console.error('Failed to save analysis:', err);
      showNotification('Failed to save analysis', 'error');
    }
  };

  return (
    <div className={`flex h-screen font-sans selection:bg-indigo-500/30 transition-colors duration-500 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100`}>
      <Sidebar data={data} setData={setData} isDarkMode={isDarkMode} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <BusinessNewsSlider isDarkMode={isDarkMode} />
        {/* Header */}
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search market regions..." 
                className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all text-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-5 text-zinc-500 dark:text-zinc-400">
            <button 
              onClick={toggleTheme}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-600" />}
            </button>
            <button className="hover:text-zinc-900 dark:hover:text-white transition-colors"><HelpCircle size={20} /></button>
            <button className="hover:text-zinc-900 dark:hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800"></div>
            <div className="flex items-center gap-3 pl-2 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-zinc-900 dark:text-white">Alex Strategist</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase tracking-wider">Enterprise Plan</p>
              </div>
              <div className="w-9 h-9 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:border-indigo-500/50 transition-all">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div ref={dashboardRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar dashboard-container bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Market Analytics</h2>
              <p className="text-zinc-500 dark:text-zinc-500 flex items-center gap-2 text-sm">
                Real-time viability analysis for <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{data.locationName}</span>
              </p>
            </div>
            <div className="flex items-center gap-3 no-print" data-html2canvas-ignore="true">
              <button 
                onClick={handleExportPDF}
                disabled={isExporting}
                className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-900 dark:text-zinc-100 shadow-sm"
              >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {isExporting ? 'Exporting...' : 'Export PDF'}
              </button>
              <button 
                onClick={handleSaveAnalysis}
                className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
              >
                Save Analysis
              </button>
            </div>
          </div>

          <KPICards results={results} isDarkMode={isDarkMode} />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              <Charts results={results} isPrinting={isPrinting} isDarkMode={isDarkMode} />
            </div>
            <div className="space-y-8">
              <AIInsight data={data} results={results} isDarkMode={isDarkMode} />
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl space-y-4 shadow-sm transition-colors duration-500">
                <h3 className="text-zinc-900 dark:text-white font-medium">Strategic Checklist</h3>
                <ul className="space-y-3">
                  {[
                    { text: 'Assess local zoning laws', checked: true },
                    { text: 'Competitor price mapping', checked: false },
                    { text: 'Supply chain logistics audit', checked: true },
                    { text: 'Target demographic survey', checked: false },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className={`w-4 h-4 rounded border transition-colors ${item.checked ? 'bg-indigo-600 border-indigo-600' : 'bg-transparent border-zinc-300 dark:border-zinc-700'}`}>
                        {item.checked && (
                          <svg className="w-3 h-3 text-white m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={item.checked ? 'text-zinc-400 dark:text-zinc-500 line-through transition-colors' : 'text-zinc-600 dark:text-zinc-300 transition-colors'}>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <OpportunityList category={data.targetCategory} isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
      </main>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed bottom-8 right-8 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 border ${
          notification.type === 'success' 
            ? 'bg-emerald-950 border-emerald-500/50 text-emerald-200' 
            : 'bg-red-950 border-red-500/50 text-red-200'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 size={20} className="text-emerald-400" /> : <AlertCircle size={20} className="text-red-400" />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }
        @media print {
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
}
