// src/components/AIInsights.tsx
import React, { useState, useEffect } from "react";
import {
  LightBulbIcon,
  FlagIcon,
  BuildingOffice2Icon,
  BookOpenIcon,
  LinkIcon,
  ArrowPathIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import { getCareerAdvisorPlan } from "../services/aiAdvisor";
import type { StudentData } from "../types";

interface AIInsightsProps {
  student: StudentData;
}

const AIInsights: React.FC<AIInsightsProps> = ({ student }) => {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInsights() {
      setLoading(true);
      setError(null);
      try {
        const data = await getCareerAdvisorPlan(student, "ai_insights");
        setInsights(data);
      } catch (err) {
        console.error("AI Insights Error:", err);
        setError("Failed to fetch AI insights. Please try again later.");
      }
      setLoading(false);
    }

    fetchInsights();
  }, [student]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <ArrowPathIcon className="animate-spin h-8 w-8 text-indigo-600 mb-3" />
        <p className="text-gray-600">
          Fetching AI career insights for {student.student_name}...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-600 bg-red-50 rounded-lg">
        ⚠️ {error}
      </div>
    );

  if (!insights)
    return (
      <div className="p-6 text-center text-gray-600">
        No insights available yet.
      </div>
    );

  return (
    <div className="bg-white p-8 rounded-xl shadow-md space-y-8 transition-all hover:shadow-lg">
      <h2 className="text-3xl font-bold text-purple-700 flex items-center">
        <LightBulbIcon className="h-8 w-8 mr-3 text-purple-600" />
        AI Career Insights Report
      </h2>

      {insights.summary && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-5 rounded-lg italic shadow">
          “{String(insights.summary)}”
        </div>
      )}

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        <div className="p-4 bg-blue-50 rounded-lg text-center">
          <ArrowUpRightIcon className="h-6 w-6 mx-auto text-blue-600 mb-2" />
          <p className="text-sm text-gray-600">Job Placement Rate</p>
          <p className="text-lg font-semibold text-gray-900">
            {String(insights.jobPlacementRate || "—")}
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg text-center">
          <ArrowUpRightIcon className="h-6 w-6 mx-auto text-green-600 mb-2" />
          <p className="text-sm text-gray-600">Avg Salary (USD)</p>
          <p className="text-lg font-semibold text-gray-900">
            {String(insights.avgSalaryUSD || "—")}
          </p>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg text-center">
          <ArrowUpRightIcon className="h-6 w-6 mx-auto text-yellow-600 mb-2" />
          <p className="text-sm text-gray-600">ROI</p>
          <p className="text-lg font-semibold text-gray-900">
            {String(insights.roi || "—")}
          </p>
        </div>
      </div>

      {/* Career Paths */}
      {Array.isArray(insights.careerPaths) && insights.careerPaths.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-blue-700 mb-3 flex items-center">
            <FlagIcon className="h-5 w-5 mr-2 text-blue-500" /> Recommended Career Paths
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {insights.careerPaths.map((path: string, i: number) => (
              <li key={i}>{String(path)}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Courses */}
      {Array.isArray(insights.courses) && insights.courses.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-indigo-700 mb-3 flex items-center">
            <BookOpenIcon className="h-5 w-5 mr-2 text-indigo-500" /> Top Recommended Courses
          </h3>
          <ul className="grid sm:grid-cols-2 gap-3">
            {insights.courses.map((course: string, i: number) => (
              <li
                key={i}
                className="p-3 bg-indigo-50 rounded-md text-gray-800 hover:bg-indigo-100"
              >
                {String(course)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Companies */}
      {Array.isArray(insights.companies) && insights.companies.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center">
            <BuildingOffice2Icon className="h-5 w-5 mr-2 text-green-500" /> Top Hiring Companies
          </h3>
          <div className="flex flex-wrap gap-3">
            {insights.companies.map((company: string, i: number) => (
              <span
                key={i}
                className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium"
              >
                {String(company)}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Platforms */}
      {Array.isArray(insights.platforms) && insights.platforms.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-purple-700 mb-3 flex items-center">
            <LinkIcon className="h-5 w-5 mr-2 text-purple-500" /> Career Platforms
          </h3>
          <div className="flex flex-wrap gap-3">
            {insights.platforms.map((plat: string, i: number) => (
              <span
                key={i}
                className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
              >
                {String(plat)}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AIInsights;
