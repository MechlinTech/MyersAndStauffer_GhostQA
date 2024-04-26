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

  export const getVideoUrl = async () => {
    const config = await getConfig();
    return config ? config.REACT_TESTSUITE_VIDEO_URL || "" : "";
  };

  export const getImageUrl = async () => {
    const config = await getConfig();
    return config ? config.REACT_TESTSUITE_IMAGE_URL || "" : "";
  };

  export const getCoreEngineBaseUrl = async () => {
    const config = await getConfig();
    return config ? config.coreEngineBaseUrl || "" : "";
  };
  