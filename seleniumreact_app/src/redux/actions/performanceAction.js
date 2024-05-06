import axios from "axios";
import { toast } from "react-toastify";
import { header, headerForm } from "../../utils/authheader";
import { getBaseUrl } from "../../utils/configService";
export const GET_LOC_COUNT = "GET_LOC_COUNT";
export const GET_USER_COUNT = "GET_USER_COUNT";
export const IS_USER_OR_DURATION_ZERO = "IS_USER_OR_DURATION_ZERO";
export const LOCATION_OPTIONS = "LOCATION_OPTIONS";
export const USED_LOCATION = "USED_LOCATION";
export const SET_SUITE_ID = "SET_SUITE_ID";
export const SET_SCENARIO_ID = "SET_SCENARIO_ID";
export const SET_SCENARIOS = "SET_SCENARIOS";
export const SET_EXPANDED_NODE = "SET_EXPANDED_NODE";
export const EXPAND_PARENT = "EXPAND_PARENT";
// const BASE_URL = process.env.REACT_APP_BASE_URL;

export const setSuiteId = (suitId)=>{
  console.log("suit id ",suitId)
  return {
    type: SET_SUITE_ID,
    payload: suitId,
  };
}
export const setExpandedNodes = (id)=>{
  return {
    type: SET_EXPANDED_NODE,
    payload: id,
  };
}

export const ExpandParent = (id)=>{
  return {
    type: EXPAND_PARENT,
    payload: id,
  };
}
export const GetLocationScenarioVUCount = (testList) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      let totalUserCount = 0;
      let totalLocationCount = 0;
      let isUserOrDurationZero = false;
      let usedLocations = []
      await Promise.all(
        testList.map(async (test) => {
          const loadRes = await axios.get(
            `${BASE_URL}/Performance/GetLoadByPerformanceFileId?PerformanceFileId=${test.id}`,
            header()
          );
          const locationRes = await axios.get(
            `${BASE_URL}/Performance/GetLocationByPerformanceFileId?PerformanceFileId=${test.id}`,
            header()
          );
          const locCount = Array.isArray(locationRes.data)
            ? locationRes.data.length
            : 0;
          const userCount = Array.isArray(loadRes.data)
            ? loadRes.data[0].TotalUsers
            : 0;
          if(Array.isArray(locationRes.data)){
            locationRes.data.forEach((loc)=>{
              usedLocations.push(loc.Name)
            })
          }
          // Check if the user count or duration is zero for any test
          if (userCount === 0 || loadRes.data[0].DurationInMinutes === 0) {
            isUserOrDurationZero = true;
            // Dispatch toast warning
            // toast.warn("User or duration is zero for a test");
          }

          totalUserCount += userCount;
          totalLocationCount += locCount;
        })
      );

      // Dispatch the sums and isUserOrDurationZero status
      dispatch({
        type: GET_USER_COUNT,
        payload: totalUserCount,
      });
      dispatch({
        type: GET_LOC_COUNT,
        payload: totalLocationCount,
      });
      dispatch({
        type: IS_USER_OR_DURATION_ZERO,
        payload: isUserOrDurationZero, // Set to false if no test has zero user or duration
      });
      dispatch({
        type: USED_LOCATION,
        payload: usedLocations,
      });
    } catch (error) {
      toast.error("Network Error in locuvcount");
    }
  };
};

export const GetUsedLocation = () => {
  return async (dispatch, getState) => {
    try {
      const BASE_URL = await getBaseUrl();
      const { scenarios } = getState().performance;
      
      // Extract scenario IDs
      const scenarioIds = scenarios.map(test => test.id);

      // Batch requests to fetch location data for all scenarios
      const locationRequests = scenarioIds.map(scenarioId =>
        axios.get(`${BASE_URL}/Performance/GetLocationByPerformanceFileId?PerformanceFileId=${scenarioId}`, header())
      );

      // Execute requests concurrently
      const locationResponses = await Promise.all(locationRequests);

      // Extract used locations from responses
      const usedLocations = locationResponses.reduce((locations, response) => {
        if (Array.isArray(response.data)) {
          response.data.forEach(loc => {
            locations.push(loc.Name);
          });
        }
        return locations;
      }, []);

      // Dispatch action to update Redux store with used locations
      dispatch({
        type: USED_LOCATION,
        payload: usedLocations,
      });
    } catch (error) {
      console.error("Error fetching used locations:", error);
      toast.error("Network error");
    }
  };
};

export const GetLocationOptions = () => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.get(
        `${BASE_URL}/Performance/GetLocationList`,
        header()
      );
      if(Array.isArray(response.data))
        dispatch({ type: LOCATION_OPTIONS, payload: response.data });
    } catch (error) {
      toast.error("Network error location options");
    }
  };
};

export const setScenarioId = (id) => {
  console.log("scenario id in action", id);
  return {
    type: SET_SCENARIO_ID,
    payload: id,
  };
};

export const setScenarios = (testList) => {
  return {
    type: SET_SCENARIOS,
    payload: testList,
  };
};

// for test data

