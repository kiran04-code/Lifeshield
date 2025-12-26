import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const Loader3 = () => {
  return (
    <div className="fixed inset-0 w-full h-screen flex flex-col justify-center items-center bg-slate-50/50 backdrop-blur-sm z-[999]">
      <div className="relative flex items-center justify-center">
        
        {/* 1. Outer Pulse Rings */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-24 h-24 border border-blue-400 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute w-24 h-24 border border-blue-300 rounded-full"
        />

        {/* 2. Main Spinning Ring */}
        <div className="w-16 h-16 rounded-full border-[3px] border-slate-200 border-t-blue-600 animate-spin" />

        {/* 3. Central Medical Icon */}
        <div className="absolute flex items-center justify-center bg-white shadow-lg rounded-full w-10 h-10 border border-slate-100">
          <Activity size={20} className="text-blue-600 animate-pulse" />
        </div>
      </div>

      {/* 4. Dynamic Loading Text */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 text-center"
      >
        <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-1">
          LifeShield Systems
        </p>
        <div className="flex items-center gap-1 justify-center">
          <span className="text-sm font-bold text-slate-500">Initializing Secure Workspace</span>
          <span className="flex gap-1">
             <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
             <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
             <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"></span>
          </span>
        </div>
      </motion.div>

      {/* 5. Subtle Bottom Security Note */}
      <div className="absolute bottom-10 flex items-center gap-2 px-4 py-2 bg-white/80 rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Encrypted Diagnostic</span>
      </div>
    </div>
  );
};

export default Loader3;