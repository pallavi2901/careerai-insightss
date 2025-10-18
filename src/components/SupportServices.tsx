import React, { useEffect, useState } from "react";
import type { StudentData } from "../types";
import { getCareerAdvisorPlan } from "../services/aiAdvisor";
import {
  BookOpenIcon,
  BuildingOffice2Icon,
  LinkIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

interface SupportServicesProps {
  student: StudentData;
}

interface SupportData {
  summary?: string;
  courses: {
    title: string;
    platform: string;
    link: string;
    description: string;
  }[];
  companies: {
    name: string;
    role: string;
    link: string;
    description: string;
  }[];
  platforms: {
    name: string;
    link: string;
    description: string;
  }[];
}

const SupportServices: React.FC<SupportServicesProps> = ({ student }) => {
  const [services, setServices] = useState<SupportData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadAI() {
      setLoading(true);
      try {
        const data = await getCareerAdvisorPlan(student, "support_services_detailed");
        setServices(data);
      } catch (err) {
        console.error("⚠️ Support Services AI Error:", err);
        alert("Groq API limit reached. Please wait a few seconds and try again.");
      } finally {
        setLoading(false);
      }
    }

    loadAI();
  }, [student]);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-600">
        🤖 Fetching your AI-based career support recommendations...
      </div>
    );

  if (!services)
    return (
      <div className="p-6 text-center text-gray-500">
        No AI recommendations available right now.
      </div>
    );

  return (
    <div className="bg-white p-8 rounded-xl shadow-md space-y-8 transition-all hover:shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center">
  <BookOpenIcon className="h-6 w-6 mr-2 text-indigo-500" />
        AI-Powered Career Support Services
      </h2>

      {services.summary && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-lg text-center italic shadow">
          “{services.summary}”
        </div>
      )}

      {services.courses?.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-blue-600 mb-3 flex items-center">
            <BookOpenIcon className="h-5 w-5 mr-2 text-blue-500" />
            Recommended Courses
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {services.courses.map((course, i) => (
              <div
                key={i}
                className="p-5 border border-blue-100 bg-blue-50 rounded-xl hover:bg-blue-100 transition shadow-sm"
              >
                <h4 className="font-semibold text-gray-900">{course.title}</h4>
                <p className="text-sm text-gray-600">{course.platform}</p>
                <p className="text-sm text-gray-700 mt-2">{course.description}</p>
                <a
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                >
                  Go to Course <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {services.companies?.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-green-600 mb-3 flex items-center">
            <BuildingOffice2Icon className="h-5 w-5 mr-2 text-green-500" />
            Top Companies to Apply
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {services.companies.map((comp, i) => (
              <div
                key={i}
                className="p-5 border border-green-100 bg-green-50 rounded-xl hover:bg-green-100 transition shadow-sm"
              >
                <h4 className="font-semibold text-gray-900">{comp.name}</h4>
                <p className="text-sm text-gray-600">{comp.role}</p>
                {comp.description && (
                  <p className="text-sm text-gray-700 mt-2">{comp.description}</p>
                )}
                <a
                  href={comp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-green-700 hover:text-green-900 text-sm"
                >
                  Visit Careers <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {services.platforms?.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-purple-600 mb-3 flex items-center">
            <LinkIcon className="h-5 w-5 mr-2 text-purple-500" />
            Career Platforms & Mentorships
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {services.platforms.map((plat, i) => (
              <div
                key={i}
                className="p-5 border border-purple-100 bg-purple-50 rounded-xl hover:bg-purple-100 transition shadow-sm"
              >
                <h4 className="font-semibold text-gray-900">{plat.name}</h4>
                <p className="text-sm text-gray-700 mt-2">{plat.description}</p>
                <a
                  href={plat.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-purple-700 hover:text-purple-900 text-sm"
                >
                  Visit Platform <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SupportServices;
