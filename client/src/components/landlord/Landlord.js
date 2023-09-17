import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import "./css/landlord.css";

function Landlord() {
  const [houseData, setHouseData] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7070/House_Rent_Service/user/getHouseDetailsByUser/${user.id}`
        );
        const data = response.data;
        const housesWithImages = await Promise.all(
          data.map(async (item) => {
            const imageResponse = await axios.get(
              `http://localhost:7070/House_Rent_Service/file/getImage/${item.id}.jpeg`,
              {
                responseType: "arraybuffer",
              }
            );
            const base64Image = btoa(
              new Uint8Array(imageResponse.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            return {
              ...item,
              imageData: `data:image/jpeg;base64,${base64Image}`,
            };
          })
        );
        setHouseData(housesWithImages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user.id]);

  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `http://localhost:7070/House_Rent_Service/user/deleteHouseById/${id}`
      );
      setHouseData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateItem = (id) => (
    <Link to={`/update-house/${id}`}>
      <button className="btn btn-danger">Edit</button>
    </Link>
  );

  return (
    <div className="table-responsive">
      <div className="d-flex flex-column align-items-center">
        <h3 className="mb-4">Welcome to Landlord listed House</h3>
        <table
          className="table table-striped table-bordered table-hover"
          style={{ textAlign: "center" }}
        >
          <thead className="thead-dark">
            <tr>
              <th>id</th>
              <th>House Image</th>
              <th>House Name</th>
              <th>House Description</th>
              <th>Price</th>
              <th>House Area (SqFt)</th>
              <th>Quantity</th>
              <th>House Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {houseData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <img
                    className="house-image"
                    src={item.imageData}
                    alt="House"
                  />
                </td>
                <td>{item.itemName}</td>
                <td>{item.description}</td>
                <td>${item.pricePerUnit}</td>
                <td>{item.areaInSqFt} SqFt</td>
                <td>{item.quantity}</td>
                <td>{item.houseType.typeName}</td>
                <td>
                  <div className="button-container">
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </button>
                    {updateItem(item.id)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Landlord;
