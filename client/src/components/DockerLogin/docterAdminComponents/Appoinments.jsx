import React from 'react';
import { motion } from 'framer-motion';
import { 
  Syringe, 
  CalendarCheck, 
  Settings2, 
  ClipboardList,
  Info
} from 'lucide-react';
import Layout from './vaccinesSlotBokkingDetails/layout';
import ShowBooking from './vaccinesSlotBokkingDetails/ShowBooking';

const Appointments = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-10"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Syringe size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Inventory Management</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Vaccine <span className="text-blue-600">Appointments.</span>
          </h1>
        </div>

        {/* Quick Info Badge */}
        <div className="flex items-center gap-3 bg-blue-50/50 border border-blue-100 px-4 py-3 rounded-2xl">
          <Info size={18} className="text-blue-500" />
          <p className="text-xs font-bold text-slate-600 leading-tight">
            Managing physical walk-ins <br /> and scheduled doses.
          </p>
        </div>
      </div>

      {/* Main Operational Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Slot & Schedule Configuration */}
        <div className="xl:col-span-4 space-y-4">
          <div className="flex items-center gap-2 px-2 text-slate-400">
            <Settings2 size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Slot Settings</span>
          </div>
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden">
            <Layout />
          </div>
        </div>

        {/* Right Column: Appointment Registry / Live Feed */}
        <div className="xl:col-span-8 space-y-4">
          <div className="flex items-center gap-2 px-2 text-slate-400">
            <ClipboardList size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Appointment Registry</span>
          </div>
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5 p-2 overflow-hidden">
            <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
              <ShowBooking />
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Appointments;