import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <Navbar className="color_nav" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Placement Tracking System</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/company">
              Company
            </Nav.Link>
            <Nav.Link as={Link} to="/students">
              Students
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Sidebar;
