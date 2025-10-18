import type { CareerOutcome, SupportService, AIInsight } from "../types";

export const mockCareerOutcomes: CareerOutcome[] = [
  {
    id: "1",
    program: "Computer Science",
    major: "Software Engineering",
    graduationYear: 2023,
    placementRate: 94,
    averageSalary: 85000,
    medianSalary: 82000,
    employmentStatus: "employed",
    industryDistribution: {
      Technology: 65,
      Finance: 15,
      Healthcare: 10,
      Education: 5,
      Other: 5,
    },
    topEmployers: ["Google", "Microsoft", "Amazon", "Apple", "Meta"],
    skillsInDemand: ["React", "Python", "AWS", "Machine Learning", "DevOps"],
  },
  {
    id: "2",
    program: "Business Administration",
    major: "Marketing",
    graduationYear: 2023,
    placementRate: 87,
    averageSalary: 58000,
    medianSalary: 55000,
    employmentStatus: "employed",
    industryDistribution: {
      "Marketing/Advertising": 40,
      Retail: 20,
      Technology: 15,
      Healthcare: 12,
      Other: 13,
    },
    topEmployers: [
      "Procter & Gamble",
      "Unilever",
      "Nike",
      "Coca-Cola",
      "Johnson & Johnson",
    ],
    skillsInDemand: [
      "Digital Marketing",
      "Analytics",
      "Social Media",
      "Content Strategy",
      "SEO",
    ],
  },
];

export const mockSupportServices: SupportService[] = [
  {
    id: "1",
    name: "Career Development Center",
    type: "career-counseling",
    description:
      "Comprehensive career guidance including resume review, interview prep, and job search strategies.",
    contactInfo: {
      email: "careers@university.edu",
      phone: "(555) 123-4567",
      website: "www.university.edu/careers",
    },
    availability: "Mon-Fri 9AM-5PM",
    cost: "free",
    successRate: 89,
  },
];

export const mockAIInsights: AIInsight[] = [
  {
    id: "1",
    type: "career-recommendation",
    title: "High-Growth Career Path Identified",
    description:
      "Data Science shows 127% job growth and 15% salary increase potential.",
    confidence: 92,
    data: { growthRate: 127, salaryIncrease: 15, demandScore: 9.2 },
    actionItems: [
      "Take Python and ML courses",
      "Apply for Data Science internships",
      "Build portfolio projects",
    ],
  },
];
