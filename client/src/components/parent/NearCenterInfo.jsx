import React from 'react';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaArrowRight, FaSearchLocation } from "react-icons/fa";
import { motion } from "framer-motion";

const NearCenterInfo = () => {
  const navigate = useNavigate();
  const { User } = useAuth();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#E0EAFF] to-[#f0f4ff] p-8 md:p-12 rounded-[2.5rem] border border-white shadow-xl shadow-blue-100/50 w-full flex flex-col md:flex-row items-center gap-10">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl"></div>
      
      <div className="md:w-3/5 z-10">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          <FaMapMarkerAlt /> Nearby Feature
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a] leading-tight mb-6">
          Find & Book <span className="text-blue-600">Vaccination Slots</span> Near You
        </h2>
        
        <div className="space-y-4 text-gray-600 text-lg mb-8 max-w-xl">
          <p className="flex items-start gap-3"><span className="mt-1 text-blue-500">•</span> Easily discover certified vaccination centers within your immediate vicinity.</p>
          <p className="flex items-start gap-3"><span className="mt-1 text-blue-500">•</span> View real-time availability based on vaccine type and age group.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {User ? (
            <button onClick={() => navigate("NearVaccineCenter")} className="group flex items-center gap-3 bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all duration-300 active:scale-95">
              Explore Centers <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button onClick={() => navigate("/login")} className="bg-white text-blue-700 border border-blue-200 px-6 py-3 rounded-2xl font-bold hover:bg-blue-50 transition-colors">Login to Book</button>
              <p className="text-sm text-blue-400 font-medium italic">Sign in to see centers near your location</p>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-2/5 flex justify-center relative">
        <div className="absolute inset-0 bg-blue-400/20 blur-[60px] rounded-full"></div>
        <motion.div initial={{ y: 0 }} animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10">
          <img src="/Untitled design(10).png" alt="Booking" className="w-full max-w-sm drop-shadow-2xl rounded-[2rem]" />
          <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-blue-50 animate-bounce">
            <div className="bg-green-100 p-2 rounded-lg text-green-600"><FaSearchLocation size={20} /></div>
            <div className="leading-tight">
               <p className="text-[10px] text-gray-400 font-bold uppercase">Status</p>
               <p className="text-xs font-bold text-gray-800">Centers Found</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NearCenterInfo;