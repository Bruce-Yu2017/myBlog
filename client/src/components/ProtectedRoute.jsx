import React, { useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const ProtectedRoute = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { component: Component, ...rest } = props;

  const { authStatus } = useSelector((state) => state);
  const { success, error } = authStatus;
  useEffect(() => {
    if (error) {
      dispatch(logout());
      history.push("/login");
    }
    return () => {};
  }, [dispatch, error, history]);
  return (
    <Route
      {...rest}
      render={() => {
        return success ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default ProtectedRoute;
