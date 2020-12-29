import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";
import axios from "axios";

export const login = ({ name, password, email }) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const payload = {
      name,
      password,
      email,
    };
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/users/login", payload, config);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("loginUser", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = ({ name, password, email }) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const payload = {
      name,
      password,
      email,
    };
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/users", payload, config);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    localStorage.setItem("loginUser", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  await axios.post("/api/users/logout", {});
  dispatch({ type: USER_LOGOUT });
  window.location.href = "/login";
};
