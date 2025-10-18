import React, { useEffect, useState } from "react";
import type { StudentData, CareerInsights } from "../types";
import { getCareerAdvisorPlan } from "../services/aiAdvisor";

interface CareerOutcomesProps {
  student: StudentData;
}

const CareerOutcomes: React.FC<CareerOutcomesProps> = ({ student }) => {
  const [careerData, setCareerData] = useState<CareerInsights | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadAI() {
      setLoading(true);
      try {
        const data = await getCareerAdvisorPlan(student, "career_outcomes");
        setCareerData(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    loadAI();
  }, [student]);

  if (loading) return <p>🔄 Loading AI Career Outcomes...</p>;
  if (!careerData) return <p>No career insights found.</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-2xl font-bold">Career Outcomes</h2>
      <p className="italic text-gray-600">{careerData.summary}</p>

      <ul className="text-gray-800">
        <li>📈 Placement Rate: {careerData.jobPlacementRate}%</li>
        <li>💰 Salary: ${careerData.avgSalaryUSD} | ₹{careerData.avgSalaryINR}</li>
        <li>🎯 ROI: {careerData.roi}/100</li>
      </ul>
    </div>
  );
};

export default CareerOutcomes;
