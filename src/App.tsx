import { useState } from "react";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import StudentForm from "./components/StudentForm";
import type { StudentData, CareerInsights } from "./types";
import { getCareerAdvisorPlan } from "./services/aiAdvisor";

import Dashboard from "./components/Dashboard";
import CareerOutcomes from "./components/CareerOutcomes";
import ROICalculator from "./components/ROICalculator";
import StudentProfile from "./components/StudentProfile";
import SupportServices from "./components/SupportServices";
import AIInsights from "./components/AIInsights";

function App() {
  const [insights, setInsights] = useState<CareerInsights | null>(null);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleFormSubmit = async (data: StudentData) => {
    setLoading(true);
    try {
      if (!import.meta.env.VITE_GROQ_API_KEY) {
        alert("❌ Missing GROQ API key. Please add it to your .env file.");
        return;
      }

      const generatedInsights = await getCareerAdvisorPlan(data, "career_insights");
      setInsights(generatedInsights);
      setStudentData(data);
    } catch (error) {
      console.error("❌ Error generating insights:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setInsights(null);
    setStudentData(null);
    setActiveTab("overview");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Header */}
      <header className="bg-slate-900 text-white shadow-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AcademicCapIcon className="h-8 w-8 text-green-400" />
            <h1 className="text-xl font-bold">CareerInsights AI</h1>
          </div>

          {insights && (
            <nav className="flex space-x-6">
              {[
                { id: "overview", label: "Overview" },
                { id: "career", label: "Career Outcomes" },
                { id: "support", label: "Support Services" },
                { id: "roi", label: "ROI Calculator" },
                { id: "ai", label: "AI Insights" },
                { id: "profile", label: "Student Profile" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === tab.id
                      ? "bg-white text-slate-900 font-semibold shadow-md scale-105"
                      : "text-gray-300 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          )}

          {insights && (
            <button
              onClick={resetForm}
              className="ml-6 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm"
            >
              New Student
            </button>
          )}
        </div>
      </header>

      {/* 🔹 Hero Section */}
      {!insights && (
        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Your Career Path
            </h2>
            <p className="text-lg text-blue-100">
              Fill in your details to unlock personalized insights into career
              opportunities, ROI, and AI-powered recommendations.
            </p>
          </div>
        </section>
      )}

      {/* 🔹 Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {!insights ? (
          <StudentForm onSubmit={handleFormSubmit} loading={loading} />
        ) : (
          <>
            {activeTab === "overview" && (
              <Dashboard insights={insights} student={studentData!} />
            )}
            {activeTab === "career" && (
              <CareerOutcomes student={studentData!} />
            )}
            {activeTab === "support" && (
              <SupportServices student={studentData!} />
            )}
            {activeTab === "roi" && (
              <ROICalculator student={studentData!} />
            )}
            {activeTab === "ai" && (
              <AIInsights student={studentData!} />
            )}
            {activeTab === "profile" && (
              <StudentProfile
                student={studentData!}
                onUpdate={(updated) => setStudentData(updated)}
              />
            )}
          </>
        )}
      </main>

      {/* 🔹 Footer */}
      <footer className="bg-gray-900 text-white py-10 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 CareerInsights AI. Powered by Groq + React.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
