import { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext(null);

// Create the provider component
export const AuthContextProvider = ({ children }) => {
  const value = {
  
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
