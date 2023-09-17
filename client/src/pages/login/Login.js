import React, { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const { dispatch } = useContext(Context);
  var history = useHistory();
  const handleInvalidLogin = () => {
    setMessage("Credentials you entered are incorrect!");
    setEmail("");
    setPassword("");
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    setMessage("");
    if (!email || !password) {
      setErrorMessage("Both email and password are required.");
    } else {
      setErrorMessage("");
      handleSubmit(handleInvalidLogin);
      setMessage("");
    }
  };
  const handleInputChange = (e) => {
    setMessage("");
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };
  const handleSubmit = async (handleInvalidLogin) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `http://localhost:7070/House_Rent_Service/user/login?email=${email}&password=${password}`
      );
      if (res.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        if (res.data.role === "ADMIN") {
          history.push("/admin");
        } else if (res.data.role === "LANDLORD") {
          history.push("/Landlord");
        } else {
          history.push("/home");
        }
      } else {
        handleInvalidLogin();
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      handleInvalidLogin();
    }
  };

  return (
    <section
      className="vh-400 bg-image"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-4">
            <div className="card shadow-lg mt-5 mb-5">
              <div className="card-body" style={{ minHeight: "400px" }}>
                <div className="text-center">
                  <h1 className="mb-4">Login Page</h1>
                </div>
                <form>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter email"
                      required
                      onChange={handleInputChange}
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      onChange={handleInputChange}
                      value={password}
                    />
                  </div>
                  {errorMessage && <p className="error">{errorMessage}</p>}
                  {message && <p className="error">{message}</p>}
                  <div className="text-center mt-4">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={handleSignIn}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <a href="/ForgetPassword">Forgot Password?</a>
                </div>
                <hr />
                <div className="text-center mt-4">
                  <p>
                    New to our site?{" "}
                    <a href="/register" className="btn btn-secondary">
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
