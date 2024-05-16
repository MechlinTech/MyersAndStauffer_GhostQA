export const SET_EXPANDED_NODE = "SET_EXPANDED_NODE";
export const EXPAND_PARENT = "EXPAND_PARENT";
export const SET_ROOT_ID = "SET_ROOT_ID"

export const setRootId = (suitId)=>{
    console.log("suit id ",suitId)
    return {
      type: SET_ROOT_ID,
      payload: suitId,
    };
  }

export const setExpandedNodes = (id)=>{
  return {
    type: SET_EXPANDED_NODE,
    payload: id,
  };
}

export const ExpandParent = (id)=>{
  return {
    type: EXPAND_PARENT,
    payload: id,
  };
}
