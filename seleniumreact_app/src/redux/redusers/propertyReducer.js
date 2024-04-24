
  import {
    FETCH_PROPERTY_DATA_REQUEST,
    FETCH_PROPERTY_DATA_SUCCESS,
    FETCH_PROPERTY_DATA_FAILURE,
    DELETE_PROPERTY,
    ADD_PROPERTY,
  } from "../actions/propertyAction";
  const initialState = {
    propertyData: [],
    propertyLoading: false,
    propertyError: null,
  };
  
  const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
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
  export default propertyReducer;
  