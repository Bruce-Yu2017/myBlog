import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/postActions";
import Post from "./Post";
import { Button, Row, Col } from "react-bootstrap";
import { checkAuthStatus } from "../actions/userActions";

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { postsList } = useSelector((state) => state);
  const { posts } = postsList;
  const { userAuth } = useSelector((state) => state);
  const { userInfo } = userAuth;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleCreatePost = () => {
    dispatch(checkAuthStatus());
    setTimeout(() => {
      history.push("/newpost");
    }, 100);
  };
  return (
    <>
      {userInfo && (
        <Row>
          <Col className="d-flex justify-content-end">
            <Button onClick={() => handleCreatePost()}>Create New Post</Button>
          </Col>
        </Row>
      )}

      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} post={post} />)}
    </>
  );
};

export default HomeScreen;
