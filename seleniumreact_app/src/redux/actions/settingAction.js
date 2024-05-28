import axios from "axios";
import { toast } from "react-toastify";
import { header } from "../../utils/authheader";
import { GetEnvironment, GetApplication, GetBrowser } from "./seleniumAction";
import { getBaseUrl } from "../../utils/configService";
export const GET_TEST_SUITS = "GET_TEST_SUITS";
export const GET_LOC_COUNT = "GET_LOC_COUNT";
export const GET_USER_COUNT = "GET_USER_COUNT";
export const RESET_USER_COUNT = "RESET_USER_COUNT";
export const RESET_LOC_COUNT = "RESET_LOC_COUNT";
export const GET_USER_LIST ="GET_USER_LIST"
export const GET_PERFORMANCE_INTEGRATION = "GET_PERFORMANCE_INTEGRATION";
export const JIRA_ISSUE_TYPES = "JIRA_ISSUE_TYPES";
export const JIRA_PROJECT_LIST = "JIRA_PROJECT_LIST";

export const getTestSuitesList = () => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.get(
        `${BASE_URL}/Selenium/GetTestSuites`,
        header()
      );
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

export const AddUpdateEnvironment = (data, navigate, onBack) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Selenium/AddUpdateEnvironment`,
        data,
        header()
      );
      console.log("response ", res);
      if (res.data.status === "success") {
        dispatch(GetEnvironment());
        toast.info(res.data.message, {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
        onBack();
      } else if (res.data.status === "fail") {
        toast.error(res.data.message);
        onBack();
        // navigate('/settings/environment')
      }

      console.log("saved ", res);
    } catch (error) {
      console.log("error sending ", error);
      // toast('Posting error')
    }
  };
};

export const AddUpdateApplication = (data) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Selenium/AddUpdateApplication`,
        data,
        header()
      );
      if (res.data.status === "success") {
        dispatch(GetApplication());
        toast.info(res.data.message, {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
      } else if (res.data.status === "fail") {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("error adding ", error);
      toast("Posting error");
    }
  };
};

export const AddUpdateBrowser = (data) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Selenium/AddUpdateBrowser`,
        data,
        header()
      );
      if (res.data.status === "success") {
        dispatch(GetBrowser());
        toast.info(res.data.message, {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
      } else if (res.data.status === "fail") {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("error adding ", error);
      toast("Posting error");
    }
  };
};

export const DeleteEnvironment = (id) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Selenium/DeleteEnvironment?EnvironmentId=${id}`,
        "",
        header()
      );
      const response = res.data;
      if (response.status === "success") {
        dispatch(GetEnvironment());
        toast.info(response.message, {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
      }

      return response;
    } catch (error) {
      console.log("error sending ", error);
      // toast('Posting error')
    }
  };
};

export const DeleteApplication = (appId) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Selenium/DeleteApplication?ApplicationId=${appId}`,
        appId,
        header()
      );

      const response = res.data;

      if (response.status === "success") {
        dispatch(GetApplication());
        toast.info(response.message, {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
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
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Selenium/DeleteBrowser?BrowserId=${brwId}`,
        brwId,
        header()
      );

      const response = res.data;
      if (response.status === "success") {
        dispatch(GetBrowser());
        toast.info("Successfully deleted", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
      }
      return response;
    } catch (error) {
      console.log("Error deleting ", error);
      toast.error("Error deleting");
    }
  };
};


// for Test User

export const AddUpdateTestUser = (data) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Selenium/AddTestUser`,
        data,
        header()
      );
      console.log("/Selenium/AddTestUser",res.data)
      if (res.data.status === "success") {
        dispatch(GetTestUserList());
        toast.info(res.data.message, {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
      } else if (res.data.status === "fail") {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("error adding ", error);
      toast("Posting error");
    }
  };
};


export const GetTestUserList = () => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.get(
        `${BASE_URL}/Selenium/GetAllTestUser`,
        header()
      );
      console.log("GetTestUserList",response)
      dispatch({
        type: GET_USER_LIST,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      toast.error("NETWORK ERROR");
    }
  };
};

export const DeleteUser = (id) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Selenium/DeleteTestUser?Id=${id}`,
        id,
        header()
      );

      const response = res.data;

      if (response.status === "success") {
        dispatch(GetTestUserList());
        toast.info(response.message, {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
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

// performance

export const getPerformanceIntegrationList = (userId) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.get(
        `${BASE_URL}/AddInBuildTestSuite/GetAllUserIntegration?userId=${userId}`,
        header()
      );
      console.log("getPerformanceIntegrationList====", response);
      dispatch({
        type: GET_PERFORMANCE_INTEGRATION,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error in getTestSuites:", error);
    }
  };
};

export const updateZiraIntegration = (data, setOpenModal, setLoading, callback) => {
  setLoading(true);
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.post(
        `${BASE_URL}/AddInBuildTestSuite/UpdateIntegration`,
        data,
        header()
      );
      console.log("updateZiraIntegration====", response.data.message);
      if(response.data.message == "Success") {
        if(data.isIntegrated == true) {
          toast.info('Successfully Jira Integrated', {
            style: {
              background: "rgb(101, 77, 247)",
              color: "rgb(255, 255, 255)",
            },
          });
        } else {
          toast.info('Successfully Jira Integrated Removed', {
            style: {
              background: "rgb(101, 77, 247)",
              color: "rgb(255, 255, 255)",
            },
          });
        }
        
        dispatch(getPerformanceIntegrationList(data.userId));
        setOpenModal(false);
        setLoading(false);
        callback(true);
      } else {
        setOpenModal(false);
        setLoading(false);
        callback(false);
      }
    } catch (error) {
      console.error("Error in updateZiraIntegration:", error);
      setOpenModal(false);
      setLoading(false);
      callback(false);
    }
  };
};

export const GetAllJiraIssueTypes = (userId) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.get(
        `${BASE_URL}/AddInBuildTestSuite/GetAllJiraIssueTypes?userId=${userId}`,
        header()
      );
      dispatch({
        type: JIRA_ISSUE_TYPES,
        payload: res.data,
      });
    } catch (error) {
      console.log("error getting JIRA ISSUE TYPE", error);
    }
  };
};

export const GetProjectListJira = (userId) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.get(
        `${BASE_URL}/AddInBuildTestSuite/GetProjectListJira?userId=${userId}`,
        header()
      );
      dispatch({
        type: JIRA_PROJECT_LIST,
        payload: res.data,
      });
    } catch (error) {
      console.log("error getting project data", error);
    }
  };
};

export const createIssueOnJira = (payload,closeDrawer) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/AddInBuildTestSuite/CreateIssueOnJire`,
        payload,
        header()
      );
      if(res.data.status === "OK"){
        closeDrawer(false)
        toast.info('Successfully created', {
                style: {
                  background: 'rgb(101, 77, 247)',
                  color: 'rgb(255, 255, 255)',
                },
              });
      }
    } catch (error) {
      console.log("error creating issue on jira ", error);
    }
  };
};


