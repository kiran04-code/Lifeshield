import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Axios from "axios"; // 👈 alias import

// Create context
const AuthContext = createContext(null);

// Create axios instance BUT keep name axios
const axios = Axios.create({
  baseURL: import.meta.env.VITE_BAKEND_URL,
  withCredentials: true,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = useCallback(async () => {
    try {
      const { data } = await axios.get("/Auth");
      if (data?.success) {
        setUser(data.userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    auth();
  }, [auth]);

  const value = useMemo(
    () => ({
      axios, // 👈 same name everywhere
      user,
      setUser,
      loading,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => useContext(AuthContext);
