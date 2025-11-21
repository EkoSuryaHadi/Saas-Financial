export interface FinancialRecord {
  id: string;
  date: string; // ISO string YYYY-MM-DD
  categoryGroup: string; // e.g., "Revenue", "COGS", "OpEx"
  lineItem: string; // e.g., "Subscription Revenue", "AWS Hosting"
  budget: number;
  actual: number;
  varianceAmount: number;
  variancePercent: number;
}

export interface AggregatedData {
  totalBudget: number;
  totalActual: number;
  totalVariance: number;
  variancePercent: number;
}

export enum MonthFilter {
  ALL_YEAR = "All Year"
}

export interface ChartDataCategory {
  name: string;
  Budget: number;
  Actual: number;
}

export interface ChartDataVariance {
  name: string;
  variance: number;
  isPositive: boolean;
}

export interface ChartDataTrend {
  date: string;
  Budget: number;
  Actual: number;
}