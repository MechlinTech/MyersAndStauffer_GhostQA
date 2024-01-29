import axios from "axios";
import { toast } from "react-toastify";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const login = (data, setLoading) => {
  return async (dispatch) => {
    try {
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/Login`, data);
      const response = res.data;

      if (res.status === 200) {
        toast.info('Successfully logged in', {
          style: {
            background: 'rgb(101, 77, 247)', 
            color: 'rgb(255, 255, 255)', 
          },
        });
        sessionStorage.setItem(
          "userData",
          JSON.stringify({ ...response.data, token: response.token })
        );

        dispatch({
          type: LOG_IN,
          payload: { ...response.data, token: response.token },
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("NETWORK ERROR");
    } finally {
      setLoading(false);
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: LOG_OUT });
  };
};
