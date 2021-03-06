import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  postsListReducer,
  postDetailReducer,
  postCreateReducer,
  getMostViewsPostReducer,
  searchPostReducer,
  skipCountReducer,
  firstRenderReducer,
  getTagPostsReducer,
  thumbupReducer,
  replyOrCommentReducer,
} from "./reducers/postReducers";
import { userAuthReducer, authStatusReducer } from "./reducers/userReducers";

const reducers = combineReducers({
  postsList: postsListReducer,
  postDetail: postDetailReducer,
  userAuth: userAuthReducer,
  postCreate: postCreateReducer,
  authStatus: authStatusReducer,
  getMostViewsPost: getMostViewsPostReducer,
  searchPost: searchPostReducer,
  skipCount: skipCountReducer,
  firstRender: firstRenderReducer,
  getTagPosts: getTagPostsReducer,
  thumbup: thumbupReducer,
  replyOrComment: replyOrCommentReducer,
});

const userInfoFromLocalstorage = localStorage.getItem("loginUser")
  ? JSON.parse(localStorage.getItem("loginUser"))
  : null;

const initState = {
  userAuth: userInfoFromLocalstorage
    ? { userInfo: userInfoFromLocalstorage }
    : {},
};

const store = createStore(
  reducers,
  initState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
