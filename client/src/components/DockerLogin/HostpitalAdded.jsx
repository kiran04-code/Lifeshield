import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, MapPin, Stethoscope, Clock, 
  ChevronRight, Navigation, Info, ShieldCheck, Search 
} from 'lucide-react';
import { useDocAuth } from '../../context/dockAuth';
import Loader from '../../utils/Loader';
import Loader3 from '../../utils/Loder3';

const HostpitalAdded = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axios, docterdata } = useDocAuth();

  // State Management
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [isSearching, setIsSearching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: '',
    specialization: '',
    location: '',
    village: '',
    lat: null,
    lon: null,
    timings: ''
  });

  // Fetch Nearby Hospitals via Geoapify
  const findNearbyHospitals = useCallback(async () => {
    setIsSearching(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const apiKey = '7e951727013c4c94ab1a32c2db0ab4b3';
          const response = await fetch(
            `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${longitude},${latitude},5000&limit=20&apiKey=${apiKey}`
          );
          setIsSearching(false);
          const res = await response.json();
          setNearbyHospitals(res.features || []);
           setIsSearching(false);
        } catch (error) {
          toast.error("Could not fetch nearby facilities");
        } finally {
          setIsSearching(false);
        }
      },
      (error) => {
        setIsSearching(false);
        toast.warning("Location access denied. Please enter details manually.");
      }
    );
  }, []);

  useEffect(() => { findNearbyHospitals(); }, [findNearbyHospitals]);

  // Handle Selection from Suggestions
  const handleHospitalSelect = (e) => {
    const selectedName = e.target.value;
    const hospital = nearbyHospitals.find(h => h.properties.name === selectedName);

    if (hospital) {
      setFormData(prev => ({
        ...prev,
        hospitalName: selectedName,
        location: `${hospital.properties.address_line1}, ${hospital.properties.address_line2 || ''}`,
        village: hospital.properties.village || hospital.properties.suburb || '',
        lat: hospital.properties.lat,
        lon: hospital.properties.lon
      }));
    } else {
      setFormData(prev => ({ ...prev, hospitalName: selectedName }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        formData: { hospitalName: formData.hospitalName, specialization: formData.specialization },
        locationseting: formData.location,
        number: docterdata?.Number,
        latitude: formData.lat,
        longitide: formData.lon,
        village: formData.village,
        timeing: formData.timings
      };
      
      const { data } = await axios.post("/createWrokSpace", payload);
      console.log(data)
      if (data.success) {
        toast.success("Workspace Created Successfully!");
        navigate(`/DokcterdashBord/${id}/docter/verfyDocter`);
      }else{
         toast.error(`${data.success}`);
      }
    } catch (error) {
      toast.error("Failed to register workspace");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSearching) return <div className="h-screen flex items-center justify-center"><Loader3 /></div>;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl grid md:grid-cols-12 bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100 overflow-hidden border border-white"
      >
        
        {/* LEFT PANEL: INSTRUCTIONS */}
        <div className="md:col-span-4 bg-blue-600 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
               <Building2 size={24} />
            </div>
            <h2 className="text-2xl font-black leading-tight mb-6">Register Your Medical Workspace</h2>
            
            <div className="space-y-6">
              <Step icon={<Navigation size={18}/>} title="Auto-Detect" desc="We use GPS to find your facility instantly." />
              <Step icon={<Search size={18}/>} title="Verify" desc="Select your hospital from the verified list." />
              <Step icon={<ShieldCheck size={18}/>} title="Confirm" desc="Finalize your timings and services." />
            </div>
          </div>

          <div className="relative z-10 mt-10 p-4 bg-blue-700/50 rounded-2xl border border-blue-400/30">
            <div className="flex gap-3">
              <Info size={20} className="shrink-0 text-blue-200" />
              <p className="text-[10px] font-bold leading-relaxed text-blue-100 uppercase tracking-wider">
                Note: Only registered healthcare facilities are eligible for the Lifeshield network.
              </p>
            </div>
          </div>
          
          {/* Decorative background circle */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* RIGHT PANEL: FORM */}
        <form onSubmit={handleSubmit} className="md:col-span-8 p-10 lg:p-14 space-y-8">
          <div>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Hospital Details</h3>
            
            <div className="grid gap-6">
              {/* Name Selection */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Verified Facility Name</label>
                <div className="relative">
                  <select 
                    onChange={handleHospitalSelect}
                    className="w-full pl-4 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold appearance-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all outline-none"
                  >
                    <option value="">Select Suggestion...</option>
                    {nearbyHospitals.map((h, i) => (
                      <option key={i} value={h.properties.name}>{h.properties.name}</option>
                    ))}
                  </select>
                  <ChevronRight size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" />
                </div>
                <input 
                  type="text" 
                  placeholder="Or enter name manually"
                  className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold mt-2"
                  value={formData.hospitalName}
                  onChange={(e) => setFormData({...formData, hospitalName: e.target.value})}
                  required
                />
              </div>

              {/* Address Auto-filled */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Exact Location</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-4 text-blue-500" />
                  <textarea 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Facility Address"
                    rows="2"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-500/5 outline-none resize-none"
                    required
                  />
                </div>
              </div>

              {/* Specialization */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Clinical Services</label>
                  <div className="relative">
                    <Stethoscope size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="e.g. Pediatrics"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none"
                      value={formData.specialization}
                      onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Daily Availability</label>
                  <div className="relative">
                    <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none appearance-none"
                      onChange={(e) => setFormData({...formData, timings: e.target.value})}
                    >
                      <option value="">Select Timing</option>
                      {["6 Hours", "12 Hours", "24 Hours (ER)"].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-5 bg-blue-600 hover:bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-200 flex justify-center items-center gap-3 disabled:opacity-70"
          >
            {isSubmitting ? <Loader /> : <>Initialize Workspace <ChevronRight size={18}/></>}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// Sub-component for instructions
const Step = ({ icon, title, desc }) => (
  <div className="flex gap-4">
    <div className="bg-white/10 p-2 rounded-xl shrink-0">{icon}</div>
    <div>
      <h4 className="text-xs font-black uppercase tracking-widest text-white">{title}</h4>
      <p className="text-[11px] text-blue-100 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default HostpitalAdded;