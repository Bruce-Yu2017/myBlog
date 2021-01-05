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
  SET_INFINITY_SKIP_COUNT,
  SET_FIRST_RENDER,
  GET_POSTS_BY_TAG_REQUEST,
  GET_POSTS_BY_TAG_SUCCESS,
  GET_POSTS_BY_TAG_FAIL,
  THUMB_UP_REQUEST,
  THUMB_UP_SUCCESS,
  THUMB_UP_FAIL,
  UPDATE_POST_BY_THUMBUP,
} from "../constants/postConstants";
import { UPDATE_USER_BY_THUMBUP } from "../constants/userConstants";
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

export const setSkipCount = (skip) => (dispatch) => {
  dispatch({
    type: SET_INFINITY_SKIP_COUNT,
    payload: skip,
  });
};

export const setFirstRender = (isFirstRender) => (dispatch) => {
  dispatch({
    type: SET_FIRST_RENDER,
    payload: isFirstRender,
  });
};

export const findPostByTag = (tag) => async (dispatch) => {
  dispatch({ type: GET_POSTS_BY_TAG_REQUEST });
  try {
    const { data } = await axios.get(`/api/posts/tags?tag=${tag}`);
    console.log("data: ", data);
    dispatch({
      type: GET_POSTS_BY_TAG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_POSTS_BY_TAG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setThumbup = (postId) => async (dispatch) => {
  dispatch({ type: THUMB_UP_REQUEST });
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/posts/thumbUp/${postId}`,
      {},
      config
    );
    dispatch({
      type: THUMB_UP_SUCCESS,
      payload: data.post,
    });
    dispatch({
      type: UPDATE_POST_BY_THUMBUP,
      payload: data.post,
    });
    dispatch({
      type: UPDATE_USER_BY_THUMBUP,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: THUMB_UP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
