import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_SUCCESS_AND_FINISH,
  GET_POSTS_FAIL,
  GET_POSTS_RESET,
  GET_POST_DETAIL_REQUEST,
  GET_POST_DETAIL_SUCCESS,
  GET_POST_DETAIL_FAIL,
  GET_POST_DETAIL_RESET,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_RESET,
  ADD_NEW_POST_TO_EXIST_POSTS,
  SET_INFINITY_SKIP_COUNT,
  SET_FIRST_RENDER,
  GET_MOST_VIEWS_POSTS_REQUEST,
  GET_MOST_VIEWS_POSTS_SUCCESS,
  GET_MOST_VIEWS_POSTS_FAIL,
  SEARCH_POSTS_REQUEST,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_FAIL,
  SEARCH_POSTS_RESET,
  GET_POSTS_BY_TAG_REQUEST,
  GET_POSTS_BY_TAG_SUCCESS,
  GET_POSTS_BY_TAG_FAIL,
  GET_POSTS_BY_TAG_RESET,
  THUMB_UP_REQUEST,
  THUMB_UP_SUCCESS,
  THUMB_UP_FAIL,
  UPDATE_POST_BY_THUMBUP,
  THUMB_UP_RESET,
} from "../constants/postConstants";

export const postsListReducer = (
  state = { loading: false, posts: [], finished: false },
  action
) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return { ...state, loading: true };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.payload.posts],
      };
    case GET_POSTS_SUCCESS_AND_FINISH:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.payload.posts],
        finished: true,
      };
    case ADD_NEW_POST_TO_EXIST_POSTS:
      return {
        ...state,
        loading: false,
        posts: [action.payload, ...state.posts],
      };
    case UPDATE_POST_BY_THUMBUP:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === action.payload._id
            ? { ...post, thumpUpCount: action.payload.thumpUpCount }
            : post
        ),
      };
    case GET_POSTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_POSTS_RESET:
      return { loading: false, posts: [], finished: false };
    default:
      return state;
  }
};

export const skipCountReducer = (state = { skip: 0 }, action) => {
  switch (action.type) {
    case SET_INFINITY_SKIP_COUNT:
      return { skip: action.payload };
    default:
      return state;
  }
};

export const firstRenderReducer = (state = { isFirstRender: true }, action) => {
  switch (action.type) {
    case SET_FIRST_RENDER:
      return { isFirstRender: false };
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

export const getMostViewsPostReducer = (
  state = { loading: false, posts: [] },
  action
) => {
  switch (action.type) {
    case GET_MOST_VIEWS_POSTS_REQUEST:
      return { ...state, loading: true };
    case GET_MOST_VIEWS_POSTS_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case GET_MOST_VIEWS_POSTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchPostReducer = (
  state = { loading: false, posts: [] },
  action
) => {
  switch (action.type) {
    case SEARCH_POSTS_REQUEST:
      return { ...state, loading: true };
    case SEARCH_POSTS_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case SEARCH_POSTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case SEARCH_POSTS_RESET:
      return { loading: false, posts: [] };
    default:
      return state;
  }
};

export const getTagPostsReducer = (
  state = { loading: false, posts: [] },
  action
) => {
  switch (action.type) {
    case GET_POSTS_BY_TAG_REQUEST:
      return { ...state, loading: true };
    case GET_POSTS_BY_TAG_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case GET_POSTS_BY_TAG_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_POSTS_BY_TAG_RESET:
      return { loading: false, posts: [] };
    default:
      return state;
  }
};

export const thumbupReducer = (
  state = { loading: false, post: {} },
  action
) => {
  switch (action.type) {
    case THUMB_UP_REQUEST:
      return { ...state, loading: true };
    case THUMB_UP_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case THUMB_UP_FAIL:
      return { ...state, loading: false, error: action.payload };
    case THUMB_UP_RESET:
      return { loading: false, post: {} };
    default:
      return state;
  }
};
