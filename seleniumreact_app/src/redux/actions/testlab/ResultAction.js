import { toast } from "react-toastify";
import { getBaseUrl } from "../../../utils/configService";
import axios from 'axios';

// actionTypes.js
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const FETCH_EXECUTION_HISTORY_SUCCESS = 'FETCH_EXECUTION_HISTORY_SUCCESS';
export const FETCH_STEP_DETAILS_SUCCESS = 'FETCH_STEP_DETAILS_SUCCESS';



export const getExecutionHistory = (testId) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.get(`${BASE_URL}/AddTestLab/GetTestDetailByTestName?TestId=${testId}`);
      if (Array.isArray(res.data)) {
        dispatch({ type: 'FETCH_EXECUTION_HISTORY_SUCCESS', payload: res.data });
      } else {
        dispatch({ type: 'FETCH_EXECUTION_HISTORY_SUCCESS', payload: null });
      }
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE', payload: 'NETWORK ERROR' });
    }
  };
};


export const fetchStepDetails = (selectedRunId) => async (dispatch, getState) => {
    try {
        if (!selectedRunId) {
            return; // No need to fetch if selectedRunId is null or undefined
        }
         dispatch({ type: 'FETCH_REQUEST' });      
        const BASE_URL = await getBaseUrl();
        const res = await axios.get(`${BASE_URL}/AddTestLab/GetTestStepsDetailByTestCaseId?TestCaseId=${selectedRunId}`);
        
        if (Array.isArray(res.data)) {
            dispatch({ type: 'FETCH_STEP_DETAILS_SUCCESS', payload: res.data });
        } else {
            dispatch({ type: 'FETCH_STEP_DETAILS_FAILURE', payload: 'Invalid data received' });
        }
    } catch (error) {
        dispatch({ type: 'FETCH_STEP_DETAILS_FAILURE', payload: 'NETWORK ERROR' });
        toast.error("NETWORK ERROR");
    }
};