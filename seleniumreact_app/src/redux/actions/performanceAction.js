import axios from "axios";
import { toast } from "react-toastify";
import { header } from "../../utils/authheader";
export const GET_LOC_COUNT = "GET_LOC_COUNT";
export const GET_USER_COUNT = "GET_USER_COUNT";
export const RESET_USER_COUNT = "RESET_USER_COUNT";
export const RESET_LOC_COUNT = "RESET_LOC_COUNT";
export const SCENARIO_COUNT = "SCENARIO_COUNT";
const BASE_URL = process.env.REACT_APP_BASE_URL;



export const GetLocationScenarioVUCount = (testId)=>{

  return async (dispatch)=>{
    try {
      const BASE_URL = await getBaseUrl();
      const loadRes = await axios.get(
        `${BASE_URL}/Performance/GetLoadByPerformanceFileId?PerformanceFileId=${testId}`,
        header()
      );
      const locationRes = await axios.get(
        `${BASE_URL}/Performance/GetLocationByPerformanceFileId?PerformanceFileId=${testId}`,
        header()
      );
      const locCount = Array.isArray(locationRes.data)
        ? locationRes.data.length
        : 0;
      const userCount = Array.isArray(loadRes.data)
        ? loadRes.data[0].TotalUsers
        : 0;
      dispatch({
        type: GET_USER_COUNT,
        payload: userCount,
      });
      dispatch({
        type: GET_LOC_COUNT,
        payload: locCount,
      });
    } catch (error) {
      toast.error("Network error");
    }
  };
};

export const getScenarioCount = (rootId)=>{

  return async (dispatch)=>{
    try {
      const response = await axios.get(
        `${BASE_URL}/Performance/GetPerformanceFileByRootId?RootId=${rootId}`,
        header()
      );
      const totalScenario = response.data == "" ? 0 : response.data.length;
      dispatch({
        type:SCENARIO_COUNT,
        payload:totalScenario
      })
    }catch (error) {
      toast.error('Network error')
    }
  }
}

export const ResetLocationScenarioVUCount = ()=>{

  return async (dispatch)=>{
    dispatch({
      type: RESET_USER_COUNT,
      payload: 0,
    });
    dispatch({
      type: RESET_LOC_COUNT,
      payload: 0,
    });
  };
};
