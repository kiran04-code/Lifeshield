import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../context/auth';
import { useDocAuth } from '../../../../context/dockAuth';
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom';
// Capitalize the component name
const CretaeMeeing = ({ value }) => {
  const { hostpitaldataworkspace, axios } = useDocAuth()
  const [hotId, setHotId] = useState('')
  const [MeetId, setMeetId] = useState('')
  useEffect(() => {
    setHotId(hostpitaldataworkspace._id)
  }, [hostpitaldataworkspace])
  const hnadleSubmiit = async (e) => {
    e.preventDefault()
    const { data } = await axios.post("/meetdAddToBookMeet", { MeetId, hotId, orderid:value.orderId })
    if (data.success) {
      toast.success(data.message)
      value.setCreateMeet(false)
    }
    else {
      toast.error(data.message)
    }
  }
  return (
    <div onClick={() => value.setCreateMeet(false)} className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-r bg-[#91a4f867] flex flex-col items-center justify-center">
      <form action="" onSubmit={hnadleSubmiit} onClick={(e) => e.stopPropagation()} >
        <div className="bg-white shadow-lg rounded-2xl p-8 w-80 flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-semibold text-blue-600">create a Instance Room</h2>
          <input
            type="text"
            onChange={(e) => setMeetId(e.target.value)}
            placeholder="Enter Room Code"
            value={MeetId}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button type='submit' className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300">
            Create
          </button>
          <label className='text-[15px] p-2 px-5 text-nowrap bg-blue-200  rounded-2xl'>Create a Room ID to invite others.</label>
        </div>
      </form>

    </div>
  );
};



const ShowBookingDataMeeting = () => {
  var [orderId, setOrderId] = useState("");
  var [createmeet, setCreateMeet] = useState(false);
  const [DataBooked, setBookeddata] = useState([]);
  const [hotId, setHotId] = useState('')
    const { hostpitaldataworkspace, axios } = useDocAuth()
  useEffect(() => {
    setHotId(hostpitaldataworkspace._id)
  }, [hostpitaldataworkspace])

  const navigate = useNavigate()

  const FindBookedData = async () => {
    try {
      const { data } = await axios.get("/getAllrespectiveMeetingdata");
      console.log(data);
      setBookeddata(data.meetData);
    } catch (error) {
      console.log(error);
    }
  };
  const MeetComplted = async (MeetId) => {
    try {
      const { data } = await axios.post("/MeetComplted",{orderId:orderId,MeetId});
     if(data.success){
      toast.success(data.message)
     }
     else{
      toast.error(data.message)
     }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FindBookedData();
  }, [DataBooked]);

  return (
    <div className="relative"  >
      <table className="   w-[750px] border border-gray-300 shadow-md rounded-2xl">
        <thead className="rounded-t-4xl">
          <tr className="bg-[#115df5] text-white text-[12px] whitespace-nowrap ">
            <th className="py-3 px-4 text-left">Sr No.</th>
            <th className="py-3 px-4 text-left">Patients Name</th>
            <th className="py-3 px-4 text-left">Booking Time</th>
            <th className="py-3 px-4 text-left">Emmail</th>
            <th className="py-3 px-4 text-left">Patient Number</th>
            <th className="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="text-[13px] text-gray-700">
          {DataBooked?.map((data, index) => (
            <tr key={index} className="border-t relative">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{data.userBooked?.fullName}</td>
              <td className="py-3 px-4">{data.duration} </td>
              <td className="py-3 px-4">{data.userBooked.email}</td>
              <td className="py-3 px-4">{data.userBooked?.Number}</td>
              <td className="py-3 px-4 space-x-2 flex gap-2">
                {
                  data.MeetId === 'false' ? <button
                    onClick={() => {setCreateMeet(!createmeet); setOrderId(data._id) }}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    createMeet
                  </button> :<div className='flex gap-1'>
                    {

                      data.MeetId === "complete" ?<button
                    
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Completed
                  </button>:<div className='flex gap-2'><button
                    onClick={() => navigate(`/Room/${data.MeetId}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Join
                  </button>
                  <button
                    onClick={()=>{setOrderId(data._id);MeetComplted("complete")}}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Complete
                  </button></div>
                    }
                  
                  </div>
                }
              </td>
             
            </tr>
          ))}
        </tbody>

      </table>

      {/* Conditional Profile Display */}

      
      {createmeet ? <CretaeMeeing value={{setCreateMeet,orderId}} /> : null}
    </div>
  );
};

export default ShowBookingDataMeeting;


