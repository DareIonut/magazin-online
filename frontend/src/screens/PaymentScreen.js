import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Modalitate de plată</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Seleactează metoda</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continuă
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
