import React from 'react';
import { motion } from 'framer-motion';
import { 
  Syringe, 
  Home, 
  Video, 
  ClipboardCheck, 
  Clock, 
  ShieldPlus,
  ArrowRight
} from 'lucide-react';

const OurService = () => {
  const services = [
    {
      title: "Clinic Vaccinations",
      desc: "Book confirmed slots at top-rated pediatric clinics and hospitals near your current location.",
      icon: <Syringe className="text-blue-600" size={28} />,
      color: "bg-blue-50",
      link: "/hospitals"
    },
    {
      title: "Home Nurse Visits",
      desc: "Certified healthcare professionals come to your doorstep for stress-free child immunizations.",
      icon: <Home className="text-purple-600" size={28} />,
      color: "bg-purple-50",
      link: "/home-visit"
    },
    {
      title: "Video Consultation",
      desc: "Connect with specialist pediatricians instantly via high-definition private video calls.",
      icon: <Video className="text-rose-600" size={28} />,
      color: "bg-rose-50",
      link: "/consultation"
    },
    {
      title: "Digital Health Vault",
      desc: "Securely store and track your child's vaccination history and medical reports in one place.",
      icon: <ClipboardCheck className="text-emerald-600" size={28} />,
      color: "bg-emerald-50",
      link: "/profile"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden" id="services">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
              <ShieldPlus size={14} /> Lifeshield Ecosystem
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Comprehensive Care for <br />
              <span className="text-[#1057EC]">Every Milestone.</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 font-medium max-w-xs md:text-right"
          >
            Expert-led healthcare solutions designed to keep your child safe, from birth to adolescence.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 hover:shadow-blue-900/10 transition-all duration-300"
            >
              {/* Icon Box */}
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#1057EC] transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                {service.desc}
              </p>

              {/* Action Link */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-[#1057EC] transition-colors">
                  Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="w-8 h-1 bg-slate-100 rounded-full group-hover:w-12 group-hover:bg-blue-200 transition-all" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Feature Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 p-8 bg-slate-900 rounded-[3rem] flex flex-wrap justify-around items-center gap-8"
        >
          <div className="flex items-center gap-4 text-white">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-blue-400">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Availability</p>
              <p className="text-sm font-bold">24/7 Support</p>
            </div>
          </div>
          <div className="w-px h-8 bg-white/10 hidden md:block" />
          <div className="flex items-center gap-4 text-white">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-purple-400">
              <ShieldPlus size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Safety</p>
              <p className="text-sm font-bold">WHO Certified</p>
            </div>
          </div>
          <div className="w-px h-8 bg-white/10 hidden md:block" />
          <div className="flex items-center gap-4 text-white">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Trust</p>
              <p className="text-sm font-bold">10k+ Families</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Users = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default OurService;