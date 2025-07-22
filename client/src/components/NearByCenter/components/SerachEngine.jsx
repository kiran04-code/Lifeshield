import React, { useState } from 'react';
import { hospitalList } from '../../../assets/assets';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SerachEngine = () => {
  const [location, setLocation] = useState('');
  const [hospital, setHospital] = useState('');
  const [datahostpital, setdatahostpital] = useState([]);

  const handleSearch = () => {
    const result = hospitalList.filter((data) => data.name === hospital);
    setdatahostpital(result);
  };

  const hostpitallits = hospitalList.filter((data) => data.location === location);

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
          <option value="Kondhwa">Kondhwa</option>
          <option value="Hadapsar">Hadapsar</option>
          <option value="Shivajinagar">Shivajinagar</option>
          <option value="Bibwewadi">Bibwewadi</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Choose Hospital:</label>
        <select
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
          className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
        >
          <option value="">-- Select Hospital --</option>
          {hostpitallits.map((data) => (
            <option key={data.name} value={data.name}>{data.name}</option>
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
          center={datahostpital[0] ? [datahostpital[0].lat, datahostpital[0].lon] : [18.5204, 73.8567]}
          zoom={13}
          className="h-96 w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {datahostpital.map((data) => (
            <Marker key={data.id} position={[data.lat, data.lon]}>
              <Popup >
                {data.name} <br /> {data.location} <Link to ={`/hospital/${data.name}`} className='underline    '>MoreInfo</Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default SerachEngine;
