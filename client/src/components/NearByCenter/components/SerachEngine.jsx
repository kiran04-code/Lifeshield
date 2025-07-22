
import React, { useState } from 'react';
import { hospitalList } from '../../../assets/assets';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const SerachEngine = () => {
    const [location, setLocation] = useState('');
    const [hospital, setHospital] = useState('');
    const {datahostpital,setdatahostpital} = useState()
    const handleSearch = () => {
        console.log("Location:", location);
        console.log("Hospital:", hospital);
    };
    const hostpitallits = hospitalList.filter((data) => data.location === location)
    const hostdata =  hospitalList.filter((data) => data.name === hospital)
     hostdata.map((data)=>
      console.log(data)
    )
    
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
                    <option value="Shivajinagar">Shivaji Nagar</option>
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
                    {
                        hostpitallits.map((data) => (
                            <option value="Siddhivinayak Hospital">{data.name}</option>
                        ))
                    }
                </select>
            </div>

            <button
                onClick={handleSearch}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-md font-medium"
            >
                Search
            </button>

        </div>
    );
};

export default SerachEngine;

