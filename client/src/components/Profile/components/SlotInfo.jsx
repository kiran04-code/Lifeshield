import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Printer, Clock, CheckCircle2, 
  XCircle, AlertCircle, RefreshCw, ChevronRight, 
  MapPin, Phone, Syringe 
} from 'lucide-react';
import { useAuth } from '../../../context/auth';
import Loader3 from '../../../utils/Loder3';

const SlotInfo = () => {
  const [dataBooked, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { axios } = useAuth();

  const getBookedData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/findBookedSlot");
      setBookData(data.bookedData || []);
    } catch (error) {
      console.error("Error fetching slots:", error);
    } finally {
      setIsLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    getBookedData();
  }, [getBookedData]); // Fixed: Removed dataBooked from dependency to prevent infinite loop

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Appointment Records</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">LifeShield Patient Portal</p>
          </div>
          <button 
            onClick={getBookedData}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all text-slate-600 shadow-sm"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} /> Refresh Status
          </button>
        </div>

        {/* CLINICAL ADVISORY NOTE */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-blue-100 rounded-[2rem] p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start"
        >
          <div className="bg-blue-600 p-4 rounded-2xl text-white">
            <AlertCircle size={24} />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Processing Protocol</h3>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
              <NoteItem color="text-emerald-600" text="Green: Appointment Confirmed & Valid" />
              <NoteItem color="text-rose-500" text="Red: Pending Review or Rejected" />
              <NoteItem color="text-slate-500" text="Approval typically takes 5–10 minutes" />
              <NoteItem color="text-blue-600" text="Print receipt for faster hospital check-in" />
            </div>
          </div>
        </motion.div>

        {/* DATA TABLE AREA */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
          {isLoading ? (
            <div className="py-20"><Loader3 /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-[0.2em] font-black">
                    <th className="py-6 px-8">Sequence</th>
                    <th className="py-6 px-4">Hospital & Vaccine</th>
                    <th className="py-6 px-4 text-center">Schedule</th>
                    <th className="py-6 px-4">Contact Detail</th>
                    <th className="py-6 px-4 text-center">Status</th>
                    <th className="py-6 px-8 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <AnimatePresence>
                    {dataBooked.length > 0 ? (
                      dataBooked.map((booking, index) => (
                        <motion.tr 
                          key={booking._id || index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="group hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="py-6 px-8 text-xs font-black text-slate-300">#{String(index + 1).padStart(2, '0')}</td>
                          <td className="py-6 px-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-black text-slate-800 leading-tight">{booking.Hname}</span>
                              <span className="flex items-center gap-1.5 text-[10px] font-bold text-blue-500 mt-1 uppercase tracking-wider">
                                <Syringe size={12} /> {booking.Vname}
                              </span>
                            </div>
                          </td>
                          <td className="py-6 px-4">
                            <div className="flex flex-col items-center">
                              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                                {booking.SlotTime} PM
                              </span>
                            </div>
                          </td>
                          <td className="py-6 px-4">
                            <div className="space-y-1">
                              <p className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                                <MapPin size={12} className="text-slate-300" /> {booking.hostId?.location || "N/A"}
                              </p>
                              <p className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                                <Phone size={12} className="text-slate-300" /> {booking.hostId?.Number || "N/A"}
                              </p>
                            </div>
                          </td>
                          <td className="py-6 px-4 text-center">
                             <StatusBadge status={booking.status} />
                          </td>
                          <td className="py-6 px-8 text-right">
                            <button
                              onClick={() => window.print()}
                              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-slate-200"
                            >
                              <Printer size={14} /> Receipt
                            </button>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-20 text-center">
                          <div className="flex flex-col items-center gap-3 opacity-20">
                            <FileText size={60} strokeWidth={1} />
                            <p className="text-xs font-black uppercase tracking-widest">No Active Records Found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Sub-components
const NoteItem = ({ color, text }) => (
  <div className="flex items-center gap-2">
    <div className={`w-1.5 h-1.5 rounded-full bg-current ${color}`} />
    <span className={`text-[11px] font-bold uppercase tracking-tight ${color}`}>{text}</span>
  </div>
);

const StatusBadge = ({ status }) => {
  const isApproved = status === "Approved" || status === "Success";
  const isRejected = status === "Rejected";

  return (
    <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
      isApproved ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
      isRejected ? "bg-rose-50 text-rose-500 border border-rose-100" :
      "bg-amber-50 text-amber-600 border border-amber-100"
    }`}>
      {isApproved ? <CheckCircle2 size={12} /> : isRejected ? <XCircle size={12} /> : <Clock size={12} />}
      {status || "Processing"}
    </div>
  );
};

export default SlotInfo;