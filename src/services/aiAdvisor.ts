import axios from "axios";
import type { StudentData } from "../types";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

function buildPrompt(student: StudentData, type: string) {
  let task = "";

  if (type === "support_services_detailed") {
    task = `
Return only **valid JSON**, strictly in this format:
{
  "summary": "Short motivational message",
  "courses": [{"title": "Course Name", "platform": "Coursera", "link": "https://...", "description": "Reason"}],
  "companies": [{"name": "Company Name", "role": "Role", "link": "https://...", "description": "Why relevant"}],
  "platforms": [{"name": "Platform", "link": "https://...", "description": "Purpose"}]
}`;
  } else {
    task = `
Return **only valid JSON** with keys:
summary, jobPlacementRate, avgSalaryUSD, avgSalaryINR, roi, careerPaths, courses, companies, platforms.`;
  }

  return `
You are an AI Career Advisor.

STUDENT DETAILS:
- Name: ${student.student_name}
- Program: ${student.program}
- GPA: ${student.gpa}
- Interests: ${student.interests}
- University: ${student.university}
- Graduation Year: ${student.grad_year}

${task}`;
}

export async function getCareerAdvisorPlan(student: StudentData, type: string) {
  try {
    const prompt = buildPrompt(student, type);
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1200,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
      }
    );

    const raw = response.data?.choices?.[0]?.message?.content || "{}";
    return JSON.parse(raw.match(/\{[\s\S]*\}/)?.[0] || "{}");
  } catch (err) {
    console.error("⚠️ AI API call failed:", err);
    return {
      summary: "Keep pushing forward — your hard work is shaping your future!",
      jobPlacementRate: 90,
      avgSalaryUSD: 65000,
      avgSalaryINR: 65000 * 83,
      roi: 85,
      courses: [],
      companies: [],
      platforms: [],
    };
  }
}
