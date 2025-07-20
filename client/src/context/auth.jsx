import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios"
// Create the context
const AuthContext = createContext(null);

// Create the provider component
export const AuthContextProvider = ({ children }) => {
  const [User,setUser] = useState(null)
  console.log(User)
  const  bakend_ulr = import.meta.env.VITE_BAKEND_URL
  axios.defaults.baseURL = "http://localhost:3010/api"
  axios.defaults.withCredentials = true
  const value = {
  axios,
  User,
  setUser
  };
  const auth =useCallback( async()=>{
    try {
      const {data} = await axios.get("http://localhost:3010/api/Auth")
      if(data.success){
        setUser(data.userData)
      }
    } catch (error) {
      console.log(error)
    }
  })
  useEffect(()=>{
auth()
  },[])
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
