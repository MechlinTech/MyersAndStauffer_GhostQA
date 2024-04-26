import { GET_TEST_SUITS,GET_LOC_COUNT,GET_USER_COUNT,RESET_LOC_COUNT,RESET_USER_COUNT, GET_USER_LIST } from "../actions/settingAction";

const initialState = {
 testSuitsList: [],
 virtualUser:0,
 totalLocation:0,
 testUserList:[]
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
      }
    }
    default:
      return state;
  }
};
export default settingsReduser;