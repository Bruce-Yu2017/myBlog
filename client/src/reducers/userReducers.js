import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_AUTH_STATUS_REQUEST,
  USER_AUTH_STATUS_SUCCESS,
  USER_AUTH_STATUS_FAIL,
  USER_AUTH_STATUS_RESET,
  UPDATE_USER_BY_THUMBUP,
} from "../constants/userConstants";

export const userAuthReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_USER_BY_THUMBUP:
      return { loading: false, userInfo: action.payload };
    case USER_LOGOUT:
      localStorage.removeItem("loginUser");
      return {};
    default:
      return state;
  }
};

export const authStatusReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_AUTH_STATUS_REQUEST:
      return { loading: true };
    case USER_AUTH_STATUS_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_AUTH_STATUS_FAIL:
      return { loading: false, error: action.payload };
    case USER_AUTH_STATUS_RESET:
      return {};
    default:
      return state;
  }
};
