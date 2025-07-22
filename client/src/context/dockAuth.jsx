import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios"
// Create the context
const DocAuthContext = createContext(null);

// Create the provider component
export const DocAuthContextProvider = ({ children }) => {
  const [docterdata,setDockterData] = useState({})
  const  bakend_ulr = import.meta.env.VITE_BAKEND_URL
  axios.defaults.baseURL = bakend_ulr
  axios.defaults.withCredentials = true
  const value = {
  axios, 
  docterdata,
  setDockterData
  };
 const auth = async()=>{
    const {data} = await axios.get("/authdocter")
    if(data.success){
     setDockterData(data.userData)
    }
 }
 console.log(docterdata)
useEffect(()=>{
auth()
},[])
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
