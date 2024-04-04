import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Button from "react-bootstrap/Button";

export const NavbarComponent = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error(error.response?.data?.message);
      }
    }
  };

  return (
    <div>
      <Navbar expand="lg" variant="dark" style={{ backgroundColor: "#013220" }}>
        <Container>
          <Link to="/" className="nav-link">
            <Navbar.Brand>PDM</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link px-3">
                {" "}
                Home{" "}
              </Link>
              <Link to="/schedule" className="nav-link px-3">
                {" "}
                Schedule{" "}
              </Link>
              <Link to="/rank" className="nav-link px-3">
                {" "}
                Rank{" "}
              </Link>
              <Link to="/meetingRequest" className="nav-link px-3">
                {" "}
                Meeting Request{" "}
              </Link>
              <Link to="/registration" className="nav-link px-3">
                {" "}
                Register{" "}
              </Link>
            </Nav>
            <Nav className="ms-auto">
              {user ? (
                <NavDropdown
                  title={user.firstName + " " + user.lastName}
                  id="basic-nav-dropdown"
                  className="px-3"
                >
                  <NavDropdown.Item href="#action/3.1">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Schedule
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login" className="nav-link px-3">
                  Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
