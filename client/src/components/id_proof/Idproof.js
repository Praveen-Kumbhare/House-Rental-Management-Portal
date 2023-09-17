import React, { useState, useContext } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context } from "../../context/Context";

const Idproof = ({ isIdProofVerified }) => {
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const { user } = useContext(Context);
  var history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:7070/House_Rent_Service/user/idProof", {
        idType: idType,
        idNo: idNumber,
        userId: user.id,
      })
      .then((response) => {
        alert("verification is done");
        isIdProofVerified(true);
        history.push("/adf");
      })
      .catch((error) => {
        console.log(error);
      });
    history.goBack();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>ID Type</Form.Label>
        <Form.Control
          as="select"
          value={idType}
          onChange={(event) => setIdType(event.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="passport">Passport</option>
          <option value="driver-license">Driving License</option>
          <option value="aadhar-id">Aadhar Card</option>
          <option value="pan-id">Pan Card</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>ID Number</Form.Label>
        <Form.Control
          type="text"
          value={idNumber}
          onChange={(event) => setIdNumber(event.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Idproof;
