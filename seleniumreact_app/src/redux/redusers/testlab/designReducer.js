import {
  FETCH_TEST_CASES_REQUEST,
  FETCH_TEST_CASES_SUCCESS,
  FETCH_TEST_CASES_FAILURE,
  DELETE_TEST_CASE_REQUEST,
  DELETE_TEST_CASE_SUCCESS,
  DELETE_TEST_CASE_FAILURE,
} from "../../actions/testlab/designAction";

const initialState = {
    testCases: [],
    isFetching: false,
    error: null,
    isDeleting: false,
};

const testCaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEST_CASES_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_TEST_CASES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        testCases: action.payload,
      };
    case FETCH_TEST_CASES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
      case DELETE_TEST_CASE_REQUEST:
        return {
          ...state,
          isDeleting: true,
          error: null,
        };
      case DELETE_TEST_CASE_SUCCESS:
        return {
          ...state,
          isDeleting: false,
          testCases: state.testCases.filter(test => test.TestCaseDetailsId !== action.payload),
        };
      case DELETE_TEST_CASE_FAILURE:
        return {
          ...state,
          isDeleting: false,
          error: action.payload,
        };
    default:
      return state;
  }
};

export default testCaseReducer;
