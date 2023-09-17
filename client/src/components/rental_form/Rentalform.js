import React, { useContext, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import moment from "moment";
import { useLocation, useHistory } from "react-router-dom";
import { Context } from "../../context/Context";
function RentalForm() {
  const history = useHistory();
  const location = useLocation();
  const { user } = useContext(Context);
  const price = location.state.price;
  const data = location.state.id;
  const [id, setId] = useState(0);
  const [formData, setFormData] = useState({
    timeFrom: "",
    timeTo: "",
    pricePerUnit: price,
    adminHouseId: data,
    useId: user.id,

    totalPrice: 0,
    renterGradeDesc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { timeFrom, timeTo, pricePerUnit } = formData;
    const momentDate1 = moment(timeFrom, "DD-MM-YYYY");
    const momentDate2 = moment(timeTo, "DD-MM-YYYY");
    const diffInMonths = momentDate2.diff(momentDate1, "months");
    const totalPrice = diffInMonths * pricePerUnit;
    setFormData((prevFormData) => ({ ...prevFormData, totalPrice }));
    try {
      const res = await axios.post(
        "http://localhost:7070/House_Rent_Service/user/adminHouse1",
        formData
      );
      setId(res.data.id);
      const idp = res.data.id;
      console.log(id);
      console.log(idp);
      history.push({
        pathname: "/iddp",
        state: { price: totalPrice, id: idp },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1>Rental Form</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="timeFrom">
              <Form.Label>Time From</Form.Label>
              <Form.Control
                type="date"
                name="timeFrom"
                value={formData.timeFrom}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="timeTo">
              <Form.Label>Time To</Form.Label>
              <Form.Control
                type="date"
                name="timeTo"
                value={formData.timeTo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="pricePerUnit">
          <Form.Label>Price Per Unit</Form.Label>
          <Form.Control
            type="number"
            name="pricePerUnit"
            value={formData.pricePerUnit}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="renterGradeDesc">
          <Form.Label>Renter Grade Description</Form.Label>
          <Form.Control
            as="textarea"
            name="renterGradeDesc"
            value={formData.renterGradeDesc}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default RentalForm;
