import React, { useEffect } from "react";
import { Card, Row, Col, Badge, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../actions/postActions";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { GET_POST_DETAIL_RESET } from "../constants/postConstants";

const PostDetail = ({ match }) => {
  const postId = match.params.id;
  const dispatch = useDispatch();
  const { postDetail } = useSelector((state) => state);
  const { loading, post, error } = postDetail;
  useEffect(() => {
    if (post && post._id !== postId) {
      dispatch({ type: GET_POST_DETAIL_RESET });
    }
    if (!post || post._id !== postId) {
      dispatch(getPost(postId));
    }
  }, [dispatch, postId, post]);
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {post && (
        <Card style={{ width: "100%" }} className="mb-1 mt-2">
          <Card.Body>
            <Row>
              <Col>
                <Card.Subtitle className="mb-2 text-muted small">
                  <div className="mb-2 p-2 author-info-block">
                    <Image
                      src={`https://avatars.dicebear.com/4.5/api/human/${post.user.name}.svg`}
                      fluid
                      className="user-thumbnail mr-2"
                    />
                    <div className="author-info-box">
                      <div className="user-name">{post.user.name}</div>
                      <div>
                        <i className="far fa-calendar-alt mr-1"></i>
                        {new Date(post.createdAt).toLocaleDateString()}{" "}
                        <Badge variant="success" pill className="ml-2">
                          {post.tag}
                        </Badge>
                        <span className="ml-2">Read: {post.readCount}</span>
                      </div>
                    </div>
                  </div>
                </Card.Subtitle>
                <Card.Title as="h1">{post.name}</Card.Title>
                <Card.Text className="small text-info">
                  {post.description}
                </Card.Text>
                <Card.Text>{post.content}</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default PostDetail;
