import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import Brand from "../Brand.png";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listProducts } from "../actions/productActions";

const Header = () => {
  const params = useParams();
  const navigate = useNavigate();
  const keyword = params.keyword;

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        style={{ padding: 0 }}
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="brand" href="/">
              <img src={Brand} alt="brand" width="50" height="50"></img>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav
              className="ms-auto"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to="/cart">
                <Nav.Link>
                  <span className="fas fa-shopping-cart"></span>
                  Coșul Meu
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Deconectează-te
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <span className="fas fa-user"></span> Logare
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Clienți</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Produse</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Listă comenzi</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
