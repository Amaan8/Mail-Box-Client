import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  return (
    <Navbar bg="light" expand="md">
      <Container fluid className="px-5">
        <Navbar.Brand href="/">MAIL BOX</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            {isLoggedIn && (
              <Link to="/auth" className="nav-link" onClick={logoutHandler}>
                Logout
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
