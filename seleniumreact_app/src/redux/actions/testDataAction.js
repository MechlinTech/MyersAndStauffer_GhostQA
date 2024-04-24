import axios from "axios";
import { toast } from "react-toastify";
import { header, headerForm } from "../../utils/authheader";
import { getBaseUrl } from "../../utils/configService";
// const BASE_URL = process.env.REACT_APP_BASE_URL;

// for test data
export const FETCH_TEST_DATA_REQUEST = "FETCH_TEST_DATA_REQUEST";
export const FETCH_TEST_DATA_SUCCESS = "FETCH_TEST_DATA_SUCCESS";
export const FETCH_TEST_DATA_FAILURE = "FETCH_TEST_DATA_FAILURE";
export const DELETE_TEST_DATA = "DELETE_TEST_DATA";
export const ADD_TEST_DATA = "ADD_TEST_DATA";

export const GetTestData = (PerformanceFileId) => async (dispatch) => {
    dispatch({ type: FETCH_TEST_DATA_REQUEST });
  
    try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.get(
        `${BASE_URL}/Performance/GetTestDataByPerformanceFileId?PerformanceFileId=${PerformanceFileId}`,
        header()
      );
      if (Array.isArray(response.data))
        dispatch({ type: FETCH_TEST_DATA_SUCCESS, payload: response.data });
      else dispatch({ type: FETCH_TEST_DATA_SUCCESS, payload: [] });
    } catch (error) {
      dispatch({ type: FETCH_TEST_DATA_FAILURE, payload: error });
      toast.error("Network Error in test data");
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