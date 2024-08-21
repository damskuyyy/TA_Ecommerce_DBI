import { TransactionsData } from '@/types/transactionsDataTypes'; 
import React from 'react';

const CardTransactions: React.FC<TransactionsData> = ({ title, value, description, descriptionColor, icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col sm:grid-cols-2">
      <div className="flex items-center">
        {icon && <div className="mr-3">{icon}</div>}
        <h2 className="text-sm font-semibold text-gray-500">{title}</h2>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className={`${descriptionColor} text-sm`}>{description}</p>
    </div>
  );
};

export default CardTransactions;