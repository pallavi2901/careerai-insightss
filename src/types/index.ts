// --------------------
// 📊 Career Outcome
// --------------------
export interface CareerOutcome {
  id: string;
  program: string;
  major: string;
  graduationYear: number;
  placementRate: number;
  averageSalary: number;
  medianSalary: number;
  employmentStatus: 'employed' | 'continuing-education' | 'seeking' | 'other';
  industryDistribution: { [industry: string]: number };
  topEmployers: string[];
  skillsInDemand: string[];
}

// --------------------
// 🧭 Support Services
// --------------------
export interface SupportService {
  id: string;
  name: string;
  type:
    | 'career-counseling'
    | 'job-placement'
    | 'networking'
    | 'skill-development'
    | 'mentorship';
  description: string;
  contactInfo: {
    email: string;
    phone: string;
    website: string;
  };
  availability: string;
  cost: 'free' | 'paid' | 'varies';
  successRate: number;
}

// --------------------
// 👩‍🎓 Student Profile
// --------------------
export interface StudentProfile {
  id: string;
  name: string;
  major: string;
  graduationYear: number;
  interests: string[];
  skills: string[];
  preferredIndustries: string[];
  targetSalaryRange: {
    min: number;
    max: number;
  };
}

// --------------------
// 🤖 AI Insights
// --------------------
export interface AIInsight {
  id: string;
  type:
    | 'career-recommendation'
    | 'salary-projection'
    | 'roi-analysis'
    | 'market-trend';
  title: string;
  description: string;
  confidence: number;
  data: any;
  actionItems: string[];
}

// --------------------
// 💰 ROI Calculation
// --------------------
export interface ROICalculation {
  totalEducationCost: number;
  expectedLifetimeEarnings: number;
  roiPercentage: number;
  paybackPeriod: number;
  comparisonData: {
    industryAverage: number;
    topPerformers: number;
  };
}

// --------------------
// 🎓 Student Data (Used in Forms / AI Advisor)
// --------------------
export interface StudentData {
  student_name: string;
  program: string;
  grad_year: string;
  gpa: string;
  interests: string;
  university: string;
}

// --------------------
// 📈 Career Insights (AI Advisor Response)
// --------------------
export interface CareerInsights {
  summary: string;
  jobPlacementRate: number;
  avgSalaryUSD: number;
  avgSalaryINR: number;
  roi: number;
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
  careerPaths?: { title?: string; description?: string }[] | string[];
}
