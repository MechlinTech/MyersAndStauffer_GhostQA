import { LOG_IN, LOG_OUT,SET_USER_ID } from "../actions/authActions";

const initialState = {
  isLogedIn: false,
  userData: {},
  userId:null
};

const authReduser = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        isLogedIn: true,
        userData: action.payload,
      };
    }
    case LOG_OUT: {
        return { ...state, isLogedIn: false }
    }
    case SET_USER_ID: {
      return { ...state, userId: action.payload }
    }
    default:
      return state;
  }
};
export default authReduser;