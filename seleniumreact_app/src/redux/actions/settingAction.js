import axios from "axios";
import { toast } from "react-toastify";
import { header } from "../../utils/authheader";
import { GetEnvironment,GetApplication,GetBrowser } from "./seleniumAction";
export const GET_TEST_SUITS = "GET_TEST_SUITS";
export const GET_LOC_COUNT = "GET_LOC_COUNT";
export const GET_USER_COUNT = "GET_USER_COUNT";
export const RESET_USER_COUNT = "RESET_USER_COUNT";
export const RESET_LOC_COUNT = "RESET_LOC_COUNT";
const BASE_URL = process.env.REACT_APP_BASE_URL || 'api';

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

export const AddUpdateApplication = (data)=>{
  return async (dispatch)=>{
    try {
      const res = await axios.post(
        `${BASE_URL}/Selenium/AddUpdateApplication`,
         data,
         header())
      if (res.data.status=== "success") {
        dispatch(GetApplication())
        toast.info(res.data.message, {
          style: {
            background: 'rgb(101, 77, 247)', 
            color: 'rgb(255, 255, 255)', 
          },
        });
    } 
    else if (res.data.status === "fail") { 
      toast.error(res.data.message); 
     
      
  }
    }catch (error) {
      console.log("error adding ",error);
      toast('Posting error')
    }
  }
}

export const AddUpdateBrowser = (data)=>{
  
  return async (dispatch)=>{
    try {
      const res = await axios.post(
        `${BASE_URL}/Selenium/AddUpdateBrowser`,
         data,
         header())
      if (res.data.status === "success") {
        dispatch(GetBrowser())
        toast.info(res.data.message, {
          style: {
            background: 'rgb(101, 77, 247)', 
            color: 'rgb(255, 255, 255)', 
          },
        });
    } 
    else if (res.data.status === "fail") { 
      toast.error(res.data.message); 
  }
    }catch (error) {
      console.log("error adding ",error);
      toast('Posting error')
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

export const GetLocationScenarioVUCount = (testId)=>{

  return async (dispatch)=>{
    try {
      const loadRes = await axios.get(
        `${BASE_URL}/Performance/GetLoadByPerformanceFileId?PerformanceFileId=${testId}`,
        header()
      );
      const locationRes = await axios.get(
        `${BASE_URL}/Performance/GetLocationByPerformanceFileId?PerformanceFileId=${testId}`,
        header()
      );
      const locCount = Array.isArray(locationRes.data)
        ? locationRes.data.length
        : 0;
      const userCount = Array.isArray(loadRes.data)
        ? loadRes.data[0].TotalUsers
        : 0;
        dispatch({
          type: GET_USER_COUNT,
          payload: userCount,
        });
        dispatch({
          type: GET_LOC_COUNT,
          payload: locCount,
        });
        
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
  }
}