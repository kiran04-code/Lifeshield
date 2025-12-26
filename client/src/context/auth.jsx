import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios"
// Create the context
const AuthContext = createContext(null);

// Create the provider component
export const AuthContextProvider = ({ children }) => {
  const [User,setUser] = useState(null)
  const  bakend_ulr = import.meta.env.VITE_BAKEND_URL
  axios.defaults.baseURL = bakend_ulr
  axios.defaults.withCredentials = true
  const value = {
  axios,
  User,
  setUser
  };
  const auth = useCallback( async()=>{   
    try {
      const {data} = await axios.get("/Auth")
      if(data.success){
        setUser(data.userData)
      }
    } catch (error) {
      console.log(error)
    }
  },[])
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
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
