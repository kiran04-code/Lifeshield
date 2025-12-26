import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Baby, 
  CalendarCheck, 
  MapPin, 
  ArrowRight, 
  BellRing, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import Loader from "../utils/Loader";
import { useNavigate } from 'react-router-dom';

const Parents = () => {
    const [loader, setLoading] = useState(false);
   const navigate = useNavigate()
    const containerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } 
        }
    };

    return (
        <section className="relative w-full mt-10 py-20 overflow-hidden" id="parents">
            {/* Soft Asymmetric Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#f8faff] -z-20" />
            <div className="absolute top-0 left-0 w-2/3 h-full bg-[#E0EAFF] md:rounded-br-[300px]  md:rounded-tr-[300px]  -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                
                {/* 1. Category Badge (Right Aligned) */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-end mb-12"
                >
                    <div className="flex gap-3 items-center bg-white border border-blue-100 px-6 py-3 rounded-2xl shadow-sm group">
                        <span className="text-sm font-black text-[#1057EC] uppercase tracking-[0.2em]">
                            For Parents
                        </span>
                        <div className="bg-blue-600 p-2 rounded-xl text-white">
                            <Baby size={20} />
                        </div>
                    </div>
                </motion.div>

                {/* 2. Main Glass Card */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative bg-white/70 backdrop-blur-2xl border border-white rounded-[3rem] md:rounded-tl-[180px] md:rounded-br-[80px] shadow-2xl shadow-blue-900/10 p-8 md:p-16"
                >
                    <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
                        
                        {/* Text Content */}
                        <div className="md:w-1/2 space-y-8">
                            <motion.h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                                Your Child’s Health, <br />
                                <span className="text-[#1057EC]">Scheduled with Love.</span>
                            </motion.h2>

                            <motion.p className="text-lg text-slate-600 leading-relaxed font-medium">
                                No more long queues or missed dates. Lifeshield puts your child's vaccination 
                                calendar on autopilot. Find nearby clinics, book home nurse visits, and 
                                track every milestone with ease.
                            </motion.p>

                            {/* Benefit Icons */}
                            <div className="space-y-4">
                                {[
                                    { icon: BellRing, text: "Smart Reminders for upcoming doses", color: "text-amber-500" },
                                    { icon: MapPin, text: "Locate WHO-certified clinics in seconds", color: "text-rose-500" },
                                    { icon: ShieldCheck, text: "Verified digital records & certificates", color: "text-emerald-500" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white transition-colors">
                                        <item.icon className={item.color} size={22} />
                                        <span className="font-bold text-slate-700">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <button 
                                onClick={() => navigate("/parent")}
                                className="group w-full md:w-fit bg-[#1057EC] hover:bg-slate-900 transition-all duration-300 text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-100 active:scale-95"
                            >
                                {loader ? <Loader /> : (
                                    <>
                                        Get Started Free <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Image & Floating App Mockups */}
                        <div className="md:w-1/2 relative">
                            <div className="relative z-10 p-3 bg-gradient-to-tr from-blue-100 to-white rounded-[3.5rem] shadow-2xl shadow-blue-900/20">
                                <img
                                    src="/parent2.jpg"
                                    alt="Mother and Child"
                                    className="w-full h-[500px] object-cover rounded-[3rem]"
                                />
                            </div>

                            {/* Floating UI: Appointment Alert */}
                            <motion.div 
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-8 -right-4 md:-right-8 z-20 bg-white p-5 rounded-3xl shadow-2xl border border-blue-50 flex items-center gap-4 max-w-[240px]"
                            >
                                <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl">
                                    <CalendarCheck size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Due</p>
                                    <p className="text-sm font-bold text-slate-800 italic">Polio Drop • 10:00 AM</p>
                                </div>
                            </motion.div>

                            {/* Floating UI: Success Badge */}
                            <motion.div 
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-10 -left-6 md:-left-12 z-20 bg-emerald-500 p-4 rounded-2xl shadow-2xl flex items-center gap-3 text-white"
                            >
                                <CheckCircle2 size={24} />
                                <span className="text-sm font-bold tracking-tight">Vaccination Certified</span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Parents;