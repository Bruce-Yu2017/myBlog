import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Navbar,
  Nav,
  Container,
  Image,
  Dropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state);
  const { userInfo } = userAuth;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" fixed="top">
        <Container>
          <LinkContainer to="/" className="cursor-pointer">
            <Navbar.Brand>
              <i className="fab fa-blogger-b mr-1"></i>Bruce's Blog
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              {!userInfo && (
                <>
                  <LinkContainer to="/login">
                    <Button className="btn btn-light">Login</Button>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Button className="btn btn-light ml-2">Register</Button>
                  </LinkContainer>
                </>
              )}
              {userInfo && (
                <>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="light"
                      as="a"
                      className="cursor-pointer"
                    >
                      <Image
                        src={`https://avatars.dicebear.com/4.5/api/human/${userInfo.name}.svg`}
                        fluid
                        className="user-thumbnail mr-2"
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu alignRight={true}>
                      <Dropdown.Item onClick={() => handleLogout()}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
