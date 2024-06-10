import axios from "axios";
import { toast } from "react-toastify";
import { header } from "../../utils/authheader";
import { getBaseUrl } from "../../utils/configService";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SET_USER_ID = "SET_USER_ID";

export const login = (data, setLoading) => {
  // console.log("BASE_URL",BASE_URL,config.REACT_APP_BASE_URL)
  return async (dispatch) => {
    try {
      setLoading(true);
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(`${BASE_URL}/Login`, data);
      const response = res.data;
      if (response?.result === "Success") {
        toast.info("Successfully logged in", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
        const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...response.data,
            token: response.token,
            TimeZone: localTimeZone,
          })
        );
        localStorage.setItem(
          "tokenExpiry",
          JSON.stringify({ ...response.data, expiration: response.expiration })
        );
        localStorage.setItem("email", data.email.toString());
        dispatch({
          type: LOG_IN,
          payload: { ...response.data, token: response.token },
        });
      } else {
        if (response.message === "User Name or Password is Wrong") {
          toast.error("Invalid username or password");
        } else {
          toast.error(response.message);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("NETWORK ERROR");
    } finally {
      setLoading(false);
    }
  };
};

export const forgotPassword = (data, setLoading, navigate) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/AddInBuildTestSuite/SendPasswordResetMail`,
        data
      );
      const response = res.data;
      if (response?.status === "Success") {
        toast.info(
          `Password reset information has been sent to the ${data.email} email`,
          {
            style: {
              background: "rgb(101, 77, 247)",
              color: "rgb(255, 255, 255)",
            },
          }
        );
        navigate("/");
      } else {
        console.log("somethings wrong");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log({ error: err.response });
    } finally {
      setLoading(false);
    }
  };
};

export const resetPassword = (payload, navigate) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/AddInBuildTestSuite/ResetPassword`,
        payload
      );
      const response = res.data;
      console.log("response", response);
      if (response?.status === "Success") {
        toast.info(`${response.message}`, {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
        navigate("/");
      } else {
        console.log("somethings wrong");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log({ error: err.response });
    } finally {
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: LOG_OUT });
  };
};

export const InviteUser = (email) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/AddInBuildTestSuite/InviteUser?toEmail=${email}`,
        email
      );
      if (res.data.status === "Success") {
        toast.info("Successfully invited", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
      } else {
        toast.warn(res.data.message);
      }
    } catch (error) {
      console.log("error inviting ", error);
      toast.error("Network error");
    }
  };
};

export const AcceptInvitation = (email, handeSetAccept) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/AddInBuildTestSuite/AcceptInvitation?toEmail=${email}`,
        email
      );
      if (res.data.emailStatus.status === "Success") {
        handeSetAccept();
        toast.info("Successfully accept", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
      }
    } catch (error) {
      console.log("error inviting ", error);
      toast("accept fail");
    }
  };
};

export const ChangePasswordReq = (payload, redirectToLogin) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/AddInBuildTestSuite/ChangePassword`,
        payload
      );
      console.log("res ", res);
      if (res.data.status === "Success") {
        toast.info("Password Changed Successfully", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
        redirectToLogin();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("error changing password ", error);
      toast.error("Network error");
    }
  };
};

export const setUserId = (id) => {
  return (dispatch) => {
    dispatch({ type: SET_USER_ID, payload: id });
  };
};
export const getUserId = () => {
  const emailFromSession = localStorage.getItem("email");
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Selenium/GetProfilByEmail?Email=${emailFromSession}`,
        emailFromSession,
        header()
      );
      dispatch(setUserId(res.data?.Id));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
};
