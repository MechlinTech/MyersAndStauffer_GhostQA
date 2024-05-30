import {
  SET_EXPANDED_NODE,
  EXPAND_PARENT,
  SET_ROOT_ID,
  SET_SELECTED_NODE,
  SCHEDULE_SUITE
} from "../../actions/testlab/testlabAction";

const initialState = {
  selectedNode:null,
  selectedNodeId: 0,
  expanded: [],
  isScheduling:false
};

const testlabReduer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_NODE:{
      return {
        ...state,
        selectedNode:action.payload
      }
    }
    case SET_ROOT_ID: {
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
    case SCHEDULE_SUITE: {
      return {
        ...state,
        isScheduling: action.payload,
      };
    }
    default:
      return state;
  }
};
export default testlabReduer;
