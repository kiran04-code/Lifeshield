import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone, MapPin, Clock, Syringe, 
  ChevronRight, BadgeCheck, Globe, 
  ArrowLeft, Share2, Star
} from 'lucide-react';
import { useDocAuth } from '../../../context/dockAuth';
import Loader3 from '../../../utils/Loder3';

const HospitalDetail = () => {
  const [hospital, setHospital] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { axios } = useDocAuth();
  const { name } = useParams(); // This is the ID
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/findAllHostpital");
        // Find the specific hospital by ID
        const target = data.hotData.find((h) => h._id === name);
        setHospital(target);
      } catch (error) {
        console.error("Error fetching hospital info:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHospitalData();
  }, [name, axios]);

  if (isLoading) return <Loader3 />;
  if (!hospital) return <div className="h-screen flex items-center justify-center font-bold text-slate-400">Hospital record not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Share2 size={18} className="text-slate-600" /></button>
        </div>
      </nav>

      {/* 2. HERO BANNER */}
      <div className="pt-24 px-4 md:px-8 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100"
        >
          <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 p-8 flex items-end">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white text-[10px] font-black uppercase tracking-widest">
              <BadgeCheck size={14} /> Verified Partner Facility
            </div>
          </div>

          <div className="p-8 md:p-12 -mt-10 bg-white rounded-t-[3rem] relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-500">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" className="opacity-30" />
                  <span className="text-xs font-bold text-slate-400 ml-2">(4.2 • 120+ Reviews)</span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                  {hospital.hospitalName}
                </h1>
                <p className="flex items-center gap-2 text-slate-500 font-medium">
                  <MapPin size={18} className="text-blue-500" /> {hospital.location}
                </p>
              </div>

              <button 
                onClick={() => navigate(`/hospital/${name}/VaccinationSlot`)}
                className="bg-blue-600 hover:bg-slate-900 text-white px-8 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-200 flex items-center gap-3"
              >
                Book Vaccination <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 3. INFORMATION GRID */}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          {/* Quick Contact Card */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Contact Info</h3>
              <div className="space-y-4">
                <ContactItem icon={<Phone className="text-emerald-500" />} label="Emergency Line" value={hospital.Number} />
                <ContactItem icon={<Globe className="text-blue-500" />} label="Official Website" value="Visit Portal" link />
              </div>
            </div>

            <div className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100 flex items-center gap-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              <div>
                <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Current Status</p>
                <p className="text-sm font-bold text-emerald-900">Facility Open & Accepting Slots</p>
              </div>
            </div>
          </div>

          {/* Detailed Info Card */}
          <div className="md:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-10">
            
            {/* Timings */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Clock size={20} /></div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Operational Hours</h3>
              </div>
              <p className="text-slate-600 font-bold ml-12 leading-relaxed">
                {hospital.timeopne || "Standard Clinical Hours (9:00 AM - 6:00 PM)"}
              </p>
            </section>

            <hr className="border-slate-50" />

            {/* Services */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Syringe size={20} /></div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Available Immunizations</h3>
              </div>
              <div className="flex flex-wrap gap-2 ml-12">
                {hospital.specialization?.split(",").map((item, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 capitalize hover:bg-blue-50 hover:border-blue-100 transition-colors"
                  >
                    {item.trim()}
                  </span>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components
const ContactItem = ({ icon, label, value, link }) => (
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">{icon}</div>
    <div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-tight">{label}</p>
      <p className={`text-sm font-bold leading-tight ${link ? 'text-blue-600 underline cursor-pointer' : 'text-slate-800'}`}>{value}</p>
    </div>
  </div>
);

export default HospitalDetail;