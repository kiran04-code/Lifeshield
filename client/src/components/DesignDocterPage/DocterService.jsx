import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  CalendarCheck, 
  Video, 
  Database, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

const DocterService = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Nearby Visibility",
      desc: "Get discovered by patients in your local area, increasing reach and trust.",
      features: ["Local SEO Optimization", "Verified Clinic Profile", "Patient Trust Scores"],
      icon: <MapPin className="text-blue-600" size={24} />,
      path: "Nearby",
      color: "bg-blue-50"
    },
    {
      title: "Smart Booking",
      desc: "Allow patients to book online 24/7, reducing manual scheduling effort.",
      features: ["Flexible Time Slots", "Automated Reminders", "No-Show Protection"],
      icon: <CalendarCheck className="text-emerald-600" size={24} />,
      path: "Appointment",
      color: "bg-emerald-50"
    },
    {
      title: "Tele-Consultation",
      desc: "Offer secure video calls, making healthcare accessible anywhere.",
      features: ["HD Video Engine", "Digital Prescriptions", "Encrypted Patient History"],
      icon: <Video className="text-purple-600" size={24} />,
      path: "Video Consultation",
      color: "bg-purple-50"
    },
    {
      title: "Vaccine Inventory",
      desc: "Track available vaccines and update stock levels in real time.",
      features: ["Live Stock Alerts", "B2B Hospital Network", "Smart Dosage Reminders"],
      icon: <Database className="text-amber-600" size={24} />,
      path: "Vaccine",
      color: "bg-amber-50"
    },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <span className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs bg-blue-50 px-4 py-2 rounded-full">
            Platform Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Comprehensive Tools for <br className="hidden md:block" /> Modern Healthcare.
          </h2>
          <p className="text-slate-500 max-w-2xl font-medium text-lg">
            Our ecosystem is designed to streamline clinical workflows so you can focus on what matters most: patient care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-200 transition-all duration-500 flex flex-col h-full"
            >
              {/* Icon & Title */}
              <div className="mb-6">
                <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>

              {/* Feature List */}
              <ul className="space-y-3 mb-8 flex-grow">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
                    <ChevronRight size={14} className="text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <button
                onClick={() => navigate(`/docter/${service.path}`)}
                className="w-full flex items-center justify-center gap-2 py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm"
              >
                Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocterService;