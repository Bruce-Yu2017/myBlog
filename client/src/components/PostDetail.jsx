import React, { useEffect, useCallback, useMemo } from "react";
import { Card, Row, Col, Badge, Image, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../actions/postActions";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { GET_POST_DETAIL_RESET } from "../constants/postConstants";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import { Element, Leaf } from "./richTextEditor/HelperComponents";

const PostDetail = ({ match }) => {
  const postId = match.params.id;
  const dispatch = useDispatch();
  const { postDetail } = useSelector((state) => state);
  const { loading, post, error } = postDetail;
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
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
      <Container>
        <Link to="/" className="btn btn-light my-3">
          <i className="fas fa-arrow-left mr-1"></i>Go Back
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
                          {post.tags.length > 0 &&
                            post.tags.map((tag, index) => (
                              <Badge
                                variant="success"
                                pill
                                className="ml-2"
                                key={`${tag}${index}`}
                              >
                                {tag}
                              </Badge>
                            ))}
                          <span className="ml-2">Read: {post.readCount}</span>
                        </div>
                      </div>
                    </div>
                  </Card.Subtitle>
                  <Card.Title as="h1">{post.name}</Card.Title>
                  <Card.Text className="small text-info">
                    {post.description}
                  </Card.Text>
                  <div className="bg-white min-height-300 p-1">
                    <Slate editor={editor} value={JSON.parse(post.content)}>
                      <Editable
                        readOnly
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                      />
                    </Slate>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default PostDetail;
