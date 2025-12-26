import React from 'react';
// This now includes your table & pricing
import { Video, Clock, ShieldCheck } from 'lucide-react';
import ADDpackages from "./components/ShowBookingMeeing"


const Layout = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Consultation Dashboard Live
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              Consultancy Management <Video className="text-blue-600" />
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Configure slots and manage your online patient queue in real-time.
            </p>
          </div>

    
  
        </div>
      </header>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto">
        <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white p-2 shadow-2xl shadow-slate-200">
          <ADDpackages/>
        </div>
      </main>

      
    </div>
  );
};

export default Layout;