import axios from 'axios';
import { getBaseUrl } from '../../../utils/configService';
import { header } from '../../../utils/authheader';
import { toast } from 'react-toastify';

export const FETCH_TEST_CASES_REQUEST = 'FETCH_TEST_CASES_REQUEST';
export const FETCH_TEST_CASES_SUCCESS = 'FETCH_TEST_CASES_SUCCESS';
export const FETCH_TEST_CASES_FAILURE = 'FETCH_TEST_CASES_FAILURE';
export const DELETE_TEST_CASE_REQUEST = 'DELETE_TEST_CASE_REQUEST';
export const DELETE_TEST_CASE_SUCCESS = 'DELETE_TEST_CASE_SUCCESS';
export const DELETE_TEST_CASE_FAILURE = 'DELETE_TEST_CASE_FAILURE';

const notify = (type, message) => {
  const options = {
    style: {
      background: 'rgb(101, 77, 247)',
      color: 'rgb(255, 255, 255)',
    },
  };
  if (type === 'success') {
    toast.info(message, options);
  } else {
    toast.error(message);
  }
};

export const fetchTestCases = (selectedNodeId) => async (dispatch) => {
  dispatch({ type: FETCH_TEST_CASES_REQUEST });
  
  try {
    const BASE_URL = await getBaseUrl();
    const response = await axios.post(
      `${BASE_URL}/AddTestLab/GetTestCaseDetailsByRootId?RootId=${selectedNodeId}`,
      header()
    );

    if (response.data.status === 'fail' || response.data === '') {
      dispatch({ type: FETCH_TEST_CASES_SUCCESS, payload: [] });
    } else {
      const reversedTestCaseList = response.data.reverse();
      dispatch({ type: FETCH_TEST_CASES_SUCCESS, payload: reversedTestCaseList });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    dispatch({ type: FETCH_TEST_CASES_FAILURE, payload: error });
  }
};

export const deleteTestCase = (testId,setopenDelModal) => async (dispatch) => {
  dispatch({ type: DELETE_TEST_CASE_REQUEST });

  try {
    const BASE_URL = await getBaseUrl();
    const response = await axios.post(
      `${BASE_URL}/AddTestLab/DeleteTestCaseDetailsByTestCaseDetailsId?TestCaseDetailsId=${testId}`
    );

    if (response.data.status === 'success') {
      dispatch({ type: DELETE_TEST_CASE_SUCCESS, payload: testId });
      notify('success', 'Successfully deleted');
      setopenDelModal(false)
    } 
  } catch (error) {
    console.error('Error deleting test case:', error);
    dispatch({ type: DELETE_TEST_CASE_FAILURE, payload: error });
    notify('error', 'NETWORK ERROR');
    setopenDelModal(false)
  }
};
