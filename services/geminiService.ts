import { GoogleGenAI } from "@google/genai";
import { FinancialRecord } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFinancialInsights = async (
  records: FinancialRecord[],
  periodLabel: string
): Promise<string> => {
  try {
    // 1. Summarize data to reduce token count and give the model pre-calculated specific info
    // We sort by variance magnitude to highlight issues.
    const sortedByVariance = [...records].sort((a, b) => Math.abs(b.varianceAmount) - Math.abs(a.varianceAmount));
    const top5Variances = sortedByVariance.slice(0, 5);

    // Aggregate by category
    const catMap = new Map<string, { budget: number; actual: number }>();
    records.forEach(r => {
      const curr = catMap.get(r.categoryGroup) || { budget: 0, actual: 0 };
      catMap.set(r.categoryGroup, {
        budget: curr.budget + r.budget,
        actual: curr.actual + r.actual
      });
    });

    const categorySummary = Array.from(catMap.entries()).map(([cat, val]) => {
      const diff = val.actual - val.budget;
      const pct = ((diff / val.budget) * 100).toFixed(1);
      return `- ${cat}: Budget $${val.budget}, Actual $${val.actual}, Var ${pct}%`;
    }).join('\n');

    const topItems = top5Variances.map(r => 
      `- ${r.lineItem} (${r.date}): Budget $${r.budget}, Actual $${r.actual}, Var $${r.varianceAmount} (${r.variancePercent}%)`
    ).join('\n');

    const prompt = `
      Act as an expert SaaS CFO (Chief Financial Officer). Analyze the following financial variance data for the period: ${periodLabel}.
      
      **High Level Category Performance:**
      ${categorySummary}

      **Top 5 Significant Variances (Anomalies):**
      ${topItems}

      **Instructions:**
      1.  **Identify Critical Risks:** Look for overspending in COGS (e.g., Hosting) or dips in Revenue.
      2.  **Provide Actionable Advice:** Don't just state the number. Explain *why* this might happen in a SaaS context (e.g., "Hosting overage might be due to unoptimized instances or lack of auto-scaling policies", "Revenue dip suggests high churn").
      3.  **Format:** Use Markdown with bold headers and bullet points. Keep it concise but professional. 
      4.  **Tone:** Professional, analytical, and slightly urgent if there are large negative variances.

      Generate the analysis now.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.4, // Low temperature for analytical consistency
      }
    });

    return response.text || "Unable to generate insights at this time.";

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "⚠️ Error generating AI insights. Please check your API configuration.";
  }
};