import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./css/admin.css";
import Sidebar from "../sidebar/Sidebar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function Admin() {
  const [countuser, setCountuser] = useState(null);
  const [countLandlord, setCountLandlord] = useState(null);
  const [avilablehouse, setAvilablehouse] = useState(null);
  const [quty, setQuty] = useState(null);
  useEffect(() => {
    axios
      .all([
        axios.get("http://localhost:7070/House_Rent_Service/user/sum"),
        axios.get("http://localhost:7070/House_Rent_Service/user/countuser"),
        axios.get(
          "http://localhost:7070/House_Rent_Service/user/countlandlord"
        ),
        axios.get(
          "http://localhost:7070/House_Rent_Service/user/countbyadminhouse"
        ),
      ])
      .then(
        axios.spread(
          (
            sumResponse,
            countUserResponse,
            countLandlordResponse,
            countAdminHouseResponse
          ) => {
            setQuty(sumResponse.data);
            setCountuser(countUserResponse.data);
            setCountLandlord(countLandlordResponse.data);
            setAvilablehouse(countAdminHouseResponse.data);
          }
        )
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ display: "inline-flex" }}>
      <Sidebar />
      <div className="grid-container my-5 mx-2">
        <div className="grid-item">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Number of Users</h5>
              <h2 className="card-text Header5">{countuser}</h2>
            </div>
          </div>
        </div>

        <div className="grid-item">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Number of Landlords</h5>
              <h2 className="card-text Header5">{countLandlord}</h2>
            </div>
          </div>
        </div>
        <div className="grid-item">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Total number of houses listed on our site
              </h5>
              <h2 className="card-text Header5">{avilablehouse}</h2>
            </div>
          </div>
        </div>
        <div className="grid-item">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Total number of houses available on our site
              </h5>
              <h2 className="card-text Header5">{quty}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Admin;
