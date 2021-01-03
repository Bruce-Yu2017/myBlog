import React, { useEffect, useState } from "react";
import { Row, Col, Form, Alert, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { createPost, setSkipCount } from "../actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import EditorMain from "./richTextEditor/EditorMain";
import TagGenerator from "./TagGenerator";
import { Node } from "slate";
import {
  POST_CREATE_RESET,
  ADD_NEW_POST_TO_EXIST_POSTS,
} from "../constants/postConstants";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const CreateNewPost = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({ mode: "all" });
  const dispatch = useDispatch();

  const { userAuth } = useSelector((state) => state);
  const { loading, userInfo, error } = userAuth;

  const { postCreate } = useSelector((state) => state);
  const {
    loading: createPostLoading,
    post,
    error: createPostError,
  } = postCreate;

  const { skipCount } = useSelector((state) => state);
  const { skip } = skipCount;

  const [tags, setTags] = useState([]);
  const [content, setContent] = useState(null);
  const [contentError, setContentError] = useState(false);

  const [firstRender, setFirstRender] = useState(true);

  const serialize = (nodes) => {
    return nodes.map((n) => Node.string(n)).join("\n");
  };
  const submitHandler = ({ title, description }) => {
    setFirstRender(false);
    if (content === null || serialize(content).length === 0) {
      setContentError(true);
      return;
    }
    const payload = {
      name: title,
      description,
      tags: tags.map((tag) => tag.text),
      content: JSON.stringify(content),
    };
    dispatch(createPost(payload));
  };

  const handleSetContent = (value) => {
    setFirstRender(false);
    setContent(value);
    setContentError(serialize(value).length === 0);
  };

  useEffect(() => {
    dispatch({ type: POST_CREATE_RESET });
  }, [dispatch, skip]);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  useEffect(() => {
    if (post) {
      dispatch({ type: ADD_NEW_POST_TO_EXIST_POSTS, payload: post });
      dispatch(setSkipCount(skip + 1));
      history.push(`/post/${post._id}`);
    }
  }, [dispatch, history, post, skip]);
  return (
    <div>
      <Container>
        {loading && <Loader />}
        {createPostLoading && <Loader />}
        <Row className="justify-content-md-center mt-1 mb-3">
          <Col xs={12} md={8}>
            <Link to="/" className="btn btn-light my-3">
              <i className="fas fa-arrow-left mr-1"></i>Go Back
            </Link>
            <h2 className="text-center">Create New Post</h2>
            {error && <Message variant="danger">{error}</Message>}
            {createPostError && (
              <Message variant="danger">{createPostError}</Message>
            )}

            <Form className="mt-3" onSubmit={handleSubmit(submitHandler)}>
              <Form.Group>
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title:"
                  name="title"
                  ref={register({ required: true })}
                ></Form.Control>
                {errors.title && (
                  <Alert variant="danger" className="mt-2">
                    Title is required.
                  </Alert>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Post Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description:"
                  name="description"
                  ref={register({ required: true })}
                ></Form.Control>
                {errors.description && (
                  <Alert variant="danger" className="mt-2">
                    Description is required.
                  </Alert>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Post Tag</Form.Label>
                <TagGenerator addTag={setTags} />
              </Form.Group>
              <EditorMain addContent={handleSetContent} />
              {!firstRender &&
                (contentError ||
                  content == null ||
                  serialize(content).length === 0) && (
                  <Alert variant="danger" className="mt-2">
                    Post content is required.
                  </Alert>
                )}
              <div className="d-flex justify-content-end">
                <Button
                  type="submit"
                  className="text-right mt-2 btn btn-success"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateNewPost;
