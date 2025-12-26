import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
const DocAuthContext = createContext(null);

export const DocAuthContextProvider = ({ children }) => {
  const [docterdata, setDockterData] = useState(null);
  const [hostpitaldata, sethostpitaldata] = useState(null);
  const [hostpitaldataworkspace, sethostpitaldataworkspace] = useState(null);

  const bakend_ulr = import.meta.env.VITE_BAKEND_URL;

  axios.defaults.baseURL = bakend_ulr;
  axios.defaults.withCredentials = true;

  const auth = useCallback(async () => {
    try {
      const { data } = await axios.get("/authdocter");
      if (data.success) {
        setDockterData(data.userData);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const hotdataauth = useCallback(async () => {
    try {
      const { data } = await axios.get("/getResterData");
      if (data.success) {
        sethostpitaldataworkspace(data.hotData);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const hostAuth = useCallback(async () => {
    try {
      const { data } = await axios.get("/docterhostpital");
      if (data?.hostData) {
        sethostpitaldata(data.hostData);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // ✅ RUN ONLY ONCE
  useEffect(() => {
    auth();
    hotdataauth();
    hostAuth();
  }, [auth, hotdataauth, hostAuth]);

  const value = {
    axios,
    docterdata,
    setDockterData,
    hostpitaldata,
    sethostpitaldata,
    hostpitaldataworkspace,
    hotdataauth,
  };

  return (
    <DocAuthContext.Provider value={value}>
      {children}
    </DocAuthContext.Provider>
  );
};

// Custom hook
export const useDocAuth = () => {
  return useContext(DocAuthContext);
};
