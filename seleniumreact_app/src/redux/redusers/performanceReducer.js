import {
  GET_LOC_COUNT,
  GET_USER_COUNT,
  IS_USER_OR_DURATION_ZERO,
  SET_SUITE_ID,
  USED_LOCATION,
  LOCATION_OPTIONS
} from "../actions/performanceAction";
import {
  SET_SCENARIO_ID,
  SET_SCENARIOS,
} from "../actions/performanceAction";
import {
  FETCH_PROPERTY_DATA_REQUEST,
  FETCH_PROPERTY_DATA_SUCCESS,
  FETCH_PROPERTY_DATA_FAILURE,
  DELETE_PROPERTY,
  ADD_PROPERTY,
} from "../actions/performanceAction";
const initialState = {
  suitId: 0,
  virtualUser: 0,
  totalLocation: 0,
  totalScenario: 0,
  isTotalUserOrDurationZero: true,
  // following are for location tab
  locationOptions: [],
  usedLocation: [],
  scenarioId: "",
  scenarios: null,
  // following are for test data
  // following are for properties
  propertyData: [],
  propertyLoading: false,
  propertyError: null,
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
  

    // following are for test data
   
    // following are for property
    case FETCH_PROPERTY_DATA_REQUEST:
      return {
        ...state,
        propertyLoading: true,
        propertyError: null,
      };
    case FETCH_PROPERTY_DATA_SUCCESS:
      return {
        ...state,
        propertyData: action.payload,
        propertyLoading: false,
        propertyError: null,
      };
    case FETCH_PROPERTY_DATA_FAILURE:
      return {
        ...state,
        propertyLoading: false,
        propertyError: action.payload,
      };
    case DELETE_PROPERTY:
      return {
        ...state,
        propertyData: state.propertyData.filter(
          (item) => item.Id !== action.payload
        ),
      };
    case ADD_PROPERTY:
      const { performanceFileId, name, value } = action.payload;
      const maxId = state.propertyData.reduce(
        (max, item) => Math.max(max, item.Id),
        0
      );
      const newProperty = {
        Id: maxId + 1,
        PerformanceFileId: performanceFileId,
        Name: name,
        Value: value,
      };
      return {
        ...state,
        propertyData: [...state.propertyData, newProperty],
      };
    default:
      return state;
  }
};
export default performanceReducer;
