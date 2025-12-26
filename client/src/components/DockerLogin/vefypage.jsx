'use client'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Search, Database, Building2, CheckCircle2 } from 'lucide-react';
import Loader from '../../utils/Loader';
import { useDocAuth } from '../../context/dockAuth';

const VerifyPage = () => {
    const { hostpitaldataworkspace } = useDocAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [statusMessage, setStatusMessage] = useState("Initializing verification...");

    // Proper navigation handling
    useEffect(() => {
        if (hostpitaldataworkspace?.verify === true) {
            navigate(`/DokcterdashBord/${id}`);
        }
    }, [hostpitaldataworkspace, navigate, id]);

    // Simulated status updates to keep the user engaged
    useEffect(() => {
        const messages = [
            "Connecting to National Health Registry...",
            "Validating Medical License credentials...",
            "Authenticating Hospital API keys...",
            "Finalizing your secure workspace..."
        ];
        let i = 0;
        const interval = setInterval(() => {
            if (i < messages.length) {
                setStatusMessage(messages[i]);
                i++;
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        { label: "Application Received", done: true },
        { label: "Document Validation", done: false },
        { label: "Registry Sync", done: false },
    ];

    return (
        <div className="min-h-screen bg-[#f8faff] flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231057ec' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
            />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-100 shadow-2xl shadow-blue-900/10 rounded-[2.5rem] p-8 md:p-12 max-w-2xl w-full text-center relative z-10"
            >
                {/* Header Section */}
                <div className="relative mb-10">
                    <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Building2 className="text-[#1057EC] animate-pulse" size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                        Registering Your <span className="text-[#1057EC]">Workplace</span>
                    </h2>
                </div>

                {/* Progress Status Card */}
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 mb-8 text-left">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                            Current Status
                        </span>
                    </div>
                    <p className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-3">
                        <Search size={20} className="text-blue-500" />
                        {statusMessage}
                    </p>

                    {/* Verification Checklist */}
                    <div className="space-y-3">
                        {steps.map((step, index) => (
                            <div key={index} className="flex items-center gap-3">
                                {step.done ? (
                                    <CheckCircle2 size={18} className="text-emerald-500" />
                                ) : (
                                    <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-200" />
                                )}
                                <span className={`text-sm font-bold ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Text */}
                <p className="text-slate-500 text-sm font-medium leading-relaxed px-4">
                    To maintain medical integrity, we verify every hospital through secure APIs. 
                    This typically takes <span className="text-[#1057EC] font-bold">under 5 minutes</span>. 
                    You will be redirected automatically.
                </p>

                {/* Loader Wrapper */}
                <div className="mt-10 pt-8 border-t border-slate-50 flex flex-col items-center">
                    <Loader />
                    <span className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Secure Encryption Active
                    </span>
                </div>
            </motion.div>

            {/* Footer Support */}
            <p className="mt-8 text-slate-400 text-xs font-medium">
                Need help? Contact support@lifeshield.com
            </p>
        </div>
    );
};

export default VerifyPage;