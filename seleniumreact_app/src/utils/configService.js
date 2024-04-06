const fetchConfig = async () => {
    try {
      const response = await fetch("/config.json");
      const config = await response.json();
      return config;
    } catch (error) {
      console.error("Error fetching config:", error);
      return null;
    }
  };
  
  export const getConfig = async () => {
    const config = await fetchConfig();
    return config;
  };
  
  export const getBaseUrl = async () => {
    const config = await getConfig();
    return config ? config.REACT_APP_BASE_URL || "/api" : "/api";
  };

  export const getCoreEngineBaseUrl = async () => {
    const config = await getConfig();
    console.log("config",config)
    return config ? config.coreEngineBaseUrl || "" : "";
  };
  