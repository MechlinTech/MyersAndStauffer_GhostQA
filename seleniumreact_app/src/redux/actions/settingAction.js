import axios from "axios";
import { toast } from "react-toastify";
import { header } from "../../utils/authheader";
import { GetEnvironment,GetApplication,GetBrowser } from "./seleniumAction";
export const GET_TEST_SUITS = "GET_TEST_SUITS";
export const GET_DELETE_RES = "GET_DELETE_RES";
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
          const response = res.data
           if (response.status === "success") {
                dispatch(GetEnvironment());
               toast.info(response.message, {
                   style: {
                       background: 'rgb(101, 77, 247)',
                       color: 'rgb(255, 255, 255)',
                   },
               });
              
             }
           
          return response
       } catch (error) {
           console.log("error sending ", error);
           // toast('Posting error')
       }
   }
 }

 export const DeleteApplication = (appId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/Selenium/DeleteApplication?ApplicationId=${appId}`,
        appId,
        header()
      );

      const response = res.data;

      if (response.status === 'success') {
        dispatch(GetApplication());
        toast.info(response.message, {
          style: {
            background: 'rgb(101, 77, 247)',
            color: 'rgb(255, 255, 255)',
          },
        });
      }
      return response; // Return the response object
    } catch (error) {
      console.log("error deleting ", error);
      toast.error("Error deleting application");
      return error.response; // Return the error response
    }
  };
};


export const DeleteBrowser = (brwId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/Selenium/DeleteBrowser?BrowserId=${brwId}`,
        brwId,
        header()
      );

      const response = res.data;
      if (response.status === 'success') {
        dispatch(GetBrowser());
        toast.info('Successfully deleted', {
          style: {
            background: 'rgb(101, 77, 247)',
            color: 'rgb(255, 255, 255)',
          },
        });
      }  
      return response
    } catch (error) {
      console.log('Error deleting ', error);
      toast.error('Error deleting');
    }
  };
};
