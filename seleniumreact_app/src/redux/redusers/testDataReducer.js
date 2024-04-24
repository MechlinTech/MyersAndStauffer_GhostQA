import {
    FETCH_TEST_DATA_REQUEST,
    FETCH_TEST_DATA_SUCCESS,
    FETCH_TEST_DATA_FAILURE,
    DELETE_TEST_DATA,
  } from "../actions/testDataAction";

  const initialState = {
    testDataList: [],
    testLoading: false,
    testError: null,
  };
  
  const testdataReducer = (state = initialState, action) => {
    switch (action.type) {
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
      default:
        return state;
    }
  };
  export default testdataReducer;
  