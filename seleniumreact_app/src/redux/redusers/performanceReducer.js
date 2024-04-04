import { GET_LOC_COUNT,GET_USER_COUNT,RESET_LOC_COUNT,RESET_USER_COUNT,SCENARIO_COUNT } from "../actions/performanceAction";

const initialState = {
 virtualUser:0,
 totalLocation:0,
 totalScenario:0
};

const performanceReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case SCENARIO_COUNT: {
        return {
          ...state,
          totalScenario: action.payload,
        };
      }
    default:
      return state;
  }
};
export default performanceReducer;