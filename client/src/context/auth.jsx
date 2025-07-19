import { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext(null);

// Create the provider component
export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLOG] = useState(false);
  console.log(isLogin)
  const value = {
    isLogin,
    setIsLOG,
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
