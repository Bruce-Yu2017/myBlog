import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, setSkipCount, setFirstRender } from "../actions/postActions";
import Post from "./Post";
import { Button, Row, Col, Container } from "react-bootstrap";
import { checkAuthStatus } from "../actions/userActions";
import Loader from "./Loader";
import { SET_FIRST_RENDER } from "../constants/postConstants";

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { postsList } = useSelector((state) => state);
  const { posts, loading, finished } = postsList;

  const { userAuth } = useSelector((state) => state);
  const { userInfo } = userAuth;

  const limit = 10;
  const { skipCount } = useSelector((state) => state);
  const { skip } = skipCount;

  const { firstRender } = useSelector((state) => state);
  const { isFirstRender } = firstRender;

  const handleScroll = (e) => {
    const rectTop = document.getElementById("loader").getBoundingClientRect()
      .top;
    if (rectTop < window.innerHeight && !loading && !finished) {
      const newCount = skip + limit;
      dispatch(setSkipCount(newCount));
      dispatch(getPosts(newCount, limit));
    }
  };

  useEffect(() => {
    if (!finished && isFirstRender) {
      dispatch(getPosts(0, limit));
      dispatch(setFirstRender({ type: SET_FIRST_RENDER, payload: false }));
    }
  }, [dispatch, finished, isFirstRender]);

  const navigateToCreatePageCallBack = () => {
    history.push("/newpost");
  };

  const handleCreatePost = () => {
    dispatch(checkAuthStatus(navigateToCreatePageCallBack));
  };

  const { thumbup } = useSelector((state) => state);
  const { error: thumbUpError } = thumbup;

  useEffect(() => {
    if (thumbUpError) {
      history.push("/login");
    }
  }, [history, thumbUpError]);

  return (
    <>
      <div className="wrapper" onScroll={handleScroll}>
        <Container>
          {userInfo && (
            <Row>
              <Col className="d-flex justify-content-end pt-2">
                <Button
                  onClick={() => handleCreatePost()}
                  className="btn btn-success py-1 mb-2"
                >
                  New Post
                </Button>
              </Col>
            </Row>
          )}
          <div>
            {posts.length > 0 &&
              posts.map((post) => <Post key={post._id} post={post} />)}
            <div id="loader" className="mb-2">
              {loading && <Loader />}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomeScreen;
