import axios from "axios";
import { toast } from "react-toastify";
import { header } from "../../utils/authheader";
export const RESULT_LIST = "RESULT_LIST";
export const LOG_OUT = "LOG_OUT";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const GetResultsList = (rootId, setLoading) => {
  setLoading(true);
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/Performance/GetExecutedPerformanceByRootId?RootId=${rootId}`,
        header()
      );
      console.log("GetResultsList ", response.data);
      dispatch({
        type: RESULT_LIST,
        payload: response.data,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
};
