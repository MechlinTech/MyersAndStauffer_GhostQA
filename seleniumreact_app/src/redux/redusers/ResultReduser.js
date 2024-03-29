import { RESULT_LIST } from "../actions/ResultAction";

const initialState = {
  resultsList: [],
};

const resultReduser = (state = initialState, action) => {
  switch (action.type) {
    case RESULT_LIST: {
      return {
        ...state,
        resultsList: action.payload,
      };
    }

    default:
      return state;
  }
};
export default resultReduser;
