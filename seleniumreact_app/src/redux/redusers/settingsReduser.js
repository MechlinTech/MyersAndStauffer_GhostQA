import { GET_TEST_SUITS } from "../actions/settingAction";

const initialState = {
 testSuitsList: []
};

const settingsReduser = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEST_SUITS: {
      return {
        ...state,
        testSuitsList: action.payload,
      };
    }
    default:
      return state;
  }
};
export default settingsReduser;