import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { register as registerAction } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";

const Register = ({ history }) => {
  const { register, handleSubmit, errors, watch } = useForm({ mode: "all" });
  const dispatch = useDispatch();

  const password = useRef({});
  password.current = watch("password", "");

  const { userAuth } = useSelector((state) => state);
  const { loading, userInfo, error } = userAuth;

  const submitHandler = ({ name, email, password }) => {
    dispatch(registerAction({ name, email, password }));
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
          <h1 className="text-center">Sign Up</h1>
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
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name:"
                name="name"
                ref={register({ required: true })}
              ></Form.Control>
              {errors.name && (
                <Alert variant="danger" className="mt-2">
                  User name is required.
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
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password:"
                name="confirmPassword"
                ref={register({
                  required: "Confirm Password is required",
                  validate: (value) => {
                    return (
                      value === password.current || "The passwords do not match"
                    );
                  },
                })}
              ></Form.Control>
              {errors.confirmPassword && (
                <Alert variant="danger" className="mt-2">
                  {errors.confirmPassword.message}
                </Alert>
              )}
            </Form.Group>
            <Button type="submit">Register</Button>
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

export default Register;
