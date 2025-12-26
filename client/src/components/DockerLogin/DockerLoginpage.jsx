import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, ArrowLeft, ShieldCheck } from 'lucide-react';

const DoctorPortalChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[90vh] py-5 w-full flex flex-col justify-center items-center bg-[#f8faff] px-6 relative overflow-hidden">
      
      {/* Background Decorative Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-60" />

      {/* Back Button */}
      <button 
        onClick={() => navigate("/")}
        className="absolute top-10 left-6 md:left-20 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="text-sm uppercase tracking-widest">Back to Home</span>
      </button>

      {/* Main Selection Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-16 shadow-2xl shadow-blue-900/10 text-center relative z-10"
      >
        {/* Verification Icon */}
        <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
          <ShieldCheck className="text-[#1057EC]" size={32} />
        </div>

        {/* Logo & Heading */}
        <img 
          src="/logi2-removebg-preview.png" 
          alt="LifeShield Logo" 
          className="h-12 mx-auto mb-6 grayscale brightness-50" 
        />
        
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Doctor <span className="text-[#1057EC]">Portal.</span>
        </h1>
        
        <p className="text-slate-500 font-medium mb-12 max-w-sm mx-auto leading-relaxed">
          Access your clinical workspace, manage appointments, and connect with your patients.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 w-full">
          <button 
            onClick={() => { navigate("/DokcterLogin/Login"); window.scrollTo(0, 0); }}
            className="group flex items-center justify-center gap-3 bg-[#1057EC] text-white py-4 px-8 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:bg-slate-900 transition-all hover:-translate-y-1"
          >
            <LogIn size={18} />
            Sign In to Practice
          </button>

          <button 
            onClick={() => { navigate("/DokcterLogin/CreatAccount"); window.scrollTo(0, 0); }}
            className="group flex items-center justify-center gap-3 bg-white text-slate-700 border-2 border-slate-100 py-4 px-8 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 hover:border-blue-200 transition-all"
          >
            <UserPlus size={18} className="text-blue-600" />
            Create New Account
          </button>
        </div>

        {/* Security Footer */}
        <p className="mt-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          End-to-End Encrypted Medical Environment
        </p>
      </motion.div>

      {/* Decorative Branding */}
      <div className="mt-12 opacity-20 hidden md:block">
        <p className="text-slate-400 font-black text-6xl tracking-tighter">LIFESHIELD HEALTH</p>
      </div>
    </div>
  );
};

export default DoctorPortalChoice;