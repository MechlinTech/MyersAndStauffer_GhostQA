// reducer.js
import {
  FETCH_REQUEST,
  FETCH_EXECUTION_HISTORY_SUCCESS,
  FETCH_STEP_DETAILS_SUCCESS,
  FETCH_FAILURE,
} from "../../actions/testlab/ResultAction";

const initialState = {
  loading: false,
  executionDetail: null,
  runIdDetails: null,
  error: null,
};

const executionHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_EXECUTION_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        executionDetail: action.payload,
      };
    case FETCH_STEP_DETAILS_SUCCESS:
      return { ...state, runIdDetails: action.payload, error: null };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default executionHistoryReducer;
