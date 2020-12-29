import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { postsListReducer, postDetailReducer } from "./reducers/postReducers";
import { userAuthReducer } from "./reducers/userReducers";

const reducers = combineReducers({
  postsList: postsListReducer,
  postDetail: postDetailReducer,
  userAuth: userAuthReducer,
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
