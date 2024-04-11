import { GET_LOC_COUNT,GET_USER_COUNT,RESET_LOC_COUNT,RESET_USER_COUNT,SCENARIO_COUNT,IS_USER_OR_DURATION_ZERO } from "../actions/performanceAction";
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE,SET_SCENARIO_ID,SET_SCENARIOS } from "../actions/performanceAction"
const initialState = {
 virtualUser:0,
 totalLocation:0,
 totalScenario:0,
 isTotalUserOrDurationZero:true,
 // following are for location tab
 locations: null,
  totalUsers: 0,
  totalTrafficPercent: 0,
  error: null,
  isLoading: false,
  scenarioId:"",
  scenarios:null
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

      // following are for location
      case FETCH_DATA_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null
        };
      case FETCH_DATA_SUCCESS:
        const { totalUsers, totalTraficPercent, locationData } = action.payload;
        return {
          ...state,
          locations: locationData,
          totalUsers,
          totalTrafficPercent: totalTraficPercent,
          isLoading: false,
          error: null
        };
      case FETCH_DATA_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload.error
        };
        case SET_SCENARIO_ID:
          return {
            ...state,
            scenarioId: action.payload
          };
          case SET_SCENARIOS:
            return {
              ...state,
              scenarios: action.payload
            };

    default:
      return state;
  }
};
export default performanceReducer;