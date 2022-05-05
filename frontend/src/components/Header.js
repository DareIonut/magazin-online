import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Babilon</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="ms-auto"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to="/cart">
                <Nav.Link>
                  <span className="fas fa-shopping-cart"></span>
                  Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <span className="fas fa-user"></span> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
