import { createContext, useContext, useState } from "react";
import axios from "axios"
// Create the context
const AuthContext = createContext(null);

// Create the provider component
export const AuthContextProvider = ({ children }) => {
  const [User,setUser] = useState(null)
  const  bakend_ulr = import.meta.env.VITE_BAKEND_URL
  console.log(bakend_ulr)
  axios.defaults.baseURL = "http://localhost:3001/api"
  axios.defaults.withCredentials = true
  const value = {
  axios,
  User,
  setUser
  };
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
