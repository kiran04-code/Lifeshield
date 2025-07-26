import React, { useCallback, useEffect, useState } from 'react';
import { hospitalList } from '../../../assets/assets';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { useMap } from 'react-leaflet';
import { useDocAuth } from '../../../context/dockAuth';
const SerachEngine = () => {
  const [location, setLocation] = useState('');
  const [hospital, setHospital] = useState([]);
  const [datahostpital, setdatahostpital] = useState('');
  const [hotpiltalallfind, sethotpiltalallfind] = useState()
  const [datahost, setDataHots] = useState([])
  const { axios } = useDocAuth()
  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  const handleSearch = () => {
    const result = hotpiltalallfind.find((data) => data.hospitalName === datahostpital);
    setDataHots(result)
  };
  const findinghotpital = useCallback(() => {
    const filtterhostpital = hotpiltalallfind?.filter((data, index) => data.village === location)
    setHospital(filtterhostpital)
  }, [location])
  useEffect(() => {
    findinghotpital()
  }, [location])
  const finallhost = async () => {
    try {
      const { data } = await axios.get("/findAllHostpital")
      sethotpiltalallfind(data?.hotData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    finallhost()
  }, [])
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Choose Location:</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
        >
          <option value="">-- Select Location --</option>
          {/* {
            hotpiltalallfind?.map((data, index) => (
              <option value={data.village}>{data.village}</option>
            ))
          } */}
          <option value="Katraj">Katraj</option>
          <option value="kondhwa">kondhwa </option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Choose Hospital:</label>
        <select
          value={datahostpital}
          onChange={(e) => setdatahostpital(e.target.value)}
          className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
        >
          <option value="">-- Select Hospital --</option>
          {hospital?.map((data) => (
            <option value={data.hospitalName}>{data.hospitalName}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="w-full bg-[#0D57EC] hover:bg-blue-800 text-white py-2 rounded-md font-medium"
      >
        Search
      </button>

      <div className="mt-6">

        <MapContainer
          center={datahostpital?.lat && datahostpital?.lon ? [datahostpital.lat, datahostpital.lon] : [18.5204, 73.8567]}
          zoom={13}
          className="h-96 w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Auto zoom and pan to location when available */}
          {datahost?.lat && datahost?.lon && (
            <>
              <ChangeView center={[datahost.lat, datahost.lon]} zoom={16} />
              <Marker key={datahost._id} position={[datahost.lat, datahost.lon]}>
                <Popup>
                  {datahost.hospitalName} <br /> {datahost.village}{" "}
                  <Link to={`/hospital/${datahost._id}`} className="underline">
                    MoreInfo
                  </Link>
                </Popup>
              </Marker>
            </>
          )}
        </MapContainer>

      </div>
    </div>
  );
};

export default SerachEngine;
