import {
  GET_LOC_COUNT,
  GET_USER_COUNT,
  IS_USER_OR_DURATION_ZERO,
  SET_SUITE_ID,
  USED_LOCATION,
  LOCATION_OPTIONS,
  SET_SCENARIO_ID,
  SET_SCENARIOS,
} from "../actions/performanceAction";

const initialState = {
  suitId: 0,
  virtualUser: 0,
  totalLocation: 0,
  totalScenario: 0,
  isTotalUserOrDurationZero: true,
  locationOptions: [],
  usedLocation: [],
  scenarioId: "",
  scenarios: null,
};

const performanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOC_COUNT: {
      return {
        ...state,
        totalLocation: action.payload,
      };
    }
    case SET_SUITE_ID: {
      return {
        ...state,
        suitId: action.payload,
      };
    }
    case GET_USER_COUNT: {
      return {
        ...state,
        virtualUser: action.payload,
      };
    }
    case IS_USER_OR_DURATION_ZERO: {
      return {
        ...state,
        isTotalUserOrDurationZero: action.payload,
      };
    }
    case USED_LOCATION: {
      return {
        ...state,
        usedLocation: action.payload,
      };
    }
    case LOCATION_OPTIONS: {
      const data = action.payload;
      const transformedData = data
        ?.filter((item) => !state.usedLocation?.includes(item.Name))
        .map((item) => ({
          label: item.Name,
          value: item.Name,
        }));
      return {
        ...state,
        locationOptions: transformedData,
      };
    }
    case SET_SCENARIO_ID:
      return {
        ...state,
        scenarioId: action.payload,
      };
    case SET_SCENARIOS:
      return {
        ...state,
        scenarios: action.payload,
      };
   default:
      return state;
  }
};
export default performanceReducer;
