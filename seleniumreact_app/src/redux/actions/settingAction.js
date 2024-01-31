import axios from "axios";
import { toast } from "react-toastify";
import { header } from "../../utils/authheader";
export const GET_TEST_SUITS = "GET_TEST_SUITS";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getTestSuitesList = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/Selenium/GetTestSuites`, header());
      console.log("getTestSuites====", response);
      dispatch({
        type: GET_TEST_SUITS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error in getTestSuites:", error);
    //   toast.error("NETWORK ERROR");
    }
  };
};