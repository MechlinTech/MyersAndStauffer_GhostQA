import axios from "axios";
import { toast } from "react-toastify";
import { header } from "../../utils/authheader";
import { GetEnvironment } from "./seleniumAction";
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

export const AddUpdateEnvironment = (data,navigate,onBack) => {


  return async (dispatch) => {
      try {
          const res = await axios.post(
              `${BASE_URL}/Selenium/AddUpdateEnvironment`,
              data,
              header())
          console.log('response ', res)
          if (res.data.status === "success") {
               dispatch(GetEnvironment());
              toast.info(res.data.message, {
                  style: {
                      background: 'rgb(101, 77, 247)',
                      color: 'rgb(255, 255, 255)',
                  },
              });
              onBack();
            }
            else if (res.data.status === "fail") { 
                toast.error(res.data.message); 
                onBack();
                // navigate('/settings/environment')
            }
          
          console.log("saved ", res)
      } catch (error) {
          console.log("error sending ", error);
          // toast('Posting error')
      }
  }
}
export const DeleteEnvironment = (id) => {
  return async (dispatch) => {
       try {
           const res = await axios.post(
               `${BASE_URL}/Selenium/DeleteEnvironment?EnvironmentId=${id}`,"",
               header())
           console.log('response ', res)
           if (res.data.status === "success") {
                dispatch(GetEnvironment());
               toast.info(res.data.message, {
                   style: {
                       background: 'rgb(101, 77, 247)',
                       color: 'rgb(255, 255, 255)',
                   },
               });
              
             }
             else if (res.data.status === "fail") { 
                 toast.error(res.data.message); 
                 // navigate('/settings/environment')
             }
           
           console.log("saved ", res)
       } catch (error) {
           console.log("error sending ", error);
           // toast('Posting error')
       }
   }
 }
