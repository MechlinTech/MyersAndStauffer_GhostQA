import { orange } from "@material-ui/core/colors";
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_ORGANIZATION,
  FETCH_USERS,
  SWITCH_URSER,
} from "../actions/userActions";

const initialState = {
  loading: false,
  user: null,
  organizationDetails: null,
  members: [],
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    case FETCH_ORGANIZATION:
      return {
        ...state,
        loading: false,
        organizationDetails: action.payload,
      };
    case FETCH_USERS:
      return {
        ...state,
        loading: false,
        members: action.payload,
      };
    case SWITCH_URSER:
      const changedUser = action.payload;
      const updatedMember = state.members.map((user) =>
        user.Id === changedUser.userId
          ? { ...user, IsDisabled: changedUser.isDisabled }
          : user
      );
      return {
        ...state,
        members: updatedMember,
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        // user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
