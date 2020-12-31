import Header from "./components/Header";
import HomeScreen from "./components/HomeScreen";
import PostDetail from "./components/PostDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateNewPost from "./components/CreateNewPost";
import ProtectedRoute from "./components/ProtectedRoute";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route component={PostDetail} path="/post/:id" />
          <Route component={Login} path="/login" />
          <Route component={Register} path="/register" />
          <ProtectedRoute path="/newpost" component={CreateNewPost} />
          {/* <Route component={CreateNewPost} path="/newpost" /> */}
          <Route component={HomeScreen} path="/" exact />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
