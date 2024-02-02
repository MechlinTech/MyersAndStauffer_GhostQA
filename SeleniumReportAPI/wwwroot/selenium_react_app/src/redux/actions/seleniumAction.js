import axios from "axios";
import { toast } from "react-toastify";
import { header } from "../../utils/authheader";
export const GET_TEST_SUITS = "GET_TEST_SUITS";
export const GET_TEST_SUITS_LIST = "GET_TEST_SUITS_LIST";
export const GET_TEST_RUN_DETAILS_LIST = "GET_TEST_RUN_DETAILS_LIST"
export const GET_TEST_CASE_DETAILS = "GET_TEST_CASE_DETAILS"
export const GET_TEST_CASE_STESPS = "GET_TEST_CASE_STESPS"
export const GET_APPLICATION_LIST ="GET_APPLICATION_LIST"
export const GET_ENVIRONMENT_LIST ="GET_ENVIRONMENT_LIST"
export const GET_BROWSER_LIST ="GET_BROWSER_LIST"
export const GET_TEST_CASE_LIST ="GET_TESTCASE_LIST"
export const ADD_UPDATE_TEST_SUITS ="ADD_UPDATE_TEST_SUITS"
export const SUITE_TO_EDIT ="SUITE_TO_EDIT"
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getTestSuites = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/Selenium/GetDataTestSuits`, header());
      console.log("getTestSuites : ", response);
      dispatch({
        type: GET_TEST_SUITS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error in getTestSuites:", error);
      toast.error("NETWORK ERROR");
    }
  };
};

export const getListByTestSuitsName = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/Selenium/GetDashboardDetails?testSuitName=${data}`,
                header()
            );
            console.log("getListByTestSuitsName", response.data);
            dispatch({
                type: GET_TEST_SUITS_LIST,
                payload: response.data,
            });
        } catch (error) {
            console.error(error);
            toast.error("NETWORK ERROR");
        }
    };
};

export const getTestCaseRundetailsByTestName = (data) => {
    // let data = "Mississippi";
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/Selenium/GetRunDetails?testSuitName=${data}`,
                header()
            );
            console.log("getTestCaseRundetailsByTestName", response.data);
            dispatch({
                type: GET_TEST_RUN_DETAILS_LIST,
                payload: response.data,
            });
        } catch (error) {
            console.error(error);
            toast.error("NETWORK ERROR");
        }
    };
};

export const ExecuteTestCasesByTestSuite = (data) => {
    // let data = "Mississippi";
    return async (dispatch) => {
        try {
            const response = await axios.options(
                `${BASE_URL}/Selenium/ExecuteTestSuite?TestSuiteName=${data}`,
                header()
            );
            console.log("ExecuteTestCasesByTestSuite", response.data);
        } catch (error) {
            console.error(error);
            toast.error("NETWORK ERROR");
        }
    };
};

export const GetTestCaseDetails = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/Selenium/GetTestCaseDetails?testSuitName=${data.testSuitName}&runId=${data.runId}`,
                header()
            );
            console.log("GetTestCaseDetails====", response.data);
            dispatch({
                type: GET_TEST_CASE_DETAILS,
                payload: response.data,
            });
        } catch (error) {
            console.error(error);
            toast.error("NETWORK ERROR");
        }
    };
};

export const GetTestCaseStepsDetails = (data) => {

    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/Selenium/GetTestCaseStepsDetails?testSuitName=${data.testSuitName}&runId=${data.runId}&testCaseName=${data.testCaseName}`,
                header()
            );
            console.log("GetTestCaseStepsDetails", response.data);
            dispatch({
                type: GET_TEST_CASE_STESPS,
                payload: response.data,
            });
        } catch (error) {
            console.error(error);
            toast.error("NETWORK ERROR");
        }
    };
};

export const GetApplication = () => {
 
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/Selenium/GetApplication`,
        header()
      );

      dispatch({
        type: GET_APPLICATION_LIST,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      toast.error("NETWORK ERROR");
    }
  };
};

