import Header from "./components/Header";
import HomeScreen from "./components/HomeScreen";
import PostDetail from "./components/PostDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateNewPost from "./components/CreateNewPost";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Route component={PostDetail} path="/post/:id" />
        <Route component={Login} path="/login" />
        <Route component={Register} path="/register" />
        <Route component={CreateNewPost} path="/newpost" />
        <Route component={HomeScreen} path="/" exact />
      </Container>
    </Router>
  );
}

export default App;
