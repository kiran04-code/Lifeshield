import React, { useCallback, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { useDocAuth } from '../../../context/dockAuth';
import L from 'leaflet';
import { FaHospital, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const SearchEngine = () => {
  const [selectedVillage, setSelectedVillage] = useState('');
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedHospitalName, setSelectedHospitalName] = useState('');
  const [allHospitals, setAllHospitals] = useState([]);
  const [activeHospital, setActiveHospital] = useState(null);
  const { axios } = useDocAuth();

  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  const handleSearch = () => {
    const result = allHospitals.find((data) => data.hospitalName === selectedHospitalName);
    setActiveHospital(result);
  };

  const filterHospitals = useCallback(() => {
    if (!selectedVillage) {
      setFilteredHospitals([]);
      return;
    }
    const filtered = allHospitals?.filter((data) => data.village === selectedVillage);
    setFilteredHospitals(filtered);
  }, [selectedVillage, allHospitals]);

  useEffect(() => {
    filterHospitals();
  }, [selectedVillage, filterHospitals]);

  const fetchHospitals = async () => {
    try {
      const { data } = await axios.get("/findAllHostpital");
      setAllHospitals(data?.hotData || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const uniqueVillages = [...new Set(allHospitals.map(h => h.village))];

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 md:p-8 bg-white rounded-[2rem] shadow-2xl shadow-blue-100 border border-blue-50">
      <div className="flex flex-col lg:flex-row gap-8">
        
        <div className="w-full lg:w-1/3 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-2">
              <FaSearch className="text-blue-600 text-xl" /> Find Center
            </h2>
            <p className="text-sm text-gray-500 mb-6">Select your location to view available vaccination hospitals.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Area</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                <select
                  value={selectedVillage}
                  onChange={(e) => {
                    setSelectedVillage(e.target.value);
                    setSelectedHospitalName('');
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-blue-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 font-medium appearance-none transition-all"
                >
                  <option value="">All Locations</option>
                  {uniqueVillages.map((village, index) => (
                    <option key={index} value={village}>{village}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Hospital</label>
              <div className="relative">
                <FaHospital className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                <select
                  disabled={!selectedVillage}
                  value={selectedHospitalName}
                  onChange={(e) => setSelectedHospitalName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-blue-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 font-medium appearance-none transition-all disabled:opacity-50"
                >
                  <option value="">-- Choose Hospital --</option>
                  {filteredHospitals?.map((data, index) => (
                    <option key={index} value={data.hospitalName}>{data.hospitalName}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-full bg-[#0D57EC] hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 flex justify-center items-center gap-2"
            >
              Locate on Map
            </button>
          </div>

          {activeHospital && (
            <div className="p-4 bg-green-50 rounded-2xl border border-green-100 animate-in fade-in slide-in-from-bottom-2">
              <p className="text-[10px] font-bold text-green-600 uppercase">Selected Center</p>
              <h4 className="font-bold text-gray-800">{activeHospital.hospitalName}</h4>
              <p className="text-xs text-gray-500">{activeHospital.village}</p>
              <Link to={`/hospital/${activeHospital._id}`} className="inline-block mt-3 text-sm font-bold text-blue-600 hover:underline">
                View Full Profile →
              </Link>
            </div>
          )}
        </div>

        <div className="w-full lg:w-2/3 h-[500px] rounded-3xl overflow-hidden shadow-inner border border-gray-100 relative">
          <MapContainer
            center={[18.5204, 73.8567]}
            zoom={13}
            className="h-full w-full z-0"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {activeHospital?.lat && activeHospital?.lon && (
              <>
                <ChangeView center={[activeHospital.lat, activeHospital.lon]} zoom={16} />
                <Marker position={[activeHospital.lat, activeHospital.lon]}>
                  <Popup>
                    <div className="p-1">
                      <h3 className="font-bold text-blue-700 m-0">{activeHospital.hospitalName}</h3>
                      <p className="text-xs text-gray-500 mb-2">{activeHospital.village}</p>
                      <Link 
                        to={`/hospital/${activeHospital._id}`} 
                        className="bg-blue-600 text-white px-3 py-1 rounded text-[10px] font-bold no-underline inline-block hover:bg-blue-700 transition-colors"
                      >
                        Book Slot
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              </>
            )}
          </MapContainer>
        </div>

      </div>
    </div>
  );
};

export default SearchEngine;