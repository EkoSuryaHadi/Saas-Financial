import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  LineChart,
  Line
} from 'recharts';
import { ChartDataCategory, ChartDataVariance, ChartDataTrend } from '../types';

interface ChartsProps {
  categoryData: ChartDataCategory[];
  varianceData: ChartDataVariance[];
  trendData: ChartDataTrend[];
}

const Charts: React.FC<ChartsProps> = ({ categoryData, varianceData, trendData }) => {
  return (
    <div className="mb-8">
      {/* Trend Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Total Budget vs Actual Trend</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                tick={{fontSize: 12}} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => {
                    // Short month name (Jan, Feb, etc.)
                    const date = new Date(value);
                    // Handle potential invalid date gracefully
                    if (isNaN(date.getTime())) return value;
                    return date.toLocaleDateString('en-US', { month: 'short' });
                }}
              />
              <YAxis tick={{fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip 
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                labelFormatter={(label) => {
                    const date = new Date(label);
                    if (isNaN(date.getTime())) return label;
                    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                }}
              />
              <Legend iconType="circle" />
              <Line 
                name="Budget"
                type="monotone" 
                dataKey="Budget" 
                stroke="#94a3b8" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                dot={{r: 4, fill: '#94a3b8'}} 
              />
              <Line 
                name="Actual"
                type="monotone" 
                dataKey="Actual" 
                stroke="#0f172a" 
                strokeWidth={2} 
                dot={{r: 4, fill: '#0f172a'}} 
                activeDot={{r: 6}} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget vs Actual by Category */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Budget vs Actual by Category</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Legend iconType="circle" />
                <Bar dataKey="Budget" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Actual" fill="#0f172a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Variances */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Top 5 Variance Gaps</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={varianceData}
                margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{fontSize: 11}} 
                  width={120} 
                  interval={0}
                />
                <Tooltip 
                   contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                   formatter={(value: number) => [`$${value.toLocaleString()}`, 'Variance']}
                />
                <ReferenceLine x={0} stroke="#94a3b8" />
                <Bar dataKey="variance" fill="#8884d8" radius={[0, 4, 4, 0]}>
                  {varianceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.variance > 0 ? '#ef4444' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Charts;