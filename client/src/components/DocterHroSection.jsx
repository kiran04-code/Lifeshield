import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Stethoscope, 
  Activity, 
  LayoutDashboard, 
  LogIn, 
  ArrowRight,
  ShieldPlus
} from 'lucide-react'; // Using Lucide for a more professional medical look
import { useDocAuth } from '../context/dockAuth';

const DocterHroSection = () => {
    const navigate = useNavigate();
    const { docterdata,hostpitaldata } = useDocAuth();
   console.log(hostpitaldata)

    // Simple, clean entrance animation
    const fadeIn = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="hospital" className="relative w-full min-h-[85vh] bg-[#f8faff] flex items-center overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E0EAFF]/50 -z-10 rounded-l-[100px]" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Side: Professional Content */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="space-y-8"
                    >
                        <motion.div variants={fadeIn} className="inline-flex items-center gap-2 bg-white border border-blue-100 px-4 py-2 rounded-2xl shadow-sm">
                            <ShieldPlus size={18} className="text-blue-600" />
                            <span className="text-xs font-black uppercase tracking-widest text-slate-500">Medical Professional Portal</span>
                        </motion.div>

                        <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15] tracking-tight">
                            A trusted space for <br />
                            <span className="text-[#1057EC]">Doctors & Clinics</span> <br />
                            committed to health.
                        </motion.h1>

                        <motion.p variants={fadeIn} className="text-lg text-slate-600 max-w-xl leading-relaxed font-medium">
                            Efficiently manage infant vaccination bookings, provide seamless online consultations, 
                            and expand your community reach with our integrated healthcare ecosystem.
                        </motion.p>

                        {/* Professional CTA Card */}
                        <motion.div variants={fadeIn} className="pt-4">
                            {docterdata ? (
                                <button 
                                    onClick={() => navigate("/hostpiyalshow")}
                                    className="group flex items-center gap-4 bg-white p-3 pr-8 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-slate-100 hover:border-blue-500 transition-all"
                                >
                                    <div className="bg-blue-600 text-white p-4 rounded-2xl">
                                        <LayoutDashboard size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-black uppercase text-slate-400">Management</p>
                                        <p className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            Doctor Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </p>
                                    </div>
                                </button>
                            ) : (
                                <button 
                                    onClick={() => navigate("/DokcterLogin")}
                                    className="group flex items-center gap-4 bg-slate-900 p-3 pr-8 rounded-[2rem] shadow-2xl shadow-slate-900/20 hover:bg-[#1057EC] transition-all"
                                >
                                    <div className="bg-white/10 text-white p-4 rounded-2xl">
                                        <LogIn size={24} />
                                    </div>
                                    <div className="text-left text-white">
                                        <p className="text-[10px] font-black uppercase opacity-60">Healthcare Access</p>
                                        <p className="text-lg font-bold flex items-center gap-2">
                                            Clinician Login <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </p>
                                    </div>
                                </button>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Right Side: SaaS Interface Mockup */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Mockup Frame */}
                        <div className="relative bg-white p-3 rounded-[2.5rem] shadow-2xl border border-slate-100 group">
                            {/* Window Header */}
                            <div className="bg-slate-50 w-full h-10 flex items-center px-5 gap-2 rounded-t-[1.8rem] border-b border-slate-100 mb-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                                <div className="ml-4 h-4 w-32 bg-slate-200 rounded-full" />
                            </div>
                            
                            <img
                                src="/School Productivity Tracker(6).gif"
                                alt="Doctor Dashboard Interface"
                                className="w-full h-auto rounded-b-[1.8rem] grayscale hover:grayscale-0 transition-all duration-700"
                            />

                            {/* Floating Professional Badge */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-blue-50 hidden md:flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                    <Activity size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-slate-400">Live Status</p>
                                    <p className="text-xs font-bold text-slate-800 tracking-tight">System Operational</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DocterHroSection;