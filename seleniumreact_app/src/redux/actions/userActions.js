import axios from "axios";
import { getBaseUrl } from "../../utils/configService";
import { header, headerForm } from "../../utils/authheader";
import { toast } from "react-toastify";

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const FETCH_ORGANIZATION = "FETCH_ORGANIZATION";
export const FETCH_USERS = "FETCH_USERS";
export const SWITCH_URSER = "SWITCH_URSER";

const fetchRequest = () => ({
  type: FETCH_USER_REQUEST,
});

const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

const fetchFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

const fetchOrganization = (detail) => ({
  type: FETCH_ORGANIZATION,
  payload: detail,
});

export const fetchUserByEmail = () => {
  return async (dispatch) => {
    const emailFromSession = sessionStorage.getItem("email");
    dispatch(fetchRequest());
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Selenium/GetProfilByEmail?Email=${emailFromSession}`,
        emailFromSession,
        header()
      );
      dispatch(fetchUserSuccess(res.data));
    } catch (error) {
      dispatch(fetchFailure(error.message));
      toast.error(error.message);
    }
  };
};

export const UpdateUserProfile = (payload) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Selenium/UpdateUserProfile`,
        payload,
        header()
      );
      console.log("res", res);
      if (res.data.status === "success") {
        sessionStorage.setItem("email", payload.email);
        toast.info("Successfully updated", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
      }
    } catch (error) {
      console.log("error updating profile ", error);
      toast("Failed update");
    }
  };
};

export const fetchOrganizationDetail = (userId) => {
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.get(
        `${BASE_URL}/Selenium/GetUsersOrganizationByUserId?UserId=${userId}`,
        header()
      );
      if(Array.isArray(res.data))
      dispatch(fetchOrganization(res.data[0]));
    } catch (error) {
      dispatch(fetchFailure(error.message));
      toast.error(error.message);
    }
  };
};

export const updateOrganizationDetails = (formData) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Selenium/AddUpdateUserOrganization`,
        formData,
        headerForm()
      );
      if (res.data.status === "success") {
        toast.info("Successfully saved", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
      }
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Network error");
    }
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const emailFromSession = sessionStorage.getItem("email");
    dispatch(fetchRequest());
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.get(
        `${BASE_URL}/Selenium/GetUserDetails`,
        header()
      );
      dispatch({
        type: FETCH_USERS,
        payload: res.data,
      });
    } catch (error) {
      dispatch(fetchFailure(error.message));
      toast.error(error.message);
    }
  };
};

export const DisableEnableUser = (payload) => {
  return async (dispatch) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Selenium/DisableEnableUser`,
        payload,
        header()
      );
      if (res.data.status === "success") {
        // toast.info("Successfully saved", {
        //   style: {
        //     background: "rgb(101, 77, 247)",
        //     color: "rgb(255, 255, 255)",
        //   },
        // });
        dispatch({ type: SWITCH_URSER, payload: payload });
      }
    } catch (error) {
      console.error("Error saving:", error);
      // toast.error("Network error");
    }
  };
};
