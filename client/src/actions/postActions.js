import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_SUCCESS_AND_FINISH,
  GET_POSTS_FAIL,
  GET_POST_DETAIL_REQUEST,
  GET_POST_DETAIL_SUCCESS,
  GET_POST_DETAIL_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  GET_MOST_VIEWS_POSTS_REQUEST,
  GET_MOST_VIEWS_POSTS_SUCCESS,
  GET_MOST_VIEWS_POSTS_FAIL,
  SEARCH_POSTS_REQUEST,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_FAIL,
  SEARCH_POSTS_RESET,
} from "../constants/postConstants";
import axios from "axios";

export const getPosts = (skip, limit) => async (dispatch) => {
  dispatch({ type: GET_POSTS_REQUEST });
  try {
    const url = `/api/posts?skip=${skip}&limit=${limit}`;
    const { data } = await axios.get(url);
    if (data.hasMore) {
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: GET_POSTS_SUCCESS_AND_FINISH,
        payload: data,
      });
    }
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
    const { data } = await axios.post(`/api/posts/create`, payload, config);
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

export const getMostViews = () => async (dispatch) => {
  dispatch({ type: GET_MOST_VIEWS_POSTS_REQUEST });
  try {
    const { data } = await axios.get(`/api/posts/mostviewsposts`);
    dispatch({
      type: GET_MOST_VIEWS_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MOST_VIEWS_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const handleSearch = (keyword) => async (dispatch) => {
  console.log("keyword: ", keyword);
  dispatch({ type: SEARCH_POSTS_REQUEST });
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axios.post(
      `/api/posts/search?keyword=${keyword}`,
      {},
      config
    );
    dispatch({
      type: SEARCH_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
