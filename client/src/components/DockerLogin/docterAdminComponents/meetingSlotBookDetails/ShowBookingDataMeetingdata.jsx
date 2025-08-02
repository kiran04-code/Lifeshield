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
    const { data } = await axios.post("/meetdAddToBookMeet",{MeetId,hotId})
    if (data.success) {
      toast.success(data.message)
      value(false)
    }
    else{
       toast.error(data.message)
    }
  }
  return (
    <div onClick={() => value(false)} className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-r bg-[#91a4f867] flex flex-col items-center justify-center">
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

const ProfileOfPatient = ({ value }) => {
  return (
    <div>
      {
        value?.map((data) => (
          <div onClick={() => setView(false)} className="absolute top-70 right-5  bg-white shadow-lg rounded-xl border">
            <div className="w-[400px] bg-[#3c7aff]  rounded-lg shadow-lg p-6">
              <h1 className="text-white text-2xl font-bold text-center mb-6">Patients Profile Info</h1>

              <div className="text-white text-sm space-y-4">
                <p><span className="font-semibold">Name:</span> {data.userBooked?.fullName}</p>
                <p><span className="font-semibold">Phone:</span> {data.userBooked?.Number}</p>
                <p><span className="font-semibold">Email:</span> {data.userBooked?.email}</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>

  );
};

const ShowBookingDataMeeting = () => {
  var [view, setView] = useState(false);
  var [createmeet, setCreateMeet] = useState(false);
  const [DataBooked, setBookeddata] = useState([]);
   const navigate = useNavigate()
  const { axios } = useAuth();

  const FindBookedData = async () => {
    try {
      const { data } = await axios.get("/getAllrespectiveMeetingdata");
      console.log(data);
      setBookeddata(data.meetData);
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
            <th className="py-3 px-4 text-left">View</th>
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
                data.MeetId === 'false'? <button
                  onClick={() => setCreateMeet(!createmeet)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  createMeet
                </button>: <button
                  onClick={() =>navigate(`/Room/${data.MeetId}`) }
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Join
                </button>
               }
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => setView(!view)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {/* Conditional Profile Display */}

      {view && <ProfileOfPatient value={DataBooked} />}
      {createmeet ? <CretaeMeeing value={setCreateMeet} /> : null}
    </div>
  );
};

export default ShowBookingDataMeeting;


