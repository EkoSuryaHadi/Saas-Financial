import React, { useState } from 'react';
import { FinancialRecord } from '../types';

interface TransactionTableProps {
  records: FinancialRecord[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ records }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Show only first 5 if not expanded
  const displayedRecords = isExpanded ? records : records.slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div 
        className="p-6 border-b border-slate-100 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-slate-900">Detailed Financial Records</h3>
        <button className="text-sm text-brand-600 font-medium flex items-center gap-1">
          {isExpanded ? 'Show Less' : 'View All Records'}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Group</th>
              <th scope="col" className="px-6 py-3">Line Item</th>
              <th scope="col" className="px-6 py-3 text-right">Budget</th>
              <th scope="col" className="px-6 py-3 text-right">Actual</th>
              <th scope="col" className="px-6 py-3 text-right">Variance ($)</th>
              <th scope="col" className="px-6 py-3 text-right">Var %</th>
            </tr>
          </thead>
          <tbody>
            {displayedRecords.map((record) => {
               const isNeg = record.varianceAmount < 0; // Under budget (Good for cost) or Under revenue (Bad)
               // For simplicity in coloring: Red = Variance > 0 (Over budget/More spend), Green = Variance < 0
               // Note: This is simplistic. In real finance, Variance sign meaning depends on Revenue vs Expense type.
               // We will use the logic: If actual > budget (variance > 0), color it orange/red.
               
               const varColor = record.varianceAmount > 0 ? 'text-rose-600' : 'text-emerald-600';
               
               return (
                <tr key={record.id} className="bg-white border-b hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{record.date}</td>
                    <td className="px-6 py-4">{record.categoryGroup}</td>
                    <td className="px-6 py-4">{record.lineItem}</td>
                    <td className="px-6 py-4 text-right">${record.budget.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-semibold">${record.actual.toLocaleString()}</td>
                    <td className={`px-6 py-4 text-right font-medium ${varColor}`}>
                    {record.varianceAmount > 0 ? '+' : ''}{record.varianceAmount.toLocaleString()}
                    </td>
                    <td className={`px-6 py-4 text-right ${varColor}`}>
                    {record.variancePercent.toFixed(2)}%
                    </td>
                </tr>
               );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;