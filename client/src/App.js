import React from "react";
import Header from "./components/Header";
import HomeScreen from "./components/HomeScreen";
import PostDetail from "./components/PostDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateNewPost from "./components/CreateNewPost";
import ProtectedRoute from "./components/ProtectedRoute";
import Tag from "./components/Tag";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route component={PostDetail} path="/post/:id" />
        <Route component={Login} path="/login" />
        <Route component={Register} path="/register" />
        <Route component={Tag} path="/tag/:tag" />
        <ProtectedRoute path="/newpost" component={CreateNewPost} />
        <Route component={HomeScreen} path="/" exact />
      </Switch>
    </Router>
  );
}

export default App;
