import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  HeartPulse, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

const HeroSection = () => {
    const navigate = useNavigate();

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="relative min-h-screen w-full bg-[#f4f7ff] overflow-hidden flex items-center">
            {/* Background Aesthetics */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E0EAFF] hidden lg:block rounded-l-[100px] -z-10" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px]" />
            
            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Content Column */}
                    <motion.div 
                     
                        animate="visible"
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white border border-blue-100 px-4 py-2 rounded-2xl shadow-sm">
                            <Sparkles size={16} className="text-blue-600" />
                            <span className="text-xs font-black uppercase tracking-widest text-slate-500">The Future of Immunization</span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                            One small shot, <br />
                            <span className="text-[#1057EC] relative">
                                giant leap 
                                <motion.span 
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute -right-12 top-0 hidden md:block"
                                >
                                    <HeartPulse size={48} className="text-rose-500 opacity-20" />
                                </motion.span>
                            </span> 
                            <br /> for your community.
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed font-medium">
                            Your health is your greatest responsibility. Track, protect, and empower your family with Lifeshield's intelligent vaccination ecosystem.
                        </motion.p>

                        {/* Premium Navigation Cards */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button 
                                onClick={() => navigate("/docter")}
                                className="group flex items-center gap-4 bg-white p-4 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-slate-100 hover:border-blue-500 transition-all text-left"
                            >
                                <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Building2 size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-slate-400">Healthcare</p>
                                    <p className="text-sm font-bold text-slate-800">Hospitals & Doctors</p>
                                </div>
                                <ArrowRight size={18} className="text-slate-300 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button 
                                onClick={() => navigate("/parent")}
                                className="group flex items-center gap-4 bg-white p-4 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-slate-100 hover:border-blue-500 transition-all text-left"
                            >
                                <div className="bg-purple-100 text-purple-600 p-3 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-slate-400">Families</p>
                                    <p className="text-sm font-bold text-slate-800">For Parents</p>
                                </div>
                                <ArrowRight size={18} className="text-slate-300 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Right Image Column */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        {/* Decorative Badge */}
                        <motion.div 
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 left-10 z-20 bg-white p-4 rounded-3xl shadow-2xl flex items-center gap-3 border border-blue-50"
                        >
                            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                <ShieldCheck size={20} />
                            </div>
                            <span className="text-sm font-black text-slate-800 uppercase tracking-tighter">Verified Provider</span>
                        </motion.div>

                        {/* Main Visual */}
                        <div className="relative p-6 bg-white rounded-[4rem] shadow-2xl shadow-blue-900/10">
                            <img
                                src="/Blue Lets Get Vaccinated Instagram Post.png"
                                alt="Lifeshield Vaccination"
                                className="w-full max-w-md rounded-[3rem] object-cover hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>

                        {/* Background Floating Element */}
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;