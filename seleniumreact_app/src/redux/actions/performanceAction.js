import axios from "axios";
import { toast } from "react-toastify";
import { header, headerForm } from "../../utils/authheader";
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
export const ADD_LOCATION = 'ADD_LOCATION';
export const DELETE_LOCATION = 'DELETE_LOCATION';

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// for test data
export const FETCH_TEST_DATA_REQUEST = 'FETCH_TEST_DATA_REQUEST';
export const FETCH_TEST_DATA_SUCCESS = 'FETCH_TEST_DATA_SUCCESS';
export const FETCH_TEST_DATA_FAILURE = 'FETCH_TEST_DATA_FAILURE';
export const DELETE_TEST_DATA = 'DELETE_TEST_DATA';
export const ADD_TEST_DATA = 'ADD_TEST_DATA';

// for properties
export const FETCH_PROPERTY_DATA_REQUEST = 'FETCH_PROPERTY_DATA_REQUEST';
export const FETCH_PROPERTY_DATA_SUCCESS = 'FETCH_PROPERTY_DATA_SUCCESS';
export const FETCH_PROPERTY_DATA_FAILURE = 'FETCH_PROPERTY_DATA_FAILURE';
export const DELETE_PROPERTY = 'DELETE_PROPERTY';
export const ADD_PROPERTY = 'ADD_PROPERTY';


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
      }
      // else{
      //   toast.warn("First add user for this scenario")
      // }
      dispatch({
        type: FETCH_DATA_SUCCESS,
        payload: { totalUsers, totalTraficPercent, locationData }
      });
    } catch (error) {
      dispatch({
        type: FETCH_DATA_FAILURE,
        payload: { error: error.message }
      });
      toast.error("Network Error in location")
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
      if (res.data === "Success") {
        toast.info("Successfully saved", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });

        // Update LOCATIONDATA after successful submission
        dispatch({ type: ADD_LOCATION, payload: payload });

      } else {
        toast.error("Submitting error");
      }
    } catch (error) {
      console.log("error saving ", error);
      toast.error("Network error");
    }
}}
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

export const GetTestData = (PerformanceFileId) => async dispatch => {
  dispatch({ type: FETCH_TEST_DATA_REQUEST });

  try {
    const BASE_URL = await getBaseUrl();
    const response = await axios.get(
      `${BASE_URL}/Performance/GetTestDataByPerformanceFileId?PerformanceFileId=${PerformanceFileId}`,
      header()
    );
    if (Array.isArray(response.data))
    dispatch({ type: FETCH_TEST_DATA_SUCCESS, payload: response.data });
    else
    dispatch({ type: FETCH_TEST_DATA_SUCCESS, payload: [] });

  } catch (error) {
    dispatch({ type: FETCH_TEST_DATA_FAILURE, payload: error });
    toast.error("Network Error in test data")
  }
};

export const submitTestData = (formData) => {
  return async (dispatch, getState) => {
    try {
      const BASE_URL = await getBaseUrl();
      const { scenarioId } = getState().performance; // Get scenarioId from Redux store
      const res = await axios.post(
        `${BASE_URL}/Performance/AddTestData`,
        formData,
        headerForm()
      );
      console.log("res", res);
      if (res.data === "Successfully Save") {
        toast.info("Successfully saved", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
        // Dispatch action to fetch updated test data
        dispatch(GetTestData(scenarioId));

      }
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Network error");
    }
  };
};

export const deleteTestData = (testId) => {
  return async (dispatch, getState) => {
    try {
      const BASE_URL = await getBaseUrl();
      const { scenarioId } = getState().performance; // Get scenarioId from Redux store
      const res = await axios.post(
        `${BASE_URL}/Performance/DeleteTestData?Id=${testId}`,
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
        // fetchData();
        // dispatch(GetTestData(scenarioId));
    dispatch({ type: DELETE_TEST_DATA, payload: testId });

      }
    } catch (error) {
      console.log("error deleting ", error);
      toast.error("Network error");
    }
  };
};

//for properties
export const fetchPropertyData = (performanceFileId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PROPERTY_DATA_REQUEST });
    try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.get(
        `${BASE_URL}/Performance/GetPropertyByPerformanceFileId?PerformanceFileId=${performanceFileId}`,
        header()
      );
      const resData = response.data;
      if (Array.isArray(resData)) {
        dispatch({ type: FETCH_PROPERTY_DATA_SUCCESS, payload: resData });
      } else {
        dispatch({ type: FETCH_PROPERTY_DATA_SUCCESS, payload: [] });
      }
    } catch (error) {
      dispatch({ type: FETCH_PROPERTY_DATA_FAILURE, payload: error.message });
      toast.error("Network error in property")
    }
  };
};

export const submitProperty = (payload) => {
  return async (dispatch, getState) => {
  try {
    const BASE_URL = await getBaseUrl();
      const { scenarioId } = getState().performance; // Get scenarioId from Redux store
      const res = await axios.post(
      `${BASE_URL}/Performance/AddProperty`,
      payload,
      header()
    );
    console.log("res", res);
    if (res.data === "Success") {
      toast.info("Successfully saved", {
        style: {
          background: "rgb(101, 77, 247)",
          color: "rgb(255, 255, 255)",
        },
      });

      // Update propertyList after successful submission
      // dispatch(fetchPropertyData(scenarioId));
    dispatch({ type: ADD_PROPERTY, payload: payload });

    }
  } catch (error) {
    console.log("error saving ", error);
    toast.error("Network error");
  }
}}

export const deleteProperty = (pId) => {
  return async (dispatch, getState) => {
    try {
      const BASE_URL = await getBaseUrl();
      const { scenarioId } = getState().performance; // Get scenarioId from Redux store
      const res = await axios.post(
        `${BASE_URL}/Performance/DeleteProperties?Id=${pId}`,
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
        // dispatch(fetchPropertyData(scenarioId));
    dispatch({ type: DELETE_PROPERTY, payload: pId });
        
      }
    } catch (error) {
      console.log("error deleting ", error);
      toast.error("Network error");
    }
  };
};
