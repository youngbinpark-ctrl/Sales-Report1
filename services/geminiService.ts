
import { GoogleGenAI, Type } from "@google/genai";
import { SalesItem } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async analyzeReport(items: SalesItem[]): Promise<string> {
    const reportText = items.map(i => `[${i.status}] ${i.name}: ${i.details || ''}`).join('\n');
    
    const prompt = `
      As a senior sales strategist, analyze the following weekly sales report and provide:
      1. A summary of current momentum.
      2. 3 High-priority action items (focus on multi-store deals).
      3. Risk assessment (especially for 'Rejected' and 'Special' cases).
      4. Suggestions for follow-up strategies.

      Format the output in professional, concise Markdown. Use bullet points.
      
      REPORT:
      ${reportText}
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      });

      return response.text || "Unable to generate insights at this time.";
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return "An error occurred while analyzing the report. Please try again.";
    }
  }
}

export const geminiService = new GeminiService();
