import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users2, HeartPulse, Globe2, ChevronRight } from 'lucide-react';

const WhyPage = () => {
  const reasons = [
    {
      title: "Build Robust Immunity",
      desc: "Vaccines act as a personal shield, training your immune system to recognize and defeat life-threatening pathogens before they can cause harm.",
      icon: <ShieldCheck className="text-blue-600" size={24} />,
      gradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      title: "Community Immunity",
      desc: "By getting vaccinated, you break the chain of infection, creating a 'herd immunity' effect that stops outbreaks in their tracks.",
      icon: <Users2 className="text-indigo-600" size={24} />,
      gradient: "from-indigo-500/10 to-blue-500/10"
    },
    {
      title: "Protect the Vulnerable",
      desc: "Your vaccination protects those who cannot be immunized, such as newborns with developing systems and the elderly.",
      icon: <HeartPulse className="text-rose-600" size={24} />,
      gradient: "from-rose-500/10 to-orange-500/10"
    },
    {
      title: "Global Public Health",
      desc: "Immunization is one of the most cost-effective health investments in history, helping eradicate diseases globally.",
      icon: <Globe2 className="text-emerald-600" size={24} />,
      gradient: "from-emerald-500/10 to-teal-500/10"
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#F8FAFF] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Sticky Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest">
              Knowledge Base
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Why do you <br />
              <span className="text-[#1057EC]">Have to Vaccinate?</span>
            </h2>

            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              Vaccination is not just a personal choice; it is a vital step in ensuring a healthy future for your children and the community. 
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-slate-800 font-bold">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <ChevronRight size={14} strokeWidth={3} />
                </div>
                WHO Verified Information
              </div>
              <div className="flex items-center gap-3 text-slate-800 font-bold">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <ChevronRight size={14} strokeWidth={3} />
                </div>
                Pediatrician Approved
              </div>
            </div>
          </motion.div>

          {/* Right Side: Interactive Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden transition-all"
              >
                {/* Background Accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white shadow-lg rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    {reason.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {reason.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Educational Diagram Placeholder Integration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 p-8 md:p-12 bg-white rounded-[3rem] border border-blue-50 shadow-2xl flex flex-col items-center text-center"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Visualizing Protection: Herd Immunity</h3>
          

[Image of herd immunity concept]

          <p className="mt-6 text-slate-500 max-w-2xl italic">
            When a high percentage of the population is vaccinated, it becomes difficult for a disease to spread because there are so few susceptible people left to infect.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyPage;