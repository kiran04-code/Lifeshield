import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../context/auth';

// Capitalize the component name
const ProfileOfPatient = ({ value }) => {
  return (
    <div>
      {
        value?.map((data) => (
          <div onClick={() => setView(false)} className="absolute top-70 right-5  bg-white shadow-lg rounded-xl border">
            <div className="w-[400px] bg-[#3c7aff]  rounded-lg shadow-lg p-6">
              <h1 className="text-white text-2xl font-bold text-center mb-6">Patients Profile Info</h1>

              <div className="text-white text-sm space-y-4">
                <p><span className="font-semibold">Name:</span> {data.UsercreatedBy?.fullName}</p>
                <p><span className="font-semibold">Phone:</span> {data.UsercreatedBy?.Number}</p>
                <p><span className="font-semibold">Email:</span> {data.UsercreatedBy?.email}</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>

  );
};

const ShowBooking = () => {
  var [view, setView] = useState(false);
  const [DataBooked, setBookeddata] = useState([]);
  const { axios } = useAuth();

  const FindBookedData = async () => {
    try {
      const { data } = await axios.get("/BookingDataForDockter");
      console.log(data);
      setBookeddata(data.BookingData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleStatusUpdate = async (id, status) => {
    try {
      const { data } = axios.post("/handleStatusUpdate", { id, status })
      FindBookedData()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    FindBookedData();
  }, []); // remove DataBooked from dependency to avoid infinite loop

  return (
    <div className=""  >
      <table className="w-[750px] border border-gray-300 shadow-md rounded-2xl">
        <thead className="rounded-t-4xl">
          <tr className="bg-[#115df5] text-white text-[12px] whitespace-nowrap ">
            <th className="py-3 px-4 text-left">Sr No.</th>
            <th className="py-3 px-4 text-left">Patients Name</th>
            <th className="py-3 px-4 text-left">Booking Time</th>
            <th className="py-3 px-4 text-left">Vaccine Name</th>
            <th className="py-3 px-4 text-left">Patient Number</th>
            <th className="py-3 px-4 text-left">Action</th>
            <th className="py-3 px-4 text-left">View</th>
          </tr>
        </thead>
        <tbody className="text-[13px] text-gray-700">
          {DataBooked.map((data, index) => (
            <tr key={index} className="border-t relative">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{data.UsercreatedBy?.fullName}</td>
              <td className="py-3 px-4">{data.SlotTime} AM</td>
              <td className="py-3 px-4">{data.Vname}</td>
              <td className="py-3 px-4">{data.UsercreatedBy?.Number}</td>
              <td className="py-3 px-4 space-x-2 flex gap-2">
                {data.status === "Pending" ? (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(data._id, 'Accepted')}
                      className="bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(data._id, 'Rejected')}
                      className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className={`px-3 py-1 rounded text-sm font-semibold ${data.status === 'Accepted' ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {data.status}
                  </span>
                )}
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
    </div>
  );
};

export default ShowBooking;
