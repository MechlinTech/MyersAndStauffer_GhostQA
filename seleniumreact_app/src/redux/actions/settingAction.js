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

export const AddUpdateEnvironment = (data) => {
  return async (dispatch) => {
      try {
          const res = await axios.post(
              `${BASE_URL}/Selenium/AddUpdateEnvironment`,
              data,
              header())
          console.log('response ', res)
          if (res.status === 200) {
              toast.info('Successfully saved', {
                  style: {
                      background: 'rgb(101, 77, 247)',
                      color: 'rgb(255, 255, 255)',
                  },
              });
          }
          console.log("saved ", res)
      } catch (error) {
          console.log("error sending ", error);
          toast('Posting error')
      }
  }
}