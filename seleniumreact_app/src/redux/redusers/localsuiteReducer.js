import {   SET_ROOT_ID,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  SET_EXPANDED_NODE,
  EXPAND_PARENT,
  ADD_WORKSPACE,
  UPDATE_WORKSPACE,
  DELETE_WORKSPACE,
  SET_SELECTED_NODE } from "../actions/localsuiteAction";

const initialState = {
  listData: [],
  isLoading: false,
  error: null,
  selectedNodeId: null,
  selectedNode:null,
  expanded: [],
};

const localsuiteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listData: action.payload,
        error: null,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ADD_WORKSPACE: {
      return {
        ...state,
        listData: [...state.listData, action.payload],
      };
    }
    case UPDATE_WORKSPACE: {
      const newNode = action.payload;

      // Map over the listData array to update the specific node
      const updatedListData = state.listData.map((node) =>
        node.id === newNode.id ? newNode : node
      );

      return {
        ...state,
        listData: updatedListData,
      };
    }
    case DELETE_WORKSPACE: {
      const id = action.payload;

      // Map over the listData array to update the specific node
      const updatedListData = state.listData.filter((node) =>
        node.id !== id
      );

      return {
        ...state,
        listData: updatedListData,
      };
    }
    case SET_ROOT_ID: {
      return {
        ...state,
        selectedNodeId: action.payload,
      };
    }
    case SET_SELECTED_NODE: {
      return {
        ...state,
        selectedNode: state.listData.find((data)=>data.id === state.selectedNodeId)
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
      return state
    }
    default:
      return state;
  }
};
export default localsuiteReducer;
