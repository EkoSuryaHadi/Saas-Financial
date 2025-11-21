import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import KpiCards from './components/KpiCards';
import AiAnalyst from './components/AiAnalyst';
import Charts from './components/Charts';
import TransactionTable from './components/TransactionTable';
import SkeletonDashboard from './components/SkeletonDashboard';
import { generateDummyData } from './utils/dataGenerator';
import { generateFinancialInsights } from './services/geminiService';
import { FinancialRecord, AggregatedData, MonthFilter, ChartDataCategory, ChartDataVariance, ChartDataTrend } from './types';

const App: React.FC = () => {
  // 1. State Initialization
  const [allData, setAllData] = useState<FinancialRecord[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(MonthFilter.ALL_YEAR);
  const [aiInsights, setAiInsights] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  // 2. Load Data on Mount
  useEffect(() => {
    const initData = async () => {
      setIsLoadingData(true);
      // Simulate initial data fetch latency
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = generateDummyData();
      setAllData(data);
      // Trigger initial AI analysis for full year after data load
      handleAiGeneration(data, "Full Year 2025");
      setIsLoadingData(false);
    };

    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 3. Filter Logic
  const availableMonths = useMemo(() => {
    const months = Array.from(new Set(allData.map(d => d.date.substring(0, 7)))).sort();
    return months;
  }, [allData]);

  const filteredData = useMemo(() => {
    if (selectedMonth === MonthFilter.ALL_YEAR) return allData;
    return allData.filter(d => d.date.startsWith(selectedMonth));
  }, [allData, selectedMonth]);

  // 4. Aggregation Logic
  const aggregatedStats: AggregatedData = useMemo(() => {
    const totalBudget = filteredData.reduce((acc, curr) => acc + curr.budget, 0);
    const totalActual = filteredData.reduce((acc, curr) => acc + curr.actual, 0);
    const totalVariance = totalActual - totalBudget;
    const variancePercent = totalBudget ? (totalVariance / totalBudget) * 100 : 0;

    return { totalBudget, totalActual, totalVariance, variancePercent };
  }, [filteredData]);

  // 5. Chart Data Preparation
  const chartCategoryData: ChartDataCategory[] = useMemo(() => {
    const groups = filteredData.reduce((acc, curr) => {
      if (!acc[curr.categoryGroup]) {
        acc[curr.categoryGroup] = { name: curr.categoryGroup, Budget: 0, Actual: 0 };
      }
      acc[curr.categoryGroup].Budget += curr.budget;
      acc[curr.categoryGroup].Actual += curr.actual;
      return acc;
    }, {} as Record<string, ChartDataCategory>);
    return Object.values(groups);
  }, [filteredData]);

  const chartVarianceData: ChartDataVariance[] = useMemo(() => {
    // Top 5 absolute variances
    const sorted = [...filteredData].sort((a, b) => Math.abs(b.varianceAmount) - Math.abs(a.varianceAmount));
    return sorted.slice(0, 5).map(item => ({
      name: item.lineItem,
      variance: item.varianceAmount,
      isPositive: item.varianceAmount >= 0
    }));
  }, [filteredData]);

  const chartTrendData: ChartDataTrend[] = useMemo(() => {
    const dateMap = filteredData.reduce((acc, curr) => {
      if (!acc[curr.date]) {
        acc[curr.date] = { date: curr.date, Budget: 0, Actual: 0 };
      }
      acc[curr.date].Budget += curr.budget;
      acc[curr.date].Actual += curr.actual;
      return acc;
    }, {} as Record<string, ChartDataTrend>);

    return Object.values(dateMap).sort((a: ChartDataTrend, b: ChartDataTrend) => a.date.localeCompare(b.date));
  }, [filteredData]);

  // 6. AI Handler
  const handleAiGeneration = useCallback(async (dataToAnalyze: FinancialRecord[], period: string) => {
    setIsAiLoading(true);
    const insights = await generateFinancialInsights(dataToAnalyze, period);
    setAiInsights(insights);
    setIsAiLoading(false);
  }, []);

  // Trigger AI when filter changes
  useEffect(() => {
    if (allData.length > 0 && !isLoadingData) {
        handleAiGeneration(filteredData, selectedMonth);
    }
  }, [selectedMonth, filteredData, allData.length, handleAiGeneration, isLoadingData]);

  // 7. Event Handlers
  const handleMonthChange = (month: string) => {
    setIsLoadingData(true);
    setSelectedMonth(month);
    // Simulate network latency for filtering/processing
    setTimeout(() => {
      setIsLoadingData(false);
    }, 600);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      
      {/* Sidebar */}
      <Sidebar 
        months={availableMonths}
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        {isLoadingData ? (
          <SkeletonDashboard />
        ) : (
          <>
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">Financial Overview</h2>
                <p className="text-slate-500 mt-2">
                    Analyzing: <span className="font-semibold text-slate-700">{selectedMonth}</span>
                </p>
            </header>

            {/* KPI Cards */}
            <KpiCards data={aggregatedStats} />

            {/* AI Analyst Section */}
            <AiAnalyst 
                insights={aiInsights}
                isLoading={isAiLoading}
                onGenerate={() => handleAiGeneration(filteredData, selectedMonth)}
            />

            {/* Charts Section */}
            <Charts 
                categoryData={chartCategoryData}
                varianceData={chartVarianceData}
                trendData={chartTrendData}
            />

            {/* Data Table */}
            <TransactionTable records={filteredData} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;