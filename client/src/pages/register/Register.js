import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import EmailVerificationPage from "../email_verification/Emailverification";

import "bootstrap/dist/css/bootstrap.css";
var mydate = require("current-date");

function Register() {
  const history = useHistory();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    mobileNumber: "",
    email: "",
    regTime: mydate("date"),
    role: "USER",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({
    firstName: false,
    lastName: false,
    mobileNumber: false,
    email: false,
    password: false,
    Confirm_Password: false,
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
    setFieldErrors((prevFieldErrors) => ({
      ...prevFieldErrors,
      [id]: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;
    const newFieldErrors = {};
    for (const field in user) {
      if (!user[field]) {
        hasErrors = true;
        newFieldErrors[field] = true;
      }
    }

    if (!user.password || user.password !== user.Confirm_Password) {
      hasErrors = true;
      newFieldErrors.password = true;
      newFieldErrors.Confirm_Password = true;
    }
    if (!user.mobileNumber) {
      hasErrors = true;
      newFieldErrors.mobileNumber = "Mobile number is required";
    } else if (user.mobileNumber.length !== 10) {
      hasErrors = true;
      newFieldErrors.mobileNumber = "Mobile number must be of 10 digits";
    }

    if (hasErrors) {
      setFieldErrors(newFieldErrors);
      return;
    }

    axios
      .post("http://localhost:7070/House_Rent_Service/user/regUser", user)
      .then((response) => {
        alert("Registration successful!");
        setRegistrationSuccess(true);
      })
      .catch((error) => {
        console.error(error);
        alert("Registration failed. Please try again.");
      });
  };

  return (
    <section
      className="vh-300 bg-image"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}
    >
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div
              className="card shadow-lg mt-5 mb-5"
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body p-5">
                {registrationSuccess ? (
                  <EmailVerificationPage email={user.email} />
                ) : (
                  <>
                    <h1 className="text-center mb-4">Sign Up</h1>
                    <form>
                      <div className="form-group registration-form ">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          className={`form-control ${
                            fieldErrors.firstName ? "is-invalid" : ""
                          }`}
                          placeholder="First Name"
                          value={user.firstName}
                          onChange={handleChange}
                        />
                        {fieldErrors.firstName && (
                          <p className="error">First Name is required</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          className={`form-control ${
                            fieldErrors.lastName ? "is-invalid" : ""
                          }`}
                          placeholder="Last Name"
                          value={user.lastName}
                          onChange={handleChange}
                        />
                        {fieldErrors.lastName && (
                          <p className="error">Last Name is required</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="mobileNumber">Mobile Number</label>
                        <input
                          type="text"
                          id="mobileNumber"
                          className={`form-control ${
                            fieldErrors.mobileNumber ? "is-invalid" : ""
                          }`}
                          placeholder="Mobile Number"
                          value={user.mobileNumber}
                          onChange={handleChange}
                        />
                        {fieldErrors.mobileNumber && (
                          <p className="error">{fieldErrors.mobileNumber}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          id="email"
                          className={`form-control ${
                            fieldErrors.email ? "is-invalid" : ""
                          }`}
                          placeholder="Email"
                          value={user.email}
                          onChange={handleChange}
                        />
                        {fieldErrors.email && (
                          <p className="error">Email is required</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          className={`form-control ${
                            fieldErrors.password ? "is-invalid" : ""
                          }`}
                          placeholder="Password"
                          value={user.password}
                          onChange={handleChange}
                        />
                        {fieldErrors.password && (
                          <p className="error">Password is required</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="Confirm_Password">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="Confirm_Password"
                          className={`form-control ${
                            fieldErrors.Confirm_Password ? "is-invalid" : ""
                          }`}
                          placeholder="Confirm Password"
                          value={user.Confirm_Password}
                          onChange={handleChange}
                        />
                        {fieldErrors.Confirm_Password && (
                          <p className="error">Passwords do not match</p>
                        )}
                      </div>
                      <div className="d-flex justify-content-center mt-4">
                        <button
                          type="button"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                          onClick={handleSubmit}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                    <p className="text-center text-muted mt-3 mb-0">
                      Have already an account?{" "}
                      <a href="/Login" className="fw-bold text-body">
                        <u>Login here</u>
                      </a>
                    </p>
                  </>
                )}
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
