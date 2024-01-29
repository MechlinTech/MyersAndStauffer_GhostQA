import { LOG_IN, LOG_OUT } from "../actions/authActions";

const initialState = {
  isLogedIn: false,
  userData: {},
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

    default:
      return state;
  }
};
export default authReduser;
