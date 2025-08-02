import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDocAuth } from '../../context/dockAuth'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify'
import { FaCheckToSlot } from "react-icons/fa6";
import { TbMoneybag } from "react-icons/tb";
import { MdAccessTime } from "react-icons/md";
import { Handler } from 'leaflet'

const VaccinationSlot = () => {
    const { name } = useParams()
    const { axios } = useDocAuth()
    const [hostpitalData, setFilterData] = useState([])
    const [names, setname] = useState('')
    const [prices, seTPrices] = useState()
    const [duartion, setDuraion] = useState()
    const [hotPitalId, setHotpitalId] = useState('')
    const [docterDta, setDocterData] = useState([])
    const [hostpitalDatas, sethostpital] = useState([])
    const navigate = useNavigate()
    const [from, setFrom] = useState({
        hospital: '',
        time: '',
        vaccine: ''
    });
    const handlechange = (e) => {
        const { name, value } = e.target
        setFrom({ ...from, [name]: value })
    }
    const { User } = useAuth()
    useEffect(() => {
        if (!name || hostpitalDatas.length === 0) return;
        setname(name)
        const filtered = hostpitalDatas.filter((data) => data._id === name);
        setFilterData(filtered);
    }, [hostpitalDatas]);
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const { data } = await axios.get("/findAllHostpital");
                sethostpital(data.hotData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllData();
    }, [hostpitalData]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // ← move this to the top!
        try {
            if (!from.hospital || !from.time || !from.vaccine) {
                toast.error("❌ Please fill in all fields before submitting.");
                return;
            }
            const { data } = await axios.post("/BookSlot", { from, name });
            if (data.success) {
                toast.success(data.message)
                navigate("/profile  ")
            }
        } catch (error) {
            console.log(error);
        }
    };
    const findDocteeDetail = async () => {
        try {
            const { data } = await axios.post("/findDocterName", { id: name })
            setDocterData(data.dataDoc)

        } catch (error) {
            console.log(error)
        }
    }
    const BookedSlot = async (e) => {
        e.preventDefault()
        try {
            if (!prices) {
                return toast.error("Selecte First Package and Slot ")
            }
            const { data: { order } } = await axios.post("/BookMeetingSlot", { price: prices })
            const { data: { key } } = await axios("/apikeyRazorpay")
            const options = {
                key: key,
                amount: order.amount,
                currency: 'INR',
                name: User.fullName,
                description: 'Test Transaction',
                order_id: order.id,
                handler: async function (response) {
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response
                    const payload = {
                        razorpay_payment_id,
                        razorpay_order_id,
                        razorpay_signature,
                        id: hotPitalId,
                        prices,
                        duartion,

                    }
                    const { data } = await axios.post("/payment-success", payload)
                    console.log(data)
                    if (data.success) {
                        toast.success(data.message)
                        navigate("/profile")
                    }
                },
                prefill: {
                    name: User.fullName,
                    email: User.email,
                    contact: User.Number
                },
                theme: {
                    color: '#4FBF8B'
                },

            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        findDocteeDetail()
    }, [name, docterDta])
    const vaccineOptions = [
        'Hepatitis B (1 Month)',
        'Rotavirus (2 Months)',
        'DTP (6 Months)',
        'MMR (12 Months)',
        'Polio (3 Years)',
        'Varicella (5 Years)',
        'HPV (12 Years)',
        'COVID-19 (16 Years)',
    ];

    return (
        <div className="w-full px-4 py-6 min-h-screen bg-blue-50">
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-blue-600">
                    Dr {docterDta.fname} {docterDta.Mname} {docterDta.lname} Clinic
                </h1>
                {hostpitalData.map((data) => (
                    <h1 key={data.hospitalName} className="text-xl md:text-2xl font-bold text-blue-600 underline">
                        {data.hospitalName}
                    </h1>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row flex-wrap gap-6 justify-center items-start">
                {/* Booking Form */}

                <form className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md" onSubmit={handleSubmit}>
                    <h1 className='text-xl text-blue-500 font-bold'>Book Vaccination slot In this Hostpital </h1>
                    <label className="block mb-2 text-gray-600 font-semibold">Select Hospital</label>
                    <select
                        name="hospital"
                        onChange={handlechange}
                        value={from.hospital}
                        className="w-full mb-4 p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">-- Choose Hospital --</option>
                        {hostpitalData.map((data, idx) => (
                            <option key={idx} value={data.hospitalName}>{data.hospitalName}</option>
                        ))}
                    </select>

                    <label className="block mb-2 text-gray-600 font-semibold">Select Time Slot</label>
                    <input
                        name="time"
                        type="time"
                        onChange={handlechange}
                        value={from.time}
                        className="w-full mb-4 p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="tel"
                        value={User?.Number}
                        readOnly
                        className="w-full mb-4 p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <label className="block mb-2 text-gray-600 font-semibold">Select Vaccine</label>
                    <select
                        name="vaccine"
                        onChange={handlechange}
                        value={from.vaccine}
                        className="w-full mb-6 p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">-- Choose Vaccine --</option>
                        {vaccineOptions.map((vaccine, index) => (
                            <option key={index} value={vaccine}>{vaccine}</option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold"
                    >
                        Book Slot
                    </button>
                </form>
                {/* Online Consultation Section */}
                <div className="bg-white shadow-xl rounded-2xl p-6 w-full lg:max-w-md xl:max-w-lg">
                    {hostpitalData.map((data) =>
                        data.vcallONOff ? (
                            <div key={data.hospitalName}>
                                <h2 className="text-lg font-semibold mb-4 text-blue-700">Book Doctor Consultation</h2>

                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                                    <img
                                        src="/docddata.jpg"
                                        alt="doctor"
                                        className="w-28 h-28 object-cover rounded-full border"
                                    />
                                    <div className="text-center sm:text-left md:px-12 ">
                                        <p className="text-xl font-bold ">
                                            Dr: {docterDta.fname} {docterDta.Mname}  {docterDta.lname}
                                        </p>
                                        <p className="text-gray-700">Pediatrician</p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-gray-700 mb-4">
                                    <div className="flex items-center gap-2">
                                        <MdAccessTime />
                                        <span className='flex gap-2'><strong>Duration:</strong>

                                            {
                                                data.MeetingAvialbleTimeandpakcage.map((daa) => (
                                                    <p className='bg-amber-200 px-2 rounded-2xl  cursor-pointer'>{daa.time}</p>
                                                )

                                                )
                                            }

                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">

                                        <span className='flex justify-center items-center gap-1 p-1 '>  <TbMoneybag /><strong>Price:</strong>
                                            {
                                                data.MeetingAvialbleTimeandpakcage.map((daa) => (
                                                    <div className=' gap-1 '>
                                                        <p className='bg-green-300 flex px-1 py-1 rounded-2xl justify-center items-centerc  cursor-pointer '> ₹   {daa.price} for {daa.time} </p>
                                                    </div>
                                                )

                                                )
                                            }
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaCheckToSlot />
                                        <span><strong>Available Slots:</strong> Sunday Morning, Evening</span>
                                    </div>
                                    <p>Consult your child’s health with a trusted pediatrician.</p>
                                </div>

                                <form className="bg-white rounded-xl p-4 shadow-md w-full" onSubmit={BookedSlot}>
                                    <div className="flex items-center mb-3 text-blue-800 font-semibold text-lg">
                                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        Book Your Slot
                                    </div>
                                    <select className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                                        <option>Select Slot</option>
                                        <option>Morning</option>
                                        <option>Evening</option>
                                    </select>
                                    <select onClick={(e) => seTPrices(e.target.value)} className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                                        <option>Select Package </option>
                                        {
                                            data.MeetingAvialbleTimeandpakcage.map((daa) => (

                                                <option value={daa.price}>₹   {daa.price} for {daa.time}</option>

                                            )

                                            )
                                        }
                                    </select>
                                    <select onClick={(e) => setDuraion(e.target.value)} className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                                        <option>Select Time </option>
                                        {
                                            data.MeetingAvialbleTimeandpakcage.map((daa) => (

                                                <option value={daa.duartion}>{daa.time}</option>

                                            )

                                            )
                                        }
                                    </select>


                                    <button

                                        type='submit'
                                        onClick={() => setHotpitalId(data?._id)}

                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
                                    >
                                        Book Slot
                                    </button>


                                </form>
                            </div>
                        ) : (
                            <div
                                key={data.hospitalName}
                                className="w-full min-h-[180px] flex justify-center items-center text-center"
                            >
                                <p className="text-red-600 text-lg font-medium">
                                    ⚠️ This clinic does not currently support online consultations.
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>


    )
}


export default VaccinationSlot
