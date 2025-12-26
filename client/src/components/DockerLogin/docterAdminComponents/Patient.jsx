import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Activity, Zap, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';

import Layout from './meetingSlotBookDetails/LayoutMeeting';
import ShowBookingDataMeeting from './meetingSlotBookDetails/ShowBookingDataMeetingdata';
import Loader from '../../../utils/Loader';
import { useDocAuth } from '../../../context/dockAuth';

const Patient = () => {
  const [load, setload] = useState(false);
  const { axios, hostpitaldataworkspace, hotdataauth } = useDocAuth();

  const handleMeetingPermission = async () => {
    // Elegant UI feedback instead of basic confirm if possible, 
    // but keeping logic consistent with your backend.
    try {
      setload(true);
      const { data } = await axios.post("/startCunstacyService", { value: true });
      if (data.success) {
        toast.success("Consultation Service Activated!");
        // Refresh the context to update hostpitaldataworkspace.vcallONOff
        await hotdataauth(); 
      }
    } catch (error) {
      toast.error("Failed to enable service");
      console.error(error);
    } finally {
      setload(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <AnimatePresence mode="wait">
        {hostpitaldataworkspace?.vcallONOff ? (
          /* --- STATE: SERVICE ENABLED (Dashboard) --- */
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6"
          >
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <Video size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-800 tracking-tight">Telemedicine Hub</h1>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-green-500 uppercase tracking-widest">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Service Active
                  </div>
                </div>
              </div>
              
              <div className="hidden md:flex gap-3">
                <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-500">
                  <ShieldCheck size={14} className="text-blue-500" /> Secure Encryption
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              <div className="xl:col-span-4">
                <Layout />
              </div>
              <div className="xl:col-span-8">
                <ShowBookingDataMeeting />
              </div>
            </div>
          </motion.div>
        ) : (
          /* --- STATE: SERVICE DISABLED (Onboarding) --- */
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center min-h-[90vh] px-4"
          >
            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-blue-100 border border-white">
              
              {/* Left Side: Illustration & Branding */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                  <Zap size={14} /> New Feature
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-800 leading-[1.1] tracking-tight">
                  Consult from your <span className="text-blue-600">Digital Clinic.</span>
                </h1>
                <p className="text-slate-500 text-lg leading-relaxed">
                  Join our expert network. Offer 20-30 minute paid video consultations and guide parents through critical vaccination choices.
                </p>
                
                <ul className="space-y-3">
                  {[
                    "Set your own consultation pricing",
                    "Integrated high-definition video calls",
                    "Automatic scheduling & reminders",
                    "Direct earnings to your workspace"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                      <CheckCircle size={18} className="text-green-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Side: Action Card */}
              <div className="bg-slate-50 rounded-[2.5rem] p-8 flex flex-col items-center text-center border border-slate-100">
                <div className="w-full aspect-square max-w-[240px] mb-8 bg-white rounded-[2rem] shadow-inner flex items-center justify-center overflow-hidden">
                   {/* Placeholder for your "/Untitled design(11).png" */}
                   <img 
                    src="/Untitled design(11).png" 
                    alt="Consultation Illustration" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <button 
                  disabled={load}
                  onClick={handleMeetingPermission}
                  className="group w-full bg-blue-600 hover:bg-slate-900 text-white p-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-200 hover:shadow-none transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {load ? <Loader /> : (
                    <>
                      Enable Consultancy <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  No hidden fees • Cancel service anytime
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Patient;