import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Send, 
  Users, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

const Footer = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: "About Us", path: "#" },
            { name: "Careers", path: "#" },
            { name: "Press", path: "#" },
            { name: "Blog", path: "#" }
        ],
        support: [
            { name: "Help Center", path: "#" },
            { name: "Safety Info", path: "#" },
            { name: "Contact Us", path: "#" },
            { name: "Accessibility", path: "#" }
        ]
    };

    return (
        <motion.footer 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-slate-50 border-t border-slate-200 pt-20"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center gap-2">
                            <img src="/logi2-removebg-preview.png" alt="Lifeshield" className="h-12 w-auto" />
                        </div>
                        <p className="text-slate-500 leading-relaxed max-w-sm font-medium">
                            Protecting the next generation with smart, accessible, and verified vaccination tracking. Healthy. Strong. Ready.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-2">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Company</h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a href={link.path} className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 group">
                                        {link.name} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Support</h4>
                        <ul className="space-y-4">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <a href={link.path} className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter & Team */}
                    <div className="lg:col-span-4 space-y-8">
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Stay Updated</h4>
                            <div className="relative group">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-700"
                                />
                                <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-4 rounded-xl hover:bg-slate-900 transition-colors">
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 bg-blue-600 rounded-3xl text-white relative overflow-hidden group">
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Collaborate</p>
                                    <p className="font-bold">Meet the Developers</p>
                                </div>
                                <button 
                                    onClick={() => { navigate("/aboutTeam"); window.scrollTo(0,0); }}
                                    className="bg-white/20 hover:bg-white text-white hover:text-blue-600 p-3 rounded-xl transition-all"
                                >
                                    <Users size={20} />
                                </button>
                            </div>
                            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                                <ShieldCheck size={100} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-200 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm font-bold text-slate-400">
                        © {currentYear} <span className="text-slate-900">Lifeshield</span> • Crafted by kiran.dev & Team
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Privacy Policy</a>
                        <a href="#" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;