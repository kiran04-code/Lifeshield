import React, { useState } from 'react';
import { useDocAuth } from '../../../../../context/dockAuth';
import { toast } from 'react-toastify';
import { 
  Plus, 
  Clock, 
  CalendarRange, 
  Save, 
  Timer,
  CheckCircle2 
} from 'lucide-react';
import Loader from '../../../../../utils/Loader';

const AddBokking = () => {
    const [view, setView] = useState("New"); // "New" or "Current"
    const [form, setForm] = useState({ fromTime: '', toTime: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { axios, hostpitaldataworkspace } = useDocAuth();
    
    const handleTimeChange = (e) => {aa

        // Convert 24h to 12h Format for User Display
        const [hour, minute] = value.split(":");
        let h = parseInt(hour, 10);
        const ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;
        const formattedTime = `${h}:${minute} ${ampm}`;

        setForm(prev => ({ ...prev, [id]: formattedTime }));
    };

    const handleSendToTime = async (e) => {
        e.preventDefault();
        if (!form.fromTime || !form.toTime) {
            return toast.warn("Please set both start and end times");
        }

        setIsSubmitting(true);
        try {
            const { data } = await axios.post("/addtime", form);
            if (data.success) {
                toast.success("Schedule Updated Successfully");
                setView("Current");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Internal Server Error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-[340px] bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden transition-all">
            {/* Header Tabs */}
            <div className="flex p-1.5 bg-slate-50 border-b border-slate-100">
                <button 
                    onClick={() => setView("New")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                        view === "New" 
                        ? "bg-white text-blue-600 shadow-sm" 
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                >
                    <Plus size={14} /> New Slot
                </button>
                <button 
                    onClick={() => setView("Current")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                        view === "Current" 
                        ? "bg-white text-blue-600 shadow-sm" 
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                >
                    <Clock size={14} /> View Active
                </button>
            </div>

            <div className="p-6">
                {view === "New" ? (
                    <form onSubmit={handleSendToTime} className="space-y-5">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <CalendarRange size={18} />
                            </div>
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">Set Time Range</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Start</label>
                                <input
                                    type="time"
                                    id="fromTime"
                                    onChange={handleTimeChange}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">End</label>
                                <input
                                    type="time"
                                    id="toTime"
                                    onChange={handleTimeChange}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-slate-900 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-blue-900/10 transition-all flex items-center justify-center gap-2 group"
                        >
                            {isSubmitting ? <Loader /> : (
                                <>
                                    <Save size={16} className="group-hover:scale-110 transition-transform" /> 
                                    Update Schedule
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="space-y-6 py-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                <CheckCircle2 size={18} />
                            </div>
                            <div>
                                <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">Active Schedule</h2>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Currently visible to patients</p>
                            </div>
                        </div>

                        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6 text-center">
                            <div className="flex items-center justify-center gap-4 text-blue-600 mb-2">
                                <Timer size={24} />
                            </div>
                            <div className="flex items-center justify-center gap-3">
                                <span className="text-2xl font-black text-slate-900 tracking-tighter">
                                    {hostpitaldataworkspace?.fromTime || "--:--"}
                                </span>
                                <div className="h-1 w-4 bg-slate-300 rounded-full" />
                                <span className="text-2xl font-black text-slate-900 tracking-tighter">
                                    {hostpitaldataworkspace?.toTime || "--:--"}
                                </span>
                            </div>
                        </div>

                        <p className="text-[10px] text-slate-400 font-medium text-center px-4">
                            Appointments can only be booked within this clinical window.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddBokking;