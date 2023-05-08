import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Nav, Navbar, Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Navigation() {
  const { isAdmin, toggleRole } = useContext(UserContext);

  const handleToggle = () => {
    toggleRole();
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">animal asylum</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/about">
              <Nav.Link>About Us</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/animalsList">
              <Nav.Link>Animals List</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/donations">
              <Nav.Link>Donations</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/announcements">
              <Nav.Link>Announcements</Nav.Link>
            </LinkContainer>
            {isAdmin && (
              <LinkContainer to="/newentry">
                <Nav.Link>New Entry</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          <Button variant="outline-primary" onClick={handleToggle}>
            {isAdmin ? "Switch to User" : "Switch to Admin"}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
