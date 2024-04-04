import axios from "axios";
import { toast } from "react-toastify";
import { header } from "../../utils/authheader";
import { getBaseUrl } from "../../utils/configService";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";


export const login = (data, setLoading) => {
  // console.log("BASE_URL",BASE_URL,config.REACT_APP_BASE_URL)
  return async (dispatch) => {
    try {
      setLoading(true);
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(`${BASE_URL}/Login`, data);
      const response = res.data;
      if (response?.result === 'Success') {
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
        sessionStorage.setItem('email',data.email.toString())
        dispatch({
          type: LOG_IN,
          payload: { ...response.data, token: response.token },
        });
      }else{
        toast.error(response.message)
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


export const InviteUser = (email)=>{
  return async (dispatch)=>{
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/AddInBuildTestSuite/InviteUser?toEmail=${email}`,email);
      console.log('response ' ,res)
      if (res.data.status === "Success") {
        toast.info('Successfully invited', {
          style: {
            background: 'rgb(101, 77, 247)', 
            color: 'rgb(255, 255, 255)', 
          },
        });
    } else{
      toast.error('Error inviting')
    }
    }catch (error) {
      console.log("error inviting ",error);
      toast('Invitation fail')
    }
  }
}

export const AcceptInvitation = (email,handeSetAccept)=>{
  return async (dispatch)=>{
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/AddInBuildTestSuite/AcceptInvitation?toEmail=${email}`,email);
      console.log('response ' ,res)
      if (res.data.emailStatus.status === "Success") {
        handeSetAccept()
        toast.info('Successfully accept', {
          style: {
            background: 'rgb(101, 77, 247)', 
            color: 'rgb(255, 255, 255)', 
          },
        });
    } 
    }catch (error) {
      console.log("error inviting ",error);
      toast('accept fail')
    }
  }
}

export const ChangePasswordReq = (payload)=>{
  return async (dispatch)=>{
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/AddInBuildTestSuite/ChangePassword`,payload);
      console.log('payload ' ,payload)
      if(res.data.status === "Success"){
        toast.info('Successfully changed', {
          style: {
            background: 'rgb(101, 77, 247)', 
            color: 'rgb(255, 255, 255)', 
          },
        });
      }
    }catch (error) {
      console.log("error changing password ",error);
      toast('accept fail')
    }
  }
}

export const UpdateUserProfile = (payload)=>{
  return async (dispatch)=>{
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Selenium/UpdateUserProfile`,payload,header());
        console.log('res',res)
      if(res.data.status === "success"){
        toast.info('Successfully updated', {
          style: {
            background: 'rgb(101, 77, 247)', 
            color: 'rgb(255, 255, 255)', 
          },
        });
      }
    }catch (error) {
      console.log("error updating profile ",error);
      toast('Failed update')
    }
  }
}