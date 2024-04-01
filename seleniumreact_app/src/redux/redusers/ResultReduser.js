import { RESULT_LIST, SET_IS_RUNNING, ADD_EXECUTER_DATA, SET_EXECUTEJMX_DATA } from "../actions/ResultAction";

const initialState = {
  resultsList: [],
  isRunning: false,
  executerData: null,
  executeJMXData:{}
};

const resultReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESULT_LIST: {
      return {
        ...state,
        resultsList: action.payload,
      };
    }
    case SET_IS_RUNNING: {
      return {
        ...state,
        isRunning: action.payload,
      };
    }
    case ADD_EXECUTER_DATA: {
      return {
        ...state,
        executerData: action.payload,
      };
    }
    case SET_EXECUTEJMX_DATA: {
      return {
        ...state,
        executeJMXData: action.payload,
      };
    }
    default:
      return state;
  }
};

export default resultReducer;
