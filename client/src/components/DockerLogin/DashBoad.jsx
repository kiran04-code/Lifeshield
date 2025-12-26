import React from 'react';
import { Outlet } from 'react-router-dom';
import Sider from './docterAdminComponents/Sider';

const DashBoad = () => {
  return (
    <div className="flex bg-[#fcfdff] min-h-screen">
      {/* Sidebar - Fixed width */}
      <Sider />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
    

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashBoad;