import React, { useEffect, useState } from "react";
import { Row, Col, Form, Alert, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import EditorMain from "./richTextEditor/EditorMain";
import TagGenerator from "./TagGenerator";
import { Node } from "slate";

const CreateNewPost = ({ history }) => {
  const { register, handleSubmit, errors } = useForm({ mode: "all" });
  const dispatch = useDispatch();

  const { userAuth } = useSelector((state) => state);
  const { loading, userInfo, error } = userAuth;

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
      tags,
      content: JSON.stringify(content),
    };
    console.log("payload: ", payload);
  };

  const handleSetContent = (value) => {
    setFirstRender(false);
    setContent(value);
    setContentError(serialize(value).length === 0);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);
  return (
    <div>
      {loading && <Loader />}
      <Row className="justify-content-md-center mt-1 mb-3">
        <Col xs={12} md={8}>
          <h2 className="text-center">Create New Post</h2>
          {error && <Message variant="danger">{error}</Message>}

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
              <Button type="submit" className="text-right mt-2 btn btn-success">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default CreateNewPost;
