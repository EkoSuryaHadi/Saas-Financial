import React from 'react';
import { MonthFilter } from '../types';

interface SidebarProps {
  months: string[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ months, selectedMonth, onMonthChange }) => {
  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 min-h-screen p-6 flex flex-col shadow-sm">
      <div className="mb-8 flex items-center gap-2 text-brand-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-3 shrink-0">
          <path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
        </svg>
        <h1 className="text-lg font-bold tracking-tight leading-tight">SaaS Financial Variance Analyst</h1>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Period Filter
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block"
          >
            <option value={MonthFilter.ALL_YEAR}>All Year (2025)</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        
        <div className="p-4 bg-brand-50 rounded-lg border border-brand-100 mt-10">
          <h3 className="text-sm font-bold text-brand-800 mb-1">System Status</h3>
          <div className="flex items-center gap-2 text-xs text-brand-600">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Gemini 2.5 Flash Connected
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;