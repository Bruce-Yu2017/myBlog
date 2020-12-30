import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/postActions";
import Post from "./Post";
import { Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { postsList } = useSelector((state) => state);
  const { posts } = postsList;
  const { userAuth } = useSelector((state) => state);
  const { userInfo } = userAuth;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <>
      {userInfo && (
        <Row>
          <Col className="d-flex justify-content-end">
            <LinkContainer to="/newpost">
              <Button>Create New Post</Button>
            </LinkContainer>
          </Col>
        </Row>
      )}

      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} post={post} />)}
    </>
  );
};

export default HomeScreen;
