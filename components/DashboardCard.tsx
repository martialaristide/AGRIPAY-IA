
import React from 'react';

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description?: string;
  colorClass: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, value, description, colorClass }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300">
      <div className={`p-3 rounded-full ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-[#0F172A] mt-1">{value}</p>
        {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
      </div>
    </div>
  );
};

export default DashboardCard;
