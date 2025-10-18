import React, { useState } from "react";
import type { StudentData } from "../types";

interface StudentProfileProps {
  student: StudentData;
  onUpdate: (updatedStudent: StudentData) => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(student);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(formData);
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Student Profile</h2>

      {!editing ? (
        <>
          <p><strong>Name:</strong> {student.student_name}</p>
          <p><strong>Program:</strong> {student.program}</p>
          <p><strong>Graduation Year:</strong> {student.grad_year}</p>
          <p><strong>GPA:</strong> {student.gpa}</p>
          <p><strong>University:</strong> {student.university}</p>
          <p><strong>Interests:</strong> {student.interests}</p>

          <button
            onClick={() => setEditing(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <>
          <div className="space-y-3">
            <input type="text" name="student_name" value={formData.student_name} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Name" />
            <input type="text" name="program" value={formData.program} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Program" />
            <input type="text" name="grad_year" value={formData.grad_year} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Graduation Year" />
            <input type="text" name="gpa" value={formData.gpa} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="GPA" />
            <input type="text" name="university" value={formData.university} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="University" />
            <input type="text" name="interests" value={formData.interests} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Interests" />
          </div>

          <div className="mt-4 flex space-x-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentProfile;
