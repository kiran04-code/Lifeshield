import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { Plus, IndianRupee, Clock, Trash2, Zap, Package, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDocAuth } from '../../../../../context/dockAuth';


const ADDpackages = () => {
  const [view, setView] = useState("New"); 
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const { axios, hostpitaldataworkspace, hotdataauth } = useDocAuth();

  const handleSendPackageData = async (e) => {
    e.preventDefault();
    if (!time || !price) return toast.error("Please fill all fields");

    try {
      const { data } = await axios.post("/createPackage", { 
        price: price, 
        time: `${time} min` 
      });
      if (data.success) {
        toast.success("Consultation tier added");
        await hotdataauth(); // Refresh global context
        setTime(''); 
        setPrice('');
        setView("List");
      }
    } catch (error) {
      toast.error("Failed to add package");
    }
  };

  const handleDeletePackage = async (id) => {
    try {
      const { data } = await axios.post("/deletePackage", { ids: id });
      if (data.success) {
        toast.success("Package removed");
        await hotdataauth();
      }
    } catch (error) {
      toast.error("Error deleting package");
    }
  };

  return (
    <div className="w-full sm:w-[320px] bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col">
      {/* Tab Navigation */}
      <div className="flex p-1.5 bg-slate-50/80 m-4 rounded-2xl border border-slate-100">
        <button 
          onClick={() => setView("New")}
          className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === "New" ? "bg-white shadow-sm text-blue-600" : "text-slate-400 hover:text-slate-600"}`}
        >
          Add Tier
        </button>
        <button 
          onClick={() => setView("List")}
          className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === "List" ? "bg-white shadow-sm text-blue-600" : "text-slate-400 hover:text-slate-600"}`}
        >
          My Rates
        </button>
      </div>

      <div className="px-6 pb-6">
        <AnimatePresence mode="wait">
          {view === "New" ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              onSubmit={handleSendPackageData} 
              className="space-y-4"
            >
              <div className="text-center space-y-1 mb-4">
                <p className="text-[11px] text-slate-400 font-bold italic">"Your expertise is invaluable."</p>
              </div>

              <div className="space-y-3">
                <div className="relative group">
                  <Clock className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input
                    type="number"
                    placeholder="Duration (Minutes)"
                    onChange={(e) => setTime(e.target.value)}
                    value={time}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
                  />
                </div>

                <div className="relative group">
                  <IndianRupee className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input
                    type="number"
                    placeholder="Fee (Rupees)"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
                  />
                </div>
              </div>

              <button type='submit' className="group w-full bg-blue-600 hover:bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2">
                Create Package <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/>
              </button>
            </motion.form>
          ) : (
            <motion.div 
              key="list"
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
              className="space-y-2 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar"
            >
              {hostpitaldataworkspace?.MeetingAvialbleTimeandpakcage?.length > 0 ? (
                hostpitaldataworkspace.MeetingAvialbleTimeandpakcage.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm text-blue-500">
                        <Zap size={14} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-800 tracking-tight">{data.time}</p>
                        <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase">₹{data.price}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeletePackage(data._id)} 
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                  <Package className="mx-auto text-slate-200 mb-2" size={32} />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No Active Rates</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ADDpackages;