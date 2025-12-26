import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  User, 
  Clock, 
  Mail, 
  Phone, 
  CheckCircle, 
  PlusCircle, 
  ExternalLink,
  X 
} from 'lucide-react';
import { toast } from "react-toastify";
import { useDocAuth } from '../../../../context/dockAuth';

/**
 * Modal to generate/assign a Room ID for a specific consultation
 */
const CreateMeetingModal = ({ onClose, orderId, refreshData }) => {
  const { hostpitaldataworkspace, axios } = useDocAuth();
  const [meetId, setMeetId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!meetId) return toast.warn("Please enter a Room ID");

    setLoading(true);
    try {
      const { data } = await axios.post("/meetdAddToBookMeet", { 
        MeetId: meetId, 
        hotId: hostpitaldataworkspace._id, 
        orderid: orderId 
      });
      
      if (data.success) {
        toast.success("Meeting Room Created Successfully");
        refreshData();
        onClose();
      }
    } catch (error) {
      toast.error("Failed to link meeting room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white shadow-2xl rounded-[2.5rem] p-8 w-full max-w-sm border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>

        <div className="flex flex-col items-center space-y-6">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <Video size={32} />
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Setup Meeting Room</h2>
            <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-widest">Consultation Instance</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <input
              type="text"
              autoFocus
              onChange={(e) => setMeetId(e.target.value)}
              placeholder="e.g. ROOM-772-XYZ"
              value={meetId}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:bg-white outline-none font-bold text-slate-700 transition-all text-center"
            />
            <button 
              type='submit' 
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-indigo-900/20 hover:bg-slate-900 transition-all"
            >
              {loading ? "Syncing..." : "Assign Room ID"}
            </button>
          </form>

          <div className="flex items-start gap-3 bg-blue-50/50 p-4 rounded-2xl text-blue-700">
            <PlusCircle size={16} className="mt-0.5 shrink-0" />
            <p className="text-[11px] font-bold leading-relaxed">
              Generating a Room ID allows parents to join the session via their Lifeshield App.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * Main Table Component
 */
const ShowBookingDataMeeting = () => {
  const [activeOrderId, setActiveOrderId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [bookedData, setBookedData] = useState([]);
  
  const navigate = useNavigate();
  const { hostpitaldataworkspace, axios } = useDocAuth();

  // Optimized Fetcher - Dependency loop fixed
  const fetchBookedData = useCallback(async () => {
    try {
      const { data } = await axios.get("/getAllrespectiveMeetingdata");
      if (data.success) {
        setBookedData(data.meetData);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }, [axios]);

  useEffect(() => {
    fetchBookedData();
  }, [fetchBookedData]);

  const handleCompleteMeeting = async (id, meetId) => {
    try {
      const { data } = await axios.post("/MeetComplted", { orderId: id, MeetId: "complete" });
      if (data.success) {
        toast.success("Consultation Marked as Completed");
        fetchBookedData();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-900/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100">
              <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient Details</th>
              <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Duration</th>
              <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Info</th>
              <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {bookedData.map((data, index) => (
              <tr key={data._id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="py-5 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black">
                      {data.userBooked?.fullName?.charAt(0) || <User size={18} />}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 tracking-tight">{data.userBooked?.fullName}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patient #{index + 1}</p>
                    </div>
                  </div>
                </td>

                <td className="py-5 px-6">
                  <div className="flex flex-col items-center">
                    <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[11px] font-black">
                      <Clock size={12} /> {data.duration}
                    </span>
                  </div>
                </td>

                <td className="py-5 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <Mail size={12} className="text-slate-300" /> {data.userBooked?.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <Phone size={12} className="text-slate-300" /> {data.userBooked?.Number}
                    </div>
                  </div>
                </td>

                <td className="py-5 px-6 text-right">
                  {data.MeetId === 'false' ? (
                    <button
                      onClick={() => { setActiveOrderId(data._id); setShowModal(true); }}
                      className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-indigo-200 hover:shadow-none"
                    >
                      <PlusCircle size={14} /> Setup Room
                    </button>
                  ) : data.MeetId === "complete" ? (
                    <span className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                      <CheckCircle size={14} /> Completed
                    </span>
                  ) : (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/Room/${data.MeetId}`)}
                        className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all group/btn"
                        title="Join Meeting"
                      >
                        <ExternalLink size={18} />
                      </button>
                      <button
                        onClick={() => handleCompleteMeeting(data._id, data.MeetId)}
                        className="inline-flex items-center gap-2 border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                      >
                        Finish Session
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showModal && (
          <CreateMeetingModal 
            orderId={activeOrderId} 
            onClose={() => setShowModal(false)} 
            refreshData={fetchBookedData} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShowBookingDataMeeting;