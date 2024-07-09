import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../components/login/AuthContext";

const NavBar = () => {
  const { username, setUsername } = useAuth();
  return (
    <Navbar className="px-3" bg="light" expand="lg">
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/registration" className="nav-link">
            Registration
          </NavLink>
          <NavLink to="/appointments" className="nav-link">
            Appointments
          </NavLink>
          <NavLink to="/surgery" className="nav-link">
            Surgery
          </NavLink>
          <NavLink to="/calendar" className="nav-link">
            Calendar View
          </NavLink>
        </Nav>
      </Navbar.Collapse>
      <span>
        {username ? (
          <>
            {username}{" "}
            <Link to="/login" onClick={() => setUsername("")}>
              {" "}
              Logout
            </Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </span>
    </Navbar>
  );
};

export default NavBar;
