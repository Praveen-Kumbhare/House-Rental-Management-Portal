import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

function Emailverification({ email }) {
  const history = useHistory();
  const [otp, setOtp] = useState("");
  const [verificationError, setVerificationError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [responseOtp, setResponseOtp] = useState();

  const handleVerification = async () => {
    try {
      const response = await axios.post(
        "http://localhost:7070/House_Rent_Service/sendotp",
        {
          email,
        }
      );
      setResponseOtp(response.data.otp);
      console.log(response.data.otp);
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationError(true);
    }
  };

  const handleOtpVerification = () => {
    if (responseOtp == otp) {
      alert("Email Verification Successful");
      history.push("/login");
    } else {
      setOtpError(true);
    }
  };

  return (
    <div className="container">
      <h2>Email Verification</h2>
      <p>
        Enter the verification code sent to your email: {email}
        <span
          className="badge badge-success ml-2"
          role="button"
          onClick={handleVerification}
          style={{ color: "blue" }}
        >
          Verify Email
        </span>
      </p>

      <div className="mt-4">
        <p>Enter the OTP sent to your email:</p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <button onClick={handleOtpVerification}>Verify OTP</button>
        {otpError && (
          <p style={{ color: "red" }}>Invalid OTP. Please try again.</p>
        )}
      </div>

      {verificationError && (
        <p style={{ color: "red" }}>
          Email verification failed. Please try again.
        </p>
      )}
    </div>
  );
}

export default Emailverification;
