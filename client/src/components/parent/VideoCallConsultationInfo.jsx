import React from 'react';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import { FaVideo, FaArrowRight, FaUserMd, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const VideoCallConsultationInfo = () => {
  const navigate = useNavigate();
  const { User } = useAuth();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#E0EAFF] to-[#f0f4ff] p-8 md:p-12 rounded-[2.5rem] border border-white shadow-xl shadow-blue-100/50 w-full flex flex-col md:flex-row items-center gap-10">
      
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl"></div>
      
      <div className="md:w-3/5 z-10">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          <FaVideo className="animate-pulse" /> Live Consultation
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a] leading-tight mb-6">
          Connect with <span className="text-blue-600">Expert Doctors</span> via Video Call
        </h2>
        
        <div className="space-y-4 text-gray-600 text-lg mb-8 max-w-xl">
          <div className="flex items-start gap-4">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <FaUserMd className="text-blue-500" />
            </div>
            <p className="text-base">Consult certified vaccination specialists from the comfort of your home.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <FaShieldAlt className="text-green-500" />
            </div>
            <p className="text-base">100% secure, encrypted video sessions for your health privacy.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {User ? (
            <button 
              onClick={() => navigate("/NearVaccineCenter")}
              className="group flex items-center gap-3 bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all duration-300 active:scale-95"
            >
              Book Video Call <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => navigate("/login")}
                className="bg-white text-blue-700 border border-blue-200 px-6 py-3 rounded-2xl font-bold hover:bg-blue-50 transition-colors"
              >
                Login to Consult
              </button>
              <p className="text-sm text-blue-400 font-medium italic">Join today to talk with a doctor</p>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-2/5 flex justify-center relative">
        <div className="absolute inset-0 bg-blue-400/10 blur-[60px] rounded-full"></div>
        
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <img 
            src="/Untitled design(11).png" 
            alt="Doctor Video Consultation" 
            className="w-full max-w-sm drop-shadow-2xl rounded-[2rem]"
          />
          
          <div className="absolute top-4 -right-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-white flex items-center gap-3">
            <div className="h-3 w-3 bg-red-500 rounded-full animate-ping"></div>
            <span className="text-xs font-bold text-gray-800 uppercase tracking-tighter">Live Session</span>
          </div>
        </motion.div>
      </div>
    
    </section>
  );
};

export default VideoCallConsultationInfo;