import { useEffect, useState } from "react";
import axios from "axios";
import "./css/housetype.css";
import Sidebar from "../sidebar/Sidebar";
function Housetype() {
  const [data, setData] = useState([]);

  const [email, setEmail] = useState("");
  const addHouseType = async () => {
    axios
      .post("http://localhost:7070/House_Rent_Service/user/addItemType", {
        typeName: email,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:7070/House_Rent_Service/user/getAllItemType")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(
        `http://localhost:7070/House_Rent_Service/user/deleteHouseTypeById/${id}`
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setData(data.filter((item) => item.id !== id));
  };
  return (
    <>
      <div style={{ display: "inline-flex", maxHeight: "100%" }}>
        <Sidebar />

        <div
          className="container house-type-container"
          style={{ marginTop: "20px" }}
        >
          <form>
            <label>Enter house Type</label>
            <input
              type="text"
              placeholder="Enter House Type"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button type="button" onClick={addHouseType}>
              Submit
            </button>
          </form>
        </div>
        <div style={{ margin: "20px" }}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.typeName}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Housetype;
