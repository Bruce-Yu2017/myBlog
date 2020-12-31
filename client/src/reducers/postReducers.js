import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POST_DETAIL_REQUEST,
  GET_POST_DETAIL_SUCCESS,
  GET_POST_DETAIL_FAIL,
  GET_POST_DETAIL_RESET,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_RESET,
} from "../constants/postConstants";

export const postsListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return { ...state, loading: true };
    case GET_POSTS_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case GET_POSTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDetailReducer = (state = { post: null }, action) => {
  switch (action.type) {
    case GET_POST_DETAIL_REQUEST:
      return { ...state, loading: true };
    case GET_POST_DETAIL_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case GET_POST_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_POST_DETAIL_RESET:
      return { post: null };
    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { ...state, loading: true };
    case POST_CREATE_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case POST_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
