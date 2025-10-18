import React, { useState } from "react";
import type { StudentData } from "../types";

interface Props {
  onSubmit: (data: StudentData) => void;
  loading?: boolean;
}

const StudentForm: React.FC<Props> = ({ onSubmit, loading = false }) => {
  const [form, setForm] = useState<StudentData>({
    student_name: "",
    program: "",
    grad_year: "",
    gpa: "",
    interests: "",
    university: "",
  });

  const [errors, setErrors] = useState<Partial<StudentData>>({});

  const validateForm = () => {
    const newErrors: Partial<StudentData> = {};
    if (!form.student_name.trim()) newErrors.student_name = 'Student name is required';
    if (!form.program.trim()) newErrors.program = 'Program/major is required';
    if (!form.grad_year.trim()) newErrors.grad_year = 'Graduation year is required';
    if (!form.gpa.trim()) newErrors.gpa = 'GPA is required';
    if (!form.university.trim()) newErrors.university = 'University is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof StudentData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(form);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Student Information</h2>
        <p className="text-gray-600">Enter your details to get personalized career insights</p>
      </div>

      <form onSubmit={submit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="student_name" className="block text-sm font-medium text-gray-700 mb-2">
              Student Name *
            </label>
            <input
              id="student_name"
              name="student_name"
              value={form.student_name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.student_name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.student_name && <p className="mt-1 text-sm text-red-600">{errors.student_name}</p>}
          </div>

          <div>
            <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-2">
              Program/Major *
            </label>
            <select
              id="program"
              name="program"
              value={form.program}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.program ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a program</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Data Science">Data Science</option>
              <option value="Medicine">Medicine</option>
              <option value="Law">Law</option>
              <option value="Psychology">Psychology</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Other">Other</option>
            </select>
            {errors.program && <p className="mt-1 text-sm text-red-600">{errors.program}</p>}
          </div>

          <div>
            <label htmlFor="grad_year" className="block text-sm font-medium text-gray-700 mb-2">
              Graduation Year *
            </label>
            <select
              id="grad_year"
              name="grad_year"
              value={form.grad_year}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.grad_year ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select graduation year</option>
              {Array.from({ length: 10 }, (_, i) => 2024 + i).map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>
            {errors.grad_year && <p className="mt-1 text-sm text-red-600">{errors.grad_year}</p>}
          </div>

          <div>
            <label htmlFor="gpa" className="block text-sm font-medium text-gray-700 mb-2">
              GPA *
            </label>
            <input
              id="gpa"
              name="gpa"
              value={form.gpa}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.gpa ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your GPA"
            />
            {errors.gpa && <p className="mt-1 text-sm text-red-600">{errors.gpa}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
              University *
            </label>
            <input
              id="university"
              name="university"
              value={form.university}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.university ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your university"
            />
            {errors.university && <p className="mt-1 text-sm text-red-600">{errors.university}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
              Interests
            </label>
            <textarea
              id="interests"
              name="interests"
              value={form.interests}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your interests (comma separated)"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed mt-8"
        >
          {loading ? "Generating..." : "Get Insights"}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
