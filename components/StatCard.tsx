
import React from 'react';

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  color: string;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color, bgColor }) => {
  return (
    <div className={`p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4 bg-white hover:shadow-md transition-shadow`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${bgColor}`} style={{ color }}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