export const GetEnvironment = () => {

    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/Selenium/GetEnvironments`,
                header()
            );
            dispatch({
                type: GET_ENVIRONMENT_LIST,
                payload: response.data,
            });
        } catch (error) {
            console.error(error);
            toast.error("NETWORK ERROR");
        }
    };
};

export const GetBrowser = () => {

    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/Selenium/GetBrowsers`,
                header()
            );
            dispatch({
                type: GET_BROWSER_LIST,
                payload: response.data,
            });
        } catch (error) {
            console.error(error);
            toast.error("NETWORK ERROR");
        }
    };
};

export const GetTestCases = () => {
 
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/Selenium/GetTestCases`,
        header()
      );
      // console.log('testcase ',response.data )
      dispatch({
        type: GET_TEST_CASE_LIST,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      toast.error("NETWORK ERROR");
    }
  };
};

export const AddUpdateTestSuites = (data,action)=>{
  return async (dispatch)=>{
    try {
      const res = await axios.post(
        `${BASE_URL}/Selenium/AddUpdateTestSuites?action=${action}`,
         data,
         header())
      console.log('response ' ,res)
      if (res.status === 200) {
        toast.info('Successfully saved', {
          style: {
            background: 'rgb(101, 77, 247)', 
            color: 'rgb(255, 255, 255)', 
          },
        });
    } 
    console.log("saved ",res)
    }catch (error) {
      console.log("error sending ",error);
      toast('Posting error')
    }
  }
}

export const Getsuitebyname = (suitName)=>{
  return async (dispatch)=>{
    try {
      const res = await axios.get(
        `${BASE_URL}/Selenium/GetTestSuiteByName?TestSuiteName=${suitName}`,
         header())
      console.log('suite detail to edit ' ,res.data)
      dispatch({
        type: SUITE_TO_EDIT,
        payload: res.data,
      });
    //   if (res.status === 200) {
    //     toast.info('Successfully saved', {
    //       style: {
    //         background: 'rgb(101, 77, 247)', 
    //         color: 'rgb(255, 255, 255)', 
    //       },
    //     });
    // } 
    }catch (error) {
      console.log("error getting suite by name ",error);
    }
  }
}


export const DeleteTestSuite = (suiteName)=>{
  
  return async (dispatch)=>{
    try {
      const res = await axios.post(
        `${BASE_URL}/Selenium/DeleteTestSuites?TestSuiteName=${suiteName}`,suiteName,
         header());
      console.log('response ' ,res)
      if (res.status === 200) {
        toast.info('Successfully deleted', {
          style: {
            background: 'rgb(101, 77, 247)', 
            color: 'rgb(255, 255, 255)', 
          },
        });
    } 
    console.log("deleted ",res)
    }catch (error) {
      console.log("error deleting ",error);
      toast('deleting error')
    }
  }
}

export const AddUpdateApplication = (data)=>{
  return async ()=>{
    try {
      const res = await axios.post(
        `${BASE_URL}/Selenium/AddUpdateApplication`,
         data,
         header())
      if (res.status === 200) {
        toast.info('Successfully added', {
          style: {
            background: 'rgb(101, 77, 247)', 
            color: 'rgb(255, 255, 255)', 
          },
        });
    } 
    }catch (error) {
      console.log("error adding ",error);
      toast('Posting error')
    }
  }
}

export const AddUpdateBrowser = (data)=>{
  console.log("inside addupdate browser")
  return async ()=>{
    try {
      const res = await axios.post(
        `${BASE_URL}/Selenium/AddUpdateBrowser`,
         data,
         header())
      if (res.status === 200) {
        toast.info('Successfully added', {
          style: {
            background: 'rgb(101, 77, 247)', 
            color: 'rgb(255, 255, 255)', 
          },
        });
    } 
    }catch (error) {
      console.log("error adding ",error);
      toast('Posting error')
    }
  }
}