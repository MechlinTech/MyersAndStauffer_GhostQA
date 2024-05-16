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

// export const getVideoUrl = async () => {
//   const config = await getConfig();
//   return config ? config.REACT_TESTSUITE_VIDEO_URL || "" : "";
// };

export const getVideoUrl = async () => {
  const config = await getConfig();
  console.log("config",config)
  if (config) {
      const videoUrl = config.REACT_TESTSUITE_VIDEO_URL;
      if (videoUrl && videoUrl.trim() !== "") {
          return videoUrl;
      }
  }
  return `http://${window.location.host}`;
};



export const getImageUrl = async () => {
  // const config = await getConfig();
  // return config ? config.REACT_TESTSUITE_IMAGE_URL || "" : "";
  const config = await getConfig();
  console.log("config",config)
  if (config) {
      const imageUrl = config.REACT_TESTSUITE_IMAGE_URL;
      if (imageUrl && imageUrl.trim() !== "") {
          return imageUrl;
      }
  }
  return `http://${window.location.host}`;
};

export const getCoreEngineBaseUrl = async () => {
  const config = await getConfig();
  return config ? config.coreEngineBaseUrl || "" : "";
};
