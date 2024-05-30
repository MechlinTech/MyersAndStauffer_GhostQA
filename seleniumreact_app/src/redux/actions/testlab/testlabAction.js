export const SET_EXPANDED_NODE = "SET_EXPANDED_NODE";
export const EXPAND_PARENT = "EXPAND_PARENT";
export const SET_ROOT_ID = "SET_ROOT_ID";
export const SET_SELECTED_NODE = "SET_SELECTED_NODE";
export const SCHEDULE_SUITE = "SCHEDULE_SUITE";

export const setRootId = (suitId) => {
  return {
    type: SET_ROOT_ID,
    payload: suitId,
  };
};

export const setSelectedNode = (node) => (dispatch) => { 
    dispatch({
      type: SET_ROOT_ID,
      payload: node.id,
    });

    dispatch({
      type: SET_SELECTED_NODE,
      payload: node,
    });
};
export const setExpandedNodes = (id) => {
  return {
    type: SET_EXPANDED_NODE,
    payload: id,
  };
};

export const ExpandParent = (id) => {
  return {
    type: EXPAND_PARENT,
    payload: id,
  };
};

export const SetSchedule = (isScheduling) => {
  return {
    type: SCHEDULE_SUITE,
    payload:isScheduling
  };
};