import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Context } from "../../context/Context";
const Housedetails = () => {
  const { user } = useContext(Context);
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const data = location.state.data;
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [idproof, setIdproof] = useState("");
  const [idproof1, setIdproof1] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:7070/House_Rent_Service/user/available1/${data}`)
      .then((response) => {
        setData1(response.data);
        setData2(response.data.houseType);
        setData3(response.data.houseLocation);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const handleBookHouseClick = () => {
    if (!user) {
      alert("you must login to Book a house");
      history.push("/login");
    } else if (!idproof1) {
      alert("Your verification is not done");
      history.push("/ifd");
    } else {
      setShowModal(true);
    }
  };
  const handleAgreeToTerms = () => {
    setAgreedToTerms(true);
    setShowModal(false);
    history.push({
      pathname: "/rfo",
      state: { price: data1.pricePerUnit, id: data },
    });
  };
  useEffect(() => {
    axios
      .get(
        `http://localhost:7070/House_Rent_Service/user/getUserIdDetails/${user?.id}`
      )
      .then((response) => {
        const data = JSON.stringify(response.data);
        console.log(data.length);
        if (data.length === 2) {
          setIdproof1(false);
        } else {
          setIdproof(response.data[0].id);
        }
      })
      .catch((error) => {
        console.error("Error fetching item types:", error);
      });
  }, []);

  const termsAndConditionsText = () => {
    return (
      <div>
        <p>1.Overview: Provide an overview of the service and how it works.</p>

        <p>
          2.Eligibility: State the eligibility criteria for using the service,
          such as minimum age or legal status.
        </p>

        <p>
          3.User Obligations: Outline the user's obligations when using the
          service, including any restrictions on the use of the service, such as
          not engaging in fraudulent activities or using the service for illegal
          purposes.
        </p>
        <p>
          4.Payment and Fees: Explain how payment and fees work, including any
          deposit requirements, payment methods, and the consequences of
          non-payment or late payment.
        </p>
        <p>
          5.Privacy Policy: Detail how user information will be collected, used,
          and protected in accordance with applicable laws and regulations.
        </p>
        <p>
          6.Liability and Disclaimers: Explain the limitations of liability for
          the service provider, including disclaimers of warranties and
          limitations on liability for damages.
        </p>
        <p>
          7.Intellectual Property: Outline the ownership and use of intellectual
          property associated with the service, such as trademarks and
          copyrights.
        </p>
        <p>
          8.Termination and Suspension: Describe the circumstances under which
          the service provider may terminate or suspend a user's account.
        </p>
        <p>
          9.Governing Law and Jurisdiction: Specify the governing law and
          jurisdiction for any disputes that may arise between the user and the
          service provider.
        </p>
        <p>
          10. Modifications and Updates: Explain how the terms and conditions
          may be modified or updated and how users will be notified of any
          changes.
        </p>
        <p>
          It's important to note that the terms and conditions should be written
          clearly and concisely in language that users can easily understand.
          It's also a good idea to have users acknowledge that they have read
          and agreed to the terms and conditions before using the service.
        </p>
        <p>By checking the box below, you agree to the terms and conditions.</p>
      </div>
    );
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div style={{ marginTop: "2rem ", marginBottom: "2em" }}>
      <Container>
        <Row>
          <Col md={6}>
            <Carousel>
              <Carousel.Item key={172}>
                <img
                  className="d-block  w-100"
                  src={`http://localhost:7070/House_Rent_Service/file/getImage/${data}.jpeg`}
                  alt="house details how "
                  style={{ maxHeight: "400px" }}
                ></img>
              </Carousel.Item>
              <Carousel.Item key={172}>
                <img
                  className="d-block w-100"
                  src={`http://localhost:7070/House_Rent_Service/file/getImage/${data}.jpeg`}
                  alt="the house Details"
                  style={{ maxHeight: "400px" }}
                />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col md={1}></Col>
          <Col md={5}>
            <h2>{data1.itemName}</h2>
            <p>{data1.description}</p>
            <ul>
              <li>Price: {data1.pricePerUnit}</li>
              <li>
                Location:{data1.areaDescription}
                {data3.city} {data3.state} {data3.postalCode}
              </li>
              <li>Bedrooms:{data2.typeName}</li>

              <li>House Information : {data1.description}</li>
              <Button
                style={{ margin: "0", marginTop: "2em" }}
                variant="primary"
                onClick={handleBookHouseClick}
              >
                Book House
              </Button>
            </ul>
          </Col>
        </Row>
      </Container>
      <>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Terms and Conditions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
              {termsAndConditionsText()}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <input
              type="checkbox"
              id="agree-to-terms-checkbox"
              onChange={(event) => setAgreedToTerms(event.target.checked)}
            />
            <label htmlFor="agree-to-terms-checkbox">
              I agree to the terms and conditions
            </label>
            <Button
              variant="primary"
              onClick={handleAgreeToTerms}
              disabled={!agreedToTerms}
            >
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default Housedetails;
