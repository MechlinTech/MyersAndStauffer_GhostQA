import axios from "axios";
import { toast } from "react-toastify";
import { header } from "../../utils/authheader";
import { getBaseUrl, getCoreEngineBaseUrl } from "../../utils/configService";

export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
export const ADD_LOCATION = "ADD_LOCATION";
export const UPDATE_LOCATION = "UPDATE_LOCATION";
export const DELETE_LOCATION = "DELETE_LOCATION";
export const GET_LOCATION_LISTS = "GET_LOCATION_LISTS";
export const DELETE_LOCATION_SETTING = "DELETE_LOCATION_SETTING";
export const ADD_LOCATION_SETTING = "ADD_LOCATION_SETTING";
export const GET_AGENTS_LISTS = "GET_AGENTS_LISTS";
export const ADD_AGENTS = "ADD_AGENTS";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

export const GetLocationData = (PerformanceFileId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });

    try {
      const BASE_URL = await getBaseUrl(); // Assuming getBaseUrl() is a function to get the base URL
      const response = await axios.get(
        `${BASE_URL}/Performance/GetLocationByPerformanceFileId?PerformanceFileId=${PerformanceFileId}`,
        header()
      );
      const loadRes = await axios.get(
        `${BASE_URL}/Performance/GetLoadByPerformanceFileId?PerformanceFileId=${PerformanceFileId}`,
        header()
      );
      const loadData = loadRes.data;
      const resData = response.data;

      let totalUsers = 0;
      let totalTraficPercent = 0;
      let locationData = [];

      if (Array.isArray(loadData)) {
        totalUsers = loadData[0].TotalUsers;
        if (Array.isArray(resData)) {
          console.log("inside array");
          locationData = resData;
          totalTraficPercent = resData.reduce(
            (sum, data) => sum + data?.PercentageTraffic,
            0
          );
        }
      }
      // else{
      //   toast.warn("First add user for this scenario")
      // }
      dispatch({
        type: FETCH_DATA_SUCCESS,
        payload: { totalUsers, totalTraficPercent, locationData },
      });
    } catch (error) {
      dispatch({
        type: FETCH_DATA_FAILURE,
        payload: { error: error.message },
      });
      toast.error("Network Error in location");
    }
  };
};
export const updateLocation = (payload) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Performance/UpdateLoaction`,
        payload,
        header()
      );
      // if (res.data.status === "success") {
      //   toast.info("Successfully saved", {
      //     style: {
      //       background: "rgb(101, 77, 247)",
      //       color: "rgb(255, 255, 255)",
      //     },
      //   });

      //   // Update propertyList after successful submission
      //   // fetchData();
      // } else {
      //   toast.error("Submitting error");
      // }
      dispatch({ type: UPDATE_LOCATION, payload: payload });
    } catch (error) {
      console.log("error saving ", error);
      toast.error("Network error");
    }
  };
};
export const submitLocation = (payload) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Performance/AddLocation`,
        payload,
        header()
      );
      console.log("res", res);
      if (res.data.status === "success") {
        toast.info("Successfully saved", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });

        // Update LOCATIONDATA after successful submission
        dispatch({ type: ADD_LOCATION, payload: res.data.Data });
      } else {
        toast.error("Submitting error");
      }
    } catch (error) {
      console.log("error saving ", error);
      toast.error("Network error");
    }
  };
};
export const deleteLocation = (locationId) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Performance/DeleteLocation?Id=${locationId}`,
        header()
      );

      if (res.data.status === "success") {
        toast.info("Successfully deleted", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });

        // Update propertyList after successful deletion
        dispatch({ type: DELETE_LOCATION, payload: locationId });
      }
    } catch (error) {
      console.log("error deleting ", error);
      toast.error("Network error");
    }
  };
};

// coreEngineBaseUrl is used to make api call for loaction

export const getLocationList = () => {
  return async (dispatch) => {
    try {
      const CORE_BASE_URL = await getCoreEngineBaseUrl();
      const response = await axios.get(
        `${CORE_BASE_URL}/codeengine/api/private-location/`,
        header()
      );
      dispatch({
        type: GET_LOCATION_LISTS,
        payload: response?.data?.results,
      });
    } catch (error) {
      console.error("Error in getTestSuites:", error);
    }
  };
};

export const AddLocationSettings = (data, onClose, resetFormAndState) => {
  return async (dispatch) => {
    try {
      const CORE_BASE_URL = await getCoreEngineBaseUrl();
      const response = await axios.post(
        `${CORE_BASE_URL}/codeengine/api/private-location/`,
        data,
        header()
      );
      console.log("res", response);
      if (response.status === 201) {
        toast.info("Successfully saved", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });

        // Update LOCATIONDATA after successful submission
        dispatch(getLocationList());
        onClose();
        resetFormAndState();
      } else {
        console.log("Submitting error");
      }
    } catch (error) {
      console.log("error saving ", error);
    }
  };
};

export const deleteLocationOnSettings = (refId, setopenDelModal) => {
  return async (dispatch) => {
    try {
      const CORE_BASE_URL = await getCoreEngineBaseUrl();
      const response = await axios.delete(
        `${CORE_BASE_URL}/codeengine/api/private-location/${refId}`,
        header()
      );
      console.log("response", response);
      // if (response.data.status == 301) {
      toast.info("Successfully deleted", {
        style: {
          background: "rgb(101, 77, 247)",
          color: "rgb(255, 255, 255)",
        },
      });
      setopenDelModal(false);

      // Update propertyList after successful deletion
      dispatch({ type: DELETE_LOCATION_SETTING, payload: refId });
      // }
    } catch (error) {
      console.log("error deleting ", error);
      setopenDelModal(false);
    }
  };
};

export const AddLocationAgent = (data, setShowDockerCommand) => {
  return async (dispatch) => {
    try {
      const CORE_BASE_URL = await getCoreEngineBaseUrl();
      const response = await axios.post(
        `${CORE_BASE_URL}/codeengine/api/remote-agent-connection/`,
        data,
        header()
      );
      console.log("resAddLocationAgent", response);
      if (response.status === 201) {
        toast.info("Successfully saved", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });

        // Update LOCATIONDATA after successful submission
        if (response.status === 201) {
          dispatch(getLocationList());
          dispatch({
            type: ADD_AGENTS,
            payload: response?.data,
          });
          setShowDockerCommand(true);
        }
      } else {
        console.log("Submitting error");
      }
    } catch (error) {
      console.log("error saving ", error);
    }
  };
};

export const getAgentById = (id) => {
  return async (dispatch) => {
    try {
      const CORE_BASE_URL = await getCoreEngineBaseUrl(id);
      const response = await axios.get(
        `${CORE_BASE_URL}/codeengine/api/private-location/agent_details/?location=${id}`,
        header()
      );
      console.log("response", response);
      dispatch({
        type: GET_AGENTS_LISTS,
        payload: response?.data?.message,
      });
    } catch (error) {
      console.error("Error in getTestSuites:", error);
    }
  };
};
