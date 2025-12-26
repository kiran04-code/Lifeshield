import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  FileCheck, 
  Building, 
  ArrowRight, 
  CheckCircle2,
  Zap
} from 'lucide-react';

const HowTOcreateWrokSpace = () => {
    const navigate = useNavigate();

    const steps = [
        {
            icon: <UserPlus className="text-blue-600" size={28} />,
            title: "Quick Registration",
            description: "Create your professional account in seconds with basic contact details to access the Lifeshield ecosystem.",
            details: ["Instant Email Verification", "Secure Data Encryption"],
            color: "bg-blue-50"
        },
        {
            icon: <FileCheck className="text-indigo-600" size={28} />,
            title: "Medical Verification",
            description: "Doctors are verified through official medical licenses and Aadhaar. We ensure only certified professionals provide care.",
            details: ["License Validation", "Identity Verification"],
            color: "bg-indigo-50"
        },
        {
            icon: <Building className="text-emerald-600" size={28} />,
            title: "Digital Workplace",
            description: "Hospitals are verified via real-time APIs. Within 5 minutes, your digital vaccination clinic is ready to go.",
            details: ["Live in 5 Minutes", "Automated Inventory Setup"],
            color: "bg-emerald-50"
        }
    ];

    return (
        <section className="bg-white py-24 px-6 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full mb-4"
                    >
                        <Zap size={14} className="text-blue-600 fill-blue-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">Streamlined Onboarding</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                        Ready to join in 3 simple steps.
                    </h2>
                    <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
                        We've optimized our verification process to be as fast as possible without compromising medical integrity.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Visual Connector Line (Desktop Only) */}
                    <div className="hidden lg:block absolute top-24 left-0 w-full h-0.5 border-t-2 border-dashed border-slate-100 -z-0" />

                    {steps.map((step, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative z-10 group"
                        >
                            {/* Step Badge */}
                            <div className="flex flex-col items-center text-center">
                                <div className={`w-20 h-20 ${step.color} rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-blue-900/5 group-hover:scale-110 transition-transform duration-500 border border-white`}>
                                    {step.icon}
                                    {/* Number Badge */}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center text-sm font-black border-4 border-white">
                                        {index + 1}
                                    </div>
                                </div>

                                <h3 className="text-xl font-black text-slate-900 mb-4">{step.title}</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 px-4">
                                    {step.description}
                                </p>

                                {/* Feature Tags */}
                                <div className="flex flex-col gap-2">
                                    {step.details.map((detail, dIdx) => (
                                        <div key={dIdx} className="flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
                                            <CheckCircle2 size={14} className="text-emerald-500" />
                                            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">{detail}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Footer */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <button 
                        onClick={() => { navigate("/DokcterLogin"); window.scrollTo(0, 0); }} 
                        className="group relative inline-flex items-center gap-3 bg-[#1057EC] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/20 hover:bg-slate-900 transition-all hover:-translate-y-1"
                    >
                        Register Your Workplace
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="mt-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
                        Average verification time: <span className="text-slate-900 underline">4 mins 30 secs</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default HowTOcreateWrokSpace;