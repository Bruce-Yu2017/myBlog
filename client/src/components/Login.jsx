import React, { useEffect } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const { register, handleSubmit, errors } = useForm({ mode: "all" });
  const dispatch = useDispatch();

  const { userAuth } = useSelector((state) => state);
  const { loading, userInfo, error } = userAuth;

  const submitHandler = ({ email, password }) => {
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (userInfo) {
      history.goBack();
    }
  }, [history, userInfo]);
  return (
    <div>
      {loading && <Loader />}
      <Row className="justify-content-md-center mt-3">
        <Col xs={12} md={6}>
          <h1 className="text-center">Sign In</h1>
          {error && <Message variant="danger">{error}</Message>}

          <Form className="mt-3" onSubmit={handleSubmit(submitHandler)}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email:"
                name="email"
                ref={register({ required: true })}
              ></Form.Control>
              {errors.email && (
                <Alert variant="danger" className="mt-2">
                  Email is required.
                </Alert>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password:"
                name="password"
                ref={register({
                  required: "Password is required",
                })}
              ></Form.Control>
              {errors.password && (
                <Alert variant="danger" className="mt-2">
                  {errors.password.message}
                </Alert>
              )}
            </Form.Group>
            <Button type="submit">Login</Button>
          </Form>
          <Row className="py-3">
            <Col>
              New Customer? <Link to={"/register"}>Register</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
