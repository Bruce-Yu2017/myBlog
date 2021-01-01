import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/postActions";
import Post from "./Post";
import { Button, Row, Col } from "react-bootstrap";
import { checkAuthStatus } from "../actions/userActions";
import Loader from "./Loader";
import { GET_POSTS_RESET } from "../constants/postConstants";

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { postsList } = useSelector((state) => state);
  const { posts, loading, finished } = postsList;

  const { userAuth } = useSelector((state) => state);
  const { userInfo } = userAuth;

  const [skip, setSkip] = useState(0);

  const [firstRender, setFirstRender] = useState(true);

  const limit = 10;
  const handleScroll = (e) => {
    const rectTop = document.getElementById("loader").getBoundingClientRect()
      .top;
    if (rectTop < window.innerHeight && !loading && !finished) {
      const newCount = skip + limit;
      setSkip(newCount);
      dispatch(getPosts(newCount, limit));
    }
  };

  useEffect(() => {
    dispatch({ type: GET_POSTS_RESET });
  }, [dispatch]);

  useEffect(() => {
    if (!finished && firstRender) {
      dispatch(getPosts(0, limit));
      setFirstRender(false);
    }
  }, [dispatch, finished, firstRender]);

  const handleCreatePost = () => {
    dispatch(checkAuthStatus());
    setTimeout(() => {
      history.push("/newpost");
    }, 100);
  };

  return (
    <div id="wrapper" onScroll={handleScroll}>
      {userInfo && (
        <Row>
          <Col className="d-flex justify-content-end">
            <Button onClick={() => handleCreatePost()}>Create New Post</Button>
          </Col>
        </Row>
      )}

      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} post={post} />)}
      <div id="loader" className="mb-2">
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default HomeScreen;
