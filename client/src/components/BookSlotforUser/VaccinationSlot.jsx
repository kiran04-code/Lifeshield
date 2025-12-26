import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDocAuth } from '../../context/dockAuth';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaVideo, FaHospital, FaStethoscope } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { MdAccessTime } from "react-icons/md";

const VaccinationSlot = () => {
    const { name } = useParams();
    const { axios } = useDocAuth();
    const { User } = useAuth();
    const navigate = useNavigate();

    const [hospitalData, setHospitalData] = useState([]);
    const [doctorData, setDoctorData] = useState(null);
    const [allHospitals, setAllHospitals] = useState([]);
    
    const [bookingForm, setBookingForm] = useState({
        hospital: '',
        time: '',
        vaccine: ''
    });

    const [selectedPrice, setSelectedPrice] = useState("");
    const [selectedDuration, setSelectedDuration] = useState("");
    const [activeHospitalId, setActiveHospitalId] = useState("");

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setBookingForm({ ...bookingForm, [name]: value });
    };

    const fetchAllData = async () => {
        try {
            const { data } = await axios.get("/findAllHostpital");
            setAllHospitals(data.hotData);
        } catch (error) {
            console.error(error);
        }
    };

    const findDoctorDetail = async () => {
        try {
            const { data } = await axios.post("/findDocterName", { id: name });
            setDoctorData(data.dataDoc);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllData();
        findDoctorDetail();
    }, [name]);

    useEffect(() => {
        if (allHospitals.length > 0) {
            const filtered = allHospitals.filter((h) => h._id === name);
            setHospitalData(filtered);
            if (filtered.length > 0) {
                setBookingForm(prev => ({ ...prev, hospital: filtered[0].hospitalName }));
            }
        }
    }, [allHospitals, name]);

    const handlePhysicalBooking = async (e) => {
        e.preventDefault();
        try {
            if (!bookingForm.hospital || !bookingForm.time || !bookingForm.vaccine) {
                toast.error("Please fill in all fields.");
                return;
            }
            const { data } = await axios.post("/BookSlot", { from: bookingForm, name });
            if (data.success) {
                toast.success(data.message);
                navigate("/profile");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleConsultationPayment = async (e) => {
        e.preventDefault();
        try {
            if (!selectedPrice) {
                return toast.error("Please select a consultation package.");
            }

            const { data: { order } } = await axios.post("/BookMeetingSlot", { price: selectedPrice });
            const { data: { key } } = await axios("/apikeyRazorpay");

            const options = {
                key: key,
                amount: order.amount,
                currency: 'INR',
                name: "LifeShield Consultation",
                description: `Consultation with Dr. ${doctorData?.lname}`,
                order_id: order.id,
                handler: async function (response) {
                    const payload = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                        id: activeHospitalId,
                        prices: selectedPrice,
                        duartion: selectedDuration,
                    };
                    const { data } = await axios.post("/payment-success", payload);
                    if (data.success) {
                        toast.success("Consultation Booked Successfully!");
                        navigate("/profile");
                    }
                },
                prefill: {
                    name: User.fullName,
                    email: User.email,
                    contact: User.Number
                },
                theme: { color: '#1057EC' },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error);
        }
    };

    const vaccineOptions = [
        'Hepatitis B (1 Month)', 'Rotavirus (2 Months)', 'DTP (6 Months)',
        'MMR (12 Months)', 'Polio (3 Years)', 'Varicella (5 Years)',
        'HPV (12 Years)', 'COVID-19 (16 Years)',
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFF] py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                        <FaHospital /> Appointment Booking
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                        {doctorData ? `Dr. ${doctorData.fname} ${doctorData.lname}'s Clinic` : "Loading Clinic..."}
                    </h1>
                    {hospitalData.map((h) => (
                        <p key={h._id} className="text-blue-600 font-semibold text-lg mt-2">{h.hospitalName}</p>
                    ))}
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/50 border border-white p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-600 p-3 rounded-2xl text-white">
                                <FaCheckCircle size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">Physical Vaccination</h2>
                        </div>

                        <form onSubmit={handlePhysicalBooking} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Hospital Name</label>
                                <input 
                                    type="text" 
                                    value={bookingForm.hospital} 
                                    readOnly 
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl font-medium text-gray-600 cursor-not-allowed"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Preferred Time</label>
                                    <input
                                        name="time"
                                        type="time"
                                        onChange={handleFormChange}
                                        className="w-full p-3 bg-blue-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Contact Number</label>
                                    <input
                                        type="tel"
                                        value={User?.Number || ""}
                                        readOnly
                                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Select Vaccine</label>
                                <select
                                    name="vaccine"
                                    onChange={handleFormChange}
                                    className="w-full p-3 bg-blue-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                                >
                                    <option value="">-- Choose Vaccine --</option>
                                    {vaccineOptions.map((v, i) => (
                                        <option key={i} value={v}>{v}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
                            >
                                Confirm Slot Booking
                            </button>
                        </form>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/50 border border-white p-8">
                        {hospitalData[0]?.vcallONOff ? (
                            <>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="bg-purple-600 p-3 rounded-2xl text-white">
                                        <FaVideo size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">Online Consultation</h2>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl mb-8 border border-purple-100">
                                    <img src="/docddata.jpg" alt="Doctor" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                                    <div>
                                        <h3 className="font-bold text-gray-800">
                                            Dr. {doctorData?.fname} {doctorData?.lname}
                                        </h3>
                                        <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Pediatrician Specialist</p>
                                    </div>
                                </div>

                                <form onSubmit={handleConsultationPayment} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-gray-50 rounded-2xl">
                                            <p className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase mb-3">
                                                <MdAccessTime /> Typical Duration
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {hospitalData[0]?.MeetingAvialbleTimeandpakcage.map((p, i) => (
                                                    <span key={i} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700">
                                                        {p.time}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-2xl">
                                            <p className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase mb-3">
                                                <TbMoneybag /> Availability
                                            </p>
                                            <p className="text-xs font-bold text-gray-700">Sun: Morning / Evening</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Select Package</label>
                                        <select 
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setSelectedPrice(val);
                                                const pkg = hospitalData[0].MeetingAvialbleTimeandpakcage.find(p => p.price === val);
                                                setSelectedDuration(pkg?.time || "");
                                            }}
                                            className="w-full p-3 bg-purple-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                        >
                                            <option value="">-- Select Price & Time --</option>
                                            {hospitalData[0]?.MeetingAvialbleTimeandpakcage.map((p, i) => (
                                                <option key={i} value={p.price}>₹{p.price} for {p.time}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        onClick={() => setActiveHospitalId(hospitalData[0]?._id)}
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-purple-100 transition-all active:scale-95"
                                    >
                                        Book Video Consultation
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                                <div className="bg-red-50 p-6 rounded-full text-red-500">
                                    <FaStethoscope size={40} />
                                </div>
                                <p className="text-red-600 font-bold max-w-[250px]">
                                    Online consultations are currently unavailable for this clinic.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VaccinationSlot;