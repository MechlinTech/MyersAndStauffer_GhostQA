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
