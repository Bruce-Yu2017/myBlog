import React, { useEffect } from "react";
import { findPostByTag } from "../actions/postActions";
import { GET_POSTS_BY_TAG_RESET } from "../constants/postConstants";
import { useDispatch, useSelector } from "react-redux";
import { Jumbotron, Container } from "react-bootstrap";
import Post from "./Post";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";

const Tag = ({ match }) => {
  const dispatch = useDispatch();
  const { getTagPosts } = useSelector((state) => state);
  const { loading, posts, error } = getTagPosts;
  const { tag } = match.params;
  useEffect(() => {
    dispatch({ type: GET_POSTS_BY_TAG_RESET });
  }, [dispatch]);

  useEffect(() => {
    dispatch(findPostByTag(tag));
  }, [dispatch, tag]);
  return (
    <div className="tag-container">
      <Jumbotron>
        <h1>{tag}</h1>
        {posts.length > 0 && <span>{posts.length} posts</span>}
      </Jumbotron>

      <Container>
        <Link to="/" className="btn btn-light my-3">
          <i className="fas fa-arrow-left mr-1"></i>Go Back
        </Link>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </Container>
    </div>
  );
};

export default Tag;
