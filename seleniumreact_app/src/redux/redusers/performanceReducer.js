import { GET_LOC_COUNT,GET_USER_COUNT,RESET_LOC_COUNT,RESET_USER_COUNT,SCENARIO_COUNT,IS_USER_OR_DURATION_ZERO } from "../actions/performanceAction";

const initialState = {
 virtualUser:0,
 totalLocation:0,
 totalScenario:0,
 isTotalUserOrDurationZero:true
};

const performanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOC_COUNT: {
      return {
        ...state,
        totalLocation:action.payload,
      };
    }
    case GET_USER_COUNT: {
        return {
        ...state,
        virtualUser:action.payload,
      };
    }
    case IS_USER_OR_DURATION_ZERO: {
      return {
      ...state,
      isTotalUserOrDurationZero:action.payload,
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