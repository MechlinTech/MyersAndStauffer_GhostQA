import { GET_TEST_SUITS,GET_LOC_COUNT,GET_USER_COUNT,RESET_LOC_COUNT,RESET_USER_COUNT } from "../actions/settingAction";

const initialState = {
 testSuitsList: [],
 virtualUser:0,
 totalLocation:0
};

const settingsReduser = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEST_SUITS: {
      return {
        ...state,
        testSuitsList: action.payload,
      };
    }
    case GET_LOC_COUNT: {
      return {
        ...state,
        totalLocation: state.totalLocation + action.payload,
      };
    }
    case GET_USER_COUNT: {
      return {
        ...state,
        virtualUser: state.virtualUser + action.payload,
      };
    }
    case RESET_USER_COUNT: {
      return {
        ...state,
        virtualUser: action.payload,
      };
    }
    case RESET_LOC_COUNT: {
      return {
        ...state,
        totalLocation: action.payload,
      };
    }
    default:
      return state;
  }
};
export default settingsReduser;