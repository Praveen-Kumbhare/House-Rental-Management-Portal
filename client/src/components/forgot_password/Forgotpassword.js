import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
//import "../assets/forgetpwd.css";
//import "../assets/css/common.css";
import axios from "axios";

import { Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
function ForgotPassword() {
  var history = useHistory();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [verify, setverify] = useState({ Confirm_Password: "" });
  const handleChange2 = (args) => {
    var copyOfUser = { ...verify };
    copyOfUser[args.target.id] = args.target.value;
    setverify(copyOfUser);
  };
  const handleSendOtp = async () => {
    debugger;
    setUser({ email: email });

    axios
      .post("http://localhost:7070/House_Rent_Service/sendotp", {
        email: email,
      })
      .then(function (response) {
        console.log(response.data.otp);
        setOtp(response.data.otp);
        setIsOtpSent(true);
        console.log(isOtpSent);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleVerifyOtp = () => {
    console.log(otp);
    if (otp == enteredOtp) {
      console.log("OTP verification successful");
      setErrorMessage("");
      setVerified(true);
    } else {
      console.log("OTP verification failed");
      setErrorMessage("OTP verification failed. Please try again.");
    }
  };
  const handleChange = (args) => {
    var copyOfUser = { ...user };
    copyOfUser[args.target.id] = args.target.value;
    setUser(copyOfUser);
  };
  const verifyPassword = () => {
    const strongRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (strongRegex.test(user.password)) {
      return "strong";
    } else {
      return "weak";
    }
  };
  var submit = () => {
    debugger;
    if (verify.Confirm_Password == user.password) {
      console.log(user);
      var userObjectInStringFormat = JSON.stringify(user);
      console.log("dd" + userObjectInStringFormat);
      var helper = new XMLHttpRequest();
      helper.onreadystatechange = () => {
        if (helper.readyState == 4 && helper.status == 200) {
          console.log(helper.responseText);
          var result = JSON.parse(helper.responseText);
          alert("Password updated successfully!");
          history.push("/Login");
        } else if (helper.readyState == 4 && helper.status == 500) {
          alert("Password not get updated!");
        }
      };
      helper.open(
        "PATCH",
        `http://localhost:7070/House_Rent_Service/user/${user.email}`,
        true
      );
      helper.setRequestHeader("content-type", "application/json");
      console.log(helper.status);
      helper.send(userObjectInStringFormat);
      console.log(helper.status);
      history.push("/Login");
    } else {
      alert("password does not match");
      setverify({ Confirm_Password: "" });
    }
  };

  return (
    <div className="container mt-8">
      <h2>Forgot Your Password?</h2>
      <p>
        No problem. Just enter your email address and new password below to
        reset your password. if you password is match for last three password
        then password cannot update
      </p>

      <Form>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSendOtp}>
          Send OTP
        </Button>

        {isOtpSent && (
          <Form.Group controlId="formOtp">
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter OTP"
              value={enteredOtp}
              onChange={(event) => setEnteredOtp(event.target.value)}
            />
            <Button variant="primary" onClick={handleVerifyOtp}>
              Verify OTP
            </Button>
          </Form.Group>
        )}

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {!verified ? (
          <p>
            New to our site?{" "}
            <a href={"/account"} class="btn btn-secondary">
              Sign Up
            </a>
          </p>
        ) : (
          <>
            <div class="form-group">
              <input
                type={"password"}
                id="password"
                class="form-control"
                placeholder="Password"
                required
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <p className="error">Password strength:-{verifyPassword()}</p>
            <div class="form-group">
              <input
                type={"password"}
                id="Confirm_Password"
                class="form-control"
                placeholder="Confirm Password"
                required
                value={verify.Confirm_Password}
                onChange={handleChange2}
              />
            </div>
            <p className="error">
              {error}
              {error1}
            </p>
            <button
              class="btn btn-primary btn-block"
              onClick={() => {
                if (error == "") {
                  submit();
                }
              }}
            >
              {" "}
              Reset Password
            </button>
            <div class="form-check">
              <label class="form-check-label">
                <a href={"/login"}>Cancel</a>
              </label>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}

export default ForgotPassword;
