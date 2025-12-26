import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  LayoutDashboard, 
  ArrowRight, 
  Users, 
  Activity 
} from 'lucide-react';
import Loader from '../utils/Loader';

const Docter = () => {
    const [loader, setLoading] = useState(false);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } 
        }
    };

    const floatingItem = {
        initial: { y: 0 },
        animate: { 
            y: [0, -10, 0], 
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } 
        }
    };

    return (
        <section className="relative w-full  py-16 md:py-24 overflow-hidden" id="hospitals">
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E0EAFF] md:rounded-l-[200px] -z-10" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6">
                
                {/* 1. Premium Tagline Badge */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 bg-white border border-blue-100 px-5 py-2.5 rounded-2xl shadow-sm mb-10 group"
                >
                    <div className="bg-[#1057EC] p-2 rounded-lg text-white group-hover:rotate-12 transition-transform">
                        <Building2 size={20} />
                    </div>
                    <span className="text-sm font-bold text-[#1057EC] uppercase tracking-widest">
                        Partner with Lifeshield
                    </span>
                </motion.div>

                {/* 2. Main Glassmorphism Card */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative bg-white/60 backdrop-blur-xl border border-white rounded-[2.5rem] md:rounded-tr-[180px] md:rounded-bl-[80px] shadow-2xl shadow-blue-900/5 p-8 md:p-16"
                >
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        
                        {/* Text Content */}
                        <div className="lg:w-1/2 space-y-8">
                            <motion.h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                                Transform Your Hospital into a <br />
                                <span className="text-[#1057EC]">Digital Health Hub.</span>
                            </motion.h1>

                            <motion.p className="text-lg text-slate-600 leading-relaxed font-medium">
                                We place your facility at the fingertips of local families. Through our 
                                <span className="text-slate-900 font-bold"> Docker-optimized infrastructure</span>, 
                                manage every appointment, medical report, and consultant schedule with 
                                military-grade precision.
                            </motion.p>

                            {/* Features List for Hospital Confidence */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                                <div className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" /> Real-time Location Sync
                                </div>
                                <div className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" /> Automated Digital Reports
                                </div>
                                <div className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" /> Dedicated Admin Dashboard
                                </div>
                                <div className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" /> Family Engagement Tools
                                </div>
                            </div>

                            <button 
                                onClick={() => setLoading(!loader)}
                                className="group bg-[#1057EC] hover:bg-slate-900 transition-all duration-300 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-blue-200 hover:shadow-slate-200 active:scale-95"
                            >
                                {loader ? <Loader /> : (
                                    <>
                                        Register Your Hospital <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Image & Floating Interactive Elements */}
                        <div className="lg:w-1/2 relative">
                            {/* Main Image with Decorative Frame */}
                            <div className="relative z-10 p-4 bg-white rounded-[3rem] shadow-inner border border-slate-50">
                                <img
                                    src="/doc.jpg"
                                    alt="Medical Team"
                                    className="w-full h-auto rounded-[2.5rem] object-cover"
                                />
                            </div>

                            {/* Floating Card: Location Discovery */}
                            <motion.div 
                                variants={floatingItem}
                                initial="initial"
                                animate="animate"
                                className="absolute -top-6 -left-6 md:-left-12 z-20 bg-white p-5 rounded-2xl shadow-xl border border-blue-50 flex items-center gap-4"
                            >
                                <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visibility</p>
                                    <p className="text-sm font-bold text-slate-800">Nearby Family Found</p>
                                </div>
                            </motion.div>

                            {/* Floating Card: Activity/Stats */}
                            <motion.div 
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-8 -right-4 md:-right-8 z-20 bg-slate-900 p-6 rounded-3xl shadow-2xl flex items-center gap-4 text-white"
                            >
                                <div className="bg-blue-500 p-3 rounded-xl">
                                    <Activity size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Dashboard</p>
                                    <p className="text-sm font-bold">98% Slot Efficiency</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Trust Indicators */}
                <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all">
                    <div className="flex items-center gap-2 font-black text-slate-800"><LayoutDashboard /> ENTERPRISE READY</div>
                    <div className="flex items-center gap-2 font-black text-slate-800"><Users /> 500+ HOSPITALS</div>
                    <div className="flex items-center gap-2 font-black text-slate-800"><Activity /> HIPAA COMPLIANT</div>
                </div>
            </div>
        </section>
    );
};

export default Docter;