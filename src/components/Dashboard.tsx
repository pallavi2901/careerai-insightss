import React from "react";
import type { StudentData, CareerInsights } from "../types";
import {
  BuildingOffice2Icon,
  CalendarDaysIcon,
  ArrowUpRightIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

interface DashboardProps {
  insights: CareerInsights;
  student: StudentData;
}

const Dashboard: React.FC<DashboardProps> = ({ insights, student }) => {
  if (!insights)
    return (
      <div className="p-6 text-center text-gray-600">
        No AI insights available yet.
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 transition hover:shadow-xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-indigo-700">
          Welcome, {student.student_name} 👋
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto leading-relaxed">
          {insights.summary || "AI-generated insights will appear here soon!"}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        <div className="p-5 rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100 shadow-sm">
          <div className="flex items-center space-x-3">
            <UserIcon className="h-6 w-6 text-indigo-600" />
            <p className="text-gray-800 font-semibold">{student.program}</p>
          </div>
          <p className="text-gray-500 text-sm mt-1">Program</p>
        </div>

        <div className="p-5 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 shadow-sm">
          <div className="flex items-center space-x-3">
            <BuildingOffice2Icon className="h-6 w-6 text-purple-600" />
            <p className="text-gray-800 font-semibold">{student.university}</p>
          </div>
          <p className="text-gray-500 text-sm mt-1">University</p>
        </div>

        <div className="p-5 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm">
          <div className="flex items-center space-x-3">
            <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
            <p className="text-gray-800 font-semibold">{student.grad_year}</p>
          </div>
          <p className="text-gray-500 text-sm mt-1">Graduation Year</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-green-50 p-6 rounded-lg border border-green-100 shadow-sm hover:shadow-md transition">
          <ArrowUpRightIcon className="h-7 w-7 text-green-600 mb-2" />
          <p className="text-gray-600 text-sm">Job Placement Rate</p>
          <h3 className="text-2xl font-bold text-green-700 mt-1">
            {insights.jobPlacementRate || 0}%
          </h3>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100 shadow-sm hover:shadow-md transition">
          <CurrencyDollarIcon className="h-7 w-7 text-yellow-600 mb-2" />
          <p className="text-gray-600 text-sm">Average Salary</p>
          <h3 className="text-xl font-semibold text-yellow-700 mt-1">
            ${insights.avgSalaryUSD?.toLocaleString()} <br />
            <span className="text-sm text-gray-500">
              ₹{insights.avgSalaryINR?.toLocaleString()}
            </span>
          </h3>
        </div>

        <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 shadow-sm hover:shadow-md transition">
          <ChartBarIcon className="h-7 w-7 text-indigo-600 mb-2" />
          <p className="text-gray-600 text-sm">ROI Score</p>
          <h3 className="text-2xl font-bold text-indigo-700 mt-1">
            {insights.roi || 0}/100
          </h3>
        </div>
      </div>

      {insights.careerPaths && insights.careerPaths.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            🎯 Top Career Paths
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            {insights.careerPaths.map((path, index) => (
              <li key={index}>
                {typeof path === "string" ? (
                  <span className="font-medium">{path}</span>
                ) : (
                  <>
                    <span className="font-medium">{path.title || "—"}</span>
                    {path.description && (
                      <span className="text-gray-600 ml-2">– {path.description}</span>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
