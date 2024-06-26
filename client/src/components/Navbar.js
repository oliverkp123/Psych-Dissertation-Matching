import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import Notifications from "./Notifications";

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
              {user && user.role === "student" && (
                <Link to="/schedule" className="nav-link px-3">
                  {" "}
                  Schedule{" "}
                </Link>
              )}
              {user && (user.role === "student" || user.role === "faculty") && (
                <Link to="/rank" className="nav-link px-3">
                  {" "}
                  Rank{" "}
                </Link>
              )}
              {user && user.role === "admin" && (
                <Link to="/adminpanel" className="nav-link px-3">
                  {" "}
                  Admin Panel{" "}
                </Link>
              )}
              {/* <Link to="/meetingRequest" className="nav-link px-3">
                {" "}
                Meeting Request{" "}
              </Link> */}
            </Nav>
            <Nav className="ms-auto">
              {user ? (
                <>
                  {user &&
                    (user.role === "student" || user.role === "faculty") && (
                      <Notifications />
                    )}
                  <NavDropdown
                    title={user.firstName + " " + user.lastName}
                    id="basic-nav-dropdown"
                    className="px-3"
                  >
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>
                    {user &&
                      (user.role === "student" || user.role === "faculty") && (
                        <NavDropdown.Item as={Link} to="/myschedule">
                          My Schedule
                        </NavDropdown.Item>
                      )}

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Link to="/registration" className="nav-link px-3">
                    Register
                  </Link>
                  <Link to="/login" className="nav-link px-3">
                    Login
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
