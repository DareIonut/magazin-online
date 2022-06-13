import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center">Copyright &copy;</Col>
        </Row>
        <Row className="text-center">
          <Col className="text-center">DARE's Company</Col>
        </Row>
        <Row className="text-center">
          <Col className="text-center">2022</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
