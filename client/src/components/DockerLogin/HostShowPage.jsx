import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  ShieldCheck, 
  Building2, 
  UserCircle2,
  LogOut
} from 'lucide-react';
import { useDocAuth } from '../../context/dockAuth';

const HostShowPage = () => {
  const navigate = useNavigate();
  const { hostpitaldata } = useDocAuth();

  // Handle Logout (optional but recommended for UX)
  const handleLogout = () => {
    navigate('/DokcterLogin');
  };

  return (
    <div className="min-h-[80vh] w-full flex flex-col justify-center items-center px-6 bg-[#f8faff] relative overflow-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      <div className="max-w-xl w-full">
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full mb-4 border border-emerald-100"
          >
            <ShieldCheck size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Authorized Access</span>
          </motion.div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Select <span className="text-[#1057EC]">Workspace.</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-2">
            Welcome back. Please select the clinical profile you wish to manage.
          </p>
        </div>

        {/* Doctor Card / Workspace Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          onClick={() => navigate(`/DokcterdashBord/${hostpitaldata?._id}`)}
          className="group relative bg-white border border-slate-100 p-6 md:p-8 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 cursor-pointer transition-all hover:border-blue-200 hover:shadow-blue-900/10"
        >
          <div className="flex items-center gap-6">
            {/* Avatar / Icon */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-[#1057EC] group-hover:bg-[#1057EC] group-hover:text-white transition-colors duration-300">
              <UserCircle2 size={40} strokeWidth={1.5} />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Medical Practitioner</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 truncate">
                Dr. {hostpitaldata?.fname} {hostpitaldata?.Mname} {hostpitaldata?.lname}
              </h2>
              <div className="flex items-center gap-2 text-slate-400 mt-1">
                <Building2 size={14} />
                <span className="text-xs font-bold uppercase tracking-tight">Active Clinical Workspace</span>
              </div>
            </div>

            {/* Action Arrow */}
            <div className="hidden md:flex w-12 h-12 rounded-full border border-slate-100 items-center justify-center group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
              <ChevronRight size={20} />
            </div>
          </div>

          {/* Progress Overlay (Subtle) */}
          <div className="absolute bottom-0 left-10 right-10 h-1 bg-slate-50 rounded-full overflow-hidden mt-4">
             <div className="w-full h-full bg-blue-500/10 group-hover:bg-blue-500 transition-colors" />
          </div>
        </motion.div>

        {/* Footer Actions */}
        <div className="mt-8 flex justify-center">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-400 hover:text-red-500 font-bold text-[11px] uppercase tracking-widest transition-colors"
            >
              <LogOut size={14} />
              Sign Out of LifeShield
            </button>
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-[100px] -z-10 opacity-50" />
    </div>
  );
};

export default HostShowPage;