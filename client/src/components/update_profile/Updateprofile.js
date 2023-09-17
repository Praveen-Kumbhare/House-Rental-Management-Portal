import React, { useContext, useState } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import { Context } from "../../context/Context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const mydate = require("current-date");

function Updateprofile() {
  axios.defaults.debug = true;
  const { user, dispatch } = useContext(Context);
  const history = useHistory();
  const [usr, setUsr] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    mobileNumber: user.mobileNumber,
    regTime: mydate("date"),
  });
  const [fieldErrors, setFieldErrors] = useState({
    firstName: false,
    lastName: false,
    mobileNumber: false,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUsr((prevUsr) => ({
      ...prevUsr,
      [id]: value,
    }));
    setFieldErrors((prevFieldErrors) => ({
      ...prevFieldErrors,
      [id]: false,
    }));
  };

  const handleSubmit = async (e) => {
    dispatch({ type: "UPDATE_START" });
    e.preventDefault();
    let hasErrors = false;
    const newFieldErrors = {};
    for (const field in usr) {
      if (!usr[field]) {
        hasErrors = true;
        newFieldErrors[field] = true;
      }
    }
    if (!usr.mobileNumber) {
      hasErrors = true;
      newFieldErrors.mobileNumber = "Mobile number is required";
    } else if (usr.mobileNumber.length !== 10) {
      hasErrors = true;
      newFieldErrors.mobileNumber = "Mobile number must be of 10 digits";
    }

    if (hasErrors) {
      setFieldErrors(newFieldErrors);
      return;
    }
    await axios
      .patch(
        `http://localhost:7070/House_Rent_Service/user/updateUser/${user.email}`,
        usr
      )
      .then((response) => {
        dispatch({ type: "UPDATE_SUCCESS", payload: response.data });
        alert("Profile Updated successful!");
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
        alert("Profile Updation failed. Please try again.");
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
                <h1 className="text-center mb-4">Update</h1>
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
                      value={usr.firstName}
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
                      value={usr.lastName}
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
                      value={usr.mobileNumber}
                      onChange={handleChange}
                    />
                    {fieldErrors.mobileNumber && (
                      <p className="error">{fieldErrors.mobileNumber}</p>
                    )}
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                    <button
                      type="button"
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      onClick={handleSubmit}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Updateprofile;
