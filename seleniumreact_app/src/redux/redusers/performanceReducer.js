import {
  GET_LOC_COUNT,
  GET_USER_COUNT,
  RESET_LOC_COUNT,
  RESET_USER_COUNT,
  SCENARIO_COUNT,
  IS_USER_OR_DURATION_ZERO,
} from "../actions/performanceAction";
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  SET_SCENARIO_ID,
  SET_SCENARIOS,
  ADD_LOCATION,
  DELETE_LOCATION
} from "../actions/performanceAction";
import {
  FETCH_TEST_DATA_REQUEST,
  FETCH_TEST_DATA_SUCCESS,
  FETCH_TEST_DATA_FAILURE,
  DELETE_TEST_DATA,
} from "../actions/performanceAction";

import {
  FETCH_PROPERTY_DATA_REQUEST,
  FETCH_PROPERTY_DATA_SUCCESS,
  FETCH_PROPERTY_DATA_FAILURE,
  DELETE_PROPERTY,
  ADD_PROPERTY,
} from "../actions/performanceAction";
const initialState = {
  virtualUser: 0,
  totalLocation: 0,
  totalScenario: 0,
  isTotalUserOrDurationZero: true,
  // following are for location tab
  locations: null,
  totalUsers: 0,
  totalTrafficPercent: 0,
  error: null,
  isLoading: false,
  scenarioId: "",
  scenarios: null,

  // following are for test data
  testDataList: [],
  testLoading: false,
  testError: null,

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
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      const { totalUsers, totalTraficPercent, locationData } = action.payload;
      return {
        ...state,
        locations: locationData,
        totalUsers,
        totalTrafficPercent: totalTraficPercent,
        isLoading: false,
        error: null,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
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
    case ADD_LOCATION:{
      const { name, numberUser, percentageTraffic, performanceFileId } = action.payload;
      const maxId = state.locations.reduce(
        (max, item) => Math.max(max, item.Id),
        0
      );
      const newLocation = {
        Id: maxId+1,
        Name: name,
        NumberUser: numberUser,
        PercentageTraffic: percentageTraffic,
        PerformanceFileId: performanceFileId,
      };
      return {
        ...state,
        locations:[...state.locations,newLocation]
      };
    }
    case DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(
          (item) => item.Id !== action.payload
        ),
      };
      
    // following are for test data
    case FETCH_TEST_DATA_REQUEST:
      return { ...state, testLoading: true, testError: null };
    case FETCH_TEST_DATA_SUCCESS:
      return {
        ...state,
        testLoading: false,
        testDataList: action.payload,
        testError: null,
      };
    case FETCH_TEST_DATA_FAILURE:
      return { ...state, testLoading: false, testError: action.payload };
    case DELETE_TEST_DATA:
      return {
        ...state,
        testDataList: state.testDataList.filter(
          (item) => item.Id !== action.payload
        ),
      };
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
