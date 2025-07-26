import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios"
// Create the context
const DocAuthContext = createContext(null);

// Create the provider component
export const DocAuthContextProvider = ({ children }) => {
  const [docterdata,setDockterData] = useState({})
  const [hostpitaldata,sethostpitaldata] = useState(null)
  const  bakend_ulr = import.meta.env.VITE_BAKEND_URL
  axios.defaults.baseURL = bakend_ulr
  axios.defaults.withCredentials = true
  const value = {
  axios, 
  docterdata,
  setDockterData,
  hostpitaldata,
  sethostpitaldata
  };
 const auth = async()=>{
    const {data} = await axios.get("/authdocter")
    if(data.success){
     setDockterData(data.userData)
    }
 }
 const hostAuth = async()=>{
 try {
  const {data} = await axios.get("/docterhostpital")
  if (data?.hostData) {
  sethostpitaldata(data.hostData);
}
 } catch (error) {
 console.log(error)
 }
 }
 console.log(hostpitaldata)
useEffect(()=>{
auth()
},[])
useEffect(()=>{
hostAuth()
},[docterdata])
  return (
    <DocAuthContext.Provider value={value}>
      {children}
    </DocAuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useDocAuth = () => {
  return useContext(DocAuthContext);
};
