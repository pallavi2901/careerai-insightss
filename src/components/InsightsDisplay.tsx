import React from "react";

interface InsightCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
}

const InsightsDisplay: React.FC<InsightCardProps> = ({
  title,
  value,
  description,
  icon,
  color = "indigo",
}) => {
  return (
    <div
      className={`p-6 bg-${color}-50 border border-${color}-100 rounded-xl shadow-sm hover:shadow-md transition`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-${color}-700 font-semibold text-lg`}>{title}</h3>
        {icon && <div className={`text-${color}-600`}>{icon}</div>}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {description && (
        <p className="text-sm text-gray-600 mt-1 leading-snug">{description}</p>
      )}
    </div>
  );
};

export default InsightsDisplay;
