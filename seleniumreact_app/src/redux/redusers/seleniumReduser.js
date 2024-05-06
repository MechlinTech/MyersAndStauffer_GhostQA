import {
  SUITE_TO_EDIT,
  GET_TEST_CASE_LIST,
  GET_APPLICATION_LIST,
  GET_TEST_SUITS,
  GET_TEST_SUITS_LIST,
  GET_TEST_RUN_DETAILS_LIST,
  GET_TEST_CASE_DETAILS,
  GET_TEST_CASE_STESPS,
  GET_ENVIRONMENT_LIST,
  GET_BROWSER_LIST,
  ADD_TEST_SUITE,
  GET_TEST_USER_LIST,
  EXECUTING_SUITE
} from "../actions/seleniumAction";

const initialState = {
  testSuits: [],
  testSuiteLists: [],
  testCaseDetils: [],
  testCaseSteps: [],
  applicationList: [],
  environementList: [],
  testUserList: [],
  browserList: [],
  testCasesList: [],
  suiteToEdit: null,
  testSuiteAdded: {},
  executingSuite:null
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
        testSuiteLists: action.payload,
      };
    }
    case GET_TEST_RUN_DETAILS_LIST: {
      return {
        ...state,
        testSuiteLists: Array.isArray(action.payload) ? action.payload : [],
      };
    }
    case GET_TEST_CASE_DETAILS: {
      return {
        ...state,
        testCaseDetils: action.payload ? action.payload : [],
      };
    }
    case GET_TEST_CASE_STESPS: {
      return {
        ...state,
        testCaseSteps: action.payload ? action.payload : [],
      };
    }
    case GET_APPLICATION_LIST: {
      return {
        ...state,
        applicationList: action.payload,
      };
    }
    case GET_ENVIRONMENT_LIST: {
      return {
        ...state,
        environementList: action.payload,
      };
    }
    case GET_TEST_USER_LIST: {
      return {
        ...state,
        testUserList: action.payload,
      };
    }
    case GET_BROWSER_LIST: {
      return {
        ...state,
        browserList: action.payload,
      };
    }
    case GET_TEST_CASE_LIST: {
      return {
        ...state,
        testCasesList: action.payload,
      };
    }
    case SUITE_TO_EDIT: {
      return {
        ...state,
        suiteToEdit: action.payload,
      };
    }
    case ADD_TEST_SUITE: {
      return {
        ...state,
        testSuiteAdded: action.payload,
      };
    }
    case EXECUTING_SUITE: {
      return {
        ...state,
        executingSuite: action.payload,
      };
    }
    default:
      return state;
  }
};
export default seleniumReduser;
