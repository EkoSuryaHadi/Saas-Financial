import { FinancialRecord } from '../types';

const CATEGORIES = {
  REVENUE: 'Revenue',
  COGS: 'COGS',
  OPEX: 'OpEx',
};

const LINE_ITEMS = {
  [CATEGORIES.REVENUE]: ['Subscription Revenue (ARR)', 'Professional Services', 'Expansion Revenue'],
  [CATEGORIES.COGS]: ['Cloud Hosting (AWS/Azure)', 'Customer Support Team', 'Payment Processing Fees'],
  [CATEGORIES.OPEX]: ['Marketing Ads', 'Sales Commissions', 'Software Subscriptions', 'Office Rent', 'Legal & Compliance'],
};

// Random helper
const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const generateDummyData = (): FinancialRecord[] => {
  const records: FinancialRecord[] = [];
  const year = 2025;

  // Generate data for 12 months
  for (let month = 1; month <= 12; month++) {
    const monthStr = month.toString().padStart(2, '0');
    const date = `${year}-${monthStr}-01`;

    Object.entries(LINE_ITEMS).forEach(([category, items]) => {
      items.forEach((item) => {
        let baseBudget = 0;
        let varianceFactor = 0;

        // Set realistic base numbers for SaaS
        if (item === 'Subscription Revenue (ARR)') {
            baseBudget = 50000 + (month * 2000); // Growing revenue
            varianceFactor = 0.05; // Low variance typically
        } else if (item === 'Cloud Hosting (AWS/Azure)') {
            baseBudget = 8000 + (month * 500);
            varianceFactor = 0.15; 
        } else if (item === 'Marketing Ads') {
            baseBudget = 15000;
            varianceFactor = 0.2;
        } else {
            baseBudget = randomBetween(2000, 10000);
            varianceFactor = 0.1;
        }

        // Introduce specific "Traps" for the AI to find, similar to the python script
        let actual = baseBudget + randomBetween(-baseBudget * varianceFactor, baseBudget * varianceFactor);
        
        // Trap 1: Hosting Spike in Q3
        if (item === 'Cloud Hosting (AWS/Azure)' && (month === 8 || month === 9)) {
            actual = baseBudget * 1.45; // 45% overage
        }

        // Trap 2: Revenue dip in December (Churn)
        if (item === 'Subscription Revenue (ARR)' && month === 12) {
            actual = baseBudget * 0.85; // Missed target
        }

        const varianceAmount = actual - baseBudget;
        const variancePercent = (varianceAmount / baseBudget) * 100;

        records.push({
          id: `${date}-${item.replace(/\s/g, '')}`,
          date,
          categoryGroup: category,
          lineItem: item,
          budget: Math.round(baseBudget),
          actual: Math.round(actual),
          varianceAmount: Math.round(varianceAmount),
          variancePercent: parseFloat(variancePercent.toFixed(2)),
        });
      });
    });
  }

  return records;
};