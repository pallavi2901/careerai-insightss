import React, { useEffect, useState } from "react";
import type { StudentData, CareerInsights } from "../types";
import { getCareerAdvisorPlan } from "../services/aiAdvisor";

interface ROICalculatorProps {
  student: StudentData;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ student }) => {
  const [roiData, setRoiData] = useState<CareerInsights | null>(null);

  useEffect(() => {
    async function loadAI() {
      const data = await getCareerAdvisorPlan(student, "roi_calculator");
      setRoiData(data);
    }
    loadAI();
  }, [student]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">ROI Calculator</h2>
      <p>Expected ROI: {roiData?.roi || "Loading..."}</p>
    </div>
  );
};

export default ROICalculator;
