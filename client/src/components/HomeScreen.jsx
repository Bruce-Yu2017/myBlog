import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/postActions";
import Post from "./Post";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { postsList } = useSelector((state) => state);
  const { posts } = postsList;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} post={post} />)}
    </>
  );
};

export default HomeScreen;
