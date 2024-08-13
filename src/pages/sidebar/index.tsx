import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white shadow-md h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">My Profile</h2>
      </div>
      <ul className="p-4 space-y-4">
        <li className="text-blue-600">My Profile</li>
        <li>Security</li>
        <li>Delete Account</li>
      </ul>
    </div>
  );
};

export default Sidebar;
