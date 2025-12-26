import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  RiParentFill, 
  RiShieldCheckFill, 
  RiCalendarEventFill,
  RiArrowRightLine,
  RiUser3Line,
  RiLoginCircleLine
} from "react-icons/ri"; // Using RI for consistency with your existing code
import { useAuth } from '../context/auth';

const ParentHeroSection = () => {
    const { User } = useAuth();
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    return (
        <section className="relative w-full min-h-[90vh] bg-[#f4f7ff] overflow-hidden flex items-center">
            {/* Soft Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E0EAFF] to-white -z-20" />
            <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Side: Content */}
                    <motion.div 
                     
                        animate="visible"
                        className="lg:col-span-7 space-y-8"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white border border-blue-100 px-4 py-2 rounded-2xl shadow-sm">
                            <RiShieldCheckFill className="text-blue-600" size={18} />
                            <span className="text-xs font-black uppercase tracking-widest text-slate-500">Trusted by 10k+ Parents</span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                            Because Every Smile <br />
                            Deserves <span className="text-[#1057EC] relative">
                                Protection.
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 10C50 3 150 3 299 10" stroke="#1057EC" strokeWidth="3" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl font-medium">
                            Manage your infant's vaccination schedule and book expert consultations with ease. 
                            Lifeshield keeps your family healthy, anytime, anywhere.
                        </motion.p>

                        {/* Feature Tags */}
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700 bg-blue-50 px-4 py-2 rounded-xl">
                                <RiCalendarEventFill className="text-blue-600" /> Auto-Scheduler
                            </div>
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700 bg-blue-50 px-4 py-2 rounded-xl">
                                <RiShieldCheckFill className="text-blue-600" /> WHO Certified
                            </div>
                        </motion.div>

                        {/* Authentication Action Card */}
                        <motion.div variants={itemVariants} className="pt-4">
                            {User ? (
                                <button 
                                    onClick={() => { navigate("/profile"); window.scrollTo(0, 0); }}
                                    className="group flex items-center gap-4 bg-white p-2 pr-6 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100 hover:border-blue-500 transition-all"
                                >
                                    <div className="bg-[#1057EC] text-white p-4 rounded-2xl shadow-lg shadow-blue-200">
                                        <RiUser3Line size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase text-slate-400">Welcome Back</p>
                                        <p className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            Go to Dashboard <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
                                        </p>
                                    </div>
                                </button>
                            ) : (
                                <button 
                                    onClick={() => { navigate("/login"); window.scrollTo(0, 0); }}
                                    className="group flex items-center gap-4 bg-[#1057EC] p-2 pr-8 rounded-3xl shadow-2xl shadow-blue-900/20 hover:bg-slate-900 transition-all"
                                >
                                    <div className="bg-white text-[#1057EC] p-4 rounded-2xl">
                                        <RiLoginCircleLine size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-black uppercase text-blue-200 opacity-80">Getting Started</p>
                                        <p className="text-lg font-bold text-white flex items-center gap-2">
                                            Parent Login <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
                                        </p>
                                    </div>
                                </button>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Right Side: Visual Asset */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:col-span-5 relative"
                    >
                        {/* Browser/App Window Mockup Frame */}
                        <div className="relative bg-white p-2 rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
                            <div className="bg-slate-50 w-full h-8 flex items-center px-4 gap-1.5 rounded-t-2xl mb-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                            </div>
                            <img
                                src="/School Productivity Tracker(4).gif"
                                alt="Lifeshield Interface"
                                className="w-full h-auto rounded-b-2xl object-contain"
                            />
                        </div>

                        {/* Decorative Background Blob */}
                        <div className="absolute -z-10 -bottom-10 -left-10 w-32 h-32 bg-blue-100 rounded-full blur-2xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ParentHeroSection;