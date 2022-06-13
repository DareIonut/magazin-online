import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  FormGroup,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const params = useParams();
  const history = useNavigate();

  const productDetail = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submited");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(params.id));
  }, [dispatch, params.id, successProductReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Înapoi
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} recenzii`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Preț: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Descriere: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Preț:</Col>
                      <Col>
                        <strong>lei{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Stare:</Col>
                      <Col>
                        {product.countInStock > 0 ? "În stoc" : "Fără stock"}
                      </Col>
                    </Row>
                    <ListGroup.Item>
                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Cantitate</Col>
                            <Col>
                              <Form.Control
                                as="select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[
                                  ...Array(Number(product.countInStock)).keys(),
                                ].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}

                      <Button
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}
                        onClick={() => history(`/cart/${params.id}?qty=${qty}`)}
                      >
                        Adaugă în coș
                      </Button>
                    </ListGroup.Item>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Recenzii</h2>
              {product.reviews.length === 0 && <Message>Fără recenzii</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{product.createdAt.substring(0, 10)}</p>
                    <p>{product.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Scrie o recenzie</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <FormGroup controlId="rating">
                        <Form.Label>Recenzii</Form.Label>
                        <Form.Control
                          as="select"
                          value="rating"
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Form.Control>
                      </FormGroup>
                      <FormGroup controlId="comment">
                        <Form.Label>Comentează</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </FormGroup>
                      <Button type="submit" varitant="primary">
                        Trimite
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      <Link to="/login">Logare</Link>
                      pentru a lăsa o recenzie
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
