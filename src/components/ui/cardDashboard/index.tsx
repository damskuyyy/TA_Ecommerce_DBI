import { DashboardData } from '@/types/dashboardDataTypes';
import React from 'react';

const CardDashboard: React.FC<DashboardData> = ({ title, value, description, descriptionColor, icon }) => {
  return (
    <div className="bg-white border-2 shadow-md space-y-2 rounded-lg p-4 flex flex-col dark:bg-gray-900">
      <div className="flex items-center">
        {icon && <div className="mr-3">{icon}</div>}
        <h2 className="text-sm font-semibold text-gray-500">{title}</h2>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className={`${descriptionColor} text-sm`}>{description}</p>
    </div>
  );
};

export default CardDashboard;
