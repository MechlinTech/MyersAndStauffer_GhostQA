import axios from "axios";
import { toast } from "react-toastify";
import { header } from "../../utils/authheader";
import { getBaseUrl } from "../../utils/configService";
export const GET_LOC_COUNT = "GET_LOC_COUNT";
export const GET_USER_COUNT = "GET_USER_COUNT";
export const RESET_USER_COUNT = "RESET_USER_COUNT";
export const RESET_LOC_COUNT = "RESET_LOC_COUNT";
export const SCENARIO_COUNT = "SCENARIO_COUNT";
export const IS_USER_OR_DURATION_ZERO = "IS_USER_OR_DURATION_ZERO";

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const SET_SCENARIO_ID = "SET_SCENARIO_ID"
export const SET_SCENARIOS = "SET_SCENARIOS"
// const BASE_URL = process.env.REACT_APP_BASE_URL;



// export const GetLocationScenarioVUCount = (testList) => {
//   return async (dispatch) => {
//     try {
//       const BASE_URL = await getBaseUrl();
//       let totalUserCount = 0;
//       let totalLocationCount = 0;

//       await Promise.all(testList.map(async (test) => {
//         const loadRes = await axios.get(
//           `${BASE_URL}/Performance/GetLoadByPerformanceFileId?PerformanceFileId=${test.id}`,
//           header()
//         );
//         const locationRes = await axios.get(
//           `${BASE_URL}/Performance/GetLocationByPerformanceFileId?PerformanceFileId=${test.id}`,
//           header()
//         );
//         console.log(loadRes)
//         const locCount = Array.isArray(locationRes.data)
//           ? locationRes.data.length
//           : 0;
//         const userCount = Array.isArray(loadRes.data)
//           ? loadRes.data[0].TotalUsers
//           : 0;
//         if(Array.isArray(loadRes.data)){
//           if(loadRes.data[0].TotalUsers ===0 || loadRes.data[0].DurationInMinutes ===0)
//           toast.warn('user ')
//           dispatch({
//             type: IS_USER_OR_DURATION_ZERO,
//             payload: true,
//           });
//         } else{
//           dispatch({
//             type: IS_USER_OR_DURATION_ZERO,
//             payload: true,
//           });
//           toast.warn('user not eneter ')
//         }
        
//         totalUserCount += userCount;
//         totalLocationCount += locCount;
//       }));

//       // Dispatch the sums
//       dispatch({
//         type: GET_USER_COUNT,
//         payload: totalUserCount,
//       });
//       dispatch({
//         type: GET_LOC_COUNT,
//         payload: totalLocationCount,
//       });
//     } catch (error) {
//       toast.error("Network Eerror");
//     }
//   };
// };

export const GetLocationScenarioVUCount = (testList) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      let totalUserCount = 0;
      let totalLocationCount = 0;
      let isUserOrDurationZero = false;

      await Promise.all(testList.map(async (test) => {
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

        // Check if the user count or duration is zero for any test
        if (userCount === 0 || loadRes.data[0].DurationInMinutes === 0) {
          isUserOrDurationZero = true;
          // Dispatch toast warning
          // toast.warn("User or duration is zero for a test");
        }

        totalUserCount += userCount;
        totalLocationCount += locCount;
      }));

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
    } catch (error) {
      toast.error("Network Error");
    }
  };
};


export const getScenarioCount = (rootId)=>{

  return async (dispatch)=>{
    try {
      const BASE_URL = await getBaseUrl();
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
          console.log('inside array')
          locationData = resData;
          totalTraficPercent = resData.reduce((sum, data) => sum + data?.PercentageTraffic, 0);
        }
      }else{
        toast.error("First add user for this scenario")
      }
      dispatch({
        type: FETCH_DATA_SUCCESS,
        payload: { totalUsers, totalTraficPercent, locationData }
      });
    } catch (error) {
      dispatch({
        type: FETCH_DATA_FAILURE,
        payload: { error: error.message }
      });
    }
  };
};

export const setScenarioId = (id) => {
  console.log('scenario id in action',id)
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
