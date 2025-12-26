import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Video, MapPin, Heart } from 'lucide-react';

const About = () => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-slate-50" id="about">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/40 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-purple-100/40 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="relative group"
        >
          {/* Main Premium Card */}
          <div className="relative bg-white/70 backdrop-blur-2xl border border-white shadow-2xl shadow-blue-900/5 
            rounded-[40px] md:rounded-tl-[200px] md:rounded-br-[200px] md:rounded-tr-[40px] md:rounded-bl-[40px] 
            p-8 md:p-20 overflow-hidden"
          >
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center">
              
              {/* Badge */}
              <motion.div variants={itemVariants} className="mb-6">
                <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg shadow-blue-200">
                  Our Mission
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight"
              >
                Protecting Every Small <br /> 
                <span className="text-blue-600">Step of Their Journey</span>
              </motion.h2>

              {/* Description */}
              <motion.div variants={itemVariants} className="max-w-3xl">
                <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed italic">
                  "Lifeshield is a centralized ecosystem built to empower parents and healthcare providers. 
                  We simplify complex vaccination schedules for children from 
                  <span className="text-slate-900 font-bold"> 1 month to 16 years</span>, 
                  bringing world-class immunization directly to your doorstep."
                </p>
              </motion.div>

              {/* Feature Grid - Quick Scannability */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 w-full max-w-4xl"
              >
                {[
                  { icon: MapPin, label: "Nearby Slots" },
                  { icon: Heart, label: "Home Visits" },
                  { icon: Video, label: "Expert Consults" },
                  { icon: ShieldCheck, label: "Safe & Verified" }
                ].map((feature, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3 group/item">
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover/item:border-blue-200 group-hover/item:text-blue-600 transition-all">
                      <feature.icon size={24} />
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{feature.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={itemVariants} className="mt-14">
                <button className="group relative bg-slate-900 hover:bg-blue-600 text-white px-10 py-5 rounded-3xl font-bold transition-all duration-300 flex items-center gap-3 shadow-xl shadow-slate-200 hover:shadow-blue-200 active:scale-95">
                  Explore Full Services
                  <div className="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                    <ChevronRight size={18} />
                  </div>
                </button>
              </motion.div>

            </div>
          </div>
          
          {/* Aesthetic Floating Badge (Desktop Only) */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:flex absolute -top-6 -right-6 bg-white p-6 rounded-[30px] shadow-xl border border-slate-50 items-center gap-4 z-20"
          >
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>
            <div className="text-left">
              <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Verified Provider</p>
              <p className="text-sm font-bold text-slate-800">100% Secure Care</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;