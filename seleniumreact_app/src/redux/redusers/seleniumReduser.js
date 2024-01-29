import {GET_TEST_CASE_LIST, GET_APPLICATION_LIST,GET_TEST_SUITS, GET_TEST_SUITS_LIST, GET_TEST_RUN_DETAILS_LIST, GET_TEST_CASE_DETAILS, GET_TEST_CASE_STESPS, GET_ENVIRONMENT_LIST, GET_BROWSER_LIST } from "../actions/seleniumAction";

const initialState = {
  testSuits: [],
  testSuiteLists: [],
  testCaseDetils:[],
  testCaseSteps:[],
  applicationList:[],
  environementList:[],
  browserList:[],
  testCasesList:[]
};

const seleniumReduser = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEST_SUITS: {
      return {
        ...state,
        testSuits: action.payload,
      };
    }
    case GET_TEST_SUITS_LIST: {
      return {
        ...state,
        testSuiteLists: action.payload
      }
    }
    case GET_TEST_RUN_DETAILS_LIST: {
        return {
          ...state,
          testSuiteLists: Array.isArray(action.payload) ? action.payload : [],
        }
      }
      case GET_TEST_CASE_DETAILS: {
        return {
          ...state,
          testCaseDetils: action.payload ? action.payload : [],
        }
      }
      case GET_TEST_CASE_STESPS: {
        return {
          ...state,
          testCaseSteps: action.payload ? action.payload : [],
        }
      }
      case GET_APPLICATION_LIST:{
        return {
          ...state,
          applicationList: action.payload
        }
      }
      case GET_ENVIRONMENT_LIST:{
        return {
          ...state,
          environementList: action.payload
        }
      }
      case GET_BROWSER_LIST:{
        return {
          ...state,
          browserList: action.payload
        }
      }
      case GET_TEST_CASE_LIST:{
        return {
          ...state,
          testCasesList: action.payload
        }
      }
    default:
      return state;
  }
};
export default seleniumReduser;
