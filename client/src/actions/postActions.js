import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POST_DETAIL_REQUEST,
  GET_POST_DETAIL_SUCCESS,
  GET_POST_DETAIL_FAIL,
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
      payload: error,
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
      payload: error,
    });
  }
};
