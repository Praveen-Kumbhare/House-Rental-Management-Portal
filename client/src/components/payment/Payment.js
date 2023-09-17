import axios from "axios";
import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
var mydate = require("current-date");
function Payment() {
  const history = useHistory();
  const { user } = useContext(Context);
  const [paymentMode, setPaymentMode] = useState("Card");
  const location = useLocation();
  const price = location.state.price;
  const data = location.state.id;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7070/House_Rent_Service/user/createPayment",
        {
          userId: user?.id,
          paymentMode: "Card",
          datePaid: mydate("date"),
          amountPaid: price,
          userHouseId: data,
        }
      );
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-5">Payment Information</h1>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name on Card</Form.Label>
              <Form.Control type="text" placeholder="Enter name" required />
            </Form.Group>

            <Form.Group controlId="formBasicCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter card number"
                required
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="formBasicExpiration">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control type="text" placeholder="MM/YY" required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicCVC">
                  <Form.Label>CVC</Form.Label>
                  <Form.Control type="text" placeholder="CVC" required />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit Payment
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2>Order Summary</h2>

          <p>Price: {price}</p>
          <p>Total: {price}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;
