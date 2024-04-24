import axios from "axios";
import { toast } from "react-toastify";
import { header, headerForm } from "../../../utils/authheader";
import { getBaseUrl } from "../../../utils/configService";
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const SET_ROOT_ID = "SET_ROOT_ID";
export const SET_SELECTED_NODE = "SET_SELECTED_NODE";
export const SET_EXPANDED_NODE = "SET_EXPANDED_NODE";
export const EXPAND_PARENT = "EXPAND_PARENT";
export const ADD_WORKSPACE = "ADD_WORKSPACE";
export const UPDATE_WORKSPACE = "UPDATE_WORKSPACE";
export const DELETE_WORKSPACE = "DELETE_WORKSPACE";
export const SELECTED_SUITE = "SELECTED_SUITE";


// const BASE_URL = process.env.REACT_APP_BASE_URL;



export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST
});

export const fetchDataSuccess = data => ({
  type: FETCH_DATA_SUCCESS,
  payload: data
});

export const fetchDataFailure = error => ({
  type: FETCH_DATA_FAILURE,
  payload: error
});

export const fetchWorkSpaces = () => {
  return async dispatch => {
    dispatch(fetchDataRequest());
    try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.get(
        `${BASE_URL}/Performance/GetProjectData`,
        header()
      );
      dispatch(fetchDataSuccess(response.data == "" ? [] : response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error));
    }
  };
};

export const AddWorkspace = (workspace)=>{
  return {
    type: ADD_WORKSPACE,
    payload: workspace,
  };
}
export const UpdateWorkspace = (workspace)=>{
  return {
    type: UPDATE_WORKSPACE,
    payload: workspace,
  };
}
export const DeleteWorkspace = (id)=>{
  return {
    type: DELETE_WORKSPACE,
    payload: id,
  };
}
export const setRootId = (suitId)=>{
  console.log("suit id ",suitId)
  return {
    type: SET_ROOT_ID,
    payload: suitId,
  };
}
export const setSelectedNode = ()=>{
  return {
    type: SET_SELECTED_NODE,
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
