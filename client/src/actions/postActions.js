import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POST_DETAIL_REQUEST,
  GET_POST_DETAIL_SUCCESS,
  GET_POST_DETAIL_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
} from "../constants/postConstants";
import axios from "axios";

export const getPosts = () => async (dispatch) => {
  dispatch({ type: GET_POSTS_REQUEST });
  try {
    const { data } = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  dispatch({ type: GET_POST_DETAIL_REQUEST });
  try {
    const { data } = await axios.get(`/api/posts/${id}`);
    console.log("data: ", data);
    console.log(JSON.parse(data.content));
    dispatch({
      type: GET_POST_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_POST_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPost = (payload) => async (dispatch) => {
  dispatch({ type: POST_CREATE_REQUEST });
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`/api/posts`, payload, config);
    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
