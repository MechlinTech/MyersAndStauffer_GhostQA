import {
  GET_TEST_SUITS,
  GET_USER_LIST,
  GET_PERFORMANCE_INTEGRATION,
} from "../actions/settingAction";

const initialState = {
  testSuitsList: [],
  virtualUser: 0,
  totalLocation: 0,
  testUserList: [],
  performanceIntegration: [],
};

const settingsReduser = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEST_SUITS: {
      return {
        ...state,
        testSuitsList: action.payload,
      };
    }
    case GET_USER_LIST: {
      return {
        ...state,
        testUserList: action.payload,
      };
    }
    case GET_PERFORMANCE_INTEGRATION: {
      return {
        ...state,
        performanceIntegration: action.payload,
      };
    }
    default:
      return state;
  }
};
export default settingsReduser;
