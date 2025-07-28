import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDocAuth } from '../../context/dockAuth'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify'

const VaccinationSlot = () => {
    const { name } = useParams()
    const { axios } = useDocAuth()
    const [hostpitalData, setFilterData] = useState([])
    const [hostpitalDatas, sethostpital] = useState([])
    const navigate =  useNavigate()
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
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // ← move this to the top!
        console.log(from);
        try {
            if (!from.hospital || !from.time || !from.vaccine) {
                toast.error("❌ Please fill in all fields before submitting.");
                return;
            }
            const { data } = await axios.post("/BookSlot", {from,name});
            if(data.success){
                toast.success(data.message)
                navigate("/profile  ")
            }
        } catch (error) {
            console.log(error);
        }
    };

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
        <div className=''>

            <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4 ju">

                <form className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md" onSubmit={handleSubmit}>
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
            </div>
        </div>
    )
}


export default VaccinationSlot
