import { ElectricalServices } from "@mui/icons-material";
import {
  GET_LOC_COUNT,
  GET_USER_COUNT,
  IS_USER_OR_DURATION_ZERO,
  SET_SUITE_ID,
  USED_LOCATION,
  LOCATION_OPTIONS,
  SET_SCENARIO_ID,
  SET_SCENARIOS,
  SET_EXPANDED_NODE,
  EXPAND_PARENT
} from "../actions/performanceAction";

const initialState = {
  selectedNodeId: 0,
  virtualUser: 0,
  totalLocation: 0,
  totalScenario: 0,
  isTotalUserOrDurationZero: true,
  locationOptions: [],
  usedLocation: [],
  scenarioId: "",
  scenarios: null,
  expanded: [],

};

const performanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOC_COUNT: {
      return {
        ...state,
        totalLocation: action.payload,
      };
    }
    case SET_SUITE_ID: {
      return {
        ...state,
        selectedNodeId: action.payload,
      };
    }
    case SET_EXPANDED_NODE: {
      const id = action.payload;
      // following comment will open only one work space
      // const expandedItem = state.listData.find((data)=>data.id === id)
      // if(expandedItem.parentId === 0){
      //   return{
      //     ...state,
      //     expanded:[id]
      //   }
      // }
      const index = state.expanded?.indexOf(id);
      if (index === -1) {
        return {
          ...state,
          expanded: [...(state.expanded || []), id],
        };
      } else {
        const newExpanded = [
          ...state.expanded.slice(0, index),
          ...state.expanded.slice(index + 1),
        ];
        return {
          ...state,
          expanded: newExpanded,
        };
      }
    }
    case EXPAND_PARENT: {
      const id = action.payload;
      const index = state.expanded?.indexOf(id);
      if (index === -1) {
        return {
          ...state,
          expanded: [...(state.expanded || []), id],
        };
      }
      return state;
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
    case USED_LOCATION: {
      return {
        ...state,
        usedLocation: action.payload,
      };
    }
    case LOCATION_OPTIONS: {
      const data = action.payload;
      const groupedOptions = data
        ?.filter((item) => !state.usedLocation?.includes(item.value))
        .reduce((acc, curr) => {
        const group = acc.find(group => group.label === curr.category);
        if (group) {
          group.options.push(curr);
        } else {
          acc.push({ label: curr.category, options: [curr] });
        }
        return acc;
      }, []);
      return {
        ...state,
        locationOptions: groupedOptions,
      };
    }
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
   default:
      return state;
  }
};
export default performanceReducer;
