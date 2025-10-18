import axios from "axios";
import type { StudentData, CareerInsights } from "../types";

// Use same protocol as current page to avoid mixed content issues
const API_BASE_URL = `${window.location.protocol}//localhost:8000`;

export const generateInsights = async (
  studentData: StudentData
): Promise<CareerInsights> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/generate-insights`,
      studentData,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      }
    );
    return response.data;
  } catch (error) {
    console.warn("Backend API not available, using mock data:", error);
    return getMockInsights(studentData);
  }
};

// 🧠 Mock fallback data
const getMockInsights = (studentData: StudentData): CareerInsights => {
  const programSalaries: Record<string, number> = {
    "Computer Science": 95000,
    Engineering: 85000,
    "Business Administration": 70000,
    "Data Science": 105000,
    Medicine: 120000,
    Law: 110000,
    Psychology: 55000,
    Marketing: 60000,
    Finance: 80000,
    Other: 65000,
  };

  const baseSalary = programSalaries[studentData.program] || 65000;
  const gpaNumeric = parseFloat(studentData.gpa);
  const multiplier =
    gpaNumeric >= 3.8 ? 1.15 : gpaNumeric >= 3.5 ? 1.1 : gpaNumeric >= 3.0 ? 1.05 : 1;

  const adjustedSalary = Math.round(baseSalary * multiplier);

  return {
    summary: `The ${studentData.program} field shows strong growth potential with high demand.`,
    jobPlacementRate: Math.min(95, Math.max(75, 85 + (gpaNumeric - 3.0) * 10)),
    avgSalaryUSD: adjustedSalary,
    avgSalaryINR: adjustedSalary * 83,
    roi: Math.round((adjustedSalary / 40000) * 100),
    courses: [],
    companies: [],
    platforms: [],
  };
};
