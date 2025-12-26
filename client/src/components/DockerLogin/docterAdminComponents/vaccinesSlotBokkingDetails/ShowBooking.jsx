import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../context/auth';
import { 
  Eye, 
  Check, 
  X, 
  User, 
  Phone, 
  Mail, 
  Clock, 
  Syringe,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Refactored Profile Component as a Modal
const PatientProfileModal = ({ patient, onClose }) => {
  if (!patient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-20">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
      />
      
      {/* Modal Content */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="bg-blue-600 p-8 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <User size={40} />
          </div>
          <h2 className="text-2xl font-black tracking-tight">Patient Details</h2>
          <p className="text-blue-100 text-sm font-medium mt-1 uppercase tracking-widest">Medical Record</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl"><User size={20} /></div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Full Name</p>
                <p className="font-bold text-slate-700">{patient.UsercreatedBy?.fullName}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl"><Phone size={20} /></div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Contact Number</p>
                <p className="font-bold text-slate-700">{patient.UsercreatedBy?.Number}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl"><Mail size={20} /></div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Email Address</p>
                <p className="font-bold text-slate-700 truncate">{patient.UsercreatedBy?.email}</p>
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-colors"
          >
            Close Profile
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ShowBooking = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [bookedData, setBookedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { axios } = useAuth();

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/BookingDataForDockter");
      setBookedData(data.BookingData);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.post("/handleStatusUpdate", { id, status });
      fetchBookings(); // Refresh data
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="w-full">
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="py-5 px-6 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">#</th>
                <th className="py-5 px-6 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Patient</th>
                <th className="py-5 px-6 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 text-nowrap">Schedule</th>
                <th className="py-5 px-6 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Vaccine</th>
                <th className="py-5 px-6 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="py-5 px-6 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {bookedData.map((data, index) => (
                <tr key={data._id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="py-4 px-6 font-bold text-slate-400 text-xs">{index + 1}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700">{data.UsercreatedBy?.fullName}</span>
                      <span className="text-[11px] text-slate-400 font-medium">{data.UsercreatedBy?.Number}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs bg-blue-50 w-fit px-3 py-1 rounded-lg">
                      <Clock size={12} /> {data.SlotTime} AM
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-slate-600 font-bold text-xs uppercase tracking-tight">
                      <Syringe size={12} className="text-blue-400" /> {data.Vname}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      {data.status === "Pending" ? (
                        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                          <AlertCircle size={12} /> Pending
                        </span>
                      ) : (
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                          data.status === 'Accepted' 
                          ? 'text-emerald-600 bg-emerald-50 border-emerald-100' 
                          : 'text-rose-600 bg-rose-50 border-rose-100'
                        }`}>
                          {data.status}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      {data.status === "Pending" ? (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(data._id, 'Accepted')}
                            className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200"
                            title="Accept"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(data._id, 'Rejected')}
                            className="p-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200"
                            title="Reject"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : null}
                      <button
                        onClick={() => setSelectedPatient(data)}
                        className="p-2 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2 px-4 shadow-lg shadow-slate-200"
                      >
                        <Eye size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">View</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {bookedData.length === 0 && !isLoading && (
            <div className="p-20 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                <ClipboardList size={32} />
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No Appointments Found</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal View */}
     <div className='mt-10'>
       <AnimatePresence>
        {selectedPatient && (
          <PatientProfileModal 
            patient={selectedPatient} 
            onClose={() => setSelectedPatient(null)} 
          />
        )}
      </AnimatePresence>
     </div>
    </div>
  );
};

export default ShowBooking;