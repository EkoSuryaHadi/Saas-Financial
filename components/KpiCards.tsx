import React from 'react';
import { AggregatedData } from '../types';

interface KpiCardsProps {
  data: AggregatedData;
}

const KpiCards: React.FC<KpiCardsProps> = ({ data }) => {
  // Determine color for variance. 
  // In a real app, logic depends on whether it's revenue (high=good) or cost (high=bad).
  // Here we simplify: Negative variance means "Over Budget" (technically depends on context, but let's assume Total Net Variance).
  // Actually, Total Variance = Actual - Budget.
  // If Total Variance is positive, we spent more (or earned more).
  // Let's treat this as a generic "Net Variance".
  
  const isPositiveVar = data.totalVariance >= 0;
  const varianceColor = isPositiveVar ? 'text-rose-600' : 'text-emerald-600'; // Assuming Higher Spend = Bad for general view

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Card 1: Budget */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <p className="text-sm font-medium text-slate-500 mb-1">Total Budget</p>
        <h3 className="text-2xl font-bold text-slate-900">
          ${data.totalBudget.toLocaleString()}
        </h3>
      </div>

      {/* Card 2: Actual */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Actual</p>
            <h3 className="text-2xl font-bold text-slate-900">
              ${data.totalActual.toLocaleString()}
            </h3>
          </div>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${isPositiveVar ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
             {isPositiveVar ? '+' : ''}{data.totalVariance.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Card 3: Variance % */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <p className="text-sm font-medium text-slate-500 mb-1">Net Variance %</p>
        <h3 className={`text-2xl font-bold ${varianceColor}`}>
          {data.variancePercent.toFixed(2)}%
        </h3>
        <p className="text-xs text-slate-400 mt-1">Target threshold: ±5%</p>
      </div>
    </div>
  );
};

export default KpiCards;