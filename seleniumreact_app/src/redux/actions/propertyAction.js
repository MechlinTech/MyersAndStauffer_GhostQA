import axios from "axios";
import { toast } from "react-toastify";
import { header, headerForm } from "../../utils/authheader";
import { getBaseUrl } from "../../utils/configService";
// const BASE_URL = process.env.REACT_APP_BASE_URL;

export const FETCH_PROPERTY_DATA_REQUEST = "FETCH_PROPERTY_DATA_REQUEST";
export const FETCH_PROPERTY_DATA_SUCCESS = "FETCH_PROPERTY_DATA_SUCCESS";
export const FETCH_PROPERTY_DATA_FAILURE = "FETCH_PROPERTY_DATA_FAILURE";
export const DELETE_PROPERTY = "DELETE_PROPERTY";
export const ADD_PROPERTY = "ADD_PROPERTY";

//for properties
export const fetchPropertyData = (performanceFileId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PROPERTY_DATA_REQUEST });
    try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.get(
        `${BASE_URL}/Performance/GetPropertyByPerformanceFileId?PerformanceFileId=${performanceFileId}`,
        header()
      );
      const resData = response.data;
      if (Array.isArray(resData)) {
        dispatch({ type: FETCH_PROPERTY_DATA_SUCCESS, payload: resData });
      } else {
        dispatch({ type: FETCH_PROPERTY_DATA_SUCCESS, payload: [] });
      }
    } catch (error) {
      dispatch({ type: FETCH_PROPERTY_DATA_FAILURE, payload: error.message });
      toast.error("Network error in property");
    }
  };
};

export const submitProperty = (payload) => {
  return async (dispatch, getState) => {
    try {
      const BASE_URL = await getBaseUrl();
      const { scenarioId } = getState().performance; // Get scenarioId from Redux store
      const res = await axios.post(
        `${BASE_URL}/Performance/AddProperty`,
        payload,
        header()
      );
      console.log("res", res);
      if (res.data === "Success") {
        toast.info("Successfully saved", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });

        // Update propertyList after successful submission
        // dispatch(fetchPropertyData(scenarioId));
        dispatch({ type: ADD_PROPERTY, payload: payload });
      }
    } catch (error) {
      console.log("error saving ", error);
      toast.error("Network error");
    }
  };
};

export const deleteProperty = (pId) => {
  return async (dispatch, getState) => {
    try {
      const BASE_URL = await getBaseUrl();
      const { scenarioId } = getState().performance; // Get scenarioId from Redux store
      const res = await axios.post(
        `${BASE_URL}/Performance/DeleteProperties?Id=${pId}`,
        header()
      );

      if (res.data.status === "success") {
        toast.info("Successfully deleted", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });

        // Update propertyList after successful deletion
        // dispatch(fetchPropertyData(scenarioId));
        dispatch({ type: DELETE_PROPERTY, payload: pId });
      }
    } catch (error) {
      console.log("error deleting ", error);
      toast.error("Network error");
    }
  };
};
