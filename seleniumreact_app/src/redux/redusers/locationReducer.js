import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  ADD_LOCATION,
  DELETE_LOCATION,
  UPDATE_LOCATION,
  GET_LOCATION_LISTS,
  DELETE_LOCATION_SETTING,
  GET_AGENTS_LISTS,
  ADD_AGENTS
} from "../actions/locationAction";

const initialState = {
  locations: null,
  totalUsers: 0,
  totalTrafficPercent: 0,
  error: null,
  isLoading: false,
  locationList: [],
  agentsData: [],
  addAgents: []
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case ADD_LOCATION: {
      const loc = action.payload[0];
      console.log("loc", loc);
      const { id, name, numberUser, percentageTraffic, performanceFileId } =
        loc;
      const newLocation = {
        Id: id,
        Name: name,
        NumberUser: numberUser,
        PercentageTraffic: percentageTraffic,
        PerformanceFileId: performanceFileId,
      };
      return {
        ...state,
        totalTrafficPercent:
          state.totalTrafficPercent + parseFloat(percentageTraffic),
        locations: [...state.locations, newLocation],
      };
    }
    case DELETE_LOCATION: {
      const locationToDel = state.locations.find(
        (loc) => loc.Id === action.payload
      );
      return {
        ...state,
        totalTrafficPercent:
          state.totalTrafficPercent - locationToDel.PercentageTraffic,
        locations: state.locations.filter((item) => item.Id !== action.payload),
      };
    }
    case UPDATE_LOCATION: {
      const newTraffic =
        state.totalTrafficPercent +
        (parseInt(action.payload.PercentageTraffic) -
          parseInt(
            state.locations.find((item) => item.Id === action.payload.Id)
              .PercentageTraffic
          ));
      console.log("new", newTraffic);
      // return {
      //   ...state,
      //   totalTrafficPercent:state.totalTrafficPercent+parseInt(percentageTraffic),
      //   locations: state.locations.map(
      //     (item) => {
      //       if(item.Id === action.payload.Id){
      //         return action.payload
      //       }else
      //       return item
      //     }
      //   ),
      // };
      return {
        ...state,
        totalTrafficPercent:
          state.totalTrafficPercent +
          (parseInt(action.payload.PercentageTraffic) -
            parseInt(
              state.locations.find((item) => item.Id === action.payload.Id)
                .PercentageTraffic
            )),
        locations: state.locations.map((item) => {
          if (item.Id === action.payload.Id) {
            return action.payload;
          }
          return item;
        }),
      };
    }
    case GET_LOCATION_LISTS:
      return {
        ...state,
        locationList: action.payload,
      };
    case DELETE_LOCATION_SETTING:
      return {
        ...state,
        locationList: state.locationList.filter(
          (item) => item.ref !== action.payload
        ),
      };
    case GET_AGENTS_LISTS:
      return {
        ...state,
        agentsData: action.payload,
      };
      case ADD_AGENTS: return{ 
        ...state,
        addAgents: action.payload
      }
    default:
      return state;
  }
};
export default locationReducer;
