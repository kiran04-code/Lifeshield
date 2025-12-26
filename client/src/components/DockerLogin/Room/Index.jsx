import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Video, Mic, Smartphone, ChevronLeft, Loader2 } from 'lucide-react';

const MeetingRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState(true);

  const myMeeting = async (element) => {
    // Your Credentials
    const appID = 1915431707;
    const serverSecret = "76fe9ce919318da6fe060407794deff4"; 
    
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID, 
      serverSecret, 
      roomId, 
      Date.now().toString(), 
      "Doctor Name" // Replace with dynamic name from context
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);

    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showPreJoinView: false, // We handle the 'mounting' UI ourselves
      onJoinRoom: () => {
        setIsInitializing(false); // Remove our loader once Zego takes over
      },
      onLeaveRoom: () => navigate(-1),
    });
  };

  return (
    <div className="h-screen w-full bg-[#020617] flex flex-col overflow-hidden font-sans text-slate-200">
      
      {/* 1. TOP NAVIGATION BAR */}
      <header className="px-6 py-4 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl border-b border-white/5 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-400"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-sm font-black tracking-tight uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Secure Consultation
            </h2>
            <p className="text-[10px] text-slate-500 font-bold">SESSION ID: {roomId}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 rounded-2xl border border-blue-500/20">
          <ShieldCheck size={14} className="text-blue-400" />
          <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">End-to-End Encrypted</span>
        </div>
      </header>

      {/* 2. MAIN VIEWPORT */}
      <main className="flex-1 relative">
        
        {/* INITIALIZING OVERLAY (Mounting State) */}
        <AnimatePresence>
          {isInitializing && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-[#020617] flex flex-col items-center justify-center"
            >
              <div className="relative mb-8">
                <div className="w-24 h-24 border-2 border-blue-500/20 rounded-full flex items-center justify-center">
                  <Loader2 className="text-blue-500 animate-spin" size={40} />
                </div>
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse"></div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-4"
              >
                <h3 className="text-xl font-bold tracking-tight">Setting up your clinic...</h3>
                
                <div className="flex gap-6 text-slate-500">
                  <StatusItem icon={<Video size={16}/>} text="Camera" />
                  <StatusItem icon={<Mic size={16}/>} text="Microphone" />
                  <StatusItem icon={<Smartphone size={16}/>} text="Network" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* THE ZEGO CONTAINER */}
        
        <div 
          className="w-full h-full bg-black shadow-inner"
          ref={myMeeting}
        />
      </main>

      {/* 3. SUBTLE BRANDING FOOTER */}
      <footer className="py-3 px-8 flex justify-center bg-slate-950 border-t border-white/5">
        <div className="flex items-center gap-2 opacity-40 group hover:opacity-100 transition-opacity">
           <Video size={12} className="text-blue-500" />
           <p className="text-[9px] font-black uppercase tracking-[0.5em]">Lifeshield Systems</p>
        </div>
      </footer>
    </div>
  );
};

// Internal Helper Component
const StatusItem = ({ icon, text }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
      {icon}
    </div>
    <span className="text-[9px] font-black uppercase tracking-widest">{text}</span>
  </div>
);

export default MeetingRoom;