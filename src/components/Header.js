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
    <Navbar bg="success" expand="sm" sticky="top">
      <Container fluid className="px-5">
        <Link to="/" className="navbar-brand text-white">
          MAIL BOX
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-white" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/home" className="nav-link text-white">
              Home
            </Link>
            {isLoggedIn && (
              <Link
                to="/auth"
                className="nav-link text-white"
                onClick={logoutHandler}
              >
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
